import { Box, keyframes } from "@mui/material"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import type { RootState } from "../app/store"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Login from "../pages/auth/Login"

// Floating animation
const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.6; }
  50% { transform: translateY(-40vh) translateX(50px) rotate(180deg); opacity: 0.9; }
  100% { transform: translateY(-80vh) translateX(100px) rotate(360deg); opacity: 0.6; }
`

const FloatingBubbles = ({
  count = 8,
  baseSize = 30,
  color = "rgba(70, 90, 200, 0.2)",
}) => (
  <>
    {[...Array(count)].map((_, i) => (
      <Box
        key={i}
        sx={{
          position: "absolute",
          borderRadius: "50%",
          background: color,
          animation: `${floatAnimation} ${18 + i * 3}s linear infinite`,
          animationDelay: `${i * 2}s`,
          width: `${i * 10 + baseSize}px`,
          height: `${i * 10 + baseSize}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          zIndex: 0,
          filter: "blur(1px)",
        }}
      />
    ))}
  </>
)

const MainLayout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  return isAuthenticated ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        // background: "linear-gradient(135deg, #f8f9ff 0%, #eef0fa 100%)",
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
          zIndex: 1200, // Higher than bubbles
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
          pt: 0, // Remove padding top since Navbar is fixed
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: "336px",
            position: "relative",
            overflow: "hidden",
            borderRight: "1px solid rgba(0, 0, 0, 0.08)",
            background: "rgba(245, 247, 255, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 1,
          }}
        >
          {/* Additional bubbles just for sidebar */}
          {/* <FloatingBubbles 
            count={6} 
            baseSize={20} 
            color="rgba(80, 100, 220, 0.2)" 
          /> */}
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
