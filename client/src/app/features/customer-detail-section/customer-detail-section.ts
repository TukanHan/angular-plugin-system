import {
    Component,
    ElementRef,
    inject,
    input,
    OnInit,
    Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldTree, FormField } from '@angular/forms/signals';

@Component({
    selector: 'app-customer-detail-section',
    imports: [
        FormsModule,
        CardModule,
        InputTextModule,
        CheckboxModule,
        SelectModule,
        FluidModule,
        FloatLabelModule,
        ButtonModule,
        FormField,
    ],
    templateUrl: './customer-detail-section.html',
    host: { class: 'col-12 lg:col-6' },
})
export class CustomerDetailSection implements OnInit {
    public readonly apiData = input();

    protected invoiceForm!: FieldTree<{
        name: string;
        vatPayer: string;
        type: string;
    }>;

    protected readonly clientTypes = [
        { label: 'Osoba prywatna', value: 'Osoba' },
        { label: 'Firma / JDG', value: 'Firma' },
    ];

    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

    public ngOnInit(): void {
        this.positionSelfInsideHost();

        this.invoiceForm = (this.apiData() as any).invoiceForm;
        const data = (this.apiData() as any).invoiceForm().value;
        data.update((x: object) => ({
            ...x,
            name: '',
            vatPayer: true,
            type: 'Firma',
        }));
    }

    private positionSelfInsideHost(): void {
        const targetId = 'invoice-form-amount-section';
        const targetElement = document.querySelector(
            `[data-testid="${targetId}"]`,
        );

        if (targetElement && targetElement.parentNode) {
            const hostElement = this.el.nativeElement;

            this.renderer.insertBefore(
                targetElement.parentNode,
                hostElement,
                targetElement.nextSibling,
            );
        } else {
            console.warn(`Nie znaleziono elementu o ID: ${targetId}`);
        }
    }
}
