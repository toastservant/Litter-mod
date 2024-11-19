// CLEO Redux Script to Add Newspapers and Leaves Back to GTA III Definitive Edition
// This script uses JavaScript to dynamically place newspaper and leaf objects around the player.

// Load CLEO Redux methods and utilities
const { Memory, createObject, loadModel, getPlayerPosition, setInterval } = require('cleo-redux');

// Load the textures for newspapers and leaves
const textures = {
    leaf: [
        loadTexture('CLEO/textures/gameleaf01_64.png'),
        loadTexture('CLEO/textures/gameleaf02_64.png')
    ],
    newspaper: [
        loadTexture('CLEO/textures/newspaper01_64.png'),
        loadTexture('CLEO/textures/newspaper02_64.png')
    ]
};

// Ensure all textures are loaded correctly
if (!textures.leaf[0] || !textures.leaf[1] || !textures.newspaper[0] || !textures.newspaper[1]) {
    log("Error: One or more textures failed to load.");
    return;
}

// Function to spawn a piece of rubbish (either a leaf or a newspaper) at a specific position
function spawnRubbish(textureType, x, y, z) {
    const textureArray = textures[textureType];
    const texture = textureArray[Math.floor(Math.random() * textureArray.length)];

    if (texture) {
        const rubbish = createObject(texture, x, y, z);
        rubbish.setRotation(0, 0, Math.random() * 360); // Set a random rotation for a more natural look
    } else {
        log("Error: Texture could not be loaded for type " + textureType);
    }
}

// Periodically place leaves and newspapers around the player
setInterval(() => {
    const playerPos = getPlayerPosition();
    if (!playerPos) {
        log("Error: Could not retrieve player position.");
        return;
    }

    // Generate random nearby coordinates for rubbish placement
    const randomOffset = () => Math.random() * 10 - 5;
    const x = playerPos.x + randomOffset();
    const y = playerPos.y + randomOffset();
    const z = playerPos.z;

    // Randomly choose whether to spawn a leaf or a newspaper
    const rubbishType = Math.random() > 0.5 ? 'leaf' : 'newspaper';
    spawnRubbish(rubbishType, x, y, z);

}, 5000); // Spawn rubbish every 5 seconds

log("Newspaper and leaf rubbish script successfully loaded.");