import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Content, Button } from 'native-base';

export default class Sidebar extends Component {
  render() {
    return (
          <Content style={styles.sidebar}>
              <Button full style={styles.button} onPress={this.props.exercisesButtonPress}>
                <Text style={styles.buttonText}>My Exercises</Text>
              </Button>  
              <Button full style={styles.button} onPress={this.props.addExerciseButtonPress}>
                <Text style={styles.buttonText}>Add Exercise</Text>
              </Button>   
              <Button full style={styles.button}>
                <Text style={styles.buttonText}>Dummy</Text>
              </Button>   
              <Button full style={styles.button}>
                <Text style={styles.buttonText}>Dummy</Text>
              </Button>           
          </Content>
    );
  }
}
const styles = StyleSheet.create({
    sidebar:{
      backgroundColor:'#fff',
      paddingTop: 50
    },
    button:{
      marginBottom: 5,
      height:75
    },
    buttonText:{
      color:'white'
    }
});
