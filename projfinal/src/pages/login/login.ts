import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from '@angular/fire';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    private facebook: Facebook,
    private angularFireAuth: AngularFireAuth) {
      angularFireAuth.user.subscribe((data => {
        this.user = data;
      })); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goHome():void{
    this.navCtrl.push(HomePage);
  }


  public LoginComEmail(): void {
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.email.value , this.password.value)
      .then(() => {
        this.exibirToast('Login efetuado com sucesso');
        this.navCtrl.setRoot(HomePage);
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
    
  }

  public cadastrarUsuario(): void {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.email.value , this.password.value)
    .then(() => {
      this.exibirToast('Usuário criado com sucesso');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  public Sair(): void {
    this.angularFireAuth.auth.signOut()
    .then(() => {
      this.exibirToast('Você saiu');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  async login():Promise<any>{
    return this.facebook.login(['email'])
    .then(res =>{
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
      .then(sucess => {
        alert("Logado com sucesso");
      });
    }).catch((error)=> {
        alert("Erro")
    });
  }

  public sairFace():Promise<any>{
    return firebase.auth().signOut();
  }

  private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({duration: 3000, 
                                      position: 'botton'});
    toast.setMessage(mensagem);
    toast.present();
  }

}
