import { combineReducers } from 'redux';
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from "redux-firestore"
import authReducer from "./authReducer";
import lessonReducer from "./lessonReducer";
import cardReducer from "./cardReducer";

// stateName : stateData
const rootReducer = combineReducers({
    auth: authReducer,
    lesson: lessonReducer,
    card: cardReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;