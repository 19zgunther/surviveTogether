
/* This is a GL Wrapper class that makes rendering basic object easy.
*  Basic Functions:
*       constructor - takes htmlCanvasElement
*       set/get Camera Position/Rotation - gets and sets viewport/camera position and rotation
*       clear - clears the screen
*       create & delete object - create an object with a unique ID or name, with given vertices, indices, normals, and a color or colors.
*       set/get Object Position/Rotation - (given id) modify and get position and rotation of a given object
*       renderObject(objID) - renders a given object (given id) to the screen.
*       renderAll() - renders all objects
*
*       setAmbientLightLevel is setting the lowest light level for directional light (0.01 to 0.99, normal is 0.25)
*       enableDirectionalLighting is enabling/disabling directional lighting.
*       setDirectionalLightingDirection sets the direction the light is coming from
*
*       TODO:
*           - Possibly modify base shader to improve performance 
*           - Implement object picker functionality.
*           - Implement optional shadows
*/



class SpeedyGL 
{
    constructor(htmlCanvasElement = null) {

        //Make sure htmlCanvasElement is not null.
        if (htmlCanvasElement == null) { console.error("Cannot instantiate GL object without canvasElement"); return null;}
        this.htmlCanvasElement = htmlCanvasElement;
        let bb = this.htmlCanvasElement.getBoundingClientRect();
        this.htmlCanvasElement.width = Math.round(bb.width);
        this.htmlCanvasElement.height = Math.round(bb.height);

        this.gl = htmlCanvasElement.getContext('webgl');

        //Make sure this.webgl is instance of WebGlRenderingContext
        if (!(this.gl instanceof WebGLRenderingContext)) { console.error("Failed to create webgl context."); return null;}

        // this.projectionMatrix   = new mat4();
        // this.viewMatrix         = new mat4();
        // this.cameraPosition     = new vec4();
        // this.lightingDirection  = new vec4(1,0);
        // this.ambientLightLevel  = 0.7;

        this.objectMap = new Map();

        this._initShader();
        this.clear();
    }
    __loadShader(type, source)//helper function used by _initShader() and _initPickerShader()
     {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
    
        // See if it compiled successfully
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    _initShader()//initialize the default shader
    {
        let functions = `
        mat4 makeRotation(vec4 rot)
        {
            float sa = sin(rot.x);
            float ca = cos(rot.x);
            float sb = sin(rot.y);
            float cb = cos(rot.y);
            float sy = sin(rot.x);
            float cy = cos(rot.z);

            // return mat4(  
            //     ca*cb, ca*sb*sy-sa*cy, ca*sb*cy+sa*sy, 0,
            //     sa*cb, sa*sb*sy+ca*cy, sa*sb*cy-ca*sy, 0,
            //     -sb, cb*sy, cb*cy, 0,
            //     0, 0, 0, 1
            // );
            return mat4(  
                ca*cb,sa*cb,-sb,0,
                ca*sb*sy-sa*cy, sa*sb*sy+ca*cy, cb*sy, 0, 
                ca*sb*cy+sa*sy, sa*sb*cy-ca*sy, cb*cy, 0,
                0, 0, 0, 1
            );
        }

        mat4 makeTranslation(vec4 pos)
        {
            // return mat4(
            //     1,0,0,pos.x,
            //     0,1,0,pos.y,
            //     0,0,1,pos.z,
            //     0,0,0,1
            // );
            return mat4(
                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                pos.x,pos.y,pos.z,1
            );
        }

        mat4 makeScale(vec4 scale)
        {
            return mat4(
                scale.x,0,0,0,
                0,scale.y,0,0,
                0,0,scale.z,0,
                0,0,0,1
            );
        }`;
        
        let vsSource = `

        attribute vec4 aVertexPosition;
        attribute vec4 aNormalVector;
        attribute vec4 aColor;
        
        // uniform vec4 uObjectPositionVector;
        // uniform vec4 uObjectRotationVector;
        // uniform vec4 uObjectScaleVector;

        uniform mat4 uObjectRotationMatrix;
        uniform mat4 uObjectMatrix;

        uniform mat4 uProjectionMatrix;
        uniform mat4 uViewMatrix;
        uniform vec4 uLightDirectionVector;
        uniform float uAmbientLightLevel;

        varying highp vec4 color;
        varying highp vec4 pos;
        varying highp vec3 surfaceNormal;

        void main() {

            // mat4 uObjectRotationMatrix = makeRotation( uObjectRotationVector );
            // mat4 uObjectMatrix = makeTranslation( uObjectPositionVector ) * uObjectRotationMatrix * makeScale( uObjectScaleVector );

            vec4 vPos = vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z, 1.0);
            pos = uObjectMatrix * vPos;
            gl_Position = uProjectionMatrix * uViewMatrix * pos;

            surfaceNormal = (uObjectRotationMatrix * aNormalVector).xyz;
            float d = dot(surfaceNormal, uLightDirectionVector.xyz);

            float scalar = d*(1.0-uAmbientLightLevel) + uAmbientLightLevel;
            color = aColor * scalar;
            color.w = aColor.w;
        }`;
    
        const fsSource = `
        precision mediump float;
        varying vec4 color;
        varying vec4 pos;
        varying vec3 surfaceNormal;
        uniform highp vec4 uLightDirectionVector;
        uniform vec4 uCameraPositionVector;
        uniform float uObjectReflectivity;

        void main() {
            // gl_FragColor = color;
            // return;

            vec3 ray = reflect( normalize(pos.xyz - uCameraPositionVector.xyz), surfaceNormal);
            float d = dot(uLightDirectionVector.xyz, ray);
            if (d < 0.0) { 
                gl_FragColor = color;
            } else { 
                d = (d*d*d*d)*uObjectReflectivity; 
                gl_FragColor = color + d*vec4(0.9,0.9,0.9,0.9);
            }
        }
        `;
        const vertexShader = this.__loadShader(this.gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.__loadShader(this.gl.FRAGMENT_SHADER, fsSource);

        // Create the shader program
        const shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexLocation: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                normalLocation: this.gl.getAttribLocation(shaderProgram, 'aNormalVector'),
                colorLocation: this.gl.getAttribLocation(shaderProgram, 'aColor'),
            },
            uniformLocations: {
                projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                viewMatrix: this.gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
                lightDirectionVector: this.gl.getUniformLocation(shaderProgram, 'uLightDirectionVector'),
                ambientLightLevelFloat: this.gl.getUniformLocation(shaderProgram, 'uAmbientLightLevel'),
                cameraPositionVector: this.gl.getUniformLocation(shaderProgram, 'uCameraPositionVector'),

                objectMatrix: this.gl.getUniformLocation(shaderProgram, 'uObjectMatrix'),
                objectRotationMatrix: this.gl.getUniformLocation(shaderProgram, 'uObjectRotationMatrix'),
                // objectRotationVector: this.gl.getUniformLocation(shaderProgram, 'uObjectRotationVector'),
                // objectPositionVector: this.gl.getUniformLocation(shaderProgram, 'uObjectPostionVector'),
                // objectScaleVector: this.gl.getUniformLocation(shaderProgram, 'uObjectScaleVector'),

                objectReflectivity: this.gl.getUniformLocation(shaderProgram, 'uObjectReflectivity'),
            },
        };

        this.shaderProgram = shaderProgram;
        this.programInfo = programInfo;
    }
    // _initTextShader()//initialize the default shader
    // {
        
