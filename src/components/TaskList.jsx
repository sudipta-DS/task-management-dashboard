// src/components/TaskList.js
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { selectFilteredTasks } from "../features/tasks/tasksSlice";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { setFilter } from "../features/tasks/tasksSlice";

export default function TaskList() {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="outlined"
          onClick={() => handleFilterChange("ALL")}
          style={{ marginRight: "8px" }}
        >
          All Tasks
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleFilterChange("COMPLETED")}
          style={{ marginRight: "8px" }}
        >
          Completed Tasks
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleFilterChange("PENDING")}
          style={{ marginRight: "8px" }}
        >
          Pending Tasks
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleFilterChange("OVERDUE")}
        >
          Overdue Tasks
        </Button>
      </div>

      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskItem task={task} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
