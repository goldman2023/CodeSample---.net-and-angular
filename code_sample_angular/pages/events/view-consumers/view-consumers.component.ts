import { ViewConsumersService } from './view-consumers.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare const $: any;
import { saveAs } from 'file-saver';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
@Component({
  selector: 'app-view-consumers',
  templateUrl: './view-consumers.component.html',
  styleUrls: ['./view-consumers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewConsumersComponent implements OnInit {
  id
  pdfConsumerList: any = []
  eventConsumerList: any = []
  eventConsumerEarnings: any = []
  eventConsumerRedeem: any = []
  noDataStyle
  logoImg
  eventName
  constructor(private route: ActivatedRoute, private viewConsumersService: ViewConsumersService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.eventName = this.route.snapshot.params.name;

    this.viewConsumersService.getConsumerEventList(this.id).subscribe(data => {
      this.eventConsumerList = data.data
      this.eventConsumerList.forEach(element => {
        this.pdfConsumerList.push([element.number, element.first_name, element.last_name, element.email, element.phone_number,
        element.zip_code, element.tickets_purchased, element.tickets_used])
      });
      if (this.eventConsumerList.length === 0) {
        this.noDataStyle = true
      }
    })
  }
  details(consumerId) {

    this.viewConsumersService.consumerRedeem(this.id, consumerId).subscribe(data => {
      this.eventConsumerRedeem = data.data
      this.viewConsumersService.consumerEarnings(this.id, consumerId).subscribe(value => {
        this.eventConsumerEarnings = value.data
        $('#disableContent').modal('show');
      })
    })
  }
  csv() {
    this.viewConsumersService.csvExport(this.id).subscribe(data => {
      const blob = new Blob([data.data.csv], { type: 'text/csv' })
      saveAs(blob, data.data.filename)
    })
  }

  public captureScreen() {
    const dataLogo = document.getElementById('logo');
    html2canvas(dataLogo, {
      width: 1000
    }).then(canvas => {
      this.logoImg = canvas.toDataURL()

      let doc = new jspdf('landscape');
      const img = canvas.toDataURL()
      doc = new jspdf('p', '', 'a4');
      doc.setFontSize(20);
      doc.addImage(this.logoImg, 'png', 11, 10, 60, 15);
      doc.text('Consumer Report', 147, 22);
      doc.setFontSize(18);
      doc.text('Event Name :' + this.eventName, 14, 45);
      doc.setFontSize(15);
      doc.setFontSize(15);
      doc.text('Consumers', 14, 60);
      doc.autoTable({
        head: [['S.No.', 'First Name', 'Last Name', 'Email', 'Phone', 'Zip Code',
          'Tickets Purchased', 'Tickets Used']], body: this.pdfConsumerList,
        startY: 70,
        showHead: 'firstPage',
        columnStyles: {
          0: { columnWidth: 20 },
          3: { columnWidth: 30 },
        }
      });
      doc.save('Event Report of ' + this.eventName);
    });
  }

}
