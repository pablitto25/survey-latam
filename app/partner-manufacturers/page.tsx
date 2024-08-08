"use client";
import React, { useState } from "react";
import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";


interface FormData {
  nombre: string;
  empresa: string;
  cargo: string;
  evaluaciones: { [key: number]: number };
  valoraMas: string;
  valoraMenos: string;
  motivoRuptura: string;
  motivoContinuar: string;
  recomendacion: number;
  referenciaLatamly: number;
  unaOpinion: string;
  fecha: string;
}

const options1 = [
  { key: "1", label: "Opción 1" },
  { key: "2", label: "Opción 2" },
  { key: "3", label: "Opción 3" },
  { key: "4", label: "Opción 4" },
  { key: "5", label: "Opción 5" }
];


const atributos = [
  "Communication and overall quality of service",
  "Business profitability",
  "Brand plan by territory",
  "International logistics",
  "Regionalized marketing and communication content",
  "Customer service dedicated to users and RMA",
  "Procurement management",
  "Payment management",
  "Selection and management with commercial partners",
  "Overall feedback on the business, products, etc.",
  "Knowledge of the market in Latin American countries",
];

export default function Form() {

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    cargo: '',
    evaluaciones: {},
    valoraMas: '',
    valoraMenos: '',
    motivoRuptura: "",
    motivoContinuar: "",
    recomendacion: 0,
    referenciaLatamly: 0,
    unaOpinion: "",
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
    console.log("Test " + name + " y value " + value)
  };

  /* Fetch */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/partners-manufacturers/create', {
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
          evaluaciones: {},
          valoraMas: '',
          valoraMenos: '',
          motivoRuptura: "",
          motivoContinuar: "",
          recomendacion: 0,
          referenciaLatamly: 0,
          unaOpinion: "",
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
        </div>
        {/* BLOQUE 2 */}
        <div className="bg-[#F3EFEF] p-4 text-left">
          <div>
            <p className="">
              How would you rate the following attributes of Latamly Groups services?
            </p>
            <p className="text-sm text-gray-600">
              (Very Dissatisfied to Very Satisfied on a scale of 1 to 5, with each point)
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
        {/* <div className="pt-14 pl-8 pb-14">
          <div className="flex flex-row">
            <div>
              <p>¿Qué es lo que más valora de Latamly Group?</p>
            </div>
          </div>
          <div>
            <Select
              isRequired
              label="Seleccionar 1 Opción"
              className="max-w-md"
              radius="none"
              variant="bordered"
              name="valorMas"
              value={formData.valoraMas}
              onChange={(e) => handleSelectChange("valoraMas", e.target.value)}
            >
              {options1.map((option) => (
                <SelectItem key={option.key} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div> */}
        {/* BLOQUE 4 */}
        {/* <div className="pt-14 pl-8 pb-14 bg-[#F3EFEF]">
          <div className="flex flex-row">
            <div>
              <p>¿Qué es lo que menos valora de Latamly Group?</p>
            </div>
          </div>
          <div>
            <Select
              isRequired
              label="Seleccionar 1 Opción"
              className="max-w-md"
              radius="none"
              variant="bordered"
              name="valorMas"
              value={formData.valoraMenos}
              onChange={(e) => handleSelectChange("valoraMenos", e.target.value)}
            >
              {options1.map((option) => (
                <SelectItem key={option.key} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div> */}
        {/* BLOQUE 5 */}
        <div className="pt-14 pl-8 pb-14 pr-8">
          <div className="flex flex-row">
            <div>
              <p>What do you value most about the relationship and what drives you to continue working with Latamly Group?</p>
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
              name="motivoRuptura"
              value={formData.motivoRuptura}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* BLOQUE 6 */}
        {/* <div className="pt-14 pl-8 pb-14 pr-8">
          <div className="flex flex-row">
            <div>
              <p>¿Qué los impulsa a continuar trabajando con nosotros?</p>
            </div>
          </div>
          <div>
            <Textarea
              isRequired
              variant="bordered"
              radius="none"
              label="Description"
              labelPlacement="outside"
              placeholder="Introduce tu descripción"
              className="w-full"
              name="motivoContinuar"
              value={formData.motivoContinuar}
              onChange={handleChange}
            />
          </div>
        </div> */}
        {/* BLOQUE 7 */}
        {/* <div className="pt-14 pl-8 bg-[#F3EFEF]">
          <div className="flex flex-row">
            <div className="pb-4">
              <p>Si les solicitan referencias de Latamly Group ¿Qué tan probable es que recomienden nuestro servicio?</p>
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
        </div> */}
        {/* BLOQUE 8 */}
        {/* <div className="pt-14 pl-8 pb-8 bg-[#F3EFEF]">
          <div className="flex flex-row">
            <div className="pb-4">
              <p>Si les solicitan referencias de Latamly Group ¿Qué tan probable es que recomienden nuestro servicio?</p>
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
                            name="referenciaLatamly"
                            value={radioIndex + 1}
                            onChange={() => setFormData({ ...formData, referenciaLatamly: radioIndex + 1 })}
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
        {/* BLOQUE 9 */}
        {/* <div className="pt-14 pl-8 pb-14 pr-8">
          <div className="flex flex-row">
            <div>
              <p>¿Hay alguna otra cosa que te gustaría decirnos?</p>
            </div>
          </div>
          <div>
            <Textarea
              isRequired
              variant="bordered"
              radius="none"
              label="Description"
              labelPlacement="outside"
              placeholder="Introduce tu descripción"
              className="w-full"
              name="unaOpinion"
              value={formData.unaOpinion}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="flex justify-center items-center">
          <Button type="submit" className="w-40 h-12 bg-[#FF0000] mb-8 text-white text-3xl rounded-full" onClick={handleSubmit}>
            <p className="m-8">ENVIAR</p>
          </Button>
        </div>
      </div>
    </form>
  );
}

