const table = document.querySelector("table");

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

function displayhMyLibrary() {

    // // Console version for testing
    // myLibrary.forEach((manga) => {
    //     console.log(`Title: ${manga.title}\nAuthor: ${manga.author}\nChapters: ${manga.chapters}\nChapters Read: ${manga.chaptersRead}`);
    // })

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
addMangaToLibrary("My Hero Academia", "Yukinobu Tatsu", 430, 430);
addMangaToLibrary("One Piece", "Yukinobu Tatsu", 1121, 1);

displayhMyLibrary();

