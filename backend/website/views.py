import json

import requests
from cryptography.fernet import Fernet
from django.conf import settings as conf_settings
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.data_converters import *

api_url = conf_settings.API_URL
port = conf_settings.PORT
fernet_key = conf_settings.FERNET_KEY
UserModel = get_user_model()
fernet = Fernet(fernet_key)

long_texts = {
    1: _(
        """The European Commission support for the production of this website does not constitute an endorsement of the contents which reflects the views only of the authors, and the Commission cannot be held responsible for any use which may be made of the information contained therein."""
    ),
}


def index2(request, *args, **kwargs):
    return render(request, "frontend/index.html")


def about(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)

    variables = {
        "long_texts": long_texts,
        "user": user,
    }
    return render(request, "about.html", variables)


def comment(request, token):
    user = get_user(request.COOKIES["token"])
    content = request.POST["content"]
    post = request.POST["post_url"]
    company = request.COOKIES.get("current_company")
    data = {
        "content": content,
        "post": post,
    }
    if user["user_type_verbose"] == "Student":
        response = requests.post(
            f"http://{api_url}:{port}/api/comments/",
            headers={"Authorization": f"Bearer {token}"},
            data=data,
        )
        print("response")

    elif user["user_type_verbose"] == "Employer":
        assert company is not None, "No company specified in query"
        response = requests.post(
            f"http://{api_url}:{port}/api/comments/?company={company}",
            headers={"Authorization": f"Bearer {token}"},
            data=data,
        )
        print("response")


def community(request):
    token = validate(request)
    if token == "invalid":
        return redirect("signin")
    user = get_user(token)

    # Will be None if a students posts
    company = request.COOKIES.get("current_company")

    if request.method == "GET":
        if user["user_type_verbose"] == "Employer":
            if company is None:
                messages.error(request, "Select a company first")
                return redirect("community_company_select")
            else:
                company_request = requests.get(
                    f"http://{api_url}:{port}/api/companies/{url_to_pk(company)}",
                    headers={"Authorization": f"Bearer {token}"},
                )
                posts_request = requests.get(
                    f"http://{api_url}:{port}/api/posts/?company={company}",
                    headers={"Authorization": f"Bearer {token}"},
                )
                company_obj = company_request.json()
        elif user["user_type_verbose"] == "Student":
            company_obj = None
            posts_request = requests.get(
                f"http://{api_url}:{port}/api/posts/",
                headers={"Authorization": f"Bearer {token}"},
            )

        else:
            raise ValueError("user type neither student nor employer")

        posts = posts_request.json()["results"]

        if posts_request.status_code == 200:
            variables = {
                "long_texts": long_texts,
                "token": token,
                "posts": posts,
                "user": user,
                "company": company_obj,
            }
            return render(request, "community.html", variables)

    if request.method == "POST":
        # checking if form was submitted through a submit or an image input (image being upvote button)
        form_type = request.POST["form_type"]
        if form_type == "post":
            post(request, token)

        elif form_type == "comment":
            comment(request, token)

        elif form_type == "vote":
            vote(request, token)

        else:
            print("ERROR!!!")

        if user["user_type_verbose"] == "Employer":
            return redirect(reverse("community") + f"?company={company}")
        else:
            return redirect("community")


def community_company_select(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)
    assert (
        user["user_type_verbose"] == "Employer"
    ), "Only employers can access this page"

    if request.method == "GET":
        response = requests.get(
            f"http://{api_url}:{port}/api/companies?email={user['email']}",
            headers={"Authorization": f"Bearer {token}"},
        )
        user_companies = response.json()["results"]

        variables = {
            "long_texts": long_texts,
            "user": user,
            "user_companies": user_companies,
        }
        return render(request, "community_company_select.html", variables)

    elif request.method == "POST":
        company_url = request.POST.get("company")
        response = redirect("community")
        response.set_cookie("current_company", company_url)
        return response


