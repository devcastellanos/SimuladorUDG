import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

const CotizadorNegocios: React.FC = () => {
  const [quoteData, setQuoteData] = useState({
    transportista: '',
    nombreConductor: '',
    licenciaConductor: '',
    numeroPro: '',
    numeroSeguimiento: ''
  })

  const [pdfUri, setPdfUri] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuoteData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setQuoteData((prevData) => ({
      ...prevData,
      transportista: value
    }))
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text('Cotización', 20, 10)
    doc.autoTable({
      head: [['Concepto', 'Detalle']],
      body: Object.entries(quoteData).map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').toUpperCase(),
        value
      ])
    })
    const uri = doc.output('datauristring')
    setPdfUri(uri) // Guardar el URI del PDF en el estado
  }

  return (
    <Layout>
      <ResizablePanelGroup
        direction='horizontal'
        className='max-w-full min-h-screen' // Ajustar la altura al 100% de la pantalla
      >
        <ResizablePanel defaultSize={25}>
          <div className='flex flex-col h-full p-4'>
            <Label htmlFor='transportista'>Transportista</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Seleccionar transportista' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transportistas</SelectLabel>
                  <SelectItem value='transportista1'>Transportista 1</SelectItem>
                  <SelectItem value='transportista2'>Transportista 2</SelectItem>
                  <SelectItem value='transportista3'>Transportista 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className='mt-4'>
              <Label htmlFor='nombreConductor'>Nombre del Conductor</Label>
              <Input
                type='text'
                id='nombreConductor'
                name='nombreConductor'
                value={quoteData.nombreConductor}
                onChange={handleChange}
                placeholder='Ingrese el nombre del conductor'
              />
            </div>

            <div className='mt-4'>
              <Label htmlFor='licenciaConductor'>Licencia del Conductor</Label>
              <Input
                type='text'
                id='licenciaConductor'
                name='licenciaConductor'
                value={quoteData.licenciaConductor}
                onChange={handleChange}
                placeholder='Ingrese la licencia del conductor'
              />
            </div>

            <div className='mt-4'>
              <Label htmlFor='numeroPro'>Número PRO</Label>
              <Input
                type='text'
                id='numeroPro'
                name='numeroPro'
                value={quoteData.numeroPro}
                onChange={handleChange}
                placeholder='Ingrese el número PRO'
              />
            </div>

            <div className='mt-4'>
              <Label htmlFor='numeroSeguimiento'>Número de Seguimiento</Label>
              <Input
                type='text'
                id='numeroSeguimiento'
                name='numeroSeguimiento'
                value={quoteData.numeroSeguimiento}
                onChange={handleChange}
                placeholder='Ingrese el número de seguimiento'
              />
            </div>

            <Button className='mt-4' onClick={generatePDF}>Generar PDF</Button>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className='flex flex-col h-full p-4'>
            <h1 className='title'>ASIGNACIÓN DE TRANSPORTISTA</h1>
            <h2 className='subtitle'>Vista Previa</h2>
            {pdfUri
              ? (
  <iframe
                src={pdfUri}
                width='100%'
                height='100%'
                style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                title='PDF Preview'
              />
                )
              : (
  <p>No hay vista previa disponible. Genera el PDF para verlo aquí.</p>
                )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <style jsx>{`
        .title {
          font-size: 24px; /* Aumentar tamaño de fuente para el título */
          font-weight: bold; /* Negrita */
          margin-bottom: 10px; /* Espaciado debajo del título */
          text-align: center; /* Centrar título */
        }

        .subtitle {
          font-size: 18px; /* Tamaño de fuente para el subtítulo */
          text-align: center; /* Centrar subtítulo */
        }

        @media (max-width: 768px) {
          .max-w-full {
            max-width: 100%; /* Asegurar que se ajuste en pantallas pequeñas */
          }
        }
      `}
      </style>
    </Layout>
  )
}

export default CotizadorNegocios
