'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function Intro() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);
    const image4Ref = useRef(null);
    const image5Ref = useRef(null);
    const image6Ref = useRef(null);
    const image7Ref = useRef(null);
    const textRef = useRef(null);
    const sloganRef = useRef(null);
    const descriptionRef = useRef(null);
    const philosophyTextRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const images = [
            image1Ref.current,
            image2Ref.current,
            image3Ref.current,
            image4Ref.current,
            image5Ref.current,
            image6Ref.current,
            image7Ref.current,
        ];

        if (!container) return;
        const speeds = [1, 0.6, 0.5, 0.3, 0.9, 0.4, 0.6];

        images.forEach((image, index) => {
            if (image) {
                gsap.fromTo(
                    image,
                    {
                        yPercent: 100,
                    },
                    {
                        yPercent: -200 * speeds[index],
                        ease: 'none',
                        scrollTrigger: {
                            trigger: container,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                            refreshPriority: -1,
                        },
                    },
                );
            }
        });

        // Fonction pour créer l'effet de typing avec fade
        const createTypingEffect = (
            element,
            triggerStart = 'top 80%',
            delay = 0,
        ) => {
            if (!element) return;

            const splitText = new SplitText(element, { type: 'words,chars' });
            const chars = splitText.chars;
            const charCount = chars.length;

            // Calcul du stagger pour que l'animation totale dure 1 seconde
            const totalDuration = 1; // 1 seconde au total
            const charDuration = 0.3; // Durée d'apparition de chaque caractère
            const staggerTime =
                charCount > 1
                    ? (totalDuration - charDuration) / (charCount - 1)
                    : 0;

            // État initial : caractères invisibles
            gsap.set(chars, { opacity: 0 });

            // Animation de typing avec fade fluide et smooth
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: triggerStart,
                    toggleActions: 'play none none reverse',
                },
            });

            tl.to(chars, {
                opacity: 1,
                duration: charDuration,
                stagger: staggerTime,
                ease: 'power2.out',
                delay: delay,
            });

            return tl;
        };

        // Application des effets de typing sur tous les textes
        createTypingEffect(sloganRef.current, 'top 90%', 0.2);
        createTypingEffect(titleRef.current, 'top 70%', 0);
        createTypingEffect(descriptionRef.current, 'top 120%', 0.1);
        createTypingEffect(textRef.current, 'top 80%', 0.1);
        createTypingEffect(philosophyTextRef.current, 'top 170%', 0.2);

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className=" bg-theme-background">
            <div
                ref={containerRef}
                className="relative h-[3000px] max-w-[1600px] mx-auto">
                <div
                    ref={sloganRef}
                    className="absolute top-4 right-8 text-md text-theme-primary">
                    Le club où chaque coup compte.
                </div>

                <div ref={image1Ref} className="absolute top-8 left-8 ">
                    <Image
                        src="/images/image-20.jpg"
                        alt="Chess board"
                        width={360}
                        height={528}
                        className="w-full h-full object-cover "
                    />
                </div>

                <div
                    ref={image2Ref}
                    className="absolute top-[500px] max-w-[424px] left-20 flex flex-col gap-5">
                    <Image
                        src="/images/image-21.jpg"
                        alt="Chess pieces outdoor"
                        width={424}
                        height={588}
                        className="  object-cover "
                    />
                    <p
                        ref={descriptionRef}
                        className="text-md leading-relaxed text-theme-primary">
                        Fondé sur des passionnés du noble jeu, Échec Royal est
                        plus qu&apos;un simple club d&apos;échecs. C&apos;est un
                        lieu de rencontre, d&apos;apprentissage et de
                        compétition, ouvert à tous - débutants curieux,
                        stratèges assurés, ou simples amateurs du dimanche.
                        Rejoignez-nous et venez vivre la passion de
                        l&apos;échiquier, simplement jouer autour d&apos;un
                        café, notre club vous accueille à bras ouverts.
                    </p>
                </div>

                <div className="absolute top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <h2
                        ref={titleRef}
                        className="text-6xl font-bold font-serif leading-tight text-theme-primary">
                        Bienvenue à Échec Royal
                    </h2>
                </div>

                <div ref={image3Ref} className="absolute top-[300px] right-16 ">
                    <Image
                        src="/images/image-22.jpg"
                        alt="Chess pieces"
                        width={332}
                        height={560}
                        className=" object-cover "
                    />
                </div>

                <div ref={image4Ref} className="absolute top-[1200px] right-8 ">
                    <Image
                        src="/images/image-23.jpg"
                        alt="Chess set"
                        width={160}
                        height={308}
                        className=" object-cover"
                    />
                </div>

                <div
                    ref={image5Ref}
                    className="absolute z-20 top-[1600px] left-1/2 -translate-x-1/2   ">
                    <Image
                        src="/images/image-26.jpg"
                        alt="Outdoor chess game"
                        width={584}
                        height={456}
                        className=" object-cover "
                    />
                </div>
                <div
                    ref={textRef}
                    className="absolute bottom-[1000px] z-10 left-0 w-full flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold uppercase font-serif leading-tight text-theme-primary">
                        Notre philosophie
                    </h2>
                </div>

                <div
                    ref={image6Ref}
                    className="absolute flex flex-col gap-50 top-[2200px] z-10 left-[100px] ">
                    <Image
                        src="/images/image-24.jpg"
                        alt="Outdoor chess game"
                        width={500}
                        height={400}
                        className=" object-cover "
                    />
                    <button className="flex  cursor-pointer items-center bg-gradient-black justify-center gap-2 px-6 py-3 border transition w-1/2 border-theme-primary text-theme-primary">
                        <span>Rejoindre le club</span>
                        <span>→</span>
                    </button>
                </div>
                <div
                    ref={image7Ref}
                    className="absolute top-[2700px] flex flex-col gap-6 z-10 right-[200px] max-w-[400px]  ">
                    <p
                        ref={philosophyTextRef}
                        className="text-md leading-relaxed text-theme-primary">
                        Aux échecs, chaque coup compte — tout comme chaque
                        membre. Nous croyons que le jeu est un excellent moyen
                        de développer la concentration, la patience et la
                        stratégie, tout en créant du lien social. Chez Échec
                        Royal, l&apos;apprentissage va de pair avec le plaisir
                        de jouer.
                    </p>
                    <Image
                        src="/images/image-25.jpg"
                        alt="Outdoor chess game"
                        width={500}
                        height={350}
                        className=" object-cover "
                    />
                </div>
            </div>
        </section>
    );
}