def companies(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)

    if request.method == "GET":
        if "url" in request.GET:
            company_url = request.GET["url"]
            company = requests.get(
                company_url, headers={"Authorization": f"Bearer {token}"}
            ).json()
            pictures = requests.get(
                f"http://{api_url}:{port}/api/company-pictures?owner={company_url}",
                headers={"Authorization": f"Bearer {token}"},
            ).json()["results"]
            jobs = requests.get(
                f"http://{api_url}:{port}/api/jobs?owner={company_url}",
                headers={"Authorization": f"Bearer {token}"},
            ).json()["results"]
            posts = requests.get(
                f"http://{api_url}:{port}/api/posts/?company_owner={company_url}&company={company_url}",
                headers={"Authorization": f"Bearer {token}"},
            ).json()["results"]
            comments = requests.get(
                f"http://{api_url}:{port}/api/comments?company_owner={company_url}",
                headers={"Authorization": f"Bearer {token}"},
            ).json()["results"]

            variables = {
                "long_texts": long_texts,
                "user": user,
                "company": company,
                "pictures": pictures,
                "jobs": jobs,
                "posts": posts,
                "comments": comments,
            }
            return render(request, "company_profile_public.html", variables)

        else:
            response = requests.get(
                f"http://{api_url}:{port}/api/companies/?page=1",
                headers={"Authorization": f"Bearer {token}"},
            )
            discovered_list = response.json()["results"]
            variables = {
                "long_texts": long_texts,
                "user": user,
                "discovered_list": discovered_list,
            }
            return render(request, "companies.html", variables)


def get_job_applications(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)
    page = request.GET["page"]
    if "job" in request.GET:
        job = request.GET["job"]
        page = request.GET["page"]
        response = requests.get(
            f"http://{api_url}:{port}/api/applications/?job={job}&page={page}",
            headers={"Authorization": f"Bearer {token}"},
        )
        applicants = response.json()
    else:
        return None
    json_response = json.dumps(applicants["results"])
    return HttpResponse(json_response)


def get_posts(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)
    page = request.GET["page"]
    if "email" in request.GET:
        email = request.GET["email"]
        posts = requests.get(
            f"http://{api_url}:{port}/api/posts?email={email}&page={page}",
            headers={"Authorization": f"Bearer {token}"},
        ).json()
    else:
        return None
    json_response = json.dumps(posts["results"])
    return HttpResponse(json_response)


def get_user(token):
    """Returns: the user object serialized from a token"""
    try:
        validated_token = JWTAuthentication().get_validated_token(token)
        user_object = JWTAuthentication().get_user(validated_token)
        response = requests.get(
            f"http://{api_url}:{port}/api/users/{user_object.id}",
            headers={"Authorization": f"Bearer {token}"},
        )
        user_json = response.json()
    except Exception as ex:
        return None

    return user_json


def index(request):
    token = validate(request)
    if token == "invalid":
        messages.info(request, "You're not logged in.")
        return redirect("signin")
    user = get_user(token)

    jobs_response = requests.get(
        f"http://{api_url}:{port}/api/jobs/?page=1",
        headers={"Authorization": f"Bearer {token}"},
    )
    discovered_list = jobs_response.json()["results"]

    companies_response = requests.get(
        f"http://{api_url}:{port}/api/companies/?page=1",
        headers={"Authorization": f"Bearer {token}"},
    )
    top_companies = companies_response.json()["results"]
    top_companies_organized = []

    counter = 0
    row = -1
    for company in top_companies:
        if counter % 4 != 0:
            top_companies_organized[row] += [company]
        else:
            row += 1
            top_companies_organized.append([company])

        counter += 1

    variables = {
        "long_texts": long_texts,
        "user": user,
        "discovered_list": discovered_list,
        "top_companies": top_companies_organized,
    }

    return render(request, "index.html", variables)


