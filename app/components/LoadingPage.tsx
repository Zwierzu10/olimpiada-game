const LoadingPage = () => {
    return ( 
    <div className="flex items-center justify-center h-screen z-50">
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 text-lg font-medium">Ładowanie...</p>
        </div>
    </div>
     );
}
 
export default LoadingPage;