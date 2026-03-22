import { Component, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'lib-invoices-list',
    imports: [
        RouterModule,
        CurrencyPipe,
        TableModule,
        ButtonModule,
        TagModule,
        CardModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
    ],
    templateUrl: './invoices-list.html',
    host: { class: 'block m-4' },
})
export class InvoicesList {
    protected readonly invoices = signal([
        {
            id: 1,
            number: 'FV/2024/001',
            client: 'Google Poland',
            date: '2024-03-01',
            amount: 12500.0,
            status: 'PAID',
        },
        {
            id: 2,
            number: 'FV/2024/002',
            client: 'Microsoft Sp. z o.o.',
            date: '2024-03-05',
            amount: 8400.5,
            status: 'PENDING',
        },
        {
            id: 3,
            number: 'FV/2024/003',
            client: 'Allegro Lokalnie',
            date: '2024-03-10',
            amount: 3200.0,
            status: 'OVERDUE',
        },
        {
            id: 4,
            number: 'FV/2024/004',
            client: 'Netflix Inc.',
            date: '2024-03-12',
            amount: 150.0,
            status: 'PAID',
        },
        {
            id: 5,
            number: 'FV/2024/005',
            client: 'Amazon Web Services',
            date: '2024-03-15',
            amount: 4500.0,
            status: 'PENDING',
        },
    ]);

    protected getSeverity(status: string) {
        switch (status) {
            case 'PAID':
                return 'success';
            case 'PENDING':
                return 'warn';
            case 'OVERDUE':
                return 'danger';
            default:
                return 'info';
        }
    }

    protected getStatusLabel(status: string) {
        switch (status) {
            case 'PAID':
                return 'Opłacona';
            case 'PENDING':
                return 'Oczekująca';
            case 'OVERDUE':
                return 'Zaległa';
            default:
                return status;
        }
    }
}
