
let highestZ = 1000;
let galleryOpen = false;
// ===========================
// TUTORIAL
// ===========================

const welcomeScreen = document.getElementById("welcomeScreen");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    welcomeScreen.classList.add("fade-out");

    setTimeout(() => {

        welcomeScreen.remove();

        petActive = true;
        pet.style.opacity = "1";

    },700);

});







// ===========================
// CLOCK
// ===========================

const clock = document.getElementById("clock");

function updateClock() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

updateClock();
setInterval(updateClock, 1000);

// ===========================
// WINDOWS
// ===========================

const projectsIcon = document.getElementById("projects");
const aboutIcon = document.getElementById("about");
const resumeIcon = document.getElementById("resume");
const contactIcon = document.getElementById("contact");

const projectsWindow = document.getElementById("projectsWindow");
const aboutWindow = document.getElementById("aboutWindow");
const resumeWindow = document.getElementById("resumeWindow");
const contactWindow = document.getElementById("contactWindow");
const memoryWindow = document.getElementById("memoryWindow");


function jumpOpen(windowEl){

    if(jumping) return;

    jumping = true;

    setAnimation("jump");

jumpSound.pause();
jumpSound.currentTime = 0;
jumpSound.play().catch(() => {});

 jumpSound.play();

    setTimeout(()=>{

    windowEl.classList.remove("hidden");

    windowEl.style.zIndex = ++highestZ;

},180);

    setTimeout(()=>{
        jumping = false;
    },550);

}

projectsIcon.onclick = () => jumpOpen(projectsWindow);
aboutIcon.onclick = () => jumpOpen(aboutWindow);
resumeIcon.onclick = () => jumpOpen(resumeWindow);
contactIcon.onclick = () => jumpOpen(contactWindow);




document.querySelectorAll(".close-window").forEach(btn => {

    btn.onclick = () => {

        btn.closest(".window").classList.add("hidden");

    };

});

// ===========================
// TEDDY CARD
// ===========================

const teddy = document.getElementById("teddy");
const teddyCard = document.getElementById("teddy-card");

teddy.addEventListener("mousemove", (e) => {

    teddyCard.style.display = "block";

    const cardWidth = 340;
    const offset = 20;

    // Fare ekranın sağ yarısındaysa kart sola açılsın
    if (e.clientX > window.innerWidth / 2) {
        teddyCard.style.left = (e.pageX - cardWidth - offset) + "px";
    } else {
        teddyCard.style.left = (e.pageX + offset) + "px";
    }

    teddyCard.style.top = (e.pageY - 110) + "px";

});

teddy.addEventListener("mouseleave", () => {
    teddyCard.style.display = "none";
});
teddyCard.style.display = "block";
requestAnimationFrame(() => teddyCard.classList.add("show"));
teddyCard.classList.remove("show");

setTimeout(() => {
    teddyCard.style.display = "none";
}, 250);
// ===========================
// POLAROID GALLERY
// ===========================

const camera = document.getElementById("polaroid");
const gallery = document.getElementById("polaroid-gallery");

const photos = [
    document.querySelector(".p1"),
    document.querySelector(".p2"),
    document.querySelector(".p3"),
    document.querySelector(".p4")
];



camera.addEventListener("click", () => {
    

    galleryOpen = !galleryOpen;

    if(galleryOpen){

        gallery.style.pointerEvents = "auto";

        photos[0].style.cssText += `
            opacity:1;
            left:-170px;
            top:-120px;
            transform:rotate(-12deg) scale(1);
        `;

        photos[1].style.cssText += `
            opacity:1;
            left:130px;
            top:-100px;
            transform:rotate(8deg) scale(1);
        `;

        photos[2].style.cssText += `
            opacity:1;
            left:-170px;
            top:90px;
            transform:rotate(10deg) scale(1);
        `;

        photos[3].style.cssText += `
            opacity:1;
            left:140px;
            top:80px;
            transform:rotate(-8deg) scale(1);
        `;

    }else{

        gallery.style.pointerEvents = "none";

        photos.forEach(photo=>{

            photo.style.opacity="0";
            photo.style.left="0";
            photo.style.top="0";
            photo.style.transform="scale(.3)";

        });

    }

});
const memoryImage = document.getElementById("memoryImage");
const memoryTitle = document.getElementById("memoryTitle");
const memoryLocation = document.getElementById("memoryLocation");
const memoryYear = document.getElementById("memoryYear");
const memoryDescription = document.getElementById("memoryDescription");
const memoryLink = document.getElementById("memoryLink");

function openMemory(data){

    memoryImage.src = data.image;
    memoryTitle.textContent = data.title;
    memoryLocation.textContent = data.location;
    memoryYear.textContent = data.year;
    memoryDescription.textContent = data.description;

    if(data.link){
        memoryLink.href = data.link;
        memoryLink.style.display = "inline-block";
    }else{
        memoryLink.style.display = "none";
    }

    memoryWindow.classList.remove("hidden");
memoryWindow.style.zIndex = ++highestZ;
  

}


const memories = {

    camp: {
        title: "Camp America '24",
        location: "New York, USA",
        year: "2024",
        image: "assets/polaroids/camp.png",
        description: "Worked as a Camp Counselor at Camp Comstock for 9 weeks.",
        link: ""
    },

    erasmus: {
        title: "Erasmus+",
        location: "Netherlands",
        year: "2023",
        image: "assets/polaroids/erasmus.png",
        description: "Youth Exchange Project.",
        link: ""
    },

    japan: {
        title: "Doro No Kokoro",
        location: "İzmir",
        year: "2024",
        image: "assets/polaroids/japan.png",
        description: "Japanese ceramic workshop.",
        link: "https://www.izmir.bel.tr/tr/Haberler/camura-iyilikle-sekil-verdiler/50883/156"
    },

    teos: {
        title: "Teos Yachting",
        location: "İzmir",
        year: "2025",
        image: "assets/polaroids/teos.png",
        description: "Industrial Design Internship.",
        link: ""
    }

};
photos[0].addEventListener("click", () => openMemory(memories.camp));
photos[1].addEventListener("click", () => openMemory(memories.erasmus));
photos[2].addEventListener("click", () => openMemory(memories.japan));
photos[3].addEventListener("click", () => openMemory(memories.teos));
/* ==========================
   DRAG WINDOWS
========================== */

document.querySelectorAll(".window").forEach(windowEl => {

    const titlebar = windowEl.querySelector(".titlebar");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Pencereye tıklanınca en üste gelsin
    windowEl.addEventListener("mousedown", () => {
        windowEl.style.zIndex = ++highestZ;
    });

    titlebar.addEventListener("mousedown", (e) => {

        isDragging = true;

        windowEl.style.zIndex = ++highestZ;

        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;

        document.body.style.userSelect = "none";

    });

    document.addEventListener("mousemove", (e) => {

        if(!isDragging) return;

        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        // Ekran dışına çıkmasını engelle
        x = Math.max(0, Math.min(window.innerWidth - windowEl.offsetWidth, x));
        y = Math.max(0, Math.min(window.innerHeight - windowEl.offsetHeight, y));

        windowEl.style.left = x + "px";
        windowEl.style.top = y + "px";

    });

    document.addEventListener("mouseup", () => {

        isDragging = false;
        document.body.style.userSelect = "";

    });

});

/*============================
      PIXEL ECEM ENGINE
=============================*/

const pet = document.getElementById("ecemPet");
const sprite = document.getElementById("ecemSprite");
const PET_SIZE = 170;

const SPRITES = {

    idle:{
        file:"assets/icons/charachter/idle.png",
        frames:4
    },

    runRight:{
        file:"assets/icons/charachter/run-right.png",
        frames:4
    },

    runLeft:{
        file:"assets/icons/charachter/run-left.png",
        frames:4
    },

    jump:{
        file:"assets/icons/charachter/jump.png",
        frames:3
    },

    laptop:{
        file:"assets/icons/charachter/laptop.png",
        frames:4
    },

    dance:{
        file:"assets/icons/charachter/dance.png",
        frames:4
    }

};

let current = "";
let frame=0;
let petActive = false;
let jumping = false;
let musicPlaying = false;

function setAnimation(name){

    if(current===name) return;

    current=name;
    frame=0;

    const anim=SPRITES[name];

    sprite.style.backgroundImage=`url(${anim.file})`;

    sprite.style.width=(anim.frames*PET_SIZE)+"px";
    sprite.style.height=PET_SIZE+"px";

    sprite.style.backgroundSize=
        (anim.frames*PET_SIZE)+"px "+PET_SIZE+"px";

}



setAnimation("idle");

setInterval(()=>{

    const anim=SPRITES[current];

   sprite.style.backgroundPositionX = `${-frame * PET_SIZE}px`;

    frame++;

    if(frame>=anim.frames){

        frame=0;

    }

},180);
let mouseX = 300;
let mouseY = 300;

document.addEventListener("mousemove",(e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMouseMove = Date.now();
    

});
/* ==================================================
   PIXEL ECEM POSITION
================================================== */

let x = 300;
let y = 300;


/* ==================================================
   MOBILE TAP TARGET
================================================== */

let mobileTargetX = null;
let mobileTargetY = null;

