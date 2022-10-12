import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FormElement ,Button, Spacer, Input, Grid, Checkbox } from "@nextui-org/react";
import Header from "../components/Header";
import axios from "axios";
import test from "./apitest";

type UserType = {
  rut: string
  nombre: string
  apellido: string
  correo:string
  pass: string
  roles: number[]
};

function FormularioEdit() {
    const maradona = useNavigate();

    const [state, setState] = useState<UserType>({
        nombre: "",
        apellido: "",
        pass: "",
        correo: "",
        rut: "",
        roles:[]
      });
      const fetchProducts = ()=>{
        axios.get(`http://localhost:3001/users/u/'test-1'`)
       .then(response => {
         const products = response.data
         setState(products[0])
       })  
      }

      useEffect(() => {
        fetchProducts();
      }, []);

    let oldID = state.rut;
    console.log(state, oldID);

    function handleChange(e: React.ChangeEvent<FormElement>) {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value,
        });
      }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement,  MouseEvent>) => {
      //e.preventDefault();
      axios.post('http://localhost:3001/users/'+oldID, state)
        .then(response => console.log(response.data.id));
      console.log('handleClick 👉️', state);
    }; 
         

    return (
        <Grid.Container justify="center">
            <Input width="75%" type="text" name="nombre" onChange={handleChange} value={state.nombre}/>
            <Spacer y={3} />
            <Input width="75%" placeholder="Apellido(s)" type="text" name="apellido" onChange={handleChange} value={state.apellido}/>
            <Spacer y={3} />

            <Input width="75%" placeholder="Correo" type="text" name="correo" onChange={handleChange} value={state.correo}/>
            <Spacer y={3} />
            <Input width="75%" placeholder="Contraseña" type="text" name="pass" onChange={handleChange} value={state.pass}/>
            <Spacer y={3} />

            <Input width="75%" placeholder="RUT" type="text" name="rut" onChange={handleChange} value={state.rut}/>
            <Spacer y={3} />

                <Grid.Container justify="center">
                
                <Checkbox.Group
                    label="Roles"
                    orientation="horizontal"
                    color="primary"
                    >
                    <Checkbox value="buenos-aires">Gerente</Checkbox>
                    <Checkbox value="sydney">Administrador</Checkbox>
                    <Checkbox value="london">Analista</Checkbox>
                </Checkbox.Group>
                <Spacer y={6}/>
                </Grid.Container>
                <Button onClick={handleClick}>Editar</Button>
                    <Spacer x={0.5} />
                    <Button onClick={() => {maradona("/administrador")}} color="error" >Salir</Button> 
 
        </Grid.Container>
    );
  }

export default FormularioEdit