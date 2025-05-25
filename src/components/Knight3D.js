'use client';

import { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

// Cache global des matériaux - créés une seule fois
let materialsCache = null;

const createMaterials = () => {
    if (materialsCache) return materialsCache;

    materialsCache = {
        light: new THREE.MeshStandardMaterial({
            color: new THREE.Color('#fcdbbb'),
            transparent: false,
            opacity: 1.0,
            metalness: 0.3,
            roughness: 0.5,
        }),
        dark: new THREE.MeshStandardMaterial({
            color: new THREE.Color('#404040'),
            transparent: false,
            opacity: 1.0,
            metalness: 0.3,
            roughness: 0.5,
        }),
    };

    return materialsCache;
};

// Composant de fallback pendant le chargement
const LoadingFallback = () => {
    return (
        <mesh position={[1, -3.68, 0]}>
            <boxGeometry args={[1, 2, 1]} />
            <meshStandardMaterial
                color="#666"
                transparent
                opacity={0.3}
                wireframe
            />
        </mesh>
    );
};

// Knight Model Component avec gestion d'erreur
function KnightModel({ mousePosition, theme }) {
    const groupRef = useRef();
    const [isConfigured, setIsConfigured] = useState(false);
    const [loadError, setLoadError] = useState(false);

    // Chargement avec gestion d'erreur
    const { scene, error } = useGLTF('/3D/knight.glb', true);

    // Créer les matériaux immédiatement
    const materials = useMemo(() => createMaterials(), []);

    // Gérer les erreurs de chargement
    useEffect(() => {
        if (error) {
            console.warn('Erreur de chargement du modèle 3D:', error);
            setLoadError(true);
        }
    }, [error]);

    // Configurer le modèle une seule fois
    useEffect(() => {
        if (scene && materials && !isConfigured && !loadError) {
            // Utiliser requestIdleCallback pour ne pas bloquer le thread principal
            const configure = () => {
                scene.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material =
                            theme === 'dark' ? materials.dark : materials.light;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                setIsConfigured(true);
            };

            if (window.requestIdleCallback) {
                window.requestIdleCallback(configure);
            } else {
                // Fallback pour les navigateurs qui ne supportent pas requestIdleCallback
                setTimeout(configure, 0);
            }
        }
    }, [scene, materials, theme, isConfigured, loadError]);

    // Changer les matériaux lors du changement de thème
    useEffect(() => {
        if (scene && isConfigured && materials && !loadError) {
            const targetMaterial =
                theme === 'dark' ? materials.dark : materials.light;

            // Utiliser requestIdleCallback pour éviter le blocage
            const updateMaterials = () => {
                scene.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material = targetMaterial;
                    }
                });
            };

            if (window.requestIdleCallback) {
                window.requestIdleCallback(updateMaterials);
            } else {
                setTimeout(updateMaterials, 0);
            }
        }
    }, [theme, scene, isConfigured, materials, loadError]);

    // Animation avec optimisation
    useFrame(() => {
        if (groupRef.current && mousePosition) {
            const baseRotationY = Math.PI * 0.3;
            const rotationOffset = mousePosition.x * 0.3;

            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                baseRotationY + rotationOffset,
                0.05,
            );

            const targetX = -5 + mousePosition.x * 0.3;
            groupRef.current.position.x = THREE.MathUtils.lerp(
                groupRef.current.position.x,
                targetX,
                0.05,
            );
        }
    });

    // Afficher le fallback en cas d'erreur
    if (loadError || !scene || !materials) {
        return <LoadingFallback />;
    }

    return (
        <group ref={groupRef} position={[1, -3.68, 0]}>
            <primitive object={scene} scale={[2, 2, 2]} />
        </group>
    );
}

const Knight3D = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };

        // Attendre que le DOM soit prêt avant d'ajouter les listeners
        if (mounted) {
            window.addEventListener('mousemove', handleMouseMove, {
                passive: true,
            });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mounted]);

    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                camera={{
                    position: [1, 0, 15],
                    fov: 50,
                }}
                shadows
                style={{ background: 'transparent', pointerEvents: 'none' }}
                performance={{ min: 0.8 }} // Optimisation performance
                dpr={[1, 2]} // Limitation du DPR pour de meilleures performances
            >
                <Suspense fallback={<LoadingFallback />}>
                    <Environment environmentIntensity={0.8} preset="sunset" />

                    <directionalLight
                        position={[15, 15, 2]}
                        intensity={1.1}
                        castShadow
                        shadow-mapSize-width={1024} // Réduit de 2048 à 1024
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-12}
                        shadow-camera-right={12}
                        shadow-camera-top={12}
                        shadow-camera-bottom={-12}
                        shadow-radius={4}
                        shadow-blurSamples={8} // Réduit de 16 à 8
                    />

                    <ambientLight intensity={0.35} />

                    <mesh
                        position={[1, -5.1, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        receiveShadow>
                        <planeGeometry args={[50, 50]} />
                        <shadowMaterial opacity={0.25} transparent />
                    </mesh>

                    <KnightModel mousePosition={mousePosition} theme={theme} />
                </Suspense>
            </Canvas>
        </div>
    );
};

// Préchargement conditionnel - uniquement si le navigateur le supporte
if (typeof window !== 'undefined' && window.requestIdleCallback) {
    window.requestIdleCallback(() => {
        useGLTF.preload('/3D/knight.glb');
    });
} else if (typeof window !== 'undefined') {
    // Fallback avec setTimeout
    setTimeout(() => {
        useGLTF.preload('/3D/knight.glb');
    }, 1000);
}

export default Knight3D;
