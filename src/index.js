import React from "react";
import ReactDOM from "react-dom";
import App from "./main/App";
import Loading from "./components/common/loading";
// redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from 'react-redux';
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
// redux-firease
import { createFirestoreInstance, reduxFirestore, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider, isLoaded  } from "react-redux-firebase";
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
    createFirestoreInstance, // needed if using firestore
    userProfile: "users", // where profiles are stored in database
    presence: "presence", // where list of online users is stored in database
    sessions: "sessions"
}


function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <Loading/>
        return children
}

ReactDOM.render( 
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>                        
                <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector("#root")
);