def jobs(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)

    if request.method == "GET":
        if "url" in request.GET:
            job_response = requests.get(
                request.GET["url"], headers={"Authorization": f"Bearer {token}"}
            )
            job_data = job_response.json()

            variables = {
                "long_texts": long_texts,
                "user": user,
                "job": job_data,
            }
            return render(request, "single_job.html", variables)
        else:
            response = requests.get(
                f"http://{api_url}:{port}/api/jobs/?page=1",
                headers={"Authorization": f"Bearer {token}"},
            )
            discovered_list = response.json()["results"]
            variables = {
                "long_texts": long_texts,
                "user": user,
                "discovered_list": discovered_list,
            }
            return render(request, "jobs.html", variables)

    if request.method == "POST":
        if user["user_type_verbose"] == "Employer":
            messages.error(request, "Employer users cannot apply for jobs")
            return redirect(reverse("jobs") + f'?url={request.GET["url"]}')
        cv = request.FILES.get("cv")
        motivation_letter = request.FILES.get("motivation")
        job = request.POST.get("job_url")
        data = {"job": job}
        files = {
            "cv": cv,
            "motivation_letter": motivation_letter,
        }
        response = requests.post(
            f"http://{api_url}:{port}/api/applications/",
            headers={"Authorization": f"Bearer {token}"},
            data=data,
            files=files,
        )
        messages.success(request, "Applied successfully!")
        return redirect(reverse("jobs") + f"?url={job}")


