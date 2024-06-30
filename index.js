const customPicker = document.querySelectorAll(".custom-picker");
const colorPicker = document.querySelectorAll(".color-picker");

customPicker.forEach((item) =>{
    item.addEventListener("click", () => {
        item.querySelector(".color-picker").click();
    })
});

colorPicker.forEach((item) =>{
    item.addEventListener("change", (e) => {
        color = e.target.value;
        span = item.parentElement.querySelector("span");
        input = item.parentElement.querySelector("input[type=text]");
        span.style.backgroundColor = color;
        input.value = color;
    })
});

const customDropdown = document.querySelectorAll(".custom-dropdown");

customDropdown.forEach((item) =>{
    options = item.querySelectorAll(".option");

    options.forEach((option) => {
        option.addEventListener("click", () => {
            allOptions = option.parentElement.querySelectorAll(".option");
            allOptions.forEach((item) => {
                item.classList.remove("active");
            });
            option.classList.add("active");
            item.querySelector(".selected").innerHTML = option.innerHTML;
            generateQRCode();
        });
    });
});

const uploadElem = document.querySelector(".upload-img");
const uploadImgInput = document.querySelector("#upload-img-input");

uploadElem.addEventListener('click', () => {
    uploadImgInput.click();
});

uploadImgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        img = uploadImgInput.nextSibling.nextSibling;
        img.src = reader.result;
        generateQRCode();
    }
});


const range = document.querySelector(".custom-slider input");
const tooltip = document.querySelector(".custom-slider span");
//const rangeValue = document.querySelector(".custom-slider span");

function setValue() {
    const newValue = Number(((range.value - range.min) * 100) / (range.max - range.min));
    const newPosition = 16 - newValue * 0.32;
    tooltip .innerHTML = range.value + " x " + range.value;
    tooltip.style.left = `calc(${newValue}% + (${newPosition}px)`;
}

document.addEventListener("DOMContentLoaded" , setValue);
range.addEventListener("input", setValue);

//qr code logic

const container = document.querySelector(".qr-code-img");
const generateBtn = document.querySelector(".generate-btn");

const width = document.getElementById("size"),
    height = document.getElementById("size"),
    data = document.getElementById("text"),
    foregroundColor = document.getElementById("fg-color"),
    backgroundColor = document.getElementById("bg-color"),
    cornerColor = document.getElementById("corner-color"),
    imageRadios = document.querySelectorAll('input[name="logo"]'),
    dotsStyle = document.getElementById("dots-style"),
    cornerSquaresStyle = document.getElementById("corner-squares-style"),
    cornerDotsStyle = document.getElementById("corner-dots-style");
 


width.addEventListener("change" , generateQRCode);
height.addEventListener("change" , generateQRCode);
data.addEventListener("input" , generateQRCode);
foregroundColor.addEventListener("change" , generateQRCode);
backgroundColor.addEventListener("change" , generateQRCode);
cornerColor.addEventListener("change" , generateQRCode);
generateBtn.addEventListener("click" , generateQRCode);
imageRadios.forEach((item) => {
    item.addEventListener("change" , generateQRCode);
});

function generateQRCode() {
    let imageRadio = document.querySelector('input[name="logo"]:checked');
    let image = document.getElementById(imageRadio.value);
    qrCode = new QRCodeStyling({
      width: width.value,
      height: height.value,
      type: "canvas",
      data: data.value,
      image: image.src,
      imageOptions: {
        saveAsBlob: true,
        crossOrigin: "anonymous",
        margin: 15,
      },
      dotsOptions: {
        color: foregroundColor.value,
        type: dotsStyle.innerHTML,
      },
      backgroundOptions: {
        color: backgroundColor.value,
      },
      cornersSquareOptions: {
        color: cornerColor.value,
        type: cornerSquaresStyle.innerHTML,
      },
      cornersDotOptions: {
        color: cornerColor.value,
        type: cornerDotsStyle.innerHTML,
      },
    });
    container.innerHTML = "";
    qrCode.append(container);
  }

generateQRCode();


//download
const downloadPng = document.getElementById("download-png"),
    downloadJpg = document.getElementById("download-jpg"),
    downloadSvg = document.getElementById("download-svg");

downloadPng.addEventListener("click" , () => {
    qrCode.download({
        name: "open-source-coding-" + Date.now(),
        extencion: "png",
    });
});

downloadJpg.addEventListener("click" , () => {
    qrCode.download({
        name: "open-source-coding-" + Date.now(),
        extencion: "jpg",
    });
});

downloadSvg.addEventListener("click" , () => {
    qrCode.download({
        name: "open-source-coding-" + Date.now(),
        extencion: "svg",
    });
});