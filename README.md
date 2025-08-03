# Gestor de Solicitudes Internas

Aplicación web tipo SPA desarrollada con Angular para gestionar solicitudes internas de un departamento. Permite crear, editar, eliminar y filtrar solicitudes de manera sencilla y responsiva, ademas incluye un login simulado.

---

## Arquitectura del Proyecto

El proyecto está construido con una arquitectura modular y escalable basada en Angular, que incluye:

- **Modularización:** Organización en módulos funcionales independientes, facilitando el mantenimiento y la carga diferida (lazy loading) para mejorar el rendimiento.
- **Separación de responsabilidades:** Servicios para lógica y acceso a datos, componentes para UI, y formularios reactivos para manejo y validación de datos.
- **Inyección de dependencias:** Uso extensivo para desacoplar componentes y servicios, facilitando la reutilización y pruebas.
- **Gestión de estado reactiva con Signals:** Implementación de un store global (`RequestSignalStore`) para manejar solicitudes, filtros y búsquedas, permitiendo sincronización automática entre estado y UI.

---

## 🚀 Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías y herramientas para ofrecer una aplicación eficiente, moderna y mantenible:

- **Angular:** Framework principal para el desarrollo de la aplicación SPA.
- **TypeScript:** Lenguaje tipado que mejora la mantenibilidad y robustez del código.
- **RxJS:** Librería para programación reactiva, usada para manejar streams y estado reactivo.
- **Angular Signals:** Para manejo moderno y reactivo del estado global con señales reactivas.
- **Tailwind CSS:** Framework CSS basado en utilidades para diseño responsivo y limpio.
- **Heroicons (SVG):** Iconografía moderna para la interfaz de usuario.
- **Reactive Forms:** Para validación y control avanzado de formularios.
- **localStorage:** Simulación de persistencia de datos sin necesidad de backend.
- **Toast Notifications:** Feedback visual para acciones del usuario (guardar, eliminar, etc.).
- **Lazy Loading (Angular):** Carga bajo demanda de módulos para optimizar rendimiento.

---

## 📌 Funcionalidades Principales

- 📋 Listado de solicitudes
- ➕ Creación de nuevas solicitudes
- ✏️ Edición de solicitudes existentes
- ❌ Eliminación de solicitudes
- 🔍 Filtros por categoría y estatus
- 🧠 Estado global vía servicios usando signals
- ✅ Validaciones de campos y feedback visual

---

## 🧠 Justificación Técnica

- **Heroicons:** Se utilizaron algunos iconos obtenidos en formato SVG desde el sitio web oficial [heroicons.com](https://heroicons.com/) para representar acciones clave como editar o eliminar, brindando una experiencia visual clara y coherente.

- **Angular:** Se eligió como framework principal por su arquitectura robusta, modular y escalable. Su sistema de inyección de dependencias, rutas y componentes favorece la separación de responsabilidades y el mantenimiento del código.

- **localStorage:** Se utilizó para simular la persistencia de datos sin necesidad de backend. Se implementó a través de un servicio (`RequestMockService`) que sincroniza automáticamente los cambios realizados (crear, editar, eliminar) con el almacenamiento local, cumpliendo los requisitos funcionales de la prueba técnica.

- **State Management con Signals:** Se integró un `RequestSignalStore` como mecanismo de estado global reactivo para manejar solicitudes. Esto permite aplicar búsquedas y filtros en tiempo real de manera eficiente, manteniendo el estado sincronizado con la UI sin necesidad de múltiples suscripciones.

- **Modularización:** Se organizó la aplicación en módulos dedicados, soportando lazy loading, lo que mejora el rendimiento al cargar sólo lo necesario, manteniendo una estructura clara y escalable.

- **Forms Reactivos:** Implementados para gestionar la creación y edición de solicitudes, aprovechando su capacidad de validación dinámica y control estricto sobre el estado del formulario. Se añadieron validaciones personalizadas como longitud máxima, campos requeridos y fecha mínima.

- **Feedback con Toasts:** Se incorporaron notificaciones visuales tipo toast para informar al usuario sobre operaciones exitosas o errores (crear, editar, eliminar), mejorando así la experiencia e interacción general con la aplicación.

- **Tailwind CSS:** Elegido para el diseño visual por su productividad, bajo peso y buena integración con Angular. Permite construir una interfaz limpia, moderna y altamente responsiva sin depender de hojas de estilo externas.

- **UX Optimizada:** Se diseñaron modales (crear/editar solicitudes, confirmación de eliminación) con adaptabilidad para dispositivos móviles y escritorio, usando propiedades como `max-w`, `max-h` y `overflow-y` para garantizar legibilidad y usabilidad en distintos tamaños de pantalla.

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

- Validación de campos requeridos (título, descripción, usuario solicitante, fecha)
- Validacion de campos requeridos en el login (nombre de usuario y la contraseña)
- Control de formatos y errores
- Prevención de operaciones sin confirmar
- Indicador de progreso

---

## 🧠 Decisiones de Diseño UX

- **Interfaces limpias y minimalistas:** Se utilizó Tailwind CSS para crear una UI moderna, clara y con buena jerarquía visual, facilitando la usabilidad y navegación.
- **Modales adaptativos:** Los formularios de creación/edición y confirmación de eliminación están diseñados para ajustarse a distintos tamaños de pantalla, evitando que el contenido se vea amontonado o demasiado pequeño, mejorando la experiencia en dispositivos móviles y escritorios.
- **Feedback inmediato:** Se incorporaron notificaciones tipo toast para informar al usuario sobre el resultado de sus acciones (guardado, actualización, eliminación, errores), contribuyendo a una comunicación clara y efectiva.
- **Filtros y búsqueda en tiempo real:** La lista de solicitudes se puede filtrar y buscar dinámicamente, con resultados instantáneos, facilitando la localización rápida de la información.
- **Validaciones claras y accesibles:** Los formularios emplean validaciones reactivas que guían al usuario en la corrección de errores antes de enviar datos, mejorando la calidad y reduciendo frustraciones.
- **Consistencia visual:** Uso de íconos SVG (heroicons) para acciones comunes, manteniendo uniformidad y reconocimiento rápido de funcionalidades.
- **Optimización para dispositivos móviles:** Diseño responsivo que asegura que todas las funcionalidades sean accesibles y usables desde smartphones y tablets.

Estas decisiones contribuyen a una experiencia de usuario intuitiva, eficiente y agradable, alineada con buenas prácticas de usabilidad.

---

## ✅ Estado del proyecto

- [x] Estructura base con Angular CLI
- [x] Lazy loading para módulo de solicitudes
- [x] Formulario Agregar/Editar reactivo
- [x] Filtros por categoría y estatus
- [x] Persistencia con localStorage (para guardar el "token" y "usuario") y estado global son signals
- [x] Simulación de autenticación (opcional)

---

## 📄 Licencia

Este proyecto es parte de una prueba técnica. Puede adaptarse libremente con fines personales o educativos.

---
