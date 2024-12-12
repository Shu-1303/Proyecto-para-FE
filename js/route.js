// Variables globales para el carrito
let cart = [];
let total = 0;

// Función para cargar detalles del producto en el modal
function loadProductDetails(title, price, imageUrl, description) {
  
    document.getElementById('modalProductTitle').innerText = title;
    document.getElementById('modalProductPrice').innerText = `Precio: $${price}`;
    document.getElementById('modalProductImage').src = imageUrl;
    document.getElementById('modalProductImage').alt = title; 
    document.getElementById('modalProductDescription').innerText = description; 

    // Limpieza de mensaje de "Producto añadido"
    document.getElementById('productAddedMessage').innerHTML = '';

    // Contador de cantidad 
    const quantityControl = `
        <div class="d-flex align-items-center">
            <button onclick="updateModalQuantity(-1)" class="btn btn-sm btn-danger">-</button>
            <span id="modalQuantity" class="mx-2">1</span>
            <button onclick="updateModalQuantity(1)" class="btn btn-sm btn-success">+</button>
        </div>
        <p>Cantidad seleccionada: <span id="selectedQuantity">1</span></p>
    `;
    document.getElementById('modalProductQuantity').innerHTML = quantityControl;
}

// Actualización de cantidad
function updateModalQuantity(delta) {
    const quantityElement = document.getElementById('modalQuantity');
    const selectedQuantityElement = document.getElementById('selectedQuantity');
    let quantity = parseInt(quantityElement.innerText);

    // Cantidad máxima de 6
    if (quantity + delta >= 1 && quantity + delta <= 6) {
        quantity += delta;
        quantityElement.innerText = quantity;
        selectedQuantityElement.innerText = quantity;
    } else if (quantity + delta > 6) {
        alert("Límite de productos minoristas alcanzado.");
    }
}

// Añadir producto al carrito desde el modal
function addToCart() {
    // Recupero de información del producto y la cantidad desde el modal
    const title = document.getElementById('modalProductTitle').innerText;
    const price = parseFloat(document.getElementById('modalProductPrice').innerText.replace('Precio: $', ''));
    const imageUrl = document.getElementById('modalProductImage').src;
    const quantity = parseInt(document.getElementById('modalQuantity').innerText);

    // Producto en carrito(verificación)
    const existingProduct = cart.find(item => item.title === title);

    if (existingProduct) {
        // Aumento dela cantidad
        if (existingProduct.quantity + quantity <= 6) {
            existingProduct.quantity += quantity;
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
        } else {
            alert("Límite de productos alcanzado. Compra mayorista detectada.");
            return;
        }
    } else {
        // añadir producto al carrito si no está añadido
        const product = {
            title: title,
            price: price,
            imageUrl: imageUrl,
            quantity: quantity,
            totalPrice: price * quantity // El precio total ( precio unitario * cantidad )
        };
        cart.push(product);
    }

    total += price * quantity; // Actualizazión total
    showCart(); // Actualización del carrito después de añadir el producto
    document.getElementById('productAddedMessage').innerHTML = `<div class="alert alert-success">¡Producto añadido al carrito!</div>`;
}

// Función para mostrar el carrito
function showCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ''; // Limpieza del carrito actual

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('d-flex', 'align-items-center', 'mb-2');
        cartItemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}" class="img-thumbnail" width="50">
            <span class="ms-3">${item.title}</span>
            <span class="ms-auto">
                <button onclick="updateCartQuantity('${item.title}', -1)" class="btn btn-sm btn-danger">-</button>
                ${item.quantity} 
                <button onclick="updateCartQuantity('${item.title}', 1)" class="btn btn-sm btn-success">+</button>
            </span>
            <span class="ms-3">Total: $${item.totalPrice.toFixed(2)}</span>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    // Actualizaci►2n el total
    document.getElementById('cartTotal').innerText = total.toFixed(2);
}

// Función para actualizar la cantidad de un producto en el carrito
function updateCartQuantity(title, delta) {
    const product = cart.find(item => item.title === title);
    if (product) {
        const newQuantity = product.quantity + delta;

        if (newQuantity >= 1 && newQuantity <= 6) {
            product.quantity = newQuantity;
            product.totalPrice = product.price * product.quantity;
            total += delta * product.price; // Incrementar o disminuir el total
            showCart();
        } else if (newQuantity > 6) {
            alert("Límite de productos alcanzado. Compra mayorista detectada.");
        }
    }
}

