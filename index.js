import { blogPosts } from "./info.js"

// -----------------------------toggleMode--------------------------------
function toggleMode() {
    let mode = localStorage.getItem("mode")
    const linkElement = document.getElementById("css-link");
    if(mode=="dark"){
        linkElement.href = "dark-mode.css";
    }else{
        linkElement.removeAttribute("href");
    }
}
toggleMode()
const modeBtnLight = document.querySelector(".btn-mode-light")
const modeBtnDark = document.querySelector(".btn-mode-dark")
modeBtnLight.addEventListener("click",function () {
    localStorage.setItem("mode", "light")
    modeBtnLight.classList.add('hidden')
    modeBtnDark.classList.remove('hidden')
    toggleMode()
})

modeBtnDark.addEventListener("click", function() {
    localStorage.setItem("mode","dark")
    modeBtnDark.classList.add('hidden')
    modeBtnLight.classList.remove('hidden')
    toggleMode()
})



// -----------------Blog-grid----------------
const blogGrid = document.querySelector(".blog-grid")
function getSequence(start, end){
    let seqArray = new Set()
    for(let i=start; i<end; i++){
        seqArray.add(i)
    }
    return seqArray
}
function refershBlogGrid(idSet){
    console.log(idSet)
    if(idSet.size == 0){
        blogGrid.innerHTML = `<h1>OOPS! No Results Found.</h1>`
    }else{
        blogGrid.innerHTML = ""
        for(let i of idSet){
            let blogCard = document.createElement("div")
            blogCard.classList.add("blog-card")
            blogCard.innerHTML = getCard(blogPosts[i])
            blogCard.addEventListener("click", function(){
                localStorage.setItem("id", i)
                window.location.href = `/blog.html`
            })
            blogGrid.append(blogCard)
        }
        
    }
}

function getCard(data){
    return `
    <a href="#"><img src="${data.image}"></a>
    <h3>${data.title}</h3>
    `
}
refershBlogGrid(getSequence(0,9))



// ----------------- pagination----------------
const pagesBar = document.querySelector(".pages-bar")
let currentPage = 1
let blogsPerPage = 9
let pagesArray = [1,2,3,4,5]
let totalPages = Math.ceil(blogPosts.length/blogsPerPage)



function refreshPaginationBar(){
    pagesBar.innerHTML = ""

    // left_arrow
    let goLeft = document.createElement("a")
    goLeft.classList.add("page")
    goLeft.innerHTML = '<'
    pagesBar.append(goLeft)
    goLeft.addEventListener("click", function(){refreshBlogs(currentPage-1)})

    // middle_numbers
    for(let i=0; i<5; i++){
        console.log(i)
        let pageBtn = document.createElement("a")
        pageBtn.classList.add("page")
        if(pagesArray[i]===currentPage){
            pageBtn.classList.add("active")
        }   
        pageBtn.addEventListener("click", function(){
            refreshBlogs(pagesArray[i])
        })
        pageBtn.innerHTML = pagesArray[i]
        pagesBar.append(pageBtn)
    }

    // right_arraw
    let goRight = document.createElement("a")
    goRight.classList.add("page")
    goRight.innerHTML = '>'
    pagesBar.append(goRight)
    goRight.addEventListener("click", function(){refreshBlogs(currentPage+1)})
}
function refreshBlogs(curPage){
    if (curPage>totalPages)     //validating curPage in range[1, totalPages]
        curPage = totalPages
    if (curPage<1)
        curPage = 1
    currentPage = curPage
    setPagesArray(currentPage)
    refreshPaginationBar()
    scrollTo(0,0)
    refershBlogGrid(getSequence(curPage*blogsPerPage-9,curPage*blogsPerPage)) //take array instard
}

function setPagesArray(curPage){
    pagesArray = []
    if(curPage>totalPages-2){
        for(let i=curPage; i>curPage-5; i--){
            pagesArray.unshift(i)
        }
    }
    else if(curPage<=3){
        for(let i=1; i<=5; i++){
            pagesArray.push(i)
        }
    }
    else{
        for(let i=curPage-2; i<curPage+3; i++){
            pagesArray.push(i)
        }
    }
}
refreshPaginationBar()

// -------------------------searching revelant Blogs----------------------
const searchBtn = document.getElementById("search-btn")
const textBox = document.getElementById("text-box")

searchBtn.addEventListener("click", function(){
    let idArray = searchRevelantBlogs(textBox.value)
    refershBlogGrid(idArray)
    pagesBar.innerHTML = ""
})
function searchRevelantBlogs(text){
    let words = text.split(" ")   
    let idArray = new Set()
    for(let i=0; i<blogPosts.length; i++){
        for(let word of words){
            if(blogPosts[i].tags.includes(word.toLowerCase())){
                idArray.add(i)
            } 
        }
    }
    console.log(idArray)
    return idArray
}



