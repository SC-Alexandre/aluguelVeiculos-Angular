export interface Veiculo {
  id?: number;
  modelo: string;
  tipo: 'CARRO' | 'MOTO';
  disponivel: boolean;
}
