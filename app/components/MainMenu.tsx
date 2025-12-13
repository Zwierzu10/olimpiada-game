
import { useRouter } from "next/navigation";

export default function MainMenu() {
  const stars = Array.from({ length: 67 });
  const router = useRouter();

  const handlePlayClick = () => {
    router.push("/game");
  }




  return (
    <div className="relative w-full h-screen bg-linear-to-b from-gray-900 via-gray-700 to-yellow-900 overflow-hidden flex">
      {stars.map((_, index) => {
        const top = Math.random() * 30;
        const left = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        return (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              top: `${top}vh`,
              left: `${left}vw`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: Math.random(),
            }}
          ></div>
        );
      })}

      <div className="w-full flex flex-col justify-center items-center gap-10">
        <button onClick={handlePlayClick} className="relative flex items-center justify-center w-1/5 h-1/10 text-[clamp(12px,2vw,50px)] font-medium tracking-[0.05em] 
                            bg-[#000f42] text-white rounded-[0.9em] border-none
                            shadow-[inset_0_0_1.6em_-0.6em_#000f42] overflow-hidden
                            cursor-pointer transition-all duration-300
                            hover:bg-[#000f42]">
                     Graj
            <span className="absolute right-[0.3em] flex items-center justify-center h-[2.2em] w-[2.2em] bg-white rounded-[0.7em]
                            shadow-[0.1em_0.1em_0.6em_0.2em_#000f42] 
                            transition-all duration-300
                            hover:w-[calc(100%-0.6em)] active:scale-95">
            <svg className="w-[1.1em] text-[#000f42] transition-transform duration-300
                            hover:translate-x-[0.1em]" 
                fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z" />
            </svg>
            </span>
        </button>

        <button className="relative flex items-center justify-center w-1/3 h-1/10 text-[clamp(12px,2vw,50px)] font-medium tracking-[0.05em] 
                            bg-[#8B4513] text-white rounded-[0.9em] border-none
                            shadow-[inset_0_0_1.6em_-0.6em_#5C3317] overflow-hidden
                            cursor-pointer transition-all duration-300
                            hover:bg-[#A0522D]">
             Ekwipunek
            <span className="absolute right-[0.3em] flex items-center justify-center h-[2.2em] w-[2.2em] bg-white rounded-[0.7em]
                            shadow-[0.1em_0.1em_0.6em_0.2em_#5C3317] 
                            transition-all duration-300
                            hover:w-[calc(100%-0.6em)] active:scale-95">
            <svg className="w-[1.1em] text-[#5C3317] transition-transform duration-300
                            hover:translate-x-[0.1em]" 
                fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z" />
            </svg>
            </span>
        </button>
        </div>

    </div>
  );
};


