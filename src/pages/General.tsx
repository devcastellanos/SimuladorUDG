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

const General: React.FC = () => {
  const [quoteData, setQuoteData] = useState({
    number: 'REC-5',
    date: '2018-05-29',
    time: '10:00:00',
    employee: 'alm_gerente_almacen',
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
        <div className='form-container'>

          <h2>Agregar Cotización</h2>

          {/* Inputs */}
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
              <SelectTrigger className='w-[180px]'>
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

        <div className='pdf-preview'>
          <h1 className='title'>GENERAL</h1>
          <h2>Vista Previa</h2>
          {pdfUri
            ? (
              <iframe
                src={pdfUri}
                width='100%'
                height='800' // Aumenta la altura a 800px para hacerla más grande
                style={{ border: 'none' }}
                title='PDF Preview'
              />
              )
            : (
              <p>No hay vista previa disponible. Genera el PDF para verlo aquí.</p>
              )}
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
        }

        .form-container {
          flex: 1;
          margin-right: 20px;
        }

        .pdf-preview {
          flex: 1;
          padding-left: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .title {
          font-size: 36px; /* Aumentar tamaño de fuente */
          font-weight: bold; /* Negrita */
          margin-bottom: 20px; /* Espaciado debajo del título */
          text-align: center; /* Centrar el texto */
        }

      `}
      </style>
    </Layout>
  )
}

export default General
