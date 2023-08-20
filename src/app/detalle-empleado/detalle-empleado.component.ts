import { Component, Input } from '@angular/core';

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  puesto: string;
}

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent {
@Input() empleado: Empleado | undefined;
}
