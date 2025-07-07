// Variables globales para el estado de la aplicación
const fullText = 'Bienvenido a Mi Apk/Ser:D';
let displayText = '';
let isDeleting = false;
let currentIndex = 0;
let typingInterval;
let currentPhrase = '';
let favorites = [];
let customPhrases = [];

// Frases motivacionales categorizadas
const categorizedPhrases = {
    riqueza: [
        "El dinero fluye hacia mí de manera natural y abundante.",
        "Soy un imán para la riqueza y la prosperidad.",
        "Cada día mi abundancia financiera se multiplica.",
        "Merezco tener todo el dinero que deseo.",
        "La riqueza es mi estado natural de ser.",
        "Atraigo oportunidades de dinero constantemente.",
        "Mi mente está programada para la abundancia.",
        "El universo conspira para mi éxito financiero.",
        "Soy digno de recibir grandes cantidades de dinero.",
        "La prosperidad económica es mi destino."
    ],
    amor_propio: [
        "Me amo y me acepto tal como soy.",
        "Soy suficiente y completo en este momento.",
        "Merezco amor, respeto y felicidad.",
        "Mi valor no depende de las opiniones de otros.",
        "Soy único, especial y valioso.",
        "Me trato con la misma bondad que trato a otros.",
        "Soy digno de recibir todo lo bueno de la vida.",
        "Mi autoestima crece cada día más.",
        "Me permito ser feliz y disfrutar de la vida.",
        "Soy mi mejor amigo y mi mayor apoyo."
    ],
    energia: [
        "Mi energía es ilimitada y poderosa.",
        "Me siento lleno de vitalidad y fuerza.",
        "Cada mañana me despierto con energía renovada.",
        "Mi cuerpo está lleno de energía positiva.",
        "La energía del universo fluye a través de mí.",
        "Soy una fuente inagotable de energía.",
        "Mi entusiasmo y pasión me impulsan hacia adelante.",
        "Me siento energizado y motivado todo el día.",
        "La energía positiva me rodea y me protege.",
        "Soy un canal de energía divina y poderosa."
    ],
    disciplina: [
        "Soy disciplinado y comprometido con mis metas.",
        "Cada día me acerco más a mis objetivos.",
        "Mi determinación es más fuerte que cualquier obstáculo.",
        "Mantengo el enfoque en lo que realmente importa.",
        "Soy consistente en mis acciones y decisiones.",
        "La disciplina es mi superpoder.",
        "Me comprometo con la excelencia en todo lo que hago.",
        "Mi voluntad es inquebrantable.",
        "Soy el dueño de mis hábitos y mi destino.",
        "La constancia me lleva al éxito."
    ]
};

// Frases motivacionales predefinidas (para compatibilidad)
const phrases = [
    "¿Qué energía necesito para recibir más dinero?",
    "El dinero fluye hacia mí de manera natural y abundante.",
    "Soy un imán para la riqueza y la prosperidad.",
    "Cada día mi abundancia financiera se multiplica.",
    "Merezco tener todo el dinero que deseo.",
    "La riqueza es mi estado natural de ser.",
    "Atraigo oportunidades de dinero constantemente.",
    "Mi mente está programada para la abundancia.",
    "El universo conspira para mi éxito financiero.",
    "Soy digno de recibir grandes cantidades de dinero.",
    "La prosperidad económica es mi destino.",
    "Me amo y me acepto tal como soy.",
    "Soy suficiente y completo en este momento.",
    "Merezco amor, respeto y felicidad.",
    "Mi valor no depende de las opiniones de otros.",
    "Soy único, especial y valioso.",
    "Me trato con la misma bondad que trato a otros.",
    "Soy digno de recibir todo lo bueno de la vida.",
    "Mi autoestima crece cada día más.",
    "Me permito ser feliz y disfrutar de la vida.",
    "Soy mi mejor amigo y mi mayor apoyo.",
    "Mi energía es ilimitada y poderosa.",
    "Me siento lleno de vitalidad y fuerza.",
    "Cada mañana me despierto con energía renovada.",
    "Mi cuerpo está lleno de energía positiva.",
    "La energía del universo fluye a través de mí.",
    "Soy una fuente inagotable de energía.",
    "Mi entusiasmo y pasión me impulsan hacia adelante.",
    "Me siento energizado y motivado todo el día.",
    "La energía positiva me rodea y me protege.",
    "Soy un canal de energía divina y poderosa.",
    "Soy disciplinado y comprometido con mis metas.",
    "Cada día me acerco más a mis objetivos.",
    "Mi determinación es más fuerte que cualquier obstáculo.",
    "Mantengo el enfoque en lo que realmente importa.",
    "Soy consistente en mis acciones y decisiones.",
    "La disciplina es mi superpoder.",
    "Me comprometo con la excelencia en todo lo que hago.",
    "Mi voluntad es inquebrantable.",
    "Soy el dueño de mis hábitos y mi destino.",
    "La constancia me lleva al éxito."
];

const motivationalPhrases = [
    "Tú eres más fuerte de lo que crees.",
    "Cada día es una nueva oportunidad para brillar.",
    "Tu potencial es ilimitado.",
    "Eres capaz de lograr todo lo que te propongas.",
    "La confianza en ti mismo es tu superpoder.",
    "Cada paso que das te acerca a tus sueños.",
    "Tu determinación inspira a otros.",
    "Eres un ser extraordinario.",
    "Tu luz interior ilumina el camino de otros.",
    "Eres más valiente de lo que crees."
];

/**
 * Inicia el efecto de máquina de escribir en el texto de bienvenida
 * con animación de cursor y ciclo de escritura/borrado.
 */
