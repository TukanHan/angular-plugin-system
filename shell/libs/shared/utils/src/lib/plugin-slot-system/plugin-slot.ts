import {
    Directive,
    inject,
    input,
    inputBinding,
    OnInit,
    reflectComponentType,
    Type,
    ViewContainerRef,
} from '@angular/core';
import { PluginConfigLoader } from './plugin-loader';

@Directive({
    selector: '[libPluginSlot]',
})
export class PluginSlot implements OnInit {
    public readonly slotName = input.required<string>();

    public readonly apiData = input<unknown>();

    private readonly pluginLoader = inject(PluginConfigLoader);

    private readonly vcr = inject(ViewContainerRef);

    public ngOnInit(): void {
        this.pluginLoader
            .getPluginsForSlot(this.slotName())
            .then((plugin) => {
                if (plugin) {
                    this.createPlugin(plugin);
                }
            })
            .catch((e) => console.error(`Failed to load plugins for ${this.slotName()}: ${e}`));
    }

    private createPlugin(pluginComponent: Type<unknown>): void {
        const mirror = reflectComponentType(pluginComponent);
        const hasApiDataInput = mirror?.inputs.some((i) => i.templateName === 'apiData');

        this.vcr.createComponent(pluginComponent, {
            bindings: hasApiDataInput ? [inputBinding('apiData', this.apiData)] : [],
        });
    }
}
