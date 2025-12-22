import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState } from "react";


function FireRune() {
  const { scene } = useGLTF("/models/fire_rune.glb");
  return <primitive object={scene} scale={1.5} />;
}
function WaterRune() {
  const { scene } = useGLTF("/models/water_rune.glb");
  return <primitive object={scene} scale={1.5} />;
}
function AirRune() {
  const { scene } = useGLTF("/models/air_rune.glb");
  return <primitive object={scene} scale={1.5} />;
}
function EarthRune() {
  const { scene } = useGLTF("/models/earth_rune.glb");
  return <primitive object={scene} scale={1.5} />;
}




export default function Options({ userIloscPytan, setUserIloscPytan, userTrudnosc, setUserTrudnosc, onNext, loading, setLoading }:
   { onNext: (a: string) => Promise<void>, userIloscPytan: number; setUserIloscPytan: (ilosc: number) => void; userTrudnosc: string; 
    setUserTrudnosc: (trudnosc: string) => void; loading: boolean; setLoading: (loading: boolean) => void }) {



  const [selectedRune, setSelectedRune] = useState("");
  const [errorText, setErrorText] = useState("");
  const errorSetNormal = (message:string) => {
    setErrorText(message);

    setTimeout(() => {
      setErrorText("");
    }, 2067);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#1D1E22]">
      <div className="relative w-4/5 h-4/5">

        <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>

        <div className="animated-border-box absolute inset-0 rounded-xl"></div>

        <div className="relative z-10 w-full h-full flex flex-col text-white p-6">
          <div className="w-full h-1/8 flex flex-col justify-center items-center">
            <h1 className="w-full h-3/4 text-4xl flex items-center justify-center">Jakie runy chcesz dodać do broni?</h1>
            <h2 className="text-gray-400 w-full h-1/4 flex items-center justify-center">Jaki poziom trudności chcesz wybrać?</h2>
          </div>
          <div className="w-full h-1/2 flex justify-around items-center">
            <div onClick={() => { setUserTrudnosc("Łatwy"), setSelectedRune("Fire") }} className={`bg-[#2e2f35] ${selectedRune === "Fire" ? "ring-4 ring-red-500" : "ring-4 ring-transparent"} 
            relative group rounded-2xl h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:`}>
              <Canvas camera={{ position: [0, 15, 0], fov: 40 }}>
                <ambientLight intensity={5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <FireRune />
                <OrbitControls />
              </Canvas>

              <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 pointer-events-none">
                <p className="text-white text-xl font-semibold text-center">Łatwy</p>
                <p className="text-gray-400 text-lg font-semibold text-center">Ognista runa</p>
              </div>
            </div>
            <div onClick={() => { setUserTrudnosc("Średni"), setSelectedRune("Water") }} className={`bg-[#2e2f35] ${selectedRune === "Water" ? "ring-4 ring-blue-500" : "ring-4 ring-transparent"} relative group rounded-2xl
             h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:`}>
              <Canvas camera={{ position: [0, 15, 0], fov: 45 }}>
                <ambientLight intensity={5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <WaterRune />
                <OrbitControls />
              </Canvas>
              <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 pointer-events-none">
                <p className="text-white text-xl font-semibold text-center">Średni</p>
                <p className="text-gray-400 text-lg font-semibold text-center">Wodna runa</p>
              </div>
            </div>
            <div onClick={() => { setUserTrudnosc("Trudny"), setSelectedRune("Air") }} className={`bg-[#2e2f35] ${selectedRune === "Air" ? "ring-4 ring-gray-200" : "ring-4 ring-transparent"} relative group rounded-2xl h-[80%] w-1/6 
            flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:`}>
              <Canvas camera={{ position: [0, 15, 0], fov: 45 }}>
                <ambientLight intensity={5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <AirRune />
                <OrbitControls />
              </Canvas>
              <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 pointer-events-none">
                <p className="text-white text-xl font-semibold text-center">Trudny</p>
                <p className="text-gray-400 text-lg font-semibold text-center">Powietrzna runa</p>
              </div>
            </div>
            <div onClick={() => { setUserTrudnosc("Bardzo Trudny"), setSelectedRune("Earth") }} className={`bg-[#2e2f35] ${selectedRune === "Earth" ? "ring-4 ring-orange-900" : "ring-4 ring-transparent"} relative group rounded-2xl
             h-[80%] w-1/6 flex flex-col justify-center items-center cursor-pointer p-4 hover:scale-105 transition-transform duration-300 hover:`}>
              <Canvas camera={{ position: [0, 15, 0], fov: 45 }}>
                <ambientLight intensity={5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <EarthRune />
                <OrbitControls />
              </Canvas>
              <div className="rounded-2xl absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 pointer-events-none">
                <p className="text-white text-xl font-semibold text-center">Bardzo Trudny</p>
                <p className="text-gray-400 text-lg font-semibold text-center">Ziemna runa</p>
              </div>
            </div>

          </div>

          <div className="w-full h-10/25 flex flex-col justify-around items-center">
            <div className="w-full h-1/2 flex justify-center items-center flex-col">
              <h1 className="text-gray-200 text-3xl w-full h-1/4 flex justify-center items-center">Ile
                {userTrudnosc === "Łatwy" ? " ognistych " : userTrudnosc === "Średni" ? " wodnych " : userTrudnosc === "Trudny" ? " powietrznych " : userTrudnosc === "Bardzo Trudny" ? " ziemnych " : " "}
                run chcesz dodać do broni?</h1>
              <h2 className="text-gray-400 text-lg w-full h-1/4 flex justify-center items-center">Na ile pytań chcesz odpowiedzieć?</h2>
            </div>
            <input type="number" value={userIloscPytan} onChange={(e) => {
              let value = Number(e.target.value);

              if (value > 5) value = 5;
              if (value < 1) value = 1;

              setUserIloscPytan(value);
            }}
              className="bg-[#2e2f35] w-1/10 h-1/6 p-4  rounded-2xl hover:scale-105 transition-transform duration-300" />
            <button 
            disabled={loading}
            onClick={async()=>{
              if(selectedRune === ""){
                errorSetNormal("Wybierz runę przed potwierdzeniem!");
                return;
              }
              await onNext('generuj');
            }} className={`w-1/3 rounded-4xl text-white border-2 border-[#2e2f35] cursor-pointer transition-transform duration-300 bg-[#1D1E22]
             p-4 ${errorText ? "ring-4 ring-red-500  hover:scale-100" : "ring-4 ring-transparent hover:scale-105"}`}>{loading ? "Generowanie Pytania ..." : errorText || "Potwierdź wybór runy"}</button>
          </div>
        </div>
      </div>


    </div>
  );
}