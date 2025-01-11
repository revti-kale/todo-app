import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button LinkComponent={Link} href={"/todo/list"}>
        ToDo List
      </Button>
      <Button LinkComponent={Link} href={"/user/list"}>
        User List
      </Button>
    </>
  );
}
