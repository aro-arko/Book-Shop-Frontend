import React from "react";
import { useGetProductByIdQuery } from "../../../redux/features/product/productApi";
import LoadingSpinner from "../../Loading/LoadingSpinner";

interface OrderProductProps {
  productId: string;
  quantity: number;
}

const OrderProducts: React.FC<OrderProductProps> = ({
  productId,
  quantity,
}) => {
  const { data, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading product details</p>;

  const product = data?.data;

  if (!product) return <p>No product details available</p>;

  return (
    <div className="mb-4">
      <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-gray-600">Author: {product.author}</p>
            <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-600 text-right">Quantity: {quantity}</p>
        </div>
      </div>
      <hr className="w-full border-t border-gray-300 mt-4" />
    </div>
  );
};

export default OrderProducts;
