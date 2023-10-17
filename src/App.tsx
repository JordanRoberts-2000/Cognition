import Category from "./components/categories/Category"
import Header from "./components/ui/header/Header"

const App = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row">
                <div className="flex-[2]">
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
                <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-2 flex-[8] pb-2 px-2 md:pt-2">
                    {[...Array(30)].map((i) => <Category key={i} />)}
                </div>
            </div>
        </>
    )
}

export default App