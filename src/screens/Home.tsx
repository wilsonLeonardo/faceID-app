import React, {useEffect, useState} from 'react';
import {Text, Alert} from 'react-native';
import {Header, Container, Body, Content, Footer, Button} from 'native-base';
import {getUser, logout} from '../services/AuthService';
import {CommonActions} from '@react-navigation/native';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'Unlogged'}],
});

const Home = (props: any) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser().then(user => setUser(user));
  }, []);

  function sairConta() {
    Alert.alert('Sair', 'Você tem certeza que deseja sair?', [
      {
        text: 'Sim',
        onPress: () =>
          logout().then(() => props.navigation.dispatch(resetAction)),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }

  return (
    <Container>
      <Header>
        <Body>
          <Text style={{fontSize: 20}}>Home</Text>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          Olá {`${user?.user?.username}`}, seja bem vindo!!
        </Text>
      </Content>
      <Footer style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button transparent onPress={sairConta}>
          <Text style={{fontSize: 20, color: 'red'}}>Sair</Text>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
