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

import { Post } from "./Post";
import { BaseUrl } from "./Home";
import { useNavigate } from "react-router-dom";
const Users = ({ data }) => {
  const navigate = useNavigate();

  const handleOpen = async (user) => {
    navigate(`/post?userId=${user.id}`, {
      state: { name: user.name, company: user.company.name },
    });
    // console.log(data);
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
                    <Button onClick={() => handleOpen(e)} colorScheme="blue">
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
