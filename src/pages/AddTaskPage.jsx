import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../features/tasks/tasksSlice";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import Header from "../components/Header";

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && dueDate) {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          description,
          dueDate,
          completed: false,
        })
      );
      navigate("/");
    }
  };

  return (
    <div>
      <Header />
      <Box
        component={Paper}
        elevation={3}
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Add New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: "16px" }}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Add Task
          </Button>
        </form>
      </Box>
    </div>
  );
}
