import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title;

  @Input() errorMessage;

  @Input() check;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}
