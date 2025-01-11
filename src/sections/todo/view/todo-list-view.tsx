"use client";
import { RootState } from "@/redux/store";
import { UserListView } from "@/sections/user/view";
import ClearIcon from "@mui/icons-material/Clear";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";

const myTodos = [
  {
    id: 1,
    title: "Create Header Component",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    title: "Implement Search Functionality",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    title: "Build Playlist Management Feature",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    title: "Add Song Upload Feature",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 5,
    title: "Create User Profile Page",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 6,
    title: "Optimize Performance",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 7,
    title: "Implement Pagination",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 8,
    title: "Add Notification Feature",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 9,
    title: "Enhance UI Design",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 10,
    title: "Refactor Code",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 11,
    title: "Create User Profile Page",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 12,
    title: "Optimize Performance",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 13,
    title: "Implement Pagination",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 14,
    title: "Add Notification Feature",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 15,
    title: "Enhance UI Design",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 16,
    title: "Refactor Code",
    description: "Lorem ipsum dolor sit amet.",
  },
];

export default function ToDoListView() {
  const [todos, setTodos] = useState(myTodos);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const searchTerm = useSelector((state: RootState) =>
    state.search.searchTerm.toLowerCase()
  );

  const todosPerPage = 6;

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm)
  );

  //Pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Handle Page Change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTodos.length / todosPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  function handleRemoveTodo(index: number) {
    const updatedTodos = todos.filter((_, i) => i !== indexOfFirstTodo + index);
    setTodos(updatedTodos);
  }

  function handleAddTodo() {
    if (newTitle.trim() && newDescription.trim()) {
      const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        title: newTitle,
        description: newDescription,
      };
      setTodos([...todos, newTodo]);
      setNewTitle("");
      setNewDescription("");
      setShowForm(false);
    }
  }
  console.log(todos);

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
          sx={{ marginBottom: 2 }}
        >
          {showForm ? "Cancel" : "Add Todo"}
        </Button>
        {showForm && (
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextareaAutosize
              minRows={4}
              placeholder="Description"
              style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddTodo}>
              Add Todo
            </Button>
          </Box>
        )}
        <Grid container spacing={3} justifyContent="center">
          {currentTodos.map((todo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    width: 400,
                    height: 200,
                    margin: 2,
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                    }}
                    onClick={() => handleRemoveTodo(index)}
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
                      {todo.title}
                    </Typography>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {todo.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography sx={{ margin: "0 16px", alignSelf: "center" }}>
            Page {currentPage} of{" "}
            {Math.ceil(filteredTodos.length / todosPerPage)}
          </Typography>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredTodos.length / todosPerPage)
            }
          >
            Next
          </Button>
        </Box>
      </Container>
      <Divider />
      <Typography sx={{ variant: "h5", margin: 3, marginLeft: 25 }}>
        User Details
      </Typography>
      <UserListView />
    </>
  );
}
