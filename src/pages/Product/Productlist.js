/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Segmented, Space, Switch, Table, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Action',
    width: 150,
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productstate = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productstate.length; i++) {
    data1.push({
      key: i + 1,
      title: productstate[i].title,
      brand: productstate[i].brand,
      category: productstate[i].category,
      price: `${productstate[i].price}`,
      quantity: `${productstate[i].quantity}`,
      action: (
        <>
          <button className="ms-2 fs-3 text-danger bg-transparent border-0">
            <BiEdit />
          </button>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"      
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};
export default Productlist;
