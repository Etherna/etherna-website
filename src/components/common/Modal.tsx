import React, { Fragment, useEffect, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import classNames from "classnames"
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock"

import classes from "@styles/components/common/Modal.module.scss"
import { ReactComponent as CrossIcon } from "@images/icons/cross-icon.svg"

import Container from "./Container"
import { createPortal } from "@utils/portals"

type ModalProps = {
  show: boolean
  appearance?: "light" | "dark-blurred"
  compactHeader?: boolean
  onClose?(): void
}

const Modal: React.FC<ModalProps> = ({
  children,
  show,
  appearance = "dark-blurred",
  compactHeader,
  onClose
}) => {
  const modalContentEl = useRef<HTMLDivElement>(null)
  const modalEl = useRef<HTMLDivElement>(null)

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
        className={classNames(classes.modal, {
          [classes.darkBlurred]: appearance === "dark-blurred",
          [classes.light]: appearance === "light",
        })}
        initialFocus={modalContentEl}
        open={show}
        onClose={() => onClose?.()}
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
          <Dialog.Overlay className={classes.modalBackdrop} />
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
          <div className={classes.modalDialog}>
            <div className={classNames(classes.modalHeader, {
              compact: compactHeader
            })}>
              <Container>
                <button className={classes.modalClose} aria-label="Close" onClick={onClose}>
                  <CrossIcon aria-hidden="true" />
                </button>
              </Container>
            </div>

            <div className={classes.modalContent} ref={modalContentEl}>
              <Container>
                {children}
              </Container>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>,
    "#___gatsby"
  )
}

export default Modal
