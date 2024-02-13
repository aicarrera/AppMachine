import { gql } from "apollo-server-express";

export default gql`
    
    interface IUIElement {
        idElement:  String!
        label: String!
        type: String!
        serviceInformation: [Information]
    }
    type Label implements IUIElement{
        idElement:  String!
        label: String!
        type: String!
        serviceInformation: [Information]
    }
    interface IUIComplexElement implements IUIElement{
        idElement:  String!
        label: String!
        type: String!
        options: [Option]
        isSubserviceHolder: Boolean
        serviceInformation: [Information]   
        groupRecommended: Boolean 
        # Fields specific to complex elements like ComboBox
    }
    type CheckboxDropdownList implements IUIElement & IUIComplexElement  {
        idElement: String!
        label: String!
        type: String!
        isSubserviceHolder: Boolean
        options: [Option]
        serviceInformation: [Information]
        groupRecommended: Boolean 
        selectedOptions: [Option]
       

        }
    type DropdownList implements IUIElement & IUIComplexElement{
        idElement: String!
        label: String!
        type: String!
        options: [Option]
        isSubserviceHolder: Boolean
        serviceInformation: [Information]
        groupRecommended: Boolean 
        selectedOption: Option

    }
    type Option {
        label:String!
        value: String!
        serviceInformation: [Information]
    }
    type Information{
        property:String
        value:String
    }

    interface IUIContainer implements IUIElement{
        idElement:  String!
        label: String!
        type: String!
        serviceInformation: [Information]
        #Fields specific to Container
        childComponents: [IUIElement]!
    }
    
    


    interface ICard{
    data: ICardData
    }

    type Eservice{  
    name: String!
    subservices: [Esubservice]!
    template: [UITemplate]! 
    }
    type Esubservice{  
    name: String!
    template: [UITemplate]
    }

    type UITemplate{
      idUserInterface: String!  
      root: IUIContainer
      sections: [UITemplateSection]!
    }
    type UITemplateSection{
        idSection: String!
        isSubserviceContainer: Boolean
        rootSection: IUIContainer
        uiElements: [IUIElement]!
    }
    type Stack implements IUIElement & IUIContainer{
        idElement: String!
        label: String!
        type: String!
        childComponents: [IUIElement]!
        orientation: String!
        serviceInformation:[Information]
    }
    interface ICardData {    
        title: String!

    }
    type BasicCardData implements ICardData{ 
        title: String!
        thumbnailUrl: String!
        }


   type BasicCard implements IUIElement & ICard{
       idElement: String!
       label: String!
       type: String!    
       direction: String!  
       data: BasicCardData
       serviceInformation:[Information]
    }
    type Query { 
        recommendedUI(idUserInterface:String, recommendedServices:String): UITemplate!
       
    }
    
    `