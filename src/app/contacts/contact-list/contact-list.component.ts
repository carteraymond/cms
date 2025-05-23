import { Component, EventEmitter, Output } from '@angular/core';
import Contact from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    {
      id: '1',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: 'assets/images/jacksonk.jpg',
      group: [],
    },
    {
      id: '2',
      name: 'Rex Barzee',
      email: 'brazeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: 'assets/images/barzeer.jpg',
      group: [],
    },
  ];

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}