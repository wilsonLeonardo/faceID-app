import {AsyncStorage} from 'react-native';

export function isLogged() {
  return getUser().then(user => user !== null);
}

export async function getAccessToken() {
  let user: any = await AsyncStorage.getItem('AUTH_USER');

  if (!user) return null;

  user = JSON.parse(user);
  return user.object.token;
}

export async function getUser() {
  let user: any = await AsyncStorage.getItem('AUTH_USER');

  if (!user) return null;

  user = JSON.parse(user);

  return user;
}

export async function setAuthUser(loginRequest: any) {
  return await AsyncStorage.setItem('AUTH_USER', JSON.stringify(loginRequest));
}

export async function setBeforeUser(loginRequest: any) {
  return await AsyncStorage.setItem(
    'BEFORE_USER',
    JSON.stringify(loginRequest),
  );
}

export async function getBeforeUser() {
  let user: any = await AsyncStorage.getItem('BEFORE_USER');

  if (!user) return null;

  user = JSON.parse(user);

  return user;
}

export async function logout() {
  return (
    await AsyncStorage.removeItem('AUTH_USER'),
    await AsyncStorage.removeItem('BEFORE_USER')
  );
}
