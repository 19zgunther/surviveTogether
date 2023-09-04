
class Player
{
    constructor(position = new vec4())
    {
        this.id = "player_"+generateID();
        console.log(this.id);

        // Constants defining speed, collision, misc
        this.walkMultiplier = 3;
        this.runMultiplier = 5;
        this.collisionDetectionIterations = 4; // Number of steps we divide each update into to ensure we don't mess up and glitch through walls
        this.collisionDetectionBreakDistance = 2;  // if all entities are further than this, don't collision detect break
        this.radius = 0.01; // used for collision detection
        this.collectRadius = 1;

        this.isFalling = false;

        this.entityBeingBuilt = null;    
        this.inventory = [null,null,null,null,null,null,null,null,null];
        this.inventoryIndex = 0;
        this.inventoryRenderState = 0;
        this.inventoryRenderMaxState = 2;
        this.inventory[0] = new Entity(asset_woodenAxe, generateID(), this.position, this.rotation);
        this.inventory[1] = new Entity(asset_ironAxe, generateID(), this.position, this.rotation);
        this.inventory[2] = new Entity(asset_ironPick, generateID(), this.position, this.rotation);
        this.entityInHand_lastUsedTimestamp_ms = 0;
        

        this.numWood = 20;
        this.numStone = 1;
        this.numIron = 0;

        this.health = 100;
        this.healthRegenPerSecond = 0.25;


        this.position = position;
        this.rotation = new vec4();
        this.scale = new vec4(1,1,1);

        this.reflectivity = 1;

        this.lastUpdateTimestamp_ms = Date.now();

        this.keydownMap = new Map();
        this.mouseIsDown = false;
        this.mouseWasDownLastUpdate = false;
        this.mousePixelPosition = new vec4();
        this.mouseGlPosition = new vec4();
        this.mouseDownPixelPosition = new vec4();
        this.mouseDownGlPosition = new vec4();
        // this.eventListener = this.eventListener.bind(this);
        // addEventListener("mousemove", this.eventListener);
        // addEventListener("mousedown", this.eventListener);
        // addEventListener("mouseup", this.eventListener);
        // addEventListener("keydown", this.eventListener);
        // addEventListener("keyup", this.eventListener);
    }
    eventListener(event)
    {
        if (event.type == 'keydown')
        {
            this.keydownMap.set(event.key.toLowerCase(), true);
            const num = Number(event.key);
            if (!isNaN(num) && num >= 1 && num <= 9)
            {
                this.inventoryIndex = num-1;
            }
        } else if (event.type == 'keyup')
        {
            this.keydownMap.set(event.key.toLowerCase(), false);
        } else if (event.type == 'mousemove')
        {
            const x = -(1.0 - event.offsetX * 2.0 / canvasElement.clientWidth);
            const y = 1.0 - event.offsetY * 2.0 / canvasElement.clientHeight;
            let angle = Math.PI + Math.atan2(y,x);
            if (angle < 0){ angle += 6.28; } else if (angle > 6.28) {angle-=6.28}
            this.rotation.x = angle;

            this.mousePixelPosition = new vec4(event.offsetX, event.offsetY);
            // this.mouseGlPosition = new vec4(this.gl.aspectRatio*(this.mousePixelPosition.x*2 - this.gl.htmlCanvasElement.width) / this.gl.htmlCanvasElement.width, -(this.mousePixelPosition.y*2 - this.gl.htmlCanvasElement.height)/this.gl.htmlCanvasElement.height);
        } else if (event.type == 'mousedown')
        {
            this.mouseIsDown = true;
            this.mouseDownPixelPosition = new vec4(event.offsetX, event.offsetY);
            // this.mouseDownGlPosition = new vec4(this.gl.aspectRatio*(this.mouseDownPixelPosition.x*2 - this.gl.htmlCanvasElement.width) / this.gl.htmlCanvasElement.width, -(this.mouseDownPixelPosition.y*2 - this.gl.htmlCanvasElement.height)/this.gl.htmlCanvasElement.height);
        } else if (event.type == 'mouseup')
        {
            this.mouseIsDown = false;
        }
    }
    collectEntity(assetName = "")
    {
        let wasAbleToCollect = true;
        switch (assetName)
        {
            case "wood": this.numWood++; break;
            case "stone": this.numStone++; break;
            case "iron": this.numIron++; break;
            default:
                wasAbleToCollect = false;
                for (let i in this.inventory)
                {
                    if (this.inventory[i] == null)
                    {
                        // It's easier if we just copy the relavent data...
                        const e = new Entity(assetMap.get(assetName), generateID(), new vec4(), new vec4());
                        this.inventory[i] = e;
                        wasAbleToCollect = true;
                        break;
                    }
                }
                break;
        }
        return wasAbleToCollect;
        console.log("Wood:"+this.numWood+" Stone:"+this.numStone+" Iron:"+this.numIron);
    }
    _updateMovement(dt_s, entities)
    {
        return;
        // Movement
        const moveVec = new vec4();
        if (this.keydownMap.get("w"))
        {
            moveVec.y += 1;
        }
        if (this.keydownMap.get("s"))
        {
            moveVec.y -= 0.8;
        }
        if (this.keydownMap.get("a"))
        {
            moveVec.x -= 1;
        }
        if (this.keydownMap.get("d"))
        {
            moveVec.x += 1;
        }
        // if (this.keydownMap.get(" "))
        // {
        //     moveVec.z += 1;
        // }
        moveVec.muli(dt_s);
        if (this.keydownMap.get('shift'))
        {
            moveVec.muli(this.runMultiplier);
        } else {
            moveVec.muli(this.walkMultiplier);
        }

        // if (this.position.z > 0)
        // {
        //     console.log(this.position.z)
        //     moveVec.z -= 0.02;
        // }

        let newPos = this.position.copy();
        let hitObject = false;
        let numChecked=0;

        if (moveVec.getLength() > 0.01 || this.position.z > 0)
        {
            let minDist = 10000;
            for (let k=0; k<this.collisionDetectionIterations; k++)
            {
                newPos = this.position.add(moveVec.mul(k/this.collisionDetectionIterations));
                for (let i in entities)
                {
                    const e = entities[i];
                    const vecPlayerToE = e.position.sub(newPos);
                    vecPlayerToE.z = 0; 
                    const dist = vecPlayerToE.getLength();
                    minDist = Math.min(dist, minDist);
                    vecPlayerToE.scaleToUnit();       
                    if (dist < e.asset.boundingBox.radius + this.radius)
                    {
                        const closestPointOfPlayerToE = newPos.add(vecPlayerToE.mul(this.radius));
                        if (e.getIsInsideBoundingCylinder(closestPointOfPlayerToE))
                        {
                            newPos.addi( vecPlayerToE.mul(-0.04) );
                            hitObject = true;
                        }
                        numChecked++;
                    }          
                }
                if (hitObject)
                {
                    break;
                }
                if (minDist > this.collisionDetectionBreakDistance)
                {
                    // Just a simple check to see if we can exit the loop early (All entities are far away, so don't check anymore!)
                    newPos = this.position.add(moveVec);
                }
            }
            this.position = newPos;
        }
        // if (this.position.z < 0)
        // {
        //     this.position.z = 0;
        // }
    }
    update(commandList=[], entities=[])
    {
        return;
        const dt_s = (Date.now() - this.lastUpdateTimestamp_ms)/1000;
        this.lastUpdateTimestamp_ms = Date.now();
        this._updateMovement(dt_s, entities);

        this.mouseUp   = (this.mouseWasDownLastUpdate && !this.mouseIsDown) ? true : false;
        this.mouseDown = (!this.mouseWasDownLastUpdate && this.mouseIsDown) ? true : false;
        this.mouseWasDownLastUpdate = this.mouseIsDown;
        const entityInHand = this.inventory[this.inventoryIndex];

        if (this.entityBeingBuilt != null)
        {
            // Render entityBeingBuilt in front of player's head/face
            this.entityBeingBuilt.position = new mat4().makeRotation(this.rotation).mul(new vec4(-1,0,0)).addi(this.position);
            this.entityBeingBuilt.rotation = this.rotation.add(Math.PI/2,0 , 0);
            // this.gl.renderObjectCustomView(this.entityBeingBuilt.asset.name, null, null, this.entityBeingBuilt.position, this.entityBeingBuilt.rotation, new vec4(1,1,1,1), 1);
            if (this.mouseDown)
            {
                // Purchase entity and place
                this.purchaseRecipe(this.entityBeingBuilt.asset.recipe);
                commandList.push({
                    command:'placeEntity',
                    assetEntity: this.entityBeingBuilt
                });
                this.entityBeingBuilt = null;
            }
            if (this.keydownMap.get("escape"))
            {
                // Cancel building/purchasing
                this.entityBeingBuilt = null;
            }
        }

        if (this.entityBeingBuilt == null && entityInHand instanceof Entity && entityInHand.asset.isTool)
        {
            if (entityInHand.health <= 0)
            {
                this.inventory[this.inventoryIndex] = null;
            }
            entityInHand.rotation = this.rotation.copy();
            entityInHand.position = this.position.copy();
            entityInHand.lastUsedTimestamp_ms = (entityInHand.lastUsedTimestamp_ms != undefined) ? entityInHand.lastUsedTimestamp_ms : 0;

            const percentCooldownCompleted = (Date.now() - entityInHand.lastUsedTimestamp_ms) / entityInHand.asset.damage.cooldown_ms;
            if (percentCooldownCompleted < 1)
            {
                entityInHand.rotation = this.rotation.add(0,percentCooldownCompleted-1,0);
            } else {
                // Tool is ready to be used
                if (this.keydownMap.get("e") || this.mouseIsDown)
                {
                    entityInHand.lastUsedTimestamp_ms = Date.now();

                    // Find closest/first entity where the player is facing the object and max tool range is inside of the object's bounding box
                    let inRangeEntities = [];
                    for (let i in entities)
                    {
                        const e = entities[i];
                        const vecPlayerToE = e.position.sub(this.position);
                        const dist = vecPlayerToE.getLength();
                        let angleToEntity = Math.atan2(-vecPlayerToE.y, -vecPlayerToE.x);
                        if (angleToEntity < 0) { angleToEntity += 6.28} if (angleToEntity > 6.28) { angleToEntity -= 6.28; }
                        const angleDiff = Math.abs(angleToEntity - this.rotation.x);
                        vecPlayerToE.scaleToUnit();       
                        if (angleDiff < 1 && dist < e.asset.boundingBox.radius + entityInHand.asset.damage.range)
                        {
                            const closestPointOfRangeToE = this.position.add(vecPlayerToE.mul(entityInHand.asset.damage.range));
                            if (e.getIsInsideBoundingCylinder(closestPointOfRangeToE) || dist < e.asset.boundingBox.radius)
                            {
                                inRangeEntities.push({angleDiff: angleDiff, entity:e});
                            }
                        }
                    }

                    inRangeEntities.sort((a,b) => a.angleDiff - b.angleDiff);

                    for (let i in inRangeEntities)
                    {
                        if (i > 0 && (entityInHand.asset.damage.splash == undefined || entityInHand.asset.damage.splash <= i))
                        {
                            console.log("BREAKING AT ",i);
                            break;
                        }
                        commandList.push({
                            command:'applyDamage',
                            entity: inRangeEntities[i].entity,
                            damage: entityInHand.asset.damage,
                            tool:   entityInHand,
                        })
                    }

                    // if (closestEntity != null)
                    // {
                    //     commandList.push({
                    //         command:'applyDamage',
                    //         entity: closestEntity,
                    //         damage: entityInHand.asset.damage,
                    //         tool:   entityInHand,
                    //     })
                    //     console.log(entityInHand);
                    // }

                    // Player is trying to attack/use tool
                    // If the closest Entity is not null and within range...
                    //     if (this.closestEntity != null && 
                    //         this.closestEntityDist < entityInHand.asset.damage.range)
                    //     {   
                    //         // Compute angle from entity to player, thus to ensure we're having to actually hit the target...
                    //         const vecFromEntityToPlayer = this.position.sub(this.closestEntity.position);
                    //         let angle = Math.atan2(vecFromEntityToPlayer.y, vecFromEntityToPlayer.x);
                    //         if (angle < 0){ angle += 6.28; } else if (angle > 6.28) {angle-=6.28} // Ensure angle is between 0 and 2PI
                            
                    //         if (Math.abs(this.rotation.x - angle) < 1.57 || Math.abs(this.rotation.x - angle) > 4.71)
                    //         {
    
                    //             // We hit the entity!!!
                    //             // const damageActuallyApplied = this.closestEntity.applyDamage(entityInHand.asset.damage);
                    //             // entityInHand.health -= damageActuallyApplied;
                    //             commandList.push({
                    //                 command:'applyDamage',
                    //                 entity: this.closestEntity,
                    //                 damage: entityInHand.asset.damage,
                    //                 tool:   entityInHand,
                    //             })
                    //             console.log(entityInHand);
                    //         }
                    //     }
                    //     entityInHand.lastUsedTimestamp_ms = Date.now();
                }
            }
            // gl.renderObject(entityInHand.id,0);
            // console.log("RENDER ITEM IN HAND HERE");
            // this.gl.renderObjectCustomView(entityInHand.asset.name, null, null, entityInHand.position, entityInHand.rotation, new vec4(1,1,1,1), 0)

            // handle throwing object...
            if (this.keydownMap.get("q"))
            {
                const vec = new mat4().makeRotation(this.rotation).mul(new vec4(-5,0,0));
                commandList.push({
                    command:    'instantiate',
                    name:       entityInHand.asset.name,
                    position:   this.position.copy().add(vec),
                    rotation:   new vec4(),
                    count:      1
                })
                this.inventory[this.inventoryIndex] = null;
            }
        }

        // Update health
        if (this.health < 100)
        {
            this.health += dt_s * this.healthRegenPerSecond;
        }
    }
    canPurchaseRecipe(recipe)
    {
        let canBeBuilt = true;
        for (let j in recipe)
        {
            const r = recipe[j];
            if (r.assetName == 'wood' && this.numWood < r.count)
            {
                canBeBuilt = false;
                break;
            }
            if (r.assetName == 'stone' && this.numStone < r.count)
            {
                canBeBuilt = false;
                break;
            }
            if (r.assetName == 'iron' && this.numIron < r.count)
            {
                canBeBuilt = false;
                break;
            }
        }
        return canBeBuilt;
    }
    purchaseRecipe(recipe)
    {
        for (let j in recipe)
        {
            const r = recipe[j];
            if (r.assetName == 'wood')
            {
                this.numWood -= r.count;
            }
            if (r.assetName == 'stone')
            {
                this.numStone -= r.count;
            }
            if (r.assetName == 'iron')
            {
                this.numIron -= r.count;
            }
        }
    }
    applyDamage(damage = {})
    {
        return;
        if (!isNaN(damage))
        {
            this.health -= damage;
            return;
        }

        let amount = 0;
        for (const [key, value] of Object.entries(damage)) {
            if (key.includes('Damage'))
            {
                amount = Math.max(amount, value);
            }
        }
        this.health -= amount;
    }
}

