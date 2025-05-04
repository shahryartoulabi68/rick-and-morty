import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"
import Modal from "./Modal"
import { useState } from "react"
import { Character } from "./CharacterList"

export function Navbar({ children }) {
    return <div className="navbar">
        <div className="navbar__top">
            <div className="navbar__logo">LOGO😍</div>
            {children[1]} {/* Result component */}
            {children[2]} {/* Favourit component */}
        </div>
        <div className="navbar__search">
            {children[0]} {/* Search component */}
        </div>
    </div>
}

// export default Navbar

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

export function Favourit({ favourit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
            <Modal title={"modal title"} open={isOpen} onOpen={setIsOpen}>
                {
                    favourit.map((item) => {
                        return <Character key={item.id} item={item} onSelectCharacter={() => { }} selectedId={item.id} >
                            <button className="icon red" onClick={() => onDelete(item.id)}>
                                <TrashIcon />
                            </button>
                        </Character>
                    })
                }
            </Modal>

            <button className="heart" onClick={() => setIsOpen((is) => !is)}>
                <HeartIcon className="icon" />
                <span className="badge">{favourit.length}</span>
            </button>

        </>

    )
}

