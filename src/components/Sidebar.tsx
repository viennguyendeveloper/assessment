
function Sidebar() {
  return (
    <div className="hidden md:block w-[200px] h-screen fixed left-0 border-solid border-gray-500 border-r-2 py-[60px] pl-3">
        <h5>Favorite Projects</h5>
        <ul className='list-disc px-10'>
            <li className="cursor-pointer">Project A</li>
            <li className="cursor-pointer">Project B</li>
        </ul>
    </div>
  )
}

export default Sidebar