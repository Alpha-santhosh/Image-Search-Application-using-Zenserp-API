const key = document.getElementById("key")
const header = document.getElementById("header")
const title = document.getElementById("title")
const gallary = document.getElementById("gallary")
const fixed_nav_bar = document.getElementById("fixed_box")
const main_screen = document.getElementById("main")
const see_more_box = document.getElementById("see_more_box")
const screen_holder = document.getElementById("screen_holder")
see_more_box.innerHTML = ""

const img_holder = document.createElement("div")

var tiger_data

async function check_for_key(params) {
    console.log(key.value)
    console.log(gallary);
    // Header 
    title.innerHTML = ""
    title.style.marginBottom = "0px"
    header.classList.remove("header")
    header.classList.add("header_fixed")
    img_preview_closer()
    gallary.innerHTML = ""
    see_more_box.innerHTML=""
    const home = document.createElement("button")
    home.innerHTML = `
    <span class="material-symbols-outlined">
home
</span>
    `
    home.classList.add("home")
    home.addEventListener("click",()=>{
        location.reload()
    })
    document.body.appendChild(home)
    // gallary

    if(key.value == "")
    {

    }else{
        const respones = await fetch(`https://app.zenserp.com/api/v2/search?apikey=f39fc060-9ed4-11ed-b160-4fba2db99c85&q=${key.value}&tbm=isch`)
        const result = await respones.json()
        // console.log(result.image_results);
        tiger_data =  result.image_results
        console.log(tiger_data);
        add_img(tiger_data)
    }
    // add_img(tiger_data)
}

function send() {
    console.log("sending");
    add_img(tiger_data)
}

function add_img(data) { 
    see_more_box.innerHTML = ""
    gallary.classList.add("gallary")
    // gallary.innerHTML=""
    for(let i=0;i<50;i++){
        gallary.innerHTML +=
        `
        <div class="card" onclick="img_preview(${data[i].position})">
        <img class="img" src="${data[i].thumbnail}" alt="${data[i].position}">
        <div class="detail" id="img_click">
            <a href="${data[i].source}" target="_blank"  >${data[i].source}</a>
            <a href="${data[i].link}" target="_blank"  >${data[i].title}</a>
        </div>
        </div>
        `
    }
    see_more_box.innerHTML = `<a href="#header" id="see_more" onclick="check_for_key()">see more</a>`
}

function img_preview(p) {
    var ps = p-1
    console.log(ps);
    img_holder.classList.remove("img_holder_css")
    console.log("img_preview clicked");
    main_screen.style.width = "50vw"
    img_holder.classList.add("img_holder_css")
    screen_holder.appendChild(img_holder)

    img_holder.innerHTML = `
    <div class="top" id="top" style="margin-bottom: 10px;display: flex;justify-content: space-between; align-items: center;">
        <a href="${tiger_data[ps].source}" target="_blank" style="color: white;font-size: 16px;">${tiger_data[ps].source}</a>

        <button type="button" style="display: inline-block;cursor: pointer;color: white;background-color: transparent;border: none;outline: none;" onclick="img_preview_closer()">
                <span class="material-symbols-outlined">
                    close
                </span>
        </button>
    </div>

    <div class="img_holder"
    style="width: 100%;box-sizing:border-box;display: flex;flex-direction: column ;justify-content: space-between;align-content: center;background-color: black;">
        <img src="${tiger_data[ps].sourceUrl}" alt="" style="width: 100%;">
        <div class="img_details" style="background-color: white;padding: 10px;display: flex;justify-content: space-between;align-items: center;">
            <a href="${tiger_data[ps].link}" target="_blank" style="color: black;font-weight: 600;">${tiger_data[ps].title}</a>
            <a href="${tiger_data[ps].link}" target="_blank" style="padding:10px 20px;background-color: rgba(56, 155, 222, 0.528);color: black;text-decoration: none;
            border-radius: 20px; id="visit">Visit</a>
        </div>
    </div>

    <div class="gallary_right" id="image_gallary_preview" style="margin-top: 15px;margin-bottom: 15px;">
                
    </div>

    <div class="img_see_more" id="img_see_more" style="display: flex;justify-content: center;margin-bottom: 40px;">
        <a href="#header"style="padding:10px 20px;background-color: rgba(56, 155, 222, 0.528);color: black;text-decoration: none;
        border-radius: 20px;" onclick="send(),img_preview_closer()">See more></a>
    </div>
    `
    const image_gallary_preview = document.getElementById("image_gallary_preview")
    for(let i=ps;i<ps+10;i++){
        image_gallary_preview.innerHTML +=`
        <div class="card" onclick="img_preview(${tiger_data[i].position})">
        <img class="img" src="${tiger_data[i].thumbnail}" alt="${tiger_data[i].position}">
        <div class="detail" id="img_click">
            <a href="${tiger_data[i].source}" target="_blank"  >${tiger_data[i].source}</a>
            <a href="${tiger_data[i].link}" target="_blank"  >${tiger_data[i].title}</a>
        </div>
        </div>
        `
    }
}

function img_preview_closer() {
   console.log("closed");
   img_holder.innerHTML = ""
   img_holder.classList.remove("img_holder_css")
   console.log("img_preview clicked");
   main_screen.style.width = "100vw"
}