    //     let vsSource = `

    //     attribute vec4 aVertexPosition;
    //     // attribute vec4 aNormalVector;
    //     // attribute vec4 aColor;
    //     // uniform uNormalVector;
    //     // uniform uColor;

    //     uniform mat4 uObjectRotationMatrix;
    //     uniform mat4 uObjectMatrix;

    //     uniform mat4 uProjectionMatrix;
    //     uniform mat4 uViewMatrix;
    //     uniform vec4 uLightDirectionVector;
    //     uniform float uAmbientLightLevel;

    //     varying highp vec4 color;
    //     varying highp vec4 pos;
    //     varying highp vec3 surfaceNormal;

    //     void main() {

    //         // mat4 uObjectRotationMatrix = makeRotation( uObjectRotationVector );
    //         // mat4 uObjectMatrix = makeTranslation( uObjectPositionVector ) * uObjectRotationMatrix * makeScale( uObjectScaleVector );

    //         vec4 vPos = vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z, 1.0);
    //         pos = uObjectMatrix * vPos;
    //         gl_Position = uProjectionMatrix * uViewMatrix * pos;

    //         surfaceNormal = (uObjectRotationMatrix * aNormalVector).xyz;
    //         float d = dot(surfaceNormal, uLightDirectionVector.xyz);

    //         float scalar = d*(1.0-uAmbientLightLevel) + uAmbientLightLevel;
    //         color = aColor * scalar;
    //         color.w = aColor.w;
    //     }`;
    
    //     const fsSource = `
    //     precision mediump float;
    //     varying vec4 color;
    //     varying vec4 pos;
    //     varying vec3 surfaceNormal;
    //     uniform highp vec4 uLightDirectionVector;
    //     uniform vec4 uCameraPositionVector;
    //     uniform float uObjectReflectivity;

    //     void main() {
    //         gl_FragColor = color;
    //         return;

    //         vec3 ray = reflect( normalize(pos.xyz - uCameraPositionVector.xyz), surfaceNormal);
    //         float d = dot(uLightDirectionVector.xyz, ray);
    //         if (d < 0.0) { 
    //             gl_FragColor = color;
    //         } else { 
    //             d = (d*d*d*d)*uObjectReflectivity; 
    //             gl_FragColor = color + d*vec4(0.9,0.9,0.9,0.9);
    //         }
    //     }
    //     `;
    //     const vertexShader = this.__loadShader(this.gl.VERTEX_SHADER, vsSource);
    //     const fragmentShader = this.__loadShader(this.gl.FRAGMENT_SHADER, fsSource);

    //     // Create the shader program
    //     const shaderProgram = this.gl.createProgram();
    //     this.gl.attachShader(shaderProgram, vertexShader);
    //     this.gl.attachShader(shaderProgram, fragmentShader);
    //     this.gl.linkProgram(shaderProgram);

    //     // If creating the shader program failed, alert
    //     if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
    //         console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
    //         return null;
    //     }

    //     const programInfo = {
    //         program: shaderProgram,
    //         attribLocations: {
    //             vertexLocation: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    //             normalLocation: this.gl.getAttribLocation(shaderProgram, 'aNormalVector'),
    //             colorLocation: this.gl.getAttribLocation(shaderProgram, 'aColor'),
    //         },
    //         uniformLocations: {
    //             projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    //             viewMatrix: this.gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
    //             lightDirectionVector: this.gl.getUniformLocation(shaderProgram, 'uLightDirectionVector'),
    //             ambientLightLevelFloat: this.gl.getUniformLocation(shaderProgram, 'uAmbientLightLevel'),
    //             cameraPositionVector: this.gl.getUniformLocation(shaderProgram, 'uCameraPositionVector'),

    //             objectMatrix: this.gl.getUniformLocation(shaderProgram, 'uObjectMatrix'),
    //             objectRotationMatrix: this.gl.getUniformLocation(shaderProgram, 'uObjectRotationMatrix'),
    //             // objectRotationVector: this.gl.getUniformLocation(shaderProgram, 'uObjectRotationVector'),
    //             // objectPositionVector: this.gl.getUniformLocation(shaderProgram, 'uObjectPostionVector'),
    //             // objectScaleVector: this.gl.getUniformLocation(shaderProgram, 'uObjectScaleVector'),

    //             objectReflectivity: this.gl.getUniformLocation(shaderProgram, 'uObjectReflectivity'),
    //         },
    //     };

    //     this.shaderProgram = shaderProgram;
    //     this.programInfo = programInfo;
    // }
    clear(clearColor = new vec4(1,1,1,1), clearDepth = 1, renderReverseFaces = false) //Clear the screen to default color
    {
        // Clear the canvas before we start drawing on it.
        this.gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.a);
        this.gl.clearDepth(clearDepth);                   // Clear everything

