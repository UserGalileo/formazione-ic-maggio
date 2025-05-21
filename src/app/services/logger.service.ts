import {Injectable} from '@angular/core';

// Tree-shakeable
// Servizio globale, singleton
@Injectable({
  providedIn: 'root' // come se fosse nei provider di AppComponent
})
export class LoggerService {

  constructor() {
    console.log('initialized');
  }

  log(msg: string) {
    console.log(msg);
  }
}
