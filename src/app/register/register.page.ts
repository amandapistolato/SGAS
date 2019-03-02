import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';

import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: '';
  address: '';
  cpf: '';
  email: '';
  password: '';

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ['OK']
  });

    await alert.present();
}

  async register() {
    const { name, address, cpf, email, password} = this;


    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

      this.afstore.doc(`users / ${res.user.uid}`).set({
          email
      });

      this.user.setUser({
          email,
          uid: res.user.uid

      });

      this.presentAlert('Successo', 'Você está registrado!');
      this.router.navigate(['/home']);


    } catch (error) {
      console.dir(error);

    }

  }

 }

