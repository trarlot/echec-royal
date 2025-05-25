'use client';

import { useState, useEffect } from 'react';

const ChessboardTransition = ({ isVisible, onComplete }) => {
    const [animationPhase, setAnimationPhase] = useState('idle'); // 'idle', 'entering', 'visible', 'exiting', 'hidden'

    useEffect(() => {
        if (isVisible && animationPhase === 'idle') {
            setAnimationPhase('entering');

            // Après que toutes les cases soient apparues, rester visible plus longtemps
            setTimeout(() => {
                setAnimationPhase('visible');
                // Attendre que le preloader soit complètement parti avant de commencer à sortir
                setTimeout(() => {
                    setAnimationPhase('exiting');

                    // Une fois la sortie terminée, notifier le parent
                    setTimeout(() => {
                        setAnimationPhase('hidden');
                        onComplete && onComplete();
                    }, 1000); // Durée de l'animation de sortie
                }, 500); // Temps d'attente pendant que le preloader disparaît
            }, 1000); // Durée de l'animation d'entrée
        }
    }, [isVisible, animationPhase, onComplete]);

    // Réactiver le scroll uniquement à la fin de toute la transition
    useEffect(() => {
        if (animationPhase === 'hidden') {
            // Réactiver le scroll avec les classes CSS
            document.body.classList.add('scroll-enabled');
            document.documentElement.classList.add('scroll-enabled');

            // Redémarrer Lenis
            if (window.lenis) {
                window.lenis.start();
            }
        }
    }, [animationPhase]);

    if (animationPhase === 'idle' || animationPhase === 'hidden') {
        return null;
    }

    // Créer une grille de cases d'échiquier
    const squares = [];
    const gridSize = 6; // 8x8 cases pour un effet plus léger

    // Créer des délais aléatoires pour un effet plus organique
    const randomDelays = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        randomDelays.push({
            enter: Math.random() * 800, // Délai d'entrée aléatoire entre 0 et 800ms
            exit: Math.random() * 500, // Délai de sortie aléatoire entre 0 et 600ms
        });
    }

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const isLight = (row + col) % 2 === 0;
            const squareIndex = row * gridSize + col;
            const enterDelay = randomDelays[squareIndex].enter;
            const exitDelay = randomDelays[squareIndex].exit;

            squares.push(
                <div
                    key={`${row}-${col}`}
                    className={`absolute ${
                        isLight ? 'bg-[#f5e6d3]' : 'bg-[#8b4513]'
                    } chess-square`}
                    style={{
                        left: `${(col / gridSize) * 100}%`,
                        top: `${(row / gridSize) * 100}%`,
                        width: `${100 / gridSize}%`,
                        height: `${100 / gridSize}%`,
                        border: '1px solid black',
                        boxSizing: 'border-box',
                        animationDelay:
                            animationPhase === 'entering'
                                ? `${enterDelay}ms`
                                : animationPhase === 'exiting'
                                ? `${exitDelay}ms`
                                : '0ms',
                        animationName:
                            animationPhase === 'entering'
                                ? 'enterSquare'
                                : animationPhase === 'exiting'
                                ? 'exitSquare'
                                : 'none',
                        animationDuration:
                            animationPhase === 'entering'
                                ? '0.4s'
                                : animationPhase === 'exiting'
                                ? '0.3s'
                                : '0s',
                        animationFillMode: 'forwards',
                        animationTimingFunction:
                            animationPhase === 'entering'
                                ? 'ease-out'
                                : 'ease-in',
                        // État initial selon la phase
                        opacity:
                            animationPhase === 'visible' ||
                            animationPhase === 'exiting'
                                ? 1
                                : 0,
                    }}
                />,
            );
        }
    }

    return (
        <>
            <style jsx>{`
                @keyframes enterSquare {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes exitSquare {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
            `}</style>
            <div className="fixed inset-0 z-[60] overflow-hidden">
                {squares}
            </div>
        </>
    );
};

export default ChessboardTransition;
