import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'lib-dashboard',
    imports: [CardModule, ChartModule, ButtonModule],
    templateUrl: './dashboard.html',
    host: { class: 'm-4 grid' },
})
export class Dashboard {
    protected readonly salesData = signal({
        labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień'],
        datasets: [
            {
                label: 'Przychody netto',
                data: [65000, 59000, 80000, 81000],
                fill: true,
                borderColor: '#3B82F6',
                tension: 0.4,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
            },
        ],
    });

    protected readonly costsData = signal({
        labels: ['ZUS', 'Biuro', 'Licencje', 'Marketing'],
        datasets: [
            {
                data: [540, 325, 702, 421],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
            },
        ],
    });

    protected readonly chartOptions = {
        plugins: {
            legend: { labels: { color: '#495057' } },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };
}
