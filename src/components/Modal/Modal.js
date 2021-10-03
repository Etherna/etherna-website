import React, { Fragment, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Dialog, Transition } from "@headlessui/react"
import classNames from "classnames"
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock"

import "./modal.scss"
import CrossIcon from "!svg-react-loader!@images/icons/cross-icon.svg"

import { createPortal } from "@utils/portals"

const Modal = ({
  children,
  show,
  appearance = "dark-blurred",
  compactHeader,
  onClose
}) => {
  const modalContentEl = useRef(null)
  const modalEl = useRef(null)

  useEffect(() => {
    if (!modalEl.current) return

    if (show) {
      disableBodyScroll(modalEl.current, {
        reserveScrollBarGap: true
      })
    } else {
      enableBodyScroll(modalEl.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return createPortal(
    <Transition appear show={show} as={Fragment}>
      <Dialog
        className={classNames("modal", {
          darkBlurred: appearance === "dark-blurred",
          light: appearance === "light",
        })}
        initialFocus={modalContentEl}
        open={show}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="modalBackdrop" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="modalDialog">
            <div className={classNames("modalHeader", {
              compact: compactHeader
            })}>
              <div className="container">
                <button className="modalClose" aria-label="Close" onClick={onClose}>
                  <CrossIcon aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="modalContent" ref={modalContentEl}>
              <div className="container">
                {children}
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>,
    "#___gatsby"
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  appearance: PropTypes.oneOf("light" | "dark-blurred"),
  compactHeader: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Modal
