import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number= 0;
  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
    
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
  getContacts() {
  this.http.get<Contact[]>(
    'https://wdd430-cms-6d8d9-default-rtdb.firebaseio.com/contacts.json'
  )
  .subscribe(
    (contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      this.contactListChangedEvent.next(this.contacts.slice());
    },
    (error: any) => {
      console.error('Error fetching contacts:', error);
    }
  );
}
storeContacts() {
  const contactsString = JSON.stringify(this.contacts);
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.put(
    'https://wdd430-cms-6d8d9-default-rtdb.firebaseio.com/contacts.json',
    contactsString,
    { headers: headers }
  ).subscribe(() => {
    this.contactListChangedEvent.next(this.contacts.slice());
  });
}



  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

 addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    this.maxContactId++;
    contact.id = this.maxContactId.toString();
    this.contacts.push(contact);
    const contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
     const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.storeContacts();
  }
}
