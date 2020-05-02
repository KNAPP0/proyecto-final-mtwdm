import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductoModelos } from 'src/app/models/models';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  product: ProductoModelos = {};
  category: string = '';
  search: string = '';
  link: string = '';
  param: string = '';
  constructor(
    private router: ActivatedRoute, 
    private productsSvc: ProductsService
    ) { 
    this.router.params.subscribe(params => {
      const code = params['code'];
      this.category = params['category'];
      this.search = params['search'];
        //console.log(params);
        this.productsSvc.getByCode(code).subscribe((data: ProductoModelos) => {
          //console.log(data);
          this.product = data;
          this.GetLink();
        })

    })
  }

  ngOnInit() {
  }
  private GetLink(){
    if(this.search != ''){
      this.link = '/search';
      this.param = this.search;
    }else{
      this.link = '/products/categories';
      this.param = this.category;
    }
  }

}
