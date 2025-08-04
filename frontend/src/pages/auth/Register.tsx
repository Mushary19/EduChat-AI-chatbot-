import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { IRegisterBody } from "../../lib/types/auth/register"
import { useRegister } from "../../services/auth/mutations"

const Register = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"))
  const { mutate: register, isPending, isSuccess } = useRegister()

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
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating bubbles background */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            animation: `float ${15 + i * 2}s linear infinite`,
            animationDelay: `${i * 2}s`,
            width: theme.spacing(i * 2 + 5),
            height: theme.spacing(i * 2 + 5),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            "@keyframes float": {
              "0%": {
                transform: "translateY(0) translateX(0)",
                opacity: 1,
              },
              "100%": {
                transform: "translateY(-100vh) translateX(100px)",
                opacity: 0,
              },
            },
          }}
        />
      ))}

      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
          boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)",
          overflow: "visible",
          position: "relative",
          backgroundColor: "background.paper",
        }}
      >
        {/* Header with icon and title */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 4,
            px: 4,
          }}
        >
          <Box
            component="img"
            src="/assets/educhat-logo.svg"
            alt="EduChat Logo"
            sx={{
              width: 120,
              height: "auto",
              mb: 2,
            }}
          />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Join EduChat
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Create your account to start learning
          </Typography>
        </Box>

        <CardContent sx={{ p: 4, pt: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box
              sx={{
                display: "flex",
                flexDirection: isBelowMd ? "column" : "row",
                gap: isBelowMd ? 0 : 2,
              }}
            >
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#ddd",
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                          boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: theme.palette.primary.main,
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#ddd",
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                          boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                )}
              />
            </Box>

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(102, 126, 234, 0.4)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
                "&.Mui-disabled": {
                  background: "#e0e0e0",
                },
              }}
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{
              mt: 3,
              textAlign: "center",
              color: theme.palette.text.secondary,
            }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate("/auth/login/")}
              sx={{
                color: theme.palette.primary.main,
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign in
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Register
