import { configLang } from "@/utils/lang"

type I18nConfigProps = {
  lang: string
}

const I18nConfig: React.FC<I18nConfigProps> = ({ lang }) => {
  configLang(lang)

  return null
}

export default I18nConfig