def my_companies(request):
    token = validate(request)
    if token == "invalid":
        return redirect("signin")
    user = get_user(token)

    if user["user_type_verbose"] == "Student":
        return HttpResponse("Unauthorized", status=401)

    if request.method == "GET":

        if "url" in request.GET:  # give company profile page
            url = request.GET["url"]
            company_response = requests.get(
                url, headers={"Authorization": f"Bearer {token}"}
            )
            company = company_response.json()

            pictures_response = requests.get(
                f"http://{api_url}:{port}/api/company-pictures?owner={url}",
                headers={"Authorization": f"Bearer {token}"},
            )
            pictures = pictures_response.json()["results"]

            jobs_response = requests.get(
                f"http://{api_url}:{port}/api/jobs?owner={url}",
                headers={"Authorization": f"Bearer {token}"},
            )
            jobs = jobs_response.json()["results"]

            job_choices_response = requests.get(
                f"http://{api_url}:{port}/api/jobs/choices/",
                headers={"Authorization": f"Bearer {token}"},
            )
            job_choices = job_choices_response.json()

            posts_response = requests.get(
                f"http://{api_url}:{port}/api/posts/?company_owner={url}&company={url}",
                headers={"Authorization": f"Bearer {token}"},
            )
            posts = posts_response.json()["results"]

            comments_response = requests.get(
                f"http://{api_url}:{port}/api/comments/?company_owner={url}",
                headers={"Authorization": f"Bearer {token}"},
            )
            comments = comments_response.json()["results"]

            variables = {
                "long_texts": long_texts,
                "user": user,
                "company": company,
                "pictures": pictures,
                "jobs": jobs,
                "category_choices": job_choices["category_choices"],
                "type_choices": job_choices["type_choices"],
                "posts": posts,
                "comments": comments,
            }

            return render(request, "company_profile_owner.html", variables)

        else:  # give company list page
            response = requests.get(
                f"http://{api_url}:{port}/api/companies?email={user['email']}",
                headers={"Authorization": f"Bearer {token}"},
            )
            user_companies = response.json()["results"]
            company_choices_response = requests.get(
                f"http://{api_url}:{port}/api/companies/choices",
                headers={"Authorization": f"Bearer {token}"},
            )
            company_choices = company_choices_response.json()
            employee_choices = company_choices["employee_choices"]
            industry_choices = company_choices["industry_choices"]
            variables = {
                "long_texts": long_texts,
                "user": user,
                "user_companies": user_companies,
                "employee_choices": employee_choices,
                "industry_choices": industry_choices,
            }
            return render(request, "my_companies.html", variables)

    if request.method == "POST":
        form_type = request.POST["form_type"]
        if form_type == "new_company":
            name = request.POST["name"]
            description = request.POST.get("description")
            video_url = request.POST.get("video_url")
            website_url = request.POST.get("website_url")
            image = request.FILES.get("image")
            employee_range = request.POST.get("employee_range")
            industry = request.POST.get("industry")

            data = {
                "name": name,
                "description": description,
                "video_url": video_url,
                "website_url": website_url,
                "employee_range": employee_range,
                "industry": industry,
            }

            if image:
                files = {"image": image}
            else:
                files = {}

            response = requests.post(
                f"http://{api_url}:{port}/api/companies/",
                headers={"Authorization": f"Bearer {token}"},
                data=data,
                files=files,
            )
            messages.success(request, "Company created successfully!")

            return redirect("my-companies")

        else:  # company profile
            company = request.GET["url"]
            if form_type == "basic_info":
                data = {
                    "name": request.POST.get("name"),
                    "description": request.POST.get("description"),
                    "website_url": request.POST.get("website"),
                    "video_url": request.POST.get("video"),
                }
                data = without_nones(data)

                files = {"image": request.FILES.get("image")}
                files = without_nones(files)

                response = requests.patch(
                    company,
                    headers={"Authorization": f"Bearer {token}"},
                    data=data,
                    files=files,
                )
                print(response)
            elif form_type == "picture":
                image = request.FILES["image"]
                description = request.POST.get("description")
                location = request.POST.get("location")
                owner = company

                data = {
                    "description": description,
                    "location": location,
                    "owner": owner,
                }
                files = {"image": image}
                response = requests.post(
                    f"http://{api_url}:{port}/api/company-pictures/",
                    headers={"Authorization": f"Bearer {token}"},
                    data=data,
                    files=files,
                )
                print(response)
            elif form_type == "job_posting":
                title = request.POST.get("title")
                requirements = (request.POST.get("requirements"),)
                we_offer = (request.POST.get("we_offer"),)
                you_do = (request.POST.get("you_do"),)
                employment_details = (request.POST.get("employment_details"),)
                city = request.POST.get("city")
                country = request.POST.get("country")
                hours_per_week = request.POST.get("hours_per_week")
                salary_per_month = request.POST.get("salary_per_month")
                owner = request.GET["url"]
                category = request.POST.get("category")
                type = request.POST.get("type")

                data = {
                    "title": title,
                    "requirements": requirements,
                    "we_offer": we_offer,
                    "you_do": you_do,
                    "employment_details": employment_details,
                    "city": city,
                    "country": country,
                    "hours_per_week": hours_per_week,
                    "salary_per_month": salary_per_month,
                    "owner": owner,
                    "category": category,
                    "type": type,
                }

                response = requests.post(
                    f"http://{api_url}:{port}/api/jobs/",
                    headers={"Authorization": f"Bearer {token}"},
                    data=data,
                )
                print(response)
                if response.status_code == 400:
                    content = json.loads(response.content)
                    if "salary_per_month" in content:
                        messages.error(
                            request,
                            "Monthly salary must be above 0 and below 2'147'483'647",
                        )

                    if "hours_per_week" in content:
                        messages.error(
                            request, "Hours must be a 2 digit positive number"
                        )

            return redirect(reverse("my-companies") + f'?url={request.GET["url"]}')

    if request.method == "DELETE":
        body = json.loads(request.body)
        response = requests.delete(
            body["url"], headers={"Authorization": f"Bearer {token}"}
        )
        return HttpResponse(status=response.status_code)


def object_search(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)
    queries = request.GET.dict()
    slug = queries.pop("slug")
    query_string = "".join([f"{k}={v}&" for k, v in queries.items()])
    response = requests.get(
        f"http://{api_url}:{port}/api/{slug}/?{query_string}",
        headers={"Authorization": f"Bearer {token}"},
    )
    result = {"result": response.json()["results"]}

    return JsonResponse(result)


def post(request, token):
    user = get_user(request.COOKIES["token"])
    content = request.POST["content"]
    image = request.FILES.get("image")
    company = request.COOKIES.get("current_company")

    data = {"content": content}

    files = {"image": image}
    if user["user_type_verbose"] == "Student":
        response = requests.post(
            f"http://{api_url}:{port}/api/posts/",
            headers={"Authorization": f"Bearer {token}"},
            data=data,
            files=files,
        )

    elif user["user_type_verbose"] == "Employer":
        assert company is not None, "No company specified in query"
        response = requests.post(
            f"http://{api_url}:{port}/api/posts/?company={company}",
            headers={"Authorization": f"Bearer {token}"},
            data=data,
            files=files,
        )


