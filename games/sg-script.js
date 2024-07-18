let View = 1;
let inventory = [];
let debuginput = null;
let notification = null;
let versiontext = null;
let player = null;
let healthbar = null;
let health = null;
let woodhold = null;
let tree1 = null;
let tree1health = Math.random() * (7 - 3) + 1;
let tree2 = null;
let tree2health = Math.random() * (5 - 1) + 1;
let tree3 = null;
let tree3health = Math.random() * (5 - 1) + 1;
let tree2offsetx = Math.random() * (1000 - -1000) + -1000;
let tree2offsety = Math.random() * (1000 - -1000) + -1000;
let tree3offsetx = Math.random() * (1000 - -1000) + -1000;
let tree3offsety = Math.random() * (1000 - -1000) + -1000;
let playerx = window.innerWidth / 2;
let playery = window.innerHeight / 2;
let worldx = 200;
let worldy = 200;
let keys = {};
let speed = 3;
CurrentItem = 1;
CurrentItemName = "";

maxhealth = 100
currenthealth = maxhealth
canminus = true;

debugmenu = false;
infwood = false;

let patchnotetitle = null;

document.addEventListener('keydown', function(event) {
    keys[event.key] = true;
    if (keys['Escape']) {
        if (View == 2) {
            debugmenu = debugmenu ? false : true;
            if (debugmenu == true) {
                debuginput.style.display = "block";
                debuginput.focus();
            }
            if (debugmenu == false) {
                debuginput.style.display = "none";
            }
        }
    }
    if (keys['Enter'] && debugmenu) {
        if (debuginput.value == "inv") {
            console.log(inventory);
        }
        if (debuginput.value == "get10wood") {
            giveItem("wood", 10);
        }
        if (debuginput.value == "get50wood") {
            giveItem("wood", 50);
        }
        if (debuginput.value == "noti") {
            notifi("notification test");
        }
        if (debuginput.value == "infwood") {
            infwood = infwood ? false : true;
        }
        debuginput.value = "";
    }
});

document.addEventListener('keyup', function(event) {
    delete keys[event.key];
});

document.addEventListener('mousemove', function(event) {
    if (View === 2 && player && debugmenu == false) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let playerRect = player.getBoundingClientRect();
        let playerCenterX = playerRect.left + playerRect.width / 2;
        let playerCenterY = playerRect.top + playerRect.height / 2;
        let angle = Math.atan2(mouseY - playerCenterY, mouseX - playerCenterX);
        let angleInDegrees = angle * (180 / Math.PI);
        player.style.transform = `translate(-50%, -50%) rotate(${angleInDegrees}deg)`;
    }
});

document.addEventListener('mousedown', function(event) {
    if (View === 2 && debugmenu == false) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        
        let tree1Rect = tree1.getBoundingClientRect();
        if (mouseX >= tree1Rect.left && mouseX <= tree1Rect.right &&
            mouseY >= tree1Rect.top && mouseY <= tree1Rect.bottom) {
            if (tree1health >= 2) {
                tree1health -= 1;
                giveItem("wood", 1);
                return;
            } else {
                tree1health -= 1;
                giveItem("wood", 1);
                tree1.style.display = 'none';
                return;
            }
        }

        let tree2Rect = tree2.getBoundingClientRect();
        if (mouseX >= tree2Rect.left && mouseX <= tree2Rect.right &&
            mouseY >= tree2Rect.top && mouseY <= tree2Rect.bottom) {
            if (tree2health >= 2) {
                tree2health -= 1;
                giveItem("wood", 1);
                return;
            } else {
                tree2health -= 1;
                giveItem("wood", 1);
                if (infwood) {
                    tree2.style.top = worldy + Math.random() * (1000 - -1000) + -1000;
                    tree2.style.left = worldx + Math.random() * (1000 - -1000) + -100;
                } else {
                    tree2.style.display = 'none';
                }
                return;
            }
        }

        let tree3Rect = tree3.getBoundingClientRect();
        if (mouseX >= tree3Rect.left && mouseX <= tree3Rect.right &&
            mouseY >= tree3Rect.top && mouseY <= tree3Rect.bottom) {
            if (tree3health >= 2) {
                tree3health -= 1;
                giveItem("wood", 1);
                return;
            } else {
                tree3health -= 1;
                giveItem("wood", 1);
                if (infwood) {
                    tree3.style.top = worldy + Math.random() * (1000 - -1000) + -1000;
                    tree3.style.left = worldx + Math.random() * (1000 - -1000) + -100;
                } else {
                    tree3.style.display = 'none';
                }
                tree3.style.display = 'none';
                return;
            }
        }
        
        for (let i = 0; i < inventory.length; i++) {
            let slot = inventory[i];
            if (slot.element) {
                let slotRect = slot.element.getBoundingClientRect();
                if (mouseX >= slotRect.left && mouseX <= slotRect.right &&
                    mouseY >= slotRect.top && mouseY <= slotRect.bottom) {
                    giveItem("wood", 1);
                    break;
                }
            }
        }
        
        /*if (CurrentItemName != "") {
            let slot = inventory[CurrentItem - 1];
            if (slot.count < 11) {
                slot.countElement.style.left = "70%";
            }
            if (slot.count > 1) {
                slot.count -= 1;
                slot.countElement.textContent = slot.count;
                slot.countElement.style.display = 'block';
            } else {
                if (slot.count == 1) {
                    slot.countElement.style.display = 'none';
                    slot.count -= 1;
                } else {
                    if (slot.count == 0) {
                        woodhold.style.display = 'none';
                        slot.woodElement.style.display = 'none';
                        slot.item = "";
                    }
                }
            }
        } */
    }
});



