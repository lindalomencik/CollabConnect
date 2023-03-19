const apiCall = 'https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/getAll';

function fetchAllPosts(){
    fetch(apiCall)
    .then(response => response.json())
    .then(data => {
        const filteredPost = data.data.map(loc => ({
            "title": loc.title,
            "text": loc.text
        }))
        console.log(filteredPost);
        chrome.storage.local.set({allPosts: filteredPost});
    })
}
