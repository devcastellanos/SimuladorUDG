import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [piezas, setPiezas] = useState(0)
  const [embalaje, setEmbalaje] = useState('')
  const [peso, setPeso] = useState(0)
  const [volumen, setVolumen] = useState(0)

  const addProduct = () => {
    // Validar los campos
    if (!descripcion || piezas <= 0 || peso <= 0 || volumen <= 0) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }

    const nuevoProducto = {
      estado: 'Nuevo',
      descripcion,
      piezas,
      embalaje,
      peso,
      volumen
    }

    // Agregar el nuevo producto al estado
    setProductos((prevProductos) => [...prevProductos, nuevoProducto])
    resetForm() // Reiniciar el formulario
  }

  const editProduct = () => {
    if (selectedProduct === null) return

    const updatedProduct = {
      estado: selectedProduct.product.estado,
      descripcion,
      piezas,
      embalaje,
      peso,
      volumen
    }

    const updatedProductos = productos.map((producto, index) =>
      index === selectedProduct.index ? updatedProduct : producto
    )

    setProductos(updatedProductos) // Actualizar el estado de productos
    resetForm() // Reiniciar el formulario
    setSelectedProduct(null) // Limpiar la selección
  }

  const removeProduct = () => {
    if (selectedProduct === null) return

    const updatedProductos = productos.filter((_, index) => index !== selectedProduct.index)
    setProductos(updatedProductos) // Actualizar el estado de productos
    resetForm() // Reiniciar el formulario
    setSelectedProduct(null) // Limpiar la selección
  }

  const selectProduct = (index) => {
    setSelectedProduct({ index, product: productos[index] })
    const { descripcion, piezas, embalaje, peso, volumen } = productos[index]
    setDescripcion(descripcion)
    setPiezas(piezas)
    setEmbalaje(embalaje)
    setPeso(peso)
    setVolumen(volumen)
  }

  const resetForm = () => {
    setVolumen(0)
  }

  const totals = productos.reduce(
    (acc, producto) => {
      acc.piezas += producto.piezas
      acc.peso += producto.peso
      acc.volumen += producto.volumen
      return acc
    },
    { piezas: 0, peso: 0, volumen: 0 }
  )

  return (
    <Layout>
      <div className='p-6 mx-auto rounded-md shadow-md max-w-7xl'>
        <h1 className='mb-6 text-2xl font-bold'>Recibo de Almacén - Productos</h1>

        <form className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <Input
              placeholder='Descripción'
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <Input
              type='number'
              placeholder='Piezas'
              value={piezas}
              onChange={(e) => setPiezas(Number(e.target.value))}
            />
            <Select value={embalaje} onValueChange={setEmbalaje}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Seleccionar embalaje' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Embalajes</SelectLabel>
                  <SelectItem value='Caja'>Caja</SelectItem>
                  <SelectItem value='Palet'>Palet</SelectItem>
                  <SelectItem value='Saco'>Saco</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type='number'
              placeholder='Peso (kg)'
              value={peso}
              onChange={(e) => setPeso(Number(e.target.value))}
            />
            <Input
              type='number'
              placeholder='Volumen (m³)'
              value={volumen}
              onChange={(e) => setVolumen(Number(e.target.value))}
            />
          </div>

          <div className='flex justify-between space-x-4'>
            <Button type='button' onClick={addProduct}>Adicionar Producto</Button>
            <Button type='button' onClick={editProduct} disabled={selectedProduct === null}>Modificar Producto</Button>
            <Button type='button' onClick={removeProduct} disabled={selectedProduct === null}>Eliminar Producto</Button>
          </div>

          <Table>
            <TableCaption>Lista de productos en el recibo de almacén</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Estado</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Piezas</TableHead>
                <TableHead>Embalaje</TableHead>
                <TableHead>Peso (kg)</TableHead>
                <TableHead>Volumen (m³)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto, index) => (
                <TableRow key={index} onClick={() => selectProduct(index)} className='cursor-pointe'>
                  <TableCell>{producto.estado}</TableCell>
                  <TableCell>{producto.descripcion}</TableCell>
                  <TableCell>{producto.piezas}</TableCell>
                  <TableCell>{producto.embalaje}</TableCell>
                  <TableCell>{producto.peso}</TableCell>
                  <TableCell>{producto.volumen}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className='text-right'>
            <p>
              Total: {totals.piezas} Piezas, Peso: {totals.peso.toFixed(2)} kg, Volumen: {totals.volumen.toFixed(2)} m³
            </p>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Productos
