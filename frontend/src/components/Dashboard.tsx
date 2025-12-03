import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Badge,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import api from "../api";
import MovementModal from "./MovementModal";

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  minimo?: number;
};

type Mov = {
  id: number;
  produtoNome: string;
  tipoMovimentacao: string;
  quantidade: number;
  createdAt?: string;
  usuarioId?: number;
};

const Dashboard: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [movs, setMovs] = useState<Mov[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [lowCount, setLowCount] = useState(0);

  const load = async () => {
    try {
      const [pRes, mRes] = await Promise.all([
        api.get("/estoque"),
        api.get("/movimentacao"),
      ]);

      setProdutos(pRes.data || []);

      const list = (mRes.data || [])
        .slice()
        .reverse()
        .slice(0, 8)
        .map((m: any) => ({
          id: m.id,
          produtoNome:
            m.produto?.nome ||
            m.nomeProduto ||
            m.nome ||
            (m.idProduto ? `#${m.idProduto}` : "Produto"),
          tipoMovimentacao: m.tipoMovimentacao,
          quantidade: m.quantidade,
          createdAt: m.createdAt,
          usuarioId: m.idUsuario,
        }));

      setMovs(list);

      const low = (pRes.data || []).filter((x: any) => {
        const min = typeof x.minimo === "number" ? x.minimo : 5;
        return x.quantidade <= min;
      }).length;

      setLowCount(low);
    } catch (err) {
      // console.warn(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box p={3}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Registrar Movimentação
        </Button>
      </Box>

      {/* Cards com métricas */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Produtos cadastrados</Typography>
              <Typography variant="h5">{produtos.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Movimentações (últimas)</Typography>
              <Typography variant="h5">{movs.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Estoque baixo</Typography>
              <Badge
                color={lowCount > 0 ? "error" : "default"}
                badgeContent={lowCount}
              >
                <Typography variant="h5">{lowCount}</Typography>
              </Badge>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Conteúdo inferior */}
      <Grid container spacing={2}>
        {/* Últimas movimentações */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Últimas Movimentações
              </Typography>
              <List>
                {movs.map((m) => (
                  <ListItem key={m.id}>
                    <Box display="flex" justifyContent="space-between" width="100%">
                      <Box>
                        <Typography variant="subtitle2">{m.produtoNome}</Typography>
                        <Typography variant="caption">
                          {m.tipoMovimentacao} — {m.quantidade} unidades
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="caption">
                          {m.createdAt
                            ? new Date(m.createdAt).toLocaleString()
                            : ""}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Usuário: {m.usuarioId ?? "-"}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}

                {movs.length === 0 && (
                  <Typography variant="body2" p={2}>
                    Nenhuma movimentação encontrada.
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Produtos com estoque baixo */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Produtos com estoque baixo
              </Typography>

              {produtos.filter((p) =>
                typeof p.minimo === "number"
                  ? p.quantidade <= p.minimo
                  : p.quantidade <= 5
              ).length === 0 ? (
                <Typography>Nenhum produto com estoque crítico</Typography>
              ) : (
                <List>
                  {produtos
                    .filter((p) =>
                      typeof p.minimo === "number"
                        ? p.quantidade <= p.minimo
                        : p.quantidade <= 5
                    )
                    .map((p) => (
                      <ListItem
                        key={p.id}
                        sx={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <span>{p.nome}</span>
                        <span>{p.quantidade}</span>
                      </ListItem>
                    ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <MovementModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          load();
        }}
        onSuccess={() => load()}
      />
    </Box>
  );
};

export default Dashboard;