import { useCallback, useEffect, useState } from "react";
import styles from "./InfiniteScroll.module.css";

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    images: string[];
}

const API_URL = "https://dummyjson.com/products";
const PAGE_SIZE = 10;
const THRESHOLD = 100;
const THROTTLE_TIME = 300;

const getUpdatedUrl = (
    url: string,
    queryParams: Record<string, string | number>
): string => {
    const params = new URLSearchParams();

    for (const key in queryParams) {
        params.set(key, String(queryParams[key]));
    }

    return `${url}?${params.toString()}`;
};

export default function InfiniteScroll() {
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);

            const response = await fetch(
                getUpdatedUrl(API_URL, {
                    limit: PAGE_SIZE,
                    skip: (page - 1) * PAGE_SIZE,
                })
            );

            const result = await response.json();

            setData((prev) => [
                ...prev,
                ...(result?.products ?? []),
            ]);

            setPage((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = useCallback(() => {
        const { clientHeight, scrollTop, scrollHeight } =
            document.documentElement;

        const remainingScroll =
            scrollHeight - clientHeight - scrollTop;

        if (remainingScroll < THRESHOLD && !isLoading) {
            fetchData();
        }
    }, [isLoading, page]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let timeoutId: number | undefined;

        const throttledScroll = () => {
            if (timeoutId !== undefined) return;

            timeoutId = window.setTimeout(() => {
                handleScroll();
                timeoutId = undefined;
            }, THROTTLE_TIME);
        };

        window.addEventListener("scroll", throttledScroll);

        return () => {
            window.removeEventListener("scroll", throttledScroll);

            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [handleScroll]);

    return (
        <div className={styles.container}>
            <h2>Our Products</h2>

            {isLoading && <p>Loading...</p>}

            <div className={styles["product-container"]}>
                {data.map((item) => (
                    <div
                        key={item.id}
                        className={styles["product-card"]}
                    >
                        <img
                            src={item.images[0]}
                            alt={item.title}
                        />
                        <div>{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}