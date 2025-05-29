import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {Client} from '../models/invoices';

// mock
let clients: Client[] = [
  {
    id: 'client-1',
    name: 'Mario Rossi'
  },
  {
    id: 'client-2',
    name: 'John Doe'
  }
]

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {}

  loadClients() {
    return of(clients);
  }

  deleteClient(id: string) {
    clients = clients.filter(c => c.id !== id);
    return of(id);
  }

  addClient(client: Omit<Client, 'id'>) {
    const newClient = { ...client, id: '' + Math.random() };
    clients = [...clients, newClient];
    return of(newClient);
  }
}
