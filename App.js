import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, Left, Icon, Button, Container, Body, Title } from 'native-base';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={stage:'config'};
  }
  componentDidMount(){
   this.getWorkouts();
  }

  getWorkouts(){
    fetch('https://muscles.herokuapp.com/workouts/')
    .then((response) => response.json())
    .then((responseJson)=>{
      console.log(responseJson)
      this.setState({responseJson}) 
    }) // parses response to JSON
    .catch((error)=>{
      console.log('Fetch Error',error);
    })
  };

  render() {
    console.log('turtles')
    return (
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='menu'/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.title}>Trackkit</Text>
            </Body>
          </Header>
          {this.state.responseJson ? 
              <Text style={styles.container }>{this.state.responseJson[0].name}</Text> : null}
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    justifyContent: 'center'
  }
});
