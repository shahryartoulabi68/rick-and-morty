
import "./App.css";
import { Result, Search, Favourit, Navbar } from "./Components/Navbar.jsx";
import CharacterList from "./Components/CharacterList.jsx";
import CharacterDetail from "./Components/CharacterDetail.jsx";
import {  useState } from "react"
import { Toaster } from 'react-hot-toast';
import useCharacters from "./Components/hooks/useCharacters.js";
import useLocalStorag from "./Components/hooks/useLocalStorag.js";



function App() {

  const [query, setQuery] = useState("")
  const { characters, isLoding } = useCharacters(query)
  const [selectedId, setCelectedId] = useState(null)
  // const [favourit, setFavourit] = useState(() => JSON.parse(localStorage.getItem("FAVOURIT")) || [])
  // useEffect(() => {
  //   localStorage.setItem("FAVOURIT", JSON.stringify(favourit))
  // }, [favourit])
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




// useEffect(()=>{
// async function fethData() {
//   try {
//     setLodering(true)
//     const res = await fetch("wwww..dkkd")
//     if (res.ok) throw new Erroe("hero si e cod")
//     const data = await res.json()
//     setDataBas(data.result)

//   } catch (err) {
//     reast.error(err.message)
//   } finally {
//     setLodering(false)
//   }
// }
//   }, [])