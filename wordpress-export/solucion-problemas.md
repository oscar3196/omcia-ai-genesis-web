
# 🆘 Solución de Problemas Comunes

Guía completa para diagnosticar y resolver problemas frecuentes en la instalación de OmcIA.

## 🔍 Diagnóstico General

### Comandos Básicos de Diagnóstico

```bash
# Verificar estado del servidor web
sudo systemctl status apache2  # Apache
sudo systemctl status nginx    # Nginx

# Ver qué está corriendo en puertos web
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Verificar configuración
sudo apache2ctl configtest     # Apache
sudo nginx -t                  # Nginx

# Ver logs en tiempo real
sudo tail -f /var/log/apache2/error.log
sudo tail -f /var/log/nginx/error.log

# Verificar permisos
ls -la /var/www/html/omcia/
ls -la /var/www/omcia/
```

---

## ❌ Error 403 Forbidden

### Síntomas
- El navegador muestra "403 Forbidden"
- No se puede acceder al sitio

### Causas y Soluciones

#### 1. Problemas de Permisos

**Verificar permisos actuales:**
```bash
ls -la /var/www/html/omcia/
```

**Corregir permisos:**
```bash
# Para sitio independiente
sudo chown -R www-data:www-data /var/www/html/omcia
sudo chmod 755 /var/www/html/omcia
sudo chmod 644 /var/www/html/omcia/*

# Para subdominio
sudo chown -R www-data:www-data /var/www/omcia
sudo chmod 755 /var/www/omcia
sudo chmod 644 /var/www/omcia/*
```

#### 2. Archivo index.html no encontrado

**Verificar que existe:**
```bash
ls -la /var/www/html/omcia/index.html
```

**Si no existe, crearlo:**
```bash
sudo nano /var/www/html/omcia/index.html
# Copiar contenido del archivo original
```

#### 3. Configuración de Apache

**Verificar DirectoryIndex:**
```bash
sudo nano /etc/apache2/sites-available/omcia.conf
```

**Añadir si falta:**
```apache
<Directory /var/www/html/omcia>
    DirectoryIndex index.html
    AllowOverride All
    Require all granted
    Options -Indexes
</Directory>
```

---

## ❌ Error 500 Internal Server Error

### Síntomas
- Página muestra "Internal Server Error"
- Error 500 en navegador

### Causas y Soluciones

#### 1. Error en .htaccess

**Verificar sintaxis:**
```bash
sudo apache2ctl configtest
```

**Si hay error, revisar .htaccess:**
```bash
sudo nano /var/www/html/omcia/.htaccess
```

**Comentar líneas problemáticas temporalmente:**
```apache
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### 2. Módulos de Apache no habilitados

**Habilitar módulos necesarios:**
```bash
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod headers
sudo systemctl reload apache2
```

#### 3. Revisar logs específicos

**Ver error exacto:**
```bash
sudo tail -f /var/log/apache2/error.log
# Intentar cargar la página y ver el error
```

---

## ❌ CSS y JavaScript No Cargan

### Síntomas
- Página se ve sin estilos (solo texto plano)
- Menú móvil no funciona
- Animaciones no aparecen

### Soluciones

#### 1. Verificar Rutas de Archivos

**Comprobar que existen:**
```bash
ls -la /var/www/html/omcia/styles.css
ls -la /var/www/html/omcia/script.js
```

**Verificar permisos:**
```bash
sudo chmod 644 /var/www/html/omcia/styles.css
sudo chmod 644 /var/www/html/omcia/script.js
```

#### 2. Comprobar en Navegador

**Abrir Developer Tools (F12):**
- **Network tab:** Ver si aparecen errores 404
- **Console tab:** Ver errores de JavaScript

**URLs de prueba directa:**
- `https://tudominio.com/omcia/styles.css`
- `https://tudominio.com/omcia/script.js`

#### 3. Problemas de Cache

**Limpiar cache del navegador:**
- Ctrl + F5 (Windows/Linux)
- Cmd + Shift + R (Mac)

**Verificar headers de cache:**
```bash
curl -I https://tudominio.com/omcia/styles.css
```

#### 4. Configuración de MIME Types

**Para Apache, añadir a .htaccess:**
```apache
<IfModule mod_mime.c>
    AddType text/css .css
    AddType application/javascript .js
</IfModule>
```

---

## ❌ Problemas de SSL/HTTPS

### Síntomas
- Certificado SSL no válido
- Navegador muestra "No seguro"
- Error de certificado

### Soluciones

#### 1. Regenerar Certificado Let's Encrypt

```bash
# Verificar certificados existentes
sudo certbot certificates

# Renovar certificado específico
sudo certbot renew --cert-name omcia.tudominio.com

# Forzar renovación
sudo certbot renew --force-renewal --cert-name omcia.tudominio.com
```

#### 2. Verificar Configuración SSL

**Para Apache:**
```bash
sudo nano /etc/apache2/sites-available/omcia-ssl.conf
```

**Verificar que incluye:**
```apache
<VirtualHost *:443>
    ServerName omcia.tudominio.com
    DocumentRoot /var/www/omcia
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/omcia.tudominio.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/omcia.tudominio.com/privkey.pem
</VirtualHost>
```

#### 3. Verificar Puertos y Firewall

```bash
# Verificar que puerto 443 está abierto
sudo ufw status
sudo netstat -tlnp | grep :443

# Abrir puerto si es necesario
sudo ufw allow 443/tcp
```

