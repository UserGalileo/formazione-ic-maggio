import {inject, Injectable, signal} from '@angular/core';
import {InvoicesService} from '../../services/invoices.service';
import {ClientsService} from '../../services/clients.service';
import {Client, Invoice} from '../../models/invoices';
import {forkJoin} from 'rxjs';

@Injectable()
export class InvoicesStore {

  // Deps
  invoicesService = inject(InvoicesService);
  clientsService = inject(ClientsService);

  // States
  invoices = signal<Invoice[]>([]);
  clients = signal<Client[]>([]);
  loadingInvoices = signal(false);
  loadingClients = signal(false);


  loadInvoices() {
    this.loadingInvoices.set(true);
    this.loadingClients.set(true);

    forkJoin([
      this.invoicesService.loadInvoices(),
      this.clientsService.loadClients()
    ]).subscribe(([invoices, clients]) => {
      this.invoices.set(invoices);
      this.clients.set(clients);

      this.loadingInvoices.set(false);
      this.loadingClients.set(false);
    });
  }

  createInvoice() {
    this.invoicesService.addInvoice({
      subject: '',
      total: 0,
      items: []
    }).subscribe(invoice => {
      this.invoices.update(invoices => [...invoices, invoice]);
    })
  }

  saveInvoice(invoice: Invoice) {
    this.invoicesService.editInvoice(invoice).subscribe(newInvoice => {
      this.invoices.update(invoices => invoices.map(i => i.id === invoice.id ? newInvoice : i));
    });
  }

  deleteInvoice(id: string) {
    this.invoicesService.deleteInvoice(id).subscribe(() => {
      this.invoices.update(invoices => invoices.filter(i => i.id !== id));
    })
  }
}
