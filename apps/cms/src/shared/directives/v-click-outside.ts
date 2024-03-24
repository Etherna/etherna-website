const vClickOutside = {
  mounted: function (
    element: HTMLElement & { clickOutsideEvent?: (event: MouseEvent) => void },
    binding: any,
  ) {
    element.clickOutsideEvent = function (event: MouseEvent) {
      if (
        !(
          element == event.target ||
          element.contains(event.target as HTMLElement)
        ) &&
        !(
          element &&
          (event.target == element ||
            element.contains(event.target as HTMLElement))
        )
      ) {
        setTimeout(() => {
          binding.value(event, element)
        }, 50)
      }
    }
    document.addEventListener("click", element.clickOutsideEvent)
  },
  unmounted: function (element: any) {
    document.removeEventListener("click", element.clickOutsideEvent)
  },
}

export default vClickOutside
