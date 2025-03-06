import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {IBroadcaseMessage}  from '../../../interfaces/IBroadcaseMessage.interface'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() previewData:IBroadcaseMessage;
  @Output() toMessages=new EventEmitter();
  @Output() broadcastMessages=new EventEmitter();

  constructor(private router:Router) { 
    this.previewData= {
      message:"",
      is_sms:false,
      is_email:false,
      subject:"",
      emails:[]
    };
  }

  ngOnInit(): void {
  }

  toMessage(){
    this.toMessages.emit(true)
  }

  broadcastMessage(){
    this.broadcastMessages.emit(this.previewData)
  }
}
