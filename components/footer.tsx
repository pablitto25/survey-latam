import { img } from "@/config/img";
import NextLink from "next/link";

export const Footer = () => {




  return (

    <footer className="flex justify-center items-center bg-[#D2D3D4] w-full h-36">
      <div className="flex justify-between items-center w-full pl-8 pr-8">
        <div className="flex flex-col gap-8">
          <div>
          <NextLink className="flex justify-start items-center gap-1 hover:font-bold" href="https://latamly.com/politicas-de-privacidad/">Políticas de Privacidad</NextLink>
          </div>
          <div>
            © Copyright 2002 - 2024 | Latamly Group | Involve to evolve
          </div>
        </div>
        <div>
          <img className="w-48" src={img.Imgs.footerLogo} alt="logo latamly footer" />
        </div>
      </div>
    </footer>

  );
};
