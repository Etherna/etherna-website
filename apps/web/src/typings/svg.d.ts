declare module "*.svg" {
  const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  const SvgUrl: string
  export default SvgUrl
  export {
    ReactComponent
  }
}

