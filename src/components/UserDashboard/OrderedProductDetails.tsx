import { useGetProductByIdQuery } from "../../redux/features/product/productApi";
import LoadingSpinner from "../Loading/LoadingSpinner";

interface Product {
  product: string;
  quantity: number;
}

const OrderedProductDetails = ({ product }: { product: Product }) => {
  const { data, isLoading, error } = useGetProductByIdQuery(product.product);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading product details</p>;

  const productData = data?.data;

  return (
    <div className="flex items-center justify-between border-b border-gray-300 pb-4">
      <div className="flex">
        <img
          src={productData?.image}
          alt={productData?.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="ml-4">
          <p className="text-lg font-bold text-gray-800">
            {productData?.title}
          </p>
          <p className="text-gray-600">{productData?.author}</p>
        </div>
      </div>
      <p className="text-lg text-gray-800">Quantity: {product.quantity}</p>
    </div>
  );
};

export default OrderedProductDetails;
