export interface Veiculo {
  id: number;
  modelo: string;
  tipo: 'carro' | 'moto';
  disponivel: boolean;
}
