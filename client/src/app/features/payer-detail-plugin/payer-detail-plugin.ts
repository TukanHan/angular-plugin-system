import { Component, ElementRef, inject, input, OnInit, Renderer2, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { FormField } from '@angular/forms/signals';

@Component({
    selector: 'app-payer-detail-plugin',
    imports: [FormsModule, CardModule, InputTextModule, CheckboxModule, FluidModule, FloatLabelModule, FormField],
    template: `
        <p-card header="Dane Płatnika" styleClass="shadow-2 h-full">
            <p-fluid>
                <div class="grid p-fluid">
                    <div class="col-12 flex align-items-center gap-2">
                        <p-checkbox
                            inputId="has-separate-payer"
                            [(ngModel)]="isPayerEnabled"
                            [binary]="true"
                            (onChange)="onPayerToggle($event)"
                        />
                        <label for="has-separate-payer" class="font-bold text-primary"
                            >Inny podmiot jest płatnikiem</label
                        >
                    </div>

                    @if (isPayerEnabled()) {
                        <div class="col-12 md:col-8">
                            <p-floatLabel>
                                <input pInputText id="payerName" [formField]="invoiceForm.payerName" />
                                <label for="payerName">Pełna nazwa płatnika</label>
                            </p-floatLabel>
                        </div>

                        <div class="col-12 md:col-4">
                            <p-floatLabel>
                                <input pInputText id="payerTaxId" [formField]="invoiceForm.payerTaxId" />
                                <label for="payerTaxId">NIP Płatnika</label>
                            </p-floatLabel>
                        </div>

                        <div class="col-12">
                            <small class="text-color-secondary">
                                <i class="pi pi-info-circle"></i> Dane te zostaną umieszczone na fakturze w sekcji
                                "Płatnik".
                            </small>
                        </div>
                    } @else {
                        <div class="col-12 text-center py-4 border-round surface-100 border-300 border-1 border-dashed">
                            <span class="text-500">Płatnikiem jest Nabywca wskazany w sekcji powyżej.</span>
                        </div>
                    }
                </div>
            </p-fluid>
        </p-card>
    `,
    host: { class: 'col-12 lg:col-6' },
})
export class PayerDetailPlugin implements OnInit {
    public readonly apiData = input<any>();

    protected readonly isPayerEnabled = signal<boolean>(false);
    protected invoiceForm!: any;

    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

    public ngOnInit(): void {
        this.positionSelfInsideHost();
        this.initializePayerFields();
    }

    private initializePayerFields(): void {
        this.invoiceForm = this.apiData().invoiceForm;

        const formValueSignal = this.invoiceForm().value;

        formValueSignal.update((current: any) => ({
            ...current,
            payerName: current.payerName ?? '',
            payerTaxId: current.payerTaxId ?? '',
            isThirdPartyPayer: current.isThirdPartyPayer ?? false,
        }));

        this.isPayerEnabled.set(formValueSignal().isThirdPartyPayer);
    }

    protected onPayerToggle(event: any): void {
        this.invoiceForm().value.update((current: any) => ({
            ...current,
            isThirdPartyPayer: event.checked,
        }));
    }

    private positionSelfInsideHost(): void {
        const targetId = 'invoice-form-amount-section';
        const targetElement = document.querySelector(`[data-testid="${targetId}"]`);

        if (targetElement?.parentNode) {
            this.renderer.insertBefore(targetElement.parentNode, this.el.nativeElement, targetElement.nextSibling);
        }
    }
}
