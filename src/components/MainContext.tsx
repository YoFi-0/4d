import React, { createContext, useContext, useState } from "react";

type StateFunction<T> = React.Dispatch<React.SetStateAction<T>>

interface MainContextProps {
    setOpen: StateFunction<boolean>;
    open: boolean;
}

const MainContext = createContext<MainContextProps>({} as any);

export const MainContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [open, setOpen] = useState(false);
  return (
    <MainContext.Provider value={{
        open,
        setOpen,
    }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);