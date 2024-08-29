# Proyecto de Gestión de Tareas

Este es un proyecto de gestión de tareas basado en JavaScript, HTML y CSS. Permite crear, editar y eliminar tareas, asignándoles diferentes niveles de prioridad (alta, media, baja) y fechas de vencimiento. Las tareas se almacenan en el `localStorage` del navegador, lo que permite persistir los datos entre sesiones.

## Características

- **Crear tareas:** Permite añadir nuevas tareas con un título, descripción, fecha de vencimiento y nivel de prioridad.
- **Editar tareas:** Modifica las tareas existentes.
- **Eliminar tareas:** Borra tareas específicas.
- **Prioridades de tareas:** Las tareas se pueden clasificar en tres niveles de prioridad (alta, media, baja).
- **Almacenamiento local:** Las tareas se almacenan en `localStorage`, lo que permite que persistan incluso después de cerrar el navegador.
- **Interfaz dinámica:** La interfaz se actualiza automáticamente cuando se añaden, editan o eliminan tareas.
- **Validación de formularios:** Los campos de título y prioridad son obligatorios.
- **Confirmación de eliminación:** Muestra un cuadro de diálogo de confirmación antes de eliminar una tarea.

## Instalación

1. Clona este repositorio en tu máquina local:
   git clone https://github.com/tu-usuario/proyecto-gestion-tareas.git

2. Navega hasta el directorio del proyecto:
   cd proyecto-gestion-tareas

3.Abre el archivo index.html en tu navegador preferido para iniciar la aplicación.

## Uso
   **Añadir una nueva tarea:**
        Rellena el formulario con el título, descripción, fecha y prioridad de la tarea.
        Haz clic en el botón "Guardar" para añadir la tarea.

  **Editar una tarea existente:**
        Haz clic en el ícono de edición (el lápiz) al lado de la tarea que deseas editar.
        Modifica los campos según sea necesario y haz clic en "Guardar cambios".

   **Eliminar una tarea:**
        Haz clic en el ícono de la papelera al lado de la tarea que deseas eliminar.
        Confirma la eliminación en el cuadro de diálogo que aparece.

   **Resumen de tareas**
        La interfaz muestra un resumen del número total de tareas y la cantidad de tareas según la prioridad.


## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, sigue estos pasos:

   -Haz un fork de este repositorio.
   -Crea una rama nueva (git checkout -b feature/nueva-funcionalidad).
   -Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
   -Sube los cambios a tu repositorio (git push origin feature/nueva-funcionalidad).
   -Abre un Pull Request aquí.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
