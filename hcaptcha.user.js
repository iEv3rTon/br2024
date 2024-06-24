// ==UserScript==
// @name         Hcaptcha
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Niik
// @match        https://accounts.hcaptcha.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixelcanvas.io
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var solved;
let guiDivFill = document.createElement("div")
guiDivFill.style = "position: absolute; left: 1%; 40%; width: 50%; height: auto; background-color: black; opacity: 0.7; border-radius: 8px; border: 1px solid black"
guiDivFill.innerHTML = '<div id="spankey" style="color:white;">KEY</div>'
document.body.appendChild(guiDivFill)

const checkToken = setInterval(() => {
    const hcaptchaBox = document.querySelector('#hcaptcha-demo > iframe');
    const label = document.querySelector(".hcaptcha-success");
    if (label.innerHTML == 'Challenge Success!' && !solved || label.innerHTML == 'Desafio Sucesso!' && !solved) {
        const token = hcaptchaBox.getAttribute('data-hcaptcha-response');
        try {
            const agua = document.querySelector("#spankey")
            agua.innerHTML = `${token}`
        }catch (e) {
            console.log(e)
        }
        solved = true;
        GM_xmlhttpRequest({
            method: "GET",
            url: `http://localhost:5000/captcha?hcaptcha_key=${token}`
        });
        alert('Pode fechar essa aba.');
    } else if (label.innerHTML == 'Token expired.') solved = false;
}, 1000);
