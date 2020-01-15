import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { KnowledgeBaseComponent } from './views/knowledge-base/knowledge-base.component';
import { ApplicationsComponent } from './views/applications/applications.component';
import { StaffComponent } from './views/staff/staff.component';
import { SearchComponent } from './components/search/search.component';
import { ButtonComponent } from './components/button/button.component';
import { ClientsComponent } from './views/clients/clients.component';
import { ActivesComponent } from './views/actives/actives.component';
import { SettingsComponent } from './views/settings/settings.component';
import { SearchPipe } from './pipes/search.pipe';
import { ReductionStringPipe } from './pipes/reduction-string.pipe';
import { SeparateThousandsPipe } from './pipes/separate-thousands.pipe';
import { HomeComponent } from './views/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { EditComponent } from './components/edit/edit.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    KnowledgeBaseComponent,
    ApplicationsComponent,
    StaffComponent,
    SearchComponent,
    ButtonComponent,
    ClientsComponent,
    ActivesComponent,
    SettingsComponent,
    SearchPipe,
    ReductionStringPipe,
    SeparateThousandsPipe,
    HomeComponent,
    CreateComponent,
    SnackbarComponent,
    EditComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
