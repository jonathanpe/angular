import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError : string = null;

  constructor(
    private router: Router // service router
  ) { }

  ngOnInit() { }

  onSubmit(form : NgForm){
    if(form.value['email'] == 'alan@alan.fr' && form.value['password'] == '123')
    {
      this.router.navigate(
        ['/albums'], // destination donc l'uri
        {queryParams : { message : 'succes'}} // on peut récupérer ces informations (TODO)
      );
    }else{
      this.messageError = "Error email or password";
    }
  }

}