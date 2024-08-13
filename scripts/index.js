const addMangaButton = document.querySelector("#add-manga");
let deleteMangaButtons = null;

let myLibrary = [];

function Manga(title, author, chapters, chaptersRead, completed) {
    this.title = title;
    this.author = author;
    this.chapters = chapters;
    this.chaptersRead = chaptersRead;
    this.completed = completed;
}

function addMangaToLibrary(title, author, chapters, chaptersRead, completed) {
    let manga = new Manga(title, author, chapters, chaptersRead, completed);

    myLibrary.push(manga);
}

//
//
//
// Displays a modal that contains a form for adding manga
addMangaButton.addEventListener("click", () => {
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    const ul = document.createElement("ul");

    const titleListItem = document.createElement("li");
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title ";
    titleLabel.setAttribute("for", "title");
    const titleInput = document.createElement("input");
    titleInput.required = true;
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleListItem.appendChild(titleLabel);
    titleListItem.appendChild(titleInput);
    ul.appendChild(titleListItem);


    const authorListItem = document.createElement("li");
    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author ";
    authorLabel.setAttribute("for", "author");
    const authorInput = document.createElement("input");
    authorInput.required = true;
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("id", "author");
    authorListItem.appendChild(authorLabel);
    authorListItem.appendChild(authorInput);
    ul.appendChild(authorListItem);

    const chaptersListItem = document.createElement("li");
    const chaptersLabel = document.createElement("label");
    chaptersLabel.textContent = "Chapters ";
    chaptersLabel.setAttribute("for", "chapters");
    const chaptersInput = document.createElement("input");
    chaptersInput.required = true;
    chaptersInput.setAttribute("type", "number")
    chaptersInput.setAttribute("id", "chapters");
    chaptersListItem.appendChild(chaptersLabel);
    chaptersListItem.appendChild(chaptersInput);
    ul.appendChild(chaptersListItem);

    const chaptersReadListItem = document.createElement("li");
    const chaptersReadLabel = document.createElement("label");
    chaptersReadLabel.textContent = "Chapters Read ";
    chaptersReadLabel.setAttribute("for", "chaptersRead");
    const chaptersReadInput = document.createElement("input");
    chaptersReadInput.required = true;
    chaptersReadInput.setAttribute("type", "number");
    chaptersReadInput.setAttribute("id", "chaptersRead");
    chaptersReadListItem.appendChild(chaptersReadLabel);
    chaptersReadListItem.appendChild(chaptersReadInput);
    ul.appendChild(chaptersReadListItem);

    // The next three sections are just for the two radio inputs
    const completedListItem = document.createElement("li");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Did you finish the manga?";
    fieldset.appendChild(legend);
    completedListItem.appendChild(fieldset);


    const completedTrueLabel = document.createElement("label");
    completedTrueLabel.setAttribute("for", "true");
    completedTrueLabel.textContent = "Yes";
    const completedTrueInput = document.createElement("input");
    completedTrueInput.setAttribute("type", "radio");
    completedTrueInput.setAttribute("id", "true");
    completedTrueInput.setAttribute("name", "completed");
    completedTrueInput.setAttribute("value", "Yes");
    fieldset.appendChild(completedTrueLabel);
    fieldset.appendChild(completedTrueInput);


    const completedFalseLabel = document.createElement("label");
    completedFalseLabel.setAttribute("for", "false");
    completedFalseLabel.textContent = "No";
    const completedFalseInput = document.createElement("input");
    completedFalseInput.setAttribute("type", "radio");
    completedFalseInput.setAttribute("id", "false");
    completedFalseInput.setAttribute("name", "completed");
    completedFalseInput.setAttribute("value", "No");
    fieldset.appendChild(completedFalseLabel);
    fieldset.appendChild(completedFalseInput);

    ul.appendChild(completedListItem);

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Add";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    form.appendChild(ul);
    form.appendChild(cancelButton);
    form.appendChild(confirmButton);

    dialog.appendChild(form);

    document.body.appendChild(dialog);
    dialog.showModal();

    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();

        dialog.close();
        dialog.remove();
    });

    confirmButton.addEventListener("click", (event) => {

        if (form.checkValidity()) {
            event.preventDefault();

            const inputtedTitle = titleInput.value;
            const inputtedAuthor = authorInput.value;
            const inputtedChapters = chaptersInput.value;
            const inputtedChaptersRead = chaptersReadInput.value;
            const completedButtonValue = document.querySelector("input[name=completed]:checked").value;

            addMangaToLibrary(inputtedTitle, inputtedAuthor, inputtedChapters, inputtedChaptersRead, completedButtonValue);
            displayMyLibrary();

            dialog.close();
            dialog.remove();
        } else {
            titleInput.reportValidity();
        }
    });

});



