const username = "admin";

function renderPost(post, isNew = false) {
    const template = document.getElementById("post-template").content.cloneNode(true);
    template.querySelector(".username").innerText = post.username;
    template.querySelector(".message").innerText = post.message;
    if (isNew){
        document.getElementById("feed").prepend(template);
    }
    else {
        document.getElementById("feed").appendChild(template);
    }
}

async function submitPost(){
    const message = document.getElementById("postInput").value;
    try{
        const response = await fetch ("/api/posts", {
        method: "POST", 
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            message: message,
        }),
    
    });
    if (response.ok){
        renderPost({username: username, message: message}, true );
        document.getElementById("postInput").value = ""; // clear the input field for your tweet storm
    } 
} catch (error){
    console.error("error submitting post:", error);
    }

};

window.onload = async() => {
    try{
        const response = await fetch ("/api/posts");
        const posts = await response.json();
        posts.ForEach((post) => renderPost(post));
    } catch (error){
        console.error("error fetching posts:", error)
    }
};