        //Enable depth testing & blending
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LESS);
        this.gl.enable(this.gl.BLEND);
        this.gl.depthMask(true);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        
        if (renderReverseFaces == true) { 
            this.gl.disable(this.gl.CULL_FACE);
        } else {                                
            this.gl.enable(this.gl.CULL_FACE); 
        }
        
        //Clearing color and depth buffer
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
        //Set Viewport
        this.gl.viewport(0, 0, this.htmlCanvasElement.width, this.htmlCanvasElement.height);
    }
    clearDepthBuffer(clearDepth = 1) // clears the depth buffer, thus allowing for rendering items after to be "on top" of closer elements (used for UI and such).
    {
        this.gl.clearDepth(clearDepth);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }
    

    // setRenderingVariables(
    //     FOV = this.FOV, 
    //     zNear = this.zNear,
    //     zFar = this.zFar, 
    //     cameraPosition = this.cameraPosition, 
    //     cameraRotation = this.cameraRotation, 
    //     lightingDirection = this.lightDirection,
    //     ambientLightLevel = this.ambientLightLevel)
    // {
    //     FOV = (FOV == null) ? this.FOV : FOV;
    //     zNear = (zNear == null) ? this.zNear : zNear;
    //     zFar = (zFar == null) ? this.zFar : zFar;
    //     cameraPosition = (cameraPosition == null) ? this.cameraPosition : cameraPosition;
    //     cameraRotation = (cameraRotation == null) ? this.cameraRotation : cameraRotation;
    //     lightingDirection = (lightingDirection == null) ? this.lightingDirection : lightingDirection;
    //     ambientLightLevel = (ambientLightLevel == null) ? this.ambientLightLevel : ambientLightLevel;

    //     this.projectionMatrix.makePerspective()
    // }

    // renderObject(
    //     objectID = 0, 
    //     objectPosition=new vec4(), 
    //     objectRotation=new vec4(), 
    //     objectScale=new vec4(), 
    //     reflectivity_=null) //renders specific object
    // {
    //     const objectData = this.objectMap.get(objectID);
    //     if (objectData == null) { console.error("Object: " + objectID + " Does Not Exist. Cannot Render."); return; }

    //     this.gl.useProgram(this.programInfo.program);

    //     const reflectivity = (reflectivity_ != null)? reflectivity_ : objectData.reflectivity;

    //     //BIND BUFFERS ///////////////////////////////////////////
    //     //Bind Vertices Buffer
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.verticesBuffer);
    //     this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexLocation, 3, this.gl.FLOAT, false, 0, 0);
    //     this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexLocation);

    //     //Bind Normals Buffer
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.normalsBuffer);
    //     this.gl.vertexAttribPointer(this.programInfo.attribLocations.normalLocation, 3, this.gl.FLOAT, false, 0, 0);
    //     this.gl.enableVertexAttribArray(this.programInfo.attribLocations.normalLocation);

    //     //Bind Colors Buffer
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.colorsBuffer);
    //     this.gl.vertexAttribPointer(this.programInfo.attribLocations.colorLocation, 4, this.gl.FLOAT, false, 0, 0);
    //     this.gl.enableVertexAttribArray(this.programInfo.attribLocations.colorLocation);

    //     //Bind Indices
    //     this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, objectData.indicesBuffer);

    //     //BIND UNIFORMS////////////////////////////////////////
    //     // Set the shader uniforms
    //     this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix,    false,  this.projectionMatrix.getFloat32Array());
    //     this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.viewMatrix,          false,  this.viewMatrix.getFloat32Array());
    //     this.gl.uniform4fv(this.programInfo.uniformLocations.cameraPositionVector,              this.cameraPosition.getFloat32Array());
    //     this.gl.uniform4fv(this.programInfo.uniformLocations.lightDirectionVector,              this.directionalLightingDirection.getFloat32Array());
    //     this.gl.uniform1f(this.programInfo.uniformLocations.ambientLightLevelFloat,             this.ambientLightLevel);

    //     this.gl.uniform1f(this.programInfo.uniformLocations.objectReflectivity,         reflectivity);

    //     this.gl.uniform4fv(this.programInfo.uniformLocations.objectPositionVector,      objectPosition.getFloat32Array());
    //     this.gl.uniform4fv(this.programInfo.uniformLocations.objectRotationVector,      objectRotation.getFloat32Array());
    //     this.gl.uniform4fv(this.programInfo.uniformLocations.objectScaleVector,         objectScale.getFloat32Array());
        
    //     //RENDER////////////////////////////////////////////////
    //     this.gl.drawElements(this.gl.TRIANGLES, objectData.indices.length, this.gl.UNSIGNED_SHORT, 0);
    // }
    // renderObjectInstances(
    //     objectID = 0, 
    //     objectInstances=[
    //         {
    //             position: new vec4(), 
    //             rotation: new vec4(),
    //             scale: new vec4(),
    //             reflectivity: 0,
    //         }
    //     ]
    //     )
    // {
    //     const objectData = this.objectMap.get(objectID);
    //     if (objectData == null) { console.error("Object: " + objectID + " Does Not Exist. Cannot Render."); return; }

    //     this.gl.useProgram(this.programInfo.program);

    //     //BIND BUFFERS ///////////////////////////////////////////
    //     //Bind Vertices Buffer
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.verticesBuffer);
    //     this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexLocation, 3, this.gl.FLOAT, false, 0, 0);
    //     this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexLocation);
    //     //Bind Normals Buffer
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.normalsBuffer);
    //     this.gl.vertexAttribPointer(this.programInfo.attribLocations.normalLocation, 3, this.gl.FLOAT, false, 0, 0);
    //     this.gl.enableVertexAttribArray(this.programInfo.attribLocations.normalLocation);
    //     //Bind Colors Buffer
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.colorsBuffer);
    //     this.gl.vertexAttribPointer(this.programInfo.attribLocations.colorLocation, 4, this.gl.FLOAT, false, 0, 0);
    //     this.gl.enableVertexAttribArray(this.programInfo.attribLocations.colorLocation);
    //     //Bind Indices
    //     this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, objectData.indicesBuffer);

    //     //BIND UNIFORMS////////////////////////////////////////
    //     // Set the shader uniforms
    //     this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix,    false,  this.projectionMatrix.getFloat32Array());
    //     this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.viewMatrix,          false,  this.viewMatrix.getFloat32Array());
    //     this.gl.uniform4fv(this.programInfo.uniformLocations.cameraPositionVector,              this.cameraPosition.getFloat32Array());
    //     this.gl.uniform4fv(this.programInfo.uniformLocations.lightDirectionVector,              this.directionalLightingDirection.getFloat32Array());
    //     this.gl.uniform1f(this.programInfo.uniformLocations.ambientLightLevelFloat,             this.ambientLightLevel);

    //     for (let i=0; i<objectInstances.length; i++)
    //     {
    //         const instanceData = objectInstances[i];
    //         const reflectivity = (instanceData.reflectivity == null)? objectData.reflectivity : instanceData.reflectivity;
    //         this.gl.uniform4fv(this.programInfo.uniformLocations.objectPositionVector,      instanceData.position.getFloat32Array());
    //         this.gl.uniform4fv(this.programInfo.uniformLocations.objectRotationVector,      instanceData.rotation.getFloat32Array());
    //         this.gl.uniform4fv(this.programInfo.uniformLocations.objectScaleVector,         instanceData.scale.getFloat32Array());
    //         this.gl.uniform1f(this.programInfo.uniformLocations.objectReflectivity,         reflectivity);
    //     }
        
    //     //RENDER////////////////////////////////////////////////
    //     this.gl.drawElements(this.gl.TRIANGLES, objectData.indices.length, this.gl.UNSIGNED_SHORT, 0);
    // }
    
    renderAllOfThese(
        projectionMatrix = new mat4(),
        viewMatrix = new mat4(),
        cameraPosition=new vec4(), 
        lightingDirection = new vec4(),
        ambientLightLevel = 0.7,
        objectsToRender = [
            id = 0,
            instances = [
                {
                    position: new vec4(), 
                    rotation: new vec4(),
                    scale: new vec4(),
                    reflectivity: 0,
                    colorMultiplier: new vec4(1,1,1,1)
                }
            ]
        ]
        )
    {

        if (objectsToRender instanceof Map)
        {
            let temp = []
            for (const key of objectsToRender.keys()) {
                const objectID = key
                const instances = objectsToRender.get(key);
                if (instances.length > 0)
                {
                    temp.push({
                        id: objectID,
                        instances: instances
                    });
                }
            }
            objectsToRender = temp;
        }

        this.gl.useProgram(this.programInfo.program);

        // Set the shader uniforms
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix,    false,  projectionMatrix.getFloat32Array());
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.viewMatrix,          false,  viewMatrix.getFloat32Array());
        this.gl.uniform4fv(this.programInfo.uniformLocations.cameraPositionVector,              cameraPosition.getFloat32Array());
        this.gl.uniform4fv(this.programInfo.uniformLocations.lightDirectionVector,              lightingDirection.getFloat32Array());
        this.gl.uniform1f(this.programInfo.uniformLocations.ambientLightLevelFloat,             ambientLightLevel);

        let objectsNotFound = [];

        for (let i in objectsToRender)
        {
            const objectID          = objectsToRender[i].id;
            const objectInstances   = objectsToRender[i].instances;

            const objectData = this.objectMap.get(objectID);
            if (objectData == null) {
                objectsNotFound.push(objectID);
                continue;
            }

            //BIND BUFFERS ///////////////////////////////////////////
            //Bind Vertices Buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.verticesBuffer);
            this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexLocation, 3, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexLocation);
            //Bind Normals Buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.normalsBuffer);
            this.gl.vertexAttribPointer(this.programInfo.attribLocations.normalLocation, 3, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.programInfo.attribLocations.normalLocation);
            //Bind Colors Buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objectData.colorsBuffer);
            this.gl.vertexAttribPointer(this.programInfo.attribLocations.colorLocation, 4, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.programInfo.attribLocations.colorLocation);
            //Bind Indices
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, objectData.indicesBuffer);

            //BIND UNIFORMS////////////////////////////////////////
            for (let j=0; j<objectInstances.length; j++)
            {
                const instanceData = objectInstances[j];
                const reflectivity = (instanceData.reflectivity == null)? 0 : instanceData.reflectivity;
                const scale = (instanceData.scale == null) ? new vec4(1,1,1,1) : instanceData.scale;

                const rotMat = new mat4().makeRotation(instanceData.rotation);
                const mat = new mat4().makeTranslationRotationScale(instanceData.position, instanceData.rotation, scale);

                this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.objectRotationMatrix,  false,    rotMat.getFloat32Array());
                this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.objectMatrix,       false,       mat.getFloat32Array());

                this.gl.uniform1f(this.programInfo.uniformLocations.objectReflectivity,         reflectivity);
                this.gl.drawElements(this.gl.TRIANGLES, objectData.indices.length, this.gl.UNSIGNED_SHORT, 0);
            }
        }

        if (objectsNotFound.length > 0)
        {
            let errorString = "Error: objects not found in map: ";
            for (let i in objectsNotFound){
                errorString += "'"+objectsNotFound[i] + "', "; 
            }
            console.error(errorString);
        }
    }
    createObject(id=0, vertices=[], normals=[], colors=[], indices=[], reflectivity=0)
    {
        function convertToFloatArray_4(arr)
        {
            if (arr[0] instanceof vec4)
            {
                let temp = [];
                for (let i=0; i<arr.length; i++)
                {
                    temp.push(arr[i].x, arr[i].y, arr[i].z, arr[i].a);
                }
                return temp;
            }
            return arr;
        }
        function convertToFloatArray_3(arr)
        {
            if (arr[0] instanceof vec4)
            {
                let temp = [];
                for (let i=0; i<arr.length; i++)
                {
                    temp.push(arr[i].x, arr[i].y, arr[i].z);
                }
                return temp;
            }
            return arr;
        }

        if (vertices == null || vertices == undefined)
        {
            vertices = cubeVertices;
            normals = cubeNormals;
            indices = cubeIndices;
        }

        vertices = convertToFloatArray_3( vertices );
        normals  = convertToFloatArray_3( normals  );

        if (colors instanceof Array)
        {
            colors = convertToFloatArray_4( colors );
        } else if (colors instanceof vec4 ){
            let temp = [];
            for (let i=0; i<vertices.length/3; i++)
            {
                temp.push(colors.x, colors.y, colors.z, colors.a);
            }
            colors = temp;
        } else {
            colors = cubeColors
        }

        //initialize the buffers
        const verticesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, verticesBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        const normalsBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);

        const colorsBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);

        const indicesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

        this.objectMap.set(id, {
            id: id,
            vertices: vertices,
            indices: indices,
            normals: normals,
            colors: colors,
            reflectivity,reflectivity,

            verticesBuffer: verticesBuffer,
            indicesBuffer: indicesBuffer, 
            colorsBuffer: colorsBuffer,
            normalsBuffer: normalsBuffer,
        });
    }
}

