// Script for creating the base room from configuration parameters

// This script generates:
// - The room: 3 wall + floor + neons lights + deco lights 
// - One Chromlock: the dock, the target color, 2 flashlights
// - One invisible sphere in th chromlock
// - 3 lights in the the ceiling
//The a-scene is create in the main html file. this script add things to it


function createElement(type, attributes = {}, parent = null) {

    const element = document.createElement(type);

    // Ajouter les attributs
    for (const [key, value] of Object.entries(attributes)) {

        // "switch" est géré séparément
        if (key === 'switch') {
            continue;
        }

        element.setAttribute(key, value);
    }


    // =====================================================
    // SWITCH
    // =====================================================

    let switchValue = attributes.switch;

    // Si l'objet vient du HTML
    if (!switchValue) {
        switchValue = element.getAttribute('switch');
    }

    if (switchValue) {

        let targets;

        // Format JS :
        // switch: ['objet1', 'objet2']
        if (Array.isArray(switchValue)) {
            targets = switchValue;
        }

        // Format HTML :
        // switch="objet1 objet2"
        else if (typeof switchValue === 'string') {
            targets = switchValue.trim().split(/\s+/);
        }

        if (targets.length > 0) {

            element.addEventListener('click', () => {

                const firstTarget =
                    document.getElementById(targets[0]);

                if (!firstTarget) {
                    console.warn(
                        `Switch : "${targets[0]}" introuvable.`
                    );
                    return;
                }

                const currentState =
                    firstTarget.getAttribute('visible') !== false;

                const newState = !currentState;

                targets.forEach(id => {

                    const target =
                        document.getElementById(id);

                    if (target) {
                        target.setAttribute(
                            'visible',
                            newState
                        );
                    } else {
                        console.warn(
                            `Switch : "${id}" introuvable.`
                        );
                    }

                });

            });
        }
    }


    // Ajouter au parent
    if (parent) {
        parent.appendChild(element);
    }

    return element;
}


function setupSwitches() {

    const switchElements = document.querySelectorAll('[switch]');

    switchElements.forEach(element => {

        const switchValue = element.getAttribute('switch');

        if (!switchValue) {
            return;
        }

        const targets = switchValue.trim().split(/\s+/);

        element.addEventListener('click', () => {

            const firstTarget =
                document.getElementById(targets[0]);

            if (!firstTarget) {
                console.warn(
                    `Switch : "${targets[0]}" introuvable.`
                );
                return;
            }

            const currentState =
                firstTarget.getAttribute('visible') !== false;

            const newState = !currentState;

            targets.forEach(id => {

                const target =
                    document.getElementById(id);

                if (target) {

                    target.setAttribute(
                        'visible',
                        newState
                    );

                } else {

                    console.warn(
                        `Switch : "${id}" introuvable.`
                    );

                }

            });

        });

    });
}



// Creation Of the room
const scene = document.querySelector('a-scene');
console.log(scene);

// Assets
const assets = createElement('a-assets', {}, scene);

const flashlightAsset = createElement(
    'a-asset-item',
    {
        id: 'flashlight_model',
        src: 'kolorbs_models/flashlight.glb'
    },
    assets
);

// Deco lights on the walls
const lights = [
    {
        id: 'spot',
        position: '0 0.07 -9.5',
        rotation: '45 0 0'
    },
    {
        id: 'spot1',
        position: '2 0.07 -9.5',
        rotation: '45 0 0'
    },
    {
        id: 'spot-1',
        position: '-2 0.07 -9.5',
        rotation: '45 0 0'
    },
    {
        id: 'spot2',
        position: '6 0.07 -9.5',
        rotation: '45 0 0'
    },
    {
        id: 'spot-2',
        position: '-6 0.07 -9.5',
        rotation: '45 0 0'
    },
    {
        id: 'spot3',
        position: '8 0.07 -9.5',
        rotation: '45 0 0'
    },
    {
        id: 'spot-3',
        position: '-8 0.07 -9.5',
        rotation: '45 0 0'
    },
    {
        id: 'spot-right-1',
        position: '9.5 0.07 -8',
        rotation: '45 -90 0'
    },
    {
        id: 'spot-right-2',
        position: '9.5 0.07 -6',
        rotation: '45 -90 0'
    },
    {
        id: 'spot-right-3',
        position: '9.5 0.07 -4',
        rotation: '45 -90 0'
    },
    {
        id: 'spot-right-4',
        position: '9.5 0.07 -2',
        rotation: '45 -90 0'
    },
    {
        id: 'spot-left-1',
        position: '-9.5 0.07 -8',
        rotation: '45 90 0'
    },
    {
        id: 'spot-left-2',
        position: '-9.5 0.07 -6',
        rotation: '45 90 0'
    },
    {
        id: 'spot-left-3',
        position: '-9.5 0.07 -4',
        rotation: '45 90 0'
    },
    {
        id: 'spot-left-4',
        position: '-9.5 0.07 -2',
        rotation: '45 90 0'
    }
];

