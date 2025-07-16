// Variables globales para el estado de la aplicación
const fullText = 'Bienvenido a MotivApp';
let displayText = '';
let isDeleting = false;
let currentIndex = 0;
let typingInterval;
let currentPhrase = '';
let favorites = [];
let customPhrases = [];

/**
 * Función personalizada para mostrar SweetAlert con el tema de MotivApp
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto del mensaje (opcional)
 * @param {string} icon - Tipo de icono (success, error, warning, info)
 */
function showMotivAppAlert(title, text = '', icon = 'success') {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        draggable: true,
        background: 'linear-gradient(135deg, #2c003e, #1a001a)',
        color: '#fcd5ce',
        confirmButtonColor: '#ff85cc',
        confirmButtonText: '✨ Perfecto',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'swal-motivapp',
            title: 'swal-title-motivapp',
            confirmButton: 'swal-btn-motivapp'
        }
    });
}

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
    ],
    preguntas: [
        "¿Qué energía, espacio, conciencia y elección puedo ser para recibir más dinero de lo que jamás imaginé, con total facilidad?",
        "¿Qué tomaría para que el dinero me busque a mí como yo busco el café en las mañanas?",
        "Si no tuviera ningún punto de vista sobre el dinero, ¿cuánto podría recibir hoy?",
        "¿Y si el dinero fuera mi amante, cómo le estaría tratando?",
        "¿Qué está creando escasez en mi vida que podría soltar ahora mismo?",
        "¿Qué es el dinero para mí... y de quién aprendí eso?",
        "¿Qué juicios estoy usando para limitar el dinero que puedo elegir?",
        "¿Qué me impide reconocer que ya soy una energía de riqueza?",
        "¿Cuánto más dinero podría tener si me atreviera a disfrutar sin culpa?",
        "¿Qué posibilidades infinitas con el dinero están disponibles hoy que aún no he reconocido?",
        "¿Qué debo dejar de controlar para que el dinero fluya con más gozo?",
        "¿Estoy dispuesta a recibir dinero de formas inesperadas y sin esfuerzo?",
        "¿Qué estoy evitando o defendiendo que me impide ser millonaria?",
        "¿Qué más es posible con el dinero que nunca nadie me enseñó?",
        "¿Qué pasaría si dejara de rechazar ser rica?",
        "¿Y si el dinero no fuera un problema… qué elegiría hoy?",
        "¿Qué estoy copiando de mi familia sobre el dinero que ya no me sirve?",
        "¿Qué tomaría para que el dinero se muestre hoy con facilidad, alegría y gloria?",
        "¿Qué nivel de gratitud y gozo puedo ser hoy para duplicar mis ingresos?",
        "¿Cuánto dinero estoy dispuesto(a) a tener sin perder mi esencia?",
        "¿Qué conciencia del dinero estoy listo(a) para recibir hoy?",
        "¿Qué energía puedo ser para atraer clientes que me paguen con gozo?",
        "¿Qué más puedo vender, crear o elegir que sea una contribución financiera para mí y para el mundo?",
        "¿Qué estoy haciendo más difícil de lo que realmente es con el dinero?",
        "¿Qué parte de mi magia estoy ignorando que crearía más dinero de inmediato?",
        "¿Qué me impide ser el imán que realmente soy para el dinero?",
        "¿Qué tomaría para elegir más dinero sin tener que justificarlo?",
        "¿Y si el dinero no fuera serio ni pesado, cómo sería?",
        "¿Qué riqueza energética está disponible para mí ahora mismo?",
        "¿Qué puedo ser o hacer hoy que cree más dinero ahora y para toda la eternidad?",
        "¿Qué pasaría si me permitiera ser completamente feliz sin condiciones?",
        "¿Qué estoy defendiendo que me impide recibir todo el amor que merezco?",
        "¿Qué tomaría para que mi confianza en mí mismo(a) fuera inquebrantable?",
        "¿Qué estoy evitando que me impide brillar con toda mi luz?",
        "¿Qué pasaría si dejara de buscar la aprobación de otros?",
        "¿Qué energía puedo ser para atraer relaciones saludables y amorosas?",
        "¿Qué estoy creyendo sobre mí que ya no me sirve?",
        "¿Qué tomaría para que mi creatividad fluya sin límites?",
        "¿Qué pasaría si confiara completamente en mi intuición?",
        "¿Qué estoy resistiendo que me impide crecer y evolucionar?",
        "¿Qué energía puedo ser para manifestar mis sueños más profundos?",
        "¿Qué tomaría para que mi paz interior fuera inquebrantable?",
        "¿Qué pasaría si me permitiera ser vulnerable sin miedo?",
        "¿Qué estoy ocultando que me impide ser auténtico(a)?",
        "¿Qué energía puedo ser para atraer oportunidades extraordinarias?",
        "¿Qué tomaría para que mi propósito de vida fuera claro y poderoso?",
        "¿Qué pasaría si me permitiera fallar sin juzgarme?",
        "¿Qué estoy esperando para ser la mejor versión de mí mismo(a)?",
        "¿Qué energía puedo ser para transformar mis miedos en poder?",
        "¿Qué tomaría para que mi gratitud fuera tan profunda que transforme mi realidad?",
        "¿Qué pasaría si me permitiera recibir sin sentir culpa?",
        "¿Qué estoy creando en mi vida que ya no me sirve?",
        "¿Qué energía puedo ser para atraer abundancia en todas las áreas de mi vida?"
    ]
};

