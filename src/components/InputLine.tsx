import React, {useEffect, useState} from "react";
import kojakpng from './kojak.png';
import styled from "styled-components";
import { v1 } from "uuid";

interface Bratok{
    name: string;
    shampoo: boolean;
    perhot: boolean;
    kojak: boolean;
    id: string;

}
export function InputLine(){
    const [name, setName] = useState<string>('')
    const [kojak, setKojak] = useState<boolean>(false)
    const [perhot, setPerhot] = useState<boolean>(false)
    const [shampoo, setShampoo] = useState<boolean>(false)

    const [bratki, setBratok] = useState<Bratok[]>([])
    const [searchName, setSearchName] = useState<string>('')
    const [foundName, setFoundName] = useState<Bratok[]>([])
    const [error, setError] = useState<string>('')
    const [ruleForPost, setRuleForPost] = useState<boolean>(false)
    const [errorEmpty, setErrorEmpty] = useState<string>('')
    const [ruleSort, setRuleSort] = useState<boolean>(false) 
    const [bratkiWithKojak, setBratkiWithKojak] = useState<boolean>(false)
    const [nameSort, setNameSort] = useState<Bratok[]>([])
    const [id, setId] = useState<string>('')
    
    useEffect(()=>{
        setFoundName(bratki.filter(bratok=>bratok.name.includes(searchName)));
    }, [searchName])

    useEffect(()=>{
        if(name.length<3 && name.length!==0){ 
        setError('Прояви уважение и дай братку более длинное имя!');
        setRuleForPost(false);
        } 
        if(name.length!==0&&name.length>3){
            setError('');
            setRuleForPost(true);
        }
        if(name.length===0){
            setError('');
            setRuleForPost(false);
        }
    }, [name])

    useEffect(()=>{
        if(bratki.length===0&&searchName.length!==0){
            setErrorEmpty('Сначала создай братков');
        }
        if(searchName.length===0){
            setErrorEmpty('');
        }
    },[searchName])

    

    
    function addBratka(){
        if(ruleForPost){
         setId(v1());
         setBratok([...bratki, {name, kojak, perhot, shampoo, id}]);    
         //setTimeSort([...bratki, {name, kojak, perhot, shampoo}]);
         //setNameSort([...bratki, {name, kojak, perhot, shampoo}].sort((a, b) => a.name > b.name ? 1 : -1))
         setNameSort([...nameSort, {name, kojak, perhot, shampoo, id}]);

         setName('');
        }
    }
    
    function showBratki():Bratok[]{
        if(searchName!=="") return foundName;
        if(ruleSort){
            return nameSort.sort((a, b) => a.name > b.name ? 1 : -1)}
        if(!ruleSort) return bratki;
        return []
        
    }
   
    return(
    <div>
    
       <CreatBlock> 
        <InputBratka>
            <span><input style={{color: 'white'}}value={name} onChange={(event)=>setName(event.target.value!)} placeholder="Имя братишки"/>{error}</span>

        </InputBratka>
        <Characteristic>
            <CheckboxCharacteristic>
                <input type="checkbox" checked={perhot} onChange={()=> setPerhot(!perhot)} />
                <span>Перхоть</span>
            </CheckboxCharacteristic>
        
        
            <CheckboxCharacteristic>
                <input type="checkbox" checked={shampoo} onChange={()=> setShampoo(!shampoo)}/>
                <span>Джумайсынба</span>
                
            </CheckboxCharacteristic>
            <CheckboxCharacteristic>
                <input type="checkbox" checked={kojak} onChange={()=> setKojak(!kojak)}/>
                <span>Кожак</span>
            </CheckboxCharacteristic>
        </Characteristic>
        <AddBlock>
            <Add onClick={addBratka}>Добавить братка в семью</Add>
        </AddBlock>
        </CreatBlock>


        <div>
            <h5>Твои братишки:</h5> 
            <SearchLine>
                <SearchBratka style={{color: 'white'}} placeholder="Поиск братка по имени" value={searchName} onChange={(event=>setSearchName(event.target.value))}/>
                <SortButton onClick={()=>setRuleSort(true)}>Отсортировать по погонялу</SortButton> 
                <SortButton onClick={()=>setRuleSort(false)}>Отсортировать по времени принятия братка в семью</SortButton>
                <SortButton onClick={()=>setBratkiWithKojak(!bratkiWithKojak)}>Показать братков с кожаками</SortButton> 
            </SearchLine>
        </div>
                {errorEmpty}
        
        
        <ListBratkov withKojak={bratkiWithKojak} bratki={showBratki()} onDelete={
            (bratok)=>{
                setBratok(bratki.filter(b=>bratok!=b.id));
                setNameSort(nameSort.filter(b=>bratok!=b.id));
                console.log(bratki);
                console.log(nameSort);
                
            }}/>
    </div>);
}





