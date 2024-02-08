import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Scrum Master',
    'QA',
    'Desarrollador',
    'PO',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cedula: ['', Validators.required],
      cargo: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_de_ingreso: ['', Validators.required],
      compañia: ['', Validators.required],
      foto: [''],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      const formData = this.empForm.value;
      if (this.data) {
        this._empService.updateEmployee(this.data.id, formData).subscribe({
          next: () => {
            this._coreService.openSnackBar('Empleado actualizado exitosamente');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error al actualizar el empleado:', err);
          },
        });
      } else {
        this._empService.addEmployee(formData).subscribe({
          next: () => {
            this._coreService.openSnackBar('Empleado agregado exitosamente');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error al agregar el empleado:', err);
          },
        });
      }
    }
  }
}
