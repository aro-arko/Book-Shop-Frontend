"use client";

import { ShoppingBag, Package, Users } from "lucide-react";
import { useGetAllOrdersStatsQuery } from "../../../redux/features/order/orderApi";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import { useGetAllUsersStatsQuery } from "../../../redux/features/user/userApi";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { useCountUp } from "../../../hooks/useCountUp";

const PlatformOverview = () => {
  const { data: ordersResponse, isLoading: loadingOrders } =
    useGetAllOrdersStatsQuery({});
  const { data: usersResponse, isLoading: loadingUsers } =
    useGetAllUsersStatsQuery({});
  const {
    data: productsResponse = { data: [], total: 0 },
    isLoading: loadingProducts,
  } = useGetProductsQuery({
    queryParams: {
      page: 1,
      limit: Number.MAX_SAFE_INTEGER,
    },
  });

  const loading = loadingOrders || loadingUsers || loadingProducts;

  const totalOrders = useCountUp(ordersResponse?.data || 0);
  const totalUsers = useCountUp(usersResponse?.data || 0);
  const totalProducts = useCountUp(productsResponse?.data?.length || 0);

  const stats = [
    {
      title: "Orders",
      count: totalOrders,
      icon: ShoppingBag,
      color: "text-green-600",
      description: "Total confirmed orders placed",
    },
    {
      title: "Users",
      count: totalUsers,
      icon: Users,
      color: "text-purple-600",
      description: "Registered users on the platform",
    },
    {
      title: "Products",
      count: totalProducts,
      icon: Package,
      color: "text-blue-600",
      description: "Items currently available in store",
    },
  ];

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-0">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-200"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Skeleton className="w-14 h-14 rounded-full bg-gray-200" />
                <Skeleton className="w-1/2 h-6 rounded bg-gray-200" />
                <Skeleton className="w-1/3 h-10 rounded bg-gray-200" />
              </div>
              <div className="mt-6">
                <Skeleton className="w-3/4 h-4 mx-auto rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className=" bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
          Platform Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map(
            ({ title, count, icon: Icon, color, description }, index) => (
              <Card
                key={index}
                className="bg-white p-4 rounded-2xl shadow-md border border-gray-200"
              >
                <CardHeader className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={`rounded-full p-4 bg-gray-100 shadow-inner ${color}`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-800">
                    {title}
                  </CardTitle>
                  <span className="text-4xl font-bold text-gray-900">
                    {count}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm text-center">
                    {description}
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
