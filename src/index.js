import React from "react";
import ReactDOM from "react-dom";
import App from "./main/App";
// redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
// redux-firease
import { createFirestoreInstance, reduxFirestore, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from 'firebase/app';
import firebaseConfig from "./components/firebase/firebaseConfig";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore })),
        reduxFirestore(firebaseConfig)
    )
);     
const rrfProps = {
    firebase,
    config: firebaseConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // needed if using firestore
}


ReactDOM.render( 
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>                           
            <App/> 
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector("#root")
);