function startTypingCycle() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const delay = 150;
    
    // Agregar cursor inicial
    typingElement.innerHTML = '<span class="cursor">|</span>';
    
    typingInterval = setInterval(() => {
        if (!isDeleting) {
            // Efecto de escritura
            displayText = fullText.substring(0, currentIndex + 1);
            currentIndex++;
            
            if (currentIndex === fullText.length) {
                // Pausa al completar el texto
                clearInterval(typingInterval);
                setTimeout(() => {
                    isDeleting = true;
                    startTypingCycle();
                }, 2500);
            }
        } else {
            // Efecto de borrado
            displayText = fullText.substring(0, currentIndex - 1);
            currentIndex--;
            
            if (currentIndex === 0) {
                // Reinicia el ciclo
                clearInterval(typingInterval);
                isDeleting = false;
                setTimeout(() => {
                    startTypingCycle();
                }, 1000);
            }
        }
        
        // Actualizar el elemento con el cursor
        typingElement.innerHTML = displayText + '<span class="cursor">|</span>';
    }, delay);
}

/**
 * Obtiene una frase aleatoria de las disponibles y la muestra con animación
 */
function getRandomPhrase() {
    showEnergyOverlay();
    
    setTimeout(() => {
        const allPhrases = [...phrases, ...customPhrases];
        const randomIndex = Math.floor(Math.random() * allPhrases.length);
        const randomPhrase = allPhrases[randomIndex];
        currentPhrase = randomPhrase;
        
        const phraseElement = document.getElementById('currentPhrase');
        if (!phraseElement) return;
        
        // Reinicia la animación para el nuevo texto
        phraseElement.style.animation = 'none';
        phraseElement.offsetHeight; // Trigger reflow
        phraseElement.style.animation = 'fadeInText 1s ease-in-out forwards';
        
        phraseElement.textContent = `"${randomPhrase}"`;
        hideEnergyOverlay();
        speakText(randomPhrase);
        
        // Efecto de confeti si está disponible
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, 2000);
}

/**
 * Utiliza la API de síntesis de voz para leer el texto en voz alta
 * @param {string} text - Texto a ser leído
 */
function speakText(text) {
    if (window.cordova && window.TTS) {
        // Usar el plugin nativo Cordova TTS en móvil
        window.TTS.speak({
            text: text,
            locale: 'es-ES',
            rate: 1.0
        }, function () {
            // Éxito
            // Opcional: podrías actualizar el botón aquí si quieres
        }, function (error) {
            showFeedback('Error al reproducir voz: ' + error, 'error');
        });
    } else if ('speechSynthesis' in window) {
        // Fallback web
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        // Actualizar el botón durante la reproducción
        utterance.onstart = () => {
            const speakButton = document.querySelector('.speak-button');
            if (speakButton) {
                speakButton.innerHTML = '⏹ Detener';
                speakButton.classList.add('speaking');
            }
        };
        utterance.onend = () => {
            const speakButton = document.querySelector('.speak-button');
            if (speakButton) {
                speakButton.innerHTML = '🔊 Repetir frase';
                speakButton.classList.remove('speaking');
            }
        };
        speechSynthesis.speak(utterance);
    } else {
        alert('La síntesis de voz no está soportada en tu navegador');
    }
}

/**
 * Detiene la reproducción de voz actual
 */
function stopSpeaking() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
}

/**
 * Agrega la frase actual a favoritos con feedback visual
 */
function addToFavorites() {
    if (!currentPhrase) return;
    
    if (!favorites.includes(currentPhrase)) {
        favorites.push(currentPhrase);
        updateFavoritesList();
        saveFavoritesToStorage();
        
        // Feedback visual
        const favoriteButton = document.querySelector('.favorite-button');
        if (favoriteButton) {
            favoriteButton.innerHTML = '❤️ Guardada!';
            setTimeout(() => {
                favoriteButton.innerHTML = '⭐ Guardar favorita';
            }, 2000);
        }
        
        // Efecto de estrella
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.6 },
                shapes: ['star']
            });
        }
    } else {
        alert('Esta frase ya está en tus favoritos');
    }
}

/**
 * Actualiza la lista visual de frases favoritas
 */
function updateFavoritesList() {
    const containers = [
        document.getElementById('favoritesList'),
        document.getElementById('favoritesListScreen')
    ];

    containers.forEach(container => {
        if (!container) return;

        container.innerHTML = '';

        if (favorites.length > 0) {
            const title = document.createElement('h3');
            title.textContent = '⭐ Mis Favoritos';
            title.style.color = '#ff85cc';
            title.style.marginBottom = '15px';
            container.appendChild(title);

            favorites.forEach((fav, index) => {
                const favItem = document.createElement('div');
                favItem.className = 'favorite-item';

                const favText = document.createElement('span');
                favText.textContent = fav;
                favText.onclick = () => speakText(fav);

                const deleteBtn = document.createElement('span');
                deleteBtn.innerHTML = '❌';
                deleteBtn.className = 'delete-favorite';
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    removeFavorite(index);
                };

                favItem.appendChild(favText);
                favItem.appendChild(deleteBtn);
                container.appendChild(favItem);
            });
        } else {
            const noFavs = document.createElement('p');
            noFavs.className = 'no-favorites';
            noFavs.textContent = 'No tienes frases favoritas aún.';
            container.appendChild(noFavs);
        }
    });
}


/**
 * Elimina una frase de favoritos
 * @param {number} index - Índice de la frase a eliminar
 */
function removeFavorite(index) {
    favorites.splice(index, 1);
    updateFavoritesList();
    saveFavoritesToStorage();
}

/**
 * Guarda las frases favoritas y personalizadas en localStorage
 */
function saveFavoritesToStorage() {
    try {
        localStorage.setItem('motivationalFavorites', JSON.stringify(favorites));
        localStorage.setItem('customPhrases', JSON.stringify(customPhrases));
    } catch (e) {
        console.log('Error al guardar en localStorage:', e);
    }
}

/**
 * Carga las frases favoritas y personalizadas desde localStorage
 */
function loadFromStorage() {
    try {
        const savedFavorites = localStorage.getItem('motivationalFavorites');
        const savedCustomPhrases = localStorage.getItem('customPhrases');
        
        if (savedFavorites) {
            favorites = JSON.parse(savedFavorites);
            updateFavoritesList();
        }
        
        if (savedCustomPhrases) {
            customPhrases = JSON.parse(savedCustomPhrases);
        }
    } catch (e) {
        console.log('Error al cargar desde localStorage:', e);
    }
}

