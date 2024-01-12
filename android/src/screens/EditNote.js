
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,LogBox } from 'react-native';

const EditNote = ({ route, navigation }) => {
  const { header, body, onSave } = route.params;
  const [editedHeader, setEditedHeader] = useState(header);
  const [editedBody, setEditedBody] = useState(body);

  const handleSave = () => {
    onSave(editedHeader, editedBody);
    navigation.goBack(); 
  };
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (

    <View style={styles.container}>
        <View></View>
      <Text>Edit Note</Text>
      <TextInput
        style={styles.editInput}
        value={editedHeader}
        placeholder="Edit Header"
        onChangeText={(text) => setEditedHeader(text)}
      />
      <TextInput
        style={styles.editInputbody}
        value={editedBody}
        placeholder="Edit Body"
        onChangeText={(text) => setEditedBody(text)}
      />
      <TouchableOpacity style={styles.editButton} onPress={handleSave}>
        <Text>Save</Text>
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
  editInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    
    marginBottom: 8,
    padding: 8,
  },
  editInputbody:{
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    
    marginBottom: 8,
    padding: 8,
  },
  editButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditNote;
