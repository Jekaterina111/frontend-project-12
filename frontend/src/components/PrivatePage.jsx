import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo && userInfo.token) {
    return { Authorization: `Bearer ${userInfo.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        setData(res.data);
      } catch (error) {
        <Navigate to="/login" replace />;
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Private Page</h2>
      <p>{data}</p>
    </div>
  );
};

export default PrivatePage;
