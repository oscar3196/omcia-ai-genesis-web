
# 🚀 Guía Paso a Paso: Publicar OmcIA en VPS con WordPress

## 📋 Preparativos Iniciales

### 1. Verificar Acceso al VPS
```bash
# Conectar por SSH
ssh usuario@tu-servidor.com
# O con IP directa
ssh root@123.456.789.10
```

### 2. Verificar Estado del Servidor Web
```bash
# Para Apache
sudo systemctl status apache2

# Para Nginx
sudo systemctl status nginx

# Ver qué está corriendo en puerto 80
sudo netstat -tlnp | grep :80
```

### 3. Localizar Directorio Web
```bash
# Ubicaciones comunes
ls -la /var/www/html/
ls -la /var/www/
ls -la /home/usuario/public_html/
```

---

## 🎯 OPCIÓN 1: Sitio Independiente (Más Fácil)

### Paso 1: Crear Directorio
```bash
cd /var/www/html
sudo mkdir omcia
cd omcia
```

### Paso 2: Subir Archivos
**Método A - Desde tu PC con SCP:**
```bash
# Desde tu computadora local
scp index.html usuario@tu-servidor.com:/var/www/html/omcia/
scp styles.css usuario@tu-servidor.com:/var/www/html/omcia/
scp script.js usuario@tu-servidor.com:/var/www/html/omcia/
```

**Método B - Crear archivos directamente:**
```bash
# Crear index.html
sudo nano /var/www/html/omcia/index.html
# Copiar todo el contenido del archivo index.html y pegar
# Guardar: Ctrl+X, luego Y, luego Enter

# Crear styles.css
sudo nano /var/www/html/omcia/styles.css
# Copiar todo el contenido del archivo styles.css y pegar
# Guardar: Ctrl+X, luego Y, luego Enter

# Crear script.js
sudo nano /var/www/html/omcia/script.js
# Copiar todo el contenido del archivo script.js y pegar
# Guardar: Ctrl+X, luego Y, luego Enter
```

### Paso 3: Configurar Permisos
```bash
sudo chown -R www-data:www-data /var/www/html/omcia
sudo chmod -R 644 /var/www/html/omcia/*
sudo chmod 755 /var/www/html/omcia
```

### Paso 4: Probar
Visita: `https://tudominio.com/omcia`

---

## 🎯 OPCIÓN 2: Integración con WordPress

### Paso 1: Acceder a WordPress Admin
1. Ve a: `https://tudominio.com/wp-admin`
2. Inicia sesión con tu usuario administrador

### Paso 2: Crear Nueva Página
1. **Páginas → Añadir nueva**
2. **Título:** "OmcIA - Consultoría en IA"
3. **Cambiar a editor HTML** (esquina superior derecha)

### Paso 3: Insertar Contenido HTML
Copia solo el contenido del `<body>` del archivo `index.html`:
```html
<!-- Copiar desde <header class="header"> hasta </footer> -->
```

### Paso 4: Añadir CSS Personalizado
1. **Apariencia → Personalizar**
2. **CSS Adicional**
3. Copiar TODO el contenido de `styles.css`
4. **Publicar**

### Paso 5: Añadir JavaScript
**Instalar Plugin:**
1. **Plugins → Añadir nuevo**
2. Buscar: "Insert Headers and Footers"
3. **Instalar y Activar**

**Configurar JavaScript:**
1. **Ajustes → Insert Headers and Footers**
2. En **Scripts in Footer**, pegar el contenido de `script.js`
3. **Guardar**

### Paso 6: Configurar URL Personalizada (Opcional)
1. En la página creada, en **Atributos de página**
2. **Slug:** `omcia`
3. URL final: `https://tudominio.com/omcia`

---

## 🎯 OPCIÓN 3: Subdominio Dedicado

### Paso 1: Configurar DNS
En tu proveedor de dominio (Cloudflare, GoDaddy, etc.):
```
Tipo: A
Nombre: omcia
Valor: [IP de tu VPS]
TTL: Auto o 300
```

### Paso 2: Crear Directorio
```bash
sudo mkdir -p /var/www/omcia
cd /var/www/omcia
```

### Paso 3: Subir Archivos
```bash
# Método directo en servidor
sudo nano index.html
sudo nano styles.css
sudo nano script.js
```

