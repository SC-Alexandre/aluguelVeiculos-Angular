import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
export const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'veiculos', component: VeiculoComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
];
