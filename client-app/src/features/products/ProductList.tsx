import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  error: string | null;
  onProductUpdated: (product: Product) => void;
  onProductDeleted: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, error, onProductUpdated, onProductDeleted }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      await axios.put(`/api/products/${editingProduct.id}`, editingProduct);
      onProductUpdated(editingProduct);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      onProductDeleted(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
              <th scope="col" className="py-3 px-6 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-600">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-white">{product.name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-300">{product.description}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-right font-mono text-cyan-400">${product.price.toFixed(2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-right font-medium">
                  <button onClick={() => setEditingProduct(product)} className="text-cyan-400 hover:text-cyan-600">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && !error && <p className="text-center py-4">No products found. Add one using the form!</p>}
      </div>

      {editingProduct && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleUpdate}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Edit Product
                      </h3>
                      <div className="mt-2">
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            id="name"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                          <input
                            type="text"
                            id="description"
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                          <input
                            type="number"
                            id="price"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;