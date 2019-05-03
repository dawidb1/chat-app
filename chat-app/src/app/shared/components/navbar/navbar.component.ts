import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/authorization/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  logout() {
    this.loginService.logout();
  }
}
