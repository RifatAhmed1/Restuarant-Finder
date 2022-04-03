import { useEffect, useState } from "react";
import { getLength } from "../api/restaurants.api";

export default function Home() {
  const [count, setCount] = useState(0);
  const getCount = async () => {
    const res = await getLength();
    setCount(res.data.length);
    console.log(res.data.length);
  };

  //useEffect(() => {
  //  getCount();
  //}, []);

  return <div>Welcome!</div>;
}
