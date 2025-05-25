'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

const Testimonials = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    // Données des témoignages
    const testimonials = [
        {
            id: 1,
            name: 'Léna',
            title: 'Membre depuis 2024',
            text: "Je ne connaissais même pas les règles il y a trois mois. Aujourd'hui, je gagne mes premières parties !",
            color: 'light',
            piece: 'big-pawn.png',
            littlePiece: 'pawn.svg',
        },
        {
            id: 2,
            name: 'Yanis',
            title: 'Membre depuis 2023',
            text: "J'ai mis les pieds dans le club pour voir à quoi ça ressemblait. Trois semaines plus tard, je ne rate plus une seule session du club !",
            color: 'brown',
            piece: 'big-knight.png',
            littlePiece: 'knight.svg',
        },
        {
            id: 3,
            name: 'Sophie',
            title: 'Membre depuis 2023',
            text: "J'adore jouer mes parties, comprendre mes erreurs, et partager des idées avec les autres membres.",
            color: 'brown',
            piece: 'big-bishop.png',
            littlePiece: 'bishop.svg',
        },
        {
            id: 4,
            name: 'Paul',
            title: 'Membre depuis 2022',
            text: "Les échecs sont un jeu de compétition, mais j'aime beaucoup et les discussions intenses aussi.",
            color: 'light',
            piece: 'big-tower.png',
            littlePiece: 'tower.svg',
        },
        {
            id: 5,
            name: 'Clara',
            title: 'Membre depuis 2021',
            text: "Quand je suis arrivée au club à 15 ans, je jouais contre mes grands-pères. Aujourd'hui, à 19 ans, je joue contre mes grands-pères.",
            color: 'light',
            piece: 'big-queen.png',
            littlePiece: 'queen.svg',
        },
        {
            id: 6,
            name: 'Jean - Fondateur',
            title: 'Membre depuis 2019',
            text: "Ce que nous avons aujourd'hui dépasse toutes mes attentes !",
            color: 'brown',
            piece: 'big-king.png',
            littlePiece: 'king.svg',
        },
    ];

    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!container) return;

        // Animation du titre
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

        // Animation des cartes
        if (cards.length > 0) {
            gsap.set(cards, {
                opacity: 0,
                y: 50,
            });

            gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
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

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative py-24 w-full bg-theme-background">
            {/* Titre */}
            <div className="text-center mb-20">
                <h2
                    ref={titleRef}
                    className="text-6xl md:text-7xl font-playfair text-theme-primary mb-4">
                    Témoignages
                </h2>
            </div>

            {/* Grille des témoignages */}
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            ref={addToRefs}
                            className={`
                                relative min-h-[700px] flex flex-col justify-center p-8 md:p-12
                                transition-transform duration-300 ease-out
                                ${
                                    testimonial.color === 'brown'
                                        ? 'bg-beige text-black'
                                        : 'bg-brown text-beige'
                                }
                            `}>
                            <div className="absolute -right-20 bottom-0  flex items-end justify-center ">
                                <Image
                                    src={`/images/${testimonial.piece}`}
                                    alt=""
                                    width={556}
                                    height={556}
                                    className="w-auto h-[600px] object-contain"
                                />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center mb-6">
                                    <div
                                        className={`
                                        w-12 h-12 rounded-full flex items-center justify-center mr-4
                                        ${
                                            testimonial.color === 'brown'
                                                ? 'bg-theme-secondary text-theme-primary'
                                                : 'bg-theme-primary text-theme-secondary'
                                        }
                                    `}>
                                        <span className="text-lg font-bold">
                                            <Image
                                                src={`/svg/${testimonial.littlePiece}`}
                                                alt=""
                                                width={48}
                                                height={48}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-playfair font-semibold">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-sm opacity-70">
                                            {testimonial.title}
                                        </p>
                                    </div>
                                </div>

                                <blockquote className="text-lg leading-relaxed font-light">
                                    &quot;{testimonial.text}&quot;
                                </blockquote>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
