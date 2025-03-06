import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { URL } from 'src/app/constants/urls';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import * as Editor from '../../../../ckeditor.js';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css'],
})
export class CreateMessageComponent implements OnInit {
  public Editor = Editor;
  data!: any;

  is_sms: boolean;

  is_email: boolean;

  subject: string;

  feed: any[];

  isLoading: boolean;

  templates:any[];

  isTagsLoading:boolean;

  isTemplatesLoading:boolean;

  subscription:Subscription;

  @Output() toContacts = new EventEmitter();

  @Output() messageBody = new EventEmitter();

  constructor(private router: Router, private http: ApiService,private sharedService:SharedService) {
    this.data = '';
    this.is_sms = false;
    this.is_email = false;
    this.subject = '';
    this.subscription = new Subscription();
    this.isLoading = true
    this.isTagsLoading=true;
    this.isTemplatesLoading=true;
    this.http.get(URL.TAGS).subscribe(res=>{
      this.feed=res.body.tags
      this.isTagsLoading = false
    })

    this.http.get(URL.TEMPLATES).subscribe(res=>{
      this.templates=res.body.message_templates
      this.isTemplatesLoading = false
    })
  }

  ngOnInit(): void {}

  toContact() {
    this.toContacts.emit(true);
  }

  setMessageContent() {
    let temp = {
      data: this.data,
      is_email: this.is_email,
      is_sms: this.is_sms,
      subject: this.subject,
    };
    this.messageBody.emit(temp);
  }

  smsCheck() {
    this.is_sms = !this.is_sms;
  }

  emailCheck() {
    this.is_email = !this.is_email;
  }

  getTemplate(event:any,popover:any){
    this.data=event.message;
    this.subject=event.subject;
    popover.close()
    // let popover=document.getElementById('popover')
    // popover.re=true;
  }
}