lights.forEach((light) => {
    createElement(
        'a-light',
        {
            id: light.id,
            type: 'spot',
            color: '#ffffff',
            intensity: '0.5',
            position: light.position,
            rotation: light.rotation,
            light: 'angle: 45; intensity: 0.25; castShadow: true'
        },
        scene
    );
});

// back walls
const walls = createElement('a-entity', {}, scene);

createElement(
    'a-box',
    {
        id: 'L_backwall',
        position: '-5 2.5 -10',
        color: '#808080',
        scale: '10 5 0.5',
        'static-body': ''
    },
    walls
);

createElement(
    'a-box',
    {
        id: 'R_backwall',
        position: '5 2.5 -10',
        color: '#808080',
        scale: '10 5 0.5',
        'static-body': ''
    },
    walls
);

createElement(
    'a-box',
    {
        id: 'L_frontwall',
        position: '-5 2.5 5',
        color: '#808080',
        scale: '10 5 0.5',
        'static-body': ''
    },
    walls
);

createElement(
    'a-box',
    {
        id: 'R_frontwall',
        position: '5 2.5 5',
        color: '#808080',
        scale: '10 5 0.5',
        'static-body': ''
    },
    walls
);

// Ceiling
createElement(
    'a-box',
    {
        id: 'ceiling',
        position: '0 5 -2.5',
        color: '#808080',
        scale: '20 0.5 15',
        'static-body': ''
    },
    walls
);

// Left wall
createElement(
    'a-box',
    {
        id: 'L_wall',
        position: '-10 2.5 -2.5',
        rotation: '0 90 0',
        color: '#808080',
        scale: '15 5 0.5',
        'static-body': ''
    },
    walls
);


// Right wall
createElement(
    'a-box',
    {
        id: 'R_wall',
        position: '10 2.5 -2.5',
        rotation: '0 90 0',
        color: '#808080',
        scale: '15 5 0.5',
        'static-body': ''
    },
    walls
);

// Chromlock
const lock = createElement(
    'a-entity',
    {
        id: 'lock'
    },
    scene
);

createElement(
    'a-box',
    {
        position: '0 0.2 -5',
        rotation: '0 90 0',
        color: '#808080',
        'static-body': ''
    },
    lock
);

createElement(
    'a-box',
    {
        position: '0 1.3 -5.57907',
        rotation: '0 90 0',
        color: '#808080',
        scale: '0.37404 3 1'
    },
    lock
);


// Chromlock dock
createElement(
    'a-torus',
    {
        position: '0 0.75 -5',
        id: 'dock_socket_empty',
        rotation: '-90 0 0',
        class: 'clickable',
        color: '#808080',
        'static-body': '',
        scale: '1 1 1',
        geometry: 'radiusTubular: 0.07; radius:0.28',
        'event-set__click':"_event: click; _target: #camSphere; visible: false",
        'event-set__click2':"_event: click; _target: #dockSphere; visible: true"
    },
    lock
);

// Neons lights

function createNeon(id, position) {

    return createElement(
        'a-cylinder',
        {
            id: id,
            position: position,
            radius: '0.035',
            height: '2',
            color: CONFIG.couleurNeon,
            material:
                `emissive: ${CONFIG.couleurNeon}; ` +
                `emissiveIntensity: ${CONFIG.intensiteNeon}`,
            scale: '1 1.45706 1'
        },
        lock
    );
}

createNeon(
    'neon-lock-left',
    '-0.5 1.34769 -5.63905'
);

createNeon(
    'neon-lock-right',
    '0.5 1.34769 -5.63905'
);

// Target
createElement(
    'a-cylinder',
    {
        id: 'button',
        position: '0 2.24392 -5.42082',
        rotation: '-90 0 0',
        color: CONFIG.couleurButton,
        scale: '0.22373 0.22373 0.22373',
        shadow: 'cast: false; receive: true'
    },
    lock
);

// ============================================================
// FLASHLIGHT A
// ============================================================

const flashlightContainerA = createElement(
    'a-entity',
    {
        id: 'chromlocklight1',
        position: '0.26621 1.47545 0'
    },
    lock
);


