import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { getSearchData } from "../api/restaurants.api";

const StyledPage = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "white",
});

const StyledSearchField = styled("div")({
  backgroundColor: "white",
  width: "max-content",
  borderRadius: 0,
  padding: 10,
  marginTop: 20,
  border: "1px solid silver",
  display: "flex",
  alignSelf: "center",
});

const Input = styled("input")({
  outlineWidth: 0,
  border: "none",
  textAlign: "center",
});

const StyledButton = styled("button")({
  backgroundColor: "wheat",
  border: "none",
  color: "gray",
  padding: 4,
  cursor: "pointer",
  transition: "all linear 0.1s",
  "&:hover": {
    color: "white",
  },
  "&:active": {
    color: "black",
    backgroundColor: "white",
  },
});

const SearchTableContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  paddingLeft: 20,
  paddingRight: 60,
});

const Table = styled("table")({
  width: "100%",
  backgroundColor: "white",
  WebkitBorderHorizontalSpacing: 0,
  WebkitBorderVerticalSpacing: 2,
  "&> tbody": {
    "& > tr": {
      ":nth-of-type(2n+1)": {
        backgroundColor: "wheat",
      },
      "& > td": {
        padding: 10,
        minWidth: 150,
        maxWidth: 200,
      },
    },
  },
});

const Divider = styled("div")({
  borderLeft: "1px solid gray",
});

export default function Search() {
  const initVal = {
    _borough: "",
    _cuisine: "",
  };

  const [searchItem, setSearchItem] = useState(initVal);
  const { _borough, _cuisine } = searchItem;
  const [filtered, setFiltered] = useState([]);

  const S = async () => {
    const res = await getSearchData(searchItem._borough, searchItem._cuisine);
    setFiltered(res.data);
    console.log(filtered.length);
  };

  const onValueChange = (e) => {
    setSearchItem({ ...searchItem, [e.target.name]: e.target.value });
  };

  return (
    <StyledPage>
      <StyledSearchField>
        <Input
          type='text'
          placeholder='borough'
          onChange={(e) => onValueChange(e)}
          name='_borough'
          value={_borough}
        />
        <Divider />
        <Input
          type='text'
          placeholder='cuisine'
          onChange={(e) => onValueChange(e)}
          name='_cuisine'
          value={_cuisine}
        />
        {/*<Divider />*/}
        <StyledButton onClick={() => S()} style={{}}>
          search
        </StyledButton>
      </StyledSearchField>
      {filtered.length !== 0 ? (
        <SearchTableContainer>
          {console.log(filtered.length)}
          <div>
            {`${filtered.length} ${
              filtered.length === 1 ? "result" : "results"
            } found`}
          </div>
          <Table>
            <tbody>
              <tr>
                <td>name</td>
                <td>borough</td>
                <td>cuisine</td>
              </tr>
              {filtered.map((item) => {
                return (
                  <tr key={item.restaurant_id}>
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
        <div>no results</div>
      )}
    </StyledPage>
  );
}
