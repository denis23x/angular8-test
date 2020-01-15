import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { KnowledgeBaseComponent } from './views/knowledge-base/knowledge-base.component';
import { ApplicationsComponent } from './views/applications/applications.component';
import { StaffComponent } from './views/staff/staff.component';
import { ClientsComponent } from './views/clients/clients.component';
import { ActivesComponent } from './views/actives/actives.component';
import { SettingsComponent } from './views/settings/settings.component';

import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Профессиональная веб-разработка и поддержка'
    }
  },
  {
    path: 'knowledge-base',
    component: KnowledgeBaseComponent,
    data: {
      icon: 'sidebar-folder.svg',
      title: 'База знаний'
    }
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    data: {
      icon: 'sidebar-applications.svg',
      title: 'Заявки'
    },
    children: [
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'Новая заявка'
        }
      },
      {
        path: ':id',
        component: EditComponent,
        data: {
          title: 'Редактирование'
        }
      }
    ]
  },
  {
    path: 'staff',
    component: StaffComponent,
    data: {
      icon: 'sidebar-folder.svg',
      title: 'Сотрудники'
    }
  },
  {
    path: 'clients',
    component: ClientsComponent,
    data: {
      icon: 'sidebar-folder.svg',
      title: 'Клиенты'
    }
  },
  {
    path: 'actives',
    component: ActivesComponent,
    data: {
      icon: 'sidebar-folder.svg',
      title: 'Активы'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      icon: 'sidebar-folder.svg',
      title: 'Настройки'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
