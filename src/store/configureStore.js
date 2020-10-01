
import { createStore, combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import  listRestaurantReducer from './reducers/Reducers';

const rootReducer = combineReducers({
    listRestaurant: listRestaurantReducer,
});

const configureStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk, logger)));
};

const logger = createLogger();

export default configureStore;