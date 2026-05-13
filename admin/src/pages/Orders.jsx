import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: {
          token

        }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error('Failed to fetch orders: ' + response.data.message);
      }

    } catch (error) {
      toast.error('Error fetching orders: ' + error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <div className="h3">Order Page</div>
      <div>
        {
          orders.map((order, index) => (
            <div key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p key={index}>{item.name} X {item.quantity}<span>{item.size}</span></p>

                      } else {
                        return <p key={index}>{item.name} X {item.quantity}<span>{item.size}</span>,</p>
                      }
                    })
                  }
                </div>
                <p>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ", "}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + "," + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <div>
                  <p>Items:{order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Paid' : 'Not Paid'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

          ))
        }
      </div>
    </div>
  );
};

export default Orders;