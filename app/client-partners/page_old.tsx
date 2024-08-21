"use client";
import React, { useState } from "react";
import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";


interface FormData {
  nombre: string;
  empresa: string;
  cargo: string;
  marcas: string;
  evaluaciones: { [key: number]: number };
  menosValora: string;
  satisfaccionLatamly: number;
  recomendacion: number;
  comparacion: number;
  puertaDeRuptura: string,
  comentario: string,
  fecha: string;
}


const atributos = [
  "La comunicacion y la calidad de atención en general",
  "El servicio Comercial y de Ventas del KAM asginado",
  "El servicio de Marketing y los planes de Marcas",
  "El conocimiento del mercado de tu país",
  "La relación calidad/precio de nuestros productos",
  "La disponibilidad de Stocks",
  "La Innovación de los productos que lanzamos",
  "La rentabilidad del negocio",
  "La Financiación en las operaciones",
  "El servicio de logística y los tiempos de entrega",
  "Los contenidos de Marketing y Comunicación regionalizados",
  "El customer Service dedicado al usuario",
  "El RMA",
];

export default function Form() {

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    cargo: '',
    marcas: '',
    evaluaciones: {},
    menosValora: '',
    satisfaccionLatamly: 0,
    recomendacion: 0,
    comparacion: 0,
    puertaDeRuptura: '',
    comentario: '',
    fecha: new Date().toISOString().split('T')[0],
  });




  const handleEvaluationChange = (index: number, value: number) => {
    setFormData({
      ...formData,
      evaluaciones: {
        ...formData.evaluaciones,
        [index]: value,
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  /* Fetch */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/client-partners/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Formulario enviado con éxito');
        // Limpia el formulario si es necesario
        setFormData({
          nombre: '',
          empresa: '',
          cargo: '',
          marcas: '',
          evaluaciones: {},
          menosValora: '',
          satisfaccionLatamly: 0,
          recomendacion: 0,
          comparacion: 0,
          puertaDeRuptura: '',
          comentario: '',
          fecha: new Date().toISOString().split('T')[0],
        });
      } else {
        alert('Error al enviar el formulario');
      }
    } catch (error) {
      alert('Error de red al enviar el formulario');
    }
  };


  return (
    <form className="w-full text-black">
      {/* BLOQUE 1 */}
      <div className="">
        <div className="grid grid-cols-2 gap-4 pb-8">
          <div className="flex flex-col">
            <p className="text-left">Name:</p>
            <input className="border border-solid-4px border-gray-400"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left">Company:</p>
            <input className="border border-solid-4px border-gray-400"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left">Position:</p>
            <input className="border border-solid-4px border-gray-400"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left">Marcas que comercializan de nuestro portfolio:</p>
            <input className="border border-solid-4px border-gray-400"
              name="marcas"
              value={formData.marcas}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* BLOQUE 2 */}
        <div className="bg-[#F3EFEF] p-4 text-left">
          <div>
            <p className="">
              ¿Cómo evaluarías los siguientes atributos de nuestra propuesta?
            </p>
            <p className="text-sm text-gray-600">
              (Muy insatisfecho a Muy Satisfecho con escala de 1 a 5 en cada punto)
            </p>
          </div>
          {/* Iteración sobre los atributos */}
          {atributos.map((atributo, index) => (
            <div key={index}>
              <div className="flex justify-between items-center pt-2 pb-4">
                <div>
                  <label className="pr-4">{atributo}</label>
                </div>
                <div>
                  <table className="table-auto">
                    <thead>
                      <tr className="text-sm">
                        <td className="p-3">Very Dissatisfied</td>
                        <td className="p-6">Dissatisfied</td>
                        <td className="p-6">Neutral</td>
                        <td className="p-6">Satisfied</td>
                        <td className="p-3">Very Satisfied</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center text-sm">
                        {Array.from({ length: 5 }).map((_, radioIndex) => (
                          <td key={radioIndex}>
                            <input
                              className="w-7 h-7 checked:accent-gray-500"
                              type="radio"
                              name={`atributo${index}`}
                              value={radioIndex + 1}
                              onChange={() => handleEvaluationChange(index, radioIndex + 1)}
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {index < atributos.length - 1 && <hr />}
            </div>
          ))}
        </div>
        {/* BLOQUE 3 */}
        <div className="pt-14 pl-8 pb-14 pr-8">
          <div className="flex flex-row">
            <div>
              <p>¿Qué es lo que menos valora de Latamly Group?</p>
            </div>
          </div>
          <div>
            <Textarea
              isRequired
              variant="bordered"
              radius="none"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="w-full"
              name="menosValora"
              value={formData.menosValora}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* BLOQUE 4 */}
        <div className="pt-12 pl-8 bg-[#F3EFEF]">
          <div className="flex flex-row">
            <div className="pb-4">
              <p>¿Cómo evaluarias tu nivel de satisfacción con la empresa?</p>
              <p className="text-sm text-gray-600">(Muy poco probable a Muy probable con escala de 1 a 10)</p>
            </div>
          </div>
          <div>
            <table className="table-auto w-full">
              <tbody>
                <tr className="text-center text-sm">
                  {Array.from({ length: 10 }).map((_, radioIndex) => (
                    <td key={radioIndex}>
                      <div className="flex flex-col justify-between">
                        <div>
                          <label>{radioIndex + 1}</label>
                        </div>
                        <div>
                          <input className="w-7 h-7 m-2 checked:accent-gray-500"
                            type="radio"
                            name="satisfaccionLatamly"
                            value={radioIndex + 1}
                            onChange={() => setFormData({ ...formData, satisfaccionLatamly: radioIndex + 1 })}
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* BLOQUE 5 */}
        <div className="pt-14 pl-8 pb-8 bg-[#F3EFEF]">
          <div className="flex flex-row">
            <div className="pb-4">
              <p>Si les solicitan referencias de Latamly Group ¿Qué tan probable es que recomienden nuestros servicios?</p>
              <p className="text-sm text-gray-600">(Muy poco probable a Muy probable con escala de 1 a 5)</p>
            </div>
          </div>
          <div>
            <table className="table-auto">
              <thead>
                <tr className="text-sm">
                  <td className="p-3">Very Dissatisfied</td>
                  <td className="p-6">Dissatisfied</td>
                  <td className="p-6">Neutral</td>
                  <td className="p-6">Satisfied</td>
                  <td className="p-3">Very Satisfied</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center text-sm">
                  {Array.from({ length: 5 }).map((_, radioIndex) => (
                    <td key={radioIndex}>
                      <input className="w-7 h-7 checked:accent-gray-500"
                        type="radio"
                        name="recomendacion"
                        value={radioIndex + 1}
                        onChange={() => setFormData({ ...formData, recomendacion: radioIndex + 1 })}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* BLOQUE 6 */}
        <div className="pt-14 pl-8 pb-12">
          <div className="flex flex-row">
            <div className="pb-4">
              <p>¿Cómo se compara nuestro servicio con ofertas similares en el mercado?
              </p>
              <p className="text-sm text-gray-600">(Muy poco probable a Muy probable con escala de 1 a 5)</p>
            </div>
          </div>
          <div>
            <table className="table-auto">
              <thead>
                <tr className="text-sm">
                  <td className="p-3">Very Dissatisfied</td>
                  <td className="p-6">Dissatisfied</td>
                  <td className="p-6">Neutral</td>
                  <td className="p-6">Satisfied</td>
                  <td className="p-3">Very Satisfied</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center text-sm">
                  {Array.from({ length: 5 }).map((_, radioIndex) => (
                    <td key={radioIndex}>
                      <input className="w-7 h-7 checked:accent-gray-500"
                        type="radio"
                        name="comparacion"
                        value={radioIndex + 1}
                        onChange={() => setFormData({ ...formData, comparacion: radioIndex + 1 })}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* BLOQUE 7 */}
        <div className="pt-14 pl-8 pb-14 pr-8 bg-[#F3EFEF]">
          <div className="flex flex-row">
            <div>
              <p>¿Qué motivos puede ser la puerta de ruptura del vínculo con Latamly Group?</p>
            </div>
          </div>
          <div>
            <Textarea
              isRequired
              variant="bordered"
              radius="none"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="w-full"
              name="puertaDeRuptura"
              value={formData.puertaDeRuptura}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* BLOQUE 8 */}
        <div className="pt-14 pl-8 pb-14 pr-8">
          <div className="flex flex-row">
            <div>
              <p>¿Qué motivos puede ser la puerta de ruptura del vínculo con Latamly Group?</p>
            </div>
          </div>
          <div>
            <Textarea
              isRequired
              variant="bordered"
              radius="none"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="w-full"
              name="comentario"
              value={formData.comentario}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" className=" h-12 bg-[#FF0000] mb-8 text-white text-3xl rounded-full" onClick={handleSubmit}>
            <p className="">ENVIAR</p>
          </Button>
        </div>
      </div>
    </form>
  );
}

