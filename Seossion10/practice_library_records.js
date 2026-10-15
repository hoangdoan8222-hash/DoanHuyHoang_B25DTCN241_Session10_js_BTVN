
let borrowRecords = [
    {
        recordId: "PM01",
        studentId: "SV101",
        bookTitle: "Lap trinh C",
        borrowDays: 10,
        isReturned: false
    },
    {
        recordId: "PM02",
        studentId: "SV102",
        bookTitle: "JavaScript co ban",
        borrowDays: 20,
        isReturned: false
    },
    {
        recordId: "PM03",
        studentId: "SV103",
        bookTitle: "Cau truc du lieu",
        borrowDays: 16,
        isReturned: false
    }
];

console.log("========== 1. DANH SACH PHIEU MUON BAN DAU ==========");
console.table(borrowRecords);

console.log("========== 2. THEM PHIEU MUON PM04 ==========");

borrowRecords.push({
    recordId: "PM04",
    studentId: "SV104",
    bookTitle: "Clean Code",
    borrowDays: 18,
    isReturned: false
});

console.table(borrowRecords);

console.log("========== 3. KIEM TRA PHIEU MUON QUA HAN ==========");

let totalFine = 0;

for (let i = 0; i < borrowRecords.length; i++) {
    let record = borrowRecords[i];

    if (record.borrowDays > 14 && record.isReturned === false) {
        let fine = (record.borrowDays - 14) * 5000;
        totalFine += fine;

        console.log(
            "Ma phieu:", record.recordId,
            "| Sinh vien:", record.studentId,
            "| Sach:", record.bookTitle,
            "| So ngay muon:", record.borrowDays,
            "| Tien phat:", fine.toLocaleString("vi-VN"), "VND"
        );
    }
}

console.log("Tong tien phat cac phieu qua han:", totalFine.toLocaleString("vi-VN"), "VND");

console.log("========== 4. CAP NHAT PHIEU PM01 DA TRA SACH ==========");

for (let i = 0; i < borrowRecords.length; i++) {
    if (borrowRecords[i].recordId === "PM01") {
        borrowRecords[i].isReturned = true;
        console.log("Phieu PM01 da duoc cap nhat: Da tra sach");
        break;
    }
}

console.table(borrowRecords);

console.log("========== 5. XOA PHIEU PM03 ==========");

for (let i = 0; i < borrowRecords.length; i++) {
    if (borrowRecords[i].recordId === "PM03") {
        let deletedRecord = borrowRecords.splice(i, 1);
        console.log("Da xoa phieu:", deletedRecord[0].recordId);
        break;
    }
}

console.table(borrowRecords);

console.log("========== 6. TONG KET DANH SACH THU VIEN ==========");

let totalRecords = borrowRecords.length;
let borrowingCount = 0;
let returnedCount = 0;
let overdueCount = 0;
let remainingFine = 0;

for (let i = 0; i < borrowRecords.length; i++) {
    let record = borrowRecords[i];

    if (record.isReturned === true) {
        returnedCount++;
    } else {
        borrowingCount++;

        if (record.borrowDays > 14) {
            overdueCount++;
            remainingFine += (record.borrowDays - 14) * 5000;
        }
    }
}

console.log("Tong so phieu con trong danh sach:", totalRecords);
console.log("So phieu dang muon:", borrowingCount);
console.log("So phieu da tra:", returnedCount);
console.log("So phieu dang muon qua han:", overdueCount);
console.log("Tong tien phat con lai:", remainingFine.toLocaleString("vi-VN"), "VND");

console.log("========== BANG THEO DOI CUOI CUNG ==========");
console.table(borrowRecords);