### Paso 4: Configurar Virtual Host (Apache)
```bash
sudo nano /etc/apache2/sites-available/omcia.conf
```

Contenido del archivo:
```apache
<VirtualHost *:80>
    ServerName omcia.tudominio.com
    DocumentRoot /var/www/omcia
    
    <Directory /var/www/omcia>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/omcia_error.log
    CustomLog ${APACHE_LOG_DIR}/omcia_access.log combined
</VirtualHost>
```

### Paso 5: Habilitar Sitio
```bash
sudo a2ensite omcia.conf
sudo systemctl reload apache2
```

### Paso 6: Configurar SSL
```bash
sudo apt update
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d omcia.tudominio.com
```

---

## 🔧 Configuración del Formulario de Contacto

### Crear script PHP para procesar formulario
```bash
sudo nano /var/www/html/omcia/process-form.php
```

Contenido:
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = filter_var($input['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $company = filter_var($input['company'], FILTER_SANITIZE_STRING);
    $message = filter_var($input['message'], FILTER_SANITIZE_STRING);
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email inválido']);
        exit;
    }
    
    // Configurar email
    $to = "oscar.iaconsulting@gmail.com";
    $subject = "Nuevo contacto desde OmcIA - $name";
    $body = "Nombre: $name\n";
    $body .= "Email: $email\n";
    $body .= "Empresa: $company\n";
    $body .= "Mensaje: $message\n";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar mensaje']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
```

---

## 🔐 Configuración de Seguridad

### 1. Configurar Firewall
```bash
sudo ufw enable
sudo ufw allow 'Apache Full'
sudo ufw allow ssh
sudo ufw status
```

### 2. Configurar .htaccess (Si usas Apache)
```bash
sudo nano /var/www/html/omcia/.htaccess
```

Contenido:
```apache
# Redirigir HTTP a HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Headers de seguridad
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache para archivos estáticos
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

---

## 📧 Configurar Email del Servidor

### Para que funcione el formulario, configura Postfix:
```bash
sudo apt update
sudo apt install postfix mailutils

# Durante la instalación:
# - Seleccionar: Internet Site
# - System mail name: tudominio.com
```

### Probar envío de email:
```bash
echo "Test email" | mail -s "Test Subject" oscar.iaconsulting@gmail.com
```

---

## ✅ Verificación Final

### 1. Comprobar que todo funciona:
- [ ] Sitio web carga correctamente
- [ ] CSS se aplica (colores azules, gradientes)
- [ ] JavaScript funciona (menú móvil, scroll suave)
- [ ] Formulario envía emails
- [ ] SSL está activo (candado verde)

### 2. URLs de prueba:
- **Opción 1:** `https://tudominio.com/omcia`
- **Opción 2:** `https://tudominio.com/omcia` (página WP)
- **Opción 3:** `https://omcia.tudominio.com`

### 3. Comandos de diagnóstico:
```bash
# Ver logs de Apache
sudo tail -f /var/log/apache2/access.log
sudo tail -f /var/log/apache2/error.log

# Verificar permisos
ls -la /var/www/html/omcia/

# Probar configuración Apache
sudo apache2ctl configtest
```

---

## 🆘 Solución de Problemas Comunes

### Error 403 Forbidden
```bash
sudo chmod 755 /var/www/html/omcia
sudo chmod 644 /var/www/html/omcia/*
sudo chown -R www-data:www-data /var/www/html/omcia
```

### Error 500 Internal Server Error
```bash
# Revisar logs
sudo tail -f /var/log/apache2/error.log
# Verificar sintaxis .htaccess
sudo apache2ctl configtest
```

### CSS/JS no cargan
```bash
# Verificar rutas en el navegador
# Verificar permisos de archivos
ls -la /var/www/html/omcia/styles.css
```

### Formulario no envía emails
```bash
# Verificar Postfix
sudo systemctl status postfix
# Ver logs de mail
sudo tail -f /var/log/mail.log
```

---

## 📞 Contacto para Soporte

- **Email:** oscar.iaconsulting@gmail.com
- **Teléfono:** +34 684 403 453

¡Tu sitio web OmcIA estará funcionando perfectamente! 🚀
