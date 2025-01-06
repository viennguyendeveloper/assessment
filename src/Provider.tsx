import { createContext, ReactNode, useState } from "react";
import { Project } from "./types/globalTypes";

interface ContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const Context = createContext<ContextType>({projects: [], setProjects: () => {}});

interface IProvider {
  children: ReactNode
}

export const Provider = ({ children }: IProvider) => {
    const [projects, setProjects] = useState<Project[]>([]);
    return (
      <Context.Provider
        value={{
          projects,
          setProjects
        }}
      >
        {children}
      </Context.Provider>
    );
  };