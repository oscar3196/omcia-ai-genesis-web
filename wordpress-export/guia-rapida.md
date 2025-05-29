
# 🚀 Guía Rápida: Instalación OmcIA

## 📋 Antes de Empezar

### Verificar Acceso al VPS
```bash
# Conectar por SSH
ssh usuario@tu-servidor.com
# O con IP directa
ssh root@123.456.789.10
```

### Verificar Estado del Servidor Web
```bash
# Para Apache
sudo systemctl status apache2

# Para Nginx
sudo systemctl status nginx

# Ver qué está corriendo en puerto 80
sudo netstat -tlnp | grep :80
```

---

## ⚡ Instalación Express (5 minutos)

### Para Sitio Independiente (Recomendado)

```bash
# 1. Navegar al directorio web
cd /var/www/html

# 2. Crear directorio
sudo mkdir omcia
cd omcia

# 3. Crear archivos (copiar contenido de los archivos originales)
sudo nano index.html
sudo nano styles.css
sudo nano script.js

# 4. Configurar permisos
sudo chown -R www-data:www-data /var/www/html/omcia
sudo chmod -R 644 /var/www/html/omcia/*
sudo chmod 755 /var/www/html/omcia

# 5. Probar
# Visitar: https://tudominio.com/omcia
```

---

## 🔄 Otras Opciones de Instalación

Para instalaciones más específicas, consulta:

- **[📁 Sitio Independiente Detallado](./instalacion-sitio-independiente.md)**
- **[🔗 Integración WordPress](./instalacion-wordpress.md)**
- **[🌐 Subdominio Dedicado](./instalacion-subdominio.md)**

---

## 🆘 ¿Problemas?

- **[🔧 Configuración del Servidor](./configuracion-servidor.md)**
- **[🆘 Solución de Problemas](./solucion-problemas.md)**

---

## 📞 Soporte

- **Email:** oscar.iaconsulting@gmail.com
- **Teléfono:** +34 684 403 453

¡Tu sitio OmcIA estará funcionando en minutos! 🚀
