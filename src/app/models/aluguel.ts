export interface Aluguel {
  cliente: { id: number };
  veiculo: { id: number };
  dataInicio: string;
  dataFim: string;
}
