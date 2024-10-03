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

          <div className='input-grid'>
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
    height='800'
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
          padding: 0; /* Eliminar padding para ocupar todo el espacio */
          max-width: 100vw; /* Usar el ancho completo de la ventana */
          margin: 0; /* Eliminar márgenes */
          height: 100vh; /* Ocupar toda la altura de la ventana */
          box-sizing: border-box; /* Asegurarse de que el padding y el border no afecten el ancho total */
        }

        .form-container {
          flex: 1;
          padding: 20px; /* Agregar un poco de padding interno */
        }

        .input-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Ajuste dinámico de columnas */
          gap: 20px; /* Espacio entre columnas */
        }

        .pdf-preview {
          flex: 1;
          padding: 20px; /* Agregar un poco de padding interno */
        }

        .form-group {
          margin-bottom: 15px; /* Espacio entre grupos de formularios */
        }

        .title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .input-grid {
            grid-template-columns: 1fr; /* Cambia a una columna en pantallas pequeñas */
          }

          .form-container {
            margin-right: 0; /* Elimina el margen derecho en pantallas pequeñas */
          }

          .pdf-preview {
            padding-left: 0; /* Elimina el padding en pantallas pequeñas */
          }
        }
      `}
      </style>
    </Layout>
  )
}

export default General
