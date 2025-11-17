import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  getMaxId(): number {
      let maxId = 0;

      for (const document of this.documents) {
        const currentId = parseInt(document.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }

      return maxId;
    }
  getDocuments() {
  this.http
    .get<Document[]>('https://wdd430-cms-6d8d9-default-rtdb.firebaseio.com/documents.json')
    .subscribe(

      // SUCCESS FUNCTION
      (documents: Document[]) => {
        this.documents = documents ?? [];

        this.maxDocumentId = this.getMaxId();

        // Sort by name
        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        // Emit updated list
        this.documentListChangedEvent.next(this.documents.slice());
      },

      // ERROR FUNCTION
      (error: any) => {
        console.error('Error fetching documents:', error);
      }
    );
}

 getDocument(id: number | string): Document | null {
  for (const document of this.documents) {
    if (document.id === id.toString()) {
      return document;
    }
  }
  return null;
}
  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://wdd430-cms-6d8d9-default-rtdb.firebaseio.com/documents.json',
      documentsString,
      { headers }
    ).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }


  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.storeDocuments();;
  }
 updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
        const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.storeDocuments();
  }
}
