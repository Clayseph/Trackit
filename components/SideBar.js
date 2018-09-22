import React, { Component } from 'react';
import {
  Text, StyleSheet, Image, View,
} from 'react-native';
import { Content, Button } from 'native-base';
import barbell from '../static/barbell.png';

export default class Sidebar extends Component {
  render() {
    return (
          <Content style={styles.sidebar}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={barbell} />
              </View>
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
  button: {
    marginBottom: 5,
    height: 75,
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
  sidebar: {
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});
