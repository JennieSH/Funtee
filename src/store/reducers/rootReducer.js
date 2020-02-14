import { combineReducers } from 'redux';
// Combine all reducers files with rootReducer 
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import symbolReducer from "./symbolReducer";
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from "redux-firestore"

// stateName : stateData
const rootReducer = combineReducers({
    auth: authReducer,
    test: testReducer,
    symbol: symbolReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;