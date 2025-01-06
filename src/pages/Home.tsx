import { useEffect, useState } from "react"
import { DATA_PROJECTS } from "../utils/mockData"
import CustomButton from "../components/CustomButton"
import { useNavigate, useLocation } from "react-router";
import { fetchProjectsData } from "../utils/useApi";
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import TableBody from '@mui/material/TableBody';

const TABLE_COLUMN = ["Project ID", "Project Name", "Start Date", "End Date", "Project Manager", ""]


function Home() {
    let navigate = useNavigate();
    let location = useLocation()
    const [dataProject, setDataProject] = useState<typeof DATA_PROJECTS[0][]>([])

    useEffect(() => {
        if (location.state) {
            setDataProject(location.state)
            return
        }

        const fetchData = async () => {
            const res = await fetchProjectsData()
            if (res.ok) {
                setDataProject(res.data)
            }
        }
        fetchData()
    }, [location.state])

    return (
        <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                <TableHead>
                    <TableRow sx={{
                        background: "#dddddd"
                    }}>
                        {TABLE_COLUMN.map((column, index) => (
                            <TableCell key={index} sx={!index ? {
                                position: "sticky",
                                left: 0,
                                zIndex: 10,
                                background: "#dddddd",
                            }: {}} align="left">{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataProject.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={{
                                position: "sticky",
                                left: 0,
                                zIndex: 10,
                                background: "#fff",
                            }}>
                                {row.id}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.startDate}</TableCell>
                            <TableCell align="left">{row.endDate}</TableCell>
                            <TableCell align="left">{row.projectManager}</TableCell>
                            <TableCell align="right">
                                <CustomButton
                                    onClick={() => {
                                        navigate(`/edit-project/${row.id}`, {
                                            state: dataProject
                                        })
                                    }}
                                    title="Edit" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Home