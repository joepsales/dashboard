import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  public postsSub: any;
  data: any[] = [];

  constructor(private keyCloakService: KeycloakService) { }


  ngOnInit(): void {
    let userDetails = this.keyCloakService.loadUserProfile();
    userDetails.then((data) => {
      //console.log("promise resolved with: " + JSON.stringify(data));
      this.postsSub = data;
      console.log(this.postsSub);
      this.data.push(this.postsSub);
    })
  }

  fileDownload(){
    var sJson = JSON.stringify(this.data);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "primer-server-task.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
}
