import axios from 'axios';
import getTokenClient from "../helpers/getTokenClient";
import serverUrl from "../helpers/serverUrl";

const instance = axios.create({
  baseURL: serverUrl()
});

class CartApi {
  async addToDataBase(data,images){
    const formData = new FormData();
    for(const i in data){
        if (Object.prototype.hasOwnProperty.call(data, i)) formData.append(i, data[i]);
    }
    images.forEach((tm, index) => formData.append(`file${index}`, images[index].originFileObj));
    await instance.post('/api/product/new', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${getTokenClient()}`,
      },
    });
  }
};

export default new CartApi()