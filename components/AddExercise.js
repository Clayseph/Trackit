import React, { Component } from 'react';
import { Text, } from 'react-native';
import {Form, Item, Input, Label} from 'native-base'
export default class AddExercise extends Component{

    updateWorkout = (event, ref) =>{
        console.log(event, ref)
    }

    render(){
        return(
            <Form>
                <Item stackedLabel>
                    <Label>Exercise Name</Label>
                    <Input ref={'name'} onChangeText={this.updateWorkout}/>
                </Item>
                <Item stackedLabel>
                    <Label>Sets</Label>
                    <Input/>
                </Item>
                <Item stackedLabel>
                    <Label>Reps</Label>
                    <Input/>
                </Item>
                <Item stackedLabel last>
                    <Label>Weight</Label>
                    <Input/>
                </Item>
          </Form>
        );
    }
}