function ListBratkov({bratki, onDelete, withKojak}: {bratki: Bratok[]; onDelete: (bratok: string)=>void; withKojak: boolean}){ 
    if(!withKojak){ 
    return(
    <AllBratki>{bratki.map(bratok=>
        <List>
            <Container>
                <p>Имя братка: {bratok.name}</p>
                <p>Перхоть: {bratok.perhot?'О, нет, перхоть есть(!':'Ура, перхоти нет!'}</p>
                <p>Шампунь: {bratok.shampoo?'Есть!':'Нет, нужно купить!'}</p>
                <p>Кожак: {bratok.kojak?'Модный браток - залог успеха. Кожак есть!'  :'Наверное в стирке... Кожака нет'}<Kojak visibal={bratok.kojak} src={kojakpng}/></p>
            </Container>
            <Delete onClick={()=>onDelete(bratok.id)}>Отправить братка в отставку </Delete>
          
        </List>)}
        
    </AllBratki>)
    }
    if(withKojak){
        const bratkiWithKojak:Bratok[] = bratki.filter(b=>b.kojak===true);
        
        return(
            <AllBratki>{bratkiWithKojak.map(bratok=>
                <List>
                    <Container>
                        <p>Имя братка: {bratok.name}</p>
                        <p>Перхоть: {bratok.perhot?'О, нет, перхоть есть(!':'Ура, перхоти нет!'}</p>
                        <p>Шампунь: {bratok.shampoo?'Есть!':'Нет, нужно купить!'}</p>
                        <p>Кожак: {bratok.kojak?'Модный браток - залог успеха. Кожак есть!'  :'Наверное в стирке... Кожака нет'}<Kojak visibal={bratok.kojak} src={kojakpng}/></p>
                    </Container>
                    <Delete onClick={()=>onDelete(bratok.id)}>Отправить братка в отставку </Delete>
                  
                </List>)}
                
            </AllBratki>)
    }
    return <></>
}


const Kojak = styled.img<{visibal: boolean}>`

hight: ${props=>props.visibal? '50px': '0'};
width: ${props=>props.visibal? '50px': '0'};
`

const SearchLine = styled.div`
display: flex;
flex-direction: row;
`
const AllBratki = styled.div`
text-align: center;
align-items: center;
justify-content: center;

`

const List = styled.div`
display: inline-block;
text-align: center;
align-items: center;
justify-content: center;
margin:5px;
`

const CreatBlock= styled.div`
text-align: center;
margin-top: 5%;
margin-left:10%;
margin-right:10%;
padding:0;
border: 5px solid white;
border-radius: 10px;
box-shadow: 0 0 20px rgba(0, 0, 0, .1);

` 

const CheckboxCharacteristic = styled.label`
display: inline;
margin: 5%;
color: white;
`
const Characteristic = styled.div`
margin: auto;
padding: auto;
width: 50%;
text-align: center;
`

const SearchBratka = styled.input`
color: white;
`
const InputBratka = styled.div`
color: white;
margin: auto;
width: 50%;
align-items: center;
justify-content: center;

`

const SortButton = styled.button`
text-decoration: none;
  display: inline-block;
  color: white;
  padding: 5px 5px;
  margin: 10px 10px;
  border-radius: 5px;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, #B4B7BA 0%, #2E4A62 51%, #F0EDE5 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
  &:hover{
    background-position: right center;
  }
`

const Container = styled.div`

    background-image: linear-gradient(to right, #898E8C 0%, #838487 51%, #9896A4 100%);
    border-radius: 10px;

    box-shadow: 0 0 5px 2px rgba(0,0,0,.45);
    margin:auto; 
   
`
const AddBlock = styled.div`
display: flex;
align-items: center;
justify-content: center;

`
const Add = styled.button`

  text-decoration: none;
  display: inline-block;
  color: white;
  padding: 20px 30px;
  margin: 30px 20px;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, #B4B7BA 0%, #2E4A62 51%, #F0EDE5 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
  &:hover{
    background-position: right center;
  }
`
const Delete = styled.button`
box-sizing: border-box;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-color: transparent;
  border: 2px solid #e74c3c;
  border-radius: 0.6em;
  color: #e74c3c;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-self: center;
      -ms-flex-item-align: center;
          align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1.2em 2.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
-webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;

&:hover {
box-shadow: 0 0 40px 40px #e74c3c inset;
color: #fff;
  outline: 0;
  }
`





