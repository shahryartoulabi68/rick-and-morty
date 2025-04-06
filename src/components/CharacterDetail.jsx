import { ArrowUpCircleIcon } from "@heroicons/react/20/solid"
import { character, episodes } from "../../data/data"
import { useEffect, useState } from "react"
import axios from "axios"
import Loding from "./Loding"

function CharacterDetail({ selectedId, onAddFavourit, isFavourit }) {

  const [character, setCharacter] = useState([])
  const [isLoding, setIsLoding] = useState(false)
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    setIsLoding(true)
    axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
      .then(({ data }) => {
        if (selectedId) setCharacter(data)
        const episode = data.episode.map((e) => e.split("/").at(-1))
        axios.get(`https://rickandmortyapi.com/api/episode/${episode}`)
          .then(({ data: episode }) => setEpisodes([episode].flat().slice(0, 6)))
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data); // => the response payload 
            }
          })
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload 
        }
      })
      .finally(() => setIsLoding(false))
  }, [selectedId])

  if (isLoding) return <div style={{ flex: 1, color: "white" }}> <Loding /> </div>


  if (!selectedId) return <p style={{ flex: 1, color: "white" }}>selected a character </p>


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
            {
              isFavourit ? <p>added ✅</p> : <button className="btn btn--primary"
                onClick={() => onAddFavourit(character)}>add to favourit
              </button>
            }
          </div>
        </div>

      </div>
      <EpisodesList episodes={episodes} />

    </div >
  )
}

export default CharacterDetail



function EpisodesList({ episodes }) {

  const [sortBy, setSortBy] = useState(true)

  let sortEpisodes;

  if (sortBy) {
    sortEpisodes = episodes.sort((a, b) => new Date(a.created) - new Date(b.created))
  } else {
    sortEpisodes = episodes.sort((a, b) => new Date(b.created) - new Date(a.created))

  }



  return <div className="character-episodes">
    <div className="title">
      <p>list of episodes:</p>
      <button> <ArrowUpCircleIcon className={`icon ${sortBy ? "upicon" : ""}`} onClick={() => setSortBy((is) => !is)} /></button>
    </div>
    <ul>
      {sortEpisodes.map((item, index) => (
        <li key={item.id}>
          <div>
            {String(index + 1).padStart(2, "0")} - {item.episode}: <strong>{item.name}</strong>
          </div>
          <div className="badge badge--secondary">{item.air_date}</div>
        </li>
      ))}
    </ul>
  </div>
}