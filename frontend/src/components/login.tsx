import React, { useState } from "react";
import api from "../api"; // Importe a instância do Axios

/*
  Componente de Login (simples).
  - Envia POST /auth/login com { email, senha }
  - Recebe usuário (sem senha) e token, salva em localStorage
  - Chama onLogin(user) para que App mude a view
*/
type Props = { onLogin: (user: any) => void };

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Use a instância do Axios para fazer a requisição
      const response = await api.post("/auth/login", { email, senha });
      
      const payload = response.data;

      // Salva o token no localStorage (importante para autenticação)
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }

      // Salva usuário no localStorage (sem senha)
      localStorage.setItem("user", JSON.stringify(payload.usuario));
      
      onLogin(payload.usuario);
    } catch (err: any) {
      console.error(err); // Log do erro completo para debug
      const message = err.response?.data?.message || "Erro no login";
      setError(message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>E-mail</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <button type="submit" style={{ color: "white", backgroundColor: "blue" }}>Entrar</button>
    </form>
  );
};

export default Login; 