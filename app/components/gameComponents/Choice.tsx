import { useEffect, useState } from "react";
import Swords from "./Swords";
import InputAi from "./InputAi";
import Options from "./Options";
import Writing from "./Writing";
import Review from "./Review";
import Score from "./Score";

import { useRouter } from "next/navigation";

export default function Choice() {



  const [etap, setEtap] = useState<number>(1);
  const [userPrzedmiot, setUserPrzedmiot] = useState("");
  const [userTemat, setUserTemat] = useState("");
  const [userIloscPytan, setUserIloscPytan] = useState(1);
  const [userTrudnosc, setUserTrudnosc] = useState("");
  const [pytanie, setPytanie] = useState("");
  const [starePytania, setStarePytania] = useState<string[]>([]);
  const [odpowiedzi, setOdpowiedzi] = useState<string[]>([]);
  const [wyniki, setWyniki] = useState<number[]>([]);
  const [typBroni, setTypBroni] = useState("");
  const [nazwaBroni, setNazwaBroni] = useState("");
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();


    const nextEtap = async(a:string) => {
      if(a === 'generuj'){
        const nowePytania = [...starePytania, pytanie];
        setStarePytania(nowePytania);
        await generateQuestion(nowePytania);
        setEtap(prev => prev + 1);
      }else if(a === 'generujBez67'){
         const nowePytania = [...starePytania, pytanie];
        setStarePytania(nowePytania);
        if(starePytania.length >= userIloscPytan){
          setEtap(prev => prev + 1);
          return;
        }
       
        await generateQuestion(nowePytania);
        
      }else{
        setEtap(prev => prev + 1);
      }
    
    };

  const generateQuestion = async (poprzednie:string[]) => {
    try {
      setLoading(true);
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
          poprzedniePytania: poprzednie,
        }),
      });
      if (!response.ok){
        throw new Error('Blad API');
      }

      setTypBroni(userPrzedmiot);
      const data = await response.json();
      setPytanie(data.question);

      await new Promise(res => setTimeout(res, 1000));
  }catch(error){
    alert('Wystapil blad podczas generowania pytania. Sprobuj ponownie.');
  }finally{
    setLoading(false);
  }
};

  const comeBackToMenu = () => {
      setEtap(1);
      setUserPrzedmiot("");
      setUserTemat("");
      setUserIloscPytan(1);
      setUserTrudnosc("");
      setPytanie("");
      setStarePytania([]);
      setOdpowiedzi([]);
      setWyniki([]);
      setTypBroni("");
      setNazwaBroni("");
      setLoading(false);

      router.push("/");
    }

  switch(etap){

    case 1:
      return (
        <Swords onNext={nextEtap} setUserPrzedmiot={setUserPrzedmiot} setTypBroni={setTypBroni} />
      );

  case 2:
    return(
      <InputAi userTemat={userTemat} setUserTemat={setUserTemat} onNext={nextEtap} userPrzedmiot={userPrzedmiot} setEtap={setEtap} />
    );
    case 3:
      return(
      <Options userIloscPytan={userIloscPytan} setUserIloscPytan={setUserIloscPytan} userTrudnosc={userTrudnosc} setUserTrudnosc={setUserTrudnosc} 
      onNext={nextEtap} loading={loading} setLoading={setLoading} />
      );

    case 4:
      return(
        <Writing userIloscPytan={userIloscPytan} pytanie={pytanie} odpowiedzi={odpowiedzi} setOdpowiedzi={setOdpowiedzi}  onNext={nextEtap} loading={loading} />
      );
    case 5:
      return(
        <Review starePytania={starePytania} odpowiedzi={odpowiedzi} onNext={nextEtap} userTrudnosc={userTrudnosc} wyniki={wyniki} setWyniki={setWyniki}
         typBroni={typBroni} setNazwaBroni={setNazwaBroni} />
      );
    case 6:
      return(
        <Score wyniki={wyniki} typBroni={typBroni} nazwaBroni={nazwaBroni} setNazwaBroni={setNazwaBroni} setTypBroni={setTypBroni} userTrudnosc={userTrudnosc} 
        comeBackToMenu={comeBackToMenu} />
      );
      
  }

 
}
