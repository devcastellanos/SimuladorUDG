import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

const CotizadorNegocios: React.FC = () => {
  interface QuoteData {
    numeroDe: string;
    fecha: string;
    validaHasta: string;
    empleado: string;
    terminoPago: string;
    origen1: string;
    destino1: string;
    origen2: string;
    destino2: string;
    origen3: string;
    destino3: string;
    tipoMovimiento: string;
    opciones: string;
  }

  const [quoteData, setQuoteData] = useState<QuoteData>({
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
    setQuoteData((prevData) => ({
      ...prevData,
      [name as keyof QuoteData]: value,
    }));
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
        <ResizablePanelGroup
          direction='horizontal'
          className='min-h-[200px] w-full' // Ocupa todo el ancho disponible
        >
          <ResizablePanel defaultSize={25}>
            <div className='form-container'>
              <div className='input-grid'>
                {Object.keys(quoteData).map((key) => (
                  <div key={key} className='form-group'>
                    <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Label>
                    <Input
                      type='text'
                      id={key}
                      name={key}
                      value={quoteData[key as keyof QuoteData]}
                      onChange={handleChange}
                      placeholder={`Ingrese ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={generatePDF}>Generar PDF</Button>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className='pdf-preview'>
              <h1 className='title'>COTIZACIONES</h1>
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
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <style>{`
        .container {
          display: flex;
          justify-content: flex-start; /* Cambiar a alineación izquierda */
          padding: 0; /* Sin padding */
          max-width: 100vw; /* Ancho máximo de la ventana */
          height: 80vh; /* Ajustar la altura del contenedor */
        }

        .form-container {
          padding: 20px; /* Espaciado interno */
          height: 100%; /* Altura completa del panel */
        }

        .input-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Dos columnas */
          gap: 10px; /* Espacio entre inputs */
        }

        .form-group {
          width: 100%; /* Asegurar que el input ocupe todo el espacio disponible */
        }

        .pdf-preview {
          padding: 20px; /* Espacio alrededor de la vista previa */
          height: 100%; /* Altura completa del panel */
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

          .input-grid {
            grid-template-columns: 1fr; /* Una columna en pantallas pequeñas */
          }
        }
      `
      }
      </style>
    </Layout>
  )
}

export default CotizadorNegocios
