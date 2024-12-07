import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { TooltipProvider } from './components/ui/tooltip'
import './App.css'
import './index.css'
// import Booking from './pages/Booking'
import Route from './pages/Route'
import Pickup from './pages/Pickup'
import General from './pages/General'
import Products from './pages/Products'
import Carrierlines from './pages/Carrierlines'
import Notes from './pages/Notes'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ErrorBoundary from './pages/ErrorBoundary'
import Cotizaciones from './pages/Cotizaciones/Cotizaciones.tsx'
import Cotizacion1 from './pages/Cotizaciones/Cotizacion1'
//import Cotizacion2 from './pages/Cotizaciones/Cotizacion2'
//import Cotizacion3 from './pages/Cotizaciones/Cotizacion3'
import Customer_vendor from './pages/Cotizaciones/Customer_vendor.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      // {
      //   path: 'booking',
      //   element: <Booking />
      // },
      // {
      //   path: 'booking',
      //   element: <Booking />
      // },
      {
        path: 'carrierlines',
        element: <Carrierlines />
      },
      {
        path: 'route',
        element: <Route />
      },
      {
        path: 'notes',
        element: <Notes />
      },
      {
        path: 'pickup',
        element: <Pickup />
      },
      {
        path: 'general',
        element: <General />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'cotizaciones',
        element: <Cotizaciones />
      },
      {
        path: 'cotizaciones/cotizacion1',
        element: <Cotizacion1 />
      },
      //{
      //  path: 'cotizaciones/cotizacion2',
      //  element: <Cotizacion2 />
     // },
      //{
     //   path: 'cotizaciones/cotizacion3',
     //   element: <Cotizacion3 />        
    //  },
      {
        path: 'cotizaciones/customer_vendor',
        element: <Customer_vendor />        
      }
    ]
  }
])

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
)