def profile(request):
    token = validate(request)
    if token == "invalid":
        return redirect("signin")
    else:
        user = get_user(token)

        if user["user_type_verbose"] == "Employer":
            return HttpResponse("Unauthorized", status=401)

        user_data = requests.get(
            user["user_data"], headers={"Authorization": f"Bearer {token}"}
        )
        user_data = user_data.json()
        skill_data = skills_categorize(user_data["skill_data"])

        if request.method == "GET":
            education_data = user_data["education_data"]
            experience_data = user_data["experience_data"]

            posts = requests.get(
                f'http://{api_url}:{port}/api/posts?email={user["email"]}',
                headers={"Authorization": f"Bearer {token}"},
            ).json()

            # TODO: encoding url? or is there a better choice?

            # for post in posts['results']:
            #     url = post['url']
            #     # encoding url to not expose api endpoint to user
            #     enc_url = fernet.encrypt(url.encode()).decode()
            #     website_url = f'http://{api_url}:{port}/posts/{enc_url}'
            #     post['web_url'] = website_url

            comments = requests.get(
                f'http://{api_url}:{port}/api/comments?email={user["email"]}',
                headers={"Authorization": f"Bearer {token}"},
            )
            comments = comments.json()

            # for comment in comments['results']:
            #     post_url = comment['post']
            #     enc_url = fernet.encrypt(post_url.encode()).decode()
            #     website_url = f'http://{api_url}:{port}/posts/{enc_url}'
            #     comment['web_url'] = website_url

            variables = {
                "long_texts": long_texts,
                "user": user,
                "user_data": user_data,
                "education_data": education_data,
                "experience_data": experience_data,
                "skill_data": skill_data,
                "posts": posts["results"],
                "comments": comments["results"],
                "base_api": f"http://{api_url}:{port}/api",
            }
            return render(request, "student_profile_owner.html", variables)

        elif request.method == "POST":
            form_type = request.POST["form_type"]
            if form_type == "bio":
                first_name = request.POST["first_name"]
                last_name = request.POST["last_name"]
                user_change = first_name or last_name

                occupation = request.POST["occupation"]
                location = request.POST["location"]
                biography = request.POST["biography"]
                website = request.POST["website"]
                user_data_change = occupation or location or biography or website

                if user_change:
                    response = requests.patch(
                        user["url"],
                        headers={"Authorization": f"Bearer {token}"},
                        data={"first_name": first_name, "last_name": last_name},
                    )

                if user_data_change:
                    response = requests.patch(
                        user_data["url"],
                        headers={"Authorization": f"Bearer {token}"},
                        data={
                            "occupation": occupation,
                            "location": location,
                            "biography": biography,
                            "website": website,
                        },
                    )

            elif form_type == "education_data":
                institution = request.POST["institution"]
                degree = request.POST["degree"]
                start_date = request.POST["start_date"]
                end_date = request.POST["end_date"]
                description = request.POST["description"]
                response = requests.post(
                    f"http://{api_url}:{port}/api/education-data/",
                    headers={"Authorization": f"Bearer {token}"},
                    data={
                        "institution": institution,
                        "degree": degree,
                        "start_date": start_date,
                        "end_date": end_date,
                        "description": description,
                    },
                )

            elif form_type == "experience_data":
                company = request.POST["company"]
                title = request.POST["title"]
                start_date = request.POST["start_date"]
                end_date = request.POST["end_date"]
                description = request.POST["description"]
                response = requests.post(
                    f"http://{api_url}:{port}/api/experience-data/",
                    headers={"Authorization": f"Bearer {token}"},
                    data={
                        "company": company,
                        "title": title,
                        "start_date": start_date,
                        "end_date": end_date,
                        "description": description,
                    },
                )

            elif form_type == "skill_data":
                category = request.POST["category"]
                skill = request.POST["skill"]
                try:
                    exists = skill in skill_data[category]
                except KeyError:
                    exists = False

                if not exists:
                    response = requests.post(
                        f"http://{api_url}:{port}/api/skill-data/",
                        headers={"Authorization": f"Bearer {token}"},
                        data={"category": category, "skill": skill},
                    )
                else:
                    messages.error(
                        request, "That skill already exists in this category."
                    )

            return redirect("profile")

        elif request.method == "DELETE":
            body = json.loads(request.body)
            response = requests.delete(
                body["url"], headers={"Authorization": f"Bearer {token}"}
            )
            return HttpResponse(status=response.status_code)


