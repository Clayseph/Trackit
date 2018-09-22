import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableNativeFeedback,
} from 'react-native';
import { Input, Item, Button } from 'native-base';

export default class DrawerExample extends Component {
  constructor(){
    super();
    this.state = {}
  }

  deleteCard = (id) => {
    return fetch('https://muscles.herokuapp.com/workouts/remove', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({_id: id}), // body data type must match "Content-Type" header
    })
    .then(res => {
      console.log(res.status)
      this.props.refresh();
    })
};

editExercise = (id) => {
  this.setState({
    edit: true,
    editId: id
  });
}

updateSets = (event) => {
  this.setState({
    editSets: event
  });
}
updateReps = (event) => {
  this.setState({
    editReps: event
  });
}
updateWeight = (event) => {
  this.setState({
    editWeight: event
  });
}

updateExercise = (id) => {
  console.log(this.state,'state')
  let exercise = {
        _id: id,
        reps: this.state.editReps,
        sets: this.state.editSets,
        weight: this.state.editWeight
  }
  console.log('exercise',exercise)
  return fetch('https://muscles.herokuapp.com/workouts/update', {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify( exercise ), // body data type must match "Content-Type" header
    })
    .then(response => response.json)
    .then(res => {
      console.log(res, 'WATTTTTT')
      this.props.refresh();
      this.setState({edit: false})
    })
    .catch(error => {
      console.log(error ,'ERROR')
    })
}

  render() {
    return (
        <View>
          {this.props.workouts.map((workout, id) =>
            <TouchableNativeFeedback key={id} onLongPress={() => this.editExercise(workout._id)}>
                <View style={styles.card}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                    {this.state.edit && this.state.editId === workout._id ?
                    <View>
                      <View style={styles.inputRow}>
                        <Item fixedLabel style={styles.input}>
                          <Input keyboardType={'numeric'} placeholder={`${workout.sets}`} onChangeText={this.updateSets}/>
                          <Text>sets</Text>
                        </Item>
                        <Item fixedLabel style={styles.input}>
                          <Input keyboardType={'numeric'} placeholder={`${workout.reps}`} onChangeText={this.updateReps}/>
                          <Text>reps</Text>
                        </Item>
                        <Item fixedLabel style={styles.input}>
                          <Input keyboardType={'numeric'} placeholder={`${workout.weight}`} onChangeText={this.updateWeight}/>
                          <Text>weight</Text>
                        </Item>
                      </View> 
                      <Button full style={styles.button} onPress={()=> this.updateExercise(workout._id)}>
                        <Text style={styles.buttonText}>Update</Text>
                      </Button>
                    </View> 
                  :
                  <View style={styles.row}>
                    <Text style={styles.content}>{workout.sets} sets</Text>
                    <Text style={styles.content}>{workout.reps} reps</Text>
                    <Text style={styles.content}>{workout.weight}lbs</Text>
                  </View>
                  }
                </View>
            </TouchableNativeFeedback>)}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    flex:1,
    marginTop: 10,
    height:50
  },
  buttonText:{
    color:'white'
  },
  card: {
    alignItems: 'stretch',
    padding: 10,
    margin: 2,
    backgroundColor: 'lightgrey',
    borderColor: 'grey',
    borderWidth: 3,
  },
  content: {
    fontSize: 22,
    padding: 2,
  },
  input:{
    width:100,
    height:70
  },
  inputRow:{
    backgroundColor:'#fff',
    flex:1,
    flexDirection:'row',
    height:75,
    justifyContent:'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderWidth: 3,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  workoutName: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
