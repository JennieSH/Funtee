import { combineReducers } from 'redux';
// Combine all reducers files with rootReducer 
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    test: testReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;