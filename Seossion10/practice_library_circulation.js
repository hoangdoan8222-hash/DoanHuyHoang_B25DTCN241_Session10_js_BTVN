const students = [
    { studentCode: "SV001", studentName: "Nguyen Van An" },
    { studentCode: "SV002", studentName: "Tran Thi Binh" },
    { studentCode: "SV003", studentName: "Le Van Cuong" }
];

const circulationLogs = [
    {
        logId: "L001",
        studentCode: "SV001",
        bookIsbn: "ISBN001",
        status: "BORROWING",
        fineAmount: 0,
        borrowDate: "2026-09-01",
        dueDate: "2026-09-10",
        returnDate: null,
        finePaid: false
    },
    {
        logId: "L002",
        studentCode: "SV002",
        bookIsbn: "ISBN002",
        status: "BORROWING",
        fineAmount: 0,
        borrowDate: "2026-10-01",
        dueDate: "2026-10-10",
        returnDate: null,
        finePaid: false
    },
    {
        logId: "L003",
        studentCode: "SV003",
        bookIsbn: "ISBN003",
        status: "RETURNED",
        fineAmount: 10000,
        borrowDate: "2026-08-01",
        dueDate: "2026-08-10",
        returnDate: "2026-08-12",
        finePaid: true
    }
];

function displayLogs() {
    console.table(circulationLogs);
}

function borrowBook(studentCode, bookIsbn, logId, borrowDate, dueDate) {
    const student = students.find(item => item.studentCode === studentCode);

    if (!student) {
        console.log("Ma sinh vien khong hop le:", studentCode);
        return;
    }

    const existingLog = circulationLogs.find(
        item => item.studentCode === studentCode &&
            item.bookIsbn === bookIsbn &&
            item.status === "BORROWING"
    );

    if (existingLog) {
        console.log("Sinh vien dang muon cuon sach nay.");
        return;
    }

    circulationLogs.push({
        logId,
        studentCode,
        bookIsbn,
        status: "BORROWING",
        fineAmount: 0,
        borrowDate,
        dueDate,
        returnDate: null,
        finePaid: false
    });

    console.log("Muon sach thanh cong:", bookIsbn);
    displayLogs();
}

function extendLoan(logId, newDueDate) {
    const log = circulationLogs.find(item => item.logId === logId);

    if (!log) {
        console.log("Khong tim thay giao dich:", logId);
        return;
    }

    if (log.status !== "BORROWING") {
        console.log("Chi co the gia han sach dang duoc muon.");
        return;
    }

    if (new Date(newDueDate) <= new Date(log.dueDate)) {
        console.log("Han moi phai sau han cu.");
        return;
    }

    log.dueDate = newDueDate;

    console.log("Gia han thanh cong:", logId);
    displayLogs();
}

function returnBook(logId, returnDate, isLost = false) {
    const log = circulationLogs.find(item => item.logId === logId);

    if (!log) {
        console.log("Khong tim thay giao dich:", logId);
        return;
    }

    if (log.status !== "BORROWING") {
        console.log("Giao dich khong o trang thai dang muon.");
        return;
    }

    log.returnDate = returnDate;

    if (isLost) {
        log.status = "LOST";
        log.fineAmount = 200000;
    } else {
        log.status = "RETURNED";

        const dueDate = new Date(log.dueDate);
        const actualReturnDate = new Date(returnDate);
        const lateDays = Math.max(
            0,
            Math.floor((actualReturnDate - dueDate) / (1000 * 60 * 60 * 24))
        );

        log.fineAmount = lateDays * 5000;
    }

    log.finePaid = false;

    console.log("Da cap nhat giao dich:", logId);
    console.log("Trang thai:", log.status);
    console.log("Tien phat:", log.fineAmount.toLocaleString("vi-VN"), "VND");

    displayLogs();
}

function settleFine(logId) {
    const log = circulationLogs.find(item => item.logId === logId);

    if (!log) {
        console.log("Khong tim thay giao dich:", logId);
        return;
    }

    if (log.status === "BORROWING") {
        console.log("Chua the quyet toan khi sach van dang duoc muon.");
        return;
    }

    if (log.finePaid) {
        console.log("Khoan phat da duoc quyet toan.");
        return;
    }

    log.finePaid = true;

    console.log("Da quyet toan:", logId);
    console.log("So tien thu:", log.fineAmount.toLocaleString("vi-VN"), "VND");

    displayLogs();
}

function deleteOldLogs(currentDate) {
    const today = new Date(currentDate);

    for (let i = circulationLogs.length - 1; i >= 0; i--) {
        const log = circulationLogs[i];

        if (
            log.status !== "BORROWING" &&
            log.finePaid &&
            log.returnDate &&
            Math.floor((today - new Date(log.returnDate)) / (1000 * 60 * 60 * 24)) > 30
        ) {
            circulationLogs.splice(i, 1);
            console.log("Da xoa nhat ky cu:", log.logId);
        }
    }

    displayLogs();
}

function circulationReport() {
    let borrowingCount = 0;
    let totalFinesCollected = 0;
    let outstandingFines = 0;

    for (let i = 0; i < circulationLogs.length; i++) {
        const log = circulationLogs[i];

        if (log.status === "BORROWING") {
            borrowingCount++;
        }

        if (log.finePaid) {
            totalFinesCollected += log.fineAmount;
        } else if (log.status !== "BORROWING") {
            outstandingFines += log.fineAmount;
        }
    }

    console.log("\n========== BAO CAO LUU CHUYEN THU VIEN ==========");
    console.log("So giao dich dang muon:", borrowingCount);
    console.log(
        "Tong tien phat da thu:",
        totalFinesCollected.toLocaleString("vi-VN"),
        "VND"
    );
    console.log(
        "Tong tien phat chua thu:",
        outstandingFines.toLocaleString("vi-VN"),
        "VND"
    );
    console.log("=================================================");
}

console.log("========== 1. NHAT KY BAN DAU ==========");
displayLogs();

console.log("\n========== 2. MUON SACH MOI ==========");
borrowBook(
    "SV001",
    "ISBN004",
    "L004",
    "2026-10-15",
    "2026-10-22"
);

console.log("\n========== 3. GIA HAN SACH ==========");
extendLoan("L004", "2026-10-29");

console.log("\n========== 4. TRA SACH TRE HAN ==========");
returnBook("L004", "2026-11-01");

console.log("\n========== 5. QUYET TOAN TIEN PHAT ==========");
settleFine("L004");

console.log("\n========== 6. GHI NHAN MAT SACH ==========");
returnBook("L002", "2026-10-15", true);

console.log("\n========== 7. QUYET TOAN TIEN DEN BU ==========");
settleFine("L002");

console.log("\n========== 8. XOA NHAT KY CU ==========");
deleteOldLogs("2026-10-15");

console.log("\n========== 9. BAO CAO CUOI NGAY ==========");
circulationReport();n