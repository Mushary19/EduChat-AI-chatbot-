import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import SettingsIcon from "@mui/icons-material/Settings"
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { MessageCirclePlus } from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutSuccess } from "../features/user/userSlice"
import Sidebar from "./Sidebar"
import SidebarDrawer from "./SidebarDrawer"

const Navbar = () => {
  const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false)

  const toggleOpenSidebarDrawer = () => setOpenSidebarDrawer((prev) => !prev)

  const theme = useTheme()
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log(isBelowMd)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    dispatch(logoutSuccess())
    navigate("/auth/login/")
  }

  return (
    <>
      {isBelowMd ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
            py: 1.5,
            bgcolor: "background.paper",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1100,
            position: "relative",
          }}
        >
          {/* Left - Menu Icon */}
          <IconButton
            onClick={() => setOpenSidebarDrawer(true)}
            sx={{
              color: "text.primary",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <MenuIcon className="text-gray-500" />
          </IconButton>

          {/* Center - Session Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            EduChat
          </Typography>

          {/* Right - Add Session Icon */}
          <IconButton
            onClick={() => console.log("Add new session")}
            sx={{
              color: "primary.main",
            }}
          >
            <MessageCirclePlus />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1.5,
                  typography: "body2",
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile")
                handleMenuClose()
              }}
            >
              <AccountCircleIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/settings")
                handleMenuClose()
              }}
            >
              <SettingsIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2,
            bgcolor: "background.paper",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1100,
            position: "relative",
          }}
        >
          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={() => navigate("/", { replace: true })}
          >
            <Avatar
              src="/assets/educhat-logo.svg"
              alt="EduChat Logo"
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              EduChat
            </Typography>
          </Box>

          {/* Menu Button */}
          <Box>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1.5,
                    typography: "body2",
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/profile")
                  handleMenuClose()
                }}
              >
                <AccountCircleIcon sx={{ mr: 1.5, fontSize: 20 }} />
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/settings")
                  handleMenuClose()
                }}
              >
                <SettingsIcon sx={{ mr: 1.5, fontSize: 20 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}

      <div>
        <SidebarDrawer
          open={openSidebarDrawer}
          onClose={toggleOpenSidebarDrawer}
          content={<Sidebar />}
        />
      </div>
    </>
  )
}

export default Navbar
