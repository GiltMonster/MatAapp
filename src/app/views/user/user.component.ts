import { UserService } from './../../services/user.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users = new Array<User>();
  columns = ['name', 'username', 'actions'];
  // users = new User[];
  selectedUser?: User = undefined;
  inserting = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.list();
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, '', { duration: 3000 });
  }

  list(): void {
    this.userService.list().subscribe(
      users => {
        this.users = users;
      },
      error => {
        this.handleServiceError(error);


      });
  }

  private handleServiceError(error: any) {
    const e = error as HttpErrorResponse;
    console.log(e);
    this.showSnackBar(e.statusText);
  }

  select(user: User) {
    this.selectedUser = user;
    this.inserting = false;

  }

  cancel() {
    this.selectedUser = undefined;
    this.list();

  }

  save() {
    if (this.inserting) {
      this.userService.insert(this.selectedUser).subscribe(() => {
        this.cancel();
        this.showSnackBar('Usuário salvo');
      },
        error => {
          this.handleServiceError(error);

        });
    } else {
      this.userService.update(this.selectedUser).subscribe(() => {
        this.cancel();
        this.showSnackBar('Usuário Atualizado');

      },
        error => {
          this.handleServiceError(error);
        });
    }
  }

  create(){
    this.inserting = true;
    this.selectedUser = {
      id: undefined,
      name: '',
      username: '',
      pass: ''
    };
  }

}
