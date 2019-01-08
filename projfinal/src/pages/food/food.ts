import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration,PayPalPaymentDetails } from '@ionic-native/paypal';
import { Geolocation} from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';



declare var google: any;

@IonicPage()
@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
})
export class FoodPage {
  items: Observable<any[]>;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latOri  = -5.077481;
  longOri = -42.792246;
  MyLocation :any;
  latDest = -2.946800; 
  longDest = -41.731439;
  produto: any;
  loja: any;

  markers = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private payPal: PayPal,
              public alertCtrl: AlertController,
              private geolocation: Geolocation,
              public db: AngularFireDatabase) {

              this.items = db.list('loja').valueChanges();
             
              this.produto = this.navParams.get("item");
              this.items.forEach(e =>{
                this.MyLocation = e[this.produto.loja -1].endereco;
                console.log("loja " + e[this.produto.loja -1].id)
               
              });
             
              

  }

//inicio do código relacionado ao map

calcRota(latDest, longDest) {

this.loadMap(latDest, longDest, this.MyLocation.lat,this.MyLocation.long);
}
ionViewDidLoad() {
  this.geolocation.getCurrentPosition().then((resp) => {

    this.calcRota( resp.coords.latitude, resp.coords.longitude);

    console.log(resp)
   }).catch((error) => {
     console.log('Error getting location', error);
   });
  console.log('ionViewDidLoad CompraPage');
  
}
private loadMap(latOri, lngOri, latDest, lngDest) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
 directionsDisplay = new google.maps.DirectionsRenderer();
 var bounds = new google.maps.LatLngBounds;
 var markersArray = [];

 var origin1 = {lat: parseFloat(latOri), lng: parseFloat(lngOri)};
 var destinationA = {lat: latDest, lng: lngDest};

 var destinationIcon = 'https://chart.googleapis.com/chart?' +
     'chst=d_map_pin_letter&chld=D|FF0000|000000';
 var originIcon = 'https://chart.googleapis.com/chart?' +
     'chst=d_map_pin_letter&chld=O|FFFF00|000000';
 var map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: latOri, lng: lngOri},
   zoom: 100
 });
 directionsDisplay.setMap(map);
 var geocoder = new google.maps.Geocoder;

 var service = new google.maps.DistanceMatrixService;
 service.getDistanceMatrix({
   origins: [origin1],
   destinations: [destinationA],
   travelMode: 'DRIVING',
   unitSystem: google.maps.UnitSystem.METRIC,
   avoidHighways: false,
   avoidTolls: false
 }, function(response, status) {
   if (status !== 'OK') {
     alert('Error was: ' + status);
   } else {
     var originList = response.originAddresses;
     var destinationList = response.destinationAddresses;
     var outputDiv = document.getElementById('output');
     outputDiv.innerHTML = '';
     deleteMarkers(markersArray);

     var showGeocodedAddressOnMap = function(asDestination) {
       var icon = asDestination ? destinationIcon : originIcon;
       return function(results, status) {
         if (status === 'OK') {
           map.fitBounds(bounds.extend(results[0].geometry.location));

         } else {
           alert('Geocode was not successful due to: ' + status);
         }
       };
     };

     directionsService.route({
       origin: origin1,
       destination: destinationA,
       travelMode: 'DRIVING'
     }, function(response, status) {
       if (status === 'OK') {
         directionsDisplay.setDirections(response);
       } else {
         window.alert('Directions request failed due to ' + status);
       }
     });


     for (var i = 0; i < originList.length; i++) {
       var results = response.rows[i].elements;
       geocoder.geocode({'address': originList[i]},
           showGeocodedAddressOnMap(false));
       for (var j = 0; j < results.length; j++) {
         geocoder.geocode({'address': destinationList[j]},
             showGeocodedAddressOnMap(true));
         outputDiv.innerHTML += 'DE: ' + originList[i] + ' || PARA: ' + destinationList[j] +
             '|| DISTÂNCIA: ' + results[j].distance.text + ' EM ' +
             results[j].duration.text + '<br>';
       }
     }
   }
 });

 function deleteMarkers(markersArray) {
   for (var i = 0; i < markersArray.length; i++) {
     markersArray[i].setMap(null);
   }
   markersArray = [];
 }
}

//fim do código

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
        let detail = new PayPalPaymentDetails(this.produto.preco,'0.00','0.00');
        let payment = new PayPalPayment(this.produto.preco,'BRL',this.produto.nome,'Sale', detail);
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
