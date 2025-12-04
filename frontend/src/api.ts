import axios from 'axios';

// Lê a URL diretamente da variável de ambiente.
// Se ela não existir, o valor será undefined, o que é melhor que uma string vazia ou incorreta.
// O Vite garante que essa variável existe se você criar os arquivos .env corretamente.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log("API URL:", API_BASE_URL);
if (!API_BASE_URL) {
  console.error("ATENÇÃO: A variável de ambiente VITE_API_URL não foi definida. As requisições para a API falharão.");
}

// cria a instância do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;