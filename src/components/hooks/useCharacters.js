import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(query) {
    const [characters, setCharacters] = useState([]);
    const [isLoding, setIsLoding] = useState(false)
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal

        setIsLoding(true)
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`, { signal })
            // .then((res) => {
            //   if (!res.ok) throw new Error("no data is not defaind!!!")
            //   return res.json()
            // })
            .then(({ data }) => setCharacters((data.results).slice(0, 5)))
            .catch((err) => {
                setCharacters([])
                return toast.error(err.message)
            })
            .finally(() => setIsLoding(false))

        return () => {
            controller.abort()
        }
    }, [query])
return{ isLoding, characters}
}