/**
 * Oculta la pantalla de carga con animación
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Añade clase para iniciar la animación de salida
        loadingScreen.classList.add('hidden');
        
        // Elimina el elemento después de que termine la animación
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Debe coincidir con la duración de la transición CSS
    }
}

/**
 * Muestra u oculta el estado de carga global
 * @param {boolean} loading - True para mostrar carga, false para ocultar
 */
function setLoading(loading) {
    if (loading) {
        document.body.classList.add('app-loading');
    } else {
        document.body.classList.remove('app-loading');
    }
}

/**
 * Muestra un overlay de energía con animación
 */
function showEnergyOverlay() {
    const existingOverlay = document.getElementById('energyOverlay');
    if (existingOverlay) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'energyOverlay';
    overlay.className = 'energy-overlay active';
    overlay.innerHTML = `
        <div class="energy-text">✨ Recibiendo energía universal...</div>
        <div class="energy-animation">
            <div class="energy-particle"></div>
            <div class="energy-particle"></div>
            <div class="energy-particle"></div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Inicia la animación de la barra de progreso
    setTimeout(() => {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = '100%';
        }
    }, 100);
}

/**
 * Oculta el overlay de energía
 */
function hideEnergyOverlay() {
    const overlay = document.getElementById('energyOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
}

/**
 * Configura los event listeners principales de la aplicación
 */
function setupEventListeners() {
    // Botón de frase aleatoria
    document.getElementById('randomPhraseBtn')?.addEventListener('click', getRandomPhrase);
    
    // Botón de hablar/repetir frase
    document.getElementById('repeatPhraseBtn')?.addEventListener('click', function() {
        if (currentPhrase) {
            speakText(currentPhrase);
        }
    });
    
    // Botón de agregar a favoritos
    document.getElementById('addFavoriteBtn')?.addEventListener('click', addToFavorites);
    
    // Navegación por pestañas
    document.querySelectorAll('.tab-item').forEach(item => {
        item.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            showScreen(screenId);
        });
    });
}

/**
 * Muestra una pantalla específica con animación
 * @param {string} screenId - ID de la pantalla a mostrar
 */
function showScreen(screenId) {
    const currentActive = document.querySelector('.screen.active');
    const newScreen = document.getElementById(screenId);
    
    if (currentActive) {
        currentActive.classList.remove('active');
        currentActive.classList.add('fade-out');
        
        setTimeout(() => {
            currentActive.classList.remove('fade-out');
            if (newScreen) newScreen.classList.add('active');

            // Inicialización específica de pantallas
            switch (screenId) {
                case 'muro':
                    createMotivationWall();
                    break;
                case 'calendario':
                    renderSimpleCalendar();
                    break;
                case 'nueva-frase':
                    initNewPhrase();
                    break;
                case 'explorar':
                    initExplore();
                    break;
                case 'ia':
                    initChat();
                    break;
            }
        }, 300);
    }

    // Actualizar navegación activa
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });

    const clickedTab = document.querySelector(`.tab-item[data-screen="${screenId}"]`);
    if (clickedTab) clickedTab.classList.add('active');
}

/**
 * Inicialización principal de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar pantalla de carga
    setLoading(true);
    
    // Simular carga de recursos
    setTimeout(() => {
        // Cargar datos almacenados
        loadFromStorage();
        
        // Iniciar componentes
        startTypingCycle();
        setupEventListeners();
        
        // Inicializar calendario si estamos en esa pantalla
        if (document.querySelector('#calendario.active')) {
            renderSimpleCalendar();
        }
        
        // Ocultar pantalla de carga
        hideLoadingScreen();
        setLoading(false);
    }, 1500);
});
/**
 * Inicializa la sección de explorar con categorías de frases.
 */
function initExplore() {
    const results = document.getElementById('exploreResults');
    const categoryButtons = document.querySelectorAll('[data-category]');

    if (!results || !categoryButtons.length) return;

    // Limpiar resultados iniciales
    results.innerHTML = '<p class="no-favorites">Selecciona una categoría para explorar frases motivacionales.</p>';

    // Agregar event listeners a los botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            const phrases = categorizedPhrases[category] || [];
            
            // Actualizar estado activo de botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            showExploreResults(phrases, category);
        });
    });
}

/**
 * Muestra el listado de frases por categoría en la sección Explorar.
 * @param {string[]} phrasesToShow - Lista de frases a renderizar.
 * @param {string} category - Categoría seleccionada.
 */
function showExploreResults(phrasesToShow, category) {
    const results = document.getElementById('exploreResults');
    if (!results) return;

    results.innerHTML = '';

    if (phrasesToShow.length === 0) {
        results.innerHTML = '<p class="no-favorites">No hay frases disponibles en esta categoría.</p>';
        return;
    }

    // Crear título de la categoría
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = getCategoryDisplayName(category);
    categoryTitle.style.color = '#ff85cc';
    categoryTitle.style.marginBottom = '20px';
    categoryTitle.style.textAlign = 'center';
    results.appendChild(categoryTitle);

    // Crear una tarjeta para cada frase
    phrasesToShow.forEach((phrase, index) => {
        const item = document.createElement('div');
        item.className = 'user-phrase';
        item.innerHTML = `
            <p>${phrase}</p>
            <div class="phrase-actions">
                <button class="animated-button speak-button" onclick="speakText('${phrase.replace(/'/g, "\\'")}')">🔊 Escuchar</button>
                <button class="animated-button favorite-button" onclick="addToFavoritesFromExplore('${phrase.replace(/'/g, "\\'")}')">⭐ Favorito</button>
            </div>
        `;
        results.appendChild(item);
    });
}

/**
 * Obtiene el nombre de visualización de una categoría.
 * @param {string} category - Clave de la categoría.
 * @returns {string} Nombre de visualización.
 */
function getCategoryDisplayName(category) {
    const displayNames = {
        riqueza: '💰 Riqueza y Prosperidad',
        amor_propio: '💖 Amor Propio y Autoestima',
        energia: '⚡ Energía y Vitalidad',
        disciplina: '📈 Disciplina y Constancia'
    };
    return displayNames[category] || category;
}

/**
 * Agrega una frase desde la sección de explorar a favoritos.
 * @param {string} phrase - Frase a agregar.
 */
function addToFavoritesFromExplore(phrase) {
    if (!favorites.includes(phrase)) {
        favorites.push(phrase);
        updateFavoritesList();
        saveFavoritesToStorage();
        
        // Feedback visual
        showFeedback('Frase agregada a favoritos!', 'success');
        
        // Efecto de estrella
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.6 },
                shapes: ['star']
            });
        }
    } else {
        showFeedback('Esta frase ya está en tus favoritos', 'warning');
    }
}

/**
 * Muestra un mensaje de feedback al usuario.
 * @param {string} message - Mensaje a mostrar.
 * @param {string} type - Tipo de feedback (success, error, warning, info).
 */
function showFeedback(message, type = 'info') {
    // Eliminar feedback previo
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Mostrar feedback
    setTimeout(() => {
        feedback.classList.add('show');
    }, 100);

    // Ocultar feedback después de 3 segundos
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}

/**
 * Inicializa la sección de nueva frase con todas sus funcionalidades.
 */
function initNewPhrase() {
    const input = document.getElementById('newPhraseInput');
    const charCount = document.getElementById('charCount');
    const saveBtn = document.getElementById('savePhraseBtn');
    const previewBtn = document.getElementById('previewPhraseBtn');
    const clearBtn = document.getElementById('clearPhraseBtn');

    if (!input || !charCount || !saveBtn || !previewBtn || !clearBtn) return;

    // Cargar frases personalizadas existentes
    loadCustomPhrases();

    // Event listener para el contador de caracteres
    input.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        // Cambiar color según la longitud
        charCount.className = 'character-counter';
        if (length > 180) {
            charCount.classList.add('danger');
        } else if (length > 150) {
            charCount.classList.add('warning');
        }
    });

    // Event listener para guardar frase
    saveBtn.addEventListener('click', saveNewPhrase);

    // Event listener para previsualizar frase
    previewBtn.addEventListener('click', previewPhrase);

    // Event listener para limpiar formulario
    clearBtn.addEventListener('click', clearPhraseForm);

    // Event listener para Enter en el textarea
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            saveNewPhrase();
        }
    });
}

/**
 * Guarda una nueva frase personalizada.
 */
function saveNewPhrase() {
    const input = document.getElementById('newPhraseInput');
    const phrase = input.value.trim();

    if (!phrase) {
        showFeedback('Por favor, escribe una frase antes de guardar.', 'warning');
        input.focus();
        return;
    }

    if (phrase.length < 5) {
        showFeedback('La frase debe tener al menos 5 caracteres.', 'warning');
        input.focus();
        return;
    }

    if (phrase.length > 200) {
        showFeedback('La frase no puede exceder 200 caracteres.', 'error');
        return;
    }

    // Verificar si la frase ya existe
    if (customPhrases.includes(phrase)) {
        showFeedback('Esta frase ya existe en tu colección.', 'warning');
        return;
    }

    // Agregar la nueva frase
    customPhrases.unshift(phrase); // Agregar al inicio
    saveCustomPhrasesToStorage();
    updateCustomPhrasesList();
    
    // Limpiar formulario
    input.value = '';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('charCount').className = 'character-counter';

    // Feedback de éxito
    showFeedback('¡Frase guardada exitosamente!', 'success');

    // Efecto de confeti
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

/**
 * Previsualiza la frase actual (la lee en voz alta).
 */
function previewPhrase() {
    const input = document.getElementById('newPhraseInput');
    const phrase = input.value.trim();

    if (!phrase) {
        showFeedback('Escribe una frase para previsualizarla.', 'warning');
        input.focus();
        return;
    }

    speakText(phrase);
    showFeedback('Reproduciendo frase...', 'info');
}

/**
 * Limpia el formulario de nueva frase.
 */
function clearPhraseForm() {
    const input = document.getElementById('newPhraseInput');
    const charCount = document.getElementById('charCount');
    
    input.value = '';
    charCount.textContent = '0';
    charCount.className = 'character-counter';
    input.focus();
    
    showFeedback('Formulario limpiado.', 'info');
}

/**
 * Actualiza la lista visual de frases personalizadas.
 */
function updateCustomPhrasesList() {
    const container = document.getElementById('customPhrasesList');
    if (!container) return;

    container.innerHTML = '';

    if (customPhrases.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">📝</div>
                <p>No tienes frases personalizadas aún.</p>
                <p>¡Crea tu primera frase motivacional!</p>
            </div>
        `;
        return;
    }

    customPhrases.forEach((phrase, index) => {
        const phraseItem = document.createElement('div');
        phraseItem.className = 'user-phrase';
        phraseItem.innerHTML = `
            <p>${phrase}</p>
            <div class="user-phrase-actions">
                <button class="animated-button speak-button" onclick="speakText('${phrase.replace(/'/g, "\\'")}')">🔊 Escuchar</button>
                <button class="animated-button favorite-button" onclick="addCustomToFavorites('${phrase.replace(/'/g, "\\'")}')">⭐ Favorito</button>
                <button class="animated-button" onclick="editCustomPhrase(${index})">✏️ Editar</button>
                <button class="animated-button" onclick="deleteCustomPhrase(${index})">🗑️ Eliminar</button>
            </div>
        `;
        container.appendChild(phraseItem);
    });
}

