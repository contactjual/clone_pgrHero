const milestonesData = JSON.parse(allData).data;
// console.log(milestonesData);

// create Milestone
function createMilestone() {

    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = `${milestonesData.map(function (milestone) {
        // console.log(milestone);


        return `<div id="${milestone._id}" class="milestone border-b">
                    <div class="flex">
                        <div class="checkbox"><input type="checkbox" onclick= "doneList(this, ${milestone._id})" />

                        </div>
                        <div onclick = "hiddenPanel(this, ${milestone._id})">
                            <p> ${milestone.name} <span> <i class="fas fa-chevron-down"> </i> </span> </p>
                        </div>
                    </div>
                    <div class="hidden_panel">
                        ${milestone.modules.map(function (module) {

            return `<div class="module border-b">
                                        <p>${module.name}</p>
                                    </div>`

        }).join(" ")}
                    </div>
                </div>`


    }).join(" ")}`


}



// hidden_panel [module]
function hiddenPanel(clickedElement, id) {
    // const currentElement1 = clickedElement.parentElement.nextSibling.nextElementSibling; // or
    // const currentElement = clickedElement.parentNode.nextSibling.nextElementSibling; // or
    const currentElement = clickedElement.parentNode.nextSibling.nextElementSibling;
    console.log(currentElement);

    const shownPannel = document.querySelector('.show');
    const shownActive = document.querySelector('.active');

    if (shownActive && !clickedElement.classList.contains('active')) {
        shownActive.classList.remove('active');
    }
    clickedElement.classList.toggle('active')

    if (shownPannel && !currentElement.classList.contains("show")) {
        shownPannel.classList.remove('show');
    }
    currentElement.classList.toggle('show');


    showMilestone(id);
}




// milestone img 
function showMilestone(id) {
    const milestoneImg = document.querySelector('.milestoneImage');
    const milestoneTitle = document.querySelector('.title');
    const milestoneDetails = document.querySelector('.details');

    milestoneImg.style.opacity = '0';

    milestoneImg.src = milestonesData[id].image
    milestoneTitle.innerText = milestonesData[id].name
    milestoneDetails.innerText = milestonesData[id].description
}


// listen img loaded or not

// document.querySelector('.milestoneImage').addEventListener('load', function () {
//     const milestoneImg = document.querySelector('.milestoneImage');
//     milestoneImg.style.opacity = '1';

// }) 

// or 

const milestoneImg = document.querySelector('.milestoneImage');
milestoneImg.onload = function () {
    milestoneImg.style.opacity = '1';
}




// done list 
function doneList(inputElem, id) {
    const milestones = document.querySelector('.milestones');
    const doneList = document.querySelector('.doneList');
    const milestone = document.getElementById(id);

    if (inputElem.checked) {
        milestones.removeChild(milestone);
        doneList.appendChild(milestone);
    }
    else {
        doneList.removeChild(milestone);
        milestones.appendChild(milestone);
    }

    // sorting(milestones, id)
    sorting()
}



// sort milestones 
function sorting() {
    const milestones = document.querySelector('.milestones');
    const milestonesArray = Array.from(milestones.children);

    milestonesArray.sort(function (a, b) {
        return parseInt(a.id) - parseInt(b.id);
    })


    // re-set the create Milestone
    milestones.innerHTML = '';

    milestonesArray.forEach(function (milestone) {
        milestones.appendChild(milestone);
    })

}


createMilestone()