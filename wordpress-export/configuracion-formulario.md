
# 📧 Configuración del Formulario de Contacto

Guía para hacer funcional el formulario de contacto de OmcIA.

## 🎯 Crear Script PHP

### Paso 1: Crear process-form.php

```bash
sudo nano /var/www/html/omcia/process-form.php
```

**Contenido del archivo:**
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

## 📬 Configurar Email del Servidor

### Instalar Postfix

```bash
sudo apt update
sudo apt install postfix mailutils

# Durante la instalación:
# - Seleccionar: Internet Site
# - System mail name: tudominio.com
```

### Configuración Básica

```bash
sudo nano /etc/postfix/main.cf
```

**Configuración mínima:**
```
myhostname = tudominio.com
mydomain = tudominio.com
myorigin = $mydomain
inet_interfaces = loopback-only
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost
```

### Reiniciar Servicio

```bash
sudo systemctl restart postfix
sudo systemctl enable postfix
```

---

## 🧪 Probar Funcionamiento

### Test de Email

```bash
echo "Test email desde OmcIA" | mail -s "Test Subject" oscar.iaconsulting@gmail.com
```

### Ver Logs

```bash
sudo tail -f /var/log/mail.log
```

---

## 🔧 Configuración Avanzada con Gmail SMTP

### Crear Credenciales

```bash
sudo nano /etc/postfix/sasl_passwd
```

**Contenido:**
```
[smtp.gmail.com]:587 tu-email@gmail.com:tu-app-password
```

### Configurar Postfix para Gmail

```bash
sudo nano /etc/postfix/main.cf
```

**Añadir:**
```
relayhost = [smtp.gmail.com]:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_security_level = encrypt
```

### Proteger y Aplicar

```bash
sudo chmod 600 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd
sudo systemctl restart postfix
```

---

## ✅ Verificación

### Checklist:
- [ ] Archivo `process-form.php` creado
- [ ] Postfix instalado y configurado
- [ ] Email de prueba enviado exitosamente
- [ ] Logs no muestran errores
- [ ] Formulario web funciona correctamente

¡Tu formulario de contacto ya está funcional! 📧
