import { AccountPageLayout } from "@/components/Account_Layout";
import MySpinner from "@/components/order/Spiner/Spinner";
import {
  auth,
  fetchOrderData,
  fetchOrderDetails,
  firestore,
  getOrderSubcollection,
} from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Orders() {
  const [orderData, setOrderData] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          // Fetch data from both functions concurrently using Promise.all
          const [orderDetails, orderSubcollection] = await Promise.all([
            fetchOrderDetails(user.uid),
            getOrderSubcollection(user.uid),
          ]);
          // Set the fetched data in state
          setOrderDetails(orderDetails);
          setOrderData(orderSubcollection);
          setLoading(false); // Set loading state to false
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  console.log(orderDetails);
  console.log(orderData);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <>
        {orderData.length ? (
          <div>
            <h2 className="py-2 border-b px-4">ORDERS</h2>
            <div className="py-4 h-[80%]">
              <div className=" border-b py-2  flex flex-col md:flex-row">
                <Link
                  className="px-4 hover:text-orange-400 mb-2 md:mb-0 "
                  href="/account/Orders"
                >
                  Your Orders ({orderData ? orderData.length : ""})
                </Link>
              </div>

              {orderData.map((order, index) => {
                return (
                  <div className=" p-3 border my-2 " key={index}>
                    <div className="flex justify-between items-center">
                      {" "}
                      <Link
                        href={`/account/Orders/${user.uid}/${order.id}`}
                        className="text-amber-500  rounded-md py-1 px-2  uppercase hover:bg-red-200"
                      >
                        see details
                      </Link>
                    </div>
                    {order.items.map((item, index) => {
                      return (
                        <>
                          <div key={index}>
                            <div className="flex justify-between items-start p-3 border-b my-2 flex-col md:flex-row">
                              <img
                                src={item.product.thumbnail}
                                width={100}
                                height={100}
                                className="p-2"
                              />
                              <div className="flex-1 p-2 ">
                                <p className="font-semibold text-lg py-1">
                                  {item.product.en.title}
                                </p>
                                <p
                                  className={`text-black ${
                                    order.status === "order-placed"
                                      ? "bg-blue-800"
                                      : order.status === "deliverd"
                                      ? "bg-green-700"
                                      : order.status === "Cancelled"
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                                  }w-fit py-1 px-2 rounded-md text-sm`}
                                >
                                  {order.status}
                                </p>
                                <p className="py-1 text-sm text-gray-500">
                                  deliverd by Sunday 31-03
                                </p>
                              </div>
                              <div className="p-2"></div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className=" text-center py-8 h-[100%]">
            <h2 className="py-2">You have placed no orders yet!</h2>
            <p className="py-2">
              All your orders will be saved here for you to access their state
              anytime.
            </p>
            <Link
              href="/"
              className="btn my-6 p-4 bg-amber-500 hover:bg-yellow-400 text-white"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        )}
      </>
    );
  }
}

export default Orders;
Orders.getLayout = AccountPageLayout;
