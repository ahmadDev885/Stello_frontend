import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-templates-dropdown',
  templateUrl: './templates-dropdown.component.html',
  styleUrls: ['./templates-dropdown.component.css']
})
export class TemplatesDropdownComponent implements OnInit {
  @Input() templates;

  @Input() isTemplatesLoading:boolean;

  status:number

  selected:any;

  @Output() emitTemplate=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectedTemplate(liId:number,data:any){
   this.status=liId
   this.selected=data
  }

  onSelect(){
    this.emitTemplate.emit(this.selected);
  }

}
