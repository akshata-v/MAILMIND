from flask import Flask, render_template, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate")
def generate():
    return render_template("generate.html")

@app.route("/grammar")
def grammar():
    return render_template("grammer.html")
@app.route("/resume")
def resume():
    return render_template("resume.html")



@app.route("/generate-email", methods=["POST"])
def generate_email():

    data = request.json

    email_type = data["emailType"]
    tone = data["tone"]
    description = data["description"]

    prompt = f"""
Write a {tone} {email_type} email.

Description:
{description}

Generate only the email.
Do not explain anything.
"""

    try:

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        email = completion.choices[0].message.content

        return jsonify({
            "email": email
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@app.route("/check-grammar", methods=["POST"])
def check_grammar():

    data = request.json

    text = data["text"]

    prompt = f"""
Correct the grammar of the following text.

Do not change the meaning.
Return only the corrected text.

{text}
"""

    try:

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        corrected = completion.choices[0].message.content

        return jsonify({
            "corrected": corrected
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
@app.route("/generate-resume", methods=["POST"])
def generate_resume():

    data = request.json

    prompt = f"""
You are an expert ATS Resume Writer.

Create a modern, professional, one-page resume.
You are writing a resume for a software engineering student.

Do not simply repeat the user's input.

Rewrite and professionally enhance every section.

Use industry-standard resume language.

If the user provides only a few words, expand them into complete professional sentences while remaining truthful.

STRICT RULES:

- Return ONLY valid HTML.
- Do NOT return Markdown.
- Do NOT use ```html.
- Do NOT include explanations.
- Do NOT include CSS.
- Do NOT include JavaScript.
- Do NOT include <html>, <head>, or <body>.
- Start directly with:
<div class="resume">
- End with:
</div>

Formatting Rules:

- Use semantic HTML only.
- Use <header> for the candidate information.
- Use <section> for every section.
- Every heading must immediately be followed by its content.
- Use <ul><li> for Skills, Projects and Certifications.
- Do not insert blank lines.
- Keep the HTML compact.
- Keep the content concise and professional.
- Improve the wording where appropriate.
- If Experience is empty, write "Fresher".
- If Certifications are empty, omit that section.
- If Projects are empty, omit that section.

Required Structure:

<div class="resume">

<header>
<h1>Full Name</h1>

<p>
<i class="fa-solid fa-envelope"></i> Email
&nbsp;&nbsp;&nbsp;
<i class="fa-solid fa-phone"></i> Phone
</p>

</header>

<section>
<h2>Professional Summary</h2>
<p>...</p>
</section>

<section>
<h2>Education</h2>
<p>...</p>
</section>

<section>
<h2>Skills</h2>
<ul>
<li>...</li>
</ul>
</section>

<section>
<h2>Projects</h2>
<ul>
<li>...</li>
</ul>
</section>

<section>
<h2>Experience</h2>
<p>...</p>
</section>

<section>
<h2>Certifications</h2>
<ul>
<li>...</li>
</ul>
</section>

</div>

Candidate Details

Name:
{data["name"]}

Email:
{data["email"]}

Phone:
{data["phone"]}

Career Objective:
{data["objective"]}

Education:
{data["education"]}

Experience:
{data["experience"]}

Skills:
{data["skills"]}

Projects:
{data["projects"]}

Certifications:
{data["certifications"]}
"""

    try:

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role":"user",
                    "content":prompt
                }
            ]

        )

        resume = completion.choices[0].message.content

        return jsonify({
            "resume":resume
        })

    except Exception as e:

        return jsonify({
            "error":str(e)
        }),500


if __name__ == "__main__":
    app.run(debug=True)