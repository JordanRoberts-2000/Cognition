import Category from "./components/categories/Category"
import Header from "./components/ui/header/Header"
import data from "./data/data.json"

const App = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row">
                <div className="flex-[2] sticky top-11 bg-white border-b border-slate-300 z-10">
                    <ul className="flex md:flex-col gap-4 md:gap-1 w-full overflow-x-auto p-2 font-medium">
                        <li className="border-2 border-black px-2 rounded-md">All</li>
                        <li className="border-2 border-black px-2 rounded-md">Bookmarked</li>
                        <li className="border-2 border-black px-2 rounded-md">Priority</li>
                        <li className="border-2 border-black px-2 rounded-md">Databases</li>
                        <li className="border-2 border-black px-2 rounded-md">Backend</li>
                        <li className="border-2 border-black px-2 rounded-md">Frontend</li>
                        <li className="border-2 border-black px-2 rounded-md">OS</li>
                        <li className="border-2 border-black px-2 rounded-md">Cloud</li>
                        <li className="border-2 border-black px-2 rounded-md">Languages</li>
                        <li className="px-2 rounded-md bg-black text-white">+</li>
                    </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-4 flex-[8] p-4">
                    {data.allData.map((el, i) => <Category key={i} title={el.name}/>)}
                </div>
            </div>
        </>
    )
}

export default App