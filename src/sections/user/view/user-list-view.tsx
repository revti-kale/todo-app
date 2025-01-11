"use client";
import useFetchUser from "@/hooks/useFetchUser";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";


export default function UserListView() {
  const [currentPage, setCurrentPage] = useState(1);

  const userPerPage = 4;

  const { data, deleteUser, loading, error } = useFetchUser(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //Pagination
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = data
    ? data.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  // Handle Page Change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / userPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {currentUsers?.map((user, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                variant="outlined"
                sx={{ width: 500, height: 200, margin: 2 }}
              >
                <IconButton
                  sx={{
                    position: "relative",
                    color: "red",
                    top: 8,
                    right: 8,
                    left: 200,
                  }}
                  onClick={() => deleteUser(user.id)}
                >
                  <ClearIcon />
                </IconButton>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginTop: 1, marginBottom: 1 }}
                  >
                    {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography>
          Page {currentPage} of {Math.ceil(data.length / userPerPage)}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(data.length / userPerPage)}
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
