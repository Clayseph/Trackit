import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Header, Left, Icon, Button, Container, Body, H2, Drawer } from 'native-base';

import Card from './components/Card';
import Sidebar from './components/SideBar';

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
      this.setState({responseJson}) 
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

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar/>}
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
          {this.state.responseJson ? 
              <Card workouts={this.state.responseJson}/> : null}
               
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
    height: 80,
  },
  title: {
    fontSize: 32,
    color: 'white',
    justifyContent: 'center'
  }
});
