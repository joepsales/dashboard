import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog } from '@angular/material/dialog';
import { UserDataComponent } from 'src/app/user-data/user-data.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private keyCloakService: KeycloakService, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout(){
    this.keyCloakService.logout();
  }

  myProfile(){
    window.location.href = "http://localhost:8085/auth/realms/angular-web/account/";
  }

  onOpenDialogClick() {
    this.matDialog.open(UserDataComponent);
  }

}
