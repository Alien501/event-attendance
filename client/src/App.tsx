import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import TopNavbar from './components/TopNavbar'
import HomePage from './Pages/HomePage'
import MarkAttendance from './Pages/MarkAttendance'
import ViewParticipants from './Pages/ViewParticipants'
import { useEffect } from 'react'

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

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err)
          }
        )
      })
    }
  }, [])

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