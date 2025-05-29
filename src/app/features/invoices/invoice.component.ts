import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InvoicesStore} from './invoices.store';
import {Router} from '@angular/router';
import {InvoiceItem} from '../../models/invoices';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {map, startWith} from 'rxjs';
import {CanLeave} from '../todos/todos.routes';

type InvoiceItemGroup = FormGroup<{
  text: FormControl<string>;
  price: FormControl<number>;
}>;

@Component({
  selector: 'app-invoice',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    AsyncPipe
  ],
  template: `
    <h1 class="invoice-header">Invoice</h1>

    <form [formGroup]="form" (ngSubmit)="saveInvoice()">

      <label>
        <span>Subject</span>
        <input type="text" formControlName="subject">
      </label>

      <label>
        <span>Client</span>
        <select formControlName="clientId">
          <option [ngValue]="null">-</option>
          @for (client of store.clients(); track client) {
            <option [value]="client.id">{{ client.name }}</option>
          }
        </select>
      </label>

      <div formArrayName="items">
        @for (item of form.controls.items.controls; let i = $index; track item) {
          <div [formGroupName]="i" class="invoice-item">
            <input type="text" formControlName="text" placeholder="Item">
            <input type="number" formControlName="price" placeholder="Price">
            <button type="button" class="btn-danger" (click)="removeItem(i)">Remove</button>
          </div>
        }
        <button type="button" (click)="addItem()">New item</button>
      </div>

      <h2 class="invoice-total">Total: €{{ total$ | async | json }}</h2>
      <button [attr.aria-disabled]="!form.valid || null">Save</button>
      <button type="button" (click)="deleteInvoice()" class="btn-danger">Delete</button>

    </form>
  `
})
export class InvoiceComponent implements CanLeave {

  fb = inject(NonNullableFormBuilder);
  store = inject(InvoicesStore);
  router = inject(Router);

  form = this.fb.group({
    id: ['', Validators.required],
    clientId: ['', Validators.required],
    subject: ['', Validators.required],
    items: this.fb.array<InvoiceItemGroup>([])
  });

  invoiceId = input.required<string>();

  currentInvoice = computed(() => this.store.invoices().find(invoice => invoice.id === this.invoiceId()));

  total$ = this.form.controls.items.valueChanges.pipe(
    map(() => this.calculateTotal(this.form.getRawValue().items)),
    startWith(0)
  );

  constructor() {
    effect(() => {
      const invoice = this.currentInvoice();

      if (invoice) {
        this.form.controls.items.clear();

        invoice.items.forEach(() => {
          this.addItem();
        });

        this.form.reset(invoice);
      }
    });
  }

  saveInvoice() {
    if (this.form.valid) {
      this.store.saveInvoice({
        ...this.form.getRawValue(),
        total: this.calculateTotal(this.form.getRawValue().items)
      })
    }
  }

  deleteInvoice() {
    this.store.deleteInvoice(this.invoiceId());
    this.router.navigateByUrl('/invoices');
  }

  addItem() {
    this.form.controls.items.push(this.fb.group({
      text: ['', Validators.required],
      price: [0, Validators.required],
    }))
  }

  removeItem(i: number) {
    this.form.controls.items.removeAt(i);
  }

  calculateTotal(items: InvoiceItem[]) {
    return items.reduce((total, item) => total + item.price, 0);
  }

  canLeave() {
    if (this.form.dirty) {
      return confirm('Are you sure you want to leave?');
    }
    return true;
  }
}
