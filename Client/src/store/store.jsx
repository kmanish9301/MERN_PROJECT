import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './saga/rootSaga';
import rootReducer from "./reducers/rootReducer";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create logger middleware
const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: false,
    duration: true,
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Only persist the auth reducer
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Combine all middlewares
const middlewares = [sagaMiddleware, loggerMiddleware];

// Create the Redux store with the persisted reducer
const store = createStore(
    persistedReducer, // Use persistedReducer instead of rootReducer
    applyMiddleware(...middlewares)
);

// Run the root saga
sagaMiddleware.run(rootSaga);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
