import React, { useEffect, useState } from "react";
import { fetchData } from "./Home";
import { useLocation, useParams } from "react-router-dom";
import { Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";

export const Post = () => {
  const location = useLocation();
  const { state } = location;
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get("userId");

  const [data, setData] = useState({});

  useEffect(() => {
    fetchData(setData, `posts?userId=${value}`);
  }, []);

  console.log(data.data);

  const handleBulk = () => {
    fetchData(console.log, `posts/download/${value}`);
  };

  return (
    <div>
      <Button onClick={handleBulk}>Add Bulk</Button>
      <Heading as={"h3"}>User : {state.name}</Heading>
      <Heading as={"h3"}>Company: {state.company}</Heading>
      {data?.data?.map((e) => {
        return (
          <>
            <Card align="center" border={"2px solid black"}>
              <CardBody>
                <Text>Id: {e.id}</Text>
                <Text>Title: {e.title}</Text>
                <Text>Content: {e.body}</Text>
              </CardBody>
            </Card>
          </>
        );
      })}
    </div>
  );
};
