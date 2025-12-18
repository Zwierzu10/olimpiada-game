import { useState } from "react";
import Swords from "./Swords";
import InputAi from "./InputAi";
import Options from "./Options";
import Writing from "./Writing";
import Review from "./Review";

export default function Choice() {


  const [etap, setEtap] = useState(1);
  const [userPrzedmiot, setUserPrzedmiot] = useState("");
  const [userTemat, setUserTemat] = useState("");
  const [userIloscPytan, setUserIloscPytan] = useState(1);
  const [userTrudnosc, setUserTrudnosc] = useState("");
  const [pytanie, setPytanie] = useState("");
  const [starePytania, setStarePytania] = useState<string[]>([]);
  const [odpowiedzi, setOdpowiedzi] = useState<string[]>([]);

    const nextEtap = async(a:string) => {
      if(a === 'generuj'){
        const nowePytania = [...starePytania, pytanie];
        setStarePytania(nowePytania);
        await generateQuestion(nowePytania);
        setEtap(prev => prev + 1);
      }else if(a === 'generujBez67'){
        if(starePytania.length >= userIloscPytan){
          setEtap(prev => prev + 1);
          return;
        }
        const nowePytania = [...starePytania, pytanie];
        setStarePytania(nowePytania);
        await generateQuestion(nowePytania);
        
      }else{
        const nowePytania = [...starePytania, pytanie];
        setStarePytania(nowePytania);
        setEtap(prev => prev + 1);
      }
    
    };

  const generateQuestion = async (poprzednie:string[]) => {
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
          poprzedniePytania: starePytania,
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
        <Writing userIloscPytan={userIloscPytan} pytanie={pytanie} odpowiedzi={odpowiedzi} setOdpowiedzi={setOdpowiedzi}  onNext={nextEtap} />
      );
    case 5:
      return(
        <Review starePytania={starePytania} odpowiedzi={odpowiedzi} />
      );
  }

 
}
