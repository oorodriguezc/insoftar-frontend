import {AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';

import {User} from '../../core/models/user/user';
import {paginatorConfig} from '../../core/constants/constants';
import {UsersService} from '../../core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @Output() users: User[];
  public selectedUser: User;
  public pageLength: number;
  public pageSize: number;
  public pageIndex: number;
  public pageSizeOptions: number[] = paginatorConfig.PAGE_SIZE_OPTIONS;
  public pageEvent: PageEvent;
  public loading: boolean;
  public requestDefaultPaginator = paginatorConfig.REQUEST_DEFAULT_PAGINATOR;
  dataSourceUser: MatTableDataSource<User>;
  @ViewChild(MatPaginator) userPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'phone',
    'actions'
  ];

  constructor(
    public activatedRoute: ActivatedRoute,
    private userService: UsersService,
  ) {
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
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
              this.initTable(this.requestDefaultPaginator);
              Swal.fire('Eliminado!', `El usuario "${this.selectedUser.firstname}" ha sido eliminado`, 'success');
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', `El usuario "${this.selectedUser.firstname}" aún se conserva`, 'warning');
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.initTable(this.requestDefaultPaginator);
  }

  pageNavigations(event: PageEvent): PageEvent {
    const request = {
      size: undefined,
      page: undefined
    };
    request.page = event.pageIndex.toString();
    request.size = event.pageSize.toString();
    this.initTable(request);

    return event;
  }

  initTable(request): void {
    this.userService.getUsersPageable(request)
      .subscribe(users => {
        if (!users) {
          return;
        }
        this.users = users.data.content as User[];
        this.dataSourceUser = new MatTableDataSource(this.users);
        this.dataSourceUser.paginator = this.userPaginator;
        this.dataSourceUser.sort = this.sort;
        this.pageLength = users.data.totalElements;
        this.pageSize = users.data.size;
        this.pageIndex = users.data.number;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

}