/**
 * Agrega una frase personalizada a favoritos.
 * @param {string} phrase - Frase a agregar.
 */
function addCustomToFavorites(phrase) {
    if (!favorites.includes(phrase)) {
        favorites.push(phrase);
        updateFavoritesList();
        saveFavoritesToStorage();
        
        showFeedback('Frase agregada a favoritos!', 'success');
        
        // Efecto de estrella
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.6 },
                shapes: ['star']
            });
        }
    } else {
        showFeedback('Esta frase ya está en tus favoritos', 'warning');
    }
}

/**
 * Edita una frase personalizada existente.
 * @param {number} index - Índice de la frase a editar.
 */
function editCustomPhrase(index) {
    const phrase = customPhrases[index];
    const input = document.getElementById('newPhraseInput');
    const charCount = document.getElementById('charCount');
    const saveBtn = document.getElementById('savePhraseBtn');
    
    // Cargar la frase en el formulario
    input.value = phrase;
    charCount.textContent = phrase.length;
    if (phrase.length > 180) {
        charCount.classList.add('danger');
    } else if (phrase.length > 150) {
        charCount.classList.add('warning');
    }
    
    // Cambiar el botón para indicar que es una edición
    saveBtn.innerHTML = '💾 Actualizar Frase';
    saveBtn.onclick = () => updateCustomPhrase(index);
    
    // Hacer scroll al formulario
    input.scrollIntoView({ behavior: 'smooth' });
    input.focus();
    
    showFeedback('Modo edición activado. Modifica la frase y presiona "Actualizar".', 'info');
}