def settings(request):
    token = validate(request)
    if token == "invalid":
        return redirect("/sign-in")

    user = get_user(token)
    if request.method == "GET":
        variables = {"user": user, "long_texts": long_texts}
        return render(request, "settings.html", variables)

    if request.method == "POST":
        form_type = request.POST["form_type"]
        if form_type == "account":
            fname, lname, email, image = (
                request.POST.get("fname"),
                request.POST.get("lname"),
                request.POST.get("email"),
                request.FILES.get("image"),
            )
            data = {
                "first_name": fname,
                "last_name": lname,
                "email": email,
            }

            files = {"image": image}

            response = requests.patch(
                user["url"],
                headers={"Authorization": f"Bearer {token}"},
                data=data,
                files=files,
            )
            return redirect("settings")

        elif form_type == "password":
            old_pass = request.POST["old_password"]
            new_pass = request.POST["new_password"]
            user_obj = UserModel.objects.filter(pk=url_to_pk(user["url"])).first()
            if user_obj.check_password(old_pass):
                user_obj.set_password(new_pass)
                user_obj.save()
                messages.info(request, "new password set")
            else:
                messages.error(request, "old password incorrect")
            return redirect("settings")


def signin(request):
    token = validate(request)
    user = get_user(token)
    #  Loading the sign in page if the user is not logged in
    if token == "invalid":
        if request.method == "GET":
            variables = {"user": user, "long_texts": long_texts}
            return render(request, "signin.html", variables)

        if request.method == "POST":
            email = request.POST.getlist("email")
            password = request.POST.getlist("password")
            response = requests.post(
                f"http://{api_url}:{port}/api/token/",
                data={"email": email, "password": password},
            )
            if response.status_code == 200:
                token = response.json()["access"]
                index_render = redirect("index")
                index_render.set_cookie("token", token, httponly=True)
                messages.info(request, "Successfully signed in.")
                return index_render
            else:
                messages.warning(request, "Email or Password incorrect.")
                return redirect("signin")
        else:
            return

    # If the token exists, the user is logged out
    else:
        return redirect("index")


def signout(request):
    page = redirect("signin")
    page.delete_cookie("token")
    page.delete_cookie("refresh")
    page.delete_cookie("current_company")
    messages.info(request, "Successfully signed out.")
    return page


def signup(request):
    return render(request, "signup.html", {"user": None})


def signup_employer(request):
    token = validate(request)
    if token != "invalid":
        return redirect("index")

    if request.method == "POST":
        # get required fields
        fname, lname, email, password = (
            request.POST.getlist("fname"),
            request.POST.getlist("lname"),
            request.POST.getlist("email"),
            request.POST.getlist("password"),
        )
        # get admin token
        response = requests.post(
            f"http://{api_url}:{port}/api/token/",
            data={"email": "shin@gmail.com", "password": "lak868"},
        )

        if response.status_code == 200:
            token = "Bearer " + (json.loads(response.text)["access"])
            # post new user
            response2 = requests.post(
                f"http://{api_url}:{port}/api/users/",
                headers={"Authorization": token},
                data={
                    "email": email,
                    "first_name": fname,
                    "last_name": lname,
                    "password": password,
                    "user_type": UserModel.UserType.EMPLOYER,
                },
            )

            if response2.status_code == 201:
                # get new user token
                response3 = requests.post(
                    f"http://{api_url}:{port}/api/token/",
                    data={"email": email, "password": password},
                )
                token = json.loads(response3.text)["access"]
                index_render = redirect("index")
                index_render.set_cookie("token", token, httponly=True)
                return index_render
            else:
                return render(
                    request, "signup_company.html", {"signup_error": 1, "user": None}
                )

        else:
            return render(
                request,
                "signup_company.html",
                {"user_token": "", "signup_error": 2, "user": None},
            )

    if request.method == "GET":
        variables = {"user": None, "long_texts": long_texts}
        return render(request, "signup_company.html", variables)


