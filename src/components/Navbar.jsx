import { HeartIcon } from "@heroicons/react/24/outline"

function Navbar({ children }) {
    return <div className="navbar">
        <div className="navbar__logo">LOGO😍</div>
        {children}
        <button className="heart">
            <HeartIcon className="icon" />
            <span className="badge">4</span>
        </button>
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

