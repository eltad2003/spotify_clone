export const formatTotalTime = (time) => {
    const h = Math.floor(time / 3600000)
    const m = Math.floor((time - h * 3600000) / 60000)
    return `${h} giờ ${m} phút`

}