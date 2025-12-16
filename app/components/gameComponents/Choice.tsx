import { useState } from "react";
import Swords from "./Swords";
import InputAi from "./InputAi";
import Options from "./Options";
import Writing from "./Writing";


export default function Choice() {


  const [etap, setEtap] = useState(1);
  const [userPrzedmiot, setUserPrzedmiot] = useState("");
  const [userTemat, setUserTemat] = useState("");
  const [userIloscPytan, setUserIloscPytan] = useState(1);
  const [userTrudnosc, setUserTrudnosc] = useState("");
  const [pytanie, setPytanie] = useState("");
  const [odpowiedzi, setOdpowiedzi] = useState([]);

    const nextEtap = async(a:string) => {
      if(a === 'generuj'){
        await generateQuestion();
      }
    setEtap(prev => prev + 1);
    
    };

  const generateQuestion = async () => {
    try {
      const response = await fetch('/api/generateQuestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          przedmiot: userPrzedmiot,
          temat: userTemat,
          iloscPytan: userIloscPytan,
          trudnosc: userTrudnosc,
        }),
      });
      if (!response.ok){
        throw new Error('Blad API');
      }

      const data = await response.json();
      setPytanie(data.question);
  }catch(error){
    alert('Wystapil blad podczas generowania pytania. Sprobuj ponownie.');
  }



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

    case 4:
      return(
        <Writing userIloscPytan={userIloscPytan} pytanie={pytanie} />
      );

  }

 
}
