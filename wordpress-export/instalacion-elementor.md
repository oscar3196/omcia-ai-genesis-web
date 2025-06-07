
# 📦 Instalación con Elementor

Guía paso a paso para importar la plantilla SOLPORIA en WordPress usando Elementor.

## 🔧 Requisitos Previos

### 1. Verificar WordPress y Elementor

- WordPress 5.0+
- Elementor (versión gratuita o Pro)
- Tema compatible con Elementor

### 2. Verificar Plugins Necesarios

Instalar los siguientes plugins desde **Plugins → Añadir nuevo**:

```
✅ Elementor (REQUERIDO)
✅ Elementor Pro (recomendado para formularios)
📧 Contact Form 7 (alternativa gratuita para formularios)
🎨 Essential Addons for Elementor (opcional, para widgets adicionales)
```

---

## 📥 Importar la Plantilla

### Paso 1: Descargar el Archivo Template

1. Descarga el archivo: `solporia-elementor-template.json`
2. Guarda el archivo en tu ordenador

### Paso 2: Acceder a WordPress

1. Ve a tu panel de WordPress: `https://tudominio.com/wp-admin`
2. Inicia sesión con tu usuario administrador

### Paso 3: Crear Nueva Página

1. **Páginas → Añadir nueva**
2. **Título:** "SOLPORIA - Consultoría en IA"
3. **Editar con Elementor** (botón azul)

### Paso 4: Importar Template

En el editor de Elementor:

1. Click en **⚙️ (configuración)** en la esquina superior izquierda
2. Seleccionar **Importar/Exportar**
3. Click en **Importar Template**
4. **Seleccionar archivo** → Elegir `solporia-elementor-template.json`
5. Click **Importar ahora**
6. Esperar que termine la importación
7. **Insertar** la plantilla importada

### Paso 5: Publicar

1. Click **Actualizar** (botón verde)
2. **Ver página** para confirmar que todo se ve correctamente

---

## 🎨 Personalización Básica

### Cambiar Colores

1. **Seleccionar cualquier elemento**
2. En el panel izquierdo → **Estilo**
3. Modificar colores según tu marca:
   - Azul principal: `#0ea5e9`
   - Fondo oscuro: `#0f172a`
   - Texto claro: `#f8fafc`

### Personalizar Textos

1. **Click en cualquier texto**
2. Modificar directamente en el panel izquierdo
3. **Actualizar** para guardar cambios

### Configurar Formulario

#### Con Elementor Pro:
- El formulario ya está configurado
- Ir a **Elementor → Submissions** para ver mensajes

#### Con Contact Form 7:
1. **Contacto → Formularios de contacto**
2. **Añadir nuevo**
3. Copiar shortcode generado
4. **Editar la sección de contacto** en Elementor
5. **Reemplazar widget Form** por **Shortcode**
6. **Pegar el shortcode** de Contact Form 7

---

## 📱 Verificar Responsive

### Desktop
- Verificar que todo se ve bien en pantalla grande

### Tablet
1. En Elementor, click icono **📱 Tablet**
2. Ajustar espaciados si es necesario
3. Verificar que el menú se ve bien

### Mobile
1. Click icono **📱 Mobile**
2. Verificar menú hamburguesa
3. Ajustar tamaños de texto si es necesario

---

## 🔗 Configurar Menú de Navegación

### Paso 1: Crear Menú

1. **Apariencia → Menús**
2. **Crear un nuevo menú**
3. **Nombre:** "Menú Principal"
4. Añadir elementos:
   ```
   🏠 Inicio (enlace personalizado: #inicio)
   🔧 Servicios (enlace personalizado: #servicios)  
   👥 Nosotros (enlace personalizado: #nosotros)
   📞 Contacto (enlace personalizado: #contacto)
   ```
5. **Guardar menú**

### Paso 2: Asignar al Header

1. **En Elementor** → Editar header
2. **Seleccionar widget Nav Menu**
3. **Menú → Seleccionar "Menú Principal"**
4. **Actualizar**

---

## ⚡ Optimización

### 1. Optimizar Imágenes

- Subir imágenes en formato WebP
- Tamaño máximo recomendado: 1920px ancho
- Comprimir imágenes antes de subir

### 2. Cache

Instalar plugin de cache:
```
🚀 WP Rocket (premium)
🆓 W3 Total Cache (gratuito)
🆓 WP Super Cache (gratuito)
```

### 3. Velocidad

1. **Elementor → Herramientas → General**
2. Activar **"Improved Asset Loading"**
3. **Guardar cambios**

---

## 🆘 Solución de Problemas

### Problema: "Template no se importa"
**Solución:**
- Verificar que Elementor esté actualizado
- Aumentar límite de memoria PHP (contact con hosting)
- Intentar importar desde **Templates → Guardado**

### Problema: "Formulario no funciona"
**Solución:**
- Instalar Contact Form 7
- Configurar SMTP (WP Mail SMTP plugin)
- Verificar email en ajustes de WordPress

### Problema: "Estilos se ven mal"
**Solución:**
- **Elementor → Herramientas → Regenerar CSS**
- Limpiar cache del sitio
- Verificar que no hay conflictos con el tema

### Problema: "Iconos no aparecen"
**Solución:**
- **Elementor → Herramientas → General**
- Activar **"Load Font Awesome 4 Support"**
- **Guardar cambios**

---

## ✅ Checklist Final

- [ ] Template importado correctamente
- [ ] Textos personalizados
- [ ] Colores ajustados a tu marca
- [ ] Formulario funcionando
- [ ] Menú de navegación configurado
- [ ] Responsive verificado en móvil
- [ ] Plugin de cache instalado
- [ ] Página publicada y visible

¡Tu sitio SOLPORIA con Elementor está listo! 🚀

---

## 📞 Soporte

Si necesitas ayuda adicional:

- **Email:** contacto@solporia.com
- **Teléfono:** +34 684 403 453
