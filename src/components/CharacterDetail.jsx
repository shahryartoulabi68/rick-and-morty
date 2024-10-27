import { ArrowUpCircleIcon } from "@heroicons/react/20/solid"
import { character, episodes } from "../../data/data"
import { useEffect, useState } from "react"
import axios from "axios"

function CharacterDetail({ selectedId }) {

  const [character, setCharacter] = useState([])

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
      .then(({ data }) => {
        return setCharacter(data)
      }).catch()
  }, [selectedId])


  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img" />
        <div className="character-detail__info info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
            <span>{character.name}</span>
          </h3>
          <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
          <span>&nbsp;{character.status}</span>
          <span>-&nbsp;{character.species}</span>
          <div className="location">
            <p>last known location:</p>
            {/* <p>{character.location.name}</p> */}
          </div>
          <div className="actions">
            <button className="btn btn--primary">add to favourit</button>
          </div>
        </div>

      </div>
      <div className="character-episodes">
        <div className="title">
          <p>list of episodes:</p>
          <button> <ArrowUpCircleIcon className="icon" /></button>
        </div>
        <ul>
          {episodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")} - {item.episode}: <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>

    </div >
  )
}

export default CharacterDetail
