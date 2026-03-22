import { Component, computed, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'lib-invoices-form',
    imports: [
        CurrencyPipe,
        FormsModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        InputNumberModule,
        DatePickerModule,
        SelectModule,
        FloatLabelModule,
    ],
    templateUrl: './invoices-form.html',
})
export class InvoicesForm {
    protected readonly invoice = signal({
        number: 'FV/' + new Date().getFullYear() + '/001',
        date: new Date(),
        dueDate: new Date(),
        client: '',
        taxId: '',
        amount: 0,
        currency: 'PLN',
    });

    protected readonly currencies = [
        { label: 'PLN', value: 'PLN' },
        { label: 'EUR', value: 'EUR' },
        { label: 'USD', value: 'USD' },
    ];

    protected readonly totalBrutto = computed(
        () => this.invoice().amount * 1.23,
    );

    protected saveInvoice() {
        console.log('Zapisywanie faktury:', this.invoice());
    }
}
