/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Space, Table, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getBlogcats } from "../features/blogcat/blogcatSlice";

const columns = [
  {
    width: 100,
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

const Blogcatlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogcats());
  }, [dispatch]);
  const blogcatstate = useSelector((state) => state.blogcat.blogcats);
  const data1 = [];
  for (let i = 0; i < blogcatstate.length; i++) {
    data1.push({
      key: i + 1,
      title: blogcatstate[i].title,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Blogcat List</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};
export default Blogcatlist;
