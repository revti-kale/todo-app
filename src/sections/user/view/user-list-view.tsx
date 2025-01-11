"use client";
import useFetchUser from "@/hooks/useFetchUser";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function UserListView() {
  const { data, loading, error } = useFetchUser(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {data?.map((user, index) => (
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
                sx={{ width: 500, height: 150, margin: 2 }}
              >
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
                    sx={{ marginTop: 2, marginBottom: 1 }}
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
    </Container>
  );
}
