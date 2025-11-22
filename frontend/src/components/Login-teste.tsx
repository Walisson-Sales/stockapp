import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import type React from "react"

const Login: React.FC = () => {
    return (
        <Box>
            <Paper>
                <Box>
                    <LoginIcon />
                    <Typography variant="h3">Bem-Vindo!</Typography>
                    <Typography variant="h3">Faça login para continuar</Typography>
                </Box>
                <Box>
                    <TextField label = "E-mail"/>
                    <TextField label = "Senha"/>
                    <Button>Logar</Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;