// Frases motivacionales predefinidas (para compatibilidad)
const phrases = [
    "¿Qué energía, espacio, conciencia y elección puedo ser para recibir más dinero de lo que jamás imaginé, con total facilidad?",
    "¿Qué tomaría para que el dinero me busque a mí como yo busco el café en las mañanas?",
    "Si no tuviera ningún punto de vista sobre el dinero, ¿cuánto podría recibir hoy?",
    "¿Y si el dinero fuera mi amante, cómo le estaría tratando?",
    "¿Qué está creando escasez en mi vida que podría soltar ahora mismo?",
    "¿Qué es el dinero para mí... y de quién aprendí eso?",
    "¿Qué juicios estoy usando para limitar el dinero que puedo elegir?",
    "¿Qué me impide reconocer que ya soy una energía de riqueza?",
    "¿Cuánto más dinero podría tener si me atreviera a disfrutar sin culpa?",
    "¿Qué posibilidades infinitas con el dinero están disponibles hoy que aún no he reconocido?",
    "¿Qué debo dejar de controlar para que el dinero fluya con más gozo?",
    "¿Estoy dispuesta a recibir dinero de formas inesperadas y sin esfuerzo?",
    "¿Qué estoy evitando o defendiendo que me impide ser millonaria?",
    "¿Qué más es posible con el dinero que nunca nadie me enseñó?",
    "¿Qué pasaría si dejara de rechazar ser rica?",
    "¿Y si el dinero no fuera un problema… qué elegiría hoy?",
    "¿Qué estoy copiando de mi familia sobre el dinero que ya no me sirve?",
    "¿Qué tomaría para que el dinero se muestre hoy con facilidad, alegría y gloria?",
    "¿Qué nivel de gratitud y gozo puedo ser hoy para duplicar mis ingresos?",
    "¿Cuánto dinero estoy dispuesto(a) a tener sin perder mi esencia?",
    "¿Qué conciencia del dinero estoy listo(a) para recibir hoy?",
    "¿Qué energía puedo ser para atraer clientes que me paguen con gozo?",
    "¿Qué más puedo vender, crear o elegir que sea una contribución financiera para mí y para el mundo?",
    "¿Qué estoy haciendo más difícil de lo que realmente es con el dinero?",
    "¿Qué parte de mi magia estoy ignorando que crearía más dinero de inmediato?",
    "¿Qué me impide ser el imán que realmente soy para el dinero?",
    "¿Qué tomaría para elegir más dinero sin tener que justificarlo?",
    "¿Y si el dinero no fuera serio ni pesado, cómo sería?",
    "¿Qué riqueza energética está disponible para mí ahora mismo?",
    "¿Qué puedo ser o hacer hoy que cree más dinero ahora y para toda la eternidad?"
];



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
        
        // Mostrar el área de respuesta después de revelar la pregunta
        showResponseArea();
        
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
 * Agrega la frase actual a favoritos con feedback visual
 */
function addToFavorites() {
    if (!currentPhrase) return;
    
    if (!favorites.includes(currentPhrase)) {
        favorites.push(currentPhrase);
        updateFavoritesList();
        saveFavoritesToStorage();
        
        // SweetAlert para confirmar guardado
        showMotivAppAlert("Guardado!", "", "success");
        
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
        showMotivAppAlert("Ya en favoritos", "Esta frase ya está en tus favoritos", "warning");
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
    Swal.fire({
        title: "¿Estás Seguro?",
        text: "¿Quieres eliminar esta frase de favoritos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, Eliminar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            favorites.splice(index, 1);
            updateFavoritesList();
            saveFavoritesToStorage();
            
            Swal.fire({
                title: "¡Eliminado!",
                text: "La frase ha sido eliminada de favoritos.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "La frase se mantiene en favoritos :)",
                icon: "error"
            });
        }
    });
}

