import React from "react";

/*
  Página de perfil simples:
  - Mostra dados do usuário (guardados em localStorage)
  - Logout remove 'user' do localStorage e chama onLogout
*/
const Profile: React.FC<{ user: any; onLogout: () => void }> = ({
  user,
  onLogout,
}) => {
  if (!user) return <div>Usuário não autenticado.</div>;

  return (
    <div>
      <h2>Perfil</h2>
      <p>
        <strong>Nome:</strong> {user.nome}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Empresa:</strong> {user.nomeEmpresa}
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
