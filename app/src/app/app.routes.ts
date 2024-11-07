import { ResolveFn, Routes } from '@angular/router';
import { FolderComponent } from './apps/app/files/folder.component';
import { FileComponent } from './apps/app/files/file.component';

// const wildcardSlugsResolver: ResolveFn<Array<string>> = (route) => {
//   console.log('SLUG ROUTE', route);
//   return route.url.map((segment) => segment.path);
// };

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'introduction',
  },
  {
    path: 'introduction',
    loadComponent: () => import('./introduction/introduction.component').then((c) => c.IntroductionComponent),
    title: 'Introduction',
    data: { hide: true, icon: 'lightbulb' },
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then((c) => c.AdminComponent),
    title: 'Admin',
    data: { hide: true, icon: 'dashboard' },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
    title: 'Dashboard',
    data: { hide: true, icon: 'dashboard' },
  },
  {
    path: 'communities',
    loadComponent: () => import('./communities/communities.component').then((c) => c.CommunitiesComponent),
    title: 'Communities',
    data: { icon: 'diversity_2' },
  },
  {
    path: 'app/projects',
    loadComponent: () => import('./apps/app/projects/projects.component').then((c) => c.ProjectsComponent),
    title: 'Projects',
    data: { hide: true, icon: 'diversity_1' },
  },
  {
    path: 'communities/create',
    loadComponent: () => import('./communities/create/create.component').then((c) => c.CreateComponent),
    title: 'Communities',
    data: { hide: true, icon: 'diversity_2' },
  },
  {
    path: 'communities/create/:id',
    loadComponent: () => import('./communities/create/create.component').then((c) => c.CreateComponent),
    title: 'Communities',
    data: { hide: true, icon: 'diversity_2' },
  },
  {
    path: 'community/:id',
    loadComponent: () => import('./community/community.component').then((c) => c.CommunityComponent),
    title: 'Communities',
    data: { hide: true, icon: 'diversity_2' },
  },
  {
    path: 'friends',
    loadComponent: () => import('./friends/friends.component').then((c) => c.FriendsComponent),
    title: 'Friends',
    data: { hide: true, icon: 'people' },
  },
  {
    path: 'app/friends',
    loadComponent: () => import('./friends/friends.component').then((c) => c.FriendsComponent),
    title: 'Friends',
    data: { hide: false, icon: 'people' },
  },
  {
    path: 'app/chat',
    redirectTo: 'app/chat/home',
    pathMatch: 'full',
  },
  {
    path: 'app/chat/:id',
    loadComponent: () => import('./apps/app/chat/chat.component').then((c) => c.ChatComponent),
    title: 'Chat',
    data: { icon: 'chat' },
  },
  {
    path: 'app/voluntaryist-covenant',
    loadComponent: () =>
      import('./apps/app/voluntaryist-covenant/voluntaryist-covenant.component').then(
        (c) => c.VoluntaryistCovenantComponent,
      ),
    title: 'Voluntaryist Covenant',
    data: { hide: true, icon: 'assured_workload' },
  },
  {
    path: 'app/issuer',
    loadComponent: () => import('./apps/app/issuer/issuer.component').then((c) => c.IssuerComponent),
    title: 'Issuer',
    data: { hide: true, icon: 'assured_workload' },
  },
  {
    path: 'app/kcc',
    loadComponent: () => import('./apps/app/kcc/kcc.component').then((c) => c.KnownCustomerCredentialComponent),
    title: 'Known Customer Credential',
    data: { hide: true, icon: 'assured_workload' },
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./marketplace/marketplace.component').then((c) => c.MarketplaceComponent),
    title: 'Marketplace',
    data: { hide: true, icon: 'storefront' },
  },
  {
    path: 'apps',
    loadComponent: () => import('./apps/apps.component').then((c) => c.AppsComponent),
    title: 'Apps',
    data: { icon: 'apps' },
  },
  {
    path: 'app/files',
    loadComponent: () => import('./apps/app/files/files.component').then((c) => c.FilesComponent),
    title: 'Files',
    data: { icon: 'folder', breadcrumb: 'Files' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'folder/root',
      },
      {
        path: 'file/:id',
        component: FileComponent,
        data: { breadcrumb: 'Folder' },
      },
      {
        path: '**',
        component: FolderComponent,
        // resolve: {
        //   slugs: wildcardSlugsResolver,
        // },
        data: { breadcrumb: 'Folder' },
      },
      // {
      //   path: 'folder/:id',
      //   component: FolderComponent,
      //   data: { breadcrumb: 'Folder' },
      //   // children: [
      //   //   {
      //   //     path: ':lessonName',
      //   //     component: LessonDetailComponent,
      //   //     data: { breadcrumb: 'Lesson Name' },
      //   //   },
      //   // ],
      // },
    ],
  },
  {
    path: 'app/notes',
    loadComponent: () => import('./apps/app/notes/notes.component').then((c) => c.NotesComponent),
    title: 'Notes',
    data: { icon: 'note' },
  },
  {
    path: 'app/player',
    loadComponent: () => import('./apps/app/player/player.component').then((c) => c.PlayerComponent),
    title: 'Player',
    data: { icon: 'play_circle' },
  },
  {
    path: 'app/text',
    loadComponent: () => import('./apps/app/text/text.component').then((c) => c.TextComponent),
    title: 'Text',
    data: { icon: 'notes' },
  },
  {
    path: 'app/tasks',
    redirectTo: 'app/tasks/home',
    pathMatch: 'full',
  },
  {
    path: 'app/tasks/:id',
    loadComponent: () => import('./apps/app/tasks/tasks.component').then((c) => c.TasksComponent),
    title: 'Tasks',
    data: { icon: 'task' },
  },
  {
    path: 'registries',
    loadComponent: () => import('./registries/registries.component').then((c) => c.RegistriesComponent),
    title: 'Registries',
    data: { icon: 'folder_shared' },
  },
  {
    path: 'registry/bsn',
    loadComponent: () => import('./registries/registry/registry.component').then((c) => c.RegistryComponent),
    title: 'Registry',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'registry/freeid',
    loadComponent: () => import('./registries/registry/freeid/freeid.component').then((c) => c.FreeIDComponent),
    title: 'Registry',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'registry/podcast',
    loadComponent: () => import('./registries/registry/podcast/podcast.component').then((c) => c.PodcastComponent),
    title: 'Registry',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'registry/liberstad-land-registry',
    loadComponent: () =>
      import('./registries/registry/liberstad-land-registry/liberstad-land.component').then(
        (c) => c.LiberstadLandComponent,
      ),
    title: 'Registry',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'registry/gaianet',
    loadComponent: () => import('./registries/registry/gaianet/gaianet.component').then((c) => c.GaianetComponent),
    title: 'Gaianet',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'registry/local-company-registry',
    loadComponent: () =>
      import('./registries/registry/local-company-registry/local-company.component').then(
        (c) => c.LocalCompanyComponent,
      ),
    title: 'Registry',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'registry/local-company-registry/:id',
    loadComponent: () =>
      import('./registries/registry/local-company-registry/local-company-view.component').then(
        (c) => c.LocalCompanyViewComponent,
      ),
    title: 'Registry',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'data/view/:id',
    loadComponent: () => import('./data/view/data-view.component').then((c) => c.DataViewComponent),
    title: 'Data View',
    data: { hide: true, icon: 'folder_shared' },
  },
  {
    path: 'data',
    loadComponent: () => import('./data/data.component').then((c) => c.DataComponent),
    title: 'Data',
    data: { hide: true, icon: 'source' },
  },
  {
    path: 'data/:source/:id',
    loadComponent: () => import('./data/entry/entry.component').then((c) => c.DataEntryComponent),
    title: 'Data Entry',
    data: { hide: true, icon: 'source' },
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent),
    title: 'Profile',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'profile/:id/edit',
    loadComponent: () => import('./profile/edit/edit.component').then((c) => c.ProfileEditComponent),
    title: 'Edit Profile',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'profile/:id/posts/:postId',
    loadComponent: () => import('./profile/post/post.component').then((c) => c.PostComponent),
    title: 'Posts',
    data: { hide: true, icon: 'note' },
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.component').then((c) => c.NotificationsComponent),
    title: 'Notifications',
    data: { hide: true, icon: 'notifications' },
  },
  {
    path: 'accounts',
    loadComponent: () => import('./accounts/accounts.component').then((c) => c.AccountsComponent),
    title: 'Accounts',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'account/password',
    loadComponent: () => import('./account/password/password.component').then((c) => c.PasswordComponent),
    title: 'Password',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'account/password/reset',
    loadComponent: () => import('./account/reset/reset.component').then((c) => c.PasswordResetComponent),
    title: 'Password',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'account/backup',
    loadComponent: () => import('./account/backup/backup.component').then((c) => c.BackupComponent),
    title: 'Backup',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'account/create',
    loadComponent: () => import('./account/create/create.component').then((c) => c.CreateComponent),
    title: 'Create Account',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'account/create/new',
    loadComponent: () => import('./account/create/new/new.component').then((c) => c.NewComponent),
    title: 'Create new account',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'account/create/restore',
    loadComponent: () => import('./account/create/restore/restore.component').then((c) => c.RestoreComponent),
    title: 'Restore existing account',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'account/:id',
    loadComponent: () => import('./account/account.component').then((c) => c.AccountComponent),
    title: 'Account',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'identity',
    loadComponent: () => import('./identity/identity.component').then((c) => c.IdentityComponent),
    title: 'Identity',
    data: { hide: true, icon: 'account_circle' },
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then((c) => c.SettingsComponent),
    title: 'Settings',
    data: { hide: true, icon: 'settings' },
  },
  {
    path: 'settings/about',
    loadComponent: () => import('./settings/about/about.component').then((c) => c.AboutComponent),
    title: 'About',
    data: { hide: true, icon: 'settings' },
  },
  {
    path: 'settings/licenses',
    loadComponent: () => import('./settings/licenses/licenses.component').then((c) => c.LicensesComponent),
    title: 'Licenses',
    data: { hide: true, icon: 'settings' },
  },
  {
    path: 'settings/privacy',
    loadComponent: () => import('./settings/privacy/privacy.component').then((c) => c.PrivacyComponent),
    title: 'Privacy',
    data: { hide: true, icon: 'settings' },
  },
  {
    path: 'settings/handler',
    loadComponent: () => import('./settings/handler/handler.component').then((c) => c.HandlerComponent),
    title: 'Protocol Handler',
    data: { hide: true, icon: 'search' },
  },
  {
    path: 'settings/connections',
    loadComponent: () => import('./settings/connections/connections.component').then((c) => c.ConnectionsComponent),
    title: 'Connections',
    data: { hide: true, icon: 'people' },
  },
  {
    path: 'settings/blocks',
    loadComponent: () => import('./settings/blocks/blocks.component').then((c) => c.BlocksComponent),
    title: 'Blocks',
    data: { hide: true, icon: 'manage_accounts' },
  },
  {
    path: 'settings/roles',
    loadComponent: () => import('./settings/roles/roles.component').then((c) => c.RolesComponent),
    title: 'Roles',
    data: { hide: true, icon: 'group' },
  },
  {
    path: 'settings/notifications',
    loadComponent: () =>
      import('./settings/notifications/notifications.component').then((c) => c.NotificationsComponent),
    title: 'Notifications',
    data: { hide: true, icon: 'settings' },
  },
  {
    path: 'settings/debug',
    loadComponent: () => import('./settings/debug/debug.component').then((c) => c.DebugComponent),
    title: 'Debug',
    data: { hide: true, icon: 'bug_report' },
  },
  {
    path: 'tree',
    loadComponent: () => import('./tree/tree.component').then((c) => c.TreeComponent),
    title: 'Tree',
    data: { hide: true, icon: 'folder' },
  },
  {
    path: 'drag-drop',
    loadComponent: () => import('./drag-drop/drag-drop.component').then((c) => c.DragDropComponent),
    title: 'Drag-Drop',
    data: { hide: true, icon: 'folder' },
  },
  {
    path: 'storage',
    loadComponent: () => import('./storage/storage.component').then((c) => c.StorageComponent),
    title: 'Storage',
    data: { icon: 'cloud' },
  },
  {
    path: 'management',
    loadComponent: () => import('./management/management.component').then((c) => c.ManagementComponent),
    title: 'Management',
    data: { hide: true, icon: 'manage_accounts' },
  },
  {
    path: 'app/nostr',
    loadComponent: () => import('./apps/app/nostr/nostr.component').then((c) => c.NostrComponent),
    title: 'Nostr client',
    data: { hide: false, icon: 'favorite' },
  },
];
