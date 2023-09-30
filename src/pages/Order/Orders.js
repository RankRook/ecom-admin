/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title:"Product",
    dataIndex: "product"
  },
  {
    title:"Date",
    dataIndex: "date"
  },
  {
    title:"Amount",
    dataIndex: "amount"
  },
  {
    title: 'Action',
    dataIndex: "action",
    width: 150,

  },
];

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
;
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};
export default Order;
