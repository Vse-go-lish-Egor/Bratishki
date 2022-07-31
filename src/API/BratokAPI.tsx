import axios from "axios";
import React from "react";

export interface Bratok{
  name: string;
  shampoo: boolean;
  perhot: boolean;
  kojak: boolean;
  id?: string;
  dateTime?: Date
}

  interface BratokRes {
    shampoo: boolean;
    perhot: boolean;
    kojak:boolean
    name:string;
    dateTime: Date;
    _id: string;
  }

 export class BratokApi {
    private baseUrl: string;
    private domain: string;
    private rootDomain: string;
  
    constructor(baseUrl = "https://crudcrud.com/api/8495160a40484996b690340d9ad7e9f6", domain = "bratki") {
      this.baseUrl = baseUrl;
      this.domain = domain;
      this.rootDomain = `${this.baseUrl}/${this.domain}`;
    }
    
    async getBratkov(): Promise<Bratok[]> {
        const response = await axios.get(this.rootDomain);
        const data: BratokRes[] =  await response.data;
        const bratki: Bratok[] = data.map(bratok=>({...bratok, id: bratok._id})) 
        return bratki;
       
    } 
      
   async addBratka(bratok: Bratok) {
    const response = await axios.post(this.rootDomain,{
      body: bratok    
    });
    return response.status === 200;
   }
    
  async resignationOfBratok(id:string){
    const response = await axios.delete(`${this.rootDomain}/${id}`)
    return response.status===200;
    
  }
    
    // async filterByCool() {
      // const bratki = await this.getBratkof();
      // const coolBratki = bratki.map((bratok) => {
        // if (
          // bratok.perhot == false &&
          // bratok.kojak == true &&
          // bratok.shampunJumaisynba == true
        // ) {
          // bratok = { ...bratok, coolBratok };
        // }
        // return bratok;
      // });
      // return coolBratki;
    // }
  }
  