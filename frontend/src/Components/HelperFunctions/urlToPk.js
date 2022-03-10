export default function urlToPk(url) {
    if (url){
        const re = /.+\/(\d+)/
        const match = url.match(re)
        return match ? match[1] : null
    } else {
        return ""
    }
}