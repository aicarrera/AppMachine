import Options from "../components/Options";


const EndInteraction = (props) => {
  const options = [
    {
      name: 'Pagar y terminar',
      handler: props.actionProvider.handleFinish,
      id: 1
    },
    
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default EndInteraction;