function notifi(notificationText) {
    let notification = document.getElementById("noti");
    notification.style.display = 'block';
    notification.style.textAlign = 'center';
    notification.textContent = notificationText;
    notification.style.opacity = '0';
    
    notification.style.top = "200px";

    let i = 600;
    let opacity = 0.05;
    notification.style.top = i + "px";

    let intervalId = setInterval(function() {
        notification.style.top = i + "px";
        opacity += 0.05;
        notification.style.opacity = opacity;
        i -= 1;

        if (i <= 500) {
            clearInterval(intervalId);
            notification.style.display = 'none';
        }
    }, 20);
}

function minushealth(minus) {
    if (canminus && currenthealth > 0) {
        canminus = false;
        currenthealth -= minus;
        health.style.width = currenthealth + "px";
        console.log(currenthealth);
        canminus = true;
    }
}

function updateCurrentItemStyle(slotNumber) {
    CurrentItem = slotNumber;
    for (let i = 1; i <= 6; i++) {
        let slotElement = document.getElementById(`inv-${i}`);
        if (slotElement) {
            slotElement.style.background = i === slotNumber ? "#868686" : "#c8c8c8";
        }
    }
    let selectedSlotItem = inventory[slotNumber - 1].item;
    CurrentItemName = selectedSlotItem === "wood" ? "wood" : "";
    woodhold.style.display = CurrentItemName === "wood" ? 'block' : 'none';
}

function initializeInventorySlots() {
    for (let i = 0; i < 6; i++) {
        let slot = {
            item: "",
            count: 0,
            element: document.getElementById(`inv-${i + 1}`),
            countElement: document.getElementById(`inv-${i + 1}-count`),
            woodElement: document.getElementById(`inv-${i + 1}-wood`)
        };
        if (slot.element) slot.element.style.display = 'block';
        if (slot.countElement) slot.countElement.style.display = 'none';
        if (slot.woodElement) slot.woodElement.style.display = 'none';
        inventory.push(slot);
    }
}

function giveItem(itemType, number) {
    let slot = inventory[CurrentItem - 1];
    if (!slot) {
        console.error("slot ${CurrentItem} not found in inv");
        return;
    }
    let i = 0;
    while (i < number) {
        if (slot && slot.woodElement && slot.countElement) {
            if (slot.item === itemType || slot.item === "") {
                slot.woodElement.style.display = 'block';
                slot.item = itemType;
                woodhold.style.display = 'block';
                CurrentItemName = "wood"
                slot.count++;
                if (slot.count > 1) {
                    slot.countElement.style.display = 'block';
                    slot.countElement.textContent = slot.count;
                }
                if (slot.count > 9) {
                    slot.countElement.style.left = "50%";
                }
            } else {
                notifi("you already got a item in that slot");
            }
        } else {
            notifi("Slot or required elements not properly initialized.");
        }
        i++;
    }
}

function movePlayer() {
    if (View === 2 && player && debugmenu == false) {
        if (keys['w']) worldy += speed;
        if (keys['s']) worldy -= speed;
        if (keys['d']) worldx -= speed;
        if (keys['a']) worldx += speed;
        if (keys['1']) updateCurrentItemStyle(1);
        if (keys['2']) updateCurrentItemStyle(2);
        if (keys['3']) updateCurrentItemStyle(3);
        if (keys['4']) updateCurrentItemStyle(4);
        if (keys['5']) updateCurrentItemStyle(5);
        if (keys['6']) updateCurrentItemStyle(6);
        if (keys['m']) minushealth(10);
    }
    requestAnimationFrame(movePlayer);
    tree1.style.left = worldx + "px";
    tree1.style.top = worldy + "px";
    tree2.style.left = worldx + tree2offsetx + "px";
    tree2.style.top = worldy + tree2offsety + "px";
    tree3.style.left = worldx + tree3offsetx + "px";
    tree3.style.top = worldy + tree3offsety + "px";
}

