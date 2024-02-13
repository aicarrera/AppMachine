function serviceDummy1(){
  // Dummy data for UITemplateSection
  var c1: any[]=[];
  var c0: any[]=[];

 // var c2: any[]=[];
 // var c3: any[]=[];
 var dummyUIContainer0 = { idElement: 'container-root', type:"Stack", childComponents: c0 , orientation: "vertical" };
 var dummyUIContainer1 = { idElement: 'container-1', type:"Stack", childComponents: c1 , orientation: "vertical" };
 //var dummyUIContainer2 = { idElement: 'container-2', type:"Stack", childComponents: c2 , orientation: "horizontal" };
 //var dummyUIContainer3 = { idElement: 'container-3', type:"Stack", childComponents: c3 , orientation: "horizontal" };
 var dummyUIContainerheader = { idElement: 'container-header', type:"Stack", childComponents: c0 , orientation: "vertical" };



 var dummyUITemplateSection12 = { idSection:"monitoringMetrics", rootSection:dummyUIContainer1, uiElements: [] ,isSubserviceContainer:true};
 var dummyUITemplateSection11 = { idSection:"header", rootSection:dummyUIContainerheader, uiElements: [] , isSubserviceContainer:false};

 const dummyUITemplateSection2 = { idSection:"", rootSection: null , uiElements: ["BasicCard"] , isSubserviceContainer:false};
 const dummyUITemplateSection3 = { idSection:"", rootSection: null , uiElements: ["BasicCard"] ,isSubserviceContainer:false };
 

// Dummy data for UITemplate
 // const dummyUITemplateService = { idUserInterface: 'generalView', sections: [dummyUITemplateSection1] };
 // const dummyUITemplateSubService = { idUserInterface: 'generalView', sections: [dummyUITemplateSection2] };

  const dummyUITemplateService = { idUserInterface: 'mainUserMonitoring', root: dummyUIContainer0, sections: [dummyUITemplateSection11,dummyUITemplateSection12] };
  const dummyUITemplateSubService = { idUserInterface: 'mainUserMonitoring',root: null, sections: [dummyUITemplateSection2] };
  const dummyUITemplateSubService2 = { idUserInterface: 'mainUserMonitoring',root: null, sections: [dummyUITemplateSection3] };


  // Dummy data for Esubservice
  const dummyESubservice1 = { name: 'heart_rate_monitoring', template: [dummyUITemplateSubService] };
  const dummyESubservice2 = { name: 'steps_monitoring', template: [dummyUITemplateSubService2] };

  // Dummy data for Eservice
  const dummyEservice = { name: 'user_metrics_monitoring', subservices: [dummyESubservice1, dummyESubservice2], template: [dummyUITemplateService] };
  return dummyEservice
}
/**
 * 
 * @returns 
 */
