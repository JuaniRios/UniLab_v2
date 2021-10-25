import re


def url_to_pk(url):
    pk_match = re.search(r'/(\d+)(/|.json|.json/)$', url)
    return pk_match[1]


def skills_categorize(skill_list):
    output = {}
    for item in skill_list:
        category = item['category'].capitalize()
        skill = item['skill'].lower()
        output.setdefault(category, []).append(skill)
    return output


def without_nones(_dict):
    """removes keys that have none values from a dict"""
    result = {k: v for k, v in _dict.items() if v is not None}
    return result