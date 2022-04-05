import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../api/restaurants.api";
import styled from "@emotion/styled";

const StyledTable = styled("table")({
  width: "100%",
  backgroundColor: "white",
  WebkitBorderHorizontalSpacing: 0,
  WebkitBorderVerticalSpacing: 2,
  cursor: "pointer",
  "&> tbody": {
    "& > tr": {
      ":nth-of-type(2n+1)": {
        backgroundColor: "wheat",
      },
      "& > td": {
        padding: 10,
        width: `calc(100% / 4)`,
      },
    },
  },
});

const StyledButton = styled("button")({
  backgroundColor: "wheat",
  marginLeft: 2,
  border: "none",
  cursor: "pointer",
});

export default function Table() {
  const [r_data, set_r_Data] = useState("");

  const { _page } = useParams();

  let navigate = useNavigate();

  const handletrClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handlePagination = (pageNo) => {
    navigate(`/restaurants/page/${pageNo}`);
  };

  const nextPage = () => {
    handlePagination(parseInt(_page) + 1);
  };

  const prevPage = () => {
    if (parseInt(_page) > 1) {
      handlePagination(parseInt(_page) - 1);
    }
  };

  const getAllData = async (page, limit) => {
    const res = await getData(page, limit);
    set_r_Data(res.data);
  };

  useEffect(() => {
    getAllData(_page, 25);
  }, [_page]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {r_data !== "" ? (
        <div
          style={{
            paddingTop: 60,
            display: "flex",
            flexDirection: "column",
            flexGrow: 0,
            justifyContent: "center",
            paddingLeft: 20,
            paddingRight: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {parseInt(_page) > 1 ? (
                <StyledButton onClick={() => prevPage()}>prev</StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}

              {parseInt(_page) > 10 ? (
                <StyledButton
                  onClick={() => handlePagination(parseInt(_page) - 10)}
                >
                  {parseInt(_page) - 10}
                </StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}

              {parseInt(_page) > 5 ? (
                <StyledButton
                  onClick={() => handlePagination(parseInt(_page) - 5)}
                >
                  {parseInt(_page) - 5}
                </StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}
              <StyledButton
                style={{ fontWeight: "bolder" }}
                onClick={() => handlePagination(parseInt(_page) + 0)}
              >
                {parseInt(_page) + 0}
              </StyledButton>
              <StyledButton
                onClick={() => handlePagination(parseInt(_page) + 5)}
              >
                {parseInt(_page) + 5}
              </StyledButton>
              <StyledButton
                onClick={() => handlePagination(parseInt(_page) + 10)}
              >
                {parseInt(_page) + 10}
              </StyledButton>
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
              {r_data.map((item) => {
                return (
                  <tr
                    key={item.restaurant_id}
                    onClick={() => handletrClick(item.restaurant_id)}
                  >
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
        <div
          style={{
            paddingTop: 60,
            display: "flex",
            flexDirection: "column",
            flexGrow: 0,
            justifyContent: "center",
            paddingLeft: 20,
            paddingRight: 60,
          }}
        >
          loading...
        </div>
      )}
    </div>
  );
}
