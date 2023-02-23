import { Button, Flex, Heading, Spinner, VStack } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import router from 'next/router';
import { useState } from 'react';
import * as constants from "../config/constants";
function getRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const RegisterUsr = () =>{ 
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    id: '',
    name: '',
    role: ''
  };

  const handleSubmit = async (values) => {
    console.log("submit")
    try {
      values.id=getRandomString();
      console.log(values)
      const res = await fetch(constants._API_URL + 'register' , {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"       
        },
        body: JSON.stringify(values)
      });
      await res.json();
      router.push({
        pathname: "/",
       
      });
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values) => {
 
    const errors = {name:"",role:""};

    if (!values.name) {
      errors.name = 'Username is required';
    }

    if (!values.role) {
      errors.role = 'Role is required';
    }

    return errors;
  };

  return (
    <VStack w="70%" h="min-content" p={10} alignItems="center"  spacing={'24px'} borderWidth="1px" borderColor="gray.300" borderRadius="md">
    <Heading size={"sm"}>Register</Heading>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
    {({values, errors, touched, isValidating, isSubmitting, submitForm}) => (
      
      <Form>
        <label htmlFor="username">Username:</label>
        <Field type="text" id="name" name="name" placeholder="Enter your username" />
        <ErrorMessage name="name" />

        <label>Role:</label>
        <Field as="select" id="role" name="role" placeholder='Select role'>
          <option value="supervisor">supervisor</option>
          <option  value="administrative">administrative</option>
          <option  value="doctoral student">doctoral student</option>
          <option value="coordinator">coordinator</option>
          <option  value="associated teacher">associated teacher</option>
        </Field>
        <ErrorMessage name="role" />
        <Button colorScheme='teal' size='sm' onClick={e=>handleSubmit(values)}>Register</Button>   
        {isLoading && (
        <Spinner
          size="xl"
          position="relative"
          top={0}
          left={0}
          bottom={0}
          right={0}
          zIndex={1}
        />
      )}
      </Form>
       )}
    </Formik>
    </VStack>
  );
}
export default RegisterUsr