/**
 * Actualiza una frase personalizada existente.
 * @param {number} index - Índice de la frase a actualizar.
 */
function updateCustomPhrase(index) {
    const input = document.getElementById('newPhraseInput');
    const phrase = input.value.trim();
    const saveBtn = document.getElementById('savePhraseBtn');

    if (!phrase) {
        showFeedback('Por favor, escribe una frase antes de actualizar.', 'warning');
        input.focus();
        return;
    }

    if (phrase.length < 5) {
        showFeedback('La frase debe tener al menos 5 caracteres.', 'warning');
        input.focus();
        return;
    }

    if (phrase.length > 200) {
        showFeedback('La frase no puede exceder 200 caracteres.', 'error');
        return;
    }

    // Verificar si la frase ya existe (excluyendo la actual)
    const otherPhrases = customPhrases.filter((_, i) => i !== index);
    if (otherPhrases.includes(phrase)) {
        showFeedback('Esta frase ya existe en tu colección.', 'warning');
        return;
    }

    // Actualizar la frase
    customPhrases[index] = phrase;
    saveCustomPhrasesToStorage();
    updateCustomPhrasesList();
    
    // Restaurar el botón original
    saveBtn.innerHTML = '💾 Guardar Frase';
    saveBtn.onclick = saveNewPhrase;
    
    // Limpiar formulario
    clearPhraseForm();
    
    showFeedback('¡Frase actualizada exitosamente!', 'success');
}

/**
 * Elimina una frase personalizada.
 * @param {number} index - Índice de la frase a eliminar.
 */
function deleteCustomPhrase(index) {
    const phrase = customPhrases[index];
    
    if (confirm(`¿Estás seguro de que quieres eliminar la frase:\n"${phrase}"?`)) {
        customPhrases.splice(index, 1);
        saveCustomPhrasesToStorage();
        updateCustomPhrasesList();
        
        showFeedback('Frase eliminada exitosamente.', 'success');
    }
}

/**
 * Guarda las frases personalizadas en localStorage.
 */
function saveCustomPhrasesToStorage() {
    try {
        localStorage.setItem('customPhrases', JSON.stringify(customPhrases));
    } catch (e) {
        console.log('Error al guardar frases personalizadas:', e);
    }
}

/**
 * Carga las frases personalizadas desde localStorage.
 */
function loadCustomPhrases() {
    try {
        const saved = localStorage.getItem('customPhrases');
        if (saved) {
            customPhrases = JSON.parse(saved);
            updateCustomPhrasesList();
        }
    } catch (e) {
        console.log('Error al cargar frases personalizadas:', e);
    }
}

// Variables para el muro de cartas místicas
let tarotCards = [];
let selectedCard = null;
let currentRevealedPhrase = '';

// Variables para el calendario
let currentDate = new Date();
let selectedDate = null;
let dailyMotivations = {};

// Variables para el chat
let chatMessages = [];
const OPENROUTER_API_KEY = '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';

// Frases místicas para las cartas de tarot
const mysticalPhrases = [
    "El universo conspira a tu favor en este momento.",
    "Tu energía positiva atrae grandes bendiciones.",
    "La sabiduría interior te guía hacia el éxito.",
    "Cada paso que das te acerca a tus sueños.",
    "Tu determinación es más fuerte que cualquier obstáculo.",
    "La abundancia fluye hacia ti naturalmente.",
    "Tu luz interior ilumina el camino de otros.",
    "El amor propio es tu superpoder más valioso.",
    "La confianza en ti mismo abre todas las puertas.",
    "Tu potencial es ilimitado y extraordinario.",
    "La gratitud multiplica tus bendiciones.",
    "Cada día es una nueva oportunidad para brillar.",
    "Tu intuición te guía hacia las mejores decisiones.",
    "La paz interior es tu estado natural.",
    "Tu creatividad transforma el mundo a tu alrededor.",
    "La perseverancia te lleva a la cima del éxito.",
    "Tu bondad regresa multiplicada a tu vida.",
    "El equilibrio perfecto está dentro de ti.",
    "Tu valentía inspira a otros a ser mejores.",
    "La magia del universo trabaja a través de ti."
];

/**
 * Crea el muro de cartas místicas con funcionalidad de tarot.
 */
function createMotivationWall() {
    const wallGrid = document.getElementById('wallGrid');
    const shuffleBtn = document.getElementById('shuffleCardsBtn');
    const readBtn = document.getElementById('readCardBtn');
    const saveBtn = document.getElementById('saveCardBtn');
    const backBtn = document.getElementById('backToGridBtn');

    if (!wallGrid || !shuffleBtn || !readBtn || !saveBtn || !backBtn) return;

    // Inicializar cartas
    initializeTarotCards();
    
    // Crear cartas en el grid
    createTarotGrid();
    
    // Event listeners
    shuffleBtn.addEventListener('click', shuffleTarotCards);
    readBtn.addEventListener('click', readSelectedCard);
    saveBtn.addEventListener('click', saveRevealedMessage);
    backBtn.addEventListener('click', backToGrid);
}

/**
 * Inicializa las cartas de tarot con frases místicas.
 */
