import { RegisterPage } from './../register/register.page';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { threadId } from 'worker_threads';
import { Router } from '@angular/router';
import { registerContentQuery } from '@angular/core/src/render3';

@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    email: '';
    password: '';

    constructor(public afAuth: AngularFireAuth, public user: UserService, public router: Router) { }

    ngOnInit() {
    }

    async login() {
        const { email, password } = this;
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

            if (res.user) {
                this.user.setUser({
                    email,
                    uid: res.user.uid

                });

                this.router.navigate(['/home']);
            }

        } catch (err) {
            console.dir(err);
            if (err.code === 'auth/user-not-found') {
                console.log('Usuário não cadastrado');
            }

        }

    }

    async register() {
        this.router.navigate(['/register']);

    }

}
