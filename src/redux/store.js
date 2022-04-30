import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistCongif = {
      key : 'root',
      storage,
      whitelist : ['currentUser']
};

const persistedReducer = persistReducer(persistCongif, reducer);

export const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)) );
export const persistor = persistStore(store);
