document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    fetch("credenciales.json")
        .then(response => response.json())
        .then(data => {
            let rol = null;
            let userData = null;

            for (const [role, users] of Object.entries(data.credenciales)) {
                const foundUser = users.find(u => u.usuario === usuario && u.clave === clave);
                if (foundUser) {
                    rol = role;
                    userData = foundUser;
                    break;
                }
            }

            if (rol) {
                localStorage.setItem("userData", JSON.stringify(userData));
                switch (rol) {
                    case "admin":
                        window.location.href = "admin.html";
                        break;
                    case "cliente":
                        window.location.href = "cliente.html";
                        break;
                    case "invitado":
                        window.location.href = "invitado.html";
                        break;
                }
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        })
        .catch(error => console.error("Error al cargar credenciales:", error));
});