# Gestor de Solicitudes Internas

Aplicación web tipo SPA desarrollada con Angular para gestionar solicitudes internas de un departamento. Permite crear, editar, eliminar y filtrar solicitudes de manera sencilla y responsiva, ademas incluye un login simulado

---

## 🚀 Tecnologías Utilizadas

- **Angular 17+**
- **TypeScript**
- **SCSS**
- **Reactive Forms**
- **Angular Router**
- **localStorage** (persistencia simulada)
- **Tailwind** para UI responsiva.

---

## 📌 Funcionalidades Principales

- 📋 Listado de solicitudes
- ➕ Creación de nuevas solicitudes
- ✏️ Edición de solicitudes existentes
- ❌ Eliminación de solicitudes
- 🔍 Filtros por categoría y estatus
- 🧠 Estado global vía servicios (o NgRx opcional)
- ✅ Validaciones de campos y feedback visual

---

## 🧠 Justificación Técnica

- **Angular** proporciona una arquitectura sólida y escalable, ideal para aplicaciones con múltiples componentes reutilizables, formularios avanzados y navegación estructurada.
- **localStorage** se utiliza para simular persistencia de datos sin necesidad de backend, cumpliendo los requisitos de la prueba técnica y permitiendo una experiencia funcional.
- **Modularización** clara mediante lazy loading, lo que mejora el rendimiento inicial al cargar solo los módulos necesarios bajo demanda.
- **Forms reactivos** implementados por su alto control sobre validaciones, estado del formulario y lógica asociada.
- **Tailwind CSS** se eligió por su facilidad de uso e integración con Angular. Permite desarrollar interfaces modernas, responsivas y limpias con mínima sobrecarga en CSS.
- **heroicons** se utilizaron algunos iconos que fueron obtenidos en formato SVG del sitio web de https://heroicons.com/.

---

## 📁 Estructura del Proyecto

```bash
src/
├── app/
│   ├── core/
│   │   └── guards/
│   │   │   └── auth.guard                  #Validar si el usuario tiene una sesion activa para entrar a la seccion de solicitudes, de lo contrario lo envia al login.
│   │   └── models/
│   │   │   ├── request-category.enum
│   │   │   ├── request-status.enum
│   │   │   ├── request.model
│   │   │   └── login-request.model         #modelo que se usa para enviar los datos (nombre de usuario y contraseña) al metodo del servicio para iniciar sesión.
│   │   └── services/
│   │   │   └── auth/
│   │   │   │     ├── auth-service.interface  #Definicion de la interface para el servicio
│   │   │   │     ├── auth-mock.service       #Implementacion de la interface AuthServiceInterface (auth-service.interface)
│   │   │   │     └── auth.token              #Se usa para DI de la interface AuthServiceInterface (auth-service.interface)
│   │   │   └── request/
│   │   │         ├── request-service.interface #Definicion de la interface para el servicio
│   │   │         ├── request-mock.service      #Implementacion de la interface RequestServiceInterface (request-service.interface)
│   │   │         └── request.token             #Se usa para DI de la interface RequestServiceInterface (request-service.interface)
│   ├── features/
│   │   └── auth/                           # Modulo general para la autenticacion, se puede agregar el registro, recuperacion de contraseña, etc...
│   │   │   └── login/
│   │   │         ├── login.component.html
│   │   │         └── login.component.ts
│   │   └── requests/
│   │   │    ├── pages/
│   │   │    │    ├── request-list/
│   │   │    │        ├── request-list.html
│   │   │    │        └── request-list.ts
│   │   │    │    └── request-form/          #Formulario para la agregar/edicion una solicitud por le momento vacios
│   │   │    │        ├── request-form.html
│   │   │    │        └── request-form.ts
│   │   │    ├── requests-routing.module.ts
│   │   │    ├── requests.module.ts
│   │
│   ├── shared/
│   │   │   └── confirm-dialog/              # Dialogo modal para solicitar un confirmacion sobre alguna acción
│   │   │         ├── confirm-dialog.html
│   │   │         └── confirm-dialog.ts
```

---

## ⚙️ Instalación y Ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/Daniel-Valo/gestor-solicitudes.git
cd gestor-solicitudes
```

2. Instalar dependencias:

```bash
npm install
```

3. Levantar servidor local:

```bash
ng serve
```

4. Accede desde tu navegador:

```
http://localhost:4200
```

5. Credenciales de usuario de prueba:

```
Usuario: admin
Contraseña: 123456
```

## 🧪 Validaciones y Seguridad

- Validación de campos requeridos (título, descripción, categoría, estatus)
- Validacion de campos requeridos en el login (nombre de usuario y la contraseña)
- Control de formatos y errores
- Prevención de operaciones sin confirmar
- Indicador de progreso

---

## 🧠 Decisiones de Diseño UX

- Se eligió una interfaz clara y accesible, del tipo minimalista por cuestiones de tiempo, orientada a usuarios con nivel educativo medio.
- Botones con etiquetas claras, formularios compactos y mensajes visuales para acciones exitosas o con error, segun sea el caso.
- Indicadores de progreso, cuando se realiza alguna acción en la que puede tardar algunos segundos en obtener informacion o guardarla.
- Vistas responsive, compatible con móviles y pantallas de escritorio.

---

## ✅ Estado del proyecto

- [x] Estructura base con Angular CLI
- [x] Lazy loading para módulo de solicitudes
- [ ] Formulario Agregar/Editar reactivo
- [x] Filtros por categoría y estatus
- [x] Persistencia con localStorage (para guardar el "token" y "usuario")
- [x] Simulación de autenticación (opcional)

---

## 📄 Licencia

Este proyecto es parte de una prueba técnica. Puede adaptarse libremente con fines personales o educativos.

---
