"use client";
import React, { useEffect, useState } from "react";
import { Button, Textarea, Checkbox } from "@nextui-org/react";
import styles from "@/styles/partnerManufacturers.module.css";
import { img } from "@/config/img";
import Image from "next/image";
import ProgressBarBlack from "@/components/ProgressBarBlack";

interface FormData {
  nombre: string;
  empresa: string;
  cargo: string;
  evaluaciones: { [key: number]: number };
  atributosLatamly: { [key: number]: number };
  nivelDeSatisfaccion: number;
  motivoRuptura: string;
  recomendacion: number;
  ofertasSimilares: number;
  comentario: string;
  marcasClient: string[];
  otrasMarcas: string;
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
  "El servicio Comercial y de Ventas del KAM asginado",
  "El servicio de Marketing y los Planes de Marcas",
  "El conocimiento del mercado de tu país",
  "La relación calidad/precio de nuestros productos",
  "La disponibilidad de Stocks",
  "La Innovación de los productos que lanzamos",
  "La Rentabilidad del negocio",
  "La Financiación en las operaciones",
  "El servicio de logistica y los tiempos de entrega",
  "Los Contenidos de Marketing y Comunicación regionalizado",
  "El Customer SErvice dedicado al usuario",
  "El RMA",
];

const atributos2 = [
  "La comunicación y la calidad de atención en general",
  "El servicio Comercial y de Ventas del KAM asginado",
  "El servicio de Marketing y los Planes de Marcas",
  "El conocimiento del mercado de tu país",
  "La relación calidad/precio de nuestros productos",
  "La disponibilidad de Stocks",
  "La Innovación de los productos que lanzamos",
  "La Rentabilidad del negocio",
  "La Financiación en las operaciones",
  "El servicio de logistica y los tiempos de entrega",
  "Los Contenidos de Marketing y Comunicación regionalizado",
  "El Customer Service dedicado al usuario",
  "El RMA",
];


