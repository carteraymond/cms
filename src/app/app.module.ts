import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    
    
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    
 
    MessageItemComponent,

    MessageListComponent,
      DocumentEditComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MessageEditComponent,
    ContactItemComponent,
    HeaderComponent,
    DropdownDirective,
    DocumentDetailComponent,
  RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}