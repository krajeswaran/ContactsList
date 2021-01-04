import {Creators} from './actions';
import Contacts from 'react-native-contacts';
import {matchSorter} from 'match-sorter';
import { PermissionsAndroid, Platform } from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const all_contacts = Creators.all_contacts;

const get_all_contacts = () => {

	return dispatch => {

        //Async action performed to get all contacts and update app store
        //Permissions behave differently for Android and iOS hence declared separately
        //Action is being dispatched with all contacts results

        const get_contact_permissions_android = () => {

          check(PERMISSIONS.ANDROID.READ_CONTACTS)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
      request(
                    PERMISSIONS.ANDROID.READ_CONTACTS
                ).then(req_result=>{
                    if(req_result === 'granted'){
                        Contacts.getAll().then(contacts => {
            
                            //Sorting with full name, is what will be used for display order and search
                            let _contacts = contacts.map(obj=> ({ ...obj, fullName: obj.givenName + " " + obj.familyName })); 
                
                            dispatch(all_contacts(matchSorter(_contacts, '', {keys: ['fullName']})));  
                          })                           
                    }
                    else{
                        alert("The app requires your permission to read contacts")
                    }
                });
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      console.log("Permissions error",error)
    });              
    }

    if(Platform.OS === 'ios'){
        Contacts.getAll().then(contacts => {
            // contacts returned

            //Contacts are being mapped through to add another full name field
            let _contacts = contacts.map(obj=> ({ ...obj, fullName: obj.givenName + " " + obj.familyName })); 

            //Sorting based on the name of the full field
            dispath(all_contacts(matchSorter(_contacts, '', {keys: ['fullName']}))); 
          })   
      }
      else{
        //Permissions from Android to read contacts
        try{
            get_contact_permissions_android();
        }
        catch(e){
            console.log(e)
        }
      }
	}

};

export default { get_all_contacts }