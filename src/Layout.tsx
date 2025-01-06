import Sidebar from './components/Sidebar';

interface ILayout {
    children: React.ReactNode
}

function Layout({children}: ILayout) {
  return (
    <>
        <Sidebar />
        <div className='md:ml-[200px] h-full'>
            {children}
        </div>
    </>
  )
}

export default Layout