import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, Left, Icon, Button, Container, Body, Title } from 'native-base';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={stage:'config'};
  }
  render() {
    return (
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='menu'/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.title}>Trackitt</Text>
            </Body>
          </Header>
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
