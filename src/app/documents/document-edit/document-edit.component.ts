import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('url') url: ElementRef;

  originalDocument: Document | null;
  document: Document | null = null;
  editMode = false;
  id: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

 ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    const id = params['id'];

    if (!id) {
      // NEW document
      this.editMode = false;
      this.document = {
        id: '',
        name: '',
        description: '',
        url: '',
        children: []
      };
      return;
    }

    // EDIT existing document
    this.originalDocument = this.documentService.getDocument(+id);
    if (!this.originalDocument) {
      return;
    }

    this.editMode = true;
    this.document = JSON.parse(JSON.stringify(this.originalDocument));
  });
}



    onSubmit(form:NgForm) {
       // get values from the form
    const value = form.value;

    // create a new Document object using the form values
    const newDocument = new Document(value.id, value.name, value.description, value.url,[]);

    // check if we are in edit mode
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument!, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }
  
  onCancel() {
		this.router.navigate(['/documents'], { relativeTo: this.route });
	}
}
