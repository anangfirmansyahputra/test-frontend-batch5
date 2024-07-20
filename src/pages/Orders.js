import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { formatPrice } from "helpers/helpers";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useOrderContext } from "context/order_context";

const Orders = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
  const { orders, getOrderByUserId } = useOrderContext();

  useEffect(() => {
    getOrderByUserId(user?.id);
  }, [user && user?.id]);

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <div className="container mx-auto py-4">
            <p className="text-2xl font-bold mb-5">Order History</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1">
              {orders &&
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Address:</span>{" "}
                          {order.address}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Postal Code:</span>{" "}
                          {order.postal_code}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Payment Method:</span>{" "}
                          {order.payment_method}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Country:</span>{" "}
                          {order.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          Order ID: {order.id}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-lg font-semibold mb-2">Order Items:</p>
                      <div className="grid grid-cols-4 mb-4 bg-gray-200 p-2 rounded-lg">
                        <p className="font-bold">Product Name</p>
                        <p className="font-bold">Product Id</p>
                        <p className="font-bold">Quantity</p>
                        <p className="font-bold">Price</p>
                      </div>
                      <ul>
                        {order.order_items.map((item) => {
                          const totalPrice = item.quantity * item.product.price;
                          return (
                            <li
                              key={item.product.id}
                              className="grid grid-cols-4 items-center mb-4"
                            >
                              <div className="mr-4 flex">
                                <img
                                  src={`http://localhost:3000/uploads/${item.product.images[0]}`}
                                  alt={item.product.title}
                                  className="w-16 h-16 object-cover rounded mr-4"
                                />
                                <div>
                                  <p className="font-semibold">
                                    {item.product.title}{" "}
                                  </p>
                                  <div className="flex space-x-2 mt-2">
                                    <p className="text-sm font-semibold">
                                      Color:
                                    </p>
                                    <div
                                      className="w-4 h-4 rounded-full"
                                      style={{ backgroundColor: item.color }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-lg mb-1">{item.product.id}</p>
                              <p className="mb-1"> {item.quantity}</p>
                              <p className="mb-1">
                                {formatPrice(item.product.price)}
                              </p>
                              <p>Total Price: {formatPrice(totalPrice)}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Orders;
