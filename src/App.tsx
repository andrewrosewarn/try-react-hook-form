import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Button, TextField, Box, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import { Stack } from "@mui/system";
interface IFormInput {
  pin: string;
  password: string;
}

const Field = forwardRef((props: TextFieldProps, ref) => (
  <TextField
    {...props}
    size="small"
    variant="filled"
    InputLabelProps={{ shrink: true }}
    InputProps={{ disableUnderline: true, ref: ref }}
  />
));

function App() {
  const { handleSubmit, control } = useForm<IFormInput>();
  const pin = useWatch({ control, name: "pin", defaultValue: "" });
  const password = useWatch({ control, name: "password", defaultValue: "" });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const submitDisabled = pin === "" || password === "";

  return (
    <Box m={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} width={500}>
          <Controller
            name="pin"
            defaultValue=""
            control={control}
            render={({ field }) => <Field label="Pin" {...field} />}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => <Field label="Password" type="password" {...field} />}
          />

          <Button type="submit" disabled={submitDisabled} variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default App;
