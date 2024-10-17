import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import TopNavbar from './components/TopNavbar'
import HomePage from './Pages/HomePage'
import MarkAttendance from './Pages/MarkAttendance'
import ViewParticipants from './Pages/ViewParticipants'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/participants/:eventId',
      element: <ViewParticipants />
    },
    {
      path: '/attendance/:eventId',
      element: <MarkAttendance />
    }
  ])

  return (
    <>
    <main className='min-h-screen dark text-foreground bg-background'>
      <TopNavbar />
      <div className='app-content-wrapper flex justify-center items-center h-full'>
        <RouterProvider router={router} />
      </div>
    </main>
    </>
  )
}

export default App
