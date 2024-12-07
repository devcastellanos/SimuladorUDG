import React, { ChangeEvent, useState, useEffect  } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
//import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import "jspdf-autotable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from 'react-router-dom';


declare module 'jspdf' {
  interface jsPDF {
    autoTable: any;
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface Item {
  pieces: number;
  cntPkg: string;
  description: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}


// Define el tipo de los datos de los clientes

interface Customer {
  id: string;
  name: string;
  representative: string;
  phone: string;
  email: string;
  street_address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  // Agrega más campos según tus necesidades
}

const QuoteView: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    pieces: 0,
    cntPkg: '',
    description: '',
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
  });

  const navigate = useNavigate();

  //Pdf primer bloque
  const [quoteNumber, setQuoteNumber] = useState("");
  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");
  const [expDate, setExpDate] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [employee, setEmployee] = useState("");

  //Pdf segundo bloque 
  const [id, setId] = useState("");
  const [representativeP, setRepresentativeP] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street_address, setStreet_address] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip_code, setZip_code] = useState("");

  //Pdf tercero bloque 
  const [service, setService] = useState("");
  const [tax, setTax] = useState("");
  const [main, setMain] = useState("");
  const [route, setRoute] = useState("");

  //Pdf cuarto bloque 
  //Pdf quinto bloque
  const [mode, setMode] = useState("");
  const [direction, setDirection] = useState("");
  const [incoterms, setIncoterms] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");
  
  //Pdf sexto bloque 
  const [port, setPort] = useState("");
  const [place, setPlace] = useState("");
  const [preCarriage, setPreCarriage] = useState("");
  const [shipper, setShipper] = useState("");
  const [streetAddres, setStreetAddres] = useState("");

  //Pdf septimo bloque 
  const [portD, setPortD] = useState("");
  const [placeD, setPlaceD] = useState("");
  const [preCarriageD, setPreCarriageD] = useState("");
  const [shipperD, setShipperD] = useState("");
  const [streetAddresD, setStreetAddresD] = useState("");

  //Pdf octavo bloque 
  const [chargesO, setChargesO] = useState("");
  const [personO, setPersonO] = useState("");
  const [moneyO, setMoneyO] = useState("");
  const [chargesD, setChargesD] = useState("");
  const [personD, setPersonD] = useState("");
  const [moneyD, setMoneyD] = useState("");
  const [chargesT, setChargesT] = useState("");
  const [personT, setPersonT] = useState("");
  const [moneyT, setMoneyT] = useState("");

  const [customers, setCustomers] = useState<Customer[]>([]);  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);

  //Seleccionador de customers para origin
  //const [customersDO, setCustomersDO] = useState<Customer[]>([]);  
  //const [selectedCustomerDO, setSelectedCustomerDO] = useState<Customer | null>(null);
  const [ , setSelectedCustomerDO] = useState<Customer | null>(null);
   

  const handleSelectChangeDO  = (event : ChangeEvent<HTMLSelectElement>) => {
    const customerIdDO = event.target.value;
    const customer = customers.find((cust) => cust.id === customerIdDO);
    setSelectedCustomerDO(customer || null);
  };

  //Seleccionador de customers para destino
  //const [customersD, setCustomersD] = useState<Customer[]>([]);  
  //const [selectedCustomerD, setSelectedCustomerD] = useState<Customer | null>(null);
  const [ , setSelectedCustomerD] = useState<Customer | null>(null);


  const handleSelectChangeD  = (event : ChangeEvent<HTMLSelectElement>) => {
    const customerIdD = event.target.value;
    const customer = customers.find((cust) => cust.id === customerIdD);
    setSelectedCustomerD(customer || null);
  };

      // Sincroniza el estado inicial con selectedCustomer
      useEffect(() => {
        if (selectedCustomer?.representative) {
          setRepresentativeP(selectedCustomer.representative || "");
          setPhone(selectedCustomer.phone || "");
          setEmail(selectedCustomer.email || "");
          setStreet_address(selectedCustomer.street_address || "");
          setCity(selectedCustomer.city || "");
          setState(selectedCustomer.state || "");
          setCountry(selectedCustomer.country || "");
          setZip_code(selectedCustomer.zip_code || "");
        }
      }, [selectedCustomer]);
  
      const handleInputChange = (event : React.ChangeEvent<HTMLInputElement> , setStateFunc: React.Dispatch<React.SetStateAction<string>>) => {
      //const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {  
           setStateFunc(event.target.value); 
           setRepresentativeP(event.target.value); // Actualiza el estado con lo que se escribe en el input
      };
  
   // Obtener clientes desde el servidor
   useEffect(() => {
    fetch('http://localhost:5000/api/customers')
    //fetch('https://simulador-udg.vercel.app/api/customers')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos recibidos:', data); 
        setCustomers(data);
      })
      .catch((err) => {
        setError('Error al cargar los clientes');
        console.error('Error:', err);
      });
  }, []); // Esto se ejecuta una sola vez al cargar el componente


  //Bloque de codigo que genera el numero de la consulta
  //const [number, setNumber] = useState<number | null>(null); // Número generado
  //const [number, setNumber] = useState<string>(''); // Número como string
  //const [errorAu, setErrorAu] = useState<string | null>(null);
  //const [success, setSuccess] = useState<string | null>(null);


 

    // Función para manejar el cambio en el campo de entrada
    /*
    const handleQuoteNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
  
      // Establecer directamente el valor como cadena
      setQuoteNumber(value);
    };*/
    



  const handleSelectChange  = (event : ChangeEvent<HTMLSelectElement>) => {
    const customerId = event.target.value;
    const customer = customers.find((cust) => cust.id === customerId);
    setSelectedCustomer(customer || null);
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      pieces: 0,
      cntPkg: '',
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
  //const [editIndex, setEditIndex] = useState<number | null>(null);
  //const [editItem, setEditItem] = useState<any>({});

  /*const handleEditItem = (index: number) => {
    setEditIndex(index);
    setEditItem(items[index]);
  };*/

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };




  // Función para generar el PDF
  const generatePDF = async () => {
    const doc = new jsPDF();
   
    
    // Título principal
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    //doc.text('Cotización', 105, 15, null, null, 'center');
    doc.text('Cotización', 105, 15, undefined, 'center');

    
  
    // Margen y estilos generales
    const marginX = 15;
    const cardWidth = 85;  // Reduce el ancho para acomodar dos cards por fila
    const sectionSpacing = 10;
    const cardPadding = 5;
  
    // Función para crear "cards"
    const drawCard = (x: any, y: any, title: any, content: any, height = 35) => {
      const borderRadius = 3;
  
      // Fondo de cada tarjeta
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(x, y, cardWidth, height, borderRadius, borderRadius, 'F');
      
      // Título de la sección
      doc.setFontSize(10);
      doc.setTextColor(33, 33, 33);
      doc.text(title, x + cardPadding, y + 4);
  
      // Contenido
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60); 
      content(y + 7); // Pasamos el contenido con el y actualizado
    };
  
    let currentY = 25;
  
    // Bloques en dos columnas
  
    // Primera columna
    drawCard(marginX, currentY, ' ', (y: any ) => { 
      //Titulo Bloque 1
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10)
      doc.text(`Office/Quote Info`, marginX + 5, y);    
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);  

      doc.text(`Quote Number: ${quoteNumber}`, marginX + 5, y+ 6);
      doc.text(`Date: ${date}`, marginX + 5, y + 12);
      doc.text(`Payment: ${payment}`, marginX + 5, y + 18);
      doc.text(`Exp. Date: ${expDate}`, marginX + 5, y + 24);
      doc.text(`Issued By: ${issuedBy}`, marginX + 5, y + 30);
      doc.text(`Salesperson: ${salesperson}`, marginX + 5, y + 36);
      doc.text(`Employee: ${employee}`, marginX + 5, y + 42);

    //Titulo Bloque 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10)
    doc.text(`Customer/Lead Info`, marginX + 5, y + 50);    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    
    doc.text(`Customer: ${id}`, marginX + 5, y + 56);
    doc.text(`Representative: ${representativeP}`, marginX + 5, y + 62);
    doc.text(`Phone: ${phone}`, marginX + 5, y + 68);
    doc.text(`Email: ${email}`, marginX + 5, y + 74);
    doc.text(`Street Address: ${street_address}`, marginX + 5, y + 80);
    doc.text(`City: ${city}`, marginX + 5, y + 86);
    doc.text(`State: ${state}`, marginX + 5, y + 92);
    doc.text(`Country: ${country}`, marginX + 5, y + 98);
    doc.text(`Zip Code: ${zip_code}`, marginX + 5, y + 104);

    //Titulo Bloque 4
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10)
    doc.text(`Shipping Information`, marginX + 5, y + 112);    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(`Mode: ${mode}`, marginX + 5, y + 118);
    doc.text(`Direction: ${direction}`, marginX + 5, y + 124);
    doc.text(`Incoterms:${incoterms} `, marginX + 5, y + 130);
    doc.text(`Frequency: ${frequency}`, marginX + 5, y + 136);
    doc.text(`Description:${description} `, marginX + 5, y + 144);

    //Titulo Bloque 5
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10)
    doc.text(`Routing`, marginX + 5, y + 152);    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    
    doc.text(`Service Type: ${service}`, marginX + 5, y + 158);
    doc.text(`Tax Code: ${tax}`, marginX + 5, y + 164);
    doc.text(`Main Carrier: ${main}`, marginX + 5, y + 170);
    doc.text(`Route: ${route}`, marginX + 5, y + 176);


    }, 185);
  
    // Segunda columna
    drawCard(marginX + cardWidth + 10, currentY, '', (y: any) => {
    //Titulo Bloque 6
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10)
    doc.text(`Origin`, marginX + cardWidth + 15, y);    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(`Port of Landing: ${port}`, marginX  + cardWidth + 15, y + 6);      
    doc.text(`Place of receipt: ${place}`, marginX  + cardWidth + 15, y + 12);
    doc.text(`PreCarriage by: ${place}`, marginX  + cardWidth + 15, y + 18);
    doc.text(`Shipper: ${shipper}`, marginX  + cardWidth + 15, y + 24);
    doc.text(`Street Addres: ${streetAddres}`, marginX  + cardWidth + 15, y + 30);

    //Titulo Bloque 7
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10)
    doc.text(`Destination`, marginX + cardWidth + 15, y + 38);    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(`Port of Unloading:${portD}`, marginX + cardWidth + 15, y + 44);
    doc.text(`Place of delivery: ${placeD}`, marginX + cardWidth + 15, y + 50);
    doc.text(`OnCarriage by: ${preCarriageD}`, marginX + cardWidth + 15, y + 56);
    doc.text(`Consignee: ${shipperD}`, marginX + cardWidth + 15, y + 62);
    doc.text(`Street Addres: ${streetAddresD}`, marginX + cardWidth + 15, y + 68);

    //Titulo Bloque 8
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10)
    doc.text(`Charges`, marginX + cardWidth + 15, y + 76);    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(`Cargos de origen: ${chargesO}`, marginX + cardWidth + 15, y + 82);
    doc.text(`Persona: ${personO}`, marginX + cardWidth + 15, y + 88);
    doc.text(`$: ${moneyO}`, marginX + cardWidth + 15, y + 94);
    doc.text(`Cargos de destino: ${chargesD}`, marginX + cardWidth + 15, y + 100);
    doc.text(`Persona: ${personD}`, marginX + cardWidth + 15, y + 106);
    doc.text(`$: ${moneyD}`, marginX + cardWidth + 15, y + 112);
    doc.text(`Cargos de transporte: ${chargesT}`, marginX + cardWidth + 15, y + 118);
    doc.text(`Persona: ${personT}`, marginX + cardWidth + 15, y + 124);
    doc.text(`$: ${moneyT}`, marginX + cardWidth + 15, y + 130);

     //Titulo Bloque 9
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10)
    doc.text(`Totals`, marginX + cardWidth + 15, y + 138);    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
 

    doc.text(`Total Pieces: ${totalPieces}`, marginX + cardWidth + 15, y + 144);
    doc.text(`Total Weight: ${totalWeight} lb`, marginX + cardWidth + 15, y + 150);
    doc.text(`Total Volume: ${totalVolume} m³`, marginX + cardWidth + 15, y + 156);
    }, 185);
  
    currentY += 40 + sectionSpacing;

  
    currentY += 40 + sectionSpacing;
  
    // Bloque 5: Información de Artículos
    drawCard(marginX, currentY+88, 'Items Information', (y: any) => {
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
  

    // Generar el PDF
    doc.save('cotizacion.pdf');  
    navigate('/dashboard');
  };
 
  

    // Función que se llama al presionar el botón Generate PDF
    const handleGenerateQuoteNumber = async () => {
      if (quoteNumber) return; // Si ya hay un número, no generar otro
      //generatePDF();
      console.log('Generando número...');
      try {
        // Solicitar al backend un número de cotización
        const response = await fetch('http://localhost:5000/generate-quote-number', {
        //const response = await fetch('https://simulador-udg.vercel.app/api/generate-quote-number', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        //generatePDF();
  
        if (!response.ok) {
          throw new Error('Error en la generación del número.');
        }
  
        const data = await response.json();
        const generatedNumber = data.quoteNumber;
  
        if (generatedNumber && !isNaN(generatedNumber)) {
          setQuoteNumber(generatedNumber.toString()); // Actualiza el estado con el número generado
          //generatePDF();
        } else {
          throw new Error('Número no válido recibido del servidor.');
        }
      } catch (error) {
        console.error('Error al generar el número:', error);
        alert('Ocurrió un error al generar el número. Por favor, inténtalo de nuevo.');
      }
    };
  
    /*
    useEffect(() => {
    console.log('useEffect ejecutado');  
      handleGenerateQuoteNumber(); // Solo genera el número si no se ha generado  
    }, []); */

  
  /*
    // Hook para generar un número al cargar la página
    useEffect(() => {
      handleGenerateQuoteNumber();
    }, []); */
    // Hook para generar un número al cargar la página


{/*onClick={generatePDF}*/} 
  {/**/} 

  return (
    <Layout>
      <h1 className='title' style={{ fontSize: '36px', textAlign: 'center' }}>Cotización</h1>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
      <Button onClick={generatePDF} style={{ marginTop: '20px' }}>
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
                  <Input id="numberInput" type="text" style={{ width: "100%" }} value={quoteNumber || ''} readOnly /> {/*  onClick={handleGenerateQuoteNumber} onChange={handleQuoteNumberChange}  onChange={(e) => setQuoteNumber(e.target.value)}*/} 
                  <Button onClick={handleGenerateQuoteNumber}  style={{ marginTop: '20px' }}>Generar numero de cotizacion</Button>        
                </div>
                <div>
                  <Label>Date</Label>
                  <Input type="date" style={{ width: "100%" }} value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                  <Label>Payment</Label>
                  <Input type="text" style={{ width: "100%" }} value={payment} onChange={(e) => setPayment(e.target.value)} />
                </div>
                <div>
                  <Label>Exp. Date</Label>
                  <Input type="date" style={{ width: "100%" }} value={expDate} onChange={(e) => setExpDate(e.target.value)}/>
                </div>
                <div>
                  <Label>Issued By</Label>
                  <Input type="text" style={{ width: "100%" }} value={issuedBy} onChange={(e) => setIssuedBy(e.target.value)} />
                </div>
                <div>
                  <Label>Salesperson</Label>
                  <Input type="text" style={{ width: "100%" }} value={salesperson} onChange={(e) => setSalesperson(e.target.value)} />
                </div>
                <div>
                  <Label>Employee</Label>
                  <Input type="text" style={{ width: "100%" }} value={employee} onChange={(e) => setEmployee(e.target.value)} />
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
                   <Label htmlFor="customerSelect">Customer/Lead</Label>
                    {/*<select  id="customerSelect" onChange={handleSelectChange} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}} >*/}
                   <select value={id} id="customerSelect" onChange={(e) => {setId(e.target.value); handleSelectChange(e);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}} >
                      <option value="">Seleccione un cliente</option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.id}
                          </option>
                           ))}
                    </select>
                       {error && <p style={{ color: 'red' }}>{error}</p>}                        
                </div>  

                <div>
                  <Label>Representante</Label>                  
                  <Input type="text" value={representativeP} readOnly style={{ width: "100%" }}  onChange={(e) => handleInputChange(e, setRepresentativeP)}
                  />
                </div>
                <div>
                  <Label>Phone</Label>                  
                  <Input type="text" value={phone} readOnly style={{ width: "100%" }} onChange={(e) => handleInputChange(e, setPhone)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="text" value={email} readOnly style={{ width: "100%" }} onChange={(e) => handleInputChange(e, setEmail)}/>
                </div>
                <div>
                  <Label>Street Address</Label>
                  <Input type="text" value={street_address} readOnly style={{ width: "100%" }} onChange={(e) => handleInputChange(e, setStreet_address)} />
                </div>
                <div>
                  <Label>City</Label>
                  <Input type="text" value={city} readOnly style={{ width: "100%" }} onChange={(e) => handleInputChange(e, setCity)}/>
                </div>
                <div>
                  <Label>State</Label>
                  <Input type="text" value={state} readOnly style={{ width: "100%" }} onChange={(e) => handleInputChange(e, setState)}/>
                </div>
                <div>
                  <Label>Country</Label>
                  <Input type="text" value={country} readOnly style={{ width: "100%" }} onChange={(e) => handleInputChange(e, setCountry)}/>
                </div>
                <div>
                  <Label>Zip Code</Label>
                  <Input type="text" value={zip_code} readOnly style={{ width: "100%" }} onChange={(e) => handleInputChange(e, setZip_code)}/>
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
                  {/*<Input type="text" style={{ width: "100%" }} />*/}
                  <select value={mode} onChange={(e) => {setMode(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="air">Air</option>
                     <option value="air-containerized">Air,Containerized</option>
                     <option value="auto">Auto</option>
                     <option value="barge">Barge</option>
                     <option value="pedestrian">Pedestrian</option>
                     <option value="rail">Rail</option>
                     <option value="rail-containerized">Rail,Containerized</option>
                     <option value="truck">Truck</option>
                     <option value="truck-containerized">Truck,Containerized</option>
                     <option value="vessel">Vessel</option>
                     <option value="vessel-containerized">Vessel,Containerized</option>                     
                  </select>
                </div>
                <div>
                  <Label>Direction</Label>
                  {/*<Input type="text" style={{ width: "100%" }} />*/}
                  <select value={direction} onChange={(e) => {setDirection(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="outgoing">Outgoing</option>
                     <option value="incoming">Incoming</option>                 
                  </select>
                </div>
                <div>
                  <Label>Incoterms</Label>
                  {/*<Input type="text" style={{ width: "100%" }} />*/}
                  <select value={incoterms} onChange={(e) => {setIncoterms(e.target.value); }} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="exw">EXW</option>
                     <option value="fca">FCA</option>
                     <option value="cpt">CPT</option>
                     <option value="cip">CIP</option>
                     <option value="dap">DAP</option>
                     <option value="dpu">DPU</option>
                     <option value="ddp">DDP</option>
                     <option value="fas">FAS</option>
                     <option value="fob">FOB</option>
                     <option value="cfr">CFR</option>
                     <option value="cif">CIF</option>                     
                  </select>
                </div>
                <div>
                  <Label>Frequency</Label>
                  {/*<Input type="text" style={{ width: "100%" }} />*/}
                  <select value={frequency} onChange={(e) => {setFrequency(e.target.value); }} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="other">Other</option>
                     <option value="daily">Daily</option>
                     <option value="weekly">Weekly</option>
                     <option value="bweekly">Bweekly</option>
                     <option value="monthly">Monthly</option>                  
                  </select>
                </div>
                <div>
                  <Label>Description of Goods</Label>
                  <Input value={description} onChange={(e) => {setDescription(e.target.value); }} type="text" style={{ width: "100%" }} />
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
                  <select value={newItem.cntPkg} onChange={(e) => setNewItem({ ...newItem, cntPkg: String(e.target.value) })} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="contenedor-20">Contenedor 20"</option>
                     <option value="contenedor-40">Contenedor 40"</option>
                     <option value="barril">Barril</option>
                     <option value="botella">Botella</option>
                     <option value="caja">Caja</option>
                     <option value="canasta">Canasta</option>
                     <option value="cilindro">Cilindro</option>
                     <option value="piezas">Piezas</option>
                     <option value="pallet">Pallet</option>
                     <option value="otro">Otro</option>                                         
                  </select>
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

      {/* quinto Bloque 5: Routing*/}
<AccordionItem value="routing">
  <AccordionTrigger>Routing</AccordionTrigger>
  <AccordionContent>
    <Card style={{ padding: "10px" }}>
      <CardHeader>
        <CardTitle>Routing</CardTitle>
        {/*<CardDescription>Información adicional sobre el flete</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: "5px" }}>
          <div>
            <Label>Service Type</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={service} onChange={(e) => {setService(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="door-to-door">Door to Door</option>
                     <option value="door-to-port">Door to Port</option>  
                     <option value="port-to-port">Port to Port</option>
                     <option value="port-to-door">Port to Door</option> 
                     <option value="air-to-door">Air to Door</option>
                     <option value="air-to-air">Air to Air</option>                
            </select>
          </div>
          <div>
            <Label>Tax Code</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={tax} onChange={(e) => {setTax(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="air">Air</option>
                     <option value="air-containerized">Air,Containerized</option>
                     <option value="auto">Auto</option>
                     <option value="barge">Barge</option>
                     <option value="pedestrian">Pedestrian</option>
                     <option value="rail">Rail</option>
                     <option value="rail-containerized">Rail,Containerized</option>
                     <option value="truck">Truck</option>
                     <option value="truck-containerized">Truck,Containerized</option>
                     <option value="vessel">Vessel</option>
                     <option value="vessel-containerized">Vessel,Containerized</option>                     
                  </select>
          </div>
          <div>
            <Label>Main Carrier</Label>
            <Input value={main} onChange={(e) => {setMain(e.target.value); }} type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Route</Label>
            <Input value={route} onChange={(e) => {setRoute(e.target.value); }} type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </AccordionContent>
</AccordionItem>

{/* Sexto Bloque 6: Origin */}
<AccordionItem value="origin">
  <AccordionTrigger>Origin</AccordionTrigger>
  <AccordionContent>
    <Card style={{ padding: "10px" }}>
      <CardHeader>
        <CardTitle>Origin</CardTitle>
        {/*<CardDescription>Detalles extendidos del flete</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: "5px" }}>
          <div>
            <Label>Port of Landing</Label>
            <Input value={port} onChange={(e) => {setPort(e.target.value);}} type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Place of receipt</Label>
            <Input value={place} onChange={(e) => {setPlace(e.target.value);}} type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>PreCarriage by</Label>
            <Input value={preCarriage} onChange={(e) => {setPreCarriage(e.target.value); }} type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Shiper</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={shipper} id="customerSelectDO" onChange={(e) => {setShipper(e.target.value); handleSelectChangeDO(e);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
               <option value="">Seleccione un cliente</option>
                  {customers.map((customer) => (
                 <option key={customer.id} value={customer.id}>
                    Customer: {customer.id}
                 </option>
                ))}
            </select>
              {error && <p style={{ color: 'red' }}>{error}</p>}      
          </div>
          <div>
            <Label>Street Addres</Label>
            <Input value={streetAddres} onChange={(e) => {setStreetAddres(e.target.value); }} type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </AccordionContent>
</AccordionItem>

{/* Septimo Bloque 7: Destination */}
<AccordionItem value="destination">
  <AccordionTrigger>Destination</AccordionTrigger>
  <AccordionContent>
    <Card style={{ padding: "10px" }}>
      <CardHeader>
        <CardTitle>Destination</CardTitle>
        {/*<CardDescription>Detalles del evento</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: "5px" }}>
          <div>
            <Label>Port of Unloading</Label>
            <Input value={portD} onChange={(e) => {setPortD(e.target.value);}} type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Place of delivery</Label>
            <Input value={placeD} onChange={(e) => {setPlaceD(e.target.value);}} type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>OnCarriage by</Label>
            <Input value={preCarriageD} onChange={(e) => {setPreCarriageD(e.target.value); }} type="text" style={{ width: "100%" }} />
          </div>
          <div>
            <Label>Consignee</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select  value={shipperD} id="customerSelectD" onChange={(e) => {setShipperD(e.target.value); handleSelectChangeD(e);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
             <option value="">Seleccione un cliente</option>
                  {customers.map((customer) => (
                 <option key={customer.id} value={customer.id}>
                    Customer: {customer.id}
                 </option>
                ))}
            </select>
              {error && <p style={{ color: 'red' }}>{error}</p>}      
          </div>
          <div>
            <Label>Street Addres</Label>
            <Input value={streetAddresD} onChange={(e) => {setStreetAddresD(e.target.value); }} type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </AccordionContent>
</AccordionItem>

      {/* octavo Bloque 8: Charges*/}
<AccordionItem value="charges">
  <AccordionTrigger>Charges</AccordionTrigger>
  <AccordionContent>
    <Card style={{ padding: "10px" }}>
      <CardHeader>
        <CardTitle>Charges of origin</CardTitle>
        {/*<CardDescription>Información adicional sobre el flete</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: "5px" }}>
          <div>
            <Label>Cargos de origen</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={chargesO} onChange={(e) => {setChargesO(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="corte-de-guia">Corte de guia</option>
                     <option value="pick-up">Pick up</option>  
                     <option value="agente-aduanal">Agente aduanal</option>
                     <option value="maniobras">Maniobras</option>               
            </select>
          </div>
          <div>
            <Label>Persona</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={personO} onChange={(e) => {setPersonO(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="shipper">Shipper</option>
                     <option value="consigner">Consigner</option>                  
            </select>
          </div>
          <div>
            <Label>$</Label>
            <Input value={moneyO} onChange={(e) => {setMoneyO(e.target.value);}} type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>Charges of destiny</CardTitle>
        {/*<CardDescription>Información adicional sobre el flete</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: "5px" }}>
          <div>
            <Label>Cargos de destino</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={chargesD} onChange={(e) => {setChargesD(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="liberacion">Liberacion</option>
                     <option value="maniobras">Maniobras</option>  
                     <option value="delivery">Delivery</option>
                     <option value="agente-aduanal">Agente aduanal</option>                
            </select>
          </div>
          <div>
            <Label>Persona</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={personD} onChange={(e) => {setPersonD(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="shipper">Shipper</option>
                     <option value="consigner">Consigner</option>                  
            </select>
          </div>
          <div>
            <Label>$</Label>
            <Input value={moneyD} onChange={(e) => {setMoneyD(e.target.value);}} type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>Charges of transport</CardTitle>
        {/*<CardDescription>Información adicional sobre el flete</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: "5px" }}>
          <div>
            <Label>Cargos de transporte</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={chargesT} onChange={(e) => {setChargesT(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="flete-aereo">Flete aereo</option>
                     <option value="combustible">Combustible</option>  
                     <option value="seguro">Seguro</option>
                     <option value="cargo-por-seguridad">Cargo por Seguridad</option> 
                     <option value="comodity">Comodity</option>
                     <option value="collect-fe">Collect FE</option>                
            </select>
          </div>
          <div>
            <Label>Persona</Label>
            {/*<Input type="text" style={{ width: "100%" }} />*/}
            <select value={personT} onChange={(e) => {setPersonT(e.target.value);}} style={{width: "100%",padding: "8px",border: "1px solid #ccc",borderRadius: "4px",marginTop: "8px"}}>
                     <option value="" disabled selected hidden>--Selecciona una opcion--</option>
                     <option value="shipper">Shipper</option>
                     <option value="consigner">Consigner</option>                  
            </select>
          </div>
          <div>
            <Label>$</Label>
            <Input value={moneyT} onChange={(e) => {setMoneyT(e.target.value);}} type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </CardContent>
    </Card>    
  </AccordionContent>
</AccordionItem>


    </Accordion>
        </div>
  
        {/* Tabla de Items Agregados */}
        <div style={{ marginTop: '20px' }}>
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
                    {/*<Button onClick={() => handleEditItem(index)} >Edit</Button>*/}
                    <Button onClick={() => handleDeleteItem(index)} >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

//export default { CustomerSelector, QuoteView }; 
export default QuoteView;
//export default CustomerSelector;