//Default Cube
// const cubeVertices =  [
//     -0.5,0.5,0.5, 0.5,0.5,0.5, 0.5,-0.5,0.5, -0.5,-0.5,0.5, //front
//     -0.5,0.5,-0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,0.5,-0.5, //back
//     -0.5,0.5,0.5, -0.5,0.5,-0.5, 0.5,0.5,-0.5, 0.5,0.5,0.5, //top
//     -0.5,0.5,0.5, -0.5,-0.5,0.5, -0.5,-0.5,-0.5, -0.5,0.5,-0.5, //left
//     0.5,0.5,0.5, 0.5,0.5,-0.5, 0.5,-0.5,-0.5, 0.5,-0.5,0.5, //right
//     -0.5,-0.5,0.5, 0.5,-0.5,0.5, 0.5,-0.5,-0.5, -0.5,-0.5,-0.5, //bottom
// ];
// const cubeIndices = [
//     0,2,1, 0,3,2, //front
//     4,6,5, 4,7,6, //back
//     8,10,9, 8,11,10, //top
//     12,14,13, 12,15,14, //left
//     16,18,17, 16,19,18, //right
//     20,22,21, 20,23,22, //bottom
// ];
// const cubeNormals = [
//     0,0,1, 0,0,1, 0,0,1, 0,0,1,
//     0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
//     0,1,0, 0,1,0, 0,1,0, 0,1,0, //top
//     -1,0,0, -1,0,0, -1,0,0, -1,0,0, //right
//     1,0,0, 1,0,0, 1,0,0, 1,0,0, //let
//     0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, //bottom
    
