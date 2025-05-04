
import "./App.css";
import { Result, Search, Favourit, Navbar } from "./components/Navbar.jsx";
import CharacterList from "./components/CharacterList.jsx";
import CharacterDetail from "./components/CharacterDetail.jsx";
import { useState } from "react"
import { Toaster } from 'react-hot-toast';
import useCharacters from "./components/hooks/useCharacters.js";
import useLocalStorag from "./components/hooks/useLocalStorag.js";



function App() {

  const [query, setQuery] = useState("")
  const { characters, isLoding } = useCharacters(query)
  const [selectedId, setCelectedId] = useState(null)
  const [favourit, setFavourit] = useLocalStorag("FAVOURIT", [])

  const handleSelectedId = (id) => {
    setCelectedId((prevId) => prevId === id ? null : id)
  }

  const handleFavourit = (char) => {
    return setFavourit((prev) => [...prev, char])
  }

  const handleDeleteFav = (id) => {
    const newFavourit = favourit.filter((f) => f.id !== id)
    setFavourit(newFavourit)
  }

  const isFavourit = favourit.map((fav) => fav.id).includes(selectedId)

  return (<div className="app">
    <Toaster />
    <Navbar >
      <Search query={query} setQuery={setQuery} />
      <Result numOfResualt={characters.length} />
      <Favourit favourit={favourit} onDelete={handleDeleteFav} />
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