function serviceDummy3(){

  var c0: any[]=[];
  var c1: any[]=[];
  const dummyUITemplateSection2 = { idSection:"", rootSection: null , uiElements: ["BasicCard"] , isSubserviceContainer:false};
  var dummyUIContainer0 = { idElement: 'container-root', type:"Stack", childComponents: c1 , orientation: "horizontal" };
  var dummyUIContainerheader = { idElement: 'container-header', type:"Stack", childComponents: c0 , orientation: "vertical" };



  var dummyUITemplateSectionRecommended = { idSection:"recommendedforyou", rootSection:dummyUIContainer0, uiElements: [] ,isSubserviceContainer:true};
  var dummyUITemplateSectionHeader = { idSection:"header", rootSection:dummyUIContainerheader, uiElements: [] , isSubserviceContainer:false};

  const dummyUITemplateService = { idUserInterface: 'main_recommended', root: dummyUIContainer0, sections: [dummyUITemplateSectionHeader,dummyUITemplateSectionRecommended] };
 
  const dummyUITemplateSubService = { idUserInterface: 'main_recommended',root: null, sections: [dummyUITemplateSection2] };
  

  // Dummy data for Esubservice
  const dummyESubservice1 = { name: 'capuccino', template: [dummyUITemplateSubService] };
  const dummyESubservice2 = { name: 'hazelnut_mocaccinno', template: [dummyUITemplateSubService] };

  // Dummy data for Eservice
  const dummyEservice = { name: 'beverages_preparation', subservices: [dummyESubservice1, dummyESubservice2], template: [dummyUITemplateService] };
  return dummyEservice
}
function serviceDummy2(){
  var c1: any[]=[];
  var c0: any[]=[];

  const dummyESubservice1 = { name: 'TDOMONWH2X1', template:null };
  const dummyESubservice2 = { name: 'TDOMONWH2X1Z1' ,  template: null};
  const dummyESubservice3 = { name: 'TDOMONWH1X1Z1', template: null};
  var dummyUIContainer0 = { idElement: 'container-root', type:"Stack", childComponents: c0 , orientation: "vertical" };
  var dummyUIContainer1 = { idElement: 'container-1', type:"Stack", childComponents: c1 , orientation: "horizontal" };

  var options: any[]=[];
  var label=  {
    idElement: "lblschema",
    label: "Schemas:",
    type: "Label",
    serviceInformation: []
}
  var dropdownlistSubservice={idElement: "lstSchemas",  label: "schemas",  type: "DropdownList",  options: options,  isSubserviceHolder: true,  serviceInformation: [],  groupRecommended: true, selectedOption: null}

  var dummyUITemplateSection12 = { idSection:"schemaMonitoring", rootSection:dummyUIContainer1, uiElements: [label, dropdownlistSubservice] ,isSubserviceContainer:false};

  const dummyUITemplateService = { idUserInterface: 'monitoringDashboard', root: dummyUIContainer0, sections: [dummyUITemplateSection12] };
  

  const dummyEservice = { name: 'Schema Monitoring', subservices: [dummyESubservice1, dummyESubservice2, dummyESubservice3], template: [dummyUITemplateService] };
  return dummyEservice
}
/**
   * 
   * @param style 
   */
 function recommendedUI(idUserInterface:String, recommendedServices:String) {
  
    var dummyEservice2=serviceDummy1()
    console.log(dummyEservice2,idUserInterface,recommendedServices)

    var dummyEservice1=serviceDummy2()
    //var serviceTemplate=dummyEservice1.template[0] 
    console.log(dummyEservice1,idUserInterface,recommendedServices)

    var dummyEservice=serviceDummy3()
    var serviceTemplate=dummyEservice.template[0] 
    console.log(dummyEservice,idUserInterface,recommendedServices)


    //Get section templates from service
    for (const parentSection of serviceTemplate.sections) {  
      console.log(parentSection) 
      for (const uiElement of parentSection.uiElements){
        if  ( 'isSubserviceHolder' in uiElement  && 'options' in uiElement ){
          if ((uiElement as any).isSubserviceHolder){
            for (const subservice of dummyEservice.subservices) {         
              if ((uiElement as any).options) {
                (uiElement as any).options.push({label:subservice.name.replace("_"," ").toUpperCase(), value: subservice.name});
                }     
            }
          } 
               
        }
        parentSection.rootSection.childComponents.push(uiElement)
      }

      if (!parentSection.isSubserviceContainer){
        continue;
      }
      // Iterate over subservices of dummyEservice
      for (const subservice of dummyEservice.subservices) {
          // Access the template of the subservice
          if (!subservice.template){
            continue
          }
          const subserviceTemplate = subservice.template[0]; // Assuming there's only one template for simplicity
          // Iterate over sections of the template
          if (subserviceTemplate){
          for (const childSection of (subserviceTemplate as any).sections) { 
              const newSection = { ...childSection };
              //Elements of the section
              for (const element of newSection.uiElements){
                  if (element=="BasicCard"){
                     const data= createCardData(subservice.name.replace("_"," ").toUpperCase(), subservice.name+".png")
                     const card = createBasicCard(subservice.name,data, "column")
                     //Add the element to the root of the section
                     if (newSection.rootSection  && 'childComponents' in newSection.rootSection){
                        if ((newSection.rootSection as any)?.childComponents) {
                        (newSection.rootSection as any).childComponents.push(card);
                        }
                    }
                    else{
                      parentSection.rootSection.childComponents.push(card)
                    }

                  }        
              }
            //For each section I add the elements to the root template
            if (newSection.rootSection && parentSection.isSubserviceContainer && parentSection.rootSection && 'childComponents' in parentSection.rootSection) {
              parentSection.rootSection.childComponents.push(newSection.rootSection)
            }
          } 
        }
         
        }
  
}    
    return serviceTemplate;
  }

  //******Testing model */
// Function to create a stack container
/*function createStack(idElement: String, childComponents:any, orientation:String) {
    return { idElement: idElement, childComponents: childComponents, orientation: orientation };
  }*/
  
  // Function to create an ICardData object
  function createCardData(title:String, thumbnailUrl:String) {
    return { title: title, thumbnailUrl: thumbnailUrl };
  }
  
  // Function to create a basic card
  function createBasicCard(idElement:String, data:any, direction:String) {
    return { idElement: idElement, type: 'BasicCard', data: data , direction:direction, serviceInformation:[{property:"sugar",value:"-"}]};
  }
  /*
  // Function to create a UITemplateSection
  function createUITemplateSection(container:any, containerType:String, uiElements:any) {
    return { container, containerType, uiElements };
  }
  
  // Function to create a UITemplate
  function createUITemplate(idUserInterface:String, sections:any) {
    return { idUserInterface, sections };
  }*/
  
  export default {
    ICard: {
      __resolveType(obj:any) {
        return obj.component;
      },
    },
    IUIElement: {
      __resolveType(obj:any) {
        if (obj.data){
          return "BasicCard";
        }
        else if(obj.orientation){
          return "Stack";
        }
        else if(obj.selectedOptions){
          return "CheckboxDropdownList";
        }
        else {
          return obj.type;
        }
      },
    },
    IUIComplexElement: {
      __resolveType(obj:any) {
        if(obj.selectedOptions){
          return "CheckboxDropdownList";
        }
        else{
          return "DropdownList"
        }
      }
    },
    IUIContainer: {
      __resolveType(obj:any) {
        if (obj.orientation) {
          return "Stack";
        } else{ 
          return "Container";
        }
      },
    },
    Query: {         
      recommendedUI      
      
    }
  };
  


