export default function urlToPk(url) {
    const re = /posts\/(\d+)/
    const match = url.match(re)
    return match ? match[1] : null
}