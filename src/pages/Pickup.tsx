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

const Pickup: React.FC = () => {
  const [quoteData, setQuoteData] = useState({
    number: 'ORD-3',
    dateCreation: '2018-05-29',
    datePickup: '2018-08-22',
    time: '10:00:00',
    employee: 'Estudiante UDG',
    issued_by: 'UDG',
    agent: '',
    division: 'almacen',
    storage_type: '',
    storage: '',
    entry_number: '',
    entry_date: '2018-05-29',
    nombreConductor: '',
    licenciaConductor: '',
    numeroPro: '',
    numeroSeguimiento: ''
  })

  const [pdfUri, setPdfUri] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuoteData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setQuoteData(prevData => ({
      ...prevData,
      agent: value
    }))
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text('Cotización', 20, 10)
    doc.autoTable({
      head: [['Concepto', 'Detalle']],
      body: Object.entries(quoteData).map(([key, value]) => [key.replace(/([A-Z])/g, ' $1').toUpperCase(), value])
    })
    const uri = doc.output('datauristring')
    setPdfUri(uri)
  }

  return (
    <Layout>
      <div className='container'>
        <ResizablePanelGroup direction='horizontal' className='resizable-panel-group'>
          <ResizablePanel defaultSize={50}>
            <div className='form-container'>
              <h2>Agregar Pickup</h2>
              <div className='input-grid'>
                {/* Inputs en dos columnas */}
                {Object.entries(quoteData).map(([key, value]) => (
                  <div className='form-group' key={key}>
                    <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Label>
                    <Input
                      type={key.includes('date') ? 'date' : key.includes('time') ? 'time' : 'text'}
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Ingrese ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    />
                  </div>
                ))}

                {/* Input para el agente */}
                <div className='form-group'>
                  <Label htmlFor='agent'>Agente</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Seleccionar agente' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Agentes</SelectLabel>
                        <SelectItem value='agente1'>Agente 1</SelectItem>
                        <SelectItem value='agente2'>Agente 2</SelectItem>
                        <SelectItem value='agente3'>Agente 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generatePDF}>Generar PDF</Button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <div className='pdf-preview'>
              <h1 className='title'>PICKUP</h1>
              <h2>Vista Previa</h2>
              {pdfUri
                ? (
                  <iframe
                    src={pdfUri}
                    width='100%'
                    height='800'
                    style={{ border: 'none' }}
                    title='PDF Preview'
                  />
                  )
                : (
                  <p>No hay vista previa disponible. Genera el PDF para verlo aquí.</p>
                  )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <style>{`
        .container {
          padding: 40px;
          max-width: 100%;
          margin: 40px auto;
        }

        .form-container {
          padding: 20px;
          width: 100%;
        }

        .input-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsivo, ajusta el tamaño de los inputs */
          gap: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .pdf-preview {
          padding-left: 20px;
        }

        .title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .resizable-panel-group {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          width: 100%; /* Se ajusta al tamaño completo */
          height: auto; /* Ajusta la altura de acuerdo al contenido */
        }
      `}
      </style>
    </Layout>
  )
}

export default Pickup
