import { Metadata } from "next";
import ToDoListViewPage from "./todo/list/page";
import UserListViewPage from "./user/list/page";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export const metadata: Metadata = {
  title: "To-Do App",
  description: "A responsive To-Do app built with Next.js and TypeScript.",
};

export default function Home() {
  return (
    <>
      <ToDoListViewPage />
      <Divider />
      <Typography
        sx={{
          variant: "h5",
          margin: 3,
          marginLeft: 3,
          fontWeight: "bold",
          fontSize: "1.75rem",
          color: "primary.main",
        }}
      >
        User Details
      </Typography>
      <UserListViewPage />
    </>
  );
}
