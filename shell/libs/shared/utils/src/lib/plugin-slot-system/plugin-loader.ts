import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginSlotConfig } from './plugin-slot-config.interface';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PluginConfigLoader {
    private readonly http = inject(HttpClient);

    private _registry = new Map<string, PluginSlotConfig>();

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

    public async getPluginsForSlot(
        slotName: string,
    ): Promise<PluginSlotConfig | null> {
        try {
            await this._initialized;

            return this._registry.get(slotName) || null;
        } catch {
            return null;
        }
    }
}
