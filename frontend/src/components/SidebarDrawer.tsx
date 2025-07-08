import { Box } from "@mui/material"
import Drawer from "@mui/material/Drawer"
import * as React from "react"

interface Props {
  open: boolean
  onClose: VoidFunction
  content: React.ReactNode
}

export default function SidebarDrawer({ open, onClose, content }: Props) {
  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={onClose}>
      {content}
    </Box>
  )

  return (
    <div>
      <React.Fragment>
        <Drawer open={open} onClose={onClose}>
          {DrawerList}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