/**
 * Guarda las frases favoritas y personalizadas en localStorage
 */
function saveFavoritesToStorage() {
    try {
        localStorage.setItem('motivationalFavorites', JSON.stringify(favorites));
        localStorage.setItem('customPhrases', JSON.stringify(customPhrases));
        
        // SweetAlert para confirmar guardado
        showMotivAppAlert("Guardado!", "", "success");
    } catch (e) {
        console.log('Error al guardar en localStorage:', e);
        showMotivAppAlert("Error al guardar", "No se pudo guardar en el almacenamiento", "error");
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
 * Muestra el área de respuesta con animación
 */
function showResponseArea() {
    const responseArea = document.getElementById('responseArea');
    if (responseArea) {
        responseArea.style.display = 'block';
        // Limpiar el área de respuesta
        const userResponse = document.getElementById('userResponse');
        if (userResponse) {
            userResponse.value = '';
            updateResponseCharCount();
        }
    }
}

/**
 * Oculta el área de respuesta
 */
function hideResponseArea() {
    const responseArea = document.getElementById('responseArea');
    if (responseArea) {
        responseArea.style.display = 'none';
    }
}

/**
 * Actualiza el contador de caracteres de la respuesta
 */
function updateResponseCharCount() {
    const userResponse = document.getElementById('userResponse');
    const charCount = document.getElementById('responseCharCount');
    const counter = document.querySelector('.response-character-counter');
    
    if (userResponse && charCount && counter) {
        const count = userResponse.value.length;
        charCount.textContent = count;
        
        // Cambiar color según el límite
        counter.classList.remove('warning', 'danger');
        if (count > 400) {
            counter.classList.add('danger');
        } else if (count > 350) {
            counter.classList.add('warning');
        }
    }
}

/**
 * Guarda la respuesta del usuario
 */
function saveUserResponse() {
    const userResponse = document.getElementById('userResponse');
    if (!userResponse || !userResponse.value.trim() || !currentPhrase) return;
    
    const response = userResponse.value.trim();
    
    // Crear objeto con pregunta y respuesta
    const questionResponse = {
        question: currentPhrase,
        response: response,
        date: new Date().toISOString(),
        id: Date.now()
    };
    
    // Obtener respuestas guardadas del localStorage
    let savedResponses = [];
    try {
        const saved = localStorage.getItem('userResponses');
        if (saved) {
            savedResponses = JSON.parse(saved);
        }
    } catch (e) {
        console.log('Error al cargar respuestas guardadas:', e);
    }
    
    // Agregar nueva respuesta
    savedResponses.push(questionResponse);
    
    // Guardar en localStorage
    try {
        localStorage.setItem('userResponses', JSON.stringify(savedResponses));
        
        // SweetAlert para confirmar guardado
        showMotivAppAlert("Guardado!", "", "success");
        
        // Feedback visual
        showFeedback('Respuesta guardada exitosamente ✨', 'success');
        
        // Limpiar el área de respuesta
        userResponse.value = '';
        updateResponseCharCount();
        
        // Efecto de confeti
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 }
            });
        }
    } catch (e) {
        showMotivAppAlert("Error al guardar", "No se pudo guardar la respuesta", "error");
        showFeedback('Error al guardar la respuesta', 'error');
        console.log('Error al guardar respuesta:', e);
    }
}

/**
 * Reproduce la respuesta del usuario en voz alta
 */
function speakUserResponse() {
    const userResponse = document.getElementById('userResponse');
    if (!userResponse || !userResponse.value.trim()) {
        showFeedback('No hay respuesta para reproducir', 'warning');
        return;
    }
    
    speakText(userResponse.value.trim());
}

/**
 * Limpia el área de respuesta
 */
function clearUserResponse() {
    Swal.fire({
        title: "¿Estás Seguro?",
        text: "¿Quieres limpiar tu respuesta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, Limpiar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const userResponse = document.getElementById('userResponse');
            if (userResponse) {
                userResponse.value = '';
                updateResponseCharCount();
                showFeedback('Respuesta limpiada', 'info');
            }
            
            Swal.fire({
                title: "¡Limpiado!",
                text: "Tu respuesta ha sido eliminada.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Tu respuesta se mantiene :)",
                icon: "error"
            });
        }
    });
}

