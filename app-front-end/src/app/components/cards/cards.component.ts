import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductoModelos } from 'src/app/models/models';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: []
})
export class CardsComponent implements OnInit {

  @Input() products: ProductoModelos[];
  @Input() category: string = '';
  @Output() onClickRedirect: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  redirect(precio: number){
    //validar
    //Guardar en base de datos
    this.onClickRedirect.emit(precio);
  }

}
