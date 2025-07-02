import Drawer from "@mui/material/Drawer"
import * as React from "react"

interface Props {
  open: boolean
  onClose: VoidFunction
  content: React.ReactNode
}

export default function SidebarDrawer({ open, onClose, content }: Props) {
  return (
    <div className="w-[400px]">
      <React.Fragment>
        <Drawer open={open} onClose={onClose}>
          {content}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
