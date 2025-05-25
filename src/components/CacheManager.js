'use client';

import { useEffect } from 'react';
import { useServiceWorker } from '@/hooks/useServiceWorker';

const CacheManager = () => {
    const { isSupported, isRegistered, preloadModels } = useServiceWorker();

    useEffect(() => {
        if (isRegistered) {
            // Liste des modèles 3D à précharger
            const modelsToCache = [
                '/3D/knight.glb',
                // Ajoutez d'autres modèles ici
            ];

            // Précharger les modèles après un court délai
            const timer = setTimeout(async () => {
                try {
                    await preloadModels(modelsToCache);
                    console.log('✅ Modèles 3D mis en cache avec succès !');
                } catch (error) {
                    console.warn(
                        '⚠️  Erreur lors de la mise en cache des modèles:',
                        error,
                    );
                }
            }, 2000); // Attendre 2 secondes après le chargement

            return () => clearTimeout(timer);
        }
    }, [isRegistered, preloadModels]);

    // Ce composant ne rend rien visuellement
    return null;
};

export default CacheManager;
