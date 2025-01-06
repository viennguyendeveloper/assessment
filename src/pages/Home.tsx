import { useEffect, useState } from "react"
import { DATA_PROJECTS } from "../utils/mockData"
import CustomButton from "../components/CustomButton"
import { useNavigate, useLocation } from "react-router";
import { fetchProjectsData } from "../utils/useApi";

const TABLE_COLUMN = ["Project ID", "Project Name", "Start Date", "End Date", "Project Manager", ""]

function Home() {
    let navigate = useNavigate();
    let location = useLocation()
    const [dataProject, setDataProject] = useState<typeof DATA_PROJECTS[0][]>([])

    useEffect(() => {
        if(location.state){
            setDataProject(location.state)
            return
        }
        
        const fetchData = async() => {
            const res = await fetchProjectsData()
            if(res.ok){
                setDataProject(res.data)
            }
        }
        fetchData()
    },[])

    return (
        <div className="w-full h-full px-5 py-[60px]">
            <table className="table-auto border-separate overflow-auto min-w-full text-left">
                <thead className="bg-gray-300">
                    <tr>
                        {TABLE_COLUMN.map((column, index) => (
                            <td key={index} className={`px-2 py-1 min-w-[60px] ${!index && 'sticky left-0 bg-gray-300'} ${index === TABLE_COLUMN.length - 1 && 'sticky right-0 bg-gray-300'}`}>
                                {column}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        dataProject.map((row) => (
                            <tr key={row.id} className="bg-gray-100">
                                <td className="px-2 py-1 bg-gray-100 sticky left-0 z-10">{row.id}</td>
                                <td className="px-2 py-1">{row.name}</td>
                                <td className="px-2 py-1">{row.startDate}</td>
                                <td className="px-2 py-1">{row.endDate}</td>
                                <td className="px-2 py-1">{row.projectManager}</td>
                                <td className="px-2 py-1 bg-gray-100 sticky right-0 z-10">
                                    <CustomButton onClick={() => {
                                        navigate(`/edit-project/${row.id}`, {
                                            state: dataProject
                                        })
                                    }} title="Edit"/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home