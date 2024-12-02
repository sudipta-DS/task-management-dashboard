import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

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
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Typography variant="h6">Add New Task</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Add Task
        </Button>
      </Box>
    </form>
  );
}
