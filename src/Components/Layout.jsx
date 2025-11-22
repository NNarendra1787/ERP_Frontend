// import React from "react";
// import { Box, Toolbar } from "@mui/material";
// import Sidebar from "./Sidebar";

// function Layout({children}) {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         {children}
//       </Box>
//     </Box>
//   );
// }

// export default Layout;


// src/Components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Slices/authSlice";

function Layout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#111827",
          boxShadow: "0 10px 30px rgba(15,23,42,0.35)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            ERP Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f3f4f6",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Toolbar /> {/* push content below app bar */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
