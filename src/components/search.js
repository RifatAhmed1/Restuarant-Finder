import React, { useEffect, useState } from "react";
import { getSearchData } from "../api/restaurants.api";

const fakeData = [
  {
    name: "one",
    borough: "sylhet",
    cuisine: "rice",
  },
  {
    name: "two",
    borough: "sylhet",
    cuisine: "fish",
  },
  {
    name: "three",
    borough: "dhaka",
    cuisine: "fish",
  },
  {
    name: "four",
    borough: "rice",
    cuisine: "rice",
  },
  {
    name: "five",
    borough: "ctg",
    cuisine: "rice",
  },
];

export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [filtered, setFiltered] = useState([]);

  const S = async (borough) => {
    const res = await getSearchData((borough = searchItem));
    setFiltered(res.data);
  };

  const onValueChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "max-content",
          borderRadius: 999,
          padding: 20,
          border: "1px solid gray",
        }}
      >
        <input
          type='text'
          placeholder='borough'
          onChange={(e) => onValueChange(e)}
          style={{ outlineWidth: 0, border: "none" }}
        />
        <button
          onClick={() => S()}
          style={{
            backgroundColor: "white",
            borderLeft: "1px solid gray",
            borderRight: "none",
            borderTop: "none",
            borderBottom: "none",
            color: "gray",
          }}
        >
          search
        </button>
      </div>
      {filtered.length !== 0 ? (
        <div>
          <div>{`${filtered.length} ${
            filtered.length === 1 ? "result" : "results"
          } found`}</div>
          <table>
            <tbody>
              <tr>
                <td>name</td>
                <td>borough</td>
                <td>cuisine</td>
              </tr>
              {filtered.map((item) => {
                return (
                  <tr key={item.name}>
                    {console.log(searchItem, filtered)}
                    <td>{item.name}</td>
                    <td>{item.borough}</td>
                    <td>{item.cuisine}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>no results</div>
      )}
    </div>
  );
}
