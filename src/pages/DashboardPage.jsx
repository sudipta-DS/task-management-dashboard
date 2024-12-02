import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask, toggleTask } from "../features/tasks/tasksSlice";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../components/Header";

export default function TaskDashboard() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");

  // Handle delete task
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  // Handle toggle task completion
  const handleToggleCompletion = (id) => {
    dispatch(toggleTask(id));
  };

  // Filter tasks based on selected filter
  const getFilteredTasks = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "overdue":
        return tasks.filter(
          (task) => task.dueDate < currentDate && !task.completed
        );
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div>
      <Header />
      <div className="container">
        <Typography
          variant="h4"
          style={{ marginBottom: "20px", textAlign: "center" }}
        >
          Task List
        </Typography>

        {/* Filter Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginBottom: "20px",
          }}
        >
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setFilter("all")}
          >
            All Tasks
          </Button>
          <Button
            variant={filter === "completed" ? "contained" : "outlined"}
            color="success"
            onClick={() => setFilter("completed")}
          >
            Completed Tasks
          </Button>
          <Button
            variant={filter === "pending" ? "contained" : "outlined"}
            color="warning"
            onClick={() => setFilter("pending")}
          >
            Pending Tasks
          </Button>
          <Button
            variant={filter === "overdue" ? "contained" : "outlined"}
            color="error"
            onClick={() => setFilter("overdue")}
          >
            Overdue Tasks
          </Button>
        </Box>

        {/* Task Cards */}
        <Grid container spacing={3}>
          {filteredTasks.length === 0 ? (
            <Typography
              variant="h6"
              style={{ textAlign: "center", width: "100%" }}
            >
              No tasks to display for this filter.
            </Typography>
          ) : (
            filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card
                  style={{
                    backgroundColor: task.completed ? "#e8f5e9" : "white",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginBottom: "10px" }}
                    >
                      {task.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Due Date: {task.dueDate}
                    </Typography>
                  </CardContent>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <Tooltip title="Mark as Completed">
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggleCompletion(task.id)}
                        color="primary"
                      />
                    </Tooltip>

                    <div>
                      <Tooltip title="Edit Task">
                        <Link
                          to={`/edit-task/${task.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>

                      <Tooltip title="Delete Task">
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(task.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
}
