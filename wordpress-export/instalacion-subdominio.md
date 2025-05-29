
# 🌐 Instalación en Subdominio Dedicado

Guía para instalar OmcIA en un subdominio dedicado como `omcia.tudominio.com`.

## 🎯 Ventajas del Subdominio

- ✅ **URL limpia:** `omcia.tudominio.com`
- ✅ **Independiente** de WordPress
- ✅ **Mejor rendimiento** (sin plugins)
- ✅ **Fácil mantenimiento**
- ✅ **SSL independiente**

---

## 📋 Paso 1: Configurar DNS

### En tu Proveedor de Dominio

**Cloudflare, GoDaddy, Namecheap, etc.:**

```
Tipo: A
Nombre: omcia
Contenido/Valor: [IP de tu VPS]
TTL: Auto (o 300)
Proxy: Desactivado (nube gris en Cloudflare)
```

**Ejemplo en Cloudflare:**
1. **DNS → Administrar DNS**
2. **Agregar registro**
3. **Tipo:** A
4. **Nombre:** omcia
5. **Dirección IPv4:** 123.456.789.10 (IP de tu VPS)
6. **TTL:** Auto
7. **Estado del proxy:** Solo DNS (nube gris)

### Verificar Propagación DNS

```bash
# Desde tu computadora local
nslookup omcia.tudominio.com
# O
dig omcia.tudominio.com

# Debería mostrar la IP de tu VPS
```

---

## 📁 Paso 2: Crear Directorio en el Servidor

```bash
# Conectar al VPS
ssh usuario@tu-servidor.com

# Crear directorio para el subdominio
sudo mkdir -p /var/www/omcia
cd /var/www/omcia
```

---

## 📄 Paso 3: Subir Archivos

### Opción A: SCP desde tu PC

```bash
# Desde tu computadora local
scp index.html usuario@tu-servidor.com:/var/www/omcia/
scp styles.css usuario@tu-servidor.com:/var/www/omcia/
scp script.js usuario@tu-servidor.com:/var/www/omcia/
```

### Opción B: Crear directamente en servidor

```bash
sudo nano /var/www/omcia/index.html
# Copiar contenido del archivo index.html

sudo nano /var/www/omcia/styles.css
# Copiar contenido del archivo styles.css

sudo nano /var/www/omcia/script.js
# Copiar contenido del archivo script.js
```

---

## ⚙️ Paso 4: Configurar Virtual Host

### Para Apache

```bash
sudo nano /etc/apache2/sites-available/omcia.conf
```

**Contenido del archivo:**
```apache
<VirtualHost *:80>
    ServerName omcia.tudominio.com
    DocumentRoot /var/www/omcia
    
    <Directory /var/www/omcia>
        AllowOverride All
        Require all granted
        Options -Indexes
    </Directory>
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/omcia_error.log
    CustomLog ${APACHE_LOG_DIR}/omcia_access.log combined
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
```

**Habilitar sitio:**
```bash
sudo a2ensite omcia.conf
sudo systemctl reload apache2
```

### Para Nginx

```bash
sudo nano /etc/nginx/sites-available/omcia
```

**Contenido del archivo:**
```nginx
server {
    listen 80;
    server_name omcia.tudominio.com;
    
    root /var/www/omcia;
    index index.html;
    
    # Security
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static files
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Logs
    access_log /var/log/nginx/omcia_access.log;
    error_log /var/log/nginx/omcia_error.log;
}
```

**Habilitar sitio:**
```bash
sudo ln -s /etc/nginx/sites-available/omcia /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

---

## 🔒 Paso 5: Configurar SSL

### Con Let's Encrypt (Certbot)

**Instalar Certbot:**
```bash
sudo apt update
sudo apt install certbot

# Para Apache
sudo apt install python3-certbot-apache

# Para Nginx
sudo apt install python3-certbot-nginx
```

**Generar certificado:**
```bash
# Para Apache
sudo certbot --apache -d omcia.tudominio.com

# Para Nginx
sudo certbot --nginx -d omcia.tudominio.com
```

**Verificar renovación automática:**
```bash
sudo systemctl status certbot.timer
```

---

## 🔧 Paso 6: Configurar Permisos

```bash
# Cambiar propietario
sudo chown -R www-data:www-data /var/www/omcia

# Configurar permisos
sudo chmod -R 644 /var/www/omcia/*
sudo chmod 755 /var/www/omcia

# Verificar permisos
ls -la /var/www/omcia/
```

---

## 📧 Paso 7: Configurar Formulario (Opcional)

### Crear script PHP para el formulario

```bash
sudo nano /var/www/omcia/process-form.php
```

**Contenido:**
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
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email inválido']);
        exit;
    }
    
    $to = "oscar.iaconsulting@gmail.com";
    $subject = "Contacto desde OmcIA - $name";
    $body = "Nombre: $name\nEmail: $email\nEmpresa: $company\nMensaje: $message";
    $headers = "From: $email\r\nReply-To: $email\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar']);
    }
}
?>
```

---

## ✅ Verificación Final

### Pruebas básicas:

```bash
# Probar configuración web server
sudo apache2ctl configtest  # Para Apache
sudo nginx -t              # Para Nginx

# Ver logs en tiempo real
sudo tail -f /var/log/apache2/omcia_error.log  # Apache
sudo tail -f /var/log/nginx/omcia_error.log    # Nginx
```

### URLs de prueba:
- **HTTP:** `http://omcia.tudominio.com` (debería redirigir a HTTPS)
- **HTTPS:** `https://omcia.tudominio.com`
- **CSS:** `https://omcia.tudominio.com/styles.css`
- **JS:** `https://omcia.tudominio.com/script.js`

### Checklist de verificación:
- [ ] DNS resuelve correctamente
- [ ] Sitio carga en HTTP
- [ ] SSL funciona (HTTPS)
- [ ] CSS se aplica correctamente
- [ ] JavaScript funciona
- [ ] Formulario se muestra
- [ ] Logs no muestran errores

---

## 🔄 Configurar Redirects (Opcional)

### Redirigir dominio principal a subdominio

**En Apache (.htaccess en dominio principal):**
```apache
RewriteEngine On
RewriteRule ^omcia/?$ https://omcia.tudominio.com/ [R=301,L]
```

**En Nginx:**
```nginx
location /omcia {
    return 301 https://omcia.tudominio.com/;
}
```

---

## 🎉 ¡Instalación Completa!

Tu subdominio `omcia.tudominio.com` está ahora funcionando de forma independiente. Para problemas específicos, consulta la [guía de solución de problemas](./solucion-problemas.md).

### Ventajas conseguidas:
- ✅ URL profesional y limpia
- ✅ Rendimiento óptimo
- ✅ SSL independiente
- ✅ Fácil mantenimiento
- ✅ Escalabilidad futura
