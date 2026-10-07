async function loadSession() {
  const response = await fetch('/api/auth/sesion', {
    credentials: 'same-origin'
  });

  if (!response.ok) {
    window.location.replace('/acceso.html');
    return;
  }

  const { usuario } = await response.json();
  const profile = document.querySelector('.sidebar-profile');
  const nameElement = profile?.querySelector(':scope > strong');

  if (nameElement) nameElement.textContent = `¡Hola, ${usuario.nombre}!`;
  if (!profile || profile.querySelector('.logout-button')) return;

  const logoutButton = document.createElement('button');
  logoutButton.className = 'logout-button';
  logoutButton.type = 'button';
  logoutButton.textContent = 'Cerrar sesión';
  logoutButton.addEventListener('click', async () => {
    logoutButton.disabled = true;
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin'
      });
    } finally {
      window.location.replace('/acceso.html');
    }
  });

  profile.append(logoutButton);
}

loadSession();
