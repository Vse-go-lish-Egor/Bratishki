import { useMutation, useQuery } from "@tanstack/react-query";
import  {Bratok,BratokApi} from "../API/BratokAPI";

 const API = new BratokApi();

export const useBratokAdding = () =>{ 
    return useMutation<boolean, Error, Bratok>((bratok)=>API.addBratka(bratok),{
    onSuccess: (result)=>{
        console.log(result);
    }})
    
}

export const useBratokGetting =()=> {
   return useQuery< Bratok[], Error>(['getQuery'], ()=>API.getBratkov())
}

export const useBratokDeleting = () =>{
return useMutation<boolean, Error, string>((id)=>API.resignationOfBratok(id));
}





