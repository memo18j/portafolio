import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public servicioProducto: ProductosService
  ) {
    this.route.params.subscribe((parametro) => {
      this.servicioProducto.getBuscarProductoFiltrado(parametro.termino);
    });
  }

  ngOnInit(): void {}
}
