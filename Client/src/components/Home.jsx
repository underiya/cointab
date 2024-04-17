import { Button } from "@chakra-ui/react";
import { useState } from "react";

import Users from "./Users";
export const BaseUrl = `https://cointab-mx5l.onrender.com`;

export const fetchData = async (cb,endpoint) => {
  try {
    let res = await fetch(`${BaseUrl}/${endpoint}`);
    let data = await res.json();
    // console.log(data);

    cb(data);
  } catch (error) {
    console.log(error);
  }
};

function Home() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const handleUsers = async () => {
    try {
      setloading(true);
      await fetchData(setData,"users");
      setloading(false);
    } catch (error) {
      console.error("Error data", error);
    }
  };
  console.log(data.length);
  return (
    <>
      <h1>Cointab SE-ASSIGNTMENT</h1>
      <br />
      <Button colorScheme="blue" onClick={handleUsers}>
        All Users
      </Button>
      <br />
      {loading ? (
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnZlN2tkZGpqNGhna3o1ejBocDc0ZDVkNTg4aG8ybDRmMDg1emtwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rLl1g739pZdE4zlovM/giphy.gif" />
      ) : (
        ""
      )}
      {data.length > 0 && <Users data={data} />}
    </>
  );
}

export default Home;
