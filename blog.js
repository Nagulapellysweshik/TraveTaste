import { blogPosts } from "./info.js"

const blogContainer = document.querySelector(".blog-container")
let id = localStorage.getItem("id")
if(id){
    let curBlog = blogPosts[id]
    let s1 = ""
    s1 += `<h2>${curBlog.title}</h2>`
    s1 += `<img src=${curBlog.image}>`
    s1 += curBlog.content
    blogContainer.innerHTML = s1
    localStorage.clear("id")
}
else{
    window.location.pathname = "/"
}
