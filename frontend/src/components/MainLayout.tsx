import { Box } from "@mui/material";
import { Navbar } from "./Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#F3F4F6" }}>
      {/* Barra Superior */}
      <Navbar />
      
      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          px: 3,
          width: "100%",
          maxWidth: "1400px", // Limita a largura para não ficar muito esticado em telas grandes
          mx: "auto", // Centraliza o conteúdo
          bgcolor: "#F3F4F6",
          color: "#111827"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};