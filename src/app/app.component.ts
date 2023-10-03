import { BehaviorSubject, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FetchUsersService } from './services/fetch-users.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataBetweenComponentsService } from './services/data-between-components.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { User } from './interface/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fullstackTest-frontend-angular16';
  allUsers: any[] = [];
  oneUser: any[] = [];
  numberInput = 1;
  nameInput = "";
  users$ = [];


  constructor(private usersService: FetchUsersService, private data: DataBetweenComponentsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.usersService.getUserById(this.numberInput).subscribe({
      next: (response) => {
        this.oneUser.push(response);
        this.data.setNewUser(this.oneUser);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  onCLickFetch() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.allUsers = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  numberInputControl = new FormControl('', [Validators.required]);
  nameInputControl = new FormControl('', [Validators.required]);

  onClickInsert() {
    if (this.nameInput != null && this.nameInput != "") {
      let userPayload: User = {
        name: this.nameInput
      }
      this.usersService.insertUser(userPayload);
    }
  }

  grabInputValue() {
    this.usersService.getUserById(this.numberInput).subscribe({
      next: (response) => {
        if (response) {
          this.oneUser = []
          this.oneUser.push(response)
          this.data.setNewUser(this.oneUser);
          const dialogRef = this.dialog.open(ModalComponent);
          dialogRef.afterClosed().subscribe(result => {
            // this.data.userObject$ = new BehaviorSubject<any>()
            // this.data.addUserToUserObject([])
            // this.data.addNewUser([]);
          });
        } else {
          const dialogRef = this.dialog.open(ModalComponent);
          this.data.setNewUser(["User with this id doesn't exist"]);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
