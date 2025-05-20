import { Component } from '@angular/core';
import {Menubar} from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table';
import { Cliente } from '../models/cliente';
import { Veiculo } from '../models/veiculo';
import { Aluguel } from '../models/aluguel';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {AluguelService} from '../service/aluguel.service';
import {ClienteService} from '../service/cliente.service';
import {VeiculoService} from '../service/veiculo.service';

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

  ptBR: any;

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

  devolverVeiculo(id: number) {
    this.aluguelService.devolverVeiculo(id).subscribe(() => {
      this.aluguelService.getAlugueisAtivos().subscribe(alugueis => {
        this.alugueisAtivos = alugueis;
      });
    }, error => {
      console.error('Erro ao devolver veículo:', error);
    });
  }

  editarAluguel(aluguel: any) {

  }
}
