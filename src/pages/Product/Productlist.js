/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table, } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, resetState } from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../components/CustomModal";

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
    dataIndex: "action",
    width: 150,
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setPoductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPoductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState())
    dispatch(getProducts());
  }, [dispatch]);

  const deleteAProduct = (e) => {
    dispatch(deleteProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
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
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/product/${productstate[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productstate[i]._id)}
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
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};
export default Productlist;
