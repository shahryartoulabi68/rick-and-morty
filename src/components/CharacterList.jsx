import { EyeIcon, ListBulletIcon } from "@heroicons/react/24/outline"
import Loding from "./Loding";
import { EyeSlashIcon } from "@heroicons/react/24/outline";

function CharacterList({ characters, isLoding, onSelectCharacter, selectedId }) {
    if (isLoding) {
        return <div className="characters-list">
            <Loding />
        </div>
    }

    return (
        <div className="character-list">
            {
                characters.map((item) => {
                    return <Character key={item.id}
                        selectedId={selectedId}
                        item={item}
                        onSelectCharacter={onSelectCharacter} />
                })
            }
        </div>
    )
}
export default CharacterList;

function Character({ item, onSelectCharacter, selectedId }) {
    return <div className="list__item" key={item.id}>
        <img src={item.image} alt="" />
        <CharacterName item={item} />
        <CharacterInfo item={item} />
        <button className="icon red"
            value={item.id}
            onClick={() => onSelectCharacter(item.id)}>
            {selectedId === item.id ? < EyeSlashIcon /> : <EyeIcon />}
        </button>
    </div>

}

function CharacterName({ item }) {
    return <h3 className="name">
        <span>{item.gender === "Male" ? "🧑" : "👩"}</span>
        <span>{item.name}</span>
    </h3>
}

function CharacterInfo({ item }) {
    return <div className="list-item__info info">
        <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
        <span>{item.status}</span>
        <span>-{item.species}</span>
    </div>
}