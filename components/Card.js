import React, {Component } from 'react'
import {StyleSheet, ScrollView, View, Text} from 'react-native'

export default class DrawerExample extends Component {
    render() {
      return (
        <View>
          {this.props.workouts.map((workout,id) =>
              <View style={styles.card} key={id}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <View  style={styles.row}>
                  <Text style={styles.content}>{workout.sets} sets</Text>
                  <Text style={styles.content}>{workout.reps} reps</Text>
                  <Text style={styles.content}>{workout.weight}lbs</Text>
                </View>
              </View>
          )}
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    card:{
      alignItems: 'stretch',
      padding: 10,
      backgroundColor: 'lightblue',
      borderColor: 'white',
      borderWidth: 3
    },
    content:{
      fontSize: 22,
      padding:2,
    },
    row:{
      backgroundColor: '#aaa',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      borderWidth: 3,
      borderColor: 'white'
    },
    workoutName:{
      alignSelf:'center',
      fontSize:22,
      fontWeight: 'bold'
    }
  });