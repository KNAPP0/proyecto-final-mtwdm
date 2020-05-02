import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  misdatos: any[] = [];
  constructor(private productsSvc: ProductsService) { 
    this.productsSvc.getPaises().subscribe((data: any[]) => {
      this.misdatos = data;
      console.log('Data', data);
    })
  }

  ngOnInit() {
  }

}