export default function Form() {
  const [fade, setFade] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [finish, setFinish] = useState(false);
  const [showGif, setShowGif] = useState(false); // Estado para controlar el GIF
  const [otrosChecked, setOtrosChecked] = useState(false);
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el estado del botón

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    cargo: '',
    evaluaciones: {},
    atributosLatamly: {},
    motivoRuptura: '',
    recomendacion: 0,
    ofertasSimilares: 0,
    nivelDeSatisfaccion: 0,
    comentario: '',
    fecha: new Date().toISOString().split('T')[0],
    marcasClient: [], // Inicializar con un array vacío
    otrasMarcas: '', // Inicializar como cadena vacía
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

  const handleAtributosLatamlyChange = (index: number, value: number) => {
    setFormData({
      ...formData,
      atributosLatamly: {
        ...formData.atributosLatamly,
        [index]: value,
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange2 = (label: string) => {
    setSelectedMarcas((prevSelected) => {
      const newSelected = prevSelected.includes(label)
        ? prevSelected.filter((marca) => marca !== label)
        : [...prevSelected, label];

      // Actualiza el estado del formulario con las marcas seleccionadas
      setFormData({ ...formData, marcasClient: newSelected });

      return newSelected;
    });
  };

  const handleCheckboxChange = () => {
    setOtrosChecked(!otrosChecked);
    if (!otrosChecked) {
      setFormData({ ...formData, otrasMarcas: '' });
    } else {
      // Si "Otra" está seleccionada, asegúrate de incluir las otras marcas en `formData`
      setFormData({ ...formData, marcasClient: [...selectedMarcas, formData.otrasMarcas] });
    }
  };


  /* Fetch */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Llamar a validateStep para validar el formulario antes de enviarlo
    if (!validateStep()) {
      alert('Por favor, complete todos los campos requeridos antes de enviar el formulario.');
      return;
    }
    setIsSubmitting(true); // Deshabilitar el botón al iniciar el envío

    try {
      const response = await fetch('https://api.latamly.com/api/client-partners/create', {
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
          atributosLatamly: {},
          motivoRuptura: '',
          recomendacion: 0,
          ofertasSimilares: 0,
          nivelDeSatisfaccion: 0,
          comentario: '',
          fecha: new Date().toISOString().split('T')[0],
          marcasClient: [],
          otrasMarcas: '',
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
      alert('Por favor, complete todos los campos requeridos antes de continuar.');
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
        // Verificar que nombre, empresa y cargo no estén vacíos
        const isBasicInfoValid = formData.nombre && formData.empresa && formData.cargo;

        // Verificar que al menos una marca esté seleccionada
        const isMarcasSelected = formData.marcasClient && formData.marcasClient.length > 0;

        // Validar que ambas condiciones se cumplan
        return isBasicInfoValid && isMarcasSelected;
      case 2:
        return Object.keys(formData.evaluaciones).length === atributos.length;
      case 3:
        return Object.keys(formData.atributosLatamly).length === atributos.length && formData.nivelDeSatisfaccion;
      case 4:
        return formData.motivoRuptura && formData.comentario && formData.recomendacion && formData.ofertasSimilares;
      default:
        return true;
    }
  };

  return (
    <div className="w-full">
      <div className="pb-12">
        {!finish && (
          <ProgressBarBlack currentStep={currentStep} />
        )}
      </div>
      <form className="w-full text-black">
        {/* BLOQUE 1 */}
        <div>
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 1 && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 pb-8 pl-4 pr-4 lg:pl-0 lg:pr-0">
                  <div className="flex flex-col">
                    <p className="text-left text-lg">Nombre:</p>
                    <input className="border border-solid-4px h-8 border-gray-500 pl-1"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-left text-lg">Empresa:</p>
                    <input className="border border-solid-4px h-8 border-gray-500 pl-1"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-left text-lg">Cargo:</p>
                    <input className="border border-solid-4px h-8 border-gray-500 pl-1"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pt-4 pl-6 pb-8 pr-8 bg-[#F3EFEF]">
                  <div>
                    <p className="text-lg">
                      Marcas que comercializa de nuestro portfolio
                    </p>
                    <p className="text-sm text-gray-600">
                      (Seleccione tantas como corresponda)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                    <div className="col-span-2 grid grid-cols-4 gap-4">
                      {["Redragon", "T-Dagger", "Haxly", "XP-Pen", "Jackery", "Cecotec", "BMax"].map((marca) => (
                        <Checkbox
                          key={marca}
                          isSelected={selectedMarcas.includes(marca)}
                          onChange={() => handleCheckboxChange2(marca)}
                        >
                          {marca}
                        </Checkbox>
                      ))}
                      <Checkbox
                        isSelected={otrosChecked}
                        onChange={handleCheckboxChange}
                      >
                        Otra
                      </Checkbox>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-end">
                      <input
                        className="w-full border pl-2 border-solid h-8 border-gray-500"
                        name="otrasMarcas"
                        placeholder="Escriba el nombre de la/s marca/s"
                        disabled={!otrosChecked}
                        value={formData.otrasMarcas}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>



          {/* BLOQUE 2 */}
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 2 && (
              <div>
                <div>
                  <p className="text-lg">
                    ¿Cómo evaluarías los siguientes atributos del servicio de Latamly Group?
                  </p>
                  <p className="text-sm text-gray-600">
                    (Puntuación del 1 al 5 donde 1 - Muy insatisfecho y 5 - Muy satisfecho)
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
                              <td className="p-3">Muy Satisfecho</td>
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
                <div className="p-4 bg-[#F3EFEF]">
                  <div>
                    <p className="text-lg">
                      ¿Cómo calificaría de acuerdo al nivel de importancia, a cada uno de los atributos de Latamly Group?
                    </p>
                    <p className="text-sm text-gray-600">
                      (Puntuación del 1 al 5 donde 1 - Para nada imortante y 5 - Muy Importante)
                    </p>
                  </div>
                  {/* Iteración sobre los atributos */}
                  {atributos2.map((atributo, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center pt-2 pb-4">
                        <div className="w-1/2">
                          <label className="pr-4">{atributo}</label>
                        </div>
                        <div>
                          <table className="table-auto">
                            <thead>
                              <tr className="text-sm">
                                <td className="text-center p-3">Para nada importante</td>
                                <td className="text-center p-6">No importante</td>
                                <td className="text-center p-6">Neutral</td>
                                <td className="text-center p-6">Importante</td>
                                <td className="text-center p-3">Muy importante</td>
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
                                      onChange={() => handleAtributosLatamlyChange(index, radioIndex + 1)}
                                      required
                                    />
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {index < atributos2.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
                <div className="pt-14 pl-8 pb-8">
                  <div className="flex flex-row">
                    <div className="pb-4">
                      <p className="text-lg">¿Cómo evaluarías tu nivel de satisfacción general con Latamly Group?</p>
                      <p className="text-sm text-gray-600">(Puntuación del 1 al 10 donde: 1 - Muy insatisfecho y 10 - Muy satisfecho)</p>
                    </div>
                  </div>
                  <div>
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="text-sm">
                          <td className="">Muy insatisfecho</td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="">Muy satisfecho</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-sm">
                          {Array.from({ length: 10 }).map((_, radioIndex) => (
                            <td key={radioIndex}>
                              <div>
                                <div className="text-center">
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
              <div>
                <div className="pt-14 pl-8 pb-14 pr-8">
                  <div className="flex flex-row">
                    <div>
                      <p>¿Qué motivos pueden ser la puerta de ruptura de vínculo con Latamly Group?</p>
                    </div>
                  </div>
                  <div>
                    <Textarea
                      isRequired
                      variant="bordered"
                      radius="none"
                      labelPlacement="outside"
                      placeholder="Escribir"
                      className="w-full"
                      name="motivoRuptura"
                      value={formData.motivoRuptura}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pt-14 pb-6 pl-8 bg-[#F3EFEF]">
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
                          <td className="p-3">Muy poco probable</td>
                          <td className="p-6">Poco probable</td>
                          <td className="p-6">Neutral</td>
                          <td className="p-6">Probable</td>
                          <td className="p-3">Muy Probable</td>
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
                <div className="pt-14 pb-6 pl-8">
                  <div className="flex flex-row">
                    <div className="pb-4">
                      <p>¿Cómo se compara el servicio de Latamly Group con ofertas similares en el mercado?</p>
                      <p className="text-sm text-gray-600">(Puntuación del 1 al 5 donde 1 - Motablemente inferior y 5 - Notablemente superior)</p>
                    </div>
                  </div>
                  <div>
                    <table className="table-auto">
                      <thead>
                        <tr className="text-sm">
                          <td className="p-3">Notablemente inferior</td>
                          <td className="p-6">Inferior</td>
                          <td className="p-6">Neutral</td>
                          <td className="p-6">Superior</td>
                          <td className="p-3">Notablemente superior</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center text-sm">
                          {Array.from({ length: 5 }).map((_, radioIndex) => (
                            <td key={radioIndex}>
                              <input className="w-7 h-7 checked:accent-gray-500"
                                type="radio"
                                name="ofertasSimilares"
                                value={radioIndex + 1}
                                onChange={() => setFormData({ ...formData, ofertasSimilares: radioIndex + 1 })}
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="pt-14 pl-8 pb-14 pr-8 bg-[#F3EFEF]">
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
                      labelPlacement="outside"
                      placeholder="Escribir"
                      className="w-full bg-white"
                      name="comentario"
                      value={formData.comentario}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* thanks */}
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {finish && (
              <div className="flex flex-col justify-center items-center pt-48 pb-48">
                <p className="text-4xl">Thank you very much for your feedback!</p>
                <p className="text-4xl">We continue working to evolve trade together.</p>
              </div>
            )}
          </div>


          {/* Buttons */}
          <div className="flex justify-center items-center pt-28 gap-20">
            {(currentStep > 1 && currentStep < 5) && (
              <div>
                <Button
                  className="w-40 h-12 bg-[#000000] mb-8 text-white text-2xl rounded-full"
                  onClick={handleBack}
                >
                  VOLVER
                </Button>
              </div>
            )}
            {currentStep < 4 && (

              <div>
                <Button
                  className="w-40 h-12 bg-[#000000] mb-8 text-white text-2xl rounded-full"
                  onClick={handleNext}
                >
                  SIGUIENTE
                </Button>
              </div>
            )}
            {currentStep === 4 && (
              <div className="flex justify-center items-center">
                <Button type="submit"
                  className="w-40 h-12 bg-[#000000] mb-8 text-white text-2xl rounded-full"
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

