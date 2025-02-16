/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useOwnOrdersQuery } from "../../redux/features/order/orderApi";
import LoadingSpinner from "../Loading/LoadingSpinner";
import OrderedProductDetails from "./OrderedProductDetails";

const Orders = () => {
  const { data, isLoading, error, refetch } = useOwnOrdersQuery(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  const ordersData = data?.data;
  // console.log(ordersData);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading orders</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
      {ordersData?.length === 0 ? (
        <p className="">You have no orders</p>
      ) : (
        <div className="space-y-6">
          {ordersData?.map((order: any) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Order ID: {order._id}
              </h2>
              <p className=" mb-2">
                Total Price:{" "}
                <span className="font-bold">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </p>
              <p className=" mb-2">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className=" mb-2">
                Status: <span className="font-bold">{order.status}</span>
              </p>
              <p className=" mb-2">
                Transaction Id:{" "}
                <span className="font-bold">{order.transaction.id}</span>
              </p>

              <div className="space-y-4 mt-4">
                {order.products.map((item: any) => (
                  <OrderedProductDetails
                    key={item.product}
                    product={item}
                  ></OrderedProductDetails>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
