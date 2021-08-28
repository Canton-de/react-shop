import axios from 'axios'

class UserApi {
  async registerUser(regData) {
    const { data } = await axios.post('/api/auth/login', regData);
    return data;
  }

  async authUser() {
    const { data } = await axios.get('/api/auth/login', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    return data;
  }

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

  async searchProducts(query, category) {
    const { data } = await axios.get(`/api/product/search/${category}?q=${query}`);
    return data;
  }

  async loadProducts(category) {
    const token = localStorage.getItem('token');
    if (!token) {
      const { data } = await axios.get(`/api/product/categories/${category}`);
      return data;
    }
    const { data } = await axios.get(`/api/product/categories/${category}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data;
  }
}

export default new UserApi()