function initializeTarotCards() {
    tarotCards = [...mysticalPhrases];
    shuffleTarotCards();
}

/**
 * Crea el grid de cartas de tarot.
 */
function createTarotGrid() {
    const wallGrid = document.getElementById('wallGrid');
    if (!wallGrid) return;

    wallGrid.innerHTML = '';

    // Crear 12 cartas (3x4 grid)
    for (let i = 0; i < 12; i++) {
        const card = document.createElement('div');
        card.className = 'wall-card';
        card.innerHTML = `
            <div class="card-back-design">
                <div class="mystical-symbol">✨</div>
                <div class="card-title">Mensaje Místico</div>
            </div>
        `;
        
        // Agregar event listener
        card.onclick = () => selectTarotCard(i);
        wallGrid.appendChild(card);
    }
}

/**
 * Selecciona una carta de tarot y la revela en el centro.
 * @param {number} cardIndex - Índice de la carta seleccionada.
 */
function selectTarotCard(cardIndex) {
    const wallGrid = document.getElementById('wallGrid');
    const cards = document.querySelectorAll('.wall-card');
    const backBtn = document.getElementById('backToGridBtn');

    if (!wallGrid || !cards[cardIndex] || !backBtn) return;

    // Remover selección previa
    cards.forEach(card => {
        card.classList.remove('selected');
    });

    // Seleccionar nueva carta
    cards[cardIndex].classList.add('selected');
    selectedCard = cardIndex;
    currentRevealedPhrase = tarotCards[cardIndex];

    // Activar modo revelación
    wallGrid.classList.add('reveal-mode');
    
    // Ocultar todas las cartas excepto la seleccionada
    cards.forEach((card, index) => {
        if (index !== cardIndex) {
            card.classList.add('hidden');
        } else {
            card.classList.add('revealing');
            // Agregar event listener para revelar la carta
            card.onclick = () => revealSelectedCard();
        }
    });

    // Mover carta seleccionada al centro
    setTimeout(() => {
        cards[cardIndex].style.position = 'absolute';
        cards[cardIndex].style.top = '50%';
        cards[cardIndex].style.left = '50%';
        cards[cardIndex].style.transform = 'translate(-50%, -50%) scale(1.5)';
        cards[cardIndex].style.zIndex = '100';
    }, 500);

    // Mostrar botón de volver atrás
    setTimeout(() => {
        backBtn.style.display = 'block';
    }, 1000);

    // Ocultar controles principales
    document.querySelector('.wall-controls').style.display = 'none';

    showFeedback('Carta seleccionada. Haz clic en la carta para revelar el mensaje.', 'info');
}

/**
 * Revela la carta seleccionada en el área central.
 * @param {string} phrase - Frase a mostrar en la carta.
 */
function revealCardInCenter(phrase) {
    const cardIcon = document.getElementById('cardIcon');
    const cardPhrase = document.getElementById('cardPhrase');
    const centralCard = document.getElementById('centralCard');

    if (!cardIcon || !cardPhrase || !centralCard) return;

    // Seleccionar icono aleatorio para la carta
    const icons = ['🔮', '✨', '🌟', '💫', '⭐', '🌙', '☀️', '🌈', '🦋', '🌺', '🌹', '🌸'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    // Actualizar contenido de la carta
    cardIcon.textContent = randomIcon;
    cardPhrase.textContent = phrase;

    // Efecto de revelación
    centralCard.classList.add('card-reveal');
    setTimeout(() => {
        centralCard.classList.remove('card-reveal');
    }, 1000);

    // Feedback
    showFeedback('Carta seleccionada. Haz clic en la carta central para revelarla.', 'info');
}

/**
 * Revela la carta seleccionada con el mensaje místico.
 */
function revealSelectedCard() {
    if (!currentRevealedPhrase) {
        showFeedback('Primero selecciona una carta del muro.', 'warning');
        return;
    }

    const cards = document.querySelectorAll('.wall-card');
    const selectedCardElement = cards[selectedCard];
    
    if (!selectedCardElement) return;

    // Cambiar el contenido de la carta seleccionada
    selectedCardElement.innerHTML = `
        <div class="card-content">
            <div class="card-icon">${getRandomMysticalIcon()}</div>
            <div class="card-phrase">${currentRevealedPhrase}</div>
        </div>
    `;

    // Cambiar el fondo de la carta
    selectedCardElement.style.background = 'linear-gradient(135deg, #2c003e, #1a001a)';
    selectedCardElement.style.borderColor = '#d500f9';

    // Leer mensaje automáticamente después de un breve delay
    setTimeout(() => {
        speakText(currentRevealedPhrase);
        showFeedback('Mensaje místico revelado y leído en voz alta.', 'success');
    }, 500);

    // Efecto de confeti
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.7 },
            colors: ['#ff85cc', '#d500f9', '#8e44ad']
        });
    }
}

/**
 * Vuelve al grid de cartas desde el modo revelación.
 */
function backToGrid() {
    const wallGrid = document.getElementById('wallGrid');
    const cards = document.querySelectorAll('.wall-card');
    const backBtn = document.getElementById('backToGridBtn');
    const wallControls = document.querySelector('.wall-controls');

    if (!wallGrid || !backBtn || !wallControls) return;

    // Remover modo revelación
    wallGrid.classList.remove('reveal-mode');
    
    // Restaurar todas las cartas
    cards.forEach((card, index) => {
        card.classList.remove('selected', 'revealing', 'hidden');
        card.style.position = '';
        card.style.top = '';
        card.style.left = '';
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.background = '';
        card.style.borderColor = '';
        
        // Restaurar diseño original de la carta
        card.innerHTML = `
            <div class="card-back-design">
                <div class="mystical-symbol">✨</div>
                <div class="card-title">Mensaje Místico</div>
            </div>
        `;
        
        // Restaurar event listener original
        card.onclick = () => selectTarotCard(index);
    });

    // Ocultar botón de volver atrás
    backBtn.style.display = 'none';
    
    // Mostrar controles principales
    wallControls.style.display = 'flex';

    // Resetear variables
    selectedCard = null;
    currentRevealedPhrase = '';

    showFeedback('Volviendo al muro de cartas...', 'info');
}

