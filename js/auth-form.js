const form = document.querySelector('#auth-form');
const errorElement = document.querySelector('#auth-error');
const submitButton = form.querySelector('button[type="submit"]');
const mode = document.body.dataset.authMode;

function showError(message) {
  errorElement.textContent = message;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  showError('');

  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const password = String(formData.get('password'));

  if (mode === 'registro' && password !== formData.get('passwordConfirmation')) {
    showError('Las contraseñas no coinciden');
    return;
  }

  const body = {
    email: String(formData.get('email')).trim().toLowerCase(),
    password
  };

  if (mode === 'registro') body.nombre = String(formData.get('nombre'));

  submitButton.disabled = true;
  submitButton.textContent = mode === 'registro' ? 'Creando cuenta…' : 'Entrando…';

  try {
    const response = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    });

    const result = await response.json();
    if (!response.ok) {
      showError(result.error || 'No se ha podido completar la operación');
      return;
    }

    window.location.replace('/');
  } catch {
    showError('No se ha podido conectar con el servidor');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = `${mode === 'registro' ? 'Crear cuenta' : 'Entrar'} <span aria-hidden="true">→</span>`;
  }
});
