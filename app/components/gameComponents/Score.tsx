
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect } from "react";


export default function Score({wyniki, typBroni, nazwaBroni, setNazwaBroni, setTypBroni, userTrudnosc}: 
    {wyniki: number[], typBroni: string, nazwaBroni: string, setNazwaBroni: React.Dispatch<React.SetStateAction<string>>, setTypBroni: React.Dispatch<React.SetStateAction<string>>, userTrudnosc: string}) {
    const suma = wyniki.reduce((a, b) => a + Number(b), 0);
    const srednia = Math.round(suma / wyniki.length);



    useEffect(() => {
        if (typBroni === "Informatyka") {
            setTypBroni("sword");   
        } else if (typBroni === "Historia") {
            setTypBroni("katana");
        } else if (typBroni === "Biologia") {
            setTypBroni("dagger");
        } else if (typBroni === "Chemia") {
            setTypBroni("great_sword");
        } else if (typBroni === "Geografia") {
            setTypBroni("saber");
        }
    }, [typBroni, setTypBroni]);


    function WeaponModel() {
        const { scene } = useGLTF(`/models/${typBroni}.glb`);
    return <primitive object={scene} scale={1} />;
    }

    let cameraPosition: [number, number, number] = [0, 5, 0];

    if (typBroni === "sword") {
        cameraPosition = [0, 4, 0];
    }else if(typBroni === "katana"){
        cameraPosition = [0, 5, 0];
    }else if(typBroni === "dagger"){
        cameraPosition = [0, 8, 0];
    }else if(typBroni === "great_sword"){
        cameraPosition = [0, 9, 0];
    }else if(typBroni === "saber"){
        cameraPosition = [0, 5, 0];
    }

    let runa = "";
    if(userTrudnosc === "Łatwy"){
        runa = "Ognia";
    }else if(userTrudnosc === "Średni"){
        runa = "Wody";
    }else if(userTrudnosc === "Trudny"){
        runa = "Powietrza";
    }else if(userTrudnosc === "Bardzo Trudny"){
        runa = "Ziemi";
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
                         <Canvas camera={{ position: cameraPosition, fov: 45 }}>
                            <ambientLight intensity={5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                        
                            <WeaponModel />
                            <OrbitControls  />
                        </Canvas> 
                        </div>
                        <div className="w-1/3 h-[90%] bg-[#2e2f35] rounded-2xl p-4 flex flex-col justify-between items-center">
                           
                           <div className="w-full h-[80%]">
                                <h2 className="text-white text-2xl mt-4 w-full flex justify-center items-center">Statystyki broni:</h2>
                                <ul className="text-gray-300 mt-4 list-disc list-inside w-full flex justify-center items-center flex-col gap-y-2">
                                    <li className="w-[80%] flex justify-start">Typ broni: {typBroni}</li>
                                    <li className="w-[80%] flex items-center gap-x-2">
                                        <span className="w-[40%]">Nazwa broni:</span>
                                        <input className="w-[60%] h-full bg-[#2b2c30] text-white rounded-md px-2" type="text" value={nazwaBroni} onChange={(e)=>setNazwaBroni(e.target.value)}/>
                                    </li>
                                    <li className="w-[80%] flex justify-start items-center">Średni wynik użytkownika: {srednia}%</li>
                                    <li className="w-[80%] flex justify-start items-center">Dodana runa: Runa {runa}</li>
                                </ul>
                           </div>


                            <div className="w-full h-[20%] flex justify-around items-center">
                                <button className="w-1/3 h-1/2 bg-[#4a4a4a] rounded-2xl cursor-pointer text-white ring-4 ring-red-500 hover:scale-105 transition duration-300">Zniszcz miecz</button>
                                <button className="w-1/3 h-1/2 bg-[#4a4a4a] rounded-2xl cursor-pointer text-white ring-4 ring-green-500 hover:scale-105 transition duration-300">Zachowaj miecz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
