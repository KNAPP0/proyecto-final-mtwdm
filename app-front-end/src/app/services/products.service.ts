import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModelos } from '../models/models';
import { Observable } from 'rxjs';
//siempre buscar un solo punto de control
//const URL_PRODUCTS = 'https://angular-products-lopez.firebaseio.com/productos.json';
//const URL_PRODUCTS = 'http://localhost:5000';
const URL_PRODUCTS = 'http://api.midominio.com';
const URL_Paises = 'https://apipettde.azurewebsites.net/api/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }
  getall() {
    return this.http.get(URL_Paises);
  }

  // getAll() {
  //   return this.http.get(URL_PRODUCTS + "/products");
  // }
  // getCategory(category: string) {
  //   return new Observable(observer => {
  //     this.http.get(URL_PRODUCTS + '/products/category/').subscribe((data: ProductoModelos[]) => {
  //       const filter = data.filter(item => item.categoria == category || item.categoria.indexOf(category) >= 0);
  //       observer.next(filter);
  //     });
  //   });
  // }

  getCategory(categoria: string) {
    return new Observable(observer => {
      this.http.get(URL_PRODUCTS + "/products/category/" + categoria).subscribe((data: ProductoModelos[]) => {
        observer.next(data);
        console.log(data);
      });
    });
  }

  getByCode(code: string) {
    return new Observable(observer => {
      this.http.get(URL_PRODUCTS + "/product/" + code).subscribe((data: ProductoModelos[]) => {
        //const filter = data.filter(item => item.codigo == code);
        observer.next(data);
        //observer.next(data);
      });
    });
  }
  getSearch(descripcion: string) {
    return new Observable(observer => {
      this.http.get(URL_PRODUCTS + "/products/descripcion/" + descripcion).subscribe((data: ProductoModelos[]) => {
        // const filter = data.filter(item =>
        //   item.descripcion.toLowerCase() == descripcion.toLowerCase() || item.descripcion.toLowerCase().indexOf(descripcion.toLowerCase()) >= 0);
        observer.next(data);
      });
    });
  }
  getPaises() {
    return this.http.get(URL_Paises);
  }

}