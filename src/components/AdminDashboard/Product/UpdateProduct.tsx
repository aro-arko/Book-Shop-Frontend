import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/features/product/productApi";
import { FaArrowLeft } from "react-icons/fa";
import LoadingSpinner from "../../Loading/LoadingSpinner";

const categories = [
  "Fiction",
  "Science",
  "SelfDevelopment",
  "Poetry",
  "Religious",
];

const UpdateProduct = () => {
  const { productId } = useParams();
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId as string);
  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: categories[0], // Default to the first category
    description: "",
    image: "",
    quantity: "",
    inStock: false,
  });

  useEffect(() => {
    if (response) {
      const product = response.data;
      setFormData({
        title: product.title,
        author: product.author,
        price: product.price.toString(),
        category: product.category,
        description: product.description,
        image: product.image,
        quantity: product.quantity.toString(),
        inStock: product.inStock,
      });
    }
  }, [response]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateProduct({
            id: productId as string,
            product: updatedFormData,
          }).unwrap();
          refetch();
          Swal.fire("Updated!", "Your product has been updated.", "success");
        } catch (err) {
          console.error("Failed to update the product:", err);
          Swal.fire("Error!", "Failed to update the product.", "error");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading product details</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl px-4 md:px-8 py-8">
        <div className="flex items-center mb-6">
          <Link
            to={`/admin/products/${productId}`}
            className="text-gray-800 hover:text-blue-800 transition duration-300"
          >
            <FaArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-semibold text-gray-800 ml-4">
            Update Product
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">In Stock</label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