const canvasElement = document.getElementById("mainCanvas");
const gl = new SpeedyGL(canvasElement);
const projectionMatrix = new mat4().makePerspective(0.7,canvasElement.width/canvasElement.height,1,1000);
const viewMatrix = new mat4();
const cameraPosition = new vec4();
const cameraRotation = new vec4(0,0,-Math.PI/4);

const entities = [];
const entitiesMap = new Map();
var incommingCommands = "";
var outgoingCommands = "";
const player = new Player();
const otherPlayers = [];

const keydownMap = new Map();
var mouseIsDown = false;
var mouseWentDown = false;
var mouseWheelChange = 0;
const mousePixelPosition = new vec4();
const mouseGlPosition = new vec4();
const mouseDownPixelPosition = new vec4();
const mouseDownGlPosition = new vec4();
const mouseUpPixelPosition = new vec4();
const mouseUpGlPosition = new vec4();

const frameRate = 30;

canvasElement.addEventListener("mousedown", eventListener);
window.addEventListener("mousemove", eventListener);
window.addEventListener("mouseup", eventListener);
window.addEventListener("keydown", eventListener);
window.addEventListener("keyup", eventListener);
window.addEventListener("wheel", eventListener);
function eventListener(event)
{
    if (event.type == 'keydown')
    {
        keydownMap.set(event.key.toLowerCase(), Date.now());
    } else if (event.type == 'keyup')
    {
        keydownMap.set(event.key.toLowerCase(), undefined);
    } else if (event.type == 'mousemove')
    {
        mousePixelPosition.x = event.offsetX;
        mousePixelPosition.y = event.offsetY;
        mouseGlPosition.x = -(1.0 - event.offsetX * 2.0 / canvasElement.clientWidth);
        mouseGlPosition.y = 1.0 - event.offsetY * 2.0 / canvasElement.clientHeight;
        // const x = -(1.0 - event.offsetX * 2.0 / canvasElement.clientWidth);
        // const y = 1.0 - event.offsetY * 2.0 / canvasElement.clientHeight;
        // let angle = Math.PI + Math.atan2(y,x);
        // if (angle < 0){ angle += 6.28; } else if (angle > 6.28) {angle-=6.28}
        // this.rotation.x = angle;
        // this.mousePixelPosition = new vec4(event.offsetX, event.offsetY);
        // this.mouseGlPosition = new vec4(this.gl.aspectRatio*(this.mousePixelPosition.x*2 - this.gl.htmlCanvasElement.width) / this.gl.htmlCanvasElement.width, -(this.mousePixelPosition.y*2 - this.gl.htmlCanvasElement.height)/this.gl.htmlCanvasElement.height);
    } else if (event.type == 'mousedown')
    {
        mouseDownPixelPosition.x = event.offsetX;
        mouseDownPixelPosition.y = event.offsetY;
        mouseDownGlPosition.x = -(1.0 - event.offsetX * 2.0 / canvasElement.clientWidth);
        mouseDownGlPosition.y = 1.0 - event.offsetY * 2.0 / canvasElement.clientHeight;
        mouseIsDown = true;
        mouseWentDown = true;
        // this.mouseIsDown = true;
        // this.mouseDownPixelPosition = new vec4(event.offsetX, event.offsetY);
        // this.mouseDownGlPosition = new vec4(this.gl.aspectRatio*(this.mouseDownPixelPosition.x*2 - this.gl.htmlCanvasElement.width) / this.gl.htmlCanvasElement.width, -(this.mouseDownPixelPosition.y*2 - this.gl.htmlCanvasElement.height)/this.gl.htmlCanvasElement.height);
    } else if (event.type == 'mouseup')
    {
        mouseUpPixelPosition.x = event.offsetX;
        mouseUpPixelPosition.y = event.offsetY;
        mouseUpGlPosition.x = -(1.0 - event.offsetX * 2.0 / canvasElement.clientWidth);
        mouseUpGlPosition.y = 1.0 - event.offsetY * 2.0 / canvasElement.clientHeight;
        mouseIsDown = false;
        // this.mouseIsDown = false;
    } else if (event.type == 'wheel')
    {
        mouseWheelChange = event.deltaY;
    }
}
function setup()
{

    function generateGround(size=50)
    {
        let vertices = [];
        let normals = [];
        let colors = [];
        let indices = [];
        // for (let x=-size; x<size; x++)
        // {
        //     for (let y=-size; y<size; y++)
        //     {
        //         vertices.push(x, y, 0);
        //         const r = Math.random();
        //         normals.push(0, 1-r, -r);
        //         colors.push(0,0.3,0.2,1);
        //     }
        // }

        
        // for (let y=0; y<size*2-1; y++)
        // {
        //     for (let x=0; x<size*2-1; x++)
        //     {
        //         indices.push( y*size*2+x, y*size*2+2*size+x, y*size*2+x+1,     y*size*2+2*size+x, y*size*2+2*size+1+x, y*size*2+x+1  );
        //     }
        // }

        let indOffset = 0;
        for (let x=-size; x<size; x++)
        {
            for (let y=-size; y<size; y++)
            {
                let c = new vec4(0, 0.2+0.1*Math.random(), 0.2+0.05*Math.random(), 1);
                vertices.push(x,y,0,  x+1,y,0, x,y+1,0,);
                normals.push(0,0,1,  0,0,1,  0,0,1);
                colors.push(c.x, c.y, c.z, c.a,  c.x, c.y, c.z, c.a,   c.x, c.y, c.z, c.a  );
                indices.push( indOffset, indOffset + 1, indOffset + 2);
                indOffset += 3;

                c = new vec4(0, 0.2+0.1*Math.random(), 0.2+0.05*Math.random(), 1);
                vertices.push(x+1,y,0,  x+1,y+1,0, x,y+1,0,);
                normals.push(0,0,1,  0,0,1,  0,0,1);
                colors.push(c.x, c.y, c.z, c.a,  c.x, c.y, c.z, c.a,   c.x, c.y, c.z, c.a  );
                indices.push( indOffset, indOffset + 1, indOffset + 2);
                indOffset += 3;
            }
        }


        return {
            vertices: vertices,
            normals:  normals,
            colors:   colors,
            indices:  indices
        }
    }
    // gl.createObject("ground", [-1,-1,0, -1,1,0, 1,1,0, 1,-1,0], [0,0,1, 0,0,1, 0,0,1, 0,0,1], new vec4(0,0.3,0.2,1), [0,2,1, 0,3,2], 0);
    const groundData = generateGround();
    gl.createObject("ground", groundData.vertices, groundData.normals, groundData.colors, groundData.indices, 1);
    // gl.createObject("graySquare", [-1,-1,0, -1,1,0, 1,1,0, 1,-1,0], [0,0,1, 0,0,1, 0,0,1, 0,0,1], new vec4(0.9,0.9,0.9,0.2), [0,2,1, 0,3,2, 0,1,2, 0,2,3], 0);
    gl.createObject("graySquare", [-.5,-.5,0, -.5,.5,0, .5,.5,0, .5,-.5,0], [0,0,1, 0,0,1, 0,0,1, 0,0,1], new vec4(0.9, 0.9, 0.9, 0.15), [0,2,1, 0,3,2, 0,1,2, 0,2,3], 0);

    // Create all GL asset objects
    for (let i in assets)
    {
        const A = assets[i];
        gl.createObject(A.name, A.vertices, A.normals, A.colors, A.indices, 0);
    }
}
setup();


