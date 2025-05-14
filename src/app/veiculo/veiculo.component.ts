import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Menubar} from 'primeng/menubar';
import {FloatLabelModule} from 'primeng/floatlabel';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MenuItem} from 'primeng/api';
import {Veiculo} from '../models/veiculo';

@Component({
  selector: 'app-veiculo',
  imports: [FormsModule, Menubar, FloatLabelModule, ButtonModule, TableModule],
  templateUrl: './veiculo.component.html',
  styleUrl: './veiculo.component.css'
})
export class VeiculoComponent {
  modelo: string = '';

  listaVeiculos: Veiculo[] = [];

  items: MenuItem[] = [
    {
      label: 'Novo Cliente',
      routerLink: '/clientes'
    },
    {
      label: 'Novo Veiculo',
      routerLink: '/veiculos'
    },
    {
      label: 'Aluguel',
      routerLink: '/alugueis'
    }
  ];

  salvarVeiculo() {

  }

  editarVeiculo(veiculo: any) {

  }

  deletarVeiculo(id) {

  }
}
