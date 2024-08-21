import { img } from "@/config/img";

export const HeaderCommercialPartners = () => {

  const currentYear = new Date().getFullYear();

  return (
    <header className="relative bg-white">
      <div className="relative flex items-center justify-center h-auto max-w-full">
        <img className="h-auto max-w-full" src={img.Imgs.headerLogoBlack} alt="logo latamly header" />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 text-black">
          <h1 className="text-lg text-white font-bold">Encuesta de satisfacción {currentYear}</h1>
          <h1 className="text-lg text-white">Latamly Group</h1>
        </div>
      </div>
    </header>
  );
};
