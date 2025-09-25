import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import Home from './Home';
import { PrivateRoute } from './PrivateRoute';
import ProductList from './features/products/ProductList';
import ProductForm from './features/products/ProductForm';
import User from './features/users/User';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
}

function App() {
  const { initialized } = useKeycloak();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('/api/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. The backend might be down or the endpoint is not ready.');
      console.error(err);
    }
  };

  const handleProductCreated = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleProductDeleted = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  React.useEffect(() => {
    if (initialized) {
      axios.interceptors.request.use(
        config => {
          const { keycloak } = useKeycloak();
          if (keycloak.authenticated) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
      fetchProducts();
    }
  }, [initialized]);

  return (
    <BrowserRouter>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <header className="bg-gray-800 shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-cyan-400">Product Management</h1>
            <User />
          </nav>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <ProductForm onProductCreated={handleProductCreated} />
                    <ProductList products={products} error={error} onProductUpdated={handleProductUpdated} onProductDeleted={handleProductDeleted} />
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;