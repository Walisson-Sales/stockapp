import React, { useState } from "react";

/*
  Componente de Login (simples).
  - Envia POST /login com { email, senha }
  - Recebe usuário (sem senha) e salva em localStorage como 'user'
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
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const payload = await res.json();
      if (!res.ok) {
        // mostra mensagem retornada pelo backend ou genérica
        setError(payload?.message || "Erro no login");
        return;
      }
      // salva usuário no localStorage (sem senha)
      localStorage.setItem("user", JSON.stringify(payload));
      onLogin(payload);
    } catch (err: any) {
      setError(err.message || "Erro de rede");
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
      <button type="submit" style={{ color: "white" }}>Entrar</button>
    </form>
  );
};

export default Login;
