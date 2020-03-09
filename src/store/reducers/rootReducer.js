import { combineReducers } from 'redux';
// Combine all reducers files with rootReducer 
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import lessonReducer from "./lessonReducer";
import cardReducer from "./cardReducer";
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from "redux-firestore"

// stateName : stateData
const rootReducer = combineReducers({
    auth: authReducer,
    test: testReducer,
    lesson: lessonReducer,
    card: cardReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;