document.addEventListener("pointerdown", (e) => {

    /* Sadece mobil */
    if (window.innerWidth > 600) return;

    /* Hamburger ve menü Ecem'i hareket ettirmesin */
    if (
        e.target.closest(".mobile-topbar") ||
        e.target.closest(".mobile-menu") ||
        e.target.closest(".mobile-menu-backdrop")
    ) {
        return;
    }

    mobileTargetX = e.clientX - PET_SIZE / 2;
    mobileTargetY = e.clientY - PET_SIZE / 2;

    /* Ekrandan taşmasın */
    mobileTargetX = Math.max(
        0,
        Math.min(
            mobileTargetX,
            window.innerWidth - PET_SIZE
        )
    );

    mobileTargetY = Math.max(
        0,
        Math.min(
            mobileTargetY,
            window.innerHeight - PET_SIZE
        )
    );

    lastMouseMove = Date.now();
});


function updatePet(){
    if (document.getElementById("sketchbookLightbox")?.classList.contains("show")) {

    setAnimation("idle");

    pet.style.left = x + "px";
    pet.style.top = y + "px";

    requestAnimationFrame(updatePet);

    return;
}
     if(!petActive){

        pet.style.left = x + "px";
        pet.style.top = y + "px";

        requestAnimationFrame(updatePet);
        return;
    }
    if(jumping){

    pet.style.left = x + "px";
    pet.style.top = y + "px";

    requestAnimationFrame(updatePet);
    return;
}


    const anyWindowOpen =
        [...document.querySelectorAll(".window")]
        .some(w => !w.classList.contains("hidden"));

    if(anyWindowOpen){

        setAnimation("idle");

        requestAnimationFrame(updatePet);
        return;
    }
    if (musicPlaying) {

    setAnimation("dance");

    pet.style.left = x + "px";
    pet.style.top = y + "px";

    requestAnimationFrame(updatePet);
    return;
}

    if (galleryOpen) {

   const cameraRect = camera.getBoundingClientRect();

const targetX = cameraRect.left - 100;
const targetY = cameraRect.top - 20;

    const dx = targetX - x;
    const dy = targetY - y;

    const dist = Math.hypot(dx, dy);

    if (dist > 8) {

        x += dx * 0.04;
        y += dy * 0.04;

        if (dx > 0) {
            setAnimation("runRight");
        } else {
            setAnimation("runLeft");
        }

    } else {

        setAnimation("idle");

    }

    pet.style.left = x + "px";
    pet.style.top = y + "px";

    requestAnimationFrame(updatePet);
    return;
}

if (Date.now() - lastMouseMove > 5000) {

    setAnimation("laptop");

    pet.style.left = x + "px";
    pet.style.top = y + "px";

    requestAnimationFrame(updatePet);
    return;
}
    const dx = mouseX - x;
    const dy = mouseY - y;

    const dist = Math.hypot(dx,dy);

    if(dist > 8){

        x += dx * 0.04;
        y += dy * 0.04;

        if(dx > 0){
            setAnimation("runRight");
        }else{
            setAnimation("runLeft");
        }

    }else{

        setAnimation("idle");

    }

    pet.style.left = x + "px";
    pet.style.top = y + "px";

    requestAnimationFrame(updatePet);

}
updatePet();


const jumpSound = new Audio("assets/sounds/jumpsound.mp3");
jumpSound.volume = 0.4;

const vinyl = document.getElementById("vinyl");

const music = new Audio("assets/music/design-students-life.wav");

let playing = false;
vinyl.addEventListener("click", () => {

    if (!playing) {

        music.play();

        vinyl.classList.add("spinning");

        musicPlaying = true;

        setAnimation("dance");

    } else {

        music.pause();
        music.currentTime = 0;

        vinyl.classList.remove("spinning");

        musicPlaying = false;

        setAnimation("idle");

    }

    playing = !playing;

});
const copyMail = document.getElementById("copyMail");

if(copyMail){

    copyMail.addEventListener("click",()=>{

        navigator.clipboard.writeText("ecemercan123@gmail.com");

        copyMail.textContent="✓ Copied";

        setTimeout(()=>{

            copyMail.textContent="📋 Copy";

        },2000);

    });

}
/* ===========================
   RESUME
=========================== */

const resumeContent = document.getElementById("resumeContent");
const resumePath = document.getElementById("resumePath");
console.log(resumePath);
const resumeBackBtn = document.getElementById("resumeBackBtn");


let resumeState = "home";
let currentPdf = "";

/* ANA SAYFA */

function showResumeHome(){
    

    resumeState = "home";

    resumeBackBtn.classList.add("hidden");

    resumePath.textContent = "";

    resumeContent.innerHTML = `

        <table class="explorer">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Type</th>

                </tr>

            </thead>

            <tbody>

                <tr class="folder" id="englishFolder">

                    <td>📁 English</td>

                    <td>File Folder</td>

                </tr>

                <tr class="folder" id="turkishFolder">

                    <td>📁 Türkçe</td>

                    <td>File Folder</td>

                </tr>

            </tbody>

        </table>

    `;

    document.getElementById("englishFolder").onclick = showEnglish;

    document.getElementById("turkishFolder").onclick = showTurkish;

}

/* ENGLISH */

function showEnglish(){
  

    resumeState = "english";

    resumeBackBtn.classList.remove("hidden");

    resumePath.textContent = "> English";

    resumeContent.innerHTML = `

        <table class="explorer">

            <thead>

                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>

            </thead>

            <tbody>

                <tr id="resumePdf" class="folder">

                    <td>📄 Resume.pdf</td>

                    <td>PDF File</td>

                </tr>

                <tr id="resumePhotoPdf" class="folder">

                    <td>📄 Resume with Photo.pdf</td>

                    <td>PDF File</td>

                </tr>

            </tbody>

        </table>

    `;
    document.getElementById("resumePdf").onclick = function(){

    openPDF(
        "assets/pdf/en/Resume.pdf",
        "Resume.pdf"
    );

};

document.getElementById("resumePhotoPdf").onclick = function(){

    openPDF(
        "assets/pdf/en/Resume with Photo.pdf",
        "Resume with Photo.pdf"
    );

};

   

    
}


/* TÜRKÇE */

function showTurkish(){
    

    resumeState = "turkish";

    resumeBackBtn.classList.remove("hidden");

    resumePath.textContent = "> Türkçe";

    resumeContent.innerHTML = `

        <table class="explorer">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
            </thead>

            <tbody>

                <tr id="cvPdf" class="folder">
                    <td>📄 CV.pdf</td>
                    <td>PDF File</td>
                </tr>

                <tr id="cvPhotoPdf" class="folder">
                    <td>📄 CV with Photo.pdf</td>
                    <td>PDF File</td>
                </tr>

            </tbody>

        </table>

    `;

    document.getElementById("cvPdf").addEventListener("click", function(){

        openPDF(
            "assets/pdf/tr/CV.pdf",
            "CV.pdf"
        );

    });

    document.getElementById("cvPhotoPdf").addEventListener("click", function(){

        openPDF(
            "assets/pdf/tr/CV with Photo.pdf",
            "CV with Photo.pdf"
        );

    });

}

/* BACK */

resumeBackBtn.onclick = function(){

    if(resumeState==="pdf"){

        if(currentPdf==="english"){

            showEnglish();

        }else{

            showTurkish();

        }

        return;

    }

    if(resumeState==="english" || resumeState==="turkish"){

        showResumeHome();

    }

}

showResumeHome();
function openPDF(path, name){

    resumeState = "pdf";

    currentPdf = path.includes("/en/") ? "english" : "turkish";

    resumePath.textContent =
"> " +
(currentPdf === "english" ? "English" : "Türkçe")
+ " > " + name;
  

    resumeContent.innerHTML = `

        <iframe
            class="resume-pdf"
            src="${path}"
        </iframe>

    `;

}
const aboutContactBtn = document.querySelector(".about-contact-btn");

if (aboutContactBtn) {

    aboutContactBtn.addEventListener("click", () => {

        document.getElementById("aboutWindow").classList.add("hidden");

       const contactWindow = document.getElementById("contactWindow");

contactWindow.classList.remove("hidden");
contactWindow.style.zIndex = ++highestZ;

    });

}



/* ==========================
   TYPEWRITER
========================== */

const chapterTitles = document.querySelectorAll(".chapter-title");

function typeWriter(element){

    if(element.dataset.done === "true") return;

    element.dataset.done = "true";

    const originalText = element.textContent.trim();

    let index = 0;

    element.textContent = "";

    element.classList.add("typing");

    const interval = setInterval(()=>{

        element.textContent = originalText.substring(0,index+1);

        index++;

        if(index >= originalText.length){

            clearInterval(interval);

            // Cursor'ı kısa süre göster
            setTimeout(()=>{

                element.classList.remove("typing");

            },700);

        }

    },55);

}


/* ==========================
   JOURNI PROJECT
========================== */

const journiProject = document.getElementById("journiProject");
const projectsExplorer = document.getElementById("projectsExplorer");
const journiPage = document.getElementById("journiPage");

const projectsBackBtn = document.getElementById("projectsBackBtn");
const projectsTitle = document.getElementById("projectsTitle");
const projectsPath = document.getElementById("projectsPath");
const projectsStatus = document.getElementById("projectsStatus");
journiProject.addEventListener("click",()=>{

    projectsExplorer.classList.add("hidden");

    journiPage.classList.remove("hidden");
    loadProjectImages(journiPage);

    projectsBackBtn.classList.remove("hidden");

    projectsStatus.classList.add("hidden");

    projectsPath.textContent="> Journi × THY";

});
/* ==========================
   SERENE HARMONY PROJECT
========================== */

