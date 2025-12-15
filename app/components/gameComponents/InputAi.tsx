
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";


function WaterBucket() {
  const { scene } = useGLTF("/models/waterbucket.glb");
  return <primitive object={scene} scale={1.5} />;
}


export default function InputAi({userTemat, setUserTemat, onNext}: {userTemat: string, setUserTemat: (temat: string) => void, onNext: () => void}) {

    return(
        <div className="w-full h-full bg-[#1D1E22] flex justify-center items-center">
            <div className="w-8/10 h-8/10 relative">
                <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
                <div className="animated-border-box absolute inset-0 rounded-xl flex justify-around items-center flex-col ">

                    <div className="z-10 w-1/2 h-1/2 flex flex-col justify-around items-center">
                        <h1 className="text-white text-4xl">Co dokładnie chcesz wykuć?</h1>
                        <h2 className="text-gray-500 ml-[1%]">Napisz jaki dokładnie temat chcesz się pouczyć (np: HTML)</h2>
                        <textarea value={userTemat} onChange={(e)=> setUserTemat(e.target.value)} className="bg-[#2e2f35] w-full h-[70%]
                          p-4 border-4 border-gray-600 rounded-2xl text-white flex justify-start items-start text-xl hover:scale-101 transition-transform duration-300"/>
                          <button onClick={onNext} className="w-1/5 rounded-4xl text-white border-2 border-[#2e2f35] cursor-pointer hover:scale-105 transition-transform duration-300 bg-[#1D1E22]">Potwierdź</button>
                    </div>                
                    <div className="z-10 text-white w-full h-1/2 p-4">
                        <Canvas camera={{position: [0, 500, 500], fov: 45,}}>
                            <ambientLight intensity={30} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />

                            <WaterBucket />
                            <OrbitControls autoRotate />
                        </Canvas> 
                    </div>
                </div>
            </div>
        </div>
    );
}