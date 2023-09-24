/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Segmented, Space, Switch, Table, Typography } from 'antd';
import { getBlogs} from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom"
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
    dataIndex: "action",
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
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/brand/${blogstate[i]._id}`}
          >
            <BiEdit />
          </Link>
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
      <h3 className="mb-4 title">blog List</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};
export default Bloglist;
