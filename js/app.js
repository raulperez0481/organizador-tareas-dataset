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
let editando = false;

function pintarTareas(arrayTareas) {
  console.log(arrayTareas);
  let html = '';
  arrayTareas.forEach((tarea, index) => {
      html += `<div class="item-tarea">
          <h3 class="titulo-tarea">${tarea.titulo}</h3>
          <p class="descripcion-tarea">${tarea.descripcion}</p>
          <p class="fecha-tarea">${tarea.fecha}</p>
          <button class="btn-eliminar" data-index="${index}">Eliminar</button>
          <button class="btn-editar" data-index="${index}">Editar</button>
      </div>`;
  });


  html+=`<div class="toast"></div>`;  

  panelTareas.innerHTML = html;

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
      fecha: fechaTarea.value
  };
  console.log(tarea);
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
