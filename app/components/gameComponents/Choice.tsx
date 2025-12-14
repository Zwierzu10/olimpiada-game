import { useState } from "react";
import Swords from "./Swords";
import InputAi from "./InputAi";



export default function Choice() {


  const [etap, setEtap] = useState(1);

    const nextEtap = () => {
    setEtap(prev => prev + 1);
  };

  switch(etap){

    case 1:
      return (
        <Swords onNext={nextEtap} />
      );

  case 2:
    return(
      <InputAi/>
    );


  }

 
}
