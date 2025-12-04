import React, { useState } from "react";

/*
  UI de recuperação de senha (simulação).
*/
const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(
      "Se este email existir, as instruções de recuperação foram enviadas (simulação)."
    );
  };

  return (
    <form onSubmit={submit}>
      <h2>Recuperar senha</h2>
      {message && <div>{message}</div>}
      <input
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Enviar instruções</button>
    </form>
  );
};

export default PasswordRecovery;
