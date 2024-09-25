import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const CotizadorNegocios: React.FC = () => {
  const [quoteData, setQuoteData] = useState({
    numeroDe: '',
    fecha: '',
    validaHasta: '',
    empleado: '',
    terminoPago: '',
    origen1: '',
    destino1: '',
    origen2: '',
    destino2: '',
    origen3: '',
    destino3: '',
    tipoMovimiento: '',
    opciones: ''
  })

  const [pdfUri, setPdfUri] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuoteData(prevData => ({
      ...prevData,
      [name]: value
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
          {Object.keys(quoteData).map((key) => (
            <div key={key} className='form-group'>
              <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Label>
              <Input
                type='text'
                id={key}
                name={key}
                value={quoteData[key]}
                onChange={handleChange}
                placeholder={`Ingrese ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
            </div>
          ))}
          <Button onClick={generatePDF}>Generar PDF</Button>
        </div>
        <div className='pdf-preview'>
          <h1 className='title'>COTIZACIONES</h1> {/* Título con mayor tamaño */}
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