const flashlightA = createElement(
    'a-gltf-model',
    {
        id: 'flashlightA',
        class: 'clickable',
        src: '#flashlight_model',
        position: '0.30127 0.83351 -4.42166',
        scale: '30 30 30',
        rotation:
            '-65.62200219192344 -64.94934974043986 92.81171435985665',
        switch: CONFIG.FlashlightASwitch // ['flashlightLightA', 'flashlightLightAcone'] or ''
    },
    flashlightContainerA
);


// Lumière du flashlight A
const flashlightLightA = createElement(
    'a-light',
    {
        id: 'flashlightLightA',
        type: 'spot',
        color: CONFIG.couleurLumiereFlashlightA,
        intensity: CONFIG.intensiteLumiereFlashlight,
        distance: '5',
        angle: '25',
        penumbra: '0.2',
        decay: '1',
        target: '#lightTargetC',
        light: 'angle: 33.91',
        rotation:
            '87.95475113053267 -55.88286559028971 -65.88613573547875',
        position: '-0.00005 0.01354 0.00031',
        visible:CONFIG.FlashlightAOnOff
    },
    flashlightA
);


// ============================================================
// FLASHLIGHT B
// ============================================================

const flashlightContainerB = createElement(
    'a-entity',
    {
        id: 'chromlocklight2'
    },
    lock
);


const flashlightB = createElement(
    'a-gltf-model',
    {
        id: 'flashlightB',
        class: 'clickable',
        src: '#flashlight_model',
        position: '-0.4 1.79 -4.92',
        scale: '30 30 30',
        rotation: '-3.6 18.1 -162.3',
        switch: CONFIG.FlashlightBSwitch // ['flashlightLightB', 'flashlightLightBcone'] or ''
            
    },
    flashlightContainerB
);


        
  

// Lumière du flashlight B
const flashlightLightB = createElement(
    'a-light',
    {
        id: 'flashlightLightB',
        type: 'spot',
        color: CONFIG.couleurLumiereFlashlightB,
        intensity: CONFIG.intensiteLumiereFlashlight,
        distance: '5',
        angle: '25',
        penumbra: '0.2',
        decay: '1',
        target: '#lightTargetC',
        light: 'angle: 33.91',
        rotation:
            '90 0 0',
        position: '0 0 0',
        visible: CONFIG.FlashlightBOnOff
    },
    flashlightB
);

// Cone de lumière du flashlight A
const flashlightLightAcone = createElement(
    'a-cone',
    {
        id: 'flashlightLightAcone',
        material:"opacity: 0.035; shader: flat; side: double",
        rotation:"180 0 0", 
        position:"0 0.026 0", 
        scale:"0.02 0.076 0.02",
        geometry:"height: 0.53",
        visible: CONFIG.FlashlightAOnOff
    },
    flashlightA
);


// Cone de lumière du flashlight B
const flashlightLightBcone = createElement(
    'a-cone',
    {
        id: 'flashlightLightBcone',
        material:"opacity: 0.035; shader: flat; side: double",
        rotation:"180 0 0", 
        position:"0 0.027 0", 
        scale:"0.03 0.06581 0.03",
        geometry:"height: 0.53",
        visible: CONFIG.FlashlightBOnOff
    },
    flashlightB
);




// ============================================================
// SOL
// ============================================================

const floor = createElement(
    'a-plane',
    {
        position: '0 0 -5',
        rotation: '-90 0 0',
        width: '4',
        height: '8',
        color: '#000000',
        scale: '5 2.5 1'
    },
    scene
);


// ============================================================
// NÉONS DU SOL
// ============================================================

function createFloorNeon(
    id,
    position,
    scale,
    rotation = '0 0 0'
) {

    return createElement(
        'a-cylinder',
        {
            id: id,
            position: position,
            radius: '0.05',
            height: '2',
            color: CONFIG.couleurNeon,
            material:
                `emissive: ${CONFIG.couleurNeon}; ` +
                `emissiveIntensity: ${CONFIG.intensiteNeon}`,
            scale: scale,
            rotation: rotation
        },
        floor
    );
}


createFloorNeon(
    'neon5',
    '1.95 -1 0',
    '0.2 3 1'
);

createFloorNeon(
    'neon6',
    '-1.95 -1 0',
    '0.2 3 1'
);

createFloorNeon(
    'neon7',
    '0 1.9 0',
    '0.2 2 1',
    '0 0 90'
);


createFloorNeon(
    'neon8',
    '1.95 -1 4.75',
    '0.2 3 1'
);

createFloorNeon(
    'neon9',
    '-1.95 -1 4.75',
    '0.2 3 1'
);

createFloorNeon(
    'neon10',
    '0 1.9 4.75',
    '0.2 2 1',
    '0 0 90'
);


createFloorNeon(
    'neon11',
    '1.95 1.9 2.5',
    '0.2 2.66778 0.5',
    '90 0 0'
);

