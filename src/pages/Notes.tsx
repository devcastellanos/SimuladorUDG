import { useState } from 'react'
import Layout from '@/components/Layout'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Form
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const NotasReciboAlmacen: React.FC = () => {
  const [publicNotes, setPublicNotes] = useState('')
  const [notesList, setNotesList] = useState<string[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Agregar la nota a la lista y reiniciar el campo
    setNotesList((prevNotes) => [...prevNotes, publicNotes])
    setPublicNotes('')
  }

  const handleCancel = () => {
    window.history.back()
  }

  const handleHelp = () => {
    alert('Para más ayuda, consulta el manual del usuario.')
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Recibo de Almacén - Notas</h1>
        <Form onSubmit={handleSubmit}>
          <div style={styles.notesSection}>
            <Label htmlFor='publicNotes' style={styles.label}>
              Haga clic para seleccionar notas de la lista de cláusulas
            </Label>
            <Textarea
              id='publicNotes'
              name='publicNotes'
              value={publicNotes}
              onChange={(e) => setPublicNotes(e.target.value)}
              placeholder='Guarde aquí sus notas públicas para que no tenga que volver a escribirlas y luego selecciónelas para que aparezcan en el documento de su elección.'
              style={styles.textarea}
            />
          </div>
          <div style={styles.formButtons}>
            <Button type='submit' style={styles.submitButton}>
              OK
            </Button>
            <Button type='button' onClick={handleCancel} style={styles.cancelButton}>
              Close
            </Button>
            <Button type='button' onClick={handleHelp} style={styles.helpButton}>
              Help
            </Button>
          </div>
        </Form>

        {/* Tabla para mostrar las notas almacenadas */}
        <Table>
          <TableCaption>Lista de Notas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Notas</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notesList.map((note, index) => (
              <TableRow key={index}>
                <TableCell>{note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

const styles = {
  container: {
    width: '60%',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center' as const,
    fontSize: '1.5em',
    marginBottom: '20px'
  },
  notesSection: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold' as const
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    fontSize: '1em'
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'space-between' as const
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    minWidth: '100px',
    color: 'white'
  },
  submitButton: {
    backgroundColor: '#008CBA'
  },
  cancelButton: {
    backgroundColor: '#4CAF50'
  },
  helpButton: {
    backgroundColor: '#FF6347'
  }
}

export default NotasReciboAlmacen
