import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Spinner, Header, Left, Icon, Button, Container, Body, H2, Drawer } from 'native-base';

import Card from './components/Card';
import Sidebar from './components/SideBar';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={};
  }
  componentWillMount(){
   this.getWorkouts();
  }

  getWorkouts(){
    fetch('https://muscles.herokuapp.com/workouts/')
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        responseJson,
        stage: 'exercises'
      }) 
      console.log('got it')
    }) // parses response to JSON
    .catch((error)=>{
      console.log('Fetch Error',error);
    })
  };
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  openConfigPage = () => {
    this.closeDrawer();
    this.setState({stage: 'addExercise'})
  }

  openExercisesPage = () => {
    this.closeDrawer();
    this.setState({stage: 'exercises'})
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={
          <Sidebar 
            exercisesButtonPress={this.openExercisesPage}
            addExerciseButtonPress={this.openConfigPage}
          />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header style={styles.header}>
            <Left>
              <Button transparent onPress={ ()=> this.openDrawer()}>
                <Icon name='menu'/>
              </Button>
            </Left>
            <Body style={styles.body}>
              <H2 style={styles.title}>Trackkit</H2>
            </Body>
          </Header>
          {this.state.responseJson ? null : <Spinner/>}
          {this.state.stage && this.state.stage == 'exercises' ? 
              <Card workouts={this.state.responseJson}/> : null}
          {this.state.stage == 'addExercise' ? 
          <Text>WAHHHHHHHHHHHHHHHHHHHT</Text> : null} 
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 70,
    paddingTop:25
  },
  title: {
    fontSize: 28,
    color: 'white',
    justifyContent: 'center',
    paddingLeft: 30
  }
});
