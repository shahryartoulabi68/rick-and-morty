
import "./App.css";
import Navbar, { Result, Search, Favourit } from "./Components/Navbar";
import CharacterList from "./Components/CharacterList.jsx";
import CharacterDetail from "./Components/CharacterDetail.jsx";
import { allCharacters, character } from '../data/data.js'
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';



function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoding, setIsLoding] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedId, setCelectedId] = useState(null)
  const [favourit, setFavourit] = useState([])

  const handleSelectedId = (id) => {
    setCelectedId((prevId) => prevId === id ? null : id)
  }

  const handleFavourit = (char) => {
    return setFavourit((prev) => [...prev, char])
  }



  const isFavourit = favourit.map((fav) => fav.id).includes(selectedId)


  useEffect(() => {
    setIsLoding(true)
    axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
      // .then((res) => {
      //   if (!res.ok) throw new Error("no data is not defaind!!!")
      //   return res.json()
      // })
      .then(({ data }) => setCharacters((data.results).slice(0, 4)))
      .catch((err) => {
        setCharacters([])
        return toast.error(err.message)
      })
      .finally(() => setIsLoding(false))
  }, [query])

  return (<div className="app">
    <Toaster />
    <Navbar >
      <Search query={query} setQuery={setQuery} />
      <Result numOfResualt={characters.length} />
      <Favourit favourit={favourit.length} />
    </Navbar>
    <div className="main">
      <CharacterList characters={characters}
        selectedId={selectedId}
        isLoding={isLoding}
        onSelectCharacter={handleSelectedId} />
      <CharacterDetail selectedId={selectedId} onAddFavourit={handleFavourit} isFavourit={isFavourit} />
    </div>

  </div>)
}

export default App;