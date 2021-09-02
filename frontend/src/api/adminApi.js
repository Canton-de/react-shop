import axios from 'axios';
import getTokenClient from "../helpers/getTokenClient";

class CartApi {
  async addToDataBase(data,images){
    const stringified = JSON.stringify({ ...data, images });
    await axios({
      method: 'post',
      url: '/api/product/new',
      headers: {
        Authorization: `Token ${getTokenClient()}`,
        'Content-Type': 'application/json',
      },
      data: stringified,
    });
  }
};

export default new CartApi()