import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneData } from '../api/restaurants.api';

const Table = styled('table')({
  width: '100%',
  backgroundColor: 'white',
  WebkitBorderHorizontalSpacing: 0,
  WebkitBorderVerticalSpacing: 2,
  '&> tbody': {
    '& > tr': {
      ':nth-of-type(2n+1)': {
        backgroundColor: 'wheat'
      },
      '& > td': {
        padding: 10,
        width: 'calc(100% / 2)'
      }
    }
  }
});

export default function RestuarantDetails() {
  const params = useParams();
  const _restaurant_id = params.restaurant_id;
  const [_data, setData] = useState([]);

  const getRestaurantDetails = async (restaurant_id) => {
    const res = await getOneData(restaurant_id);
    setData(res.data);
  };
  useEffect(() => {
    getRestaurantDetails(_restaurant_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_restaurant_id]);

  useEffect(() => {
    const __data = sessionStorage.getItem(`data_${_restaurant_id}`);
    if (__data) {
      setData(JSON.parse(__data));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(`data_${_restaurant_id}`, JSON.stringify(_data));
  });
  return (
    <div style={{ padding: '60px 60px 0px 20px' }}>
      <div style={{ height: 60 }}>Details</div>
      <Table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{_data?.name ? _data?.name : 'loading...'}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{_data?.restaurant_id ? _data?.restaurant_id : 'loading...'}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              {_data?.address
                ? `Building no. ${_data?.address?.building}, ${_data?.address?.street}`
                : 'loading...'}
            </td>
          </tr>
          <tr>
            <td>Borough</td>
            <td>{_data?.borough ? _data?.borough : 'loading...'}</td>
          </tr>
          <tr>
            <td>Cuisine</td>
            <td>{_data?.cuisine ? _data?.cuisine : 'loading...'}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
