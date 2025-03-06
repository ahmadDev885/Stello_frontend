import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-load-data-modal',
  templateUrl: './load-data-modal.component.html',
  styleUrls: ['./load-data-modal.component.css']
})
export class LoadDataModalComponent implements OnInit {
  files: File[] = [];
  isLoading: boolean;
  checkBox:string;

  constructor(public activeModal: NgbActiveModal,private http: ApiService) { 
    this.checkBox='database';
  }

  ngOnInit(): void {}

  onChange(event){
    this.checkBox= event.target.value;
  }

  enableUpload(){
    if(this.checkBox==='csv'){
      if(this.files.length==0){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }


  onSelect(event) {
    if(this.files.length==0){
    	this.files.push(...event.addedFiles);
    }else{
		this.files.push(...event.addedFiles);
		this.onRemove(this.files[0]);
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload() {
    this.isLoading = true;
    if(this.checkBox==='csv'){
      if (this.files.length != 0) {
        const type = {
          type: "csv",
          files : this.files
        }
        this.activeModal.close(type)
        
      }
    }else{
      const type = {
        type: "database",
      }
      this.activeModal.close(type)
     
    }
  }

}
