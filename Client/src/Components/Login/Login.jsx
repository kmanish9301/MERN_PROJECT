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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LoaderComponent } from "../../CommonComponents";
import { loginAction, loginReset } from "../../store/actions/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginDetails, loading, success } = useSelector((state) => state.auth);

  const schema = yup
    .object({
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

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleRedirectRegister = () => {
    navigate("/register");
  };
  const handleSignIn = (data) => {
    const payload = {
      email: data?.email,
      password: data?.password,
    };
    dispatch(loginAction(payload));
  };

  useEffect(() => {
    dispatch(loginReset());
  }, []);

  useEffect(() => {
    if (success === true) {
      navigate("/dashboard");
    }
  }, [success]);

  useEffect(() => {
    if (loginDetails && loginDetails.data) {
      localStorage.setItem("accessToken", loginDetails.data.accessToken);
      localStorage.setItem("refreshToken", loginDetails.data.refreshToken);
      localStorage.setItem("role", loginDetails.data.userData.role);
      localStorage.setItem("email", loginDetails.data.userData.email);
      localStorage.setItem("userName", loginDetails.data.userData.userName);
    }
  }, [loginDetails]);

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
            Sign In
          </Typography>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleSignIn)}
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
                Sign In
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
                  Don't have an acocunt?
                </Typography>
                <Link
                  onClick={handleRedirectRegister}
                  sx={{ cursor: "pointer" }}
                >
                  Sign Up
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

export default Login;