//
//
//
// Displays the Manga objects in library in a new table
function displayMyLibrary() {


    if (document.querySelector("table") != undefined) {
        document.querySelector("table").remove();
    }
    if (document.querySelector("#noMangaDiv") != undefined) {
        document.querySelector("#noMangaDiv").remove();
    }

    const table = document.createElement("table");

    if (myLibrary.length === 0) {
        table.remove();

        const noMangaDiv = document.createElement("div");
        noMangaDiv.id = "noMangaDiv";
        noMangaDiv.textContent = "Nothing to see here. Add some manga!";
        document.body.appendChild(noMangaDiv);

        return;
    }

    const tbody = document.createElement("tbody");

    const thead = document.createElement("thead");
    const theadRow = document.createElement("tr");
    const theadTitle = document.createElement("th");
    const theadAuthor = document.createElement("th");
    const theadChapters = document.createElement("th");
    const theadChaptersRead = document.createElement("th");
    const theadCompleted = document.createElement("th");

    theadTitle.textContent = "Title";
    theadAuthor.textContent = "Author";
    theadChapters.textContent = "Chapters";
    theadChaptersRead.textContent = "Chapters Read";
    theadCompleted.textContent = "Completed";

    thead.appendChild(theadRow);
    theadRow.appendChild(theadTitle);
    theadRow.appendChild(theadAuthor);
    theadRow.appendChild(theadChapters);
    theadRow.appendChild(theadChaptersRead);
    theadRow.appendChild(theadCompleted);
    table.appendChild(thead);


    myLibrary.forEach((manga) => {

        const row = document.createElement("tr");
        const titleCell = document.createElement("td");
        const authorCell = document.createElement("td");
        const chaptersCell = document.createElement("td");
        const chaptersReadCell = document.createElement("td");
        const completedCell = document.createElement("td");
        const deleteButtonCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        const toggleReadButtonCell = document.createElement("td");
        const toggleReadButton = document.createElement("button");

        titleCell.textContent = manga.title;
        authorCell.textContent = manga.author;
        chaptersCell.textContent = manga.chapters;
        chaptersReadCell.textContent = manga.chaptersRead;
        completedCell.textContent = manga.completed;
        deleteButton.textContent = "Delete";
        toggleReadButton.textContent = "Toggle Read";

        // Each delete button has an id of "manga-$"
        deleteButton.setAttribute("id", `delete-${myLibrary.indexOf(manga)}`);
        deleteButton.className = "delete";

        toggleReadButton.setAttribute("id", `toggle-completed-${myLibrary.indexOf(manga)}`);
        toggleReadButton.className = "toggleCompleted";

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(chaptersCell);
        row.appendChild(chaptersReadCell);
        row.appendChild(completedCell);
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
        toggleReadButtonCell.appendChild(toggleReadButton);
        row.appendChild(toggleReadButtonCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);

    deleteMangaButtons = document.querySelectorAll(".delete");
    deleteMangaButtons.forEach((button) => {

        button.addEventListener("click", () => {

            let tempArray = myLibrary.filter((item) => {
                return myLibrary.indexOf(item) != button.id.substring(button.id.length - 1);
            })

            myLibrary = tempArray;

            displayMyLibrary();

        });


    });

    toggleCompletedButtons = document.querySelectorAll(".toggleCompleted");
    toggleCompletedButtons.forEach((button) => {

        button.addEventListener("click", () => {

            let valueOfCompletedCell = myLibrary.at(button.id.substring(button.id.length - 1)).completed;
            console.log(valueOfCompletedCell);
            if (valueOfCompletedCell == "Yes") {
                valueOfCompletedCell = "No";
                myLibrary.at(button.id.substring(button.id.length - 1)).completed = valueOfCompletedCell;
            } else {
                valueOfCompletedCell = "Yes";
                myLibrary.at(button.id.substring(button.id.length - 1)).completed = valueOfCompletedCell;
            }

            displayMyLibrary();
        });

    });

}

// Manga to prefill the table
addMangaToLibrary("Dandadan", "Yukinobu Tatsu", 162, 162, "No");
addMangaToLibrary("My Hero Academia", "Kohei Horikoshi", 430, 430, "Yes");
addMangaToLibrary("One Piece", "Eiichiro Oda", 1121, 1, "No");

displayMyLibrary();

