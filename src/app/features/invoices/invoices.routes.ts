import {Routes} from '@angular/router';
import {InvoicesComponent} from './invoices.component';
import {InvoiceComponent} from './invoice.component';
import {canLeave} from '../todos/todos.routes';

export default [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      {
        path: ':invoiceId',
        component: InvoiceComponent,
        canDeactivate: [canLeave]
      },
    ]
  },
] satisfies Routes;
