export default function ReviewLoading(){
    return(
         <div className="w-full h-full flex flex-col justify-center items-center gap-6 text-white">
      
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

            <h1 className="text-2xl tracking-wide animate-pulse">
                Analizuję odpowiedź...
            </h1>

            <div className="w-1/2 h-3 bg-[#2e2f35] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-loading-bar"></div>
            </div>

        </div>
    )
}