import React from 'react'
import {Text,View, StyleSheet, TouchableOpacity} from 'react-native'
import { Entypo, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

const ImageButtons=({navigation})=>{

    // function to navigate to company login form
    const handleGroupTeamButton=()=>{
        navigation.replace('ParentComp')     
    }

    // function to navigate to user form 
    const handleUserButton=()=>{
        console.log("yes its working")
    }
    
    return (
        <>
        <TouchableOpacity style={styles.container} onPress={handleGroupTeamButton}>
        <MaterialCommunityIcons name="account-group" style={styles.groupIcon}/>
        <Text style={styles.text}>Create Team Group</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUserButton}>
        <Entypo  name="users" style={styles.userIcon}/>
        <Text style={styles.text}>Users Login for group</Text>
        </TouchableOpacity>
        </>
    )
}

const styles= StyleSheet.create({
    groupIcon: {
        color: 'grey',
        margin: 30,
        fontSize: 160
    },
    container:{
        // flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 25,
        fontWeight: '400',
        alignSelf: 'center'
    },
    userIcon:{
        fontSize: 160,
        alignSelf: 'center',
        margin: 70,
        color: 'grey'
    }
})

export default ImageButtons;