function start() {
    initializeInventorySlots();
    debuginput = document.getElementById("debug-input");
    tree1 = document.getElementById("tree1");
    tree2 = document.getElementById("tree2");
    tree3 = document.getElementById("tree3");
    player = document.getElementById("player");
    health = document.getElementById("health-value");
    healthbar = document.getElementById("health-bar");
    woodhold = document.getElementById("wood-hold");
    versiontext = document.getElementById("version");
    patchnotetitle = document.getElementById("patch");
    notification = document.getElementById("noti");

    for (let i = 0; i < 6; i++) {
        inventory[i].element = document.getElementById(`inv-${i + 1}`);
        inventory[i].countElement = document.getElementById(`inv-${i + 1}-count`);
        inventory[i].woodElement = document.getElementById(`inv-${i + 1}-wood`);

        if (inventory[i].element) {
            inventory[i].element.style.display = 'none';
            inventory[i].element.style.top = "90%";
            inventory[i].element.style.left = `${35 + i * 5}%`;
        }
        if (inventory[i].countElement) {
            inventory[i].countElement.style.display = 'none';
        }
        if (inventory[i].woodElement) {
            inventory[i].woodElement.style.display = 'none';
        }
    }

    if (!player) {
        console.error("player not found");
        return;
    }
    player.style.display = 'none';
    player.style.top = playery + "px";
    player.style.left = playerx + "px";
    
    health.style.top = window.innerHeight / 100 * 88 + "px";
    health.style.left = window.innerWidth / 100 * 35 + "px";
    
    healthbar.style.top = window.innerHeight / 100 * 88 + "px";
    healthbar.style.left = window.innerWidth / 100 * 35 + "px";
    
    notification.style.display = 'none';
    
    document.getElementById("patch-back").style.display = 'none';
    
    versiontext.style.marginBottom = window.innerHeight / 100 * 50 + "px";
    
    if (!tree1 || !tree2) {
        console.error("tree elements not found");
        return;
    }
    
    health.style.display = 'none';
    healthbar.style.display = 'none';
    tree1.style.display = 'none';
    tree2.style.display = 'none';
    tree3.style.display = 'none';
    
    document.getElementById("patch1").style.display = 'none';
    document.getElementById("patch2").style.display = 'none';
    
    document.getElementById("patch").style.display = 'none';

    [inventory[0].woodElement, inventory[1].woodElement].forEach(wood => {
        if (wood) wood.style.display = 'none';
    });

    woodhold.style.display = 'none';
    
    debuginput.style.display = 'none';

    console.log("Game Successfully Loaded");
    movePlayer();
}

function view1() {
    document.getElementById("title").style.display = 'block';
    document.getElementById("start-button").style.display = 'block';
    document.getElementById("version").style.display = 'block';
    document.getElementById("patch-button").style.display = 'block';
    document.getElementById("patch").style.display = 'none';
    document.getElementById("patch1").style.display = 'none';
    document.getElementById("patch2").style.display = 'none';
    document.getElementById("patch-back").style.display = 'none';
}

function view2() {
    View = 2;
    document.getElementById("title").style.display = 'none';
    document.getElementById("start-button").style.display = 'none';
    player.style.display = 'block';
    tree1.style.display = 'block';
    tree2.style.display = 'block';
    tree3.style.display = 'block';
    health.style.display = 'block';
    healthbar.style.display = 'block';

    document.getElementById("inv-1").style.display = 'block';
    document.getElementById("inv-2").style.display = 'block';
    document.getElementById("inv-3").style.display = 'block';
    document.getElementById("inv-4").style.display = 'block';
    document.getElementById("inv-5").style.display = 'block';
    document.getElementById("inv-6").style.display = 'block';
    document.getElementById("patch-button").style.display = 'none';
    document.getElementById("patch-back").style.display = 'none';
}

function view3() {
    View = 3;
    document.getElementById("title").style.display = 'none';
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("version").style.display = 'none';
    document.getElementById("patch-button").style.display = 'none';
    document.getElementById("patch").style.display = 'block';
    document.getElementById("patch1").style.display = 'block';
    document.getElementById("patch2").style.display = 'block';
    document.getElementById("patch-back").style.display = 'block';
}
