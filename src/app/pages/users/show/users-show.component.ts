import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {User} from '../../../core/models/user/user';
import {UsersService} from '../../../core/services/users.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrls: ['./users-show.component.css']
})
export class UsersShowComponent implements OnInit {

  public user: User = new User();
  private selectedUser: User;

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.userId;
      if (id) {
        this.userService.getUserById(id).subscribe((user) => {
          this.user = user;
        });
      }
    });
  }

  delete(id: number): void {
    this.userService.getUserById(id).subscribe(user => {
      this.selectedUser = user;
      Swal.fire({
        title: '¿Está seguro?',
        text: `Está seguro de eliminar el usuario "${this.selectedUser.firstname}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '<em class="fas fa-trash-alt"></em> Si, elimínelo!',
        cancelButtonText: ' <em class="fas fa-times-circle"></em> No, cancelar!',
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.userService.delete(this.selectedUser.id).subscribe(
            () => {
              this.router.navigate(['/']);
              Swal.fire(
                'Eliminado!',
                `El usuario "${this.selectedUser.firstname}" ha sido eliminado`,
                'success'
              );
            }, error => {
              Swal.fire('No es posible eliminar', error.error.message, 'error');
            }
          );
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelado',
            `El usuario "${this.selectedUser.firstname}" aún se conserva`,
            'error'
          );
        }
      });
    });
  }

}
