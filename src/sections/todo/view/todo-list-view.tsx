"use client";
import Pagination from "@/components/pagination";
import { RootState } from "@/redux/store";
import ClearIcon from "@mui/icons-material/Clear";
import { CardHeader, Checkbox, Grid2, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
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
  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);

  const searchTerm = useSelector((state: RootState) =>
    state.search.searchTerm.toLowerCase()
  );

  const todosPerPage = 6;

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm)
  );

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditTodo = (todo: any) => {
    setSelectedTodo(todo);
    setNewTitle(todo.title);
    setNewDescription(todo.description);
    setShowForm(true);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
  };

  const handleUpdateTodo = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      );
      setTodos(updatedTodos);
      setShowForm(false);
      setSelectedTodo(null);
      resetForm();
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
      resetForm();
    }
  }

  const handleSelectTodo = (id: number) => {
    setSelectedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTodos.length === todos.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(todos.map((todo) => todo.id));
    }
  };

  const handleBatchDelete = () => {
    const updatedTodos = todos.filter(
      (todo) => !selectedTodos.includes(todo.id)
    );
    setTodos(updatedTodos);
    setSelectedTodos([]);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Stack
          sx={{
            justifyContent: "flex-end",
            paddingTop: 4,
            paddingBottom: 4,
          }}
          direction="row"
          spacing={3}
        >
          <Button
            variant="text"
            onClick={() => setShowForm(!showForm)}
            sx={{ marginBottom: 2 }}
          >
            Add ToDo
          </Button>
          <Stack direction="row" alignItems="center" >
            <Checkbox
              checked={selectedTodos.length === todos.length}
              onChange={handleSelectAll}
            />
            <Typography >Select All</Typography>
          </Stack>
          <Button
            variant="contained"
            color="error"
            onClick={handleBatchDelete}
            disabled={selectedTodos.length === 0}
          >
            Delete Selected
          </Button>
        </Stack>
        {showForm && (
          <Stack spacing={2}>
              <TextField
                label="Title"
                variant="outlined"
                sx={{ cursor: "pointer" }}
                fullWidth
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            <TextField
              multiline
              variant="outlined"
              sx={{ cursor: "pointer" }}
              minRows={4}
              fullWidth
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Stack direction='row'>
              <Button
                variant="text"
                onClick={() => setShowForm(!showForm)}
              >
                Cancel
              </Button>
              {selectedTodo ? (
                <Button variant="text" onClick={handleUpdateTodo}>
                  Update
                </Button>
              ) : (
                <Button variant="contained" onClick={handleAddTodo}>
                  Save
                </Button>
              )}
            </Stack>
          </Stack>
        )}

        <Grid2 container spacing={3}>
          {currentTodos.map((todo, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card variant="outlined" sx={{ cursor: "pointer" }}>
                <CardHeader
                  onClick={() => handleEditTodo(todo)}
                  avatar={
                    <Checkbox
                      checked={selectedTodos.includes(todo.id)}
                      onChange={() => handleSelectTodo(todo.id)}
                    />
                  }
                  action={
                    <IconButton onClick={() => handleRemoveTodo(index)}>
                      <ClearIcon />
                    </IconButton>
                  }
                  title={
                    <Typography variant="h6" component="div">
                      {todo.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {todo.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTodos.length}
          itemsPerPage={todosPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
