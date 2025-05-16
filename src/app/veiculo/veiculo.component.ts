import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Menubar} from 'primeng/menubar';
import {FloatLabelModule} from 'primeng/floatlabel';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MenuItem} from 'primeng/api';
import {Veiculo} from '../models/veiculo';
import { DropdownModule } from 'primeng/dropdown';
import {Router} from '@angular/router';
import {VeiculoService} from '../service/veiculo.service';

@Component({
  selector: 'app-veiculo',
  imports: [FormsModule, Menubar, FloatLabelModule, ButtonModule, TableModule, DropdownModule],
  templateUrl: './veiculo.component.html',
  styleUrl: './veiculo.component.css'
})
export class VeiculoComponent {
  modelo: string = '';
  tipo: 'Carro' | 'Moto' | undefined;
  disponivel: boolean = true;
  listaVeiculos: Veiculo[] = [];

  constructor(private service: VeiculoService, private router: Router) {
    this.service.findAll().subscribe(veiculos => this.listaVeiculos = veiculos);
  }

  tipos = [
    { label: 'Carro', value: 'Carro' },
    { label: 'Moto', value: 'Moto' }
  ];

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
    if (!this.modelo || !this.tipo) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoVeiculo: Veiculo = {
      modelo: this.modelo,
      tipo: this.tipo,
      disponivel: true
    };

    this.service.save(novoVeiculo)
      .subscribe(() => {
        this.service.findAll().subscribe(veiculos => this.listaVeiculos = veiculos);
        this.modelo = "";
        this.tipo = undefined;
      });
  }


  editarVeiculo(veiculo: any) {
  }

  deletarVeiculo(id: number) {
    this.service.remove(id).subscribe(res => {
      this.service.findAll().subscribe(veiculos=>this.listaVeiculos = veiculos)
    }, error => {
      console.error('Erro ao deletar Veiculo: ', error);
    });
  }

}
