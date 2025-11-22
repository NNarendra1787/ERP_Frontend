// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Box,
//   Typography,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// const drawerWidth = 230;

// // Safe user from localStorage
// const storedUser = localStorage.getItem("user");
// const user = storedUser ? JSON.parse(storedUser) : null;

// function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
//     { text: "Customers", path: "/customers", icon: <PeopleIcon /> },
//     { text: "Products", path: "/products", icon: <Inventory2Icon /> },
//     { text: "Suppliers", path: "/suppliers", icon: <LocalShippingIcon /> },
//     { text: "Sales Orders", path: "/sales-orders", icon: <ReceiptLongIcon /> },
//     { text: "Purchase Orders", path: "/purchase-orders", icon: <ShoppingCartIcon /> },
//     { text: "GRN", path: "/grn", icon: <AssignmentTurnedInIcon /> },
//     { text: "Sales Report", path: "/sales-report", icon: <BarChartIcon /> },
//     { text: "Purchase Report", path: "/purchase-report", icon: <AssessmentIcon /> },
//     { text: "Inventory Report", path: "/inventory-report", icon: <ListAltIcon /> },
//   ];

//   // Admin-only item
//   if (user?.role === "admin") {
//     menuItems.push({
//       text: "User Management",
//       path: "/user-management",
//       icon: <AdminPanelSettingsIcon />,
//     });
//   }

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: "#0f172a",
//           color: "#e5e7eb",
//           borderRight: "none",
//         },
//       }}
//     >
//       <Toolbar>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: 700, letterSpacing: 0.5 }}
//         >
//           ERP System
//         </Typography>
//       </Toolbar>
//       <Box sx={{ overflow: "auto", mt: 1 }}>
//         <List>
//           {menuItems.map((item) => {
//             const selected = location.pathname === item.path;
//             return (
//               <ListItemButton
//                 key={item.text}
//                 onClick={() => navigate(item.path)}
//                 sx={{
//                   mb: 0.5,
//                   borderRadius: 1.5,
//                   mx: 1,
//                   backgroundColor: selected ? "rgba(148, 163, 184, 0.25)" : "transparent",
//                   "&:hover": {
//                     backgroundColor: "rgba(148, 163, 184, 0.35)",
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: "#e5e7eb", minWidth: 36 }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   primaryTypographyProps={{
//                     fontSize: 14,
//                     fontWeight: selected ? 700 : 500,
//                   }}
//                 />
//               </ListItemButton>
//             );
//           })}
//         </List>
//       </Box>
//     </Drawer>
//   );
// }

// export default Sidebar;

import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

function Sidebar() {
  const navigate = useNavigate();

  // SAFE user handling
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}

  const userRole = user?.role || "sales"; // default role

  const menuItems = [
    { text: "Dashboard", path: "/" },
    { text: "Customers", path: "/customers" },
    { text: "Products", path: "/products" },
    { text: "Suppliers", path: "/suppliers" },
    { text: "Sales Orders", path: "/sales-orders" },
    { text: "Purchase Orders", path: "/purchase-orders" },
    { text: "GRN", path: "/grn" },
    { text: "Sales Report", path: "/sales-report" },
    { text: "Purchase Report", path: "/purchase-report" },
    { text: "Inventory Report", path: "/inventory-report" },
  ];

  // Only add admin menu if role = admin
  if (userRole === "admin") {
    menuItems.push({ text: "User Management", path: "/user-management" });
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#0f172a",
          color: "white",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                "&:hover": { background: "rgba(255,255,255,0.1)" },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;

