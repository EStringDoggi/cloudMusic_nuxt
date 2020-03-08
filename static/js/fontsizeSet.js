const remSize = 7.5;
const remHtml = document.documentElement;
const remEvent =
    "orientationchange" in window ? "orientationchange" : "resize";
let oldFontSize;
function remChange() {
    const clientWidth = Math.min(window.screen.width, 414);//取小，哪怕你是桌面端1920px，也是固定55.2px大小，这样就避免我的旧方法造成桌面端字体过大
    const fontSize = clientWidth / remSize;//414---55.2
    console.log(window.screen.width, clientWidth, fontSize);
    if (oldFontSize !== fontSize) {
        oldFontSize = fontSize;
        clientWidth && (remHtml.style.fontSize = fontSize + "px");
    }
}
remChange();
window.addEventListener(remEvent, remChange);
console.log('设置fontsize');
