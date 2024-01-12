import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/notesSlice';

const NoteDetail = ({ route, navigation }) => {
  const { header, body, index } = route.params;
  const dispatch = useDispatch();

  const handleDeleteNote = () => {
    console.log('Deleting note with index:', index); 
    dispatch(deleteNote({id:index}));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatlistdetail}>
        <Text style={styles.title}>{header}</Text>
        <Text style={styles.body}>{body}</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Icon name="edit" size={30} color="#007BFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteNote}>
            <Icon name="delete" size={30} color="#FF3B30" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  flatlistdetail: {
    backgroundColor: '#E79A3F',
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  body: {
    fontSize: 18,
    lineHeight: 24,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  icon: {
    padding: 10,
  },
});

export default NoteDetail;
