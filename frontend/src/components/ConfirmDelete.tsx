import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import { styled } from "@mui/material/styles"
import { Trash2 } from "lucide-react"

interface ConfirmDeleteModalProps {
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

export default function ConfirmDelete({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="confirm-delete-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: 3, fontWeight: 600 }}
        id="confirm-delete-dialog-title"
      >
        🗑️ {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 16,
          top: 16,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <div className="flex flex-col items-center justify-center gap-6 min-w-[320px] md:min-w-[400px] min-h-[200px]">
          <div className="p-4 bg-red-100 rounded-full">
            <Trash2 size={48} className="text-red-600" />
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
          sx={{
            backgroundColor: "#ef4444",
            "&:hover": { backgroundColor: "#dc2626" },
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}
