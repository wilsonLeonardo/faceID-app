import React, {useEffect, useState} from 'react';
import {Text, Alert} from 'react-native';
import {
  Header,
  Container,
  Body,
  Content,
  Item,
  Input,
  Form,
  Button,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {
  setAuthUser,
  setBeforeUser,
  getBeforeUser,
} from '../services/AuthService';
import HttpService from '../services/HttpService';
import TouchID from 'react-native-touch-id';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [alreadyLog, setAlreadyLog] = useState(false);
  const [credentialsLog, setCredentialsLog] = useState({
    email: '',
    password: '',
    username: '',
  });

  const {navigate} = useNavigation();

  useEffect(() => {
    getBeforeUser().then(data => {
      if (data) {
        setAlreadyLog(true);
        setCredentialsLog(data.credentials);
        setCredentialsLog(state => ({...state, username: data.name}));
        setCredentials(state => ({...state, email: data.credentials.email}));
      }
    });
  }, []);

  function login() {
    if (credentials.email === '')
      return Alert.alert('Erro', 'Preencha o seu email!');
    if (credentials.password === '')
      return Alert.alert('Erro', 'Preencha a sua senha!');
    HttpService.login(credentials)
      .then(data => {
        setBeforeUser({credentials, name: data.user.username});

        setAuthUser(data).then(() => navigate('Logged'));
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Login', error.response.data[0].message);
      });
  }

  const optionalConfigObject = {
    title: 'Authentication Required',
    color: '#e00606',
    fallbackLabel: 'Show Passcode',
  };

  function pressHandler() {
    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    ).then(() => {
      navigate('Logged');
    });
  }

  return (
    <Container>
      <Header>
        <Body>
          <Text style={{fontSize: 20}}>Login</Text>
        </Body>
      </Header>
      <Content contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        {!alreadyLog ? (
          <Form style={{paddingHorizontal: 10, bottom: 50}}>
            <Item>
              <Input
                autoCapitalize="none"
                value={credentials.email}
                onChangeText={text =>
                  setCredentials(state => ({...state, email: text}))
                }
                placeholder="Email"
              />
            </Item>
            <Item style={{top: 10}}>
              <Input
                value={credentials.password}
                onChangeText={text =>
                  setCredentials(state => ({...state, password: text}))
                }
                secureTextEntry={true}
                placeholder="Password"
              />
            </Item>
            <Button
              block
              style={{top: 50, paddingHorizontal: 50}}
              onPress={login}>
              <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
            </Button>
          </Form>
        ) : (
          <Form
            style={{
              paddingHorizontal: 10,
              bottom: 50,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, bottom: 40}}>
              Olá de volta {credentialsLog.username}
            </Text>
            <Item style={{top: 10}}>
              <Input
                value={credentials.password}
                onChangeText={text =>
                  setCredentials(state => ({...state, password: text}))
                }
                // secureTextEntry={true}
                placeholder="Password"
              />
            </Item>
            <Button
              block
              style={{top: 50, paddingHorizontal: 50}}
              onPress={login}>
              <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
            </Button>
            <Button
              block
              style={{top: 100, paddingHorizontal: 50}}
              onPress={pressHandler}>
              <Text style={{fontSize: 18, color: 'white'}}>
                Login with Touch ID or FaceID
              </Text>
            </Button>
          </Form>
        )}
      </Content>
    </Container>
  );
};

export default Login;
