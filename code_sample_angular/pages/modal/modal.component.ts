import { Component, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare const $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  id;
  @Output() value = new EventEmitter()
  public modalRef: NgbModalRef;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  open(id) {
    this.id = id;
    $('#myModalXmlView').modal('show');
  }
  getId(id) {
    this.value.emit(id)
  }
}
