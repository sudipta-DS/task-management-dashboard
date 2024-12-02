import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#007bff" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Task Management Dashboard
        </Typography>
        <div>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              marginRight: "10px",
            }}
          >
            <Button color="inherit">Dashboard</Button>
          </Link>
          <Link
            to="/add-task"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">Add Task</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
