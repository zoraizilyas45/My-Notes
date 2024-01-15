import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNote, deleteNote, setNotes, updateNote } from '../redux/notesSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth'

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [longPressedItem, setLongPressedItem] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  const userNotesKey = `notes_${auth().currentUser.uid}`;

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(userNotesKey);
        if (storedNotes) {
          dispatch(setNotes(JSON.parse(storedNotes)));
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };

    loadNotes();
  }, [dispatch]);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(userNotesKey, JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    };

    saveNotes();
  }, [notes]);

  const flatListData = searchQuery.length > 0 ? searchResults : notes;

  const renderNoteItem = ({ item, index }) => (
    <View style={{width:'48%',marginLeft:8}}>
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('EditNote', {
          header: item.header,
          body: item.body,
          onSave: (editedHeader, editedBody) => handleEdit(index, editedHeader, editedBody),
        })
      }
      onLongPress={() => setLongPressedItem(index)}
    >
      <View>
        <Text style={styles.noteHeader}>{item.header}</Text>
        <Text style={styles.noteBody} numberOfLines={5} ellipsizeMode="tail">
          {item.body}
        </Text>
      
      {longPressedItem === index && (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
            <Icon name="trash" size={20} color="#fff"  />
          </TouchableOpacity>
        </View>
        
      )}</View>
    </TouchableOpacity>
    </View>
  );

  const handleEdit = (index, header, body) => {
    const updatedNote = {
      header: header !== undefined ? header : notes[index].header,
      body: body !== undefined ? body : notes[index].body,
    };

    dispatch(updateNote({ index, updatedNote }));

    if (header !== undefined && body !== undefined) {
      setSearchQuery('');
    }
  };

  const handleDelete = (index) => {
    setLongPressedItem(null);
    dispatch(deleteNote(index));
  };

  const handleSearch = (text) => {
    const results = notes.filter(
      (note) =>
        note.header.toLowerCase().includes(text.toLowerCase()) ||
        note.body.toLowerCase().includes(text.toLowerCase())
    );

    setSearchResults(results);

    // if (results.length === 0) {
    //   Alert.alert('Not Found any similar note');
    // }
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
  
      await AsyncStorage.removeItem(userNotesKey);
  
      await auth().signOut();
      setSigningOut(false);
      navigation.replace('Signin');
    } catch (error) {
      console.error('Error signing out:', error);
      setSigningOut(false);
    }
  };
  


  const navigateToNotes = () => {
    navigation.navigate('EditNote', {
      header: '',
      body: '',
      onSave: (editedHeader, editedBody) => dispatch(addNote({ header: editedHeader, body: editedBody })),
    });
  };

  return (
    <View style={styles.container}>
    {/* <View style={styles.notesView}>
      <Text style={styles.textStyle}>Notes App</Text>
    
    </View> */}

    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Note..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch(text);
        }}
      />
        <TouchableOpacity style={styles.signoutButton} onPress={handleSignOut} disabled={signingOut}>
      {signingOut ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Icon name="sign-out" size={29} color="#fff" />
      )}
    </TouchableOpacity>
    </View>
<View style={styles.centerContainer}>
    <FlatList
      data={flatListData}
      renderItem={renderNoteItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
    />
    </View>
<TouchableOpacity style={styles.floatingButton} onPress={navigateToNotes}>
      <View style={styles.floatingButtonContent}>
        <Text style={styles.buttonText}>+</Text>
      </View>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
 
  },
  notesView: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    //marginTop: -8,
    alignItems: 'center',
  height:50,

  },
  textStyle: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    color:'#121212',
  },
  searchBar: {
    padding: 10,
    width:"105%",
    alignItems: 'center',
    flexDirection:'row'
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 45,
    padding: 10,
    width: '80%',
    
  },
  noteHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#fdf7e4',
  },
  noteBody: {
    fontSize: 14,
    color:'#fdf7e4'
  },

  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',  
    margin: 3,
    padding: 12,
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#be8f01',
    
  },
  
 
  iconContainer: {
    bottom: 5,
    right: 5,
    zIndex: 1,
    alignSelf: 'flex-end', 
  },
  

  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 16,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    borderWidth: 2,
borderColor: '#FFFDD0', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#3b2d04',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#be8f01',
    marginLeft: 5, 
  },
  signoutButton: {
    position: 'absolute',
    top: 13,
    right: 30,
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    left:-4
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Home;