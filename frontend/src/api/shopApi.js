import axios from 'axios';
import serverUrl from "../helpers/serverUrl";

const instance = axios.create({
  baseURL: serverUrl(),
});

class ShopApi {
    async getBestProducts(){
        const { data } = await instance.get(`/api/product/best-products`);
        return data
    }

  async searchProducts(category, query) {
    const { data } = await instance.get(`/api/product/search/${category}${query}`);
    return data;
  }

  async getCategories(){
    const { data } = await instance.get('/api/product/categories');
    return data
  }
}

export default new ShopApi()