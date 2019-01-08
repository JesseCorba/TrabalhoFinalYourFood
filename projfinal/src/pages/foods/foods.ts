import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { FoodPage } from '../food/food';
import { Observable } from 'rxjs-compat';


@IonicPage()
@Component({
  selector: 'page-foods',
  templateUrl: 'foods.html',
})
export class FoodsPage {
  items: Observable<any[]>;
  loja: any;
  produto = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    this.items = db.list('loja').valueChanges();
    this.loja = this.navParams.get("loja");
    this.loja.produtos.forEach(element => {
      this.produto.push(element.prod)
    });
    console.log(this.loja)
  
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad FoodsPage');
  }

  goFood(item){
    this.navCtrl.push(FoodPage,{item:item});
  }
}
