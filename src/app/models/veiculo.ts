export interface Veiculo {
  id?: number;
  modelo: string;
  tipo: 'Carro' | 'Moto';
  disponivel: boolean;
}
