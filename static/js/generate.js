const form = document.getElementById("emailForm");
const outputSection = document.getElementById("outputSection");
const generatedEmail = document.getElementById("generatedEmail");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    const emailType = document.getElementById("emailType").value;
    const description = document.getElementById("description").value;

    const tone = document.querySelector('input[name="tone"]:checked').value;


    if (emailType === "" || description.trim() === "") {
        alert("Please fill all the required fields.");
        return;
    }


    // Show output section
    outputSection.style.display = "block";

    generatedEmail.innerHTML = "Generating your email... ⏳";


    try {

        const response = await fetch("/generate-email", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                emailType: emailType,
                tone: tone,
                description: description

            })

        });


        const data = await response.json();


        generatedEmail.innerHTML = data.email;


    }


    catch(error){

        console.log(error);

        generatedEmail.innerHTML =
        "Something went wrong. Please try again.";

    }


});
// Copy Button

const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", () => {

    const email = generatedEmail.innerText;

    if(email === "" || email.includes("Generating") || email.includes("appear here")){
        alert("No email to copy!");
        return;
    }

    navigator.clipboard.writeText(email);

    copyBtn.innerHTML =
    '<i class="fa-solid fa-check"></i> Copied!';

    setTimeout(() => {
        copyBtn.innerHTML =
        '<i class="fa-solid fa-copy"></i> Copy';
    },3000);

});
// Regenerate Button

const regenBtn = document.getElementById("regenBtn");

regenBtn.addEventListener("click", () => {

    form.requestSubmit();

});