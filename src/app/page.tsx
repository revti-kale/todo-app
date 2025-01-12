import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import ToDoListViewPage from "./todo/list/page";
import UserListViewPage from "./user/list/page";

export const metadata: Metadata = {
  title: "To-Do App",
  description: "A responsive To-Do app built with Next.js and TypeScript.",
};

export default function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <ToDoListViewPage />
        <Divider />
        <Stack sx={{ marginTop: 4 }} spacing={2}>
          <Typography variant="h5">User List</Typography>
          <UserListViewPage />
        </Stack>
      </Container>
    </>
  );
}