/**
 * Cambia entre las pestañas de favoritos y respuestas
 * @param {string} tabType - Tipo de pestaña ('favorites' o 'responses')
 */
function switchFavoritesTab(tabType) {
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabType}"]`)?.classList.add('active');
    
    // Mostrar sección correspondiente
    const favoritesSection = document.getElementById('favoritesSection');
    const responsesSection = document.getElementById('responsesSection');
    
    if (tabType === 'favorites') {
        favoritesSection?.classList.add('active');
        responsesSection?.classList.remove('active');
    } else if (tabType === 'responses') {
        favoritesSection?.classList.remove('active');
        responsesSection?.classList.add('active');
        loadUserResponses();
    }
}

/**
 * Carga y muestra las respuestas guardadas del usuario
 */
function loadUserResponses() {
    const responsesList = document.getElementById('responsesList');
    if (!responsesList) return;
    
    // Obtener respuestas guardadas
    let savedResponses = [];
    try {
        const saved = localStorage.getItem('userResponses');
        if (saved) {
            savedResponses = JSON.parse(saved);
        }
    } catch (e) {
        console.log('Error al cargar respuestas:', e);
    }
    
    responsesList.innerHTML = '';
    
    if (savedResponses.length === 0) {
        responsesList.innerHTML = `
            <div class="no-responses">
                <div class="icon">💭</div>
                <p>No tienes respuestas guardadas aún.</p>
                <p>¡Responde a las preguntas para verlas aquí!</p>
            </div>
        `;
        return;
    }
    
    // Mostrar respuestas en orden cronológico inverso (más recientes primero)
    savedResponses.reverse().forEach(response => {
        const responseItem = document.createElement('div');
        responseItem.className = 'response-item';
        
        const date = new Date(response.date);
        const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        responseItem.innerHTML = `
            <div class="response-question">"${response.question}"</div>
            <div class="response-text">${response.response}</div>
            <div class="response-date">${formattedDate}</div>
            <div class="response-actions">
                <button class="animated-button speak-button" onclick="speakText('${response.response.replace(/'/g, "\\'")}')">
                    🔊 Escuchar
                </button>
                <button class="animated-button" onclick="deleteResponse(${response.id})">
                    🗑️ Eliminar
                </button>
            </div>
        `;
        
        responsesList.appendChild(responseItem);
    });
}

/**
 * Elimina una respuesta guardada
 * @param {number} responseId - ID de la respuesta a eliminar
 */
