// TaskItem.js
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../features/tasks/tasksSlice";
import {
  Card,
  CardContent,
  CardActions,
  Checkbox,
  IconButton,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();

  const getStatusColor = () => {
    if (task.completed) return "success";
    if (new Date(task.dueDate) < new Date()) return "error";
    return "default";
  };

  return (
    <Card
      variant="outlined"
      style={{
        marginBottom: "16px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Chip
          label={
            task.completed
              ? "Completed"
              : new Date(task.dueDate) < new Date()
              ? "Overdue"
              : "Pending"
          }
          color={getStatusColor()}
          size="small"
          style={{ marginTop: "8px" }}
        />
      </CardContent>
      <CardActions>
        <Checkbox
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        <IconButton onClick={() => dispatch(deleteTask(task.id))} color="error">
          <DeleteIcon />
        </IconButton>
        {/* Add Edit button with Link to Edit Task page */}
        <Link to={{ pathname: `/edit-task/${task.id}`, state: { task } }}>
          <Button>Edit Task</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
