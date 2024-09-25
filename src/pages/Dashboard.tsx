import { ReactNode } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IconAnalyze, IconBox, IconBrandTeams, IconCalculator, IconDashboard, IconForms, IconGraph, IconLayoutDashboard, IconLocationPin, IconNotes, IconPokerChip, IconQuestionMark, IconSortAscendingNumbers, IconTimelineEvent, IconTruck, IconTruckDelivery, IconTruckLoading, IconUserQuestion, IconWriting } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const Content = (): ReactNode => {
  return (
    <main className='grid items-start gap-4 p-4 sm:px-6 sm:py-0'>
      <div className='grid items-start gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Simulador de negocios UDG</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='mb-4 text-2xl'>Cotización</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <Link to='/cotizaciones' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconCalculator size={64} stroke={2} />
                </div>
                <p>Cotizaciones</p>
              </Link>

            </div>
            <Separator className='my-4' />
            <h1 className='mb-4 text-2xl'>Booking</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <Link to='/carrierlines' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconTruckDelivery size={64} stroke={2} />
                </div>
                <p>Transportista</p>
              </Link>

              <Link to='/products' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconBox size={64} stroke={2} />
                </div>
                <p>Productos</p>
              </Link>

              <Link to='/notes' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconNotes size={64} stroke={2} />
                </div>
                <p>Notas</p>
              </Link>

              <Link to='/pickup' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconTruckLoading size={64} stroke={2} />
                </div>
                <p>PickUp</p>
              </Link>

              <Link to='/cotizaciones' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconCalculator size={64} stroke={2} />
                </div>
                <p>Cotizaciones</p>
              </Link>

              <Link to='/general' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconForms size={64} stroke={2} />
                </div>
                <p>General</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

const Dashboard = (): ReactNode => {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}

export default Dashboard
