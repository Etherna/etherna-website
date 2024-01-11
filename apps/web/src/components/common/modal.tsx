import React, { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"

import { ReactComponent as CrossIcon } from "@/assets/icons/cross-icon.svg"

import { Container } from "./container"
import { cn } from "@/utils/classnames"
import { createPortal } from "@/utils/portals"

interface ModalProps {
  children: React.ReactNode
  show: boolean
  appearance?: "light" | "dark-blurred"
  compactHeader?: boolean
  onClose?: () => void
}

export function Modal({
  children,
  show,
  appearance = "dark-blurred",
  compactHeader,
  onClose,
}: ModalProps) {
  const modalContentEl = useRef<HTMLDivElement>(null)

  return createPortal(
    <Transition show={show} as={Fragment} appear>
      <Dialog
        className="fixed inset-0 z-10"
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
          <Dialog.Overlay
            className={cn("absolute inset-0", {
              "bg-black/95 supports-[backdrop-filter:blur(4px)]:bg-black/80 supports-[backdrop-filter:blur(4px)]:backdrop-blur-md":
                appearance === "dark-blurred",
              "bg-white": appearance === "light",
            })}
          />
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
          <div className="absolute inset-0 flex flex-col">
            <div
              className={cn("flex flex-shrink-0 py-4 md:py-8 xl:py-12", {
                "py-3 md:py-6 xl:py-8": compactHeader,
              })}
            >
              <Container>
                <button
                  className={cn(
                    "ml-auto flex h-10 w-10 rounded-full p-2 transition-colors duration-75 active:bg-gray-500/20",
                    {
                      "text-white": appearance === "dark-blurred",
                      "text-black": appearance === "light",
                    }
                  )}
                  aria-label="Close"
                  onClick={onClose}
                >
                  <CrossIcon className="h-full w-full" aria-hidden="true" />
                </button>
              </Container>
            </div>

            <div ref={modalContentEl} className="flex flex-grow flex-col overflow-y-auto">
              <Container className="flex-shrink-0">{children}</Container>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>,
    "#modals"
  )
}
