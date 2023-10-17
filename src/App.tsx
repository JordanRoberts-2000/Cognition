import Category from "./components/categories/Category"
import Header from "./components/ui/header/Header"
import data from "./data/data.json"

const App = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row">
                <div className="flex-[2] sticky top-11 bg-white border-b-2 border-black z-10">
                    <ul className="flex md:flex-col gap-4 md:gap-1 w-full overflow-x-auto p-2">
                        <li>All</li>
                        <li>Bookmarked</li>
                        <li>Priority</li>
                        <li>Databases</li>
                        <li>Backend</li>
                        <li>Frontend</li>
                        <li>OS</li>
                        <li>Cloud</li>
                        <li>Languages</li>
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