const addMangaButton = document.querySelector("#add-manga");

const myLibrary = [];

function Manga(title, author, chapters, chaptersRead) {
    this.title = title;
    this.author = author;
    this.chapters = chapters;
    this.chaptersRead = chaptersRead;
}

function addMangaToLibrary(title, author, chapters, chaptersRead) {
    let manga = new Manga(title, author, chapters, chaptersRead);

    myLibrary.push(manga);
}

function displayMyLibrary() {

    if (document.querySelector("table") != undefined) {
        document.querySelector("table").remove();
    }

    const table = document.createElement("table");
    document.body.appendChild(table);

    myLibrary.forEach((manga) => {

        const row = document.createElement("tr");
        const titleCell = document.createElement("td");
        const authorCell = document.createElement("td");
        const chaptersCell = document.createElement("td");
        const chaptersReadCell = document.createElement("td");

        titleCell.textContent = manga.title;
        authorCell.textContent = manga.author;
        chaptersCell.textContent = manga.chapters;
        chaptersReadCell.textContent = manga.chaptersRead;

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(chaptersCell);
        row.appendChild(chaptersReadCell);
        table.appendChild(row);
    });

}

addMangaToLibrary("Dandadan", "Yukinobu Tatsu", 162, 162);
addMangaToLibrary("My Hero Academia", "Kohei Horikoshi", 430, 430);
addMangaToLibrary("One Piece", "Eiichiro Oda", 1121, 1);

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

            addMangaToLibrary(inputtedTitle, inputtedAuthor, inputtedChapters, inputtedChaptersRead);
            displayMyLibrary();

            dialog.close();
            dialog.remove();

        } else {
            titleInput.reportValidity();
        }
    });

});

displayMyLibrary();

