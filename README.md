# Informes 360 Claro-Inmel — PWA v2.0

## Objetivo
Aplicación web progresiva para uso desde computador y celular. La primera etapa conserva el almacenamiento local; la arquitectura deja preparada la incorporación posterior de sincronización centralizada.

## Publicación recomendada
Publicar **todo el contenido de esta carpeta** en la raíz de un repositorio GitHub Pages o en un hosting HTTPS. No abrir `index.html` como `file://` para probar PWA: Service Worker e instalación requieren HTTPS (localhost es excepción).

1. Subir `index.html`, `generadores.html`, `manifest.webmanifest`, `service-worker.js`, `assets/` y `README.md`.
2. En GitHub: Settings → Pages → Deploy from branch o GitHub Actions.
3. Abrir la URL HTTPS publicada desde el celular o computador.
4. Esperar la primera carga completa con Internet para que el Service Worker almacene el shell.
5. En Android/Chrome usar “Instalar aplicación” o “Agregar a pantalla principal”. En iPhone/iPad usar Safari → Compartir → Añadir a pantalla de inicio.

## Arquitectura de esta entrega
- `index.html`: menú principal de cinco formatos.
- `generadores.html`: módulo de Grupo Electrógeno basado en la v25 completa, con sus funciones originales.
- `manifest.webmanifest`: identidad e instalación PWA.
- `service-worker.js`: caché del shell local y estrategia offline.
- `assets/icons/`: iconos de instalación.
- Las plantillas de Excel de la versión v25 siguen embebidas en el módulo Generadores.
- El menú y los otros cuatro formatos conservan la versión integrada inicial; sus flujos y correspondencia de exportación todavía requieren validación técnica específica.

## Funcionamiento local/offline: alcance y límites
- La PWA guarda en caché los archivos principales después de una primera visita con conexión.
- El módulo Generadores mantiene sus mecanismos existentes de borrador e historial local.
- El resto de los formularios mantiene su almacenamiento local de la versión integrada.
- La consulta DANE requiere Internet.
- La biblioteca `xlsx-populate` de los cuatro formatos adicionales se carga desde jsDelivr; el Service Worker intenta almacenarla después de que se carga con conexión. Para garantizar exportación Excel totalmente offline en todos los navegadores, la siguiente iteración debe incorporar y probar esa biblioteca localmente.
- Los datos locales no se sincronizan entre dispositivos ni se respaldan en servidor en esta fase.
- Los navegadores gestionan las cuotas y la depuración de almacenamiento; los usuarios deben exportar y respaldar informes importantes.

## Compatibilidad
La base usa estándares web. La instalación PWA depende del navegador y del sistema:
- Android: Chrome y navegadores compatibles con instalación PWA.
- Windows/macOS: Chrome y Edge; Firefox permite uso web, pero la experiencia de instalación varía.
- iOS/iPadOS: Safari permite añadir a pantalla de inicio, con diferencias de almacenamiento, cámara y descarga/compartición.

La compatibilidad universal no se puede garantizar solo por el código: se requiere prueba en dispositivos y versiones reales.

## Fase siguiente: sincronización centralizada
Diseñar API HTTPS con autenticación, usuarios/roles, identificador único de informe, cola de sincronización, reintentos, control de conflictos, almacenamiento de adjuntos y auditoría. No guardar credenciales ni secretos en el frontend. Mantener IndexedDB como cola offline y servidor como repositorio central.
