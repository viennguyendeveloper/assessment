import { useParams } from "react-router";
import { useNavigate } from "react-router"
import { FormEvent, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { fetchProjectById, updateProjectData } from "../utils/useApi";
import { Project } from "../types/globalTypes";

const initialData = {
    id: '', 
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    projectManager: '',
}

function EditProject() {
    let params = useParams();
    let navigate = useNavigate()
    const [formData, setFormData] = useState<Project>(initialData)

    const handleUpdate = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("update", formData)
        if(formData){
            try {
                const res = await updateProjectData(formData)
                console.log(res)
                if(res.ok){
                    alert(res.message)
                    navigate("/", {
                        state: res.data
                    })
                }
            } catch (error: any) {
                alert(error.message)
            }
            
        }
    }

    const handleChangeInput = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(formData){
            const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement
            setFormData((prev) => ({...prev, [name]: value}))
        }
    }

    useEffect(() => {
        const getProjectById = async() => {
            try {
                const res = await fetchProjectById(params.id)
                if(res.ok && res.data){
                    setFormData(res.data)
                }
            } catch (error: any) {
                alert(error.message)
                navigate('/')
            }
        }
        getProjectById()
    }, [params.id])

    return (
        <div className='w-full h-full px-1 md:px-5 py-[60px]'>
            <form onSubmit={handleUpdate} className="min-w-[300px] max-w-[500px] flex flex-col gap-2">
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3">Project ID</label>
                    <input className="flex-1" readOnly value={formData.id}/>
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="project-name">Project Name</label>
                    <input className="border p-1 flex-1" id="project-name" name="name" value={formData?.name} onChange={handleChangeInput}/>
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="project-desc">Project Description</label>
                    <textarea className="border p-1 flex-1" id="project-desc" name="description" value={formData?.description} onChange={handleChangeInput}/>
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="start-date">Start Date</label>
                    <input className="border p-1 flex-1" id="start-date" name="startDate" value={formData?.startDate} onChange={handleChangeInput}/>
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="end-date">End Date</label>
                    <input className="border p-1 flex-1" id="end-date" name="endDate" value={formData?.endDate} onChange={handleChangeInput}/>
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="project-manager">Project Manager</label>
                    <input className="border p-1 flex-1" id="project-manager" name="projectManager" value={formData?.projectManager} onChange={handleChangeInput}/>
                </div>
                <div className="w-full flex justify-center">
                    <CustomButton title="update" type="submit"/>
                </div>
            </form>
        </div>
  )
}

export default EditProject