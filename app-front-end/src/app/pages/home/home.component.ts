import { Component, OnInit } from "@angular/core";
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: []
})
export class HomeComponent implements OnInit {
  constructor() {
    // PNotifyButtons; // Initiate the module. Important!
    // PNotify.defaults.styling = "bootstrap4";
    // PNotify.alert({
    //   tittle: "Notificación Exitosa!",
    //   text: "Texto a mostrar",
    //   animation: "fade",
    //   addclass:
    //     "alert alert-success border-success alert-styled-right alert-arrow-right",
    //   shadow: true,
    //   hide: true,
    //   delay: 1000 * 10,
    //   type: "success",
    //   opacity: 0.9
    // });
  }

  ngOnInit() { }
}
