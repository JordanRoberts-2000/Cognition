import Category from "./components/categories/Category"
import Header from "./components/ui/header/Header"
import data from "./data/data.json"

const App = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row">
                <div className="flex-[2] sticky top-11 bg-white border-b border-slate-300 z-10">
                    <ul className="flex md:flex-col gap-4 md:gap-1 w-full overflow-x-auto p-2 pr-6 font-medium">
                        <li className="border-2 border-black px-2 rounded-md">Priority</li>
                        <li className="border-2 border-black px-2 rounded-md">Databases</li>
                        <li className="border-2 border-black px-2 rounded-md">Backend</li>
                        <li className="border-2 border-black px-2 rounded-md">Frontend</li>
                        <li className="border-2 border-black px-2 rounded-md">OS</li>
                        <li className="border-2 border-black px-2 rounded-md">Cloud</li>
                        <li className="border-2 border-black px-2 rounded-md">Languages</li>
                        <li className="px-3 rounded-md bg-black text-white">+</li>
                    </ul>
                </div>
                <div className="flex gap-4 mt-2 ml-2">
                    <div className="rounded-full bg-black p-2 h-8 flex items-center justify-center w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </div>
                    <div className="rounded-full bg-black p-2 h-8 flex items-center justify-center w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                    <div className="rounded-full bg-black p-2 h-8 flex items-center justify-center w-8">
                        <svg className="fill-white h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 512"><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                    </div>
                    <div className="rounded-full bg-black p-2 h-8 flex items-center justify-center w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-4 flex-[8] p-4">
                    {data.allData.map((el, i) => <Category key={i} title={el.name} />)}
                </div>
            </div>
        </>
    )
}

export default App