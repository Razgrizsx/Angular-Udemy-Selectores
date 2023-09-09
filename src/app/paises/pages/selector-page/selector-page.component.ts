import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises-services.service';
import { Borders, Pais } from '../../interfaces/paises.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit{

  constructor(private fb : FormBuilder, private paisesService : PaisesService){}

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones

   /* this.miFormulario.get('region')?.valueChanges
    .subscribe(region => this.paisesService.paises(region)
    .subscribe(paises =>  this.paises = paises)
    ) */

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_) => {this.miFormulario.get('pais')?.reset(''); this.miFormulario.get("bordes")?.reset('')}),
        switchMap(region => this.paisesService.paises(region))
      )
      .subscribe(paises => {this.paises = paises; 
        })

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap((_) => {this.miFormulario.get('frontera')?.reset('')}),
        switchMap(pais => this.paisesService.bordes(pais))
        )
        .subscribe(paises => {
          if(paises===null){
            this.bordes = {borders: []}
          }else{
            this.bordes = paises; console.log(paises)
          }
          })
  }

    

  regiones : string[] = []

  paises : Pais[] = []

  bordes : Borders = {borders: []}

  miFormulario : FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]]
  })

  guardar(){
    console.log(this.miFormulario.value)
  }

}
