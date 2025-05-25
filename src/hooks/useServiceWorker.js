import { useEffect, useState } from 'react';

export const useServiceWorker = () => {
    const [isSupported, setIsSupported] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        // Vérifier si les Service Workers sont supportés
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            setIsSupported(true);
            registerServiceWorker();
        }
    }, []);

    const registerServiceWorker = async () => {
        try {
            const registration = await navigator.serviceWorker.register(
                '/sw.js',
                {
                    scope: '/',
                },
            );

            console.log('Service Worker enregistré avec succès:', registration);
            setRegistration(registration);
            setIsRegistered(true);

            // Écouter les mises à jour
            registration.addEventListener('updatefound', () => {
                console.log('Nouvelle version du Service Worker disponible');
            });
        } catch (error) {
            console.error(
                "Erreur lors de l'enregistrement du Service Worker:",
                error,
            );
        }
    };

    const preloadModels = async (modelPaths) => {
        if (!registration || !registration.active) {
            console.warn('Service Worker non disponible pour le préchargement');
            return false;
        }

        try {
            // Créer un canal de communication
            const messageChannel = new MessageChannel();

            return new Promise((resolve, reject) => {
                messageChannel.port1.onmessage = (event) => {
                    if (event.data.success) {
                        console.log('Modèles préchargés:', event.data.message);
                        resolve(true);
                    } else {
                        console.error(
                            'Erreur de préchargement:',
                            event.data.error,
                        );
                        reject(new Error(event.data.error));
                    }
                };

                // Envoyer la demande de préchargement
                registration.active.postMessage(
                    {
                        type: 'PRELOAD_MODELS',
                        models: modelPaths,
                    },
                    [messageChannel.port2],
                );
            });
        } catch (error) {
            console.error('Erreur lors du préchargement des modèles:', error);
            return false;
        }
    };

    const clearCache = async () => {
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName.includes('echec-royal')) {
                            console.log('Suppression du cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    }),
                );
                console.log('Cache des modèles 3D supprimé');
                return true;
            } catch (error) {
                console.error('Erreur lors de la suppression du cache:', error);
                return false;
            }
        }
        return false;
    };

    const getCacheSize = async () => {
        if ('caches' in window) {
            try {
                const cache = await caches.open('echec-royal-models-v1');
                const requests = await cache.keys();
                return requests.length;
            } catch (error) {
                console.error(
                    'Erreur lors du calcul de la taille du cache:',
                    error,
                );
                return 0;
            }
        }
        return 0;
    };

    return {
        isSupported,
        isRegistered,
        registration,
        preloadModels,
        clearCache,
        getCacheSize,
    };
};