/**
 * Obtiene un icono místico aleatorio.
 * @returns {string} Icono aleatorio.
 */
function getRandomMysticalIcon() {
    const icons = ['🔮', '✨', '🌟', '💫', '⭐', '🌙', '☀️', '🌈', '🦋', '🌺', '🌹', '🌸'];
    return icons[Math.floor(Math.random() * icons.length)];
}

/**
 * Lee la carta seleccionada en voz alta.
 */
function readSelectedCard() {
    if (!currentRevealedPhrase) {
        showFeedback('Primero selecciona una carta del muro.', 'warning');
        return;
    }

    speakText(currentRevealedPhrase);
    showFeedback('Leyendo mensaje místico...', 'info');
}

/**
 * Guarda el mensaje revelado en favoritos.
 */
function saveRevealedMessage() {
    if (!currentRevealedPhrase) {
        showFeedback('Primero selecciona y revela una carta.', 'warning');
        return;
    }

    if (!favorites.includes(currentRevealedPhrase)) {
        favorites.push(currentRevealedPhrase);
        updateFavoritesList();
        saveFavoritesToStorage();
        
        showFeedback('Mensaje místico guardado en favoritos!', 'success');
        
        // Efecto de estrella
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.6 },
                shapes: ['star']
            });
        }
    } else {
        showFeedback('Este mensaje ya está en tus favoritos', 'warning');
    }
}

/**
 * Mezcla las cartas de tarot para obtener nuevas frases.
 */
function shuffleTarotCards() {
    const wallGrid = document.getElementById('wallGrid');
    const backBtn = document.getElementById('backToGridBtn');
    const wallControls = document.querySelector('.wall-controls');

    // Si estamos en modo revelación, volver al grid primero
    if (wallGrid && wallGrid.classList.contains('reveal-mode')) {
        backToGrid();
        setTimeout(() => {
            performShuffle();
        }, 600);
    } else {
        performShuffle();
    }

    function performShuffle() {
        // Mezclar array de frases
        for (let i = tarotCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tarotCards[i], tarotCards[j]] = [tarotCards[j], tarotCards[i]];
        }

        // Resetear selección
        selectedCard = null;
        currentRevealedPhrase = '';
        
        // Remover selección visual
        document.querySelectorAll('.wall-card').forEach(card => {
            card.classList.remove('selected', 'revealing', 'hidden');
            card.style.position = '';
            card.style.top = '';
            card.style.left = '';
            card.style.transform = '';
            card.style.zIndex = '';
        });

        // Remover modo revelación
        if (wallGrid) {
            wallGrid.classList.remove('reveal-mode');
        }

        // Ocultar botón de volver atrás
        if (backBtn) {
            backBtn.style.display = 'none';
        }
        
        // Mostrar controles principales
        if (wallControls) {
            wallControls.style.display = 'flex';
        }

            showFeedback('Cartas mezcladas. Nuevos mensajes místicos disponibles.', 'success');
    }
}

/**
 * Inicializa la funcionalidad del chat motivacional.
 */
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatArea = document.getElementById('chatArea');
    const chatLoading = document.getElementById('chatLoading');

    if (!chatInput || !sendBtn || !chatArea || !chatLoading) return;

    // Cargar mensajes guardados
    loadChatMessages();

    // Event listener para enviar mensaje
    sendBtn.addEventListener('click', handleSendMessage);

    // Event listener para Enter en el textarea
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Auto-resize del textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
}

/**
 * Maneja el envío de mensajes en el chat.
 */
async function handleSendMessage() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatLoading = document.getElementById('chatLoading');

    if (!chatInput || !sendBtn || !chatLoading) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Deshabilitar entrada durante el envío
    chatInput.disabled = true;
    sendBtn.disabled = true;

    // Agregar mensaje del usuario
    addChatMessage('user', message);
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Mostrar indicador de carga
    chatLoading.style.display = 'flex';

    try {
        // Enviar mensaje a OpenRouter
        const botReply = await sendMessageToGPT(message);
        
        // Ocultar indicador de carga
        chatLoading.style.display = 'none';
        
        // Agregar respuesta del bot
        addChatMessage('bot', botReply);
        
    } catch (error) {
        console.error('Error en el chat:', error);
        chatLoading.style.display = 'none';
        
        // Mensaje de error amigable
        addChatMessage('bot', 'Lo siento, estoy teniendo problemas técnicos en este momento. ¿Podrías intentar de nuevo en unos minutos? 💙');
    } finally {
        // Rehabilitar entrada
        chatInput.disabled = false;
        sendBtn.disabled = false;
        chatInput.focus();
    }
}

/**
 * Agrega un mensaje al área de chat.
 * @param {string} type - Tipo de mensaje ('user' o 'bot')
 * @param {string} text - Texto del mensaje
 * @param {boolean} save - Si se debe guardar el mensaje (por defecto true)
 */
