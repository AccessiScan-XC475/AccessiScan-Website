import Modal from "@mui/material/Modal";
import { useState } from "react";

export default function DemoComponent({
  children,
  value,
  setter,
}: {
  children: React.ReactNode;
  value: string;
  setter: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/*<div className="bg-red-200">*/}
      <div onClick={handleOpen}>{children}</div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <input
            type="color"
            value={value}
            onChange={(e) => setter(e.target.value)}
          />
        </div>
      </Modal>
      {/*</div>*/}
    </>
  );
}
