
# ⚙️ Configuración del Servidor

Guía completa para configurar Apache, Nginx, seguridad y optimización del servidor.

## 🌐 Configuración Apache

### Verificar Estado y Módulos

```bash
# Verificar estado
sudo systemctl status apache2

# Ver módulos habilitados
sudo apache2ctl -M

# Habilitar módulos necesarios
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod headers
sudo a2enmod expires
sudo systemctl reload apache2
```

### Configuración Global de Seguridad

**Editar configuración principal:**
```bash
sudo nano /etc/apache2/conf-available/security.conf
```

**Contenido recomendado:**
```apache
# Ocultar versión del servidor
ServerTokens Prod
ServerSignature Off

# Seguridad adicional
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Deshabilitar métodos HTTP peligrosos
<LimitExcept GET POST HEAD>
    deny from all
</LimitExcept>
```

**Habilitar configuración:**
```bash
sudo a2enconf security
sudo systemctl reload apache2
```

### Configuración de .htaccess Global

```bash
sudo nano /var/www/html/.htaccess
```

**Contenido:**
```apache
# Seguridad básica
Options -Indexes
Options -ExecCGI

# Redirigir HTTP a HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache para archivos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    
    # HTML
    ExpiresByType text/html "access plus 1 hour"
    
    # CSS y JavaScript
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType application/x-javascript "access plus 1 year"
    
    # Imágenes
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    
    # Fuentes
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Compresión GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

---

## 🔧 Configuración Nginx

### Configuración Global

```bash
sudo nano /etc/nginx/nginx.conf
```

**Configuración optimizada:**
```nginx
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    # Configuración básica
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Ocultar versión
    server_tokens off;
    
    # MIME types
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Compresión GZIP
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # Headers de seguridad globales
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    
    # Logs
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    
    # Incluir configuraciones de sitios
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### Configuración SSL/TLS

```bash
sudo nano /etc/nginx/conf.d/ssl.conf
```

**Contenido:**
```nginx
# SSL Configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
```

---

## 🔒 Configuración de Firewall

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

# Reglas específicas por puerto
sudo ufw allow 22/tcp           # SSH
sudo ufw allow 80/tcp           # HTTP
sudo ufw allow 443/tcp          # HTTPS

# Ver reglas numeradas
sudo ufw status numbered

# Eliminar regla (ejemplo: regla número 3)
sudo ufw delete 3
```

### Fail2Ban (Protección contra ataques de fuerza bruta)

```bash
# Instalar
sudo apt update
sudo apt install fail2ban

# Configurar
sudo nano /etc/fail2ban/jail.local
```

**Configuración básica:**
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
backend = systemd

[apache-auth]
enabled = true
port = http,https
logpath = /var/log/apache2/*error.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
```

**Iniciar servicio:**
```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
sudo systemctl status fail2ban
```

---

## 📧 Configuración de Email (Postfix)

### Instalación y Configuración Básica

```bash
# Instalar Postfix
sudo apt update
sudo apt install postfix mailutils

# Durante la instalación:
# 1. Seleccionar: "Internet Site"
# 2. System mail name: tudominio.com
```

### Configuración Principal

```bash
sudo nano /etc/postfix/main.cf
```

**Configuración mínima:**
```
# Ver configuración actual
postconf -n

# Configuración básica
myhostname = tudominio.com
mydomain = tudominio.com
myorigin = $mydomain
inet_interfaces = loopback-only
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost

# Configuración de relay (si usas un servicio externo)
relayhost = [smtp.gmail.com]:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_security_level = encrypt
```

### Configurar SMTP con Gmail (Opcional)

```bash
# Crear archivo de credenciales
sudo nano /etc/postfix/sasl_passwd
```

**Contenido:**
```
[smtp.gmail.com]:587 tu-email@gmail.com:tu-app-password
```

**Proteger archivo:**
```bash
sudo chmod 600 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd
sudo systemctl restart postfix
```

### Probar Envío de Email

```bash
# Probar envío
echo "Test message" | mail -s "Test Subject" oscar.iaconsulting@gmail.com

# Ver logs
sudo tail -f /var/log/mail.log
```

---

## 🔧 Optimización del Servidor

### Configuración de Memoria (PHP)

```bash
sudo nano /etc/php/8.1/apache2/php.ini
```

**Optimizaciones recomendadas:**
```ini
memory_limit = 256M
upload_max_filesize = 64M
post_max_size = 64M
max_execution_time = 300
max_input_vars = 3000
```

### Configuración de Base de Datos (MySQL/MariaDB)

```bash
sudo nano /etc/mysql/conf.d/optimization.cnf
```

**Contenido:**
```ini
[mysqld]
innodb_buffer_pool_size = 256M
innodb_log_file_size = 64M
innodb_flush_method = O_DIRECT
query_cache_type = 1
query_cache_size = 64M
```

### Optimización de Sistema

```bash
# Configurar swap (si no existe)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Hacer permanente
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 📊 Monitoreo y Logs

### Configurar Logrotate

```bash
sudo nano /etc/logrotate.d/omcia
```

**Contenido:**
```
/var/log/apache2/omcia*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data adm
    postrotate
        systemctl reload apache2
    endscript
}
```

### Comandos de Monitoreo

```bash
# Ver espacio en disco
df -h

# Ver uso de memoria
free -h

# Ver procesos que más consumen
top
htop

# Ver logs en tiempo real
sudo tail -f /var/log/apache2/access.log
sudo tail -f /var/log/nginx/access.log

# Estadísticas de Apache
sudo apache2ctl status

# Estadísticas de Nginx
curl http://localhost/nginx_status
```

---

## 🔄 Backup Automático

### Script de Backup

```bash
sudo nano /usr/local/bin/backup-omcia.sh
```

**Contenido:**
```bash
#!/bin/bash
BACKUP_DIR="/backup/omcia"
WEB_DIR="/var/www/omcia"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup archivos web
tar -czf $BACKUP_DIR/omcia_web_$DATE.tar.gz -C /var/www omcia

# Backup configuraciones
tar -czf $BACKUP_DIR/omcia_config_$DATE.tar.gz \
    /etc/apache2/sites-available/omcia.conf \
    /etc/nginx/sites-available/omcia

# Limpiar backups antiguos (mantener 7 días)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completado: $DATE"
```

**Hacer ejecutable y programar:**
```bash
sudo chmod +x /usr/local/bin/backup-omcia.sh

# Añadir a crontab
sudo crontab -e
# Añadir línea: 0 2 * * * /usr/local/bin/backup-omcia.sh
```

---

## ✅ Verificación de Configuración

### Checklist de Seguridad

```bash
# Verificar SSL
openssl s_client -connect omcia.tudominio.com:443

# Verificar headers de seguridad
curl -I https://omcia.tudominio.com

# Test de configuración
sudo apache2ctl configtest  # Apache
sudo nginx -t              # Nginx

# Verificar puertos abiertos
sudo netstat -tlnp
```

### Herramientas de Prueba Online

- **SSL Labs:** https://www.ssllabs.com/ssltest/
- **Security Headers:** https://securityheaders.com/
- **GTmetrix:** https://gtmetrix.com/ (rendimiento)
- **PageSpeed Insights:** https://pagespeed.web.dev/

¡Tu servidor está ahora optimizado y seguro para alojar OmcIA!
