'use client'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRouter } from "next/navigation";

type Weapon = {
    id: string;
    nazwaBroni: string;
    runa: string;
    srednia: number;
    typBroni: string;
}

const weaponModels: Record<string, React.FC> = {
    sword: () => {
        const { scene } = useGLTF("/models/sword.glb");
        return <primitive object={scene.clone()} scale={1} />;
    },
    katana: () => {
        const { scene } = useGLTF("/models/katana.glb");
        return <primitive object={scene.clone()} scale={1.5} />;
    },
    dagger: () => {
        const { scene } = useGLTF("/models/dagger.glb");
        return <primitive object={scene.clone()} scale={1.5} />;
    },
    great_sword: () => {
        const { scene } = useGLTF("/models/great_sword.glb");
        return <primitive object={scene.clone()} scale={1.5} />;
    },
    saber: () => {
        const { scene } = useGLTF("/models/saber.glb");
        return <primitive object={scene.clone()} scale={1.5} />;
    },
}

const weaponCameras: Record<string, [number, number, number]> = {
  sword: [0, 4, 0],
  katana: [0, 5, 0],
  dagger: [0, 8, 0],
  great_sword: [0, 9, 0],
  saber: [0, 5, 0],
};


const runyModels: Record<string, React.FC> = {
    Ognia: () => {
        const { scene } = useGLTF("/models/fire_rune.glb");
        return <primitive object={scene.clone()} scale={1} />;
    },
    Powietrza: () => {
        const { scene } = useGLTF("/models/air_rune.glb");
        return <primitive object={scene.clone()} scale={1.5} />;
    },
    Wody: () => {
        const { scene } = useGLTF("/models/water_rune.glb");
        return <primitive object={scene.clone()} scale={1.5} />;
    },
    Ziemi: () => {
        const { scene } = useGLTF("/models/earth_rune.glb");
        return <primitive object={scene.clone()} scale={1.5} />;
    },
}

const weaponPolskie: Record<string, string> = {
  sword: "Miecz",
  katana: "Katana",
  dagger: "Sztylet",
  great_sword: "Wielki Miecz",
  saber: "Szabla",
};


export default function Inventory(){

    const [cosWybrane, setCosWybrane] = useState(false);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

    const router = useRouter();


    useEffect(()=>{
        const fetchWeapons = async () => {
            const snapshot = await getDocs(collection(db, "weapons"));
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Weapon[];
            setWeapons(data);
        }
        fetchWeapons();
    },[])

    const handleBackClick = () => {
        router.push("/");
    }

    return(
    <div className="w-full h-full flex justify-center items-center bg-[#1D1E22]">
        <div className="absolute top-[45%] left-[1%] bg-[#313338] w-20 aspect-square rounded-full flex justify-center items-center cursor-pointer
         text-white hover:scale-105 transition-transform duration-300 ring-2 ring-gray-600 shadow-lg shadow-gray-700" onClick={handleBackClick}>Cofnij</div>
        <div className="relative w-4/5 h-4/5">
            <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
            <div className="animated-border-box absolute inset-0 rounded-xl"></div>

            <div className=" relative w-full h-full flex flex-row justify-between items-center z-10 p-4">
                <div className="w-55/100 h-full bg-[#313338] rounded-2xl overflow-y-auto grid grid-cols-4 gap-4 p-4">
                    {weapons.map(weapon => (
                        <div className="w-full aspect-square bg-[#292a2e] m-2 rounded-lg cursor-pointer hover:bg-[#3a3b40] transition-flex p-2 hover:shadow-lg 
                        hover:scale-95 transition-transform duration-300 relative" 
                        key={weapon.id} onClick={()=>{
                            setSelectedWeapon(weapon)
                            setCosWybrane(true)
                        }}>
                            <h1 className="w-full h-1/5 text-white mt-1">{weapon.nazwaBroni}</h1>
                            <div className="w-full h-4/5">
                                <Canvas camera={{ position: weaponCameras[weapon.typBroni], fov:45 }}>
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} intensity={1} />
                                    {(()=>{
                                        const Model = weaponModels[weapon.typBroni];
                                        return Model ? <Model /> : null;
                                    })()}
                                    <OrbitControls
                                        enableZoom={false}
                                        enablePan={false}
                                        enableRotate={false}
                                    />
                                </Canvas>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`w-35/100 h-full ${cosWybrane ? "bg-[#313338]" : "bg-[#292a2e]"} rounded-2xl flex flex-col justify-start items-center` }>
                    {cosWybrane && (
                    <>
                        <h1 className="text-white text-2xl mt-4">{selectedWeapon?.nazwaBroni}</h1>
                        <h2 className="text-gray-400 mt-2">Runa: {selectedWeapon?.runa}</h2>
                        <h2 className="text-gray-400 mt-2">Jakość Wykucia: {selectedWeapon?.srednia}%</h2>
                        <h2 className="text-gray-400 mt-2">Typ broni: {selectedWeapon ? weaponPolskie[selectedWeapon.typBroni] : ""}</h2>
                    </>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}