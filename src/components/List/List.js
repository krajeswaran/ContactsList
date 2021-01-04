import React, {useState, useEffect, useRef} from 'react';
import {
    SafeAreaView,
    Text,
    FlatList,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { SearchBar } from 'react-native-elements';
import {matchSorter} from 'match-sorter';


//Component for each contact that gets rendered
const Contact = ({
    title,
    phone_numbers,
    userpic,
    navigation
}) => {
    const [modalVisible,setModalVisible] = useState(false);
    const [selected_contact,setSelectedContact] = useState(null);

    const [pickerval,setPickerVal] = useState(0);
    const [multiple,setMultiple] = useState(false);

    //First selection of a contact
    const selectContact = (title,phone_numbers) => {
        //If there are no phone numbers present then the contact is not processed further
        if(phone_numbers.length > 0){
            const selected_obj = {title:title,phone_numbers:phone_numbers}
            setSelectedContact({...selected_obj});
            if(phone_numbers.length > 1){
                setMultiple(true);
            }
            setModalVisible(true);
        }
        else{
            alert("This contact does not have any phone number")
        }
    }

    //Confirming the selection
    const confirmSelection = () => {
        setModalVisible(false);
        const selected_obj = {title:selected_contact.title,phone_number:selected_contact.phone_numbers[pickerval]}
        navigation.navigate('Home',{confirmed_select:selected_obj})
    }

    return(
        <>
        {/* Modal view for confirming the selection and selecting from multiple numbers if any */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{selected_contact ? selected_contact.title : ''}</Text>

                {selected_contact ?
                    <View style={styles.selected_contact_numbers}>

                        {/*If the phone numbers are multiple, a picker option is opened below for selection 
                        if not then, the user can directly confirm their selection of the contact */}
                        {phone_numbers.map((phone_no,index) =>(
                            <View key={index} style={styles.phone_container}>
                                <Text style={styles.selected_contact_title}>
                                    {phone_no.label ? phone_no.label[0].toUpperCase() + phone_no.label.slice(1) : ''}
                                </Text>
                                <Text style={styles.selected_contact_content}>
                                    {phone_no.number}
                                </Text>
                            </View>
                        ))}
                        {multiple && <Text style={styles.multipleAlert}>Note: Contact has multiple numbers, select one before confirming selection</Text>}
                        {multiple && <Picker
                            selectedValue={pickerval}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue, itemIndex) =>
                                setPickerVal(itemIndex)
                            }>
                            {phone_numbers.map((phone_no,index) =>(
                                <Picker.Item key={index} label={phone_no.number} value={index} />
                            ))}
                        </Picker>}
                    </View> :
                    <Text>
                    </Text>
                }
                {/* Confirm Selection and Close Modal Buttons */}
                <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop:30 }}
                    onPress={() => {
                        confirmSelection();
                    }}
                    >
                    <Text style={styles.textStyle}>Confirm Selection</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop:20 }}
                onPress={() => {
                    setModalVisible(!modalVisible);
                    setMultiple(false);
                }}
                >
                <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>

        {/* Singular contact view */}
        <TouchableOpacity onPress={()=>selectContact(title,phone_numbers)}>
            <View style={styles.contact_item}>
                <View style={styles.contact_container}>
                    <View style={styles.image_container}>
                        <Image style={styles.contact_image} source={{uri:userpic}} />
                    </View>
                    <Text style={styles.contact_title}>
                        {title}
                    </Text>
                </View>
                <View style={styles.top_spacing}>
                    {phone_numbers.map((phone_no,index)=>(
                        <View key={index} style={styles.phone_container}>
                            <Text style={styles.selected_contacted_title}>
                                {phone_no.label ? phone_no.label[0].toUpperCase() + phone_no.label.slice(1) : ''}
                            </Text>
                            <Text style={styles.selected_contact_content}>
                                {phone_no.number}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
        </>
    )
}

const List = ({contacts,navigation}) => {

    const [searchval,setSearchVal] = useState('');
    const [filtered,setFiltered] = useState([]);

    //rendering each item from flatlist
    const renderItem = ({item}) => (
        <Contact 
            title={item.fullName} 
            phone_numbers={item.phoneNumbers} 
            userpic={item.hasThumbnail ? item.thumbnailPath : 'https://thepeakid.com/wp-content/uploads/2016/03/default-profile-picture-300x300.jpg'}
            navigation={navigation}
        />
      );

    const updateSearchText = (val) => {
        setSearchVal(val)
    }

    useEffect(() => {
        if(searchval.length > 0){
            //This is the search functionality, where the input length if available, the array is sorted/searched through using the
            //fullName key, and results are displayed accordingly
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
            setFiltered(matchSorter(contacts, searchval, {keys: ['fullName']}))
        }
    }, [searchval])


    const flatListRef = useRef();

    //ref to flatlist has been declared to resume its position from the top when something gets searched

    //Optimisation for flat list has been used with getItemLayout, to give a fixed height to each item when listing
    //Helps in cases of hundreds of rows of data

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <SearchBar
                    placeholder="Search by Name ..."
                    onChangeText={updateSearchText}
                    value={searchval}
                    lightTheme={true}
                />
                {contacts.length > 0 ? 
                    <FlatList
                        ref={flatListRef}
                        keyboardShouldPersistTaps='always'
                        data={filtered.length > 0 ? filtered : contacts}
                        renderItem={renderItem}
                        keyExtractor={item => item.recordID}
                        initialNumToRender={5}
                        style={styles.flat_list}
                        getItemLayout={(data, index) => (
                            {length: 150, offset:150 * index, index}
                        )}
                    /> :
                    <Text style={{marginTop:20, textAlign:'center'}}>
                        No contacts are present
                    </Text>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   contact_item:{
       backgroundColor:'white',
       marginTop:5,
       marginBottom:10,
       marginLeft:10,
       marginRight:10,
       borderColor:'lightgrey',
       borderWidth:1,
       borderStyle:'solid',
       padding:12,
       height:150
   },
   phone_container:{
       display:'flex',
       flexDirection:'row',
       marginTop:2
   },
   contact_image:{
       height:50,
       resizeMode:'contain'
   },
   container:{
       backgroundColor:'#f8f8f8',
       marginBottom:20,
       flex:1
   },
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight:'bold'
  },
  selected_contact_numbers:{
      justifyContent:'center',
      alignItems:'center'
  },
  selected_contacted_title:{
      fontWeight:'bold',
      fontSize:13
  },
  selected_contact_content:{
      marginLeft:5,
      fontSize:13
  },
  multipleAlert:{
      fontSize:11,
      color:'red',
      marginTop:30,
      textAlign:'center',
      fontWeight:'bold'
  },
  contact_container:{
      display:'flex',
      justifyContent:'flex-start',
      flexDirection:'row',
      alignItems:'center'
  },
  contact_title:{
      fontSize:16,
      fontWeight:'bold',
      marginLeft:12
  },
  top_spacing:{
      marginTop:10
  },
  image_container:{
    height:50,
    width:50
  },
  pickerStyle:{
      width:200
  },
  flat_list:{
      marginBottom:20
  }
})

export default List;