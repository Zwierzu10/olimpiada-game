
import { useState } from "react";

export default function Review({starePytania, odpowiedzi}: {starePytania:string[], odpowiedzi:string[]}) {

  const [pytanieTeraz, setPytanieTeraz] = useState(1);

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#1D1E22]">
        <div className="w-8/10 h-8/10 relative">
            <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
            <div className="animated-border-box absolute inset-0 rounded-xl flex justify-around items-center flex-col "></div>

            <div className="z-10 relative w-full h-full flex flex-col justify-center items-between p-4">
              <div className="w-full h-[10%] flex justify-between items-center mb-4">
                <h1 className="text-white text-4xl mb-4 w-[90%] h-full"> {starePytania[pytanieTeraz]}</h1>
                <h1 className="text-white text-4xl mb-4 w-[10%] h-full">{pytanieTeraz}/{starePytania.length - 1}</h1>
              </div>
                <div className="w-1/3 h-3/4 bg-[#2e2f35] rounded%-2xl p-4 overflow-y-auto">
                  <p className="text-white text-xl">{odpowiedzi[pytanieTeraz - 1]}</p>
                </div>
                <div className="w-full h-[10%] flex justify-between items-center mt-4">
                  <button onClick={() => setPytanieTeraz(prev => Math.max(prev - 1, 1))}
                  className="w-[10%] h-[80%] flex justify-center items-center bg-[#1D1E22] text-white rounded-2xl hover:scale-105 transition duration-300 cursor-pointer">Cofnij</button>
                  <button onClick={() => setPytanieTeraz(prev => Math.min(prev + 1, starePytania.length - 1))} 
                  className="w-[10%] h-[80%] flex justify-center items-center bg-[#1D1E22] text-white rounded-2xl hover:scale-105 transition duration-300 cursor-pointer">Dalej</button>
                </div>
            </div>
        </div>
    </div>
  )
}
