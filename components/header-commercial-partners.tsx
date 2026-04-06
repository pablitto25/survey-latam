import { img } from "@/config/img";

export const HeaderCommercialPartners = () => {

  const currentYear = new Date().getFullYear();

  return (
    <header className="relative h-[120px] sm:h-[400px]">
      {/* Imagen de fondo: full width de pantalla */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={img.Imgs.headerLogoBlackV9}
        alt="logo latamly header"
      />
      {/* Contenedor centrado con textos encima de la imagen */}
      <div className="relative mx-auto max-w-5xl h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-center">
          <h1 className="text-lg text-black font-bold">
            Encuesta de satisfacción {currentYear}
          </h1>
          <h1 className="text-lg text-black">Latamly Group</h1>
        </div>
      </div>
    </header>
  );
};