def signup_student(request):
    token = validate(request)
    if token != "invalid":
        return redirect("index")

    if request.method == "POST":
        # get required fields
        fname, lname, email, password = (
            request.POST.getlist("fname"),
            request.POST.getlist("lname"),
            request.POST.getlist("email"),
            request.POST.getlist("password"),
        )
        # get admin token
        response = requests.post(
            f"http://{api_url}:{port}/api/token/",
            data={"email": "shin@gmail.com", "password": "lak868"},
        )

        if response.status_code == 200:
            token = "Bearer " + (json.loads(response.text)["access"])
            # post new user
            response2 = requests.post(
                f"http://{api_url}:{port}/api/users/",
                headers={"Authorization": token},
                data={
                    "email": email,
                    "first_name": fname,
                    "last_name": lname,
                    "password": password,
                    "user_type": 3,
                },
            )

            if response2.status_code == 201:
                # get new user token
                response3 = requests.post(
                    f"http://{api_url}:{port}/api/token/",
                    data={"email": email, "password": password},
                )
                token = json.loads(response3.text)["access"]
                index_render = redirect("index")
                index_render.set_cookie("token", token, httponly=True)
                return index_render
            else:
                return render(
                    request, "signup_student.html", {"signup_error": 1, "user": None}
                )

        else:
            return render(
                request,
                "signup_student.html",
                {"user_token": "", "signup_error": 2, "user": None},
            )

    if request.method == "GET":
        variables = {"user": None, "long_texts": long_texts}

        return render(request, "signup_student.html", variables)


def single_job(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)

    variables = {"long_texts": long_texts, "user": user}

    return render(request, "single_job.html", variables)


def single_post(request):
    token = validate(request)
    if token == "invalid":
        return redirect("signin")
    user = get_user(token)

    # Will be None if a students posts
    company = request.COOKIES.get("current_company")
    post_url = request.GET.get("url")

    if request.method == "GET":
        assert "url" in request.GET, "no url in params"

        if user["user_type_verbose"] == "Employer":
            assert company is not None, "no current company in cookies"
            company_request = requests.get(
                f"http://{api_url}:{port}/api/companies/{url_to_pk(company)}",
                headers={"Authorization": f"Bearer {token}"},
            )
            post_request = requests.get(
                f"http://{api_url}:{port}/api/posts/{url_to_pk(post_url)}/?company={company}",
                headers={"Authorization": f"Bearer {token}"},
            )
            company_obj = company_request.json()

        elif user["user_type_verbose"] == "Student":
            company_obj = None
            post_request = requests.get(
                f"http://{api_url}:{port}/api/posts/{url_to_pk(post_url)}",
                headers={"Authorization": f"Bearer {token}"},
            )

        else:
            raise ValueError("user type neither student nor employer")

        single_post = post_request.json()

        if post_request.status_code == 200:
            variables = {
                "long_texts": long_texts,
                "token": token,
                "post": single_post,
                "user": user,
                "company": company_obj,
            }
            return render(request, "single_post.html", variables)

    if request.method == "POST":
        # checking if form was submitted through a submit or an image input (image being upvote button)
        form_type = request.POST["form_type"]
        if form_type == "post":
            post(request, token)

        elif form_type == "comment":
            comment(request, token)

        elif form_type == "vote":
            vote(request, token)

        else:
            print("ERROR!!!")

        return redirect(reverse("single-post") + f"?url={post_url}")


