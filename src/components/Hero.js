import Image from 'next/image';
import dynamic from 'next/dynamic';
const Knight3D = dynamic(() => import('./Knight3D'), {
    ssr: false,
    loading: () => <div className="h-screen w-full" />,
});

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center pb-16 pt-24 bg-theme-background">
            <div className="w-full h-full px-16 flex flex-col lg:flex-row items-start justify-start gap-12">
                <div className="flex-1 flex flex-col items-start justify-start">
                    <h1 className="text-6xl md:text-9xl font-playfair text-center mb-8 text-theme-primary">
                        Échec Royal
                    </h1>
                    <div className="absolute top-0 left-0 flex justify-center pointer-events-none  items-center mb-8 w-screen h-screen">
                        <Knight3D />
                    </div>
                </div>
                <div className="w-full max-w-[450px]  flex flex-col gap-6 lg:items-end">
                    <div className="flex cursor-pointer items-center bg-gradient-black border-theme-primary text-theme-primary justify-between px-4 py-3 z-10 w-full border bg-theme-background ">
                        <div className="flex items-center  gap-3">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium  ">
                                Match en cours
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full  overflow-hidden">
                                <Image
                                    src="/images/livePlayer2.jpg"
                                    alt="Player 1"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium ">VS</span>
                            <div className="w-6 h-6 rounded-full  overflow-hidden">
                                <Image
                                    src="/images/livePlayer.jpg"
                                    alt="Player 2"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-sm ">→</span>
                        </div>
                    </div>
                    <div className="p-5 w-full bg-theme-primary text-theme-secondary">
                        <h2 className="text-3xl font-playfair leading-7 font-normal mb-4 text-theme-secondary">
                            World
                            <br />
                            Ranking
                        </h2>
                        <div className="space-y-2  mb-6">
                            <div className="flex justify-between items-center">
                                <span className="opacity-50 font-normal text-theme-secondary">
                                    Rank
                                </span>
                                <span className="w-[60px] opacity-50 font-normal text-theme-secondary">
                                    Name
                                </span>
                                <span className="opacity-50 font-normal text-theme-secondary">
                                    Elo
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="w-8 text-theme-secondary">
                                    1
                                </span>
                                <span className="text-theme-secondary">
                                    Magnus
                                </span>
                                <span className="text-theme-secondary">
                                    2837
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="w-8 text-theme-secondary">
                                    2
                                </span>
                                <span className="text-theme-secondary">
                                    Hikaru
                                </span>
                                <span className="text-theme-secondary">
                                    2804
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="w-8 text-theme-secondary">
                                    3
                                </span>
                                <span className="text-theme-secondary">
                                    Gukesh
                                </span>
                                <span className="text-theme-secondary">
                                    2787
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="w-8 text-theme-secondary">
                                    4
                                </span>
                                <span className="text-theme-secondary">
                                    Erigaisi
                                </span>
                                <span className="text-theme-secondary">
                                    2782
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="w-8 text-theme-secondary">
                                    5
                                </span>
                                <span className="text-theme-secondary">
                                    Caruana
                                </span>
                                <span className="text-theme-secondary">
                                    2776
                                </span>
                            </div>
                        </div>
                        <button className="flex items-center cursor-pointer bg-gradient-white justify-center gap-2 px-6 py-3 border transition w-full  border-theme-secondary text-theme-secondary">
                            <span>Voir le classement</span>
                            <span>→</span>
                        </button>
                    </div>
                    <div className="border p-6 w-full bg-theme-background border-theme-primary">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-3xl font-playfair font-normal leading-7 text-theme-primary">
                                Sharjah
                                <br />
                                Master
                                <br />
                                2025
                            </h2>
                            <span className="text-sm font-normal text-theme-primary">
                                16.05 - 26.05
                            </span>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium mb-2 text-theme-primary">
                                Players :
                            </p>
                            <ul className="text-sm space-y-1 text-theme-primary">
                                <li>• Nodirbek Abdusattorov</li>
                                <li>• Anish Giri</li>
                                <li>• Maghsoodloo Parham</li>
                                <li>• Sevian Samuel</li>
                            </ul>
                        </div>
                        <button className="flex cursor-pointer items-center bg-gradient-black justify-center gap-2 px-6 py-3 border transition w-full border-theme-primary text-theme-primary">
                            <span>Détail du tournoi</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
