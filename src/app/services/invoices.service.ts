// mock
import {Invoice} from '../models/invoices';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, of} from 'rxjs';

let invoices: Invoice[] = [
  {
    id: 'invoice-1',
    subject: 'Fattura 1',
    clientId: 'client-1',
    items: [
      { text: 'item 1', price: 10 },
      { text: 'item 2', price: 20 },
    ],
    total: 30
  },
  {
    id: 'invoice-2',
    subject: 'Fattura 2',
    clientId: 'client-2',
    items: [
      { text: 'item 1', price: 100 },
    ],
    total: 100
  }
];

@Injectable({ providedIn: 'root' })
export class InvoicesService {

  // http = inject(HttpClient);

  loadInvoices() {
    return of(invoices).pipe(
      delay(1000)
    );
  }

  deleteInvoice(id: string) {
    invoices = invoices.filter((invoice) => invoice.id !== id);
    return of(id);
  }

  addInvoice(invoice: Omit<Invoice, 'id'>) {
    const newInvoice = { ...invoice, id: '' + Math.random() };
    invoices = [...invoices, newInvoice];
    return of(newInvoice);
  }

  editInvoice(invoice: Invoice) {
    invoices = invoices.map(i => {
      if (i.id === invoice.id) return invoice;
      return i;
    });
    return of(invoice);
  }
}
