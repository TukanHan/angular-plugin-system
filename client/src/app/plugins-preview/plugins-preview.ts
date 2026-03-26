import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-plugins-preview',
    imports: [RouterModule],
    template: `
        <div class="flex flex-row gap-2 h-screen">
            <div class="sidevnav">
                <aside
                    class="layout-sidebar shadow-2 border-round-xl surface-card flex flex-column justify-content-between"
                >
                    <div class="flex flex-column gap-2">
                        <div class="px-3 py-2">
                            <span class="text-xs font-bold text-500 uppercase tracking-wider">Komponenty</span>
                        </div>

                        <nav class="flex flex-column gap-1">
                            @for (route of pluginRoutes; track route.path) {
                                <a [routerLink]="'/' + route.path" routerLinkActive="active-link" class="menu-item">
                                    <span> {{ route.title ?? route.path }}</span>
                                </a>
                            }
                        </nav>
                    </div>
                </aside>
            </div>

            <div class="flex-1 h-fit">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: `
        .sidevnav {
            display: block;
            margin: 1rem 0rem 1rem 1rem;
        }

        .layout-sidebar {
            width: 15rem;
            height: 100%;
            padding: 1.5rem 1rem;
            overflow: auto;
        }

        .menu-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            color: var(--p-text-muted-color);
            text-decoration: none;
            border-radius: var(--p-content-border-radius);
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            user-select: none;

            span {
                font-weight: 500;
            }

            &:hover {
                background-color: var(--p-content-hover-background);
                color: var(--p-text-color);

                i {
                    color: var(--p-text-color);
                }
            }

            &.active-link {
                color: var(--p-primary-color);
                font-weight: 600;

                i {
                    color: var(--p-primary-color);
                }
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsPreview {
    private readonly router = inject(Router);

    protected readonly pluginRoutes = this.router.config
        .filter((route) => route.path && route.component)
        .map((route) => ({
            path: route.path,
            title: route.title,
        }));
}
