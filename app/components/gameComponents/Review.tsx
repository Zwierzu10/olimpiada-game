
import { useEffect, useState } from "react";


type ZanalizowanaOdpowiedz = {
  tekst: string;
  wynik: "dobrze" | "srednio" | "zle";
  wytlumaczenie: string;
}

type ReviewResponse = {
  analiza: ZanalizowanaOdpowiedz[];
  punkty: number;
}

export default function Review({starePytania, odpowiedzi, onNext, userTrudnosc, wyniki, setWyniki}: 
  {starePytania:string[], odpowiedzi:string[], onNext: (a:string) => void, userTrudnosc: string, wyniki: number[], setWyniki: React.Dispatch<React.SetStateAction<number[]>>}) {

  const [pytanieTeraz, setPytanieTeraz] = useState(1);
  const [analiza, setAnaliza] = useState<ZanalizowanaOdpowiedz[]>([]);
  

  useEffect(()=>{
    const fetchReview = async () => {
      const response = await fetch('/api/reviewAnswer', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pytanie: starePytania[pytanieTeraz],
          odpowiedz : odpowiedzi[pytanieTeraz - 1],
          trudnosc: userTrudnosc,
        }),
      });


      const data: ReviewResponse = await response.json();
      setAnaliza(data.analiza)

      setWyniki(prev=>{
        const newWyniki = [...prev];
        newWyniki[pytanieTeraz - 1] = data.punkty;
        return newWyniki;
      })
    };
    fetchReview();
  },[starePytania, odpowiedzi, pytanieTeraz]);



  return (
    <div className="w-full h-full flex justify-center items-center bg-[#1D1E22]">
      <div className="w-8/10 h-8/10 relative">
        <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
        <div className="animated-border-box absolute inset-0 rounded-xl flex justify-around items-center flex-col "></div>

        <div className="z-10 relative w-full h-full flex flex-col justify-center items-between p-4">
          <div className="w-full h-[10%] flex justify-between items-center mb-4">
            <h1 className="text-white text-2xl mb-4 w-[90%] h-full">
              {starePytania[pytanieTeraz]}
            </h1>
            <h1 className="text-white text-2xl mb-4 w-[10%] h-full">
              {pytanieTeraz}/{starePytania.length-1}
            </h1>
          </div>

          <div className="w-full h-3/4 flex justify-around items-center gap-4">
            <div className="w-1/3 h-full bg-[#2e2f35] rounded-2xl p-4 overflow-y-auto">
              {analiza.map((item, index) => (
                <span
                  key={index}
                  className={`block mb-2 p-2 rounded-xl
                    ${item.wynik === "dobrze" && "bg-green-500/20 text-green-300"}
                    ${item.wynik === "srednio" && "bg-orange-500/20 text-orange-300"}
                    ${item.wynik === "zle" && "bg-red-500/20 text-red-300"}
                  `}
                >
                  {item.tekst}
                </span>
              ))}
            </div>

            <div className="w-1/3 h-full bg-[#2e2f35] rounded-2xl p-4 overflow-y-auto">
              <h1 className="w-full flex justify-center text-white">Wynik: {wyniki[pytanieTeraz - 1]}%</h1>
              {analiza.map((item, index) => (
                <div key={index} className="mb-4">
                  <p className="text-white font-bold underline">{item.tekst}</p>
                  <p className="text-gray-300 text-sm">{item.wytlumaczenie}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[10%] flex justify-between items-center mt-4">
           <div></div>

            <button
              onClick={() => {
                if (pytanieTeraz === starePytania.length-1) {
                  onNext("676767676767"); 
                } else {
                  setPytanieTeraz((prev) => Math.min(prev + 1, starePytania.length-1));
                }
              }}
              className="w-[10%] h-[80%] flex justify-center items-center bg-[#1D1E22] text-white rounded-2xl hover:scale-105 transition duration-300 cursor-pointer"
            >
              Dalej
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
