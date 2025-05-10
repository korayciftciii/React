import { useCallback, useEffect, useState } from "react";

export default function fetchData(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const SendRequest = useCallback(
        async function SendRequest(data) {
            setLoading(true);
            try {
                const response = await fetch(url, { ...config, body: data });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || "Network response was not ok");
                }
                setData(result);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);

        }
        , [url, config]);

    useEffect(() => {
        if (config && config.method === "GET") {
            SendRequest();
        }
    }, [SendRequest, config]);
    return { data, error, loading, SendRequest };
}