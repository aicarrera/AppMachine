import Options from "../components/Options";


const GeneralOptions = (props) => {
  const options = [
    {
      name: 'Si, gracias!',
      handler: props.actionProvider.handleYes,
      id: 1
    },
    {
      name: "No, muestrame opciones",
      handler: props.actionProvider.handleNo,
      id: 2
    },

  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;