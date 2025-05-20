import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Aluguel} from '../models/aluguel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {
  url: string = 'http://localhost:8080';
  constructor(private http : HttpClient) { }

  registrarAluguel(aluguel: Aluguel): Observable<Aluguel> {
    return this.http.post<Aluguel>(this.url + '/Aluguel', aluguel);
  }

  getAlugueisAtivos(): Observable<Aluguel[]> {
    return this.http.get<Aluguel[]>(this.url + '/Aluguel/ativos');
  }

  devolverVeiculo(id: number): Observable<Aluguel> {
    return this.http.put<Aluguel>(this.url + '/Aluguel/' + id, {});
  }

}