let updateNumber = 0;
let lastUpdateTimestamp_ms = 0;
setInterval(update, Math.round(1000/frameRate));
function update()
{
    updateNumber++;

    const entitiesToRenderMap = new Map();
    const dt_ms = (Date.now() - lastUpdateTimestamp_ms);
    const dt_s = dt_ms / 1000;
    lastUpdateTimestamp_ms = Date.now();

    // Debug stuff 
    {
        if (keydownMap.get('i')) { player.numWood++; }
        if (keydownMap.get('o')) { player.numStone++; }
        if (keydownMap.get('p')) { player.numIron++; }
    }


    // Resize window
    {
        if (updateNumber % 10 == 0)
        {   
            const bb = canvasElement.getBoundingClientRect();
            canvasElement.width = Math.round(bb.width);
            canvasElement.height = Math.round(bb.height);
            projectionMatrix.makePerspective(0.7,canvasElement.width/canvasElement.height,1,1000);
        }
    }

    // Initialize entitiesToRenderMap
    for (let i in assets)
    {
        entitiesToRenderMap.set(assets[i].name, []);
    }

    // Update entities
    {
        for (let i in entities)
        {
            const e = entities[i];
            if (e.targetPosition != undefined)
            {
                // e.position = e.position.mul(0.98).add(e.targetPosition.mul(0.02));
                const vecToTargetPos = e.targetPosition.sub(e.position).scaleToUnit();
                e.position.addi(vecToTargetPos.mul(e.velocity * dt_s));
            }
        }
        let i=0;
        while (i<entities.length)
        {
            if (entities[i].health <= 0 || entities[i].id == "" || entities[i].id == null)
            {
                entitiesMap.set(entities[i].id, undefined);
                entities.splice(i,1);
                continue;
            }
            i++;
        }
    }

    // Update Player    (and add entities to entitiesToRenderMap)
    {
        // Collect all nearby entities, and add entities to entitiesToRenderMap
        const entitiesReallyCloseToPlayer = [];  // Used for collision detection
        const entitiesCloseToPlayer = [];
        for (let i in entities)
        {
            const distanceToPlayer = entities[i].position.sub(player.position).getLength();
            if (distanceToPlayer < player.radius + entities[i].asset.boundingCylinderRadius + 0.5)
            {
                entitiesReallyCloseToPlayer.push(entities[i]);
            }
            if (distanceToPlayer < player.radius + entities[i].asset.boundingCylinderRadius + 3)
            {
                entitiesCloseToPlayer.push(entities[i]);
            }
            if (distanceToPlayer < player.collectRadius && entities[i].isCollectable)
            {
                // console.log(`\n\nReqesting collect ${entities[i].id}`);
                outgoingCommands += cts_collectEntity(player.id, entities[i].id);
            }

            // Add entity to entitiesToRenderMap
            if (entities[i].isCollectable)
            {
                entitiesToRenderMap.get(entities[i].asset.name).push({
                    position: entities[i].position.add(0,0,Math.sin(Date.now()/300 + entities[i].isCollectableRandomBounceOffset)*0.3+0.3, 0, 0),
                    rotation: entities[i].rotation,
                    scale: new vec4(1,1,1,1),
                    reflectivity: 1,
                });
            } else {
                // Set the reflectivity to show the user when they hit an object
                entities[i].reflectivity = Math.max(0, entities[i].tookDamageTimestamp_ms/500 - Date.now()/500 + 1 );
                entitiesToRenderMap.get(entities[i].asset.name).push(entities[i]);
            }
        }

        // Update player movement & rotation
        {
            // Handle key input
            const moveVec = new vec4();
            if (keydownMap.get("w"))
            {
                moveVec.y += 1;
            }
            if (keydownMap.get("s"))
            {
                moveVec.y -= 0.8;
            }
            if (keydownMap.get("a"))
            {
                moveVec.x -= 1;
            }
            if (keydownMap.get("d"))
            {
                moveVec.x += 1;
            }

            moveVec.muli( dt_s );
            if (keydownMap.get('shift'))
            {
                moveVec.muli(player.runMultiplier);
            } else {
                moveVec.muli(player.walkMultiplier);
            }

            let newPos = player.position.copy();
            let hitObject = false;
            let numChecked=0;

            if (moveVec.getLength() > 0.01 || player.position.z > 0)
            {
                let minDist = 10000;
                for (let k=0; k<player.collisionDetectionIterations; k++)
                {
                    newPos = player.position.add(moveVec.mul(k/player.collisionDetectionIterations));
                    for (let i in entitiesReallyCloseToPlayer)
                    {
                        const e = entitiesReallyCloseToPlayer[i];
                        if (e.isCollectable) { continue; }
                        const vecPlayerToE = e.position.sub(newPos);
                        vecPlayerToE.z = 0; 
                        const dist = vecPlayerToE.getLength();
                        minDist = Math.min(dist, minDist);
                        vecPlayerToE.scaleToUnit();       
                        if (dist < e.asset.boundingBox.radius + player.radius)
                        {
                            const closestPointOfPlayerToE = newPos.add(vecPlayerToE.mul(player.radius));
                            if (e.getIsInsideBoundingCylinder(closestPointOfPlayerToE))
                            {
                                newPos.addi( vecPlayerToE.mul(-0.04) );
                                hitObject = true;
                            }
                            numChecked++;
                        }          
                    }
                    if (hitObject)
                    {
                        break;
                    }
                    if (minDist > player.collisionDetectionBreakDistance)
                    {
                        // Just a simple check to see if we can exit the loop early (All entities are far away, so don't check anymore!)
                        newPos = player.position.add(moveVec);
                    }
                }
                player.position = newPos;
            }

            // Set rotation
            if (Date.now() - player.entityInHand_lastUsedTimestamp_ms > 1000 || player.entityBeingBuilt != null)
            {
                player.rotation.x = player.rotation.x*0.8 + 0.2*Math.atan2( mouseGlPosition.y, mouseGlPosition.x );
            }

            player.position.x = Math.max(Math.min(player.position.x, 50), -50);
            player.position.y = Math.max(Math.min(player.position.y, 50), -50);
        }

        // Update player health regeneration
        {
            if (player.health < 100)
            {
                player.health += player.healthRegenPerSecond * dt_s;
            }


        }

        // Update inventory (index)
        {
            const others=[')','!','@','#','$','%','^','&','*','('];
            for (let i=1; i<10; i++)
            {
                if (keydownMap.get(''+i) || keydownMap.get(others[i]))
                {
                    player.inventoryIndex = i - 1;
                }
            }
            if (mouseWheelChange > 0) { player.inventoryIndex += 1; }
            else if (mouseWheelChange < 0) { player.inventoryIndex -= 1; }
            if (player.inventoryIndex < 0) { player.inventoryIndex = 8; }
            if (player.inventoryIndex > 8) { player.inventoryIndex = 0; }

            if ((keydownMap.get('q') || keydownMap.get('Q')) && player.inventory[player.inventoryIndex] != null)
            {
                // Remove from inventory, throw on ground, isCollectable=true
                const e = player.inventory[player.inventoryIndex];
                const angle = player.rotation.x;
                e.position = player.position.add(Math.cos(angle), Math.sin(angle));
                e.rotation = player.rotation.add(1.57,);
                outgoingCommands += stc_instantiateEntity(e.asset.name, e.id, e.position, e.rotation, true);
                player.inventory[player.inventoryIndex] = null;
            }

        }

        // Update entityInHand & attacking/using entity/tool
        if (player.entityBeingBuilt == null) {
            const entityInHand = player.inventory[player.inventoryIndex];
            let entityInHandUseCooldown_ms = 300;
            
            if (entityInHand instanceof Entity)
            {
                if (entityInHand.asset.type == 'tool' || entityInHand.asset.type == 'weapon') {
                    // Set object position and rotation, adjusting for cooldown if tool
                    entityInHand.position = player.position.copy();
                    entityInHand.rotation = player.rotation.add(3.14, 0, 0);
                    entityInHandUseCooldown_ms =  (entityInHand.asset.damage != null) ? entityInHand.asset.damage.cooldown_ms : 300;
                    const timeSinceLastItemUse_ms = Date.now() - player.entityInHand_lastUsedTimestamp_ms;
                    const percentCooldownCompleted = timeSinceLastItemUse_ms / entityInHandUseCooldown_ms;
                    if (percentCooldownCompleted < 1)
                    {
                        entityInHand.rotation.y = -Math.sin(1-percentCooldownCompleted);
                    }
                    
                    // Check if we need to 'use' the tool
                    if (mouseIsDown && Date.now() - player.entityInHand_lastUsedTimestamp_ms > entityInHandUseCooldown_ms)
                    {
                        player.entityInHand_lastUsedTimestamp_ms = Date.now();
                        const damageObj = (entityInHand != null && entityInHand.damage != undefined) ? entityInHand.damage : {attackDamage:1, chopDamage:1, mineDamage:1, range:0.5, cooldown_ms:300};
                        
                        const vecFromPlayerToHitPos = new vec4(Math.cos(player.rotation.x), Math.sin(player.rotation.x)).scaleToUnit();
                        
                        // for (let dist=0.1; dist<damageObj.range; dist+=0.1)
                        // {
                        //     const pos = vecFromPlayerToHitPos.mul(dist).add(player.position);
                        //     for (let i in entitiesCloseToPlayer)
                        //     {
                        //         if (entitiesCloseToPlayer[i].getIsInsideBoundingCylinder(pos))
                        //         {
                        //             entityHit = entitiesCloseToPlayer[i];
                        //             break;
                        //         }
                        //     }
                        //     if (entityHit != null){break;}
                        // }
                        let entityHit = null;
                        let closestEntityDist = 10000;
                        for (let i in entitiesCloseToPlayer)
                        {
                            const dist = entitiesCloseToPlayer[i].position.sub(player.position).getLength();
                            if (dist < closestEntityDist && dist < damageObj.range + entitiesCloseToPlayer[i].asset.boundingCylinderRadius) { 
                                entityHit = entitiesCloseToPlayer[i]; 
                                closestEntityDist = dist;
                            }
                        }

                        if (entityHit instanceof Entity && !entityHit.isCollectable)
                        {
                            const angle = Math.atan2(entityHit.position.y-player.position.y, entityHit.position.x-player.position.x);
                            player.rotation.x = angle;

                            const damageAmount = computeDamageAmount(entityHit, damageObj);
                            outgoingCommands += cts_applyDamageToEntity(entityHit.id, damageAmount);
                        }
                    }
                } else {
                    const angle = player.rotation.x;
                    entityInHand.position = player.position.add(Math.cos(angle), Math.sin(angle));
                    entityInHand.rotation = player.rotation.add(1.57,);
                    if (mouseWentDown)
                    {
                        // player.purchaseRecipe(entityInHand.asset.recipe);
                        outgoingCommands += stc_instantiateEntity(entityInHand.asset.name, entityInHand.id, entityInHand.position, entityInHand.rotation);
                        // Remove from inventory
                        player.inventory[player.inventoryIndex] = null;
                    }
                }
            }
        }
    }

    // Render
    {
        // Add player, entityInHand, and entityBeingBuilt to entitiesToRenderMap
        {
            entitiesToRenderMap.get("playerModel").push(player);
            const entityInHand = player.inventory[player.inventoryIndex];
            if (entityInHand instanceof Entity)
            {
                entitiesToRenderMap.get(entityInHand.asset.name).push(
                    entityInHand
                )
            }
            if (player.entityBeingBuilt != null)
            {
                entitiesToRenderMap.get(player.entityBeingBuilt.asset.name).push(
                    {
                        position: player.entityBeingBuilt.position,
                        rotation: player.entityBeingBuilt.rotation,
                        scale: new vec4(1,1,1,1),
                        reflectivity: 1,
                    }
                )
            }
        }

        // Add each other player 
        for (let i in otherPlayers)
        {
            const p = otherPlayers[i];
            if (p.id == player.id || p.id == null || p.id == '') 
            {
                otherPlayers.splice(i,1);
                continue;
            }

            // Update player position
            const dt = p.timestamp_ms - p.pTimestamp_ms; // total dt between received updates
            const stopTimestamp = p.timestamp_ms + dt;   // When the player should stop moving
            const percent = Math.max(0,Math.min(1, 1 - (stopTimestamp - Date.now()) / dt));  // Compute percent of the path 
            p.position = p.targetPosition.mul(percent).add( p.startPosition.mul(1-percent) );
            p.rotation = p.targetRotation.mul(percent).add( p.startRotation.mul(1-percent) );
            p.scale    = p.targetScale.mul(   percent).add( p.startScale.mul(   1-percent) );
            entitiesToRenderMap.get("playerModel").push(
                p
            )

            // Add other player's asset in hand, and compute rotation of tool
            const assetInHand = assetMap.get(p.entityInHand_assetName);
            if (assetInHand != null) {
                let rot = p.rotation.copy().add(3.14,0,0);
                const percentCooldownCompleted = (Date.now() - p.entityInHand_lastUsedTimestamp_ms) / assetInHand.damage.cooldown_ms;
                if (percentCooldownCompleted < 1)
                {
                    rot = p.rotation.add(3.14,(percentCooldownCompleted-1),0);
                }
                entitiesToRenderMap.get(assetInHand.name).push(
                    {
                        position: p.position,
                        rotation: rot,
                        scale:    new vec4(1,1,1,1),
                        reflectivity:0,
                    }
                )
            }
        }

        // Add ground to renderer
        entitiesToRenderMap.set('ground',[
            {
                position: new vec4(),
                rotation: new vec4(),
                scale: new vec4(1,1,1),
                reflectivity: 0,
            }
        ])
        cameraRotation.set(0,0,-Math.PI/4);
        cameraPosition.muli(0.9, 0.9, 0.9);
        cameraPosition.addi(player.position.add(0,-7,7).muli(0.1, 0.1, 0.1));
        gl.clear(new vec4(0,0,0,1));
        gl.clearDepthBuffer();

        const tempViewMat = new mat4().makeRotation(cameraRotation).mul( new mat4().makeTranslation(cameraPosition.mul(-1,-1,-1,1)) );
        gl.renderAllOfThese(projectionMatrix, tempViewMat, cameraPosition, new vec4(0.5,0.5,0.5), 0.7, entitiesToRenderMap);
    }

    // Render Inventory
    {   
        /////////////// Traditional Inventory ///////////////////////
        const aspectRatio = canvasElement.width/canvasElement.height;
        const orthogonalProjectionMatrix = new mat4().makeOrthogonal(1, aspectRatio, 0.1, -1000);
        const scale = new vec4(0.1, 0.1, 0.1);
        const renderMap = new Map();
        renderMap.set("graySquare", []);
        for (let i in assets)
        {
            renderMap.set(assets[i].name, []);
        }

        let inventoryMousePosition = mouseGlPosition.mul(aspectRatio,1,1).mul(10,10,10).add(4.5,9);

        for (let i in player.inventory)
        {
            const e = player.inventory[i];
            if (e instanceof Entity)
            {
                renderMap.get(e.asset.name).push(
                    {
                        position: new vec4(i,0,100),
                        rotation: new vec4(0,0,-1.57),
                        scale: new vec4(0.8,0.8,0.8),
                        reflectivity: 0,
                    }
                )
            }

            let posOffset = 0;
            if (inventoryMousePosition.x + 0.5 > i && inventoryMousePosition.x - 0.5 < i
                && inventoryMousePosition.y + 0 > 0 && inventoryMousePosition.y - 1 < 0)
            {
                posOffset += 0.1;
                if (mouseWentDown)
                {
                    player.inventoryIndex = i;
                }
            }

            // Add a white space behind
            renderMap.get("graySquare").push(
                {
                    position: new vec4(i,0.5+posOffset,1),
                    rotation: new vec4(0,0,0),
                    scale: (i != player.inventoryIndex) ? new vec4(0.9,1.0,0.9) : new vec4(0.9,1.2,0.9),
                    reflectivity: 0,
                }
            )
        }

        // Add wood, stone, and iron to the list
        {
            for (let i=0; i<player.numWood; i++)
            {
                renderMap.get("wood").push(
                    {
                        position: new vec4(i/5+9,0,0),
                        rotation: new vec4(1,1),
                    }
                )
            }
            for (let i=0; i<player.numStone; i++)
            {
                renderMap.get("stone").push(
                    {
                        position: new vec4(i/5+9,0.5,0),
                        rotation: new vec4(1,1),
                    }
                )
            }
            for (let i=0; i<player.numIron; i++)
            {
                renderMap.get("iron").push(
                    {
                        position: new vec4(i/5+9,1,0),
                        rotation: new vec4(1,1),
                    }
                )
            }
        }

        gl.clearDepthBuffer();
        gl.renderAllOfThese(orthogonalProjectionMatrix, new mat4().makeTranslationAndScale(new vec4(-0.45*10*scale.x,-0.9,0), scale), new vec4(), new vec4(0.5,0.5,0.5), 0.7, renderMap);
    
        
        /////////////  Crafting Inventory ////////////////////////////////
        renderMap.clear();
        renderMap.set("graySquare", []);
        for (let i in assets)
        {
            renderMap.set(assets[i].name, []);
        }
        inventoryMousePosition = mouseGlPosition.mul(aspectRatio,1,1).mul(10,10,10).add(9,-9);

        const recipesThatCanBeCrafted = new Map();
        const recipeTypeMap = new Map();
        for (let i in assets)
        {
            const a = assets[i];
            if (a.recipe != null)
            {
                if (player.canPurchaseRecipe(a.recipe))
                {
                    recipesThatCanBeCrafted.set(a.name, true);
                }

                if (recipeTypeMap.get(a.type) == undefined)
                {
                    recipeTypeMap.set(a.type, []);
                }
                recipeTypeMap.get(a.type).push(a);
            }
        }

        // For each object that has a recipe... (dict of arrays, each with same asset.type)
        let y = 0;
        for (const key of recipeTypeMap.keys())
        {
            // For each asset in of type ___
            const assetArr = recipeTypeMap.get(key);
            let x=0;
            let mouseOverIndex = -1;
            for (let i in assetArr)
            {
                // Add object to render map
                renderMap.get(assetArr[i].name).push(
                    {
                        position: new vec4(x,-y,100),
                        rotation: new vec4(0,0,-1.57),
                        scale: new vec4(0.8,0.8,0.8),
                        reflectivity: 0,
                    }
                )

                // Check if the mouse is over the current obj or not
                let modifier = 0;
                if (inventoryMousePosition.x + 0.5 > x && inventoryMousePosition.x - 0.5 < x
                    && inventoryMousePosition.y + 0 > -y && inventoryMousePosition.y - 1 < -y)
                {
                    mouseOverIndex = i;
                    modifier += 0.1;
                }

                // Render greySquare if we can craft it
                if (recipesThatCanBeCrafted.get(assetArr[i].name) == true)
                {
                    renderMap.get("graySquare").push(
                        {
                            position: new vec4(x,-y+0.5,1),
                            rotation: new vec4(0,0,0),
                            scale: new vec4(0.9,0.9-modifier,0.9),
                            reflectivity: 0,
                        }
                    )
                }

                x++;
            }

            // If the mouse is currently hovering over...
            if (mouseOverIndex >= 0)
            {
                // Render recipe for asset
                let tempx = 0;
                const asset = assetArr[mouseOverIndex];
                for (let j in assetArr[mouseOverIndex].recipe)
                {
                    const assetName = asset.recipe[j].assetName;
                    const count = asset.recipe[j].count;
                    for (let k=0; k<count; k++)
                    {
                        renderMap.get(assetName).push(
                            {
                                position: inventoryMousePosition.add(tempx, 0, 1000),
                                rotation: new vec4(0,0,-1.57),
                                scale: new vec4(0.9,0.9,0.9),
                                reflectivity: 0,
                            }
                        )
                        renderMap.get("graySquare").push(
                            {
                                position: inventoryMousePosition.add(tempx, 0.1, 900),
                                rotation: new vec4(0,0,0),
                                scale: new vec4(0.6,0.6,0.6),
                                reflectivity: 0,
                            }
                        )
                        tempx += 0.3;
                    }
                }

                // Build entity
                if (mouseWentDown && player.entityBeingBuilt == null && recipesThatCanBeCrafted.get(asset.name) == true)
                {
                    // Check if we can collect the entity. If we can, then purchase the recipe                    
                    if (player.collectEntity(asset.name))
                    {
                        player.purchaseRecipe(asset.recipe);
                    }
                }
            }

            y++;
        }

        gl.clearDepthBuffer();
        gl.renderAllOfThese(orthogonalProjectionMatrix, new mat4().makeTranslationAndScale(new vec4(-0.9*10*scale.x,0.9,0), scale), new vec4(), new vec4(0.5,0.5,0.5), 0.7, renderMap);
    }

    mouseWentDown = false;
    mouseWheelChange = 0;
    // console.log(entities.length);
}







