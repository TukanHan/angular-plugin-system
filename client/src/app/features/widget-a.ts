import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-widget-a',
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    InputMaskModule,
    SelectModule,
    FluidModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './widget-a.html',
  host: { class: 'col-12 lg:col-6' },
})
export class WidgetA {
  name = signal('');
  nip = signal('');
  type = signal('Firma');

  clientTypes = [
    { label: 'Osoba prywatna', value: 'Osoba' },
    { label: 'Firma / JDG', value: 'Firma' },
  ];

  onSave() {
    console.log('Zapisywanie:', {
      name: this.name(),
      nip: this.nip(),
    });
  }
}
