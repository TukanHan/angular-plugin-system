import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'lib-invoice-saved-dialog',
    imports: [KeyValuePipe],
    template: `
        <div class="p-3">
            <ul class="list-none p-0 m-0">
                @for (item of data | keyvalue; track item.key) {
                    <li
                        class="flex justify-content-between py-2 border-bottom-1 surface-border"
                    >
                        <span class="font-bold text-600">{{ item.key }}:</span>
                        <span class="text-900">{{ item.value }}</span>
                    </li>
                }
            </ul>
            <div class="flex justify-content-end mt-4">
                <button class="p-button p-component" (click)="ref.close()">
                    Zamknij
                </button>
            </div>
        </div>
    `,
})
export class InfoModalComponent {
    protected readonly ref = inject(DynamicDialogRef);

    private readonly config = inject(DynamicDialogConfig);

    protected get data() {
        return this.config.data;
    }
}
