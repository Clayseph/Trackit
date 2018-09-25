import React from 'react';
import { StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Header, Left, Icon, Button, Container, Body, H2, Drawer } from 'native-base';

import AddExercise from './components/AddExercise';
import Card from './components/Card';
import Login from './components/Login';
import Sidebar from './components/SideBar';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      refreshing: true,
      stage:'login'
    };
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    this.getWorkouts();
  }

  getWorkouts(){
    fetch('https://muscles.herokuapp.com/workouts/')
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        responseJson: responseJson,
        stage: 'exercises',
        refreshing: false
      }) 
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
    this.setState({
      stage: 'addExercise',
    });
  }

  openExercisesPage = () => {
    this.closeDrawer();
    this.onRefresh();
    this.setState({
      stage: 'exercises'
    });
  }

  saveUserId = (userId) =>{
    this.setState({
      userId: userId
    });
    this.getWorkouts();
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
        {this.state.stage === 'login' ? <Login saveUserId={this.saveUserId}/> : 
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
            }
            {this.state.stage == 'exercises' ? 
            <ScrollView
              refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}/>
                }>
              <Card workouts={this.state.responseJson} refresh={this.onRefresh}/> 
            </ScrollView>
                  : null}
              {this.state.stage == 'addExercise' ? 
              <AddExercise returnFunction={this.openExercisesPage}/> : null} 
          </Container>
        </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingTop:10
  },
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
    height: 70
  },
  title: {
    fontSize: 28,
    color: 'white',
    justifyContent: 'center',
    paddingLeft: 30
  }
});