const sereneProject = document.getElementById("sereneProject");
const serenePage = document.getElementById("serenePage");

if (sereneProject && serenePage) {

    sereneProject.addEventListener("click", () => {

        projectsExplorer.classList.add("hidden");

        serenePage.classList.remove("hidden");

        projectsBackBtn.classList.remove("hidden");

        projectsStatus.classList.add("hidden");

        projectsPath.textContent = "> Serene Harmony";

    });

}
/* =========================================================
   PLAYREAL PROJECT
========================================================= */

const playrealProject =
    document.getElementById("playrealProject");

const playrealPage =
    document.getElementById("playrealPage");


if (playrealProject && playrealPage) {

    playrealProject.addEventListener("click", () => {

        /* Explorer'ı kapat */

        projectsExplorer.classList.add("hidden");


        /* PLAYREAL sayfasını aç */

        playrealPage.classList.remove("hidden");
        const playrealUseVideo =
    document.getElementById("playrealUseVideo");

if(playrealUseVideo){

    playrealUseVideo.pause();

    playrealUseVideo.currentTime = 0;

    playrealUseVideo.muted = true;

    playrealUseVideo.play().catch(() => {});

}


        /* Geri butonu */

        projectsBackBtn.classList.remove("hidden");


        /* Status bar */

        projectsStatus.classList.add("hidden");


        /* Breadcrumb */

        projectsPath.textContent = "> PLAYREAL";


        /* -------------------------------------------------
           RESTART OPENING ANIMATION
        ------------------------------------------------- */

        playrealPage.classList.remove("playreal-entering");


        /* Browser'ın animasyonu yeniden başlatması için */

        void playrealPage.offsetWidth;


        /* Animasyonu başlat */

        playrealPage.classList.add("playreal-entering");


        /* -------------------------------------------------
           Scroll'u en üste al
        ------------------------------------------------- */

        playrealPage.scrollTop = 0;
        setupPlayrealProductReveal();
        setTimeout(() => {

    if(productReveal){

        productReveal.classList.remove(
            "product-visible"
        );

        void productReveal.offsetWidth;

    }

}, 100);


        /* -------------------------------------------------
           Sayfa açıldıktan sonra animation class'ını
           kaldır.
           
           Böylece tekrar açıldığında yeniden çalışabilir.
        ------------------------------------------------- */

        

    });

}
/* =========================================================
   HUMAN & DOG PROJECT
========================================================= */

const humanDogProject =
    document.getElementById("humanDogProject");

const humanDogPage =
    document.getElementById("humanDogPage");


if (humanDogProject && humanDogPage) {

    humanDogProject.addEventListener("click", () => {

        /* Projects listesini gizle */
        projectsExplorer.classList.add("hidden");

        /* Human & Dog sayfasını aç */
        humanDogPage.classList.remove("hidden");

        /* Back butonunu göster */
        projectsBackBtn.classList.remove("hidden");

        /* Status barı gizle */
        projectsStatus.classList.add("hidden");

        /* Breadcrumb */
        projectsPath.textContent = "> Human & Dog";

        /* Sayfayı en üste al */
        humanDogPage.scrollTop = 0;

    });

}
/* =========================================================
   UNDUST PROJECT
========================================================= */

const undustProject =
    document.getElementById("undustProject");

const undustPage =
    document.getElementById("undustPage");


if (undustProject && undustPage) {

    undustProject.addEventListener("click", () => {

        projectsExplorer.classList.add("hidden");

        undustPage.classList.remove("hidden");

        projectsBackBtn.classList.remove("hidden");

        projectsStatus.classList.add("hidden");

        projectsPath.textContent = "> UNDUST";

        undustPage.scrollTop = 0;

    });

}
/* =========================================================
   SCENE BITES PROJECT
========================================================= */

const sceneBitesProject =
    document.getElementById("sceneBitesProject");

const sceneBitesPage =
    document.getElementById("sceneBitesPage");


if (sceneBitesProject && sceneBitesPage) {

    sceneBitesProject.addEventListener("click", () => {

        /* Projects Explorer'ı kapat */

        projectsExplorer.classList.add("hidden");


        /* Scene Bites sayfasını aç */

        sceneBitesPage.classList.remove("hidden");
        const figmaFrame = sceneBitesPage.querySelector("iframe[data-src]");

if (figmaFrame && !figmaFrame.src) {
    figmaFrame.src = figmaFrame.dataset.src;
}


        /* Geri butonunu göster */

        projectsBackBtn.classList.remove("hidden");


        /* Status bar'ı gizle */

        projectsStatus.classList.add("hidden");


        /* Breadcrumb */

        projectsPath.textContent = "> Scene Bites";


        /* Sayfayı en üste al */

        sceneBitesPage.scrollTop = 0;

    });

}
/* =========================================================
   NIKE — EVERYDAY GREATNESS
========================================================= */

const nikeProject =
    document.getElementById("nikeProject");

const nikePage =
    document.getElementById("nikePage");


if (nikeProject && nikePage) {

    nikeProject.addEventListener("click", () => {

        /* Projects Explorer'ı kapat */
        projectsExplorer.classList.add("hidden");

        /* Nike sayfasını aç */
        nikePage.classList.remove("hidden");
        loadProjectImages(nikePage);

        /* Back butonunu göster */
        projectsBackBtn.classList.remove("hidden");

        /* Status bar'ı gizle */
        projectsStatus.classList.add("hidden");

        /* Breadcrumb */
        projectsPath.textContent = "> NIKE";

        /* Sayfayı en üste al */
        nikePage.scrollTop = 0;

    });

}
/* ==========================
   KOR PROJECT
========================== */

const korProject = document.getElementById("korProject");
const korPage = document.getElementById("korPage");

korProject.addEventListener("click",()=>{

    projectsExplorer.classList.add("hidden");

    korPage.classList.remove("hidden");

    projectsBackBtn.classList.remove("hidden");

    projectsStatus.classList.add("hidden");

    projectsPath.textContent="> KOR";

});
projectsBackBtn.addEventListener("click", () => {

    stopAllProjectVideos();


    /* =========================================
       MOBILE
    ========================================= */

    if (document.documentElement.clientWidth <= 600) {

        /* Proje sayfalarını kapat */

        document
            .querySelectorAll(
                "#journiPage, #korPage, #serenePage, #playrealPage, #humanDogPage, #undustPage, #sceneBitesPage, #nikePage"
            )
            .forEach(page => {

                page.classList.add("hidden");

            });


        /* Proje penceresini kapat */

        if (projectsWindow) {
            projectsWindow.classList.add("hidden");
        }


        /* Selected Works listesini tekrar aç */

        if (mobileProjects) {
            mobileProjects.classList.add("open");
        }


        /* Üstteki ana mobil bar geri gelsin */

        document.body.classList.remove("mobile-project-active");


        /* Design Student Life geri gelsin */

        const musicInfo =
            document.getElementById("musicInfo");

        if (musicInfo) {
            musicInfo.style.display = "";
        }


        projectsBackBtn.classList.add("hidden");
        projectsPath.textContent = "";

        return;
    }


    /* =========================================
       DESKTOP — ESKİ SİSTEM
    ========================================= */

    journiPage.classList.add("hidden");
    korPage.classList.add("hidden");
    serenePage.classList.add("hidden");
    playrealPage.classList.add("hidden");
    humanDogPage.classList.add("hidden");
    undustPage.classList.add("hidden");
    sceneBitesPage.classList.add("hidden");
    nikePage.classList.add("hidden");

    projectsExplorer.classList.remove("hidden");

    projectsStatus.classList.remove("hidden");

    projectsBackBtn.classList.add("hidden");

    projectsPath.textContent = "";

});
const appScreens = [

    {
        image: "assets/journi/app/explore.png",
        title: "Explore",
        description: "Explore your memories on the interactive map."
    },

    {
        image: "assets/journi/app/details.png",
        title: "Details",
        description: "View every destination with photos and collected memories."
    },

    {
        image: "assets/journi/app/memory.png",
        title: "Memory",
        description: "Save photos, notes and souvenirs from every journey."
    },

    {
        image: "assets/journi/app/pockets.png",
        title: "Manage Pockets",
        description: "Organize every souvenir inside the physical kit."
    },

    {
        image: "assets/journi/app/profile.png",
        title: "Profile",
        description: "Track your travel history and achievements."
    }

];
const appImage = document.getElementById("appScreen");
const appTitle = document.getElementById("screenTitle");
const appDescription = document.getElementById("screenDescription");
const appCounter = document.querySelector(".screen-count");

const dots = document.querySelectorAll(".screen-dot");

let currentScreen = 0;

function showScreen(index){

    currentScreen = index;
    const phone = document.getElementById("appScreen");
const info = document.querySelector(".app-info");

phone.classList.add("switching");
info.classList.add("switching");

    appImage.style.opacity = 0;

    setTimeout(()=>{

        appImage.src = appScreens[index].image;

        appTitle.textContent = appScreens[index].title;

        appDescription.textContent = appScreens[index].description;

        appCounter.textContent = `${index+1} / ${appScreens.length}`;

        dots.forEach(dot=>dot.classList.remove("active"));

        dots[index].classList.add("active");
        phone.classList.remove("switching");
info.classList.remove("switching");

        appImage.style.opacity = 1;

    },200);

}

