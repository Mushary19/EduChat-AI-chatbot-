import { Box, useMediaQuery, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import type { RootState } from "../app/store"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useAuthCheck } from "../lib/hooks/useAuthCheck"
import Login from "../pages/auth/Login"

const MainLayout = () => {
  useAuthCheck()
  const theme = useTheme()
  const belowMd = useMediaQuery(theme.breakpoints.down("md"))
  const belowLg = useMediaQuery(theme.breakpoints.down("lg"))
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  return isAuthenticated ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating bubbles for entire layout
      <FloatingBubbles 
        count={12} 
        baseSize={40} 
        color="rgba(60, 80, 180, 0.25)" 
      /> */}

      {/* Fixed Navbar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          width: "100%",
        }}
      >
        <Navbar />
      </Box>

      {/* Main content area */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
          pt: 0,
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: belowLg ? "236px" : "336px",
            position: "relative",
            overflow: "hidden",
            borderRight: "1px solid rgba(0, 0, 0, 0.08)",
            background: "rgba(245, 247, 255, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 1,
            display: belowMd ? "None" : "",
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Sidebar />
          </Box>
        </Box>

        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  ) : (
    <Login />
  )
}

export default MainLayout
