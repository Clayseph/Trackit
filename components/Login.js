import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import barbell from '../static/barbell.png'

export default class Login extends Component {
    constructor(){
        super();
        this.state = {};
    }
    componentWillMount(){
        this.checkForRememberedLogin(); 
    }

    checkForRememberedLogin(){
        AsyncStorage.getItem("userId").then((res) => {
            this.props.saveUserId(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    updateUsername = (event) =>{
        this.setState({
            username: event
        })
    }
    updatePassword = (event) =>{
        this.setState({
            password: event
        })
    }

    login = () => {
        const user = {
            username: this.state.username, 
            password: this.state.password
        }
        return fetch('https://muscles.herokuapp.com/users/login', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(user), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(response =>{
            if(response){
                AsyncStorage.setItem("userId",response._id);
                this.props.saveUserId(response._id);
            } else{
                console.log('Login Failed')
            }
        })
        .catch(error =>{
            console.log("Error",error)
        }); // parses response to JSON
    }
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={barbell} />
              </View>
            <Form>
                <Item stackedLabel>
                    <Label>Username</Label>
                    <Input onChangeText={this.updateUsername} />
                </Item>
                <Item stackedLabel>
                    <Label>Password</Label>
                    <Input onChangeText={this.updatePassword} />
                </Item>
            </Form>
            <Button full style={styles.button} onPress={this.login}>
                <Text style={styles.buttonText}>Login</Text>
            </Button>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    paddingTop:40
  },
  button: {
    marginTop: 50,
    height: 50,
  },
  buttonText: {
    color: 'white',
  },
  image: {
    height: 150,
    width: 150,
  },
  imageContainer: {
    alignItems: 'center',
  },
});
