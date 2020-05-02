import { Component, OnInit } from '@angular/core';
import { ProductoModelos } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styles: []
})
export class CarsComponent implements OnInit {

  misdatos: ProductoModelos[] = [];

  // cadena: string = 'soy una cadena';
  // numero: number = 90;
  // status: boolean = true;
  // objeto: any = {};
  // array: any[] = [];
  // fecha: Date = new Date();

  constructor(private productsSvc: ProductsService) {
    
    
    //this.productsSvc.getAll().subscribe((data: ProductoModelos[]) => {
      this.productsSvc.getCategory('Cars').subscribe((data: ProductoModelos[]) => {
      this.misdatos = data;
      console.log('Data', data);
    })

    // this.productsSvc.getCategory('ships');
    //   console.log();
    // this.http.get('assets/data/productos.json').subscribe((data:ProductoModelos[]) => {
    //   this.misdatos = data;
    //   console.log('MIS DATOS LEIDOS DENTRO DEL GET | SUSCRIBE', this.misdatos);

    // });
    //console.log('MIS DATOS LEIDOS AFUERA DEL GET | SUSCRIBE', this.misdatos);
  }

  ngOnInit() {
  }

}