function deleteResponse(responseId) {
    Swal.fire({
        title: "¿Estás Seguro?",
        text: "¿Quieres eliminar esta respuesta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, Eliminar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                const saved = localStorage.getItem('userResponses');
                if (saved) {
                    let responses = JSON.parse(saved);
                    responses = responses.filter(response => response.id !== responseId);
                    localStorage.setItem('userResponses', JSON.stringify(responses));
                    
                    showFeedback('Respuesta eliminada', 'success');
                    loadUserResponses(); // Recargar la lista
                }
                
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "La respuesta ha sido eliminada.",
                    icon: "success"
                });
            } catch (e) {
                showFeedback('Error al eliminar la respuesta', 'error');
                console.log('Error al eliminar respuesta:', e);
                
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar la respuesta.",
                    icon: "error"
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "La respuesta se mantiene guardada :)",
                icon: "error"
            });
        }
    });
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
    
    // Event listeners para el área de respuesta
    document.getElementById('saveResponseBtn')?.addEventListener('click', saveUserResponse);
    document.getElementById('speakResponseBtn')?.addEventListener('click', speakUserResponse);
    document.getElementById('clearResponseBtn')?.addEventListener('click', clearUserResponse);
    
    // Contador de caracteres para la respuesta
    document.getElementById('userResponse')?.addEventListener('input', updateResponseCharCount);
    
    // Navegación entre favoritos y respuestas
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            switchFavoritesTab(tabType);
        });
    });
    
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

            // Ocultar área de respuesta si no estamos en la pantalla de frases
            if (screenId !== 'frases') {
                hideResponseArea();
            }

            // Inicialización específica de pantallas
            switch (screenId) {
                case 'muro':
                    createMotivationWall();
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
                case 'favoritos':
                    // Asegurar que la pestaña de favoritos esté activa por defecto
                    switchFavoritesTab('favorites');
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
    // Simular carga de recursos
    setTimeout(() => {
        // Cargar datos almacenados
        loadFromStorage();
        // Mostrar el texto de bienvenida directamente y aplicar la animación fadeInText
        const typingElement = document.getElementById('typingText');
        if (typingElement) {
            typingElement.textContent = fullText;
            typingElement.style.opacity = '0';
            typingElement.style.animation = 'none';
            // Forzar reflow para reiniciar la animación
            void typingElement.offsetWidth;
            typingElement.style.animation = 'fadeInText 1s ease-in-out forwards';
        }
        setupEventListeners();
        hideLoadingScreen();
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
        disciplina: '📈 Disciplina y Constancia',
        preguntas: '❓ Preguntas Poderosas'
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
        
        // SweetAlert para confirmar guardado
        showMotivAppAlert("Guardado!", "", "success");
        
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
        showMotivAppAlert("Ya en favoritos", "Esta frase ya está en tus favoritos", "warning");
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

    // SweetAlert para confirmar guardado
    showMotivAppAlert("Guardado!", "", "success");

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
    Swal.fire({
        title: "¿Estás Seguro?",
        text: "¿Quieres limpiar el formulario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, Limpiar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const input = document.getElementById('newPhraseInput');
            const charCount = document.getElementById('charCount');
            
            input.value = '';
            charCount.textContent = '0';
            charCount.className = 'character-counter';
            input.focus();
            
            showFeedback('Formulario limpiado.', 'info');
            
            Swal.fire({
                title: "¡Limpiado!",
                text: "El formulario ha sido limpiado.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "El formulario se mantiene sin cambios :)",
                icon: "error"
            });
        }
    });
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
        
        // SweetAlert para confirmar guardado
        showMotivAppAlert("Guardado!", "", "success");
        
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
        showMotivAppAlert("Ya en favoritos", "Esta frase ya está en tus favoritos", "warning");
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
    
    Swal.fire({
        title: "¿Estás Seguro?",
        text: `¿Quieres eliminar la frase:\n"${phrase}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, Eliminar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            customPhrases.splice(index, 1);
            saveCustomPhrasesToStorage();
            updateCustomPhrasesList();
            
            showFeedback('Frase eliminada exitosamente.', 'success');
            
            Swal.fire({
                title: "¡Eliminado!",
                text: "La frase personalizada ha sido eliminada.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "La frase se mantiene en tu colección :)",
                icon: "error"
            });
        }
    });
}

/**
 * Guarda las frases personalizadas en localStorage.
 */
function saveCustomPhrasesToStorage() {
    try {
        localStorage.setItem('customPhrases', JSON.stringify(customPhrases));
        
        // SweetAlert para confirmar guardado
        showMotivAppAlert("Guardado!", "", "success");
    } catch (e) {
        console.log('Error al guardar frases personalizadas:', e);
        showMotivAppAlert("Error al guardar", "No se pudieron guardar las frases personalizadas", "error");
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



// Variables para el chat
let chatMessages = [];
const OPENROUTER_API_KEY = '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';

// Frases místicas para las cartas de tarot
const mysticalPhrases = [
    "Tu alma ya conoce el camino. Confía.",
    "La luna te guía en la oscuridad.",
    "Estás exactamente donde necesitas estar.",
    "El universo te protege con su manto estelar.",
    "Cada decisión te lleva más cerca de tu propósito.",
    "Hoy es un buen día para comenzar de nuevo.",
    "El caos es solo el inicio de una gran transformación.",
    "Estás rodeado de magia invisible.",
    "Lo que sueñas también te está buscando.",
    "Permite que lo divino actúe a través de ti."
];

/**
 * Crea el muro de cartas místicas con funcionalidad de tarot.
 */
function createMotivationWall() {
    const wallGrid = document.getElementById('wallGrid');
    const backBtn = document.getElementById('backToGridBtn');
    if (!wallGrid) return;

    wallGrid.classList.remove('reveal-mode');
    backBtn.style.display = 'none';
    wallGrid.innerHTML = '';

    mysticalPhrases.forEach((phrase, i) => {
        const card = document.createElement('div');
        card.classList.add('wall-card');

        card.innerHTML = `
            <div class="card-back card-face">
                <div class="card-back-design">
                    <div class="mystical-symbol">🔮</div>
                    <div class="card-title">Carta ${i + 1}</div>
                </div>
            </div>
            <div class="card-front card-face">
                <div class="card-content">
                    <div class="card-icon">✨</div>
                    <div class="card-phrase">${phrase}</div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => revealCard(card, phrase));
        wallGrid.appendChild(card);
    });
}

