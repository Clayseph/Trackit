import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text} from 'react-native';
import {Form, Item, Input, Label, H2, Button} from 'native-base'
export default class AddExercise extends Component{

    constructor(){
        super();
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
        .then(response => response.json())
        .then(res =>{
            console.log('saved!!!!!!!!!!!')
        }); // parses response to JSON
    }

    render(){
        return(
            <View>
                <Form>
                    <H2 style={styles.title}>Add an Exercise</H2>
                    <Item stackedLabel>
                        <Label>Exercise Name</Label>
                        <Input onChangeText={this.updateName}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Sets</Label>
                        <Input onChangeText={this.updateSets}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Reps</Label>
                        <Input onChangeText={this.updateReps}/>
                    </Item>
                    <Item stackedLabel last>
                        <Label>Weight</Label>
                        <Input onChangeText={this.updateWeight}/>
                    </Item>
            </Form>
                <Button block style={styles.button} onPress={this.saveExercise}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title:{
      color:'grey',
      paddingLeft: 125,
      paddingTop: 20,
      width: Dimensions.get('window').width,
   },
    button:{
      marginTop: 50
    },
    buttonText:{
      color:'white'
    }
});