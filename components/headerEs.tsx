import { img } from "@/config/img";
import Link from "next/link";

export const HeaderEs = () => {

  const currentYear = new Date().getFullYear();

  return (
    <header className="relative h-[120px] sm:h-[400px]">
      {/* Imagen de fondo: full width de pantalla */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={img.Imgs.headerLogoBlackV6}
        alt="logo latamly header"
      />
      {/* Contenedor centrado con textos y botones encima de la imagen */}
      <div className="relative mx-auto max-w-5xl h-full">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 p-4">
          <h1 className="text-lg text-black font-bold">
            Satisfaction survey {currentYear}
          </h1>
          <h1 className="text-lg text-black">Latamly Group</h1>
        </div>
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 p-4">
          <div>
            <h1 className="text-xl text-white font-light italic">Language</h1>
          </div>
          <div className="flex justify-center items-center gap-2 pt-2">
            <div className="w-9 border-solid border-2 border-white rounded-lg text-center">
              <Link href={"/partner-manufacturers"} className="text-white">EN</Link>
            </div>
            <div className="w-9 bg-white rounded-lg text-center">
              <Link href={"/partner-manufacturers-es"} className="text-[#FF0000] text-lg">ES</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
