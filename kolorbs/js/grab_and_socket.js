
// GRAB AND SOCKET FUNCTION
// -----------------------

// Info
// This function enable to intercat with objects: grab, swap, put in a socket.
// Objects IDs  must end by '_grab' or '_socket'

//GRAB
//If clic on object
   // If cam has no object
      // Object comes to cam
  // If cam has an object
      // Objects are swapped
      
//SOCKET
//If clic on an empty socket
    // If cam has no object
       // Nothing happens
    // If cam has an object
      // Object goes to socket
//If clic on an socket with an object
    // If cam has no object
       // Object come to cam
    // If cam has an object
      // Objects are swapped
    
    
//Improvements

// complete this condition : Si cam O - socket X
// add popup indications when enter: 'grab', 'swap', 'place'

    
scene.addEventListener('click', function(event) {
    const object = event.target;
    const objectId = object.getAttribute('id'); // Récupère l'id de l'objet cliqué (necessaire uniquement si modification de l'id)


    if (object.id.includes('grab')) { // Vérifie si l'id de l'objet contient "grab"

          if (object.parentElement === scene) { // Vérifie si le parent de l'objet est la scene

                // Si aucun objet n'est deja en main
                // ---------------------------------
                if (!document.querySelector('#cam [id*="grab"]')) { 
                      
                      
                    // Ajoute l'ojbet cliqué à la camera  
                    // ---------------------------------
                    const newCamObject = object.cloneNode(true); // Crée une copie complète de l'objet
                    object.parentNode.removeChild(object); // Supprime l'ancien objet
                    const cam = document.querySelector('#cam'); // Récupère la caméra
                    cam.appendChild(newCamObject); // Ajoute le nouvel objet comme enfant de la caméra
                    newCamObject.setAttribute('position', '0.14 -0.185 -0.35'); // Définit sa position relative à la caméra
                    newCamObject.setAttribute('radius', '0.1'); // Définit son nouveau rayon
                    const newCamObjectID = objectId + '_cam'; 
                    newCamObject.setAttribute('id', newCamObjectID); // Change l'id
                  
                    
                // Si un objet est deja en main, c'est a dire si la caméra possède déjà un objet dont l'id contient "grab"
                // ----------------------------
                } else { 
                    // Place l'objet camera dans la scene, à la place de l'objet clique  
                    // ----------------------------------
                    const cam = document.querySelector('#cam'); // Récupère la caméra
                    const camObject = document.querySelector('#cam [id*="_cam"]'); // Récupère l'objet dont l'id contient "_cam"
                    const camObjectClone = camObject.cloneNode(true); // Crée une copie complète de l'objet
                    cam.removeChild(camObject); // Supprime l'objet qui est a la cam
                    scene.appendChild(camObjectClone); // Ajoute le nouvel objet a la scene
                    camObjectClone.setAttribute('radius', '0.2'); // Définit son nouveau rayon
                    const objectPos = object.getAttribute('position'); // Récupère la position de l'objet cliqué
                    camObjectClone.setAttribute('position', objectPos); // Définit sa position dans la scene
                    camObjectClone.setAttribute('id', camObjectClone.id.replace('_cam', '')); // Retire "_cam" de l'id
                    
                    // Ajoute l'ojbet cliqué à la camera  
                    // ---------------------------------
                    const newCamObject = object.cloneNode(true); // Crée une copie complète de l'objet
                    object.parentNode.removeChild(object); // Supprime l'ancien objet
                    cam.appendChild(newCamObject); // Ajoute le nouvel objet comme enfant de la caméra
                    newCamObject.setAttribute('position', '0.14 -0.185 -0.35'); // Définit sa position relative à la caméra
                    newCamObject.setAttribute('radius', '0.1'); // Définit son nouveau rayon
                    const newCamObjectID = objectId + '_cam'; 
                    newCamObject.setAttribute('id', newCamObjectID); // Change l'id (garde ?)
                }
                
                
          } else if (object.parentElement.id.includes('socket')) { // Vérifie si le parent de l'objet est un socket
          
          
                // Si aucun objet n'est dejà en main
                // ---------------------------------
                if (!document.querySelector('#cam [id*="grab"]')) { 
                      
                      
                    // Ajoute l'ojbet cliqué à la camera  
                    // ---------------------------------
                    const newCamObject = object.cloneNode(true); // Crée une copie complète de l'objet
                  
                    object.parentNode.setAttribute( 'id', object.parentNode.id.replace(object.id.replace('_grab', ''), 'empty')); // retire l'id de l'objet dans l'id du socket
                    
                    object.parentNode.removeChild(object); // Supprime l'ancien objet
                    const cam = document.querySelector('#cam'); // Récupère la caméra
                    cam.appendChild(newCamObject); // Ajoute le nouvel objet comme enfant de la caméra
                    newCamObject.setAttribute('position', '0.14 -0.185 -0.35'); // Définit sa position relative à la caméra
                    newCamObject.setAttribute('radius', '0.1'); // Définit son nouveau rayon
                    const newCamObjectID = objectId + '_cam'; 
                    newCamObject.setAttribute('id', newCamObjectID); // Change l'id
                    
                    
            
                    
                // Si un objet est deja en main, c'est a dire si la caméra possède déjà un objet dont l'id contient "grab"
                // ----------------------------
                } else { 
                    
                    // Place l'objet camera dans le socket, à la place de l'objet cliqué  
                    // ----------------------------------
                    const cam = document.querySelector('#cam'); // Récupère la caméra
                    const camObject = document.querySelector('#cam [id*="_cam"]'); // Récupère l'objet dont l'id contient "_cam"
                    const camObjectClone = camObject.cloneNode(true); // Crée une copie complète de l'objet
                    cam.removeChild(camObject); // Supprime l'objet qui est a la cam
                    
                    object.parentNode.appendChild(camObjectClone); // Ajoute le nouvel objet a la socket
                    camObjectClone.setAttribute('radius', '0.2'); // Définit son nouveau rayon
                    camObjectClone.setAttribute('position', '0 0 0.19'); // Définit sa position dans le socket
                    camObjectClone.setAttribute('id', camObjectClone.id.replace('_cam', '')); // Retire "_cam" de l'id
                    
                    
                    // Ajoute l'ojbet cliqué à la camera  
                    // ---------------------------------
                    const newCamObject = object.cloneNode(true); // Crée une copie complète de l'objet
                    object.parentNode.removeChild(object); // Supprime l'ancien objet
                    cam.appendChild(newCamObject); // Ajoute le nouvel objet comme enfant de la caméra
                    newCamObject.setAttribute('position', '0.14 -0.185 -0.35'); // Définit sa position relative à la caméra
                    newCamObject.setAttribute('radius', '0.1'); // Définit son nouveau rayon
                    const newCamObjectID = objectId + '_cam'; 
                    newCamObject.setAttribute('id', newCamObjectID); // Change l'id pour ajouter '_cam'
                }
          }
    }

    if (object.id.includes('socket')) { // Vérifie si l'id de l'objet contient "socket"

        // Si cam O - socket O
        // ---------------------------------
        if (!document.querySelector('#cam [id*="grab"]') 
            && !object.querySelector('[id*="grab"]')) { // Si la cam et le socket n'ont pas d'enfants avec grab dans l'id **
            // Rien ne se passe  
            // ---------------- 
            // 'You hold nothing'
            
        }
        // Si cam X - socket X 
        // ---------------------------- 
        else if (document.querySelector('#cam [id*="grab"]') 
                 && object.querySelector('[id*="grab"]')) { // Si la cam a un enfant avec grab dans l'id et socket a un enfant avec grab dans l'id **
            
            // Swap cam object et object in socket  
            // -----------------------------------
            
                // Place l'objet camera dans le socket cliqué  
                const cam = document.querySelector('#cam'); // Récupère la caméra
                const camObject = document.querySelector('#cam [id*="_cam"]'); // Récupère l'objet dont l'id contient "_cam"
                const camObjectId = camObject.getAttribute('id'); // Récupère l'id de l'objet a la cam
                const camObjectClone = camObject.cloneNode(true); // Crée une copie complète de l'objet
                cam.removeChild(camObject); // Supprime l'objet qui est a la cam
                object.appendChild(camObjectClone); // place le clone enfant de socket
                camObjectClone.setAttribute('radius', '0.2'); // Définit son nouveau rayon
                camObjectClone.setAttribute('position', '0 0 0.19' ); // Définit sa position relative au socket
                camObjectClone.setAttribute('id', camObjectClone.id.replace('_cam', '')); // Retire "_cam" 
                
                
                const childID = object.firstElementChild.id;
                object.setAttribute('id', (object.id.replace(childID, camObjectClone.id))); //ajoute l'id de lobjet à l'id du socket
                
                
                // Ajoute l'ojbet cliqué à la camera  
                // ---------------------------------
                
                const newCamObject = object.firstElementChild.cloneNode(true); // Crée une copie complète de l'objet
                
                cam.appendChild(newCamObject); // Ajoute le nouvel objet comme enfant de la caméra
                newCamObject.setAttribute('position', '0.14 -0.185 -0.35'); // Définit sa position relative à la caméra
                newCamObject.setAttribute('radius', '0.1'); // Définit son nouveau rayon
                const newCamObjectID = object.firstElementChild.id + '_cam'; //
                newCamObject.setAttribute('id', newCamObjectID); // Change l'id (garde ?)
                object.removeChild(object.firstElementChild); // Supprime l'ancien objet
            
        }
        // Si cam X - socket O
        // ---------------------------- 
        else if (document.querySelector('#cam [id*="grab"]') 
                 && !object.querySelector('[id*="grab"]')) { // Si la cam a un enfant avec grab dans l'id et socket n'as pas d'enfant avec grab dans l'id 
            
            // Place l'objet camera dans le socket cliqué  
            // ------------------------------------------
                const cam = document.querySelector('#cam'); // Récupère la caméra
                const camObject = document.querySelector('#cam [id*="_cam"]'); // Récupère l'objet dont l'id contient "_cam"
                const camObjectId = camObject.getAttribute('id'); // Récupère l'id de l'objet a la cam
                const camObjectClone = camObject.cloneNode(true); // Crée une copie complète de l'objet
                cam.removeChild(camObject); // Supprime l'objet qui est a la cam
                object.appendChild(camObjectClone); // place le clone enfant de socket
                camObjectClone.setAttribute('radius', '0.2'); // Définit son nouveau rayon
                camObjectClone.setAttribute('position', '0 0 0.19' ); // Définit sa position relative au socket
                camObjectClone.setAttribute('id', camObjectClone.id.replace('_cam', '')); // Retire "_cam" 
                
                object.setAttribute('id', (object.id.replace('empty', camObjectClone.id)));//ajoute l'id de lobjet à l'id du socket
                object.setAttribute('id', (object.id.replace('_grab', ''))); // Retire "_grab" pour que le socket de devienne pas grabable
            
         }    
        // Si cam O - socket X
        // ----------------
        else if (!document.querySelector('#cam [id*="grab"]') 
                 && object.querySelector('[id*="grab"]')) { // Si la cam n'a pas denfant avec grab dans l'id et socket a un enfant avec grab dans l'id **
          // Grab l'objet enfant  
          // ----------------
          
        
        }
    }
});
