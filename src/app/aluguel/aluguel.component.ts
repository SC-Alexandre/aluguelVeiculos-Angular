import { Component } from '@angular/core';
import {Menubar} from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table';
import { AluguelService } from '../services/aluguel.service';
import { ClienteService } from '../services/cliente.service';
import { VeiculoService } from '../services/veiculo.service';
import { Cliente } from '../models/cliente';
import { Veiculo } from '../models/veiculo';
import { Aluguel } from '../models/aluguel';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aluguel',
  imports: [Menubar, DropdownModule, DatePickerModule, ButtonModule, TableModule, DialogModule, FormsModule],
  templateUrl: './aluguel.component.html',
  styleUrl: './aluguel.component.css'
})
export class AluguelComponent {
  clientes: Cliente[] = [];
  veiculos: Veiculo[] = [];
  alugueisAtivos: Aluguel[] = [];
  dataInicio: Date = new Date();
  dataFim: Date = new Date();

  aluguel: Aluguel = {
    cliente: { id: 0 },
    veiculo: { id: 0 },
    dataInicio: '',
    dataFim: ''
  };

  constructor(
    private aluguelService: AluguelService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService
  ) { }

  ngOnInit() {
    this.clienteService.findAll().subscribe(clientes => this.clientes = clientes);
    this.veiculoService.findAll().subscribe(veiculos => this.veiculos = veiculos);
    this.carregarAlugueisAtivos();
  }

  carregarAlugueisAtivos() {
    this.aluguelService.getAlugueisAtivos().subscribe(data => this.alugueisAtivos = data);
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

  registrarAluguel() {
    // Converte as datas do Date para string no formato "YYYY-MM-DD"
    this.aluguel.dataInicio = this.dataInicio.toISOString().split('T')[0];
    this.aluguel.dataFim = this.dataFim.toISOString().split('T')[0];

    this.aluguelService.registrarAluguel(this.aluguel).subscribe(() => {
      this.carregarAlugueisAtivos();
      this.aluguel = { cliente: { id: 0 }, veiculo: { id: 0 }, dataInicio: '', dataFim: '' };
      this.dataInicio = new Date();
      this.dataFim = new Date();

    });
  }

}
