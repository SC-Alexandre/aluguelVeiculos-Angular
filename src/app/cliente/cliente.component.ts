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
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-cliente',
  imports: [FormsModule, Menubar, FloatLabelModule, ButtonModule, TableModule, DialogModule, InputTextModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  nome: string = '';
  cpf: string = '';
  listaClientes: Cliente[] = [];

  clienteSelecionado: Cliente = { id: 0, nome: '', cpf: '' };
  mostrarDialogEdicao: boolean = false;

  constructor(private service: ClienteService, private router: Router) {
    this.service.findAll().subscribe(clientes => this.listaClientes = clientes);
  }

  items: MenuItem[] = [
    {
      label: 'Novo Cliente',
      routerLink: '/clientes'
    },
    {
      label: 'Novo Veículo',
      routerLink: '/veiculos'
    },
    {
      label: 'Aluguel',
      routerLink: '/alugueis'
    },
    {
      label: 'Relatorio',
      routerLink: '/relatorio'
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

  editarCliente(cliente: Cliente) {
    this.clienteSelecionado = { ...cliente }; // Cópia para edição
    this.mostrarDialogEdicao = true;
  }

  salvarEdicaoCliente() {
    this.service.update(this.clienteSelecionado).subscribe(() => {
      this.mostrarDialogEdicao = false; // Fecha o modal
      this.service.findAll().subscribe(clientes => this.listaClientes = clientes); // Recarrega a lista
    }, error => {
      console.error('Erro ao atualizar cliente:', error);
    });
  }



  deletarCliente(id: number) {
    this.service.remove(id).subscribe(res => {
      this.service.findAll().subscribe(clientes=>this.listaClientes = clientes)
    }, error => {
      console.error('Erro ao deletar cliente: ', error);
    });
  }
}