/**
 * Muestra solo la carta seleccionada centrada en pantalla completa
 */
function revealCard(card, phrase) {
    const wallGrid = document.getElementById('wallGrid');
    const backBtn = document.getElementById('backToGridBtn');
    const muroContenido = document.getElementById('muroContenido');
    
    // Ocultar el contenido del muro
    if (muroContenido) muroContenido.classList.add('muro-oculto');
    
    // Activar modo pantalla completa
    wallGrid.classList.add('reveal-mode');
    card.classList.add('revealing');
    
    // Mostrar botón de volver
    if (backBtn) backBtn.style.display = 'block';
    
    // Ocultar todas las demás cartas
    wallGrid.querySelectorAll('.wall-card').forEach(c => {
        if (c !== card) c.classList.add('hide-card');
    });
    
    // Reproducir sonido y hablar
    speakText(phrase);
    playMysticalSound();
    
    // Mostrar mensaje de la carta
    setTimeout(() => {
        let info = document.getElementById('cardInfo');
        if (!info) {
            info = document.createElement('div');
            info.id = 'cardInfo';
            info.className = 'card-info';
            wallGrid.appendChild(info);
        }
        info.innerHTML = `<strong>Tu mensaje místico:</strong><br>${phrase}`;
        info.style.display = 'block';
    }, 500);
}

// Volver al modo normal del muro
document.getElementById('backToGridBtn')?.addEventListener('click', () => {
    const wallGrid = document.getElementById('wallGrid');
    const cards = wallGrid.querySelectorAll('.wall-card');
    wallGrid.classList.remove('reveal-mode');
    cards.forEach(c => c.classList.remove('revealing', 'hide-card'));
    document.getElementById('backToGridBtn').style.display = 'none';
    const info = document.getElementById('cardInfo');
    if (info) info.style.display = 'none';
    // Mostrar el contenido del muro de nuevo
    const muroContenido = document.getElementById('muroContenido');
    if (muroContenido) muroContenido.classList.remove('muro-oculto');
});

// Función de sonido místico (opcional)
function playMysticalSound() {
    // Comentado para simplificar - puedes descomentar si quieres sonido
    // const audio = new Audio('ruta/al/sonido.mp3');
    // audio.play();
}

// ===== MURO DE CARTAS DE TAROT =====
const tarotPhrases = [
  "La energía que das, regresa a ti.",
  "Hoy es el día para confiar en tu intuición.",
  "El universo conspira a tu favor.",
  "Tu luz interior es más fuerte que cualquier sombra.",
  "Cada final es un nuevo comienzo.",
  "La magia está en tu actitud y tus acciones.",
  "Confía en el proceso, todo llega a su tiempo.",
  "El amor propio es tu mayor poder.",
  "Atrévete a soñar en grande.",
  "La calma es la clave para avanzar.",
  "Tu intuición nunca se equivoca.",
  "Hoy es el primer día del resto de tu vida.",
  "El universo te apoya cuando eres auténtico.",
  "La gratitud transforma cualquier situación.",
  "Eres más fuerte de lo que crees.",
  "La abundancia comienza en tu mente."
];

function renderTarotWall() {
  const grid = document.getElementById('tarotCardGrid');
  if (!grid) return;
  grid.innerHTML = '';
  // Mezclar frases para cada render
  const phrases = [...tarotPhrases].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 8; i++) {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.innerHTML = `
      <div class="tarot-card-inner">
        <div class="tarot-card-back">🃏</div>
        <div class="tarot-card-front"><div class="tarot-phrase">${phrases[i]}</div></div>
      </div>
    `;
    card.addEventListener('click', function() {
      if (!card.classList.contains('flipped')) {
        document.querySelectorAll('.tarot-card.flipped').forEach(c => c.classList.remove('flipped'));
        card.classList.add('flipped');
        // Leer la frase en voz alta
        const phraseText = card.querySelector('.tarot-phrase')?.textContent;
        if (phraseText) speakText(phraseText);
      }
    });
    grid.appendChild(card);
  }
}

document.getElementById('mezclarTarotBtn')?.addEventListener('click', renderTarotWall);

// Mostrar el muro de tarot cuando se navega a él
const tarotTab = document.querySelector('[data-screen="muro-tarot"]');
tarotTab?.addEventListener('click', renderTarotWall);
