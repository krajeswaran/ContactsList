import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

const Home = ({route,navigation}) =>  {
  const [selected_contact,setSelectedContact] = useState(null);

  //Checking if any selected contact is present (It will be found after the selection is made from the list component)
  useEffect(() => {
        if(route.params && route.params.confirmed_select){
            setSelectedContact(route.params.confirmed_select)
        }
  }, [route.params])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
            <View style={styles.select_button}>
                <Text style={styles.button_text}>
                    Select a Contact
                </Text>
            </View>
        </TouchableOpacity>

        {/*Displaying selected contact*/}
        {selected_contact && <View style={styles.selected_container}>
            <Text style={styles.select_contact_header}>
                Selected Contact
            </Text>
            <View style={styles.selected_content}>
                <Text style={styles.selected_title}>
                    {selected_contact.title} ::
                </Text>
                <Text style={styles.selected_number}>
                    {" " + selected_contact.phone_number.number}
                </Text>
            </View>
        </View>}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    select_button:{
        backgroundColor:'white',
        padding:10,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row'
    },
    button_text:{
        fontSize:16,
        fontWeight:'bold'
    },
    selected_container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        flex:2
    },
    selected_content:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:10
    },
    selected_title:{
        fontWeight:'bold',
        color:'blue',
        fontSize:15
    },
    selected_number:{
        fontWeight:'bold',
        color:'red',
        fontSize:15
    },
    select_contact_header:{
        fontSize:16
    }
})

export default Home;