"use client";
import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import ProgressBarRed from "@/components/ProgressBarRed";
import styles from "@/styles/partnerManufacturers.module.css";
import success from "@/public/images/success.gif";
import Image from "next/image";

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
  const [fade, setFade] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [finish, setFinish] = useState(false);
  const [showGif, setShowGif] = useState(false); // Estado para controlar el GIF

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

    try {
      const response = await fetch('http://localhost:8080/api/partners-manufacturers/create', {
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
        return formData.nombre && formData.empresa && formData.cargo;
      case 2:
        return Object.keys(formData.evaluaciones).length === atributos.length;
      case 3:
        return formData.motivoRuptura && formData.recomendacion && formData.nivelDeSatisfaccion;
      default:
        return true;
    }
  };


  return (
    <div className="w-full">
      <div className="pb-12">
        {!finish && (
          <ProgressBarRed currentStep={currentStep} />
        )}
      </div>
      <form className="w-full text-black">
        {/* BLOQUE 1 */}
        <div>
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4 pb-8">
                <div className="flex flex-col">
                  <p className="text-left text-lg">Name:</p>
                  <input className="border border-solid-4px h-8 border-gray-500"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-left text-lg">Company:</p>
                  <input className="border border-solid-4px h-8 border-gray-500"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-left text-lg">Position:</p>
                  <input className="border border-solid-4px h-8 border-gray-500"
                    name="cargo"
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
                <div>
                  <p className="text-lg">
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
                              <td className="p-3">Very unsatisfied</td>
                              <td className="p-6">Unsatisfied</td>
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
                      <p className="text-lg">What do you value most about the relationship and what drives you to continue working with Latamly Group?</p>
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
                      <p className="text-lg">What reasons could lead to a breakdown in the relationship with Latamly Group?</p>
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
                      <p className="text-lg">If you are asked for references for Latamly Group. how likely are you to recommend us?</p>
                      <p className="text-sm text-gray-600">(Very Unlikely to Very Likely on a scale of 1 to 5)</p>
                    </div>
                  </div>
                  <div>
                    <table className="table-auto">
                      <thead>
                        <tr className="text-sm">
                          <td className="p-3">Very Unlikely</td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-3">Very Likely</td>
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
                      <p className="text-lg">How would you rate your level of satisfaction woth Latamly Group?</p>
                      <p className="text-sm text-gray-600">(Very Unlikely to Very Likely on a scale of 1 to 10)</p>
                    </div>
                  </div>
                  <div>
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="text-sm">
                          <td className="p-3">Very Unlikely</td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-10"></td>
                          <td className="p-3">Very Likely</td>
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
                    <p className="text-lg">Is there anything else you would like to tell us?</p>
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
                  className="w-40 h-12 bg-[#FF0000] mb-8 text-white text-3xl rounded-full"
                  onClick={handleBack}
                >
                  BACK
                </Button>
              </div>
            )}
            {currentStep < 4 && (

              <div>
                <Button
                  className="w-40 h-12 bg-[#FF0000] mb-8 text-white text-3xl rounded-full"
                  onClick={handleNext}
                >
                  NEXT
                </Button>
              </div>
            )}
            {currentStep === 4 && (
              <div className="flex justify-center items-center">
                <Button type="submit" className="w-40 h-12 bg-[#FF0000] mb-8 text-white text-3xl rounded-full" onClick={handleSubmit}>
                  <p className="m-8">SEND</p>
                </Button>
              </div>
            )}
          </div>
          {showGif && (
            <div className="flex justify-center items-center">
              <Image src={success} alt="Success" width={100} height={100} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

