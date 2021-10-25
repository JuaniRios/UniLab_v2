from datetime import datetime

from django import template
from django.template.defaultfilters import stringfilter
from django.utils.translation import ugettext_lazy as _

register = template.Library()


@register.filter
@stringfilter
def time_since(value):
    pub_date = datetime.strptime(value, "%Y-%m-%d").date()
    result = (datetime.now().date() - pub_date).days

    if result == 0:
        return _('Today')

    elif result < 7:
        time_str = _('day ago') if result == 1 else _('days ago')
        return f'{result} {time_str}'

    elif result < 31:
        time_str = _('week ago') if result // 7 == 1 else _('weeks ago')
        return f'{result // 7} {time_str}'

    elif result < 365:
        time_str = _('month ago') if result // 31 == 1 else _('months ago')
        return f'{result // 31} {time_str}'

    else:
        time_str = _('year ago') if result // 365 == 1 else _('years ago')
        return f'{result // 365} {time_str}'


@register.filter
def length_dif(value, arg):
    return len(value) - len(arg)


@register.filter
def append_http(url):
    """gets a website url and appends https:// if needed"""
    if 'http://' in url or 'https://' in url:
        return url
    else:
        return 'http://' + url
