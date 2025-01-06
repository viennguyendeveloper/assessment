import { useParams } from "react-router";
import { useNavigate } from "react-router"
import { FormEvent, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { fetchProjectById, updateProjectData } from "../utils/useApi";
import { Project } from "../types/globalTypes";
import { Alert, Snackbar } from "@mui/material";

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
    const [message, setMessage] = useState("")

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData) {
            try {
                const res = await updateProjectData(formData)
                if (res.ok) {
                    setMessage(res.message)
                    navigate("/", {
                        state: res.data
                    })
                }
            } catch (error: any) {
                setMessage(error.message)
            }

        }
    }

    const handleChangeInput = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement
            console.log({ name, value })
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    useEffect(() => {
        const getProjectById = async () => {
            try {
                const res = await fetchProjectById(params.id)
                if (res.ok && res.data) {
                    setFormData(res.data)
                }
            } catch (error: any) {
                setMessage(error.message)
                navigate('/')
            }
        }
        getProjectById()

    }, [params.id, navigate])

    return (
        <div className='w-full h-full px-1 md:px-5 py-[60px]'>
            <form onSubmit={handleUpdate} className="min-w-[300px] max-w-[800px] flex flex-col gap-2">
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3">Project ID</label>
                    <input className="flex-1" readOnly value={formData.id} />
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="project-name">Project Name</label>
                    <input className="border p-1 flex-1" id="project-name" name="name" value={formData?.name} onChange={handleChangeInput} />
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="project-desc">Project Description</label>
                    <textarea className="border p-1 flex-1" id="project-desc" name="description" value={formData?.description} onChange={handleChangeInput} />
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="start-date">Start Date</label>
                    <input className="border p-1 flex-1" id="start-date" type="date" name="startDate" max={(formData?.endDate)} value={formData.startDate} onChange={handleChangeInput} />
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="end-date">End Date</label>
                    <input className="border p-1 flex-1" id="end-date" type="date" name="endDate" min={formData.startDate} value={formData.endDate} onChange={handleChangeInput} />
                </div>
                <div className="w-full flex">
                    <label className="w-1/5 text-right mr-3" htmlFor="project-manager">Project Manager</label>
                    <input className="border p-1 flex-1" id="project-manager" name="projectManager" value={formData?.projectManager} onChange={handleChangeInput} />
                </div>
                <div className="w-full flex justify-center">
                    <CustomButton title="update" type="submit" />
                </div>
            </form>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!message}
                onClose={() => setMessage("")}
                message={message}
                autoHideDuration={3000}
            >
                <Alert
                    onClose={() => setMessage("")}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EditProject