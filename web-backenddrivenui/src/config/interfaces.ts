export interface ContextFilter{
    n:string
    v:string
  }
  
export interface RequestNextStep{
    contextList: ContextFilter[]
    elementUI:String[]
  }

export interface Information{
  parameter: string;
  value:string;
}
export interface Service{
  service: string
  information:Information[]
}
export interface Login{
  id: string;
 
  role:string;
}

