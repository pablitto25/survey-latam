"use client";
import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import styles from "@/styles/partnerManufacturers.module.css";
import { img } from "@/config/img";
import Image from "next/image";
import ProgressBarRedEs from "@/components/ProgressBarRedEs";

interface FormData {
  nombre: string;
  empresa: string;
  cargo: string;
  evaluaciones: { [key: number]: number };
  valoraMas: string;
  nivelDeSatisfaccion: number;
  motivoRuptura: string;
  recomendacion: number;
  comentario: string;
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
  "La comunicación y la calidad de atención en general",
"La Rentabilidad del negocio",
"El Plan de la marca por territorio",
"La Logística Internacional",
"Los contenidos de marketing y comunicación regionalizados",
"El customer service dedicado al usuario y RMA",
"La gestión de compras",
"La gestión de pagos",
"La selección y gestión con los partners comerciales",
"El feedback en general del negocio, productos, etc.",
"El conocimiento del mercado de los países latinoamericanos",
];

export default function Form() {
  const [fade, setFade] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [finish, setFinish] = useState(false);
  const [showGif, setShowGif] = useState(false); // Estado para controlar el GIF
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    cargo: '',
    evaluaciones: {},
    valoraMas: '',
    motivoRuptura: '',
    recomendacion: 0,
    nivelDeSatisfaccion: 0,
    comentario: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (currentStep === 5) {
      setShowGif(false); // Oculta el GIF cuando currentStep es 5
    }
  }, [currentStep]);

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


  /* Fetch */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep()) {
      alert('Please complete all required fields before submitting the form.');
      return;
    }
    setIsSubmitting(true); // Deshabilitar el botón al iniciar el envío

    try {
      const response = await fetch('https://api.latamly.com/api/partners-manufacturers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        /* alert('Formulario enviado con éxito'); */
        setShowGif(true);
        setTimeout(() => {
          setCurrentStep(5);
          setFinish(true);
        }, 2500);
        // Limpia el formulario si es necesario
        setFormData({
          nombre: '',
          empresa: '',
          cargo: '',
          evaluaciones: {},
          valoraMas: '',
          motivoRuptura: '',
          recomendacion: 0,
          nivelDeSatisfaccion: 0,
          comentario: '',
          fecha: new Date().toISOString().split('T')[0],
        });
      } else {
        alert('Error al enviar el formulario');
      }
    } catch (error) {
      alert('Error de red al enviar el formulario');
    } finally {
      setIsSubmitting(false); // Habilitar el botón después de la respuesta
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setFade(true);
        setTimeout(() => {
          setFade(false);
          setCurrentStep(currentStep + 1);
          window.scrollTo({ top: 450, behavior: 'smooth' }); // Scroll hacia arriba
        }, 300);
      }
    } else {
      alert('Please complete all required fields before submitting the form.');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 450, behavior: 'smooth' }); // Scroll hacia arriba
      }, 300);
    }
  };

  /* validation */

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.nombre && formData.empresa && formData.cargo;
      case 2:
        return Object.keys(formData.evaluaciones).length === atributos.length;
      case 3:
        return formData.motivoRuptura && formData.recomendacion && formData.nivelDeSatisfaccion;
      case 4:
        return formData.comentario;
      default:
        return true;
    }
  };


  return (
    <div className="w-full max-w-5xl">
      <div className="pb-12">
        {!finish && (
          <ProgressBarRedEs currentStep={currentStep} />
        )}
      </div>
      <form className="w-full text-black">
        {/* BLOQUE 1 */}
        <div>
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 pb-8 pl-4 pr-4 lg:pl-0 lg:pr-0">
                <div className="flex flex-col">
                  <p className="text-left text-lg">Nombre:</p>
                  <input className="border border-solid-4px h-8 border-gray-500"
                    name="nombre"
                    placeholder="Escribir..."
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-left text-lg">Empresa:</p>
                  <input className="border border-solid-4px h-8 border-gray-500"
                    name="empresa"
                    placeholder="Escribir..."
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-left text-lg">Cargo:</p>
                  <input className="border border-solid-4px h-8 border-gray-500"
                    name="cargo"
                    placeholder="Escribir..."
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </div>



          {/* BLOQUE 2 */}
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 2 && (
              <div>
                <div className="pl-4 lg:pl-0">
                  <p className="text-lg">
                    ¿Cómo evaluarías los siguientes atributos del servicio de Latamly Group?
                  </p>
                  <p className="text-sm text-gray-600">
                    (Puntuación del 1 al 5 donde, 1 = Muy insatisfecho y 5 = Muy satisfecho)
                  </p>
                </div>
                {/* Iteración sobre los atributos */}
                {atributos.map((atributo, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-4 md:pt-2 pb-4">
                      <div>
                        <label className="pr-4">{atributo}</label>
                      </div>
                      <div>
                        <table className="table-auto">
                          <thead>
                            <tr className="text-sm">
                              <td className="p-3">Muy Insatisfecho</td>
                              <td className="p-6">Insatisfecho</td>
                              <td className="p-6">Neutral</td>
                              <td className="p-6">Satisfecho</td>
                              <td className="p-3">Muy satisfecho</td>
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
                                    required
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
            )}
          </div>

          {/* BLOQUE 3 */}
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 3 && (
              <div>
                <div className="pt-14 pl-8 pb-14 pr-8">
                  <div className="flex flex-row pb-4">
                    <div>
                      <p className="text-lg">¿Qué es lo que más valora de la relación y qué los impulsa a continuar trabajando con Latamly Group?</p>
                    </div>
                  </div>
                  <div>
                    <Textarea
                      variant="bordered"
                      radius="none"
                      labelPlacement="outside"
                      placeholder="type..."
                      className="w-full"
                      name="valoraMas"
                      value={formData.valoraMas}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pt-14 pl-8 pb-14 pr-8 bg-[#F3EFEF]">
                  <div className="flex flex-row pb-4">
                    <div>
                      <p className="text-lg">¿Qué motivos pueden ser la puerta de ruptura del vínculo con Latamly Group?</p>
                    </div>
                  </div>
                  <div>
                    <Textarea
                      variant="bordered"
                      radius="none"
                      labelPlacement="outside"
                      placeholder="type..."
                      className="w-full"
                      name="motivoRuptura"
                      value={formData.motivoRuptura}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pt-14 pl-8">
                  <div className="flex flex-row">
                    <div className="pb-4">
                      <p className="text-lg">¿Si les solicitan referencias de Latamly Group ¿Qué tan probable es que nos recomienden?</p>
                      <p className="text-sm text-gray-600">(Muy poco probable a Muy probable con escala de 1 a 5)</p>
                    </div>
                  </div>
                  <div>
                    <table className="table-auto">
                      <thead>
                        <tr className="text-sm">
                          <td className="p-3">Muy Poco probable</td>
                          <td className="p-10">Poco probable</td>
                          <td className="p-10">Neutral</td>
                          <td className="p-10">Probable</td>
                          <td className="p-3">Muy probable</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center text-sm">
                          {Array.from({ length: 5 }).map((_, radioIndex) => (
                            <td key={radioIndex}>
                              <input className={styles.customRadio}
                                type="radio"
                                name="recomendacion"
                                value={radioIndex + 1}
                                onChange={() => setFormData({ ...formData, recomendacion: radioIndex + 1 })}
                                required
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-14 pl-8 pb-8">
                  <div className="flex flex-row">
                    <div className="pb-4">
                      <p className="text-lg">¿Cómo evaluarías tu nivel de satisfacción con Latamly Group?</p>
                      <p className="text-sm text-gray-600">(Puntuación del 1 al 10 donde: 1 = Muy insatisfecho y 10 = Muy satisfecho)</p>
                    </div>
                  </div>
                  <div>
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="text-center text-sm">
                          <td className="">1</td>
                          <td className="">2</td>
                          <td className="">3</td>
                          <td className="">4</td>
                          <td className="">5</td>
                          <td className="">6</td>
                          <td className="">7</td>
                          <td className="">8</td>
                          <td className="">9</td>
                          <td className="">10</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center text-sm">
                          {Array.from({ length: 10 }).map((_, radioIndex) => (
                            <td key={radioIndex}>
                              <div className="flex flex-col justify-between">
                                <div>
                                  <input className={styles.customRadio}
                                    type="radio"
                                    name="nivelDeSatisfaccion"
                                    value={radioIndex + 1}
                                    onChange={() => setFormData({ ...formData, nivelDeSatisfaccion: radioIndex + 1 })}
                                    required
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
              </div>
            )}
          </div>

          {/* STEP 4 */}
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 4 && (
              <div className="pt-14 pl-8 pb-14 pr-8">
                <div className="flex flex-row pb-4">
                  <div>
                    <p className="text-lg">¿Hay alguna otra cosa que te gustaría decirnos?</p>
                  </div>
                </div>
                <div>
                  <Textarea
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    placeholder="type..."
                    className="w-full"
                    name="comentario"
                    value={formData.comentario}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* thanks */}
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {finish && (
              <div className="flex flex-col justify-center items-center pt-48 pb-48">
                <p className="text-4xl">¡Agredecemos mucho tu feedback!</p>
                <p className="text-4xl">Seguimos trabajando para desarrollar el negocio juntos.</p>
              </div>
            )}
          </div>


          {/* Buttons */}
          <div className="flex justify-center items-center pt-28 gap-20">
            {(currentStep > 1 && currentStep < 5) && (
              <div>
                <Button
                  className="w-40 h-12 bg-[#FF0000] mb-8 text-white text-[1.2rem] rounded-full"
                  onClick={handleBack}
                >
                  ATRAS
                </Button>
              </div>
            )}
            {currentStep < 4 && (

              <div>
                <Button
                  className="w-40 h-12 bg-[#FF0000] mb-8 text-white text-[1.2rem] rounded-full"
                  onClick={handleNext}
                >
                  SIGUIENTE
                </Button>
              </div>
            )}
            {currentStep === 4 && (
              <div className="flex justify-center items-center">
                <Button type="submit"
                  className="w-40 h-12 bg-[#FF0000] mb-8 text-white text-[1.2rem] rounded-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting} // Deshabilitar el botón cuando isSubmitting es true
                >
                  <p className="m-8">ENVIAR</p>
                </Button>
              </div>
            )}
          </div>
          {showGif && (
            <div className="flex justify-center items-center">
              <Image src={img.Imgs.success} alt="Success" width={100} height={100} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

