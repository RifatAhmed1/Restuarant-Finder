import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../api/restaurants.api";
import styled from "@emotion/styled";

const Table_ = styled("table")({
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
});

export default function Table() {
  const [r_data, set_r_Data] = useState("");
  const [page, setPage] = useState(1);

  let navigate = useNavigate();

  const handletrClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const getAllData = async (page = page, limit = 25) => {
    const res = await getData(page, limit);
    set_r_Data(res.data);
  };

  useEffect(() => {
    getAllData(page, 25);
  }, [page]);
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
              {page > 1 ? (
                <StyledButton onClick={() => prevPage()}>prev</StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}

              {page > 10 ? (
                <StyledButton onClick={() => setPage(page - 10)}>
                  {page - 10}
                </StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}

              {page > 5 ? (
                <StyledButton onClick={() => setPage(page - 5)}>
                  {page - 5}
                </StyledButton>
              ) : (
                <StyledButton>...</StyledButton>
              )}
              <StyledButton
                style={{ fontWeight: "bolder" }}
                onClick={() => setPage(page + 0)}
              >
                {page + 0}
              </StyledButton>
              <StyledButton onClick={() => setPage(page + 5)}>
                {page + 5}
              </StyledButton>
              <StyledButton onClick={() => setPage(page + 10)}>
                {page + 10}
              </StyledButton>
              <StyledButton onClick={() => nextPage()}>next</StyledButton>
            </div>
          </div>
          <Table_>
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
          </Table_>{" "}
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
