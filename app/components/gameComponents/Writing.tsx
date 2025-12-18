import { useState } from "react";
export default function Writing({ userIloscPytan, pytanie, odpowiedzi, setOdpowiedzi, onNext }: 
  { userIloscPytan: number, pytanie: string, odpowiedzi: string[], setOdpowiedzi: (odpowiedzi: string[]) => void, onNext: (a: string) => Promise<void> }) {

  const [terazPytanie, setTerazPytanie] = useState(1);
  const [localOdpowiedz, setLocalOdpowiedz] = useState("");




  return( 
  <div className="w-full h-full flex justify-center items-center bg-[#1D1E22]">
    <div className="relative w-4/5 h-4/5">
        <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
        <div className="animated-border-box absolute inset-0 rounded-xl"></div>
        
        <div className=" relative w-full h-full flex flex-col justify-between items-center z-10 p-4">
          <div className="w-full h-1/6 flex justify-around items-center flex-row">
          <div className="w-3/10"></div>
            <h1 className="w-9/10 h-full text-2xl text-white bg-[#1d1e2286] p-4 rounded-3xl">{pytanie}</h1>
            <h1 className="w-3/10 flex justify-end items-start h-full text-white text-2xl p-4">{terazPytanie}/{userIloscPytan}</h1>
          </div>
          <div className="w-full h-3/6 rounded-3xl p-4 text-white text-xl overflow-y-auto flex justify-center items-center">
            <textarea onChange={(e)=>setLocalOdpowiedz(e.target.value)} value={localOdpowiedz} className=" w-full h-9/10 bg-[#2e2f35] rounded-3xl p-4"/>
          </div>
          <div className="w-full h-1/6 flex justify-end items-center">
            <button onClick={
              async ()=>{
                setOdpowiedzi([...odpowiedzi, localOdpowiedz]), 
                setTerazPytanie(prev => prev + 1),
                await onNext('generujBez67'),
                setLocalOdpowiedz("");

              }} 
              className="bg-[#2e2f35] text-white p-4 rounded-3xl hover:scale-105 transition-transform duration-300 cursor-pointer">Dalej</button>
          </div>
        </div>
      </div>
  </div>
  );
}