

const MainMenu = () => {
  const stars = Array.from({ length: 50 });
  const swordStars = [
    { top: 10, left: 30 },
    { top: 15, left: 30 },
    { top: 20, left: 30 },
    { top: 25, left: 30 },
    { top: 30, left: 30 },
    { top: 35, left: 30 },
    { top: 40, left: 30 },
    { top: 45, left: 30 },
    { top: 50, left: 30 },
    { top: 55, left: 30 },
    { top: 60, left: 30 },
    { top: 65, left: 30 },
    { top: 70, left: 30 },
    { top: 75, left: 30 },
    { top: 80, left: 30 },
    { top: 85, left: 30 },
    { top: 90, left: 30 },
    { top: 95, left: 30 },
    { top: 80, left: 28 },
    { top: 80, left: 32 },
    { top: 80, left: 26 },
    { top: 80, left: 34 },
  ];

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

      <div className="w-1/2 relative flex justify-center items-center">
        {swordStars.map((star, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              top: `${star.top}vh`,
              left: `${star.left}vw`,
              width: `4px`,
              height: `4px`,
            }}
          ></div>
        ))}
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center gap-10">
        <button className="relative flex items-center justify-center w-1/2 h-1/5 text-[clamp(12px,2vw,50px)] font-medium tracking-[0.05em] 
                            bg-[#70d6f0] text-white rounded-[0.9em] border-none
                            shadow-[inset_0_0_1.6em_-0.6em_#714da6] overflow-hidden
                            cursor-pointer transition-all duration-300
                            hover:bg-[#146f7a]">
                     Graj
            <span className="absolute right-[0.3em] flex items-center justify-center h-[2.2em] w-[2.2em] bg-white rounded-[0.7em]
                            shadow-[0.1em_0.1em_0.6em_0.2em_#008bfd] 
                            transition-all duration-300
                            hover:w-[calc(100%-0.6em)] active:scale-95">
            <svg className="w-[1.1em] text-[#008bfd] transition-transform duration-300
                            hover:translate-x-[0.1em]" 
                fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z" />
            </svg>
            </span>
        </button>

        <button className="relative flex items-center justify-center w-1/2 h-1/5 text-[clamp(12px,2vw,50px)] font-medium tracking-[0.05em] 
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

export default MainMenu;
