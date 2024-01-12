import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import NotesSlice from '../redux/notesSlice';
import { addNote } from '../redux/notesSlice';


const Note = ({navigation}) => {
  const dispatch = useDispatch();
  const [noteHeader, setNoteHeader] = useState('');
  const [noteBody, setNoteBody] = useState('');

  const saveNote = () => {
    dispatch(addNote({ header: noteHeader, body: noteBody }));
    setNoteHeader('');
    setNoteBody('');
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Note</Text>

      <TextInput
        style={styles.inputTitle}
        placeholder="Note title"
        value={noteHeader}
        onChangeText={(text) => setNoteHeader(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Note Body"
        multiline
        numberOfLines={4}
        value={noteBody}
        onChangeText={(text) => setNoteBody(text)}
      />

      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    height: 40,
  },
  inputTitle:{height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,},
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Note;
