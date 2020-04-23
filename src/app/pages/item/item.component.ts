import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-desc.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  itemproducto: ProductoDescripcion;
  id: string;

  constructor(
    private route: ActivatedRoute,
    public servicioProducto: ProductosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      this.id = parametros.id;

      this.servicioProducto
        .getProductoIem(parametros.id)
        .subscribe((products: ProductoDescripcion) => {
          this.itemproducto = products;
        });
    });
  }
}
