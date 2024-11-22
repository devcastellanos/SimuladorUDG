import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jsPDF } from "jspdf"; // Importamos jsPDF
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Item {
  pieces: number;
  cntPkg: number;
  description: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

const QuoteView: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    pieces: 0,
    cntPkg: 0,
    description: '',
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
  });

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      pieces: 0,
      cntPkg: 0,
      description: '',
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
    });
  };

  const calculateTotals = () => {
    const totalPieces = items.reduce((acc, item) => acc + item.pieces, 0);
    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
    const totalVolume = items.reduce(
      (acc, item) => acc + item.length * item.width * item.height,
      0
    );

    return { totalPieces, totalWeight, totalVolume };
  };

  const { totalPieces, totalWeight, totalVolume } = calculateTotals();
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({});

  const handleEditItem = (index) => {
    setEditIndex(index);
    setEditItem(items[index]);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Función para generar el PDF
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Título principal
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Cotización', 105, 15, null, null, 'center');
  
    // Margen y estilos generales
    const marginX = 15;
    const cardWidth = 85;  // Reduce el ancho para acomodar dos cards por fila
    const sectionSpacing = 10;
    const cardPadding = 5;
  
    // Función para crear "cards"
    const drawCard = (x, y, title, content, height = 35) => {
      const borderRadius = 3;
  
      // Fondo de cada tarjeta
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(x, y, cardWidth, height, borderRadius, borderRadius, 'F');
      
      // Título de la sección
      doc.setFontSize(10);
      doc.setTextColor(33, 33, 33);
      doc.text(title, x + cardPadding, y + 8);
  
      // Contenido
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      content(y + 15); // Pasamos el contenido con el y actualizado
    };
  
    let currentY = 25;
  
    // Bloques en dos columnas
  
    // Bloque 1: Información de la Cotización
    drawCard(marginX, currentY, 'Quote Information', (y) => {
      doc.text(`Quote Number: XYZ123456`, marginX + 5, y);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, marginX + 5, y + 8);
      doc.text(`Exp. Date: 30/12/2024`, marginX + 5, y + 16);
    });
  
    // Bloque 2: Información del Emisor
    drawCard(marginX + cardWidth + 10, currentY, 'Issued By', (y) => {
      doc.text(`Issued By: John Doe`, marginX + cardWidth + 15, y);
      doc.text(`Salesperson: Jane Doe`, marginX + cardWidth + 15, y + 8);
      doc.text(`Employee: Mike Ross`, marginX + cardWidth + 15, y + 16);
    });
  
    currentY += 40 + sectionSpacing;
  
    // Bloque 3: Información del Cliente/Lead
    drawCard(marginX, currentY, 'Customer/Lead Info', (y) => {
      doc.text('Customer Name: Customer Example', marginX + 5, y);
      doc.text('Phone: +1234567890', marginX + 5, y + 8);
      doc.text('Email: customer@example.com', marginX + 5, y + 16);
    });
  
    // Bloque 4: Información de Envío
    drawCard(marginX + cardWidth + 10, currentY, 'Shipping Information', (y) => {
      doc.text('Mode: Air', marginX + cardWidth + 15, y);
      doc.text('Direction: North', marginX + cardWidth + 15, y + 8);
      doc.text('Incoterms: FOB', marginX + cardWidth + 15, y + 16);
    });
  
    currentY += 40 + sectionSpacing;
  
    // Bloque 5: Información de Artículos
    drawCard(marginX, currentY, 'Items Information', (y) => {
      doc.autoTable({
        startY: y,
        head: [['Pieces', 'Cnt/Pkg', 'Description', 'Length', 'Width', 'Height', 'Weight']],
        body: items.map(item => [
          item.pieces,
          item.cntPkg,
          item.description,
          item.length,
          item.width,
          item.height,
          item.weight
        ]),
        theme: 'grid',
        margin: { left: marginX },
        styles: { fontSize: 7, cellPadding: 2 },
        tableWidth: cardWidth * 2 + 10, // Expandir tabla a ancho de una fila completa
      });
    });
  
    currentY = doc.lastAutoTable.finalY + sectionSpacing;
  
    // Bloque 6: Totales
    drawCard(marginX, currentY, 'Totals', (y) => {
      doc.text(`Total Pieces: ${totalPieces}`, marginX + 5, y);
      doc.text(`Total Weight: ${totalWeight} lb`, marginX + 5, y + 8);
      doc.text(`Total Volume: ${totalVolume} m³`, marginX + 5, y + 16);
    });
  
    // Generar el PDF
    doc.save('cotizacion.pdf');
  };
  
  return (
    <Layout>
      <h1 className='title' style={{ fontSize: '36px', textAlign: 'center' }}>Cotización 2</h1>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
        <div style={{ flex: 1 }}>
        <Button onClick={generatePDF} style={{ marginBottom: '20px' }}>
          Generate PDF
        </Button>
        {/* Botón para generar PDF */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {/* Primer Bloque: Office/Quote Info */}
          <Accordion type="single" collapsible className="w-full">
      {/* Primer Bloque: Office/Quote Info */}
      <AccordionItem value="office-quote-info">
        <AccordionTrigger>Office/Quote Info</AccordionTrigger>
        <AccordionContent>
          <Card style={{ padding: "10px" }}>
            <CardHeader>
              <CardTitle>Office/Quote Info</CardTitle>
              <CardDescription>Información general de la cotización</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                <div>
                  <Label>Quote Number</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input type="date" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Payment</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Exp. Date</Label>
                  <Input type="date" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Issued By</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Salesperson</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Employee</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Segundo Bloque: Customer/Lead Info */}
      <AccordionItem value="customer-lead-info">
        <AccordionTrigger>Customer/Lead Info</AccordionTrigger>
        <AccordionContent>
          <Card style={{ padding: "10px" }}>
            <CardHeader>
              <CardTitle>Customer/Lead Info</CardTitle>
              <CardDescription>Información del cliente o prospecto</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "5px" }}>
                <div>
                  <Label>Customer/Lead</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Representante</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Street Address</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>City</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>State</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Zip Code</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Tercer Bloque: Shipping */}
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          <Card style={{ padding: "10px" }}>
            <CardHeader>
              <CardTitle>Shipping</CardTitle>
              <CardDescription>Información de envío</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gap: "5px" }}>
                <div>
                  <Label>Mode of Transportation</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Direction</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Incoterms</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
                <div>
                  <Label>Description of Goods</Label>
                  <Input type="text" style={{ width: "100%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Cuarto Bloque: Añadir Artículo */}
      <AccordionItem value="add-item">
        <AccordionTrigger>Add Item</AccordionTrigger>
        <AccordionContent>
          <Card style={{ padding: "10px" }}>
            <CardHeader>
              <CardTitle>Add Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gap: "5px" }}>
                <div>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <Label>Pieces</Label>
                  <Input
                    type="number"
                    value={newItem.pieces}
                    onChange={(e) => setNewItem({ ...newItem, pieces: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <Label>Cnt/Pkg</Label>
                  <Input
                    type="number"
                    value={newItem.cntPkg}
                    onChange={(e) => setNewItem({ ...newItem, cntPkg: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <Label>Length (Pies)</Label>
                  <Input
                    type="number"
                    value={newItem.length}
                    onChange={(e) => setNewItem({ ...newItem, length: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <Label>Width (Pies)</Label>
                  <Input
                    type="number"
                    value={newItem.width}
                    onChange={(e) => setNewItem({ ...newItem, width: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <Label>Height (Pies)</Label>
                  <Input
                    type="number"
                    value={newItem.height}
                    onChange={(e) => setNewItem({ ...newItem, height: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <Label>Weight (lb)</Label>
                  <Input
                    type="number"
                    value={newItem.weight}
                    onChange={(e) => setNewItem({ ...newItem, weight: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <Button onClick={handleAddItem} style={{ marginTop: "10px" }}>
                Add Item
              </Button>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Card 5: Additional Freight Details */}
<AccordionItem value="freight-details">
  <AccordionTrigger>Freight Details</AccordionTrigger>
  <AccordionContent>
    <Card style={{ padding: "10px" }}>
      <CardHeader>
        <CardTitle>Freight Details</CardTitle>
        <CardDescription>Información adicional sobre el flete</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
          <div>
            <Label>Freight Service Class</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Tax Code</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Description</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Apply to</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Paid Ass</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </AccordionContent>
</AccordionItem>

{/* Card 6: Extended Freight Details */}
<AccordionItem value="extended-freight-details">
  <AccordionTrigger>Extended Freight Details</AccordionTrigger>
  <AccordionContent>
    <Card style={{ padding: "10px" }}>
      <CardHeader>
        <CardTitle>Extended Freight Details</CardTitle>
        <CardDescription>Detalles extendidos del flete</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
          <div>
            <Label>Freight Service Class</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Tax Code</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Description</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Apply to</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Paid Ass</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Apply by</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </AccordionContent>
</AccordionItem>

{/* Card 7: Event Details */}
<AccordionItem value="event-details">
  <AccordionTrigger>Event Details</AccordionTrigger>
  <AccordionContent>
    <Card style={{ padding: "10px" }}>
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
        <CardDescription>Detalles del evento</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "5px" }}>
          <div>
            <Label>Date & Time</Label>
            <Input type="datetime-local" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Event Type</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Details</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Location</Label>
            <Input type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </AccordionContent>
</AccordionItem>

    </Accordion>
        </div>
  
        {/* Tabla de Items Agregados */}
        <div style={{ flex: 2 }}>
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead >Description</TableHead>
                <TableHead >Pieces</TableHead>
                <TableHead >Cnt/Pkg</TableHead>
                <TableHead >Length</TableHead>
                <TableHead >Width</TableHead>
                <TableHead >Height</TableHead>
                <TableHead >Weight</TableHead>
                <TableHead >Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell >{item.description}</TableCell>
                  <TableCell >{item.pieces}</TableCell>
                  <TableCell >{item.cntPkg}</TableCell>
                  <TableCell >{item.length}</TableCell>
                  <TableCell >{item.width}</TableCell>
                  <TableCell >{item.height}</TableCell>
                  <TableCell >{item.weight}</TableCell>
                  <TableCell >
                    <Button onClick={() => handleEditItem(index)} >Edit</Button>
                    <Button onClick={() => handleDeleteItem(index)} >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default QuoteView;
