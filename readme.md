**Autor** Sabrina Emmanuelli
**Contenido** Mi proyecto para FEJS (aprendizaje)
**Version**0.0.1
Explicación de los Estilos
Reset de Estilos
Se utiliza la siguiente regla CSS para resetear los estilos por defecto de los elementos:

css
 {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
Esto asegura que los elementos no tengan márgenes ni rellenos no deseados, y que el tamaño de los elementos sea más predecible.

Estilos Generales
Se aplican estilos básicos al cuerpo, encabezados, navegación, contenedores y pies de página, con algunas particularidades según la sección. Se utilizan algunas APIs de base para mejorar la funcionalidad.

Media Queries
Se están realizando pruebas con @media queries para adaptar el diseño a diferentes dispositivos. Los ajustes se basan en las dimensiones en píxeles de cada dispositivo, siguiendo lineamientos generales de diseño responsivo.

JavaScript
Carga Dinámica de Contenido
Se ha implementado JavaScript para cargar dinámicamente el contenido de las páginas sin necesidad de recargar la página completa. Esto mejora significativamente la experiencia del usuario.

Interactividad
Al enviar formularios, se muestra un mensaje de alerta. Esta funcionalidad puede ser reemplazada por lógica de envío real en el futuro.

Navegación
El uso de la función loadPage facilita la navegación entre las diferentes secciones del sitio

**Version**0.1.0
Se realizan algunas mínimas modificaciones en el css luego de haber observado el sitio desde diferentes dispositivos y navegadores. Por ahora se sigue priorizando el estilo interno con APIS de base.  Se añaden los primeros frameworks.

**Autor** Sabrina Emmanuelli
**Contenido** Mi proyecto para FEJS (aprendizaje)
**Version**0.1.1

Estilos Generales
Se fusionan estilos con bootstrap.  Se mantienen las Media Queries por consigna.

Javascript
Carga dinámica de contenido con detalle de productos para la creación de un carrito de compras.  Manipulación del DOM, session storage y local storage.  Se añaden API's con fetch y Json para brindarle realismo. Asimismo, se utiliza la API placeholder para cargar una agenda interna.

Interactividad
Se añaden funcionalidades a las ya creadas en la versión anterior.

Navegación
Se mantiene la función loadPage. asimismo, se eliminan las páginas de inicio para agilizar la navegaci♀n, y la de contacto, preservando el contenido mediante traslado al Index.
