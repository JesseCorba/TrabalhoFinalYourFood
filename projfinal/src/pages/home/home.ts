import { FoodsPage } from './../foods/foods';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs-compat';


import { FirebaseApp } from '@angular/fire';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<any[]>;
  user: any;

  constructor(public navCtrl: NavController,public db: AngularFireDatabase) {
    this.items = db.list('loja').valueChanges();
    console.log(this.items);
  }
  
  goFoods(item){
    this.navCtrl.push(FoodsPage, {loja:item});
  }
}