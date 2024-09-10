import { yupResolver } from "@hookform/resolvers/yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LoaderComponent } from "../../CommonComponents";
import { registerAction } from "../../store/actions/actions";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      userImage: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSignUp = (data) => {
    const formData = new FormData();
    formData.append("user_name", data.user_name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (selectedFile) {
      formData.append("userImage", selectedFile);
    }
    dispatch(registerAction(formData));
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
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <CloudUploadIcon
                    sx={{
                      padding: "0.3rem",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      fontSize: "1.2rem",
                      color: "grey",
                      cursor: "pointer",
                      boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={() => fileInputRef.current.click()}
                  />
                }
              >
                <Avatar
                  alt="User Image"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : "/static/images/avatar/2.jpg"
                  }
                  sx={{ width: 70, height: 70 }}
                />
              </Badge>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
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
