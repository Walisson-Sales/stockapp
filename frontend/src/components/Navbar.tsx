import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import logoImg from "../assets/logoImg.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Produtos", path: "/produtos", icon: <InventoryIcon /> },
    { text: "Categorias", path: "/categorias", icon: <CategoryIcon /> },
    { text: "Movimentações", path: "/movimentacoes", icon: <SwapHorizIcon /> },
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1C2536" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
            <Box 
            component="img"
            src={logoImg}
            alt="StockApp Logo"
            sx={{ 
              height: 80, 
              width: "auto",
              mr: 4, 
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          </Box>

          {/* MENU ITENS (Desktop) */}
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                               (item.path !== "/" && location.pathname.startsWith(item.path));
              
              return (
                <Button
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    my: 2,
                    color: isActive ? "#10B981" : "#9DA4AE", // Verde destaque ou cinza
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                    textTransform: "none",
                    px: 2,
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "#fff"
                    }
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </Box>

          {/* BOTÃO SAIR */}
          <Box sx={{ flexGrow: 0 }}>
             <Button 
                onClick={() => alert("Logout")}
                startIcon={<LogoutIcon />}
                sx={{ 
                    color: "#ef4444",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)" }
                }}
             >
                Sair
             </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};