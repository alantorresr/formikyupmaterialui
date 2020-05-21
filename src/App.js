import React, {Fragment} from 'react'
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText,
  FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function App() {

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre requerido!'),
    edad: Yup.number().min(1, 'La edad tiene que ser mayor a 0').required('Edad requerida!'),
    email: Yup.string().email('Formato de email iválido').required('Email requerido!'),
    sexo: Yup.string().required('Sexo requerido!'),
    terminos: Yup.bool().oneOf([true], 'Tienes que aceptar los términos.')
  })

  const formik = useFormik({
    initialValues: {
      nombre: '',
      edad: 0,
      email: '',
      sexo: '',
      terminos: false
    },
    onSubmit: values => {
      console.log("Form data submit: ", values)
    },
    validationSchema,
    isInitialValid: false
    // validate: values => {
    //   let errors = {}
    //   if(!values.nombre){
    //     errors.nombre = 'Nombre requerido'
    //   }
    //   if(!values.edad){
    //     errors.edad = 'Edad requerida'
    //   }
    //   if(!values.email){
    //     errors.email = 'Email requerido'
    //   }
    //   return errors
    // }
  })
  // console.log("Form values: ", formik.values)
  // console.log("Form errors: ", formik.errors)
  // console.log("Form visited: ", formik.touched);
  return (
    <Fragment>
      <Container maxWidth="sm" className="contenedor">
          <Typography variant="h4">Formik + Yup + MaterialUI</Typography>

          <form onSubmit={formik.handleSubmit}>

            <TextField variant="outlined" label="Nombre" type="text"
            name="nombre" onChange={formik.handleChange} value={formik.values.nombre} onBlur={formik.handleBlur}
            error={formik.touched.nombre && formik.errors.nombre ? true : false} 
            helperText={formik.errors.nombre ? formik.errors.nombre : ''}
            fullWidth={true} className="mt-1"/>

            <TextField variant="outlined" label="Edad" type="number"
            name="edad" onChange={formik.handleChange} value={formik.values.edad} onBlur={formik.handleBlur}
            error={formik.touched.edad && formik.errors.edad ? true : false} 
            helperText={formik.errors.edad ? formik.errors.edad : ''}
            fullWidth={true} className="mt-1"/>

            <TextField variant="outlined" label="Email" type="email"
            name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? true : false} 
            helperText={formik.errors.email ? formik.errors.email : ''}
            fullWidth={true} className="mt-1"/>

            <Grid container spacing={1} className="mt-1">
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" 
                error={formik.touched.sexo && formik.errors.sexo ? true : false} >
                  <InputLabel variant="outlined">Sexo</InputLabel>
                  <Select id="hola"
                    value={formik.values.sexo} name="sexo"
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <MenuItem value="hombre">Hombre</MenuItem>
                    <MenuItem value="mujer">Mujer</MenuItem>
                    <MenuItem value="otro">Otro</MenuItem>
                  </Select>
                  <FormHelperText>{formik.errors.sexo ? formik.errors.sexo : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
              <FormControl required error={true} >
                {/* <FormLabel component="legend">Pick two</FormLabel> */}
                <FormGroup>
                  <FormControlLabel
                    control={
                    <Checkbox color="primary" type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.terminos} 
                    name="terminos" />}
                    label="Acepto los términos."
                  />
                </FormGroup>
                <FormHelperText>{formik.errors.terminos ? formik.errors.terminos : ''}</FormHelperText>
              </FormControl>
              </Grid>
            </Grid>

          <Button variant="contained" color="primary" 
          type="submit" disabled={!formik.isValid}
          fullWidth={true} className="mt-1">Enviar</Button>

          </form>

          <pre>{JSON.stringify(formik.values, null, 2)}</pre>

      </Container>
    </Fragment>
  )
}