// ];
// const cubeColors = [
//     0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1,
//     0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1,
//     0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1,
//     0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1,
//     0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1,
//     0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1, 0.5,0.5,0.5,1,
// ];
// const cubeTextureCoordinates = [
//     0,0, 1,0, 1,1, 0,1,
//     0,0, 1,0, 1,1, 0,1,
//     0,0, 1,0, 1,1, 0,1,
//     0,0, 1,0, 1,1, 0,1,
//     0,0, 1,0, 1,1, 0,1,
//     0,0, 1,0, 1,1, 0,1
// ];
// const defaultTexture = [
//     0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 
//     100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 
//     200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 
//     700, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 
//     500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 
//     255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 
//     255, 0, 0, 0, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 
//     200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300,
//     300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255,
//     100, 100, 100, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 
//     100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 
//     0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100,
//     100, 100, 255, 0, 200, 200, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100,
//     300, 700, 255, 0, 0, 0, 255, 255, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 
//     0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 255, 300, 700, 255, 0, 0, 0, 255, 100, 
//     100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 100, 100, 500, 255, 0, 200, 600, 255, 
//     100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 255, 200, 200, 255, 100, 300, 300, 
//     255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 255, 0, 0, 
//     255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 0, 200, 600, 
//     255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 
//     255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 
//     100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 
//     100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 
//     400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100,
//     255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 
//     500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 
//     100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 
//     300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 255, 200, 600, 255, 
//     100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 255, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 
//     100, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 255, 0, 0, 255, 255, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 
//     255, 100, 500, 255, 255, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 
//     255, 100, 100, 100, 255, 0, 200, 200, 255, 255, 300, 300, 255, 255, 0, 400, 255, 255, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 
//     100, 300, 300, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 
//     600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 
//     200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400,
//     255, 100, 100, 500, 255, 100, 300, 700, 255, 0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255, 100, 300, 700, 255, 
//     0, 0, 0, 255, 100, 100, 100, 255, 0, 200, 200, 255, 100, 300, 300, 255, 0, 0, 400, 255, 100, 100, 500, 255, 0, 200, 600, 255
// ];


//Flat triangle
// const triangleVertices = [-1,-1,0, 0,1,0, 1,-1,0];
// const triangleIndices = [0,1,2];
// const triangleNormals = [0,0,1, 0,0,1, 0,0,1];
// const triangleColors = [1,0,0,1, 0,1,0,1, 0,0,1,1];

// function generateSphereMesh(steps = 1, radius = 1, randomModifier = 0.0, color = new vec4(1,0,0,1), smoothNormals = false)
// {
//     let vertices = [0,-1,0, 1,0,0, 0,0,1, -1,0,0, 0,0,-1, 0,1,0];
//     for (let i in vertices)
//     {
//         vertices[i] = vertices[i]*radius;
//     }
//     let indices = [0,1,2, 0,2,3, 0,3,4, 0,4,1, 1,5,2, 2,5,3, 3,5,4, 4,5,1];
//     let zz = new vec4();
//     for (let s=0; s<steps; s++)
//     {
//         let inds = [];
//         let verts = [];

//         for( let i=0; i<indices.length; i+=3)
//         {
//             let v1 = new vec4(vertices[indices[i]*3], vertices[indices[i]*3 + 1], vertices[indices[i]*3 + 2]);
//             let v2 = new vec4(vertices[indices[i+1]*3], vertices[indices[i+1]*3 + 1], vertices[indices[i+1]*3 + 2]);
//             let v3 = new vec4(vertices[indices[i+2]*3], vertices[indices[i+2]*3 + 1], vertices[indices[i+2]*3 + 2]);

