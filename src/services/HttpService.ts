import queryString from 'query-string';
import axios from 'axios';
import _ from 'lodash';

axios.defaults.baseURL = 'https://f7682e24b89a.ngrok.io';

function parse(path: any, params: any) {
  _.forEach(
    params,
    (value: any, key: any) => (path = _.replace(path, '{' + key + '}', value)),
  );

  let queryParams: any = {};

  _.forEach(params, (value: any, key: any) => {
    if (key[0] === '@') {
      const queryParamKey = _.replace(key, '@', '');
      queryParams[queryParamKey] = value;
    }
  });

  if (!_.isEmpty(queryParams)) {
    path += '?' + queryString.stringify(queryParams);
  }

  return path;
}

export default class HttpService {
  static insert(path: any, data: any, params = {}) {
    return axios
      .post(parse(path, params), data)
      .then(response => response.data);
  }
  static login(credentials: any) {
    const headers = {'WWW-Authenticate': 'Basic realm=localhost'};
    return axios
      .post('sessions', credentials, {headers})
      .then(response => response.data);
  }
}
