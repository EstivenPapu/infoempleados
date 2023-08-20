import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModal



interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  puesto: string;
}

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  usuarioId: string | null = null; 
    empleados: Empleado[] = [];

    

    constructor(private modalService: NgbModal) {} // Inyecta NgbModal

    ngOnInit() {
     // Intenta obtener el ID del usuario almacenado en el almacenamiento local
    this.usuarioId = localStorage.getItem('usuarioId');

    // Si no existe, genera uno nuevo y almacénalo en el almacenamiento local
    if (!this.usuarioId) {
      this.usuarioId = this.generarUsuarioId();
      localStorage.setItem('usuarioId', this.usuarioId);
    }

    // Intenta cargar los empleados del usuario desde el almacenamiento local
    const storedData = localStorage.getItem(`empleados_${this.usuarioId}`);
    if (storedData) {
      this.empleados = JSON.parse(storedData);
    }
  }

    @ViewChild('modalAgregar') modalAgregarRef!: ElementRef;
    @ViewChild('modalVer') modalVerRef!: ElementRef; 
    @ViewChild('modalEditar') modalEditarRef!: ElementRef;
  
    empleadoSeleccionado: Empleado | undefined;
    modoEdicion: boolean = false;

    nuevoEmpleado: Empleado= {
      id: 0,
      nombre: '',
      apellido: '',
      puesto: ''
    };

    limpiarSeleccion() {
      this.empleadoSeleccionado = undefined;
      this.modoEdicion = false;
    }
    guardarEmpleados() {
      localStorage.setItem(`empleados_${this.usuarioId}`, JSON.stringify(this.empleados));
    }
    generarUsuarioId(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }


    

    agregarEmpleado(){
      this.agregarEmpleados(this.nuevoEmpleado);
      this.guardarEmpleados();
      this.limpiarSeleccion();
      this.nuevoEmpleado = {id:0,nombre:'',apellido:'',puesto:''};
    }
    agregarEmpleados(nuevoEmpleado: Empleado){
      this.empleados.push(nuevoEmpleado);
      this.guardarEmpleados();
    }
    abrirModalAgregar() {
      this.modalService.open(this.modalAgregarRef);
      }
    

    
    verDetalle(empleado: Empleado) {
      this.empleadoSeleccionado = empleado;
      this.modalService.open(this.modalVerRef);
    }



    editarEmpleado(empleado: Empleado){
      this.empleadoSeleccionado = empleado;
      this.modoEdicion = true;
      this.modalService.open(this.modalEditarRef);
     
    }
    guardarEdicion(){
      if(this.empleadoSeleccionado){
          this.guradarEdicion(this.empleadoSeleccionado)
          this.limpiarSeleccion
      }
    }
    guradarEdicion(empleadoEditado: Empleado){
      const index = this.empleados.findIndex(e => e.id === empleadoEditado.id);
      if(index !== -1) {
        this.empleados[index] = empleadoEditado;
        this.guardarEmpleados();
        this.modoEdicion = false;
      } 
    }



    eliminarEmpleado(empleado: Empleado){
      const index = this.empleados.findIndex(e => e.id === empleado.id);
      if(index !== -1){
          this.empleados.splice(index, 1);
          this.guardarEmpleados();
          this.limpiarSeleccion();
      } 
    }



    idExistente(): boolean {
      return this.empleados.some(empleado => empleado.id === this.nuevoEmpleado.id);
    }
   
}
