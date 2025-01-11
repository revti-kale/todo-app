"use client";
import { RootState } from "@/redux/store";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const myTodos = [
  {
    title: "Create Header Component",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Create Header Component",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Implement Search Functionality",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Build Playlist Management Feature",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Add Song Upload Feature",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Create User Profile Page",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
];

export default function ToDoListView() {
  const [todos, setTodos] = useState(myTodos);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const searchTerm = useSelector((state: RootState) =>
    state.search.searchTerm.toLowerCase()
  );
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm)
  );

  function handleRemoveTodo(item: number) {
    const updatedTodos = todos.filter((_, i) => i !== item);
    setTodos(updatedTodos);
  }

  function handleAddTodo() {
    if (newTitle.trim() && newDescription.trim()) {
      const newTodo = {
        title: newTitle,
        description: newDescription,
      };
      setTodos([...todos, newTodo]);
      setNewTitle("");
      setNewDescription("");
      setShowForm(false);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
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
        {filteredTodos.map((todo, index) => (
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
                sx={{ width: 500, height: 250, margin: 2 }}
              >
                <IconButton
                  sx={{
                    position: "relative",
                    color: "red",
                    top: 8,
                    right: 8,
                    left: 300,
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
                    sx={{ marginTop: 2, marginBottom: 1 }}
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
    </Container>
  );
}
