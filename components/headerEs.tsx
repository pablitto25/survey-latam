import { img } from "@/config/img";
import Link from "next/link";

export const HeaderEs = () => {

  const currentYear = new Date().getFullYear();

  return (
    <header className="relative">
      <div className="absolute top-0 left-0 w-full h-[12rem] sm:h-[17.4rem] bg-[#FF0000]"></div>
      <div className="relative mx-auto bg-white max-w-5xl">
        <div className="relative flex items-center justify-center h-auto max-w-full">
          <img
            className="h-auto max-w-full"
            src={img.Imgs.headerLogo}
            alt="logo latamly header"
          />
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 text-black">
            <h1 className="text-lg text-white font-bold">
              Encuesta de satisfacción {currentYear}
            </h1>
            <h1 className="text-lg text-white">Latamly Group</h1>
          </div>
          <div className="absolute top-1/3 right-[-400] transform -translate-y-1/2 p-4 text-black">
            <div>
              <h1 className="text-xl text-white font-light italic">
                Language
              </h1>
            </div>
            <div className="flex justify-center items-center gap-2 pt-2">
              <div className="w-9 border-solid border-2 border-white rounded-lg text-center">
                <Link href={"/partner-manufacturers"} className="text-white">EN</Link>
              </div>
              <div className="w-9 bg-white rounded-lg text-center">
                <Link href={"/partner-manufacturers-es"} className="text-[#FF0000] text-lg ">ES </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
