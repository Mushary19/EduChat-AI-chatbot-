import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import * as React from "react"

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <section className="w-full h-full bg-gray-100 p-4">
      <div className="flex flex-col gap-1 text-gray-800">
        <div className="flex px-4 py-2 gap-3 bg-gray-300 rounded-2xl justify-between">
          <span>New chat</span>
          <button onClick={handleClick}>
            <MoreHorizIcon />
          </button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </div>
        <div className="flex px-4 py-2 gap-3 rounded-2xl">
          <span>New chat</span>
        </div>
        <div className="flex px-4 py-1 gap-3 rounded-2xl">
          <span>New chat</span>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
