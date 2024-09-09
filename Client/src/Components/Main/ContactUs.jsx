import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoaderComponent } from "../../CommonComponents";
import { contactUsAction, contactUsReset } from "../../store/actions/actions";
import "./style.scss";

const ContactUs = () => {
  const { data, loading, success } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      user_name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const handleContactUs = (data) => {
    const payload = {
      user_name: data?.user_name,
      email: data?.email,
      subject: data?.subject,
      message: data?.message,
    };
    dispatch(contactUsAction(payload));
  };

  useEffect(() => {
    if (success) {
      dispatch(contactUsReset());
      reset();
    }
  }, [success]);

  return (
    <>
      {loading && <LoaderComponent />}
      <Grid container spacing={0} mt={10}>
        <Grid
          item
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="initial">
            Contact Us
          </Typography>
          <Typography variant="body2" color="initial">
            We will get back to you asap!
          </Typography>

          <Grid sx={{ padding: "2rem" }}>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(handleContactUs)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "2rem",
                  marginTop: "1.5rem",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
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
                </Grid>
                <TextField
                  {...methods.register("subject")}
                  label="Subject"
                  type="text"
                  size="small"
                  fullWidth
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
                <TextField
                  {...methods.register("message")}
                  label="Message"
                  type="text"
                  size="small"
                  fullWidth
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "100%" }}
                  type="submit"
                >
                  Send
                </Button>
              </form>
            </FormProvider>
          </Grid>
        </Grid>
        <Grid item sm={12} md={6} lg={6} xl={6}>
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.768928442867!2d79.01247337508474!3d21.161592180521065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4ea8217b20b43%3A0x38723f5543fc7e56!2sDabha%20Rd%2C%20Vayusena%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440023!5e0!3m2!1sen!2sin!4v1725795434286!5m2!1sen!2sin"
          ></iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactUs;
