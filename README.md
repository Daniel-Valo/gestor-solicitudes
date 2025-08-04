# Gestor de Solicitudes Internas

Aplicación web desarrollada con Angular para gestionar solicitudes internas de manera sencilla y eficiente. Esta SPA permite listar, crear, editar y eliminar solicitudes, simulando persistencia con `localStorage`.

---

## 🚀 Tecnologías Utilizadas

- **Angular**: Framework robusto y escalable para aplicaciones SPA.
- **TypeScript**: Tipado fuerte que mejora la mantenibilidad del código.
- **LocalStorage**: Para simular persistencia sin necesidad de backend.
- **Signals y servicios**: Para manejo eficiente del estado.
- **Tailwind CSS / CSS personalizado**: (si aplica) Para estilos rápidos y adaptables.

---

## 🧠 Justificación de arquitectura y decisiones técnicas

- **Arquitectura modular**: Separación de responsabilidades entre componentes, servicios y almacenamiento.
- **Estado reactivo con Signals**: Facilita la sincronización entre la vista y los datos.
- **`RequestMockService` + `RequestSignalStore`**: Combinación que permite simular un flujo realista de una API, pero manejando el estado local de forma controlada.
- **Clean Code**: Componentes desacoplados, funciones bien nombradas y reutilización del código.
- **Responsividad**: Aunque simple, el diseño permite usarlo cómodamente en pantallas pequeñas.

---

## 💻 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/Daniel-Valo/gestor-solicitudes.git

# Ingresar al proyecto
cd gestor-solicitudes

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
ng serve
```

Luego, abre tu navegador en `http://localhost:4200`.

Credenciales del usuario de prueba:
Usuario: admin
Contraseña: 123456

---

## 🧪 Funcionalidades principales

- 📄 Listado de solicitudes con filtros por estado.
- ➕ Crear nueva solicitud con validaciones de formulario.
- ✏️ Editar solicitud existente.
- 🗑 Eliminar solicitud con confirmación.
- 💾 Persistencia usando `localStorage`.
- ✅ Validaciones visuales y control de errores básicos.

---

## 🎨 Decisiones de diseño / UX

- **Botones visibles y accesibles**: Siempre accesibles en cada elemento de la lista.
- **Título alineado a la izquierda, acciones a la derecha**: Para una navegación clara.
- **Mensajes de validación**: Proveen retroalimentación rápida.
- **Diseño limpio**: Evita distracciones innecesarias y se centra en la funcionalidad.

---

## 📁 Estructura del Proyecto

```bash
src/
├── app/
│   ├── core/
│   │   └── guards/
│   │   │   └── auth.guard                    #Validar si el usuario tiene una sesion activa para entrar a la seccion de solicitudes, de lo contrario lo envia al login.
│   │   └── models/
│   │   │   ├── request-category.enum
│   │   │   ├── request-status.enum
│   │   │   ├── request.model
│   │   │   └── login-request.model           #modelo que se usa para enviar los datos (nombre de usuario y contraseña) al metodo del servicio para iniciar sesión.
│   │   └── services/
│   │   │   └── auth/
│   │   │   │     ├── auth-service.interface  #Definicion de la interface para el servicio
│   │   │   │     ├── auth-mock.service       #Implementacion de la interface AuthServiceInterface (auth-service.interface)
│   │   │   │     └── auth.token              #Se usa para DI de la interface AuthServiceInterface (auth-service.interface)
│   │   │   └── request/
│   │   │         ├── request-service.interface #Definicion de la interface para el servicio
│   │   │         ├── request-mock.service      #Implementacion de la interface RequestServiceInterface (request-service.interface)
│   │   │         └── request.token             #Se usa para DI de la interface RequestServiceInterface (request-service.interface)
│   │   └── stores/
│   │   │   └── request-signal.store           #manejo de estado global con store usando signals.
│   ├── features/
│   │   └── auth/                              #Modulo general para la autenticacion, se puede agregar el registro, recuperacion de contraseña, etc...
│   │   │   └── login/
│   │   │         ├── login.component.html
│   │   │         └── login.component.ts
│   │   └── requests/
│   │   │    ├── pages/
│   │   │    │    ├── request-list/            #Vista principal para listar, agregar, editar o eliminar solicitudes.
│   │   │    │        ├── request-list.html
│   │   │    │        └── request-list.ts
│   │   │    │    └── request-form/            #Formulario para la agregar/edicion una solicitud
│   │   │    │        ├── request-form.html
│   │   │    │        └── request-form.ts
│   │   │    ├── requests-routing.module.ts
│   │   │    ├── requests.module.ts
│   │   │
│   ├── shared/
│   │   │   └── confirm-dialog/                #Dialogo modal para solicitar un confirmacion sobre alguna acción
│   │   │         ├── confirm-dialog.html
│   │   │         └── confirm-dialog.ts
```

---

## 🔐 Consideraciones

- El repositorio es **público** para su evaluación.
- No se usa backend real, pero se puede integrar fácilmente en el futuro.

---

## ✨ Autor

**Daniel Valdivia Loza**  
[GitHub - Daniel-Valo](https://github.com/Daniel-Valo)

---

## 📄 Licencia

Este proyecto es parte de una prueba técnica. Puede adaptarse libremente con fines personales o educativos.

---