createFloorNeon(
    'neon12',
    '-1.95 1.9 2.5',
    '0.2 2.66778 0.5',
    '90 0 0'
);

createFloorNeon(
    'neon13',
    '0.8 1.915 2.5',
    '0.2 2.66778 0.5',
    '90 0 0'
);

createFloorNeon(
    'neon14',
    '-0.8 1.915 2.5',
    '0.2 2.66778 0.5',
    '90 0 0'
);


// ============================================================
// GRILLE
// ============================================================

const grid = createElement(
    'a-entity',
    {
        id: 'grid'
    },
    scene
);


const gridWidth = 20;
const gridDepth = 15;
const cellSize = 2;
const gridLineWidth = 0.07;

const centerZ = -2.5;


// ------------------------------------------------------------
// Lignes parallèles à Z
// ------------------------------------------------------------

for (
    let x = -gridWidth / 2;
    x <= gridWidth / 2;
    x += cellSize
) {

    createElement(
        'a-box',
        {
            position: `${x} 0.0007 ${centerZ}`,
            width: gridLineWidth,
            height: '0.02',
            depth: gridDepth,
            color: CONFIG.couleurGrille,
            material:
                `emissive: ${CONFIG.couleurGrille}; ` +
                'emissiveIntensity: 0.4'
        },
        grid
    );
}


// ------------------------------------------------------------
// Lignes parallèles à X
// ------------------------------------------------------------

for (
    let z = -gridDepth / 2;
    z <= gridDepth / 2;
    z += cellSize
) {

    createElement(
        'a-box',
        {
            position: `0 0.0007 ${centerZ + z}`,
            width: gridWidth,
            height: '0.02',
            depth: gridLineWidth,
            color: CONFIG.couleurGrille,
            material:
                `emissive: ${CONFIG.couleurGrille}; ` +
                'emissiveIntensity: 0.4'
        },
        grid
    );
}


// ============================================================
// CIEL
// ============================================================

createElement(
    'a-sky',
    {
        color: '#000000'
    },
    scene
);


const camEntity = createElement('a-entity', {
    id: 'camEntity'
}, scene);

const cam = createElement('a-camera', {
    id: 'cam',
    'wasd-controls': 'acceleration: 20',
    position: '0 1.6 4.7'
}, camEntity);

const cursor = createElement('a-entity', {
    id: 'cursor',
    cursor: 'rayOrigin: mouse',
    raycaster: 'objects: .clickable'
}, cam);


// Sphère de la caméra

//createElement(
//    'a-sphere',
//    {
//        id: 'camSphere',
//        radius: '0.1',
//        position: '0.14 -0.185 -0.35',
//        visible: 'true'
//    },
//    camera
//);


// ============================================================
// PERSONNALISATION DES MODÈLES DE FLASHLIGHT
// ============================================================

function configureFlashlight(
    flashlight,
    couleur
) {

    flashlight.addEventListener(
        'model-loaded',
        () => {

            flashlight.object3D.traverse(
                (object) => {

                    if (!object.isMesh) {
                        return;
                    }


                    // ------------------------------------------------
                    // MATÉRIAUX
                    // ------------------------------------------------

                    const materials =
                        Array.isArray(object.material)
                            ? object.material
                            : [object.material];


                    materials.forEach(
                        (material) => {

                            if (!material) {
                                return;
                            }


                            // Couleur
                            if (material.color) {
                                material.color.set(couleur);
                            }


                            // Émission
                            if (material.emissive) {

                                material.emissive.set(couleur);

                                material.emissiveIntensity =
                                    CONFIG.intensiteEmissionFlashlight;
                            }


                            material.needsUpdate = true;
                        }
                    );


                    // ------------------------------------------------
                    // CONTOURS NOIRS
                    // ------------------------------------------------

                    if (!object.geometry) {
                        return;
                    }


                    const edges =
                        new THREE.EdgesGeometry(
                            object.geometry,
                            60
                        );


                    const lineMaterial =
                        new THREE.LineBasicMaterial({
                            color: 0x000000
                        });


                    const line =
                        new THREE.LineSegments(
                            edges,
                            lineMaterial
                        );


                    // Même transformation que le mesh
                    line.position.copy(
                        object.position
                    );

                    line.rotation.copy(
                        object.rotation
                    );

                    line.scale.copy(
                        object.scale
                    );


                    object.parent.add(line);

                }
            );

        }
    );
}


// Configuration des deux flashlights
configureFlashlight(
    flashlightA,
    CONFIG.couleurFlashlightA
);

configureFlashlight(
    flashlightB,
    CONFIG.couleurFlashlightB
);


setupSwitches()


    