// http://35.153.49.211:3001/
// Create a WebSocket client instance
url = "ws://"+window.location.hostname+":8080"
console.log("websocket url: ",url);
const ws = new WebSocket(url)

// Event listener for when the connection is established
ws.addEventListener('open', () => {
    console.log('Connected to server');
});
// Event listener for when the connection is closed
ws.addEventListener('close', () => {
    console.log('Connection to server closed');
});

// Event listener for messages from the server
ws.addEventListener('message', (event) => {
    let message = event.data;
    const arr = message.split("@");
    for (let i_ in arr)
    {
        const command = arr[i_];
        if (command.startsWith("stc_setEntityHealth"))
        {
            const data = parse_stc_setEntityHealth(command);
            const e = entitiesMap.get(data.entityID);
            if (e == undefined) { 
                //console.error("Command 'stc_setEntityHealth' failed. Entity was not found in map. Command:",command); 
                continue; 
            }
            if (e.health > data.entityHealth)
            {
                e.tookDamageTimestamp_ms = Date.now();
            }
            e.health = data.entityHealth;
            continue;
        }
        if (command.startsWith("stc_givePlayerEntity"))
        {
            const data = parse_stc_givePlayerEntity(command);
            if (data.playerID == player.id)
            {
                player.collectEntity(data.entityName)
                // switch(data.entityName)
                // {
                //     case "wood": player.numWood++; break;
                //     case "stone": player.numStone++; break;
                //     case "iron": player.numIron++; break;
                //     default:
                //         player.collectEntity(data.entityName)
                //         console.log(`GIVE PLAYER '${data.entityName}'`);
                // }
            }
            continue;
        }
        if (command.startsWith("stc_setEntityPositionRotation"))
        {
            const data = parse_stc_setEntityPositionRotation(command);
            // return {
            //     entityID:arr[1],
            //     position:new vec4(Number(arr[2]),Number(arr[3]),Number(arr[4])),
            //     rotation:
            //     velocity:Number(arr[5])
            // }
            const e = entitiesMap.get(data.entityID);
            if (e == undefined) {// console.error("Command 'stc_setEntityPosition' failed. Entity was not found in map. Command:",command); 
                continue; 
            }
            if (data.velocity <= 0)
            {
                e.targetPosition = undefined;
                e.targetRotation = undefined;
                e.position = data.position;
                e.rotation = data.rotation;
                e.velocity = data.velocity;
            } else {
                e.targetPosition = data.position;
                e.targetRotation = data.rotation;
                e.velocity = data.velocity;
            }
            continue;
        }
        if (command.startsWith("cts_playerData"))
        {
            const data = parse_cts_playerData(command);
            data.scale = new vec4(1,1,1)
            const playerID = data.playerID;
            let playerData = null;
            for (let i in otherPlayers)
            {
                if (otherPlayers[i].id == playerID)
                {
                    playerData = otherPlayers[i];
                    break;
                }
            }

            if (playerData instanceof PlayerData)
            {
                playerData.startPosition = playerData.position;
                playerData.startRotation = playerData.rotation;
                playerData.startScale = playerData.scale;

                playerData.targetPosition = data.position;
                playerData.targetRotation = data.rotation;
                playerData.targetScale = data.scale;

                playerData.pTimestamp_ms  = playerData.timestamp_ms;
                playerData.timestamp_ms   = Date.now();

                playerData.entityInHand_assetName = data.entityInHand_assetName;
                playerData.entityInHand_lastUsedTimestamp_ms = data.entityInHand_lastUsedTimestamp_ms;
            } else {
                playerData = new PlayerData();
                playerData.id = data.playerID;
                playerData.position   = data.position.copy();
                playerData.rotation   = data.rotation.copy();
                playerData.scale      = data.scale.copy();

                playerData.startPosition   = data.position;
                playerData.startRotation   = data.rotation;
                playerData.startScale      = data.scale;
                
                playerData.targetPosition   = data.position;
                playerData.targetRotation   = data.rotation;
                playerData.targetScale      = data.scale;

                playerData.pTimestamp_ms   = Date.now();
                playerData.timestamp_ms    = Date.now();

                playerData.entityInHand_assetName = data.entityInHand_assetName;
                playerData.entityInHand_lastUsedTimestamp_ms = data.entityInHand_lastUsedTimestamp_ms;

                otherPlayers.push(playerData);
            }
            continue;
        }
        if (command.startsWith("stc_entityData"))
        {
            const data = parse_stc_entityData(command);
            let e = entitiesMap.get(data.entityID);
            if (e != undefined && e instanceof Entity)
            {
                e.position = data.position;
                e.rotation = data.rotation;
                e.health = data.health;
                e.isCollectable = data.isCollectable;
            } else {
                const asset = assetMap.get(data.assetName);
                if (asset == undefined)
                {
                    continue;
                }
                e = new Entity(asset, data.entityID, data.position, data.rotation, data.isCollectable);
                e.health = data.health;
                entitiesMap.set(e.id, e);
                entities.push(e);
                console.log("creating new entity")
            }
            continue;
        }
        if (command.startsWith("stc_instantiateEntity"))
        {
            const data = parse_stc_instantiateEntity(command);
            if (entitiesMap.get(data.entityID) != null) { continue; }
            const asset = assetMap.get(data.assetName);
            if (!(asset instanceof Asset))
            {
                console.error("Failed to instantiate asset (from command) with assetName:",data.assetName);
                continue;
            }
            const e = new Entity(asset, data.entityID, data.position, data.rotation, data.isCollectable);
            entitiesMap.set(e.id, e);
            entities.push(e);
            continue;
        }
        if (command.startsWith("stc_deleteLocalEntities"))
        {
            // This is sent by the server right before all nearby entities are sent. This is used to maintain sync with the server by deleting local stuff
            entities.splice(0,entities.length);
            entitiesMap.clear();
            continue;
        }
        if (command == "" || command == " ")
        {
            continue;
        }
        console.log("Unparsed command: ",command)
    }
});

setInterval(websocket_quickUpdate, 100);
function websocket_quickUpdate()
{
    if (ws.readyState != ws.OPEN) { return; }

    outgoingCommands += cts_playerData(player);
    ws.send( player.id + "|" + outgoingCommands);
    outgoingCommands = "";
}

websocket_slowUpdate();
setInterval(websocket_slowUpdate, 2000);
function websocket_slowUpdate()
{
    outgoingCommands += `cts_getAllEntities,@`;
}