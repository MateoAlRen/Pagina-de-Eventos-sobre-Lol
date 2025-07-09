# Pagina-de-Eventos-sobre-Lol
Trabajo hecho por la célula alpha.

# Eventos de LoL & Warcraft

Este proyecto es una simulación de una plataforma de eventos para juegos como League of Legends y Warcraft. Los usuarios pueden enviar mensajes de contacto que son visualizados por un administrador desde un panel interno.

## ✨ Funcionalidades

- Formulario de contacto para visitantes.
- Visualización de mensajes en tiempo real en el panel de administrador.
- Filtrado de mensajes por correo electrónico.
- Confirmación y eliminación de mensajes.
- Estilos responsivos utilizando Bulma y CSS personalizado.


# 🎮 Legends Arena - Eventos de LoL & Warcraft

Este proyecto simula una plataforma web donde los usuarios pueden enviar mensajes relacionados con eventos de videojuegos como **League of Legends** y **Warcraft**. Un panel de administrador permite visualizar y gestionar esos mensajes, todo conectado mediante una API falsa con **JSON Server**.

---

## ✨ Funcionalidades principales

### Para usuarios 
- 📝 Formulario de contacto con validaciones.
- 📤 Envío de mensajes al administrador (nombre, correo, mensaje).
- ✅ Confirmación visual al enviar.

### Para administrador (página `admin.html`)
- 👁 Ver todos los mensajes recibidos.
- 📧 Filtro por correo electrónico o nombre.
- 🗑 Eliminar mensajes individualmente con confirmación.
- 📱 Diseño responsivo sin uso de modales.

---

## 📬 ¿Cómo enviar un mensaje?

2. Llena el formulario con:
   - Tu **nombre**
   - Tu **correo electrónico**
   - Tu **mensaje**
3. Haz clic en el botón `Enviar`.

---

## 🛠 ¿Cómo se ve en el panel de administrador?

2. Verás una lista con todos los mensajes enviados por los usuarios, con:
   - 🧍 Nombre
   - 📧 Correo
   - 💬 Mensaje completo
   - 🗑 Botón para eliminar cada mensaje

También puedes usar el campo de búsqueda para **filtrar por correo electrónico** o **filtrar por correo nombre** en tiempo real.


# Página Administrativa de Suscripciones

Esta página forma parte del proyecto **Sistema Web de Gestión y Difusión de Eventos**, con temática de League of Legends (LoL).

## 🎯 Objetivo

Permitir que el administrador visualice todos los correos electrónicos registrados por los visitantes del sitio, y pueda eliminarlos si lo desea.

---

## 📌 ¿Qué hace esta página?

- Muestra en una tabla todas las suscripciones almacenadas.
- Cada fila contiene:
  - `ID` del registro
  - `Correo electrónico`
  - Botón para eliminar la suscripción
- La tabla se actualiza automáticamente después de eliminar un correo.

---

## 🛠️ Tecnologías usadas

- **HTML5** semántico
- **CSS3** con estilo suave (blancos y pasteles)
- **JavaScript** con `fetch` para consumir el API
- **JSON Server** para almacenar los datos localmente

---

## 📂 Archivos importantes

| Archivo             | Descripción                                      |
|---------------------|--------------------------------------------------|
| `suscripciones.html` | Interfaz principal con la tabla de suscripciones |
| `suscripciones.css`  | Estilos claros y responsivos para la página      |
| `suscripciones.js`   | Lógica para leer y eliminar suscripciones        |
