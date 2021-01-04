import listReducer from '../components/List/redux/reducers';

import { resettableReducer } from 'reduxsauce';
import { createStore, applyMiddleware,compose,combineReducers  } from 'redux';
import thunk from 'redux-thunk';

//Reducer and store declarations
//Composed with thunk in order to allow async functions in actions

const RESET_ACTION = 'RESET_STORE';
const resettable = resettableReducer(RESET_ACTION);

const contactsList = combineReducers({
	list:resettable(listReducer)
})

const composeEnhancers = compose;

const store = createStore(contactsList,composeEnhancers(applyMiddleware(thunk)))

export const resetStores = () => store.dispatch({type: RESET_ACTION});


export default store