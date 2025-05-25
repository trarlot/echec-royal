'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';

gsap.registerPlugin(SplitText);

const AnimatedLink = ({ href, children, className = '' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Sélectionne les deux lignes
        const topText = container.querySelector('.animated-link-top');
        const bottomText = container.querySelector('.animated-link-bottom');

        // Reset le contenu
        topText.textContent = children;
        bottomText.textContent = children;

        // Split chaque ligne en lettres
        const splitTop = new SplitText(topText, { type: 'chars' });
        const splitBottom = new SplitText(bottomText, { type: 'chars' });

        // Position initiale
        gsap.set(splitTop.chars, { y: 0 });
        gsap.set(splitBottom.chars, { y: '100%' });

        const handleMouseEnter = () => {
            const tl = gsap.timeline();

            tl.to(
                splitTop.chars,
                {
                    y: '-100%',
                    duration: 0.2,
                    stagger: 0.02,
                },
                0,
            ).to(
                splitBottom.chars,
                {
                    y: '0%',
                    duration: 0.2,
                    stagger: 0.02,
                },
                0,
            );
        };

        const handleMouseLeave = () => {
            const tl = gsap.timeline();

            tl.to(
                splitBottom.chars,
                {
                    y: '100%',
                    duration: 0.2,
                    stagger: 0.02,
                },
                0,
            ).to(
                splitTop.chars,
                {
                    y: '0%',
                    duration: 0.2,
                    stagger: 0.02,
                },
                0,
            );
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            splitTop.revert();
            splitBottom.revert();
        };
    }, [children]);

    return (
        <Link href={href} className={`inline-block ${className}`}>
            <span
                ref={containerRef}
                className="relative inline-block overflow-hidden">
                <span className="block relative animated-link-top">
                    {children}
                </span>
                <span className="block absolute left-0 top-0 animated-link-bottom">
                    {children}
                </span>
            </span>
        </Link>
    );
};

export default AnimatedLink;
