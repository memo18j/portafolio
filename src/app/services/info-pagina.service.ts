import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) {
    // console.log('informacion de la info-pagina listo');
    this.cargarFireBase();
    this.cargarInformacionLocal();
  }

  // leer el archivo JSON
  private cargarInformacionLocal() {
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarFireBase() {
    this.http
      .get('https://portafolio-ccfac.firebaseio.com/equipo.json')
      .subscribe((resp: any[]) => {
        this.equipo = resp;
        console.log(this.equipo);
      });
  }
}
