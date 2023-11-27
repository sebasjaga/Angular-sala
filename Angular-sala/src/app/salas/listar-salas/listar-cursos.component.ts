import {Component, OnInit} from '@angular/core';
import {Curso} from "../model/curso";
import {CursoService} from "../service/curso.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {
  public cursos: Array<Curso> = [];
  public nombreCurso!: string;
  public cursoSelected!: Curso;
  public selected: boolean = false;

  constructor(private cursoService: CursoService, private routerPath: Router, private router: ActivatedRoute) {
      this.cursoService.getCursos().subscribe(
        (cursos: Array<Curso>) => {
          this.cursos = cursos;
        }
      );
  }


  /**
   * Metodo que se ejecuta al iniciar el componente
   */
  ngOnInit(): void {
    //this.cursos[2] = {Tipo aula: 'SALA DE INFORMATICA'};
    // this.cursos[1] = {id: 2, curso: 'Java', programa: 'Ingenieria de sistemas'};
    // this.cursos[2] = {id: 3, curso: 'Python', programa: 'Ingenieria de sistemas'};
    // this.cursos[3] = {id: 4, curso: 'C#', programa: 'Ingenieria de sistemas'};
    // this.cursos[4] = {id: 5, curso: 'C++', programa: 'Ingenieria de sistemas'};
  }

  /**
   * Evento que se dispara al seleccionar un curso en la lista
   * @param curso Curso seleccionado
   */
  onSelected(curso: Curso) {
     this.cursoSelected = curso;
     this.selected=true;
     // console.log(this.cursoSelected); //Imprime en la consola del navegador el curso seleccionado
     this.routerPath.navigate(['/editar/' + this.cursoSelected.id]); //Redirecciona a la ruta /editar/:id
  }

  /**
   * Metodo que elimina un curso seleccionado de la lista
   * @param curso Curso a eliminar
   */
  borrarCurso(curso: Curso) {
    Swal.fire({
      title: "Esta seguro?",
      text: "Usted no puede revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borra la sala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.borrarCurso(curso.id).subscribe(() => { // Llama al servicio para eliminar el curso
          Swal.fire({
            title: "Eliminado!",
            text: "La sala ha sido eliminado.",
            icon: "success"
          });
          this.cursos = this.cursos.filter((c) => c !== curso); // Actualiza la lista de cursos en la vista
        });
      }
    });
  }

  /**
   * Metodo que redirecciona a la ruta /crear
   */
  crearCurso() {
    this.routerPath.navigate(['/crear']);
  }
}
