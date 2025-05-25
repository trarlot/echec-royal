// Service Worker pour le cache des modèles 3D
const CACHE_NAME = 'echec-royal-3d-models-v1';
const MODEL_CACHE_NAME = 'echec-royal-models-v1';

// Fichiers à mettre en cache
const urlsToCache = [
    '/3D/knight.glb',
    // Ajoutez d'autres modèles 3D ici si nécessaire
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(MODEL_CACHE_NAME)
            .then((cache) => {
                console.log('Cache des modèles 3D ouvert');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Force l'activation immédiate
                return self.skipWaiting();
            }),
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Supprimer les anciens caches
                        if (
                            cacheName !== MODEL_CACHE_NAME &&
                            cacheName !== CACHE_NAME
                        ) {
                            console.log(
                                "Suppression de l'ancien cache:",
                                cacheName,
                            );
                            return caches.delete(cacheName);
                        }
                    }),
                );
            })
            .then(() => {
                // Prendre le contrôle immédiatement
                return self.clients.claim();
            }),
    );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    // Vérifier si c'est une requête pour un modèle 3D
    if (
        event.request.url.includes('/3D/') ||
        event.request.url.includes('.glb')
    ) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                // Retourner depuis le cache si disponible
                if (response) {
                    console.log(
                        'Modèle 3D servi depuis le cache:',
                        event.request.url,
                    );
                    return response;
                }

                // Sinon, faire la requête réseau et mettre en cache
                return fetch(event.request)
                    .then((response) => {
                        // Vérifier si c'est une réponse valide
                        if (
                            !response ||
                            response.status !== 200 ||
                            response.type !== 'basic'
                        ) {
                            return response;
                        }

                        // Cloner la réponse car elle ne peut être lue qu'une fois
                        const responseToCache = response.clone();

                        caches.open(MODEL_CACHE_NAME).then((cache) => {
                            console.log(
                                'Mise en cache du modèle 3D:',
                                event.request.url,
                            );
                            cache.put(event.request, responseToCache);
                        });

                        return response;
                    })
                    .catch((error) => {
                        console.error(
                            'Erreur lors du chargement du modèle 3D:',
                            error,
                        );
                        // Essayer de servir depuis le cache en cas d'erreur réseau
                        return caches.match(event.request);
                    });
            }),
        );
    }
});

// Préchargement des modèles critiques
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'PRELOAD_MODELS') {
        event.waitUntil(
            caches
                .open(MODEL_CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(event.data.models);
                })
                .then(() => {
                    console.log('Modèles préchargés avec succès');
                    // Envoyer une confirmation au client
                    event.ports[0].postMessage({
                        success: true,
                        message: 'Modèles mis en cache',
                    });
                })
                .catch((error) => {
                    console.error('Erreur lors du préchargement:', error);
                    event.ports[0].postMessage({
                        success: false,
                        error: error.message,
                    });
                }),
        );
    }
});
