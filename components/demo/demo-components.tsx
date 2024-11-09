import Modal from "@mui/material/Modal";
import { useState } from "react";

export default function DemoComponent({
  children,
  value,
  setter,
  label,
}: {
  children: React.ReactNode;
  value: string;
  setter: (v: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/*<div className="bg-red-200">*/}
      <div onClick={handleOpen}>{children}</div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-48 h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 text-center border-2 border-black rounded-xl flex flex-col items-center justify-center">
          <h3 className="text-lg p-1">{label}</h3>
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
