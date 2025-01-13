import { useEffect, useState } from "react";

export default function useFetch<T>(url: string, init?: RequestInit) {
    const [data, setData] = useState<T | null>(); // undefined = fetching, null = fetching, T = fetched
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function onMount() {
            try {
                const response = await fetch(url, init);
                const data = await response.json();
                setData(data);
            }
            catch (e) {
                setError(e as Error);
                setData(null);
            }
        }

        onMount();
    }, [url, init])

    return {
        isLoading: data === undefined,
        error,
        data: data || null
    }
}