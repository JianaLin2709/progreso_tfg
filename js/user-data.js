let cachedData = null;

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: options.body
      ? { 'Content-Type': 'application/json', ...options.headers }
      : options.headers
  });

  if (response.status === 401) {
    window.location.replace('/acceso.html');
    throw new Error('La sesión ha caducado');
  }

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || 'No se pudo completar la operación');
  }

  return response.status === 204 ? null : response.json();
}

export async function obtenerDatosUsuario(force = false) {
  if (!cachedData || force) cachedData = await request('/api/datos');
  return cachedData;
}

export async function guardarPreferencias(changes) {
  const data = await obtenerDatosUsuario();
  const preferencias = { ...data.preferencias, ...changes };
  const result = await request('/api/datos/preferencias', {
    method: 'PUT',
    body: JSON.stringify(preferencias)
  });
  data.preferencias = result.preferencias;
  return result.preferencias;
}

export async function guardarProgreso(hsk, unidad, progress) {
  const result = await request(`/api/datos/progreso/${hsk}/${unidad}`, {
    method: 'PUT',
    body: JSON.stringify(progress)
  });
  const data = await obtenerDatosUsuario();
  const index = data.progreso.findIndex((item) => item.hsk === hsk && item.unidad === unidad);
  if (index === -1) data.progreso.push(result.progreso);
  else data.progreso[index] = result.progreso;
  return result.progreso;
}

export async function añadirFavorito(hsk, unidad, palabra) {
  const result = await request('/api/datos/favoritos', {
    method: 'POST',
    body: JSON.stringify({ hsk, unidad, palabra })
  });
  const data = await obtenerDatosUsuario();
  if (!data.favoritos.some((item) => item.hsk === hsk && item.unidad === unidad && item.palabra === palabra)) {
    data.favoritos.push(result.favorito);
  }
  return result.favorito;
}

export async function eliminarFavorito(hsk, unidad, palabra) {
  const result = await request(
    `/api/datos/favoritos/${hsk}/${unidad}/${encodeURIComponent(palabra)}`,
    { method: 'DELETE' }
  );
  const data = await obtenerDatosUsuario();
  data.favoritos = data.favoritos.filter(
    (item) => !(item.hsk === hsk && item.unidad === unidad && item.palabra === palabra)
  );
  return result.eliminado;
}
