import {
    Directive,
    inject,
    input,
    OnInit,
    ViewContainerRef,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { PluginConfigLoader } from './plugin-loader';
import { PluginSlotConfig } from './plugin-slot-config.interface';

@Directive({
    selector: '[libPluginSlot]',
})
export class PluginSlot implements OnInit {
    public readonly slotName = input.required<string>({ alias: 'libPluginSlot' });

    private readonly pluginLoader = inject(PluginConfigLoader);

    private readonly vcr = inject(ViewContainerRef);

    public async ngOnInit(): Promise<void> {
        this.pluginLoader
            .getPluginsForSlot(this.slotName())
            .then((plugin) => {
                if (plugin) {
                    this.loadPlugin(plugin);
                }
            })
            .catch((e) => {
                console.error(
                    `Failed to load plugins for ${this.slotName()}`,
                    e,
                );
            });
    }

    private async loadPlugin(plugin: PluginSlotConfig): Promise<void> {
        try {
            const module = await loadRemoteModule(
                plugin.remoteName,
                plugin.exposedModule,
            );
            const componentClass = module[plugin.componentName];
            this.vcr.createComponent(componentClass);
        } catch (e) {
            console.error(`Failed to load plugin ${plugin.slotName}`, e);
        }
    }
}
