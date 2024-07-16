let View = 1;
let inventory = [];
let player = null;
let woodhold = null;
let tree1 = null;
let tree2 = null;
let tree2offsetx = Math.random() * (1000 - -1000) + -1000;
let tree2offsety = Math.random() * (1000 - -1000) + -1000;
let playerx = window.innerWidth / 2;
let playery = window.innerHeight / 2;
let worldx = 100;
let worldy = 100;
let keys = {};
let speed = 3;
CurrentItem = 1;
CurrentItemName = "";

document.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    delete keys[event.key];
});

document.addEventListener('mousemove', function(event) {
    if (View === 2 && player) {
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
    if (View === 2) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        // Check if the click is within the bounds of tree1
        let tree1Rect = tree1.getBoundingClientRect();
        if (mouseX >= tree1Rect.left && mouseX <= tree1Rect.right &&
            mouseY >= tree1Rect.top && mouseY <= tree1Rect.bottom) {
            giveItem("wood");
            return;
        }

        // Check if the click is within the bounds of tree2
        let tree2Rect = tree2.getBoundingClientRect();
        if (mouseX >= tree2Rect.left && mouseX <= tree2Rect.right &&
            mouseY >= tree2Rect.top && mouseY <= tree2Rect.bottom) {
            giveItem("wood");
            return;
        }

        // Check if the click is within the bounds of any inventory slot
        for (let i = 0; i < inventory.length; i++) {
            let slot = inventory[i];
            if (slot.element) {
                let slotRect = slot.element.getBoundingClientRect();
                if (mouseX >= slotRect.left && mouseX <= slotRect.right &&
                    mouseY >= slotRect.top && mouseY <= slotRect.bottom) {
                    giveItem("wood");
                    break;
                }
            }
        }
    }
});


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

function giveItem(itemType) {
    let slot = inventory[CurrentItem - 1];
    if (!slot) {
        console.error("slot ${CurrentItem} not found in inv");
        return;
    }
    if (slot && slot.woodElement && slot.countElement) {
        if (slot.item === itemType || slot.item === "") {
            slot.woodElement.style.display = 'block';
            slot.item = itemType;
            slot.count++;
            if (slot.count > 1) {
                slot.countElement.style.display = 'block';
                slot.countElement.textContent = slot.count;
            }
            if (slot.count > 9) {
                slot.countElement.style.left = "50%";
            }
        } else {
            console.log("You already have an item in that slot!");
        }
    } else {
        console.error("Slot or required elements not properly initialized.");
    }
}

function movePlayer() {
    if (View === 2 && player) {
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
    }
    requestAnimationFrame(movePlayer);
    tree1.style.left = worldx + "px";
    tree1.style.top = worldy + "px";
    tree2.style.left = worldx + tree2offsetx + "px";
    tree2.style.top = worldy + tree2offsety + "px";
}

function start() {
    initializeInventorySlots();
    tree1 = document.getElementById("tree1");
    tree2 = document.getElementById("tree2");
    player = document.getElementById("player");
    woodhold = document.getElementById("wood-hold");

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

    if (!tree1 || !tree2) {
        console.error("tree elements not found");
        return;
    }
    tree1.style.display = 'none';
    tree2.style.display = 'none';

    [inventory[0].woodElement, inventory[1].woodElement].forEach(wood => {
        if (wood) wood.style.display = 'none';
    });

    woodhold.style.display = 'none';

    console.log("Game Successfully Loaded");
    movePlayer();
}

function view2() {
    View = 2;
    document.getElementById("title").style.display = 'none';
    document.getElementById("start-button").style.display = 'none';
    player.style.display = 'block';
    tree1.style.display = 'block';
    tree2.style.display = 'block';

    document.getElementById("inv-1").style.display = 'block';
    document.getElementById("inv-2").style.display = 'block';
    document.getElementById("inv-3").style.display = 'block';
    document.getElementById("inv-4").style.display = 'block';
    document.getElementById("inv-5").style.display = 'block';
    document.getElementById("inv-6").style.display = 'block';
}
