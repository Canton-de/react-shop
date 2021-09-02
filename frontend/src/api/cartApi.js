import axios from 'axios';

class CartApi {
  async addToCart(id) {
    if (!localStorage.getItem('token')) {
      return localStorage.setItem('products', id);
    }
    const { data } = await axios.post(
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
    const { data } = await axios.delete(`/api/product/cart/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    return data;
  }

  async getProductsInCard() {
    const { data } = await axios.get('/api/product/cart', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    return data;
  }
}

export default new CartApi();
