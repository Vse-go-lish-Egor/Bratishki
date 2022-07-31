import { useMutation, useQuery } from "@tanstack/react-query";
import { ExitStatus } from "typescript";
import  {Bratok,BratokApi} from "../API/BratokAPI";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

 class BratokHoocks{
 private API = new BratokApi();

 addData = useMutation<boolean, Error, Bratok>((bratok)=>this.API.addBratka(bratok),{
    onSuccess: (result)=>{
        console.log(result);
    }})


getQuery =()=> {
   const getData = useQuery< Bratok[], Error>(['getQuery'], ()=>this.API.getBratkov())
    if(getData.isLoading){
        return <ClipLoader color={'black'} size={50} />
    }
    if(getData.isError){
        return <span>Произошла ошибка {getData.error.message}</span>
    }
    if(getData.isSuccess){
        return getData.data
    }
};

deleteQuery = (id:string)=>useQuery<boolean, Error>(['deleteQuery', id], ()=>this.API.resignationOfBratok(id));


}


export const hoocks = new BratokHoocks();


