import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  standalone: false
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document = null;
  constructor(private documentService: DocumentService) {}

 ngOnInit() {
 this.documentService.documentSelectedEvent
 .subscribe(
  (document: Document) => {
    this.selectedDocument = document;
  })
}
}