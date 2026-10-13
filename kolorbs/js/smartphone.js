window.addEventListener("load", () => {

    //------------------------------------------------------
    // Détection smartphone
    //------------------------------------------------------

    const isMobile =
        /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile/i
        .test(navigator.userAgent);

    if (!isMobile) {
        console.log("Pas un appareil mobile");
        return;
    }


    //------------------------------------------------------
    // Récupération de la scène
    //------------------------------------------------------

    const scene = document.querySelector("a-scene");

    if (!scene) {
        console.warn("A-Frame scene non trouvée");
        return;
    }


    //------------------------------------------------------
    // Fonction d'initialisation
    //------------------------------------------------------

function initMobileControls() {

    console.log("Initialisation mobile-controls");

    console.log("NippleJS :", typeof nipplejs);
    console.log("AFRAME :", typeof AFRAME);
    console.log(
        "cameraEntity :",
        document.querySelector("#cameraEntity")
    );
    console.log(
        "camera :",
        document.querySelector("a-camera")
    );
    console.log(
        "scene.hasLoaded :",
        scene.hasLoaded
    );


    const rig = document.querySelector("#cameraEntity");
    const camera = document.querySelector("a-camera");


        //--------------------------------------------------
        // Vérifier NippleJS
        //--------------------------------------------------

        if (typeof nipplejs === "undefined") {

            console.error(
                "NippleJS n'est pas chargé !"
            );

            return;
        }


        //--------------------------------------------------
        // Éviter d'enregistrer deux fois le composant
        //--------------------------------------------------

        if (!AFRAME.components["mobile-controls"]) {

            AFRAME.registerComponent("mobile-controls", {

                schema: {

                    speed: {
                        type: "number",
                        default: 0.08
                    }

                },


                //--------------------------------------------------
                // INIT
                //--------------------------------------------------

                init: function () {

                    console.log(
                        "Mobile controls initialisés"
                    );


                    this.rig = rig;
                    this.camera = camera;


                    this.joystickVector = {
                        x: 0,
                        y: 0
                    };


                    this.forward = new THREE.Vector3();
                    this.right = new THREE.Vector3();
                    this.up = new THREE.Vector3(0, 1, 0);
                    this.direction = new THREE.Vector3();


                    //--------------------------------------------------
                    // Zone joystick
                    //--------------------------------------------------

                    const joystickZone =
                        document.createElement("div");

                    joystickZone.id = "joystickZone";


                    joystickZone.style.position = "fixed";
                    joystickZone.style.left = "20px";
                    joystickZone.style.bottom = "20px";

                    joystickZone.style.width = "160px";
                    joystickZone.style.height = "160px";

                    joystickZone.style.zIndex = "9999";

                    joystickZone.style.touchAction = "none";
                    joystickZone.style.userSelect = "none";
                    joystickZone.style.webkitUserSelect = "none";

                    joystickZone.style.pointerEvents = "auto";


                    document.body.appendChild(
                        joystickZone
                    );


                    //--------------------------------------------------
                    // NippleJS
                    //--------------------------------------------------

                    const joystick = nipplejs.create({

                        zone: joystickZone,

                        mode: "static",

                        position: {
                            left: "50%",
                            top: "50%"
                        },

                        color: "white",

                        size: 120,

                        threshold: 0.1,

                        multitouch: true,

                        restOpacity: 0.5,

                        fadeTime: 100

                    });


                    //--------------------------------------------------
                    // Mouvement
                    //--------------------------------------------------

                    joystick.on("move", (event, data) => {

                        if (!data || !data.vector) {
                            return;
                        }


                        this.joystickVector.x =
                            data.vector.x;

                        this.joystickVector.y =
                            data.vector.y;

                    });


                    //--------------------------------------------------
                    // Relâchement
                    //--------------------------------------------------

                    joystick.on("end", () => {

                        this.joystickVector.x = 0;
                        this.joystickVector.y = 0;

                    });


                    console.log(
                        "Joystick NippleJS créé"
                    );
                },


                //--------------------------------------------------
                // TICK
                //--------------------------------------------------

                tick: function () {

                    if (
                        this.joystickVector.x === 0 &&
                        this.joystickVector.y === 0
                    ) {
                        return;
                    }


                    //--------------------------------------------------
                    // Direction caméra
                    //--------------------------------------------------

                    this.camera.object3D.getWorldDirection(
                        this.forward
                    );


                    this.forward.y = 0;

                    this.forward.normalize();


                    //--------------------------------------------------
                    // Droite
                    //--------------------------------------------------

                    this.right.crossVectors(
                        this.forward,
                        this.up
                    );

                    this.right.normalize();


                    //--------------------------------------------------
                    // Direction joystick
                    //--------------------------------------------------

                    this.direction.set(0, 0, 0);


                    this.direction.addScaledVector(
                        this.forward,
                        this.joystickVector.y
                    );


                    this.direction.addScaledVector(
                        this.right,
                        this.joystickVector.x
                    );


                    //--------------------------------------------------
                    // Déplacement
                    //--------------------------------------------------

                    if (this.direction.lengthSq() > 0) {

                        this.direction.normalize();

                        this.direction.multiplyScalar(
                            this.data.speed
                        );

                        this.rig.object3D.position.add(
                            this.direction
                        );
                    }

                }

            });

        }


        //--------------------------------------------------
        // Activer le composant
        //--------------------------------------------------

        rig.setAttribute(
            "mobile-controls",
            ""
        );


        console.log(
            "mobile-controls activé sur",
            rig
        );
    }


    //------------------------------------------------------
    // IMPORTANT :
    // Si A-Frame est déjà chargé, on initialise directement.
    // Sinon on attend "loaded".
    //------------------------------------------------------

    if (scene.hasLoaded) {

        console.log(
            "A-Frame déjà chargé"
        );

        initMobileControls();

    } else {

        console.log(
            "Attente du chargement A-Frame..."
        );

        scene.addEventListener(
            "loaded",
            initMobileControls,
            { once: true }
        );
    }

});