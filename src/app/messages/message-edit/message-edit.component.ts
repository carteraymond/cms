import { Component, ViewChild, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
  standalone: false
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService,) {}

  ngOnInit() {
  }

  onSendMessage() {
    // Ensure currentSender is available before creating the message
      // Retrieve input values
      const subjectValue = this.subjectInputRef.nativeElement.value;
      const msgTextValue = this.msgTextInputRef.nativeElement.value;
  
      // Create new Message object (use sender ID instead of name)
      const newMessage = new Message('44', subjectValue, msgTextValue, "12"); 
    
      // Call addMessage() method from MessageService
      this.messageService.addMessage(newMessage);
  
      // Emit the new message to the parent component
      this.addMessageEvent.emit(newMessage);
  
      // Clear the input fields
      this.onClear();
  }  

  onClear() {
    // Clear input field values
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}