'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Composant générique pour les sections de tournois
const TournamentSection = ({
    title,
    tournaments,
    buttonText = 'Voir le tournoi',
    isResultsSection = false,
}) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!container) return;

        // Animation du titre avec effet de typing
        if (title) {
            const splitText = new SplitText(title, { type: 'words,chars' });
            const chars = splitText.chars;
            const charCount = chars.length;

            const totalDuration = 1.2;
            const charDuration = 0.3;
            const staggerTime =
                charCount > 1
                    ? (totalDuration - charDuration) / (charCount - 1)
                    : 0;

            gsap.set(chars, { opacity: 0 });

            gsap.to(chars, {
                opacity: 1,
                duration: charDuration,
                stagger: staggerTime,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        }

        // Animation des cartes avec effet de stagger
        if (cards.length > 0) {
            gsap.set(cards, {
                opacity: 0,
            });

            gsap.to(cards, {
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    // Fonction pour ajouter ref aux cartes
    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative py-24 max-w-[1500px] mx-auto px-8 bg-theme-background">
            <div className="text-center mb-20">
                <h2
                    ref={titleRef}
                    className="text-6xl md:text-7xl font-playfair text-theme-primary mb-4">
                    {title}
                </h2>
            </div>

            <div className="border-l border-t border-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tournaments.map((tournament, index) => (
                        <div
                            key={tournament.id}
                            ref={addToRefs}
                            className={`
                                relative p-4 min-h-[365px] flex flex-col justify-between
                                transition-transform duration-300 ease-out cursor-pointer group
                                border-r border-b border-black
                                ${
                                    tournament.color === 'brown'
                                        ? 'bg-theme-primary text-theme-secondary'
                                        : 'bg-theme-secondary text-theme-primary'
                                }
                                ${isResultsSection ? 'opacity-80' : ''}
                            `}>
                            <div className="flex flex-row justify-between mb-4">
                                <h3
                                    className={`text-4xl max-w-1/2 font-playfair leading-8 ${
                                        isResultsSection ? 'opacity-50' : ''
                                    }`}>
                                    {tournament.name}
                                </h3>
                                <span
                                    className={`text-base font-playfair ${
                                        isResultsSection
                                            ? 'line-through opacity-50'
                                            : ''
                                    }`}>
                                    {tournament.dates}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="text-left">
                                    <span
                                        className={`text-sm font-medium  ${
                                            isResultsSection ? 'opacity-50' : ''
                                        }`}>
                                        {tournament.type}
                                    </span>
                                </div>

                                <button
                                    className={`flex cursor-pointer text-sm items-center justify-center gap-2 px-3 mx-auto py-2 border transition    
                                        ${
                                            tournament.color === 'brown'
                                                ? 'bg-gradient-white border-theme-secondary text-theme-secondary'
                                                : 'bg-gradient-black border-theme-primary text-theme-primary'
                                        }
                                        
                                    `}>
                                    <span>{buttonText}</span>
                                    <span>→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Données des événements à venir
const upcomingTournaments = [
    {
        id: 1,
        name: 'French Team Chess Champion ship 2025',
        dates: '22.05 - 02.06',
        type: 'Classique',
        color: 'brown',
    },
    {
        id: 2,
        name: 'Dream Hack Dallas 2025',
        dates: '23.05 - 26.05',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 3,
        name: 'Norway Chess 2025',
        dates: '26.05 - 06.06',
        type: 'Classique',
        color: 'brown',
    },
    {
        id: 4,
        name: 'Dubai Open 2025',
        dates: '26.05 - 05.06',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 5,
        name: 'Stepan Avagyan Memorial 2025',
        dates: '29.05 - 06.06',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 6,
        name: 'ChessKid Youth Champion ships 2025',
        dates: '03.06 - 04.06',
        type: 'Blitz',
        color: 'brown',
    },
    {
        id: 7,
        name: 'Cairns Cup 2025',
        dates: '10.06 - 20.06',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 8,
        name: 'FIDE World Team Chess Champion ships 2025',
        dates: '11.06 - 14.06',
        type: 'Classique & Blitz',
        color: 'brown',
    },
    {
        id: 9,
        name: 'Chess.com Hyperbullet Chess Champion ships 2025',
        dates: '12.06 - 14.06',
        type: 'Bullet',
        color: 'brown',
    },
    {
        id: 10,
        name: 'Super United Croatia 2025',
        dates: '02.07 - 07.07',
        type: 'Rapide & Blitz',
        color: 'light',
    },
    {
        id: 11,
        name: 'Chess.com Bughouse Chess Champion ship 2025',
        dates: '07.07 - 12.07',
        type: 'Bullet',
        color: 'brown',
    },
    {
        id: 12,
        name: 'Grand Chess Tour: Saint Louis 2025',
        dates: '11.08 - 16.08',
        type: 'Rapide & Blitz',
        color: 'light',
    },
];

// Données des classements et résultats (basé sur l'image)
const resultsData = [
    {
        id: 1,
        name: 'Chess.com King of the Hill Champion ship 2025',
        dates: '15.05 - 17.05',
        type: 'Blitz',
        color: 'brown',
    },
    {
        id: 2,
        name: 'Superbet Chess Classic Romania 2025',
        dates: '05.05 - 16.05',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 3,
        name: 'Asian Individual Chess Champion ships 2025',
        dates: '05.05 - 16.05',
        type: 'Classique',
        color: 'brown',
    },
    {
        id: 4,
        name: "FIDE Women's Grand Prix 2024-2025",
        dates: '06.05 - 16.05',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 5,
        name: '58th Capablanca Memorial Elite',
        dates: '10.05 - 20.05',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 6,
        name: 'Chess Zone May Action of the Week 2025',
        dates: '18.05 - 19.05',
        type: 'Rapide',
        color: 'brown',
    },
    {
        id: 7,
        name: 'SixDays May 2025',
        dates: '14.05 - 19.05',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 8,
        name: 'Nevada Senior Champion ship Online Playoff',
        dates: '16.05 - 19.05',
        type: 'Classique',
        color: 'brown',
    },
    {
        id: 9,
        name: 'Uruguay van Chess Champion ship u20 2025',
        dates: '16.05 - 19.05',
        type: 'Classique',
        color: 'brown',
    },
    {
        id: 10,
        name: 'Ostravsky konik 2025',
        dates: '19.05 - 18.05',
        type: 'Classique',
        color: 'light',
    },
    {
        id: 11,
        name: 'Rhineland Palatinate Rapid Champion ship 2025',
        dates: '18.05 - 18.05',
        type: 'Classique',
        color: 'brown',
    },
    {
        id: 12,
        name: 'Pitagor Elite 2025',
        dates: '18.05 - 18.05',
        type: 'Rapide',
        color: 'light',
    },
];

// Composant principal qui utilise les deux sections
const Events = () => {
    return (
        <>
            <TournamentSection
                title="Événements & Tournois"
                tournaments={upcomingTournaments}
                buttonText="Voir le tournoi"
                isResultsSection={false}
            />
            <TournamentSection
                title="Classements & Résultats"
                tournaments={resultsData}
                buttonText="Voir le tournoi"
                isResultsSection={true}
            />
        </>
    );
};

export default Events;
