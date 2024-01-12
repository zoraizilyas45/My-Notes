const { configureStore } = require("@reduxjs/toolkit");
import NoteReducer from './notesSlice'

const MyStore=configureStore({
    reducer:{
     note:NoteReducer
    }
})

export default MyStore;