import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import localizedFormat from "dayjs/plugin/localizedFormat"
import "dayjs/locale/en"
import "dayjs/locale/it"

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export default dayjs
