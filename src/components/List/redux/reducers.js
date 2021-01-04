import { createReducer } from 'reduxsauce';
import {Types} from './actions';
 
//reducer declarations, using redux sauce, a handy way to write cumbersome reducers and actions boilerplate
export const INITIAL_STATE = { all_contacts:[] }

export const all_contacts = (state = INITIAL_STATE, action) => {
 
  return {...state, all_contacts:action.all_contacts }

}
 
export const HANDLERS = {

  [Types.ALL_CONTACTS]: all_contacts
  
}
 
export default createReducer(INITIAL_STATE, HANDLERS)