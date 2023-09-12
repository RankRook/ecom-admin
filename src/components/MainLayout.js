/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { LuClipboardList } from "react-icons/lu";
import { ImBlog } from "react-icons/im";
import { TbBrandBlogger, TbBrandBootstrap, TbCategory } from "react-icons/tb";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">HDT</span>
            <span className="lg-logo">Hien Dep Trai</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "DashBoard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <TbBrandBootstrap className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <TbBrandBootstrap className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <TbCategory className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <TbCategory className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "order",
              icon: <LuClipboardList className="fs-4" />,
              label: "Order",
            },
            {
              key: "blog",
              icon: <TbBrandBlogger className="fs-4" />,
              label: "Blog",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div></div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  src="https://3.bp.blogspot.com/-CD4R_mKFYHQ/Wg_tLdee9XI/AAAAAAAAA20/7kmFmSTx4HURTxzmpry-f0VFuvysSGX9gCEwYBhgL/s1600/3.5.1.jpg"
                  height={32}
                  width={32}
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Hien</h5>
                <p className="mb-0">hdhien2002@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
