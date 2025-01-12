"use client";
import Pagination from "@/components/pagination";
import useFetchUser from "@/hooks/useFetchUser";
import { RootState } from "@/redux/store";
import ClearIcon from "@mui/icons-material/Clear";
import { CardHeader, Skeleton, Stack, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserListView() {
  const [currentPage, setCurrentPage] = useState(1);

  const searchTerm = useSelector((state: RootState) =>
    state.search.searchTerm.toLowerCase()
  );

  const { data, deleteUser, loading, error } = useFetchUser(
    "https://jsonplaceholder.typicode.com/users"
  );

  const filteredUsers = data.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm) ||
      data.email.toLowerCase().includes(searchTerm) ||
      data.username.toLowerCase().includes(searchTerm)
  );

  const userPerPage = 4;

  if (loading) {
    return (
      <Stack direction={'row'} spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
            <Skeleton variant="rectangular" width={310} height={120} />
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {data.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No user found
          </Typography>
        </Box>
      ) : (
        <Grid2 container spacing={3}>
          {currentUsers?.map((user, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card variant="outlined">
                <CardHeader
                  action={
                    <Tooltip title="Delete user">
                      <IconButton onClick={() => deleteUser(user.id)}>
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  title={
                    <Typography variant="h6" component="div">
                      {user.name}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography color="textSecondary" variant="body2">
                    Username: {user.username}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Email: {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={data.length}
          itemsPerPage={userPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
