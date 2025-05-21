import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'Subject 1', 'Lorem Ipsum', 'Lorem Ipsum'),
    new Message(2, 'Subject 2', 'Hello 123', 'Jane Smith'),
    new Message(3, 'Subject 3', 'Hi 321', 'John Doe')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
