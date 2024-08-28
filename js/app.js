document.addEventListener('DOMContentLoaded', function() {
  // Si existe un array con todas las tareas en localStorage, lo recuperamos y pintamos las tareas
  if (localStorage.getItem('tareas')) {
      console.log('ya existe el array de tareas');
      const arrayTareas = JSON.parse(localStorage.getItem("tareas"));
      console.log(arrayTareas);
      pintarTareas(arrayTareas);
  }
});

const panelTareas = document.querySelector('.panel-tareas');
const formTarea = document.querySelector('.form-tarea');
const btnGuardar = document.querySelector('.btn-guardar');
const tituloTarea = document.querySelector('#titulo-tarea');
const idTarea = document.querySelector('#id-tarea');
const descripcionTarea = document.querySelector('#descripcion-tarea');
const fechaTarea = document.querySelector('#fecha-tarea');
const prioridadTarea = document.querySelector('#prioridad-tarea');
let editando = false;

function pintarTareas(arrayTareas) {
  console.log(arrayTareas);
  let html = '';
  let totalTareas = arrayTareas.length;
  let tareasAlta = 0;
  let tareasMedia = 0;
  let tareasBaja = 0;


  arrayTareas.forEach((tarea, index) => {
      let fecha = new Date(tarea.fecha);

      // Formatear la fecha como dd/MM
      let fechaFormateada = fecha.toLocaleDateString("es-ES", {
        day: '2-digit',
        month: '2-digit'
      });

      // Contabilizar las tareas por prioridad
      switch (tarea.prioridad) {
        case 'alta':
            tareasAlta++;
            break;
        case 'media':
            tareasMedia++;
            break;
        case 'baja':
            tareasBaja++;
            break;
    }

      html += `<div class="item-tarea ${tarea.prioridad}">
          <h3 class="titulo-tarea">${tarea.titulo}</h3>
          <p class="descripcion-tarea">${tarea.descripcion}</p>
          <p class="fecha-tarea">${fechaFormateada}</p>
          <i class="btn-eliminar fas fa-trash-alt" data-index="${index}"></i>
          <i class="btn-editar fas fa-edit" data-index="${index}"></i>
      </div>`;
  });


  html+=`<div class="toast"></div>`;  

  panelTareas.innerHTML = html;

  // Actualizar el resumen de tareas
  document.querySelector('#total-tareas').textContent = totalTareas;
  document.querySelector('#tareas-alta').textContent = tareasAlta;
  document.querySelector('#tareas-media').textContent = tareasMedia;
  document.querySelector('#tareas-baja').textContent = tareasBaja;

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', eliminarTarea);
  });

  document.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', editarTarea);
  });
}

function guardarTarea(e) {
  e.preventDefault();

  console.log('entro en guardar tarea');
  const tarea = {
      titulo: tituloTarea.value,
      descripcion: descripcionTarea.value,
      fecha: fechaTarea.value,
      prioridad: prioridadTarea.value
  };
  console.log(tarea);
  console.log('la prioridad',prioridadTarea.value);
  let arrayTareasRecuperado = [];
  let mensaje = '';

  try{
      if (editando) {
        const index = idTarea.value;
        arrayTareasRecuperado = JSON.parse(localStorage.getItem('tareas'));
        arrayTareasRecuperado[index] = tarea;
        localStorage.setItem('tareas', JSON.stringify(arrayTareasRecuperado));
        editando = false;
        btnGuardar.textContent = 'Guardar';
        formTarea.reset();
        pintarTareas(arrayTareasRecuperado);
        mensaje='Tarea editada con exito';
        showToast('exito', mensaje);
        return;
      }

      if (localStorage.getItem('tareas')) {
          // Recuperar tareas existentes
          arrayTareasRecuperado = JSON.parse(localStorage.getItem('tareas'));
      }
      // Añadir nueva tarea al array
      arrayTareasRecuperado.push(tarea);
      localStorage.setItem('tareas', JSON.stringify(arrayTareasRecuperado));
      
      formTarea.reset();
      pintarTareas(arrayTareasRecuperado);
      mensaje='Tarea añadida con exito';
      showToast('exito', mensaje);
  } catch (error) {
      console.error(error);
      showToast('fracaso');

  }
}

function eliminarTarea(e) {
  const index = e.target.getAttribute('data-index');
  console.log(index);
  const arrayTareasRecuperado = JSON.parse(localStorage.getItem('tareas'));
  arrayTareasRecuperado.splice(index, 1);
  localStorage.setItem('tareas', JSON.stringify(arrayTareasRecuperado));
  pintarTareas(arrayTareasRecuperado);
}

function editarTarea(e) {
  const index = e.target.getAttribute('data-index');
  console.log(index);
  const itemEditar = JSON.parse(localStorage.getItem('tareas'))[index];
  console.log(itemEditar);
  tituloTarea.value = itemEditar.titulo;
  descripcionTarea.value = itemEditar.descripcion;
  fechaTarea.value = itemEditar.fecha;
  idTarea.value = index;
  editando = true;
  btnGuardar.textContent = 'Guardar cambios';
}

function showToast(tipo, mensaje) {
  const toast = document.querySelector('.toast');
  toast.textContent = mensaje;
  toast.classList.remove('toast-error');
  toast.classList.remove('toast-confirmacion');
  toast.classList.add(`toast-${tipo}`);
  console.log(toast);
  toast.classList.add('toast-active');
  setTimeout(() => {
      toast.classList.remove('toast-active');
  }, 3000);
}

formTarea.addEventListener('submit', guardarTarea);
