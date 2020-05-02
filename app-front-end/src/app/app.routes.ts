// Imports Angular
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
// Imports Components
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductComponent } from "./pages/product/product.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { CarsComponent } from "./pages/products/cars/cars.component";
import { CategoriesComponent } from "./pages/products/categories/categories.component";
import { SearchComponent } from "./pages/search/search.component";
import { PaisesComponent } from "./pages/paises/paises.component";

const routes: Routes = [
  // Se agregan los nombres de los componentes creados
  {
    path: "home",
    component: HomeComponent,
    data: { tittle: "Inicio", icon: "" }
  },
  {
    path: "about",
    component: AboutComponent,
    data: { tittle: "Acerca de", icon: "" }
  },
  {
    path: "paises",
    component: PaisesComponent,
    data: { tittle: "Paises", icon: "" }
  },
  {
    path: "products",
    component: ProductsComponent,
    children: [
      {
        path: "cars",
        component: CarsComponent,
        data: { tittle: "Autos", icon: "" }
      },
      { path: "categories/:category", component: CategoriesComponent },
      { path: "", redirectTo: "categories/Cars", pathMatch: "full" },
      { path: "**", redirectTo: "categories/cars" }
    ],
    data: { tittle: "Products", icon: "" }
  },
  { path: "product/:code/:category/:search", component: ProductComponent },
  { path: "search/:criterio", component: SearchComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  // cambiar childRoot por "forRoot"
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
