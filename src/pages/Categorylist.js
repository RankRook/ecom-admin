/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Segmented, Space, Switch, Table, Typography } from 'antd';
import { getCategorys} from "../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";

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
    title: 'Action',
    width: 150,
    render: () => (
      <Space size="middle">
        <Typography.Link className="fs-3 "><BiEdit/></Typography.Link>
        <Typography.Link className="ms-3 fs-3 "><AiFillDelete/></Typography.Link>
      </Space>
    ),
  },
];

const Categorylist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);
  const categorystate = useSelector((state) => state.category.categorys);
  const data1 = [];
  for (let i = 0; i < categorystate.length; i++) {
    data1.push({
      key: i + 1,
      title: categorystate[i].title,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">category List</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};
export default Categorylist;
