export default function scrollTo(element) {
    window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
    });
    return true;
}