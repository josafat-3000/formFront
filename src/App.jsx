import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, notification, Card, Typography } from 'antd';
import axios from 'axios'; // Importamos Axios

const { Title } = Typography;

const AcuseForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Enviar los datos al servidor usando Axios
      const response = await axios.post(`${import.meta.env.VITE_HOST}/generate-pdf`, values);

      // Mostrar notificación de éxito
      notification.success({
        message: 'Formulario Enviado',
        description: 'El acuse ha sido enviado correctamente.',
      });

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      // Manejar errores y mostrar notificación de error
      console.error("Error al enviar los datos:", error);
      notification.error({
        message: 'Error al enviar el formulario',
        description: 'Hubo un problema al enviar los datos al servidor.',
      });
    }
  };

  return (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
      <Card 
        style={{ width: 500, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
        title={<Title level={3} style={{ textAlign: 'center', margin: 0 }}>Formulario de Acuse de Recibo</Title>}
      >
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
          <Form.Item
            label="Destinatario"
            name="recipient"
            rules={[{ required: true, message: 'Por favor ingrese el destinatario' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Empresa"
            name="company"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de la empresa' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Producto"
            name="product"
            rules={[{ required: true, message: 'Por favor ingrese el producto' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Cantidad"
            name="qty"
            rules={[{ required: true, message: 'Por favor ingrese la cantidad' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Concepto"
            name="concept"
            rules={[{ required: true, message: 'Por favor ingrese el concepto' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[{ required: true, message: 'Por favor ingrese un correo electrónico', type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Enviar Acuse
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AcuseForm;
