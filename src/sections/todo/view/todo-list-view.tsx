"use client";
import Pagination from "@/components/pagination";
import { RootState } from "@/redux/store";
import { todoType } from "@/types/todo";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Grid2 from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";

const myTodos = [
  {
    id: 1,
    title: "Remove Unused Code",
    description: "Clean up unnecessary imports and code across all components.",
  },
  {
    id: 2,
    title: "Installed MUI Package",
    description:
      "Added Material UI package to use components like Button, Card, etc.",
  },
  {
    id: 3,
    title: "Header UI Component",
    description: "Created a reusable header component.",
  },
  {
    id: 4,
    title: "Todo UI Component",
    description:
      "Developed a card-based UI to display todos with add, edit, and delete options.",
  },
  {
    id: 5,
    title: "User UI Component",
    description:
      "Built a user list UI with skeleton loading and pagination features.",
  },
  {
    id: 6,
    title: "User API Integration",
    description:
      "Fetched user data from the backend API and displayed it on the UI.",
  },
  {
    id: 7,
    title: "Implement Redux Store",
    description: "Configured the Redux store for state management.",
  },
  {
    id: 8,
    title: "Added Clear Icon",
    description:
      "Implemented a clear icon in the todo component to reset fields.",
  },
  {
    id: 9,
    title: "Implement Search Functionality",
    description:
      "Add a search bar to filter the todo list based on title or description.",
  },
  {
    id: 10,
    title: "Handle Empty State in Todo List",
    description: "Show an empty state message when no todos are available.",
  },
];

export default function ToDoListView() {
  const [todos, setTodos] = useState(myTodos);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<todoType | null>(null);
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

  const handleEditTodo = (todo: todoType) => {
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
        todo.id === selectedTodo?.id
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      );
      setTodos(updatedTodos);
      setShowForm(false);
      setSelectedTodo(null);
      resetForm();
    }
  };
  const handleCancle = () => {
    setNewTitle("");
    setNewDescription("");
    setShowForm(false);
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
      <Stack
        sx={{
          justifyContent: "space-between",
          paddingTop: 4,
          paddingBottom: 4,
        }}
        direction="row"
        spacing={3}
      >
        <Typography variant="h5">Todo List</Typography>
        <Stack direction="row" spacing={3}>
          <Button
            variant="text"
            onClick={() => setShowForm(!showForm)}
            sx={{ marginBottom: 2 }}
          >
            Add ToDo
          </Button>
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={selectedTodos.length === todos.length}
              onChange={handleSelectAll}
            />
            <Typography>Select All</Typography>
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
      </Stack>

      {showForm && (
        <Card variant="outlined" sx={{ marginBottom: 4 }}>
          <CardContent>
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
              <Stack direction="row">
                <Button variant="text" onClick={handleCancle}>
                  Cancel
                </Button>
                {selectedTodo ? (
                  <Button variant="contained" onClick={handleUpdateTodo}>
                    Update
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleAddTodo}>
                    Save
                  </Button>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
      {todos.length === 0 ? (
        <Stack alignItems={"center"} sx={{ marginBottom: 2 }}>
          <Typography variant="h6" color="textSecondary">
            Your to-do list is empty!
          </Typography>
        </Stack>
      ) : (
        <>
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
                      <IconButton
                        onClick={(e) => {
                          handleRemoveTodo(index);
                          e.stopPropagation();
                        }}
                      >
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ flexGrow: 1 }}
                    >
                      {todo.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
          {filteredTodos.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={filteredTodos.length}
              itemsPerPage={todosPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}
