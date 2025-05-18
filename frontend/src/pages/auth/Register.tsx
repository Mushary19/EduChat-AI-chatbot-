import PersonAddIcon from "@mui/icons-material/PersonAdd"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { IRegisterBody } from "../../lib/types/auth/register"
import { useRegister } from "../../services/auth/mutations"

const Register = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  const navigate = useNavigate()
  const { mutate: register, isPending, isSuccess } = useRegister()

  const onSubmit = (data: IRegisterBody) => {
    register(data)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/login/", { replace: true })
      reset()
    }
  }, [isSuccess])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Left Side Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: "url(/assets/educhat-logo.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: 200, md: "100%" },
        }}
      />

      {/* Right Side Form */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Box textAlign="center" mb={3}>
              <Avatar
                sx={{
                  bgcolor: "#fff",
                  width: 64,
                  height: 64,
                  margin: "0 auto",
                  boxShadow: 3,
                }}
              >
                <PersonAddIcon sx={{ fontSize: 36, color: "#764ba2" }} />
              </Avatar>
              <Typography variant="h5" mt={2}>
                Create Account
              </Typography>
              <Typography variant="body2" color="#ddd">
                Sign up to get started with EduChat
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    InputLabelProps={{ style: { color: "#ddd" } }}
                    InputProps={{
                      style: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    InputLabelProps={{ style: { color: "#ddd" } }}
                    InputProps={{
                      style: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputLabelProps={{ style: { color: "#ddd" } }}
                    InputProps={{
                      style: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputLabelProps={{ style: { color: "#ddd" } }}
                    InputProps={{
                      style: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="confirm_password"
                control={control}
                rules={{
                  required: "Confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password?.message}
                    InputLabelProps={{ style: { color: "#ddd" } }}
                    InputProps={{
                      style: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                      },
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={isPending}
                sx={{
                  mt: 2,
                  bgcolor: "#fff",
                  color: "#764ba2",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default Register
