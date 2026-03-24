import { Component, computed, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { PluginSlot } from '@shell/utils';
import { form, FormField } from '@angular/forms/signals';
import { DialogService } from 'primeng/dynamicdialog';
import { InfoModalComponent } from './inoice-saved-dialog';

@Component({
    selector: 'lib-invoices-form',
    imports: [
        FormField,
        PluginSlot,
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
    providers: [DialogService],
    templateUrl: './invoices-form.html',
    host: { class: 'block m-4' },
})
export class InvoicesForm {
    private readonly dialogService = inject(DialogService);

    protected readonly invoice = signal({
        number: 'FV/' + new Date().getFullYear() + '/001',
        date: new Date(),
        dueDate: new Date(),
        client: '',
        taxId: '',
        amount: 0,
        currency: 'PLN',
    });

    protected readonly invoiceForm = form(this.invoice);

    protected readonly currencies = [
        { label: 'PLN', value: 'PLN' },
        { label: 'EUR', value: 'EUR' },
        { label: 'USD', value: 'USD' },
    ];

    protected readonly totalBrutto = computed(
        () => this.invoice().amount * 1.23,
    );

    protected readonly apiData = { invoiceForm: this.invoiceForm };

    protected saveInvoice() {
        this.dialogService.open(InfoModalComponent, {
            header: 'Faktura zapisana',
            width: '40vw',
            modal: true,
            data: this.invoice()
        });
    }
}
