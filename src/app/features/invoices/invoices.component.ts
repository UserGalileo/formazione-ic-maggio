import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {InvoicesStore} from './invoices.store';

@Component({
  selector: 'app-invoices',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="invoices-container">
      <div class="invoice-list">
        <h3>Invoices</h3>
        <ul>
          @for (invoice of store.invoices(); track invoice.id) {
            <li>
              <a
                class="invoice-list-item"
                [routerLink]="'/invoices/' + invoice.id"
                routerLinkActive="active"
              >{{ invoice.subject || 'New invoice' }}</a>
            </li>
          }
        </ul>
        <button (click)="store.createInvoice()">New invoice</button>
      </div>

      <div class="invoice-edit">
        <router-outlet />
      </div>
    </div>
  `,
  providers: [InvoicesStore]
})
export class InvoicesComponent {

  store = inject(InvoicesStore);

  ngOnInit() {
    this.store.loadInvoices();
  }
}
