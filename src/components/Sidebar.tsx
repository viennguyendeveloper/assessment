import { useProjectContext } from "../hooks/useContext"

function Sidebar() {
  const { projects } = useProjectContext()
  

  return (
    <div className="hidden md:block w-[200px] h-screen fixed left-0 border-solid border-gray-500 border-r-2 py-[60px] pl-3">
        <h5>Favorite Projects</h5>
        <ul className='list-disc px-10'>
          {
            projects.filter(item => item.isFavorite).map(item=>(
              <li className="cursor-pointer" key={item.id}>{item.name}</li>
            ))
          }
        </ul>
    </div>
  )
}

export default Sidebar