def students(request):
    token = validate(request)
    if token == "invalid":
        return redirect("index")
    user = get_user(token)
    company = request.COOKIES.get("current_company")

    if request.method == "GET":
        if "url" in request.GET:
            url = request.GET["url"]
            student = requests.get(
                url, headers={"Authorization": f"Bearer {token}"}
            ).json()
            assert (
                student["user_type_verbose"] == "Student"
            ), "This user is not a student"

            user_data = requests.get(
                student["user_data"], headers={"Authorization": f"Bearer {token}"}
            ).json()
            skill_data = skills_categorize(user_data["skill_data"])
            education_data = user_data["education_data"]
            experience_data = user_data["experience_data"]

            posts = requests.get(
                f'http://{api_url}:{port}/api/posts?email={student["email"]}&company={company}',
                headers={"Authorization": f"Bearer {token}"},
            )

            posts = posts.json()
            comments = requests.get(
                f'http://{api_url}:{port}/api/comments?email={student["email"]}',
                headers={"Authorization": f"Bearer {token}"},
            ).json()

            variables = {
                "long_texts": long_texts,
                "user": user,
                "user_data": user_data,
                "student": student,
                "education_data": education_data,
                "experience_data": experience_data,
                "skill_data": skill_data,
                "posts": posts["results"],
                "comments": comments["results"],
                "base_api": f"http://{api_url}:{port}/api",
            }
            return render(request, "student_profile_public.html", variables)

        else:
            return HttpResponse("<h1>Work in progress</h1>")


def validate(request):
    """
    Takes any request, and checks if there is a valid token inside. If access works it gives the token back. If it is expired it tries to
    refresh it and gives the new token back in case refresh is still active.
    If both tokens are expired, or there are no token cookies, it returns the string 'invalid' as the token response
    """
    if {"token"} <= set(request.COOKIES):
        token = request.COOKIES["token"]
    else:
        return "invalid"

    access_response = requests.post(
        f"http://{api_url}:{port}/api/token/validate/", data={"token": token}
    )
    if access_response.status_code != 200:
        return "invalid"

    return token


def vote(request, token):
    user = get_user(request.COOKIES["token"])
    post = request.POST["post_url"]
    vote_type = request.POST["vote_type"]  # is 'upvote' or 'downvote'
    type_int = {"upvote": 1, "downvote": 2}
    method = {
        "upvote": request.POST["upvote_method"],
        "downvote": request.POST["downvote_method"],
    }
    company = request.COOKIES.get("current_company")
    # making api call to update database
    if method[vote_type] == "post":
        if user["user_type_verbose"] == "Student":
            response = requests.post(
                f"http://{api_url}:{port}/api/vote/",
                headers={"Authorization": f"Bearer {token}"},
                data={"user": user["url"], "post": post, "type": type_int[vote_type]},
            )
            print(response)

        elif user["user_type_verbose"] == "Employer":
            assert company is not None, "No company specified in query"
            response = requests.post(
                f"http://{api_url}:{port}/api/vote/?company={company}",
                headers={"Authorization": f"Bearer {token}"},
                data={"user": user["url"], "post": post, "type": type_int[vote_type]},
            )
            print(response)

    elif method[vote_type] == "delete":
        if user["user_type_verbose"] == "Student":
            response = requests.delete(
                f"http://{api_url}:{port}/api/vote/",
                headers={"Authorization": f"Bearer {token}"},
                data={"user": user["url"], "post": post, "type": type_int[vote_type]},
            )
            print(response)

        elif user["user_type_verbose"] == "Employer":
            assert company is not None, "No company specified in query"
            response = requests.delete(
                f"http://{api_url}:{port}/api/vote/?company={company}",
                headers={"Authorization": f"Bearer {token}"},
                data={"user": user["url"], "post": post, "type": type_int[vote_type]},
            )
            print(response)

    else:
        # error!
        return redirect("community")


def delete_object(request):
    token = validate(request)
    if token == "invalid":
        return redirect("signin")
    user = get_user(token)

    body = json.loads(request.body)
    response = requests.delete(
        body["url"], headers={"Authorization": f"Bearer {token}"}
    )
    return HttpResponse(status=response.status_code)
