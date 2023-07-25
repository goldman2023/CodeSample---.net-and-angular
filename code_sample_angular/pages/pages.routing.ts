import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from './../core/guards/auth-guard.service';
import { APIResolver } from './pages.resolve';
import { BitecoinValueComponent } from './bitecoin-value/bitecoin-value.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '', redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
                data: { breadcrumb: 'Dashboard' },
                canActivate: [AuthGuard],
            },
            {
                path: 'promo-code',
                loadChildren: 'app/pages/promo-code/promo-code.module#PromoCodeModule',
                data: { breadcrumb: 'Promo Codes' },
            },
            {
                path: 'manage_consumer',
                loadChildren: 'app/pages/manage-consumer/manage-consumer.module#MembershipModule',
                data: { breadcrumb: 'Manage Consumer' }
            }, {
                    path: 'manage_consumer/:state/:time',
                    loadChildren: 'app/pages/manage-consumer/manage-consumer.module#MembershipModule',
                    data: { breadcrumb: 'Manage Consumer' }
            },
            {
                path: 'data-management',
                loadChildren: 'app/pages/data-management/data-management.module#DataManagementModule'
            },
            {
                path: 'events',
                loadChildren: 'app/pages/events/events.module#EventsModule',
                data: { breadcrumb: 'Events' }
            },
            {
                path: 'leaderboard',
                loadChildren: 'app/pages/leaderboard/leaderboard.module#LeaderboardModule',
                data: { breadcrumb: 'Bitecoin Leaderboard' }
            },
            {
                path: 'bitecoin_value',
                component: BitecoinValueComponent,
                data: { breadcrumb: 'Bitecoin Value' }
            },
            {
                path: 'service_provider/:state/:time/:foodTruck',
                loadChildren: 'app/pages/service-provider/service-provider.module#ServiceProviderModule',
                data: { breadcrumb: 'Manage Service Provider' }
            }, {
                path: 'service_provider',
                loadChildren: 'app/pages/service-provider/service-provider.module#ServiceProviderModule',
                data: { breadcrumb: 'Manage Service Provider' }
            }, {
                path: 'push-notification',
                loadChildren: 'app/pages/push-notification/push-notification.module#PushNotificationModule',
                data: { breadcrumb: 'Push Notification' }
            }

        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