dots.forEach(dot=>{

    dot.addEventListener("click",()=>{

        showScreen(Number(dot.dataset.screen));

    });

});

showScreen(0);
/*========================================
AUTO APP SLIDER
========================================*/

let autoSlide = true;
let autoTimer;

function startAutoSlide(){

    clearInterval(autoTimer);

    autoTimer = setInterval(()=>{

        if(!autoSlide) return;

        let next = currentScreen + 1;

        if(next >= appScreens.length){

            next = 0;

        }

        showScreen(next);

    },3000);

}

startAutoSlide();

dots.forEach(dot=>{

    dot.addEventListener("click",()=>{

        showScreen(Number(dot.dataset.screen));

        autoSlide = false;

        clearInterval(autoTimer);

        setTimeout(()=>{

            autoSlide = true;

            startAutoSlide();

        },6000);

    });

});



/*========================================
JOURNI VIDEO AUTOPLAY
========================================*/

/*========================================
JOURNI VIDEO AUTOPLAY
========================================*/

const journiVideo = document.getElementById("journiVideo");

if (journiVideo) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                /* Video ilk kez görünüyorsa yükle */
                if (journiVideo.readyState === 0) {
                    journiVideo.load();
                }

                journiVideo.play().catch(() => {});

            } else {

                journiVideo.pause();

            }

        });

    }, {
        threshold: 0.25
    });

    observer.observe(journiVideo);
}
/*========================================
VIDEO SOUND
========================================*/

const soundBtn = document.getElementById("soundToggle");

if(soundBtn && journiVideo){

    soundBtn.addEventListener("click",()=>{

        journiVideo.muted = !journiVideo.muted;

        if(journiVideo.muted){

            soundBtn.textContent = "🔇 Sound Off";

        }else{

            soundBtn.textContent = "🔊 Sound On";

        }

    });

}
/*========================================
PROJECT ARCHIVE CONTACT
========================================*/

const archiveBtn = document.getElementById("archiveContactBtn");

if (archiveBtn) {

    archiveBtn.addEventListener("click", () => {

        // Eğer Projects penceresi açıksa kapat
        projectsWindow.classList.add("hidden");

        // Contact penceresini aç
        jumpOpen(contactWindow);

    });

}
/*========================================
LIGHTBOX
========================================*/

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(
   ".research-board img, .visual-grid img, .production-block img, .exhibition-hero img, .exhibition-grid img, .presentation-photo img, .serene-idea-image img, .serene-collection-visual img, .serene-piece img, .serene-final-product img, .serene-in-use-image img,.serene-details img, " +
".serene-final-product img, .group-poster-image, .playreal-idea-visual img, .hd-sheet-image img, .dustiny-lightbox-image, .sketch-main img, .sketch-detail img, .sketch-development img,  .dustiny-mindmap, .scenebites-interface-screen img"
).forEach(img=>{

    img.addEventListener("click",()=>{

        lightboxImg.src = img.dataset.deferredSrc || img.src;

        lightbox.classList.add("show");

    });

});

lightboxClose.onclick = ()=>{

    lightbox.classList.remove("show");

};

lightbox.onclick = (e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("show");

    }

};
/*========================================
ABOUT REVEAL
========================================*/

const revealPanels = document.querySelectorAll(".reveal-panel");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            const title = entry.target.querySelector(".chapter-title");

            if(title){

                typeWriter(title);

            }

        }

    });

},{
    root: document.querySelector(".about-content"),
    threshold:0.15
});

revealPanels.forEach(panel=>{

    revealObserver.observe(panel);

});
/*========================================
JOURNI REVEAL
========================================*/

const journiReveal = document.querySelectorAll(".journi-reveal");

const journiObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    root:document.querySelector("#journiWindow .window-content"),
    threshold:.2
});

journiReveal.forEach(item=>{

    journiObserver.observe(item);

});
/* ==========================
   KOR LOADING
========================== */

korProject.addEventListener("click",()=>{

    const progress=document.getElementById("korProgress");

    const granted=document.getElementById("korGranted");

    setTimeout(()=>{

    progress.style.width="100%";

},100);

    setTimeout(()=>{

        granted.style.opacity="1";

    },1800);

    setTimeout(()=>{

        document.getElementById("korLoading").style.display="none";

    },2500);

});
/* ==================================================
   KOR TEAM VIDEO SOUND
================================================== */

const korTeamVideo =
    document.getElementById("korTeamVideo");

const korSoundBtn =
    document.getElementById("korSoundBtn");


if(korTeamVideo && korSoundBtn){

    korSoundBtn.addEventListener("click", () => {

        korTeamVideo.muted =
            !korTeamVideo.muted;

        korSoundBtn.textContent =
            korTeamVideo.muted
                ? "🔇"
                : "🔊";

    });

}
if (korTeamVideo) {

    const korVideoObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                korTeamVideo.play().catch(() => {});
            } else {
                korTeamVideo.pause();
            }

        });

    }, {
        threshold: 0.35
    });

    korVideoObserver.observe(korTeamVideo);

}
/* ==================================================
   KOR — SMOOTH UNIT SCROLL
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const korLinks = document.querySelectorAll(
        '.kor-ecosystem-card[href^="#"]'
    );

    korLinks.forEach(link => {

        link.addEventListener("click", function(e){

            const targetId = this.getAttribute("href");

            const target = document.querySelector(targetId);

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});
// KOR PROJECT ARCHIVE → CONTACT

const korArchiveBtn = document.querySelector(".kor-archive-link");

if (korArchiveBtn) {

    korArchiveBtn.addEventListener("click", () => {

        projectsWindow.classList.add("hidden");

        jumpOpen(contactWindow);

    });

}
/* ==================================================
   SERENE HARMONY — INTERACTIONS
================================================== */




/* ==================================================
   SERENE HARMONY — INTERACTIONS
================================================== */

if (typeof sereneRevealItems !== "undefined") {

    sereneRevealItems.forEach(item => {

        item.classList.add("serene-reveal");

        sereneRevealObserver.observe(item);

    });

}


/* ==================================================
   SERENE CONTACT
================================================== */

const sereneContactBtn =
    document.getElementById("sereneContactBtn");

if (sereneContactBtn) {

    sereneContactBtn.addEventListener("click", () => {

        const contactWindow =
            document.getElementById("contactWindow");

        if (contactWindow) {

            contactWindow.classList.remove("hidden");

            contactWindow.style.zIndex = ++highestZ;

        }

    });

}


/* ==================================================
   HERO MOUSE PARALLAX
================================================== */

const sereneHero =
    document.querySelector("#serenePage .serene-hero");

const sereneHeroBg =
    document.querySelector("#serenePage .serene-hero-bg img");


if (sereneHero && sereneHeroBg) {

    sereneHero.addEventListener("mousemove", (event) => {

        const rect =
            sereneHero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        sereneHeroBg.style.transform =
            `scale(1.035) translate(${x * 8}px, ${y * 8}px)`;

    });


    sereneHero.addEventListener("mouseleave", () => {

        sereneHeroBg.style.transform =
            "scale(1.035) translate(0,0)";

    });

}
/* =========================================================
   SERENE HARMONY — SCROLL INTERACTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const serenePage = document.getElementById("serenePage");

    if (!serenePage) return;


    /* -----------------------------------------
       SCROLL REVEAL
       ----------------------------------------- */



    /* -----------------------------------------
       HERO PARALLAX
       ----------------------------------------- */

    const hero = serenePage.querySelector(".serene-hero");
    const heroImage = serenePage.querySelector(".serene-hero-bg img");
    const heroContent = serenePage.querySelector(".serene-hero-content");

    function updateHero() {

        if (!hero || !heroImage || !heroContent) return;

        const rect = hero.getBoundingClientRect();

        const progress =
            Math.min(
                Math.max(-rect.top / rect.height, 0),
                1
            );


        /* Background */
        const scale =
            1.06 + (progress * 0.08);

        const imageY =
            progress * 60;

        heroImage.style.transform =
            `translateY(${imageY}px) scale(${scale})`;


        /* Text */
        const contentY =
            progress * -45;

        const contentOpacity =
            1 - (progress * 1.2);

        heroContent.style.transform =
            `translateY(${contentY}px)`;

        heroContent.style.opacity =
            Math.max(contentOpacity, 0);
    }


    window.addEventListener(
        "scroll",
        updateHero,
        { passive: true }
    );


    updateHero();


    /* -----------------------------------------
       STAGGER COLLECTION PIECES
       ----------------------------------------- */

    const pieces = serenePage.querySelectorAll(
        ".serene-piece"
    );


    pieces.forEach((piece, index) => {

        piece.style.transitionDelay =
            `${index * 120}ms`;

    });


    /* -----------------------------------------
       STAGGER FINAL PRODUCTS
       ----------------------------------------- */

    const finalProducts =
        serenePage.querySelectorAll(
            ".serene-final-product"
        );


    finalProducts.forEach((product, index) => {

        product.style.transitionDelay =
            `${index * 130}ms`;

    });


    /* -----------------------------------------
       STAGGER PROCESS BLOCKS
       ----------------------------------------- */

    const processBlocks =
        serenePage.querySelectorAll(
            ".serene-process-block"
        );


    processBlocks.forEach((block, index) => {

        block.style.transitionDelay =
            `${index * 100}ms`;

    });

});
/* =========================================================
   PLAYREAL — 01A / 01B INTERACTIONS
========================================================= */


