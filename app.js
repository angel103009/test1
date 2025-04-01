// Función para actualizar el localStorage
function actualizarLocalStorage() {
  localStorage.setItem("recomendaciones", document.getElementById("lista-recomendaciones").innerHTML);
}

// Función para cargar las recomendaciones guardadas (si las hubiera)
function cargarRecomendaciones() {
  const contenedor = document.getElementById("lista-recomendaciones");
  const almacenado = localStorage.getItem("recomendaciones");
  if (almacenado) {
    contenedor.innerHTML = almacenado;
    // Se deben asignar nuevamente los eventos de eliminación a cada botón ya cargado
    const botonesEliminar = contenedor.querySelectorAll(".eliminar");
    botonesEliminar.forEach(boton => {
      boton.addEventListener("click", function() {
        this.parentElement.remove();
        actualizarLocalStorage();
      });
    });
  }
}

// Función para agregar una nueva recomendación
function agregarRecomendacion() {
  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;

  if (mensaje.trim() === "") {
    alert("Por favor, escribe un mensaje.");
    return;
  }

  // Crear el contenedor de la recomendación
  const nuevaRecomendacion = document.createElement("div");
  nuevaRecomendacion.classList.add("recomendacion");
  nuevaRecomendacion.innerHTML = `<strong>${nombre ? nombre : "Anónimo"}</strong>: ${mensaje}`;

  // Crear el botón para eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("eliminar");
  btnEliminar.style.marginLeft = "10px"; // Espacio opcional
  btnEliminar.addEventListener("click", function() {
    this.parentElement.remove();
    actualizarLocalStorage();
  });

  // Agregar el botón al contenedor de la recomendación
  nuevaRecomendacion.appendChild(btnEliminar);

  // Agregar la nueva recomendación al DOM
  document.getElementById("lista-recomendaciones").appendChild(nuevaRecomendacion);

  // Actualizar el localStorage con la nueva recomendación
  actualizarLocalStorage();

  // Limpiar los campos de entrada
  document.getElementById("nombre").value = "";
  document.getElementById("mensaje").value = "";

  // Mostrar mensaje de agradecimiento
  mostrarMensajeAgradecimiento();
}

// Función para mostrar el mensaje de agradecimiento
function mostrarMensajeAgradecimiento() {
  const mensajeDiv = document.createElement("div");
  mensajeDiv.textContent = "¡Gracias por tu comentario!";
  mensajeDiv.style.color = "green";
  mensajeDiv.style.fontSize = "16px";
  mensajeDiv.style.marginTop = "10px";
  mensajeDiv.style.fontWeight = "bold";

  // Insertar el mensaje después del formulario
  const formulario = document.getElementById("mensaje").parentElement;
  formulario.appendChild(mensajeDiv);

  // Eliminar el mensaje después de 3 segundos
  setTimeout(() => {
    mensajeDiv.remove();
  }, 3000);
}

// Al cargar la página se ejecuta la función para cargar las recomendaciones guardadas
window.onload = function() {
  cargarRecomendaciones();
};

// Exponer la función para que sea accesible desde el HTML (por ejemplo, en onclick)
window.agregarRecomendacion = agregarRecomendacion;
