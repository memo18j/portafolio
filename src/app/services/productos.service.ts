import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interface';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get('https://portafolio-ccfac.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProductoIem(id: string) {
    return this.http.get(
      `https://portafolio-ccfac.firebaseio.com/productos/${id}.json`
    );
  }

  getBuscarProductoFiltrado(termino: string) {
    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar despues de cargar los productos && aplicar filtro
        this.filtroDeProductos(termino);
      });
    } else {
      // aplicar filtro
      this.filtroDeProductos(termino);
    }
  }

  private filtroDeProductos(termino: string) {
    termino = termino.toLowerCase();

    this.productosFiltrados = [];
    this.productos.forEach((prod) => {
      const tituloLowe = prod.titulo.toLowerCase();
      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLowe.indexOf(termino) >= 0
      ) {
        this.productosFiltrados.push(prod);
      }
    });
  }
}