//             let b1 = (v1.add(v2)).muli(0.5);
//             b1.muli( radius/distanceBetweenPoints(b1, zz)  );
//             let b2 = (v2.add(v3)).muli(0.5);
//             b2.muli( radius/distanceBetweenPoints(b2, zz)  );
//             let b3 = (v1.add(v3)).muli(0.5);
//             b3.muli( radius/distanceBetweenPoints(b3, zz)  );

//             let lv = verts.length/3;

//             inds.push( lv, lv+3, lv+5 );  //bottom-left
//             inds.push( lv+3, lv+1, lv+4); //top
//             inds.push( lv+5, lv+4, lv+2); //bottom-right
//             inds.push( lv+3, lv+4, lv+5); //center

//             verts.push(v1.x, v1.y, v1.z,   v2.x, v2.y, v2.z,  v3.x, v3.y, v3.z);
//             verts.push(b1.x, b1.y, b1.z,   b2.x, b2.y, b2.z,  b3.x, b3.y, b3.z);
//         }
//         vertices = verts;
//         indices = inds;
//     }

//     n = [];
//     c = [];
//     ind = [];
//     v = [];
//     /*for (let i=0; i<vertices.length;i+=3) { 
//         normals.push(0,0,0);
//         colors.push(color.x, color.y, color.z, color.a); 
//     }*/

//     for (let i=0; i<indices.length; i+=3)
//     {
//         const v1 = new vec4( vertices[indices[i  ]*3], vertices[indices[i  ]*3+1], vertices[indices[i  ]*3+2] );
//         const v2 = new vec4( vertices[indices[i+1]*3], vertices[indices[i+1]*3+1], vertices[indices[i+1]*3+2] );
//         const v3 = new vec4( vertices[indices[i+2]*3], vertices[indices[i+2]*3+1], vertices[indices[i+2]*3+2] );
        
//         if (smoothNormals)
//         {
//             const r1 = v1.copy().scaleToUnit();
//             const r2 = v2.copy().scaleToUnit();
//             const r3 = v3.copy().scaleToUnit();
//             n.push( r1.x, r1.y, r1.z,   r2.x, r2.y, r2.z,   r3.x, r3.y, r3.z);
//         } else {
//             const a = v2.sub(v1);
//             const b = v3.sub(v1);
//             b.scaleToUnit();
//             a.scaleToUnit();
//             const nx = a.y*b.z - a.z*b.y;
//             const ny = a.z*b.x - a.x*b.z;
//             const nz = a.x*b.y - a.y*b.x;
//             const newN = new vec4(nx,ny,nz).scaleToUnit();
//             n.push( newN.x, newN.y, newN.z,   newN.x, newN.y, newN.z,   newN.x, newN.y, newN.z);
//         }
//         let cur = v.length/3;
//         ind.push(cur, cur+1, cur+2);
//         c.push(color.x, color.y, color.z, color.a,  color.x, color.y, color.z, color.a,  color.x, color.y, color.z, color.a );
//         v.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
//     }

//     //console.log(vertices, indices, normals, colors);
//     return {
//         vertices: v,
//         indices: ind,
//         normals: n,
//         colors: c,
//     }
    
//     //return ret;
//     //return expandMesh(ret.vertices, ret.indices, color, colorVariation);
// }


