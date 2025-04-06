import { useEffect, useState } from "react";

export default function useLocalStorag(key, intioalState) {
    const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) || intioalState)
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value]);

    return [value, setValue]
}