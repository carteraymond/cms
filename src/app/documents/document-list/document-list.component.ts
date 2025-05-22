import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
documents: Document[] = [
    new Document(1, 'First Document', 'This is the first document', 'https://example.com/doc1.pdf',[]),
    new Document(2, 'Second Document', 'This is the second document', 'https://example.com/doc2.pdf',[]),
    new Document(3, 'Third Document', 'This is the third document', 'https://example.com/doc3.pdf',[]),
    new Document(4, 'Fourth Document', 'This is the fourth document', 'https://example.com/doc4.pdf',[]),
    new Document(5, 'Fifth Document', 'This is the fifth document', 'https://example.com/doc5.pdf',[])
  ];

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document)
  }
}
