import { Injectable } from '@angular/core';
import {Cliente} from '../models/cliente';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  listaClientes: Cliente[] = [];
  url: string = 'http://localhost:8080';
  constructor(private http : HttpClient) { }

  save(cliente: Cliente): Observable<Cliente> {
    if (!cliente.nome || !cliente.cpf) {
      alert("Preencha todos os campos antes de salvar o cliente.");
      return new Observable<Cliente>();
    }

    if (!this.validarCPF(cliente.cpf)) {
      alert('CPF inválido');
      return new Observable<Cliente>();
    }

    return this.http.post<Cliente>(this.url + '/Cliente', cliente);
  }


  remove(id : number):Observable<void>{
    this.listaClientes = this.listaClientes.filter(cliente=> cliente.id !== id)
    return this.http.delete<void>(this.url + '/Cliente/' + id);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/Cliente/${cliente.id}`, cliente);
  }

  findAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url + '/Cliente')
  }

  // Metodos de validacao:
  private validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111.11)
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9), 10)) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    return resto === parseInt(cpf.charAt(10), 10);
  }
}
