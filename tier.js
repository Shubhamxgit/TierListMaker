let currentDraggedItem = null;


const tierForm = document.getElementById('frm1');
tierForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const tierName = document.getElementById('tierName');
    const a = tierName.value;
    if (a === '') {
        alert("The tier name can't be empty.");
    }
    else {
        createTierList(a);
        tierName.value = '';
    }
});
function createTierList(a) {
    const tierDiv = document.createElement('div');
    tierDiv.classList.add('tier');
    const tierName2 = document.createElement('h1');
    tierName2.textContent = a;
    tierDiv.appendChild(tierName2);
    const tierItemDiv = document.createElement('div')
    tierItemDiv.classList.add('tierItems')
    tierDiv.appendChild(tierItemDiv)
    const tierBox = document.getElementById('sec4')
    tierBox.appendChild(tierDiv);

    tierName2.addEventListener('dblclick', (event) => {
        const newName = prompt("Enter new name for the tier:", event.target.textContent);
        if (newName !== null && newName.trim() !== '') {
            event.target.textContent = newName;
        }
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = "🗑️";
    tierDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        if (confirm(`Delete tier??`)) {
            tierDiv.remove();
            assignColors();
        }
    });

    setupDropZone(tierItemDiv);
    assignColors();
}


const imageForm = document.getElementById('frm2');
imageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const link = document.getElementById('imgLink');
    const imageURL = link.value;
    if (imageURL === "") {
        alert("Enter a valid image link/url.")
    }
    else {
        addImage(imageURL);
    }
});
function addImage(imageURL) {
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('imgDiv');
    const imgElem = document.createElement('img');
    imgElem.src = imageURL;
    imgElem.classList.add("img");
    imgDiv.appendChild(imgElem);
    const imgBox = document.getElementById('sec3')
    imgBox.appendChild(imgDiv);

    // Makes the image draggable by 1st allowing and then tracking
    imgDiv.setAttribute("draggable", "true")
    dragSetup(imgDiv);
    imgDiv.addEventListener('dblclick', (event) => {
        imgBox.appendChild(event.target.parentNode);
    })
}
function dragSetup(imgDiv) {
    imgDiv.addEventListener('dragstart', (event) => {
        console.log("Dragging started.", event.target.parentNode);
        if(currentDraggedItem != event.target.parentNode){
        currentDraggedItem = event.target.parentNode;
        }
    })
}

// These codes were for understanding, it works only for already added img
// We can enable this if we want to use some img/tierList that pre exists.
// const imgDivs = document.getElementsByClassName('imgDiv');
// for (const imgDiv of imgDivs) {
//     dragSetup(imgDiv)
// }
// const tierList = document.querySelectorAll('.tier');
// tierList.forEach(setupDropZone);

function setupDropZone(tierList) {
    tierList.addEventListener('drop', (event) => {
        event.preventDefault();  //we should disable default setting of not allowing dropping
        console.log('Dropped');
        event.target.appendChild(currentDraggedItem);
    });
    tierList.addEventListener('dragover', (event) => {
        event.preventDefault();
        console.log("Dragover ....");

    });
}
function assignColors() {
    const tiers = document.querySelectorAll('.tier');
    const total = tiers.length;

    tiers.forEach((tier, index) => {
        const hue = Math.round((index / Math.max(1, total - 1)) * 120); // from red to blue
        tier.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    });
}