/* =========================================================
   01A — WELLBEING
========================================================= */

const wellbeingSection =
    document.getElementById("playrealWellbeing");

const wellbeingWords =
    document.querySelectorAll(".wellbeing-word");

const wellbeingInfo =
    document.getElementById("wellbeingHoverInfo");


if (wellbeingSection) {

    const wellbeingObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        wellbeingSection.classList.add(
                            "wellbeing-visible"
                        );

                    }

                });

            },
            {
                threshold:0.12
            }
        );

    wellbeingObserver.observe(
        wellbeingSection
    );

}


/* =========================================================
   01A — HOVER INTERACTION
========================================================= */

const wellbeingCenter = document.querySelector(".wellbeing-center");
const centerTitle = document.querySelector(".wellbeing-center span");
const centerInfo = document.querySelector(".wellbeing-center small");


wellbeingWords.forEach((word) => {

    word.addEventListener("mouseenter", () => {

        const dimension = word.textContent.trim();
        const info = word.dataset.info || "";

        /* Aktif kelime */
        wellbeingWords.forEach(item => {
            item.classList.remove("dimension-selected");
        });

        word.classList.add("dimension-selected");

        /* ORTA DAİRE */
        if (centerTitle) {
            centerTitle.textContent = dimension;
        }
        centerTitle.style.opacity = "0";

setTimeout(() => {
    centerTitle.textContent = dimension;
    centerTitle.style.opacity = "1";
}, 120);

        if (centerInfo) {

    centerInfo.style.opacity = "0";

    setTimeout(() => {
        centerInfo.textContent = info;
        centerInfo.style.opacity = "1";
    }, 120);

}

        /* EXPLORE */
        if (wellbeingInfo) {
            wellbeingInfo.innerHTML = `
                <span>EXPLORE</span>
                <strong>${info}</strong>
            `;
        }

    });

    word.addEventListener("mouseleave", () => {

        word.classList.remove("dimension-selected");

        /* ORİJİNAL HALİNE DÖN */
        if (centerTitle) {
            centerTitle.textContent = "WELLBEING";
        }

        if (centerInfo) {
            centerInfo.textContent = "MOVE · CONNECT · BREATHE";
        }

        /* EXPLORE */
        if (wellbeingInfo) {
            wellbeingInfo.innerHTML = `
                <span>EXPLORE</span>
                <strong>HOVER A DIMENSION</strong>
            `;
        }

    });

});


/* =========================================================
   01B — DIGITAL WELLBEING
========================================================= */

function activatePlayrealSections() {

    const digitalSection =
        document.getElementById(
            "playrealDigitalWellbeing"
        );


    if (!digitalSection) return;


    const digitalObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        digitalSection.classList.add(
                            "digital-visible"
                        );

                    }

                });

            },
            {
                threshold:0.08
            }
        );


    digitalObserver.observe(
        digitalSection
    );

}


/* =========================================================
   START 01B OBSERVER
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        activatePlayrealSections
    );

} else {

    activatePlayrealSections();

}
/* =========================================================
   PLAYREAL — PRODUCT ENTER REVEAL
========================================================= */

function setupPlayrealProductReveal(){

    const product =
        document.querySelector(".how-product-image");

    const page =
        document.getElementById("playrealPage");


    if(!product || !page) return;


    /* Her açılışta efekti sıfırla */

    product.classList.remove(
        "product-visible"
    );


    /*
       PRODUCT alanı PlayReal'ın
       görünür ekranına girdiğinde
       efekti başlat.
    */

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if(entry.isIntersecting){

                        product.classList.add(
                            "product-visible"
                        );

                        observer.unobserve(
                            product
                        );

                    }

                });

            },

            {
                root:page,
                threshold:0.35
            }

        );


    observer.observe(product);
}
/* =========================================================
   GLOBAL VIDEO RESET
   Stops and resets all project videos when leaving a page
========================================================= */

function stopAllProjectVideos(){

    document.querySelectorAll("video").forEach(video => {

        video.pause();

        video.muted = true;

        try {
            video.currentTime = 0;
        } catch(e) {}

    });

}
/* =====================================================
   SCENE BITES — USE EXISTING GLOBAL LIGHTBOX
===================================================== */

document.addEventListener("click", function (event) {

    const screen =
        event.target.closest(
            ".scenebites-interface-screen"
        );

    if (!screen) return;


    const img =
        screen.querySelector("img");

    if (!img) return;


    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.getElementById("lightboxImg");


    if (!lightbox || !lightboxImg) return;


    lightboxImg.src = img.src;

    lightboxImg.alt =
        img.alt || "Scene Bites Interface";


    lightbox.classList.add("show");

});
document.addEventListener("click", function (e) {
    const img = e.target.closest(".scenebites-interface-screen img");

    if (!img) return;

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = img.src;
    lightbox.classList.add("show");
});
/* =========================================================
   SKETCHBOOK — CLEAN SYSTEM
========================================================= */