function addChatMessage(type, text, save = true) {
    const chatArea = document.getElementById('chatArea');
    if (!chatArea) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;

    const avatar = type === 'bot' ? '🤖' : '👤';
    const avatarClass = type === 'bot' ? 'bot-avatar' : 'user-avatar';

    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="${avatarClass}">${avatar}</div>
            <div class="message-text">${text}</div>
        </div>
    `;

    chatArea.appendChild(messageDiv);
    
    // Scroll al final
    chatArea.scrollTop = chatArea.scrollHeight;

    // Guardar mensaje solo si se especifica
    if (save) {
        chatMessages.push({ type, text, timestamp: new Date().toISOString() });
        saveChatMessages();
    }
}

/**
 * Envía un mensaje a OpenRouter API.
 * @param {string} message - Mensaje del usuario
 * @returns {Promise<string>} Respuesta del bot
 */
async function sendMessageToGPT(message) {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'X-Title': 'MiCoachMotivacional'
            },
            body: JSON.stringify({
                model: 'openrouter/cypher-alpha:free',
                messages: [
                    {
                        role: 'system',
                        content: `
Eres Colver, un asistente emocional y motivacional cálido, sabio, empático y confiable.

Tu propósito es ayudar a las personas a:
- Gestionar sus emociones,
- Superar bloqueos mentales y momentos difíciles,
- Recuperar la motivación,
- Reforzar su autoestima,
- Encontrar claridad emocional y bienestar.

Tu tono debe ser siempre compasivo, alentador, humano y cercano. No haces juicios ni críticas. Nunca das diagnósticos médicos ni reemplazas a un profesional de salud mental.

Tu estilo de comunicación debe ser:
- Breve pero profundo,
- Inspirador y esperanzador,
- Usando preguntas poderosas y frases que empoderen,
- Incluyendo técnicas simples de respiración, atención plena (mindfulness), afirmaciones positivas o visualizaciones si el usuario lo permite.

Puedes adaptarte al nivel emocional del usuario, y responder con sensibilidad a estados como:
- Ansiedad, tristeza, estrés, miedo, inseguridad, falta de propósito o bloqueo creativo.

Termina siempre tus respuestas con una frase motivadora o una afirmación positiva que eleve el ánimo del usuario.

Responde siempre en español.
                        `
                    },
                    { role: 'user', content: message }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('❌ Error al enviar mensaje a OpenRouter:', error);
        throw error;
    }
}

/**
 * Guarda los mensajes del chat en localStorage.
 */
function saveChatMessages() {
    try {
        // Mantener solo los últimos 50 mensajes para evitar sobrecargar el storage
        const messagesToSave = chatMessages.slice(-50);
        localStorage.setItem('chatMessages', JSON.stringify(messagesToSave));
    } catch (e) {
        console.log('Error al guardar mensajes del chat:', e);
    }
}

/**
 * Carga los mensajes del chat desde localStorage.
 */
function loadChatMessages() {
    try {
        const saved = localStorage.getItem('chatMessages');
        if (saved) {
            chatMessages = JSON.parse(saved);
            
            // Renderizar mensajes guardados (excluyendo el mensaje de bienvenida inicial)
            const chatArea = document.getElementById('chatArea');
            if (chatArea && chatMessages.length > 0) {
                // Limpiar mensaje de bienvenida inicial
                chatArea.innerHTML = '';
                
                // Renderizar todos los mensajes guardados
                chatMessages.forEach(msg => {
                    addChatMessage(msg.type, msg.text, false); // false para no guardar duplicados
                });
            }
        }
    } catch (e) {
        console.log('Error al cargar mensajes del chat:', e);
    }
}

/**
 * Limpia el historial del chat.
 */
function clearChatHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar todo el historial del chat?')) {
        chatMessages = [];
        saveChatMessages();
        
        const chatArea = document.getElementById('chatArea');
        if (chatArea) {
            chatArea.innerHTML = `
                <div class="chat-message bot-message">
                    <div class="message-content">
                        <div class="bot-avatar">🤖</div>
                        <div class="message-text">
                            ¡Hola! Soy Colver, tu coach motivacional personal. ¿Cómo te sientes hoy? Estoy aquí para ayudarte a superar cualquier obstáculo y encontrar tu motivación interior. 💪✨
                        </div>
                    </div>
                </div>
            `;
        }
        
        showFeedback('Historial del chat limpiado.', 'success');
    }
}

async function runMotivationTest() {
  const q1 = document.getElementById('q1').value;
  const q2 = document.getElementById('q2').value;
  const resultBox = document.getElementById('testResult');
  const resultText = document.getElementById('testResultText');

  if (!q1 || !q2) {
    showFeedback('Por favor responde ambas preguntas.', 'warning');
    return;
  }

  // Mostrar feedback de carga
  showFeedback('Generando tu frase motivacional...', 'info');
  resultText.textContent = '';
  resultBox.style.display = 'block';

  // Traducción de valores para el prompt
  const estados = {
    bajo_animo: 'triste o desanimado',
    sin_energia: 'cansado o sin energía',
    estresado: 'estresado o saturado',
    bien: 'con ganas de mejorar'
  };
  const metas = {
    amor_propio: 'amor propio o autoestima',
    energia: 'energía o vitalidad',
    riqueza: 'abundancia o dinero',
    disciplina: 'disciplina o hábitos'
  };

  const estado = estados[q1] || q1;
  const meta = metas[q2] || q2;

  // Prompt para la IA
  const prompt = `
Eres un coach motivacional cálido y positivo. El usuario se siente: "${estado}" y quiere mejorar: "${meta}".
Dale una frase motivacional personalizada, breve, profunda y positiva. Responde solo la frase, en español.
`;

  try {
    // Llamada a OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'TestMotivacional'
      },
      body: JSON.stringify({
        model: 'openrouter/cypher-alpha:free',
        messages: [
          { role: 'system', content: 'Eres un coach motivacional experto. Responde siempre en español.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) throw new Error('Error en la IA');
    const data = await response.json();
    const iaPhrase = data.choices[0].message.content.trim();

    resultText.textContent = `"${iaPhrase}"`;
    resultBox.style.display = 'block';
    resultText.classList.remove('fade-out');
    resultText.style.animation = 'fadeInText 1s ease-in-out forwards';
    speakText(iaPhrase);
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#ff85cc', '#d500f9', '#8e44ad']
      });
    }
    showFeedback('¡Aquí tienes tu frase personalizada!', 'success');
  } catch (error) {
    // Fallback local
    let category = q2;
    const phraseList = categorizedPhrases[category] || [];
    const phrase = phraseList[Math.floor(Math.random() * phraseList.length)];
    resultText.textContent = `"${phrase}"`;
    resultBox.style.display = 'block';
    resultText.classList.remove('fade-out');
    resultText.style.animation = 'fadeInText 1s ease-in-out forwards';
    speakText(phrase);
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#ff85cc', '#d500f9', '#8e44ad']
      });
    }
    showFeedback('No se pudo conectar con la IA. Aquí tienes una frase local.', 'warning');
  }
}

function resetMotivationTest() {
  document.getElementById('motivationTestForm').reset();
  document.getElementById('testResult').style.display = 'none';
}
