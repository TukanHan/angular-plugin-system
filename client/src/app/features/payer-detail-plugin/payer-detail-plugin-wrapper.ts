import { Component, signal } from '@angular/core';
import { PayerDetailPlugin } from './payer-detail-plugin';
import { form } from '@angular/forms/signals';

@Component({
    imports: [PayerDetailPlugin],
    selector: 'app-root',
    template: `<app-payer-detail-plugin [apiData]="apiData"/>`,
})
export class PayerDetailPluginWrapper {
    private readonly data = signal({});

    private readonly invoiceForm = form(this.data);

    protected readonly apiData = { invoiceForm: this.invoiceForm };
}
