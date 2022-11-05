import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, TextField, Box, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import { Stack } from "@mui/system";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

const schema = yup.object({
  pin: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .typeError("Pin must be a number")
    .required("Pin is required"),
  password: yup.string().required("Password is required").min(4, "Password must be more then 4 characters"),
});

function App() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

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
          {errors.pin ? <span>{errors.pin.message}</span> : null}
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => <Field label="Password" type="password" {...field} />}
          />
          {errors.password ? <span>{errors.password.message}</span> : null}
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default App;
