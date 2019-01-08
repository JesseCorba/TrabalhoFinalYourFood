import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration,PayPalPaymentDetails } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private payPal: PayPal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagamentoPage');
  }

  pagar(){

    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AdJL7C3y6rpBMgMryy4AJ_r3iPpBI5vCrBuq8hB0xKRGABQBn01vLZi6DLvDrRUuw9gMX9w7IWCIA60M'
    }).then(()=>{
      this.payPal.prepareToRender('PayPalEnvironmentSandbox',new PayPalConfiguration({
        acceptCreditCards: true,
        languageOrLocale: 'pt-BR',
        merchantPrivacyPolicyURL: '',
        merchantUserAgreementURL: ''
      })).then(()=>{
        let detail = new PayPalPaymentDetails('10.50','0.00','0.00');
        let payment = new PayPalPayment('10.50','BRL','Teste','Sale', detail);
        this.payPal.renderSinglePaymentUI(payment).then((response)=>{
          alert('pagamento efetuado com sucesso!');
        }, () => {
          // Error or render dialog closed without being successful
          alert('erro no render!');
        });
      }, () => {
        // Error in configuration
        alert('erro no configuration!');
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
      alert('erro na inicialização!');
    });


  }
}