---

## ❌ Formulario No Envía Emails

### Síntomas
- Formulario se envía pero no llegan emails
- Error en consola del navegador

### Soluciones

#### 1. Verificar Configuración de PHP

**Comprobar que PHP funciona:**
```bash
php -v
```

**Crear archivo de prueba:**
```bash
sudo nano /var/www/html/omcia/test-mail.php
```

**Contenido:**
```php
<?php
$to = "oscar.iaconsulting@gmail.com";
$subject = "Test email";
$message = "This is a test email";
$headers = "From: test@tudominio.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully";
} else {
    echo "Failed to send email";
}
?>
```

**Probar:**
`https://tudominio.com/omcia/test-mail.php`

#### 2. Configurar Postfix

**Verificar estado:**
```bash
sudo systemctl status postfix
```

**Si no está instalado:**
```bash
sudo apt install postfix mailutils
```

**Configurar:**
```bash
sudo nano /etc/postfix/main.cf
```

**Configuración mínima:**
```
myhostname = tudominio.com
mydomain = tudominio.com
myorigin = $mydomain
inet_interfaces = loopback-only
mydestination = $myhostname, localhost.$mydomain, localhost
```

#### 3. Verificar Logs de Mail

```bash
sudo tail -f /var/log/mail.log
# Intentar enviar email y ver qué pasa
```

#### 4. Usar Servicio Externo (Alternativa)

**Modificar el formulario para usar EmailJS:**
```html
<!-- En el head del HTML -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

---

## ❌ Problemas de DNS

### Síntomas
- Subdominio no resuelve
- "Site can't be reached"

### Soluciones

#### 1. Verificar Propagación DNS

```bash
# Desde el servidor
nslookup omcia.tudominio.com
dig omcia.tudominio.com

# Desde tu PC local
nslookup omcia.tudominio.com 8.8.8.8
```

#### 2. Verificar Configuración en Proveedor DNS

**Configuración correcta:**
- **Tipo:** A
- **Nombre:** omcia
- **Valor:** IP del VPS
- **TTL:** 300 o Auto

#### 3. Limpiar Cache DNS Local

```bash
# En tu PC local (Windows)
ipconfig /flushdns

# Linux/Mac
sudo systemctl flush-dns
# O
sudo dscacheutil -flushcache
```

---

## ❌ WordPress: Conflictos de Tema

### Síntomas
- Estilos se ven mal en WordPress
- JavaScript no funciona
- Layout roto

### Soluciones

#### 1. Conflictos de CSS

**Añadir especificidad al CSS:**
```css
/* En lugar de */
.header { ... }

/* Usar */
.omcia-page .header { ... }
```

**Wrappear todo el contenido:**
```html
<div class="omcia-page">
    <!-- Todo el contenido de OmcIA -->
</div>
```

#### 2. Conflictos de JavaScript

**Usar jQuery de WordPress:**
```javascript
jQuery(document).ready(function($) {
    // Tu código aquí
});
```

#### 3. Desactivar Plugins Temporalmente

**Para identificar conflictos:**
1. Desactivar todos los plugins
2. Probar si funciona
3. Reactivar uno por uno

---

## 🔧 Herramientas de Diagnóstico

### Verificación Online

- **SSL Labs:** https://www.ssllabs.com/ssltest/
- **DNS Checker:** https://dnschecker.org/
- **GTmetrix:** https://gtmetrix.com/
- **Pingdom:** https://tools.pingdom.com/

### Comandos de Red

```bash
# Verificar conectividad
ping tudominio.com
ping omcia.tudominio.com

# Verificar puertos abiertos
telnet tudominio.com 80
telnet tudominio.com 443

# Verificar certificado SSL
openssl s_client -connect omcia.tudominio.com:443
```

### Scripts de Diagnóstico Automático

```bash
# Crear script de diagnóstico
sudo nano /usr/local/bin/diagnose-omcia.sh
```

**Contenido:**
```bash
#!/bin/bash
echo "=== OmcIA Diagnostic Tool ==="
echo

echo "1. Checking web server status..."
systemctl is-active apache2 nginx

echo "2. Checking site files..."
ls -la /var/www/html/omcia/ /var/www/omcia/ 2>/dev/null

echo "3. Checking SSL certificate..."
openssl x509 -in /etc/letsencrypt/live/*/fullchain.pem -noout -dates 2>/dev/null

echo "4. Checking DNS resolution..."
nslookup omcia.tudominio.com

echo "5. Recent error logs..."
tail -5 /var/log/apache2/error.log /var/log/nginx/error.log 2>/dev/null

echo "=== Diagnostic complete ==="
```

```bash
sudo chmod +x /usr/local/bin/diagnose-omcia.sh
sudo /usr/local/bin/diagnose-omcia.sh
```

---

## 📞 Cuándo Contactar Soporte

Si después de seguir esta guía sigues teniendo problemas, contacta con:

- **Email:** oscar.iaconsulting@gmail.com
- **Teléfono:** +34 684 403 453

**Incluye en tu mensaje:**
1. Tipo de instalación (independiente/WordPress/subdominio)
2. Sistema operativo del servidor
3. Mensaje de error exacto
4. Logs relevantes
5. Capturas de pantalla si es posible

¡No te preocupes, todos los problemas tienen solución! 🚀
