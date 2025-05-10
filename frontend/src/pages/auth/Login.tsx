import SmartToyIcon from "@mui/icons-material/SmartToy"
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
import { useLogin } from "../../services/auth/mutations"

const Login = () => {
  const navigate = useNavigate()
  const { mutate: login, isPending, isSuccess } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: any) => {
    login(data)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
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
      {/* Left Image Section */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: "url(/assets/chatbot.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: 200, md: "100%" },
        }}
      />

      {/* Right Form Section */}
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
            maxWidth: 400,
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
                <SmartToyIcon sx={{ fontSize: 36, color: "#764ba2" }} />
              </Avatar>
              <Typography variant="h5" mt={2}>
                Chatbot Login
              </Typography>
              <Typography variant="body2" color="#ddd">
                Sign in to start chatting!
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default Login
