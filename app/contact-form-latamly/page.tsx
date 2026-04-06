"use client"
/* import { title } from "@/components/primitives"; */
import { inputForm, textAreaForm, buttonForm } from "@/components/primitives";
import Spinner from "@/components/spinner";
import React, { useState } from "react";

interface FormData {
  name: string;
  email_address: string;
  company: string;
  subject: string;
  message: string;
}

export default function LatamlyContactForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email_address: '',
    company: '',
    subject: '',
    message: '',
  });


  //capturar campos
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /* Fetch */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8080/latamly/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //limpiar el formulario o mostrar un mensaje
        setSuccess(true);
        setError(false);
        setFormData({
          name: '',
          email_address: '',
          company: '',
          subject: '',
          message: '',
        });
      } else {
        // Manejar el error de la respuesta
        setError(true)
      }
    } catch (error) {
      alert('Error de red al enviar el formulario');
      setError(true)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form>
        <div className="w-[24rem] flex-col space-y-4">
          <div>
            <input type="text"
              className={inputForm({ color: 'black', sizeText: 'ph' })}
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange} />
          </div>
          <div>
            <input type="text"
              className={inputForm({ color: 'black', sizeText: 'ph' })}
              name="email_address"
              placeholder="Email*"
              value={formData.email_address}
              onChange={handleChange} />
          </div>
          <div>
            <input type="text"
              className={inputForm({ color: 'black', sizeText: 'ph' })}
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange} />
          </div>
          <div>
            <input type="text"
              className={inputForm({ color: 'black', sizeText: 'ph' })}
              name="subject"
              placeholder="Subject*"
              value={formData.subject}
              onChange={handleChange} />
          </div>
          <div>
            <textarea id=""
              className={textAreaForm({ color: 'black', sizeText: 'ph' })}
              name="message"
              placeholder="Message*"
              value={formData.message}
              onChange={handleChange} />
          </div>
          {success == true && (
            <div className="flex flex-row bg-[#1E73BE] p-7 text-white">
              <div><svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="#3BC844" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg></div>
              <div>THANK YOU FOR YOUR MESSAGE. IT HAS BEEN SENT.</div>
            </div>
          )}
          {error == true &&(
            <div className="flex flex-row bg-[#FE0000] p-7 text-white">
              <div><svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="#FFFFFF" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg></div>
              <div>A FAILURE HAS OCURRED, TRY AGAIN LATER.</div>
            </div>
          )}

          <div className="flex justify-end font-medium">
            {!isLoading ? (
              <button className={buttonForm()} type="submit" onClick={handleSubmit}>Send</button>
            ) : (
              <button className={buttonForm()} type="button" disabled><Spinner /></button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
