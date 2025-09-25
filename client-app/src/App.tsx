import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
}

function App() {
  const { keycloak, initialized } = useKeycloak();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      // This endpoint doesn't exist yet, we will create it next.
      // const response = await axios.get<Product[]>('/api/products');
      // setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. The backend might be down or the endpoint is not ready.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`;
      fetchProducts();
    }
  }, [initialized, keycloak.authenticated, keycloak.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const price = parseFloat(newProductPrice);
    if (!newProductName || isNaN(price)) {
      alert('Please enter a valid name and price.');
      return;
    }

    const newProduct = {
      name: newProductName,
      description: newProductDesc,
      price: price,
    };

    try {
      await axios.post('/api/products', newProduct);
      setNewProductName('');
      setNewProductDesc('');
      setNewProductPrice('');
      // Refresh products list after adding a new one
      // For now, we'll just add it to the state manually as the GET endpoint is not ready
      setProducts([...products, { ...newProduct, id: new Date().toISOString() }]);

    } catch (err) {
      setError('Failed to create product. Check the console for more details.');
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyan-400">Product Management</h1>
          <div>
            {keycloak.authenticated && (
              <div className="flex items-center">
                <span className="text-white mr-4">Hello, {keycloak.tokenParsed?.preferred_username}</span>
                <button
                  onClick={() => keycloak.logout()}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
              <input
                type="text"
                id="description"
                value={newProductDesc}
                onChange={(e) => setNewProductDesc(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
              <input
                type="number"
                id="price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-150 ease-in-out"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List Section */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Product List</h2>
            {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                            <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                            <th scope="col" className="py-3 px-6 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-600">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-white">{product.name}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-300">{product.description}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-right font-mono text-cyan-400">${product.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {products.length === 0 && !error && <p className="text-center py-4">No products found. Add one using the form!</p>}
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
