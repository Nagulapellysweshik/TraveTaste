function fontSize(op) {
    let Elements = document.querySelectorAll(".cfont");
    let currentFontSize = parseInt(Elements[0].style.fontSize || "10px");

    document.querySelectorAll(".cfont").forEach((element) => {
        element.style.fontSize =
        op === "inc"? currentFontSize + 5 + "px"
        : currentFontSize - 5 + "px";
    });
}