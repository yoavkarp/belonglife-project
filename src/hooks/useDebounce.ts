import { useEffect, useState } from "react";

export default function useDebounce(callback: () => void, query: string = "", timeout: number = 350) {

    const [prevQuery, setPrevQuery] = useState<string>(query);

    useEffect(() => {

        // if previous text state is the same as current, do nothing
        if (prevQuery === query) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setPrevQuery(query)
            callback()
        }, timeout);

        return () => {
            clearTimeout(timeoutId)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
}