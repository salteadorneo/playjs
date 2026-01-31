# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

---

## [Unreleased]

Cambios que están en main pero aún no tienen versión publicada.

---

## [v0.6.13] - 2026-01-10

### Added
- **SecurityWarning component**: Nuevo componente para alertar a los usuarios sobre riesgos potenciales
- **Internationalization support**: Soporte multiidioma mejorado para componentes SecurityWarning y Upload

### Changed
- **File upload validation**: Mejora en la validación y manejo de errores del componente Upload
- **Download functionality**: Mejora en la funcionalidad de descarga del componente Menu con soporte para archivos TypeScript

### Chores
- Actualización de dependencias en `package.json` y `package-lock.json`
- Actualización de versión de dependencia playjs-core a 0.6.9
- Bump de versión a 0.6.9 en package.json

### Docs
- Adición de instrucciones de Copilot para configuración y uso del proyecto

#### Commits (Root):
- `9f36465` refactor: enhance file upload validation and error handling in Upload component
- `16776e3` refactor: improve download functionality in Menu component to support TypeScript files
- `922bae4` feat: add SecurityWarning component to alert users about potential risks
- `1a0c505` chore: update dependencies in package.json and package-lock.json
- `34f8d8e` docs: add Copilot instructions for project setup and usage
- `158c75e` feat: enhance SecurityWarning and Upload components with internationalization support
- `8f43680` chore: bump version to 0.6.9 in package.json and package-lock.json
- `b019c51` chore: update playjs-core dependency version to 0.6.9

