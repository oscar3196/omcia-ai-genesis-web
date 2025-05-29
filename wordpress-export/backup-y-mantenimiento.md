
# 🔄 Backup y Mantenimiento

Guía para mantener tu instalación OmcIA segura y actualizada.

## 💾 Configurar Backup Automático

### Script de Backup

```bash
sudo nano /usr/local/bin/backup-omcia.sh
```

**Contenido del script:**
```bash
#!/bin/bash
BACKUP_DIR="/backup/omcia"
WEB_DIR="/var/www/html/omcia"  # o /var/www/omcia para subdominio
DATE=$(date +%Y%m%d_%H%M%S)

# Crear directorio de backup
mkdir -p $BACKUP_DIR

# Backup archivos web
tar -czf $BACKUP_DIR/omcia_web_$DATE.tar.gz -C /var/www/html omcia

# Backup configuraciones
tar -czf $BACKUP_DIR/omcia_config_$DATE.tar.gz \
    /etc/apache2/sites-available/omcia.conf \
    /etc/nginx/sites-available/omcia \
    /var/www/html/omcia/.htaccess 2>/dev/null

# Limpiar backups antiguos (mantener 7 días)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completado: $DATE"
logger "OmcIA backup completed: $DATE"
```

### Hacer Ejecutable

```bash
sudo chmod +x /usr/local/bin/backup-omcia.sh
```

### Programar Backup Automático

```bash
sudo crontab -e
```

**Añadir línea:**
```
# Backup diario a las 2:00 AM
0 2 * * * /usr/local/bin/backup-omcia.sh
```

---

## 🔄 Mantenimiento Regular

### Script de Mantenimiento

```bash
sudo nano /usr/local/bin/maintenance-omcia.sh
```

**Contenido:**
```bash
#!/bin/bash
echo "=== Mantenimiento OmcIA ==="
echo "Fecha: $(date)"

# Actualizar sistema
echo "Actualizando sistema..."
apt update && apt upgrade -y

# Limpiar logs antiguos
echo "Limpiando logs..."
find /var/log -name "*.log" -mtime +30 -delete

# Verificar espacio en disco
echo "Espacio en disco:"
df -h

# Verificar estado de servicios
echo "Estado de servicios:"
systemctl status apache2 nginx postfix fail2ban

# Verificar SSL
echo "Verificando SSL..."
certbot renew --quiet

# Verificar permisos
echo "Verificando permisos..."
chown -R www-data:www-data /var/www/html/omcia
chmod 755 /var/www/html/omcia
chmod 644 /var/www/html/omcia/*

echo "=== Mantenimiento completado ==="
```

### Programar Mantenimiento

```bash
sudo chmod +x /usr/local/bin/maintenance-omcia.sh

# Añadir a crontab (semanal, domingos a las 3:00 AM)
sudo crontab -e
```

**Añadir:**
```
0 3 * * 0 /usr/local/bin/maintenance-omcia.sh >> /var/log/omcia-maintenance.log 2>&1
```

---

## 📊 Monitoreo

### Script de Monitoreo

```bash
sudo nano /usr/local/bin/monitor-omcia.sh
```

**Contenido:**
```bash
#!/bin/bash
SITE_URL="https://tudominio.com/omcia"
LOG_FILE="/var/log/omcia-monitor.log"

# Verificar que el sitio responde
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL)

if [ $HTTP_CODE -eq 200 ]; then
    echo "$(date): Sitio OK - HTTP $HTTP_CODE" >> $LOG_FILE
else
    echo "$(date): ERROR - HTTP $HTTP_CODE" >> $LOG_FILE
    # Enviar alerta por email
    echo "El sitio OmcIA no responde correctamente. HTTP: $HTTP_CODE" | \
    mail -s "Alerta OmcIA" oscar.iaconsulting@gmail.com
fi

# Verificar espacio en disco
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "$(date): Advertencia - Espacio en disco: ${DISK_USAGE}%" >> $LOG_FILE
fi
```

### Programar Monitoreo

```bash
sudo chmod +x /usr/local/bin/monitor-omcia.sh

# Monitoreo cada 15 minutos
sudo crontab -e
```

**Añadir:**
```
*/15 * * * * /usr/local/bin/monitor-omcia.sh
```

---

## 🔄 Restaurar desde Backup

### Proceso de Restauración

```bash
# Listar backups disponibles
ls -la /backup/omcia/

# Detener servidor web
sudo systemctl stop apache2  # o nginx

# Restaurar archivos
cd /var/www/html
sudo rm -rf omcia
sudo tar -xzf /backup/omcia/omcia_web_YYYYMMDD_HHMMSS.tar.gz

# Restaurar permisos
sudo chown -R www-data:www-data omcia
sudo chmod 755 omcia
sudo chmod 644 omcia/*

# Reiniciar servidor
sudo systemctl start apache2  # o nginx
```

---

## 📋 Checklist de Mantenimiento

### Semanal
- [ ] Verificar logs de errores
- [ ] Comprobar espacio en disco
- [ ] Revisar backups completados
- [ ] Verificar funcionamiento del sitio

### Mensual
- [ ] Actualizar sistema operativo
- [ ] Renovar certificados SSL
- [ ] Revisar configuración de seguridad
- [ ] Limpiar logs antiguos

### Trimestral
- [ ] Revisar y actualizar scripts
- [ ] Verificar configuración de backup
- [ ] Auditoría de seguridad
- [ ] Optimización de rendimiento

---

## 📞 Logs Importantes

### Ubicaciones de Logs

```bash
# Logs del sistema
/var/log/syslog
/var/log/auth.log

# Logs del servidor web
/var/log/apache2/access.log
/var/log/apache2/error.log
/var/log/nginx/access.log
/var/log/nginx/error.log

# Logs de email
/var/log/mail.log

# Logs personalizados
/var/log/omcia-monitor.log
/var/log/omcia-maintenance.log
```

¡Tu instalación OmcIA está ahora completamente mantenida! 🔄
