'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import AnimatedLink from './AnimatedLink';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className="fixed left-0 pt-[75px] pb-2 top-0 h-full ml-2 flex flex-col justify-between items-center z-40 pointer-events-none select-none">
                {[8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
                    <span
                        key={n}
                        className="text-lg font-bold text-theme-primary">
                        {n}
                    </span>
                ))}
            </div>
            <div className="fixed bottom-0 mb-2 pl-[10vw]  right-0 w-full flex justify-between items-center px-8 z-40 pointer-events-none select-none">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((l) => (
                    <span
                        key={l}
                        className="text-lg font-bold text-theme-primary">
                        {l}
                    </span>
                ))}
            </div>
            <header className="fixed backdrop-blur-xs top-0 p-3 left-0 w-full z-50 transition-duration-300ms bg-transparent">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="font-family-serif text-2xl font-bold text-theme-primary">
                            <Image
                                src="/svg/logo.svg"
                                alt="logo"
                                className=""
                                width={50}
                                height={55}
                            />
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <AnimatedLink
                            href="/"
                            className="transition-colors text-theme-primary leading-5">
                            Présentation
                        </AnimatedLink>
                        <AnimatedLink
                            href="/"
                            className="transition-colors text-theme-primary leading-5">
                            Blog
                        </AnimatedLink>
                        <AnimatedLink
                            href="/"
                            className="transition-colors text-theme-primary leading-5">
                            Témoignages
                        </AnimatedLink>
                        <AnimatedLink
                            href="/"
                            className="transition-colors text-theme-primary leading-5">
                            Contact
                        </AnimatedLink>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full  transition-opacity text-theme-primary"
                            title={`Passer au mode ${
                                theme === 'light' ? 'sombre' : 'clair'
                            }`}>
                            {theme === 'light' ? (
                                <Image
                                    src="/svg/switch-dark.svg"
                                    alt="switch-light"
                                    className="cursor-pointer"
                                    width={50}
                                    height={50}
                                />
                            ) : (
                                <Image
                                    src="/svg/switch-light.svg"
                                    alt="switch-dark"
                                    className="cursor-pointer"
                                    width={50}
                                    height={50}
                                />
                            )}
                        </button>

                        <Link
                            href="/"
                            className="hidden md:inline-flex px-4 py-2 border  text-sm transition-colors bg-gradient-black text-theme-primary border-theme-primary">
                            Rejoindre le club →
                        </Link>

                        <button className="md:hidden text-theme-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
