import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image,KeyboardAvoidingView, Alert} from 'react-native'
import firebase from 'firebase'

export default class LoginScreen extends React.Component{
constructor(){
    super();
    this.state = {
        emailID :'',
        password:''
    }
}
login = async(email,password)=>{
    if(email&&password){
        try{
            const response = firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
                this.props.navigation.navigate('NewDonor')
            }
        }
        catch(error){
            switch(error.code){
            case 'auth/user-not-found':Alert.alert("User Does Not Exist")
            break;
            case 'auth/invalid-email':Alert.alert("Incorrect User Name")
            break;
            }
        }
    }
    else{
        Alert.alert("Enter Email And Password")
    }
}
render(){
    return(
        <KeyboardAvoidingView style={{alignItems:'center',marginTop:20,}}>
            <View>
                <Image source={require("../assets/blood.jpg")}style={{width:200,height:200}}/><Text style={{textAlign:'center',fontSize:30}}>Blood Donation</Text>
            </View>
            <View>
                <TextInput style={styles.loginBox}placeholder="abc@example.com"keyboardType='email-address'onChangeText={(text)=>{this.setState({
                    emailID:text
                })}}></TextInput>
                 <TextInput style={styles.loginBox}placeholder="Password"secureTextEntry={true} onChangeText={(text)=>{this.setState({
                    password:text
                })}}></TextInput>
            </View>
            <View>
                <TouchableOpacity style={[styles.button,{marginTop:20,marginBottom:20}]}onPress={()=>{this.login(this.state.emailID,this.state.password)}}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
}
const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#EEAD0E'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"white",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'black',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
      flex:1,
      alignItems:'center'
    }
})
