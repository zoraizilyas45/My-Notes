import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditNote = ({ route, navigation }) => {
  const { header, body, onSave } = route.params;
  const [editedHeader, setEditedHeader] = useState(header);
  const [editedBody, setEditedBody] = useState(body);

  const handleSave = () => {
  
    if (editedHeader.trim() !== '' || editedBody.trim() !== '') {
      onSave(editedHeader, editedBody);
    }
    navigation.goBack();
  };
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.headerbox}>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="arrow-back" size={30} style={styles.backIcon} />
        </TouchableOpacity>
        {/* <Text style={styles.headertext}>Back to Notes</Text> */}
      </View>
      <View style={styles.editContainer}>
        <Text style={styles.editHeader}>Edit Note</Text>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.editInput}
            value={editedHeader}
            placeholder="Edit Title"
            onChangeText={(text) => setEditedHeader(text)}
          />
          <View style={styles.titleSeparator}></View>
        </View>
        <TextInput
          style={styles.editInputbody}
          value={editedBody}
          placeholder="Edit Body"
          onChangeText={(text) => setEditedBody(text)}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleSave}>
        <Text style={styles.editButtonText}>Save</Text>
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
  headerbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    
  },
  backIcon: {
    color: '#be8f01',
    left: -20,
  },
  headertext: {
    fontSize: 18,
    color: '#be8f01',
    right: -12,
  },
  editContainer: {
    flex: 1,
  },
  editHeader: {
    color: '#be8f01',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing:5
  },
  titleContainer: {
    borderBottomWidth: 0,
    borderBottomColor: '#be8f01',
    marginBottom: 16,
  },
  editInput: {
    height: 50,
    fontSize: 24,
    backgroundColor: '#f9f9f9',
    color: '#333',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  titleSeparator: {
    height: 2,
    backgroundColor: '#be8f01',
  },
  editInputbody: {
    flex: 1,
    borderColor: '#be8f01',
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    color: '#333',
    textAlignVertical: 'top',
  },
  editButton: {
    backgroundColor: '#be8f01',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default EditNote;
