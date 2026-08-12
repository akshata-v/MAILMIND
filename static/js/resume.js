const form = document.getElementById("resumeForm");

const outputSection = document.getElementById("outputSection");
const generatedResume = document.getElementById("generatedResume");

let resumeData = {};

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    resumeData = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        objective: document.getElementById("objective").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        projects: document.getElementById("projects").value,
        certifications: document.getElementById("certifications").value

    };

    outputSection.style.display = "block";

    generatedResume.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Generating Resume...`;

    try {

        const response = await fetch("/generate-resume", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(resumeData)

        });

        const data = await response.json();

        let html = data.resume;

        html = html.replace(/```html/g, "");
        html = html.replace(/```/g, "");
        html = html.replace(/\n\s*\n/g, "\n");

        generatedResume.innerHTML = html;

    }

    catch (error) {

        console.log(error);

        generatedResume.innerText = "Something went wrong.";

    }

});


// COPY
document.getElementById("copyBtn").addEventListener("click", () => {

    navigator.clipboard.writeText(generatedResume.innerText);

    alert("Resume Copied!");

});


// REGENERATE
document.getElementById("regenBtn").addEventListener("click", async () => {

    generatedResume.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Regenerating...`;

    const response = await fetch("/generate-resume", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(resumeData)

    });

    const data = await response.json();

    let html = data.resume;

    html = html.replace(/```html/g, "");
    html = html.replace(/```/g, "");
    html = html.replace(/\n\s*\n/g, "\n");

    generatedResume.innerHTML = html;

});


// DOWNLOAD
document.getElementById("downloadBtn").addEventListener("click", () => {

    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>Resume</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">



<style>

@page{
    size:A4;
    margin:15mm;
}

body{
    margin:0;
    padding:0;
    background:#d9d9d9;
    font-family:Poppins,sans-serif;
}

.resume{
    width:210mm;
    min-height:297mm;
    margin:20px auto;
    background:#fff;
    padding:18mm;
    box-sizing:border-box;
    box-shadow:0 0 20px rgba(0,0,0,0.2);
}

.resume header{
    text-align:center;
    border-bottom:2px solid #05040a;
    padding-bottom:12px;
    margin-bottom:20px;
}

.resume h1{
    color:#000;
    font-size:34px;
    font-weight:700;
    margin-bottom:8px;
}

.resume header p{
    display:flex;
    justify-content:center;
    gap:25px;
    flex-wrap:wrap;
    color:#555;
}

.resume header i{
    color:#6C63FF;
}

.resume section{
    margin-bottom:15px;
}

.resume h2{
    color:#333;
    border-bottom:2px solid #06050e;
    padding-bottom:5px;
    margin-bottom:8px;
}

.resume p{
    line-height:1.6;
    margin:4px 0;
}

.resume ul{
    padding-left:20px;
}

.resume li{
    margin-bottom:5px;
}

</style>



</head>

<body>

${generatedResume.innerHTML}

</body>

</html>
`;

    const blob = new Blob([resumeHTML], { type: "text/html" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Resume.html";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);

});