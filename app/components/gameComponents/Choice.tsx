import { useState } from "react";
import Swords from "./Swords";
import InputAi from "./InputAi";
import Writing from "./Writing";


export default function Choice() {


  const [etap, setEtap] = useState(1);
  const [userPrzedmiot, setUserPrzedmiot] = useState("");
  const [userTemat, setUserTemat] = useState("");
    const nextEtap = () => {
    setEtap(prev => prev + 1);
  };

  switch(etap){

    case 1:
      return (
        <Swords onNext={nextEtap} userPrzedmiot={userPrzedmiot} setUserPrzedmiot={setUserPrzedmiot} />
      );

  case 2:
    return(
      <InputAi userTemat={userTemat} setUserTemat={setUserTemat} onNext={nextEtap} />
    );
    case 3:
      return(
      <Writing/>
      );

  }

 
}
