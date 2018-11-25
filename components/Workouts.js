import React, { Component } from 'react';
import {View} from 'react-native'
export default class Workouts extends Component {
    constructor(){
        super();
        this.state={}
    }
    componentDidMount(){
        this.getWorkouts(this.props.userId);
    }
    getWorkouts = async (userId)  =>  {
        let workouts = await fetch('http://muscles.herokuapp.com/workouts/user', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({userId: userId}), // body data type must match "Content-Type" header
        });
        if(workouts){
            this.setState({
                workouts: await workouts.json()
            })
        }
    }
    getExercises(userId){
        return fetch('http://muscles.herokuapp.com/exercises/user', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify({userId: userId}), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(responseJson =>{
                if(responseJson){
                    this.setState({
                    responseJson: responseJson,
                    stage: 'exercises',
                    refreshing: false
                    });

                } else{
                    console.log('Get user exercises failed')
                }
            })
            .catch(error =>{
                console.log("Fetch Exercises Error",error)
            }); // parses response to JSON
        };
    
    render(){
        console.log(this.state.workouts)
        return(
            <View/>
        )
    }
}