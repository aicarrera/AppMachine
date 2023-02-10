export interface ContextFilter{
    name:string
    value:string
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