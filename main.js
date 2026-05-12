// Estado global de la aplicación
let currentPage = 1;
let totalPages = 0;

const container = document.getElementById('character-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// Función para obtener datos de la API
async function fetchCharacters(page) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        
        totalPages = data.info.pages;
        renderCards(data.results);
        updatePaginationUI();
    } catch (error) {
        console.error("Error cargando personajes:", error);
    }
}

// Función para renderizar las tarjetas en el HTML
function renderCards(characters) {
    container.innerHTML = ""; // Limpiar contenedor

    characters.forEach(char => {
        // Determinar clase de color según estado
        const statusClass = char.status.toLowerCase();

        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <div class="card-content">
                <h3>${char.name}</h3>
                <p>
                    <span class="status-indicator ${statusClass}"></span>
                    ${char.status} - ${char.species}
                </p>
                <p><small>Origen:</small><br>${char.origin.name}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Manejo de la paginación
function updatePaginationUI() {
    pageInfo.innerText = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchCharacters(currentPage);
        window.scrollTo(0, 0); // Volver arriba al cambiar de página
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
        window.scrollTo(0, 0);
    }
});

// Carga inicial
fetchCharacters(currentPage);