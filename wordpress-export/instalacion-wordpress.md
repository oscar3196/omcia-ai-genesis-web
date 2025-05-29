
# 🔗 Instalación en WordPress

Guía para integrar OmcIA en tu sitio WordPress existente.

## 🎯 Opción A: Como Página de WordPress

### 1. Acceder a WordPress Admin

1. Ve a: `https://tudominio.com/wp-admin`
2. Inicia sesión con tu usuario administrador

### 2. Crear Nueva Página

1. **Páginas → Añadir nueva**
2. **Título:** "OmcIA - Consultoría en IA"
3. **Cambiar a editor HTML** (esquina superior derecha o "Texto")

### 3. Insertar Contenido HTML

Copia **SOLO** el contenido del `<body>` del archivo `index.html`:

```html
<!-- Copiar desde <header class="header"> hasta </footer> -->
<!-- NO incluir las etiquetas <html>, <head>, o <body> -->
```

**Pasos detallados:**
1. Abre el archivo `index.html`
2. Busca la línea `<header class="header">`
3. Selecciona todo desde esa línea hasta `</footer>`
4. Copia y pega en el editor HTML de WordPress

### 4. Añadir CSS Personalizado

1. **Apariencia → Personalizar**
2. **CSS Adicional** (o "Additional CSS")
3. Copiar **TODO** el contenido de `styles.css`
4. **Publicar**

### 5. Añadir JavaScript

**Instalar Plugin:**
1. **Plugins → Añadir nuevo**
2. Buscar: **"Insert Headers and Footers"**
3. **Instalar y Activar**

**Configurar JavaScript:**
1. **Ajustes → Insert Headers and Footers**
2. En **Scripts in Footer**, pegar el contenido de `script.js`
3. **Guardar**

### 6. Configurar URL Personalizada (Opcional)

1. En la página creada, en **Atributos de página**
2. **Slug:** `omcia`
3. URL final: `https://tudominio.com/omcia`

---

## 🎯 Opción B: Como Tema Personalizado

### 1. Crear Directorio del Tema

```bash
cd /var/www/html/wp-content/themes/
sudo mkdir omcia-theme
cd omcia-theme
```

### 2. Crear index.php

```bash
sudo nano index.php
```

Contenido (agregar al inicio del archivo HTML):
```php
<?php
/*
Theme Name: OmcIA
Description: Tema personalizado para OmcIA Consulting
Version: 1.0
Author: OmcIA
*/

get_header(); // Opcional: para mantener header de WordPress
?>

<!-- Aquí va todo el contenido del <body> del index.html -->

<?php get_footer(); // Opcional: para mantener footer de WordPress ?>
```

### 3. Crear style.css

```bash
sudo nano style.css
```

Contenido:
```css
/*
Theme Name: OmcIA
Description: Tema personalizado para OmcIA Consulting
Version: 1.0
Author: OmcIA
*/

/* Aquí va todo el contenido de styles.css */
```

### 4. Crear functions.php

```bash
sudo nano functions.php
```

Contenido:
```php
<?php
// Cargar scripts
function omcia_enqueue_scripts() {
    wp_enqueue_script('omcia-script', get_template_directory_uri() . '/script.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'omcia_enqueue_scripts');

// Soporte para características del tema
function omcia_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'omcia_theme_support');
?>
```

### 5. Añadir script.js

```bash
sudo nano script.js
# Copiar todo el contenido del archivo script.js original
```

### 6. Activar el Tema

1. **WordPress Admin → Apariencia → Temas**
2. Buscar **"OmcIA"**
3. **Activar**

---

## 🎯 Opción C: Como Plugin

### 1. Crear Directorio del Plugin

```bash
cd /var/www/html/wp-content/plugins/
sudo mkdir omcia-plugin
cd omcia-plugin
```

### 2. Crear archivo principal del plugin

```bash
sudo nano omcia-plugin.php
```

Contenido:
```php
<?php
/*
Plugin Name: OmcIA Landing Page
Description: Plugin para mostrar la landing page de OmcIA
Version: 1.0
Author: OmcIA
*/

// Prevenir acceso directo
if (!defined('ABSPATH')) {
    exit;
}

class OmcIAPlugin {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('omcia_landing', array($this, 'display_landing_page'));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('omcia-styles', plugin_dir_url(__FILE__) . 'styles.css');
        wp_enqueue_script('omcia-scripts', plugin_dir_url(__FILE__) . 'script.js', array(), '1.0', true);
    }
    
    public function display_landing_page($atts) {
        ob_start();
        include_once plugin_dir_path(__FILE__) . 'landing-page.php';
        return ob_get_clean();
    }
}

new OmcIAPlugin();
?>
```

### 3. Crear landing-page.php

```bash
sudo nano landing-page.php
```

Contenido (solo el contenido del body del HTML original):
```html
<!-- Todo el contenido desde <header> hasta </footer> -->
```

### 4. Copiar archivos de estilos y scripts

```bash
# Copiar styles.css y script.js al directorio del plugin
sudo cp /ruta/a/styles.css .
sudo cp /ruta/a/script.js .
```

### 5. Activar Plugin y Usar Shortcode

1. **Plugins → Plugins instalados**
2. **Activar "OmcIA Landing Page"**
3. En cualquier página o entrada, usar: `[omcia_landing]`

---

## 📧 Configurar Formulario en WordPress

### Opción 1: Contact Form 7

1. **Instalar Contact Form 7**
2. **Contacto → Formularios de contacto**
3. **Crear nuevo formulario**
4. Reemplazar el formulario HTML existente con el shortcode

### Opción 2: WPForms

1. **Instalar WPForms**
2. **WPForms → Añadir nuevo**
3. **Crear formulario similar al diseño original**
4. **Obtener shortcode e insertar**

## ✅ Verificación

### Checklist WordPress:
- [ ] Página/tema se muestra correctamente
- [ ] CSS se aplica (colores azules, gradientes)
- [ ] JavaScript funciona (menú móvil)
- [ ] Formulario funciona (si configurado)
- [ ] Compatible con tema actual (solo para Opción A)
- [ ] Responsive en móviles

### Problemas comunes:
- **CSS no se aplica:** Verificar que no hay conflictos con el tema
- **JS no funciona:** Revisar consola del navegador
- **Formulario no envía:** Configurar plugin de formularios

¡Tu integración con WordPress está completa! Para problemas específicos, consulta la [guía de solución de problemas](./solucion-problemas.md).
