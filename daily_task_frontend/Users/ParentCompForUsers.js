import React, {useEffect} from 'react'
import {AsyncStorage, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import UserSignUp from './UserSignUp'
import UserLogIn from './UserLogIn'


  
const ParentCompForUsers=(props)=>{

const handleSignUp=()=>{
    fetch(`http://${props.company}.lvh.me:3000/users`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            first_name: props.first_name,
            last_name: props.last_name,
            company: props.company,
            email: props.email,
            password: props.password
        })
     })
    .then(resp => resp.json())
    .then(data => { console.log(data)
    
        if (!data.hasOwnProperty("errors")) {
            props.handleCurrentUser(data)
            fetchingOwner()
            props.handleTabps()
            props.handleCurrentUserId(data.user.id)
            saveDataToPhone(data)
            props.navigation.replace("tasks")

        } else {
            console.log("After sign up",data);
            alert(data.errors)
         }
          }  )   
 }

 const handleLogIn=()=>{
    fetch(`http://${props.company}.lvh.me:3000/user_login`,{
        method: 'POST',
        headers:{
           'Content-Type': 'application/json',
           Accept: 'application/json'
       },
       body: JSON.stringify({
           company: props.company,
           email: props.email,
           password: props.password
       })
    })
    .then(resp => resp.json())
    .then(data => {
    if (!data.hasOwnProperty("errors")) {
        props.handleTabps()
        fetchingOwner()
        props.handleCurrentUser(data)
        props.handleCurrentUserId(data.user.id)
        saveDataToPhone(data)
      props.navigation.replace("tasks")

    } else {
        console.log("After Login",data);
        alert(data.errors)
    }
    }
    )
    .catch(function(error) {
        alert("Something went wrong");
        console.log('wtf',error);
      })
 }


 //  save Owner id tostorage phone
 const saveDataToPhone=(data)=>{
    // let num  = id
    // let str  = num.toString()
    AsyncStorage.setItem("ownerId", data.user.owner.id.toString())
    AsyncStorage.setItem("user_id", data.token)
    AsyncStorage.setItem("company_name", data.user.owner.subdomain)
}

// fetching auto login base on localstage
useEffect(()=>{
    fetchAutoLogin()
  },[props.handleCurrentUserId]) 


const fetchAutoLogin = async () => {
    try {
       value = await AsyncStorage.getItem('user_id');
      subdomain = await AsyncStorage.getItem('company_name');
      if (value !== null && subdomain !== null) {
        fetch(`http://${subdomain}.lvh.me:3000/user_auto_login`,{
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': value
          }
        })
        .then(resp=> resp.json())
        .then(data=> { 
          props.handleCurrentUser(data)
          fetchingOwner()
          props.handleCurrentUserId(data.user.id)
        })
      props.navigation.replace("tasks")
    //   props.navigation.replace("Home")

      }
    } catch (error) {
      alert("something went wrong")
      console.log(error);
    }
  }

  const fetchingOwner= async ()=>{
    try {
    let ownerId=  await AsyncStorage.getItem('ownerId')
    let subdomain = await AsyncStorage.getItem('company_name')
     await fetch(`http://${subdomain}.lvh.me:3000/owners/${ownerId}`)
     .then(resp=> resp.json())
     .then(data => {props.handleCurrentOwner(data) }
     )
    } catch (error) {
        console.log('fetching owner', error);
    }
}



    return (
        <View style={styles.container}>
            {props.displaylogin === false 
            ? 
            <UserSignUp handleSignUp={handleSignUp}/>
            :
            <UserLogIn handleLogIn={handleLogIn}/>
        }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mps=(state)=>{
return {
    first_name: state.first_name,
    last_name: state.last_name,
    password: state.password,
    email: state.email,
    company: state.company,
    displaylogin: state.displaylogin
}
}

const mpss=(dispatch)=>{
    return {
        handleCurrentUser:(e)=>{
            dispatch({
                type: "current",
                payload: {currentUser: e}
            })
        },
        handleCurrentUserId:(e)=>{
            dispatch({
                type: 'currentUserId',
                playload: {currentUserId: e}
            })
        },
        handleTabps: () =>{
            dispatch({type: "tabvisible"})
        },
        handleCurrentOwner:(e)=>{
            dispatch({
                type:'currentOwner',
                payload: {currentOwner: e}
            })
        }
    }
}

export default connect(mps, mpss)(ParentCompForUsers);