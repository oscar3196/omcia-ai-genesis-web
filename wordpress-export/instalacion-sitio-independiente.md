
# 📁 Instalación como Sitio Independiente

Esta es la opción **más sencilla y recomendada** para instalar OmcIA en tu VPS.

## 🎯 Pasos de Instalación

### 1. Conectar al Servidor

```bash
# Conectar por SSH
ssh usuario@tu-servidor.com
# O con IP directa
ssh root@123.456.789.10
```

### 2. Navegar al Directorio Web

```bash
# Ubicaciones comunes del directorio web
cd /var/www/html/           # Apache Ubuntu/Debian
# cd /var/www/               # Algunas configuraciones
# cd /home/usuario/public_html/  # cPanel/hosting compartido
```

### 3. Crear Directorio para OmcIA

```bash
sudo mkdir omcia
cd omcia
```

### 4. Subir Archivos

**Opción A - Desde tu PC con SCP:**
```bash
# Desde tu computadora local
scp index.html usuario@tu-servidor.com:/var/www/html/omcia/
scp styles.css usuario@tu-servidor.com:/var/www/html/omcia/
scp script.js usuario@tu-servidor.com:/var/www/html/omcia/
```

**Opción B - Crear archivos directamente en el servidor:**
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

**Opción C - Con wget (si tienes los archivos en línea):**
```bash
wget https://tudominio.com/archivos/index.html
wget https://tudominio.com/archivos/styles.css
wget https://tudominio.com/archivos/script.js
```

### 5. Configurar Permisos

```bash
# Cambiar propietario a www-data (usuario web)
sudo chown -R www-data:www-data /var/www/html/omcia

# Configurar permisos de archivos
sudo chmod -R 644 /var/www/html/omcia/*

# Configurar permisos de directorio
sudo chmod 755 /var/www/html/omcia
```

### 6. Verificar Instalación

**Comprobar archivos:**
```bash
ls -la /var/www/html/omcia/
# Deberías ver: index.html, styles.css, script.js
```

**Acceder al sitio:**
- URL: `https://tudominio.com/omcia`
- Verifica que:
  - ✅ La página carga correctamente
  - ✅ Los estilos se aplican (colores azules, gradientes)
  - ✅ El menú móvil funciona
  - ✅ El formulario se muestra

## 🔒 Configuración de Seguridad (Opcional)

### Crear archivo .htaccess

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

## 📧 Hacer Funcional el Formulario

El formulario actualmente es solo frontend. Para hacerlo funcional:

### Crear process-form.php

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

## ✅ Verificación Final

### Checklist de verificación:
- [ ] Sitio web carga en `https://tudominio.com/omcia`
- [ ] CSS se aplica correctamente (colores azules, gradientes)
- [ ] JavaScript funciona (menú móvil, scroll suave)
- [ ] Formulario se muestra correctamente
- [ ] SSL está activo (candado verde en navegador)
- [ ] Permisos configurados correctamente

### URLs de prueba:
- **Principal:** `https://tudominio.com/omcia`
- **CSS:** `https://tudominio.com/omcia/styles.css`
- **JS:** `https://tudominio.com/omcia/script.js`

## 🎉 ¡Instalación Completa!

Tu sitio OmcIA ya está funcionando como sitio independiente. Para problemas comunes, consulta la [guía de solución de problemas](./solucion-problemas.md).
