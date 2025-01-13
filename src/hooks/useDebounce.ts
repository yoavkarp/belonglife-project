import { useEffect, useState } from "react";

export default function useDebounce(callback: () => void, textState: string = "", timeout: number = 350) {

    const [prevTextState, setPrevTextState] = useState<string>(textState);

    useEffect(() => {

        if (prevTextState === textState) {
            return;
        }

        const handler = setTimeout(() => {
            setPrevTextState(textState)
            callback()
        }, timeout);

        return () => {
            clearTimeout(handler)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textState])
}