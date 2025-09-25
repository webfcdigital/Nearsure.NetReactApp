
import React, { useState } from 'react';
import axios from 'axios';

interface ProductFormProps {
  onProductCreated: (product: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated }) => {
  const [newProductName, setNewProductName] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [error, setError] = useState<string | null>(null);

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
      const response = await axios.post('/api/products', newProduct);
      setNewProductName('');
      setNewProductDesc('');
      setNewProductPrice('');
      onProductCreated(response.data);
    } catch (err) {
      setError('Failed to create product. Check the console for more details.');
      console.error(err);
    }
  };

  return (
    <div className="lg:col-span-1 bg-gray-800 rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Add New Product</h2>
      {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
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
  );
};

export default ProductForm;
