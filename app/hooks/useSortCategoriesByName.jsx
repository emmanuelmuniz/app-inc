import { useState, useEffect } from 'react';

export const useSortCategoriesByName = (categories) => {
    const [sortedCategories, setSortedCategories] = useState([]);

    useEffect(() => {
        if (categories != []) {
            const sorted = [...categories].sort((a, b) =>
                a.category.localeCompare(b.category)
            );
            setSortedCategories(sorted);
        }
    }, [categories]);

    return sortedCategories;
};