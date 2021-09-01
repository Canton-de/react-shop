import axios from 'axios'
import getTokenClient from "../helpers/getTokenClient";
import serverUrl from "../helpers/serverUrl";

const instance = axios.create({
  baseURL: serverUrl(),
});

class UserApi {
  async registerUser(regData) {
    try{
      const { data } = await instance.post('/api/auth/sign-up', regData);
      return data
    }catch(e){
      throw(e?.response?.data?.message)
    }
  }

  async loginUser(regData) {
    try {
      const { data } = await instance.post('/api/auth/sign-in', regData);
    return data;
    } catch (e) {
      throw e?.response?.data?.message;
    }
  }

  async authUser() {
    const { data } = await instance.get('/api/auth/login', {
      headers: {
        Authorization: `Token ${getTokenClient()}`,
      },
    });
    return data;
  }
}

export default new UserApi()