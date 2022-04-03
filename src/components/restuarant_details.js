import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneData } from "../api/restaurants.api";

export default function RestuarantDetails() {
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
        },
      },
    },
  });

  const params = useParams();
  const _restaurant_id = params.restaurant_id;
  const [_data, setData] = useState({});
  const [address, setAddress] = useState({
    building: "",
    street: "",
  });

  const getRestaurantDetails = async (restaurant_id) => {
    const res = await getOneData(restaurant_id);
    setData(res.data);
    setAddress({
      building: res.data.address.building,
      street: res.data.address.street,
    });
    console.log(res.data);
    console.log(address);
  };
  useEffect(() => {
    getRestaurantDetails(_restaurant_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_restaurant_id]);

  return (
    <div style={{ paddingLeft: 20, paddingRight: 60 }}>
      <div>Details</div>
      <Table>
        <tbody>
          <tr>
            <td>name</td>
            <td>{_data.name}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{_data.restaurant_id}</td>
          </tr>
          <tr>
            <td>address</td>
            <td>
              building no. {address.building}, {address.street}
            </td>
          </tr>
          <tr>
            <td>borough</td>
            <td>{_data.borough}</td>
          </tr>
          <tr>
            <td>cuisine</td>
            <td>{_data.cuisine}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
