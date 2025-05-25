'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Forcer le scroll en haut au chargement/refresh
        window.scrollTo(0, 0);

        // Désactiver la restauration du scroll par le navigateur
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Exposer Lenis globalement
        window.lenis = lenis;

        // Arrêter Lenis par défaut (il sera redémarré à la fin de la transition)
        lenis.stop();

        // Update ScrollTrigger when Lenis scrolls
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis ticker to GSAP
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Make sure ScrollTrigger uses the correct scroll values
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove();
            // Nettoyer la référence globale
            if (window.lenis === lenis) {
                delete window.lenis;
            }
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
