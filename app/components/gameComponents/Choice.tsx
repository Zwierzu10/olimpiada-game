import { useState } from "react";
import Swords from "./Swords";
import InputAi from "./InputAi";
import Options from "./Options";


export default function Choice() {


  const [etap, setEtap] = useState(1);
  const [userPrzedmiot, setUserPrzedmiot] = useState("");
  const [userTemat, setUserTemat] = useState("");
  const [userIloscPytan, setUserIloscPytan] = useState(1);
  const [userTrudnosc, setUserTrudnosc] = useState("Łatwy");


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
      <Options userIloscPytan={userIloscPytan} setUserIloscPytan={setUserIloscPytan} userTrudnosc={userTrudnosc} setUserTrudnosc={setUserTrudnosc} onNext={nextEtap} />
      );

  }

 
}
