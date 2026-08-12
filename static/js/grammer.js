const form = document.getElementById("grammarForm");

const output = document.getElementById("outputSection");

const corrected = document.getElementById("correctedEmail");


form.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("userEmail").value;

    if(email.trim() === ""){

        alert("Please paste your text.");

        return;

    }

    output.style.display = "block";

    corrected.innerHTML = `
        <p>
        <i class="fa-solid fa-spinner fa-spin"></i>
        Checking grammar...
        </p>
    `;

    try{

        const response = await fetch("/check-grammar",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                text:email

            })

        });

        const data = await response.json();

        corrected.innerText = data.corrected;

    }

    catch(error){

        console.log(error);

        corrected.innerText =
        "Something went wrong. Please try again.";

    }

});



document.getElementById("copyBtn").addEventListener("click",()=>{

    navigator.clipboard.writeText(corrected.innerText);

    alert("Copied Successfully!");

});