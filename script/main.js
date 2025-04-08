// File: script/main.js
const UserName = document.getElementById('username')
const UserEmail = document.getElementById('useremail')
const UserPassword = document.getElementById('userpassword')
const ConfirmPassword = document.getElementById('confirmpassword')
const UserForm = document.getElementById('userform')
const ClearButton = document.getElementById('clearbutton')

function onSubmit(event) {
  event.preventDefault()

    if (UserName.value === '' || UserEmail.value === '' || UserPassword.value === '' || ConfirmPassword.value === "") {
      ShowMessage('Completa todos los campos', 'warning')
    }

    else if (/(\w+?@\w+?\x2E.+)/.test(UserEmail.value) !== true) {
      ShowMessage('Email no valido','warning')
    }

    else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(UserPassword.value)) {
      ShowMessage('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.', 'warning');
    }

    else if (UserPassword.value !== ConfirmPassword.value) {
     ShowMessage('Las contraseñas no coinciden','warning')
    }

    else {
     let user ={
      name: UserName.value,
      email: UserEmail.value,
      password: UserPassword.value
    };
//Primero hacer get para coger los datos ya existentes del localstorage, si no hay guardara un array vacio
    let users = JSON.parse(localStorage.getItem('users')) || [];
//Despues pusheamos el nuevo y se guarda en el ultimo puesto del array
    users.push(user);
///Finalmente haces set para guardar el array en el localstorage
    localStorage.setItem('users', JSON.stringify(users));

   ShowMessage('Usuario creado correctamente','success', 'template/user.html')

    UserForm.reset();
   }
   
};


function ShowMessage(mensaje, tipo = 'primary', redirectUrl) {

  const iconos = {
    success: `
      <svg xmlns="http://www.w3.org/2000/svg" class="bi flex-shrink-0 me-2" fill="currentColor" viewBox="0 0 16 16" role="img" aria-label="Success:"  width="16" height="16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.44 5.53 7.47a.75.75 0 0 0-1.06 1.06l2.5 2.5z"/>
      </svg>
    `,
    warning: `
      <svg xmlns="http://www.w3.org/2000/svg" class="bi flex-shrink-0 me-2" viewBox="0 0 16 16" fill="currentColor" role="img" aria-label="Warning:"  width="16" height="16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    `,
  };

  const icono = iconos[tipo] || '';

  const alertHtml = `
    <div class="alert alert-${tipo} alert-mini d-flex align-items-center" role="alert">
      ${icono}
      <div>${mensaje}</div>
    </div>
  `;

  document.getElementById('message').innerHTML = alertHtml;

  setTimeout(() => {
    document.getElementById('message').innerHTML = '';
  }, 3000);

  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
}


if (UserForm && window.location.pathname.includes('index.html')) {
  UserForm.addEventListener('submit', onSubmit);
}


if (ClearButton && window.location.pathname.includes('index.html')) 
  ClearButton.addEventListener("click", function() {
    localStorage.clear();
    if (UserForm) UserForm.reset();
  });



  if (window.location.pathname.includes('template/user.html')) {
    //Obtienes los users del localstorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const CardsContainer = document.getElementById('cardscontainer');

    //Si hay container.....
    if (CardsContainer) {
      // Limpiar el contenedor 
      CardsContainer.innerHTML = '';
      // Iterar sobre todos los usuarios y crear tarjetas para cada uno
      users.forEach(user => {
        // Crear el HTML de la tarjeta para los users
        const cardHtml = `
          <div class="card mb-3" style="max-width: 18rem;">
            <div class="card-header">User Card</div>
            <div class="card-body">
              <p class="card-title">Name: ${user.name}</p>
              <p class="card-text">Email: ${user.email}</p>
            </div>
          </div>
        `;
        // Insertar las tarjetas en el contenedor
        CardsContainer.innerHTML += cardHtml;
      });
    }
  }