
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function Score({wyniki, typBroni}: {wyniki: number[], typBroni: string}) {
    const suma = wyniki.reduce((a, b) => a + Number(b), 0);
    const srednia = Math.round(suma / wyniki.length);

    function WeaponModel() {
        const { scene } = useGLTF(`/models/${typBroni}.glb`);
    return <primitive object={scene} scale={1} />;
    }

    return(
         <div className="w-full h-full flex justify-center items-center bg-[#1D1E22]">
            <div className="relative w-4/5 h-4/5">
                <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
                <div className="animated-border-box absolute inset-0 rounded-xl"></div>
                <div className=" relative w-full h-full flex flex-col justify-between items-center z-10 p-4">
                    <h1 className="text-white text-4xl w-full h-[15%] flex justify-center items-center">Twój końcowy wynik to: {srednia}%</h1>
                    <div className="w-full h-[85%] flex justify-around items-center">
                        <div className="w-1/3 h-[90%] bg-[#2e2f35] rounded-2xl p-4">
                         <Canvas camera={{ position: [0, 100, 0], fov: 10000 }}>
                            <ambientLight intensity={5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                        
                            <WeaponModel />
                            <OrbitControls autoRotate />
                        </Canvas> 
                        </div>
                        <div className="w-1/3 h-[90%] bg-[#2e2f35] rounded-2xl p-4">wynik</div>
                    </div>
                </div>
            </div>
        </div>
    );
}