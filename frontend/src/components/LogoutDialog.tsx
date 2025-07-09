import CloseIcon from "@mui/icons-material/Close"
import { useMediaQuery } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import { styled, useTheme } from "@mui/material/styles"
import { LogOut } from "lucide-react"

interface LogoutDialogProps {
  open: boolean
  onClose: VoidFunction
  onConfirm: VoidFunction
  title?: string
  description?: string
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
    background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    backgroundColor: "#f1f5f9",
  },
  "& .MuiPaper-root": {
    borderRadius: 20,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    backdropFilter: "blur(12px)",
  },
}))

const LogoutDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Logout",
  description = "Are you sure you want to logout?",
}: LogoutDialogProps) => {
  const theme = useTheme()
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: isBelowMd ? 2 : 3, fontWeight: 600 }}
        id="logout-dialog-title"
      >
        🚪 {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: isBelowMd ? 13 : 16,
          color: theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <div className="flex flex-col items-center justify-center gap-6 min-w-[250px] md:min-w-[400px] min-h-[200px]">
          <div className="p-4 bg-yellow-100 rounded-full">
            <LogOut size={isBelowMd ? 38 : 48} className="text-yellow-600" />
          </div>

          <div className="text-center">
            <p className="text-slate-700 text-xl font-semibold mb-2">{title}</p>
            <p className="text-slate-600">{description}</p>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          size={isBelowMd ? "small" : "medium"}
          sx={{
            backgroundColor: "#1e293b",
            "&:hover": { backgroundColor: "#0f172a" },
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm()
            onClose()
          }}
          variant="contained"
          size={isBelowMd ? "small" : "medium"}
          sx={{
            backgroundColor: "#facc15",
            "&:hover": { backgroundColor: "#eab308" },
            color: "#1e293b",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default LogoutDialog
