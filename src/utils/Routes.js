import React, {useState,useEffect} from 'react';
import Home from '../components/Home/Home';
import List from '../components/List/List';
import { createStackNavigator } from '@react-navigation/stack';
import listfunctions from '../components/List/redux/index';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();


const Routes = () => {
    const [all_contacts,setAllContacts] = useState([]);

    const dispatch = useDispatch();

    const get_all_contacts = useSelector(state => state.list.all_contacts);

    useEffect(()=>{
        //Dispatching actions to get all contacts on app load
        dispatch(listfunctions.get_all_contacts())
    },[])

    useEffect(() => {
        setAllContacts(get_all_contacts);
    }, [get_all_contacts])

    return(
       <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home"
            component={Home}
        />
        <Stack.Screen 
            name="Contacts" 
        >
            {props => <List {...props} contacts={all_contacts} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
}

export default Routes;