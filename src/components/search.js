import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { getSearchData } from '../api/restaurants.api';
import { useNavigate } from 'react-router-dom';

const StyledPage = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'white'
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

const StyledSearchField = styled('div')({
  backgroundColor: 'white',
  width: 'max-content',
  borderRadius: 0,
  padding: 10,
  marginTop: 20,
  border: '1px solid silver',
  display: 'flex',
  alignSelf: 'center'
});

const Input = styled('input')({
  outlineWidth: 0,
  border: 'none',
  textAlign: 'center'
});

const StyledButton = styled('button')({
  backgroundColor: 'wheat',
  border: 'none',
  color: 'gray',
  padding: 4,
  cursor: 'pointer',
  transition: 'all linear 0.1s',
  '&:hover': {
    color: 'white'
  },
  '&:active': {
    color: 'black',
    backgroundColor: 'white'
  }
});

const SearchTableContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 60
});

const Table = styled('table')({
  width: '100%',
  backgroundColor: 'white',
  WebkitBorderHorizontalSpacing: 0,
  WebkitBorderVerticalSpacing: 2,
  cursor: 'pointer',
  '&> tbody': {
    '& > tr': {
      ':nth-of-type(2n+1)': {
        backgroundColor: 'wheat'
      },
      '& > td': {
        padding: 10,
        minWidth: 150,
        maxWidth: 200
      }
    }
  }
});

const Divider = styled('div')({
  borderLeft: '1px solid gray'
});

export default function Search() {
  let navigate = useNavigate();

  const handletrClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const initVal = {
    _borough: '',
    _cuisine: ''
  };

  const [searchItem, setSearchItem] = useState(initVal);
  const { _borough, _cuisine } = searchItem;
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('search_data');
    const searchInput = sessionStorage.getItem('search_input_data');
    if (data) {
      setFiltered(JSON.parse(data));
    }
    if (searchInput) {
      setSearchItem(JSON.parse(searchInput));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('search_input_data', JSON.stringify(searchItem));
    sessionStorage.setItem('search_data', JSON.stringify(filtered));
  });

  const S = async () => {
    if (searchItem !== initVal) {
      setLoading(true);
      const res = await getSearchData(searchItem._borough, searchItem._cuisine);
      setFiltered(res.data);
      setLoading(false);
    }
  };

  const onValueChange = (e) => {
    setSearchItem({ ...searchItem, [e.target.name]: e.target.value });
  };

  return (
    <StyledPage>
      <StyledSearchField>
        <Input
          type="text"
          placeholder="borough"
          onChange={(e) => onValueChange(e)}
          name="_borough"
          value={_borough}
        />
        <Divider />
        <Input
          type="text"
          placeholder="cuisine"
          onChange={(e) => onValueChange(e)}
          name="_cuisine"
          value={_cuisine}
        />
        <StyledButton onClick={() => S()}>search</StyledButton>
      </StyledSearchField>
      {loading === false ? (
        filtered.length !== 0 ? (
          <SearchTableContainer>
            <div>{`${filtered.length} ${filtered.length === 1 ? 'result' : 'results'} found`}</div>
            <Table>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Name</td>
                  <td style={{ fontWeight: 600 }}>Borough</td>
                  <td style={{ fontWeight: 600 }}>Cuisine</td>
                </tr>
                {filtered.map((item) => {
                  return (
                    <tr key={item.restaurant_id} onClick={() => handletrClick(item.restaurant_id)}>
                      <td>{item.name}</td>
                      <td>{item.borough}</td>
                      <td>{item.cuisine}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </SearchTableContainer>
        ) : (
          <div style={{ paddingLeft: 20 }}>no results</div>
        )
      ) : (
        <StyledLoader>loading...</StyledLoader>
      )}
    </StyledPage>
  );
}
