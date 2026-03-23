import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard-plugin',
  imports: [ChartModule, CardModule],
  template: `
    <p-card header="Zysk vs Wydatki (Miesięcznie)" styleClass="shadow-2 h-full">
      <p-chart
        type="bar"
        [data]="comparisonData()"
        [options]="barOptions"
        height="350px"
      />
    </p-card>
  `,
  host: { class: 'col-12 lg:col-6' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPlugin {
  protected readonly comparisonData = signal({
    labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień'],
    datasets: [
      {
        label: 'Przychody',
        backgroundColor: '#782ed9',
        data: [5400, 3250, 7020, 6200],
      },
      {
        label: 'Wydatki',
        backgroundColor: '#d9672e',
        data: [3200, 2100, 4000, 3800],
      },
    ],
  });

  protected readonly barOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          font: { size: 14, family: 'Inter, sans-serif' },
        },
        position: 'bottom',
      },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        cornerRadius: 8,
      },
    },
  };
}
