
# 🔒 Seguridad Básica para OmcIA

Configuraciones esenciales de seguridad para tu instalación.

## 🛡️ Configurar Firewall

### UFW (Ubuntu Firewall)

```bash
# Verificar estado
sudo ufw status

# Habilitar firewall
sudo ufw enable

# Reglas básicas
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Permitir servicios necesarios
sudo ufw allow ssh
sudo ufw allow 'Apache Full'    # Para Apache
sudo ufw allow 'Nginx Full'     # Para Nginx

# Ver reglas
sudo ufw status numbered
```

---

## 🔐 Configurar .htaccess

### Para Apache

```bash
sudo nano /var/www/html/omcia/.htaccess
```

**Contenido básico:**
```apache
# Redirigir HTTP a HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Headers de seguridad
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Deshabilitar listado de directorios
Options -Indexes

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

## 🚫 Protección contra Ataques (Fail2Ban)

### Instalación

```bash
sudo apt update
sudo apt install fail2ban
```

### Configuración Básica

```bash
sudo nano /etc/fail2ban/jail.local
```

**Contenido:**
```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
ignoreip = 127.0.0.1/8 ::1

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[apache-auth]
enabled = true
port = http,https
logpath = /var/log/apache2/*error.log
```

### Iniciar Servicio

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
sudo systemctl status fail2ban
```

---

## 🔧 Configurar Permisos Seguros

### Permisos Correctos

```bash
# Para sitio independiente
sudo chown -R www-data:www-data /var/www/html/omcia
sudo chmod 755 /var/www/html/omcia
sudo chmod 644 /var/www/html/omcia/*

# Para subdominio
sudo chown -R www-data:www-data /var/www/omcia
sudo chmod 755 /var/www/omcia
sudo chmod 644 /var/www/omcia/*

# Archivos PHP ejecutables
sudo chmod 644 /var/www/html/omcia/process-form.php
```

---

## 🔍 Monitoreo Básico

### Ver Intentos de Acceso

```bash
# Logs de Apache
sudo tail -f /var/log/apache2/access.log

# Logs de autenticación
sudo tail -f /var/log/auth.log

# Estado de Fail2Ban
sudo fail2ban-client status
```

---

## ✅ Verificación de Seguridad

### Herramientas Online

- **SSL Labs:** https://www.ssllabs.com/ssltest/
- **Security Headers:** https://securityheaders.com/

### Comandos de Verificación

```bash
# Verificar SSL
openssl s_client -connect tudominio.com:443

# Verificar headers
curl -I https://tudominio.com/omcia

# Verificar permisos
ls -la /var/www/html/omcia/
```

---

## 🚨 Checklist de Seguridad

- [ ] Firewall configurado y activo
- [ ] .htaccess con headers de seguridad
- [ ] Fail2Ban instalado y funcionando
- [ ] Permisos de archivos correctos
- [ ] SSL/HTTPS funcionando
- [ ] Monitoreo de logs activo

¡Tu instalación OmcIA está ahora protegida! 🛡️