(function () {

    const icon = document.getElementById("sketchbook");
    const lightbox = document.getElementById("sketchbookLightbox");
    const closeBtn = document.getElementById("sketchbookClose");

    const leftPage = document.getElementById("sketchLeft");
    const rightPage = document.getElementById("sketchRight");

    const nextBtn = document.getElementById("sketchNext");
    const prevBtn = document.getElementById("sketchPrev");

    const turnPage = document.getElementById("sketchTurnPage");
    const turnFront = document.getElementById("sketchTurnFront");
    const turnBack = document.getElementById("sketchTurnBack");

    const ecemPet = document.getElementById("ecemPet");


    /* =====================================================
       IMAGES
    ===================================================== */

    const pages = [
    "assets/sketchbook/sketch-01.jpeg",
    "assets/sketchbook/sketch-02.mp4",
    "assets/sketchbook/sketch-03.jpeg",
    "assets/sketchbook/sketch-04.jpeg",
    "assets/sketchbook/sketch-05.jpeg",
    "assets/sketchbook/sketch-06.jpeg",
    "assets/sketchbook/sketch-07.jpeg",
    "assets/sketchbook/sketch-08.jpeg"
];


    let current = 0;
    let flipping = false;


    /* =====================================================
       UPDATE
    ===================================================== */

    function updatePages() {

    if (!leftPage || !rightPage) return;


    /* =====================================================
       SAYFAYI RENDER ET
    ===================================================== */

    function renderPage(img, src) {

        if (!img) return;

        const parent = img.parentElement;

        if (!parent) return;


        /* ---------------------------------------------
           ÖNCE BU SAYFADAKİ ESKİ VİDEOYU TEMİZLE
        --------------------------------------------- */

        const oldVideo =
            parent.querySelector(
                ".sketchbook-video"
            );

        if (oldVideo) {

            oldVideo.pause();

            oldVideo.currentTime = 0;

            oldVideo.remove();

        }


        /* ---------------------------------------------
           NORMAL IMAGE
        --------------------------------------------- */

        if (
            !src ||
            !src.toLowerCase().endsWith(".mp4")
        ) {

            img.style.display = "block";

            img.src = src;

            return;

        }


        /* ---------------------------------------------
           VIDEO
        --------------------------------------------- */

        /* IMG'Yİ TAMAMEN GİZLE */

        img.style.display = "none";

        img.removeAttribute("src");


        const video =
            document.createElement("video");


        video.className =
            "sketchbook-video";


        video.src = src;

        video.autoplay = true;

        video.loop = true;

        video.playsInline = true;

        video.muted = true;

        video.preload = "auto";


        parent.appendChild(video);


        /* ---------------------------------------------
           OYNAT
        --------------------------------------------- */

        video.play().catch(() => {});

    }


    /* =====================================================
       SOL SAYFA
    ===================================================== */

    renderPage(
        leftPage,
        pages[current]
    );


    /* =====================================================
       SAĞ SAYFA
    ===================================================== */

    if (pages[current + 1]) {

        rightPage.style.display =
            "block";

        renderPage(
            rightPage,
            pages[current + 1]
        );

    } else {

        rightPage.style.display =
            "none";

    }


    /* =====================================================
       NUMARALAR
    ===================================================== */

    const leftNumber =
        document.getElementById(
            "sketchLeftNumber"
        );

    const rightNumber =
        document.getElementById(
            "sketchRightNumber"
        );

    const counter =
        document.getElementById(
            "sketchCounter"
        );


    if (leftNumber) {

        leftNumber.textContent =
            String(current + 1)
                .padStart(2, "0");

    }


    if (rightNumber) {

        rightNumber.textContent =
            String(current + 2)
                .padStart(2, "0");

    }


    if (counter) {

        counter.textContent =
            String(current + 1)
                .padStart(2, "0")
            + " — " +
            String(current + 2)
                .padStart(2, "0");

    }

}


    /* =====================================================
       SOUND
    ===================================================== */

    function flipSound() {

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) return;

            const ctx = new AudioContext();

            if (ctx.state === "suspended") {
                ctx.resume();
            }

            const duration = 0.16;

            const buffer =
                ctx.createBuffer(
                    1,
                    ctx.sampleRate * duration,
                    ctx.sampleRate
                );

            const data =
                buffer.getChannelData(0);

            for (let i = 0; i < data.length; i++) {

                const fade =
                    1 - i / data.length;

                data[i] =
                    (Math.random() * 2 - 1)
                    * fade
                    * 0.10;
            }

            const source =
                ctx.createBufferSource();

            const filter =
                ctx.createBiquadFilter();

            const gain =
                ctx.createGain();

            filter.type = "bandpass";
            filter.frequency.value = 1100;
            filter.Q.value = 0.8;

            gain.gain.value = 0.45;

            source.buffer = buffer;

            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            source.start();

        } catch (error) {

            console.log(
                "Sketchbook sound unavailable:",
                error
            );

        }

    }


    /* =====================================================
       OPEN
    ===================================================== */

    function openSketchbook() {

        current = 0;
        flipping = false;

        updatePages();

        if (turnPage) {

            turnPage.classList.remove("active");

            turnPage.style.animation = "none";

            turnPage.style.transform =
                "rotateY(0deg)";
        }

        if (lightbox) {
            lightbox.classList.add("show");
        }

        if (ecemPet) {
            ecemPet.classList.add("sketchbook-active");
        }

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    function closeSketchbook() {
        document
    .querySelectorAll(
        "#sketchbookLightbox .sketchbook-video"
    )
    .forEach(function(video) {

        video.pause();

        video.currentTime = 0;

    });

        if (lightbox) {
            lightbox.classList.remove("show");
        }

        if (turnPage) {

            turnPage.classList.remove("active");

            turnPage.style.animation = "none";

            turnPage.style.transform =
                "rotateY(0deg)";
        }

        flipping = false;

        if (ecemPet) {
            ecemPet.classList.remove("sketchbook-active");
        }

    }


    /* =====================================================
       FLIP
    ===================================================== */
/* =========================================================
   SKETCHBOOK — PHYSICAL SWIPE
========================================================= */

/* =========================================================
   SKETCHBOOK — PAPER REVEAL + VIDEO
========================================================= */

function flip(direction) {

    if (flipping) return;

    const isNext = direction === "next";

    /* -----------------------------------------
       TARGET
    ----------------------------------------- */

    if (isNext) {

        if (current + 2 >= pages.length) {
            return;
        }

    } else {

        if (current - 2 < 0) {
            return;
        }

    }

    const target =
        isNext
            ? current + 2
            : current - 2;


    /* -----------------------------------------
       BOOK
    ----------------------------------------- */

    const book =
        document.querySelector(
            "#sketchbookLightbox .sketchbook-book"
        );

    if (!book) {

        current = target;

        updatePages();

        return;

    }


    flipping = true;

    flipSound();


    /* -----------------------------------------
       YENİ SPREAD
    ----------------------------------------- */

    const newSpread =
        document.createElement("div");

    newSpread.className =
        isNext
            ? "paper-reveal next"
            : "paper-reveal prev";


    /* -----------------------------------------
       SAYFA OLUŞTUR
    ----------------------------------------- */

    function createPage(src, side) {

        const page =
            document.createElement("div");

        page.className =
            "paper-reveal-page " + side;


        /* VIDEO */

        if (
            src &&
            src.toLowerCase().endsWith(".mp4")
        ) {

            const video =
                document.createElement("video");

            video.className =
                "sketchbook-video";

            video.src = src;

            video.autoplay = true;

            video.loop = true;

            video.playsInline = true;

            video.muted = true;

            video.preload = "auto";

            page.appendChild(video);


            /* Yeni spread görünür olur olmaz oynat */

            video.play().catch(() => {});


        }

        /* IMAGE */

        else {

            const img =
                document.createElement("img");

            img.src = src;

            img.alt = "Sketchbook page";

            page.appendChild(img);

        }


        return page;

    }


    newSpread.appendChild(
        createPage(
            pages[target],
            "left"
        )
    );

    newSpread.appendChild(
        createPage(
            pages[target + 1],
            "right"
        )
    );


    book.appendChild(newSpread);


    /* -----------------------------------------
       ESKİ STATİK SAYFALARI GİZLE
    ----------------------------------------- */

    const staticPages =
        book.querySelectorAll(
            ".sketchbook-page"
        );

    staticPages.forEach(page => {

        page.style.visibility =
            "hidden";

    });


    /* -----------------------------------------
       ANIMATION
    ----------------------------------------- */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            newSpread.classList.add("show");

        });

    });


    /* -----------------------------------------
       FINISH
       420ms İLE AYNI
    ----------------------------------------- */

    setTimeout(() => {

        /* Önce videoları temizle */

        newSpread
            .querySelectorAll("video")
            .forEach(video => {

                video.pause();

                video.currentTime = 0;

            });


        newSpread.remove();


        /* Yeni sayfaya geç */

        current = target;

        updatePages();


        /* Statik sayfaları geri getir */

        staticPages.forEach(page => {

            page.style.visibility =
                "";

        });


        flipping = false;

    }, 420);

}
    


    /* =====================================================
       ICON
    ===================================================== */

    if (icon) {

        icon.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                openSketchbook();

            }
        );

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                closeSketchbook();

            }
        );

    }


    /* =====================================================
       BUTTONS
    ===================================================== */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                flip("next");

            }
        );

    }


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                flip("prev");

            }
        );

    }


    /* =====================================================
       PAGE CLICK
    ===================================================== */

    if (rightPage) {

        rightPage.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                flip("next");

            }
        );

    }


    if (leftPage) {

        leftPage.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                flip("prev");

            }
        );

    }


    /* =====================================================
       OUTSIDE CLICK
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (e) {

                if (e.target === lightbox) {
                    closeSketchbook();
                }

            }
        );

    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (e) {

            if (
                !lightbox ||
                !lightbox.classList.contains("show")
            ) {
                return;
            }


            if (e.key === "Escape") {
                closeSketchbook();
            }


            if (e.key === "ArrowRight") {
                flip("next");
            }


            if (e.key === "ArrowLeft") {
                flip("prev");
            }

        }
    );


    /* =====================================================
       START
    ===================================================== */

    updatePages();

    console.log(
        "SKETCHBOOK — CLEAN SYSTEM READY"
    );

})();
/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");

if (mobileMenuBtn && mobileMenu) {

    mobileMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.add("open");
        mobileMenuBackdrop?.classList.add("open");
    });

}

if (mobileMenuClose) {

    mobileMenuClose.addEventListener("click", function () {

        mobileMenu.classList.remove("open");
        mobileMenuBackdrop?.classList.remove("open");

        if (projectsWindow) {
            projectsWindow.classList.add("hidden");
        }

    });

}

if (mobileMenuBackdrop) {

    mobileMenuBackdrop.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        mobileMenuBackdrop.classList.remove("open");
    });

}
/* =========================================================
   MOBILE SELECTED WORKS — FINAL
========================================================= */

const mobileProjects =
    document.getElementById("mobileProjects");

const mobileProjectsClose =
    document.getElementById("mobileProjectsClose");
const mobileProjectsBack =
    document.getElementById("mobileProjectsBack");
    

const mobileSelectedWorks =
    document.querySelector(
        '.mobile-menu a[href="#mobile-selected"]'
    );


/* =========================================
   OPEN SELECTED WORKS
========================================= */

function openMobileProjects() {

    if (!mobileProjects) return;

    if (mobileMenu) {
        mobileMenu.classList.remove("open");
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.remove("open");
    }

    mobileProjects.classList.add("open");
}


/* =========================================
   CLOSE SELECTED WORKS
========================================= */

function closeMobileProjects() {

    if (!mobileProjects) return;

    mobileProjects.classList.remove("open");
}


/* =========================================
   SELECTED WORKS MENU BUTTON
========================================= */

if (mobileSelectedWorks) {

    mobileSelectedWorks.addEventListener("click", function(e) {

        e.preventDefault();
        e.stopPropagation();

        openMobileProjects();

    });

}


/* =========================================
   CLOSE BUTTON
========================================= */

if (mobileProjectsClose) {

    mobileProjectsClose.addEventListener("click", function(e) {

        e.preventDefault();
        e.stopPropagation();

        closeMobileProjects();

    });

}
/* =========================================
   BACK TO MOBILE MENU
========================================= */

if (mobileProjectsBack) {

    mobileProjectsBack.addEventListener("click", function(e) {

        e.preventDefault();
        e.stopPropagation();

        closeMobileProjects();

        if (mobileMenu) {
            mobileMenu.classList.add("open");
        }

        if (mobileMenuBackdrop) {
            mobileMenuBackdrop.classList.add("open");
        }

    });

}


/* =========================================
   MOBILE PROJECTS
========================================= */

document
    .querySelectorAll(".mobile-project")
    .forEach(function(button) {

        button.addEventListener("click", function(e) {

            e.preventDefault();
            e.stopPropagation();

            const projectId =
                button.dataset.project;

            const realProject =
                document.getElementById(projectId);

            if (!realProject) return;


            /* Mobil listeyi kapat */

            closeMobileProjects();


            /*
             * ÖNEMLİ:
             * projectsWindow'ı GİZLEMİYORUZ.
             * Çünkü Journi ve diğer proje sayfaları
             * onun içinde bulunuyor.
             */

            if (projectsWindow) {
                projectsWindow.classList.remove("hidden");
            }


            /*
             * Mevcut desktop proje sistemini kullan.
             * Böylece Journi'nin kendi açılma kodu çalışır.
             */

            realProject.click();

        });

    });
    
