import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  breadcrumb: any = {};
  constructor(private router: Router) {
    this._getBreadcrumbs().subscribe(event => {
      this.breadcrumb = event;
      //console.log(event);
    });
   }

  ngOnInit() {
  }

  search(criterio: string){
    //console.log('El criterio de busqueda es:', criterio);
    this.router.navigate(['/search', criterio])
  }

  _getBreadcrumbs(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd), 
      map((event: ActivationEnd) => event.snapshot.data)
    )
    // this.router.events.subscribe(event => {
    //   console.log(event);
    //})
  }
}
