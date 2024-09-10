import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LoaderComponent } from "../../CommonComponents";
import { registerAction } from "../../store/actions/actions";
import { useEffect } from "react";

const schema = yup
  .object({
    user_name: yup.string().required("User Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.auth);
  const methods = useForm({
    resolver: yupResolver(schema), // Integrate yup validation schema
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  const handleSignUp = (data) => {
    const payload = {
      user_name: data?.user_name,
      email: data?.email,
      password: data?.password,
    };
    dispatch(registerAction(payload));
  };

  useEffect(() => {
    if (success) {
      handleRedirectLogin();
    }
  }, [success]);

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "1rem",
        }}
      >
        <Card
          sx={{
            width: "100%",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h1">
            Sign Up
          </Typography>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2rem",
                marginTop: "1.5rem",
              }}
            >
              <TextField
                {...methods.register("user_name")}
                label="User Name"
                type="text"
                size="small"
                fullWidth
                autoFocus
                error={!!errors.user_name}
                helperText={errors.user_name?.message}
              />
              <TextField
                {...methods.register("email")}
                label="Email"
                type="email"
                size="small"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...methods.register("password")}
                label="Password"
                type="password"
                size="small"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                variant="contained"
                size="medium"
                sx={{ width: "100%" }}
                type="submit"
              >
                Sign Up
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="body1" color="initial">
                  Already have an account?
                </Typography>
                <Link onClick={handleRedirectLogin} sx={{ cursor: "pointer" }}>
                  Sign In
                </Link>
              </Box>
            </form>
          </FormProvider>
        </Card>
      </Container>
      {loading && <LoaderComponent />}
    </>
  );
};

export default Register;
