import { Component } from '@angular/core';
import { PluginsPreview } from "./plugins-preview/plugins-preview";

@Component({
    imports: [PluginsPreview],
    selector: 'app-root',
    template: `<app-plugins-preview/>`,
})
export class App {
    protected title = 'client';
}
