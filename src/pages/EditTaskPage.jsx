import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../features/tasks/tasksSlice";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import Header from "../components/Header";

export default function EditTaskPage() {
  const { id } = useParams(); // Get task ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the task from Redux store using the ID from the URL
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === Number(id))
  );

  // State for form fields, pre-filled with task details
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  // Redirect to the dashboard if the task is not found
  useEffect(() => {
    if (!task) {
      navigate("/");
    }
  }, [task, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && dueDate) {
      dispatch(updateTask({ id: task.id, title, description, dueDate }));
      navigate("/"); // Navigate back to the dashboard after updating
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
          Edit Task
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
            Save Changes
          </Button>
        </form>
      </Box>
    </div>
  );
}