/* =========================================================
   MOBILE PROJECT — SWIPE BACK
   LEFT → RIGHT = BACK TO SELECTED WORKS
========================================================= */

let backSwipeStartX = 0;
let backSwipeStartY = 0;
let backSwipeTracking = false;

document.addEventListener("touchstart", function (e) {

    if (document.documentElement.clientWidth > 600) {
        return;
    }

    const activeProject = document.querySelector(
        "#journiPage:not(.hidden), " +
        "#korPage:not(.hidden), " +
        "#serenePage:not(.hidden), " +
        "#playrealPage:not(.hidden), " +
        "#humanDogPage:not(.hidden), " +
        "#undustPage:not(.hidden), " +
        "#sceneBitesPage:not(.hidden), " +
        "#nikePage:not(.hidden)"
    );

    if (!activeProject) {
        backSwipeTracking = false;
        return;
    }

    const touch = e.touches[0];

    backSwipeStartX = touch.clientX;
    backSwipeStartY = touch.clientY;

    backSwipeTracking = true;

}, { passive: true });


document.addEventListener("touchend", function (e) {

    if (
        document.documentElement.clientWidth > 600 ||
        !backSwipeTracking
    ) {
        return;
    }

    backSwipeTracking = false;

    const touch = e.changedTouches[0];

    const deltaX =
        touch.clientX - backSwipeStartX;

    const deltaY =
        touch.clientY - backSwipeStartY;


    /*
       Yukarı / aşağı scroll ise dokunma.
    */

    if (
        Math.abs(deltaX) < 100 ||
        Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
        return;
    }


    /*
       SADECE SOL → SAĞ
    */

    if (deltaX <= 0) {
        return;
    }


    /*
       PROJE SAYFALARINI KAPAT
    */

    const projectPages = document.querySelectorAll(
        "#journiPage, " +
        "#korPage, " +
        "#serenePage, " +
        "#playrealPage, " +
        "#humanDogPage, " +
        "#undustPage, " +
        "#sceneBitesPage, " +
        "#nikePage"
    );

    projectPages.forEach(page => {

        page.classList.add("hidden");

    });


    /*
       MOBİL SELECTED WORKS LİSTESİNİ AÇ
    */

    if (mobileProjects) {

        mobileProjects.classList.add("open");

    }


    /*
       BACK BUTONUNU GİZLE
    */

    if (projectsBackBtn) {

        projectsBackBtn.classList.add("hidden");

    }


    /*
       BREADCRUMB TEMİZLE
    */

    if (projectsPath) {

        projectsPath.textContent = "";

    }


    /*
       DESIGN STUDENT LIFE ANA EKRANDA GERİ GELSİN
    */

    const musicInfo =
        document.getElementById("musicInfo");

    if (musicInfo) {

        musicInfo.style.display = "";

    }

});
/* =========================================================
   PROJECT VIDEOS — LOAD ONLY WHEN PROJECT OPENS
========================================================= */

function prepareProjectVideos(projectPage) {

    if (!projectPage) return;

    const videos =
        projectPage.querySelectorAll("video");

    videos.forEach(video => {

        video.preload = "metadata";

        /*
         * Proje açıldığında autoplay olan videoları
         * yeniden başlat.
         */
        if (
            video.dataset.autoPlay === "true"
        ) {

            video.play().catch(() => {});

        }

    });

}
/* =========================================================
   PROJECT IMAGE LOADER
   Keep hidden project images from loading on startup.
   Load them immediately when the project is opened.
========================================================= */

function loadProjectImages(page) {

    if (!page) return;

    const images = page.querySelectorAll("img[data-deferred-src]");

    images.forEach((img, index) => {

        if (index < 3) {

            if (!img.src || img.src === window.location.href) {
                img.src = img.dataset.deferredSrc;
            }

            img.loading = "eager";

        } else {

            img.loading = "lazy";

        }

    });

}
/* =========================================================
   SELECTED WORKS → MOBILE MENU
   LEFT → RIGHT = BACK
========================================================= */

let selectedWorksStartX = 0;
let selectedWorksStartY = 0;

document.addEventListener("touchstart", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileProjects ||
        !mobileProjects.classList.contains("open")
    ) {
        return;
    }

    selectedWorksStartX = e.touches[0].clientX;
    selectedWorksStartY = e.touches[0].clientY;

}, { passive: true });


document.addEventListener("touchend", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileProjects ||
        !mobileProjects.classList.contains("open")
    ) {
        return;
    }

    const deltaX =
        e.changedTouches[0].clientX - selectedWorksStartX;

    const deltaY =
        e.changedTouches[0].clientY - selectedWorksStartY;

    /* Sadece yatay ve yeterince uzun swipe */

    if (
        deltaX < 100 ||
        Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
        return;
    }

    /* Selected Works → Ana Menü */

    closeMobileProjects();

    if (mobileMenu) {
        mobileMenu.classList.add("open");
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.add("open");
    }

});
/* =========================================================
   MOBILE ABOUT
========================================================= */

const mobileAbout =
    document.getElementById("mobileAbout");

const mobileAboutBack =
    document.getElementById("mobileAboutBack");

const mobileAboutClose =
    document.getElementById("mobileAboutClose");


const mobileAboutLink =
    document.querySelector(
        '.mobile-menu a[href="#mobile-about"]'
    );


function openMobileAbout() {

    if (!mobileAbout) return;

    mobileMenu?.classList.remove("open");
    mobileMenuBackdrop?.classList.remove("open");

    mobileAbout.classList.add("open");

}


function closeMobileAbout() {

    if (!mobileAbout) return;

    mobileAbout.classList.remove("open");

}


if (mobileAboutLink) {

    mobileAboutLink.addEventListener("click", function(e) {

        e.preventDefault();
        e.stopPropagation();

        openMobileAbout();

    });

}


if (mobileAboutBack) {

    mobileAboutBack.addEventListener("click", function(e) {

        e.preventDefault();

        closeMobileAbout();

        mobileMenu?.classList.add("open");
        mobileMenuBackdrop?.classList.add("open");

    });

}


if (mobileAboutClose) {

    mobileAboutClose.addEventListener("click", function(e) {

        e.preventDefault();

        closeMobileAbout();

    });

}
/* =========================================================
   MOBILE ABOUT — SWIPE BACK
   LEFT → RIGHT = BACK TO MENU
========================================================= */

let aboutSwipeStartX = 0;
let aboutSwipeStartY = 0;

document.addEventListener("touchstart", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileAbout ||
        !mobileAbout.classList.contains("open")
    ) {
        return;
    }

    aboutSwipeStartX = e.touches[0].clientX;
    aboutSwipeStartY = e.touches[0].clientY;

}, { passive: true });


document.addEventListener("touchend", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileAbout ||
        !mobileAbout.classList.contains("open")
    ) {
        return;
    }

    const deltaX =
        e.changedTouches[0].clientX - aboutSwipeStartX;

    const deltaY =
        e.changedTouches[0].clientY - aboutSwipeStartY;

    /* Dikey kaydırmayı geri olarak algılama */
    if (
        deltaX < 100 ||
        Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
        return;
    }

    /* About Me → Ana Menü */

    closeMobileAbout();

    if (mobileMenu) {
        mobileMenu.classList.add("open");
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.add("open");
    }

});
/* =========================================================
   MOBILE RESUME
========================================================= */

const mobileResume =
    document.getElementById("mobileResume");

const mobileResumeContent =
    document.getElementById("mobileResumeContent");

const mobileResumeBack =
    document.getElementById("mobileResumeBack");

const mobileResumeClose =
    document.getElementById("mobileResumeClose");


let mobileResumeState = "home";
let mobileResumeLanguage = null;


/* OPEN MOBILE RESUME */

function openMobileResume() {

    if (!mobileResume) return;

    mobileMenu?.classList.remove("open");
    mobileMenuBackdrop?.classList.remove("open");

    mobileResume.classList.add("open");

    mobileResumeState = "home";
    mobileResumeLanguage = null;

    renderMobileResumeHome();

}


/* CLOSE MOBILE RESUME */

function closeMobileResume() {

    if (!mobileResume) return;

    mobileResume.classList.remove("open");

}


/* MOBILE RESUME HOME */

function renderMobileResumeHome() {

    mobileResumeState = "home";
    mobileResumeLanguage = null;

    mobileResumeContent.innerHTML = `

        <div class="mobile-resume-title">

            <small>DOCUMENTS</small>

            <h1>RESUME</h1>

        </div>

        <table class="mobile-resume-explorer">

            <thead>

                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>

            </thead>

            <tbody>

                <tr
                    class="mobile-resume-folder"
                    id="mobileEnglishFolder"
                >
                    <td>📁 English</td>
                    <td>File Folder</td>
                </tr>

                <tr
                    class="mobile-resume-folder"
                    id="mobileTurkishFolder"
                >
                    <td>📁 Türkçe</td>
                    <td>File Folder</td>
                </tr>

            </tbody>

        </table>

    `;


    document
        .getElementById("mobileEnglishFolder")
        ?.addEventListener("click", function () {

            renderMobileEnglish();

        });


    document
        .getElementById("mobileTurkishFolder")
        ?.addEventListener("click", function () {

            renderMobileTurkish();

        });

}


/* ENGLISH */

