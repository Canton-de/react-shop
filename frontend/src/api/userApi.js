import axios from 'axios'
import getTokenClient from "../helpers/getTokenClient";

class UserApi {
  async registerUser(regData) {
    try{
      const { data } = await axios.post('/api/auth/sign-up', regData);
      return data
    }catch(e){
      throw(e?.response?.data?.message)
    }
  }

  async loginUser(regData) {
    try {
      const { data } = await axios.post('/api/auth/sign-in', regData);
    return data;
    } catch (e) {
      throw e?.response?.data?.message;
    }
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