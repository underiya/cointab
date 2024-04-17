import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { BaseUrl } from "../App";
import { Post } from "./Post";

const Users = ({ data }) => {
  console.log(data);

  const handleOpen = async (userId) => {
    // let res = await fetch(`${BaseUrl}/open`, {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({
    //     user,
    //   }),
    // });
    // let data = res.json();
    <Post />;
    
    console.log(userId);
  };

  const handleAdd = async (user) => {
    let res = await fetch(`${BaseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        city: user.address.city,
        company: user.company.name,
      }),
    });
    let data = await res.json();
    console.log(data);
  };
  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Users Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th isNumeric>Phone</Th>
              <Th>Website</Th>
              <Th>City</Th>
              <Th>Company</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((e) => (
              <Tr key={e.id}>
                <Td>{e.name}</Td>
                <Td>{e.email}</Td>
                <Td isNumeric>{e.phone}</Td>
                <Td>{e.website}</Td>
                <Td>{e.address.city}</Td>
                <Td>{e.company.name}</Td>
                <Td>
                  {!e.status ? (
                    <Button onClick={() => handleAdd(e)} colorScheme="blue">
                      Add
                    </Button>
                  ) : (
                    <Button onClick={() => handleOpen(e.id)} colorScheme="blue">
                      Open
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
