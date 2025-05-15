import { Injectable } from '@angular/core';
import {Veiculo} from '../models/veiculo';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  listaVeiculos: Veiculo[]=[];
  url: string = 'http://localhost:8080';

  constructor(private http : HttpClient) { }

  save(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.url + '/Veiculo', veiculo);
  }

  remove(id : number):Observable<void>{
    this.listaVeiculos = this.listaVeiculos.filter(veiculo=> veiculo.id !== id)
    return this.http.delete<void>(this.url + '/Veiculo/' + id);
  }

  update(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.put<Veiculo>(this.url + '/Veiculo', veiculo);
  }

  findAll():Observable<Veiculo[]>{
    return this.http.get<Veiculo[]>(this.url + '/Veiculo')
  }

}
