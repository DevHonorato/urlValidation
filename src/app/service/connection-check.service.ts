import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionCheckService {

hasConnection: string = "Online";

  constructor(
    private connectionCheck: ConnectionService
  ) {

    this.connectionCheck.monitor().subscribe((hasConnection) => {

      let alertString = "You are: ";
      alertString += hasConnection ? "Online" : "Offline"
      // alert(alertString);

      return this.hasConnection = hasConnection ? "Online" : "Offline";

    });

  }
}
