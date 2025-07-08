class ContactManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.setupListeners();
    }

    setupListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    async handleSubmit() {
        const data = {
            nombre: this.form.nombre.value.trim(),
            email: this.form.email.value.trim(),
            mensaje: this.form.mensaje.value.trim(),
            fecha: new Date().toISOString(),
        };

        if (!this.validate(data)) return;

        

        try {
            const response = await fetch('http://localhost:3000/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                this.form.reset(); // Solo reseteamos el formulario
                this.showSuccess('¡Mensaje enviado correctamente!');
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (err) {
            console.error('Error:', err);
            this.showError('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
        } finally {
            this.toggleLoading(false);
        }
    }

    validate({ nombre, email, mensaje }) {
        const errores = [];

        if (nombre.length < 2) errores.push('El nombre debe tener al menos 2 caracteres.');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) errores.push('El correo electrónico no es válido.');

        if (mensaje.length < 10) errores.push('El mensaje debe tener al menos 10 caracteres.');

        if (errores.length) {
            this.showError(errores.join('\n'));
            return false;
        }
        return true;
    }


    showError(mensaje) {
        const alerta = document.createElement('div');
        alerta.className = 'notification is-danger';
        alerta.style.marginBottom = '1rem';
        alerta.innerHTML = `
            <button class="delete" aria-label="cerrar"></button>
            <strong>${mensaje}</strong>
        `;
        
        this.form.parentElement.insertBefore(alerta, this.form);
        
        const deleteBtn = alerta.querySelector('.delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => alerta.remove());
        }
        
        setTimeout(() => {
            if (alerta.parentElement) {
                alerta.remove();
            }
        }, 5000);
    }

    showSuccess(mensaje) {
        const alerta = document.createElement('div');
        alerta.className = 'notification is-success';
        alerta.style.marginBottom = '1rem';
        alerta.style.position = 'fixed';
        alerta.style.top = '20px';
        alerta.style.right = '20px';
        alerta.style.zIndex = '9999';
        alerta.style.minWidth = '200px';
        alerta.innerHTML = `
            <button class="delete" aria-label="cerrar"></button>
            <strong>${mensaje}</strong>
        `;
        document.body.appendChild(alerta);

        const deleteBtn = alerta.querySelector('.delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => alerta.remove());
        }

        setTimeout(() => {
            if (alerta.parentElement) {
                alerta.remove();
            }
        }, 10000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.contactManager = new ContactManager();
});
