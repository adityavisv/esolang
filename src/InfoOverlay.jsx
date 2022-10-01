// Dialog.js
import "./infooverlay.css";
import React, { cloneElement, useState } from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from "@floating-ui/react-dom-interactions";


const InfoOverlay = ({ render, open: passedOpen = false, children }) => {
  const [open, setOpen] = useState(passedOpen);
  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);
  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <FloatingPortal>
        {open && (
          <FloatingOverlay
            lockScroll
            style={{
              display: "grid",
              placeItems: "center",
              background: "rgba(25, 25, 25, 0.8)",
            }}
          >
            <FloatingFocusManager context={context}>
              <div
                {...getFloatingProps({
                  ref: floating,
                  className: "Dialog",
                  "aria-labelledby": labelId,
                  "aria-describedby": descriptionId,
                })}
              >
                {render({
                  close: () => setOpen(false),
                  labelId,
                  descriptionId,
                })}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};
export default InfoOverlay;