function renderMobileEnglish() {

    mobileResumeState = "language";
    mobileResumeLanguage = "english";

    mobileResumeContent.innerHTML = `

        <div class="mobile-resume-title">

            <small>RESUME / ENGLISH</small>

            <h1>ENGLISH</h1>

        </div>

        <table class="mobile-resume-explorer">

            <thead>

                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>

            </thead>

            <tbody>

                <tr
                    class="mobile-resume-folder"
                    id="mobileResumePdf"
                >
                    <td>📄 Resume.pdf</td>
                    <td>PDF File</td>
                </tr>

                <tr
                    class="mobile-resume-folder"
                    id="mobileResumePhotoPdf"
                >
                    <td>📄 Resume with Photo.pdf</td>
                    <td>PDF File</td>
                </tr>

            </tbody>

        </table>

    `;


    document
        .getElementById("mobileResumePdf")
        ?.addEventListener("click", function () {

            openMobilePDF(
                "assets/pdf/en/Resume.pdf",
                "Resume.pdf"
            );

        });


    document
        .getElementById("mobileResumePhotoPdf")
        ?.addEventListener("click", function () {

            openMobilePDF(
                "assets/pdf/en/Resume with Photo.pdf",
                "Resume with Photo.pdf"
            );

        });

}


/* TÜRKÇE */

function renderMobileTurkish() {

    mobileResumeState = "language";
    mobileResumeLanguage = "turkish";

    mobileResumeContent.innerHTML = `

        <div class="mobile-resume-title">

            <small>RESUME / TÜRKÇE</small>

            <h1>TÜRKÇE</h1>

        </div>

        <table class="mobile-resume-explorer">

            <thead>

                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>

            </thead>

            <tbody>

                <tr
                    class="mobile-resume-folder"
                    id="mobileCvPdf"
                >
                    <td>📄 CV.pdf</td>
                    <td>PDF File</td>
                </tr>

                <tr
                    class="mobile-resume-folder"
                    id="mobileCvPhotoPdf"
                >
                    <td>📄 CV with Photo.pdf</td>
                    <td>PDF File</td>
                </tr>

            </tbody>

        </table>

    `;


    document
        .getElementById("mobileCvPdf")
        ?.addEventListener("click", function () {

            openMobilePDF(
                "assets/pdf/tr/CV.pdf",
                "CV.pdf"
            );

        });


    document
        .getElementById("mobileCvPhotoPdf")
        ?.addEventListener("click", function () {

            openMobilePDF(
                "assets/pdf/tr/CV with Photo.pdf",
                "CV with Photo.pdf"
            );

        });

}


/* PDF */

function openMobilePDF(path, name) {

    mobileResumeState = "pdf";

    mobileResumeContent.innerHTML = `

        <div class="mobile-resume-title">

            <small>
                RESUME / ${mobileResumeLanguage === "english"
                    ? "ENGLISH"
                    : "TÜRKÇE"}
            </small>

            <h1>${name}</h1>

        </div>

        <iframe
            class="mobile-resume-pdf"
            src="${path}"
        ></iframe>

    `;

}


/* BACK BUTTON */

if (mobileResumeBack) {

    mobileResumeBack.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        if (mobileResumeState === "pdf") {

            if (mobileResumeLanguage === "english") {
                renderMobileEnglish();
            } else {
                renderMobileTurkish();
            }

            return;
        }


        if (mobileResumeState === "language") {

            renderMobileResumeHome();

            return;
        }


        if (mobileResumeState === "home") {

            closeMobileResume();

            mobileMenu?.classList.add("open");
            mobileMenuBackdrop?.classList.add("open");

        }

    });

}


/* CLOSE */

if (mobileResumeClose) {

    mobileResumeClose.addEventListener("click", function (e) {

        e.preventDefault();

        closeMobileResume();

    });

}


/* HAMBURGER → RESUME */

const mobileResumeLink =
    document.querySelector(
        '.mobile-menu a[href="#mobile-resume"]'
    );

if (mobileResumeLink) {

    mobileResumeLink.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        openMobileResume();

    });

}
/* =========================================================
   MOBILE RESUME — SWIPE BACK
========================================================= */

let mobileResumeSwipeStartX = 0;
let mobileResumeSwipeStartY = 0;

document.addEventListener("touchstart", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileResume ||
        !mobileResume.classList.contains("open")
    ) {
        return;
    }

    mobileResumeSwipeStartX = e.touches[0].clientX;
    mobileResumeSwipeStartY = e.touches[0].clientY;

}, { passive: true });


document.addEventListener("touchend", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileResume ||
        !mobileResume.classList.contains("open")
    ) {
        return;
    }

    const deltaX =
        e.changedTouches[0].clientX -
        mobileResumeSwipeStartX;

    const deltaY =
        e.changedTouches[0].clientY -
        mobileResumeSwipeStartY;

    /* Sadece belirgin yatay swipe */

    if (
        deltaX < 100 ||
        Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
        return;
    }


    /* PDF → Language */

    if (mobileResumeState === "pdf") {

        if (mobileResumeLanguage === "english") {
            renderMobileEnglish();
        } else {
            renderMobileTurkish();
        }

        return;
    }


    /* Language → Resume Home */

    if (mobileResumeState === "language") {

        renderMobileResumeHome();

        return;
    }


    /* Resume Home → Main Menu */

    if (mobileResumeState === "home") {

        closeMobileResume();

        if (mobileMenu) {
            mobileMenu.classList.add("open");
        }

        if (mobileMenuBackdrop) {
            mobileMenuBackdrop.classList.add("open");
        }

    }

});
/* =========================================================
   MOBILE CONTACT
========================================================= */

const mobileContact =
    document.getElementById("mobileContact");

const mobileContactBack =
    document.getElementById("mobileContactBack");

const mobileContactClose =
    document.getElementById("mobileContactClose");

const mobileCopyMail =
    document.getElementById("mobileCopyMail");


/* CONTACT'I AÇ */

function openMobileContact() {

    if (!mobileContact) return;

    mobileMenu?.classList.remove("open");
    mobileMenuBackdrop?.classList.remove("open");

    mobileContact.classList.add("open");

}


/* CONTACT'I KAPAT */

function closeMobileContact() {

    if (!mobileContact) return;

    mobileContact.classList.remove("open");

}


/* BACK → ANA MENÜ */

if (mobileContactBack) {

    mobileContactBack.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        closeMobileContact();

        if (mobileMenu) {
            mobileMenu.classList.add("open");
        }

        if (mobileMenuBackdrop) {
            mobileMenuBackdrop.classList.add("open");
        }

    });

}


/* X → KAPAT */

if (mobileContactClose) {

    mobileContactClose.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        closeMobileContact();

    });

}


/* COPY EMAIL */

if (mobileCopyMail) {

    mobileCopyMail.addEventListener("click", async function () {

        try {

            await navigator.clipboard.writeText(
                "ecemercan123@gmail.com"
            );

            const originalText = this.textContent;

            this.textContent = "Copied ✓";

            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);

        } catch (error) {

            console.log("Email could not be copied.");

        }

    });

}


/* HAMBURGER → CONTACT */

const mobileContactLink =
    document.querySelector(
        '.mobile-menu a[href="#mobile-contact"]'
    );

if (mobileContactLink) {

    mobileContactLink.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        openMobileContact();

    });

}


/* =========================================================
   MOBILE CONTACT — SWIPE BACK
========================================================= */

let mobileContactSwipeStartX = 0;
let mobileContactSwipeStartY = 0;


document.addEventListener("touchstart", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileContact ||
        !mobileContact.classList.contains("open")
    ) {
        return;
    }

    mobileContactSwipeStartX =
        e.touches[0].clientX;

    mobileContactSwipeStartY =
        e.touches[0].clientY;

}, { passive: true });


document.addEventListener("touchend", function (e) {

    if (window.innerWidth > 600) return;

    if (
        !mobileContact ||
        !mobileContact.classList.contains("open")
    ) {
        return;
    }

    const deltaX =
        e.changedTouches[0].clientX -
        mobileContactSwipeStartX;

    const deltaY =
        e.changedTouches[0].clientY -
        mobileContactSwipeStartY;


    /* Sadece soldan sağa belirgin swipe */

    if (
        deltaX < 100 ||
        Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
        return;
    }


    /* CONTACT → ANA MENÜ */

    closeMobileContact();

    if (mobileMenu) {
        mobileMenu.classList.add("open");
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.add("open");
    }

});
/* =========================================================
   MOBILE PROJECT CONTACT BUTTONS
   PC'YE DOKUNMAZ
========================================================= */

document.addEventListener("click", function (e) { 
 
    if (window.innerWidth > 600) return; 
 
    const button = e.target.closest(
    "#archiveContactBtn, .kor-archive-link, .playreal-contact-btn, .serene-contact-btn, .scenebites-connect-button"
);
 
    if (!button) return; 
 
    e.preventDefault(); 
    e.stopImmediatePropagation(); 
 
    openMobileContact(); 
 
}, true);
/* =========================================================
   ALL PROJECT CONTACT BUTTONS — MOBILE
========================================================= */

document.addEventListener("click", function (e) {

    if (window.innerWidth > 600) return;

    const button = e.target.closest(
        ".dustiny-contact-button, .human-dog-contact button, .serene-contact-btn"
    );

    if (!button) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    openMobileContact();

}, true);