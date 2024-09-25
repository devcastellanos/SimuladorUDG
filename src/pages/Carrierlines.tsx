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
    setQuoteData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setQuoteData(prevData => ({
      ...prevData,
      transportista: value
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
    setPdfUri(uri) // Guardar el URI del PDF en el estado
  }

  return (
    <Layout>
      <div className='container'>
        <div className='form-container'>

          <h2>Agregar Cotización</h2>

          <div className='form-group'>
            <Label htmlFor='transportista'>Transportista</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className='w-[180px]'>
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
          </div>

          <div className='form-group'>
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

          <div className='form-group'>
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

          <div className='form-group'>
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

          <div className='form-group'>
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

          <Button onClick={generatePDF}>Generar PDF</Button>
        </div>

        <div className='pdf-preview'>
          <h1 className='title'>ASIGNACIÓN DE TRANSPORTISTA</h1> {/* Título con mayor tamaño */}
          <h2>Vista Previa</h2>
          {pdfUri
            ? (
              <iframe
                src={pdfUri}
                width='100%'
                height='100%'
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
          height: 80vh; /* Ajustar la altura del contenedor */
        }

        .form-container {
          flex: 1;
          margin-right: 20px;
          max-width: 400px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .pdf-preview {
          flex: 2; /* Dar más espacio a la vista previa */
          margin-left: 20px;
          position: relative; /* Posicionamiento relativo para iframe */
          height: 100%; /* Altura completa */
        }

        iframe {
          border: 1px solid #ddd;
          border-radius: 4px;
          height: 100%; /* Altura completa del contenedor */
        }
          
          .title {
          font-size: 36px; /* Aumentar tamaño de fuente */
          font-weight: bold; /* Negrita */
          margin-bottom: 20px; /* Espaciado debajo del título */
          text-align: center; /* Centrar el texto */
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column; /* Cambiar a columna en pantallas pequeñas */
          }

          .form-container,
          .pdf-preview {
            margin: 0; /* Quitar márgenes en pantallas pequeñas */
            width: 100%; /* Ancho completo */
            max-width: none; /* Sin límite de ancho */
          }

          .pdf-preview {
            height: 400px; /* Altura fija en pantallas pequeñas */
          }
        }
      `}
      </style>
    </Layout>
  )
}

export default CotizadorNegocios
