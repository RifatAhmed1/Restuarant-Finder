import { useEffect, useState } from "react";
import { getData } from "../api/restaurants.api";

export default function Table() {
  const [r_data, set_r_Data] = useState([]);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const getAllData = async (page = page, limit = 10) => {
    const res = await getData(page, limit);
    set_r_Data(res.data);
  };

  useEffect(() => {
    getAllData(page, 10);
  }, [page]);
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "gray",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          paddingTop: 60,
          backgroundColor: "yellowgreen",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <table>
          <tbody>
            <tr>
              <td>name</td>
              <td>restaurant ID</td>
              <td>borough</td>
              <td>cuisine</td>
            </tr>
            {r_data.map((item, index) => {
              var bg = null;
              if (index % 2 === 0) {
                bg = { backgroundColor: "white" };
              } else {
                bg = { backgroundColor: "gray" };
              }
              return (
                <tr key={item.restaurant_id} style={bg}>
                  <td>{item.name}</td>
                  <td>{item.restaurant_id}</td>
                  <td>{item.borough}</td>
                  <td>{item.cuisine}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {page > 1 ? (
            <button onClick={() => prevPage()}>previous</button>
          ) : (
            <button>...</button>
          )}

          {page > 10 ? (
            <button onClick={() => setPage(page - 10)}>{page - 10}</button>
          ) : (
            <button>...</button>
          )}

          {page > 5 ? (
            <button onClick={() => setPage(page - 5)}>{page - 5}</button>
          ) : (
            <button>...</button>
          )}
          <button
            style={{ fontWeight: "bolder" }}
            onClick={() => setPage(page + 0)}
          >
            {page + 0}
          </button>
          <button onClick={() => setPage(page + 5)}>{page + 5}</button>
          <button onClick={() => setPage(page + 10)}>{page + 10}</button>
          <button onClick={() => nextPage()}>next</button>
        </div>
      </div>
    </div>
  );
}
