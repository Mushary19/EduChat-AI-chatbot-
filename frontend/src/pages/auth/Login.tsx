import SmartToyIcon from "@mui/icons-material/SmartToy";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../services/auth/mutations";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mutate: login, isPending, isSuccess } = useLogin();

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
  });

  const onSubmit = (data: any) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      reset();
    }
  }, [isSuccess]);

  const chatbotMessage = "Welcome back! Ready to continue learning?";

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
        {/* Header with logo and title */}
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
            Welcome to EduChat
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Your AI-powered learning companion
          </Typography>
        </Box>

        <CardContent sx={{ p: 4, pt: 0 }}>
          {/* Chatbot Message Bubble */}
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              p: 2,
              borderRadius: "18px 18px 18px 4px",
              mb: 3,
              position: "relative",
              maxWidth: "80%",
              animation: "fadeIn 0.5s ease-out",
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(10px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Typography>{chatbotMessage}</Typography>
            <BubbleChartIcon
              sx={{
                position: "absolute",
                right: -10,
                bottom: -10,
                fontSize: 24,
                color: theme.palette.primary.main,
              }}
            />
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
              {isPending ? "Connecting..." : "Start Chatting"}
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
            New to EduChat?{" "}
            <Box
              component="span"
              onClick={() => navigate("register")}
              sx={{
                color: theme.palette.primary.main,
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Create account
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;