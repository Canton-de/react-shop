import axios from 'axios';
import serverUrl from "../helpers/serverUrl";

const instance = axios.create({
  baseURL: serverUrl(),
});

class CartApi {
  async addToCart(id) {
    if (!localStorage.getItem('token')) {
      return localStorage.setItem('products', id);
    }
    const { data } = await instance.post(
      '/api/product/cart',
      {
        productId: id,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }
    );
    return data;
  }

  async removeFromCart(id) {
    const { data } = await instance.delete(`/api/product/cart/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    return data;
  }

  async getProductsInCard() {
    const { data } = await instance.get('/api/product/cart', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    return data;
  }
}

export default new CartApi();
