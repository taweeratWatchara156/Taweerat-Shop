"use client";

import { createContext, useContext, useState } from "react";

interface Favorite {
    favoriteLength: number;
    favorite: any;
}

interface FavoriteContextType {
    favorite: Favorite;
    setFavorite: (favorite: Favorite) => void;
}

const FavoriteContext = createContext<FavoriteContextType>({
    favorite: { favoriteLength: 0, favorite: null },
    setFavorite: () => {},
});

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorite, setFavorite] = useState<Favorite>({ favoriteLength: 0, favorite: null });

    return (
        <FavoriteContext.Provider value={{ favorite, setFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => useContext(FavoriteContext);