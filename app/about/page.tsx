"use client"
import { title } from "@/components/primitives";

let interMiami: number = 11
let fcDallas: number = 11



export default function AboutPage() {

  function jugar(equipo1: number, equipo2: number):void{

    if(equipo1 > equipo2){console.log("Gana Inter Miami")}
    if(equipo1 == equipo2){console.log("Empata")}
    if(equipo1 < equipo2){console.log("Gana FC Dallas")}

  }

  jugar(interMiami, fcDallas)


  return (
    <div>
      <h1 className={title()}>About</h1>

      







    </div>
  );
}
