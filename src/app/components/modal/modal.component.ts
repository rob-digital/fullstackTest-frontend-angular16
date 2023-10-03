import { Component, OnInit } from '@angular/core';
import { DataBetweenComponentsService } from 'src/app/services/data-between-components.service';
import { MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    NgIf
   ],
})
export class ModalComponent implements OnInit {

  constructor(private data: DataBetweenComponentsService) { }

  result: any = [];
  displayModal1 = true;
  displayModal2 = true;

  ngOnInit(): void {
    this.result = this.data.getUser();

    if (this.result != null && (typeof this.result[0] == 'string')) {
      this.displayModal1 = false;
      this.displayModal2 = true;
    } else {
      this.displayModal1 = true;
      this.displayModal2 = false;
    }

  }

}
