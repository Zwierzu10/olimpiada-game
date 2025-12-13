
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";


function SwordModel() {
  const { scene } = useGLTF("/models/sword.glb");
  return <primitive object={scene} scale={1} />;
}

function KatanaModel() {
  const { scene } = useGLTF("/models/katana.glb");
  return <primitive object={scene} scale={1.5} />;
}
function DaggerModel() {
  const { scene } = useGLTF("/models/dagger.glb");
  return <primitive object={scene} scale={1.5} />;
}
function GreatSwordModel() {
  const { scene } = useGLTF("/models/great_sword.glb");
  return <primitive object={scene} scale={1.5} />;
}
function SaberModel() {
  const { scene } = useGLTF("/models/saber.glb");
  return <primitive object={scene} scale={1.5} />;
}



export default function Choice() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#1D1E22]">
      <div className="relative w-4/5 h-4/5">
      
        <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>

        <div className="animated-border-box absolute inset-0 rounded-xl"></div>

        <div className="relative z-10 w-full h-full flex flex-col text-white p-6">
          <h1 className="w-full h-1/4 text-4xl flex items-center justify-center">
            Jaki typ miecza chcesz wykuć?
          </h1>

          <div className="w-full h-3/4 flex justify-around items-center">
            <div className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                <Canvas camera={{ position: [0, 100, 0], fov: 10000 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />

                    <SwordModel />
                    <OrbitControls autoRotate />
                    </Canvas> 

                    <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <p className="text-white text-xl font-semibold text-center">Informatyka</p>
                        <p className="text-gray-400 text-lg font-semibold text-center">Miecz</p>
                    </div>
            </div>
            <div className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                <Canvas camera={{ position: [0, 2, 0], fov: 10000 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />

                    <KatanaModel />
                    <OrbitControls  autoRotate/>
                    </Canvas>
                       <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <p className="text-white text-xl font-semibold text-center">Historia</p>
                        <p className="text-gray-400 text-lg font-semibold text-center">Katana</p>
                    </div>
            </div>
            <div className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                <Canvas camera={{ position: [10, 1, 10], fov: 10000 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />

                    <DaggerModel />
                    <OrbitControls autoRotate />
                    </Canvas>
                       <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <p className="text-white text-xl font-semibold text-center">Biologia</p>
                        <p className="text-gray-400 text-lg font-semibold text-center">Sztylet</p>
                    </div>
            </div>
            <div className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                <Canvas camera={{ position: [1, 500, 1], fov: 10000 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />

                    <GreatSwordModel />
                    <OrbitControls autoRotate />
                    </Canvas>
                       <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <p className="text-white text-xl font-semibold text-center">Chemia</p>
                        <p className="text-gray-400 text-lg font-semibold text-center">Duży Miecz</p>
                    </div>
            </div>
            <div className="bg-[#2e2f35] relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:">
                <Canvas camera={{ position: [10, 167, 10], fov: 10000 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />

                    <SaberModel />
                    <OrbitControls autoRotate />
                    </Canvas>
                       <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <p className="text-white text-xl font-semibold text-center">Geografia</p>
                        <p className="text-gray-400 text-lg font-semibold text-center">Szabla</p>
                    </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