**Core changes**: Ver [packages/playjs-core/CHANGELOG.md](packages/playjs-core/CHANGELOG.md#v0613---2026-01-10)

---

## [v0.6.12] - 2025-12-20

### Changed
- **Upload component**: Refactorización para usar imports correctos y mejorar la gestión de estado
- **Menu component**: Refactorización para usar imports absolutos y mejorar la gestión de estado
- **Theme and language state**: Simplificación de la gestión de estado en el componente App
- **Button component import**: Actualización de la ruta de importación

#### Commits:
- `37aa577` refactor: update Upload component to use correct imports and state management
- `312edaa` refactor: update Menu component to use absolute imports and improve state management
- `9946e12` refactor: simplify theme and language state management in App component
- `d8e0c2d` refactor: update import path for Button component in Upload

---

## [v0.6.10] - 2024-11-14

### Changed
- **Dependencies**: Actualización de dependencias a versiones más recientes
- **App component**: Refactorización para renderizar condicionalmente elementos de UI basándose en IS_IFRAME

#### Commits:
- `af0b9ff` Update dependencies to latest versions in package.json and package-lock.json
- `bfc71d5` Refactor App component to conditionally render UI elements based on IS_IFRAME

---

## [v0.6.9] - 2024-10-26

### Fixed
- **Language handling**: Corregido el manejo de configuración de idioma al cargar archivos TypeScript

### Changed
- **App component**: Refactorización para establecer código en el estado

### Features
- **IA Support**: Agregado soporte para completaciones de código con IA

#### Commits (Root):
- `caa706c` Fix handle setting language when uploading TypeScript file
- `cedd1b9` Refactor App component to set code in state
- `cd57e60` Add IA support
- `45bb440` Bump playjs-core version to 0.6.7
- `b09ede5` Refactor App component to use implicit boolean value for IA prop
- `059e4ca` Refactor unused icons
- `54997b0` Remove unused DisplayOptions component
- `d0e5ac1` Refactor language selection in Language component + Refactor icons
- `ce98e4c` Update playjs-core and tailwindcss versions

**Core changes**: Ver [packages/playjs-core/CHANGELOG.md](packages/playjs-core/CHANGELOG.md#v069---2024-10-26)

---

## [v0.6.8] - 2024-10-17

### Changed
- **Deployment workflow**: Refactorización del workflow de despliegue para incluir directorio web
- **Astro configuration**: Refactorización de configuración de Astro
- **Multiple sites**: Actualización del workflow para soportar múltiples sitios

#### Commits:
- `928444e` Init web
- `e6400ff` Refactor deployment workflow to include web directory
- `71f3f01` [Deno Deploy] Update .github/workflows/deploy.yml
- `4f6cb07` Refactor deployment workflow to include web directory and update CNAME
- `e7c9ca1` Merge branch 'main'
- `5b8a673` Refactor Astro configuration and package.json scripts
- `87e9332` Refactor deployment workflow to include web directory and update CNAME
- `000a309` Refactor deployment workflow to include multiple sites
- `730385d` Refactor deployment workflow to include web directory and update CNAME
- `c8522c4` Refactor deployment workflow to update artifact name for web directory
- `2561672` Refactor deployment workflow to update artifact names for web directory and include multiple sites
- `61ba1b4` Refactor deployment workflow to update CNAME for web and include multiple sites
- `851386c` Refactor deployment workflow to update artifact names for web directory
- `d3c7487` Refactor deployment workflow to update artifact names for web directory and include multiple sites
- `6fb8d06` Refactor deployment workflow to remove commented out code for deploying web directory

---

## [v0.6.7] - 2024-10-16

### Changed
- **Menu component**: Refactorización de estilos para selección de idioma
- **Tabs component**: Refactorización para eliminar código no utilizado y deshabilitar creación de código nuevo
- **App component**: Refactorización para retrasar la actualización del hash de URL

#### Commits:
- `996596c` Refactor Menu component styles for language selection
- `2a94066` Refactor Tabs component to remove unused code and disable new code creation
- `621d139` Refactor App component to delay updating URL hash
- `ef4d39c` Refactor App component to delay updating URL hash

---

## [v0.6.6] - 2024-10-14

### Changed
- **URL handling**: Refactorización del manejo de URLs para compartir código
- **Menu component**: Refactorización de estilos para mejor espaciado y apariencia
- **Button component**: Refactorización de estilos para esquinas redondeadas
- **Theme component**: Refactorización para usar section en lugar de Button
- **Language component**: Refactorización de estilos para selección de idioma
- **Code handling**: Refactorización de funciones encodeCode y decodeCode para manejar inputs vacíos

### Fixed
- Eliminada dependencia de monaco-js-linter
- Refactorización de componente App para remover dependencia de componente Main

### Infrastructure
- **Vite configuration**: Refactorización para agregar ruta base para despliegue en GitHub Pages
- **Deno Deploy**: Actualización de configuración de Deno Deploy
- **GitHub Pages**: Configuración de despliegue en GitHub Pages

#### Commits (Root):
- `aee7d43` Refactor Deno Deploy configuration
- `019f511` Refactor Vite configuration to enable history API fallback
- `be068bb` [Deno Deploy] Update .github/workflows/deploy.yml
- `91a2fbf` [Deno Deploy] Update .github/workflows/deploy.yml
- `6936f72` Refactor Vite configuration and add Deno Deploy plugin
- `4c8b7a5` Deploy GitHub pages
- `dec5ade` Refactor Vite configuration to add base path for GitHub Pages deployment
- `919d5b3` Update base path for GitHub Pages deployment
- `18bff21` Refactor Vite configuration and update dependencies
- `f5a864c` Refactor URL handling for code sharing
- `bbfe8bb` Refactor Menu component styles for better spacing and appearance
- `5d81d93` Refactor App component to always render Main component
- `12f344b` Refactor main
- `eb5ee86` Refactor App component to remove dependency on Main component
- `d95590f` Refactor Button component styles for rounded corners
- `8664842` Refactor Theme component to use section instead of Button for theme selection
- `0a2d72b` Refactor Language component styles for language selection
- `cd0a601` Refactor App component to use local state for code and language selection
- `586b959` Refactor encodeCode and decodeCode functions to handle empty code inputs

**Core changes**: Ver [packages/playjs-core/CHANGELOG.md](packages/playjs-core/CHANGELOG.md#v066---2024-10-14)

---

## [v0.6.5] - 2024-10-14

Versión base del registro de cambios.

---

## [v0.6.0] y anteriores

Versiones históricas sin documentación detallada disponible.

