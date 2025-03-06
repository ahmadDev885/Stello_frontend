import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { ContactComponent } from './components/client/contact/contact.component';
import { AuthGuard } from './guards/authGuard';
import { LoginComponent } from './components/login/login.component';
import { AgGridComponent } from './components/ag-grid/ag-grid.component';
import { CreateMessageComponent } from './components/client/create-message/create-message.component';
import { PreviewComponent } from './components/client/preview/preview.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModalComponent } from './components/modal/modal.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { CreateUserModalComponent } from './components/admin/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from './components/admin/edit-user-modal/edit-user-modal.component';
import { DeleteConfirmationModalComponent } from './components/admin/delete-confirmation-modal/delete-confirmation-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { CustomButtonComponent } from './components/ag-grid/custom-button/custom-button.component';
import { CampaignListComponent } from './components/client/campaign-list/campaign-list.component';
import { ClientParentComponent } from './components/client/client-parent/client-parent.component';
import { CanDeactivateGuard } from './guards/canDeactivateGuard';
import { LoadDataModalComponent } from './components/client/load-data-modal/load-data-modal.component';
import { HasRoleGuard } from './services/shared.service';
import { TemplatesDropdownComponent } from './components/client/templates-dropdown/templates-dropdown.component';
import { AuthInterceptor } from './interceptors/authInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    ContactComponent,
    AgGridComponent,
    CreateMessageComponent,
    PreviewComponent,
    ModalComponent,
    UserListComponent,
    CreateUserModalComponent,
    EditUserModalComponent,
    DeleteConfirmationModalComponent,
    HeaderComponent,
    AdminComponent,
    ClientComponent,
    CustomButtonComponent,
    CampaignListComponent,
    ClientParentComponent,
    LoadDataModalComponent,
    TemplatesDropdownComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CKEditorModule,
    FormsModule,
    NgxDropzoneModule
  ],
  providers: [AuthGuard,CanDeactivateGuard,HasRoleGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
