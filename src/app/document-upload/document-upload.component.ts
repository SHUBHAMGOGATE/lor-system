import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { saveAs } from "file-saver";
@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  constructor(private fb:FormBuilder, private documentService:DocumentService,private authService:AuthService) { }
  form: FormGroup;
  error: string;
  filename:string;
  documents:any;
  uploadResponse = { status: '', message: '', filePath: '' };
  ngOnInit() {
    this.documents=this.documentService.documentsList
    this.form = this.fb.group({
      format: ['']
    });
    this.filename='Choose A File';
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('format').setValue(file);
      this.filename=event.target.files[0].name;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('format').value);

    this.documentService.uploadDocuments(formData,this.filename).subscribe(
      (res) => {this.uploadResponse = res;this.filename='Choose A File'},
      (err) => this.error = err
    );
  }
  download(filename:string){
    this.documentService.downloadDocument(filename).subscribe(
      x=>{
        console.log(x);
        saveAs(x, filename)
      },
      err=>console.log(err)
    )
    //window.location.href=`http://localhost:3000/LORFormats/download/${filename}?email=${this.authService.currentUserValue.email}`
  }
  delete(filename:string){
    this.documentService.deleteDocument(filename).subscribe(x=>{console.log(x)});
  }
}
