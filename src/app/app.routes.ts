import { Routes } from '@angular/router';
import { AluguelComponent } from './aluguel/aluguel.component';
import { ClienteComponent } from './cliente/cliente.component';
//import { RelatorioComponent } from './relatorio/relatorio.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
export const routes: Routes = [
  { path: 'alugueis', component: AluguelComponent },
  { path: 'clientes', component: ClienteComponent },
  //{ path: 'relatorio', component: RelatorioComponent },
  { path: 'veiculos', component: VeiculoComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
];
