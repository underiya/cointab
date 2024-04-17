import { useState } from "react";
import "./App.css";
import Users from "./components/Users";
import { Button } from "@chakra-ui/react";

export const BaseUrl = `http://localhost:8080`;

const fetchData = async (cb) => {
  try {
    let res = await fetch(`${BaseUrl}/users`);
    let data = await res.json();
    // console.log(data);
    cb(data);
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [data, setData] = useState([]);
  const handleUsers = async () => {
    try {
      await fetchData(setData);
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
      {data.length > 0 && <Users data={data} />}
    </>
  );
}

export default App;
