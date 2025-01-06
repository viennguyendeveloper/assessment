import { DATA_PROJECTS } from "./mockData";
import { Project } from "../types/globalTypes"

export const fetchProjectsData = (): Promise<{ok: boolean, data: Project[]}> => {
    return Promise.resolve({ok: true, data: DATA_PROJECTS});
}

export const updateProjectData = (data: Project): Promise<{ok: boolean, data: Project[], message: string}> => {
    try {
        const dataProjects = DATA_PROJECTS
        const { id, name, startDate, endDate, projectManager } = data

        if(!id || !name || !startDate || !endDate || !projectManager)
            return Promise.reject({ok: false, data: [], message: "Missing some field."})
        
        const idxProject = dataProjects.findIndex(project => project.id === data.id)
        if(idxProject === -1)
            return Promise.reject({ok: false, data: [], message: "Project is not exist."})

        dataProjects[idxProject] = data

        return Promise.resolve({ok: true, message: "Update success.", data: dataProjects})
        
    } catch (error) {
        return Promise.reject({ok: false, data: [], message: "Internal Server Error."})
    }
}

export const fetchProjectById = (id: string | undefined): Promise<{ok: boolean, data?: Project, message: string}> => {
    try {
        const dataProjects = DATA_PROJECTS
        if(!id) return Promise.reject({ok: false, message: "Missing id project."})

        const project = dataProjects.find(proj => proj.id === id)

        if(!project) return Promise.reject({ok: false, message: "Project not exist."})
        return Promise.resolve({ok: true, data: project, message: "Success."})
    } catch (error) {
        return Promise.reject({ok: false, data: [], message: "Internal Server Error."})
    }



}