//This is all used for Text. It contains all of the triangles necessary for creating each ascii shape
const asciiVertices = [
    0,-0.2,0,0,-0.1,0,0,0,0,0,0.1,0,0,0.2,0,0,0.3,0,0,0.4,0,0,0.5,0,0,0.6,0,0,0.7,0,0,0.8,0,0.1,
    -0.2,0,0.1,-0.1,0,0.1,0,0,0.1,0.1,0,0.1,0.2,0,0.1,0.3,0,0.1,0.4,0,0.1,0.5,0,0.1,0.6,0,0.1,0.7,
    0,0.1,0.8,0,0.2,-0.2,0,0.2,-0.1,0,0.2,0,0,0.2,0.1,0,0.2,0.2,0,0.2,0.3,0,0.2,0.4,0,0.2,0.5,0,
    0.2,0.6,0,0.2,0.7,0,0.2,0.8,0,0.3,-0.2,0,0.3,-0.1,0,0.3,0,0,0.3,0.1,0,0.3,0.2,0,0.3,0.3,0,0.3,
    0.4,0,0.3,0.5,0,0.3,0.6,0,0.3,0.7,0,0.3,0.8,0,0.4,-0.2,0,0.4,-0.1,0,0.4,0,0,0.4,0.1,0,0.4,0.2,
    0,0.4,0.3,0,0.4,0.4,0,0.4,0.5,0,0.4,0.6,0,0.4,0.7,0,0.4,0.8,0
];
const asciiIndices = [
    null,null,null,null,null,null,null,null,null,null,  //0-9
    null,null,null,null,null,null,null,null,null,null,  //10 - 19
    null,null,null,null,null,null,null,null,null,null,  //20 - 29
    null,null,  //30 - 31

    [], // (Space)
    [3,2,13,13,14,3,4,15,21,21,10,4], // !    
    [8,21,32,32,19,8,30,43,54,54,41,30], // "
    [2,20,31,31,13,2,24,42,53,53,35,24,7,51,50,50,6,7,5,49,48,48,4,5], //#
    null,
    [8,7,18,18,19,8,37,36,47,47,48,37,42,2,13,13,53,42], //% 
    null, // &
    [21,8,19,19,32,21], // '
    [7,4,13,13,20,7,20,32,31,31,19,20,13,23,24,24,14,13], // (
    [13,26,29,29,20,13,20,10,9,9,19,20,1,13,2,2,14,13], // )
    [7,21,19,19,29,21,19,9,20,19,31,20], //*
    [6,39,38,38,5,6,18,15,26,26,29,18], // +
    [14,2,1,14,25,24,1,24,14], // ,
    [6,39,38,38,5,6], // -
    [3,14,13,13,2,3], // .
    [1,43,54,54,12,1], //  /

    //Numbers: 48-57
    [13,3,9,9,21,13,21,43,53,53,9,21,53,47,35,35,43,53,47,3,13,13,35,47], //0
    [8,9,21,21,32,8,32,24,13,13,21,32,3,36,35,35,2,3], //1
    [46,2,3,3,47,46,3,52,51,51,2,3,51,53,43,43,39,51,43,21,9,9,53,43,21,9,8,8,19,21], //2
    [4,15,13,13,3,4,3,47,35,35,13,3,8,9,21,21,19,8,9,21,43,43,53,9,53,51,39,39,43,53,47,49,39,39,35,47,40,28,38], //3
    [10,6,17,17,21,10,43,35,46,46,54,43,50,6,7,7,51,50], //4
    [9,53,54,54,10,9,10,6,17,17,21,10,7,40,50,50,6,7,50,47,35,35,40,50,35,13,3,3,47,35,3,4,15,15,13,3],//5
    [3,47,35,35,13,3,3,6,18,18,40,50,50,6,18,18,13,3,50,47,35,35,40,50,17,43,32,32,6,17], //6
    [10,54,53,53,9,10,53,24,13,13,42,53],//7
    [9,21,43,43,53,9,9,7,17,17,21,9,7,51,39,39,17,7,39,43,53,53,51,39,18,6,3,3,13,18,40,50,47,47,35,40,3,47,35,35,13,3],//8
    [17,7,9,9,21,17,21,43,53,53,9,21,53,51,39,39,43,53,39,17,7,7,51,39,51,24,13,13,40,51], //9
    

    //Special characters 58-64
    [7,6,17,17,18,7,15,4,3,3,15,14], // :
    [3,15,12,12,1,3,7,6,17,17,18,7], // ;
    [6,51,52,6,49,48,49,17,6,17,51,6], // <
    [50,6,7,7,51,50,49,5,4,4,48,49], // = 
    [8,50,7,50,5,4,7,39,50,39,5,50], // >
    [18,7,9,9,21,18,21,43,53,53,9,21,53,51,39,39,43,53,40,37,26,26,28,40,25,24,35,36,25,35], // ?
    [48,53,43,43,38,48,43,21,9,9,53,43,9,2,12,12,21,9,2,46,34,34,12,2,28,26,48,48,39,28], //@

    //Uppercase Letters: 65-90
    [2,21,32,32,13,2,43,46,35,35,32,43,21,43,31,17,39,38,38,16,17], // A
    [10,2,13,13,21,10,10,43,53,53,9,10,53,51,39,39,43,53,39,49,47,47,35,39,35,2,3,3,47,35,7,40,39,39,6,7], //B
    [9,21,43,43,53,9,53,52,41,41,43,53,21,13,3,3,9,21,3,47,35,35,13,3,47,48,37,37,35,47], // C
    [10,2,13,13,21,10,52,47,35,35,2,3,3,47,35,41,52,35,10,32,42,42,9,10,42,52,41,41,31,42], //D
    [54,10,9,9,53,54,10,2,13,13,21,10,3,47,46,46,2,3,6,39,38,38,5,6], //E
    [2,10,21,21,13,2,10,54,53,53,9,10,6,39,38,38,5,6], //F
    [52,41,42,52,53,42,53,43,21,9,21,53,9,3,13,13,20,9,3,47,35,35,13,3,27,49,48,48,26,27,37,35,46,46,48,37], //G
    [10,21,13,13,2,10,6,50,49,49,5,6,43,35,46,46,54,43], //H
    [21,13,24,24,32,21,10,43,42,42,9,10,3,36,35,35,2,3], //I
    [10,54,53,53,9,10,43,36,24,24,32,43,24,13,3,3,36,24,3,4,15,15,13,3], //J
    [10,2,13,13,21,10,38,35,46,38,48,46,48,8,7,7,47,48,43,41,53,53,54,43,53,5,6,6,54,53], // K
    [10,2,13,13,21,10,3,47,46,46,2,3], //L
    [2,10,21,21,13,2,35,43,54,54,46,35,21,29,18,29,43,40,18,27,40], //M
    [13,21,10,10,2,13,54,46,35,35,43,54,21,46,35,35,10,21], //N
    [3,13,35,35,47,3,3,9,21,21,13,3,21,43,53,53,9,21,53,47,35,35,43,53], //O
    [10,2,13,13,21,10,10,43,53,53,9,10,53,51,39,39,43,53,39,6,7,7,51,39], //p
    [24,48,37,37,13,24,3,36,24,24,13,3,3,9,21,21,13,3,21,43,53,53,9,21,53,48,37,37,43,53,27,47,46,46,26,27], //Q
    [10,2,13,13,21,10,10,43,53,53,9,10,53,51,39,39,43,53,39,6,7,7,51,39,39,49,46,46,35,39,28,38,39], //R
    [53,43,21,53,9,21,3,13,35,35,47,3,9,7,17,17,21,9,47,49,39,39,35,47,38,17,18,18,39,38,14,4,3,42,52,53], //S
    [10,54,53,53,9,10,32,24,35,35,43,32], //T
    [10,3,13,13,21,10,13,46,47,47,3,13,46,54,43,43,35,46], //U
    [10,24,35,35,21,10,24,43,54,54,35,24], //V
    [10,2,13,13,21,10,43,35,46,46,54,43,13,26,15,26,35,37,15,28,37], //W
    [21,46,35,35,10,21,43,2,13,13,54,43], //X
    [24,28,39,39,35,24,28,10,21,21,39,28,39,54,43,43,28,39], //Y
    [10,54,53,53,9,10,53,14,3,3,42,53,3,2,46,46,47,3], //Z


    //91-96
    [31,32,10,10,9,31,10,1,12,12,21,10,2,24,23,23,1,2], // [
    [10,21,34,34,23,10], // \
    [10,32,31,31,9,10,32,23,12,12,21,32,2,24,23,23,1,2], // ]
    [9,8,21,21,20,8,20,30,31,31,21,20], // ^
    [2,46,45,45,1,2], // _
    [10,19,30,30,21,10], // `

    //Lowercase letters: 97-122
    [46,50,40,40,35,46,35,13,3,3,47,35,40,18,6,6,50,40,3,4,16,16,13,3,16,49,48,48,4,16], //a
    [10,2,13,21,10,13,7,40,50,50,6,7,50,47,35,35,40,50,35,2,3,3,47,35],     //b
    [50,6,18,18,40,50,3,47,35,35,13,3,13,18,6,6,3,13],   //c
    [46,54,43,43,35,46,46,13,3,3,47,46,3,6,18,18,13,3,18,51,50,50,6,18], //d
    [47,3,13,13,35,47,13,3,6,6,18,13,18,40,50,50,6,18,50,49,37,37,40,50,37,4,5,5,49,37], //e
    [13,20,32,32,24,13,32,43,53,53,20,32,53,52,42,7,40,39,39,6,7,42,41,52], //f
    [18,13,3,3,6,18,18,40,50,50,6,18,3,47,46,46,13,3,50,45,33,33,40,50,33,11,1,1,45,33], //g
    [2,10,21,13,2,21,7,40,50,50,6,7,50,46,35,35,40,50], //h
    [13,17,28,13,24,28,19,18,29,29,30,19], //i
    [2,1,11,11,13,2,1,34,22,22,11,1,34,39,28,28,22,34,30,29,40,40,41,30], //j
    [2,10,21,21,13,2,46,35,5,5,16,46,30,5,16,16,41,30], //k
    [10,3,13,13,21,10,14,24,13,14,25,24], //l
    [2,7,18,18,13,2,40,35,46,46,51,40,40,28,39,18,28,17,17,27,39], //m
    [2,6,18,18,13,2,40,35,46,46,51,40,18,51,50,50,6,18], //n
    [3,6,18,18,13,3,18,40,50,50,6,18,3,47,35,35,13,3,47,50,40,40,35,47], //o
    [0,6,18,18,11,0,18,40,50,50,6,18,3,47,35,35,3,2,47,50,40,40,35,47], //p
    [3,6,18,18,13,3,18,40,50,50,6,18,3,47,35,35,13,3,44,50,40,40,33,44], //q
    [13,18,7,7,2,13,6,29,28,28,5,6,29,40,39,39,28,29,40,50,49,49,38,40], //r
    [47,48,38,38,35,47,38,5,15,15,48,38,4,24,13,13,3,4,3,47,35,35,13,3,5,6,18,18,15,5,18,40,50,50,6,18,50,49,29], //s
    [24,14,21,21,32,24,14,36,35,35,24,14,7,40,39,39,6,7], //t
    [7,18,13,13,3,7,3,47,46,46,13,3,35,40,51,51,46,35], //u
    [18,35,24,24,7,18,35,51,40,40,24,35], //v
    [7,2,13,13,18,7,40,35,46,46,51,40,14,27,36,13,25,14,25,35,36], //w
    [46,18,7,7,35,46,13,51,40,40,2,13], //x
    [7,3,13,13,18,7,51,45,33,33,40,51,3,47,46,46,13,3,33,11,1,1,45,33], //y
    [7,51,50,50,6,7,3,47,46,46,2,3,3,39,50,50,14,3], //z         //122

    //Spectials 123-126
    [25,36,35,35,24,25,24,14,16,16,27,24,32,43,42,42,31,32,32,20,18,18,29,32,16,6,18,27,17,16,17,29,18],    // {
    [1,10,21,21,12,1],                                                                                      // |
    [2,3,13,13,14,3,13,25,27,27,16,13,10,21,20,20,9,10,21,31,29,29,18,21,29,39,27,16,28,27,18,28,29],       // }
    [17,5,6,6,18,28,28,40,39,17,27,39], //~

    null, null, null, //127-129
    null, null, null, null, null, null, null, null, null, null, //130-139
    null, null, null, null, null, null, null, null, null, null, //140-149
    null, null, null, null, null, null, null, null, null, null, //150-159
    null, null, null, null, null, null, null, null, null, null, //160-169
    null, null, null, null, null, null, //170-175
    [9,21,32,32,42,9,21,18,8,8,9,21,8,41,29,29,18,8,29,32,42,42,41,29],  //176 - Degree Symbol
    null, null, null, //177-179 
    null, null, null, null, null, null, null, null, null, null, //180-189
    null, null, null, null, null, null, null, null, null, null, //190-199
    null, null, null, null, null, null, null, null, null, null, //200-209
    null, null, null, null, null, null, null, null, null, null, //210-219
    null, null, null, null, null, null, null, null, null, null, //220-229
    null, null, null, null, null, null, null, null, null, null, //230-239
    null, null, null, null, null, null, null, null,  //240-247
    [9,21,32,32,42,9,21,18,8,8,9,21,8,41,29,29,18,8,29,32,42,42,41,29], // Degree Symbol - 248
    null, //249
    null, null, null, null, null, null, null, null, null, null, //250-259
    //
];
const asciiWidths = [
    0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.1, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.3, 0.2, 0.3, 0.1, 0.4, 0.4, 0.3, 0.4,
    0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.1, 0.1, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.3, 0.2, 0.2, 0.4, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4,
    0.4, 0.4, 0.4, 0.2, 0.3, 0.4, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.1, 0.3, 0.3, 0.4,

    0.4,0.4,//128,129
    0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4, //130-169
    0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4, //170-209
    0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4, //210-247
    0.3,
    0.4,//249
    0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,//250-259
];


for (let k=0; k<asciiIndices.length; k++)
{
    const charIndices = asciiIndices[k];
    if (charIndices instanceof Array)
    {
        for (let i=0; i<charIndices.length; i+=3)
        {
            const i1 = charIndices[i];
            const i2 = charIndices[i+1];
            const i3 = charIndices[i+2];
            const v1 = new vec4(asciiVertices[i1*3], asciiVertices[i1*3+1], asciiVertices[i1*3+2]);
            const v2 = new vec4(asciiVertices[i2*3], asciiVertices[i2*3+1], asciiVertices[i2*3+2]);
            const v3 = new vec4(asciiVertices[i3*3], asciiVertices[i3*3+1], asciiVertices[i3*3+2]);

            const v12 = v2.sub(v1);
            const v13 = v3.sub(v1);
            const cross = (v12.x*v13.y) - (v12.y*v13.x);
            if (cross < 0)
            {
                charIndices[i+1] = i3;
                charIndices[i+2] = i2;
            }
        }
    }
}

