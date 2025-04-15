export function renderPerfilError(msg) {
    const container = document.getElementById("profile-container");
    if (!container) return;
    container.innerHTML = `
        <div class="error-message">
            <p>Ocurrió un error al cargar el perfil: ${msg}</p>
            <a href="/login" class="btn btn-danger">Volver a iniciar sesión</a>
        </div>
    `;
}

export function renderPerfil(userData) {
    const container = document.getElementById("profile-container");
    if (!container) return;

    const fechaCreacion = userData.fechaRegistro
        ? new Date(userData.fechaRegistro).toLocaleDateString()
        : "No disponible";

    container.innerHTML = `
        <div class="profile-card">
            <div class="profile-header">
                <h2>${userData.nombre || "Usuario"}</h2>
                ${userData.admin ? '<span class="admin-badge">Administrador</span>' : ""}
            </div>
            <div class="profile-details">
                <p><strong>Email:</strong> ${userData.email}</p>
                ${userData.telefono ? `<p><strong>Teléfono:</strong> ${userData.telefono}</p>` : ""}
                ${userData.direccion ? `<p><strong>Dirección:</strong> ${userData.direccion}</p>` : ""}
                <p><strong>Miembro desde:</strong> ${fechaCreacion}</p>
                <p><strong>Estado:</strong> <span class="status active">Activo</span></p>
            </div>
            <div class="profile-actions">
                <button id="logout-btn" class="btn btn-danger">Cerrar sesión</button>
                <button id="inicio" class="btn btn-secondary">Volver al inicio</button>
                ${userData.admin ? '<button id="admin" class="btn btn-secondary">Panel de Admin</button>' : ""}
            </div>
        </div>
    `;

    document.getElementById("logout-btn")?.addEventListener("click", () => {
        // limpia tokens y redirige
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    });
    document.getElementById("inicio")?.addEventListener("click", () => window.location.href = "/");
    document.getElementById("admin")?.addEventListener("click", () => window.location.href = "/admin");

    // animación
    setTimeout(() => {
        container.querySelector(".profile-card")?.classList.add("fade-in");
    }, 100);
}

export function renderProductos(productos) {
    const contenedor = document.getElementById("productos-container");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos disponibles</p>";
        return;
    }

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("brand-item");
        div.innerHTML = `
            <div class="brand">
                <a href="/comprar">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </a>
            </div>
            <h2>${producto.nombre}</h2>
            <h5>${producto.precio}$</h5>
        `;
        contenedor.appendChild(div);
    });
}

export function renderMarcas(marcas) {
    const contenedor = document.getElementById("marcas-container");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (marcas.length === 0) {
        contenedor.innerHTML = "<p>No hay marcas disponibles</p>";
        return;
    }

    marcas.forEach(marca => {
        const div = document.createElement("div");
        div.classList.add("brand-item");
        div.innerHTML = `
            <div class="brand">
                <img src="${marca.imagen}" alt="${marca.nombre}">
            </div>
            <h2>${marca.nombre}</h2>
        `;
        contenedor.appendChild(div);
    });
}