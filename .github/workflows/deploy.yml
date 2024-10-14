# Flujo de trabajo simple para implementar contenido estático en Github Pages
name: Implementar contenido estático a Pages

on:
  # Se ejecuta en anotaciones dirigidas a la rama predeterminada
  push:
    branches: ['main']

  # Te permite ejecutar este flujo de trabajo manualmente desde la pestaña Acciones
  workflow_dispatch:

# Establece los permisos de GITHUB_TOKEN para permitir la implementación en GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Permite una implementación simultánea
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  # Trabajo de implementación único ya que solo estamos implementando
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload dist folder
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4