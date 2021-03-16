import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../core/models/user/user';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../core/services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  public errors: string[];
  public post: any = '';
  public formGroup: FormGroup;
  public user: User = new User();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      firstname: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]],
      lastname: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]],
      idNumber: [null, [
        Validators.maxLength(20),
        Validators.pattern('\\d+')
      ]],
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      phone: [null, [
        Validators.maxLength(10),
        Validators.pattern('\\d+')
      ]],
    });
  }

  loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.userId;
      if (id) {
        this.usersService.getUserById(id).subscribe((user) => {
          this.user = user;
          this.updateUserSetForm();
        });
      }
    });
  }

  updateUserSetForm(): void {
    this.formGroup.patchValue({
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      idNumber: this.user.idNumber,
      email: this.user.email,
      phone: this.user.phone,
    });
  }

  create(): void {
    this.usersService.create(this.user)
      .subscribe(() => {
          this.router.navigate(['/']);
          Swal.fire('Nuevo usuario', `El usuario "${this.user.firstname}" ha sido creado con exito`, 'success');
        },
        error => {
          this.errors = this.getFormErrorMessage(error);
        });
  }

  update(): void {
    this.usersService.update(this.user)
      .subscribe(() => {
          this.router.navigate(['/']);
          Swal.fire('Usuario actualizado', `El usuario "${this.user.firstname}" se ha actualizado correctamente`, 'success');
        },
        error => {
          this.errors = this.getFormErrorMessage(error);
        }
      );
  }

  onSubmit(post): void {
    this.user = post;
    this.user.email = this.user.email.toLowerCase();
    if (this.user.id == null) {
      this.create();
    } else {
      this.update();
    }
  }

  getErrorFirstname(): string {
    return this.formGroup.get('firstname').hasError('required') ? 'Los nombres del usuario son necesarios' :
      this.formGroup.get('firstname').hasError('minlength') ? 'Los nombres del usuario debe tener al menos 4 caracteres' :
        this.formGroup.get('firstname').hasError('maxlength') ? 'Los nombres del usuario debe tener máximo 100 caracteres' : '';
  }

  getErrorLastname(): string {
    return this.formGroup.get('lastname').hasError('required') ? 'Los apellidos del usuario son necesarios' :
      this.formGroup.get('lastname').hasError('minlength') ? 'Los apellidos del usuario debe tener al menos 4 caracteres' :
        this.formGroup.get('lastname').hasError('maxlength') ? 'Los apellidos del usuario debe tener máximo 100 caracteres' : '';
  }

  getErrorEmail(): string {
    return this.formGroup.get('email').hasError('required') ? 'El correo electrónico es necesario' :
      this.formGroup.get('email').hasError('email') ? 'El texto ingresado no se parece a un correo electrónico' : '';
  }

  getErrorIdNumber(): string {
    return this.formGroup.get('idNumber').hasError('maxlength') ? 'El número de identificación debe tener máximo 20 caracteres' :
      this.formGroup.get('idNumber').hasError('pattern') ? 'El número de identificación debe ser numérico' : '';
  }

  getErrorPhone(): string {
    return this.formGroup.get('phone').hasError('maxlength') ? 'El teléfono debe tener máximo 10 caracteres' :
      this.formGroup.get('phone').hasError('pattern') ? 'El teléfono debe ser numérico' : '';
  }

  getFormErrorMessage(error: any): string[] {
    if (error.error.errors !== undefined) {

      return error.error.errors as string[];
    } else {
      console.error(error.error.error + ' ::>> ' + error.error.message);
      if (Array.isArray(error.error.message)) {

        return error.error.message as string[];
      }
      if (error.error.message === undefined) {
        Swal.fire('Upps, algo inesperado ha sucedido', `El servidor ha retornado un error "${error.error.error}"`, 'error');
      } else {
        Swal.fire('Upps, algo inesperado ha sucedido', `El servidor ha retornado un error de tipo "${error.error.message}"`, 'error');
      }

      return null;
    }

  }

}
