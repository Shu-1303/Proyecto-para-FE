function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la página');
            }
            return response.text();
        })
        .then(html => {
            // Insertamos el contenido HTML en el contenedor
            document.getElementById('main-content').innerHTML = html;

            // Actualizamos la fecha del input
            const today = new Date().toISOString().split('T')[0];
            const fechaInput = document.getElementById('fecha');
            if (fechaInput) {
                fechaInput.setAttribute('max', today);
            }

            // Gestionamos las pestañas activas
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');  // Elimina la clase 'active' de todas
            });
            
            // Aseguramos que la pestaña correspondiente se marque como 'active'
            const currentTab = Array.from(tabs).find(tab => tab.href && tab.href.includes(page));
            if (currentTab) {
                currentTab.classList.add('active');
            }
        })
        .catch(error => {
            document.getElementById('main-content').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}


// Seleccionamos el carrusel por su ID
var myCarousel = document.getElementById('myCarousel');

// Inicializamos el carrusel con opciones
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 2000,  
    wrap: false       
});

myCarousel.addEventListener('slide.bs.carousel', function () {
    console.log("El carrusel ha cambiado de slide.");
});



