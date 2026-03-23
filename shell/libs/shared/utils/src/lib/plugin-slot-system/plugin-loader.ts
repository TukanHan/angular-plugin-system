import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginSlotConfig } from './plugin-slot-config.interface';
import { firstValueFrom, map } from 'rxjs';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Injectable({
    providedIn: 'root',
})
export class PluginConfigLoader {
    private readonly http = inject(HttpClient);

    private _registry = new Map<string, PluginSlotConfig>();
    private _moduleCache = new Map<string, any>();
    private _componentCache = new Map<string, any>();

    private readonly _initialized: Promise<void>;

    constructor() {
        this._initialized = this.loadManifest();
    }

    private async loadManifest(): Promise<void> {
        const registry$ = this.http
            .get<PluginSlotConfig[]>('/plugin-registry.json')
            .pipe(
                map((plugins) =>
                    plugins.reduce(
                        (map, p) => map.set(p.slotName, p),
                        new Map<string, PluginSlotConfig>(),
                    ),
                ),
            );

        try {
            this._registry = await firstValueFrom(registry$);
        } catch (e) {
            console.error('Plugin registry failed', e);
            throw e;
        }
    }

    public async getPluginsForSlot(slotName: string): Promise<any | null> {
        await this._initialized;

        if (this._componentCache.has(slotName)) {
            return this._componentCache.get(slotName);
        }

        const plugin = this._registry.get(slotName);
        if (!plugin) {
            return null;
        }

        const moduleKey = `${plugin.remoteName}:${plugin.exposedModule}`;
        let module = this._moduleCache.get(moduleKey);

        if (!module) {
            module = await loadRemoteModule(
                plugin.remoteName,
                plugin.exposedModule,
            );
            this._moduleCache.set(moduleKey, module);
        }

        const component = module[plugin.componentName];
        this._componentCache.set(slotName, component);

        return component;
    }
}
