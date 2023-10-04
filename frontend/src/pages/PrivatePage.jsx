import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../routes.js';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { content } = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        setData(content);
      } catch (error) {
        <Navigate to="/login" replace />;
      }
    };
    fetchData();
  }, []);

  return data && <p>{data}</p>;
};

export default PrivatePage;
