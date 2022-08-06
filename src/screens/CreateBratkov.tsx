import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { v1 } from "uuid";
import ListBratkov  from "../components/ListBratkov";
import { Bratok } from "../API/BratokAPI";
import ClipLoader from "react-spinners/ClipLoader";
import {useBratokAdding,useBratokDeleting,useBratokGetting } from "../hooks/bratokHoocks";
 



type SortType = 'time' | 'alphabet';

export function CreateBratkov(){
    
    const bratokAdd = useBratokAdding();
    const bratokGet = useBratokGetting();
    const bratokDel = useBratokDeleting();
    const [bratok, setBratok] = useState<Bratok>({kojak: false, shampoo: false, perhot: false, name: ''})
    const [searchName, setSearchName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [sortType, setSortType] = useState<SortType>('time') 
    const [isKojak, setIsKojak] = useState<boolean>(false)
    
    
    function sortBratki(bratki: Bratok[]): Bratok[] {
      if(sortType === 'time') {
        return bratki.sort((bratok1, bratok2) => (bratok1.dateTime!.getTime() - bratok2.dateTime!.getTime()));
      } else {
        return bratki.sort((a, b) => a.name > b.name ? 1 : -1);
      }

    }
   /* useEffect(() => {
      
      setResultBratki([...sortBratki(searchName === '' ? bratki : bratki.filter(bratok=>bratok.name.includes(searchName)))])
    },[bratki, searchName, sortType])*/
    
   

    useEffect(()=>{
        if(bratok.name.length<3 && bratok.name.length !== 0){ 
        setError('Прояви уважение и дай братку более длинное имя!');
        } 
        if(bratok.name.length!==0 && bratok.name.length > 3){
            setError('');
        }
        if(bratok.name.length===0){
          setError('Прояви уважение и дай братку более длинное имя!');
        }
    })

    function addBratka(){
      if(error === ''){
        const bratokForAdding:Bratok=({...bratok!, id: undefined, dateTime: new Date(Date.now())});
        setBratok({...bratok!, name: ''});
        bratokAdd.mutate(bratokForAdding);
        
        }
        
    }
   
    return(
    <div>
       <CreatBlock> 
        <InputBratka>
            <span><input style={{color: 'white'}} value={bratok.name} onChange={(event)=>setBratok({...bratok, name: event.target.value!})} placeholder="Имя братишки"/>{error}</span>

        </InputBratka>
        <Characteristic>
            <CheckboxCharacteristic>
                <input type="checkbox" checked={bratok.perhot} onChange={()=> setBratok({...bratok, perhot: !bratok.perhot})} />
                <span>Перхоть</span>
            </CheckboxCharacteristic>
        
        
            <CheckboxCharacteristic>
                <input type="checkbox" checked={bratok.shampoo} onChange={()=> setBratok({...bratok, shampoo: !bratok.shampoo})}/>
                <span>Джумайсынба</span>
                
            </CheckboxCharacteristic>
            <CheckboxCharacteristic>
                <input type="checkbox" checked={bratok.kojak} onChange={()=> setBratok({...bratok, kojak: !bratok.kojak})}/>
                <span>Кожак</span>
            </CheckboxCharacteristic>
        </Characteristic>
        <AddBlock>
            <Add onClick={()=>{addBratka()}}>Добавить братка в семью</Add>
            {bratokAdd.isLoading && <ClipLoader size={50} color='#8cc84b'/>}
            {bratokAdd.isError && <span>Произошла ошибка</span>}
            
        </AddBlock>
        
        </CreatBlock>


        <div>
            <h5>Твои братишки:</h5> 
            <SearchLine>
                <SearchBratka style={{color: 'white'}} placeholder="Поиск братка по имени" value={searchName} onChange={(event=>setSearchName(event.target.value))}/>
                <SortButton onClick={()=>setSortType('alphabet')}>Отсортировать по погонялу</SortButton> 
                <SortButton onClick={()=>setSortType('time')}>Отсортировать по времени принятия братка в семью</SortButton>
                <SortButton onClick={()=>setIsKojak(!isKojak)}>Показать братков с кожаками</SortButton> 
            </SearchLine>
        </div>
        
        {bratokGet.isLoading && <ClipLoader size={50} color='#8cc84b'/>}
        {bratokGet.error !==null && <span>Что-то пошло не так</span>}   
         
        {bratokGet.data !== undefined &&
        <ListBratkov withKojak={isKojak} bratki={bratokGet.data!} sortType={sortType}
          onDelete={
            (id)=>{
                bratokDel.mutate(id) 
            }}/>
          }        
    </div>
    );
}






const SearchLine = styled.div`
display: flex;
flex-direction: row;
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


function addData() {
  throw new Error("Function not implemented.");
}

