import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  lista:any = [];

  constructor(public firestore: AngularFirestore) {


    // listar o obtener
    this.firestore.collection('frutas').valueChanges().subscribe( res => {
      console.log(res);
      this.lista = res;
    })
  }

  agregar(){
    // agregar
    const data = { 'nombre':'Mango', 'precio':155.5 };
    this.firestore.collection('frutas').add(data).then( res => {

      console.log(res);

    })
  }

  ngOnInit(): void {
  }

}
