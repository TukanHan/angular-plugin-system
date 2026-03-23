import {
    Directive,
    inject,
    input,
    OnInit,
    ViewContainerRef,
} from '@angular/core';
import { PluginConfigLoader } from './plugin-loader';

@Directive({
    selector: '[libPluginSlot]',
})
export class PluginSlot implements OnInit {
    public readonly slotName = input.required<string>({
        alias: 'libPluginSlot',
    });

    private readonly pluginLoader = inject(PluginConfigLoader);

    private readonly vcr = inject(ViewContainerRef);

    public ngOnInit(): void {
        this.pluginLoader
            .getPluginsForSlot(this.slotName())
            .then((plugin) => {
                if (plugin) {
                    this.vcr.createComponent(plugin);
                }
            })
            .catch((e) => {
                console.error(
                    `Failed to load plugins for ${this.slotName()}`,
                    e,
                );
            });
    }
}
