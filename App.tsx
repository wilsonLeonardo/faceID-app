import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {isLogged} from './src/services/AuthService';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

const App = () => {
  const Stack = createStackNavigator();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    isLogged().then(res => {
      console.log(res), setLogged(res);
    });
  }, []);

  const UnloggedRoute = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Logged"
        component={LoggedRoute}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
  const LoggedRoute = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Unlogged"
        component={UnloggedRoute}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <UnloggedRoute />
    </NavigationContainer>
  );
};

export default App;
