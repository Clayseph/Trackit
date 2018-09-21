import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableNativeFeedback,
} from 'react-native';

export default class DrawerExample extends Component {
  deleteCard = (id) => {
    console.log(id)
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

  render() {
    return (
        <View>
          {this.props.workouts.map((workout, id) =>
            <TouchableNativeFeedback key={id} onLongPress={() => this.deleteCard(workout._id)}>
                <View style={styles.card}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <View style={styles.row}>
                    <Text style={styles.content}>{workout.sets} sets</Text>
                    <Text style={styles.content}>{workout.reps} reps</Text>
                    <Text style={styles.content}>{workout.weight}lbs</Text>
                  </View>
                </View>
            </TouchableNativeFeedback>)}
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
