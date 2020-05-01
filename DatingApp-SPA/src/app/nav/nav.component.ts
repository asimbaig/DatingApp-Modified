import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  navbarOpen = false;
  public clicked = false;
  el: any;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  toggleNavbar()
  {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit()
  {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  onClick(event): void
  {
    event.preventDefault();
    event.stopPropagation();
    this.clicked = true;
  }

  @HostListener('document:click', ['event'])
  private clickedOutside(event): void
  {
    if (this.clicked)
    {
        this.el.nativeElement.querySelector('.dropdown-menu').classList.toggle('show');
    }
  }

  login()
  {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Successful...');
    }, error => {
      this.alertify.error('Error Failed Login...');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
