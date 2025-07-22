import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import { styled } from "@mui/material/styles"
import { Pause } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import SpeechRecognition from "react-speech-recognition"

interface Props {
  open: boolean
  onClose: VoidFunction
  setIsClosedMicroPhone: Dispatch<SetStateAction<boolean>>
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

export default function MicrophoneModal({
  open,
  onClose,
  setIsClosedMicroPhone,
}: Props) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="microphone-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: 3, fontWeight: 600 }}
        id="microphone-dialog-title"
      >
        🎙️ Voice Recognition
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          onClose()
          SpeechRecognition.abortListening()
        }}
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
        <div className="flex flex-col items-center justify-center gap-6 min-w-[270px] md:min-w-[500px] min-h-[230px] md:min-h-[260px]">
          <p className="text-center text-slate-700 text-xl md:text-2xl font-semibold tracking-wide animate-pulse">
            We’re listening to you...
          </p>

          {/* Waveform Visualizer Placeholder */}
          <div className="w-full max-w-xs h-16 rounded-xl bg-white/30 backdrop-blur-sm border border-slate-300 shadow-inner flex items-center justify-center">
            <span className="text-slate-500">🎵 Voice visualizer here</span>
          </div>

          {/* Animated Mic Button */}
          <button
            className="text-white bg-red-500 hover:bg-red-600 transition-all duration-200 rounded-full p-4 shadow-md
             hover:ring-2 hover:ring-offset-2 hover:ring-red-400"
            aria-label="Pause Mic"
            onClick={() => {
              onClose()
              setIsClosedMicroPhone(true)
              SpeechRecognition.stopListening()
              console.log("stopped")
            }}
          >
            <Pause size={40} className="cursor-pointer" />
          </button>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            onClose()
            SpeechRecognition.abortListening()
          }}
          variant="contained"
          sx={{
            backgroundColor: "#1e293b",
            "&:hover": { backgroundColor: "#0f172a" },
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}
