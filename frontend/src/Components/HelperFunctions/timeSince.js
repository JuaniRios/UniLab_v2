export default function timeSince(value){
    const pub_date = new Date(value)
    const now = new Date()
    const deltaDays = (now - pub_date) * 1.15741e-8>>0

    // TODO: Translate this
    if (deltaDays === 0){
        // return _('Today')
        return "Today"
    }

    let timeStr;

    if (deltaDays < 7) {
        if (deltaDays === 1) {
            timeStr = "day ago"
        } else {
            timeStr = "days ago"
        }
        return `${deltaDays} ${timeStr}`
    }

    if (deltaDays < 31){
        if (deltaDays/7>>0 === 1){
            timeStr = "week ago"
        } else {
            timeStr = "weeks ago"
        }
        return `${deltaDays/7>>0} ${timeStr}`
    }

    if (deltaDays < 365) {
        if (deltaDays / 31 >> 0 === 1) {
            timeStr = "month ago"
        } else {
            timeStr = "months ago"
        }
        return `${deltaDays / 31 >> 0} ${timeStr}`
    }

    if (deltaDays/365>>0 === 1) {
        timeStr = "year ago";
    } else {
        timeStr = "years ago";
    }

    return `${deltaDays/365>>0} ${timeStr}`

}
