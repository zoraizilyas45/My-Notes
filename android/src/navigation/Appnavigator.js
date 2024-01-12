import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import Home from '../screens/Home';
import Note from '../screens/Note';
import NoteDetail from '../screens/NoteDetail';
import EditNote from '../screens/EditNote';

const Stack = createStackNavigator();

function MyStack() {
    
  return (
    
    
    <Stack.Navigator
    screenOptions={{
      headerShown: false
  }}
    initialRouteName='Signin'
    >
      
        
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Note" component={Note}/>
      <Stack.Screen name="NoteDetail" component={NoteDetail}/>
      <Stack.Screen name="EditNote" component={EditNote}/>
     
    </Stack.Navigator>
  );
}
export default MyStack