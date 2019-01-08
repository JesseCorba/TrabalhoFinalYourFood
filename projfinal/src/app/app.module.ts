import { FoodsPage } from './../pages/foods/foods';
import { FoodPage } from './../pages/food/food';
import { CompraPage } from './../pages/compra/compra';
import { LoginPage } from './../pages/login/login';
import { PagamentoPage } from './../pages/pagamento/pagamento';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PayPal } from '@ionic-native/paypal';

import { Facebook } from '@ionic-native/facebook';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation';

export const firebaseConfig = {
  apiKey: "AIzaSyBDkNOwcCLK_G5dY5ScHzPbXcnLlD4LJBk",
  authDomain: "yourfood-dd57c.firebaseapp.com",
  databaseURL: "https://yourfood-dd57c.firebaseio.com",
  projectId: "yourfood-dd57c",
  storageBucket: "yourfood-dd57c.appspot.com",
  messagingSenderId: "10517042361"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //ListPage,
    PagamentoPage,
    LoginPage,
    CompraPage,
    FoodPage,
    FoodsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    //ListPage,
    PagamentoPage,
    LoginPage,
    CompraPage,
    FoodPage,
    FoodsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PayPal,
    Geolocation
  ]
})
export class AppModule {}
