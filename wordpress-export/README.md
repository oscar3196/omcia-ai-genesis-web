
# OmcIA - Guía de Instalación en VPS con WordPress

## 🚀 Instalación Rápida

### Opción 1: Instalación como Sitio Independiente (Recomendado)

1. **Conecta a tu VPS por SSH:**
   ```bash
   ssh usuario@tu-servidor.com
   ```

2. **Navega al directorio web:**
   ```bash
   cd /var/www/html
   ```

3. **Crea carpeta para OmcIA:**
   ```bash
   sudo mkdir omcia
   cd omcia
   ```

4. **Sube los archivos** (index.html, styles.css, script.js) a esta carpeta

5. **Configura permisos:**
   ```bash
   sudo chown -R www-data:www-data /var/www/html/omcia
   sudo chmod -R 644 /var/www/html/omcia/*
   sudo chmod 755 /var/www/html/omcia
   ```

6. **Accede a tu sitio:**
   `https://tudominio.com/omcia`

### Opción 2: Integración con WordPress Existente

#### A. Como Página WordPress:
1. Ve a **WordPress Admin → Páginas → Añadir nueva**
2. Copia el contenido del `<body>` de `index.html`
3. Pégalo en el editor de WordPress (modo HTML)
4. Ve a **Apariencia → Personalizar → CSS Adicional**
5. Copia y pega todo el contenido de `styles.css`
6. Instala el plugin **"Insert Headers and Footers"**
7. Agrega el contenido de `script.js` en el footer

#### B. Como Tema Personalizado:
1. **Crea directorio del tema:**
   ```bash
   cd /var/www/html/wp-content/themes/
   sudo mkdir omcia-theme
   cd omcia-theme
   ```

2. **Convierte archivos:**
   - Renombra `index.html` a `index.php`
   - Agrega al inicio del archivo:
   ```php
   <?php
   /*
   Theme Name: OmcIA
   Description: Tema personalizado para OmcIA
   Version: 1.0
   */
   ?>
   ```

3. **Crea style.css:**
   ```css
   /*
   Theme Name: OmcIA
   Description: Tema personalizado para OmcIA
   Version: 1.0
   */
   /* Aquí va todo el contenido de styles.css */
   ```

4. **Activa el tema** desde WordPress Admin → Apariencia → Temas

### Opción 3: Subdominio Dedicado

1. **Configura subdominio en tu proveedor DNS:**
   - Crea registro A: `omcia.tudominio.com` → IP de tu VPS

2. **Configura Virtual Host (Apache):**
   ```bash
   sudo nano /etc/apache2/sites-available/omcia.conf
   ```
   
   Contenido:
   ```apache
   <VirtualHost *:80>
       ServerName omcia.tudominio.com
       DocumentRoot /var/www/omcia
       
       <Directory /var/www/omcia>
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Habilita el sitio:**
   ```bash
   sudo a2ensite omcia.conf
   sudo systemctl reload apache2
   ```

4. **Configura SSL con Let's Encrypt:**
   ```bash
   sudo certbot --apache -d omcia.tudominio.com
   ```

## 📋 Requisitos del Servidor

- **Sistema:** Ubuntu 18.04+ / CentOS 7+ / Debian 9+
- **Web Server:** Apache 2.4+ o Nginx 1.14+
- **PHP:** 7.4+ (solo si usas WordPress)
- **SSL:** Certificado válido (recomendado)

## 🔧 Configuración Adicional

### Para Apache (.htaccess):
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### Para Nginx:
```nginx
server {
    listen 80;
    server_name omcia.tudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name omcia.tudominio.com;
    
    root /var/www/omcia;
    index index.html;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📧 Configuración del Formulario de Contacto

El formulario actualmente es solo frontend. Para hacerlo funcional:

### Opción A: PHP Simple
Crea `process-form.php`:
```php
<?php
if ($_POST) {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $company = filter_var($_POST['company'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    
    $to = "oscar.iaconsulting@gmail.com";
    $subject = "Nuevo contacto desde OmcIA - $name";
    $body = "Nombre: $name\nEmail: $email\nEmpresa: $company\nMensaje: $message";
    
    mail($to, $subject, $body);
    echo json_encode(['success' => true]);
}
?>
```

### Opción B: Servicios Externos
- **Formspree:** Agrega action="https://formspree.io/f/tu-id"
- **Netlify Forms:** Si migras a Netlify
- **EmailJS:** Para envío desde JavaScript

## 🔒 Seguridad

1. **Firewall básico:**
   ```bash
   sudo ufw enable
   sudo ufw allow 'Apache Full'
   sudo ufw allow ssh
   ```

2. **Actualizaciones automáticas:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install unattended-upgrades
   ```

3. **Backup automático:**
   ```bash
   # Crea script de backup
   sudo nano /etc/cron.daily/backup-omcia
   ```

## 📱 Funcionalidades Incluidas

✅ **Diseño responsive** - Funciona en móviles y tablets
✅ **Navegación suave** - Scroll automático entre secciones  
✅ **Menu móvil** - Hamburger menu funcional
✅ **Animaciones CSS** - Efectos visuales profesionales
✅ **Formulario de contacto** - Frontend listo para backend
✅ **Iconos Lucide** - Biblioteca de iconos moderna
✅ **SEO optimizado** - Meta tags y estructura semántica
✅ **Carga rápida** - CSS y JS optimizados

## 🆘 Solución de Problemas

**Problema:** Los iconos no se cargan
**Solución:** Verifica que el CDN de Lucide esté accesible

**Problema:** Estilos no se aplican
**Solución:** Revisa la ruta del archivo CSS y permisos

**Problema:** JavaScript no funciona
**Solución:** Abre la consola del navegador para ver errores

## 📞 Soporte

- **Email:** oscar.iaconsulting@gmail.com
- **Teléfono:** +34 684 403 453
- **Ubicación:** Sanxenxo

---

**¡Tu sitio web OmcIA está listo para conquistar el mundo digital! 🚀**
