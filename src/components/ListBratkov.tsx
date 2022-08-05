import React, {useEffect, useState} from "react";
import kojakpng from './kojak.png';
import styled from "styled-components";
import { Bratok } from "../API/BratokAPI"


export default function ListBratkov({bratki, onDelete, withKojak, sortType}: {bratki: Bratok[]; onDelete: (bratok: string)=>void; withKojak: boolean; sortType: string}){ 
  console.log(bratki); 
  if (bratki.length === 0) {
      return <span>Братков нет</span>
    }

    if(withKojak) {
      bratki = bratki.filter(b=>b.kojak===true);
    }
    function sortBratki(bratki: Bratok[]): Bratok[] {
      if(sortType === 'time') {
        return bratki.sort((bratok1, bratok2) => (bratok1.dateTime!.getTime() - bratok2.dateTime!.getTime()));
      } else {
        return bratki.sort((a, b) => a.name > b.name ? 1 : -1);
      }

    }
   

    return(
        <AllBratki>{sortBratki(bratki).map(bratok=>
            <List>
                <Container>
                    <p>Имя братка: {bratok.name}</p>
                    <p>Перхоть: {bratok.perhot?'О, нет, перхоть есть(!':'Ура, перхоти нет!'}</p>
                    <p>Шампунь: {bratok.shampoo?'Есть!':'Нет, нужно купить!'}</p>
                    <p>Кожак: {bratok.kojak?'Модный браток - залог успеха. Кожак есть!'  :'Наверное в стирке... Кожака нет'}<Kojak visibal={bratok.kojak} src={kojakpng}/></p>
                </Container>
                <Delete onClick={()=>onDelete(bratok.id!)}>Отправить братка в отставку </Delete>
              
            </List>)}
            
        </AllBratki>)
}



const Kojak = styled.img<{visibal: boolean}>`

  hight: ${props=>props.visibal? '50px': '0'};
  width: ${props=>props.visibal? '50px': '0'};
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


const Container = styled.div`

    background-image: linear-gradient(to right, #898E8C 0%, #838487 51%, #9896A4 100%);
    border-radius: 10px;

    box-shadow: 0 0 5px 2px rgba(0,0,0,.45);
    margin:auto; 
   
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
