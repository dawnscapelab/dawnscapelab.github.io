import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

const TIME_ZONE = 'Asia/Seoul'

export function parseDate(dateString: string): Date {
    // KST로 해석된 날짜를 UTC로 변환
    return toZonedTime(parseISO(dateString), TIME_ZONE)
}

export function formatDate(date: string): string {
    // UTC를 KST로 변환하여 포맷팅
    const kstDate = toZonedTime(date, TIME_ZONE)
    return format(kstDate, "yyyy년 MM월 dd일 a h:mm", { locale: ko })
}
