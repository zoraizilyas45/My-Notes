import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNote, deleteNote, setNotes, updateNote } from '../redux/notesSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [longPressedItem, setLongPressedItem] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          dispatch(setNotes(JSON.parse(storedNotes)));
        }
      } catch (error) {
        console.error('Error loading notes from AsyncStorage:', error);
      }
    };

    loadNotes();
  }, [dispatch]);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes to AsyncStorage:', error);
      }
    };

    saveNotes();
  }, [notes]);

  const flatListData = searchQuery.length > 0 ? searchResults : notes;

  const renderNoteItem = ({ item, index }) => (
    <View style={{width:'48%'}}>
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
            <Icon name="trash" size={20} color="#fff" />
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

    if (results.length === 0) {
      Alert.alert('Not Found any similar note');
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
      <View style={styles.notesView}>
        <Text style={styles.textStyle}>Notes</Text>
      </View>

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
      </View>

      <FlatList
        data={flatListData}
        renderItem={renderNoteItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={navigateToNotes}>
        <Text style={styles.buttonText}>+</Text>
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
    marginTop: -10,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  searchBar: {
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: '80%',
    borderColor:'green'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    height: 150,
    //width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#E79A3F',
  },
  noteHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteBody: {
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop:2
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 16,
    backgroundColor: 'green',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    color:'white'
  },
});

export default Home;
