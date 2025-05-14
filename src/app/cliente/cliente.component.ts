import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {Menubar} from 'primeng/menubar';
import {FloatLabelModule} from 'primeng/floatlabel';
import {Cliente} from '../models/cliente';
import {TableModule} from 'primeng/table';
import {Router} from '@angular/router';
import {ClienteService} from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  imports: [FormsModule, Menubar, FloatLabelModule, ButtonModule, TableModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  nome: string = '';
  cpf: string = '';
  listaClientes: Cliente[] = [];

  constructor(private service: ClienteService, private router: Router) {
    this.service.findAll().subscribe(clientes => this.listaClientes = clientes);
  }

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

  salvarCliente() {
    this.service.save({nome: this.nome, cpf: this.cpf })
      .subscribe(() => {
        this.service.findAll().subscribe(clientes => this.listaClientes = clientes)
        this.nome= "";
        this.cpf= "";
      })
  }

  editarCliente(cliente: any) {

  }

  deletarCliente(id: number) {
    this.service.remove(id).subscribe(res => {
      this.service.findAll().subscribe(clientes=>this.listaClientes = clientes)
    }, error => {
      console.error('Erro ao deletar cliente: ', error);
    });
  }
}
