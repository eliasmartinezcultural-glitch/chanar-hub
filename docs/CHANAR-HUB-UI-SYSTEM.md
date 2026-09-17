# Chañar HUB — Sistema visual y de usabilidad

## Idea central

Chañar HUB debe sentirse como **un vecino que ayuda a otro vecino o a una persona que acaba de llegar a San Patricio del Chañar**.

No es una interfaz tecnológica para demostrar tecnología. La tecnología queda detrás; adelante queda la ayuda.

## Principios obligatorios

1. **Primero entender, después navegar.**
2. **Una pantalla debe explicar qué hacer sin manual.**
3. **Una acción principal por bloque.**
4. **Lenguaje cotidiano de Argentina y de Chañar.**
5. **No hacer sentir torpe al usuario.**
6. **Simplicidad sin infantilizar.**
7. **Los datos dudosos se señalan; nunca se inventan.**
8. **Los botones deben poder tocarse cómodamente desde un teléfono.**
9. **La información importante debe existir también sin depender de iconos.**
10. **Volver debe ser siempre fácil y predecible.**

## Personalidad

- Cercana
- Clara
- Local
- Tranquila
- Útil
- Respetuosa

## Voz

Preferir:

- “¿Qué necesitás?”
- “Te ayudamos a encontrarlo.”
- “Cómo llegar”
- “Llamar”
- “Por ahora no encontramos ese dato.”
- “No pasa nada. Probá otra búsqueda.”

Evitar:

- “Seleccione una categoría”
- “Resultados de consulta”
- “Geolocalización” cuando pueda decirse “ubicación”
- “Error de sistema” cuando pueda explicarse el problema en lenguaje común
- textos que responsabilicen al usuario por no saber usar la web

## Accesibilidad práctica

- Base tipográfica mínima: 18 px en las interfaces de usuario principales.
- Botones táctiles: mínimo 50–52 px de alto.
- Inputs: mínimo 54 px de alto.
- Foco de teclado visible y de alto contraste.
- No usar información esencial solo mediante hover.
- No usar botones únicamente con iconos cuando una palabra pueda aclarar la acción.
- Evitar carruseles y animaciones como mecanismo de navegación.
- Respetar `prefers-reduced-motion`.
- En móvil, priorizar una columna y acciones de ancho completo.

## Identidad local

La identidad visual se inspira en elementos reconocibles del territorio sin convertirlos en decoración excesiva:

- chacras
- hojas y vegetación
- uva y producción vitivinícola
- tierra
- río
- caminos
- paisaje rural
- papel y materiales cotidianos

La estética buscada es **casera y cuidada**, no improvisada ni corporativa.

## Sistema de color

- Hoja / verde principal: `#355b3d`
- Verde oscuro: `#284731`
- Tierra: `#7b5738`
- Crema: `#f7efd9`
- Papel: `#fffaf0`
- Oro: `#e8bd55`
- Azul de foco/accesibilidad: `#2f6976`
- Rojo de emergencia: `#a83e32`
- Tinta: `#243027`
- Texto secundario: `#5f6c61`
- Borde: `#d6c6a7`

## Arquitectura de navegación

La navegación pública debe mantenerse pequeña:

**Inicio → Viajero / Vecinos / Mapa**

Las funciones de auditoría, fuentes y control de calidad son infraestructura del proyecto, no deben competir visualmente con las necesidades de una persona común.

## Regla de contenido

Antes de publicar una ficha preguntar:

- ¿Qué es?
- ¿Dónde está?
- ¿Cómo lo sabemos?
- ¿Para qué le sirve a la persona?
- ¿El dato puede haber cambiado?

## Prueba de usuario mínima

Cada pantalla debe superar esta prueba:

> Entregar el teléfono a una persona de aproximadamente 70 años que usa poco internet y pedirle que encuentre una cosa concreta sin darle instrucciones.

Si necesita explicación verbal para completar una tarea básica, la pantalla todavía necesita simplificación.

## Regla de evolución

No agregar botones, tarjetas, colores o animaciones solo porque pueden agregarse.

Cada elemento nuevo debe justificar al menos una de estas funciones:

- resolver
- orientar
- explicar
- verificar
- conectar

Si no cumple ninguna, probablemente sobra.
