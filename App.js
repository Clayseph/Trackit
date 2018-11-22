import React from 'react';
import { StyleSheet, ScrollView, RefreshControl, AsyncStorage} from 'react-native';
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
      stage:''
    };
  }

  componentWillMount(){
    this.checkForRememberedLogin(); 
}

  onRefresh = () => {
    this.setState({refreshing: true})
    this.getWorkouts(this.state.userId);
  }

  getWorkouts(userId){
    return fetch('http://muscles.herokuapp.com/workouts/user', {
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
                console.log('Get user workouts failed')
            }
        })
        .catch(error =>{
            console.log("Fetch Workouts Error",error)
        }); // parses response to JSON
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
    this.getWorkouts(userId);
  }

  deleteUserId = () =>{
    AsyncStorage.removeItem('userId')
      .then(()=>{
        this.setState({
          userId: null,
          stage: 'login'
        });
        this.closeDrawer();
      });

  }

  checkForRememberedLogin(){
    AsyncStorage.getItem('userId').then((res) => {
      if(res){
        this.saveUserId(res);
      } else{
        this.setState({
          stage:'login'
        });
      }
    }).catch((err) => {
        console.log(err);
        this.setState({
          stage:'login'
        })
    });
}

  render() {
    return (
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={
            <Sidebar 
              exercisesButtonPress={this.openExercisesPage}
              addExerciseButtonPress={this.openConfigPage}
              logoutButtonPress={this.deleteUserId}
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
              <AddExercise userId={this.state.userId} returnFunction={this.openExercisesPage}/> : null} 
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
    height: 100
  },
  title: {
    fontSize: 28,
    color: 'white',
    justifyContent: 'center',
    paddingLeft: 30
  }
});
