import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import useSWR from "swr";
import axios from "axios";
import Button from "@mui/material/Button";
import Link from 'next/link'
const url = "https://young-sands-87606.herokuapp.com/user/user_details";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#FFF",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.root}`]: {
    borderBottom: "none",
  },
}));

const StyledDiv = styled(TableCell,Button)(() => ({
  display: "flex",
  justifyContent: "center",
  border: "none",
}));

export default function Home() {
  const { data, error } = useSWR(url, fetcher);
  if (!data && !error) return <h1>loadingg</h1>;
  if (error) return <h1>erorrrr</h1>;
  
  return (
    <StyledDiv>
      <Box sx={{ width: "90vw" }}>
        <Link href='/create-user' passHref>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add user +
        </Button>
        </Link>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">FirstName</StyledTableCell>
                <StyledTableCell align="center">lastName</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                    <TableCell
                      className="border-0"
                      component="th"
                      id={item._id}
                      scope="row"
                      align="right"
                    >
                      {item._id}
                    </TableCell>
                    <TableCell align="center">{item.username}</TableCell>
                    <TableCell align="center">{item.firstname}</TableCell>
                    <TableCell align="center">{item.lastname}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </StyledDiv>
  );
}
