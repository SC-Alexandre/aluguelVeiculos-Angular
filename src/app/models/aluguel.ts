export interface Aluguel {
  id?: number;
  cliente: { id: number; nome?: string };
  veiculo: { id: number; modelo?: string };
  dataInicio: string;
  dataFim: string;
}
