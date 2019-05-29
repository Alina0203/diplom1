import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';




@Component({
    templateUrl: "./register.component.html"
})

export class RegisterComponent {
    credentials: TokenPayload = {
        id_user: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        phone: "",
        password: ""

    };

    constructor(private auth:AuthenticationService, private router: Router) {}

    register () {
        this.auth.register(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl("/profile");
            },
            err => {
                console.error(err);
            }
        )
    }
}
