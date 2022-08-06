import { useMutation, useQuery } from "@tanstack/react-query";
import  {Bratok,BratokApi} from "../API/BratokAPI";

 const API = new BratokApi();

export const useBratokAdding = ({onSuccess}: {onSuccess: (result: boolean) => void}) =>{ 
    return useMutation<boolean, Error, Bratok>((bratok)=>API.addBratka(bratok),{
    onSuccess: (result)=>{
        onSuccess(result);
        console.log(result)
    }})
    
}

export const useBratokGetting =()=> {
   return useQuery< Bratok[], Error>(['getQuery'], ()=>API.getBratkov())
}

export const useBratokDeleting = ({onSuccess}: {onSuccess: (result: boolean) => void}) =>{
return useMutation<boolean, Error, string>((id)=>API.resignationOfBratok(id), {onSuccess});
}





