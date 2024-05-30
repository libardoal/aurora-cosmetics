document.addEventListener("DOMContentLoaded", function() {
    const addForm = document.getElementById('add-form');
  
    addForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const email = document.getElementById('email').value;
      const edad = document.getElementById('edad').value;
  
      fetch('http://localhost:3000/CRUDRepo/AgregarPersona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, email, edad })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo agregar la persona');
        }
        return response.json();
      })
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Persona Agregada',
          text: data.message
        });
        addForm.reset();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
    });
  });
  