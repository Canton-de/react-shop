import axios from 'axios'
import getTokenClient from "../helpers/getTokenClient";

class UserApi {
  async registerUser(regData) {
    const { data } = await axios.post('/api/auth/sign-up', regData);
    return data;
  }

  async loginUser(regData) {
    const { data } = await axios.post('/api/auth/sign-in', regData);
    return data;
  }

  async authUser() {
    const { data } = await axios.get('/api/auth/login', {
      headers: {
        Authorization: `Token ${getTokenClient()}`,
      },
    });
    return data;
  }
}

export default new UserApi()