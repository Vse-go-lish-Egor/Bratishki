import { useMutation, useQuery } from "@tanstack/react-query";
import { ExitStatus } from "typescript";
import  {Bratok,BratokApi} from "../API/BratokAPI";

 const API = new BratokApi();

export const useBratokAdding = () =>{ 
    return useMutation<boolean, Error, Bratok>((bratok)=>API.addBratka(bratok),{
    onSuccess: (result)=>{
        console.log(result);
    }})
    
}

export const useBratokGeting =()=> {
   return useQuery< Bratok[], Error>(['getQuery'], ()=>API.getBratkov())
}

export const useBratokDeleting = (id:string) =>{
return useQuery<boolean, Error>(['deleteQuery', id], ()=>API.resignationOfBratok(id));
}





