import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../api/restaurants.api';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledTable = styled('table')({
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
        width: `calc(100% / 4)`,
        cursor: 'pointer'
      }
    }
  }
});

const StyledButton = styled('button')({
  backgroundColor: 'wheat',
  marginLeft: 2,
  border: 'none',
  cursor: 'pointer',
  height: '3vh',
  width: '3vw',
  '&:hover': {
    backgroundColor: 'white',
    color: 'wheat',
    border: '1px solid wheat'
  }
});

const StyledLoader = styled('div')({
  height: 'calc(100% - 60px)',
  width: '100%',
  paddingTop: 60,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 0,
  justifyContent: 'center',
  paddingLeft: 20,
  paddingRight: 60,
  alignItems: 'center'
});

export default function Table() {
  const [loading, setLoading] = useState(true);
  const [r_data, set_r_Data] = useState('');
  const [_page, setPage] = useState(1);

  let navigate = useNavigate();

  const handletrClick = (id) => {
    navigate(`/restaurants/${id}`);
  };
  //------------------------------------------------------
  const getAllData = async (page, limit) => {
    const res = await getData(page, limit);
    set_r_Data(res.data);
    setLoading(false);
  };
  //------------------------------------------------------
  const nextPage = () => {
    setPage(_page + 1);
    const _d = sessionStorage.getItem(`table_data_${_page + 1}`);
    const _p = sessionStorage.getItem(`pageId_${_page + 1}`);

    if (_d && _p) {
      set_r_Data(JSON.parse(_d));
      setPage(JSON.parse(_p));
    } else {
      setLoading(true);
      getAllData(_page + 1, 25);
    }
  };

  const changePage = (n) => {
    setPage(_page + n);
    const _d = sessionStorage.getItem(`table_data_${_page + n}`);
    const _p = sessionStorage.getItem(`pageId_${_page + n}`);
    if (_d && _p) {
      set_r_Data(JSON.parse(_d));
      setPage(JSON.parse(_p));
    } else {
      setLoading(true);
      getAllData(_page + n, 25);
    }
  };

  const prevPage = () => {
    if (_page > 1) {
      setPage(_page - 1);
      const _d = sessionStorage.getItem(`table_data_${_page - 1}`);
      const _p = sessionStorage.getItem(`pageId_${_page - 1}`);
      if (_d && _p) {
        set_r_Data(JSON.parse(_d));
        setPage(JSON.parse(_p));
      } else {
        setLoading(true);
        getAllData(_page - 1, 25);
      }
    }
  };
  //---------------------------------------------
  useEffect(() => {
    const _p = sessionStorage.getItem('page');
    if (_p) {
      setPage(JSON.parse(_p));
    }
    const _d = sessionStorage.getItem(`table_data_${JSON.parse(_p)}`);
    if (_d !== '') {
      set_r_Data(JSON.parse(_d));
      setLoading(false);
    } else {
      getAllData(_page, 25);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage.setItem(`table_data_${_page}`, JSON.stringify(r_data));
    sessionStorage.setItem(`pageId_${_page}`, JSON.stringify(_page));
    sessionStorage.setItem('page', JSON.stringify(_page));
  });

  Table.propTypes = {
    r_data: PropTypes.array
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {loading === false ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 0,
            justifyContent: 'center',
            padding: '20px 60px 20px 20px'
          }}
        >
          <div>page {_page}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {_page > 1 ? (
                <StyledButton onClick={() => prevPage()}>prev</StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}
              {_page > 10 ? (
                <StyledButton onClick={() => changePage(-10)}>{_page - 10}</StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}
              {_page > 5 ? (
                <StyledButton onClick={() => changePage(-5)}>{_page - 5}</StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}
              <StyledButton style={{ fontWeight: 'bolder' }}>{_page}</StyledButton>
              <StyledButton onClick={() => changePage(5)}>{_page + 5}</StyledButton>
              <StyledButton onClick={() => changePage(10)}>{_page + 10}</StyledButton>
              <StyledButton onClick={() => nextPage()}>next</StyledButton>
            </div>
          </div>
          <StyledTable>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Restaurant ID</td>
                <td style={{ fontWeight: 600 }}>Name</td>
                <td style={{ fontWeight: 600 }}>Borough</td>
                <td style={{ fontWeight: 600 }}>Cuisine</td>
              </tr>
              {r_data !== '' &&
                r_data.map((item) => {
                  return (
                    <tr key={item.restaurant_id} onClick={() => handletrClick(item.restaurant_id)}>
                      <td>{item.restaurant_id}</td>
                      <td>{item.name}</td>
                      <td>{item.borough}</td>
                      <td>{item.cuisine}</td>
                    </tr>
                  );
                })}
            </tbody>
          </StyledTable>
        </div>
      ) : (
        <StyledLoader>loading...</StyledLoader>
      )}
    </div>
  );
}
