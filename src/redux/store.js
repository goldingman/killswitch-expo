import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const middleware = [thunk];

const persistConfig = {
    key: "killswitch",
    storage: AsyncStorage,
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(...middleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// persistor.purge();
// Exports
export { store, persistor };
