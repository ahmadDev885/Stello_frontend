import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ICustonButton } from 'src/app/interfaces/ICustomButton.interface';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit,ICellRendererAngularComp {
  buttonText!:string;
  params;

  constructor() { }
  agInit(params: ICellRendererParams<any, any>& ICustonButton): void {
    this.params = params;
    this.buttonText = params.buttonText;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  onEdit($event) {
    const params = {
      event: $event,
      rowData: this.params.data
    }
      this.params.onEdit(params);

    }

    onDelete($event) {
      const params = {
        event: $event,
        rowData: this.params.data
      }
        this.params.onDelete(params);
  
      }

}
