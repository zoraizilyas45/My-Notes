
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <View style={styles.headerbox}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<Icon name="arrow-back" size={30} style={styles.backIcon}/>
</TouchableOpacity>
         <Text style={styles.headertext}>Back to Notes</Text>   
        </View>
        <View style={styles.editcontainer}>
      <Text style={{color:'green',fontWeight:'900',letterSpacing:3}}>Edit Note</Text>
      <TextInput
        style={styles.editInput}
        value={editedHeader}
        placeholder="Edit Title"
        onChangeText={(text) => setEditedHeader(text)}
      />
      <TextInput
        style={styles.editInputbody}
        value={editedBody}
        placeholder="Edit Body"
        onChangeText={(text) => setEditedBody(text)}
      />
      <TouchableOpacity style={styles.editButton} onPress={handleSave}>
        <Text style={{color:'white',fontWeight:'bold'}}>Save</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  headerbox:{
width:'100%',
height:'5%',
borderBottomColor:'green',
borderBottomWidth:1,
flexDirection:'row',
justifyContent:'space-between'

  },
  backIcon:{
color:'green'
  },
  headertext:{
textAlign:'center',
fontSize:20,
fontWeight:'900',
  },
  editcontainer:{
marginTop:10,
  },
  editInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    marginTop:10
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
