'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import ChessboardTransition from './ChessboardTransition';

const ChessIcon = ({ isWhite, className = '' }) => (
    <Image
        src={isWhite ? '/svg/white-chess.svg' : '/svg/black-chess.svg'}
        alt="chess"
        priority
        width={200}
        height={214}
    />
);

const SideChooser = ({ onSideChosen }) => {
    const [hoveredSide, setHoveredSide] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hidePreloader, setHidePreloader] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);
    const { setTheme } = useTheme();

    const handleSideChoice = (side) => {
        setIsTransitioning(true);
        setTheme(side === 'white' ? 'light' : 'dark');

        // Après que l'échiquier soit complètement apparu, faire disparaître le preloader
        setTimeout(() => {
            setHidePreloader(true);

            // Une fois le preloader caché, masquer complètement le composant
            setTimeout(() => {
                setShowPreloader(false);
            }, 50); // Durée de l'animation hidePreloader
        }, 1000); // Attendre que l'échiquier soit complètement rempli
    };

    const handleTransitionComplete = () => {
        // L'échiquier a terminé sa transition complète (apparition + disparition)
        setTimeout(() => {
            onSideChosen();
        }, 200);
    };

    const leftWidth =
        hoveredSide === 'white'
            ? '60%'
            : hoveredSide === 'black'
            ? '40%'
            : '50%';
    const rightWidth =
        hoveredSide === 'black'
            ? '60%'
            : hoveredSide === 'white'
            ? '40%'
            : '50%';

    return (
        <>
            {showPreloader && (
                <div
                    className={`preloader fixed inset-0 z-50 flex ${
                        hidePreloader ? 'preloader-hide' : ''
                    }`}>
                    <div
                        className="relative flex flex-col items-center justify-center bg-[#f5e6d3] text-[#5d4e37] cursor-pointer transition-all duration-300 ease-out"
                        style={{ width: leftWidth }}
                        onMouseEnter={() =>
                            !isTransitioning && setHoveredSide('white')
                        }
                        onMouseLeave={() =>
                            !isTransitioning && setHoveredSide(null)
                        }
                        onClick={() =>
                            !isTransitioning && handleSideChoice('white')
                        }>
                        <div className="text-center flex flex-col items-center justify-center gap-20">
                            <h2 className="text-4xl font-serif font-medium">
                                Je choisis les Blancs
                            </h2>

                            <ChessIcon isWhite={true} />

                            <button className="px-8 py-3  cursor-pointer  bg-transparent   text-lg font-medium flex items-center gap-2">
                                Jouer de ce côté
                                <span>→</span>
                            </button>
                        </div>
                    </div>

                    <div
                        className="relative flex flex-col items-center justify-center bg-brown text-white cursor-pointer transition-all duration-300 ease-out"
                        style={{ width: rightWidth }}
                        onMouseEnter={() =>
                            !isTransitioning && setHoveredSide('black')
                        }
                        onMouseLeave={() =>
                            !isTransitioning && setHoveredSide(null)
                        }
                        onClick={() =>
                            !isTransitioning && handleSideChoice('black')
                        }>
                        <div className="text-center flex flex-col items-center justify-center gap-20">
                            <h2 className="text-4xl font-serif font-medium">
                                Je choisis les Noirs
                            </h2>

                            <ChessIcon isWhite={false} />

                            <button className="px-8 py-3 cursor-pointer transition-colors duration-200 text-lg font-medium flex items-center gap-2">
                                Jouer de ce côté
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ChessboardTransition
                isVisible={isTransitioning}
                onComplete={handleTransitionComplete}
            />
        </>
    );
};

export default SideChooser;
