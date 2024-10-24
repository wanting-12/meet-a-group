import { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");

  return (
    <SearchContext.Provider
      value={{
        keywords,
        setKeywords,
        location,
        setLocation,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
