import { createSlice } from "@reduxjs/toolkit";

export const NotesSlice =createSlice({
    name:'Notes',
    initialState:{
        data:[]
    },
    reducers:{
        addNote: (state, action) => {
            state.data.push(action.payload);
          },
          deleteNote: (state, action) => {
            state.data = state.data.filter((note, index) => index !== action.payload);
          },
          setNotes: (state, action) => {
            state.data = action.payload;
          },
          updateNote: (state, action) => {
            const { index, updatedNote } = action.payload;
            state.data[index] = updatedNote;
          },
        
        
          
      
    }
})

export const {addNote,deleteNote,setNotes,updateNote}= NotesSlice.actions
export default NotesSlice.reducer