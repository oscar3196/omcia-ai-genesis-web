
# OmcIA - WordPress Installation Guide

## Archivos incluidos:
- `index.html` - Página principal
- `styles.css` - Estilos CSS
- `script.js` - JavaScript funcional
- `README.md` - Este archivo de instrucciones

## Opciones de instalación en WordPress:

### Opción 1: Como página HTML estática (Recomendado)
1. Sube los archivos a tu servidor VPS en una carpeta (ej: `/var/www/html/omcia/`)
2. Configura un subdominio o carpeta en tu WordPress (ej: `tudominio.com/omcia`)
3. La página funcionará independientemente de WordPress

### Opción 2: Integración con WordPress
1. Crea una nueva página en WordPress
2. Instala el plugin "Insert Headers and Footers" o similar
3. Copia el contenido del `<body>` de `index.html` en el editor de WordPress
4. Agrega el CSS en Apariencia > Personalizar > CSS Adicional
5. Agrega el JavaScript en el footer usando el plugin

### Opción 3: Como tema personalizado
1. Crea una carpeta en `/wp-content/themes/omcia/`
2. Convierte `index.html` a `index.php`
3. Agrega las funciones de WordPress necesarias
4. Activa el tema desde el panel de administración

## Configuración del servidor:
- Asegúrate de que tu servidor web (Apache/Nginx) esté configurado
- Los archivos deben tener permisos de lectura (644 para archivos, 755 para carpetas)
- Verifica que el dominio/subdominio apunte correctamente

## Personalización:
- Modifica los datos de contacto en `index.html`
- Ajusta los colores en `styles.css` si necesitas cambios de marca
- El formulario de contacto necesita configuración backend para funcionar completamente

## Funcionalidades incluidas:
✅ Diseño responsive
✅ Navegación suave
✅ Animaciones CSS
✅ Formulario de contacto (frontend)
✅ Iconos Lucide
✅ Menu móvil funcional

## Nota importante:
Para que el formulario de contacto funcione completamente, necesitarás configurar el backend para procesar los envíos de formulario (PHP, Node.js, etc.) o usar un servicio como Formspree, Netlify Forms, etc.
