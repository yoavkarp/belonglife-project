import { useEffect, useState } from "react";

export default function useFetch<T>(url: string, init?: RequestInit) {
    const [data, setData] = useState<T | null>(null); // undefined = fetching, null = fetching, T = fetched
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function onMount() {
            try {
                const response = await fetch(url, init);
                const data = await response.json();
                if (data)
                    setData(data);
                else
                    setError(new Error("No data received"));
            }
            catch (e) {
                setError(e as Error);
            }
        }

        onMount();
    }, [url, init])

    return {
        isLoading: !data && !error,
        error,
        data: data
    }
}