import React, { useRef, useState } from 'react';
import { Form, Input, Button, InputNumber, Card, Typography, notification, Row, Col } from 'antd';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import logo from "./assets/logo.jpg"; // Ruta del logo

const { Title } = Typography;

const AcuseForm = () => {
  const [form] = Form.useForm();

  // Referencias para los canvas de firma
  const firmaReceptorRef = useRef(null);
  const firmaEmisorRef = useRef(null);

  // Estados para almacenar las firmas en base64
  const [firmaReceptor, setFirmaReceptor] = useState(null);
  const [firmaEmisor, setFirmaEmisor] = useState(null);

  // Función para capturar la firma en base64
  const handleSaveSignature = (ref, setState) => {
    if (ref.current) {
      setState(ref.current.toDataURL("image/png"));
    }
  };

  // Función para borrar la firma
  const handleClearSignature = (ref, setState) => {
    if (ref.current) {
      ref.current.clear();
      setState(null);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        firmaReceptor,
        firmaEmisor
      };

      const response = await axios.post(`${import.meta.env.VITE_HOST}/generate-pdf`, payload);

      notification.success({
        message: 'Formulario Enviado',
        description: 'El acuse ha sido enviado correctamente.',
      });

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      notification.error({
        message: 'Error al enviar el formulario',
        description: 'Hubo un problema al enviar los datos al servidor.',
      });
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
        title={<Title level={3} style={{ textAlign: 'center', margin: 0 }}>Formulario de Acuse de Recibo</Title>}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={logo} alt="logo" style={{ width: "100%", maxWidth: "300px" }} />
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            recipient: "ING. CARLOS VEGA",
            company: "Four Seasons Hotel Mexico City - INMOBILIARIA NACIONAL MEXICANA SA DE CV",
            product: "PPD800",
            qty: 1,
            concept: "SALTO Portable programming device",
            email: "josafat30000@gmail.com"
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Destinatario" name="recipient">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Empresa" name="company">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Producto" name="product">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Cantidad" name="qty">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Concepto" name="concept">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Correo Electrónico" name="email">
                <Input />
              </Form.Item>
            </Col>

            {/* 📝 Observaciones */}
            <Col span={24}>
              <Form.Item label="Observaciones" name="observations">
                <Input.TextArea rows={3} placeholder="Añadir comentarios adicionales..." />
              </Form.Item>
            </Col>

            {/* 🖊️ Firma del Receptor */}
            <Col span={24}>
              <Title level={5}>Firma del Receptor</Title>
              <SignatureCanvas ref={firmaReceptorRef} canvasProps={{ width: 450, height: 100, className: 'sigCanvas' }} />
              <Button onClick={() => handleSaveSignature(firmaReceptorRef, setFirmaReceptor)} style={{ margin: '5px' }}>Guardar Firma</Button>
              <Button onClick={() => handleClearSignature(firmaReceptorRef, setFirmaReceptor)} danger>Limpiar</Button>
            </Col>

            {/* 🖊️ Firma del Emisor */}
            <Col span={24}>
              <Title level={5}>Firma del Emisor</Title>
              <SignatureCanvas ref={firmaEmisorRef} canvasProps={{ width: 450, height: 100, className: 'sigCanvas' }} />
              <Button onClick={() => handleSaveSignature(firmaEmisorRef, setFirmaEmisor)} style={{ margin: '5px' }}>Guardar Firma</Button>
              <Button onClick={() => handleClearSignature(firmaEmisorRef, setFirmaEmisor)} danger>Limpiar</Button>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Enviar Acuse
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AcuseForm;
