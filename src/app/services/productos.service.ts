import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos: Producto[] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http
      .get('https://portafolio-ccfac.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
        console.log(resp);
        this.productos = resp;
        this.cargando = false;
      });
  }
}
