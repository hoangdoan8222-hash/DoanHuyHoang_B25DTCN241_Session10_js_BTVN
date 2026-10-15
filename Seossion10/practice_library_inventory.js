const books = [
    {
        bookCode: "B01",
        title: "Lap trinh JavaScript",
        category: "Cong nghe",
        price: 150000,
        totalCopies: 10,
        availableCopies: 3,
        shelfLocation: "A01"
    },
    {
        bookCode: "B02",
        title: "Lap trinh C",
        category: "Cong nghe",
        price: 120000,
        totalCopies: 8,
        availableCopies: 5,
        shelfLocation: "A02"
    },
    {
        bookCode: "B03",
        title: "Ky nang giao tiep",
        category: "Ky nang",
        price: 90000,
        totalCopies: 5,
        availableCopies: 2,
        shelfLocation: "B01"
    }
];

function displayBooks() {
    console.log("\n==============================================================");
    console.log("                 KIEM KE KHO THU VIEN");
    console.log("==============================================================");
    console.table(books);
}

function addBook(book) {
    const exists = books.find(item => item.bookCode === book.bookCode);

    if (exists) {
        console.log("Ma sach da ton tai:", book.bookCode);
        return;
    }

    books.push(book);
    console.log("Da nhap kho sach:", book.title);
    displayBooks();
}

function borrowBook(bookCode) {
    const book = books.find(item => item.bookCode === bookCode);

    if (!book) {
        console.log("Khong tim thay sach:", bookCode);
        return;
    }

    if (book.availableCopies <= 0) {
        console.log("Sach da het tren ke:", book.title);
        return;
    }

    book.availableCopies--;

    console.log("Muon sach thanh cong:", book.title);

    if (book.availableCopies === 0) {
        console.log("Trang thai: HET SACH TREN KE");
    } else {
        console.log("So sach con lai tren ke:", book.availableCopies);
    }

    displayBooks();
}

function liquidateBook(bookCode) {
    const index = books.findIndex(item => item.bookCode === bookCode);

    if (index === -1) {
        console.log("Khong tim thay sach can thanh ly:", bookCode);
        return;
    }

    const removedBook = books.splice(index, 1);

    console.log("Da thanh ly sach:", removedBook[0].title);
    displayBooks();
}

function moveBook(bookCode, newShelfLocation) {
    const book = books.find(item => item.bookCode === bookCode);

    if (!book) {
        console.log("Khong tim thay sach:", bookCode);
        return;
    }

    book.shelfLocation = newShelfLocation;

    console.log("Da chuyen sach den ke:", newShelfLocation);
    displayBooks();
}

function inventoryStatistics() {
    let totalBookCopies = 0;
    let totalAvailableCopies = 0;
    let totalAssetValue = 0;

    for (let i = 0; i < books.length; i++) {
        totalBookCopies += books[i].totalCopies;
        totalAvailableCopies += books[i].availableCopies;
        totalAssetValue += books[i].totalCopies * books[i].price;
    }

    console.log("\n==============================================================");
    console.log("                  BAO CAO TAI SAN THU VIEN");
    console.log("==============================================================");
    console.log("So dau sach:", books.length);
    console.log("Tong so cuon sach:", totalBookCopies);
    console.log("So cuon con tren ke:", totalAvailableCopies);
    console.log("Tong gia tri tai san:", totalAssetValue.toLocaleString("vi-VN"), "VND");
    console.log("==============================================================");
}

console.log("========== 1. KIEM KE BAN DAU ==========");
displayBooks();
inventoryStatistics();

console.log("\n========== 2. NHAP KHO SACH MOI ==========");
addBook({
    bookCode: "B04",
    title: "Cau truc du lieu va giai thuat",
    category: "Cong nghe",
    price: 180000,
    totalCopies: 6,
    availableCopies: 6,
    shelfLocation: "C01"
});

console.log("\n========== 3. SINH VIEN MUON SACH B01 ==========");
borrowBook("B01");

console.log("\n========== 4. CHUYEN VI TRI KE SACH B02 ==========");
moveBook("B02", "C02");

console.log("\n========== 5. THANH LY SACH B03 ==========");
liquidateBook("B03");

console.log("\n========== 6. KIEM KE CUOI CUNG ==========");
displayBooks();
inventoryStatistics();