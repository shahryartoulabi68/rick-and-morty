import { HeartIcon } from "@heroicons/react/24/outline"
import Modal from "./Modal"
import { useState } from "react"

function Navbar({ children }) {
    return <div className="navbar">
        <div className="navbar__logo">LOGO😍</div>
        {children}

    </div>
}

export default Navbar

export function Search({ query, setQuery }) {
    return <input type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-field"
        placeholder="search..." />

}

export function Result({ numOfResualt }) {
    return <div className="navbar__result">Found {numOfResualt} character</div>

}

export function Favourit({ favourit }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Modal title={"modal title"} open={isOpen} onOpen={setIsOpen}>
                mollls
            </Modal>

            <button className="heart" onClick={() => setIsOpen((is) => !is)}>
                <HeartIcon className="icon" />
                <span className="badge">{favourit}</span>
            </button>

        </>

    )
}

