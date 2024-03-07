function handleFormSubmit(event) {
    event.preventDefault();
    let count = 0;

    function updateStarCount(starElement, count) {
        starElement.textContent = count + 1;
    }



    const star1 = document.getElementById("star1");
    const star2 = document.getElementById("star2");
    const star3 = document.getElementById("star3");
    const star4 = document.getElementById("star4");
    const star5 = document.getElementById("star5");

    const feedbackDetails = {
        name: event.target.name.value,
        rating: event.target.rating.value,
    };

    axios
        .post(
            "https://crudcrud.com/api/76b7305811b54b32818f59ee5bebdbf9/feedbackDetails",
            feedbackDetails
        )
        .then((response) => displayUserOnScreen(response.data))
        .catch((error) => console.log(error));

    if (feedbackDetails.rating == 1)
        updateStarCount(star1, parseInt(star1.textContent));
    if (feedbackDetails.rating == 2)
        updateStarCount(star2, parseInt(star2.textContent));
    if (feedbackDetails.rating == 3)
        updateStarCount(star3, parseInt(star3.textContent));
    if (feedbackDetails.rating == 4)
        updateStarCount(star4, parseInt(star4.textContent));
    if (feedbackDetails.rating == 5)
        updateStarCount(star5, parseInt(star5.textContent));

    //     if (feedbackDetails.rating == 1)
    //     star1.textContent = ++count;
    // if (feedbackDetails.rating == 2)
    //     star2.textContent = ++count;
    // if (feedbackDetails.rating == 3)
    //     star3.textContent = ++count;
    // if (feedbackDetails.rating == 4)
    //     star4.textContent = ++count;
    // if (feedbackDetails.rating == 5)
    //     star5.textContent = ++count;
}

document.getElementById("name").value = "";
document.getElementById("rating").value = "";

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/76b7305811b54b32818f59ee5bebdbf9/feedbackDetails"
        )
        .then((response) => {
            for (let i = 0; i < response.data.length; i++)
                displayUserOnScreen(response.data[i]);
        })
        .catch((error) => console.log(error));
})

function displayUserOnScreen(feedbackDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${feedbackDetails.name} ${feedbackDetails.rating}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    deleteBtn.style.margin = "3px";
    userItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    editBtn.style.margin = "3px";
    userItem.appendChild(editBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        axios
            .delete(`https://crudcrud.com/api/76b7305811b54b32818f59ee5bebdbf9/feedbackDetails/${feedbackDetails._id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    });

    const submitButton = document.querySelector("button");

    editBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        document.getElementById("name").value = feedbackDetails.name;
        document.getElementById("rating").value = feedbackDetails.rating;

        axios
            .delete(`https://crudcrud.com/api/76b7305811b54b32818f59ee5bebdbf9/feedbackDetails/${feedbackDetails._id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        submitButton.innerHTML = "Edit Rating";
    });
    submitButton.innerHTML = "Submit";
}