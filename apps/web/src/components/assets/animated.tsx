export function Spinner(props: SvgIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" {...props}>
      <g fill="none" fillRule="evenodd" strokeWidth="8">
        <circle strokeOpacity=".3" stroke="#BABABA" cx="40" cy="40" r="36" />
        <path
          d="M76 40C76 20.118 59.882 4 40 4"
          id="prefix_spin__a"
          strokeOpacity=".8"
          stroke="#1CA889"
          strokeLinecap="round"
        >
          <animateTransform
            xlinkHref="#prefix_spin__a"
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur=".85s"
            begin="0s"
            repeatCount="indefinite"
            fill="freeze"
          />
        </path>
      </g>
    </svg>
  )
}

export function SpinnerLight(props: SvgIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" {...props}>
      <g fill="none" fillRule="evenodd" stroke="#fff" strokeWidth="8">
        <circle strokeOpacity=".3" cx="40" cy="40" r="36" />
        <path
          d="M76 40C76 20.118 59.882 4 40 4"
          id="prefix__spinlight__a"
          strokeOpacity=".8"
          strokeLinecap="round"
        >
          <animateTransform
            xlinkHref="#prefix__spinlight__a"
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur=".85s"
            begin="0s"
            repeatCount="indefinite"
            fill="freeze"
          />
        </path>
      </g>
    </svg>
  )
}
