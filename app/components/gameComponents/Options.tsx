import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";


function FireRune() {
  const { scene } = useGLTF("/models/fire_rune.glb");
  return <primitive object={scene} scale={1.5} />;
}
function WaterRune() {
  const { scene } = useGLTF("/models/water_rune.glb");
  return <primitive object={scene} scale={1.5} />;
}



export default function Writing({ userIloscPytan, setUserIloscPytan, userTrudnosc, setUserTrudnosc, onNext }: {onNext: () => void, userIloscPytan: number; setUserIloscPytan: (ilosc: number) => void; userTrudnosc: string; setUserTrudnosc: (trudnosc: string) => void; }) {
    return(
        <div className="w-full h-screen flex justify-center items-center bg-[#1D1E22]">
              <div className="relative w-4/5 h-4/5">
              
                <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
        
                <div className="animated-border-box absolute inset-0 rounded-xl"></div>
        
                <div className="relative z-10 w-full h-full flex flex-col text-white p-6">
                  <h1 className="w-full h-1/4 text-4xl flex items-center justify-center">
                    Jaki typ miecza chcesz wykuć?
                  </h1>
        
                  <div className="w-full h-3/4 flex justify-around items-center">
                    <div onClick={() => {setUserTrudnosc("Łatwy")}} className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                        <Canvas camera={{position: [0, 15, 0], fov: 40}}>
                            <ambientLight intensity={5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
        
                            <FireRune />
                            <OrbitControls />
                            </Canvas> 
        
                            <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <p className="text-white text-xl font-semibold text-center">Informatyka</p>
                                <p className="text-gray-400 text-lg font-semibold text-center">Miecz</p>
                            </div>
                    </div>
                    <div onClick={() => {setUserTrudnosc("Średni")}} className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                         <Canvas camera={{position: [0, 15, 0], fov: 45}}>
                            <ambientLight intensity={5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
        
                            <WaterRune />
                            <OrbitControls />
                            </Canvas> 
                               <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <p className="text-white text-xl font-semibold text-center">Historia</p>
                                <p className="text-gray-400 text-lg font-semibold text-center">Katana</p>
                            </div>
                    </div>
                    <div onClick={() => {setUserTrudnosc("Trudny")}} className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                        <Canvas camera={{position: [10, 1, 10], fov: 10000}}>
                            <ambientLight intensity={5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
        
                            <OrbitControls autoRotate />
                            </Canvas>
                               <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <p className="text-white text-xl font-semibold text-center">Biologia</p>
                                <p className="text-gray-400 text-lg font-semibold text-center">Sztylet</p>
                            </div>
                    </div>
                    <div onClick={() => {setUserTrudnosc("Bardzo Trudny")}} className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                        <Canvas camera={{position: [1, 500, 1], fov: 10000}}>
                            <ambientLight intensity={5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
        
                            <OrbitControls autoRotate />
                            </Canvas>
                               <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <p className="text-white text-xl font-semibold text-center">Chemia</p>
                                <p className="text-gray-400 text-lg font-semibold text-center">Duży Miecz</p>
                            </div>
                    </div>
                  
                  </div>
                </div>
              </div>
        
        
            </div>
    );
}