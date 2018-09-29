import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Form, Item, Input, Label, Button} from 'native-base'
export default class AddExercise extends Component{

    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.setInitialFormState();
    }
    setInitialFormState(){
        this.setState({
                name:'',
                sets:'',
                reps:'',
                weight:''
        })
    }
    updateName = (event) =>{
        this.setState({
            name: event
        })
    }
    updateSets = (event) =>{
        this.setState({
            sets: event
        })
    }
    updateReps = (event) =>{
        this.setState({
            reps: event
        })
    }
    updateWeight = (event) =>{
        this.setState({
            weight: event
        })
    }

    saveExercise = () => {
        const exercise = {
            userId: this.props.userId,
            name: this.state.name, 
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight
        }
        return fetch('https://muscles.herokuapp.com/workouts/add', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(exercise), // body data type must match "Content-Type" header
        })
        // .then(response => response.json())
        .then(response =>{
            this.props.returnFunction();
        })
        .catch(error =>{
            console.log("Error",error)
        }); // parses response to JSON
    }

    render(){
        return(
            <View>
                <Form>
                    <Item stackedLabel>
                        <Label>Exercise Name</Label>
                        <Input onChangeText={this.updateName}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Sets</Label>
                        <Input keyboardType={'numeric'} onChangeText={this.updateSets}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Reps</Label>
                        <Input keyboardType={'numeric'} onChangeText={this.updateReps}/>
                    </Item>
                    <Item stackedLabel last>
                        <Label>Weight</Label>
                        <Input keyboardType={'numeric'} onChangeText={this.updateWeight}/>
                    </Item> 
                </Form>
                <Button full style={styles.button} onPress={this.saveExercise}>
                    <Text style={styles.buttonText}>Save Exercise</Text>
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button:{
      marginTop: 50,
      height:50
    },
    buttonText:{
      color:'white'
    }
});