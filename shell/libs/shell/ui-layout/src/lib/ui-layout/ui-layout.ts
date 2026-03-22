import { Component } from '@angular/core';
import { TopBar } from './topbar/topbar';
import { Sidenav } from './sidenav/sidenav';

@Component({
    selector: 'lib-ui-layout',
    imports: [TopBar, Sidenav],
    templateUrl: './ui-layout.html',
    styleUrl: './ui-layout.scss',
})
export class UiLayout {}
