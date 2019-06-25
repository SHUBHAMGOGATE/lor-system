import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  constructor(private fb: FormBuilder, private documentService: DocumentService, private authService: AuthService) { }
  form: FormGroup;
  error: string;
  filename: string;
  documents: any;
  isPageLoaded$: Observable<boolean>;
  uploadResponse = { status: '', message: '', filePath: '' };
  downLoading:Object={};
  deleting:Object={};
  deletion_errors:Object={};
  downloading_errors:Object={};
  ngOnInit() {
    this.documents = this.documentService.documentsList;
    this.form = this.fb.group({
      format: ['']
    });
    this.filename = 'Choose A File';
    this.isPageLoaded$ = this.documentService.isPageLoaded$;
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('format').setValue(file);
      this.filename = event.target.files[0].name;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('format').value);

    this.documentService.uploadDocuments(formData, this.filename).subscribe(
      (res) => {this.uploadResponse = res; this.filename = 'Choose A File';},
      (err) => this.error = err,
      () => {
        console.log("done");
      }
        );
  }
  download(filename: string) {
    this.downLoading[filename]=true;
    this.documentService.downloadDocument(filename).subscribe(
      x => {
        console.log(x);
        delete this.downloading_errors[filename];
        saveAs(x, filename);
      },
      err => {
        console.log(err);
        this.downloading_errors[filename]=err.error.message;
      },
      ()=>{
        delete this.downLoading[filename];
      }
    );

    // window.location.href=`http://localhost:3000/LORFormats/download/${filename}?email=${this.authService.currentUserValue.email}`
  }
  delete(filename: string) {
    this.deleting[filename]=true;
    this.documentService.deleteDocument(filename).subscribe(
      x => {
        console.log(x);
        delete this.deletion_errors[filename];
      },
      error=>{
        this.deletion_errors[filename]=error.error.message;
      },
      ()=>{
        delete this.deleting[filename];
        console.log('delete')
      }
    );
  }
}
