import React, { useState } from "react";

/*
  Formulário de cadastro:
  - Envia POST /usuarios com os campos do formulário
  - Mostra mensagem de sucesso/erro
*/
const Register: React.FC<{ onRegistered?: () => void }> = ({
  onRegistered,
}) => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    nomeEmpresa: "",
    tipoComercio: "",
    cpfCnpj: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await res.json();
      if (!res.ok) {
        setMessage(payload?.message || "Erro no cadastro");
        return;
      }
      setMessage("Cadastro realizado com sucesso.");
      onRegistered?.();
    } catch (err: any) {
      setMessage(err.message || "Erro de rede");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 520 }}>
      <h2>Cadastro</h2>
      {message && <div>{message}</div>}
      <input
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <input
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Senha"
        type="password"
        value={form.senha}
        onChange={(e) => setForm({ ...form, senha: e.target.value })}
      />
      <input
        placeholder="Nome da Empresa"
        value={form.nomeEmpresa}
        onChange={(e) => setForm({ ...form, nomeEmpresa: e.target.value })}
      />
      <input
        placeholder="Tipo Comércio"
        value={form.tipoComercio}
        onChange={(e) => setForm({ ...form, tipoComercio: e.target.value })}
      />
      <input
        placeholder="CPF/CNPJ"
        value={form.cpfCnpj}
        onChange={(e) => setForm({ ...form, cpfCnpj: e.target.value })}
      />
      <button type="submit">Criar Conta</button>
    </form>
  );
};

export default Register;
