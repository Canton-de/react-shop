import axios from 'axios';

class ShopApi {
    async getBestProducts(){
        const { data } = await axios.get(`/api/product/best-products`);
        return data
    }

  async searchProducts(category, query) {
    const { data } = await axios.get(`/api/product/search/${category}${query}`);
    return data;
  }
}

export default new ShopApi()