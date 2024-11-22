import { ReactNode } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IconAnalyze, IconBox, IconBrandTeams, IconCalculator, IconDashboard, IconForms, IconGraph, IconLayoutDashboard, IconLocationPin, IconNotes, IconNumber, IconNumber1, IconNumber1Small, IconNumber2Small, IconNumber3, IconNumber3Small, IconPokerChip, IconQuestionMark, IconSortAscendingNumbers, IconTimelineEvent, IconTruck, IconTruckDelivery, IconTruckLoading, IconUserQuestion, IconWriting } from '@tabler/icons-react'
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
            <h1 className='mb-4 text-2xl'>Cotizaciones</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <Link to='/cotizaciones/cotizacion1' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconNumber1Small size={64} stroke={2} />
                </div>
                <p>Cotización 1</p>
              </Link>

              <Link to='/cotizaciones/cotizacion2' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconNumber2Small size={64} stroke={2} />
                </div>
                <p>Cotización 2</p>
              </Link>

              <Link to='/cotizaciones/cotizacion3' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconNumber3Small size={64} stroke={2} />
                </div>
                <p>Cotización 3</p>
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
