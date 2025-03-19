function seleccionarNivel(boton) {
    // Deseleccionar todos los botones del mismo grupo
    const grupo = boton.parentElement;
    grupo.querySelectorAll('.nivel-boton').forEach(b => b.classList.remove('seleccionado'));
    // Seleccionar el botón clickeado
    boton.classList.add('seleccionado');
    // Calcular la calificación automáticamente
    calcularCalificaciones();
}

function calcularCalificaciones() {
    const filas = document.querySelectorAll('#evaluacionForm tbody tr');
    let sumaTotal = 0;
    let contadorProyectos = 0;

    filas.forEach(fila => {
        // Excluir la fila del promedio de la materia
        if (!fila.classList.contains('promedio-materia')) {
            const switchTerminado = fila.querySelector('.switch input');
            const botones = fila.querySelectorAll('.nivel-boton.seleccionado');
            const calificacionSpan = fila.querySelector('.calificacion');

            if (!switchTerminado.checked) {
                // Si el proyecto no se terminó, la calificación es 5
                calificacionSpan.textContent = "5";
                calificacionSpan.classList.remove('regular', 'bueno', 'excelente');
                calificacionSpan.classList.add('regular');
                sumaTotal += 5; // Sumar 5 al total
            } else {
                // Si el proyecto se terminó, calcular la calificación normal
                let suma = 0;
                botones.forEach(boton => {
                    suma += parseInt(boton.getAttribute('data-value')) || 0;
                });
                const promedio = suma / botones.length; // Calcular promedio
                const calificacionFinal = Math.round(promedio); // Redondear al entero más cercano
                calificacionSpan.textContent = calificacionFinal;

                // Asignar clase de color según la calificación final
                calificacionSpan.classList.remove('regular', 'bueno', 'excelente');
                if (calificacionFinal === 6) {
                    calificacionSpan.classList.add('regular');
                } else if (calificacionFinal === 8) {
                    calificacionSpan.classList.add('bueno');
                } else if (calificacionFinal === 10) {
                    calificacionSpan.classList.add('excelente');
                }

                // Sumar para el promedio de la materia
                sumaTotal += calificacionFinal;
            }
            contadorProyectos++;
        }
    });

    // Calcular el promedio de la materia
    const promedioMateria = Math.round(sumaTotal / contadorProyectos);
    const promedioSpan = document.getElementById('promedio-espanol');
    if (promedioSpan) {
        promedioSpan.textContent = promedioMateria;

        // Asignar clase de color según el promedio de la materia
        promedioSpan.classList.remove('regular', 'bueno', 'excelente');
        if (promedioMateria === 6) {
            promedioSpan.classList.add('regular');
        } else if (promedioMateria === 8) {
            promedioSpan.classList.add('bueno');
        } else if (promedioMateria === 10) {
            promedioSpan.classList.add('excelente');
        }
    }
}

// Calcular calificaciones al cargar la página
document.addEventListener('DOMContentLoaded', calcularCalificaciones);