// Función para simular el pago (con Fetch)
function simulatePayment() {
    // Verificación (si el carrito está vacío)
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de proceder.");
        return;
    }

    // Creación del cuerpo de la solicitud para la simulación (se puede agregar más detalle)
    const paymentData = {
        cartItems: cart, // Lista de productos 
        totalAmount: total.toFixed(2), // Total de la compra
        user: {
            name: "Juan Pérez", 
            email: "juanperez@example.com"
        }
    };

    // Cartel de opciones de forma de pago
    const paymentMethod = prompt("Elige tu forma de pago:\n1. Efectivo\n2. Débito", "1");

    if (!paymentMethod || (paymentMethod !== "1" && paymentMethod !== "2")) {
        alert("Opción no válida. La compra no pudo realizarse.");
        return;
    }

    const paymentMethodText = paymentMethod === "1" ? "Efectivo" : "Débito";
    alert(`Forma de pago seleccionada: ${paymentMethodText}`);

    // Simulación de una solicitud de pago a la API (JSONPlaceholder)
    fetch('https://jsonplaceholder.typicode.com/posts', {  //  endpoint de prueba
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {  // JSONPlaceholder devuelve un ID cuando es exitoso
            alert("Compra realizada con éxito. ¡Gracias por tu compra!");
            cart = [];  // Vaciar carrito
            total = 0;  // Reiniciar total
            showCart();  // Actualización del carrito para mostrar que está vacío
        } else {
            alert("Hubo un error al procesar tu pago. Intenta nuevamente.");
        }
    })
    .catch(error => {
        // En caso de error en la solicitud fetch
        console.error("Error al procesar el pago:", error);
        alert("Error al procesar tu compra. Intenta nuevamente.");
    });
}

// Finalizar la compra
function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        simulatePayment(); // Llamado a la función de simulación de pago
    }
}

// Paso 1: Carga datos de clientes desde JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(clientes => {
    console.log("Agenda de Clientes:");
    clientes.forEach(cliente => {
      console.log(`ID: ${cliente.id}, Nombre: ${cliente.name}, Correo: ${cliente.email}, Teléfono: ${cliente.phone}`);
    });
  })
  .catch(error => console.error("Error al cargar los datos:", error));



// ID
var myCarousel = document.getElementById('myCarousel');

// Carrusel con opciones
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 2000,  
    wrap: false       
});

myCarousel.addEventListener('slide.bs.carousel', function () {
    console.log("El carrusel ha cambiado de slide.");
});

function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la página');
            }
            return response.text();
        })
        .then(html => {
            
            document.getElementById('main-content').innerHTML = html;

            // Actualización de la fecha del input
            const today = new Date().toISOString().split('T')[0];
            const fechaInput = document.getElementById('fecha');
            if (fechaInput) {
                fechaInput.setAttribute('max', today);
            }

            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');  
            });
            
            const currentTab = Array.from(tabs).find(tab => tab.href && tab.href.includes(page));
            if (currentTab) {
                currentTab.classList.add('active');
            }
        })
        .catch(error => {
            document.getElementById('main-content').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}


// Array de productos en formato JSON
//const products = [
   // {
    //    id: 1,
    //    name: "Comida seca para perros",
    //    price: 4500,
    //    image: "https://i.ibb.co/Bj6tGrx/alimento-balanceado.jpg",
   //     description: "Comida seca para perros elaborada con ingredientes de alta calidad."
  //  },
  //  {
  //      id: 2,
  //      name: "Comida húmeda para gatos",
  //      price: 1000,
 //       image: "https://i.ibb.co/QFf05gh/alimento-humedo.jpg",
 //       description: "Comida húmeda para gatos con nutrientes esenciales."
 //   },
 //   {
 //       id: 3,
 //       name: "Snacks naturales",
 //       price: 750,
 //       image: "https://i.ibb.co/NN0jb4w/snacks-saludables.jpg",
 //       description: "Snacks naturales para una merienda saludable para tu mascota."
 //   },
 //   {
 //       id: 4,
 //       name: "Collares y correas",
 //       price: 7000,
 //       image: "https://i.ibb.co/nkwJ9TH/collares-y-correas.jpg",
 //       description: "Collares y correas duraderos para tu mascota."
 //   },
 //   {
  //      id: 5,
 //       name: "Juguetes interactivos",
 //       price: 1000,
 //       image: "https://i.ibb.co/1nCRvsD/juguetes-didacticos.jpg",
 //       description: "Juguetes interactivos que mejoran el desarrollo mental de tu mascota."
 //   },
 //   {
 //       id: 6,
 //       name: "Camas y refugios",
 //       price: 10000,
 //       image: "https://i.ibb.co/jWWQ6RL/camas-y-refugioso.png",
 //       description: "Camas y refugios cómodos para tu mascota."
 //   }
//];

//function loadProductDetails(title, price, imageUrl, description) {
   // document.getElementById('modalProductTitle').innerText = title;
   // document.getElementById('modalProductPrice').innerText = `Precio: $${price}`;
   // document.getElementById('modalProductImage').src = imageUrl;
   // document.getElementById('modalProductImage').alt = title; // 
   // document.getElementById('modalProductDescription').innerText = description; // Descripción ampliada del producto

    // Ocultar mensaje "Producto añadido" (por si había algún mensaje anterior)
   // document.getElementById('productAddedMessage').innerHTML = '';
//}

