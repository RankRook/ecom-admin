/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Segmented, Space, Switch, Table, Typography } from 'antd';
import { getBlogs} from "../features/blog/blogSlice";
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
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
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

const Bloglist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  const blogstate = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogstate.length; i++) {
    data1.push({
      key: i + 1,
      title: blogstate[i].title,
      category: blogstate[i].category,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">blog List</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};
export default Bloglist;
