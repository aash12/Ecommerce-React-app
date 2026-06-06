import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment/moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  return (
    <Layout title={"All Admin Orders"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          All Orders
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Buyer</th>
                <th scope="col">Date</th>
                <th scope="col">Payment</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((o, i) => {
                return (
                  <tr>
                    <th>{i + 1}</th>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status?.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer.name}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
