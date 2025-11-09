import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  originalContact: Contact | null
  contact: Contact | null = null;
  groupContacts: Contact[] = [];
  editMode: boolean= false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = params['id'];

    if (!id) {
      // Adding new contact
      this.editMode = false;
      this.contact = new Contact('', '', '', '', '', null);
      return;
    }

    // Editing existing contact
    this.originalContact = this.contactService.getContact(id);
    if (!this.originalContact) return;

    this.editMode = true;
    this.contact = new Contact(
      this.originalContact.id,
      this.originalContact.name,
      this.originalContact.email,
      this.originalContact.phone,
      this.originalContact.imageUrl,
      this.originalContact.group ? JSON.parse(JSON.stringify(this.originalContact.group)) : null
    );

    // Initialize groupContacts if the contact has a group
    if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
  });
}

  onSubmit(form: NgForm) {
  const value = form.value;
  if (!this.contact) return;

  const newContact = new Contact(
    this.editMode ? this.contact.id : '',
    value.name,
    value.email,
    value.phone,
    value.imageUrl,
    this.groupContacts.length > 0 ? this.groupContacts : null
  );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact!, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
  

  this.onCancel();
}


  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
