class AdminMessageManager {
    constructor() {
        this.messages = [];
        this.emailFilter = '';
        this.nameFilter = '';

        this.selectedMessageId = null;
        this.isDeleteModalOpen = false;
        this.init();
    }

    init() {
        this.cacheElements();
        this.addListeners();
        this.loadMessages();
    }

    cacheElements() {
        this.messagesContainer = document.getElementById('messagesContainer');
        this.emailFilterInput = document.getElementById('emailFilter');
        this.deleteModal = document.getElementById('deleteModal');
        this.confirmDeleteButton = document.getElementById('confirmDeleteButton');
        this.nameFilterInput = document.getElementById('nameFilter');

    }

    addListeners() {
        // Filtro por email
        if (this.emailFilterInput) {
            this.emailFilterInput.addEventListener('input', () => {
                this.emailFilter = this.emailFilterInput.value.toLowerCase();
                this.showMess();
            });
        }

        // Filtro por nombre
        if (this.nameFilterInput) {
            this.nameFilterInput.addEventListener('input', () => {
                this.nameFilter = this.nameFilterInput.value.toLowerCase();
                this.showMess();
            });
        }


        // Listeners para el modal de eliminación
        this.setupDeleteModalListeners();

        // Listener global para tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isDeleteModalOpen) {
                this.closeDeleteModal();
            }
        });

        // Event delegation para botones de eliminar
        document.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.button.is-danger[data-id]');
            if (deleteBtn) {
                this.confirmDelete(deleteBtn.dataset.id);
            }
        });
    }

    setupDeleteModalListeners() {
        if (!this.deleteModal) return;

        // Fondo del modal de eliminación
        const deleteModalBackground = this.deleteModal.querySelector('.modal-background');
        if (deleteModalBackground) {
            deleteModalBackground.addEventListener('click', () => {
                this.closeDeleteModal();
            });
        }

        // Botón X de cerrar del modal de eliminación
        const deleteCloseButton = this.deleteModal.querySelector('.delete');
        if (deleteCloseButton) {
            deleteCloseButton.addEventListener('click', () => {
                this.closeDeleteModal();
            });
        }

        // Botón "Cancelar"
        const cancelButton = this.deleteModal.querySelector('.modal-card-foot .button:not(.is-danger)');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                this.closeDeleteModal();
            });
        }

        // Botón "Eliminar"
        if (this.confirmDeleteButton) {
            this.confirmDeleteButton.addEventListener('click', () => {
                this.deleteMessage();
            });
        }
    }

    async loadMessages() {
        try {
            const response = await fetch('http://localhost:3000/messages');
            if (response.ok) {
                this.messages = await response.json();
                this.showMess();
            } else {
                throw new Error('Error al cargar mensajes');
            }
        } catch (err) {
            console.error('Error cargando mensajes:', err);
            this.messages = [];
            this.showError('Error al cargar los mensajes');
        }
    }

    getFiltered() {
        return this.messages.filter(m => {
            const byEmail = !this.emailFilter || m.email.toLowerCase().includes(this.emailFilter);
            const byName = !this.nameFilter || m.nombre.toLowerCase().includes(this.nameFilter);
            return byEmail && byName;
        });
    }

    showMess() {
        const messages = this.getFiltered();
        if (!messages.length) {
            this.messagesContainer.innerHTML = `
                <div class="has-text-centered admin-no-messages">
                    <div class="admin-empty-state">
                        <span class="icon is-large">📭</span>
                        <p class="title is-4">No hay mensajes</p>
                        <p class="subtitle">Los mensajes aparecerán aquí cuando los usuarios envíen consultas</p>
                    </div>
                </div>
            `;
            return;
        }
        this.messagesContainer.innerHTML = messages.map(m => this.showMessCard(m)).join('');
    }

    showMessCard(m) {
        return `
            <div class="admin-message-card ${m.leido ? 'read' : 'unread'}" data-message-id="${m.id}">
                <div class="admin-message-header">
                    <div>
                        <h4>${this.escape(m.nombre)}</h4>
                        <p><strong>${this.escape(m.email)}</strong></p>
                        <small>${this.format(m.fecha)}</small>
                    </div>
                    
                </div>
                <div class="admin-message-body">
                    <p>${this.escape(m.mensaje)}</p>
                </div>
                <div class="admin-message-actions">
                        <button class="button is-danger is-small" data-id="${m.id}">
                            🗑 Delete
                        </button>
                    </div>
            </div>
        `;
    }

    openDeleteModal() {
        if (this.deleteModal) {
            this.isDeleteModalOpen = true;
            this.deleteModal.classList.add('is-active');
        }
    }

    closeDeleteModal() {
        if (this.deleteModal && this.isDeleteModalOpen) {
            this.isDeleteModalOpen = false;
            this.deleteModal.classList.remove('is-active');
        }
    }


    confirmDelete(messageId) {
        if (!messageId) return;
        this.selectedMessageId = messageId;
        this.openDeleteModal();
    }

    async deleteMessage() {
        if (!this.selectedMessageId) return;

        try {
            const response = await fetch(`http://localhost:3000/messages/${this.selectedMessageId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.closeDeleteModal();
                await this.loadMessages();
                this.showSuccess('Mensaje eliminado correctamente');
            } else {
                throw new Error('Error al eliminar el mensaje');
            }
        } catch (err) {
            console.error('Error eliminando mensaje:', err);
            this.showError('Error al eliminar el mensaje');
        }
    }

    showError(mensaje) {
        this.showNotification(mensaje, 'is-danger');
    }

    escape(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    format(fecha) {
        return new Date(fecha).toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Funciones globales necesarias
function filterMessages(type) {
    if (adminP) {
        adminP.filterMessages(type);
    }
}

function refreshMessages() {
    if (adminP) {
        adminP.loadMessages();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    adminP = new AdminMessageManager();
});

let user = JSON.parse(localStorage.getItem("user"));
let logOut = document.getElementById("logOut");


logOut.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../../../index.html";
  });

if (!user) {
    window.location.href = "../login.html";
} else {
    welcome.innerHTML = `<p>Welcome back, ${user.name}!</p>`;
}

