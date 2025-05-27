'use client';

import { useState } from 'react';
import Image from 'next/image';
import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';
import SideChooser from '@/components/SideChooser';
import Intro from '@/components/Intro';
import Events from '@/components/Events';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
    const [showPreloader, setShowPreloader] = useState(true);
    const [selectedSide, setSelectedSide] = useState(null);

    const handleSideChosen = (side) => {
        setSelectedSide(side);
        setShowPreloader(false);
    };

    return (
        <>
            {showPreloader && <SideChooser onSideChosen={handleSideChosen} />}
            <div>
                <Hero />
                <Intro />
                <Events />
                <Testimonials />
                <Footer />
            </div>
        </>
    );
}
