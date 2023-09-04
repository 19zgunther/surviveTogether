class mat4 {
    constructor()
    {
        //COLUMN MAJOR ALIGNMENT
        this.f32a = new Float32Array(16); //float 32 array
        for( var i=0; i<16; i++)
        {
            this.f32a[i] = 0;
        }
    }
    setValues(array)
    {
        if (array.length != 16)
        {
            console.error("mat4.set(array) - array.length != 16");
            return;
        }
        for (var i=0; i<16; i++)
        {
            this.f32a[i] = array[i];
        }
        return this;
    }
    setUnit()
    {
        for( var i=0; i<16; i++)
        {
            this.f32a[i] = 0;
        }
        this.f32a[0] = 1;
        this.f32a[5] = 1;
        this.f32a[10] = 1;
        this.f32a[15] = 1;
        return this;
    }
    makePerspective(FOV, aspect, near, far)
    {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * FOV);
        var range = 1.0/(near-far);
        this.f32a[0] = f/aspect;
        this.f32a[4] = 0;
        this.f32a[8] = 0;
        this.f32a[12] = 0;

        this.f32a[1] = 0;
        this.f32a[5] = f;
        this.f32a[9] = 0;
        this.f32a[13] = 0;

        this.f32a[2] = 0;
        this.f32a[6] = 0;
        this.f32a[10] = (near+far)*range,
        this.f32a[14] = -1;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = near*far*range*2;
        this.f32a[15] = 0;
        return this;
    }
    makeOrthogonal(zoom, aspect, near, far)
    {
        var range = 1.0/(far);

        this.f32a[0] = (1/aspect) * zoom;
        this.f32a[4] = 0;
        this.f32a[8] = 0;
        this.f32a[12] = 0;

        this.f32a[1] = 0;
        this.f32a[5] = zoom;
        this.f32a[9] = 0;
        this.f32a[13] = 0;

        this.f32a[2] = 0;
        this.f32a[6] = 0;
        this.f32a[10] = range;
        this.f32a[14] = 1;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        return this;
    }
    makeTranslation(x,y=0,z=0)
    {
        if (x instanceof vec4)
        {
            y = x.y;
            z = x.z;
            x = x.x;
        }

        if (x == null || isNaN(x)) { x = 0;}
        if (y == null || isNaN(y)) { y = 0;}
        if (z == null || isNaN(z)) { z = 0;}

        //COLUMN MAJOR ALIGNMENT
        this.f32a[0] = 1;
        this.f32a[4] = 0;
        this.f32a[8] = 0;
        this.f32a[12] = x;

        this.f32a[1] = 0;
        this.f32a[5] = 1;
        this.f32a[9] = 0;
        this.f32a[13] = y;

        this.f32a[2] = 0;
        this.f32a[6] = 0;
        this.f32a[10] = 1;
        this.f32a[14] = z;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        
        return this;
    }
    makeTranslationAndScale(tx,ty,tz=0, sx=1, sy=1, sz=1)
    {
        if (tx instanceof vec4 && ty instanceof vec4)
        {
            sx = ty.x;
            sy = ty.y;
            sz = ty.z;

            ty = tx.y;
            tz = tx.z;
            tx = tx.x;
        } else {
            if (tx == null || isNaN(tx) || ty == null || isNaN(ty)) {
                console.error("mart4.makeTranslationAndScale() requires either 2 vec4s or 6 scalars as inputs. Given null values.");
                return;
            }
        }

        //COLUMN MAJOR ALIGNMENT
        this.f32a[0] = sx;
        this.f32a[4] = 0;
        this.f32a[8] = 0;
        this.f32a[12] = tx;

        this.f32a[1] = 0;
        this.f32a[5] = sy;
        this.f32a[9] = 0;
        this.f32a[13] = ty;

        this.f32a[2] = 0;
        this.f32a[6] = 0;
        this.f32a[10] = sz;
        this.f32a[14] = tz;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        
        return this;
    }
    makeScale(x,y=1,z=1,a=1)
    {
        if (x instanceof vec4)
        {
            //COLUMN MAJOR ALIGNMENT
            this.f32a[0] = x.x;
            this.f32a[4] = 0;
            this.f32a[8] = 0;
            this.f32a[12] = 0;

            this.f32a[1] = 0;
            this.f32a[5] = x.y;
            this.f32a[9] = 0;
            this.f32a[13] = 0;

            this.f32a[2] = 0;
            this.f32a[6] = 0;
            this.f32a[10] = x.z;
            this.f32a[14] = 0;

            this.f32a[3] = 0;
            this.f32a[7] = 0;
            this.f32a[11] = 0;
            this.f32a[15] = x.a;
        } else {

            //COLUMN MAJOR ALIGNMENT
            this.f32a[0] = x;
            this.f32a[4] = 0;
            this.f32a[8] = 0;
            this.f32a[12] = 0;

            this.f32a[1] = 0;
            this.f32a[5] = y;
            this.f32a[9] = 0;
            this.f32a[13] = 0;

            this.f32a[2] = 0;
            this.f32a[6] = 0;
            this.f32a[10] = z;
            this.f32a[14] = 0;

            this.f32a[3] = 0;
            this.f32a[7] = 0;
            this.f32a[11] = 0;
            this.f32a[15] = a;
        }
        return this;
    }
    makeRotation(a,b,y) {
        if (a instanceof vec4)
        {
            y = a.z;
            b = a.y;
            a = a.x;
        }

        //COLUMN MAJOR ALIGNMENT
        if (a == null || isNaN(a)) { a = 0;}
        if (b == null || isNaN(b)) { b = 0;}
        if (y == null || isNaN(y)) { y = 0;}
        var sa = Math.sin(a);
        var ca = Math.cos(a);
        var sb = Math.sin(b);
        var cb = Math.cos(b);
        var sy = Math.sin(y);
        var cy = Math.cos(y);

        this.f32a[0] = ca*cb;
        this.f32a[4] = ca*sb*sy-sa*cy;
        this.f32a[8] = ca*sb*cy+sa*sy;
        this.f32a[12] = 0;

        this.f32a[1] = sa*cb;
        this.f32a[5] = sa*sb*sy+ca*cy;
        this.f32a[9] = sa*sb*cy-ca*sy;
        this.f32a[13] = 0;

        this.f32a[2] = -sb;
        this.f32a[6] = cb*sy;
        this.f32a[10] = cb*cy;
        this.f32a[14] = 0;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        return this;
    }
    makeRotationX(r)
    {
        this.f32a[0] = 1;
        this.f32a[4] = 0;
        this.f32a[8] = 0;
        this.f32a[12] = 0;

        this.f32a[1] = 0;
        this.f32a[5] = Math.cos(r);
        this.f32a[9] = -Math.sin(r);
        this.f32a[13] = 0;

        this.f32a[2] = 0;
        this.f32a[6] = Math.sin(r);
        this.f32a[10] = Math.cos(r);
        this.f32a[14] = 0;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        return this;
    }
    makeRotationY(r)
    {
        this.f32a[0] = Math.cos(r);
        this.f32a[4] = 0;
        this.f32a[8] = Math.sin(r);
        this.f32a[12] = 0;

        this.f32a[1] = 0;
        this.f32a[5] = 1;
        this.f32a[9] = 0;
        this.f32a[13] = 0;

        this.f32a[2] = -Math.sin(r);
        this.f32a[6] = 0;
        this.f32a[10] = Math.cos(r);
        this.f32a[14] = 0;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        return this;
    }
    makeRotationZ(r)
    {
        this.f32a[0] = Math.cos(r);
        this.f32a[4] = -Math.sin(r);
        this.f32a[8] = 0;
        this.f32a[12] = 0;

        this.f32a[1] = Math.sin(r);
        this.f32a[5] = Math.cos(r);
        this.f32a[9] = 0;
        this.f32a[13] = 0;

        this.f32a[2] = 0;
        this.f32a[6] = 0;
        this.f32a[10] = 1;
        this.f32a[14] = 0;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        return this;
    }
    makeTranslationRotationScale(pos=new vec4(), rotation=new vec4(), scale=new vec4(1,1,1)) {
        const f1 = [1,0,0,0, 0,1,0,0, 0,0,1,0, pos.x,pos.y,pos.z,1,]; //f1 is trans matrix 
        const sca = [scale.x,0,0,0, 0,scale.y,0,0, 0,0,scale.z,0, 0,0,0,1]; //sca is scale matrix
        
        //make rot[], rotation matrix
        const y = rotation.z;
        const b = rotation.y;
        const a = rotation.x;
        const sa = Math.sin(a);
        const ca = Math.cos(a);
        const sb = Math.sin(b);
        const cb = Math.cos(b);
        const sy = Math.sin(y);
        const cy = Math.cos(y);

        /*const rot = [
            ca*cb,   ca*sb*sy-sa*cy,   ca*sb*cy+sa*sy,   0,
            sa*cb,   sa*sb*sy+ca*cy,   sa*sb*cy-ca*sy,   0,
            -sb,     cb*sy,            cb*cy,            0,
            0,       0,                0,                1,
        ];*/
        const rot = [
            ca*cb,                     sa*cb,              -sb,            0,
            ca*sb*sy-sa*cy,   sa*sb*sy+ca*cy,              cb*sy,            0,
            ca*sb*cy+sa*sy,          sa*sb*cy-ca*sy,        cb*cy,            0,
            0,                            0,                0,                1,
        ];

        const f2 = [ //rotation * scale
            rot[0]*sca[0] + rot[4]*sca[1] + rot[8]*sca[2] + rot[12]*sca[3],
            rot[1]*sca[0] + rot[5]*sca[1] + rot[9]*sca[2] + rot[13]*sca[3],
            rot[2]*sca[0] + rot[6]*sca[1] + rot[10]*sca[2] + rot[14]*sca[3],
            rot[3]*sca[0] + rot[7]*sca[1] + rot[11]*sca[2] + rot[15]*sca[3],

            rot[0]*sca[4] + rot[4]*sca[5] + rot[8]*sca[6] + rot[12]*sca[7],
            rot[1]*sca[4] + rot[5]*sca[5] + rot[9]*sca[6] + rot[13]*sca[7],
            rot[2]*sca[4] + rot[6]*sca[5] + rot[10]*sca[6] + rot[14]*sca[7],
            rot[3]*sca[4] + rot[7]*sca[5] + rot[11]*sca[6] + rot[15]*sca[7],

            rot[0]*sca[8] + rot[4]*sca[9] + rot[8]*sca[10] + rot[12]*sca[11],
            rot[1]*sca[8] + rot[5]*sca[9] + rot[9]*sca[10] + rot[13]*sca[11],
            rot[2]*sca[8] + rot[6]*sca[9] + rot[10]*sca[10] + rot[14]*sca[11],
            rot[3]*sca[8] + rot[7]*sca[9] + rot[11]*sca[10] + rot[15]*sca[11],

            rot[0]*sca[12] + rot[4]*sca[13] + rot[8]*sca[14] + rot[12]*sca[15],
            rot[1]*sca[12] + rot[5]*sca[13] + rot[9]*sca[14] + rot[13]*sca[15],
            rot[2]*sca[12] + rot[6]*sca[13] + rot[10]*sca[14] + rot[14]*sca[15],
            rot[3]*sca[12] + rot[7]*sca[13] + rot[11]*sca[14] + rot[15]*sca[15],
        ];

        const vals = [
            f1[0]*f2[0] + f1[4]*f2[1] + f1[8]*f2[2] + f1[12]*f2[3],
            f1[1]*f2[0] + f1[5]*f2[1] + f1[9]*f2[2] + f1[13]*f2[3],
            f1[2]*f2[0] + f1[6]*f2[1] + f1[10]*f2[2] + f1[14]*f2[3],
            f1[3]*f2[0] + f1[7]*f2[1] + f1[11]*f2[2] + f1[15]*f2[3],

            f1[0]*f2[4] + f1[4]*f2[5] + f1[8]*f2[6] + f1[12]*f2[7],
            f1[1]*f2[4] + f1[5]*f2[5] + f1[9]*f2[6] + f1[13]*f2[7],
            f1[2]*f2[4] + f1[6]*f2[5] + f1[10]*f2[6] + f1[14]*f2[7],
            f1[3]*f2[4] + f1[7]*f2[5] + f1[11]*f2[6] + f1[15]*f2[7],

            f1[0]*f2[8] + f1[4]*f2[9] + f1[8]*f2[10] + f1[12]*f2[11],
            f1[1]*f2[8] + f1[5]*f2[9] + f1[9]*f2[10] + f1[13]*f2[11],
            f1[2]*f2[8] + f1[6]*f2[9] + f1[10]*f2[10] + f1[14]*f2[11],
            f1[3]*f2[8] + f1[7]*f2[9] + f1[11]*f2[10] + f1[15]*f2[11],

            f1[0]*f2[12] + f1[4]*f2[13] + f1[8]*f2[14] + f1[12]*f2[15],
            f1[1]*f2[12] + f1[5]*f2[13] + f1[9]*f2[14] + f1[13]*f2[15],
            f1[2]*f2[12] + f1[6]*f2[13] + f1[10]*f2[14] + f1[14]*f2[15],
            f1[3]*f2[12] + f1[7]*f2[13] + f1[11]*f2[14] + f1[15]*f2[15],
        ];

        this.setValues(vals);
        
        return this;
    }
    makeIdentity()
    {
        this.f32a[0] = 1;
        this.f32a[4] = 0;
        this.f32a[8] = 0;
        this.f32a[12] = 0;

        this.f32a[1] = 0;
        this.f32a[5] = 1;
        this.f32a[9] = 0;
        this.f32a[13] = 0;

        this.f32a[2] = 0;
        this.f32a[6] = 0;
        this.f32a[10] = 1;
        this.f32a[14] = 0;

        this.f32a[3] = 0;
        this.f32a[7] = 0;
        this.f32a[11] = 0;
        this.f32a[15] = 1;
        return this;
    }
    mul(mat) {
        if (mat instanceof mat4) {
            var f1 = this.getFloat32Array();
            var f2 = mat.getFloat32Array();
            var out = new mat4();
            var vals = [
                f1[0]*f2[0] + f1[4]*f2[1] + f1[8]*f2[2] + f1[12]*f2[3],
                f1[1]*f2[0] + f1[5]*f2[1] + f1[9]*f2[2] + f1[13]*f2[3],
                f1[2]*f2[0] + f1[6]*f2[1] + f1[10]*f2[2] + f1[14]*f2[3],
                f1[3]*f2[0] + f1[7]*f2[1] + f1[11]*f2[2] + f1[15]*f2[3],

                f1[0]*f2[4] + f1[4]*f2[5] + f1[8]*f2[6] + f1[12]*f2[7],
                f1[1]*f2[4] + f1[5]*f2[5] + f1[9]*f2[6] + f1[13]*f2[7],
                f1[2]*f2[4] + f1[6]*f2[5] + f1[10]*f2[6] + f1[14]*f2[7],
                f1[3]*f2[4] + f1[7]*f2[5] + f1[11]*f2[6] + f1[15]*f2[7],

                f1[0]*f2[8] + f1[4]*f2[9] + f1[8]*f2[10] + f1[12]*f2[11],
                f1[1]*f2[8] + f1[5]*f2[9] + f1[9]*f2[10] + f1[13]*f2[11],
                f1[2]*f2[8] + f1[6]*f2[9] + f1[10]*f2[10] + f1[14]*f2[11],
                f1[3]*f2[8] + f1[7]*f2[9] + f1[11]*f2[10] + f1[15]*f2[11],

                f1[0]*f2[12] + f1[4]*f2[13] + f1[8]*f2[14] + f1[12]*f2[15],
                f1[1]*f2[12] + f1[5]*f2[13] + f1[9]*f2[14] + f1[13]*f2[15],
                f1[2]*f2[12] + f1[6]*f2[13] + f1[10]*f2[14] + f1[14]*f2[15],
                f1[3]*f2[12] + f1[7]*f2[13] + f1[11]*f2[14] + f1[15]*f2[15],
            ];
            out.setValues(vals);
            return out;
        } else if (mat instanceof vec4) {
            var f1 = this.getFloat32Array();
            var f2 = mat.getFloat32Array();
            var vals = [
                f1[0]*f2[0] + f1[4]*f2[1] + f1[8]*f2[2] + f1[12]*f2[3],
                f1[1]*f2[0] + f1[5]*f2[1] + f1[9]*f2[2] + f1[13]*f2[3],
                f1[2]*f2[0] + f1[6]*f2[1] + f1[10]*f2[2] + f1[14]*f2[3],
                f1[3]*f2[0] + f1[7]*f2[1] + f1[11]*f2[2] + f1[15]*f2[3],
            ];
            return (new vec4).set(vals);
        } else if (typeof mat == 'number') {
            var newMat = new mat4();
            for(var i=0; i<16; i++)
            {
                newMat.f32a[i] = this.f32a[i] * mat;
            }
            return newMat;
        }
        console.error("mat4.mul() was passed Object it couldn't multiply. Valid types: mat4, vec4, number. ");
        return null;
    }
    muli(mat) {
        //Multiply into mat4 object.
        if (mat instanceof mat4) {
            var f1 = this.getFloat32Array();
            var f2 = mat.getFloat32Array();
            //var out = new mat4();
            
            this.f32a[0] = f1[0]*f2[0] + f1[4]*f2[1] + f1[8]*f2[2] + f1[12]*f2[3];
            this.f32a[1] = f1[1]*f2[0] + f1[5]*f2[1] + f1[9]*f2[2] + f1[13]*f2[3];
            this.f32a[2] = f1[2]*f2[0] + f1[6]*f2[1] + f1[10]*f2[2] + f1[14]*f2[3];
            this.f32a[3] = f1[3]*f2[0] + f1[7]*f2[1] + f1[11]*f2[2] + f1[15]*f2[3];

            this.f32a[4] = f1[0]*f2[4] + f1[4]*f2[5] + f1[8]*f2[6] + f1[12]*f2[7];
            this.f32a[5] = f1[1]*f2[4] + f1[5]*f2[5] + f1[9]*f2[6] + f1[13]*f2[7];
            this.f32a[6] = f1[2]*f2[4] + f1[6]*f2[5] + f1[10]*f2[6] + f1[14]*f2[7];
            this.f32a[7] = f1[3]*f2[4] + f1[7]*f2[5] + f1[11]*f2[6] + f1[15]*f2[7];

            this.f32a[8] = f1[0]*f2[8] + f1[4]*f2[9] + f1[8]*f2[10] + f1[12]*f2[11];
            this.f32a[9] = f1[1]*f2[8] + f1[5]*f2[9] + f1[9]*f2[10] + f1[13]*f2[11];
            this.f32a[10] = f1[2]*f2[8] + f1[6]*f2[9] + f1[10]*f2[10] + f1[14]*f2[11];
            this.f32a[11] = f1[3]*f2[8] + f1[7]*f2[9] + f1[11]*f2[10] + f1[15]*f2[11];

            this.f32a[12] = f1[0]*f2[12] + f1[4]*f2[13] + f1[8]*f2[14] + f1[12]*f2[15];
            this.f32a[13] = f1[1]*f2[12] + f1[5]*f2[13] + f1[9]*f2[14] + f1[13]*f2[15];
            this.f32a[14] = f1[2]*f2[12] + f1[6]*f2[13] + f1[10]*f2[14] + f1[14]*f2[15];
            this.f32a[15] = f1[3]*f2[12] + f1[7]*f2[13] + f1[11]*f2[14] + f1[15]*f2[15];
            
            return this;
        } else if (typeof mat == 'number') {
            for(var i=0; i<16; i++)
            {
                this.f32a[i] = this.f32a[i] * mat;
            }
            return this;
        }
        console.error("mat4.muli() requires either a mat4 or a scalar as an input.");
        return null;
    }
    add(mat) {
        if (mat instanceof mat4)
        {
            var newMat = new mat4();
            for (var i=0; i<16; i++)
            {
                newMat.f32a[i] = this.f32a[i] + mat.f32a[i];
            }
            return newMat;
        } else {
            console.error("mat4.add() requires a mat4 as the argument");
        }
    }
    sub(mat) {
        
        if (mat instanceof mat4)
        {
            var newMat = new mat4();
            for (var i=0; i<16; i++)
            {
                newMat.f32a[i] = this.f32a[i] - mat.f32a[i];
            }
            return newMat;
        } else {
            console.error("mat4.sub() requires a mat4 as the argument");
        }
    }
    getFloat32Array()
    {
        return this.f32a;
    }
    toString(fixed = 4)
    {
        //return this.print();
        var s = "";
        var vals = [];
        for (var i=0; i<16; i++)
        {
            vals.push(this.f32a[i].toFixed(fixed));
        }
        s += vals[0] + " " + vals[4] + " " + vals[8] + " " + vals[12] + "\n";
        s += vals[1] + " " + vals[5] + " " + vals[9] + " " + vals[13] + "\n";
        s += vals[2] + " " + vals[6] + " " + vals[10] + " " + vals[14] + "\n";
        s += vals[3] + " " + vals[7] + " " + vals[11] + " " + vals[15] + "\n";
        return s;
    }
    print()
    {
        console.log(this.toString());
    }
    copy()
    {
        var m = new mat4();
        m.setValues( this.getFloat32Array() );
        return m;
    }
    invert()
    {        
        //Alrighty this is math I don't really care for but I need so here goes nothing
        
        /*
        0  4  8   12
        1  5  9   13
        2  6  10  14
        3  7  11  15
        */
        var mat = this.copy();
        var mat2 = (new mat4()).makeIdentity();
        /*
        console.log("mat2\n" + mat2.toString());
        for (var column = 0; column < 4; column ++)
        {
            for (var row = 3; row > column; row--)
            {
                var index = column*4 + row;
                
                if (mat.f32a[index] == 0) //if the index is already 0, just continue. We don't need to reduce it!
                {
                    continue;
                } else {
                    //so, at index column row, we have a value we need to reduce.
                    //lets find a different non-zero index in this column
                    var row2 = -1;
                    for(var r2 = row-1; r2 >= 0; r2--)
                    {
                        if (mat.f32a[column*4 + r2] != 0) 
                        {
                            row2 = r2;
                            break;
                        }
                    }
                    if (row2 == -1)
                    {
                        console.error("Cannot find inverse of matrix. Error: no above row to reduce with!");
                        return;
                    }
                    
                    //now, we have 2 row indexes, and we want to remove the item from the bottom row (higher row #)
                    //Formula: valToRemove + otherVal*X = 0    -->   X = -valToRemove/otherVal
                    var X = -mat.f32a[column*4 + row]/mat.f32a[column*4 + row2];
                    for (var column2 = 0; column2 < 4; column2++) //Now, for each column, add the val in row2 * X to row
                    {
                        mat.f32a[column2*4 + row] += X * mat.f32a[column2*4 + row2];
                        mat2.f32a[column2*4 + row] += X * mat2.f32a[column2*4 + row2];
                    }
                }
                
                console.log("C: "+column+"  R: "+row+"\n"+mat.toString());
            }
        }
        //At this point, we should have removed the bottom left triangle and set that to 0. Now, lets scale each row so the diagonal (topleft-bottomright) only has 1's
        for (var i=0; i<4; i++)
        {
            var val = mat.f32a[i*4+i];
            if (val == 0) //if the diagonal index (row i, column i) is not already == 1
            {
                console.error("Cannot find inverse of matrix. Error: cannot get diagonal of 1's! Wil divide by zero.");
                return;
            }
            //Get 1 in diagonal spot
            for (var c=0; c<4; c++)
            {
                mat.f32a[c*4 + i] = mat.f32a[c*4 + i]/val;
                mat2.f32a[c*4 + i] = mat2.f32a[c*4 + i]/val;
            }
        }
        console.log("After getting 1's: \n"+mat.toString());
        //Now, we've reduced to the point where we have a diagonal of 1's with nothing below/left of it.
        //cleanup upper side!
        for (var i=3; i>0; i--)
        {
            for (var r2 = i-1; r2 >=0; r2--)
            {
                // mat[col=i, row=r2] + X*1 = 0    (the 1 comes from index=i*4 + i, the diagonal)
                var X = -mat.f32a[i*4 + r2];
                var c2 = i;
                mat.f32a[c2*4 + r2] += X * mat.f32a[c2*4 + i];
                mat2.f32a[c2*4 + r2] += X * mat2.f32a[c2*4 + i];
                
            }
        }
        console.log("Final: \n"+mat.toString());
        console.log("inverse: \n" + mat2.toString());
        */

        for(var c = 0; c<4; c++)
        {
            //console.log("C: "+c+" \n"+mat.toString()+"\n"+mat2.toString());
            if (mat.f32a[c*4 + c] == 0)
            {
                console.error("Cannot Invert Matrix: Diagonal has a 0. Cannot divide by zero");
                return;
            }

            //divide entire row to get 1.
            var X = mat.f32a[c*4 + c];
            for (var c2 = 0; c2 < 4; c2++)
            {
                mat.f32a[c2*4 + c] = mat.f32a[c2*4 + c]/X;
                mat2.f32a[c2*4 + c] = mat2.f32a[c2*4 + c]/X;
            }

            //console.log("After Div Row by X: " +X+"\n"+mat.toString()+"\n"+mat2.toString());


            //remove all vals in column other than in row c
            var otherRow = -1;
            for (var r=0; r<4; r++)
            {
                if (r != c && mat.f32a[c*4 + r] != 0)
                {
                    //otherIndexVal + 1*X = 0   -->   X = -otherIndexVal
                    var X = mat.f32a[c*4 + r];
                    for (var c2=0; c2<4; c2++)
                    {
                        mat.f32a[c2*4 + r] += -X * mat.f32a[c2*4+c];
                        mat2.f32a[c2*4 + r] += -X * mat2.f32a[c2*4+c];
                    }
                }
                //console.log("After Clearing R: " +r+"\n"+mat.toString()+"\n"+mat2.toString());
            }
        }//-Math.atan(glPos.x*zNear)

        //console.log("REsult: \n"+mat.toString()+"\n"+mat2.toString());
        return mat2;



        mat2 = new mat4();

        mat2.f32a[0] = 1/mat.f32a[0];
        mat2.f32a[5] = 1/mat.f32a[5];
        mat2.f32a[11] = 1/mat.f32a[14];
        mat2.f32a[14] = 1/mat.f32a[11];
        mat2.f32a[15] = -mat.f32a[10] / ( mat.f32a[14] * mat.f32a[11] );

        return mat2;
    }
}
class vec4 {
    constructor(x,y,z,a) {
        if (x == null || isNaN(x)) { x = 0;}
        if (y == null || isNaN(y)) { y = 0;}
        if (z == null || isNaN(z)) { z = 0;}
        if (a == null || isNaN(a)) { a = 0;}
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
    }
    set(x,y,z,a) {
        if (x != null && (x instanceof Array == false))
        {
            this.x = x;
            this.y = y;
            this.z = z;
            this.a = a;
        } else if (x instanceof Array) {
            switch (x.length) {
                case 4: this.x=x[0];this.y=x[1];this.z=x[2];this.a=x[3];break;
                case 3: this.x=x[0];this.y=x[1];this.z=x[2];break;
                case 2: this.x=x[0];this.y=x[1];break;
                case 1: this.x=x[0];break;
            };
        }
        return this;
    }
    add(x,y,z,a)
    {
        if (x instanceof vec4)
        {
            return new vec4(this.x+x.x, this.y+x.y, this.z+x.z, this.a+x.a);
        }
        if (isNaN(x)) { x = 0;}
        if (isNaN(y)) { y = 0;}
        if (isNaN(z)) { z = 0;}
        if (isNaN(a)) { a = 0;}
        return new vec4(this.x+x, this.y+y, this.z+z, this.a+a); 
    }
    addi(x,y=0,z=0,a=0)
    {
        if (x instanceof vec4)
        {
            //return new vec4(this.x+x.x, this.y+x.y, this.z+x.z, this.a+x.a);
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
            this.a += x.a;
            return this;
        }

        if (isNaN(x)) { x = 0;}
        if (isNaN(y)) { y = 0;}
        if (isNaN(z)) { z = 0;}
        if (isNaN(a)) { a = 0;}
        //return new vec4(this.x+x, this.y+y, this.z+z, this.a+a);
        this.x += x;
        this.y += y;
        this.z += z;
        this.a += a;

        return this;
    }
    sub(x,y,z,a)
    {
        if (x instanceof vec4)
        {
            return new vec4(this.x-x.x, this.y-x.y, this.z-x.z, this.a-x.a);
        }
        if (isNaN(x)) { x = 0;}
        if (isNaN(y)) { y = 0;}
        if (isNaN(z)) { z = 0;}
        if (isNaN(a)) { a = 0;}
        return new vec4(this.x-x, this.y-y, this.z-z, this.a-a); 
    }
    subi(x,y=0,z=0,a=0)
    {
        if (x instanceof vec4)
        {
            //return new vec4(this.x+x.x, this.y+x.y, this.z+x.z, this.a+x.a);
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
            this.a -= x.a;
            return this;
        }
        if (isNaN(x)) { x = 0;}
        if (isNaN(y)) { y = 0;}
        if (isNaN(z)) { z = 0;}
        if (isNaN(a)) { a = 0;}
        //return new vec4(this.x+x, this.y+y, this.z+z, this.a+a);
        this.x -= x;
        this.y -= y;
        this.z -= z;
        this.a -= a;
        return this;
    }
    mul(x,y=null,z=null,a=null)
    {
        if (x instanceof vec4)
        {
            //multiply by vector
            return new vec4(this.x*x.x, this.y*x.y, this.z*x.z, this.a*x.a);
        } else if ( !isNaN(x) && y == null && z == null && a == null) {
            //multiply by scalar
            return new vec4(this.x*x, this.y*x, this.z*x, this.a*x);
        } else if (x instanceof mat4)
        {
            console.error("vec4.mul() cannot take a mat4 as an argument. Try mat4.mul(vec4).");
        } else {
            //multiple by all scalars
            if (isNaN(x)) { x = 0;}
            if (isNaN(y)) { y = 0;}
            if (isNaN(z)) { z = 0;}
            if (isNaN(a)) { a = 0;}
            return new vec4(this.x*x, this.y*y, this.z*z, this.a*a);
        }
    }
    muli(x,y=null,z=null,a=null)
    {
        //console.log("x: " + x + "  y: " + y + "  z: " + z + "  a: " + a);
        if (x instanceof vec4)
        {
            //multiply by vector
            this.x = this.x*x.x;
            this.y = this.y*x.y;
            this.z = this.z*x.z;
            this.a = this.a*x.a;
        } else if ( !isNaN(Number(x)) && y == null && z == null && a == null) {
            //multiply by scalar
            this.x = this.x*x;
            this.y = this.y*x;
            this.z = this.z*x;
            this.a = this.a*x;
        } else {
            //multiple by all scalars
            if (isNaN(x)) { x = 0;}
            if (isNaN(y)) { y = 0;}
            if (isNaN(z)) { z = 0;}
            if (isNaN(a)) { a = 0;}
            this.x = this.x*x;
            this.y = this.y*y;
            this.z = this.z*z;
            this.a = this.a*a;
        }
        return this;
    }
    dot(vec)
    {
        if (vec instanceof vec4 == false)
        {
            console.error("vec4.dot() was passed a non vec4.")
            return null;
        }
        return this.x*vec.x + this.y*vec.y + this.z*vec.z + this.a*vec.a;
    }
    cross(vec)
    {
        if (vec instanceof vec4 == false)
        {
            console.error("vec4.dot() was passed a non vec4.")
            return null;
        }

        return new vec4(this.z*vec.y + this.y*vec.z, this.z*vec.x - this.x*vec.z, -this.y*vec.x + this.x*vec.y);
        /*
        let x = -this.z*vec.y + this.y*vec.z;
        let y = this.z*vec.x - this.x*vec.z;
        let z = -this.y*vec.x + this.x*vec.y;
        return new vec4(x,y,z);*/
    }
    getFloat32Array()
    {
        return new Float32Array([this.x,this.y,this.z,this.a]);
    }
    copy()
    {
        return new vec4(this.x, this.y, this.z, this.a);
    }
    getLength()
    {
        return Math.sqrt(  this.x*this.x + this.y*this.y + this.z*this.z  );
    }
    getMagnitude() {
        return Math.sqrt(  this.x*this.x + this.y*this.y + this.z*this.z  + this.a * this.a);
    }
    getHash()
    {
        return this.x*1000000 + this.y*1000 + this.z;
    }
    scaleToUnit()
    {
        //divide each component by the length of the vector
        var L = this.getMagnitude();
        if (L == 0) { return this; } 
        this.x = this.x/L;
        this.y = this.y/L;
        this.z = this.z/L;
        this.a = this.a/L;
        return this;
    }
    round(val = 1)
    {   
        this.x = Math.round(this.x/val)*val;
        this.y = Math.round(this.y/val)*val;
        this.z = Math.round(this.z/val)*val;
        return this;
    }
    toString(roundToValue = 0.01)
    {
        var p = 3;
        var s = "< " + (Math.round(this.x/roundToValue)*roundToValue).toPrecision(p)+", "+ (Math.round(this.y/roundToValue)*roundToValue).toPrecision(p)+", "+ (Math.round(this.z/roundToValue)*roundToValue).toPrecision(p)+", "+ (Math.round(this.a/roundToValue)*roundToValue).toPrecision(p)+">";
        return s;
    }
    equals(otherVec4)
    {
        if (otherVec4 instanceof vec4 && otherVec4.x == this.x && otherVec4.y == this.y && otherVec4.z == this.z && otherVec4.a == this.a)
        {
            return true;
        }
        return false;
    }
    greaterThan(otherVec4)
    {
        return this.getHash() > otherVec4.getHash();
    }
    closeTo(vec, delta = 0.000001)
    {
        return ((Math.abs(this.x-vec.x) + Math.abs(this.y-vec.y) + Math.abs(this.z-vec.z)) < delta)
    }
}
const pseudoRandomInput1 = Math.random();
const pseudoRandomInput2 = Math.random();
function random(st = new vec4()) {
    st = st.copy();
    st.a = 0;
    let a = st.dot(new vec4(12.9898,78.233,30.5489));
    a = Math.sin(a) * 43758.5453123;

    return a - Math.round(a-0.5);
}
function perlinNoise(p = new vec4) {
    const corner = p.copy().subi(.5, .5, .5).round()
    const f = p.sub(corner);

    //Compute Corner Random Values
    const c000 = random(corner);
    const c100 = random(corner.add(1,0,0));
    const c110 = random(corner.add(1,1,0));
    const c010 = random(corner.add(0,1,0));
    const c001 = random(corner.add(0,0,1));
    const c101 = random(corner.add(1,0,1));
    const c111 = random(corner.add(1,1,1));
    const c011 = random(corner.add(0,1,1));

    //Interpolate to find 'p' position, and return value
    const c00 = c000*(1.0 - f.x) + c100*f.x;
    const c01 = c001*(1.0 - f.x) + c101*f.x;
    const c10 = c010*(1.0 - f.x) + c110*f.x;
    const c11 = c011*(1.0 - f.x) + c111*f.x;
    const c0 = c00*(1.0 - f.y) + c10*f.y;
    const c1 = c01*(1.0 - f.y) + c11*f.y;
    return c0*(1.0-f.z) + c1*f.z;
}
function pseudoRandom3(x,y,z) {
    const val = Math.sin(x*13.9898*pseudoRandomInput1 + y+78.233 + z*30.5489) * 43758.5453123*pseudoRandomInput2;
    return val - Math.floor(val);
}
function perlin(p = new vec4()) {
    const corner = new vec4(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z));
    const x = corner.x;
    const y = corner.y;
    const z = corner.z;
    const f = p.sub(corner);

    //Compute Corner Random Values
    const c000 = pseudoRandom3(x  ,y  ,z  );
    const c100 = pseudoRandom3(x+1,y  ,z  );
    const c110 = pseudoRandom3(x+1,y+1,z  );
    const c010 = pseudoRandom3(x  ,y+1,z  );
    const c001 = pseudoRandom3(x  ,y  ,z+1);
    const c101 = pseudoRandom3(x+1,y  ,z+1);
    const c111 = pseudoRandom3(x+1,y+1,z+1);
    const c011 = pseudoRandom3(x  ,y+1,z+1);

    //Interpolate to find 'p' position, and return value
    const c00 = c000*(1.0 - f.x) + c100*f.x;
    const c01 = c001*(1.0 - f.x) + c101*f.x;
    const c10 = c010*(1.0 - f.x) + c110*f.x;
    const c11 = c011*(1.0 - f.x) + c111*f.x;
    const c0 = c00*(1.0 - f.y) + c10*f.y;
    const c1 = c01*(1.0 - f.y) + c11*f.y;
    return c0*(1.0-f.z) + c1*f.z;
}


function distanceFromLine(l1, l2, p3) {
    const numerator = Math.abs(
        (l2.x - l1.x) * (l1.y - p3.y) - (l1.x - p3.x) * (l2.y - l1.y)
    );
    const denominator = Math.sqrt((l2.x - l1.x) ** 2 + (l2.y - l1.y) ** 2);
    const distance = numerator / denominator;
    return distance;
}



function parseOBJ(str = "string")
{
    if (str instanceof Array)
    {
        const arr = [];
        for (let i=0; i<str.length; i++)
        {
            arr.push(parseOBJ(str[i]));
        }
        return arr;
    }
    function match(text="", substring="", index=0)
    {
        for (let i=0; i<substring.length; i++)
        {
            if (i+index >= text.length) { return false; }
            if (text[i+index] != substring[i]) { return false; }
        }
        return true;
    }
    function computeNormal(v1,v2,v3)
    {
        const a = v2.sub(v1);
        const b = v3.sub(v1);
        // b.scaleToUnit();
        // a.scaleToUnit();
        return new vec4(
            a.y*b.z - a.z*b.y,
            a.z*b.x - a.x*b.z,
            a.x*b.y - a.y*b.x,
            0
        ).scaleToUnit();
    }

    const arr = str.split("\n");
    const colorMap = new Map();
    const vertices = [];
    const normals = [];
    const colors = [];
    const indices = [];
    const faces = [];
    let currentColor = new vec4(1,1,1,1);
    for (let i=0; i<arr.length; i++)
    {
        const line = arr[i];
        if (match(line, "newmtl",0))
        {
            // newmtl color_1206582
            // Ka 0 0 0 
            // Kd 0.07058823529411765 0.4117647058823529 0.21176470588235294
            // d 1
            // illum 0.0
            const temp = line.split(" ");
            const temp2 = arr[i+2].split(" ");
            colorMap.set(temp[1], new vec4(Number(temp2[1]), Number(temp2[2]), Number(temp2[3]), 1));
        }
        if (match(line, "usemtl",0))
        {
            //usemtl color_16089887
            const temp = line.split(" ");
            const col = colorMap.get(temp[1]);
            if (col != undefined)
            {
                currentColor = col.copy();
            }
        }
        if (line[0] == "v")
        {
            //v -1.732 		-1 		4
            const temp = line.split(" ");
            vertices.push(new vec4(Number(temp[1]), Number(temp[2]), Number(temp[3])));
        }
        if (line[0] == "f")
        {
            //f 11 	12 	13
            const temp = line.split(" ");
            faces.push( {
                i1: Number(temp[1])-1, 
                i2: Number(temp[2])-1,
                i3: Number(temp[3])-1,
                color: currentColor.copy()
            });
        }
    }

    // Adjust so all are centered x y , and compute x y radius
    let center = new vec4();
    for (let i=0; i<vertices.length; i++)
    {
        center.addi(vertices[i]);
    }
    center.muli(1/vertices.length, 1/vertices.length, 0);

    let radius = 0;
    for (let i=0; i<vertices.length; i++)
    {
        vertices[i].subi(center);

        const r = Math.sqrt(Math.pow(vertices[i].x,2)+Math.pow(vertices[i].y,2));
        radius = Math.max(r, radius);
    }



    // Convert from vertices and faces to indices & vertices with normals and colors
    let newVertices = [];
    let newNormals = [];
    let newColors = [];
    let newIndices = [];
    indOn=0;
    for (let i=0; i<faces.length; i++)
    {
        const f = faces[i];
        const v1 = vertices[f.i1];
        const v2 = vertices[f.i2];
        const v3 = vertices[f.i3];
        const normal = computeNormal(v1,v2,v3);
        const color = f.color.copy();
        
        newVertices.push(v1,v2,v3);
        newNormals.push(normal,normal,normal);
        newColors.push(color,color,color);
        newIndices.push(indOn,indOn+1,indOn+2);
        indOn+=3;
    }
    return {
        vertices: newVertices,
        normals: newNormals,
        colors: newColors,
        indices: newIndices,
        radius: radius,
    }
}
function computeBoundingBox(type = 'box', vertices = [new vec4()])
{
    let minVert = new vec4(1000,1000,1000);
    let maxVert = new vec4(-1000,-1000,-1000);
    let maxRadialDist = 0;
    for (let i in vertices)
    {
        minVert.x = Math.min(minVert.x, vertices[i].x);
        minVert.y = Math.min(minVert.y, vertices[i].y);
        minVert.z = Math.min(minVert.z, vertices[i].z);
        maxVert.x = Math.max(maxVert.x, vertices[i].x);
        maxVert.y = Math.max(maxVert.y, vertices[i].y);
        maxVert.z = Math.max(maxVert.z, vertices[i].z);

        maxRadialDist = Math.max(maxRadialDist, new vec4(vertices[i].x,vertices[i].y).getLength());
    }

    const center = minVert.add(maxVert).mul(0.5);
    const scale = maxVert.sub(minVert);

    return {
        center:center,
        scale:scale,
        min: minVert,
        max: maxVert,
        radius:maxRadialDist,
    }
}
function computeBoundingCylinder(vertices = [new vec4()], numIterations = 50)
{

    let bestCenter = new vec4(0,0,0);
    let bestMinZ = 10000;
    let bestMaxZ = -10000;
    let bestMinRadius = 100000;
    let bestVolume = 10000000;
    let pBestVolume = 1000000000; // does not matter for first itr
    for (let itr=0; itr<numIterations; itr++)
    {
        for (let dir=0; dir<4; dir++)
        {
            let center = new vec4();
            let minZ = 10000;
            let maxZ = -10000;
            let minRadius = 0;

            switch(dir)
            {
                case 0: center = bestCenter.add( 0.05,    0, 0); break;
                case 1: center = bestCenter.add(-0.05,    0, 0); break;
                case 2: center = bestCenter.add( 0,    0.05, 0); break;
                default:center = bestCenter.add( 0,   -0.05, 0); break;
            }

            for (let i in vertices)
            {
                const vec = vertices[i].sub(bestCenter);
                const radius = vec.muli(1,1,0,0).getLength();
                minZ = Math.min(vertices[i].z, minZ);
                maxZ = Math.max(vertices[i].z, maxZ);
                minRadius = Math.max(radius, minRadius);
            }

            let volume = 2*3.141592*minRadius * (maxZ - minZ);
            if (volume < bestVolume)
            {
                bestVolume = volume;
                bestMinZ = minZ;
                bestMaxZ = maxZ;
                bestMinRadius = minRadius;
                bestCenter = center;
            }
        }
        if (pBestVolume == bestVolume)
        {
            break;
        }
        pBestVolume = bestVolume;
    }


    return {
        center: new vec4(bestCenter.x, bestCenter.y, bestMinZ),
        height: bestMaxZ - bestMinZ,
        radius: bestMinRadius,
    }
}
function pointInsideBoundingCylinder(point=new vec4(), cylinderCenter=new vec4(), cylinderRadius=1, cylinderHeight=1)
{
    const vec = point.sub( cylinderCenter );
    const xyDist = vec.mul(1,1,0,0).getLength();
    if (xyDist > cylinderRadius)// || vec.z < 0 || vec.z > this.asset.boundingCylinderHeight)
    {
        return false;
    }
    return true;
}


// Define all asset objects
var wood = `
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -25.338 		-50.259 		0.151
v -25.365 		-50.259 		0.178
v -25.403 		-50.259 		0.188
v -25.44 		-50.259 		0.178
v -25.467 		-50.259 		0.151
v -25.403 		-49.909 		0.213
v -25.453 		-49.909 		0.2
v -25.365 		-49.859 		0.178
v -25.403 		-49.859 		0.188
v -25.478 		-50.259 		0.113
v -25.467 		-50.259 		0.076
v -25.44 		-50.259 		0.048
v -25.353 		-49.909 		0.026
v -25.403 		-50.259 		0.038
v -25.316 		-49.909 		0.063
v -25.353 		-49.909 		0.2
v -25.403 		-49.909 		0.013
v -25.365 		-49.859 		0.048
v -25.316 		-49.909 		0.163
v -25.338 		-49.859 		0.151
v -25.489 		-50.209 		0.063
v -25.44 		-49.859 		0.048
v -25.453 		-49.909 		0.026
v -25.403 		-49.859 		0.038
v -25.453 		-50.209 		0.026
v -25.489 		-49.909 		0.063
v -25.503 		-50.209 		0.113
v -25.365 		-50.259 		0.048
v -25.338 		-50.259 		0.076
v -25.467 		-49.859 		0.151
v -25.328 		-50.259 		0.113
v -25.503 		-49.909 		0.113
v -25.489 		-49.909 		0.163
v -25.44 		-49.859 		0.178
v -25.303 		-49.909 		0.113
v -25.328 		-49.859 		0.113
v -25.316 		-50.209 		0.063
v -25.338 		-49.859 		0.076
v -25.467 		-49.859 		0.076
v -25.303 		-50.209 		0.113
v -25.478 		-49.859 		0.113
v -25.403 		-50.209 		0.013
v -25.353 		-50.209 		0.2
v -25.403 		-50.209 		0.213
v -25.453 		-50.209 		0.2
v -25.316 		-50.209 		0.163
v -25.353 		-50.209 		0.026
v -25.489 		-50.209 		0.163
# 48 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 3 	31 	2
f 4 	31 	3
f 5 	31 	4
f 10 	28 	5
f 8 	9 	6
f 16 	8 	6
f 20 	8 	19
f 16 	19 	8
f 22 	24 	17
f 21 	25 	12
f 23 	22 	17
f 27 	21 	11
f 12 	14 	11
f 14 	28 	11
f 10 	11 	28
f 29 	5 	28
f 31 	5 	29
f 1 	2 	31
f 10 	27 	11
f 34 	9 	30
f 8 	20 	30
f 8 	30 	9
f 35 	36 	19
f 24 	22 	38
f 36 	38 	39
f 17 	25 	23
f 20 	36 	39
f 36 	20 	19
f 38 	36 	35
f 23 	25 	26
f 20 	41 	30
f 15 	38 	35
f 13 	18 	15
f 18 	38 	15
f 18 	24 	38
f 22 	39 	38
f 39 	41 	20
f 33 	32 	48
f 17 	24 	13
f 37 	47 	13
f 45 	7 	48
f 17 	13 	42
f 47 	42 	13
f 24 	18 	13
f 7 	45 	6
f 44 	6 	45
f 17 	42 	25
f 2 	43 	3
f 43 	44 	3
f 21 	26 	25
f 29 	37 	31
f 7 	33 	48
f 26 	21 	32
f 27 	32 	21
f 2 	1 	46
f 2 	46 	43
f 39 	22 	23
f 37 	40 	31
f 26 	39 	23
f 34 	30 	33
f 47 	37 	29
f 7 	34 	33
f 9 	7 	6
f 32 	41 	26
f 28 	47 	29
f 5 	48 	10
f 4 	45 	5
f 41 	39 	26
f 48 	27 	10
f 42 	47 	28
f 41 	32 	30
f 45 	48 	5
f 30 	32 	33
f 44 	45 	4
f 6 	44 	16
f 14 	42 	28
f 12 	25 	14
f 19 	46 	40
f 44 	4 	3
f 25 	42 	14
f 40 	37 	15
f 43 	16 	44
f 37 	13 	15
f 11 	21 	12
f 46 	19 	43
f 16 	43 	19
f 9 	34 	7
f 19 	40 	35
f 32 	27 	48
f 15 	35 	40
f 40 	46 	1
f 40 	1 	31
# 92 faces

#end of obj_0

`;
var stone = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -24.5566 		-49.8233 		0.2559
v -24.6852 		-50.1046 		0.0925
v -24.6096 		-50.0317 		0.0125
v -24.5687 		-50.0708 		0.0481
v -24.6101 		-50.0862 		0.0325
v -24.6842 		-50.0878 		0.0325
v -24.6106 		-50.1032 		0.0925
v -24.561 		-49.8661 		0.3125
v -24.5571 		-49.8729 		0.3125
v -24.5557 		-49.8769 		0.3125
v -24.538 		-49.8778 		0.2559
v -24.6842 		-50.0333 		0.0137
v -24.537 		-49.8798 		0.1748
v -24.7603 		-50.1039 		0.1703
v -24.6877 		-49.8243 		0.3103
v -24.6867 		-49.8072 		0.2514
v -24.6101 		-49.8297 		0.0325
v -24.6096 		-49.8852 		0.0125
v -24.6842 		-49.8865 		0.0137
v -24.638 		-49.8234 		0.3125
v -24.6131 		-49.8226 		0.3125
v -24.5687 		-49.8427 		0.0481
v -24.6116 		-49.8079 		0.1737
v -24.5556 		-49.8253 		0.1737
v -24.6857 		-49.8093 		0.1714
v -24.6096 		-49.8241 		0.3125
v -24.612 		-49.823 		0.3125
v -24.7603 		-49.8106 		0.1703
v -24.7613 		-49.8089 		0.2481
v -24.5556 		-50.0818 		0.1737
v -24.536 		-49.8818 		0.0925
v -24.5546 		-49.827 		0.0925
v -24.5541 		-49.8835 		0.0314
v -24.536 		-50.0283 		0.0925
v -24.5546 		-50.0838 		0.0925
v -24.5718 		-49.8367 		0.3003
v -24.6807 		-49.8294 		0.3125
v -24.5541 		-50.0303 		0.0314
v -24.762 		-49.8417 		0.3125
v -24.7442 		-49.8383 		0.3125
v -24.7618 		-49.8256 		0.307
v -24.8032 		-49.841 		0.2892
v -24.6126 		-49.8059 		0.2537
v -24.7956 		-49.8812 		0.3125
v -24.8178 		-49.8818 		0.3037
v -24.6126 		-50.0992 		0.2537
v -24.6116 		-50.1012 		0.1737
v -24.6867 		-50.1006 		0.2514
v -24.7956 		-50.0278 		0.3125
v -24.8178 		-50.0283 		0.3037
v -24.5557 		-50.0237 		0.3125
v -24.538 		-50.0246 		0.2559
v -24.561 		-50.0346 		0.3125
v -24.5571 		-50.0277 		0.3125
v -24.5566 		-50.0798 		0.2559
v -24.762 		-50.0659 		0.3125
v -24.537 		-50.0266 		0.1748
v -24.6984 		-50.0731 		0.3125
v -24.8032 		-50.0691 		0.2892
v -24.8153 		-50.0889 		0.0925
v -24.7593 		-50.1059 		0.0925
v -24.7618 		-50.0822 		0.307
v -24.8173 		-50.0848 		0.2459
v -24.8163 		-50.0868 		0.1692
v -24.7583 		-50.0347 		0.0148
v -24.8143 		-50.0353 		0.0348
v -24.7613 		-50.1022 		0.2481
v -24.8002 		-50.0755 		0.0492
v -24.7588 		-50.0892 		0.0337
v -24.8173 		-49.8283 		0.2459
v -24.8339 		-50.034 		0.0925
v -24.8163 		-49.83 		0.1692
v -24.836 		-50.03 		0.2459
v -24.836 		-49.8835 		0.2459
v -24.8349 		-50.0323 		0.1692
v -24.8349 		-49.8855 		0.1692
v -24.6106 		-49.8099 		0.0925
v -24.6877 		-50.0808 		0.3103
v -24.6877 		-50.0747 		0.3125
v -24.638 		-50.0799 		0.3125
v -24.6852 		-49.8113 		0.0925
v -24.7593 		-49.8126 		0.0925
v -24.6096 		-50.0783 		0.3125
v -24.5718 		-50.0648 		0.3003
v -24.612 		-50.0795 		0.3125
v -24.6131 		-50.0799 		0.3125
v -24.8153 		-49.8323 		0.0925
v -24.6842 		-49.831 		0.0325
v -24.8143 		-49.8885 		0.0348
v -24.7583 		-49.8882 		0.0148
v -24.7588 		-49.8327 		0.0337
v -24.8002 		-49.8474 		0.0492
v -24.6857 		-50.1026 		0.1714
v -24.8339 		-49.8875 		0.0925
# 94 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 6 	5 	7
f 9 	10 	11
f 1 	9 	11
f 36 	8 	1
f 9 	1 	8
f 5 	6 	12
f 8 	37 	9
f 17 	18 	19
f 21 	43 	20
f 16 	43 	25
f 11 	13 	24
f 23 	77 	81
f 11 	52 	13
f 11 	24 	1
f 23 	81 	25
f 24 	23 	1
f 27 	20 	26
f 21 	20 	27
f 37 	8 	20
f 52 	11 	51
f 10 	51 	11
f 16 	28 	29
f 30 	47 	35
f 16 	25 	28
f 13 	57 	31
f 34 	31 	57
f 31 	32 	13
f 32 	24 	13
f 28 	70 	29
f 16 	29 	41
f 34 	38 	33
f 34 	33 	31
f 33 	18 	17
f 72 	70 	28
f 17 	22 	33
f 33 	32 	31
f 22 	32 	33
f 26 	8 	36
f 26 	20 	8
f 10 	9 	37
f 39 	40 	41
f 35 	38 	34
f 40 	37 	15
f 40 	15 	41
f 35 	4 	38
f 4 	5 	38
f 5 	3 	38
f 35 	7 	5
f 5 	4 	35
f 41 	70 	42
f 15 	16 	41
f 27 	26 	1
f 26 	36 	1
f 43 	27 	1
f 21 	27 	43
f 1 	23 	43
f 44 	39 	45
f 41 	45 	39
f 15 	20 	43
f 42 	45 	41
f 43 	16 	15
f 23 	25 	43
f 30 	46 	47
f 20 	15 	37
f 57 	13 	52
f 55 	52 	54
f 51 	54 	52
f 84 	55 	53
f 54 	53 	55
f 49 	50 	56
f 53 	54 	40
f 54 	51 	40
f 56 	58 	49
f 56 	62 	58
f 55 	30 	57
f 52 	55 	57
f 30 	34 	57
f 62 	50 	59
f 30 	35 	34
f 40 	39 	58
f 3 	5 	12
f 63 	62 	59
f 63 	59 	50
f 56 	50 	62
f 75 	64 	63
f 66 	68 	60
f 6 	69 	65
f 2 	69 	6
f 6 	65 	12
f 63 	67 	62
f 69 	66 	65
f 66 	69 	68
f 69 	61 	60
f 69 	60 	68
f 44 	58 	39
f 69 	2 	61
f 42 	70 	45
f 70 	41 	29
f 66 	60 	71
f 72 	87 	76
f 14 	60 	61
f 44 	45 	49
f 50 	49 	45
f 67 	64 	14
f 45 	74 	50
f 63 	64 	67
f 14 	64 	60
f 10 	37 	51
f 51 	37 	40
f 49 	58 	44
f 63 	50 	73
f 50 	74 	73
f 75 	71 	64
f 74 	76 	73
f 76 	94 	75
f 63 	73 	75
f 64 	71 	60
f 70 	74 	45
f 75 	73 	76
f 74 	72 	76
f 70 	72 	74
f 32 	77 	24
f 58 	79 	40
f 53 	40 	83
f 77 	23 	24
f 58 	62 	78
f 79 	58 	78
f 80 	79 	78
f 78 	46 	80
f 85 	40 	86
f 80 	86 	40
f 83 	84 	53
f 81 	82 	25
f 81 	77 	88
f 86 	46 	85
f 33 	38 	18
f 28 	25 	82
f 87 	28 	82
f 17 	32 	22
f 77 	17 	88
f 18 	3 	19
f 77 	32 	17
f 72 	28 	87
f 88 	91 	81
f 17 	19 	88
f 85 	55 	83
f 55 	84 	83
f 48 	46 	78
f 90 	91 	88
f 48 	78 	62
f 46 	86 	80
f 79 	80 	40
f 83 	40 	85
f 90 	88 	19
f 55 	85 	46
f 87 	92 	89
f 90 	89 	91
f 89 	92 	91
f 7 	35 	47
f 91 	82 	81
f 61 	93 	14
f 61 	2 	93
f 93 	2 	47
f 87 	82 	91
f 48 	67 	14
f 62 	67 	48
f 91 	92 	87
f 48 	14 	93
f 66 	71 	89
f 46 	48 	93
f 3 	18 	38
f 46 	93 	47
f 46 	30 	55
f 65 	90 	12
f 12 	90 	19
f 90 	65 	89
f 66 	89 	65
f 3 	12 	19
f 87 	94 	76
f 87 	89 	94
f 71 	75 	94
f 94 	89 	71
f 6 	7 	2
f 7 	47 	2
# 184 faces

#end of obj_0

`;
var iron = `
# Color definition for Tinkercad Obj File 2015

newmtl color_12568524
Ka 0 0 0 
Kd 0.7490196078431373 0.7803921568627451 0.8
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -24.002 		-50.268 		0.217
v -23.852 		-50.165 		0.217
v -24.002 		-50.118 		0.3
v -24.152 		-50.165 		0.217
v -24.095 		-49.997 		0.217
v -23.91 		-49.997 		0.217
v -24.002 		-50.118 		0
v -24.152 		-50.072 		0.083
v -24.002 		-49.968 		0.083
v -23.91 		-50.24 		0.083
v -23.852 		-50.072 		0.083
v -24.095 		-50.24 		0.083
# 12 vertices

g group_0_12568524

usemtl color_12568524
s 0

f 1 	2 	3
f 5 	4 	3
f 4 	1 	3
f 6 	5 	3
f 2 	6 	3
f 7 	8 	9
f 2 	10 	11
f 9 	11 	7
f 10 	12 	7
f 2 	1 	10
f 11 	10 	7
f 12 	8 	7
f 1 	12 	10
f 12 	1 	4
f 4 	8 	12
f 5 	6 	9
f 4 	5 	8
f 6 	11 	9
f 5 	9 	8
f 6 	2 	11
# 20 faces

#end of obj_0

`;

var stone1 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -30.4743 		-50.1158 		0.0099
v -30.361 		-50.0358 		-0.091
v -30.2998 		-50.0787 		-0.0462
v -30.3617 		-50.0956 		-0.0658
v -30.4727 		-50.0974 		-0.0658
v -30.3625 		-50.1143 		0.0099
v -30.4727 		-50.0377 		-0.0896
v -30.6691 		-50.0985 		0.0099
v -30.5853 		-50.1172 		0.0099
v -30.5838 		-50.0391 		-0.0882
v -30.6676 		-50.0399 		-0.063
v -30.2816 		-49.8074 		0.2158
v -30.6465 		-50.0839 		-0.0448
v -30.5845 		-50.0989 		-0.0644
v -30.2801 		-50.0908 		0.1122
v -30.2507 		-49.8716 		0.0099
v -30.2786 		-49.8114 		0.0099
v -30.6971 		-50.0384 		0.0099
v -30.2779 		-49.8734 		-0.0672
v -30.478 		-49.8085 		0.2845
v -30.4765 		-49.7898 		0.2102
v -30.4035 		-49.8075 		0.2873
v -30.3662 		-49.8067 		0.2873
v -30.364 		-49.7905 		0.1122
v -30.475 		-49.792 		0.1094
v -30.3611 		-49.8083 		0.2873
v -30.3646 		-49.807 		0.2873
v -30.5868 		-49.7935 		0.108
v -30.5883 		-49.7916 		0.206
v -30.2882 		-49.8543 		0.2873
v -30.2823 		-49.8618 		0.2873
v -30.2803 		-49.8662 		0.2873
v -30.2537 		-49.8672 		0.2158
v -30.2522 		-49.8694 		0.1136
v -30.2801 		-49.8096 		0.1122
v -30.2803 		-50.0271 		0.2873
v -30.2537 		-50.0281 		0.2158
v -30.2882 		-50.0391 		0.2873
v -30.2823 		-50.0315 		0.2873
v -30.2816 		-50.0886 		0.2158
v -30.2522 		-50.0303 		0.1136
v -30.2507 		-50.0322 		0.0099
v -30.2786 		-50.093 		0.0099
v -30.2779 		-50.0344 		-0.0672
v -30.3655 		-49.7883 		0.213
v -30.3043 		-49.8221 		0.2719
v -30.4675 		-49.8141 		0.2873
v -30.5893 		-49.8276 		0.2873
v -30.5626 		-49.8239 		0.2873
v -30.5891 		-49.81 		0.2803
v -30.651 		-49.8268 		0.2579
v -30.6397 		-49.8708 		0.2873
v -30.6729 		-49.8716 		0.2761
v -30.6721 		-49.8129 		0.2032
v -30.6706 		-49.8147 		0.1066
v -30.7001 		-49.8734 		0.2032
v -30.6986 		-49.8756 		0.1066
v -30.478 		-50.0897 		0.2845
v -30.478 		-50.083 		0.2873
v -30.4035 		-50.0888 		0.2873
v -30.3611 		-50.0869 		0.2873
v -30.3043 		-50.0721 		0.2719
v -30.3646 		-50.0883 		0.2873
v -30.3662 		-50.0887 		0.2873
v -30.3655 		-50.1099 		0.213
v -30.364 		-50.1121 		0.1122
v -30.475 		-50.1136 		0.1094
v -30.4765 		-50.1114 		0.2102
v -30.5868 		-50.115 		0.108
v -30.6397 		-50.0316 		0.2873
v -30.6729 		-50.0322 		0.2761
v -30.6706 		-50.0963 		0.1066
v -30.6721 		-50.0941 		0.2032
v -30.7001 		-50.034 		0.2032
v -30.6986 		-50.0366 		0.1066
v -30.5893 		-50.0734 		0.2873
v -30.3625 		-49.7927 		0.0099
v -30.494 		-50.0813 		0.2873
v -30.4743 		-49.7942 		0.0099
v -30.5853 		-49.7957 		0.0099
v -30.3617 		-49.8144 		-0.0658
v -30.4727 		-49.8158 		-0.0658
v -30.4727 		-49.8767 		-0.0896
v -30.361 		-49.8752 		-0.091
v -30.2998 		-49.8287 		-0.0462
v -30.6691 		-49.8173 		0.0099
v -30.6676 		-49.8789 		-0.063
v -30.5838 		-49.8785 		-0.0882
v -30.5845 		-49.8177 		-0.0644
v -30.6465 		-49.8338 		-0.0448
v -30.651 		-50.0769 		0.2579
v -30.6971 		-49.8778 		0.0099
v -30.5891 		-50.0912 		0.2803
v -30.5883 		-50.1132 		0.206
# 94 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 5 	4 	6
f 4 	5 	7
f 2 	4 	7
f 11 	13 	8
f 5 	14 	10
f 6 	43 	66
f 5 	1 	14
f 5 	10 	7
f 14 	11 	10
f 11 	14 	13
f 9 	8 	14
f 8 	13 	14
f 14 	1 	9
f 42 	44 	19
f 42 	19 	16
f 11 	8 	18
f 23 	45 	22
f 21 	45 	25
f 79 	25 	24
f 27 	22 	26
f 23 	22 	27
f 21 	28 	29
f 31 	32 	33
f 12 	31 	33
f 46 	30 	12
f 31 	12 	30
f 31 	30 	47
f 22 	47 	30
f 34 	41 	16
f 17 	35 	34
f 33 	34 	35
f 34 	16 	17
f 33 	35 	12
f 35 	24 	12
f 33 	37 	34
f 32 	36 	33
f 41 	34 	37
f 37 	33 	36
f 40 	37 	39
f 36 	39 	37
f 62 	40 	38
f 39 	38 	40
f 32 	47 	36
f 41 	40 	15
f 37 	40 	41
f 15 	42 	41
f 15 	43 	42
f 19 	17 	16
f 17 	19 	85
f 16 	41 	42
f 43 	44 	42
f 44 	43 	3
f 3 	4 	44
f 4 	2 	44
f 43 	6 	4
f 4 	3 	43
f 27 	26 	12
f 26 	46 	12
f 45 	27 	12
f 23 	27 	45
f 12 	24 	45
f 20 	22 	45
f 45 	21 	20
f 24 	25 	45
f 35 	77 	24
f 47 	22 	20
f 21 	25 	28
f 28 	54 	29
f 21 	29 	50
f 46 	26 	30
f 26 	22 	30
f 32 	31 	47
f 49 	36 	47
f 48 	36 	49
f 48 	49 	50
f 49 	47 	20
f 49 	20 	50
f 20 	21 	50
f 71 	70 	53
f 52 	48 	53
f 50 	53 	48
f 51 	53 	50
f 51 	54 	53
f 50 	54 	51
f 50 	29 	54
f 54 	28 	55
f 52 	53 	70
f 48 	52 	36
f 52 	70 	36
f 53 	56 	71
f 86 	57 	55
f 57 	92 	75
f 56 	53 	54
f 56 	55 	57
f 54 	55 	56
f 39 	70 	38
f 58 	59 	78
f 60 	59 	58
f 60 	38 	59
f 38 	61 	62
f 64 	65 	63
f 63 	40 	61
f 40 	62 	61
f 58 	65 	60
f 78 	59 	38
f 64 	63 	60
f 63 	61 	60
f 38 	60 	61
f 40 	63 	65
f 67 	1 	66
f 66 	15 	65
f 65 	58 	68
f 64 	60 	65
f 69 	8 	9
f 69 	72 	8
f 71 	56 	74
f 39 	36 	70
f 56 	57 	74
f 74 	57 	75
f 17 	77 	35
f 76 	93 	78
f 81 	77 	17
f 24 	77 	79
f 79 	80 	25
f 28 	25 	80
f 81 	83 	82
f 81 	84 	83
f 81 	19 	84
f 85 	19 	81
f 19 	44 	84
f 85 	81 	17
f 77 	81 	82
f 79 	77 	82
f 2 	83 	84
f 28 	80 	86
f 55 	28 	86
f 88 	89 	82
f 88 	87 	89
f 87 	90 	89
f 89 	90 	86
f 88 	82 	83
f 86 	90 	87
f 79 	89 	80
f 93 	76 	71
f 70 	71 	76
f 89 	79 	82
f 71 	91 	93
f 86 	80 	89
f 11 	18 	87
f 2 	84 	44
f 83 	7 	88
f 10 	88 	7
f 88 	10 	87
f 11 	87 	10
f 76 	78 	70
f 38 	70 	78
f 7 	83 	2
f 57 	86 	92
f 87 	92 	86
f 18 	75 	92
f 18 	92 	87
f 15 	66 	43
f 58 	78 	93
f 1 	5 	6
f 74 	73 	71
f 9 	1 	67
f 73 	91 	71
f 66 	1 	6
f 93 	91 	73
f 72 	73 	75
f 75 	18 	72
f 74 	75 	73
f 72 	18 	8
f 73 	94 	93
f 94 	69 	68
f 93 	94 	68
f 94 	72 	69
f 73 	72 	94
f 93 	68 	58
f 9 	67 	69
f 68 	69 	67
f 65 	68 	67
f 65 	67 	66
f 40 	65 	15
# 184 faces

#end of obj_0

`;
var stone2 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -32.378 		-49.859 		-0.051
v -32.3747 		-49.8541 		-0.0428
v -32.3638 		-49.8755 		-0.0542
v -32.3787 		-49.8397 		-0.0321
v -32.38 		-49.807 		0
v -32.3724 		-49.8204 		-0.0063
v -32.379 		-49.8338 		-0.0263
v -32.3811 		-49.8358 		-0.0287
v -32.459 		-49.86 		-0.068
v -32.6 		-50.137 		-0.089
v -32.49 		-50.07 		-0.09
v -32.766 		-50.039 		0
v -32.722 		-50.065 		-0.049
v -32.599 		-49.875 		0
v -32.489 		-49.809 		0
v -32.71 		-49.942 		0
v -32.379 		-50.004 		-0.091
v -32.1112 		-50.2893 		-0.069
v -32.1208 		-50.2956 		-0.0716
v -32.1919 		-50.3419 		-0.091
v -32.2269 		-50.2786 		-0.091
v -32.086 		-50.335 		-0.069
v -32.168 		-50.385 		-0.091
v -32.0731 		-50.3459 		-0.048
v -32.0801 		-50.3303 		-0.0526
v -32.197 		-50.3566 		-0.0909
v -32.2505 		-50.3043 		-0.0907
v -32.2172 		-50.415 		-0.0906
v -32.177 		-50.638 		0
v -32.2 		-50.594 		-0.068
v -32.066 		-50.572 		0
v -32.01 		-50.475 		0
v -32.049 		-50.453 		-0.051
v -32.089 		-50.527 		-0.068
v -32.2182 		-50.4675 		-0.0841
v -32.2258 		-50.4727 		-0.0839
v -32.2477 		-50.4871 		-0.0838
v -32.654 		-50.439 		-0.009
v -32.715 		-50.198 		0
v -32.684 		-50.185 		-0.066
v -32.644 		-50.324 		-0.042
v -32.6349 		-50.299 		-0.042
v -32.6282 		-50.3075 		-0.0455
v -32.653 		-50.3102 		0
v -32.586 		-50.505 		-0.043
v -32.5221 		-50.5404 		-0.0066
v -32.5251 		-50.5418 		0
v -32.504 		-50.58 		0
v -32.389 		-50.518 		-0.089
v -32.3576 		-50.4214 		-0.0896
v -32.3348 		-50.3964 		-0.0898
v -32.2781 		-50.4521 		-0.09
v -32.533 		-50.362 		-0.087
v -32.4687 		-50.3839 		-0.0879
v -32.514 		-50.3097 		-0.087
v -32.5301 		-50.3197 		-0.0825
v -32.5751 		-50.3476 		-0.0699
v -32.509 		-50.4107 		-0.0764
v -32.5454 		-50.4352 		-0.066
v -32.571 		-50.3891 		-0.066
v -32.473 		-50.566 		-0.066
v -32.604 		-50.3377 		-0.0582
v -32.5044 		-50.5326 		-0.0441
v -32.2777 		-50.4525 		-0.0899
v -32.31 		-50.66 		-0.067
v -32.098 		-50.076 		-0.092
v -31.947 		-50.156 		0.116
v -31.893 		-50.21 		0.209
v -31.949 		-50.154 		0.209
v -31.9656 		-50.157 		0.186
v -31.89 		-50.212 		0.116
v -31.9657 		-50.1564 		0.2088
v -31.969 		-50.1694 		0.089
v -31.9695 		-50.1699 		0.0878
v -32.238 		-50.461 		-0.092
v -31.908 		-50.225 		0.046
v -31.9865 		-50.0763 		0.585
v -31.977 		-49.976 		0.553
v -31.9947 		-50.203 		0.0426
v -31.964 		-50.258 		0.024
v -32.195 		-50.575 		0.553
v -32.1299 		-50.4824 		0.585
v -32.1371 		-50.4902 		0.585
v -31.892 		-50.571 		0.116
v -31.9903 		-50.1944 		0.0469
v -32.1214 		-50.4634 		0.585
v -32.1266 		-50.4776 		0.585
v -31.9864 		-50.1879 		0.0522
v -31.951 		-50.183 		0.064
v -32.5919 		-50.3199 		0.585
v -32.644 		-50.303 		0.562
v -32.565 		-50.4273 		0.585
v -31.903 		-50.55 		0.048
v -32.654 		-50.421 		0.53
v -31.793 		-50.391 		0.209
v -31.79 		-50.392 		0.116
v -32.586 		-50.485 		0.568
v -32.438 		-50.534 		0.576
v -32.4624 		-50.4839 		0.585
v -32.4274 		-50.5043 		0.585
v -32.2936 		-50.5786 		0.585
v -32.291 		-50.584 		0.584
v -31.808 		-50.405 		0.046
v -31.968 		-50.616 		0.115
v -32.2898 		-50.5808 		0.585
v -32.2638 		-50.5662 		0.585
v -32.0352 		-50.3001 		0.0249
v -32.0377 		-50.3071 		0.025
v -32.04 		-50.624 		0.203
v -32.037 		-50.626 		0.115
v -32.18 		-50.631 		0.271
v -32.037 		-50.3053 		0.025
v -31.9861 		-50.0869 		0.585
v -31.9866 		-50.0926 		0.585
v -32.0773 		-50.5728 		0.0857
v -31.9808 		-50.1931 		0.368
v -31.9757 		-50.1794 		0.3581
v -31.923 		-50.2112 		0.368
v -31.958 		-50.177 		0.353
v -32.046 		-49.91 		0.584
v -32.0472 		-49.9132 		0.585
v -31.9175 		-50.2151 		0.368
v -31.9151 		-50.2176 		0.368
v -31.895 		-50.208 		0.303
v -31.8195 		-50.3896 		0.368
v -31.8137 		-50.4078 		0.368
v -31.795 		-50.389 		0.303
v -31.8151 		-50.3976 		0.368
v -31.8143 		-50.401 		0.368
v -31.9363 		-50.5387 		0.368
v -31.987 		-50.588 		0.36
v -31.911 		-50.544 		0.364
v -31.9176 		-50.532 		0.368
v -31.835 		-50.499 		0.368
v -31.802 		-50.457 		0.353
v -31.776 		-50.467 		0.302
v -31.821 		-50.523 		0.3
v -32.326 		-50.645 		0.245
v -32.028 		-49.878 		0.088
v -32.1868 		-50.6376 		0.0889
v -32.1854 		-50.6369 		0.0872
v -32.176 		-49.829 		0.088
v -32.1769 		-49.8936 		0.585
v -32.193 		-49.861 		0.576
v -32.3593 		-50.6257 		0.2444
v -32.3317 		-50.6348 		0.2466
v -32.4491 		-50.5962 		0.2338
v -32.407 		-50.645 		0.225
v -32.2038 		-49.8903 		0.585
v -32.0363 		-49.9403 		0.585
v -32.451 		-49.778 		0.432
v -32.323 		-49.767 		0.437
v -32.3616 		-49.8675 		0.585
v -32.3099 		-49.8741 		0.585
v -32.341 		-49.811 		0.568
v -32.323 		-49.773 		0.262
v -32.504 		-49.918 		0.562
v -32.436 		-49.822 		0.53
v -32.541 		-49.91 		0.431
v -32.5074 		-50.5757 		0.0744
v -32.5014 		-50.5829 		0.088
v -32.5018 		-50.5824 		0.0871
v -32.4519 		-49.9349 		0.585
v -32.5015 		-50.5827 		0.0926
v -32.505 		-50.5792 		0.1751
v -31.951 		-50.109 		0.455
v -31.935 		-49.952 		0.454
v -31.951 		-50.114 		0.272
v -31.935 		-49.958 		0.271
v -31.951 		-50.152 		0.302
v -31.9689 		-50.1617 		0.322
v -32.397 		-50.706 		0
v -32.393 		-50.659 		-0.049
v -31.966 		-50.1544 		0.3016
v -32.287 		-50.704 		0
v -32.308 		-50.6431 		0.2367
v -32.3171 		-50.6397 		0.2453
v -32.3082 		-50.643 		0.2369
v -31.9659 		-50.1547 		0.2811
v -31.966 		-50.1545 		0.2916
v -32.028 		-49.867 		0.449
v -32.028 		-49.872 		0.269
v -32.5195 		-50.5526 		0.024
v -32.176 		-49.817 		0.443
v -32.405 		-50.697 		0.176
v -32.176 		-49.823 		0.265
v -32.401 		-50.702 		0.088
v -32.296 		-50.696 		0.178
v -32.292 		-50.7 		0.089
v -32.775 		-50.03 		0.176
v -32.771 		-50.034 		0.088
v -32.1761 		-50.6312 		0.089
v -32.176 		-50.631 		0.091
v -32.0527 		-50.3422 		0.0172
v -32.0517 		-50.3462 		0.0257
v -32.1785 		-50.6329 		0.085
v -32.0484 		-50.3567 		0.0258
v -32.1809 		-50.6345 		0.0832
v -32.1807 		-50.6343 		0.0833
v -32.1835 		-50.636 		0.0847
v -32.0547 		-50.3347 		0.0009
v -32.0794 		-50.5736 		0.0919
v -32.1261 		-50.6013 		0.0915
v -32.1869 		-50.6375 		0.0909
v -32.681 		-50.295 		0.431
v -32.681 		-50.301 		0.259
v -32.308 		-50.636 		0.449
v -32.308 		-50.642 		0.269
v -32.456 		-50.593 		0.265
v -32.697 		-50.452 		0.432
v -32.456 		-50.587 		0.443
v -32.603 		-50.537 		0.437
v -31.774 		-50.469 		0.209
v -31.819 		-50.525 		0.208
v -32.696 		-50.458 		0.26
v -31.894 		-50.569 		0.206
v -32.4603 		-49.8003 		0.1847
v -32.4818 		-49.8302 		0.2297
v -32.497 		-49.801 		0.184
v -32.603 		-50.543 		0.262
v -32.505 		-49.8634 		0.2519
v -32.507 		-49.8664 		0.252
v -31.772 		-50.471 		0.116
v -32.323 		-49.779 		0.088
v -31.97 		-50.614 		0.204
v -32.6419 		-50.1936 		0.252
v -32.6524 		-50.2227 		0.246
v -32.6592 		-50.2418 		0.242
v -32.6699 		-50.2728 		0.1904
v -32.6729 		-50.2818 		0.175
v -32.373 		-49.8153 		0.0064
v -32.3814 		-49.8056 		0.0331
v -32.724 		-50.19 		0.175
v -32.451 		-49.79 		0.088
v -32.4609 		-49.8044 		0.0923
v -32.4608 		-49.8032 		0.1209
v -32.493 		-49.805 		0.092
v -32.719 		-50.194 		0.087
v -32.38 		-49.807 		0
v -32.38 		-49.807 		0
v -32.461 		-49.8046 		0.0879
v -31.816 		-50.527 		0.116
v -32.4564 		-49.8051 		0.0748
v -32.4464 		-49.8057 		0.0582
v -32.4095 		-49.8059 		0.0386
v -32.432 		-49.8057 		0.0505
v -32.38 		-49.807 		0
v -32.371 		-49.8177 		0.0001
v -32.046 		-49.93 		-0.047
v -31.988 		-50.112 		-0.048
v -32.246 		-50.027 		-0.089
v -32.193 		-49.881 		-0.045
v -32.564 		-49.9194 		0.252
v -32.585 		-49.911 		0.249
v -31.977 		-49.994 		-0.012
v -32.608 		-49.867 		0.181
v -32.604 		-49.871 		0.091
v -32.341 		-49.832 		-0.043
v -32.541 		-49.9162 		0.252
v -32.6709 		-50.0222 		0.252
v -32.6451 		-49.9975 		0.252
v -32.696 		-49.977 		0.245
v -32.699 		-50.17 		0.242
v -32.6662 		-50.1496 		0.252
v -32.5744 		-49.9304 		0.252
v -32.68 		-49.992 		-0.067
v -32.57 		-49.926 		-0.068
v -32.736 		-50.052 		0.225
v -32.719 		-49.933 		0.178
v -32.714 		-49.937 		0.089
v -32.393 		-49.979 		-0.087
v -32.3935 		-49.9793 		-0.087
v -32.393 		-49.978 		-0.087
v -31.973 		-50.612 		0.293
v -31.897 		-50.567 		0.296
v -31.94 		-50.483 		0.025
v -32.0111 		-50.4736 		0.0263
v -31.979 		-50.594 		0.049
v -32.016 		-50.527 		0.027
v -32.0288 		-50.504 		0.027
v -32.0566 		-50.5505 		0.0427
v -32.0456 		-50.532 		0.0365
v -32.0682 		-50.5689 		0.0579
v -32.0686 		-50.5694 		0.0599
v -32.0664 		-50.5665 		0.0517
v -32.031 		-50.601 		0.066
v -32.0643 		-50.5632 		0.049
v -31.935 		-49.963 		0.089
v -31.951 		-50.12 		0.089
v -32.1954 		-50.6353 		0.1807
v -32.171 		-50.6206 		0.1814
v -32.0913 		-50.5728 		0.1836
v -31.9654 		-50.1587 		0.116
v -32.0244 		-50.3128 		0.368
v -31.827 		-50.506 		0.047
v -32.091 		-50.493 		0.455
v -32.18 		-50.625 		0.454
v -31.864 		-50.439 		0.024
v -31.795 		-50.463 		0.064
v -32.091 		-50.496 		0.3643
v -32.0867 		-50.4839 		0.368
v -32.1028 		-50.5137 		0.357
v -32.0564 		-50.5385 		0.368
v -32.081 		-50.553 		0.357
v -32.0008 		-50.5633 		0.368
v -32.042 		-50.623 		0.291
v -32.099 		-50.566 		0.29
v -32.038 		-50.595 		0.341
v -32.116 		-50.5354 		0.29
v -32.681 		-50.307 		0.087
v -32.6716 		-50.2804 		0.1072
v -32.6713 		-50.2802 		0.087
v -32.658 		-50.3018 		0.024
v -32.3267 		-50.6364 		0.2461
v -32.603 		-50.549 		0.088
v -32.696 		-50.464 		0.088
v -32.4652 		-50.5911 		0.2239
v -32.456 		-50.594 		0.2295
v -32.3929 		-49.979 		-0.087
v -32.3934 		-49.978 		-0.0869
v -32.18 		-50.637 		0.089
v -32.3656 		-49.9957 		-0.0874
v -32.3903 		-49.9703 		-0.0847
v -32.3477 		-49.9239 		-0.0687
v -32.1948 		-50.6355 		0.1726
v -32.3935 		-49.9778 		-0.0868
v -32.3652 		-49.9001 		-0.0635
v -32.1758 		-50.6305 		0.0956
v -32.0875 		-50.5764 		0.115
v -32.0881 		-50.5759 		0.1246
v -32.2897 		-50.1472 		-0.089
v -32.3387 		-50.0495 		-0.088
v -32.0906 		-50.5734 		0.1703
v -32.3723 		-49.82 		-0.0057
v -32.1472 		-50.5846 		0.204
v -32.1377 		-50.5702 		0.2131
v -32.096 		-50.568 		0.203
v -32.0957 		-50.5683 		0.1907
v -32.1148 		-50.5355 		0.2359
v -32.1009 		-50.5592 		0.203
v -32.0995 		-50.5615 		0.1998
v -32.0973 		-50.5655 		0.1943
v -32.2308 		-50.6378 		0.1983
# 343 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 1 	2 	3
f 1 	4 	2
f 6 	7 	5
f 8 	4 	9
f 7 	8 	5
f 1 	9 	4
f 9 	5 	8
f 19 	66 	18
f 20 	66 	19
f 20 	19 	23
f 22 	23 	19
f 23 	26 	20
f 18 	22 	19
f 24 	25 	250
f 24 	32 	22
f 24 	22 	25
f 25 	18 	250
f 18 	25 	22
f 34 	23 	22
f 26 	28 	75
f 23 	28 	26
f 29 	30 	31
f 33 	22 	32
f 33 	34 	22
f 34 	31 	30
f 34 	32 	31
f 33 	32 	34
f 35 	75 	28
f 37 	75 	36
f 36 	34 	30
f 37 	36 	30
f 64 	37 	30
f 36 	35 	34
f 23 	34 	28
f 35 	28 	34
f 42 	43 	41
f 41 	310 	44
f 41 	44 	42
f 53 	59 	45
f 41 	62 	45
f 45 	60 	53
f 45 	38 	41
f 46 	47 	45
f 40 	42 	39
f 40 	43 	42
f 44 	39 	42
f 47 	46 	48
f 10 	49 	54
f 54 	55 	10
f 75 	50 	51
f 75 	51 	27
f 50 	75 	52
f 49 	10 	50
f 51 	50 	10
f 52 	49 	50
f 10 	11 	51
f 27 	51 	11
f 54 	53 	55
f 56 	53 	57
f 58 	59 	53
f 54 	58 	53
f 57 	53 	60
f 56 	55 	53
f 57 	40 	56
f 60 	40 	57
f 10 	56 	40
f 49 	61 	58
f 58 	61 	59
f 54 	49 	58
f 10 	55 	56
f 12 	13 	40
f 43 	62 	41
f 63 	45 	59
f 45 	63 	46
f 60 	45 	62
f 46 	63 	48
f 43 	40 	62
f 60 	62 	40
f 61 	48 	63
f 61 	63 	59
f 11 	21 	27
f 52 	75 	64
f 69 	70 	72
f 66 	20 	75
f 20 	26 	75
f 67 	74 	73
f 35 	36 	75
f 75 	27 	21
f 331 	66 	21
f 75 	21 	66
f 75 	37 	64
f 96 	76 	71
f 85 	79 	250
f 79 	85 	76
f 79 	76 	80
f 83 	82 	100
f 82 	87 	100
f 86 	100 	87
f 99 	100 	163
f 85 	88 	76
f 89 	76 	88
f 76 	89 	67
f 90 	91 	92
f 96 	71 	95
f 98 	99 	97
f 97 	99 	92
f 91 	97 	92
f 68 	95 	71
f 99 	90 	92
f 100 	99 	98
f 101 	100 	98
f 101 	98 	102
f 76 	96 	103
f 103 	80 	76
f 103 	298 	80
f 106 	83 	100
f 101 	106 	100
f 105 	101 	102
f 223 	103 	96
f 102 	106 	105
f 102 	81 	106
f 98 	97 	211
f 97 	91 	94
f 86 	163 	100
f 105 	106 	101
f 112 	201 	107
f 104 	110 	278
f 278 	84 	104
f 80 	298 	107
f 112 	108 	201
f 112 	107 	298
f 114 	166 	113
f 113 	167 	77
f 111 	207 	208
f 113 	143 	114
f 200 	175 	29
f 119 	117 	118
f 116 	118 	117
f 122 	123 	124
f 122 	170 	118
f 123 	125 	124
f 125 	128 	127
f 125 	127 	124
f 128 	129 	127
f 127 	95 	68
f 127 	68 	124
f 125 	123 	294
f 123 	122 	294
f 122 	118 	294
f 116 	294 	118
f 125 	294 	128
f 130 	131 	132
f 133 	130 	132
f 134 	133 	132
f 126 	294 	134
f 126 	134 	135
f 127 	129 	136
f 135 	136 	126
f 129 	126 	136
f 136 	134 	137
f 135 	134 	136
f 95 	127 	136
f 88 	74 	89
f 67 	89 	74
f 149 	143 	144
f 143 	121 	120
f 143 	120 	144
f 145 	138 	146
f 145 	147 	148
f 148 	138 	145
f 77 	150 	143
f 149 	86 	143
f 155 	154 	144
f 121 	150 	120
f 150 	77 	78
f 78 	120 	150
f 78 	167 	120
f 154 	86 	149
f 121 	143 	150
f 77 	143 	113
f 153 	154 	155
f 149 	144 	154
f 152 	156 	151
f 155 	157 	153
f 155 	158 	157
f 158 	151 	157
f 155 	151 	158
f 152 	151 	155
f 162 	315 	160
f 159 	157 	151
f 154 	153 	86
f 163 	86 	153
f 165 	315 	164
f 315 	162 	161
f 157 	91 	90
f 90 	163 	157
f 163 	153 	157
f 91 	157 	159
f 114 	143 	86
f 90 	99 	163
f 152 	155 	184
f 185 	165 	164
f 155 	144 	184
f 156 	152 	184
f 167 	113 	166
f 78 	77 	167
f 166 	169 	167
f 49 	30 	65
f 166 	168 	169
f 30 	29 	65
f 124 	170 	122
f 48 	187 	160
f 160 	315 	183
f 30 	49 	64
f 117 	166 	116
f 61 	65 	173
f 45 	47 	183
f 160 	183 	48
f 170 	119 	118
f 161 	187 	164
f 117 	171 	166
f 171 	174 	166
f 180 	168 	174
f 61 	172 	48
f 117 	119 	171
f 61 	173 	172
f 170 	171 	119
f 162 	187 	161
f 166 	174 	168
f 65 	61 	49
f 179 	72 	168
f 52 	64 	49
f 171 	170 	174
f 168 	180 	179
f 68 	69 	124
f 175 	172 	65
f 172 	173 	65
f 65 	29 	175
f 176 	208 	178
f 72 	179 	69
f 170 	69 	179
f 138 	188 	178
f 178 	177 	138
f 180 	174 	170
f 179 	180 	170
f 181 	120 	167
f 169 	182 	167
f 167 	182 	181
f 139 	182 	169
f 47 	48 	183
f 184 	144 	181
f 184 	181 	186
f 185 	138 	148
f 48 	172 	187
f 156 	184 	186
f 162 	160 	187
f 185 	164 	187
f 182 	186 	181
f 139 	142 	182
f 182 	142 	186
f 144 	120 	181
f 188 	138 	185
f 325 	188 	189
f 178 	188 	176
f 188 	187 	189
f 224 	156 	186
f 175 	189 	172
f 188 	185 	187
f 189 	187 	172
f 74 	88 	250
f 194 	201 	108
f 298 	108 	112
f 250 	107 	201
f 108 	276 	197
f 175 	141 	140
f 108 	195 	194
f 195 	108 	197
f 194 	195 	197
f 24 	250 	201
f 197 	277 	32
f 201 	194 	32
f 197 	32 	194
f 29 	198 	200
f 199 	198 	29
f 175 	200 	141
f 32 	24 	201
f 80 	107 	79
f 192 	196 	203
f 79 	107 	250
f 196 	29 	203
f 199 	29 	196
f 115 	203 	29
f 193 	192 	203
f 208 	176 	111
f 203 	115 	202
f 204 	189 	140
f 175 	140 	189
f 210 	91 	205
f 94 	91 	210
f 91 	159 	205
f 226 	227 	205
f 159 	226 	205
f 207 	209 	208
f 98 	211 	207
f 211 	212 	220
f 97 	212 	211
f 96 	95 	213
f 136 	213 	95
f 98 	207 	102
f 210 	97 	94
f 216 	214 	137
f 210 	206 	215
f 225 	216 	275
f 218 	151 	217
f 210 	212 	97
f 219 	218 	217
f 220 	209 	211
f 236 	217 	234
f 151 	156 	234
f 220 	215 	316
f 221 	159 	151
f 221 	222 	159
f 213 	223 	96
f 209 	207 	211
f 221 	254 	222
f 215 	212 	210
f 218 	221 	151
f 213 	242 	223
f 254 	221 	219
f 218 	219 	221
f 220 	212 	215
f 206 	210 	205
f 227 	228 	205
f 206 	205 	228
f 264 	263 	226
f 224 	186 	142
f 109 	110 	225
f 225 	104 	216
f 216 	104 	84
f 206 	228 	229
f 206 	229 	230
f 206 	230 	310
f 216 	84 	214
f 231 	232 	224
f 104 	225 	110
f 5 	232 	231
f 229 	233 	230
f 234 	241 	235
f 234 	235 	236
f 151 	234 	217
f 234 	156 	224
f 263 	233 	228
f 228 	233 	229
f 316 	215 	310
f 232 	245 	224
f 224 	245 	234
f 245 	246 	234
f 217 	236 	219
f 237 	219 	236
f 236 	235 	237
f 231 	240 	5
f 239 	5 	240
f 243 	241 	234
f 316 	310 	41
f 234 	244 	243
f 313 	312 	39
f 213 	214 	242
f 244 	234 	246
f 232 	5 	245
f 15 	245 	5
f 245 	15 	246
f 237 	243 	15
f 247 	239 	240
f 241 	243 	237
f 235 	241 	237
f 243 	244 	15
f 244 	246 	15
f 231 	224 	248
f 240 	231 	248
f 239 	247 	5
f 237 	257 	219
f 88 	85 	250
f 248 	247 	240
f 249 	251 	252
f 222 	254 	253
f 66 	251 	249
f 222 	259 	159
f 66 	249 	250
f 249 	255 	250
f 250 	18 	66
f 254 	256 	262
f 256 	219 	257
f 257 	270 	256
f 139 	249 	252
f 237 	15 	14
f 237 	14 	257
f 219 	256 	254
f 14 	16 	257
f 222 	253 	259
f 15 	5 	9
f 260 	261 	262
f 324 	327 	252
f 227 	226 	263
f 224 	142 	258
f 253 	254 	265
f 258 	142 	252
f 265 	259 	253
f 262 	261 	254
f 265 	254 	261
f 12 	40 	39
f 264 	260 	263
f 262 	263 	260
f 10 	266 	267
f 262 	268 	263
f 263 	228 	227
f 190 	263 	268
f 262 	190 	268
f 10 	267 	11
f 10 	40 	266
f 40 	13 	266
f 262 	256 	269
f 14 	15 	267
f 266 	16 	14
f 266 	12 	16
f 267 	266 	14
f 271 	272 	273
f 270 	269 	256
f 12 	39 	238
f 191 	12 	238
f 270 	191 	190
f 16 	270 	257
f 16 	12 	270
f 213 	136 	137
f 213 	137 	214
f 137 	134 	132
f 275 	131 	274
f 132 	275 	137
f 131 	275 	132
f 108 	298 	276
f 277 	197 	276
f 93 	84 	278
f 279 	276 	93
f 329 	110 	330
f 109 	330 	110
f 277 	276 	280
f 280 	276 	279
f 279 	281 	282
f 279 	282 	280
f 283 	110 	284
f 110 	283 	286
f 285 	286 	283
f 93 	278 	279
f 281 	278 	287
f 279 	278 	281
f 287 	278 	286
f 287 	286 	285
f 110 	286 	278
f 281 	287 	31
f 281 	31 	282
f 284 	31 	283
f 139 	252 	142
f 283 	31 	285
f 285 	31 	287
f 139 	169 	288
f 109 	333 	330
f 329 	202 	110
f 284 	110 	115
f 139 	288 	249
f 31 	284 	29
f 169 	168 	288
f 115 	29 	284
f 168 	289 	288
f 32 	280 	31
f 288 	289 	250
f 277 	280 	32
f 250 	255 	288
f 280 	282 	31
f 255 	249 	288
f 321 	291 	111
f 72 	70 	168
f 290 	325 	111
f 291 	335 	111
f 71 	67 	68
f 216 	137 	275
f 73 	74 	289
f 76 	67 	71
f 225 	275 	274
f 67 	69 	68
f 73 	289 	293
f 70 	293 	289
f 289 	168 	70
f 274 	109 	225
f 133 	134 	294
f 129 	294 	126
f 166 	86 	296
f 67 	293 	70
f 67 	70 	69
f 294 	166 	296
f 250 	289 	74
f 73 	293 	67
f 116 	166 	294
f 129 	128 	294
f 84 	242 	214
f 301 	130 	294
f 242 	93 	295
f 223 	242 	295
f 93 	276 	295
f 298 	295 	276
f 297 	296 	82
f 87 	82 	296
f 81 	297 	83
f 82 	83 	297
f 297 	102 	207
f 299 	103 	223
f 81 	102 	297
f 299 	295 	103
f 295 	298 	103
f 111 	309 	297
f 302 	296 	297
f 297 	207 	111
f 301 	294 	296
f 296 	300 	301
f 296 	302 	300
f 303 	301 	300
f 300 	302 	303
f 302 	304 	303
f 130 	305 	131
f 131 	305 	304
f 335 	336 	111
f 306 	304 	307
f 306 	308 	304
f 302 	297 	309
f 302 	309 	304
f 307 	304 	309
f 305 	303 	304
f 131 	304 	308
f 308 	306 	131
f 306 	274 	131
f 274 	306 	109
f 339 	307 	309
f 299 	223 	295
f 310 	230 	311
f 312 	310 	311
f 44 	310 	313
f 312 	313 	310
f 93 	242 	84
f 238 	312 	311
f 238 	39 	312
f 313 	39 	44
f 233 	238 	311
f 233 	311 	230
f 208 	209 	145
f 208 	146 	314
f 177 	208 	314
f 177 	178 	208
f 177 	314 	138
f 146 	138 	314
f 206 	310 	215
f 318 	147 	209
f 315 	209 	220
f 317 	318 	209
f 165 	317 	209
f 315 	165 	209
f 220 	316 	315
f 316 	45 	315
f 185 	317 	165
f 147 	318 	148
f 185 	148 	318
f 185 	318 	317
f 161 	164 	315
f 45 	183 	315
f 41 	38 	316
f 270 	12 	191
f 270 	190 	269
f 190 	262 	269
f 188 	290 	343
f 233 	191 	238
f 263 	190 	233
f 273 	319 	271
f 190 	191 	233
f 259 	226 	159
f 273 	272 	320
f 273 	320 	326
f 226 	265 	264
f 260 	264 	261
f 9 	11 	267
f 259 	265 	226
f 261 	264 	265
f 86 	166 	114
f 15 	9 	267
f 13 	12 	266
f 83 	106 	81
f 87 	296 	86
f 11 	272 	17
f 272 	271 	17
f 319 	17 	271
f 320 	272 	11
f 290 	188 	325
f 9 	320 	11
f 192 	193 	321
f 321 	196 	192
f 319 	273 	322
f 273 	251 	322
f 251 	273 	252
f 324 	252 	323
f 273 	323 	252
f 204 	321 	325
f 321 	111 	325
f 273 	326 	323
f 198 	199 	321
f 196 	321 	199
f 319 	322 	17
f 323 	326 	9
f 9 	324 	323
f 292 	333 	109
f 9 	326 	320
f 258 	252 	327
f 3 	2 	258
f 327 	3 	258
f 193 	328 	321
f 291 	321 	328
f 3 	9 	1
f 9 	327 	324
f 327 	9 	3
f 251 	66 	331
f 332 	251 	331
f 322 	251 	332
f 21 	17 	331
f 332 	331 	17
f 17 	21 	11
f 115 	110 	202
f 322 	332 	17
f 333 	291 	328
f 334 	248 	258
f 224 	258 	248
f 291 	333 	292
f 7 	6 	258
f 258 	6 	334
f 193 	203 	328
f 248 	334 	247
f 334 	6 	247
f 333 	203 	330
f 329 	330 	203
f 5 	247 	6
f 333 	328 	203
f 8 	258 	4
f 258 	2 	4
f 8 	7 	258
f 133 	294 	130
f 305 	130 	303
f 303 	130 	301
f 329 	203 	202
f 290 	111 	343
f 170 	124 	69
f 316 	38 	45
f 146 	208 	145
f 147 	145 	209
f 336 	339 	111
f 306 	307 	337
f 292 	109 	338
f 337 	338 	109
f 342 	338 	337
f 306 	337 	109
f 309 	111 	339
f 340 	341 	337
f 337 	341 	342
f 337 	307 	340
f 340 	307 	339
f 343 	176 	188
f 338 	335 	292
f 342 	335 	338
f 291 	292 	335
f 336 	335 	342
f 176 	343 	111
f 342 	341 	336
f 340 	336 	341
f 339 	336 	340
f 140 	321 	204
f 140 	141 	321
f 321 	200 	198
f 325 	189 	204
f 141 	200 	321
# 682 faces

#end of obj_0

`;
var stone3 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -33.7916 		-50.2099 		-0.0801
v -33.7493 		-50.3109 		-0.0473
v -33.674 		-50.374 		-0.027
v -34.375 		-50.013 		-0.089
v -34.113 		-49.518 		-0.065
v -34.1279 		-49.5 		-0.038
v -34.0561 		-49.4473 		-0.0227
v -34.135 		-49.5108 		-0.0413
v -33.99 		-49.641 		-0.089
v -33.845 		-49.5 		-0.065
v -33.9041 		-49.6183 		-0.0801
v -33.973 		-49.445 		-0.047
v -34.135 		-49.449 		-0.022
v -33.904 		-49.646 		-0.089
v -33.8767 		-49.4434 		-0.0244
v -33.8451 		-49.593 		-0.0731
v -33.825 		-49.4796 		-0.0371
v -33.8026 		-49.522 		-0.0511
v -34.0184 		-49.6485 		-0.087
v -33.9691 		-49.6474 		-0.0879
v -33.904 		-49.72 		-0.089
v -34.211 		-50.175 		-0.09
v -34.135 		-49.7408 		-0.085
v -34.135 		-49.651 		-0.085
v -34.1666 		-49.6516 		-0.0731
v -34.1903 		-49.664 		-0.0721
v -34.1022 		-49.6215 		-0.0763
v -34.135 		-49.6091 		-0.0719
v -33.9596 		-49.6432 		-0.0867
v -34.3063 		-49.6482 		-0.0181
v -34.2996 		-49.6441 		-0.0201
v -33.8285 		-49.8005 		-0.09
v -33.8268 		-49.8049 		-0.09
v -33.8273 		-49.8043 		-0.09
v -33.7936 		-50.3766 		-0.0254
v -34.047 		-50.337 		-0.092
v -34.354 		-50.312 		-0.066
v -33.8589 		-50.1798 		-0.0896
v -34.065 		-50.591 		0.005
v -33.923 		-50.457 		-0.068
v -33.699 		-49.9875 		0.889
v -33.7036 		-50.0355 		0.889
v -34.19 		-50.474 		-0.067
v -33.708 		-50.0815 		0.889
v -33.7721 		-50.1244 		0.889
v -33.7417 		-50.104 		0.889
v -34.061 		-50.527 		-0.049
v -34.0966 		-49.7216 		0.889
v -33.8145 		-50.1322 		0.889
v -33.766 		-49.74 		1.058
v -34.0302 		-50.1402 		0.889
v -33.79 		-49.686 		1.034
v -33.7625 		-49.7456 		1.058
v -33.7611 		-49.7489 		1.058
v -33.8641 		-50.1413 		0.889
v -33.9041 		-50.1487 		0.889
v -33.9562 		-50.1583 		0.889
v -33.9866 		-50.1508 		0.889
v -33.7231 		-49.9879 		1.058
v -33.725 		-49.9981 		1.058
v -33.779 		-50.091 		1.058
v -33.731 		-50.059 		1.034
v -34.0672 		-50.0552 		0.889
v -33.7234 		-49.9915 		1.058
v -34.0819 		-49.9628 		0.889
v -33.8348 		-49.4313 		0.005
v -33.845 		-49.672 		1.058
v -33.8466 		-49.424 		0.0254
v -33.9189 		-49.7013 		1.058
v -34.0141 		-49.3916 		0.1226
v -34.0298 		-49.4017 		0.0966
v -33.9065 		-49.3883 		0.1245
v -33.866 		-49.4121 		0.0585
v -34.0246 		-49.7394 		1.058
v -33.9955 		-49.7287 		1.058
v -34.0873 		-49.4379 		0.0043
v -34.03 		-49.705 		1.045
v -34.0701 		-49.4271 		0.0321
v -33.937 		-49.689 		1.051
v -33.9244 		-49.3779 		0.1535
v -33.9343 		-49.7073 		1.058
v -33.7939 		-50.4063 		0.0701
v -34.344 		-50.287 		0.266
v -34.0526 		-49.802 		1.058
v -34.084 		-49.808 		1.04
v -33.8741 		-50.0893 		1.058
v -33.871 		-50.108 		1.051
v -33.8978 		-50.0895 		1.058
v -34.046 		-50.047 		1.04
v -34.0146 		-50.041 		1.058
v -33.9687 		-50.0896 		1.058
v -33.963 		-50.124 		1.045
v -34.314 		-50.376 		0.417
v -34.372 		-50.177 		0.416
v -34.34 		-50.2831 		0.2667
v -34.3463 		-50.2612 		0.2676
v -34.3369 		-50.2941 		0.2662
v -34.3328 		-50.3081 		0.2593
v -34.3641 		-50.2002 		0.27
v -34.3697 		-50.1811 		0.27
v -34.3117 		-50.3814 		0.2237
v -33.775 		-49.661 		0.957
v -33.684 		-49.423 		0.889
v -33.6263 		-49.4797 		0.889
v -33.684 		-49.414 		0.886
v -33.5161 		-49.5945 		0.889
v -33.556 		-49.465 		0.842
v -33.5109 		-49.6051 		0.889
v -33.5092 		-49.6111 		0.889
v -33.452 		-49.615 		0.7
v -33.509 		-49.415 		0.697
v -33.682 		-49.352 		0.691
v -33.774 		-49.6625 		0.889
v -33.91 		-50.434 		0.425
v -34.141 		-50.439 		0.421
v -34.2024 		-50.4202 		0.27
v -34.2144 		-50.4158 		0.2692
v -34.077 		-49.739 		1.016
v -34.1392 		-50.4432 		0.27
v -34.2563 		-50.401 		0.2495
v -34.018 		-50.111 		1.016
v -34.2898 		-50.3892 		0.2337
v -34.0475 		-50.4412 		0.27
v -34.319 		-50.163 		0.854
v -33.5161 		-50.1621 		0.889
v -33.5109 		-50.1512 		0.889
v -33.5092 		-50.1451 		0.889
v -34.375 		-50.169 		0.664
v -33.737 		-49.7485 		0.889
v -33.7553 		-49.7061 		0.889
v -33.96 		-49.359 		0.189
v -33.963 		-49.366 		0.097
v -33.966 		-49.373 		0.005
v -33.449 		-49.622 		0.434
v -33.506 		-49.422 		0.433
v -33.679 		-49.36 		0.43
v -33.907 		-49.372 		0.168
v -33.446 		-49.628 		0.169
v -33.677 		-49.366 		0.169
v -33.504 		-49.429 		0.169
v -33.91 		-49.365 		0.425
v -33.9745 		-49.3727 		0.196
v -33.9608 		-49.3723 		0.2
v -33.547 		-49.486 		0.023
v -33.9459 		-49.372 		0.1971
v -33.9305 		-49.3719 		0.1893
v -33.9326 		-49.3724 		0.1741
v -33.9867 		-49.3732 		0.1889
v -33.4468 		-49.8632 		0.2351
v -33.9854 		-49.3737 		0.168
v -33.4463 		-49.7919 		0.1984
v -33.446 		-49.7968 		0.169
v -33.9334 		-49.3726 		0.168
v -33.4464 		-50.0325 		0.2006
v -33.386 		-49.927 		0.2
v -33.4467 		-49.9843 		0.2312
v -33.4469 		-49.9279 		0.2484
v -33.446 		-50.0324 		0.169
v -34.138 		-49.377 		0.168
v -33.389 		-49.934 		0.103
v -33.392 		-49.941 		0.005
v -33.449 		-50.156 		0.434
v -33.446 		-50.163 		0.169
v -33.464 		-49.766 		0.101
v -33.4639 		-49.7657 		0.1046
v -33.467 		-49.773 		0.005
v -33.4649 		-49.7651 		0.101
v -33.4916 		-49.7487 		0.005
v -33.4651 		-49.765 		0.1004
v -33.4482 		-50.0364 		0.161
v -33.4916 		-50.115 		0.005
v -33.6971 		-50.3378 		0.889
v -33.684 		-50.349 		0.886
v -33.684 		-50.3398 		0.889
v -33.6263 		-50.281 		0.889
v -33.556 		-50.296 		0.842
v -33.509 		-50.351 		0.697
v -33.849 		-49.644 		0.954
v -34.4313 		-49.9173 		0.27
v -34.486 		-49.864 		0.258
v -34.311 		-49.448 		0.168
v -34.264 		-49.503 		0.028
v -34.4536 		-50.0721 		0.27
v -34.508 		-50.125 		0.261
v -33.941 		-49.661 		0.949
v -34.53 		-49.829 		0.188
v -34.633 		-50.008 		0.189
v -34.562 		-50 		0.241
v -34.3697 		-49.8577 		0.27
v -34.3695 		-49.7514 		0.258
v -34.533 		-49.836 		0.096
v -34.536 		-49.843 		0.004
v -34.639 		-50.023 		0.005
v -34.636 		-50.016 		0.097
v -33.9152 		-49.4625 		0.889
v -33.8732 		-49.4543 		0.889
v -33.915 		-49.419 		0.875
v -33.8097 		-49.6542 		0.889
v -33.8481 		-49.6454 		0.889
v -33.9401 		-49.6623 		0.889
v -33.8905 		-49.6532 		0.889
v -34.1464 		-49.5061 		0.889
v -34.0673 		-49.4904 		0.889
v -34.146 		-49.424 		0.863
v -34.2354 		-49.6256 		0.889
v -34.274 		-49.48 		0.808
v -33.913 		-49.358 		0.682
v -34.144 		-49.363 		0.673
v -34.319 		-49.628 		0.854
v -34.317 		-49.433 		0.667
v -34.375 		-49.635 		0.664
v -34.097 		-49.72 		0.941
v -34.033 		-49.678 		0.945
v -34.106 		-49.814 		0.94
v -34.564 		-50.191 		0.005
v -34.4 		-50.353 		0.005
v -34.558 		-50.177 		0.191
v -34.031 		-50.139 		0.941
v -34.561 		-50.184 		0.098
v -34.397 		-50.346 		0.1
v -33.957 		-50.157 		0.945
v -33.865 		-50.14 		0.949
v -34.394 		-50.339 		0.195
v -34.3691 		-49.7244 		0.234
v -34.3683 		-49.6728 		0.188
v -34.368 		-49.6736 		0.167
v -34.068 		-50.054 		0.94
v -34.2354 		-50.1601 		0.889
v -34.3617 		-49.6687 		0.1475
v -33.9787 		-50.2999 		0.889
v -34.1464 		-50.2756 		0.889
v -34.146 		-50.359 		0.863
v -33.915 		-50.354 		0.875
v -33.9801 		-49.6697 		0.889
v -33.9152 		-50.3098 		0.889
v -34.0322 		-49.6793 		0.889
v -34.0706 		-49.7044 		0.889
v -34.1052 		-49.8155 		0.889
v -34.1021 		-49.779 		0.889
v -33.7 		-49.986 		0.959
v -33.738 		-49.747 		0.959
v -34.497 		-49.889 		-0.065
v -34.518 		-50.15 		-0.065
v -33.709 		-50.08 		0.957
v -34.571 		-50.022 		-0.047
v -33.773 		-50.123 		0.954
v -33.452 		-50.149 		0.7
v -33.874 		-50.478 		0.201
v -33.877 		-50.485 		0.103
v -33.88 		-50.492 		0.005
v -34.052 		-50.506 		0.254
v -34.059 		-50.577 		0.2
v -34.23 		-50.502 		0.198
v -34.062 		-50.584 		0.103
v -34.236 		-50.516 		0.005
v -34.233 		-50.509 		0.101
v -34.317 		-50.369 		0.667
v -34.274 		-50.312 		0.808
v -33.913 		-50.426 		0.682
v -34.144 		-50.431 		0.673
v -33.8322 		-50.439 		0.1683
v -34.18 		-50.45 		0.27
v -33.9349 		-50.4445 		0.27
v -33.919 		-50.4389 		0.27
v -33.8327 		-50.4382 		0.201
v -33.8591 		-50.4383 		0.2231
v -33.9081 		-50.4384 		0.2642
v -33.9083 		-50.4384 		0.2644
v -33.9181 		-50.4384 		0.27
v -34.141 		-49.37 		0.421
v -34.372 		-49.642 		0.416
v -34.314 		-49.44 		0.417
v -34.368 		-49.649 		0.167
v -34.3406 		-49.6513 		0.0818
v -34.3084 		-49.6236 		0.0078
v -34.3051 		-49.6205 		0.004
v -33.682 		-50.421 		0.691
v -33.506 		-50.358 		0.433
v -33.504 		-50.365 		0.169
v -33.677 		-50.435 		0.169
v -33.679 		-50.428 		0.43
v -33.7696 		-50.3856 		0.005
v -33.674 		-49.439 		-0.027
v -33.463 		-49.949 		-0.049
v -33.501 		-50.0794 		-0.029
v -33.501 		-49.7874 		-0.029
v -33.494 		-49.7591 		-0.004
v -33.501 		-49.635 		-0.029
v -33.547 		-50.318 		0.023
v -33.501 		-50.169 		-0.029
v -33.7797 		-49.5649 		-0.0654
v -33.7908 		-49.5441 		-0.0585
v -33.674 		-49.641 		-0.092
v -33.517 		-49.825 		-0.067
v -33.539 		-50.086 		-0.068
v -33.6081 		-50.1528 		-0.068
v -33.5825 		-50.1378 		-0.0587
v -33.5196 		-50.1015 		-0.0358
v -33.6039 		-49.7392 		-0.0665
v -33.628 		-49.8171 		-0.0753
v -33.662 		-49.966 		-0.092
v -33.6736 		-49.9545 		-0.0919
v -33.6716 		-49.984 		-0.0911
v -33.674 		-49.9776 		-0.092
v -33.674 		-50.175 		-0.092
v -33.7856 		-50.3796 		-0.0152
v -33.7067 		-50.248 		-0.068
# 307 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 6 	7 	5
f 5 	8 	6
f 27 	28 	5
f 9 	19 	5
f 11 	29 	10
f 5 	10 	9
f 12 	10 	5
f 7 	6 	13
f 8 	13 	6
f 15 	10 	133
f 133 	66 	15
f 11 	10 	16
f 10 	17 	18
f 18 	292 	10
f 17 	10 	15
f 11 	16 	14
f 283 	18 	17
f 17 	15 	283
f 27 	5 	19
f 21 	9 	20
f 4 	9 	22
f 19 	9 	23
f 9 	4 	23
f 14 	21 	20
f 23 	24 	19
f 26 	25 	23
f 26 	23 	4
f 4 	242 	26
f 23 	25 	24
f 9 	10 	29
f 9 	29 	20
f 24 	28 	27
f 31 	8 	5
f 242 	192 	5
f 13 	8 	31
f 31 	182 	13
f 24 	27 	19
f 11 	14 	29
f 20 	29 	14
f 5 	192 	31
f 192 	30 	31
f 5 	28 	26
f 25 	26 	28
f 242 	5 	26
f 24 	25 	28
f 31 	30 	182
f 15 	66 	283
f 9 	32 	22
f 21 	32 	9
f 22 	34 	33
f 34 	22 	32
f 21 	14 	293
f 32 	21 	293
f 34 	32 	293
f 33 	34 	293
f 250 	40 	35
f 2 	3 	35
f 36 	22 	33
f 4 	22 	37
f 2 	35 	40
f 255 	37 	43
f 43 	37 	22
f 36 	38 	40
f 1 	40 	38
f 39 	47 	40
f 40 	47 	43
f 43 	36 	40
f 39 	43 	47
f 230 	235 	57
f 22 	36 	43
f 56 	57 	235
f 230 	57 	58
f 58 	51 	230
f 54 	53 	69
f 50 	69 	53
f 60 	61 	62
f 59 	64 	240
f 63 	65 	228
f 76 	133 	7
f 64 	84 	60
f 81 	59 	69
f 68 	139 	66
f 52 	67 	50
f 69 	67 	79
f 70 	71 	159
f 67 	69 	50
f 74 	75 	77
f 132 	133 	71
f 72 	73 	132
f 79 	81 	69
f 75 	81 	79
f 75 	79 	77
f 54 	69 	59
f 81 	75 	59
f 74 	59 	75
f 90 	88 	84
f 74 	84 	59
f 95 	96 	83
f 84 	74 	85
f 77 	85 	74
f 77 	118 	85
f 61 	86 	87
f 61 	60 	86
f 86 	88 	87
f 88 	92 	87
f 253 	101 	223
f 59 	84 	64
f 89 	90 	85
f 88 	91 	92
f 89 	92 	91
f 89 	91 	90
f 89 	121 	92
f 83 	97 	95
f 83 	223 	98
f 83 	98 	97
f 88 	86 	84
f 91 	88 	90
f 86 	60 	84
f 84 	85 	90
f 101 	98 	223
f 93 	94 	96
f 85 	214 	89
f 100 	99 	94
f 99 	96 	94
f 103 	104 	105
f 104 	106 	107
f 104 	107 	105
f 108 	109 	110
f 108 	110 	111
f 111 	107 	106
f 111 	106 	108
f 111 	105 	107
f 111 	112 	105
f 110 	135 	111
f 111 	136 	112
f 96 	95 	93
f 95 	97 	93
f 97 	98 	93
f 98 	101 	93
f 198 	102 	113
f 199 	198 	103
f 104 	113 	106
f 234 	200 	203
f 104 	103 	113
f 54 	241 	53
f 53 	102 	50
f 212 	118 	77
f 101 	253 	122
f 122 	253 	120
f 117 	120 	253
f 77 	79 	185
f 116 	115 	117
f 115 	116 	119
f 115 	120 	117
f 101 	122 	93
f 120 	93 	122
f 115 	93 	120
f 108 	130 	109
f 108 	106 	130
f 211 	128 	124
f 129 	109 	130
f 130 	106 	113
f 127 	109 	41
f 41 	109 	129
f 41 	42 	127
f 42 	44 	127
f 126 	127 	44
f 46 	175 	44
f 126 	44 	125
f 49 	172 	45
f 45 	175 	46
f 125 	44 	175
f 147 	153 	131
f 148 	142 	131
f 135 	110 	134
f 135 	139 	136
f 111 	135 	136
f 136 	137 	141
f 140 	135 	134
f 138 	140 	134
f 140 	139 	135
f 165 	167 	138
f 139 	137 	136
f 142 	143 	131
f 138 	288 	140
f 143 	145 	131
f 288 	144 	140
f 147 	131 	146
f 146 	131 	145
f 283 	66 	139
f 131 	132 	150
f 148 	131 	150
f 165 	152 	160
f 151 	155 	152
f 153 	80 	132
f 132 	131 	153
f 154 	155 	156
f 155 	157 	156
f 155 	149 	157
f 155 	151 	149
f 160 	155 	158
f 154 	158 	155
f 170 	171 	160
f 164 	165 	160
f 147 	137 	153
f 148 	141 	142
f 143 	142 	141
f 159 	141 	148
f 145 	141 	146
f 143 	141 	145
f 137 	147 	146
f 141 	137 	146
f 150 	159 	148
f 163 	154 	162
f 149 	151 	134
f 157 	149 	134
f 138 	134 	151
f 152 	138 	151
f 76 	78 	133
f 156 	162 	154
f 157 	162 	156
f 163 	158 	154
f 5 	7 	133
f 12 	5 	133
f 155 	160 	152
f 12 	133 	10
f 160 	161 	166
f 137 	80 	153
f 166 	164 	160
f 150 	70 	159
f 294 	166 	161
f 164 	167 	165
f 168 	169 	166
f 164 	166 	169
f 68 	73 	139
f 137 	139 	72
f 164 	169 	167
f 72 	80 	137
f 158 	170 	160
f 161 	160 	171
f 167 	169 	138
f 138 	152 	165
f 132 	71 	70
f 150 	132 	70
f 169 	168 	138
f 71 	133 	78
f 288 	138 	168
f 80 	72 	132
f 68 	133 	73
f 163 	170 	158
f 170 	163 	171
f 71 	78 	159
f 171 	163 	290
f 162 	134 	247
f 110 	247 	134
f 162 	157 	134
f 173 	174 	172
f 173 	175 	174
f 125 	175 	176
f 173 	176 	175
f 72 	139 	73
f 78 	76 	13
f 76 	7 	13
f 13 	182 	181
f 183 	179 	180
f 183 	180 	184
f 99 	100 	183
f 183 	100 	179
f 180 	186 	187
f 187 	188 	180
f 225 	186 	224
f 224 	186 	180
f 271 	94 	128
f 188 	184 	180
f 179 	189 	180
f 190 	180 	189
f 190 	224 	180
f 187 	184 	188
f 193 	194 	192
f 191 	192 	194
f 178 	201 	185
f 195 	196 	197
f 201 	199 	195
f 204 	203 	197
f 196 	103 	105
f 196 	105 	197
f 105 	112 	197
f 102 	198 	178
f 199 	178 	198
f 201 	178 	199
f 185 	200 	234
f 200 	185 	201
f 196 	195 	199
f 113 	103 	198
f 195 	203 	200
f 201 	195 	200
f 103 	196 	199
f 79 	67 	178
f 79 	178 	185
f 202 	203 	204
f 195 	197 	203
f 204 	209 	202
f 202 	236 	203
f 187 	191 	194
f 197 	112 	207
f 208 	204 	207
f 197 	207 	204
f 141 	112 	136
f 207 	112 	141
f 210 	204 	208
f 124 	228 	209
f 205 	202 	209
f 206 	209 	204
f 186 	229 	191
f 210 	209 	206
f 204 	210 	206
f 124 	209 	211
f 225 	226 	186
f 209 	210 	211
f 191 	187 	186
f 192 	242 	193
f 85 	118 	212
f 77 	213 	212
f 185 	213 	77
f 183 	184 	99
f 96 	99 	184
f 83 	96 	184
f 212 	214 	85
f 215 	220 	219
f 215 	216 	220
f 121 	89 	218
f 216 	256 	220
f 215 	219 	193
f 194 	219 	217
f 221 	222 	92
f 219 	194 	193
f 55 	49 	222
f 218 	92 	121
f 217 	184 	187
f 223 	184 	217
f 217 	187 	194
f 184 	223 	83
f 223 	219 	220
f 223 	217 	219
f 221 	218 	58
f 222 	87 	92
f 221 	92 	218
f 274 	191 	229
f 190 	189 	271
f 51 	58 	218
f 89 	227 	218
f 271 	189 	94
f 227 	89 	214
f 94 	189 	100
f 224 	271 	225
f 190 	271 	224
f 205 	209 	228
f 274 	192 	191
f 229 	186 	226
f 94 	257 	128
f 221 	57 	56
f 230 	231 	232
f 230 	232 	233
f 221 	58 	57
f 235 	230 	233
f 173 	172 	233
f 235 	233 	172
f 213 	185 	234
f 236 	213 	234
f 212 	213 	237
f 236 	237 	213
f 214 	239 	238
f 214 	212 	239
f 237 	48 	212
f 48 	239 	212
f 235 	172 	55
f 227 	63 	218
f 56 	55 	222
f 221 	56 	222
f 51 	218 	63
f 53 	241 	102
f 227 	214 	65
f 65 	214 	238
f 52 	50 	102
f 63 	227 	65
f 65 	238 	228
f 205 	48 	202
f 228 	238 	205
f 52 	102 	67
f 55 	56 	235
f 51 	63 	228
f 228 	231 	51
f 234 	203 	236
f 236 	202 	237
f 239 	205 	238
f 48 	205 	239
f 237 	202 	48
f 37 	243 	4
f 4 	243 	242
f 130 	102 	241
f 54 	59 	241
f 240 	241 	59
f 244 	240 	64
f 245 	193 	242
f 62 	244 	60
f 64 	60 	244
f 242 	243 	245
f 246 	244 	61
f 243 	215 	193
f 244 	62 	61
f 193 	245 	243
f 129 	240 	41
f 129 	241 	240
f 243 	216 	215
f 244 	42 	240
f 42 	41 	240
f 42 	244 	44
f 49 	45 	246
f 246 	46 	244
f 44 	244 	46
f 46 	246 	45
f 243 	37 	216
f 87 	222 	246
f 61 	87 	246
f 222 	49 	246
f 109 	127 	110
f 247 	110 	127
f 177 	247 	126
f 127 	126 	247
f 126 	125 	177
f 176 	177 	125
f 241 	129 	130
f 113 	102 	130
f 252 	263 	251
f 250 	82 	249
f 249 	261 	248
f 248 	252 	249
f 249 	254 	250
f 40 	250 	39
f 119 	123 	115
f 114 	115 	123
f 249 	252 	254
f 39 	250 	254
f 254 	255 	39
f 256 	254 	253
f 252 	253 	254
f 254 	256 	255
f 43 	39 	255
f 253 	220 	256
f 128 	257 	124
f 257 	258 	124
f 233 	232 	259
f 259 	115 	114
f 259 	260 	115
f 232 	231 	124
f 228 	124 	231
f 124 	258 	232
f 258 	257 	232
f 257 	94 	93
f 260 	259 	232
f 257 	260 	232
f 257 	93 	260
f 115 	260 	93
f 230 	51 	231
f 265 	248 	261
f 262 	253 	252
f 252 	251 	262
f 117 	253 	262
f 251 	263 	262
f 252 	248 	264
f 264 	263 	252
f 264 	123 	263
f 248 	265 	266
f 266 	267 	248
f 268 	269 	248
f 280 	265 	261
f 119 	116 	262
f 263 	123 	262
f 268 	248 	267
f 253 	223 	220
f 266 	281 	267
f 262 	116 	117
f 264 	248 	269
f 119 	262 	123
f 269 	123 	264
f 269 	268 	114
f 114 	268 	267
f 277 	114 	281
f 261 	249 	82
f 37 	255 	216
f 255 	256 	216
f 207 	141 	270
f 141 	159 	270
f 207 	270 	208
f 270 	210 	208
f 181 	271 	272
f 13 	181 	159
f 270 	272 	210
f 270 	159 	181
f 159 	78 	13
f 270 	181 	272
f 128 	211 	271
f 271 	211 	272
f 211 	210 	272
f 181 	273 	271
f 275 	192 	274
f 276 	192 	275
f 30 	192 	276
f 275 	274 	181
f 273 	181 	274
f 226 	225 	273
f 273 	225 	271
f 226 	273 	229
f 274 	229 	273
f 182 	30 	276
f 276 	275 	181
f 181 	182 	276
f 133 	132 	73
f 66 	133 	68
f 173 	277 	177
f 176 	173 	177
f 162 	247 	177
f 177 	278 	162
f 278 	177 	277
f 278 	277 	281
f 277 	233 	259
f 259 	114 	277
f 277 	173 	233
f 49 	55 	172
f 172 	174 	45
f 175 	45 	174
f 163 	162 	278
f 163 	278 	279
f 278 	280 	279
f 278 	281 	280
f 261 	82 	280
f 123 	269 	114
f 280 	281 	265
f 266 	265 	281
f 189 	179 	100
f 114 	267 	281
f 250 	282 	82
f 250 	306 	282
f 140 	283 	139
f 82 	282 	280
f 171 	285 	161
f 295 	161 	285
f 161 	295 	284
f 284 	294 	161
f 294 	286 	166
f 166 	286 	287
f 166 	287 	168
f 171 	290 	285
f 286 	288 	287
f 168 	287 	288
f 291 	16 	10
f 102 	178 	67
f 291 	10 	292
f 292 	18 	283
f 14 	16 	293
f 291 	293 	16
f 293 	291 	283
f 292 	283 	291
f 283 	288 	293
f 283 	144 	288
f 297 	296 	295
f 297 	295 	298
f 300 	299 	294
f 286 	294 	299
f 301 	302 	294
f 300 	294 	302
f 294 	295 	301
f 295 	294 	284
f 295 	296 	303
f 295 	303 	301
f 303 	304 	301
f 295 	285 	298
f 301 	304 	302
f 288 	286 	299
f 293 	288 	299
f 296 	297 	290
f 290 	297 	298
f 302 	293 	300
f 299 	300 	293
f 296 	305 	303
f 290 	305 	296
f 305 	304 	303
f 290 	298 	285
f 302 	304 	293
f 279 	290 	163
f 279 	289 	290
f 140 	144 	283
f 3 	290 	289
f 305 	290 	3
f 250 	35 	306
f 280 	282 	3
f 3 	282 	306
f 3 	306 	35
f 3 	279 	280
f 289 	279 	3
f 36 	304 	38
f 304 	36 	33
f 38 	304 	305
f 304 	33 	293
f 307 	2 	40
f 40 	1 	307
f 3 	307 	305
f 307 	3 	2
f 305 	307 	1
f 1 	38 	305
# 610 faces

#end of obj_0

`;
var stone4 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -36.8374 		-49.064 		0.808
v -36.772 		-48.966 		0.795
v -35.8293 		-48.9474 		-0.0514
v -35.7742 		-48.913 		-0.0288
v -35.8137 		-48.9377 		-0.045
v -35.8544 		-48.963 		-0.0616
v -35.9035 		-49.0169 		-0.0704
v -36.783 		-48.893 		0.618
v -35.9142 		-49.0358 		-0.069
v -35.805 		-48.824 		-0.093
v -36.78 		-48.901 		0.382
v -35.979 		-49.0896 		-0.089
v -36.772 		-48.8983 		0.412
v -35.8913 		-50.0407 		1.038
v -35.9428 		-50.0417 		1.038
v -35.8513 		-50.0246 		1.038
v -36.0048 		-50.0429 		1.038
v -35.9222 		-50.1749 		1.038
v -36.777 		-48.909 		0.147
v -35.8531 		-50.3505 		-0.0101
v -35.8514 		-50.3373 		-0.0341
v -36.035 		-48.512 		1.62
v -36.214 		-48.538 		1.604
v -35.864 		-48.585 		0.835
v -36.136 		-48.485 		1.521
v -35.865 		-48.59 		0.374
v -36.148 		-48.443 		1.268
v -36.013 		-48.483 		1.28
v -36.216 		-48.556 		0.036
v -36.014 		-48.488 		0.827
v -36.148 		-48.448 		0.82
v -35.603 		-49.069 		0.717
v -36.149 		-48.453 		0.373
v -36.845 		-49.878 		0.776
v -36.014 		-48.493 		0.373
v -36.8018 		-49.8678 		0.808
v -36.037 		-48.529 		0.033
v -36.805 		-50.121 		0.604
v -36.793 		-50.05 		0.733
v -36.137 		-48.5 		0.123
v -36.802 		-50.13 		0.375
v -36.799 		-50.138 		0.146
v -36.0641 		-48.5545 		1.669
v -36.0055 		-48.5823 		1.669
v -36.1576 		-48.5743 		1.669
v -36.784 		-50.076 		0.018
v -36.892 		-48.991 		0.784
v -35.864 		-48.58 		1.296
v -36.98 		-49.016 		0.604
v -36.903 		-48.918 		0.61
v -35.736 		-48.707 		1.662
v -35.74 		-48.7129 		1.669
v -35.7163 		-48.7822 		1.669
v -35.6891 		-48.8704 		1.669
v -35.671 		-48.787 		1.582
v -35.6893 		-48.8766 		1.669
v -35.6901 		-48.8797 		1.669
v -36.8771 		-49.0882 		0.808
v -36.406 		-48.624 		0.56
v -36.406 		-48.6262 		0.561
v -36.3907 		-48.6398 		0.561
v -36.949 		-49.068 		0.733
v -36.9 		-48.926 		0.378
v -36.977 		-49.024 		0.375
v -36.974 		-49.033 		0.146
v -36.897 		-48.935 		0.146
v -36.412 		-48.7602 		0.818
v -36.4132 		-48.7631 		0.6971
v -36.4126 		-48.7616 		0.761
v -36.94 		-49.094 		0.018
v -36.458 		-48.764 		0.696
v -36.945 		-49.247 		0.776
v -36.457 		-48.7671 		0.561
v -36.9018 		-49.2368 		0.808
v -36.4146 		-48.7663 		0.561
v -36.873 		-49.891 		0.602
v -36.973 		-49.259 		0.602
v -36.97 		-49.268 		0.374
v -36.87 		-49.899 		0.374
v -36.7371 		-49.0046 		-0.034
v -36.7316 		-49.0137 		-0.0365
v -36.867 		-49.907 		0.146
v -36.967 		-49.276 		0.146
v -36.451 		-49.105 		-0.082
v -36.724 		-49.233 		-0.089
v -36.604 		-49.208 		-0.092
v -36.504 		-49.839 		-0.092
v -36.624 		-49.865 		-0.089
v -36.744 		-49.89 		-0.085
v -36.844 		-49.259 		-0.085
v -36.835 		-49.907 		-0.026
v -36.935 		-49.276 		-0.026
v -36.451 		-49.754 		-0.082
v -36.882 		-49.02 		-0.028
v -36.5313 		-49.1909 		-0.0446
v -36.48 		-49.7543 		-0.0685
v -35.5213 		-49.2273 		0.2489
v -35.5225 		-49.227 		0.2521
v -36.5556 		-49.1174 		-0.0334
v -36.5599 		-49.1065 		-0.0314
v -35.481 		-49.195 		0.136
v -35.478 		-49.197 		0.022
v -35.625 		-48.788 		0.849
v -35.6528 		-48.9019 		0.8509
v -35.6528 		-48.9018 		0.8456
v -35.6527 		-48.9016 		0.8132
v -35.715 		-48.682 		0.843
v -35.9853 		-49.0903 		-0.0891
v -35.954 		-48.727 		-0.087
v -36.132 		-48.99 		-0.087
v -36.104 		-48.63 		-0.08
v -36.1664 		-49.0105 		-0.0516
v -35.5221 		-49.2324 		0.1354
v -35.5232 		-49.2347 		0.0817
v -35.5219 		-49.2294 		0.2017
v -35.5219 		-49.2295 		0.2014
v -35.6524 		-48.9013 		0.7163
v -36.166 		-49.099 		-0.087
v -36.1136 		-49.0337 		-0.0621
v -36.1508 		-49.0175 		-0.0548
v -36.0995 		-49.04 		-0.065
v -35.881 		-49.092 		-0.093
v -35.483 		-49.193 		0.25
v -35.8939 		-49.0704 		-0.0838
v -35.8811 		-49.0767 		-0.0867
v -35.7158 		-48.8748 		-0.0011
v -35.7192 		-48.8784 		-0.0064
v -35.509 		-49.125 		-0.064
v -35.467 		-49.236 		0.253
v -36.671 		-48.8527 		0.561
v -36.5312 		-48.7966 		0.561
v -35.466 		-49.244 		0.082
v -36.672 		-48.85 		0.691
v -36.7449 		-49.0912 		0.808
v -36.743 		-48.8876 		0.539
v -35.546 		-49.257 		0.021
v -36.7428 		-49.005 		0.808
v -36.7148 		-48.9892 		0.808
v -36.7037 		-48.9518 		0.8007
v -36.7008 		-48.8782 		0.561
v -36.6942 		-48.8768 		0.561
v -36.677 		-48.8732 		0.561
v -35.5464 		-49.2568 		0.042
v -36.6773 		-48.871 		0.625
v -36.6772 		-48.872 		0.5964
v -36.6818 		-48.8849 		0.6552
v -35.5674 		-49.2671 		0.021
v -36.6871 		-48.9012 		0.6906
v -35.271 		-50.174 		0.436
v -36.742 		-48.634 		0.414
v -36.65 		-48.6 		0.418
v -35.777 		-50.275 		0.789
v -35.3274 		-50.1832 		0.561
v -36.648 		-48.603 		0.25
v -36.74 		-48.637 		0.248
v -35.6758 		-50.2873 		0.561
v -35.7174 		-50.2702 		0.561
v -35.7427 		-50.2571 		0.561
v -36.647 		-48.607 		0.081
v -35.271 		-50.182 		0.259
v -35.27 		-50.19 		0.082
v -35.5207 		-49.1084 		0.332
v -35.5167 		-49.1175 		0.332
v -35.5171 		-49.1291 		0.332
v -35.5164 		-49.1215 		0.332
v -35.7452 		-50.2587 		0.561
v -35.7738 		-50.2774 		0.5557
v -35.6002 		-49.0775 		0.332
v -35.576 		-48.913 		0.251
v -35.49 		-49.107 		0.251
v -35.574 		-48.915 		0.137
v -35.487 		-49.109 		0.137
v -35.802 		-50.24 		1.007
v -35.628 		-50.178 		0.799
v -35.485 		-49.111 		0.022
v -35.572 		-48.917 		0.022
v -35.6248 		-50.1804 		0.561
v -35.836 		-50.3045 		0.5464
v -35.626 		-48.793 		0.375
v -35.63 		-48.856 		0.022
v -35.633 		-48.854 		0.136
v -35.625 		-48.783 		1.323
v -36.6265 		-49.0662 		-0.0564
v -36.645 		-49.0681 		-0.0555
v -36.5934 		-49.0907 		-0.0458
v -35.8701 		-49.0916 		-0.088
v -35.672 		-48.802 		0.113
v -35.715 		-48.687 		0.375
v -36.6978 		-49.0374 		-0.0444
v -36.6686 		-49.0546 		-0.0505
v -35.296 		-49.354 		-0.048
v -36.5696 		-49.0932 		-0.0331
v -35.795 		-49.26 		-0.088
v -35.8374 		-49.2793 		-0.073
v -35.738 		-48.723 		0.024
v -35.8105 		-49.3168 		-0.0606
v -35.7917 		-49.3353 		-0.0519
v -36.523 		-49.089 		-0.047
v -36.5116 		-49.0888 		-0.0471
v -36.5198 		-49.0897 		-0.0436
v -36.523 		-49.0901 		-0.0422
v -36.5613 		-49.0947 		-0.026
v -35.587 		-49.162 		-0.092
v -35.691 		-49.211 		-0.09
v -36.467 		-50.074 		-0.032
v -35.6117 		-48.9153 		0.332
v -35.708 		-49.518 		-0.087
v -35.6054 		-48.9197 		0.332
v -35.6027 		-48.9225 		0.332
v -35.555 		-49.235 		-0.063
v -35.659 		-49.283 		-0.062
v -35.506 		-49.188 		-0.042
v -35.6509 		-48.9046 		0.332
v -36.4513 		-49.8167 		-0.0567
v -36.4447 		-49.825 		-0.0533
v -36.4264 		-49.8742 		-0.0336
v -35.764 		-49.332 		-0.061
v -35.6518 		-48.9018 		0.4243
v -35.6517 		-48.902 		0.3759
v -35.648 		-48.879 		0.313
v -35.6538 		-48.8797 		0.3146
v -35.6553 		-48.8897 		0.3221
v -35.6547 		-48.8606 		0.2702
v -36.252 		-48.518 		1.264
v -36.252 		-48.523 		0.818
v -36.719 		-48.656 		0.508
v -35.48 		-49.324 		-0.047
v -35.665 		-49.294 		-0.045
v -35.635 		-48.852 		0.25
v -35.6558 		-48.8548 		0.2495
v -36.738 		-48.641 		0.081
v -35.66 		-48.856 		0.217
v -35.715 		-48.677 		1.311
v -35.6647 		-49.2921 		-0.0421
v -35.654 		-48.906 		1.327
v -35.7292 		-48.9961 		1.419
v -35.707 		-48.9707 		1.3865
v -35.6678 		-49.2934 		-0.0425
v -35.6856 		-49.0409 		1.419
v -35.6544 		-48.908 		1.1336
v -35.6533 		-48.9033 		1.123
v -35.6796 		-48.9443 		1.2827
v -35.8034 		-49.5014 		-0.0573
v -35.6809 		-49.0505 		1.419
v -35.6793 		-49.0561 		1.419
v -35.607 		-49.061 		1.125
v -35.7787 		-49.3384 		-0.0459
v -35.6897 		-48.9589 		1.327
v -35.7615 		-49.3384 		-0.038
v -35.7753 		-49.4159 		-0.0444
v -35.7228 		-49.3226 		-0.0314
v -35.7393 		-49.3315 		-0.0278
v -35.6778 		-49.2985 		-0.0413
v -35.886 		-48.61 		1.641
v -35.9023 		-48.6336 		1.669
v -35.8692 		-48.6496 		1.669
v -36.2223 		-49.011 		1.669
v -36.197 		-49.071 		1.641
v -36.1807 		-49.0467 		1.669
v -35.868 		-49.1437 		1.669
v -35.6563 		-49.29 		-0.0367
v -35.8764 		-49.1482 		1.669
v -35.8707 		-49.1456 		1.669
v -35.2 		-49.598 		-0.05
v -35.523 		-49.548 		-0.089
v -35.339 		-49.578 		-0.092
v -35.205 		-49.426 		-0.015
v -36.253 		-48.528 		0.373
v -35.454 		-50.169 		-0.092
v -36.3356 		-48.8383 		1.669
v -35.638 		-50.139 		-0.089
v -36.3179 		-48.9306 		1.669
v -36.347 		-48.974 		1.62
v -35.7239 		-49.6752 		-0.0872
v -35.7409 		-49.6871 		-0.087
v -35.8186 		-49.6988 		-0.0643
v -35.719 		-49.683 		-0.093
v -35.7104 		-49.6774 		-0.0873
v -35.5453 		-49.9499 		-0.0899
v -35.5875 		-49.8795 		-0.089
v -35.55 		-49.953 		-0.093
v -35.5474 		-49.9572 		-0.0899
v -35.823 		-50.109 		-0.087
v -35.7975 		-49.978 		-0.087
v -35.7123 		-50.0303 		-0.088
v -35.693 		-50.0455 		-0.0882
v -36.2682 		-49.0571 		1.419
v -36.2118 		-49.0948 		1.419
v -35.6061 		-49.6248 		1.038
v -36.2306 		-50.0619 		0.412
v -35.6793 		-49.7041 		1.419
v -35.7962 		-49.8375 		1.419
v -35.735 		-49.887 		1.344
v -35.6856 		-49.7196 		1.419
v -35.6809 		-49.7097 		1.419
v -36.2311 		-50.0643 		0.3078
v -35.607 		-49.709 		1.125
v -36.228 		-50.0488 		0.2477
v -35.458 		-49.8629 		1.038
v -35.4527 		-49.8713 		1.038
v -35.4519 		-49.8826 		1.038
v -35.4519 		-49.8752 		1.038
v -36.2873 		-50.2946 		0.561
v -35.6061 		-49.7107 		1.038
v -36.324 		-50.274 		0.539
v -35.6624 		-49.9041 		1.038
v -36.275 		-50.371 		0.561
v -36.294 		-50.403 		0.545
v -35.678 		-49.953 		1.122
v -35.7137 		-50.1416 		1.038
v -35.6667 		-50.1196 		1.038
v -35.5127 		-50.0457 		1.038
v -35.502 		-50.046 		1.035
v -35.5046 		-50.0419 		1.038
v -36.351 		-50.262 		0.412
v -35.4876 		-49.9938 		1.038
v -36.34 		-50.348 		0.508
v -35.6772 		-49.9549 		1.038
v -36.311 		-50.433 		0.418
v -35.8292 		-50.1967 		1.038
v -36.1282 		-49.4784 		1.548
v -36.0985 		-49.5098 		1.548
v -36.103 		-49.491 		1.539
v -36.0966 		-49.5138 		1.548
v -36.0961 		-49.5162 		1.548
v -36.351 		-50.266 		0.247
v -36.352 		-50.27 		0.081
v -36.13 		-49.4772 		1.548
v -36.131 		-49.4768 		1.548
v -36.1487 		-49.4743 		1.548
v -36.7637 		-49.0187 		0.808
v -36.36 		-48.9959 		1.419
v -36.772 		-48.731 		0.412
v -36.237 		-49.46 		1.544
v -36.7719 		-48.8987 		0.3988
v -36.2387 		-49.4691 		1.548
v -36.7718 		-48.8993 		0.3823
v -36.268 		-49.4883 		1.548
v -36.771 		-48.734 		0.247
v -36.283 		-49.486 		1.542
v -36.769 		-48.738 		0.081
v -36.77 		-48.907 		0.1614
v -36.7698 		-48.9075 		0.147
v -36.298 		-49.571 		1.542
v -36.283 		-49.5732 		1.548
v -36.771 		-48.9041 		0.247
v -36.2623 		-49.5999 		1.548
v -36.769 		-48.9406 		0.081
v -36.264 		-49.609 		1.544
v -36.268 		-49.464 		1.532
v -36.277 		-49.455 		1.501
v -36.762 		-48.995 		-0.03
v -36.235 		-49.451 		1.503
v -36.747 		-48.9792 		-0.0048
v -36.295 		-49.485 		1.501
v -36.717 		-50.096 		0.784
v -36.462 		-50.131 		0.626
v -36.303 		-49.604 		1.501
v -36.31 		-49.57 		1.501
v -36.291 		-49.597 		1.532
v -36.583 		-50.156 		0.618
v -36.265 		-49.621 		1.503
v -35.8017 		-49.995 		-0.0867
v -36.234 		-49.452 		1.448
v -36.234 		-49.4525 		1.419
v -36.276 		-49.456 		1.447
v -36.2853 		-49.4717 		1.419
v -36.295 		-49.486 		1.447
v -35.83 		-50.1078 		-0.0848
v -36.276 		-49.457 		1.419
v -35.8253 		-50.1207 		-0.0848
v -35.8113 		-50.1225 		-0.085
v -36.2557 		-49.4551 		1.419
v -36.2945 		-49.4865 		1.419
v -36.31 		-49.571 		1.447
v -36.3095 		-49.5715 		1.419
v -36.3056 		-49.5882 		1.419
v -36.302 		-49.605 		1.447
v -36.302 		-49.606 		1.419
v -35.6101 		-49.9955 		-0.089
v -36.265 		-49.622 		1.448
v -35.8292 		-50.1409 		-0.0809
v -35.8332 		-50.1473 		-0.0788
v -36.2645 		-49.623 		1.419
v -36.2842 		-49.6142 		1.419
v -36.2394 		-49.6273 		1.419
v -36.2669 		-49.8854 		1.419
v -35.7007 		-48.8657 		0.0207
v -35.7005 		-48.8655 		0.0212
v -35.6857 		-48.8629 		0.0521
v -35.6691 		-48.8587 		0.1465
v -35.6711 		-48.8591 		0.1356
v -36.3371 		-48.6515 		0.5313
v -36.338 		-48.649 		0.53
v -35.888 		-48.626 		0.028
v -36.3533 		-48.6752 		0.561
v -35.3 		-49.33 		0.561
v -35.283 		-49.3657 		0.561
v -35.299 		-49.325 		0.56
v -35.207 		-49.401 		0.53
v -36.526 		-48.601 		0.253
v -35.2036 		-49.5457 		0.561
v -35.2013 		-49.5609 		0.561
v -35.2012 		-49.5695 		0.561
v -36.524 		-48.604 		0.082
v -35.6053 		-49.5924 		0.9506
v -35.604 		-49.5621 		0.8186
v -36.402 		-48.601 		0.082
v -36.46 		-50.139 		0.387
v -36.58 		-50.164 		0.382
v -36.457 		-50.147 		0.147
v -35.315 		-50.189 		-0.05
v -36.577 		-50.173 		0.147
v -35.8378 		-50.3079 		-0.05
v -35.8335 		-50.273 		-0.0566
v -36.703 		-50.181 		0.61
v -36.697 		-50.198 		0.146
v -36.7 		-50.19 		0.378
v -36.166 		-49.747 		-0.087
v -36.1321 		-49.9482 		-0.0053
v -36.1319 		-49.9505 		-0.0044
v -36.587 		-50.1 		-0.03
v -36.193 		-50.067 		-0.044
v -36.113 		-50.114 		-0.087
v -36.707 		-50.125 		-0.028
v -36.135 		-50.017 		-0.012
v -36.131 		-49.95 		-0.009
v -36.405 		-48.595 		0.43
v -36.403 		-48.598 		0.256
v -36.007 		-50.175 		-0.089
v -36.527 		-48.597 		0.424
v -35.881 		-49.741 		-0.093
v -36.392 		-48.802 		1.604
v -35.868 		-49.78 		-0.088
v -36.413 		-48.896 		1.521
v -36.018 		-49.878 		-0.084
v -36.0458 		-49.8338 		-0.0523
v -36.4338 		-48.8663 		1.3941
v -36.4321 		-48.8571 		1.3906
v -36.4336 		-48.9 		1.4077
v -36.4168 		-48.9247 		1.419
v -36.4654 		-48.9343 		1.419
v -36.465 		-48.83 		1.377
v -35.9905 		-49.8137 		-0.0614
v -36.5715 		-49.074 		1.419
v -36.679 		-49.077 		1.363
v -36.4268 		-48.8291 		1.3794
v -36.597 		-50.071 		0.795
v -35.8757 		-49.768 		-0.0792
v -35.8811 		-49.7729 		-0.0797
v -35.8441 		-49.7398 		-0.076
v -35.8549 		-49.7495 		-0.0771
v -35.901 		-50.235 		-0.092
v -36.4066 		-50.0605 		0.6303
v -36.437 		-50.0596 		0.6965
v -36.723 		-49.8138 		0.808
v -36.7331 		-49.9971 		0.808
v -36.6732 		-49.9813 		0.808
v -35.849 		-50.147 		-0.084
v -36.063 		-50.03 		-0.045
v -36.1849 		-49.4736 		1.548
v -36.184 		-49.469 		1.546
v -35.8345 		-50.2951 		0.561
v -36.7449 		-49.7392 		0.808
v -35.8304 		-50.2941 		0.5487
v -36.211 		-49.618 		1.546
v -36.1757 		-49.6233 		1.548
v -36.2101 		-49.6134 		1.548
v -36.312 		-50.441 		0.081
v -36.311 		-50.437 		0.25
v -36.1111 		-49.6012 		1.548
v -36.1157 		-49.6065 		1.548
v -36.1549 		-49.6257 		1.548
v -36.127 		-49.623 		1.539
v -36.1124 		-49.6033 		1.548
v -36.157 		-49.6262 		1.548
v -36.158 		-49.6263 		1.548
v -36.0807 		-50.0454 		0.997
v -36.374 		-50.36 		0.414
v -36.048 		-49.169 		1.662
v -36.0541 		-49.1543 		1.669
v -36.044 		-49.163 		1.669
v -36.1272 		-50.0513 		0.779
v -35.9697 		-49.1576 		1.669
v -35.948 		-49.198 		1.582
v -36.375 		-50.368 		0.081
v -36.374 		-50.364 		0.248
v -36.084 		-49.519 		1.508
v -36.1935 		-50.0582 		0.539
v -36.091 		-49.485 		1.508
v -36.1918 		-50.0581 		0.5397
v -36.184 		-50.0579 		0.5433
v -36.2153 		-50.1755 		0.561
v -36.129 		-49.468 		1.506
v -36.246 		-50.334 		-0.087
v -36.325 		-50.288 		-0.044
v -36.295 		-50.416 		-0.045
v -36.182 		-49.459 		1.505
v -36.342 		-50.36 		-0.012
v -36.173 		-50.054 		0.703
v -36.099 		-49.604 		1.508
v -36.117 		-49.634 		1.508
v -36.0826 		-50.5209 		0.561
v -36.081 		-50.525 		0.56
v -36.0799 		-50.5231 		0.561
v -36.0595 		-50.5188 		0.561
v -36.01 		-50.538 		0.53
v -36.127 		-50.0515 		0.7699
v -36.159 		-49.638 		1.506
v -36.188 		-50.464 		0.553
v -36.1785 		-50.448 		0.561
v -36.1548 		-50.0742 		0.561
v -36.1718 		-50.0576 		0.5459
v -36.1224 		-50.0563 		0.5568
v -36.1192 		-50.0615 		0.561
v -36.098 		-50.555 		0.43
v -36.099 		-50.559 		0.256
v -36.205 		-50.494 		0.424
v -36.212 		-49.629 		1.505
v -36.099 		-50.563 		0.082
v -36.205 		-50.498 		0.253
v -36.205 		-50.502 		0.082
v -36.1256 		-50.053 		0.7042
v -36.14 		-50.395 		-0.089
v -36.083 		-50.538 		-0.048
v -36.189 		-50.477 		-0.047
v -36.033 		-50.456 		-0.092
v -36.011 		-50.55 		-0.015
v -35.504 		-50.3527 		0.561
v -35.5 		-50.36 		0.56
v -35.499 		-50.3549 		0.561
v -35.4697 		-50.3268 		0.561
v -36.083 		-49.52 		1.451
v -36.083 		-49.5206 		1.419
v -35.386 		-50.321 		0.53
v -36.0869 		-49.5018 		1.419
v -36.0905 		-49.4865 		1.419
v -36.091 		-49.486 		1.45
v -36.2274 		-50.0616 		0.4232
v -35.684 		-50.33 		0.553
v -36.1285 		-49.4695 		1.419
v -36.129 		-49.469 		1.45
v -35.8382 		-50.319 		0.5232
v -36.182 		-49.46 		1.449
v -36.2094 		-49.4563 		1.419
v -36.1573 		-49.4652 		1.419
v -35.582 		-49.579 		0.819
v -36.167 		-49.988 		0.011
v -36.2222 		-50.0502 		0.2538
v -36.2216 		-50.0493 		0.2503
v -35.4912 		-49.3367 		0.561
v -35.4609 		-49.3342 		0.561
v -35.483 		-49.295 		0.553
v -36.1706 		-50.0057 		0.081
v -36.219 		-50.0453 		0.2345
v -36.219 		-50.049 		0.081
v -36.1677 		-50.0045 		0.0765
v -36.2211 		-50.0485 		0.247
v -36.0438 		-50.0347 		-0.0252
v -36.0599 		-50.0242 		-0.0206
v -36.0844 		-50.0169 		-0.0112
v -36.0897 		-50.016 		-0.009
v -35.9659 		-50.0859 		-0.0468
v -36.4452 		-50.0593 		0.7143
v -35.9584 		-50.0933 		-0.0482
v -35.8941 		-50.1584 		-0.0593
v -35.883 		-50.169 		-0.0614
v -36.4585 		-50.0589 		0.7433
v -35.8492 		-50.243 		-0.0614
v -35.6018 		-49.2757 		0.5479
v -35.6019 		-49.3434 		0.561
v -35.5786 		-49.5815 		0.561
v -36.1318 		-49.9455 		-0.0064
v -35.6033 		-49.5626 		0.751
v -35.6019 		-49.5636 		0.561
v -36.0517 		-49.8412 		-0.0492
v -36.1279 		-49.9389 		-0.0091
v -35.603 		-49.5628 		0.717
v -35.841 		-50.16 		-0.0746
v -35.3118 		-50.1388 		0.561
v -35.3162 		-50.1615 		0.561
v -35.3196 		-50.1696 		0.561
v -35.652 		-50.143 		1.021
v -35.413 		-49.849 		0.819
v -35.8779 		-50.1704 		-0.061
v -35.435 		-49.966 		0.983
v -35.387 		-49.975 		0.817
v -36.1533 		-49.9988 		0.0551
v -36.1398 		-49.9955 		0.0435
v -35.478 		-50.081 		0.809
v -36.6055 		-50.0174 		0.808
v -36.4861 		-50.0479 		0.8042
v -36.5525 		-50.0242 		0.808
v -36.1361 		-49.9955 		0.0437
v -36.476 		-50.0517 		0.793
v -36.1252 		-49.9631 		0.0007
v -36.641 		-50.0118 		0.808
v -36.6096 		-50.0039 		0.808
v -36.623 		-48.898 		1.292
v -36.676 		-48.841 		1.075
v -36.1139 		-49.9891 		0.0199
v -36.4097 		-48.7539 		1.0874
v -36.1163 		-49.9956 		0.0458
v -36.462 		-48.755 		1.085
v -36.1197 		-49.9953 		0.0443
v -36.1084 		-50.0015 		0.0291
v -36.43 		-48.782 		1.264
v -36.1129 		-49.9867 		0.0102
v -36.4343 		-48.8002 		1.2646
v -36.1035 		-50.0052 		0.0188
v -36.4292 		-48.8199 		1.3424
v -36.4029 		-50.0646 		0.4518
v -36.43 		-48.7827 		1.1973
v -36.4019 		-50.066 		0.3892
v -36.4017 		-50.0662 		0.3818
v -35.977 		-50.211 		0.997
v -36.4002 		-50.0678 		0.3072
v -36.4006 		-50.0673 		0.3296
v -36.011 		-50.237 		0.779
v -35.911 		-50.314 		0.782
v -35.9 		-50.268 		0.944
v -36.747 		-49.085 		1.071
v -36.411 		-49.997 		0.014
v -36.4113 		-49.9824 		0.0101
v -36.4107 		-49.9931 		0.0144
v -36.411 		-48.9346 		1.419
v -35.9072 		-50.3163 		0.561
v -35.9844 		-50.2574 		0.561
v -36.31 		-48.632 		0.082
v -36.679 		-49.725 		1.363
v -36.5715 		-49.722 		1.419
v -36.3015 		-48.6588 		0.1337
v -36.4654 		-49.8579 		1.419
v -36.465 		-49.964 		1.377
v -36.2986 		-48.6672 		0.082
v -35.8767 		-50.3075 		0.561
v -36.3035 		-48.6857 		0.036
v -36.747 		-49.733 		1.071
v -36.676 		-49.975 		1.075
v -36.623 		-49.906 		1.292
v -36.462 		-50.051 		1.085
v -36.3187 		-48.6249 		0.4418
v -36.0079 		-50.2393 		0.561
v -36.3177 		-48.6235 		0.4338
v -36.3177 		-48.6236 		0.4247
v -36.3179 		-48.6242 		0.373
v -36.311 		-48.628 		0.258
v -36.3118 		-48.6269 		0.3255
v -36.3087 		-48.6354 		0.2722
v -36.308 		-48.6378 		0.2581
v -36.528 		-48.627 		0.553
v -35.983 		-49.087 		-0.093
v -36.3302 		-48.6415 		0.5002
v -36.651 		-48.629 		0.545
v -36.2956 		-48.7297 		0.009
v -35.707 		-48.894 		-0.063
v -35.641 		-48.885 		-0.042
v -35.4096 		-49.8515 		0.561
v -35.361 		-50.388 		0.434
v -36.38 		-50.0464 		0.2254
v -36.379 		-50.049 		0.147
v -35.513 		-50.44 		0.43
v -36.3797 		-50.0263 		0.1471
v -35.4056 		-49.8711 		0.561
v -36.3834 		-50.0207 		0.1248
v -35.3836 		-49.9767 		0.561
v -36.3962 		-50.0076 		0.0729
v -35.36 		-50.397 		0.258
v -35.513 		-50.448 		0.256
v -36.645 		-48.739 		-0.087
v -36.523 		-48.736 		-0.089
v -35.698 		-50.41 		0.424
v -36.4 		-48.734 		-0.092
v -35.8681 		-50.1803 		-0.063
v -35.4747 		-50.0835 		0.561
v -35.5963 		-50.162 		0.561
v -36.4 		-48.991 		-0.092
v -36.523 		-48.994 		-0.089
v -35.3984 		-49.9939 		0.561
v -36.645 		-48.996 		-0.087
v -36.401 		-48.636 		-0.048
v -36.523 		-48.639 		-0.047
v -35.159 		-49.354 		0.434
v -35.359 		-50.405 		0.082
v -35.284 		-49.257 		0.43
v -35.159 		-49.362 		0.258
v -35.512 		-50.456 		0.082
v -35.283 		-49.265 		0.256
v -35.697 		-50.418 		0.253
v -36.737 		-48.74 		-0.044
v -36.645 		-48.641 		-0.045
v -35.696 		-50.426 		0.082
v -36.282 		-48.893 		-0.08
v -36.309 		-48.8712 		-0.05
v -36.309 		-48.731 		-0.05
v -36.333 		-48.659 		-0.015
v -36.3104 		-48.8745 		-0.0506
v -35.951 		-50.4887 		0.561
v -35.9601 		-50.4949 		0.561
v -35.9539 		-50.4913 		0.561
v -36.3065 		-48.9877 		-0.0389
v -36.309 		-48.988 		-0.05
v -36.3054 		-48.9764 		-0.0343
v -36.3091 		-48.9942 		-0.0414
v -36.002 		-50.574 		0.434
v -36.3132 		-49.0007 		-0.0438
v -36.3351 		-49.016 		-0.0494
v -36.3063 		-48.9291 		-0.0383
v -36.3031 		-48.9498 		-0.0239
v -36.2474 		-48.9743 		-0.035
v -36.2846 		-48.958 		-0.0275
v -36.309 		-48.8818 		-0.05
v -35.926 		-50.506 		0.436
v -36.002 		-50.577 		0.258
v -36.003 		-50.581 		0.082
v -36.098 		-49.605 		1.451
v -36.098 		-49.6056 		1.419
v -36.117 		-49.635 		1.45
v -36.117 		-49.6355 		1.419
v -36.1067 		-49.6192 		1.419
v -36.1393 		-49.6377 		1.419
v -36.159 		-49.639 		1.45
v -36.1585 		-49.6395 		1.419
v -36.212 		-49.631 		1.449
v -35.926 		-50.51 		0.259
v -36.1873 		-49.6352 		1.419
v -35.9179 		-49.2174 		1.419
v -35.9404 		-49.2276 		1.419
v -35.9677 		-49.2235 		1.419
v -36.0632 		-49.1939 		1.419
v -36.1116 		-49.1611 		1.419
v -35.927 		-50.513 		0.082
v -35.8553 		-50.3912 		0.2753
v -35.8569 		-50.3965 		0.1664
v -35.8556 		-50.3923 		0.2504
v -35.8585 		-50.3996 		0.102
v -35.8589 		-50.4004 		0.082
v -35.8592 		-50.4004 		0.0811
v -36.5282 		-48.6451 		0.561
v -36.5089 		-48.6416 		0.561
v -36.651 		-48.6656 		0.561
v -36.612 		-48.6588 		0.561
v -36.7008 		-48.7266 		0.561
v -36.743 		-48.728 		0.539
v -35.8417 		-49.1629 		1.419
v -35.8544 		-50.3883 		0.34
v -35.853 		-50.3849 		0.419
v -36.18 		-49.958 		1.395
v -36.1802 		-49.8986 		1.419
v -35.847 		-50.3748 		0.436
v -35.9162 		-49.9343 		1.419
v -35.895 		-49.952 		1.413
v -35.895 		-49.9373 		1.419
v -35.497 		-50.389 		-0.048
v -35.892 		-50.039 		1.112
v -36.177 		-50.045 		1.098
v -35.954 		-50.501 		-0.05
v -35.681 		-50.359 		-0.047
v -35.383 		-50.346 		-0.015
v -36.714 		-48.667 		-0.012
v -35.8507 		-50.3315 		-0.0452
v -36.3799 		-49.0421 		-0.0587
v -36.4007 		-49.0542 		-0.063
v -36.737 		-48.997 		-0.044
v -36.7405 		-48.9903 		-0.0304
v -36.4434 		-49.0547 		-0.0623
v -36.4512 		-49.0549 		-0.0622
v -35.596 		-48.93 		-0.064
v -35.673 		-48.967 		-0.092
v -36.7401 		-48.9968 		-0.0319
v -35.811 		-48.943 		-0.062
v -35.778 		-49.016 		-0.09
v -35.882 		-49.065 		-0.088
v -35.156 		-49.583 		0.436
v -35.156 		-49.591 		0.259
v -35.158 		-49.37 		0.082
v -35.282 		-49.274 		0.082
v -35.155 		-49.599 		0.082
v -35.6008 		-49.2055 		0.4197
v -35.468 		-49.227 		0.424
v -35.6014 		-49.2524 		0.5047
v -35.5579 		-49.2171 		0.332
v -35.5524 		-49.2182 		0.328
v -35.513 		-49.182 		0.313
v -35.545 		-49.2201 		0.3136
v -35.5653 		-49.2159 		0.332
v -35.6002 		-49.2102 		0.332
# 787 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 335 	11 	13
f 337 	11 	335
f 14 	320 	16
f 14 	15 	18
f 18 	15 	17
f 18 	616 	320
f 320 	14 	18
f 22 	25 	23
f 25 	27 	23
f 22 	27 	25
f 27 	28 	30
f 22 	28 	27
f 27 	224 	23
f 31 	27 	30
f 27 	31 	224
f 30 	33 	31
f 225 	224 	31
f 225 	31 	33
f 35 	30 	24
f 35 	33 	30
f 35 	24 	26
f 34 	38 	39
f 33 	40 	29
f 40 	37 	29
f 37 	35 	26
f 37 	33 	35
f 26 	395 	37
f 33 	37 	40
f 22 	43 	44
f 42 	82 	91
f 42 	91 	46
f 255 	254 	44
f 45 	43 	23
f 22 	23 	43
f 2 	8 	47
f 45 	270 	43
f 47 	49 	62
f 48 	24 	30
f 28 	48 	30
f 28 	22 	48
f 8 	50 	47
f 51 	52 	53
f 53 	54 	55
f 53 	55 	51
f 49 	47 	50
f 56 	55 	54
f 1 	331 	47
f 58 	1 	47
f 47 	72 	58
f 59 	60 	61
f 72 	62 	49
f 49 	77 	72
f 134 	1 	74
f 11 	63 	8
f 11 	66 	63
f 63 	50 	8
f 49 	50 	63
f 63 	64 	49
f 60 	73 	61
f 66 	65 	63
f 63 	65 	64
f 66 	11 	19
f 61 	73 	75
f 69 	68 	71
f 94 	70 	65
f 36 	72 	34
f 74 	72 	36
f 74 	58 	72
f 47 	62 	72
f 76 	38 	34
f 77 	34 	72
f 76 	34 	77
f 77 	78 	76
f 73 	71 	75
f 68 	75 	71
f 49 	64 	77
f 77 	64 	78
f 79 	76 	78
f 79 	38 	76
f 65 	78 	64
f 41 	38 	79
f 79 	82 	41
f 78 	83 	79
f 41 	82 	42
f 78 	65 	83
f 82 	79 	83
f 82 	83 	92
f 86 	96 	87
f 87 	88 	85
f 90 	88 	89
f 87 	85 	86
f 91 	82 	92
f 88 	422 	89
f 65 	92 	83
f 89 	92 	90
f 65 	70 	92
f 94 	90 	92
f 70 	94 	92
f 94 	66 	19
f 94 	65 	66
f 95 	96 	86
f 36 	464 	74
f 98 	97 	123
f 185 	192 	86
f 95 	86 	99
f 192 	100 	99
f 85 	81 	189
f 6 	7 	10
f 104 	105 	103
f 106 	103 	105
f 7 	9 	652
f 652 	10 	7
f 12 	652 	9
f 6 	10 	3
f 109 	110 	111
f 10 	652 	109
f 120 	112 	110
f 110 	652 	121
f 106 	179 	103
f 101 	113 	114
f 115 	116 	123
f 101 	123 	116
f 106 	117 	179
f 101 	116 	113
f 119 	120 	110
f 106 	105 	32
f 121 	119 	110
f 121 	118 	119
f 120 	119 	118
f 112 	120 	118
f 117 	106 	32
f 121 	108 	118
f 12 	124 	122
f 125 	122 	124
f 108 	12 	122
f 9 	124 	12
f 122 	118 	108
f 97 	115 	123
f 126 	656 	127
f 115 	129 	116
f 69 	71 	67
f 604 	67 	71
f 129 	97 	98
f 97 	129 	115
f 743 	130 	131
f 127 	195 	126
f 130 	133 	131
f 73 	131 	71
f 114 	113 	132
f 116 	129 	113
f 132 	113 	129
f 132 	129 	688
f 143 	136 	114
f 743 	744 	140
f 101 	136 	102
f 331 	134 	137
f 138 	137 	134
f 140 	8 	145
f 135 	8 	140
f 114 	132 	143
f 135 	140 	744
f 743 	141 	130
f 142 	130 	141
f 140 	141 	743
f 101 	114 	136
f 141 	140 	145
f 141 	145 	142
f 136 	143 	147
f 147 	143 	132
f 261 	147 	228
f 133 	139 	622
f 134 	622 	138
f 138 	622 	139
f 139 	133 	148
f 145 	144 	130
f 133 	130 	144
f 142 	145 	130
f 146 	133 	144
f 146 	148 	133
f 71 	131 	133
f 654 	151 	150
f 535 	659 	153
f 150 	151 	154
f 154 	155 	150
f 153 	582 	675
f 540 	156 	157
f 166 	167 	157
f 157 	156 	177
f 158 	157 	177
f 231 	154 	159
f 659 	149 	582
f 659 	160 	149
f 160 	668 	161
f 162 	787 	163
f 540 	157 	167
f 787 	164 	165
f 165 	163 	787
f 209 	208 	168
f 158 	166 	157
f 787 	162 	168
f 162 	209 	168
f 166 	158 	152
f 167 	166 	152
f 174 	173 	152
f 162 	170 	169
f 163 	170 	162
f 165 	170 	163
f 169 	209 	162
f 181 	169 	171
f 169 	170 	171
f 171 	170 	172
f 101 	172 	123
f 172 	170 	123
f 174 	152 	158
f 172 	175 	176
f 101 	102 	175
f 583 	173 	174
f 175 	172 	101
f 152 	173 	620
f 176 	171 	172
f 174 	158 	177
f 418 	41 	42
f 85 	88 	90
f 91 	92 	89
f 256 	52 	51
f 189 	190 	85
f 86 	85 	184
f 56 	259 	57
f 54 	259 	56
f 256 	255 	259
f 257 	259 	255
f 56 	235 	182
f 57 	235 	56
f 182 	55 	56
f 183 	86 	184
f 772 	204 	773
f 183 	185 	86
f 125 	773 	186
f 193 	186 	773
f 184 	680 	183
f 183 	198 	185
f 122 	125 	186
f 99 	86 	192
f 186 	193 	194
f 186 	194 	122
f 184 	85 	190
f 103 	188 	107
f 103 	179 	188
f 680 	184 	190
f 179 	195 	188
f 192 	185 	198
f 175 	102 	128
f 189 	680 	190
f 193 	773 	204
f 99 	84 	95
f 96 	95 	93
f 93 	95 	84
f 100 	84 	99
f 194 	193 	196
f 198 	199 	200
f 201 	198 	200
f 187 	392 	390
f 432 	194 	243
f 195 	179 	187
f 192 	202 	100
f 201 	202 	198
f 197 	250 	196
f 395 	188 	195
f 198 	202 	192
f 247 	250 	197
f 84 	100 	201
f 84 	201 	200
f 84 	200 	199
f 199 	767 	84
f 100 	202 	201
f 209 	169 	208
f 208 	229 	206
f 208 	206 	168
f 213 	168 	206
f 216 	624 	205
f 216 	205 	87
f 220 	206 	229
f 88 	87 	205
f 212 	210 	128
f 220 	222 	206
f 215 	87 	214
f 128 	210 	203
f 215 	216 	87
f 214 	93 	215
f 117 	218 	179
f 193 	211 	217
f 219 	179 	218
f 93 	548 	215
f 221 	222 	220
f 214 	87 	96
f 214 	96 	93
f 220 	229 	223
f 220 	223 	221
f 211 	253 	217
f 213 	206 	222
f 210 	211 	204
f 219 	222 	179
f 222 	221 	179
f 221 	223 	179
f 251 	252 	217
f 251 	217 	253
f 211 	193 	204
f 229 	208 	169
f 171 	176 	180
f 154 	231 	155
f 180 	181 	171
f 229 	169 	181
f 210 	204 	203
f 392 	391 	181
f 217 	196 	193
f 196 	217 	197
f 180 	390 	181
f 217 	247 	197
f 249 	217 	252
f 657 	656 	180
f 227 	265 	228
f 333 	150 	155
f 231 	339 	155
f 223 	229 	230
f 232 	230 	229
f 229 	181 	232
f 236 	237 	57
f 231 	341 	339
f 211 	238 	253
f 182 	51 	55
f 211 	210 	136
f 182 	233 	51
f 102 	210 	212
f 234 	238 	211
f 228 	238 	234
f 248 	235 	237
f 57 	237 	235
f 182 	235 	103
f 191 	265 	227
f 236 	239 	237
f 240 	241 	235
f 103 	235 	241
f 107 	233 	182
f 182 	103 	107
f 240 	235 	242
f 235 	248 	242
f 246 	244 	245
f 242 	244 	246
f 241 	240 	246
f 247 	217 	249
f 240 	242 	246
f 249 	250 	247
f 244 	248 	239
f 237 	239 	248
f 242 	248 	244
f 291 	246 	245
f 243 	196 	250
f 250 	228 	207
f 250 	207 	243
f 103 	241 	104
f 246 	32 	105
f 105 	104 	246
f 249 	252 	250
f 241 	246 	104
f 252 	251 	250
f 251 	253 	250
f 228 	250 	253
f 236 	745 	239
f 102 	212 	128
f 433 	270 	23
f 51 	233 	254
f 22 	44 	254
f 254 	48 	22
f 255 	44 	270
f 44 	43 	270
f 136 	210 	102
f 255 	256 	254
f 51 	254 	256
f 136 	147 	211
f 261 	211 	147
f 272 	257 	255
f 261 	234 	211
f 52 	256 	259
f 259 	257 	258
f 481 	259 	258
f 132 	228 	147
f 261 	228 	234
f 54 	53 	259
f 481 	57 	259
f 227 	228 	132
f 238 	228 	253
f 263 	260 	484
f 260 	57 	484
f 484 	57 	481
f 53 	52 	259
f 207 	228 	265
f 254 	233 	48
f 191 	266 	265
f 236 	57 	260
f 191 	264 	266
f 191 	267 	264
f 278 	207 	265
f 264 	161 	412
f 264 	412 	266
f 412 	269 	266
f 225 	33 	268
f 33 	29 	268
f 272 	255 	270
f 257 	272 	273
f 257 	273 	258
f 271 	380 	269
f 286 	380 	271
f 288 	258 	287
f 207 	275 	243
f 275 	207 	274
f 276 	243 	275
f 274 	277 	275
f 434 	451 	275
f 274 	207 	278
f 265 	280 	278
f 270 	433 	272
f 274 	278 	277
f 282 	279 	269
f 279 	280 	266
f 265 	266 	280
f 278 	280 	277
f 45 	23 	270
f 277 	280 	281
f 279 	281 	280
f 273 	272 	433
f 266 	269 	279
f 279 	282 	281
f 284 	285 	283
f 285 	286 	283
f 271 	283 	286
f 273 	287 	258
f 224 	433 	23
f 167 	465 	540
f 244 	239 	745
f 539 	489 	615
f 290 	539 	615
f 246 	297 	289
f 294 	292 	293
f 293 	292 	752
f 296 	315 	290
f 295 	291 	534
f 244 	745 	245
f 245 	745 	291
f 246 	291 	297
f 293 	309 	294
f 309 	297 	295
f 300 	584 	299
f 290 	615 	296
f 660 	298 	617
f 301 	587 	302
f 304 	289 	297
f 304 	297 	306
f 309 	306 	297
f 289 	304 	299
f 302 	300 	306
f 299 	306 	300
f 304 	306 	299
f 301 	302 	306
f 291 	295 	297
f 305 	308 	307
f 305 	307 	303
f 320 	173 	310
f 310 	16 	320
f 311 	583 	312
f 314 	312 	313
f 313 	316 	314
f 301 	316 	586
f 313 	586 	316
f 308 	305 	317
f 309 	318 	306
f 309 	16 	318
f 311 	318 	310
f 316 	318 	314
f 312 	314 	318
f 301 	306 	316
f 318 	316 	306
f 16 	310 	318
f 312 	318 	311
f 295 	294 	309
f 293 	752 	309
f 321 	322 	323
f 323 	490 	321
f 326 	327 	487
f 328 	329 	468
f 329 	330 	468
f 330 	461 	468
f 321 	328 	468
f 329 	494 	330
f 331 	137 	2
f 2 	47 	331
f 137 	138 	2
f 139 	2 	138
f 1 	134 	331
f 139 	148 	2
f 146 	2 	148
f 146 	8 	2
f 58 	74 	1
f 135 	13 	8
f 144 	145 	8
f 146 	144 	8
f 332 	287 	273
f 11 	8 	13
f 744 	333 	135
f 339 	337 	333
f 744 	150 	333
f 333 	155 	339
f 338 	336 	334
f 19 	11 	346
f 337 	335 	333
f 13 	333 	335
f 346 	337 	339
f 338 	334 	340
f 341 	342 	339
f 342 	343 	19
f 336 	338 	345
f 340 	344 	345
f 340 	345 	338
f 337 	346 	11
f 342 	19 	346
f 343 	348 	19
f 342 	341 	343
f 346 	339 	342
f 347 	345 	349
f 344 	349 	345
f 348 	343 	341
f 19 	348 	352
f 354 	352 	348
f 90 	94 	352
f 340 	334 	350
f 90 	352 	85
f 19 	352 	94
f 350 	351 	340
f 334 	351 	350
f 85 	352 	81
f 353 	364 	351
f 334 	353 	351
f 340 	355 	344
f 359 	344 	355
f 366 	351 	364
f 351 	366 	355
f 355 	340 	351
f 359 	358 	344
f 358 	360 	344
f 344 	360 	349
f 360 	358 	349
f 283 	363 	284
f 271 	372 	283
f 349 	358 	362
f 519 	362 	381
f 281 	286 	285
f 281 	285 	434
f 282 	269 	380
f 380 	281 	282
f 368 	375 	359
f 375 	358 	359
f 434 	285 	284
f 367 	368 	366
f 367 	366 	370
f 283 	369 	363
f 371 	283 	372
f 283 	371 	369
f 365 	373 	364
f 370 	366 	373
f 364 	373 	366
f 355 	368 	359
f 369 	436 	363
f 355 	366 	368
f 367 	374 	368
f 372 	459 	371
f 436 	369 	459
f 371 	459 	369
f 375 	376 	377
f 375 	377 	378
f 379 	378 	377
f 378 	358 	375
f 372 	271 	382
f 362 	358 	378
f 378 	381 	362
f 384 	381 	385
f 382 	569 	383
f 379 	385 	378
f 381 	378 	385
f 384 	386 	381
f 368 	374 	375
f 376 	375 	374
f 382 	383 	459
f 372 	382 	459
f 286 	281 	380
f 287 	332 	370
f 373 	288 	370
f 223 	230 	179
f 367 	370 	445
f 391 	179 	232
f 230 	232 	179
f 391 	187 	179
f 367 	445 	374
f 32 	168 	218
f 213 	219 	168
f 218 	168 	219
f 376 	631 	377
f 379 	377 	631
f 213 	222 	219
f 379 	633 	385
f 385 	633 	384
f 218 	117 	32
f 389 	390 	180
f 631 	376 	374
f 656 	126 	180
f 389 	180 	388
f 387 	384 	633
f 388 	126 	195
f 392 	181 	390
f 389 	195 	390
f 388 	195 	389
f 187 	390 	195
f 232 	181 	391
f 391 	392 	187
f 24 	48 	233
f 233 	107 	24
f 268 	642 	225
f 67 	602 	225
f 107 	188 	26
f 395 	26 	188
f 653 	394 	393
f 107 	26 	24
f 59 	394 	653
f 59 	61 	394
f 393 	394 	61
f 396 	393 	61
f 75 	396 	61
f 395 	195 	109
f 397 	398 	399
f 399 	398 	400
f 397 	552 	398
f 398 	402 	400
f 552 	572 	398
f 401 	405 	159
f 289 	406 	246
f 401 	159 	154
f 407 	246 	406
f 407 	32 	246
f 39 	38 	356
f 59 	642 	428
f 357 	409 	612
f 411 	618 	409
f 418 	410 	361
f 357 	410 	409
f 357 	361 	410
f 429 	408 	405
f 42 	417 	418
f 408 	682 	405
f 401 	429 	405
f 413 	411 	409
f 409 	410 	413
f 271 	758 	415
f 382 	271 	569
f 356 	38 	416
f 417 	413 	410
f 569 	271 	415
f 417 	410 	418
f 416 	418 	361
f 361 	356 	416
f 416 	41 	418
f 38 	41 	416
f 42 	425 	417
f 421 	548 	420
f 422 	205 	411
f 413 	422 	411
f 205 	422 	88
f 89 	422 	425
f 425 	91 	89
f 495 	496 	423
f 420 	427 	421
f 425 	46 	91
f 42 	46 	425
f 417 	425 	413
f 425 	422 	413
f 524 	424 	430
f 431 	154 	151
f 151 	654 	431
f 431 	401 	154
f 401 	431 	428
f 401 	428 	429
f 451 	432 	276
f 118 	432 	419
f 93 	84 	419
f 419 	432 	444
f 440 	435 	438
f 435 	273 	433
f 435 	626 	273
f 447 	439 	433
f 122 	194 	432
f 433 	438 	435
f 118 	122 	432
f 440 	441 	435
f 626 	435 	441
f 196 	243 	194
f 441 	440 	442
f 439 	443 	438
f 442 	438 	443
f 438 	442 	440
f 437 	419 	444
f 611 	447 	433
f 438 	433 	439
f 450 	444 	432
f 243 	276 	432
f 450 	432 	449
f 451 	452 	432
f 436 	437 	444
f 357 	448 	361
f 450 	436 	444
f 449 	434 	450
f 436 	450 	434
f 356 	34 	39
f 437 	576 	419
f 356 	361 	448
f 437 	436 	576
f 454 	455 	357
f 564 	568 	357
f 612 	454 	357
f 449 	432 	452
f 449 	452 	434
f 275 	277 	434
f 276 	275 	451
f 451 	434 	452
f 567 	585 	453
f 457 	34 	356
f 527 	430 	453
f 277 	281 	434
f 363 	436 	284
f 434 	284 	436
f 454 	612 	500
f 576 	577 	419
f 612 	614 	500
f 430 	566 	453
f 36 	34 	457
f 36 	457 	456
f 458 	456 	457
f 460 	563 	424
f 461 	330 	462
f 462 	334 	461
f 597 	458 	457
f 347 	468 	461
f 345 	347 	461
f 336 	461 	334
f 178 	465 	463
f 336 	345 	461
f 326 	556 	327
f 178 	540 	465
f 322 	321 	468
f 468 	467 	325
f 466 	467 	468
f 521 	470 	469
f 472 	473 	474
f 518 	319 	470
f 152 	636 	463
f 463 	167 	152
f 465 	167 	463
f 467 	477 	325
f 477 	476 	325
f 476 	473 	325
f 471 	325 	473
f 472 	475 	473
f 471 	473 	475
f 486 	469 	470
f 324 	322 	468
f 466 	468 	349
f 347 	349 	468
f 325 	324 	468
f 258 	480 	481
f 315 	479 	305
f 482 	481 	480
f 480 	484 	482
f 478 	756 	483
f 262 	484 	485
f 480 	485 	484
f 479 	317 	305
f 308 	317 	479
f 479 	315 	326
f 327 	486 	487
f 470 	487 	486
f 482 	484 	481
f 262 	263 	484
f 514 	523 	500
f 728 	727 	485
f 480 	729 	485
f 326 	487 	479
f 325 	488 	324
f 490 	324 	488
f 491 	492 	500
f 322 	324 	490
f 323 	322 	490
f 471 	488 	325
f 489 	305 	493
f 479 	319 	308
f 493 	491 	489
f 487 	319 	479
f 470 	319 	487
f 491 	500 	489
f 327 	556 	423
f 328 	321 	490
f 329 	328 	494
f 512 	492 	493
f 423 	496 	327
f 491 	493 	492
f 490 	494 	328
f 462 	330 	494
f 423 	424 	495
f 496 	486 	327
f 334 	462 	498
f 499 	486 	496
f 497 	496 	495
f 496 	497 	499
f 497 	469 	486
f 486 	499 	497
f 494 	498 	462
f 542 	498 	494
f 495 	526 	497
f 493 	643 	512
f 353 	498 	364
f 455 	454 	500
f 353 	334 	498
f 501 	488 	471
f 756 	564 	500
f 505 	503 	504
f 502 	501 	475
f 471 	475 	501
f 504 	506 	505
f 619 	478 	483
f 504 	507 	506
f 756 	500 	483
f 475 	472 	502
f 474 	502 	472
f 503 	505 	643
f 506 	643 	505
f 476 	509 	502
f 307 	308 	511
f 510 	511 	308
f 504 	503 	510
f 511 	510 	503
f 477 	509 	476
f 474 	473 	502
f 503 	643 	511
f 476 	502 	473
f 513 	500 	492
f 513 	514 	500
f 303 	307 	643
f 515 	514 	512
f 514 	513 	512
f 492 	512 	513
f 477 	467 	509
f 521 	518 	470
f 521 	516 	518
f 466 	509 	467
f 518 	516 	510
f 308 	319 	518
f 510 	308 	518
f 516 	504 	510
f 519 	509 	466
f 466 	349 	519
f 519 	724 	509
f 362 	519 	349
f 521 	517 	516
f 480 	730 	729
f 728 	485 	729
f 258 	731 	480
f 520 	517 	522
f 521 	469 	522
f 517 	521 	522
f 522 	469 	497
f 716 	533 	501
f 508 	500 	523
f 542 	494 	490
f 508 	483 	500
f 424 	524 	495
f 483 	508 	619
f 526 	525 	520
f 520 	522 	526
f 716 	501 	502
f 718 	502 	509
f 509 	722 	718
f 509 	724 	722
f 527 	524 	430
f 525 	526 	524
f 495 	524 	526
f 522 	497 	526
f 527 	525 	524
f 156 	540 	529
f 538 	490 	488
f 530 	531 	529
f 530 	532 	531
f 514 	515 	523
f 523 	619 	508
f 153 	532 	535
f 530 	535 	532
f 536 	538 	533
f 537 	538 	536
f 488 	533 	538
f 533 	534 	536
f 500 	615 	489
f 535 	530 	659
f 305 	539 	315
f 290 	315 	539
f 531 	532 	529
f 153 	675 	532
f 541 	538 	537
f 530 	529 	540
f 533 	716 	534
f 717 	534 	716
f 488 	501 	533
f 305 	489 	539
f 538 	541 	542
f 296 	549 	315
f 542 	490 	538
f 540 	662 	530
f 498 	542 	544
f 545 	364 	544
f 178 	543 	540
f 547 	407 	406
f 554 	667 	557
f 289 	299 	406
f 393 	396 	225
f 67 	225 	69
f 547 	406 	299
f 396 	68 	225
f 69 	225 	68
f 75 	68 	396
f 298 	667 	555
f 224 	225 	602
f 296 	617 	549
f 549 	298 	550
f 646 	645 	268
f 550 	315 	549
f 637 	635 	29
f 268 	648 	646
f 551 	552 	553
f 548 	557 	667
f 553 	552 	399
f 397 	399 	552
f 556 	555 	554
f 464 	36 	456
f 555 	667 	554
f 424 	423 	460
f 554 	423 	556
f 557 	423 	554
f 550 	298 	558
f 555 	558 	298
f 558 	555 	326
f 556 	326 	555
f 423 	426 	460
f 558 	326 	550
f 448 	591 	597
f 315 	550 	326
f 559 	460 	560
f 448 	597 	356
f 460 	561 	560
f 426 	562 	460
f 561 	460 	562
f 430 	424 	563
f 419 	548 	93
f 563 	460 	559
f 564 	357 	455
f 565 	430 	563
f 455 	500 	564
f 566 	430 	565
f 567 	453 	566
f 592 	593 	448
f 591 	448 	593
f 557 	588 	423
f 357 	595 	448
f 419 	573 	548
f 569 	415 	453
f 399 	685 	553
f 674 	453 	585
f 453 	674 	569
f 402 	398 	572
f 553 	570 	551
f 571 	551 	570
f 570 	781 	32
f 570 	32 	571
f 436 	459 	427
f 571 	575 	551
f 403 	402 	572
f 572 	552 	551
f 562 	427 	561
f 32 	578 	571
f 559 	560 	427
f 561 	427 	560
f 407 	574 	32
f 404 	403 	572
f 559 	427 	563
f 566 	565 	459
f 427 	459 	563
f 565 	563 	459
f 459 	567 	566
f 420 	548 	573
f 420 	573 	427
f 547 	574 	407
f 608 	596 	562
f 575 	572 	551
f 575 	571 	578
f 32 	574 	578
f 576 	436 	577
f 427 	577 	436
f 577 	573 	419
f 573 	577 	427
f 547 	572 	578
f 575 	578 	572
f 579 	383 	569
f 578 	574 	547
f 383 	579 	459
f 580 	581 	149
f 582 	149 	581
f 580 	675 	581
f 310 	173 	583
f 583 	311 	310
f 547 	299 	584
f 300 	302 	584
f 557 	548 	588
f 587 	584 	302
f 564 	756 	568
f 586 	587 	301
f 548 	594 	589
f 548 	589 	588
f 587 	313 	590
f 426 	423 	589
f 588 	589 	423
f 313 	587 	586
f 594 	605 	426
f 589 	594 	426
f 595 	357 	568
f 592 	448 	595
f 421 	596 	548
f 457 	356 	597
f 597 	591 	598
f 593 	598 	591
f 313 	312 	583
f 593 	592 	641
f 174 	590 	583
f 592 	595 	641
f 595 	568 	641
f 447 	443 	439
f 445 	442 	446
f 443 	446 	442
f 593 	641 	598
f 443 	599 	446
f 458 	597 	598
f 599 	600 	446
f 548 	596 	608
f 608 	601 	548
f 443 	600 	599
f 458 	598 	639
f 641 	639 	598
f 594 	548 	601
f 603 	605 	601
f 605 	594 	601
f 134 	74 	464
f 603 	606 	605
f 610 	605 	606
f 610 	426 	605
f 464 	638 	134
f 427 	596 	421
f 601 	606 	603
f 426 	610 	562
f 609 	611 	607
f 433 	224 	607
f 622 	134 	638
f 613 	607 	224
f 433 	607 	611
f 601 	608 	610
f 613 	609 	607
f 613 	224 	602
f 614 	612 	409
f 611 	609 	443
f 614 	409 	615
f 443 	609 	604
f 427 	562 	596
f 613 	604 	609
f 562 	610 	608
f 602 	604 	613
f 615 	500 	614
f 606 	601 	610
f 447 	611 	443
f 618 	411 	617
f 661 	660 	411
f 615 	409 	618
f 511 	643 	307
f 303 	493 	305
f 411 	205 	661
f 604 	602 	67
f 600 	604 	71
f 616 	619 	620
f 617 	296 	618
f 618 	296 	615
f 620 	621 	616
f 604 	600 	443
f 638 	630 	622
f 303 	643 	493
f 624 	625 	623
f 71 	133 	600
f 616 	478 	619
f 623 	205 	624
f 173 	320 	616
f 616 	621 	173
f 621 	620 	173
f 446 	600 	622
f 133 	622 	600
f 625 	624 	548
f 624 	216 	548
f 332 	273 	626
f 628 	698 	627
f 332 	626 	445
f 445 	370 	332
f 627 	620 	628
f 442 	445 	626
f 626 	441 	442
f 445 	446 	631
f 630 	631 	446
f 446 	622 	630
f 29 	650 	268
f 632 	29 	635
f 463 	636 	698
f 631 	374 	445
f 629 	632 	635
f 627 	698 	636
f 634 	633 	630
f 631 	630 	633
f 629 	635 	637
f 630 	638 	639
f 639 	640 	630
f 627 	636 	620
f 29 	655 	637
f 634 	630 	640
f 152 	620 	636
f 640 	639 	634
f 639 	456 	458
f 515 	512 	643
f 429 	428 	645
f 429 	645 	646
f 646 	648 	429
f 634 	639 	641
f 515 	643 	523
f 641 	568 	756
f 644 	642 	268
f 653 	225 	642
f 464 	456 	638
f 639 	638 	456
f 644 	268 	645
f 631 	633 	379
f 647 	648 	649
f 649 	650 	647
f 651 	59 	428
f 619 	523 	643
f 650 	632 	647
f 629 	408 	647
f 651 	740 	59
f 620 	619 	628
f 643 	628 	619
f 648 	268 	649
f 651 	431 	654
f 29 	37 	111
f 651 	428 	431
f 649 	268 	650
f 12 	108 	652
f 739 	651 	742
f 110 	109 	652
f 108 	121 	652
f 653 	642 	59
f 393 	225 	653
f 111 	37 	395
f 629 	647 	632
f 395 	109 	111
f 632 	650 	29
f 109 	195 	10
f 388 	180 	126
f 644 	428 	642
f 656 	768 	769
f 656 	657 	768
f 644 	645 	428
f 647 	429 	648
f 583 	590 	313
f 647 	408 	429
f 572 	658 	404
f 658 	664 	404
f 681 	408 	629
f 658 	572 	584
f 684 	161 	668
f 547 	584 	572
f 664 	666 	404
f 658 	584 	664
f 582 	153 	659
f 660 	661 	663
f 584 	587 	664
f 617 	411 	660
f 659 	530 	662
f 661 	665 	663
f 625 	667 	623
f 661 	623 	667
f 661 	667 	665
f 666 	679 	580
f 582 	581 	675
f 580 	404 	666
f 160 	659 	668
f 205 	623 	661
f 663 	298 	660
f 298 	549 	617
f 663 	665 	298
f 668 	662 	669
f 667 	298 	665
f 548 	667 	625
f 662 	689 	669
f 666 	664 	587
f 675 	580 	679
f 675 	676 	532
f 666 	587 	679
f 590 	679 	587
f 585 	579 	674
f 532 	676 	529
f 673 	677 	671
f 678 	671 	677
f 156 	529 	177
f 676 	177 	529
f 671 	678 	670
f 569 	674 	579
f 579 	585 	459
f 567 	459 	585
f 590 	676 	675
f 670 	678 	680
f 662 	672 	689
f 764 	690 	680
f 735 	689 	733
f 747 	746 	672
f 659 	662 	668
f 680 	678 	198
f 662 	540 	672
f 679 	590 	675
f 763 	766 	677
f 764 	680 	189
f 590 	174 	676
f 177 	676 	174
f 543 	750 	672
f 671 	682 	681
f 403 	683 	402
f 400 	402 	683
f 672 	540 	543
f 683 	399 	400
f 683 	685 	399
f 161 	684 	412
f 682 	408 	681
f 682 	691 	405
f 687 	684 	668
f 159 	691 	231
f 686 	683 	774
f 669 	687 	668
f 686 	688 	683
f 688 	685 	683
f 690 	341 	231
f 686 	777 	688
f 682 	670 	691
f 682 	671 	670
f 758 	687 	692
f 687 	669 	692
f 669 	689 	692
f 412 	684 	759
f 673 	671 	681
f 684 	687 	754
f 699 	628 	506
f 110 	693 	111
f 694 	695 	655
f 178 	463 	698
f 643 	506 	628
f 697 	673 	694
f 695 	629 	637
f 695 	637 	655
f 699 	506 	507
f 696 	629 	695
f 700 	628 	699
f 698 	628 	700
f 693 	697 	694
f 693 	694 	655
f 693 	655 	29
f 701 	702 	703
f 178 	698 	543
f 701 	704 	702
f 704 	706 	702
f 706 	707 	702
f 709 	703 	708
f 703 	702 	708
f 507 	705 	699
f 700 	699 	705
f 708 	693 	711
f 709 	708 	711
f 516 	705 	504
f 702 	712 	708
f 504 	705 	507
f 29 	111 	693
f 710 	711 	693
f 708 	712 	693
f 112 	710 	110
f 693 	110 	710
f 712 	677 	697
f 712 	702 	677
f 697 	693 	712
f 703 	709 	711
f 704 	118 	706
f 703 	710 	701
f 725 	713 	705
f 701 	118 	704
f 714 	705 	516
f 706 	118 	707
f 705 	713 	700
f 711 	710 	703
f 118 	701 	710
f 112 	118 	710
f 118 	419 	84
f 216 	215 	548
f 698 	700 	713
f 746 	747 	713
f 387 	634 	748
f 634 	641 	756
f 387 	633 	634
f 520 	714 	517
f 714 	516 	517
f 541 	546 	542
f 545 	544 	546
f 542 	546 	544
f 714 	520 	715
f 365 	364 	545
f 498 	544 	364
f 718 	719 	720
f 525 	715 	520
f 525 	528 	715
f 716 	502 	718
f 716 	718 	720
f 716 	720 	717
f 718 	721 	719
f 723 	721 	722
f 718 	722 	721
f 722 	726 	723
f 746 	713 	725
f 735 	733 	725
f 714 	725 	705
f 724 	386 	726
f 724 	726 	722
f 714 	732 	725
f 381 	724 	519
f 381 	386 	724
f 715 	732 	714
f 258 	288 	731
f 730 	480 	731
f 736 	734 	732
f 713 	750 	698
f 546 	541 	730
f 733 	746 	725
f 546 	730 	545
f 734 	735 	725
f 737 	736 	732
f 725 	732 	734
f 717 	720 	292
f 689 	735 	734
f 734 	736 	689
f 721 	723 	749
f 737 	732 	738
f 689 	736 	692
f 738 	692 	737
f 736 	737 	692
f 723 	726 	749
f 742 	654 	741
f 739 	740 	651
f 386 	387 	726
f 60 	59 	740
f 384 	387 	386
f 131 	73 	740
f 739 	131 	740
f 654 	742 	651
f 728 	537 	291
f 534 	291 	536
f 294 	295 	534
f 745 	727 	291
f 727 	728 	291
f 730 	731 	545
f 60 	740 	73
f 541 	537 	729
f 536 	291 	537
f 365 	545 	731
f 731 	288 	365
f 287 	370 	288
f 729 	730 	541
f 743 	741 	744
f 654 	744 	741
f 744 	654 	226
f 373 	365 	288
f 226 	150 	744
f 654 	150 	226
f 13 	135 	333
f 739 	742 	131
f 742 	741 	131
f 741 	743 	131
f 719 	292 	720
f 485 	727 	262
f 20 	692 	738
f 263 	262 	727
f 260 	263 	745
f 745 	236 	260
f 672 	733 	689
f 727 	745 	263
f 750 	713 	747
f 728 	729 	537
f 733 	672 	746
f 387 	748 	749
f 751 	749 	748
f 751 	748 	752
f 543 	698 	750
f 756 	748 	634
f 292 	719 	751
f 750 	747 	672
f 753 	751 	752
f 292 	753 	752
f 534 	717 	294
f 292 	294 	717
f 749 	726 	387
f 719 	721 	749
f 749 	751 	719
f 292 	751 	753
f 309 	752 	755
f 755 	15 	14
f 453 	757 	527
f 755 	16 	309
f 14 	16 	755
f 415 	414 	453
f 757 	453 	414
f 748 	756 	755
f 757 	732 	715
f 715 	528 	757
f 528 	525 	757
f 525 	527 	757
f 752 	748 	755
f 414 	761 	757
f 21 	20 	757
f 756 	17 	755
f 15 	755 	17
f 20 	738 	732
f 687 	758 	754
f 17 	756 	478
f 18 	17 	616
f 478 	616 	17
f 759 	754 	412
f 754 	269 	412
f 695 	673 	681
f 754 	759 	684
f 681 	696 	695
f 695 	694 	673
f 681 	629 	696
f 754 	758 	271
f 690 	231 	760
f 21 	757 	761
f 690 	691 	670
f 761 	414 	758
f 414 	415 	758
f 691 	690 	760
f 159 	405 	691
f 692 	21 	758
f 231 	691 	760
f 761 	758 	21
f 673 	697 	677
f 754 	271 	269
f 732 	757 	20
f 763 	677 	762
f 762 	677 	707
f 702 	707 	677
f 690 	670 	680
f 692 	20 	21
f 348 	341 	690
f 764 	765 	690
f 765 	354 	690
f 766 	767 	678
f 176 	175 	768
f 678 	677 	766
f 768 	128 	769
f 128 	203 	769
f 767 	766 	84
f 768 	180 	176
f 84 	763 	762
f 768 	657 	180
f 763 	84 	766
f 175 	128 	768
f 354 	765 	352
f 352 	765 	770
f 80 	352 	770
f 127 	656 	4
f 769 	203 	772
f 765 	764 	770
f 10 	195 	127
f 354 	348 	690
f 198 	678 	199
f 198 	183 	680
f 4 	656 	771
f 772 	771 	656
f 764 	80 	770
f 769 	772 	656
f 81 	80 	764
f 203 	204 	772
f 764 	189 	81
f 5 	771 	3
f 84 	762 	118
f 4 	771 	5
f 707 	118 	762
f 124 	773 	125
f 80 	81 	352
f 7 	6 	773
f 771 	773 	6
f 767 	199 	678
f 773 	771 	772
f 773 	124 	9
f 773 	9 	7
f 771 	6 	3
f 4 	10 	127
f 4 	5 	10
f 3 	10 	5
f 404 	774 	403
f 403 	774 	683
f 404 	580 	774
f 774 	580 	149
f 774 	149 	775
f 160 	775 	149
f 161 	778 	160
f 774 	775 	686
f 776 	777 	686
f 776 	191 	777
f 132 	688 	777
f 776 	267 	191
f 191 	227 	777
f 227 	132 	777
f 775 	160 	778
f 778 	776 	775
f 776 	686 	775
f 161 	264 	778
f 264 	776 	778
f 264 	267 	776
f 787 	786 	164
f 782 	164 	786
f 781 	779 	32
f 787 	168 	779
f 32 	779 	168
f 784 	123 	164
f 779 	781 	780
f 781 	570 	553
f 553 	780 	781
f 784 	164 	783
f 164 	782 	783
f 165 	164 	123
f 123 	785 	98
f 784 	783 	785
f 784 	785 	123
f 123 	170 	165
f 783 	782 	780
f 786 	780 	782
f 98 	785 	129
f 785 	783 	780
f 785 	780 	129
f 685 	129 	780
f 129 	685 	688
f 780 	786 	779
f 787 	779 	786
f 685 	780 	553
# 1570 faces

#end of obj_0
`;

var firTree1 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0

newmtl color_1206582
Ka 0 0 0 
Kd 0.07058823529411765 0.4117647058823529 0.21176470588235294
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -47.522 		-49.859 		0.534
v -47.614 		-49.984 		0.534
v -47.648 		-50.155 		0.534
v -47.457 		-50.275 		0.534
v -47.412 		-50.285 		0.534
v -47.412 		-50.285 		0
v -47.457 		-50.275 		0
v -47.614 		-50.326 		0.534
v -47.457 		-50.144 		0.534
v -47.522 		-50.451 		0.534
v -47.179 		-49.984 		0.534
v -47.271 		-49.859 		0.534
v -47.396 		-49.813 		0.534
v -47.412 		-50.134 		0.534
v -47.501 		-50.209 		0.534
v -47.396 		-50.496 		0.534
v -47.271 		-50.451 		0.534
v -47.396 		-50.155 		1.059
v -47.489 		-50.172 		0.534
v -47.457 		-50.144 		0
v -47.489 		-50.172 		0
v -47.501 		-50.209 		0
v -47.322 		-50.209 		0.534
v -47.145 		-50.155 		0.534
v -47.489 		-50.247 		0.534
v -47.489 		-50.247 		0
v -47.367 		-50.275 		0.534
v -47.334 		-50.247 		0
v -47.322 		-50.209 		0
v -47.334 		-50.247 		0.534
v -47.367 		-50.275 		0
v -47.334 		-50.172 		0.534
v -47.334 		-50.172 		0
v -47.367 		-50.144 		0.534
v -47.367 		-50.144 		0
v -47.412 		-50.134 		0
v -47.179 		-50.326 		0.534
# 37 vertices

g group_0_1206582

usemtl color_1206582
s 0

f 3 	8 	18
f 15 	25 	8
f 8 	3 	15
f 19 	15 	3
f 3 	2 	19
f 1 	9 	2
f 9 	1 	14
f 32 	34 	11
f 11 	24 	32
f 23 	32 	24
f 30 	23 	37
f 25 	4 	8
f 10 	8 	4
f 5 	27 	16
f 18 	12 	13
f 13 	1 	18
f 17 	18 	16
f 18 	1 	2
f 2 	3 	18
f 11 	12 	18
f 18 	8 	10
f 10 	16 	18
f 17 	16 	27
f 34 	14 	12
f 12 	11 	34
f 27 	30 	17
f 24 	37 	23
f 13 	12 	14
f 13 	14 	1
f 19 	2 	9
f 17 	30 	37
f 4 	5 	10
f 10 	5 	16
f 37 	18 	17
f 24 	18 	37
f 24 	11 	18
# 36 faces

g group_0_11107152

usemtl color_11107152
s 0

f 6 	5 	4
f 6 	4 	7
f 20 	21 	19
f 20 	19 	9
f 21 	22 	15
f 21 	15 	19
f 26 	25 	15
f 26 	15 	22
f 7 	4 	25
f 7 	25 	26
f 28 	29 	23
f 28 	23 	30
f 31 	27 	5
f 31 	5 	6
f 29 	33 	32
f 29 	32 	23
f 31 	28 	30
f 31 	30 	27
f 33 	35 	34
f 33 	34 	32
f 35 	36 	14
f 35 	14 	34
f 36 	20 	9
f 36 	9 	14
f 22 	21 	26
f 7 	26 	21
f 21 	20 	7
f 6 	7 	20
f 6 	20 	36
f 6 	36 	35
f 33 	31 	35
f 29 	28 	33
f 31 	33 	28
f 6 	35 	31
# 34 faces

#end of obj_0

`;
var firTree2 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_1206582
Ka 0 0 0 
Kd 0.07058823529411765 0.4117647058823529 0.21176470588235294
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -49.133 		-50.055 		1.132
v -49.192 		-50.228 		1.132
v -49.158 		-50.411 		1.132
v -49.1103 		-49.9768 		0.723
v -49.14 		-49.892 		0.723
v -49.2108 		-50.0958 		0.723
v -48.947 		-50.128 		0
v -49.011 		-50.145 		0
v -49.28 		-50.046 		0.723
v -49.011 		-50.145 		0.534
v -48.947 		-50.128 		0.534
v -49.086 		-50.1685 		1.132
v -48.947 		-50.391 		0
v -49.011 		-50.373 		0
v -49.2473 		-50.259 		0.723
v -49.058 		-50.325 		0
v -49.058 		-50.193 		0.534
v -49.331 		-50.255 		0.723
v -49.075 		-50.259 		0
v -49.058 		-50.193 		0
v -48.883 		-50.145 		0
v -48.836 		-50.193 		0
v -49.2108 		-50.4216 		0.723
v -48.819 		-50.259 		0
v -48.836 		-50.325 		0
v -49.28 		-50.464 		0.723
v -48.883 		-50.373 		0
v -48.705 		-50.281 		1.132
v -48.853 		-49.975 		1.132
v -49.075 		-50.259 		0.534
v -48.739 		-50.098 		1.132
v -49.003 		-49.958 		1.132
v -49.1103 		-50.5412 		0.723
v -49.14 		-50.618 		0.723
v -48.758 		-50.618 		0.723
v -48.618 		-50.464 		0.723
v -48.8699 		-50.4053 		1.132
v -49.1072 		-50.255 		1.132
v -48.883 		-50.373 		0.534
v -48.947 		-50.391 		0.534
v -49.086 		-50.3415 		1.132
v -49.0281 		-50.4053 		1.132
v -48.836 		-50.325 		0.534
v -48.949 		-50.674 		0.723
v -48.949 		-50.4285 		1.132
v -48.8699 		-50.1047 		1.132
v -48.974 		-50.768 		0.534
v -48.949 		-50.0815 		1.132
v -48.76 		-50.7 		0.534
v -48.837 		-50.5412 		0.723
v -48.974 		-50.5848 		0.723
v -49.0281 		-50.1047 		1.132
v -48.603 		-50.513 		0.534
v -48.7366 		-50.4216 		0.723
v -49.187 		-49.818 		0.534
v -49.344 		-50.004 		0.534
v -48.948 		-50.254 		1.746
v -48.812 		-50.3415 		1.132
v -49.401 		-50.259 		0.534
v -48.893 		-50.55 		1.132
v -48.764 		-50.453 		1.132
v -49.344 		-50.513 		0.534
v -49.044 		-50.534 		1.132
v -49.187 		-50.7 		0.534
v -48.819 		-50.259 		0.534
v -48.836 		-50.193 		0.534
v -48.7908 		-50.255 		1.132
v -48.812 		-50.1685 		1.132
v -48.883 		-50.145 		0.534
v -49.058 		-50.325 		0.534
v -48.949 		-49.836 		0.723
v -48.567 		-50.255 		0.723
v -49.011 		-50.373 		0.534
v -48.618 		-50.046 		0.723
v -48.837 		-49.9768 		0.723
v -48.758 		-49.892 		0.723
v -48.974 		-49.75 		0.534
v -48.974 		-49.9332 		0.723
v -48.546 		-50.259 		0.534
v -48.7001 		-50.259 		0.723
v -48.603 		-50.004 		0.534
v -48.7366 		-50.0958 		0.723
v -48.76 		-49.818 		0.534
# 83 vertices

g group_0_1206582

usemtl color_1206582
s 0

f 6 	9 	4
f 5 	4 	9
f 12 	52 	9
f 15 	18 	6
f 9 	6 	18
f 17 	56 	10
f 18 	15 	23
f 18 	23 	26
f 30 	59 	17
f 26 	23 	33
f 26 	33 	34
f 36 	37 	35
f 38 	12 	18
f 9 	18 	12
f 26 	41 	18
f 18 	41 	38
f 41 	26 	42
f 34 	42 	26
f 42 	34 	45
f 32 	29 	48
f 44 	45 	34
f 48 	52 	32
f 1 	32 	52
f 50 	51 	49
f 47 	49 	51
f 2 	1 	12
f 12 	38 	2
f 54 	50 	53
f 49 	53 	50
f 3 	2 	38
f 38 	41 	3
f 12 	1 	52
f 6 	4 	56
f 55 	56 	4
f 28 	31 	57
f 15 	6 	59
f 56 	59 	6
f 33 	64 	51
f 60 	61 	57
f 61 	28 	57
f 59 	62 	23
f 59 	23 	15
f 62 	64 	33
f 62 	33 	23
f 63 	60 	57
f 37 	45 	35
f 44 	35 	45
f 47 	73 	40
f 40 	39 	49
f 47 	40 	49
f 47 	51 	64
f 35 	44 	50
f 50 	54 	35
f 51 	50 	44
f 34 	51 	44
f 67 	28 	58
f 31 	28 	67
f 67 	68 	31
f 36 	35 	54
f 46 	48 	29
f 68 	46 	31
f 62 	59 	70
f 70 	73 	62
f 30 	70 	59
f 59 	56 	17
f 55 	10 	56
f 29 	31 	46
f 33 	51 	34
f 45 	37 	60
f 37 	58 	61
f 60 	37 	61
f 77 	83 	11
f 47 	64 	73
f 64 	62 	73
f 41 	42 	3
f 63 	3 	42
f 42 	45 	63
f 60 	63 	45
f 46 	76 	48
f 58 	37 	36
f 11 	10 	77
f 52 	48 	5
f 71 	5 	48
f 36 	72 	58
f 67 	58 	72
f 5 	9 	52
f 74 	68 	72
f 68 	67 	72
f 31 	29 	57
f 29 	32 	57
f 68 	74 	46
f 76 	46 	74
f 32 	1 	57
f 75 	83 	78
f 71 	48 	76
f 1 	2 	57
f 4 	78 	55
f 77 	55 	78
f 2 	3 	57
f 80 	54 	79
f 53 	79 	54
f 79 	81 	82
f 79 	82 	80
f 3 	63 	57
f 81 	83 	75
f 81 	75 	82
f 77 	78 	83
f 69 	11 	83
f 55 	77 	10
f 53 	43 	79
f 43 	65 	79
f 65 	66 	79
f 81 	79 	66
f 66 	69 	81
f 83 	81 	69
f 78 	71 	75
f 43 	53 	39
f 53 	49 	39
f 36 	80 	72
f 72 	80 	74
f 82 	74 	80
f 54 	80 	36
f 71 	78 	5
f 75 	76 	82
f 74 	82 	76
f 28 	61 	58
f 71 	76 	75
f 5 	78 	4
# 128 faces

g group_0_11107152

usemtl color_11107152
s 0

f 7 	8 	10
f 7 	10 	11
f 16 	19 	14
f 13 	14 	19
f 13 	19 	20
f 13 	20 	8
f 13 	8 	7
f 13 	7 	21
f 13 	21 	22
f 13 	22 	24
f 25 	27 	24
f 13 	24 	27
f 8 	20 	17
f 8 	17 	10
f 27 	39 	40
f 27 	40 	13
f 20 	19 	30
f 20 	30 	17
f 27 	25 	43
f 27 	43 	39
f 25 	24 	65
f 25 	65 	43
f 24 	22 	66
f 24 	66 	65
f 22 	21 	69
f 22 	69 	66
f 21 	7 	11
f 21 	11 	69
f 16 	70 	30
f 16 	30 	19
f 16 	14 	73
f 16 	73 	70
f 13 	40 	73
f 13 	73 	14
# 34 faces

#end of obj_0

`;
var firTree3 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_1206582
Ka 0 0 0 
Kd 0.07058823529411765 0.4117647058823529 0.21176470588235294
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -51.045 		-50.075 		1.127
v -50.2937 		-50.506 		1.127
v -50.3425 		-50.3122 		1.127
v -50.8193 		-50.3071 		1.583
v -50.222 		-50.16 		1.127
v -50.7076 		-50.2276 		1.583
v -50.8372 		-50.3565 		1.583
v -50.655 		-50.8937 		1.127
v -50.842 		-50.361 		1.583
v -50.46 		-49.915 		1.127
v -50.872 		-50.464 		1.583
v -50.842 		-50.361 		1.5782
v -50.872 		-50.464 		1.5765
v -50.761 		-50.286 		0.669
v -50.842 		-50.361 		0.669
v -51.025 		-49.818 		0.669
v -50.761 		-50.286 		0
v -50.842 		-50.361 		0
v -51.169 		-50.419 		1.127
v -50.8556 		-50.4076 		1.583
v -50.8707 		-50.4495 		1.583
v -50.4743 		-50.1701 		1.127
v -50.775 		-49.883 		1.127
v -50.968 		-50.3122 		1.127
v -50.8695 		-50.4554 		1.583
v -50.871 		-50.4604 		1.583
v -51.296 		-50.109 		0.669
v -50.8704 		-50.4585 		1.5807
v -51.098 		-50.782 		1.127
v -50.655 		-50.1178 		1.127
v -51.0163 		-50.506 		1.127
v -50.655 		-49.711 		0.669
v -50.8357 		-50.1701 		1.127
v -51.395 		-50.506 		0.669
v -50.872 		-50.464 		0.669
v -50.968 		-50.6998 		1.127
v -51.296 		-50.903 		0.669
v -50.65 		-50.259 		0.669
v -50.872 		-50.464 		0
v -50.652 		-50.456 		2.361
v -51.025 		-51.194 		0.669
v -51.015 		-50.7 		1.583
v -50.655 		-51.3 		0.669
v -50.285 		-51.194 		0.669
v -50.557 		-50.918 		1.583
v -50.333 		-50.767 		1.583
v -50.818 		-50.892 		1.583
v -50.6124 		-50.7148 		1.583
v -50.545 		-51.06 		1.127
v -50.274 		-50.868 		1.127
v -50.972 		-50.145 		1.583
v -50.7424 		-50.7011 		1.583
v -49.915 		-50.506 		0.669
v -50.015 		-50.109 		0.669
v -50.859 		-51.027 		1.127
v -50.285 		-49.818 		0.669
v -50.429 		-50.464 		1.583
v -50.4743 		-50.8419 		1.127
v -50.429 		-50.464 		0.669
v -50.8413 		-50.5997 		1.583
v -50.8593 		-50.5076 		1.583
v -50.842 		-50.567 		0.669
v -51.074 		-50.415 		1.583
v -50.487 		-50.02 		1.583
v -50.842 		-50.567 		0
v -50.761 		-50.642 		0.669
v -50.761 		-50.642 		0
v -50.3425 		-50.6998 		1.127
v -50.65 		-50.67 		0.669
v -50.015 		-50.903 		0.669
v -50.65 		-50.67 		0
v -50.5772 		-50.2409 		1.583
v -50.8357 		-50.8419 		1.127
v -50.748 		-49.994 		1.583
v -50.65 		-50.259 		0
v -50.54 		-50.286 		0
v -50.459 		-50.361 		0
v -50.429 		-50.464 		0
v -50.459 		-50.567 		0
v -50.54 		-50.642 		0
v -50.231 		-50.497 		1.583
v -50.5002 		-50.6353 		1.583
v -50.4335 		-50.4486 		1.583
v -50.4396 		-50.4274 		1.583
v -50.4301 		-50.4602 		1.543
v -50.429 		-50.464 		1.5425
v -50.54 		-50.642 		0.669
v -50.459 		-50.361 		1.583
v -50.459 		-50.361 		1.5579
v -50.4841 		-50.5903 		1.583
v -50.459 		-50.567 		1.583
v -50.289 		-50.212 		1.583
v -50.459 		-50.567 		1.5582
v -50.459 		-50.567 		0.669
v -50.151 		-50.524 		1.127
v -50.459 		-50.361 		0.669
v -50.4378 		-50.4941 		1.5653
v -50.4786 		-50.3428 		1.583
v -50.4787 		-50.3423 		1.583
v -50.54 		-50.286 		0.669
# 100 vertices

g group_0_1206582

usemtl color_1206582
s 0

f 42 	63 	61
f 23 	1 	6
f 21 	25 	63
f 10 	5 	22
f 22 	30 	10
f 13 	19 	29
f 12 	19 	20
f 1 	33 	24
f 31 	19 	24
f 1 	24 	19
f 26 	11 	63
f 4 	6 	1
f 24 	33 	27
f 33 	16 	27
f 21 	19 	25
f 28 	25 	19
f 11 	61 	63
f 23 	10 	30
f 33 	23 	30
f 22 	5 	3
f 32 	30 	56
f 22 	56 	30
f 29 	19 	31
f 31 	36 	29
f 19 	13 	28
f 31 	24 	34
f 27 	34 	24
f 33 	30 	16
f 32 	16 	30
f 36 	73 	29
f 34 	37 	36
f 34 	36 	31
f 56 	100 	32
f 38 	14 	32
f 15 	16 	14
f 41 	73 	37
f 34 	27 	35
f 35 	62 	34
f 15 	35 	27
f 16 	15 	27
f 45 	46 	40
f 40 	47 	45
f 60 	52 	42
f 82 	46 	48
f 47 	48 	45
f 40 	92 	64
f 49 	50 	48
f 47 	42 	52
f 48 	47 	52
f 53 	54 	3
f 53 	3 	2
f 29 	55 	52
f 3 	54 	22
f 56 	22 	54
f 55 	49 	48
f 55 	48 	52
f 50 	49 	58
f 8 	58 	49
f 55 	8 	49
f 29 	73 	55
f 59 	96 	54
f 56 	54 	96
f 53 	59 	54
f 9 	20 	63
f 51 	9 	63
f 20 	21 	63
f 25 	26 	63
f 60 	42 	61
f 40 	64 	74
f 21 	20 	19
f 12 	7 	1
f 19 	12 	1
f 13 	29 	61
f 60 	61 	29
f 23 	33 	1
f 37 	34 	62
f 52 	60 	29
f 8 	43 	44
f 8 	44 	58
f 37 	62 	66
f 58 	68 	50
f 68 	58 	70
f 44 	70 	58
f 53 	68 	70
f 8 	55 	73
f 36 	37 	73
f 40 	63 	42
f 41 	43 	8
f 8 	73 	41
f 74 	64 	72
f 42 	47 	40
f 69 	87 	44
f 70 	44 	87
f 44 	43 	69
f 66 	69 	41
f 41 	69 	43
f 37 	66 	41
f 40 	74 	51
f 72 	5 	10
f 51 	63 	40
f 40 	46 	81
f 72 	6 	74
f 82 	90 	46
f 45 	48 	46
f 72 	10 	6
f 23 	6 	10
f 40 	81 	92
f 50 	82 	48
f 93 	90 	50
f 83 	81 	57
f 87 	94 	70
f 98 	99 	92
f 95 	5 	86
f 81 	46 	91
f 57 	81 	91
f 91 	46 	90
f 82 	50 	90
f 59 	53 	94
f 53 	70 	94
f 92 	81 	84
f 83 	84 	81
f 93 	50 	95
f 88 	98 	92
f 88 	92 	84
f 95 	97 	93
f 86 	97 	95
f 85 	86 	5
f 89 	85 	5
f 50 	68 	95
f 98 	89 	99
f 5 	99 	89
f 2 	95 	68
f 5 	95 	3
f 2 	3 	95
f 53 	2 	68
f 99 	72 	92
f 64 	92 	72
f 99 	5 	72
f 38 	32 	100
f 96 	100 	56
f 4 	51 	6
f 74 	6 	51
f 4 	1 	7
f 32 	14 	16
f 4 	7 	51
f 9 	51 	7
# 146 faces

g group_0_11107152

usemtl color_11107152
s 0

f 12 	9 	7
f 17 	18 	15
f 17 	15 	14
f 12 	20 	9
f 26 	25 	28
f 11 	26 	13
f 28 	13 	26
f 18 	39 	35
f 18 	35 	15
f 13 	61 	11
f 65 	62 	35
f 65 	35 	39
f 67 	66 	62
f 67 	62 	65
f 71 	69 	66
f 71 	66 	67
f 39 	18 	65
f 67 	65 	18
f 18 	17 	67
f 17 	75 	67
f 71 	67 	75
f 76 	80 	75
f 77 	80 	76
f 78 	79 	77
f 80 	77 	79
f 71 	75 	80
f 80 	87 	69
f 80 	69 	71
f 93 	91 	90
f 80 	79 	94
f 80 	94 	87
f 84 	83 	85
f 83 	57 	85
f 86 	85 	57
f 88 	84 	89
f 85 	89 	84
f 57 	91 	97
f 93 	97 	91
f 78 	77 	96
f 78 	96 	59
f 97 	86 	57
f 79 	78 	59
f 79 	59 	94
f 89 	98 	88
f 77 	76 	100
f 77 	100 	96
f 76 	75 	38
f 76 	38 	100
f 75 	17 	14
f 75 	14 	38
# 50 faces

#end of obj_0

`;
var firTree4 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_1206582
Ka 0 0 0 
Kd 0.07058823529411765 0.4117647058823529 0.21176470588235294
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -53.755 		-50.457 		2.435
v -53.861 		-49.61 		1.583
v -53.2733 		-50.6515 		2.435
v -52.8418 		-50.5463 		2.435
v -53.126 		-50.615 		0.817
v -53.501 		-50.2502 		2.435
v -53.126 		-49.929 		0.817
v -53.288 		-49.975 		0.817
v -53.345 		-49.282 		1.583
v -53.757 		-49.059 		0.817
v -52.9791 		-49.9189 		2.435
v -53.126 		-49.929 		0
v -53.466 		-50.885 		2.435
v -53.288 		-49.975 		0
v -53.0413 		-50.6728 		2.435
v -52.907 		-51.288 		1.583
v -53.108 		-50.8638 		1.583
v -52.8169 		-50.7813 		1.583
v -52.391 		-50.961 		1.583
v -53.507 		-51.233 		1.583
v -53.108 		-51.621 		0.817
v -52.459 		-51.437 		0.817
v -53.4102 		-50.024 		2.435
v -51.984 		-50.934 		0.817
v -53.3991 		-50.7813 		1.583
v -52.964 		-50.569 		0.817
v -52.964 		-50.569 		0
v -53.126 		-50.615 		0
v -53.2107 		-49.8972 		2.435
v -53.673 		-49.939 		2.435
v -52.845 		-50.444 		0.817
v -52.845 		-50.444 		0
v -53.268 		-49.634 		2.435
v -52.802 		-50.272 		0.817
v -53.288 		-50.569 		0
v -53.407 		-50.444 		0
v -53.451 		-50.272 		0
v -52.802 		-50.272 		0
v -53.407 		-50.101 		0
v -52.964 		-49.975 		0
v -52.845 		-50.101 		0
v -53.407 		-50.101 		0.817
v -53.451 		-50.272 		0.817
v -52.49 		-50.148 		2.435
v -53.4488 		-50.4899 		2.435
v -52.751 		-50.3198 		2.435
v -52.8169 		-49.7147 		1.583
v -53.108 		-49.6322 		1.583
v -53.108 		-48.875 		0.817
v -53.3991 		-49.7147 		1.583
v -53.407 		-50.444 		0.817
v -52.156 		-50.375 		1.583
v -52.778 		-49.721 		2.435
v -53.122 		-50.303 		3.825
v -54.096 		-50.195 		1.583
v -53.288 		-50.569 		0.817
v -53.6126 		-49.9403 		1.583
v -52.8032 		-50.0801 		2.435
v -54.233 		-49.562 		0.817
v -53.961 		-50.815 		1.583
v -53.6906 		-50.248 		1.583
v -54.407 		-50.248 		0.817
v -52.6039 		-50.5557 		1.583
v -52.845 		-50.101 		0.817
v -53.6126 		-50.5557 		1.583
v -52.291 		-49.755 		1.583
v -54.233 		-50.934 		0.817
v -52.5258 		-50.248 		1.583
v -53.757 		-51.437 		0.817
v -51.81 		-50.248 		0.817
v -52.746 		-49.338 		1.583
v -52.964 		-49.975 		0.817
v -52.6039 		-49.9403 		1.583
v -51.984 		-49.562 		0.817
v -52.572 		-50.666 		2.435
v -52.459 		-49.059 		0.817
v -52.976 		-50.971 		2.435
# 77 vertices

g group_0_1206582

usemtl color_1206582
s 0

f 15 	77 	3
f 6 	45 	1
f 13 	1 	45
f 45 	3 	13
f 3 	20 	15
f 19 	16 	18
f 17 	18 	16
f 17 	21 	22
f 17 	22 	18
f 16 	15 	20
f 18 	63 	19
f 63 	18 	24
f 22 	24 	18
f 17 	20 	25
f 16 	20 	17
f 25 	69 	17
f 24 	22 	26
f 26 	31 	24
f 5 	26 	22
f 21 	69 	5
f 34 	64 	70
f 11 	29 	33
f 11 	33 	53
f 23 	6 	30
f 42 	59 	8
f 1 	30 	6
f 29 	23 	33
f 44 	75 	46
f 55 	6 	23
f 6 	55 	45
f 48 	76 	49
f 76 	48 	47
f 19 	52 	4
f 48 	50 	9
f 46 	58 	44
f 60 	3 	45
f 50 	48 	10
f 49 	10 	48
f 58 	46 	52
f 69 	67 	56
f 11 	71 	29
f 8 	10 	7
f 76 	7 	49
f 23 	29 	2
f 54 	75 	44
f 23 	2 	55
f 9 	71 	48
f 56 	5 	69
f 60 	45 	55
f 9 	29 	71
f 9 	50 	2
f 2 	50 	57
f 61 	65 	55
f 2 	57 	55
f 22 	21 	5
f 57 	50 	59
f 50 	10 	59
f 77 	75 	54
f 20 	3 	60
f 58 	52 	66
f 57 	61 	55
f 60 	55 	65
f 71 	11 	66
f 61 	57 	62
f 59 	62 	57
f 63 	68 	52
f 19 	63 	52
f 65 	25 	60
f 62 	67 	65
f 62 	65 	61
f 58 	66 	11
f 30 	1 	54
f 20 	60 	25
f 68 	73 	66
f 66 	52 	68
f 11 	53 	58
f 24 	70 	63
f 68 	63 	70
f 65 	67 	25
f 69 	25 	67
f 21 	17 	69
f 73 	47 	66
f 71 	66 	47
f 70 	74 	73
f 70 	73 	68
f 10 	49 	7
f 43 	51 	62
f 51 	56 	67
f 67 	62 	51
f 42 	43 	62
f 62 	59 	42
f 10 	8 	59
f 76 	72 	7
f 47 	48 	71
f 75 	4 	46
f 75 	77 	4
f 16 	19 	15
f 13 	77 	54
f 73 	74 	47
f 76 	47 	74
f 30 	33 	23
f 70 	24 	31
f 31 	34 	70
f 74 	70 	64
f 64 	72 	74
f 76 	74 	72
f 9 	2 	29
f 15 	4 	77
f 13 	3 	77
f 4 	15 	19
f 53 	54 	44
f 46 	4 	52
f 54 	1 	13
f 33 	30 	54
f 54 	53 	33
f 44 	58 	53
# 116 faces

g group_0_11107152

usemtl color_11107152
s 0

f 12 	14 	8
f 12 	8 	7
f 27 	26 	5
f 27 	5 	28
f 27 	32 	31
f 27 	31 	26
f 32 	38 	34
f 32 	34 	31
f 28 	35 	36
f 28 	36 	37
f 28 	37 	39
f 28 	39 	14
f 28 	14 	12
f 28 	12 	40
f 28 	40 	41
f 28 	41 	38
f 28 	38 	32
f 28 	32 	27
f 14 	39 	42
f 14 	42 	8
f 39 	37 	43
f 39 	43 	42
f 36 	51 	43
f 36 	43 	37
f 36 	35 	56
f 36 	56 	51
f 28 	5 	56
f 28 	56 	35
f 38 	41 	64
f 38 	64 	34
f 41 	40 	72
f 41 	72 	64
f 40 	12 	7
f 40 	7 	72
# 34 faces

#end of obj_0

`;

var mapleTree1 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_4634441
Ka 0 0 0 
Kd 0.27450980392156865 0.7176470588235294 0.28627450980392155
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -56.38 		-50.292 		0.912
v -56.486 		-50.219 		0.907
v -56.368 		-50.271 		1.015
v -56.4602 		-50.1766 		1.021
v -56.474 		-50.198 		1.008
v -56.38 		-50.295 		0.774
v -56.486 		-50.222 		0.771
v -56.301 		-50.118 		0.006
v -56.343 		-49.982 		0.002
v -56.301 		-49.962 		0.006
v -56.3616 		-50.2611 		1.021
v -56.368 		-50.281 		0.533
v -56.147 		-50.354 		0.53
v -56.194 		-50.38 		0.558
v -56.379 		-50.298 		0.636
v -56.485 		-50.225 		0.636
v -56.274 		-50.37 		0.636
v -56.226 		-50.3 		0.496
v -56.3467 		-50.2496 		0.5125
v -56.3479 		-50.2475 		0.512
v -56.3449 		-50.253 		0.5134
v -56.2608 		-50.253 		0.4969
v -56.262 		-50.2536 		0.4969
v -56.3307 		-50.2601 		0.512
v -56.374 		-50.196 		0
v -56.474 		-50.208 		0.534
v -56.259 		-50.253 		0.009
v -56.301 		-50.274 		0.006
v -56.228 		-50.196 		0.012
v -56.12 		-50.364 		0.921
v -56.385 		-50.118 		-0.001
v -56.374 		-50.04 		0
v -56.047 		-50.142 		0.997
v -56.017 		-50.143 		0.92
v -56.3758 		-50.196 		0.4988
v -56.3758 		-50.196 		0.4988
v -56.3767 		-50.1898 		0.4989
v -56.3787 		-50.176 		0.499
v -56.017 		-50.146 		0.778
v -56.3751 		-50.1973 		0.4988
v -56.1918 		-50.0317 		1.021
v -56.202 		-50.013 		1.015
v -56.308 		-49.94 		1.008
v -56.32 		-50.2654 		0.5109
v -56.096 		-50.087 		1.021
v -56.084 		-50.07 		0.916
v -56.084 		-50.073 		0.776
v -56.259 		-49.982 		0.009
v -56.217 		-50.118 		0.012
v -56.228 		-50.04 		0.012
v -56.296 		-49.924 		0.907
v -56.19 		-49.997 		0.912
v -56.19 		-50 		0.774
v -56.296 		-49.927 		0.771
v -56.343 		-50.253 		0.002
v -56.017 		-50.149 		0.636
v -56.084 		-50.076 		0.636
v -56.096 		-50.097 		0.531
v -56.1457 		-50.345 		1.021
v -56.1412 		-50.338 		1.021
v -56.262 		-50.344 		1.021
v -56.1551 		-50.3487 		1.021
v -56.19 		-50.003 		0.636
v -56.194 		-50.371 		0.997
v -56.1487 		-50.3467 		1.021
v -56.182 		-50.401 		0.92
v -56.296 		-49.93 		0.636
v -56.274 		-50.365 		0.916
v -56.12 		-50.367 		0.779
v -56.182 		-50.404 		0.778
v -56.553 		-50.149 		0.769
v -56.45 		-49.928 		0.769
v -56.544 		-50.075 		0.769
v -56.23 		-50.0456 		0.5153
v -56.2287 		-50.0539 		0.512
v -56.2308 		-50.04 		0.5176
v -56.388 		-49.894 		0.636
v -56.2597 		-49.9842 		0.5335
v -56.2416 		-50.0192 		0.5237
v -56.3016 		-49.9626 		0.5308
v -56.2676 		-49.9788 		0.5336
v -56.3029 		-49.962 		0.5307
v -56.3029 		-49.962 		0.5307
v -56.544 		-50.078 		0.636
v -56.553 		-50.152 		0.636
v -56.3199 		-49.9701 		0.5224
v -56.202 		-50.024 		0.533
v -56.449 		-49.931 		0.636
v -56.308 		-49.951 		0.534
v -56.423 		-49.951 		0.535
v -56.518 		-50.099 		0.535
v -56.32 		-49.9701 		0.5224
v -56.376 		-49.924 		0.561
v -56.3426 		-49.9809 		0.516
v -56.3449 		-49.982 		0.5153
v -56.3478 		-49.9875 		0.512
v -56.2599 		-49.984 		0.5342
v -56.2666 		-49.9793 		0.5343
v -56.523 		-50.153 		0.561
v -56.26 		-49.9838 		0.5345
v -56.2599 		-49.9839 		0.5343
v -56.386 		-50.1119 		0.4997
v -56.3791 		-50.0628 		0.5
v -56.2663 		-49.9795 		0.5346
v -56.3868 		-50.118 		0.4996
v -56.438 		-50.154 		0.5
v -56.046 		-50.151 		0.558
v -56.3541 		-49.9992 		0.5048
v -56.3759 		-50.04 		0.5035
v -56.3759 		-50.04 		0.5035
v -56.3737 		-50.0359 		0.5036
v -56.261 		-49.982 		0.5385
v -56.2609 		-49.982 		0.5385
v -56.274 		-50.368 		0.776
v -56.2232 		-50.0895 		0.4977
v -56.2232 		-50.0895 		0.4977
v -56.2244 		-50.0815 		0.5009
v -56.026 		-50.222 		0.636
v -56.052 		-50.206 		0.53
v -56.132 		-50.152 		0.496
v -56.12 		-50.37 		0.636
v -56.2188 		-50.118 		0.4974
v -56.2192 		-50.1212 		0.4974
v -56.22 		-50.1263 		0.4974
v -56.2276 		-50.176 		0.4971
v -56.182 		-50.407 		0.636
v -56.0511 		-50.1867 		1.021
v -56.0504 		-50.1935 		1.021
v -56.0508 		-50.197 		1.021
v -56.026 		-50.217 		0.921
v -56.262 		-50.354 		0.531
v -56.026 		-50.22 		0.779
v -56.265 		-50.2551 		0.4969
v -56.2802 		-50.2627 		0.497
v -56.2339 		-50.202 		0.4969
v -56.2307 		-50.196 		0.4969
v -56.2312 		-50.1969 		0.4969
v -56.3029 		-50.274 		0.5092
v -56.3058 		-50.2725 		0.5095
v -56.376 		-49.915 		0.979
v -56.388 		-49.888 		0.903
v -56.388 		-49.891 		0.769
v -56.3218 		-49.961 		1.021
v -56.423 		-49.941 		1.004
v -56.518 		-50.088 		1.004
v -56.4822 		-50.1122 		1.021
v -56.4297 		-50.0309 		1.021
v -56.3877 		-49.9652 		1.021
v -56.544 		-50.072 		0.902
v -56.553 		-50.146 		0.903
v -56.524 		-50.144 		0.979
v -56.45 		-49.925 		0.902
# 152 vertices

g group_0_4634441

usemtl color_4634441
s 0

f 5 	2 	1
f 1 	7 	6
f 1 	2 	7
f 5 	1 	3
f 12 	17 	15
f 16 	15 	6
f 6 	7 	16
f 15 	26 	12
f 24 	44 	12
f 24 	12 	21
f 21 	12 	19
f 20 	19 	12
f 15 	16 	26
f 33 	127 	34
f 35 	106 	36
f 38 	37 	106
f 36 	106 	37
f 35 	40 	106
f 43 	143 	42
f 106 	40 	12
f 33 	34 	45
f 40 	20 	12
f 45 	34 	46
f 139 	12 	44
f 47 	46 	34
f 53 	52 	46
f 39 	47 	34
f 41 	45 	42
f 43 	52 	51
f 42 	52 	43
f 46 	52 	42
f 53 	54 	52
f 47 	53 	46
f 52 	54 	51
f 4 	11 	41
f 41 	61 	45
f 56 	57 	39
f 45 	46 	42
f 119 	107 	56
f 47 	39 	57
f 132 	118 	56
f 56 	58 	57
f 62 	61 	64
f 57 	63 	47
f 66 	30 	65
f 47 	63 	53
f 65 	62 	66
f 64 	66 	62
f 61 	68 	66
f 64 	61 	66
f 67 	77 	54
f 53 	63 	67
f 70 	69 	66
f 30 	66 	69
f 67 	54 	53
f 85 	71 	84
f 85 	16 	7
f 7 	71 	85
f 88 	72 	77
f 77 	90 	88
f 73 	72 	88
f 88 	84 	73
f 78 	87 	79
f 90 	84 	88
f 89 	81 	80
f 89 	80 	82
f 83 	89 	82
f 83 	86 	89
f 77 	93 	90
f 91 	84 	90
f 90 	92 	94
f 90 	94 	95
f 95 	96 	90
f 91 	85 	84
f 91 	99 	85
f 74 	76 	58
f 75 	74 	58
f 87 	58 	76
f 12 	26 	106
f 87 	76 	79
f 26 	91 	106
f 92 	90 	86
f 99 	91 	26
f 85 	26 	16
f 85 	99 	26
f 57 	58 	87
f 106 	103 	102
f 106 	102 	105
f 38 	106 	105
f 97 	87 	78
f 100 	87 	101
f 106 	91 	90
f 89 	93 	77
f 58 	107 	119
f 118 	119 	56
f 108 	90 	96
f 56 	107 	58
f 89 	86 	90
f 89 	90 	93
f 109 	103 	90
f 110 	109 	90
f 108 	111 	90
f 110 	90 	111
f 106 	90 	103
f 87 	63 	57
f 11 	4 	5
f 11 	5 	3
f 63 	89 	67
f 70 	66 	68
f 70 	68 	114
f 104 	98 	89
f 87 	113 	63
f 89 	63 	112
f 3 	61 	11
f 68 	6 	114
f 3 	1 	68
f 68 	1 	6
f 150 	2 	5
f 112 	63 	113
f 112 	104 	89
f 100 	113 	87
f 97 	101 	87
f 68 	61 	3
f 81 	89 	98
f 67 	89 	77
f 61 	41 	11
f 62 	60 	61
f 65 	60 	62
f 59 	60 	65
f 60 	129 	61
f 117 	75 	58
f 115 	58 	116
f 121 	13 	119
f 120 	116 	58
f 58 	115 	117
f 121 	118 	69
f 58 	119 	120
f 13 	18 	120
f 18 	137 	120
f 121 	119 	118
f 118 	132 	69
f 126 	121 	70
f 122 	120 	123
f 124 	123 	120
f 124 	120 	125
f 126 	13 	121
f 122 	116 	120
f 45 	127 	33
f 128 	129 	130
f 128 	130 	34
f 69 	70 	121
f 128 	34 	127
f 60 	30 	130
f 114 	17 	70
f 60 	130 	129
f 114 	15 	17
f 132 	39 	130
f 17 	126 	70
f 30 	69 	132
f 30 	132 	130
f 14 	131 	13
f 61 	129 	128
f 128 	127 	61
f 45 	61 	127
f 12 	131 	17
f 131 	126 	17
f 34 	130 	39
f 39 	132 	56
f 14 	126 	131
f 12 	139 	131
f 60 	59 	30
f 59 	65 	30
f 114 	6 	15
f 131 	18 	13
f 119 	13 	120
f 126 	14 	13
f 136 	120 	137
f 136 	125 	120
f 133 	23 	18
f 134 	133 	18
f 23 	22 	18
f 22 	135 	18
f 137 	18 	135
f 18 	131 	134
f 138 	134 	131
f 138 	131 	139
f 54 	141 	51
f 51 	141 	43
f 77 	72 	142
f 142 	141 	54
f 77 	142 	54
f 41 	42 	143
f 146 	147 	145
f 144 	145 	147
f 147 	148 	144
f 143 	43 	148
f 144 	148 	43
f 43 	140 	144
f 140 	141 	144
f 141 	140 	43
f 150 	145 	149
f 150 	151 	145
f 145 	152 	149
f 145 	144 	152
f 4 	146 	5
f 145 	5 	146
f 151 	5 	145
f 5 	151 	150
f 152 	72 	149
f 150 	149 	73
f 71 	150 	73
f 71 	2 	150
f 73 	149 	72
f 144 	141 	152
f 152 	142 	72
f 141 	142 	152
f 147 	146 	41
f 143 	147 	41
f 148 	147 	143
f 4 	41 	146
f 84 	71 	73
f 7 	2 	71
# 222 faces

g group_0_11107152

usemtl color_11107152
s 0

f 102 	103 	32
f 36 	37 	25
f 8 	9 	10
f 22 	23 	27
f 135 	22 	27
f 135 	27 	29
f 25 	35 	36
f 35 	25 	40
f 19 	20 	25
f 55 	21 	19
f 139 	44 	55
f 21 	55 	24
f 40 	25 	20
f 8 	31 	32
f 25 	31 	8
f 8 	32 	9
f 37 	31 	25
f 10 	48 	8
f 28 	8 	27
f 49 	29 	8
f 8 	48 	50
f 8 	50 	49
f 8 	29 	27
f 49 	122 	123
f 123 	124 	49
f 29 	49 	124
f 76 	74 	50
f 83 	82 	10
f 105 	102 	31
f 32 	31 	102
f 37 	38 	31
f 25 	8 	55
f 28 	55 	8
f 25 	55 	19
f 78 	79 	50
f 81 	98 	48
f 78 	50 	97
f 112 	48 	104
f 98 	104 	48
f 110 	111 	32
f 50 	48 	101
f 100 	101 	48
f 101 	97 	50
f 109 	32 	103
f 105 	31 	38
f 111 	108 	9
f 94 	92 	10
f 9 	95 	10
f 96 	95 	9
f 94 	10 	95
f 108 	96 	9
f 109 	110 	32
f 9 	32 	111
f 100 	48 	113
f 112 	113 	48
f 116 	49 	115
f 74 	75 	49
f 49 	50 	74
f 76 	50 	79
f 10 	86 	83
f 117 	49 	75
f 115 	49 	117
f 80 	81 	48
f 80 	48 	82
f 48 	10 	82
f 92 	86 	10
f 122 	49 	116
f 23 	133 	27
f 28 	27 	133
f 138 	28 	134
f 134 	28 	133
f 29 	137 	135
f 136 	137 	29
f 136 	29 	125
f 124 	125 	29
f 28 	138 	55
f 139 	55 	138
f 44 	24 	55
# 78 faces

#end of obj_0

`;
var mapleTree2 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_4634441
Ka 0 0 0 
Kd 0.27450980392156865 0.7176470588235294 0.28627450980392155
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -58.028 		-50.105 		1.444
v -58.136 		-49.978 		1.443
v -58.088 		-49.981 		1.339
v -57.84 		-50.186 		1.972
v -57.4804 		-50.3045 		1.982
v -57.6766 		-50.3018 		1.982
v -57.671 		-50.313 		1.98
v -57.6687 		-50.309 		1.982
v -57.929 		-49.613 		1.956
v -57.6184 		-50.3127 		1.982
v -57.546 		-50.073 		0.006
v -57.504 		-50.058 		0.009
v -57.562 		-50.359 		1.947
v -57.4964 		-50.3179 		1.982
v -57.444 		-50.347 		1.841
v -57.473 		-50.017 		0.012
v -57.4855 		-50.3132 		1.982
v -57.544 		-50.411 		1.839
v -57.4889 		-50.3153 		1.982
v -57.69 		-50.348 		1.834
v -57.63 		-49.961 		-0.001
v -57.619 		-49.904 		0
v -57.619 		-50.017 		0
v -57.464 		-49.961 		0.555
v -57.444 		-50.352 		1.643
v -57.543 		-50.416 		1.642
v -57.503 		-49.913 		0.5518
v -57.5465 		-49.8485 		0.5297
v -57.5479 		-49.848 		0.529
v -57.5032 		-49.9255 		0.5517
v -57.5031 		-49.956 		0.5517
v -57.485 		-49.895 		0.561
v -57.475 		-49.956 		0.566
v -57.5025 		-49.8678 		0.5522
v -57.506 		-49.863 		0.5505
v -57.5059 		-49.8631 		0.5505
v -57.7708 		-50.062 		1.249
v -57.5143 		-49.86 		0.5463
v -57.511 		-49.85 		0.548
v -57.5026 		-50.0475 		0.5522
v -57.5094 		-50.0592 		0.5488
v -57.485 		-50.017 		0.561
v -57.511 		-50.062 		0.548
v -57.546 		-50.079 		0.53
v -57.5479 		-50.073 		0.529
v -57.5117 		-50.06 		0.5477
v -57.581 		-50.062 		0.512
v -57.5808 		-50.0615 		0.5121
v -57.5494 		-50.0725 		0.5282
v -57.476 		-49.904 		0.554
v -57.581 		-49.85 		0.512
v -57.5782 		-49.8586 		0.5135
v -57.546 		-49.833 		0.53
v -57.506 		-50.058 		0.552
v -57.476 		-50.017 		0.554
v -57.5103 		-50.0595 		0.5516
v -57.5074 		-50.0549 		0.5519
v -57.5032 		-49.9988 		0.5518
v -57.689 		-50.353 		1.639
v -57.859 		-50.227 		1.636
v -57.859 		-50.222 		1.828
v -57.444 		-50.357 		1.445
v -57.5032 		-49.9958 		0.5517
v -57.3341 		-50.0529 		1.982
v -57.3345 		-50.0572 		1.982
v -57.293 		-50.092 		1.841
v -57.279 		-49.964 		1.839
v -57.327 		-49.962 		1.947
v -57.3349 		-50.0443 		1.982
v -57.543 		-50.421 		1.445
v -57.689 		-50.358 		1.444
v -57.67 		-50.33 		1.298
v -57.293 		-50.097 		1.643
v -57.84 		-50.204 		1.3
v -57.279 		-49.969 		1.642
v -57.859 		-50.232 		1.444
v -57.575 		-49.756 		1.3
v -57.293 		-50.101 		1.445
v -57.406 		-49.883 		1.298
v -57.632 		-49.853 		1.252
v -57.487 		-50.329 		1.297
v -57.614 		-50.235 		1.249
v -57.279 		-49.974 		1.445
v -57.562 		-50.375 		1.335
v -57.6628 		-49.895 		1.2521
v -57.6581 		-49.92 		1.2518
v -57.6923 		-49.85 		1.2528
v -57.7321 		-49.833 		1.2534
v -57.772 		-49.85 		1.2537
v -57.7718 		-49.8499 		1.2537
v -57.7618 		-49.8456 		1.2537
v -57.7942 		-49.884 		1.2538
v -57.8015 		-49.895 		1.2538
v -57.8056 		-49.92 		1.2537
v -57.801 		-49.727 		1.255
v -57.5908 		-49.863 		0.517
v -57.633 		-49.961 		0.542
v -57.6284 		-49.956 		0.5422
v -57.5999 		-50.0458 		0.5441
v -57.5912 		-50.0577 		0.5406
v -57.591 		-50.058 		0.5405
v -57.556 		-49.721 		1.444
v -57.462 		-49.98 		1.249
v -57.6223 		-49.8985 		0.555
v -57.6195 		-49.902 		0.5421
v -57.6919 		-50.062 		1.2512
v -57.62 		-49.9048 		0.5421
v -57.7317 		-50.079 		1.2516
v -57.6626 		-50.017 		1.2512
v -57.6158 		-49.897 		0.531
v -57.6514 		-49.956 		1.2515
v -57.6143 		-49.895 		0.5265
v -57.8116 		-49.956 		1.2535
v -57.8115 		-49.9554 		1.2535
v -57.8092 		-49.9416 		1.2535
v -57.8037 		-50.0023 		1.253
v -57.6276 		-49.961 		0.5424
v -57.6279 		-49.959 		0.5423
v -57.621 		-50.017 		0.542
v -57.6184 		-50.017 		0.5422
v -57.6187 		-50.0152 		0.5422
v -57.621 		-49.904 		0.542
v -57.335 		-50.074 		1.297
v -57.326 		-49.977 		1.335
v -57.6171 		-50.019 		0.5424
v -57.745 		-49.612 		1.963
v -57.768 		-49.65 		1.982
v -57.854 		-49.567 		1.922
v -57.726 		-49.589 		1.632
v -57.726 		-49.584 		1.821
v -57.7073 		-49.6857 		1.982
v -57.406 		-49.865 		1.98
v -57.4083 		-49.8689 		1.982
v -57.386 		-49.9196 		1.982
v -57.5879 		-49.862 		0.5083
v -57.387 		-49.837 		1.834
v -57.5562 		-49.7778 		1.982
v -57.576 		-49.739 		1.972
v -57.556 		-49.71 		1.828
v -57.5814 		-50.0613 		0.5118
v -57.5879 		-49.862 		0.5083
v -57.8679 		-49.6578 		1.982
v -57.872 		-49.521 		1.816
v -57.971 		-49.585 		1.815
v -57.872 		-49.526 		1.63
v -57.971 		-49.59 		1.629
v -58.08 		-49.868 		1.956
v -58.0189 		-49.9133 		1.982
v -57.9406 		-49.781 		1.982
v -57.8281 		-50.1658 		1.982
v -57.387 		-49.842 		1.639
v -57.556 		-49.716 		1.636
v -57.8697 		-50.1271 		1.982
v -57.987 		-50.0198 		1.982
v -58.01 		-50.059 		1.963
v -58.137 		-49.968 		1.816
v -58.122 		-49.84 		1.815
v -58.089 		-49.965 		1.922
v -57.504 		-49.863 		0.009
v -57.473 		-49.904 		0.012
v -57.588 		-49.863 		0.002
v -57.546 		-49.848 		0.006
v -57.8012 		-50.017 		1.2529
v -57.7717 		-50.0619 		1.2522
v -57.7716 		-50.062 		1.2522
v -57.7791 		-50.0507 		1.2524
v -57.7424 		-50.0744 		1.2518
v -58.028 		-50.095 		1.821
v -57.783 		-50.109 		1.252
v -58.122 		-49.846 		1.629
v -58.136 		-49.973 		1.63
v -57.872 		-49.531 		1.443
v -58.028 		-50.1 		1.632
v -57.971 		-49.595 		1.443
v -57.928 		-49.631 		1.303
v -58.122 		-49.851 		1.443
v -57.726 		-49.594 		1.444
v -58.079 		-49.886 		1.303
v -57.744 		-49.63 		1.302
v -57.853 		-49.583 		1.339
v -57.952 		-49.983 		1.255
v -57.387 		-49.847 		1.444
v -58.009 		-50.077 		1.302
v -57.588 		-50.058 		0.002
v -57.546 		-49.961 		0.006
v -57.462 		-49.961 		0.012
# 186 vertices

g group_0_4634441

usemtl color_4634441
s 0

f 6 	4 	7
f 8 	6 	7
f 7 	10 	8
f 14 	10 	13
f 7 	13 	10
f 5 	17 	15
f 18 	15 	19
f 17 	19 	15
f 19 	14 	18
f 13 	18 	14
f 7 	20 	18
f 13 	7 	18
f 15 	18 	25
f 4 	61 	20
f 4 	20 	7
f 6 	8 	65
f 10 	65 	8
f 5 	65 	10
f 5 	10 	14
f 5 	14 	19
f 17 	5 	19
f 25 	18 	26
f 26 	18 	20
f 26 	20 	59
f 59 	20 	60
f 61 	60 	20
f 64 	65 	66
f 64 	66 	67
f 67 	68 	69
f 67 	69 	64
f 70 	62 	26
f 71 	72 	70
f 72 	84 	70
f 66 	75 	67
f 26 	62 	25
f 66 	73 	75
f 71 	70 	26
f 59 	71 	26
f 74 	72 	71
f 71 	76 	74
f 75 	151 	67
f 59 	76 	71
f 59 	60 	76
f 66 	15 	73
f 77 	79 	80
f 79 	103 	80
f 81 	62 	70
f 70 	84 	81
f 123 	62 	81
f 72 	81 	84
f 81 	72 	82
f 73 	78 	83
f 83 	75 	73
f 72 	74 	169
f 80 	87 	95
f 90 	89 	95
f 86 	85 	80
f 80 	85 	87
f 88 	95 	87
f 95 	91 	90
f 92 	95 	89
f 88 	91 	95
f 94 	181 	93
f 95 	77 	80
f 77 	102 	182
f 182 	79 	77
f 103 	123 	82
f 123 	103 	79
f 79 	124 	123
f 81 	82 	123
f 83 	78 	123
f 124 	83 	123
f 83 	124 	79
f 5 	15 	66
f 15 	25 	73
f 78 	25 	62
f 78 	73 	25
f 62 	123 	78
f 127 	131 	126
f 133 	134 	132
f 69 	68 	134
f 136 	132 	67
f 67 	151 	136
f 131 	137 	138
f 131 	138 	126
f 138 	137 	132
f 137 	133 	132
f 132 	136 	138
f 138 	139 	126
f 130 	126 	139
f 138 	136 	139
f 139 	136 	152
f 152 	136 	151
f 148 	154 	137
f 154 	153 	137
f 153 	150 	137
f 142 	149 	127
f 153 	155 	4
f 126 	9 	142
f 126 	142 	127
f 128 	9 	126
f 128 	143 	9
f 126 	143 	128
f 129 	143 	130
f 126 	130 	143
f 145 	146 	144
f 145 	144 	143
f 129 	145 	143
f 9 	143 	144
f 131 	127 	149
f 148 	149 	147
f 9 	147 	149
f 4 	150 	153
f 132 	134 	68
f 65 	5 	66
f 67 	132 	68
f 6 	150 	4
f 64 	150 	65
f 64 	69 	150
f 6 	65 	150
f 139 	129 	130
f 129 	139 	152
f 151 	182 	102
f 151 	102 	152
f 144 	157 	9
f 149 	142 	9
f 153 	154 	155
f 69 	134 	150
f 147 	157 	156
f 156 	158 	147
f 147 	9 	157
f 154 	148 	155
f 147 	155 	148
f 155 	147 	158
f 155 	158 	156
f 155 	61 	4
f 168 	155 	156
f 167 	108 	169
f 82 	169 	108
f 108 	106 	82
f 155 	168 	61
f 106 	109 	82
f 156 	171 	168
f 109 	111 	82
f 86 	80 	111
f 82 	111 	80
f 168 	171 	173
f 146 	157 	144
f 114 	113 	181
f 113 	116 	181
f 116 	163 	181
f 115 	114 	181
f 181 	95 	93
f 115 	181 	94
f 163 	166 	181
f 181 	166 	169
f 165 	169 	164
f 167 	169 	165
f 164 	169 	166
f 137 	131 	149
f 149 	148 	137
f 133 	137 	150
f 134 	133 	150
f 80 	103 	82
f 181 	169 	74
f 82 	72 	169
f 156 	170 	171
f 172 	146 	145
f 145 	129 	172
f 61 	173 	60
f 172 	174 	146
f 172 	175 	174
f 61 	168 	173
f 176 	174 	175
f 180 	175 	172
f 170 	157 	146
f 170 	156 	157
f 171 	170 	176
f 146 	174 	170
f 171 	176 	2
f 2 	1 	173
f 177 	172 	129
f 2 	173 	171
f 60 	173 	1
f 76 	60 	1
f 176 	170 	174
f 177 	129 	152
f 178 	176 	175
f 180 	179 	175
f 179 	177 	102
f 179 	95 	175
f 77 	179 	102
f 92 	93 	95
f 179 	172 	177
f 175 	95 	181
f 179 	180 	172
f 175 	181 	178
f 182 	75 	83
f 182 	151 	75
f 178 	2 	176
f 178 	3 	2
f 83 	79 	182
f 183 	181 	74
f 152 	102 	177
f 2 	183 	1
f 2 	3 	183
f 76 	1 	183
f 74 	76 	183
f 95 	179 	77
f 181 	183 	178
f 3 	178 	183
# 211 faces

g group_0_11107152

usemtl color_11107152
s 0

f 33 	30 	32
f 27 	32 	30
f 115 	104 	114
f 31 	30 	33
f 39 	32 	34
f 27 	34 	32
f 108 	44 	106
f 36 	35 	39
f 36 	39 	34
f 39 	35 	38
f 42 	109 	40
f 104 	98 	114
f 115 	94 	104
f 44 	45 	43
f 43 	45 	46
f 48 	49 	47
f 44 	47 	49
f 45 	44 	49
f 29 	53 	28
f 53 	29 	51
f 52 	51 	29
f 50 	160 	34
f 53 	39 	28
f 38 	28 	39
f 106 	44 	43
f 56 	54 	57
f 24 	50 	30
f 30 	31 	24
f 57 	54 	40
f 55 	40 	54
f 58 	40 	55
f 41 	54 	56
f 106 	56 	109
f 57 	109 	56
f 40 	109 	57
f 54 	41 	11
f 11 	41 	46
f 46 	45 	11
f 106 	43 	56
f 56 	43 	41
f 86 	111 	32
f 52 	135 	51
f 40 	58 	42
f 46 	41 	43
f 34 	27 	50
f 30 	50 	27
f 31 	63 	24
f 55 	24 	63
f 55 	63 	58
f 85 	86 	32
f 87 	85 	39
f 39 	53 	87
f 91 	51 	90
f 85 	32 	39
f 88 	87 	53
f 93 	104 	94
f 92 	51 	96
f 107 	122 	98
f 117 	97 	121
f 107 	98 	104
f 100 	37 	99
f 101 	37 	100
f 104 	105 	107
f 140 	47 	101
f 104 	110 	105
f 167 	37 	47
f 109 	42 	111
f 33 	111 	42
f 44 	108 	47
f 113 	114 	98
f 33 	32 	111
f 112 	104 	93
f 53 	51 	91
f 89 	90 	51
f 91 	88 	53
f 104 	112 	110
f 97 	117 	118
f 97 	118 	98
f 89 	51 	92
f 119 	120 	121
f 112 	93 	92
f 119 	121 	97
f 92 	96 	112
f 97 	98 	122
f 105 	122 	107
f 161 	122 	110
f 112 	161 	110
f 105 	110 	122
f 33 	42 	63
f 58 	63 	42
f 98 	118 	113
f 31 	33 	63
f 116 	113 	118
f 118 	117 	116
f 120 	163 	121
f 121 	163 	117
f 99 	125 	119
f 166 	125 	37
f 99 	37 	125
f 125 	120 	119
f 125 	166 	120
f 167 	47 	108
f 12 	54 	11
f 55 	54 	12
f 16 	24 	55
f 159 	35 	160
f 36 	34 	160
f 35 	159 	38
f 135 	52 	162
f 162 	52 	29
f 49 	48 	184
f 47 	140 	48
f 100 	23 	101
f 101 	184 	140
f 140 	184 	48
f 37 	101 	47
f 162 	161 	141
f 141 	135 	162
f 112 	96 	161
f 96 	51 	141
f 135 	141 	51
f 184 	101 	23
f 119 	23 	99
f 100 	99 	23
f 16 	55 	12
f 186 	24 	16
f 186 	50 	24
f 28 	159 	29
f 119 	97 	21
f 23 	119 	21
f 184 	11 	49
f 116 	117 	163
f 165 	164 	37
f 164 	166 	37
f 22 	122 	161
f 166 	163 	120
f 167 	165 	37
f 186 	160 	50
f 36 	160 	35
f 28 	38 	159
f 162 	29 	159
f 96 	141 	161
f 22 	21 	97
f 122 	22 	97
f 11 	184 	185
f 185 	161 	162
f 185 	21 	22
f 184 	23 	185
f 45 	49 	11
f 185 	23 	21
f 185 	22 	161
f 159 	185 	162
f 185 	12 	11
f 185 	186 	16
f 159 	160 	185
f 185 	160 	186
f 185 	16 	12
# 157 faces

#end of obj_0

`;
var mapleTree3 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_4634441
Ka 0 0 0 
Kd 0.27450980392156865 0.7176470588235294 0.28627450980392155
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -60.144 		-49.753 		1.747
v -60.172 		-49.675 		1.883
v -60.064 		-49.969 		1.637
v -60.1321 		-50.048 		1.6416
v -60.258 		-49.824 		1.7
v -59.7147 		-50.1209 		1.3083
v -59.7026 		-50.176 		1.2889
v -59.584 		-50.872 		1.691
v -59.6984 		-50.195 		1.2822
v -59.519 		-50.913 		1.884
v -59.6978 		-50.1978 		1.2839
v -59.692 		-50.224 		1.299
v -60.0871 		-50.3859 		1.6346
v -60.0702 		-50.3791 		1.6344
v -60.0699 		-50.379 		1.6344
v -59.7033 		-50.1726 		1.0865
v -59.7079 		-50.1519 		1.1704
v -59.7154 		-50.1179 		1.3093
v -59.6876 		-50.1301 		1.2515
v -59.692 		-50.13 		1.2533
v -59.6987 		-50.1935 		0.8539
v -59.701 		-50.1832 		0.9715
v -60.1301 		-50.403 		1.6349
v -59.893 		-50.915 		1.884
v -60.043 		-50.3393 		1.6344
v -59.6712 		-50.1306 		1.2448
v -59.864 		-50.873 		1.693
v -60.0574 		-50.0911 		1.6361
v -60.0704 		-50.0721 		1.6364
v -60.0705 		-50.072 		1.6364
v -59.638 		-50.1064 		1.2302
v -59.266 		-50.332 		2.141
v -60.043 		-50.1122 		1.6358
v -60.1142 		-50.0546 		1.637
v -60.1154 		-50.0542 		1.637
v -60.132 		-50.048 		1.6415
v -59.778 		-50.731 		1.63
v -59.329 		-49.636 		1.678
v -59.698 		-50.94 		1.742
v -59.6237 		-50.0957 		1.2238
v -59.535 		-49.696 		1.253
v -60.555 		-50.139 		2.367
v -60.554 		-50.146 		2.124
v -59.6125 		-50.0697 		1.218
v -59.6125 		-50.0696 		1.218
v -59.5958 		-50.0326 		1.2177
v -59.5951 		-50.0309 		1.2176
v -59.3204 		-49.745 		1.79
v -59.35 		-49.671 		1.763
v -59.3164 		-49.7519 		1.79
v -59.3149 		-49.7559 		1.79
v -59.7398 		-49.9977 		1.6962
v -60.3958 		-50.2485 		2.585
v -60.3473 		-50.4072 		2.585
v -60.383 		-50.467 		2.56
v -59.5955 		-49.9778 		1.2176
v -59.5954 		-49.9578 		1.2175
v -59.867 		-50.007 		1.6667
v -59.7065 		-49.9897 		1.7767
v -60.411 		-50.52 		2.375
v -59.639 		-49.848 		1.218
v -59.662 		-49.681 		1.366
v -59.617 		-49.9132 		1.2178
v -59.6252 		-49.8966 		1.2179
v -59.664 		-49.677 		1.515
v -60.411 		-50.528 		2.129
v -59.6137 		-49.92 		1.2177
v -59.655 		-49.724 		1.255
v -59.6618 		-49.8694 		1.2283
v -59.6736 		-49.8603 		1.2327
v -59.6745 		-49.8596 		1.233
v -60.1795 		-50.0661 		1.6498
v -59.545 		-49.644 		1.669
v -60.1952 		-50.072 		1.6525
v -59.6338 		-49.8911 		1.218
v -59.6338 		-49.8911 		1.218
v -59.648 		-49.8801 		1.2232
v -60.2288 		-50.1221 		1.6532
v -60.2374 		-50.1349 		1.6534
v -60.2388 		-50.137 		1.6534
v -59.7224 		-49.9807 		1.77
v -59.7376 		-49.9956 		1.7054
v -59.6913 		-49.8595 		1.2398
v -59.692 		-49.8595 		1.2402
v -60.49 		-50.18 		2.551
v -60.577 		-50.33 		2.369
v -59.977 		-49.823 		1.698
v -60.0137 		-49.8542 		2.585
v -60.504 		-50.325 		2.506
v -60.576 		-50.338 		2.126
v -59.766 		-49.863 		1.659
v -60.2446 		-50.176 		1.6495
v -60.295 		-50.352 		1.637
v -59.749 		-49.738 		1.513
v -59.747 		-49.742 		1.366
v -60.2489 		-50.2049 		1.6465
v -60.2522 		-50.225 		1.6446
v -59.284 		-49.752 		1.679
v -59.244 		-50.078 		1.679
v -59.867 		-50.441 		-0.004
v -59.955 		-50.412 		-0.004
v -60.019 		-50.332 		-0.004
v -60.043 		-50.224 		-0.004
v -60.019 		-50.115 		-0.004
v -59.955 		-50.036 		-0.004
v -59.867 		-50.007 		-0.004
v -59.78 		-50.036 		-0.004
v -59.2749 		-50.0819 		1.79
v -59.716 		-50.115 		-0.004
v -59.692 		-50.224 		-0.004
v -59.716 		-50.332 		-0.004
v -59.78 		-50.412 		-0.004
v -60.2379 		-50.2928 		1.6368
v -60.2339 		-50.3135 		1.6366
v -60.2338 		-50.314 		1.6366
v -60.2428 		-50.2655 		1.637
v -59.6563 		-49.7595 		1.79
v -59.617 		-49.7413 		1.79
v -59.662 		-49.71 		1.775
v -59.5388 		-49.7077 		1.79
v -59.542 		-49.682 		1.782
v -60.2011 		-50.3627 		1.6359
v -60.1903 		-50.379 		1.6357
v -60.1462 		-50.3966 		1.6351
v -59.666 		-49.672 		1.664
v -60.043 		-50.0935 		1.0913
v -59.949 		-49.761 		2.129
v -59.327 		-49.64 		1.523
v -59.949 		-49.754 		2.375
v -59.325 		-49.644 		1.367
v -59.725 		-49.758 		1.743
v -60.554 		-50.154 		1.883
v -59.751 		-49.734 		1.66
v -60.411 		-50.536 		1.883
v -59.949 		-49.769 		1.883
v -60.382 		-50.494 		1.698
v -59.28 		-49.759 		1.367
v -59.282 		-49.755 		1.523
v -59.309 		-49.769 		1.251
v -59.344 		-49.683 		1.281
v -59.69 		-49.944 		2.384
v -59.69 		-49.951 		2.133
v -60.576 		-50.345 		1.883
v -60.489 		-50.208 		1.7
v -60.503 		-50.349 		1.747
v -59.7547 		-49.9475 		1.536
v -59.7536 		-49.9574 		1.5413
v -59.753 		-49.9627 		1.5445
v -60.043 		-50.224 		0.9385
v -60.124 		-50.657 		2.571
v -60.1722 		-50.5629 		2.585
v -60.1047 		-50.6246 		2.585
v -59.3514 		-50.4456 		2.585
v -59.3503 		-50.4577 		2.585
v -59.3509 		-50.4637 		2.585
v -59.752 		-49.9705 		1.536
v -59.288 		-50.515 		2.401
v -59.764 		-49.868 		1.512
v -59.288 		-50.523 		2.142
v -59.762 		-49.872 		1.366
v -59.7606 		-49.8715 		1.3614
v -59.7608 		-49.8718 		1.3617
v -59.7617 		-49.8749 		1.3673
v -59.7617 		-49.8747 		1.366
v -59.7605 		-49.8956 		1.493
v -59.7604 		-49.8977 		1.5058
v -59.7604 		-49.8983 		1.5096
v -60.153 		-50.71 		2.384
v -59.2775 		-50.0944 		1.79
v -59.288 		-50.53 		1.884
v -60.152 		-50.718 		2.133
v -59.2754 		-50.0863 		1.79
v -59.353 		-50.488 		1.691
v -60.123 		-50.683 		1.696
v -59.7606 		-49.8714 		1.3612
v -59.5819 		-50.8477 		2.585
v -59.8622 		-50.8424 		2.585
v -59.865 		-50.847 		2.583
v -59.7948 		-50.8467 		2.585
v -59.5973 		-50.8542 		2.585
v -59.5867 		-50.8506 		2.585
v -59.7598 		-49.9028 		1.512
v -59.7579 		-49.92 		1.5212
v -59.519 		-50.899 		2.401
v -59.72 		-49.986 		2.571
v -59.768 		-49.9823 		1.4705
v -59.699 		-50.917 		2.539
v -59.671 		-50.995 		2.398
v -59.894 		-50.9 		2.392
v -59.978 		-49.796 		2.56
v -60.152 		-50.726 		1.883
v -59.9199 		-49.9082 		2.585
v -59.519 		-50.906 		2.142
v -60.1648 		-49.8655 		2.585
v -59.671 		-51.002 		2.141
v -60.259 		-49.797 		2.551
v -60.145 		-49.729 		2.506
v -59.3564 		-50.2219 		1.79
v -59.352 		-50.225 		1.789
v -60.172 		-49.659 		2.369
v -59.894 		-50.908 		2.138
v -59.3524 		-50.2218 		1.79
v -59.3368 		-50.1964 		1.79
v -60.324 		-49.755 		2.367
v -59.288 		-50.178 		1.763
v -59.26 		-50.207 		1.678
v -60.323 		-49.763 		2.124
v -60.172 		-49.667 		2.126
v -60.323 		-49.771 		1.883
v -59.266 		-50.339 		1.884
v -59.867 		-50.441 		1.6321
v -60.036 		-50.541 		1.633
v -59.7491 		-49.9927 		1.512
v -59.67 		-51.01 		1.884
v -59.7472 		-50.007 		1.4965
v -59.345 		-50.269 		1.674
v -59.718 		-49.771 		1.284
v -59.242 		-50.082 		1.523
v -59.24 		-50.086 		1.367
v -59.7169 		-49.9151 		1.024
v -59.269 		-50.095 		1.251
v -59.7288 		-49.858 		1.2589
v -59.7292 		-49.8577 		1.2601
v -59.725 		-49.8584 		1.2559
v -59.7158 		-49.8588 		1.2515
v -59.359 		-50.118 		1.213
v -59.339 		-50.343 		1.742
v -59.461 		-50.176 		2.583
v -59.7542 		-49.8686 		1.3403
v -59.7312 		-49.8589 		1.264
v -59.432 		-50.134 		2.392
v -59.258 		-50.211 		1.523
v -59.432 		-50.141 		2.138
v -59.256 		-50.215 		1.367
v -59.341 		-50.277 		1.367
v -59.343 		-50.273 		1.521
v -59.344 		-50.239 		1.252
v -59.4637 		-50.1805 		2.585
v -59.434 		-50.2475 		2.585
v -59.7034 		-50.1722 		0.6835
v -59.7158 		-50.1158 		0.6214
v -59.7071 		-50.1553 		0.666
v -59.716 		-50.115 		0.6221
v -59.7394 		-50.0861 		1.659
v -59.7364 		-50.0898 		1.6684
v -59.7363 		-50.0899 		1.6685
v -59.738 		-50.0451 		1.6821
v -59.7393 		-50.0104 		1.6925
v -59.7391 		-50.0176 		2.585
v -59.768 		-50.0508 		1.674
v -59.78 		-50.036 		1.676
v -59.7527 		-50.0697 		1.6713
v -59.7363 		-50.0899 		1.6686
v -59.282 		-50.191 		1.281
v -59.7389 		-50.0868 		1.6119
v -59.7391 		-50.0865 		1.63
v -59.7379 		-50.0879 		1.536
v -59.7371 		-50.089 		1.4644
v -59.7359 		-50.0905 		1.4061
v -59.7376 		-50.0883 		1.512
v -59.7435 		-50.0351 		1.466
v -59.7418 		-50.0479 		1.4518
v -59.78 		-50.412 		1.6316
v -59.421 		-49.624 		1.367
v -59.423 		-49.621 		1.521
v -59.421 		-49.654 		1.789
v -59.4206 		-49.6571 		1.79
v -59.425 		-49.617 		1.674
v -59.69 		-49.959 		1.883
v -59.414 		-49.668 		1.252
v -59.519 		-49.82 		1.216
v -59.399 		-49.791 		1.213
v -59.675 		-50.0075 		1.79
v -59.6761 		-49.9982 		1.79
v -59.4 		-49.6744 		1.79
v -59.575 		-50.081 		1.79
v -59.5185 		-49.6983 		1.79
v -59.479 		-50.146 		1.216
v -59.431 		-50.149 		1.884
v -59.4453 		-50.1751 		1.79
v -59.5252 		-50.3114 		1.6458
v -59.5791 		-50.3244 		1.6304
v -59.547 		-50.348 		1.63
v -59.462 		-50.305 		1.367
v -59.5855 		-50.3259 		1.6304
v -59.464 		-50.301 		1.518
v -59.6814 		-50.3058 		1.6313
v -59.4028 		-50.224 		1.79
v -59.3947 		-50.235 		1.7865
v -59.6903 		-50.2836 		1.6315
v -59.6066 		-50.3215 		1.6306
v -59.3959 		-50.2472 		1.7561
v -59.465 		-50.267 		1.253
v -59.584 		-50.329 		1.515
v -59.716 		-50.332 		1.6314
v -59.6998 		-50.2591 		1.5988
v -59.6996 		-50.2581 		1.536
v -59.6998 		-50.2592 		1.63
v -59.6993 		-50.2567 		1.443
v -59.6992 		-50.2563 		1.366
v -59.699 		-50.2555 		1.3643
v -59.466 		-50.297 		1.669
v -59.4778 		-50.2998 		1.6685
v -59.677 		-50.313 		1.366
v -59.6995 		-50.2578 		1.5126
v -59.679 		-50.309 		1.513
v -59.6993 		-50.2567 		1.4437
v -59.4308 		-50.28 		1.6925
v -59.4663 		-50.2949 		1.6744
v -59.6998 		-50.2592 		1.6312
v -59.6998 		-50.2592 		1.6317
v -59.4701 		-50.2965 		1.6724
v -59.7029 		-50.2729 		1.6316
v -59.6999 		-50.2596 		1.6317
v -59.582 		-50.333 		1.366
v -59.4055 		-50.2655 		1.7151
v -59.4035 		-50.2616 		1.7237
v -59.7644 		-50.0552 		1.3735
v -59.7556 		-50.0661 		1.3835
v -59.6987 		-50.1299 		1.256
v -59.6978 		-50.1299 		1.2556
v -59.78 		-50.036 		1.3551
v -59.543 		-49.649 		1.518
v -59.7415 		-50.0501 		1.4468
v -59.7358 		-50.0852 		1.366
v -59.7351 		-50.0915 		1.366
v -59.7243 		-50.1046 		1.3349
v -59.7238 		-50.1054 		1.3334
v -59.7243 		-50.1048 		1.3349
v -59.541 		-49.653 		1.367
v -59.7258 		-50.1029 		0.6103
v -59.7554 		-50.0664 		0.5765
v -59.7653 		-50.0541 		0.5917
v -59.78 		-50.036 		0.6147
v -59.78 		-50.036 		1.63
v -59.339 		-50.32 		2.539
v -59.266 		-50.324 		2.398
v -59.848 		-50.0133 		1.0761
v -59.8176 		-50.0235 		1.2254
v -59.585 		-50.295 		1.255
v -59.8033 		-50.0282 		1.2966
v -59.6951 		-49.843 		1.79
v -59.8645 		-50.0078 		0.8472
v -59.8564 		-50.0105 		0.9586
v -59.8034 		-50.0282 		0.5975
v -59.8151 		-50.0243 		0.6177
v -59.8481 		-50.0133 		0.6718
v -59.8536 		-50.0115 		0.7294
v -59.738 		-49.853 		1.77
v -59.691 		-50.194 		1.256
v -59.904 		-50.0192 		1.6551
v -59.955 		-50.036 		1.6392
v -59.657 		-50.278 		1.284
v -59.6 		-50.174 		1.218
v -59.9614 		-50.0439 		1.6354
v -59.9647 		-50.048 		1.6354
v -59.9826 		-50.0701 		1.6355
v -60.019 		-50.115 		1.6356
v -60.031 		-50.1298 		1.6356
v -60.019 		-50.115 		1.5614
v -59.9842 		-50.072 		1.3455
v -60.006 		-50.099 		1.4812
v -59.9762 		-50.0622 		1.2359
v -59.9647 		-50.048 		1.0782
v -59.9701 		-50.0546 		1.0409
v -59.9842 		-50.072 		0.9414
v -59.9957 		-50.0862 		0.9483
v -60.019 		-50.115 		0.9626
v -60.0251 		-50.1426 		1.6355
v -60.0261 		-50.137 		1.6355
v -60.0238 		-50.137 		1.6279
v -60.0238 		-50.137 		0.9299
v -60.0281 		-50.1562 		0.9325
v -60.0391 		-50.3335 		1.6344
v -60.0258 		-50.314 		1.6344
v -60.0237 		-50.3109 		1.6344
v -60.019 		-50.332 		1.6342
v -60.023 		-50.314 		1.6251
v -60.019 		-50.332 		1.5702
v -60.0244 		-50.3076 		1.6344
v -60.0245 		-50.3071 		1.6344
v -60.0428 		-50.225 		0.9371
v -60.023 		-50.314 		0.927
v -60.0384 		-50.2448 		0.9341
v -60.0197 		-50.3287 		0.9491
v -60.019 		-50.332 		0.9539
v -59.9622 		-50.403 		1.6331
v -59.9568 		-50.4097 		1.633
v -59.955 		-50.412 		1.633
v -60.0029 		-50.3522 		1.6339
v -60.014 		-50.3382 		1.5392
v -59.9814 		-50.379 		1.3362
v -59.9691 		-50.3944 		1.1655
v -59.9622 		-50.403 		1.0697
v -59.9814 		-50.379 		0.9321
v -59.9771 		-50.3844 		0.9627
v -59.9622 		-50.403 		1.536
v -59.904 		-50.4288 		1.6325
# 398 vertices

g group_0_4634441

usemtl color_4634441
s 0

f 4 	72 	5
f 3 	4 	5
f 54 	192 	53
f 15 	212 	14
f 3 	357 	30
f 35 	3 	34
f 30 	34 	3
f 4 	3 	36
f 35 	36 	3
f 214 	8 	10
f 214 	39 	8
f 8 	39 	27
f 27 	37 	8
f 350 	26 	354
f 40 	44 	354
f 40 	354 	31
f 278 	45 	46
f 278 	46 	47
f 45 	354 	44
f 194 	85 	53
f 53 	55 	54
f 278 	47 	56
f 278 	56 	57
f 3 	248 	58
f 64 	61 	63
f 278 	57 	61
f 67 	61 	57
f 63 	61 	67
f 41 	271 	68
f 330 	41 	68
f 69 	61 	77
f 69 	70 	61
f 70 	71 	61
f 83 	61 	71
f 72 	74 	5
f 84 	68 	83
f 217 	68 	224
f 75 	61 	64
f 75 	76 	61
f 76 	77 	61
f 5 	74 	78
f 5 	78 	79
f 5 	79 	80
f 80 	92 	5
f 225 	68 	84
f 52 	87 	82
f 81 	269 	59
f 81 	82 	87
f 85 	55 	53
f 85 	42 	86
f 86 	89 	85
f 85 	204 	42
f 58 	351 	3
f 85 	89 	55
f 86 	55 	89
f 43 	90 	86
f 86 	60 	55
f 60 	86 	90
f 2 	87 	1
f 65 	62 	95
f 68 	95 	62
f 96 	97 	5
f 92 	96 	5
f 93 	5 	97
f 93 	97 	116
f 95 	94 	65
f 51 	98 	50
f 50 	98 	38
f 50 	38 	48
f 49 	48 	38
f 48 	277 	50
f 94 	95 	158
f 160 	158 	95
f 93 	116 	113
f 93 	113 	114
f 115 	93 	114
f 115 	122 	93
f 336 	153 	337
f 68 	217 	95
f 117 	118 	119
f 123 	93 	122
f 118 	120 	121
f 118 	121 	119
f 23 	212 	124
f 124 	212 	123
f 119 	73 	125
f 119 	121 	73
f 38 	98 	128
f 143 	66 	90
f 138 	130 	128
f 127 	200 	129
f 66 	60 	90
f 42 	43 	86
f 130 	264 	128
f 119 	349 	117
f 207 	209 	43
f 119 	133 	131
f 65 	94 	133
f 128 	98 	138
f 133 	125 	65
f 66 	143 	134
f 133 	119 	125
f 2 	127 	135
f 135 	87 	2
f 269 	87 	135
f 130 	138 	137
f 143 	136 	134
f 139 	130 	137
f 139 	140 	130
f 43 	132 	90
f 132 	143 	90
f 91 	133 	94
f 255 	91 	158
f 144 	143 	132
f 144 	145 	143
f 144 	136 	145
f 143 	145 	136
f 151 	54 	55
f 147 	148 	158
f 255 	158 	148
f 148 	156 	255
f 150 	151 	55
f 152 	151 	150
f 337 	154 	157
f 239 	179 	153
f 154 	153 	179
f 155 	157 	154
f 352 	3 	351
f 91 	94 	158
f 168 	150 	55
f 229 	175 	95
f 160 	95 	162
f 32 	337 	157
f 163 	160 	164
f 162 	164 	160
f 159 	32 	157
f 134 	171 	66
f 158 	160 	163
f 158 	163 	165
f 158 	165 	166
f 158 	166 	167
f 158 	167 	182
f 51 	108 	99
f 51 	99 	98
f 55 	60 	168
f 108 	172 	99
f 173 	170 	10
f 168 	66 	171
f 99 	218 	138
f 66 	168 	60
f 98 	99 	138
f 10 	170 	193
f 161 	162 	95
f 176 	155 	179
f 134 	191 	171
f 177 	152 	150
f 179 	239 	177
f 93 	123 	212
f 212 	23 	13
f 13 	14 	212
f 93 	174 	136
f 178 	179 	177
f 136 	144 	93
f 178 	187 	179
f 188 	184 	181
f 180 	181 	179
f 176 	179 	181
f 150 	178 	177
f 183 	158 	182
f 174 	93 	212
f 146 	147 	158
f 183 	146 	158
f 155 	176 	157
f 184 	157 	176
f 180 	179 	187
f 176 	181 	184
f 191 	134 	136
f 24 	174 	27
f 190 	192 	185
f 249 	185 	192
f 181 	180 	188
f 187 	188 	180
f 212 	27 	174
f 174 	24 	191
f 188 	178 	189
f 187 	178 	188
f 190 	88 	192
f 184 	193 	159
f 184 	188 	193
f 196 	194 	190
f 191 	136 	174
f 88 	53 	192
f 157 	184 	159
f 88 	190 	194
f 194 	53 	88
f 188 	195 	193
f 194 	196 	85
f 118 	117 	108
f 50 	277 	51
f 51 	277 	108
f 197 	200 	196
f 24 	195 	201
f 202 	198 	199
f 199 	203 	202
f 169 	203 	205
f 199 	205 	203
f 99 	172 	206
f 195 	188 	189
f 195 	189 	201
f 204 	85 	196
f 42 	204 	207
f 204 	208 	207
f 172 	169 	206
f 205 	206 	169
f 200 	208 	204
f 205 	199 	206
f 132 	43 	209
f 150 	168 	189
f 207 	43 	42
f 178 	150 	189
f 196 	200 	204
f 24 	201 	191
f 208 	2 	207
f 189 	168 	171
f 2 	208 	127
f 200 	127 	208
f 202 	203 	198
f 171 	191 	201
f 2 	209 	207
f 189 	171 	201
f 2 	5 	209
f 170 	210 	159
f 5 	132 	209
f 210 	32 	159
f 173 	10 	8
f 93 	144 	5
f 206 	199 	216
f 2 	1 	5
f 144 	132 	5
f 5 	87 	3
f 211 	263 	37
f 87 	5 	1
f 15 	387 	212
f 37 	27 	212
f 159 	193 	170
f 257 	255 	213
f 260 	257 	213
f 195 	214 	10
f 213 	215 	260
f 288 	289 	198
f 24 	214 	195
f 24 	27 	214
f 27 	39 	214
f 193 	195 	10
f 222 	223 	217
f 61 	83 	68
f 219 	137 	218
f 137 	138 	218
f 302 	216 	308
f 222 	217 	224
f 99 	206 	218
f 199 	292 	216
f 232 	219 	218
f 95 	217 	230
f 223 	230 	217
f 219 	221 	139
f 224 	68 	225
f 219 	139 	137
f 272 	221 	226
f 170 	173 	210
f 227 	210 	173
f 316 	317 	227
f 232 	218 	206
f 95 	230 	229
f 175 	161 	95
f 232 	206 	216
f 219 	232 	234
f 232 	235 	234
f 232 	236 	235
f 235 	293 	237
f 238 	228 	249
f 228 	185 	249
f 245 	247 	244
f 245 	246 	247
f 232 	216 	236
f 3 	52 	248
f 234 	221 	219
f 252 	250 	247
f 248 	247 	250
f 250 	251 	248
f 251 	58 	248
f 246 	253 	247
f 254 	221 	234
f 247 	253 	252
f 238 	249 	152
f 151 	152 	249
f 256 	244 	255
f 237 	221 	254
f 54 	151 	192
f 156 	213 	255
f 226 	221 	237
f 244 	91 	255
f 237 	234 	235
f 177 	239 	152
f 254 	234 	237
f 249 	192 	151
f 238 	239 	228
f 239 	336 	228
f 141 	129 	190
f 264 	265 	128
f 238 	152 	239
f 155 	154 	179
f 142 	141 	231
f 231 	233 	142
f 38 	128 	265
f 266 	267 	275
f 275 	49 	266
f 49 	38 	266
f 38 	268 	266
f 265 	268 	38
f 233 	279 	269
f 270 	41 	264
f 130 	270 	264
f 233 	269 	142
f 61 	68 	271
f 271 	41 	270
f 268 	121 	266
f 172 	108 	276
f 270 	272 	271
f 270 	139 	272
f 273 	274 	59
f 270 	140 	139
f 139 	221 	272
f 275 	48 	49
f 273 	276 	274
f 120 	277 	121
f 130 	140 	270
f 266 	121 	277
f 120 	108 	277
f 269 	273 	59
f 277 	267 	266
f 271 	278 	61
f 273 	269 	276
f 121 	268 	73
f 272 	226 	271
f 278 	271 	226
f 282 	294 	281
f 285 	294 	282
f 108 	342 	276
f 118 	108 	120
f 275 	277 	48
f 267 	277 	275
f 297 	306 	296
f 169 	276 	280
f 169 	172 	276
f 226 	237 	278
f 283 	282 	281
f 279 	276 	269
f 279 	280 	276
f 8 	37 	283
f 279 	233 	32
f 288 	198 	280
f 32 	210 	279
f 235 	236 	284
f 199 	198 	289
f 236 	286 	284
f 236 	216 	286
f 289 	292 	199
f 317 	216 	292
f 285 	282 	37
f 283 	37 	282
f 203 	280 	198
f 169 	280 	203
f 210 	288 	279
f 284 	293 	235
f 287 	295 	290
f 295 	313 	290
f 280 	279 	288
f 289 	288 	210
f 37 	263 	291
f 287 	291 	295
f 278 	237 	293
f 292 	289 	210
f 285 	37 	291
f 295 	291 	263
f 306 	294 	291
f 286 	216 	302
f 285 	291 	294
f 298 	296 	290
f 294 	306 	304
f 300 	304 	299
f 305 	307 	306
f 309 	302 	308
f 299 	304 	306
f 307 	299 	306
f 301 	304 	300
f 12 	304 	301
f 310 	298 	290
f 281 	294 	303
f 290 	311 	310
f 312 	303 	302
f 296 	306 	290
f 287 	290 	306
f 305 	306 	297
f 309 	312 	302
f 306 	291 	287
f 313 	314 	290
f 311 	290 	314
f 283 	281 	173
f 281 	303 	173
f 303 	312 	173
f 308 	173 	309
f 309 	173 	312
f 294 	315 	286
f 315 	284 	286
f 248 	91 	247
f 308 	216 	316
f 216 	317 	316
f 294 	286 	302
f 316 	227 	308
f 173 	308 	227
f 302 	303 	294
f 6 	320 	7
f 173 	8 	283
f 7 	350 	9
f 11 	9 	350
f 261 	262 	260
f 258 	260 	262
f 215 	261 	260
f 210 	227 	292
f 292 	227 	317
f 323 	65 	73
f 320 	321 	350
f 18 	320 	6
f 350 	7 	320
f 73 	268 	323
f 20 	19 	350
f 321 	20 	350
f 325 	259 	324
f 326 	259 	325
f 258 	324 	259
f 323 	62 	65
f 327 	328 	329
f 329 	326 	327
f 325 	327 	326
f 258 	262 	324
f 268 	265 	323
f 330 	62 	323
f 330 	68 	62
f 265 	264 	330
f 264 	41 	330
f 265 	330 	323
f 125 	73 	65
f 141 	190 	185
f 141 	127 	129
f 153 	336 	239
f 185 	228 	231
f 231 	141 	185
f 154 	337 	153
f 228 	336 	337
f 190 	197 	196
f 337 	231 	228
f 190 	200 	197
f 32 	233 	337
f 142 	127 	141
f 233 	231 	337
f 142 	135 	127
f 190 	129 	200
f 315 	294 	304
f 91 	349 	133
f 342 	108 	117
f 340 	315 	304
f 340 	293 	284
f 274 	276 	342
f 340 	284 	315
f 342 	349 	274
f 342 	117 	349
f 119 	131 	349
f 131 	133 	349
f 33 	28 	357
f 350 	304 	12
f 11 	350 	12
f 350 	353 	304
f 340 	353 	350
f 349 	91 	81
f 340 	304 	353
f 81 	59 	349
f 45 	278 	354
f 3 	355 	356
f 3 	352 	355
f 357 	3 	356
f 19 	26 	350
f 31 	354 	26
f 358 	33 	357
f 359 	33 	358
f 135 	142 	269
f 29 	30 	357
f 274 	349 	59
f 354 	278 	293
f 28 	29 	357
f 82 	81 	91
f 354 	293 	340
f 354 	340 	350
f 52 	91 	248
f 244 	247 	91
f 82 	91 	52
f 3 	87 	52
f 269 	81 	87
f 358 	369 	370
f 358 	370 	359
f 15 	25 	390
f 375 	377 	374
f 376 	377 	375
f 377 	390 	374
f 25 	374 	390
f 375 	381 	380
f 375 	380 	376
f 389 	398 	212
f 388 	389 	212
f 387 	388 	212
f 390 	387 	15
f 398 	211 	212
f 37 	212 	211
# 523 faces

g group_0_11107152

usemtl color_11107152
s 0

f 12 	17 	11
f 17 	12 	16
f 18 	6 	17
f 22 	16 	12
f 7 	9 	17
f 7 	17 	6
f 13 	392 	14
f 19 	20 	17
f 22 	12 	21
f 12 	110 	21
f 17 	26 	19
f 15 	391 	25
f 31 	22 	40
f 26 	16 	31
f 45 	21 	46
f 45 	44 	21
f 21 	44 	40
f 57 	243 	67
f 34 	363 	35
f 36 	363 	4
f 35 	363 	36
f 4 	364 	72
f 365 	72 	364
f 220 	71 	70
f 70 	69 	220
f 333 	220 	69
f 72 	365 	74
f 76 	75 	333
f 64 	333 	75
f 69 	77 	333
f 76 	333 	77
f 71 	220 	83
f 346 	225 	220
f 46 	21 	47
f 242 	56 	240
f 47 	240 	56
f 242 	57 	56
f 63 	331 	64
f 67 	243 	63
f 126 	80 	79
f 78 	126 	79
f 366 	126 	74
f 78 	74 	126
f 100 	101 	102
f 100 	102 	103
f 100 	103 	104
f 100 	104 	105
f 100 	105 	106
f 100 	106 	107
f 100 	107 	109
f 100 	109 	110
f 100 	110 	111
f 100 	111 	112
f 113 	384 	114
f 114 	384 	115
f 97 	382 	116
f 383 	385 	115
f 366 	74 	365
f 80 	373 	92
f 373 	149 	96
f 382 	97 	149
f 113 	116 	382
f 186 	148 	147
f 156 	148 	186
f 343 	344 	161
f 163 	164 	344
f 164 	162 	344
f 162 	161 	344
f 175 	229 	343
f 161 	175 	343
f 167 	166 	338
f 338 	166 	165
f 146 	183 	339
f 182 	167 	339
f 338 	339 	167
f 183 	182 	339
f 215 	213 	186
f 213 	156 	186
f 83 	220 	84
f 84 	220 	225
f 346 	347 	225
f 224 	225 	347
f 347 	223 	222
f 222 	224 	347
f 348 	343 	229
f 347 	348 	223
f 230 	223 	348
f 229 	230 	348
f 165 	163 	344
f 240 	21 	110
f 242 	110 	241
f 240 	110 	242
f 243 	241 	109
f 109 	241 	110
f 147 	339 	186
f 112 	263 	100
f 211 	100 	263
f 263 	112 	295
f 111 	295 	112
f 313 	295 	296
f 296 	295 	297
f 299 	295 	300
f 307 	295 	299
f 297 	295 	305
f 110 	12 	111
f 301 	300 	111
f 305 	295 	307
f 301 	111 	12
f 111 	300 	295
f 296 	298 	313
f 298 	310 	313
f 311 	314 	310
f 314 	313 	310
f 319 	262 	318
f 261 	318 	262
f 318 	261 	186
f 322 	318 	186
f 321 	320 	17
f 18 	17 	320
f 215 	186 	261
f 20 	321 	17
f 16 	26 	17
f 16 	22 	31
f 21 	40 	22
f 328 	327 	319
f 319 	325 	324
f 262 	319 	324
f 325 	319 	327
f 240 	47 	21
f 241 	57 	242
f 220 	333 	334
f 64 	331 	332
f 241 	243 	57
f 331 	63 	243
f 64 	332 	333
f 244 	335 	252
f 245 	244 	252
f 246 	245 	252
f 9 	11 	17
f 253 	246 	252
f 244 	255 	335
f 256 	255 	244
f 255 	257 	335
f 251 	250 	335
f 252 	335 	250
f 318 	335 	319
f 258 	335 	260
f 326 	319 	259
f 335 	258 	319
f 259 	319 	258
f 260 	335 	257
f 318 	322 	335
f 326 	329 	319
f 328 	319 	329
f 331 	109 	332
f 243 	109 	331
f 107 	332 	109
f 107 	334 	333
f 333 	332 	107
f 338 	165 	344
f 147 	146 	339
f 341 	186 	339
f 341 	322 	186
f 334 	345 	220
f 220 	345 	346
f 251 	335 	58
f 335 	322 	58
f 344 	343 	58
f 338 	344 	58
f 338 	58 	339
f 339 	58 	341
f 341 	58 	322
f 106 	58 	343
f 107 	106 	345
f 107 	345 	334
f 348 	347 	106
f 345 	106 	346
f 347 	346 	106
f 343 	348 	106
f 364 	4 	363
f 352 	106 	105
f 106 	351 	58
f 351 	106 	352
f 28 	362 	29
f 30 	29 	362
f 28 	33 	360
f 28 	360 	362
f 360 	33 	359
f 361 	30 	362
f 361 	34 	30
f 363 	34 	361
f 367 	368 	126
f 126 	366 	367
f 368 	372 	126
f 352 	362 	355
f 356 	362 	357
f 105 	364 	352
f 355 	362 	356
f 360 	357 	362
f 362 	352 	361
f 358 	357 	360
f 363 	352 	364
f 361 	352 	363
f 364 	105 	365
f 365 	105 	366
f 366 	105 	104
f 104 	368 	367
f 104 	367 	366
f 371 	370 	369
f 370 	371 	359
f 360 	359 	371
f 80 	126 	372
f 372 	373 	80
f 96 	92 	373
f 97 	96 	149
f 369 	358 	371
f 360 	371 	358
f 373 	372 	103
f 149 	373 	103
f 104 	372 	368
f 104 	103 	372
f 15 	14 	392
f 374 	25 	391
f 391 	379 	374
f 378 	374 	379
f 378 	375 	374
f 378 	381 	375
f 13 	23 	393
f 383 	115 	384
f 113 	382 	384
f 122 	115 	385
f 122 	385 	386
f 122 	386 	123
f 395 	123 	386
f 395 	396 	123
f 379 	377 	378
f 381 	378 	380
f 378 	377 	376
f 376 	380 	378
f 149 	103 	382
f 102 	383 	103
f 384 	103 	383
f 382 	103 	384
f 102 	386 	385
f 102 	385 	383
f 393 	392 	13
f 394 	393 	23
f 391 	15 	392
f 396 	394 	124
f 23 	124 	394
f 124 	123 	396
f 397 	394 	389
f 394 	101 	389
f 387 	397 	388
f 389 	388 	397
f 102 	101 	395
f 392 	397 	391
f 391 	397 	379
f 379 	397 	390
f 377 	379 	390
f 393 	397 	392
f 387 	390 	397
f 393 	394 	397
f 101 	396 	395
f 102 	395 	386
f 394 	396 	101
f 101 	100 	398
f 211 	398 	100
f 389 	101 	398
# 269 faces

#end of obj_0

`;
var mapleTree4 = `
# Color definition for Tinkercad Obj File 2015

newmtl color_4634441
Ka 0 0 0 
Kd 0.27450980392156865 0.7176470588235294 0.28627450980392155
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -63.768 		-50.122 		3.911
v -63.558 		-50.585 		2.208
v -62.8306 		-50.2773 		1.966
v -63.2287 		-50.5382 		2.204
v -63.2111 		-50.5614 		2.2036
v -63.1845 		-50.5963 		2.203
v -63.676 		-50.807 		2.546
v -63.186 		-51.14 		2.895
v -63.676 		-50.798 		2.884
v -62.8286 		-50.298 		1.9658
v -62.8496 		-50.3582 		1.9653
v -63.186 		-51.149 		2.547
v -63.647 		-50.756 		2.293
v -62.8219 		-50.2787 		1.9659
v -62.8299 		-50.2782 		1.9413
v -62.8265 		-50.2784 		1.9516
v -62.8219 		-50.2787 		1.9659
v -62.8241 		-50.2786 		1.959
v -62.8223 		-50.2787 		1.9646
v -63.782 		-49.906 		3.839
v -63.879 		-49.871 		3.617
v -63.854 		-50.162 		3.613
v -62.8328 		-50.4496 		1.9642
v -62.8278 		-50.456 		1.9641
v -63.4348 		-49.8036 		3.968
v -63.239 		-49.623 		3.944
v -62.8659 		-50.4243 		1.293
v -62.8012 		-50.4159 		1.293
v -63.272 		-49.544 		3.641
v -63.0563 		-50.4511 		1.293
v -63.7843 		-49.8012 		3.4682
v -62.9804 		-50.421 		1.293
v -63.717 		-49.7474 		3.4815
v -63.171 		-50.3522 		2.028
v -63.2105 		-50.4005 		2.0466
v -63.263 		-49.551 		3.236
v -63.2113 		-50.401 		2.048
v -63.8591 		-50.0719 		3.4891
v -63.8561 		-50.1068 		3.496
v -63.7921 		-49.8075 		3.4667
v -63.8752 		-49.8744 		3.4504
v -62.9544 		-50.3836 		1.293
v -62.9503 		-50.3888 		1.293
v -64.02 		-50.15 		3.449
v -63.785 		-49.689 		3.449
v -63.1552 		-50.3329 		2.0206
v -63.1514 		-50.328 		2.0195
v -62.9528 		-50.2099 		1.9951
v -63.478 		-49.632 		3.2107
v -63.4851 		-49.6341 		3.2318
v -63.254 		-49.558 		2.832
v -63.214 		-51.065 		2.355
v -62.9287 		-50.2603 		1.9821
v -62.926 		-50.265 		1.848
v -61.966 		-50.815 		2.184
v -62.431 		-51.126 		2.184
v -62.653 		-51.181 		2.184
v -62.852 		-51.034 		2.184
v -63.041 		-50.786 		2.183
v -62.9692 		-50.328 		1.4574
v -62.9718 		-50.3428 		1.4338
v -62.798 		-50.1571 		1.6898
v -62.822 		-50.1621 		1.6966
v -62.646 		-51.106 		2.058
v -63.4315 		-49.6844 		2.6682
v -63.4698 		-49.6479 		2.8083
v -63.4167 		-49.6985 		2.6132
v -63.469 		-49.655 		2.546
v -63.697 		-49.523 		3.202
v -62.6608 		-50.9305 		2.804
v -62.626 		-50.9176 		2.804
v -62.8242 		-50.1645 		1.6978
v -62.992 		-51.063 		2.832
v -62.834 		-50.176 		1.7063
v -63.399 		-49.716 		2.546
v -62.883 		-50.206 		1.737
v -62.8625 		-50.2099 		1.7314
v -62.871 		-50.2331 		1.7704
v -63.0171 		-51.0022 		2.6054
v -63.032 		-51.0291 		2.6998
v -63.0051 		-50.9801 		2.5487
v -63.0048 		-50.9795 		2.547
v -63.032 		-51.033 		2.547
v -62.7155 		-49.8161 		2.421
v -62.6982 		-49.8117 		2.423
v -62.8601 		-50.276 		1.848
v -63.1426 		-49.6462 		3.968
v -62.8682 		-50.2556 		1.8021
v -62.8245 		-50.0405 		1.6635
v -62.8335 		-50.0348 		1.6657
v -62.648 		-49.144 		2.052
v -62.798 		-50.0555 		1.6616
v -64.086 		-50.1 		3.199
v -62.016 		-50.758 		2.014
v -63.851 		-49.638 		3.199
v -62.797 		-51 		2.015
v -62.986 		-50.753 		2.018
v -63.851 		-50.1641 		3.496
v -62.481 		-51.069 		2.014
v -62.624 		-50.886 		1.959
v -63.9215 		-50.235 		3.496
v -62.424 		-51.112 		2.641
v -62.427 		-51.119 		2.412
v -63.6995 		-50.6034 		3.496
v -63.8728 		-50.4191 		3.496
v -63.911 		-50.495 		3.46
v -63.13 		-50.2177 		2.0167
v -63.1282 		-50.2026 		2.0194
v -63.128 		-50.201 		2.0197
v -63.1369 		-50.254 		2.0175
v -63.019 		-50.07 		1.847
v -61.962 		-50.808 		2.412
v -63.024 		-50.063 		2.045
v -62.12 		-50.037 		2.383
v -62.3524 		-50.6723 		3.968
v -62.317 		-50.681 		3.962
v -62.1734 		-50.0689 		2.3976
v -62.1521 		-50.1003 		2.3405
v -62.1549 		-50.0962 		2.348
v -62.324 		-50.666 		3.968
v -62.026 		-49.874 		2.06
v -64.108 		-50.33 		3.202
v -62.271 		-50.772 		3.654
v -64.034 		-50.325 		3.388
v -62.03 		-49.867 		2.27
v -63.94 		-50.559 		3.211
v -63.677 		-50.788 		3.222
v -62.057 		-50.092 		2.059
v -62.061 		-50.086 		2.269
v -62.262 		-50.779 		3.244
v -62.1342 		-50.1323 		2.183
v -62.1335 		-50.1286 		2.2665
v -62.144 		-50.1391 		2.157
v -62.1421 		-50.1378 		2.162
v -63.696 		-49.532 		2.874
v -61.993 		-50.7185 		2.804
v -61.958 		-50.801 		2.641
v -61.9979 		-50.7297 		2.804
v -62.0017 		-50.735 		2.804
v -63.85 		-49.648 		2.872
v -64.085 		-50.109 		2.872
v -62.4528 		-51.0368 		2.804
v -63.696 		-49.541 		2.545
v -63.0917 		-51.0652 		3.0293
v -63.09 		-51.0677 		2.8956
v -64.085 		-50.119 		2.545
v -63.85 		-49.657 		2.545
v -63.0893 		-51.0688 		2.8317
v -63.784 		-49.721 		2.299
v -62.253 		-50.786 		2.833
v -62.2561 		-50.7785 		2.804
v -62.2914 		-50.7916 		2.804
v -62.718 		-49.769 		2.423
v -64.108 		-50.34 		2.874
v -64.107 		-50.349 		2.545
v -63.94 		-50.569 		2.878
v -63.939 		-50.578 		2.546
v -62.7155 		-49.816 		2.4233
v -62.9866 		-50.8455 		2.4051
v -62.834 		-50.783 		3.968
v -63.1091 		-50.8449 		3.968
v -63.057 		-50.957 		3.925
v -62.687 		-50.819 		3.944
v -63.0134 		-50.8167 		2.287
v -63.4789 		-49.6415 		2.8778
v -63.4789 		-49.6412 		2.8907
v -63.4784 		-49.6383 		2.9943
v -63.008 		-50.9766 		2.5338
v -62.7155 		-50.7577 		3.968
v -63.098 		-50.983 		2.287
v -63.822 		-50.357 		2.213
v -64.019 		-50.183 		2.299
v -63.4789 		-49.6427 		2.832
v -63.4789 		-49.6419 		2.8649
v -63.91 		-50.527 		2.296
v -63.0013 		-50.1097 		2.021
v -63.38 		-49.946 		2.2532
v -62.953 		-50.063 		1.699
v -63.399 		-49.7211 		2.5316
v -62.9204 		-50.1952 		1.5819
v -62.9547 		-50.201 		1.4843
v -62.9714 		-50.2645 		1.5003
v -62.9704 		-50.2926 		1.4816
v -62.8886 		-49.962 		1.6775
v -62.8972 		-49.946 		1.6792
v -62.8718 		-49.9932 		1.6743
v -62.8582 		-50.0192 		1.6717
v -62.8822 		-49.8068 		1.6695
v -62.8897 		-49.8216 		1.6721
v -62.9021 		-49.8459 		1.6764
v -62.8962 		-50.0622 		1.4997
v -62.8612 		-49.7648 		1.6621
v -62.8244 		-50.1099 		1.4762
v -62.9027 		-50.1 		1.3883
v -62.8606 		-49.7644 		1.662
v -62.9017 		-49.893 		1.6783
v -62.1818 		-50.1653 		2.0569
v -62.685 		-49.7189 		1.6455
v -62.6929 		-49.7146 		1.6456
v -62.6997 		-49.7109 		1.6457
v -62.7885 		-49.7164 		1.6467
v -62.1985 		-50.0346 		2.421
v -62.2778 		-49.9304 		2.421
v -62.2946 		-49.9084 		2.421
v -62.8402 		-49.7508 		1.6559
v -62.3135 		-49.8944 		2.421
v -62.961 		-49.893 		1.0589
v -62.8101 		-49.7311 		1.647
v -62.0979 		-49.893 		2.421
v -62.0939 		-49.8808 		2.421
v -62.0929 		-49.8738 		2.421
v -62.0955 		-49.8562 		2.421
v -62.197 		-49.137 		1.849
v -62.104 		-49.331 		1.849
v -62.381 		-49.177 		1.693
v -62.163 		-49.348 		1.691
v -62.8106 		-50.478 		1.9637
v -62.349 		-49.385 		1.641
v -62.235 		-49.203 		1.733
v -62.022 		-49.881 		1.849
v -62.053 		-50.099 		1.849
v -62.7784 		-50.153 		1.6842
v -62.081 		-49.898 		1.691
v -62.685 		-50.1697 		1.6835
v -62.7394 		-50.1455 		1.6756
v -62.7837 		-50.0637 		1.6606
v -62.688 		-50.1566 		1.5498
v -62.1963 		-50.1756 		2.0183
v -62.7484 		-50.1467 		1.6756
v -62.7499 		-50.1471 		1.676
v -62.7535 		-50.1478 		1.6771
v -62.267 		-49.935 		1.641
v -62.107 		-50.058 		1.733
v -62.237 		-50.139 		1.693
v -62.7603 		-50.0632 		1.6551
v -62.7129 		-50.0593 		1.656
v -62.7607 		-50.0632 		1.6552
v -62.171 		-50.209 		2.018
v -62.6973 		-50.0581 		1.6562
v -62.6965 		-50.058 		1.6562
v -62.7624 		-50.0632 		1.6556
v -62.7905 		-50.1062 		1.4808
v -62.7496 		-50.1182 		1.4161
v -62.6969 		-50.1783 		1.293
v -62.6914 		-50.2103 		1.293
v -62.23 		-50.203 		1.848
v -62.2219 		-50.191 		2.0107
v -62.2331 		-50.1976 		2.0073
v -62.685 		-50.0503 		1.6547
v -62.7392 		-50.1172 		1.3544
v -62.7401 		-50.1239 		1.293
v -62.314 		-50.2136 		1.9881
v -62.7399 		-50.1238 		1.293
v -62.7063 		-50.1011 		1.293
v -62.374 		-49.608 		3.668
v -63.1843 		-49.9436 		2.4303
v -63.2175 		-49.9093 		2.446
v -62.366 		-49.616 		3.251
v -62.641 		-50.91 		3.641
v -63.011 		-51.048 		3.627
v -63.0393 		-50.7831 		2.2742
v -63.0826 		-50.7275 		2.253
v -61.838 		-50.636 		2.184
v -61.835 		-50.629 		2.411
v -61.922 		-50.622 		2.058
v -62.158 		-50.575 		1.959
v -62.632 		-50.917 		3.236
v -62.2489 		-50.5267 		3.968
v -62.141 		-50.539 		3.892
v -62.033 		-50.583 		3.665
v -63.001 		-51.056 		3.229
v -62.024 		-50.59 		3.249
v -61.911 		-50.6 		2.763
v -61.831 		-50.622 		2.639
v -63.1534 		-51.0622 		3.3418
v -63.094 		-51.0609 		3.2438
v -61.9787 		-50.5173 		2.804
v -62.016 		-50.597 		2.834
v -63.0928 		-51.0637 		3.1104
v -63.0938 		-51.0613 		3.2275
v -62.0267 		-50.5729 		2.804
v -62.0287 		-50.5924 		2.804
v -62.0422 		-50.6076 		2.804
v -62.652 		-49.137 		2.257
v -62.849 		-51.027 		2.408
v -62.5947 		-49.2293 		2.421
v -62.645 		-49.201 		2.41
v -63.3102 		-49.8136 		2.4896
v -63.2855 		-49.8393 		2.4779
v -62.845 		-51.019 		2.633
v -62.644 		-49.151 		1.848
v -63.609 		-49.762 		3.925
v -63.5586 		-49.8723 		3.968
v -63.641 		-49.682 		3.627
v -62.63 		-49.224 		1.695
v -62.598 		-49.432 		1.644
v -62.9465 		-50.8921 		2.5119
v -62.9095 		-50.9398 		2.5324
v -62.631 		-49.476 		3.892
v -62.585 		-49.387 		3.665
v -62.8883 		-50.9621 		2.6314
v -62.9026 		-50.9469 		2.5643
v -62.576 		-49.394 		3.249
v -62.8687 		-50.9644 		2.6625
v -62.8837 		-50.9626 		2.6387
v -62.567 		-49.401 		2.834
v -63.6408 		-49.688 		3.4545
v -62.604 		-49.499 		2.604
v -63.5615 		-49.6574 		3.4334
v -63.6371 		-49.6851 		3.4524
v -63.668 		-49.607 		3.388
v -62.5177 		-49.7671 		2.421
v -62.4936 		-49.7612 		2.421
v -63.5424 		-49.651 		3.4034
v -64.033 		-50.354 		2.362
v -63.525 		-49.6459 		3.3514
v -62.968 		-50.8652 		2.4863
v -62.9644 		-50.8691 		2.502
v -63.587 		-49.895 		2.213
v -63.498 		-49.72 		2.296
v -62.488 		-49.6226 		3.968
v -62.4759 		-49.6315 		3.968
v -62.4704 		-49.6372 		3.968
v -63.668 		-49.636 		2.362
v -63.1427 		-50.2838 		2.0183
v -62.5662 		-49.7776 		2.4682
v -62.4922 		-49.7589 		2.4934
v -62.8907 		-49.9332 		2.421
v -63.3138 		-50.7515 		3.968
v -63.453 		-50.805 		3.911
v -63.087 		-49.907 		2.429
v -62.6708 		-50.176 		1.6855
v -62.479 		-50.25 		1.848
v -63.327 		-51.067 		3.617
v -63.291 		-50.969 		3.839
v -62.4818 		-50.2466 		1.9638
v -62.6517 		-50.1845 		1.6882
v -63.318 		-51.074 		3.224
v -63.4002 		-50.9887 		3.3477
v -63.3349 		-51.0564 		3.2368
v -62.9611 		-49.893 		1.293
v -62.9641 		-49.8988 		1.293
v -62.9868 		-49.942 		1.293
v -63.2927 		-51.0719 		3.2572
v -63.2564 		-51.0683 		3.3297
v -62.9016 		-49.9098 		1.6789
v -62.9011 		-49.9376 		1.6799
v -62.9011 		-49.9388 		1.6799
v -63.3023 		-51.0728 		3.2379
v -63.413 		-51.017 		3.234
v -62.812 		-50.638 		1.962
v -63.328 		-51.0631 		3.107
v -63.3341 		-51.0571 		3.2238
v -63.2378 		-50.4174 		2.0948
v -63.238 		-50.4174 		2.0954
v -63.3325 		-51.0586 		3.1957
v -62.9639 		-49.9828 		2.397
v -63.3024 		-51.0731 		3.2242
v -62.9761 		-49.9911 		2.393
v -62.635 		-51.084 		2.763
v -62.9795 		-49.9925 		2.4281
v -63.4529 		-50.9337 		3.3709
v -62.645 		-51.166 		2.639
v -63.3648 		-50.456 		2.2063
v -63.309 		-51.082 		2.831
v -62.649 		-51.174 		2.411
v -63.413 		-51.035 		2.547
v -63.0316 		-50.0273 		2.429
v -63.413 		-51.026 		2.89
v -63.3163 		-51.0746 		2.8921
v -63.3129 		-51.0779 		2.831
v -63.3052 		-51.0818 		2.831
v -63.3051 		-51.0817 		2.8361
v -63.3046 		-51.0804 		2.8924
v -63.3032 		-51.0765 		3.07
v -63.3102 		-51.0793 		2.8279
v -62.6937 		-50.9947 		2.804
v -63.3082 		-51.0804 		2.827
v -63.3065 		-51.0811 		2.8284
v -62.4862 		-51.0483 		2.804
v -62.4667 		-51.046 		2.804
v -62.4732 		-51.0476 		2.804
v -63.0705 		-50.0541 		2.397
v -63.0636 		-50.0487 		2.4295
v -63.078 		-50.0362 		2.4296
v -62.623 		-50.925 		2.832
v -63.383 		-50.984 		2.289
v -62.7824 		-50.9753 		2.802
v -62.7726 		-50.9723 		2.804
v -62.7832 		-50.9756 		2.8018
v -62.7836 		-50.9756 		2.8015
v -63.295 		-50.813 		2.203
v -62.7848 		-50.9755 		2.7999
v -63.0124 		-50.0875 		2.0709
v -63.0306 		-50.0327 		2.183
v -63.0258 		-50.0598 		2.1324
v -63.0258 		-50.0599 		2.1323
v -63.538 		-50.845 		3.613
v -62.5135 		-50.359 		1.9629
v -62.5213 		-50.3134 		1.9634
v -63.4699 		-50.4131 		3.968
v -63.6293 		-50.0685 		3.968
v -62.357 		-49.623 		2.834
v -62.102 		-50.15 		2.626
v -63.647 		-50.724 		3.476
v -63.626 		-50.6821 		3.496
v -62.5334 		-50.298 		1.9636
v -62.5695 		-50.2674 		1.8486
v -62.5696 		-50.2674 		1.848
v -62.5798 		-50.2579 		1.8215
v -62.562 		-50.2621 		1.9642
v -63.5977 		-50.712 		3.496
v -63.5551 		-50.804 		3.4812
v -62.562 		-50.262 		1.9642
v -62.5624 		-50.2622 		1.959
v -62.6277 		-50.2136 		1.6961
v -62.6276 		-50.2138 		1.6966
v -62.5962 		-50.2427 		1.7791
v -63.5333 		-50.8492 		3.4076
v -62.3509 		-49.8621 		2.522
v -62.2031 		-50.0609 		2.6902
v -62.1381 		-50.1713 		2.7323
v -62.486 		-50.187 		1.695
v -62.516 		-49.982 		1.644
v -62.7748 		-50.5238 		1.963
v -63.6296 		-50.6427 		3.496
v -62.7587 		-50.5306 		1.9628
v -62.6927 		-50.5582 		1.962
v -62.6906 		-50.5591 		1.962
v -62.6027 		-50.5476 		1.9616
v -63.1295 		-50.1953 		2.021
v -63.1399 		-50.1862 		2.048
v -62.5353 		-50.4915 		1.9617
v -62.5528 		-50.478 		1.8949
v -62.9514 		-50.1676 		1.4547
v -62.9524 		-50.1705 		1.4595
v -63.2727 		-50.421 		2.1948
v -62.5307 		-50.478 		1.9618
v -63.2725 		-50.4224 		2.183
v -63.2541 		-50.421 		2.1375
v -63.3104 		-50.4345 		2.2057
v -63.3083 		-50.4337 		2.2057
v -63.2762 		-50.421 		2.2054
v -62.961 		-50.478 		-0.004
v -63.099 		-50.439 		-0.004
v -63.2 		-50.332 		-0.004
v -63.238 		-50.185 		-0.004
v -63.2 		-50.039 		-0.004
v -63.099 		-49.932 		-0.004
v -62.961 		-49.893 		-0.004
v -62.823 		-49.932 		-0.004
v -62.722 		-50.039 		-0.004
v -62.685 		-50.185 		-0.004
v -62.722 		-50.332 		-0.004
v -62.823 		-50.439 		-0.004
v -61.921 		-50.412 		2.184
v -62.9391 		-50.073 		1.3645
v -62.9294 		-50.0999 		1.3494
v -61.918 		-50.405 		2.408
v -62.9276 		-50.1024 		1.3452
v -62.291 		-49.902 		2.618
v -62.3058 		-49.8911 		2.6176
v -62.2952 		-49.9045 		2.6306
v -61.983 		-50.456 		2.015
v -62.9726 		-50.0202 		1.3551
v -62.9834 		-49.983 		1.3086
v -62.9842 		-49.98 		1.3048
v -62.9487 		-50.0577 		1.3615
v -62.6453 		-50.0237 		1.6496
v -62.6223 		-50.0084 		1.6467
v -62.9868 		-49.9775 		1.293
v -63.0687 		-49.946 		1.293
v -63.137 		-49.9723 		1.293
v -63.238 		-49.98 		1.5425
v -63.1925 		-50.0311 		1.293
v -63.2012 		-50.0436 		1.293
v -62.1636 		-50.3025 		3.968
v -62.1564 		-50.3418 		3.968
v -62.059 		-50.292 		3.668
v -62.1554 		-50.3202 		3.968
v -62.961 		-50.478 		1.293
v -62.1548 		-50.3277 		3.968
v -62.685 		-50.185 		1.293
v -63.099 		-49.932 		1.293
v -62.05 		-50.299 		3.251
v -62.823 		-50.439 		1.293
v -61.914 		-50.397 		2.633
v -63.2 		-50.039 		1.293
v -62.7898 		-50.4038 		1.2477
v -62.7307 		-50.3412 		1.216
v -62.722 		-50.332 		1.2326
v -61.969 		-50.431 		2.802
v -62.7024 		-50.2543 		1.2107
v -61.9752 		-50.4351 		2.804
v -62.042 		-50.306 		2.834
v -62.7057 		-50.1033 		1.268
v -62.7125 		-50.0764 		1.04
v -62.7086 		-50.0919 		1.1687
v -62.685 		-49.9515 		1.1642
v -62.722 		-50.039 		0.9969
v -62.0549 		-50.312 		2.7868
v -63.0316 		-50.0319 		2.243
v -62.1026 		-50.2316 		2.7551
v -63.0929 		-50.0717 		2.2908
v -62.0509 		-50.3236 		2.7972
v -62.0453 		-50.3643 		2.804
v -63.1839 		-50.1337 		2.2438
v -62.403 		-49.09 		2.263
v -62.399 		-49.097 		2.056
v -63.185 		-50.136 		2.183
v -63.1913 		-50.1448 		2.183
v -63.1965 		-50.1518 		2.2029
v -63.1913 		-50.1448 		2.1829
v -63.1965 		-50.1519 		2.203
v -62.5179 		-50.4413 		1.962
v -62.5055 		-50.4058 		1.9623
v -63.1517 		-50.176 		2.0783
v -63.1682 		-50.1616 		2.1211
v -63.1694 		-50.1607 		2.1244
v -63.2031 		-50.1608 		2.2284
v -63.235 		-49.948 		2.293
v -62.347 		-50.327 		1.962
v -63.2032 		-50.1609 		2.2289
v -63.1907 		-50.1434 		2.2385
v -63.2088 		-50.1406 		2.2344
v -63.2172 		-50.1098 		2.2426
v -63.2269 		-50.073 		2.2524
v -63.2735 		-50.4183 		2.203
v -63.2737 		-50.4175 		2.2054
v -62.205 		-49.123 		2.269
v -62.201 		-49.13 		2.059
v -63.2691 		-50.0158 		2.2601
v -63.2955 		-49.98 		2.2651
v -63.238 		-50.058 		2.2544
v -62.3337 		-49.2026 		2.421
v -62.1861 		-49.3075 		2.421
v -62.248 		-49.182 		2.383
v -63.4208 		-49.9639 		2.2356
v -62.1789 		-49.3176 		2.421
v -62.1759 		-49.3238 		2.421
v -62.112 		-49.318 		2.27
v -63.4576 		-49.98 		2.2198
v -63.4674 		-49.9983 		2.2107
v -63.488 		-50.0281 		2.2108
v -62.108 		-49.324 		2.06
v -63.001 		-50.391 		1.966
v -63.4663 		-50.328 		2.048
v -63.4658 		-50.4037 		2.208
v -63.4537 		-50.421 		2.2077
v -63.488 		-50.3718 		2.2085
v -62.5915 		-49.9494 		1.6448
v -62.579 		-49.9249 		1.6446
v -62.619 		-50.0019 		1.6452
v -62.6187 		-50.0014 		1.6452
v -63.5192 		-50.073 		2.2109
v -63.5383 		-50.176 		2.2105
v -62.5789 		-49.8868 		1.6446
v -62.5789 		-49.8324 		1.6445
v -62.5789 		-49.8312 		1.6445
v -63.5429 		-50.201 		2.2104
v -62.7428 		-50.017 		0.9028
v -63.5186 		-50.328 		2.2092
v -62.7601 		-49.9987 		0.8842
v -62.8013 		-49.955 		0.8381
v -62.8178 		-49.9375 		0.8607
v -62.823 		-49.932 		0.8679
v -62.6117 		-49.7739 		1.6448
v -62.6236 		-49.7528 		1.6449
v -62.6788 		-49.7223 		1.6454
v -62.8803 		-49.9158 		0.8278
v -62.9476 		-49.8968 		0.9266
v -62.9559 		-49.8944 		1.0072
v -63.238 		-50.185 		1.2791
v -63.2114 		-49.6836 		3.968
v -63.229 		-50.539 		2.183
v -62.9782 		-49.8979 		1.1323
v -63.1443 		-49.98 		1.2535
v -63.174 		-50.505 		2.02
v -63.2089 		-50.073 		1.2538
v -63.2339 		-50.201 		1.2571
v -63.201 		-50.328 		1.2297
v -63.2 		-50.332 		1.235
v -63.207 		-49.649 		2.529
v -63.116 		-50.421 		1.1662
v -63.099 		-50.439 		1.2539
v -63.0388 		-50.456 		1.2008
v -63.187 		-51.131 		3.242
v -62.8824 		-49.3337 		2.421
v -62.106 		-50.157 		2.404
v -62.799 		-49.302 		2.421
v -63.2068 		-51.0645 		3.3765
v -63.2035 		-51.0643 		3.3743
v -62.895 		-49.248 		2.4
v -62.396 		-49.154 		2.419
v -62.3948 		-49.1618 		2.421
v -62.9596 		-49.4708 		2.421
v -62.902 		-49.184 		2.25
v -62.898 		-49.191 		2.049
v -62.394 		-49.103 		1.848
v -63.051 		-49.489 		2.393
v -63.025 		-49.329 		2.357
v -63.079 		-49.288 		2.244
v -63.11 		-49.506 		2.243
v -62.179 		-50.0612 		2.4028
v -62.893 		-49.198 		1.848
v -62.88 		-49.272 		1.697
v -62.11 		-50.164 		2.183
v -62.443 		-49.663 		2.522
v -62.848 		-49.48 		1.647
v -62.398 		-49.8276 		2.5125
v -63.074 		-49.295 		2.046
v -63.07 		-49.302 		1.848
v -63.106 		-49.513 		2.045
v -63.101 		-49.52 		1.847
v -63.036 		-49.514 		1.699
v -63.011 		-49.35 		1.737
v -62.869 		-49.485 		3.962
v -62.8622 		-49.4999 		3.968
v -62.6993 		-49.5506 		3.968
v -62.902 		-49.405 		3.654
v -62.4176 		-50.2343 		1.9635
v -62.893 		-49.413 		3.244
v -62.884 		-49.42 		2.833
v -62.838 		-49.511 		2.525
# 624 vertices

g group_0_4634441

usemtl color_4634441
s 0

f 6 	392 	5
f 14 	10 	3
f 14 	3 	17
f 19 	3 	18
f 8 	367 	12
f 17 	3 	19
f 20 	21 	1
f 13 	171 	2
f 23 	546 	11
f 1 	21 	22
f 31 	21 	33
f 38 	39 	22
f 22 	21 	38
f 31 	40 	21
f 41 	21 	40
f 38 	21 	41
f 44 	41 	45
f 309 	294 	29
f 38 	44 	39
f 38 	41 	44
f 40 	45 	41
f 44 	95 	93
f 45 	95 	44
f 36 	50 	316
f 22 	39 	98
f 47 	325 	546
f 49 	50 	36
f 40 	31 	45
f 33 	45 	31
f 74 	77 	178
f 69 	50 	49
f 546 	107 	53
f 54 	53 	48
f 94 	55 	56
f 18 	3 	16
f 167 	49 	36
f 75 	67 	583
f 54 	88 	86
f 65 	66 	51
f 76 	78 	54
f 166 	167 	51
f 88 	54 	78
f 51 	67 	65
f 58 	285 	59
f 261 	262 	59
f 179 	75 	583
f 164 	261 	59
f 178 	89 	63
f 165 	166 	51
f 69 	45 	311
f 66 	65 	68
f 67 	68 	65
f 72 	178 	63
f 72 	74 	178
f 15 	16 	54
f 54 	16 	53
f 3 	53 	16
f 51 	583 	67
f 76 	178 	77
f 77 	78 	76
f 68 	67 	75
f 79 	73 	80
f 165 	51 	174
f 312 	84 	85
f 173 	51 	66
f 286 	590 	312
f 15 	54 	86
f 583 	288 	179
f 89 	178 	90
f 320 	68 	179
f 92 	226 	62
f 62 	63 	92
f 222 	62 	226
f 96 	64 	57
f 93 	122 	44
f 122 	124 	44
f 45 	69 	95
f 97 	96 	58
f 96 	57 	58
f 59 	97 	58
f 99 	56 	57
f 57 	64 	99
f 99 	94 	56
f 64 	96 	99
f 96 	100 	99
f 101 	39 	44
f 55 	103 	56
f 104 	105 	106
f 176 	48 	109
f 431 	176 	109
f 108 	109 	48
f 126 	127 	106
f 432 	394 	431
f 110 	546 	325
f 48 	176 	111
f 55 	112 	103
f 394 	113 	176
f 117 	119 	114
f 119 	118 	114
f 129 	114 	118
f 116 	120 	115
f 116 	163 	123
f 121 	129 	128
f 156 	126 	154
f 44 	106 	101
f 105 	101 	106
f 124 	106 	44
f 125 	129 	121
f 106 	124 	122
f 93 	141 	122
f 154 	122 	141
f 122 	126 	106
f 272 	123 	130
f 127 	126 	156
f 126 	122 	154
f 132 	131 	129
f 129 	131 	128
f 22 	98 	426
f 39 	101 	98
f 98 	101 	105
f 134 	128 	131
f 98 	105 	104
f 135 	95 	69
f 139 	137 	138
f 128 	134 	133
f 138 	274 	136
f 135 	140 	95
f 139 	142 	137
f 140 	135 	143
f 80 	83 	79
f 83 	82 	81
f 83 	81 	79
f 148 	80 	73
f 141 	93 	140
f 141 	147 	146
f 140 	147 	141
f 93 	95 	140
f 102 	137 	142
f 165 	174 	135
f 112 	137 	102
f 154 	141 	146
f 145 	144 	8
f 147 	140 	143
f 143 	149 	147
f 12 	83 	8
f 149 	146 	147
f 102 	103 	112
f 83 	80 	8
f 139 	151 	142
f 145 	8 	148
f 152 	142 	151
f 152 	151 	150
f 146 	155 	154
f 150 	386 	152
f 130 	386 	150
f 157 	156 	155
f 130 	267 	386
f 156 	154 	155
f 138 	283 	139
f 158 	85 	84
f 85 	158 	153
f 148 	8 	80
f 160 	161 	162
f 160 	162 	163
f 285 	159 	164
f 285 	164 	59
f 36 	51 	167
f 163 	169 	160
f 116 	115 	163
f 169 	163 	115
f 157 	9 	156
f 149 	319 	172
f 172 	146 	149
f 174 	51 	173
f 113 	394 	397
f 174 	173 	143
f 68 	143 	66
f 108 	48 	107
f 107 	546 	110
f 143 	135 	174
f 53 	107 	48
f 166 	69 	167
f 49 	167 	69
f 111 	54 	48
f 155 	315 	175
f 177 	538 	319
f 113 	111 	176
f 538 	542 	319
f 155 	175 	157
f 111 	178 	54
f 178 	76 	54
f 75 	179 	68
f 184 	178 	185
f 184 	186 	178
f 187 	178 	186
f 614 	113 	613
f 397 	613 	113
f 615 	188 	189
f 615 	189 	190
f 190 	196 	615
f 178 	111 	615
f 188 	615 	192
f 178 	187 	90
f 200 	201 	609
f 196 	346 	615
f 133 	607 	197
f 128 	133 	197
f 199 	200 	609
f 197 	228 	128
f 208 	609 	201
f 192 	615 	195
f 195 	615 	205
f 212 	204 	211
f 210 	211 	204
f 204 	203 	209
f 209 	203 	202
f 209 	210 	204
f 214 	121 	220
f 214 	213 	545
f 213 	531 	545
f 220 	216 	214
f 546 	23 	351
f 24 	351 	23
f 217 	351 	24
f 215 	216 	218
f 215 	219 	216
f 213 	214 	216
f 216 	219 	213
f 219 	215 	213
f 128 	221 	220
f 121 	128 	220
f 216 	220 	223
f 235 	236 	225
f 231 	226 	230
f 607 	238 	197
f 128 	246 	221
f 229 	235 	225
f 230 	241 	229
f 92 	63 	89
f 231 	222 	226
f 246 	128 	228
f 216 	223 	218
f 232 	218 	223
f 221 	223 	220
f 221 	233 	223
f 233 	234 	223
f 234 	232 	223
f 234 	233 	221
f 224 	236 	332
f 235 	229 	237
f 423 	236 	239
f 423 	239 	240
f 237 	229 	241
f 241 	230 	226
f 228 	197 	238
f 247 	228 	238
f 247 	238 	248
f 247 	246 	228
f 248 	246 	247
f 252 	248 	522
f 238 	522 	248
f 248 	252 	246
f 234 	221 	246
f 320 	289 	521
f 256 	385 	521
f 83 	170 	168
f 164 	159 	170
f 120 	87 	115
f 168 	82 	83
f 317 	168 	159
f 170 	159 	168
f 123 	163 	259
f 262 	261 	170
f 164 	170 	261
f 162 	259 	163
f 170 	392 	262
f 12 	170 	83
f 12 	52 	170
f 52 	387 	170
f 387 	392 	170
f 263 	112 	55
f 263 	264 	112
f 260 	259 	162
f 137 	112 	264
f 271 	259 	260
f 55 	94 	263
f 265 	263 	94
f 94 	266 	464
f 265 	94 	464
f 94 	99 	266
f 99 	100 	266
f 268 	120 	116
f 123 	267 	130
f 123 	259 	267
f 116 	269 	268
f 267 	259 	271
f 270 	116 	123
f 269 	116 	270
f 123 	272 	270
f 260 	276 	271
f 271 	280 	279
f 272 	150 	278
f 280 	271 	276
f 272 	130 	150
f 137 	274 	138
f 273 	136 	274
f 264 	274 	137
f 136 	273 	277
f 282 	283 	136
f 271 	73 	267
f 271 	144 	73
f 148 	73 	145
f 144 	271 	279
f 277 	282 	136
f 138 	136 	283
f 145 	73 	144
f 282 	277 	281
f 279 	280 	587
f 276 	587 	280
f 281 	278 	282
f 151 	139 	283
f 151 	283 	150
f 278 	150 	283
f 283 	282 	278
f 179 	288 	320
f 292 	293 	25
f 25 	26 	292
f 402 	293 	1
f 1 	293 	292
f 304 	305 	290
f 292 	20 	1
f 292 	21 	20
f 605 	91 	291
f 292 	29 	294
f 26 	29 	292
f 290 	302 	285
f 21 	292 	294
f 79 	305 	73
f 298 	297 	285
f 297 	298 	168
f 299 	321 	300
f 301 	302 	290
f 301 	290 	305
f 298 	285 	302
f 304 	393 	73
f 303 	622 	300
f 307 	33 	294
f 81 	305 	79
f 310 	307 	294
f 310 	294 	309
f 304 	73 	305
f 33 	21 	294
f 81 	302 	301
f 33 	307 	45
f 81 	301 	305
f 168 	298 	82
f 82 	302 	81
f 302 	82 	298
f 308 	624 	306
f 309 	311 	310
f 45 	307 	311
f 310 	311 	307
f 309 	29 	314
f 69 	311 	314
f 309 	314 	311
f 595 	286 	313
f 29 	36 	316
f 318 	317 	297
f 172 	155 	146
f 285 	317 	159
f 172 	315 	155
f 175 	172 	171
f 172 	175 	315
f 316 	314 	29
f 285 	297 	317
f 314 	316 	69
f 50 	69 	316
f 7 	157 	175
f 69 	166 	135
f 165 	135 	166
f 318 	297 	168
f 317 	318 	168
f 127 	156 	9
f 173 	66 	143
f 366 	57 	56
f 366 	285 	58
f 157 	7 	9
f 322 	300 	321
f 619 	87 	321
f 143 	324 	149
f 149 	320 	319
f 326 	327 	312
f 320 	149 	324
f 289 	320 	288
f 313 	312 	327
f 68 	320 	143
f 153 	624 	608
f 257 	521 	289
f 326 	312 	85
f 171 	13 	175
f 608 	326 	153
f 7 	175 	13
f 85 	153 	326
f 439 	440 	575
f 361 	158 	328
f 328 	84 	596
f 477 	87 	268
f 224 	225 	236
f 330 	398 	334
f 334 	335 	330
f 84 	328 	158
f 414 	415 	336
f 361 	331 	158
f 153 	158 	331
f 162 	335 	334
f 332 	236 	337
f 423 	337 	236
f 417 	423 	418
f 384 	385 	368
f 368 	385 	331
f 334 	398 	419
f 334 	419 	362
f 362 	339 	334
f 345 	591 	334
f 111 	113 	614
f 339 	340 	334
f 338 	334 	340
f 338 	340 	353
f 348 	185 	178
f 338 	344 	334
f 344 	345 	334
f 348 	178 	347
f 346 	347 	178
f 178 	615 	346
f 344 	338 	349
f 339 	350 	340
f 546 	351 	97
f 349 	587 	344
f 574 	169 	87
f 25 	293 	401
f 96 	97 	351
f 160 	169 	574
f 574 	25 	160
f 365 	338 	370
f 338 	353 	356
f 356 	352 	338
f 352 	370 	338
f 358 	349 	338
f 328 	357 	361
f 365 	374 	338
f 375 	338 	374
f 358 	375 	587
f 356 	350 	352
f 340 	350 	353
f 357 	328 	600
f 359 	357 	600
f 353 	350 	356
f 8 	587 	375
f 369 	352 	350
f 382 	363 	102
f 383 	368 	357
f 339 	362 	350
f 360 	363 	380
f 357 	359 	383
f 360 	391 	363
f 548 	549 	2
f 441 	392 	364
f 373 	374 	365
f 103 	102 	363
f 365 	378 	379
f 103 	363 	366
f 366 	56 	103
f 361 	357 	368
f 371 	365 	370
f 58 	57 	366
f 373 	365 	372
f 366 	363 	290
f 358 	338 	375
f 366 	290 	285
f 365 	371 	376
f 384 	368 	383
f 376 	378 	365
f 365 	379 	372
f 377 	388 	360
f 380 	377 	360
f 142 	381 	102
f 381 	382 	102
f 382 	380 	363
f 352 	369 	370
f 391 	393 	363
f 374 	8 	375
f 391 	360 	390
f 371 	369 	367
f 370 	369 	371
f 373 	372 	8
f 374 	373 	8
f 385 	384 	383
f 371 	367 	376
f 8 	379 	367
f 376 	367 	378
f 372 	379 	8
f 142 	152 	71
f 70 	380 	71
f 377 	380 	70
f 382 	71 	380
f 381 	71 	382
f 142 	71 	381
f 378 	367 	379
f 7 	367 	369
f 369 	9 	7
f 152 	386 	71
f 350 	9 	369
f 386 	267 	73
f 517 	394 	432
f 387 	367 	13
f 388 	377 	389
f 390 	360 	388
f 7 	13 	367
f 290 	363 	393
f 394 	517 	397
f 393 	304 	290
f 387 	12 	367
f 389 	377 	70
f 52 	12 	387
f 396 	397 	510
f 73 	389 	386
f 395 	396 	510
f 2 	364 	392
f 397 	396 	613
f 70 	386 	389
f 389 	73 	388
f 393 	391 	73
f 502 	603 	395
f 392 	387 	2
f 388 	73 	390
f 395 	613 	396
f 176 	431 	394
f 390 	73 	391
f 398 	330 	22
f 70 	71 	386
f 320 	324 	143
f 516 	399 	522
f 161 	160 	401
f 329 	401 	330
f 25 	401 	160
f 329 	161 	401
f 415 	333 	336
f 403 	258 	485
f 418 	333 	410
f 416 	423 	417
f 426 	398 	22
f 104 	106 	405
f 406 	104 	405
f 408 	409 	333
f 409 	410 	333
f 414 	336 	411
f 336 	400 	407
f 413 	398 	412
f 413 	412 	405
f 407 	411 	336
f 406 	405 	412
f 408 	333 	415
f 419 	398 	413
f 412 	398 	426
f 406 	412 	426
f 204 	461 	203
f 610 	420 	206
f 420 	204 	206
f 405 	127 	350
f 404 	421 	422
f 416 	337 	423
f 405 	106 	127
f 240 	249 	423
f 469 	470 	423
f 350 	419 	405
f 333 	418 	423
f 413 	405 	419
f 419 	350 	362
f 100 	96 	351
f 350 	127 	9
f 351 	217 	425
f 428 	429 	351
f 406 	426 	104
f 98 	104 	426
f 351 	425 	427
f 351 	427 	428
f 548 	2 	550
f 387 	13 	2
f 100 	351 	429
f 429 	430 	100
f 522 	266 	100
f 433 	100 	430
f 402 	401 	293
f 330 	401 	1
f 438 	522 	433
f 614 	615 	111
f 515 	522 	438
f 401 	402 	1
f 1 	22 	330
f 437 	439 	4
f 575 	4 	439
f 354 	575 	355
f 440 	355 	575
f 528 	437 	4
f 442 	4 	441
f 443 	4 	442
f 264 	263 	456
f 456 	459 	264
f 462 	463 	461
f 404 	461 	421
f 463 	421 	461
f 459 	274 	264
f 422 	503 	404
f 404 	589 	604
f 404 	203 	461
f 461 	204 	462
f 420 	462 	204
f 495 	422 	421
f 462 	420 	608
f 462 	608 	463
f 495 	463 	608
f 421 	463 	495
f 263 	464 	456
f 551 	424 	553
f 469 	423 	249
f 470 	553 	423
f 424 	423 	553
f 263 	265 	464
f 255 	477 	479
f 480 	479 	477
f 480 	482 	479
f 268 	269 	478
f 482 	270 	479
f 258 	255 	479
f 482 	478 	270
f 269 	270 	478
f 478 	482 	268
f 482 	480 	268
f 477 	268 	480
f 485 	270 	272
f 479 	485 	258
f 479 	270 	485
f 403 	485 	495
f 485 	272 	495
f 459 	487 	274
f 589 	404 	487
f 273 	274 	492
f 487 	492 	274
f 501 	505 	487
f 492 	487 	505
f 502 	395 	504
f 600 	603 	359
f 494 	277 	492
f 273 	492 	277
f 503 	501 	487
f 494 	492 	506
f 368 	331 	361
f 487 	404 	503
f 501 	503 	495
f 422 	495 	503
f 495 	272 	278
f 359 	502 	504
f 506 	505 	495
f 504 	521 	383
f 505 	506 	492
f 505 	501 	495
f 494 	506 	277
f 281 	277 	506
f 525 	526 	524
f 507 	526 	504
f 504 	383 	359
f 495 	278 	506
f 256 	331 	385
f 278 	281 	506
f 385 	383 	521
f 257 	256 	521
f 509 	508 	530
f 115 	87 	169
f 268 	87 	120
f 510 	511 	512
f 510 	513 	511
f 100 	433 	522
f 507 	510 	512
f 287 	594 	508
f 510 	507 	395
f 513 	510 	519
f 522 	515 	516
f 510 	397 	518
f 518 	519 	510
f 517 	518 	397
f 514 	524 	507
f 512 	514 	507
f 520 	524 	514
f 508 	509 	91
f 504 	395 	507
f 320 	521 	319
f 523 	524 	520
f 456 	464 	238
f 522 	238 	464
f 266 	522 	464
f 507 	524 	526
f 526 	527 	504
f 527 	534 	504
f 521 	504 	534
f 532 	521 	534
f 525 	524 	523
f 4 	529 	528
f 443 	529 	4
f 532 	533 	521
f 319 	521 	177
f 533 	177 	521
f 531 	509 	530
f 535 	536 	537
f 539 	540 	541
f 530 	539 	541
f 543 	319 	542
f 537 	536 	530
f 539 	530 	536
f 46 	578 	34
f 11 	546 	10
f 3 	10 	546
f 364 	2 	549
f 546 	53 	3
f 424 	551 	552
f 424 	552 	557
f 97 	578 	546
f 546 	578 	46
f 551 	553 	554
f 46 	47 	546
f 543 	544 	319
f 544 	555 	319
f 171 	172 	319
f 171 	319 	555
f 555 	556 	171
f 556 	560 	171
f 198 	199 	296
f 557 	558 	424
f 558 	559 	424
f 296 	424 	559
f 559 	567 	296
f 560 	562 	171
f 550 	171 	562
f 567 	568 	296
f 568 	569 	296
f 198 	296 	569
f 171 	550 	2
f 574 	87 	26
f 25 	574 	26
f 262 	6 	59
f 6 	575 	59
f 36 	29 	620
f 35 	34 	578
f 575 	354 	578
f 354 	37 	578
f 35 	578 	37
f 578 	59 	575
f 578 	97 	59
f 329 	330 	161
f 162 	161 	330
f 583 	51 	623
f 330 	335 	162
f 331 	257 	583
f 334 	260 	162
f 545 	121 	214
f 289 	583 	257
f 288 	583 	289
f 541 	545 	531
f 256 	257 	331
f 541 	531 	530
f 545 	125 	121
f 541 	125 	545
f 260 	334 	591
f 592 	275 	260
f 276 	260 	275
f 212 	541 	540
f 589 	487 	459
f 593 	590 	287
f 286 	287 	590
f 275 	587 	276
f 592 	260 	591
f 588 	590 	593
f 594 	595 	535
f 535 	537 	594
f 537 	530 	594
f 530 	508 	594
f 591 	587 	592
f 275 	592 	587
f 594 	286 	595
f 287 	284 	593
f 345 	344 	587
f 312 	313 	286
f 596 	84 	588
f 593 	600 	588
f 212 	540 	204
f 539 	313 	540
f 590 	588 	84
f 536 	313 	539
f 591 	345 	587
f 204 	540 	206
f 287 	286 	594
f 144 	279 	587
f 284 	597 	593
f 8 	144 	587
f 84 	312 	590
f 349 	358 	587
f 535 	595 	313
f 313 	536 	535
f 6 	262 	392
f 206 	540 	313
f 599 	509 	531
f 599 	531 	213
f 575 	6 	5
f 5 	4 	575
f 596 	588 	600
f 441 	4 	392
f 600 	593 	601
f 599 	213 	215
f 4 	5 	392
f 600 	601 	602
f 601 	593 	602
f 602 	597 	598
f 509 	599 	291
f 597 	602 	593
f 291 	91 	509
f 502 	359 	603
f 611 	602 	598
f 295 	291 	599
f 607 	132 	589
f 613 	395 	603
f 202 	404 	604
f 203 	404 	202
f 602 	603 	600
f 602 	611 	603
f 296 	215 	218
f 589 	117 	604
f 603 	611 	613
f 209 	202 	114
f 296 	218 	232
f 604 	114 	202
f 117 	114 	604
f 215 	296 	295
f 295 	599 	215
f 212 	211 	125
f 212 	125 	541
f 323 	255 	322
f 300 	322 	255
f 129 	125 	210
f 211 	210 	125
f 459 	607 	589
f 609 	606 	295
f 258 	403 	306
f 210 	209 	129
f 209 	114 	129
f 296 	609 	295
f 303 	258 	306
f 459 	456 	607
f 607 	131 	132
f 118 	589 	132
f 291 	295 	606
f 608 	306 	403
f 134 	131 	607
f 609 	296 	199
f 420 	610 	608
f 615 	606 	609
f 495 	608 	403
f 605 	291 	606
f 206 	313 	610
f 456 	238 	607
f 134 	607 	133
f 605 	606 	612
f 477 	255 	323
f 208 	205 	615
f 208 	615 	609
f 322 	87 	323
f 303 	300 	255
f 611 	612 	613
f 258 	303 	255
f 612 	611 	598
f 598 	605 	612
f 327 	610 	313
f 132 	129 	118
f 589 	119 	117
f 614 	613 	612
f 327 	608 	610
f 589 	118 	119
f 615 	614 	612
f 326 	608 	327
f 306 	608 	308
f 616 	615 	612
f 323 	87 	477
f 606 	615 	616
f 612 	606 	616
f 399 	400 	522
f 619 	617 	618
f 619 	321 	299
f 619 	299 	617
f 299 	300 	617
f 424 	296 	232
f 300 	620 	617
f 300 	622 	620
f 424 	232 	234
f 522 	336 	621
f 617 	26 	87
f 617 	87 	618
f 29 	26 	620
f 621 	252 	522
f 26 	617 	620
f 621 	333 	252
f 621 	336 	333
f 618 	87 	619
f 322 	321 	87
f 246 	252 	333
f 423 	234 	246
f 622 	623 	51
f 234 	423 	424
f 36 	620 	622
f 336 	522 	400
f 423 	246 	333
f 623 	303 	306
f 622 	303 	623
f 623 	306 	624
f 598 	597 	284
f 36 	622 	51
f 583 	623 	624
f 284 	287 	508
f 624 	331 	583
f 624 	153 	331
f 284 	508 	91
f 91 	598 	284
f 624 	308 	608
f 598 	91 	605
f 596 	600 	328
# 932 faces

g group_0_11107152

usemtl color_11107152
s 0

f 86 	11 	15
f 10 	15 	11
f 16 	15 	10
f 18 	16 	10
f 10 	14 	19
f 19 	18 	10
f 14 	17 	19
f 43 	425 	61
f 32 	440 	30
f 88 	182 	86
f 61 	23 	60
f 60 	23 	183
f 183 	23 	182
f 42 	43 	61
f 72 	63 	180
f 194 	180 	63
f 72 	180 	74
f 74 	180 	77
f 180 	78 	77
f 180 	182 	78
f 90 	191 	89
f 34 	35 	60
f 32 	35 	37
f 35 	32 	61
f 42 	61 	32
f 47 	46 	60
f 46 	34 	60
f 61 	60 	35
f 181 	182 	180
f 11 	86 	182
f 436 	181 	180
f 11 	182 	23
f 194 	435 	180
f 88 	78 	182
f 185 	465 	184
f 184 	465 	186
f 191 	187 	186
f 342 	189 	341
f 189 	188 	341
f 188 	192 	341
f 193 	89 	191
f 187 	191 	90
f 191 	194 	193
f 194 	63 	193
f 108 	181 	109
f 108 	107 	181
f 342 	190 	189
f 343 	467 	190
f 569 	566 	198
f 198 	566 	199
f 570 	571 	200
f 195 	205 	576
f 207 	576 	205
f 572 	207 	205
f 201 	572 	208
f 205 	208 	572
f 570 	200 	566
f 201 	571 	572
f 23 	61 	24
f 24 	61 	217
f 489 	430 	28
f 62 	193 	63
f 222 	193 	62
f 242 	225 	227
f 193 	222 	242
f 230 	242 	231
f 225 	242 	229
f 242 	230 	229
f 231 	242 	222
f 89 	193 	92
f 193 	226 	92
f 242 	227 	243
f 243 	240 	242
f 236 	235 	242
f 241 	226 	242
f 239 	236 	242
f 235 	237 	242
f 237 	241 	242
f 193 	242 	226
f 240 	239 	242
f 227 	250 	243
f 251 	250 	244
f 227 	244 	250
f 469 	249 	243
f 469 	243 	250
f 240 	243 	249
f 251 	253 	250
f 469 	250 	253
f 253 	254 	469
f 496 	470 	254
f 110 	182 	107
f 181 	107 	182
f 110 	183 	182
f 224 	227 	225
f 224 	332 	227
f 332 	337 	227
f 190 	342 	343
f 347 	346 	465
f 347 	465 	348
f 466 	465 	346
f 471 	467 	343
f 196 	190 	466
f 346 	196 	466
f 185 	348 	465
f 355 	32 	354
f 354 	32 	37
f 400 	408 	407
f 337 	416 	227
f 415 	407 	408
f 408 	400 	409
f 410 	409 	244
f 418 	410 	244
f 417 	418 	244
f 244 	227 	416
f 415 	411 	407
f 414 	411 	415
f 417 	244 	416
f 400 	244 	409
f 244 	400 	245
f 217 	61 	425
f 428 	427 	27
f 429 	428 	27
f 427 	425 	27
f 43 	27 	425
f 325 	47 	183
f 60 	183 	47
f 430 	429 	28
f 27 	28 	429
f 110 	325 	183
f 433 	430 	434
f 436 	180 	435
f 466 	190 	467
f 438 	433 	434
f 186 	465 	468
f 444 	445 	446
f 444 	446 	447
f 444 	447 	448
f 444 	448 	449
f 444 	449 	450
f 444 	450 	451
f 444 	451 	452
f 444 	452 	453
f 444 	453 	454
f 444 	454 	455
f 458 	191 	457
f 468 	457 	191
f 186 	468 	191
f 194 	460 	435
f 194 	458 	460
f 191 	458 	194
f 109 	181 	431
f 181 	436 	431
f 436 	435 	431
f 519 	518 	435
f 526 	519 	435
f 457 	527 	435
f 435 	460 	458
f 435 	458 	457
f 466 	533 	465
f 532 	534 	465
f 471 	472 	467
f 473 	474 	472
f 474 	475 	476
f 474 	476 	579
f 547 	582 	584
f 483 	244 	245
f 244 	483 	254
f 253 	244 	254
f 251 	244 	253
f 472 	342 	484
f 343 	342 	472
f 341 	484 	342
f 471 	343 	472
f 32 	30 	481
f 43 	32 	27
f 486 	28 	27
f 486 	27 	481
f 42 	32 	43
f 481 	27 	32
f 484 	473 	472
f 488 	476 	475
f 455 	481 	444
f 486 	481 	455
f 434 	489 	490
f 490 	491 	434
f 486 	455 	489
f 486 	489 	28
f 489 	455 	490
f 455 	454 	490
f 491 	490 	454
f 434 	491 	493
f 400 	399 	245
f 493 	483 	245
f 491 	454 	493
f 454 	453 	493
f 483 	493 	453
f 498 	551 	496
f 489 	434 	430
f 493 	516 	434
f 515 	434 	516
f 438 	434 	515
f 399 	516 	245
f 493 	245 	516
f 437 	442 	439
f 439 	442 	440
f 364 	440 	441
f 442 	437 	443
f 526 	514 	512
f 526 	512 	511
f 513 	526 	511
f 32 	355 	440
f 529 	443 	528
f 437 	528 	443
f 517 	432 	435
f 518 	517 	435
f 519 	526 	513
f 432 	431 	435
f 526 	525 	514
f 523 	520 	525
f 520 	514 	525
f 532 	465 	533
f 468 	465 	527
f 467 	472 	533
f 526 	435 	527
f 467 	533 	466
f 534 	527 	465
f 472 	474 	177
f 457 	468 	527
f 177 	533 	472
f 542 	474 	543
f 543 	474 	544
f 469 	254 	470
f 497 	552 	498
f 550 	547 	548
f 498 	552 	551
f 551 	554 	553
f 470 	496 	553
f 553 	496 	551
f 254 	483 	496
f 498 	483 	497
f 496 	483 	498
f 452 	500 	453
f 497 	453 	500
f 559 	558 	499
f 483 	453 	497
f 579 	573 	555
f 556 	555 	573
f 552 	497 	499
f 500 	499 	497
f 499 	500 	561
f 557 	499 	558
f 552 	499 	557
f 567 	499 	563
f 561 	563 	499
f 564 	568 	563
f 567 	563 	568
f 547 	562 	560
f 569 	565 	566
f 569 	568 	565
f 564 	565 	568
f 499 	567 	559
f 451 	564 	452
f 452 	561 	500
f 549 	548 	547
f 547 	550 	562
f 565 	564 	451
f 563 	452 	564
f 561 	452 	563
f 451 	566 	565
f 364 	30 	440
f 442 	441 	440
f 199 	566 	200
f 201 	200 	571
f 542 	538 	474
f 538 	177 	474
f 474 	579 	555
f 555 	544 	474
f 450 	207 	572
f 580 	560 	573
f 560 	556 	573
f 570 	451 	450
f 580 	547 	560
f 451 	570 	566
f 450 	571 	570
f 549 	547 	584
f 572 	571 	450
f 364 	549 	585
f 584 	585 	549
f 192 	576 	341
f 192 	195 	576
f 341 	576 	484
f 449 	484 	207
f 576 	207 	484
f 207 	450 	449
f 577 	474 	473
f 577 	475 	474
f 484 	449 	577
f 488 	475 	448
f 484 	577 	473
f 449 	448 	577
f 475 	577 	448
f 488 	448 	579
f 476 	488 	579
f 447 	573 	579
f 579 	448 	447
f 547 	580 	581
f 581 	582 	547
f 580 	447 	581
f 573 	447 	580
f 446 	581 	447
f 446 	582 	581
f 446 	584 	582
f 584 	446 	445
f 585 	584 	445
f 364 	586 	30
f 585 	586 	364
f 30 	586 	481
f 586 	444 	481
f 585 	445 	586
f 444 	586 	445
# 320 faces

#end of obj_0

`;


var stoneWall = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -40.897 		-49.749 		-0.091
v -40.824 		-49.746 		-0.091
v -40.239 		-50.076 		1.023
v -40.824 		-49.966 		-0.091
v -40.897 		-49.968 		-0.091
v -40.313 		-50.076 		0.965
v -40.461 		-49.615 		0.604
v -40.539 		-49.589 		0.564
v -40.539 		-49.617 		0.604
v -40.166 		-49.638 		1.079
v -40.314 		-50.074 		1.022
v -40.846 		-49.715 		0.195
v -40.901 		-49.737 		0.143
v -40.239 		-50.078 		0.966
v -40.238 		-50.052 		0.924
v -40.92 		-49.708 		0.157
v -40.959 		-49.708 		0.16
v -40.674 		-49.621 		0.563
v -40.616 		-49.592 		0.564
v -40.24 		-49.662 		1.122
v -40.314 		-49.659 		1.123
v -40.617 		-49.618 		0.603
v -41.004 		-50.046 		0.7
v -40.369 		-49.659 		1.08
v -40.66 		-49.641 		0.593
v -40.314 		-49.633 		1.08
v -40.24 		-49.636 		1.079
v -40.313 		-50.05 		0.922
v -40.892 		-49.708 		0.17
v -40.313 		-49.968 		0.908
v -40.391 		-49.955 		1.007
v -40.555 		-49.704 		0.716
v -40.414 		-49.653 		1.067
v -40.556 		-49.702 		0.768
v -40.388 		-49.964 		0.964
v -40.388 		-49.962 		1.022
v -40.369 		-50.047 		0.964
v -40.369 		-50.044 		1.022
v -40.575 		-49.705 		0.676
v -40.112 		-49.749 		1.12
v -40.167 		-49.746 		1.135
v -40.167 		-49.665 		1.121
v -40.528 		-49.714 		0.732
v -40.092 		-49.75 		1.079
v -40.126 		-49.688 		1.11
v -40.091 		-49.752 		1.024
v -40.109 		-49.669 		1.024
v -40.111 		-49.668 		1.079
v -40.451 		-49.72 		0.678
v -40.469 		-49.645 		0.901
v -40.551 		-49.638 		0.901
v -40.508 		-49.719 		0.692
v -40.697 		-49.628 		0.944
v -40.636 		-49.61 		1.003
v -40.698 		-49.633 		1.002
v -40.786 		-49.674 		0.121
v -40.752 		-49.736 		0.089
v -40.634 		-49.706 		0.663
v -40.412 		-50.036 		1.007
v -40.752 		-49.739 		0.028
v -40.68 		-49.648 		0.912
v -40.635 		-49.606 		0.944
v -40.369 		-49.966 		0.921
v -40.787 		-50.04 		0.24
v -40.355 		-50.027 		0.932
v -40.634 		-49.63 		0.901
v -40.461 		-49.697 		0.617
v -40.539 		-49.699 		0.617
v -40.787 		-50.015 		0.196
v -40.539 		-49.918 		0.617
v -40.461 		-49.917 		0.617
v -40.831 		-49.994 		0.207
v -40.388 		-49.955 		0.947
v -40.085 		-49.723 		0.229
v -40.409 		-50.035 		0.947
v -40.617 		-49.7 		0.616
v -40.707 		-50.038 		0.24
v -40.675 		-49.702 		0.603
v -40.407 		-49.952 		0.901
v -40.617 		-49.919 		0.616
v -40.456 		-49.614 		0.876
v -40.694 		-49.704 		0.563
v -40.499 		-49.634 		0.866
v -40.575 		-49.62 		0.768
v -40.576 		-49.619 		0.821
v -40.707 		-50.012 		0.196
v -40.513 		-49.616 		0.837
v -40.423 		-50.012 		0.913
v -40.511 		-49.624 		0.784
v -40.827 		-49.954 		0.146
v -40.575 		-50.004 		0.768
v -40.772 		-49.953 		0.133
v -40.555 		-49.923 		0.716
v -40.556 		-49.922 		0.768
v -40.455 		-49.591 		0.837
v -40.575 		-50.005 		0.716
v -40.827 		-50.037 		0.131
v -40.454 		-49.598 		0.784
v -40.246 		-49.928 		0.874
v -40.303 		-49.924 		0.888
v -40.528 		-49.933 		0.732
v -40.786 		-49.933 		0.181
v -40.509 		-50.015 		0.732
v -40.452 		-50.042 		0.731
v -40.707 		-49.93 		0.182
v -40.214 		-49.951 		0.867
v -40.635 		-49.592 		0.821
v -40.635 		-49.593 		0.768
v -40.635 		-49.618 		0.86
v -40.635 		-49.618 		0.86
v -40.635 		-49.618 		0.86
v -40.882 		-49.925 		0.211
v -40.575 		-49.924 		0.676
v -40.226 		-49.93 		0.834
v -40.635 		-49.618 		0.86
v -40.591 		-49.64 		0.85
v -40.866 		-49.931 		0.239
v -40.846 		-49.935 		0.195
v -40.451 		-49.939 		0.678
v -40.303 		-50.007 		0.875
v -40.635 		-49.618 		0.86
v -40.26 		-49.988 		0.864
v -40.508 		-49.938 		0.692
v -40.451 		-50.02 		0.691
v -40.494 		-49.998 		0.702
v -40.303 		-50.036 		0.835
v -40.892 		-50.007 		0.211
v -40.92 		-50.036 		0.212
v -40.57 		-50.014 		0.354
v -40.958 		-50.037 		0.214
v -40.506 		-49.989 		0.376
v -40.551 		-49.932 		0.354
v -40.635 		-50.032 		0.768
v -40.245 		-50.011 		0.834
v -40.634 		-49.925 		0.663
v -40.634 		-50.007 		0.676
v -40.59 		-49.985 		0.686
v -40.544 		-49.928 		0.345
v -40.207 		-50.013 		0.856
v -40.523 		-50.011 		0.345
v -40.634 		-50.033 		0.715
v -40.461 		-50.04 		0.344
v -40.846 		-50.013 		0.239
v -40.539 		-50 		0.604
v -40.461 		-49.999 		0.604
v -40.223 		-49.952 		0.826
v -40.959 		-49.927 		0.16
v -40.461 		-50.025 		0.565
v -40.901 		-50.039 		0.128
v -40.226 		-49.931 		0.781
v -40.55 		-49.929 		0.297
v -40.569 		-50.011 		0.297
v -40.92 		-49.928 		0.157
v -40.539 		-50.028 		0.564
v -40.892 		-49.927 		0.17
v -40.222 		-49.953 		0.769
v -40.92 		-50.009 		0.171
v -40.546 		-49.933 		0.289
v -40.899 		-49.987 		0.181
v -40.461 		-50.025 		0.513
v -40.464 		-50.042 		0.289
v -40.302 		-50.039 		0.782
v -40.752 		-49.955 		0.089
v -40.099 		-49.665 		0.199
v -41.004 		-50.018 		0.66
v -40.786 		-50.015 		0.121
v -40.616 		-50.03 		0.564
v -40.771 		-50.038 		0.088
v -40.617 		-50.002 		0.603
v -41.021 		-49.993 		0.668
v -40.826 		-50.067 		0.087
v -41.028 		-50.013 		0.698
v -40.675 		-49.921 		0.603
v -40.093 		-49.726 		0.188
v -40.752 		-49.958 		0.028
v -40.694 		-49.923 		0.563
v -40.117 		-49.728 		0.177
v -40.77 		-50.041 		0.028
v -40.974 		-50.053 		0.703
v -40.179 		-49.734 		0.184
v -40.66 		-49.982 		0.593
v -40.974 		-50.052 		0.756
v -40.825 		-50.07 		0.027
v -40.148 		-49.731 		0.18
v -40.674 		-50.005 		0.563
v -41.024 		-50.032 		0.593
v -40.967 		-50.059 		0.594
v -40.143 		-49.71 		0.139
v -41.026 		-50.033 		0.539
v -40.969 		-50.06 		0.54
v -40.899 		-50.072 		0.026
v -40.9 		-50.069 		0.085
v -40.792 		-49.624 		0.675
v -40.713 		-49.624 		0.675
v -40.792 		-49.596 		0.714
v -40.966 		-50.031 		0.634
v -41.022 		-49.948 		0.633
v -40.971 		-49.651 		0.446
v -41.008 		-50.01 		0.623
v -40.085 		-49.71 		0.126
v -40.067 		-49.714 		0.087
v -41.028 		-49.651 		0.486
v -41.043 		-49.95 		0.592
v -40.314 		-49.741 		1.137
v -40.241 		-49.744 		1.136
v -40.069 		-49.72 		0.035
v -40.97 		-49.622 		0.487
v -41.045 		-49.952 		0.539
v -40.369 		-49.739 		1.123
v -40.196 		-49.673 		0.209
v -40.355 		-49.679 		1.112
v -40.388 		-49.74 		1.08
v -40.24 		-49.702 		0.192
v -40.394 		-49.737 		1.068
v -40.202 		-49.735 		0.2
v -40.417 		-49.737 		1.112
v -40.696 		-49.707 		0.9
v -40.432 		-49.675 		1.1
v -40.127 		-49.603 		0.443
v -40.083 		-49.624 		0.452
v -40.068 		-49.605 		0.483
v -40.21 		-49.732 		0.239
v -40.128 		-49.58 		0.485
v -40.218 		-49.706 		0.234
v -40.468 		-49.723 		0.887
v -40.457 		-49.726 		0.889
v -40.222 		-49.711 		0.14
v -40.301 		-49.712 		0.14
v -40.457 		-49.695 		0.889
v -40.714 		-49.594 		0.767
v -40.113 		-49.635 		0.381
v -40.713 		-49.595 		0.715
v -40.471 		-49.727 		0.886
v -40.302 		-49.705 		0.178
v -40.095 		-49.657 		0.37
v -40.214 		-50.034 		0.825
v -40.63 		-50.039 		0.355
v -40.089 		-49.636 		0.34
v -40.994 		-49.601 		0.268
v -40.213 		-50.036 		0.77
v -40.145 		-49.636 		0.381
v -40.178 		-49.636 		0.382
v -40.993 		-49.602 		0.321
v -40.629 		-50.038 		0.297
v -40.178 		-49.612 		0.342
v -40.403 		-49.714 		0.139
v -40.36 		-49.714 		0.128
v -40.114 		-49.61 		0.34
v -40.379 		-50.033 		0.836
v -40.146 		-49.611 		0.341
v -40.788 		-49.62 		0.401
v -40.832 		-49.639 		0.391
v -40.385 		-49.711 		0.177
v -40.38 		-50.002 		0.875
v -40.709 		-49.624 		0.4
v -40.815 		-49.645 		0.448
v -40.757 		-49.644 		0.489
v -40.815 		-49.618 		0.488
v -40.378 		-50.038 		0.783
v -40.378 		-49.717 		0.09
v -40.893 		-49.62 		0.487
v -40.088 		-49.654 		0.718
v -40.893 		-49.648 		0.447
v -40.115 		-49.627 		0.717
v -40.376 		-49.72 		0.039
v -40.186 		-49.626 		0.715
v -40.15 		-49.627 		0.716
v -40.091 		-49.639 		0.285
v -40.384 		-49.712 		0.101
v -40.384 		-49.707 		0.049
v -40.115 		-49.613 		0.286
v -40.787 		-49.598 		0.298
v -40.709 		-49.597 		0.356
v -40.708 		-49.599 		0.298
v -40.147 		-49.614 		0.288
v -40.085 		-49.942 		0.229
v -40.793 		-49.594 		0.767
v -40.178 		-49.616 		0.289
v -40.092 		-50.025 		0.229
v -40.099 		-50.006 		0.199
v -40.207 		-49.582 		0.488
v -40.287 		-49.584 		0.491
v -40.296 		-49.636 		0.386
v -40.943 		-49.621 		0.705
v -40.92 		-49.654 		0.707
v -40.116 		-49.654 		0.677
v -40.148 		-50.032 		0.194
v -40.287 		-49.609 		0.449
v -40.179 		-50.034 		0.197
v -40.943 		-49.62 		0.758
v -40.207 		-49.606 		0.446
v -40.151 		-49.654 		0.675
v -40.185 		-49.654 		0.673
v -40.852 		-49.624 		0.714
v -40.92 		-49.653 		0.759
v -40.788 		-49.595 		0.357
v -40.455 		-49.728 		0.889
v -40.852 		-49.622 		0.767
v -40.956 		-49.598 		0.321
v -40.07 		-49.619 		0.595
v -40.129 		-49.585 		0.541
v -40.919 		-49.594 		0.322
v -40.13 		-49.591 		0.597
v -40.847 		-49.62 		0.358
v -40.551 		-49.719 		0.886
v -40.131 		-49.622 		0.639
v -40.086 		-49.643 		0.627
v -40.514 		-49.693 		0.877
v -40.892 		-49.618 		0.322
v -40.576 		-49.7 		0.86
v -40.167 		-49.966 		1.135
v -40.112 		-49.968 		1.12
v -40.092 		-49.97 		1.079
v -40.167 		-50.048 		1.121
v -40.899 		-49.639 		0.353
v -40.919 		-49.62 		0.363
v -40.126 		-50.029 		1.11
v -40.532 		-49.698 		0.837
v -40.212 		-49.654 		0.714
v -40.955 		-49.625 		0.362
v -40.091 		-49.971 		1.024
v -40.111 		-50.051 		1.079
v -40.109 		-50.053 		1.024
v -40.245 		-49.631 		0.728
v -40.166 		-50.077 		1.079
v -40.301 		-49.604 		0.729
v -40.957 		-49.598 		0.268
v -40.92 		-49.595 		0.267
v -40.556 		-49.701 		0.821
v -40.892 		-49.621 		0.267
v -40.314 		-49.96 		1.137
v -40.241 		-49.963 		1.136
v -40.289 		-49.619 		0.645
v -40.314 		-50.043 		1.123
v -40.24 		-50.045 		1.122
v -40.21 		-49.62 		0.642
v -40.53 		-49.706 		0.785
v -40.847 		-49.625 		0.299
v -41.021 		-49.633 		0.321
v -41.022 		-49.631 		0.268
v -40.301 		-49.634 		0.689
v -40.259 		-49.654 		0.699
v -40.788 		-49.701 		0.416
v -40.314 		-50.072 		1.08
v -40.376 		-49.635 		0.69
v -40.377 		-49.604 		0.73
v -40.709 		-49.706 		0.414
v -40.992 		-49.631 		0.361
v -40.24 		-50.074 		1.079
v -41.012 		-49.655 		0.35
v -40.943 		-49.649 		0.666
v -40.757 		-49.725 		0.448
v -40.815 		-49.727 		0.434
v -40.772 		-49.665 		0.459
v -40.738 		-49.726 		0.489
v -40.402 		-49.609 		0.461
v -41.03 		-49.735 		0.446
v -41.014 		-49.673 		0.456
v -40.972 		-49.733 		0.433
v -40.417 		-49.631 		0.432
v -41.048 		-49.734 		0.486
v -40.893 		-49.73 		0.434
v -40.836 		-49.646 		0.685
v -40.816 		-49.62 		0.597
v -40.816 		-49.619 		0.542
v -41.032 		-49.714 		0.268
v -40.847 		-49.699 		0.402
v -41.03 		-49.716 		0.321
v -40.347 		-49.613 		0.493
v -40.331 		-49.633 		0.461
v -40.816 		-49.648 		0.637
v -40.788 		-49.92 		0.416
v -40.847 		-49.918 		0.402
v -40.891 		-49.647 		0.636
v -40.991 		-49.713 		0.374
v -41.019 		-49.717 		0.36
v -40.25 		-49.659 		0.375
v -40.235 		-49.635 		0.344
v -40.759 		-49.647 		0.598
v -40.297 		-49.606 		0.344
v -40.892 		-49.62 		0.595
v -40.635 		-49.7 		0.873
v -40.867 		-49.701 		0.358
v -40.634 		-49.711 		0.886
v -40.196 		-49.659 		0.372
v -40.972 		-49.952 		0.433
v -41.03 		-49.954 		0.446
v -40.202 		-49.64 		0.343
v -41.048 		-49.953 		0.486
v -40.971 		-50.034 		0.446
v -40.882 		-49.699 		0.322
v -40.299 		-49.603 		0.289
v -40.816 		-49.73 		0.651
v -40.892 		-49.698 		0.364
v -40.202 		-49.645 		0.291
v -40.919 		-49.702 		0.377
v -41.014 		-50.014 		0.456
v -41.028 		-50.035 		0.486
v -40.955 		-49.708 		0.375
v -40.713 		-49.706 		0.662
v -40.792 		-49.707 		0.662
v -40.97 		-50.061 		0.487
v -40.237 		-49.63 		0.289
v -40.912 		-49.738 		0.708
v -40.912 		-49.737 		0.76
v -40.882 		-49.702 		0.267
v -41.032 		-49.933 		0.268
v -40.871 		-49.706 		0.714
v -41.03 		-49.936 		0.321
v -40.867 		-49.707 		0.299
v -40.872 		-49.705 		0.766
v -40.379 		-49.604 		0.344
v -40.532 		-49.917 		0.837
v -40.381 		-49.603 		0.289
v -40.891 		-49.73 		0.649
v -40.882 		-49.918 		0.322
v -40.455 		-49.914 		0.889
v -40.926 		-49.675 		0.678
v -40.892 		-49.918 		0.364
v -40.92 		-49.737 		0.668
v -40.943 		-49.732 		0.653
v -40.738 		-49.945 		0.489
v -40.757 		-49.944 		0.448
v -40.112 		-49.717 		0.395
v -40.772 		-50.006 		0.459
v -40.576 		-49.919 		0.86
v -40.815 		-50.029 		0.448
v -40.757 		-50.028 		0.489
v -40.145 		-49.717 		0.395
v -40.514 		-49.912 		0.877
v -40.178 		-49.717 		0.395
v -40.851 		-49.707 		0.674
v -40.457 		-49.917 		0.889
v -40.468 		-49.918 		0.886
v -40.126 		-49.684 		0.429
v -40.788 		-50.003 		0.401
v -40.067 		-49.683 		0.44
v -40.832 		-49.981 		0.391
v -40.048 		-49.687 		0.482
v -40.709 		-50.008 		0.4
v -41.022 		-50.014 		0.268
v -41.021 		-50.017 		0.321
v -40.471 		-49.913 		0.886
v -40.126 		-49.903 		0.429
v -40.067 		-49.902 		0.44
v -40.048 		-49.906 		0.482
v -40.709 		-49.925 		0.414
v -40.369 		-49.958 		1.123
v -40.369 		-50.042 		1.08
v -40.355 		-50.02 		1.112
v -40.088 		-49.717 		0.381
v -40.083 		-49.721 		0.284
v -40.081 		-49.718 		0.34
v -40.288 		-49.586 		0.547
v -40.815 		-49.946 		0.434
v -40.417 		-49.956 		1.112
v -40.432 		-50.016 		1.1
v -40.388 		-49.959 		1.08
v -40.815 		-50.057 		0.488
v -40.289 		-49.589 		0.603
v -40.209 		-49.59 		0.6
v -40.893 		-49.949 		0.434
v -40.893 		-50.031 		0.447
v -40.394 		-49.956 		1.068
v -40.414 		-50.037 		1.067
v -40.234 		-49.722 		0.386
v -40.295 		-49.719 		0.4
v -40.556 		-49.92 		0.821
v -40.206 		-49.687 		0.432
v -40.286 		-49.691 		0.435
v -40.893 		-50.059 		0.487
v -40.179 		-49.953 		0.184
v -40.117 		-50.029 		0.19
v -40.093 		-49.945 		0.188
v -40.383 		-49.69 		0.461
v -40.347 		-49.694 		0.451
v -40.117 		-49.948 		0.177
v -40.148 		-49.95 		0.18
v -40.787 		-50.036 		0.298
v -40.788 		-50.033 		0.357
v -40.475 		-49.623 		1.066
v -40.477 		-49.652 		1.11
v -40.367 		-49.696 		0.494
v -40.638 		-49.645 		1.105
v -40.683 		-49.663 		1.092
v -40.698 		-49.638 		1.06
v -40.637 		-49.614 		1.061
v -40.709 		-50.036 		0.356
v -40.556 		-49.618 		1.063
v -40.143 		-49.929 		0.139
v -40.402 		-49.69 		0.422
v -40.558 		-49.648 		1.108
v -40.179 		-50.059 		0.237
v -40.377 		-49.714 		0.4
v -40.147 		-50.057 		0.234
v -40.899 		-49.98 		0.353
v -40.955 		-49.927 		0.375
v -40.919 		-49.921 		0.377
v -40.116 		-50.054 		0.231
v -40.206 		-49.907 		0.432
v -40.286 		-49.91 		0.435
v -40.699 		-49.724 		1.103
v -40.402 		-49.91 		0.422
v -40.994 		-50.04 		0.268
v -40.867 		-49.921 		0.358
v -40.993 		-50.041 		0.321
v -40.347 		-49.913 		0.451
v -40.367 		-49.915 		0.494
v -40.085 		-49.93 		0.126
v -40.067 		-49.934 		0.087
v -40.992 		-50.015 		0.361
v -40.1 		-49.992 		0.116
v -40.086 		-50.016 		0.087
v -40.892 		-50.002 		0.322
v -40.145 		-50.044 		0.088
v -40.992 		-50.015 		0.361
v -40.144 		-50.013 		0.126
v -40.992 		-50.015 		0.361
v -40.919 		-50.032 		0.322
v -40.383 		-49.91 		0.461
v -40.956 		-50.037 		0.321
v -40.069 		-49.939 		0.035
v -41.019 		-49.936 		0.36
v -40.991 		-49.933 		0.374
v -40.089 		-50.022 		0.035
v -40.992 		-50.015 		0.361
v -40.919 		-50.004 		0.363
v -40.955 		-50.009 		0.362
v -40.992 		-50.015 		0.361
v -40.146 		-50.049 		0.036
v -40.202 		-49.719 		0.382
v -41.012 		-49.996 		0.35
v -40.215 		-49.718 		0.344
v -40.996 		-49.6 		0.215
v -40.21 		-49.723 		0.343
v -40.847 		-50.004 		0.358
v -40.202 		-50.033 		0.239
v -40.997 		-49.626 		0.175
v -41.024 		-49.628 		0.216
v -41.018 		-49.648 		0.186
v -40.196 		-50.014 		0.209
v -40.21 		-49.727 		0.291
v -40.635 		-49.919 		0.873
v -40.216 		-49.712 		0.289
v -40.882 		-49.922 		0.267
v -40.301 		-50.038 		0.233
v -40.239 		-50.008 		0.234
v -40.892 		-50.004 		0.267
v -40.202 		-49.954 		0.2
v -40.473 		-50.059 		1.006
v -40.92 		-50.034 		0.267
v -40.178 		-49.937 		0.395
v -40.47 		-50.058 		0.946
v -40.553 		-50.051 		0.945
v -40.112 		-49.936 		0.395
v -40.24 		-49.922 		0.192
v -40.256 		-49.985 		0.203
v -40.302 		-50.008 		0.192
v -40.145 		-49.936 		0.395
v -40.21 		-49.951 		0.239
v -40.957 		-50.037 		0.268
v -40.469 		-50.029 		0.901
v -40.218 		-49.925 		0.234
v -40.127 		-49.987 		0.443
v -40.083 		-49.965 		0.452
v -40.867 		-49.926 		0.299
v -40.068 		-49.989 		0.483
v -40.847 		-50.008 		0.299
v -40.128 		-50.018 		0.485
v -40.551 		-50.021 		0.901
v -40.569 		-49.624 		0.24
v -40.222 		-49.93 		0.14
v -40.301 		-49.932 		0.14
v -40.301 		-50.015 		0.128
v -40.527 		-49.635 		0.233
v -40.466 		-49.606 		0.233
v -40.975 		-49.658 		0.126
v -40.113 		-50.019 		0.381
v -40.302 		-49.924 		0.178
v -40.088 		-49.936 		0.381
v -41.029 		-49.661 		0.081
v -40.178 		-50.02 		0.382
v -40.974 		-49.632 		0.083
v -40.403 		-49.933 		0.139
v -40.145 		-50.019 		0.381
v -40.513 		-49.658 		0.202
v -40.418 		-49.992 		0.129
v -40.973 		-49.635 		0.025
v -41.028 		-49.664 		0.024
v -40.095 		-49.998 		0.37
v -40.36 		-49.933 		0.128
v -40.081 		-49.938 		0.34
v -40.385 		-49.93 		0.177
v -40.089 		-50.02 		0.34
v -40.384 		-50.013 		0.191
v -40.975 		-49.739 		0.14
v -40.383 		-50.041 		0.233
v -40.997 		-49.708 		0.162
v -41.034 		-49.711 		0.216
v -41.026 		-49.709 		0.177
v -40.114 		-50.048 		0.34
v -40.76 		-49.73 		0.638
v -40.222 		-50.014 		0.127
v -41.03 		-49.741 		0.124
v -40.74 		-49.729 		0.598
v -40.774 		-49.669 		0.627
v -40.223 		-50.045 		0.088
v -40.739 		-49.727 		0.544
v -41.016 		-49.681 		0.113
v -40.3 		-50.045 		0.089
v -40.3 		-50.049 		0.038
v -41.048 		-49.744 		0.081
v -41.047 		-49.747 		0.024
v -40.333 		-49.639 		0.636
v -40.713 		-50.034 		0.715
v -40.792 		-50.034 		0.714
v -40.418 		-49.635 		0.594
v -40.403 		-49.612 		0.565
v -40.997 		-49.927 		0.162
v -41.034 		-49.93 		0.216
v -40.083 		-49.94 		0.284
v -41.026 		-49.928 		0.177
v -40.091 		-50.023 		0.285
v -41.024 		-50.012 		0.216
v -40.714 		-50.032 		0.767
v -40.996 		-50.038 		0.215
v -40.996 		-50.038 		0.215
v -40.996 		-50.038 		0.215
v -40.348 		-49.616 		0.605
v -40.793 		-50.033 		0.767
v -40.996 		-50.038 		0.215
v -41.018 		-49.989 		0.186
v -40.997 		-50.01 		0.175
v -40.403 		-49.611 		0.513
v -40.816 		-49.949 		0.651
v -40.348 		-49.614 		0.549
v -40.713 		-49.926 		0.662
v -40.792 		-49.926 		0.662
v -40.115 		-50.051 		0.286
v -40.713 		-50.007 		0.675
v -40.147 		-50.053 		0.288
v -40.178 		-50.055 		0.289
v -40.146 		-50.049 		0.341
v -40.792 		-50.008 		0.675
v -40.08 		-49.737 		0.718
v -40.636 		-50.048 		1.003
v -40.698 		-50.017 		1.002
v -40.178 		-50.051 		0.342
v -40.697 		-50.012 		0.944
v -40.639 		-49.728 		1.12
v -40.558 		-49.731 		1.123
v -40.478 		-49.734 		1.125
v -40.09 		-49.736 		0.678
v -40.635 		-50.044 		0.944
v -40.097 		-49.675 		0.688
v -40.117 		-49.736 		0.664
v -40.477 		-50.035 		1.11
v -40.634 		-50.014 		0.901
v -40.475 		-50.061 		1.066
v -40.696 		-49.926 		0.9
v -40.68 		-49.989 		0.912
v -40.556 		-50.057 		1.063
v -40.558 		-50.032 		1.108
v -40.207 		-50.02 		0.488
v -40.131 		-49.706 		0.653
v -40.185 		-49.737 		0.659
v -40.151 		-49.736 		0.662
v -40.287 		-50.022 		0.491
v -40.287 		-49.993 		0.449
v -40.558 		-49.95 		1.123
v -40.478 		-49.954 		1.125
v -40.234 		-49.941 		0.386
v -40.468 		-49.946 		0.886
v -40.295 		-49.939 		0.4
v -40.296 		-50.02 		0.386
v -40.699 		-49.943 		1.103
v -40.698 		-50.022 		1.06
v -40.683 		-50.004 		1.092
v -40.638 		-50.028 		1.105
v -40.551 		-49.938 		0.886
v -40.637 		-50.053 		1.061
v -40.378 		-49.936 		0.09
v -40.359 		-50.018 		0.09
v -40.344 		-49.995 		0.118
v -40.639 		-49.947 		1.12
v -40.384 		-49.932 		0.101
v -40.764 		-49.663 		1.083
v -40.806 		-49.641 		1.093
v -40.499 		-49.975 		0.866
v -40.403 		-50.013 		0.1
v -40.748 		-49.64 		1.057
v -40.456 		-49.998 		0.876
v -40.805 		-49.61 		1.057
v -40.049 		-49.694 		0.538
v -40.049 		-49.913 		0.538
v -40.051 		-49.701 		0.594
v -40.051 		-49.92 		0.594
v -40.071 		-49.706 		0.637
v -40.956 		-49.633 		1.093
v -40.957 		-49.605 		1.058
v -40.881 		-49.608 		1.058
v -40.226 		-49.714 		0.728
v -40.513 		-50 		0.837
v -40.331 		-49.974 		0.461
v -40.455 		-50.03 		0.837
v -40.417 		-49.972 		0.432
v -40.221 		-49.736 		0.713
v -40.347 		-49.996 		0.493
v -40.975 		-49.958 		0.14
v -40.75 		-49.726 		1.093
v -40.807 		-49.724 		1.105
v -40.402 		-49.993 		0.461
v -40.881 		-49.72 		1.105
v -40.729 		-49.723 		1.057
v -41.03 		-49.961 		0.124
v -40.576 		-50.003 		0.821
v -40.975 		-50.041 		0.126
v -41.029 		-50.045 		0.081
v -41.048 		-49.963 		0.081
v -41.016 		-50.022 		0.113
v -40.53 		-49.925 		0.785
v -40.956 		-49.716 		1.105
v -40.511 		-50.008 		0.784
v -41.028 		-50.048 		0.024
v -41.047 		-49.966 		0.024
v -40.974 		-50.071 		0.083
v -40.719 		-49.719 		1.059
v -40.454 		-50.036 		0.784
v -40.973 		-50.074 		0.025
v -40.378 		-50.016 		0.386
v -40.807 		-49.944 		1.105
v -40.805 		-50.049 		1.057
v -40.25 		-50 		0.375
v -40.297 		-50.045 		0.344
v -40.591 		-49.981 		0.85
v -40.729 		-49.942 		1.057
v -40.091 		-49.643 		-0.017
v -40.462 		-49.627 		0.138
v -40.149 		-49.647 		-0.055
v -40.912 		-49.956 		0.76
v -40.912 		-49.957 		0.708
v -40.202 		-49.938 		0.382
v -40.147 		-49.616 		-0.016
v -40.21 		-49.942 		0.343
v -40.467 		-49.634 		0.191
v -40.196 		-50 		0.372
v -40.202 		-50.024 		0.343
v -40.871 		-49.925 		0.714
v -40.872 		-49.924 		0.766
v -40.628 		-49.598 		0.24
v -40.223 		-49.646 		-0.053
v -40.298 		-49.645 		-0.052
v -40.215 		-49.937 		0.344
v -40.223 		-49.615 		-0.015
v -40.92 		-50.038 		0.707
v -40.75 		-49.945 		1.093
v -40.235 		-50.019 		0.344
v -40.748 		-50.024 		1.057
v -40.764 		-50.005 		1.083
v -40.618 		-49.613 		0.136
v -40.806 		-50.025 		1.093
v -40.628 		-49.625 		0.197
v -40.299 		-49.615 		-0.013
v -40.584 		-49.645 		0.209
v -40.299 		-50.041 		0.289
v -40.202 		-50.028 		0.291
v -40.719 		-49.939 		1.059
v -40.541 		-49.593 		0.098
v -40.462 		-49.598 		0.099
v -40.356 		-49.642 		-0.013
v -40.237 		-50.013 		0.289
v -40.881 		-49.94 		1.105
v -40.956 		-49.935 		1.105
v -40.956 		-50.017 		1.093
v -40.619 		-49.588 		0.097
v -40.881 		-50.021 		1.093
v -40.463 		-49.596 		0.048
v -40.957 		-50.043 		1.058
v -40.881 		-50.046 		1.058
v -40.405 		-49.62 		-0.003
v -40.62 		-49.591 		0.045
v -40.21 		-49.947 		0.291
v -40.216 		-49.931 		0.289
v -40.42 		-49.64 		-0.032
v -40.379 		-50.042 		0.344
v -40.381 		-50.042 		0.289
v -41.014 		-50.014 		1.059
v -40.092 		-49.73 		-0.056
v -40.072 		-49.726 		-0.017
v -41.013 		-49.932 		1.093
v -40.635 		-50.002 		0.86
v -40.106 		-49.668 		-0.045
v -40.998 		-49.994 		1.084
v -41.033 		-49.931 		1.059
v -41.033 		-49.711 		1.059
v -41.013 		-49.713 		1.093
v -40.635 		-50.03 		0.821
v -40.149 		-49.73 		-0.068
v -41.014 		-49.63 		1.059
v -40.223 		-49.729 		-0.066
v -40.298 		-49.728 		-0.065
v -40.634 		-49.931 		0.886
v -40.092 		-49.642 		0.229
v -40.375 		-49.724 		-0.012
v -40.8 		-49.626 		0.927
v -40.742 		-49.629 		0.961
v -40.116 		-49.616 		0.231
v -40.355 		-49.727 		-0.051
v -40.998 		-49.653 		1.084
v -40.34 		-49.665 		-0.041
v -40.745 		-49.635 		1.009
v -40.179 		-49.62 		0.237
v -40.92 		-50.037 		0.759
v -40.165 		-49.64 		1.023
v -40.164 		-49.641 		0.968
v -40.117 		-49.645 		0.19
v -40.852 		-50.007 		0.714
v -40.756 		-49.648 		0.935
v -40.852 		-50.006 		0.767
v -40.11 		-49.656 		0.864
v -40.803 		-49.606 		1.01
v -40.92 		-49.957 		0.668
v -40.943 		-49.951 		0.653
v -40.385 		-49.702 		-0.003
v -40.405 		-49.699 		-0.042
v -40.179 		-49.651 		0.197
v -40.148 		-49.654 		0.865
v -40.147 		-49.618 		0.234
v -40.186 		-49.651 		0.866
v -40.801 		-49.602 		0.963
v -40.148 		-49.648 		0.194
v -40.111 		-49.628 		0.824
v -40.405 		-49.919 		-0.042
v -40.879 		-49.626 		0.929
v -40.88 		-49.601 		0.964
v -40.958 		-49.603 		1.012
v -40.083 		-49.657 		0.824
v -40.186 		-49.625 		0.825
v -40.072 		-49.945 		-0.017
v -40.092 		-49.949 		-0.056
v -40.88 		-49.604 		1.011
v -40.958 		-49.601 		0.966
v -40.086 		-49.656 		0.771
v -40.091 		-50.027 		-0.017
v -40.959 		-49.627 		0.931
v -40.106 		-50.009 		-0.045
v -40.113 		-49.628 		0.771
v -40.147 		-50.054 		-0.016
v -40.086 		-49.632 		0.087
v -40.149 		-50.031 		-0.055
v -40.1 		-49.651 		0.116
v -40.145 		-49.605 		0.088
v -40.144 		-49.629 		0.126
v -40.149 		-49.95 		-0.068
v -40.186 		-49.626 		0.77
v -40.149 		-49.627 		0.824
v -40.223 		-50.03 		-0.053
v -40.298 		-50.029 		-0.052
v -40.089 		-49.638 		0.035
v -40.223 		-50.054 		-0.015
v -40.149 		-49.627 		0.77
v -40.299 		-50.053 		-0.013
v -40.146 		-49.611 		0.036
v -40.793 		-49.593 		0.82
v -40.714 		-49.592 		0.82
v -40.794 		-49.619 		0.859
v -40.678 		-49.612 		0.096
v -40.662 		-49.632 		0.126
v -40.679 		-49.617 		0.044
v -40.239 		-49.624 		0.234
v -40.714 		-49.619 		0.86
v -40.301 		-49.631 		0.128
v -40.239 		-49.637 		1.023
v -40.314 		-49.635 		1.022
v -40.302 		-49.624 		0.192
v -40.256 		-49.643 		0.203
v -40.549 		-49.706 		0.24
v -40.202 		-49.649 		0.239
v -40.239 		-49.639 		0.966
v -40.568 		-49.705 		0.198
v -40.313 		-49.637 		0.965
v -40.943 		-49.646 		0.85
v -40.919 		-49.652 		0.811
v -40.301 		-49.599 		0.233
v -40.548 		-49.718 		0.233
v -40.891 		-49.949 		0.649
v -40.943 		-49.62 		0.81
v -40.223 		-49.949 		-0.066
v -40.383 		-49.602 		0.233
v -40.851 		-49.926 		0.674
v -40.298 		-49.948 		-0.065
v -40.853 		-49.621 		0.819
v -40.418 		-49.651 		0.129
v -40.926 		-50.016 		0.678
v -40.943 		-50.033 		0.666
v -40.384 		-49.629 		0.191
v -40.376 		-49.94 		0.039
v -40.355 		-49.946 		-0.051
v -40.375 		-49.943 		-0.012
v -40.357 		-50.022 		0.038
v -40.356 		-50.025 		-0.013
v -40.34 		-50.006 		-0.041
v -40.3 		-49.607 		0.089
v -40.222 		-49.63 		0.127
v -40.836 		-49.987 		0.685
v -40.223 		-49.606 		0.088
v -40.943 		-50.059 		0.758
v -40.943 		-50.06 		0.705
v -40.385 		-49.922 		-0.003
v -40.384 		-49.927 		0.049
v -40.405 		-50.004 		-0.003
v -40.205 		-49.676 		0.683
v -40.42 		-49.981 		-0.032
v -40.404 		-50.008 		0.049
v -40.289 		-49.701 		0.659
v -40.468 		-49.717 		0.177
v -40.211 		-49.737 		0.672
v -40.529 		-49.72 		0.191
v -40.46 		-49.585 		0.46
v -40.537 		-49.59 		0.46
v -40.369 		-49.661 		1.022
v -40.369 		-49.663 		0.964
v -40.21 		-49.704 		0.656
v -40.46 		-49.612 		0.421
v -40.537 		-49.617 		0.42
v -40.462 		-49.71 		0.151
v -40.54 		-49.702 		0.15
v -40.46 		-49.628 		0.386
v -40.618 		-49.695 		0.149
v -40.677 		-49.691 		0.135
v -40.245 		-49.715 		0.689
v -40.301 		-49.717 		0.676
v -40.409 		-49.651 		0.947
v -40.412 		-49.652 		1.007
v -40.627 		-49.707 		0.183
v -40.376 		-49.718 		0.677
v -40.303 		-49.623 		0.875
v -40.348 		-49.699 		0.647
v -40.538 		-49.59 		0.512
v -40.26 		-49.647 		0.864
v -40.245 		-49.628 		0.834
v -40.303 		-49.598 		0.835
v -40.618 		-49.914 		0.149
v -40.677 		-49.91 		0.135
v -40.837 		-49.641 		0.849
v -40.348 		-49.919 		0.647
v -40.698 		-49.693 		0.096
v -40.698 		-49.912 		0.096
v -40.699 		-49.699 		0.044
v -40.799 		-49.707 		0.915
v -40.74 		-49.708 		0.926
v -40.245 		-49.629 		0.781
v -40.403 		-49.696 		0.605
v -40.302 		-49.601 		0.782
v -40.621 		-49.594 		-0.007
v -40.543 		-49.594 		-0.006
v -40.464 		-49.593 		-0.004
v -40.717 		-49.709 		0.944
v -40.464 		-49.619 		-0.043
v -40.368 		-49.698 		0.606
v -40.214 		-49.651 		0.825
v -40.383 		-49.694 		0.566
v -40.383 		-49.692 		0.513
v -40.722 		-49.712 		0.961
v -40.213 		-49.652 		0.77
v -40.726 		-49.717 		1.009
v -40.718 		-49.714 		1.001
v -40.379 		-49.595 		0.836
v -40.367 		-49.697 		0.55
v -40.378 		-49.599 		0.783
v -40.543 		-49.622 		-0.045
v -40.622 		-49.624 		-0.046
v -40.367 		-49.916 		0.55
v -40.383 		-49.913 		0.566
v -40.38 		-49.618 		0.875
v -40.68 		-49.622 		-0.008
v -40.403 		-49.915 		0.605
v -40.666 		-49.646 		-0.037
v -40.383 		-49.911 		0.513
v -40.959 		-49.708 		0.919
v -40.107 		-49.753 		0.927
v -40.879 		-49.707 		0.917
v -40.163 		-49.67 		0.926
v -40.122 		-49.692 		0.938
v -40.108 		-49.67 		0.969
v -40.465 		-49.701 		-0.056
v -40.089 		-49.753 		0.969
v -40.465 		-49.92 		-0.056
v -40.543 		-49.704 		-0.058
v -40.163 		-49.752 		0.912
v -40.368 		-49.917 		0.606
v -40.7 		-49.705 		-0.009
v -40.622 		-49.707 		-0.059
v -40.681 		-49.708 		-0.047
v -40.088 		-50.038 		0.718
v -40.464 		-50.003 		-0.043
v -40.543 		-50.005 		-0.045
v -40.76 		-49.949 		0.638
v -40.74 		-49.948 		0.598
v -40.816 		-50.031 		0.637
v -40.543 		-49.923 		-0.058
v -40.774 		-50.01 		0.627
v -40.3 		-49.611 		0.038
v -40.739 		-49.947 		0.544
v -40.543 		-50.032 		-0.006
v -40.615 		-49.594 		0.459
v -40.615 		-49.593 		0.511
v -40.673 		-49.623 		0.511
v -40.464 		-50.032 		-0.004
v -40.672 		-49.625 		0.458
v -40.759 		-50.031 		0.598
v -40.758 		-50.029 		0.543
v -40.403 		-49.629 		0.1
v -40.816 		-50.058 		0.597
v -40.816 		-50.057 		0.542
v -40.344 		-49.654 		0.118
v -40.614 		-49.622 		0.419
v -40.404 		-49.625 		0.049
v -40.7 		-49.924 		-0.009
v -40.681 		-49.927 		-0.047
v -40.68 		-50.006 		-0.008
v -40.666 		-49.987 		-0.037
v -40.621 		-50.033 		-0.007
v -40.622 		-50.008 		-0.046
v -40.622 		-49.926 		-0.059
v -40.359 		-49.635 		0.09
v -40.657 		-49.646 		0.429
v -40.892 		-50.059 		0.595
v -40.63 		-49.629 		0.398
v -40.357 		-49.638 		0.038
v -40.586 		-49.652 		0.386
v -40.891 		-50.031 		0.636
v -40.769 		-49.66 		-0.032
v -40.824 		-49.634 		-0.032
v -41.017 		-49.628 		0.967
v -41.003 		-49.648 		0.941
v -40.57 		-49.63 		0.354
v -41.016 		-49.629 		1.013
v -40.569 		-49.627 		0.297
v -40.824 		-49.664 		-0.077
v -40.898 		-49.636 		-0.032
v -40.08 		-49.956 		0.718
v -40.523 		-49.628 		0.345
v -40.506 		-49.648 		0.376
v -40.464 		-49.604 		0.289
v -40.461 		-49.602 		0.344
v -40.974 		-49.641 		0.849
v -41.006 		-49.635 		0.849
v -40.09 		-49.955 		0.678
v -40.525 		-49.631 		0.289
v -40.751 		-49.741 		-0.032
v -41.023 		-49.653 		0.838
v -40.185 		-49.956 		0.659
v -41.005 		-49.607 		0.808
v -40.151 		-49.956 		0.662
v -40.974 		-49.613 		0.809
v -40.768 		-49.744 		-0.077
v -40.794 		-49.701 		0.872
v -40.117 		-49.955 		0.664
v -40.715 		-49.701 		0.873
v -40.783 		-49.683 		-0.065
v -40.943 		-49.728 		0.863
v -40.919 		-49.733 		0.85
v -41.029 		-49.63 		0.807
v -40.926 		-49.671 		0.84
v -40.898 		-49.666 		-0.076
v -40.751 		-49.961 		-0.032
v -40.131 		-49.925 		0.653
v -40.853 		-49.702 		0.859
v -40.769 		-50.043 		-0.032
v -40.768 		-49.963 		-0.077
v -40.824 		-50.072 		-0.032
v -41.019 		-49.709 		0.932
v -40.824 		-50.047 		-0.077
v -40.116 		-50.037 		0.677
v -41.037 		-49.71 		0.967
v -41.035 		-49.711 		1.013
v -40.097 		-50.016 		0.688
v -40.898 		-50.049 		-0.076
v -40.912 		-49.735 		0.812
v -40.898 		-50.075 		-0.032
v -40.109 		-49.739 		0.877
v -40.082 		-49.74 		0.863
v -40.089 		-49.679 		0.853
v -40.148 		-49.736 		0.879
v -40.186 		-49.733 		0.88
v -40.872 		-49.703 		0.819
v -40.783 		-50.024 		-0.065
v -40.185 		-50.038 		0.673
v -40.715 		-49.92 		0.873
v -40.077 		-49.738 		0.771
v -40.074 		-49.74 		0.823
v -40.972 		-49.638 		-0.032
v -40.238 		-49.751 		0.91
v -40.699 		-49.918 		0.044
v -40.803 		-50.044 		1.01
v -40.313 		-49.666 		0.922
v -40.238 		-49.668 		0.924
v -40.313 		-49.749 		0.908
v -41.027 		-49.667 		-0.032
v -41.046 		-49.75 		-0.032
v -40.718 		-49.933 		1.001
v -40.548 		-49.938 		0.233
v -41.027 		-49.752 		-0.075
v -40.726 		-49.936 		1.009
v -40.722 		-49.931 		0.961
v -40.971 		-49.751 		-0.09
v -40.742 		-50.013 		0.961
v -40.971 		-49.668 		-0.075
v -41.012 		-49.69 		-0.064
v -40.388 		-49.742 		1.022
v -40.745 		-50.018 		1.009
v -40.549 		-49.926 		0.24
v -40.568 		-49.924 		0.198
v -41.046 		-49.969 		-0.032
v -41.027 		-50.051 		-0.032
v -40.972 		-50.077 		-0.032
v -40.391 		-49.736 		1.007
v -40.569 		-50.008 		0.24
v -41.027 		-49.971 		-0.075
v -40.971 		-49.97 		-0.09
v -41.012 		-50.031 		-0.064
v -40.971 		-50.052 		-0.075
v -40.974 		-49.723 		0.863
v -40.527 		-50.019 		0.233
v -41.006 		-49.717 		0.862
v -40.466 		-50.044 		0.233
v -41.029 		-49.713 		0.848
v -41.036 		-49.711 		0.807
v -40.63 		-49.6 		0.355
v -40.513 		-49.999 		0.202
v -40.629 		-49.599 		0.297
v -40.462 		-50.011 		0.138
v -40.462 		-49.929 		0.151
v -40.54 		-49.922 		0.15
v -41.037 		-49.929 		0.967
v -41.035 		-49.93 		1.013
v -40.529 		-49.94 		0.191
v -40.468 		-49.936 		0.177
v -40.467 		-50.018 		0.191
v -41.019 		-49.928 		0.932
v -41.017 		-50.011 		0.967
v -41.003 		-49.989 		0.941
v -40.628 		-50.037 		0.24
v -40.571 		-49.714 		0.397
v -41.016 		-50.012 		1.013
v -40.627 		-49.926 		0.183
v -40.628 		-50.008 		0.197
v -40.584 		-49.986 		0.209
v -40.537 		-49.7 		0.407
v -40.115 		-50.065 		0.717
v -40.618 		-49.997 		0.136
v -40.522 		-49.707 		0.387
v -40.974 		-49.942 		0.863
v -41.006 		-49.936 		0.862
v -40.186 		-50.065 		0.715
v -41.029 		-49.932 		0.848
v -41.036 		-49.93 		0.807
v -41.006 		-50.018 		0.849
v -40.15 		-50.065 		0.716
v -40.974 		-50.024 		0.849
v -40.459 		-49.71 		0.4
v -40.974 		-50.052 		0.809
v -41.005 		-50.046 		0.808
v -40.679 		-50.001 		0.044
v -40.619 		-50.027 		0.097
v -40.541 		-50.032 		0.098
v -40.46 		-49.694 		0.408
v -40.463 		-50.034 		0.048
v -40.388 		-49.745 		0.964
v -40.129 		-50.024 		0.541
v -40.069 		-49.996 		0.539
v -40.462 		-50.036 		0.099
v -40.692 		-49.708 		0.458
v -40.693 		-49.706 		0.51
v -40.071 		-49.925 		0.637
v -40.131 		-50.006 		0.639
v -40.086 		-49.984 		0.627
v -40.62 		-50.03 		0.045
v -40.612 		-49.705 		0.406
v -40.07 		-50.002 		0.595
v -41.023 		-49.994 		0.838
v -40.614 		-49.703 		0.406
v -41.029 		-50.014 		0.807
v -40.63 		-49.701 		0.41
v -40.13 		-50.029 		0.597
v -40.662 		-49.973 		0.126
v -40.678 		-49.996 		0.096
v -40.608 		-49.712 		0.406
v -40.221 		-49.955 		0.713
v -40.801 		-50.04 		0.963
v -40.212 		-50.037 		0.714
v -41.004 		-49.634 		0.66
v -40.974 		-49.614 		0.703
v -41.004 		-49.607 		0.7
v -40.973 		-49.642 		0.663
v -40.226 		-49.933 		0.728
v -40.787 		-49.601 		0.24
v -40.245 		-50.015 		0.728
v -40.301 		-50.042 		0.729
v -40.827 		-49.653 		0.131
v -40.8 		-50.009 		0.927
v -40.799 		-49.926 		0.915
v -41.021 		-49.652 		0.668
v -40.74 		-49.927 		0.926
v -41.028 		-49.629 		0.698
v -40.831 		-49.653 		0.207
v -40.787 		-49.631 		0.196
v -40.756 		-49.989 		0.935
v -40.369 		-49.747 		0.921
v -40.707 		-49.6 		0.24
v -40.355 		-49.686 		0.932
v -40.211 		-49.956 		0.672
v -40.388 		-49.735 		0.947
v -40.717 		-49.928 		0.944
v -40.423 		-49.671 		0.913
v -40.289 		-49.921 		0.659
v -40.407 		-49.733 		0.901
v -40.707 		-49.628 		0.196
v -40.879 		-49.927 		0.917
v -40.879 		-50.01 		0.929
v -40.959 		-50.01 		0.931
v -40.959 		-49.927 		0.919
v -40.88 		-50.043 		1.011
v -40.958 		-50.041 		1.012
v -40.245 		-49.934 		0.689
v -40.301 		-49.936 		0.676
v -40.958 		-49.598 		0.214
v -40.958 		-50.039 		0.966
v -40.88 		-50.04 		0.964
v -40.892 		-49.623 		0.211
v -40.92 		-49.597 		0.212
v -40.205 		-50.017 		0.683
v -40.303 		-49.704 		0.888
v -40.246 		-49.708 		0.874
v -40.289 		-50.002 		0.645
v -40.846 		-49.63 		0.239
v -40.214 		-49.732 		0.867
v -40.259 		-49.995 		0.699
v -40.301 		-50.017 		0.689
v -40.207 		-49.672 		0.856
v -40.226 		-49.711 		0.834
v -40.92 		-49.626 		0.171
v -40.959 		-49.626 		0.173
v -40.901 		-49.655 		0.128
v -40.376 		-49.938 		0.677
v -40.714 		-50.002 		0.86
v -40.376 		-50.019 		0.69
v -40.794 		-50.003 		0.859
v -40.377 		-50.042 		0.73
v -40.793 		-50.032 		0.82
v -40.714 		-50.031 		0.82
v -40.899 		-49.646 		0.181
v -40.771 		-49.654 		0.088
v -40.223 		-49.732 		0.826
v -40.826 		-49.628 		0.087
v -40.77 		-49.657 		0.028
v -40.209 		-50.028 		0.6
v -40.289 		-50.028 		0.603
v -40.288 		-50.025 		0.547
v -40.825 		-49.631 		0.027
v -40.226 		-49.712 		0.781
v -40.9 		-49.63 		0.085
v -40.899 		-49.633 		0.026
v -41.028 		-49.63 		0.753
v -41.005 		-49.607 		0.754
v -40.64 		-49.707 		0.412
v -40.672 		-49.709 		0.419
v -40.974 		-49.614 		0.756
v -40.772 		-49.734 		0.133
v -40.827 		-49.735 		0.146
v -40.333 		-49.98 		0.636
v -40.418 		-49.976 		0.594
v -40.403 		-49.996 		0.565
v -40.786 		-49.714 		0.181
v -40.969 		-49.621 		0.54
v -40.966 		-49.647 		0.634
v -41.024 		-49.648 		0.593
v -40.707 		-49.71 		0.182
v -40.403 		-49.995 		0.513
v -41.026 		-49.65 		0.539
v -40.882 		-49.705 		0.211
v -40.643 		-49.71 		0.413
v -40.348 		-50 		0.605
v -40.967 		-49.62 		0.594
v -40.866 		-49.712 		0.239
v -40.348 		-49.998 		0.549
v -40.794 		-49.921 		0.872
v -40.47 		-49.619 		0.946
v -40.473 		-49.621 		1.006
v -41.027 		-49.711 		0.657
v -41.004 		-49.717 		0.646
v -40.973 		-49.724 		0.65
v -40.553 		-49.612 		0.945
v -40.943 		-49.948 		0.863
v -40.943 		-50.03 		0.85
v -40.919 		-49.952 		0.85
v -41.035 		-49.71 		0.697
v -41.036 		-49.71 		0.752
v -40.966 		-49.729 		0.647
v -40.853 		-49.921 		0.859
v -40.926 		-50.012 		0.84
v -40.837 		-49.982 		0.849
v -41.022 		-49.729 		0.633
v -41.008 		-49.669 		0.623
v -41.043 		-49.73 		0.592
v -40.912 		-49.955 		0.812
v -41.045 		-49.732 		0.539
v -40.919 		-50.035 		0.811
v -40.872 		-49.923 		0.819
v -40.853 		-50.005 		0.819
v -41.036 		-49.929 		0.752
v -41.005 		-50.046 		0.754
v -41.028 		-50.013 		0.753
v -40.943 		-50.058 		0.81
v -40.452 		-49.604 		0.731
v -40.451 		-49.636 		0.691
v -40.973 		-49.944 		0.65
v -41.004 		-49.936 		0.646
v -40.575 		-49.622 		0.716
v -41.027 		-49.93 		0.657
v -41.035 		-49.929 		0.697
v -40.509 		-49.631 		0.732
v -40.494 		-49.657 		0.702
v -40.966 		-49.948 		0.647
v -40.634 		-49.595 		0.715
v -40.634 		-49.623 		0.676
v -40.973 		-50.026 		0.663
v -40.59 		-49.644 		0.686
v -40.46 		-49.913 		0.408
v -40.537 		-49.919 		0.407
v -40.222 		-49.734 		0.769
v -40.461 		-49.586 		0.513
v -40.38 		-49.699 		0.889
v -40.551 		-49.713 		0.354
v -40.544 		-49.709 		0.345
v -40.461 		-49.587 		0.565
v -40.55 		-49.71 		0.297
v -40.38 		-49.919 		0.889
v -40.546 		-49.714 		0.289
v -40.537 		-50.028 		0.46
v -40.46 		-50.024 		0.46
v -40.089 		-49.972 		0.969
v -40.108 		-50.054 		0.969
v -40.107 		-49.973 		0.927
v -40.163 		-50.053 		0.926
v -40.122 		-50.033 		0.938
v -40.164 		-50.08 		0.968
v -40.165 		-50.078 		1.023
v -40.459 		-49.929 		0.4
v -40.571 		-49.933 		0.397
v -40.163 		-49.972 		0.912
v -40.522 		-49.926 		0.387
v -40.148 		-49.955 		0.879
v -40.109 		-49.958 		0.877
v -40.186 		-49.953 		0.88
v -40.148 		-50.038 		0.865
v -40.46 		-49.996 		0.421
v -40.537 		-50.001 		0.42
v -40.11 		-50.04 		0.864
v -40.082 		-49.96 		0.863
v -40.089 		-50.02 		0.853
v -40.186 		-50.035 		0.866
v -40.46 		-50.011 		0.386
v -40.692 		-49.927 		0.458
v -40.693 		-49.925 		0.51
v -40.672 		-50.009 		0.458
v -40.673 		-50.007 		0.511
v -40.074 		-49.959 		0.823
v -40.615 		-50.031 		0.511
v -40.083 		-50.041 		0.824
v -40.077 		-49.958 		0.771
v -40.086 		-50.04 		0.771
v -40.615 		-50.033 		0.459
v -40.186 		-50.063 		0.825
v -40.113 		-50.066 		0.771
v -40.111 		-50.067 		0.824
v -40.149 		-50.065 		0.824
v -40.608 		-49.924 		0.406
v -40.149 		-50.065 		0.77
v -40.186 		-50.064 		0.77
v -40.612 		-49.931 		0.407
v -40.614 		-49.933 		0.408
v -40.61 		-49.928 		0.407
v -40.63 		-49.935 		0.411
v -40.634 		-49.934 		0.412
v -40.64 		-49.93 		0.412
v -40.672 		-49.928 		0.419
v -40.643 		-49.926 		0.413
v -40.63 		-50.012 		0.398
v -40.614 		-50.006 		0.419
v -40.657 		-49.987 		0.429
v -40.586 		-49.993 		0.386
# 1393 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 2 	4 	1
f 5 	1 	4
f 7 	8 	9
f 6 	14 	3
f 6 	3 	11
f 19 	22 	8
f 28 	14 	6
f 709 	90 	13
f 28 	15 	14
f 155 	16 	29
f 26 	21 	27
f 78 	25 	18
f 15 	28 	30
f 1282 	112 	29
f 27 	21 	20
f 28 	63 	30
f 28 	65 	63
f 18 	22 	19
f 18 	25 	22
f 21 	26 	24
f 34 	94 	32
f 35 	37 	38
f 93 	32 	94
f 40 	42 	41
f 147 	17 	16
f 42 	20 	205
f 42 	27 	20
f 449 	36 	38
f 42 	205 	41
f 40 	45 	42
f 44 	46 	47
f 1271 	13 	90
f 47 	48 	44
f 43 	101 	721
f 48 	40 	44
f 38 	37 	6
f 1270 	1271 	92
f 90 	92 	1271
f 52 	49 	123
f 38 	6 	11
f 53 	55 	54
f 43 	52 	101
f 123 	101 	52
f 37 	35 	63
f 57 	1270 	92
f 59 	75 	31
f 163 	60 	57
f 61 	217 	53
f 39 	32 	93
f 62 	53 	54
f 113 	58 	39
f 119 	123 	49
f 37 	63 	65
f 68 	70 	71
f 68 	71 	67
f 66 	53 	62
f 31 	75 	73
f 53 	66 	61
f 22 	76 	68
f 22 	78 	76
f 25 	78 	22
f 76 	80 	70
f 76 	70 	68
f 78 	80 	76
f 64 	69 	77
f 82 	78 	18
f 73 	75 	79
f 82 	1008 	1175
f 75 	88 	79
f 77 	69 	86
f 81 	95 	87
f 91 	93 	94
f 91 	96 	93
f 87 	83 	81
f 37 	28 	6
f 89 	87 	98
f 37 	65 	28
f 87 	95 	98
f 97 	92 	90
f 97 	166 	92
f 166 	168 	92
f 141 	96 	91
f 118 	12 	102
f 69 	118 	102
f 102 	1275 	105
f 1279 	1147 	105
f 86 	69 	105
f 123 	103 	101
f 103 	124 	104
f 105 	69 	102
f 103 	125 	124
f 109 	110 	111
f 111 	110 	865
f 110 	107 	865
f 109 	111 	115
f 115 	111 	310
f 116 	115 	310
f 113 	93 	96
f 100 	120 	99
f 865 	871 	111
f 109 	121 	110
f 118 	69 	72
f 120 	122 	99
f 113 	39 	93
f 121 	109 	115
f 118 	143 	117
f 124 	123 	119
f 118 	72 	143
f 124 	125 	123
f 107 	110 	85
f 121 	85 	110
f 116 	85 	115
f 121 	115 	85
f 85 	84 	108
f 123 	125 	103
f 254 	120 	100
f 122 	134 	99
f 134 	114 	99
f 127 	155 	112
f 155 	127 	159
f 113 	135 	58
f 135 	113 	136
f 126 	134 	120
f 113 	137 	136
f 122 	120 	134
f 130 	157 	128
f 126 	162 	134
f 157 	127 	128
f 157 	159 	127
f 96 	137 	113
f 136 	137 	96
f 716 	133 	91
f 236 	139 	106
f 627 	626 	130
f 136 	96 	141
f 71 	70 	145
f 144 	145 	70
f 143 	69 	64
f 143 	72 	69
f 97 	90 	149
f 709 	149 	90
f 1335 	151 	1338
f 153 	147 	16
f 145 	154 	148
f 129 	152 	132
f 151 	132 	152
f 153 	16 	155
f 145 	144 	154
f 153 	157 	147
f 236 	146 	156
f 240 	236 	156
f 155 	157 	153
f 155 	159 	157
f 158 	140 	138
f 160 	148 	154
f 161 	140 	1125
f 134 	150 	114
f 140 	161 	142
f 158 	1125 	140
f 92 	163 	57
f 154 	169 	167
f 168 	163 	92
f 169 	185 	167
f 168 	97 	171
f 144 	169 	154
f 97 	168 	166
f 78 	173 	80
f 60 	163 	175
f 170 	165 	172
f 176 	173 	82
f 78 	82 	173
f 1067 	1051 	175
f 163 	168 	175
f 169 	80 	173
f 175 	168 	178
f 173 	181 	169
f 80 	169 	144
f 183 	1072 	178
f 185 	169 	181
f 80 	144 	70
f 183 	178 	171
f 168 	171 	178
f 185 	173 	176
f 177 	477 	184
f 185 	181 	173
f 171 	97 	149
f 478 	472 	180
f 478 	180 	184
f 189 	190 	186
f 187 	186 	190
f 1081 	183 	191
f 171 	191 	183
f 149 	192 	171
f 474 	174 	276
f 174 	74 	276
f 48 	45 	40
f 549 	215 	472
f 48 	42 	45
f 474 	177 	174
f 171 	192 	191
f 191 	192 	729
f 48 	10 	42
f 44 	313 	46
f 197 	199 	196
f 10 	27 	42
f 197 	186 	199
f 204 	205 	20
f 20 	21 	204
f 188 	490 	200
f 199 	186 	196
f 21 	209 	204
f 509 	201 	200
f 186 	187 	196
f 208 	186 	203
f 198 	202 	207
f 21 	211 	209
f 208 	189 	186
f 198 	358 	202
f 24 	921 	212
f 212 	209 	24
f 186 	197 	203
f 24 	209 	211
f 21 	24 	211
f 448 	209 	212
f 1281 	207 	202
f 85 	108 	107
f 33 	216 	214
f 218 	216 	33
f 180 	472 	215
f 456 	464 	216
f 219 	223 	221
f 220 	219 	221
f 217 	61 	66
f 281 	301 	223
f 556 	213 	224
f 958 	53 	217
f 223 	301 	221
f 233 	50 	225
f 226 	229 	225
f 229 	81 	308
f 162 	126 	249
f 162 	249 	259
f 106 	146 	236
f 129 	1390 	237
f 207 	1281 	1276
f 556 	234 	213
f 237 	244 	129
f 152 	129 	244
f 241 	245 	242
f 241 	231 	248
f 237 	488 	244
f 77 	244 	488
f 126 	120 	249
f 245 	241 	250
f 248 	250 	241
f 238 	231 	235
f 238 	248 	231
f 429 	241 	242
f 120 	254 	249
f 692 	249 	254
f 257 	256 	258
f 388 	242 	245
f 593 	253 	579
f 429 	242 	431
f 256 	261 	258
f 431 	242 	531
f 242 	385 	531
f 549 	560 	215
f 222 	215 	560
f 563 	556 	224
f 304 	367 	252
f 682 	591 	260
f 353 	263 	256
f 261 	198 	207
f 265 	260 	1026
f 266 	855 	267
f 198 	261 	263
f 256 	263 	261
f 207 	1276 	261
f 1276 	381 	261
f 248 	271 	250
f 861 	267 	855
f 292 	266 	267
f 271 	275 	250
f 232 	195 	230
f 268 	807 	271
f 271 	238 	268
f 248 	238 	271
f 230 	195 	277
f 245 	250 	278
f 275 	278 	250
f 262 	286 	264
f 828 	275 	271
f 193 	232 	194
f 193 	195 	232
f 278 	275 	828
f 267 	264 	286
f 473 	280 	279
f 281 	288 	282
f 288 	281 	291
f 281 	219 	291
f 285 	284 	290
f 267 	286 	292
f 494 	467 	283
f 284 	1269 	290
f 281 	223 	219
f 294 	195 	193
f 266 	292 	293
f 282 	454 	281
f 289 	549 	472
f 273 	274 	272
f 266 	293 	319
f 272 	296 	273
f 667 	666 	293
f 81 	83 	308
f 293 	292 	667
f 290 	887 	295
f 285 	290 	295
f 251 	273 	296
f 297 	1334 	226
f 273 	251 	255
f 277 	195 	294
f 233 	305 	50
f 305 	51 	50
f 461 	303 	301
f 51 	384 	66
f 305 	384 	51
f 209 	448 	204
f 205 	204 	331
f 698 	307 	306
f 304 	296 	272
f 272 	338 	304
f 212 	458 	448
f 304 	251 	296
f 1170 	36 	1111
f 252 	251 	304
f 225 	308 	233
f 694 	221 	300
f 225 	229 	308
f 312 	40 	311
f 41 	311 	40
f 300 	303 	306
f 40 	312 	44
f 313 	44 	312
f 306 	307 	300
f 311 	314 	312
f 301 	303 	300
f 315 	316 	394
f 314 	317 	312
f 221 	301 	300
f 308 	87 	318
f 83 	87 	308
f 321 	46 	313
f 312 	322 	313
f 317 	322 	312
f 313 	323 	321
f 316 	302 	299
f 322 	323 	313
f 299 	320 	316
f 316 	309 	302
f 316 	315 	309
f 417 	1339 	297
f 299 	243 	348
f 299 	348 	320
f 317 	314 	322
f 326 	324 	341
f 299 	327 	239
f 328 	327 	299
f 314 	325 	322
f 239 	243 	299
f 349 	325 	314
f 319 	293 	912
f 85 	329 	84
f 299 	302 	328
f 329 	34 	84
f 310 	329 	85
f 334 	335 	332
f 332 	331 	334
f 328 	302 	309
f 328 	309 	330
f 318 	87 	89
f 332 	335 	311
f 335 	314 	311
f 205 	331 	332
f 448 	334 	331
f 311 	41 	332
f 205 	332 	41
f 324 	342 	341
f 331 	204 	448
f 339 	243 	239
f 251 	367 	343
f 339 	348 	243
f 339 	239 	340
f 449 	344 	334
f 373 	372 	343
f 251 	343 	347
f 449 	38 	344
f 251 	347 	255
f 1317 	346 	345
f 345 	346 	341
f 277 	294 	298
f 348 	350 	376
f 282 	288 	369
f 351 	284 	285
f 288 	370 	369
f 352 	353 	256
f 339 	350 	348
f 256 	354 	352
f 461 	301 	281
f 422 	423 	355
f 198 	357 	358
f 257 	352 	354
f 257 	355 	352
f 256 	257 	354
f 198 	359 	357
f 202 	357 	361
f 358 	357 	202
f 608 	355 	257
f 1194 	1269 	284
f 387 	389 	357
f 494 	283 	928
f 294 	193 	363
f 198 	362 	359
f 198 	263 	362
f 362 	263 	353
f 366 	407 	368
f 251 	252 	367
f 373 	343 	367
f 368 	339 	366
f 365 	257 	258
f 340 	599 	366
f 340 	366 	339
f 288 	476 	370
f 369 	370 	476
f 348 	376 	375
f 376 	368 	409
f 43 	721 	337
f 376 	339 	368
f 350 	339 	376
f 721 	413 	337
f 524 	497 	375
f 337 	318 	89
f 372 	447 	347
f 372 	347 	343
f 352 	423 	353
f 455 	353 	423
f 378 	283 	377
f 352 	355 	423
f 382 	310 	111
f 386 	359 	462
f 353 	455 	362
f 462 	362 	455
f 365 	258 	261
f 392 	380 	378
f 355 	608 	422
f 365 	261 	381
f 383 	367 	304
f 426 	310 	382
f 378 	380 	283
f 379 	365 	364
f 410 	383 	338
f 85 	116 	310
f 304 	338 	383
f 242 	388 	385
f 359 	386 	357
f 387 	357 	386
f 365 	379 	257
f 217 	66 	384
f 365 	381 	364
f 361 	357 	389
f 364 	371 	379
f 362 	462 	359
f 371 	364 	374
f 384 	660 	217
f 390 	387 	386
f 381 	374 	364
f 390 	397 	387
f 245 	278 	388
f 406 	330 	391
f 395 	388 	278
f 397 	398 	387
f 399 	396 	316
f 400 	401 	193
f 398 	190 	189
f 194 	400 	193
f 397 	390 	398
f 320 	399 	316
f 278 	878 	395
f 998 	602 	635
f 392 	378 	403
f 471 	190 	402
f 316 	396 	394
f 400 	194 	58
f 190 	398 	402
f 394 	391 	309
f 309 	315 	394
f 398 	390 	402
f 348 	399 	320
f 398 	389 	387
f 375 	399 	348
f 498 	396 	399
f 389 	398 	208
f 189 	208 	398
f 404 	285 	405
f 295 	405 	285
f 394 	419 	391
f 405 	740 	404
f 1282 	406 	545
f 420 	404 	822
f 407 	366 	620
f 409 	368 	407
f 1307 	740 	405
f 309 	391 	330
f 338 	1237 	410
f 329 	310 	426
f 391 	416 	406
f 294 	411 	298
f 294 	408 	411
f 414 	412 	392
f 285 	418 	351
f 374 	1300 	415
f 283 	380 	412
f 420 	418 	285
f 416 	391 	419
f 380 	392 	412
f 318 	337 	413
f 117 	566 	1286
f 383 	410 	505
f 420 	421 	351
f 351 	418 	420
f 505 	373 	383
f 367 	383 	373
f 423 	425 	427
f 1293 	351 	421
f 422 	428 	423
f 428 	425 	423
f 231 	241 	424
f 429 	424 	241
f 429 	555 	424
f 427 	425 	428
f 308 	318 	430
f 413 	430 	318
f 428 	422 	1004
f 431 	559 	429
f 401 	432 	193
f 417 	79 	433
f 420 	285 	404
f 432 	363 	193
f 220 	437 	219
f 221 	437 	220
f 437 	435 	219
f 373 	436 	372
f 432 	408 	294
f 437 	445 	435
f 294 	363 	432
f 401 	638 	432
f 221 	439 	437
f 415 	393 	371
f 446 	445 	439
f 441 	442 	409
f 680 	305 	443
f 308 	430 	233
f 442 	523 	409
f 443 	233 	430
f 349 	314 	335
f 98 	970 	346
f 344 	349 	335
f 344 	335 	334
f 444 	435 	445
f 326 	341 	346
f 3 	325 	349
f 11 	3 	349
f 344 	11 	349
f 49 	1317 	345
f 458 	449 	448
f 437 	439 	445
f 449 	450 	448
f 424 	451 	231
f 451 	235 	231
f 372 	436 	447
f 450 	334 	448
f 447 	436 	440
f 447 	1387 	1389
f 449 	334 	450
f 427 	455 	423
f 453 	452 	268
f 11 	344 	38
f 456 	657 	457
f 454 	282 	369
f 268 	238 	453
f 428 	459 	427
f 1111 	458 	212
f 451 	453 	238
f 454 	460 	461
f 238 	235 	451
f 454 	461 	281
f 427 	459 	463
f 555 	451 	424
f 463 	390 	386
f 214 	216 	464
f 592 	452 	453
f 463 	386 	462
f 456 	465 	464
f 306 	303 	461
f 434 	680 	443
f 462 	427 	463
f 467 	466 	283
f 336 	306 	461
f 329 	468 	34
f 461 	460 	333
f 468 	329 	426
f 333 	336 	461
f 438 	436 	373
f 219 	435 	291
f 469 	291 	435
f 456 	457 	465
f 427 	462 	455
f 435 	444 	469
f 500 	469 	444
f 465 	457 	657
f 449 	458 	36
f 291 	469 	470
f 35 	38 	36
f 288 	291 	470
f 474 	280 	473
f 59 	31 	464
f 474 	276 	279
f 465 	59 	464
f 279 	280 	474
f 459 	471 	463
f 458 	1111 	36
f 463 	471 	402
f 31 	214 	464
f 356 	634 	475
f 402 	390 	463
f 657 	659 	465
f 456 	671 	657
f 177 	474 	477
f 216 	671 	456
f 482 	33 	481
f 478 	184 	477
f 474 	473 	477
f 143 	64 	479
f 473 	478 	477
f 636 	369 	483
f 568 	143 	479
f 473 	287 	478
f 472 	478 	287
f 485 	486 	502
f 369 	476 	483
f 484 	487 	486
f 289 	472 	287
f 486 	485 	484
f 479 	64 	77
f 508 	483 	507
f 476 	507 	483
f 479 	488 	480
f 488 	440 	436
f 480 	488 	436
f 489 	482 	481
f 356 	475 	491
f 227 	572 	490
f 489 	492 	482
f 480 	436 	536
f 490 	188 	227
f 54 	55 	486
f 491 	475 	503
f 479 	77 	488
f 360 	356 	491
f 490 	572 	517
f 487 	54 	486
f 487 	489 	54
f 489 	487 	484
f 489 	484 	492
f 486 	727 	502
f 497 	498 	399
f 476 	288 	470
f 498 	419 	396
f 470 	501 	476
f 672 	466 	674
f 467 	674 	466
f 473 	279 	499
f 394 	396 	419
f 289 	495 	493
f 482 	218 	33
f 470 	469 	500
f 501 	470 	500
f 485 	502 	484
f 289 	287 	495
f 442 	532 	523
f 495 	287 	499
f 1162 	1350 	494
f 467 	494 	674
f 407 	441 	409
f 499 	287 	473
f 279 	639 	499
f 521 	506 	504
f 505 	536 	373
f 201 	509 	510
f 509 	512 	513
f 513 	510 	509
f 517 	515 	513
f 518 	511 	516
f 507 	476 	501
f 512 	517 	513
f 511 	518 	506
f 509 	517 	512
f 506 	518 	442
f 506 	442 	504
f 475 	963 	520
f 520 	503 	475
f 603 	515 	517
f 839 	789 	522
f 442 	441 	504
f 522 	206 	510
f 201 	510 	206
f 375 	376 	524
f 523 	524 	376
f 376 	409 	523
f 511 	526 	516
f 526 	511 	524
f 511 	506 	521
f 466 	753 	533
f 522 	513 	525
f 511 	528 	524
f 466 	377 	283
f 527 	496 	419
f 510 	513 	522
f 378 	466 	533
f 526 	529 	516
f 378 	377 	466
f 515 	525 	513
f 518 	516 	529
f 527 	498 	497
f 419 	498 	527
f 497 	524 	528
f 399 	375 	497
f 530 	515 	607
f 524 	523 	526
f 525 	515 	530
f 529 	526 	532
f 523 	532 	526
f 527 	497 	528
f 742 	552 	531
f 607 	611 	530
f 533 	544 	378
f 532 	442 	518
f 529 	532 	518
f 527 	519 	514
f 496 	527 	514
f 509 	490 	517
f 544 	403 	378
f 753 	783 	533
f 521 	528 	511
f 509 	200 	490
f 521 	519 	527
f 531 	388 	535
f 528 	521 	527
f 385 	388 	531
f 517 	572 	603
f 479 	480 	536
f 744 	742 	535
f 599 	340 	539
f 416 	419 	514
f 419 	496 	514
f 538 	534 	1228
f 388 	395 	535
f 534 	538 	539
f 541 	549 	289
f 535 	395 	542
f 542 	878 	222
f 537 	289 	493
f 536 	438 	373
f 382 	543 	426
f 536 	436 	438
f 541 	289 	537
f 222 	782 	542
f 544 	224 	403
f 791 	426 	543
f 546 	558 	547
f 416 	514 	545
f 545 	548 	112
f 127 	112 	548
f 233 	443 	305
f 548 	551 	127
f 535 	542 	744
f 545 	514 	548
f 551 	128 	127
f 541 	537 	549
f 75 	59 	553
f 553 	59 	550
f 551 	548 	514
f 556 	557 	558
f 551 	514 	519
f 552 	559 	431
f 555 	429 	559
f 521 	551 	519
f 550 	554 	553
f 560 	549 	537
f 559 	552 	582
f 561 	504 	130
f 766 	782 	560
f 582 	585 	559
f 130 	128 	551
f 537 	766 	560
f 561 	130 	551
f 585 	578 	559
f 556 	563 	547
f 547 	557 	556
f 504 	561 	521
f 564 	444 	445
f 558 	557 	547
f 551 	521 	561
f 565 	564 	445
f 410 	1286 	566
f 445 	567 	565
f 567 	564 	565
f 566 	117 	568
f 143 	568 	117
f 88 	75 	562
f 479 	536 	568
f 560 	782 	222
f 566 	505 	410
f 536 	505 	566
f 224 	544 	563
f 566 	568 	536
f 783 	547 	563
f 554 	570 	562
f 573 	572 	228
f 227 	228 	572
f 591 	573 	247
f 573 	574 	603
f 539 	239 	534
f 539 	340 	239
f 572 	573 	603
f 564 	567 	569
f 591 	574 	573
f 600 	540 	538
f 567 	446 	695
f 567 	445 	446
f 540 	539 	538
f 575 	1045 	576
f 253 	234 	579
f 555 	578 	580
f 234 	556 	579
f 558 	579 	556
f 580 	451 	555
f 593 	579 	558
f 577 	581 	609
f 575 	918 	885
f 588 	581 	583
f 393 	415 	635
f 1300 	1325 	415
f 581 	577 	583
f 555 	559 	578
f 588 	589 	581
f 228 	247 	573
f 400 	637 	401
f 578 	590 	580
f 451 	580 	453
f 592 	453 	580
f 580 	594 	592
f 558 	595 	593
f 13 	596 	709
f 748 	408 	432
f 590 	594 	580
f 578 	594 	590
f 749 	411 	408
f 135 	400 	58
f 582 	552 	742
f 538 	1244 	598
f 17 	598 	1244
f 558 	546 	597
f 421 	420 	823
f 822 	823 	420
f 597 	595 	558
f 600 	539 	540
f 598 	600 	538
f 635 	415 	886
f 601 	594 	578
f 598 	17 	619
f 147 	619 	17
f 1127 	1140 	597
f 600 	599 	539
f 1140 	595 	597
f 371 	393 	602
f 374 	415 	371
f 619 	600 	598
f 593 	595 	1139
f 596 	13 	577
f 998 	999 	602
f 602 	606 	371
f 582 	643 	585
f 1004 	422 	608
f 577 	604 	596
f 603 	607 	515
f 608 	605 	1004
f 609 	604 	577
f 604 	609 	581
f 379 	605 	608
f 257 	379 	608
f 607 	610 	611
f 604 	612 	715
f 379 	602 	605
f 606 	602 	379
f 379 	371 	606
f 604 	581 	612
f 613 	612 	589
f 581 	589 	612
f 618 	617 	953
f 616 	644 	615
f 620 	366 	599
f 452 	592 	621
f 7 	617 	618
f 620 	599 	622
f 600 	622 	599
f 407 	624 	441
f 592 	594 	621
f 1333 	1337 	634
f 618 	634 	1337
f 407 	620 	624
f 133 	625 	615
f 616 	615 	625
f 621 	594 	623
f 626 	627 	628
f 630 	616 	625
f 74 	452 	621
f 333 	629 	614
f 624 	627 	504
f 627 	631 	628
f 623 	279 	276
f 623 	639 	279
f 626 	628 	631
f 276 	621 	623
f 624 	504 	441
f 624 	632 	633
f 627 	624 	631
f 130 	626 	631
f 633 	130 	631
f 356 	1333 	634
f 633 	157 	130
f 644 	640 	615
f 133 	615 	141
f 618 	963 	634
f 504 	627 	130
f 633 	631 	624
f 963 	475 	634
f 629 	636 	969
f 633 	619 	147
f 147 	157 	633
f 493 	495 	642
f 633 	622 	619
f 638 	401 	637
f 637 	640 	638
f 562 	79 	88
f 495 	639 	641
f 562 	553 	554
f 135 	136 	637
f 454 	636 	629
f 553 	562 	75
f 640 	644 	638
f 636 	454 	369
f 629 	460 	454
f 643 	642 	641
f 333 	460 	629
f 639 	601 	643
f 653 	262 	645
f 639 	643 	641
f 646 	647 	649
f 262 	1091 	645
f 648 	582 	747
f 650 	651 	492
f 492 	484 	650
f 502 	650 	484
f 643 	601 	578
f 650 	685 	651
f 578 	585 	643
f 582 	648 	643
f 685 	650 	676
f 502 	676 	650
f 747 	766 	648
f 671 	216 	652
f 649 	654 	646
f 262 	653 	655
f 216 	482 	652
f 537 	493 	642
f 653 	286 	655
f 554 	646 	654
f 216 	218 	482
f 286 	262 	655
f 651 	652 	482
f 766 	642 	648
f 651 	482 	492
f 653 	656 	286
f 550 	646 	554
f 802 	680 	658
f 623 	594 	639
f 570 	554 	658
f 659 	550 	465
f 654 	658 	554
f 292 	286 	656
f 662 	550 	659
f 656 	667 	292
f 465 	550 	59
f 658 	661 	660
f 641 	642 	495
f 594 	601 	639
f 1059 	656 	653
f 642 	643 	648
f 662 	659 	657
f 495 	499 	639
f 660 	661 	649
f 657 	663 	662
f 658 	649 	661
f 1171 	1258 	664
f 649 	658 	654
f 1102 	649 	647
f 668 	669 	664
f 564 	569 	664
f 611 	860 	530
f 651 	670 	652
f 671 	652 	670
f 679 	663 	670
f 603 	574 	610
f 657 	671 	663
f 433 	79 	673
f 671 	670 	663
f 672 	674 	675
f 79 	562 	673
f 603 	610 	607
f 675 	733 	672
f 610 	574 	683
f 673 	434 	433
f 574 	591 	684
f 676 	677 	678
f 679 	676 	678
f 683 	574 	684
f 678 	677 	679
f 677 	681 	679
f 917 	293 	666
f 802 	305 	680
f 384 	305 	802
f 673 	680 	434
f 683 	611 	610
f 1053 	917 	666
f 681 	646 	662
f 667 	1055 	666
f 663 	681 	662
f 673 	570 	680
f 1059 	667 	656
f 681 	677 	646
f 662 	646 	550
f 247 	260 	591
f 681 	663 	679
f 677 	647 	646
f 682 	683 	591
f 683 	684 	591
f 336 	923 	306
f 767 	677 	676
f 1176 	665 	1068
f 716 	468 	426
f 651 	685 	670
f 1042 	1049 	645
f 676 	679 	685
f 645 	1091 	1042
f 686 	910 	269
f 670 	685 	679
f 269 	246 	686
f 584 	686 	246
f 690 	686 	584
f 703 	430 	413
f 703 	689 	430
f 691 	688 	687
f 692 	443 	430
f 695 	446 	694
f 439 	694 	446
f 300 	696 	694
f 691 	693 	688
f 674 	730 	675
f 696 	697 	695
f 696 	695 	694
f 570 	658 	680
f 562 	570 	673
f 431 	531 	552
f 665 	698 	306
f 434 	692 	433
f 564 	500 	444
f 698 	665 	1176
f 501 	500 	669
f 564 	669 	500
f 439 	221 	694
f 564 	664 	669
f 698 	696 	300
f 692 	417 	433
f 300 	307 	698
f 696 	698 	697
f 1176 	697 	698
f 443 	692 	434
f 692 	430 	689
f 669 	507 	501
f 699 	701 	700
f 703 	692 	689
f 703 	705 	692
f 707 	1332 	319
f 693 	821 	701
f 633 	632 	622
f 688 	693 	701
f 600 	619 	622
f 688 	701 	699
f 708 	669 	668
f 622 	624 	620
f 622 	632 	624
f 604 	715 	709
f 596 	604 	709
f 507 	704 	708
f 688 	710 	687
f 692 	705 	249
f 704 	669 	708
f 709 	715 	717
f 688 	711 	710
f 688 	713 	711
f 710 	714 	691
f 94 	34 	468
f 691 	687 	710
f 149 	709 	717
f 716 	94 	468
f 710 	736 	714
f 94 	716 	91
f 710 	711 	731
f 715 	719 	718
f 718 	720 	715
f 612 	719 	715
f 715 	720 	717
f 722 	773 	713
f 717 	720 	718
f 722 	713 	699
f 688 	699 	713
f 723 	101 	103
f 503 	520 	712
f 724 	718 	725
f 719 	725 	718
f 712 	706 	503
f 725 	1115 	724
f 703 	721 	723
f 101 	723 	721
f 727 	767 	502
f 676 	502 	767
f 508 	708 	1287
f 721 	703 	413
f 149 	717 	192
f 726 	192 	717
f 704 	507 	669
f 726 	717 	718
f 104 	728 	103
f 508 	507 	708
f 674 	1350 	730
f 967 	727 	486
f 728 	723 	103
f 728 	705 	703
f 691 	714 	966
f 714 	736 	1105
f 728 	703 	723
f 192 	726 	729
f 967 	1102 	727
f 705 	728 	249
f 672 	753 	466
f 728 	259 	249
f 761 	732 	758
f 726 	724 	729
f 726 	718 	724
f 729 	724 	1116
f 612 	613 	719
f 725 	719 	613
f 716 	426 	735
f 575 	586 	918
f 637 	400 	135
f 637 	136 	640
f 640 	136 	141
f 141 	615 	640
f 739 	743 	737
f 531 	535 	742
f 737 	743 	863
f 582 	742 	746
f 744 	747 	742
f 737 	863 	859
f 747 	746 	742
f 745 	575 	576
f 746 	747 	582
f 745 	586 	575
f 754 	743 	739
f 916 	918 	745
f 918 	586 	745
f 748 	749 	408
f 748 	819 	749
f 751 	752 	754
f 762 	1211 	750
f 782 	747 	744
f 710 	756 	736
f 710 	731 	756
f 753 	757 	771
f 1132 	571 	750
f 756 	758 	736
f 757 	753 	672
f 756 	759 	758
f 738 	760 	927
f 929 	927 	760
f 733 	757 	672
f 759 	761 	758
f 760 	930 	929
f 751 	754 	739
f 776 	761 	731
f 765 	757 	734
f 761 	756 	731
f 759 	756 	761
f 757 	675 	734
f 733 	675 	757
f 760 	868 	930
f 642 	766 	537
f 758 	1112 	736
f 571 	762 	750
f 762 	571 	764
f 754 	752 	763
f 739 	798 	800
f 739 	800 	751
f 747 	782 	766
f 800 	801 	751
f 1219 	1211 	762
f 647 	677 	767
f 772 	773 	774
f 765 	771 	757
f 770 	763 	752
f 776 	731 	772
f 547 	765 	546
f 731 	711 	772
f 765 	597 	546
f 774 	776 	772
f 777 	768 	769
f 774 	778 	779
f 765 	547 	771
f 761 	776 	779
f 774 	779 	776
f 774 	787 	778
f 744 	542 	782
f 781 	775 	768
f 773 	790 	774
f 867 	775 	781
f 753 	771 	783
f 781 	768 	777
f 804 	265 	770
f 1030 	770 	265
f 771 	547 	783
f 778 	1225 	779
f 825 	784 	780
f 544 	533 	783
f 779 	732 	761
f 783 	563 	544
f 772 	713 	773
f 772 	711 	713
f 785 	765 	734
f 959 	780 	784
f 786 	765 	785
f 768 	738 	769
f 789 	839 	788
f 737 	789 	788
f 786 	597 	765
f 735 	426 	791
f 737 	788 	792
f 774 	790 	793
f 737 	206 	789
f 790 	794 	787
f 161 	1127 	597
f 791 	543 	1090
f 787 	793 	790
f 206 	522 	789
f 786 	161 	597
f 859 	206 	737
f 791 	716 	735
f 795 	794 	796
f 790 	796 	794
f 788 	739 	792
f 739 	737 	792
f 774 	793 	787
f 675 	785 	734
f 788 	798 	739
f 798 	888 	800
f 133 	716 	797
f 785 	142 	161
f 788 	840 	798
f 141 	91 	133
f 161 	786 	785
f 716 	791 	797
f 794 	1137 	787
f 752 	751 	801
f 730 	785 	675
f 1137 	1146 	787
f 888 	891 	800
f 808 	752 	801
f 658 	660 	802
f 803 	452 	74
f 802 	660 	384
f 452 	803 	268
f 803 	807 	268
f 799 	699 	700
f 799 	809 	699
f 752 	808 	810
f 808 	804 	770
f 722 	699 	796
f 808 	770 	810
f 809 	796 	699
f 770 	752 	810
f 773 	722 	790
f 796 	790 	722
f 808 	801 	898
f 796 	799 	795
f 809 	799 	796
f 813 	755 	741
f 813 	741 	740
f 10 	48 	814
f 967 	486 	55
f 47 	814 	48
f 814 	47 	815
f 853 	227 	188
f 873 	10 	814
f 985 	815 	47
f 817 	819 	748
f 816 	807 	803
f 630 	819 	817
f 806 	830 	821
f 817 	616 	630
f 821 	693 	691
f 164 	816 	803
f 584 	587 	690
f 898 	899 	808
f 780 	1018 	824
f 174 	177 	816
f 811 	806 	821
f 210 	826 	215
f 820 	827 	1085
f 820 	856 	827
f 271 	807 	828
f 824 	825 	780
f 811 	821 	691
f 909 	833 	824
f 816 	828 	807
f 270 	909 	824
f 801 	800 	891
f 806 	805 	830
f 801 	891 	898
f 278 	828 	812
f 805 	806 	818
f 804 	899 	897
f 827 	856 	829
f 804 	808 	899
f 816 	831 	828
f 856 	838 	829
f 270 	910 	909
f 821 	841 	701
f 826 	812 	828
f 834 	835 	805
f 836 	700 	701
f 825 	824 	833
f 820 	837 	832
f 828 	831 	826
f 788 	839 	840
f 836 	841 	835
f 878 	812 	826
f 839 	844 	840
f 835 	845 	842
f 262 	843 	1091
f 525 	844 	839
f 843 	837 	1091
f 834 	845 	835
f 215 	826 	180
f 842 	836 	835
f 826 	184 	180
f 522 	525 	839
f 826 	831 	184
f 843 	262 	847
f 844 	846 	840
f 816 	184 	831
f 844 	848 	850
f 847 	262 	264
f 530 	848 	844
f 184 	816 	177
f 843 	847 	832
f 849 	200 	201
f 844 	525 	530
f 846 	850 	840
f 851 	200 	849
f 982 	845 	834
f 846 	844 	850
f 982 	834 	805
f 847 	267 	861
f 851 	853 	200
f 821 	830 	835
f 848 	530 	860
f 860 	850 	848
f 821 	835 	841
f 837 	843 	832
f 830 	805 	835
f 854 	798 	840
f 849 	852 	853
f 840 	850 	854
f 853 	851 	849
f 838 	856 	855
f 860 	858 	857
f 836 	701 	841
f 856 	861 	855
f 859 	849 	206
f 201 	206 	849
f 862 	858 	860
f 863 	754 	1003
f 864 	865 	277
f 755 	822 	741
f 863 	743 	754
f 768 	760 	738
f 266 	319 	855
f 298 	864 	277
f 777 	769 	1013
f 856 	820 	832
f 852 	849 	863
f 849 	859 	863
f 865 	230 	277
f 856 	832 	847
f 775 	760 	768
f 853 	188 	200
f 865 	107 	230
f 856 	847 	861
f 775 	867 	760
f 278 	812 	878
f 864 	871 	865
f 403 	870 	392
f 847 	264 	267
f 868 	760 	867
f 382 	111 	871
f 228 	227 	872
f 227 	904 	872
f 874 	26 	27
f 904 	227 	853
f 864 	866 	871
f 873 	874 	27
f 867 	781 	869
f 213 	875 	876
f 864 	892 	866
f 27 	10 	873
f 814 	879 	873
f 542 	395 	878
f 873 	881 	874
f 215 	878 	210
f 822 	404 	741
f 877 	880 	571
f 822 	895 	823
f 826 	210 	878
f 880 	764 	571
f 215 	222 	878
f 870 	213 	876
f 889 	392 	884
f 392 	870 	884
f 870 	875 	884
f 876 	875 	870
f 884 	875 	889
f 213 	234 	875
f 850 	860 	857
f 882 	887 	1047
f 882 	883 	887
f 870 	224 	213
f 403 	224 	870
f 798 	854 	888
f 889 	1045 	414
f 638 	890 	432
f 883 	295 	887
f 414 	392 	889
f 891 	888 	858
f 857 	858 	888
f 638 	644 	890
f 644 	905 	890
f 890 	748 	432
f 892 	864 	298
f 854 	850 	857
f 854 	857 	888
f 822 	755 	894
f 1062 	1063 	882
f 894 	895 	822
f 228 	872 	247
f 891 	858 	898
f 246 	893 	738
f 875 	234 	896
f 895 	894 	755
f 234 	253 	896
f 745 	576 	889
f 265 	804 	897
f 862 	860 	611
f 895 	908 	179
f 896 	889 	875
f 895 	755 	908
f 260 	265 	682
f 897 	682 	265
f 253 	745 	896
f 901 	902 	858
f 897 	899 	900
f 901 	900 	899
f 897 	900 	683
f 745 	889 	896
f 1032 	886 	1325
f 858 	902 	898
f 817 	748 	890
f 817 	644 	616
f 898 	901 	899
f 903 	872 	904
f 897 	683 	682
f 898 	902 	901
f 644 	817 	905
f 611 	901 	862
f 901 	858 	862
f 817 	890 	905
f 901 	611 	900
f 755 	813 	907
f 907 	182 	908
f 179 	908 	182
f 611 	683 	900
f 910 	911 	909
f 910 	270 	269
f 873 	879 	881
f 911 	833 	909
f 913 	833 	911
f 914 	910 	686
f 879 	814 	815
f 917 	319 	912
f 914 	911 	910
f 690 	914 	686
f 253 	916 	745
f 916 	1139 	918
f 912 	293 	917
f 881 	879 	1098
f 1139 	916 	593
f 253 	593 	916
f 922 	1111 	921
f 1168 	925 	924
f 246 	738 	926
f 915 	1217 	923
f 922 	921 	881
f 927 	926 	738
f 929 	943 	927
f 921 	874 	881
f 938 	946 	915
f 923 	333 	915
f 921 	24 	874
f 26 	874 	24
f 665 	306 	923
f 336 	333 	923
f 341 	931 	932
f 1017 	920 	925
f 342 	931 	341
f 762 	880 	935
f 1290 	934 	933
f 762 	764 	880
f 935 	1219 	762
f 935 	1279 	1219
f 707 	319 	917
f 924 	925 	920
f 920 	919 	924
f 1103 	158 	885
f 934 	33 	214
f 934 	214 	1118
f 931 	324 	702
f 931 	342 	324
f 1139 	1138 	918
f 936 	345 	932
f 341 	932 	345
f 932 	1227 	936
f 885 	918 	1103
f 49 	345 	936
f 877 	1338 	1113
f 938 	915 	333
f 333 	614 	938
f 1113 	1114 	877
f 946 	1217 	915
f 941 	937 	940
f 1147 	935 	1114
f 937 	941 	942
f 1135 	927 	943
f 943 	929 	944
f 930 	944 	929
f 866 	945 	1069
f 960 	991 	938
f 945 	892 	1069
f 954 	942 	941
f 948 	944 	947
f 930 	947 	944
f 931 	1226 	932
f 1087 	892 	298
f 949 	948 	947
f 866 	892 	945
f 949 	976 	992
f 1226 	931 	1197
f 951 	818 	806
f 49 	936 	1246
f 947 	869 	949
f 867 	869 	947
f 966 	964 	806
f 806 	811 	966
f 1242 	952 	941
f 954 	952 	324
f 950 	1203 	982
f 955 	781 	956
f 781 	777 	956
f 953 	67 	977
f 71 	977 	67
f 951 	950 	805
f 941 	952 	954
f 938 	614 	629
f 805 	818 	951
f 954 	326 	346
f 324 	326 	954
f 618 	953 	962
f 970 	954 	346
f 957 	956 	777
f 938 	629 	960
f 962 	953 	974
f 838 	961 	829
f 660 	1215 	958
f 959 	784 	825
f 963 	618 	962
f 838 	855 	961
f 855 	965 	961
f 855 	319 	965
f 780 	959 	957
f 53 	958 	55
f 636 	483 	969
f 958 	967 	55
f 972 	955 	956
f 942 	954 	968
f 629 	969 	960
f 969 	483 	508
f 959 	956 	957
f 977 	974 	953
f 970 	968 	954
f 956 	959 	971
f 970 	98 	968
f 974 	979 	962
f 972 	971 	989
f 973 	960 	969
f 95 	968 	98
f 806 	964 	951
f 937 	942 	968
f 972 	956 	971
f 968 	95 	975
f 81 	975 	95
f 937 	975 	1334
f 691 	966 	811
f 973 	969 	508
f 966 	714 	1105
f 966 	1105 	1106
f 966 	1106 	964
f 976 	994 	992
f 1106 	1205 	964
f 968 	975 	937
f 976 	978 	994
f 767 	727 	1102
f 520 	963 	979
f 962 	979 	963
f 976 	972 	978
f 955 	972 	976
f 981 	983 	984
f 781 	955 	976
f 984 	985 	981
f 980 	845 	982
f 869 	781 	976
f 47 	46 	985
f 805 	950 	982
f 959 	825 	986
f 46 	987 	985
f 987 	981 	985
f 988 	986 	833
f 825 	833 	986
f 971 	959 	986
f 983 	815 	985
f 980 	982 	1220
f 1203 	1220 	982
f 979 	974 	1280
f 985 	984 	983
f 986 	989 	971
f 1205 	1203 	951
f 950 	951 	1203
f 979 	712 	520
f 321 	987 	46
f 951 	964 	1205
f 988 	1001 	989
f 988 	989 	986
f 987 	1343 	981
f 979 	1280 	712
f 973 	991 	960
f 958 	217 	660
f 946 	938 	991
f 991 	1284 	946
f 993 	994 	972
f 994 	978 	972
f 983 	1098 	815
f 972 	989 	993
f 1284 	991 	973
f 989 	1001 	993
f 906 	903 	904
f 908 	755 	907
f 994 	1019 	992
f 356 	919 	1333
f 996 	997 	988
f 393 	635 	602
f 605 	602 	999
f 904 	852 	906
f 360 	491 	924
f 904 	853 	852
f 635 	1000 	998
f 356 	924 	919
f 1001 	988 	997
f 1000 	1002 	998
f 924 	356 	360
f 1007 	920 	1006
f 754 	763 	1003
f 1008 	18 	1007
f 852 	863 	906
f 18 	19 	1007
f 605 	999 	1004
f 906 	863 	1003
f 1006 	1010 	1007
f 998 	1011 	999
f 996 	1009 	1005
f 1010 	1008 	1007
f 1007 	19 	8
f 1002 	1011 	998
f 1023 	1024 	1005
f 1003 	903 	906
f 1012 	428 	1004
f 1012 	1004 	999
f 82 	18 	1008
f 996 	1005 	997
f 1011 	1012 	999
f 1010 	1175 	1008
f 1024 	997 	1005
f 1013 	893 	246
f 996 	988 	833
f 996 	833 	913
f 1012 	459 	428
f 1013 	769 	738
f 1009 	996 	911
f 738 	893 	1013
f 1000 	1014 	1011
f 939 	920 	1007
f 996 	913 	911
f 1002 	1000 	1011
f 911 	1169 	1009
f 247 	872 	1016
f 269 	270 	1013
f 471 	459 	1015
f 1028 	471 	1015
f 1019 	1020 	1021
f 1013 	270 	1018
f 1015 	1014 	1028
f 1020 	1022 	1021
f 1013 	246 	269
f 1183 	1017 	1180
f 1023 	1021 	1024
f 1013 	1018 	777
f 1011 	1014 	1015
f 1021 	1022 	1024
f 1015 	459 	1012
f 1183 	1185 	1017
f 1024 	1025 	997
f 1001 	997 	1025
f 1015 	1012 	1011
f 780 	957 	777
f 1017 	1006 	920
f 1016 	1026 	247
f 1017 	1010 	1006
f 1000 	635 	886
f 270 	824 	1018
f 1017 	1027 	1010
f 1032 	1000 	886
f 780 	777 	1018
f 1026 	260 	247
f 1028 	190 	471
f 903 	1026 	872
f 872 	1026 	1016
f 993 	1025 	994
f 1020 	994 	1025
f 1000 	1028 	1014
f 994 	1020 	1019
f 265 	1026 	1030
f 993 	1001 	1025
f 1025 	1024 	1020
f 1032 	1325 	196
f 1024 	1022 	1020
f 1029 	1283 	1267
f 196 	187 	1028
f 1030 	1026 	903
f 1028 	1032 	196
f 1033 	1040 	1034
f 1003 	1030 	903
f 1028 	1000 	1032
f 1003 	763 	1030
f 770 	1030 	763
f 187 	190 	1028
f 1061 	1040 	1033
f 1130 	273 	1029
f 845 	1035 	842
f 276 	74 	621
f 1029 	273 	255
f 1036 	845 	1073
f 816 	164 	174
f 1033 	1257 	60
f 1033 	60 	1051
f 174 	803 	74
f 1345 	1352 	981
f 164 	803 	174
f 845 	1036 	1035
f 836 	1038 	799
f 836 	799 	700
f 1132 	1039 	571
f 842 	1038 	836
f 1372 	995 	1042
f 842 	1035 	1038
f 1045 	1046 	412
f 653 	645 	1049
f 1048 	1056 	1054
f 1047 	1056 	1048
f 877 	571 	1039
f 1050 	575 	1340
f 885 	1340 	575
f 60 	175 	1051
f 1050 	1336 	1043
f 1048 	1052 	1128
f 1053 	666 	1055
f 958 	1215 	967
f 1051 	1067 	1057
f 1071 	1057 	1067
f 1058 	866 	1069
f 1040 	2 	1
f 866 	1060 	871
f 1055 	667 	1059
f 866 	1058 	1060
f 1057 	2 	1040
f 1058 	1090 	1060
f 1049 	1059 	653
f 1040 	1061 	1057
f 1056 	1047 	887
f 871 	1060 	382
f 1071 	2 	1057
f 382 	1060 	543
f 1090 	543 	1060
f 1033 	1051 	1057
f 1057 	1061 	1033
f 882 	1063 	1065
f 5 	1107 	1
f 1055 	1059 	1075
f 882 	1124 	1062
f 1040 	1 	1066
f 1034 	1040 	1066
f 1066 	1041 	1034
f 1109 	1041 	1066
f 1054 	1064 	1048
f 1064 	1052 	1048
f 175 	178 	1067
f 290 	1269 	1056
f 178 	1070 	1067
f 887 	290 	1056
f 178 	1072 	1070
f 883 	882 	1065
f 1035 	1076 	1077
f 1075 	1049 	1078
f 1079 	1074 	1072
f 983 	981 	990
f 1049 	1042 	995
f 1049 	995 	1078
f 405 	295 	1080
f 1072 	1081 	1079
f 820 	1082 	1083
f 1075 	1078 	995
f 295 	883 	1080
f 820 	1083 	1084
f 1081 	1072 	183
f 883 	1063 	1080
f 837 	820 	1084
f 883 	1065 	1063
f 820 	1085 	1082
f 1117 	1081 	191
f 1063 	1297 	1080
f 1075 	1059 	1049
f 1080 	1307 	405
f 741 	404 	740
f 829 	1086 	827
f 1085 	827 	1086
f 892 	1087 	1069
f 2 	1071 	4
f 1070 	1071 	1067
f 1070 	1088 	1071
f 298 	411 	1087
f 1074 	1071 	1088
f 1071 	1074 	4
f 1082 	1355 	1083
f 1074 	1070 	1072
f 1074 	1088 	1070
f 1058 	1288 	1090
f 1074 	5 	4
f 1154 	1062 	1124
f 1055 	1075 	1089
f 1062 	1295 	1063
f 837 	1092 	1091
f 1074 	1079 	5
f 837 	1083 	1092
f 1301 	1288 	1069
f 1055 	1089 	1053
f 1084 	1083 	837
f 1361 	1369 	1083
f 1213 	1053 	1089
f 1093 	1100 	588
f 949 	869 	976
f 867 	947 	930
f 1100 	589 	588
f 868 	867 	930
f 983 	990 	1094
f 1301 	1069 	1087
f 949 	1095 	948
f 1041 	1109 	1093
f 992 	1019 	1095
f 992 	1095 	949
f 1096 	732 	779
f 1099 	1097 	1098
f 983 	1094 	1098
f 1099 	1098 	1094
f 879 	815 	1098
f 758 	732 	1096
f 881 	1098 	1097
f 589 	1100 	613
f 1101 	613 	1100
f 922 	881 	1097
f 1102 	1215 	649
f 1100 	1104 	1101
f 990 	1352 	1094
f 725 	613 	1101
f 158 	1103 	1125
f 1120 	1115 	1104
f 1107 	1121 	1104
f 138 	1340 	158
f 1107 	1066 	1
f 1108 	1106 	1105
f 1066 	1107 	1109
f 1103 	918 	1138
f 1100 	1110 	1104
f 1107 	1104 	1109
f 1111 	212 	921
f 1104 	1110 	1109
f 1112 	1108 	1105
f 1138 	1125 	1103
f 1109 	1100 	1093
f 922 	1170 	1111
f 880 	877 	1114
f 1109 	1110 	1100
f 1116 	724 	1115
f 1112 	1191 	1108
f 729 	1116 	1117
f 1076 	1136 	1077
f 1119 	1114 	1113
f 736 	1112 	1105
f 1117 	191 	729
f 1035 	1077 	1038
f 1077 	1137 	795
f 795 	799 	1077
f 151 	152 	1119
f 1101 	1115 	725
f 1077 	799 	1038
f 1050 	1045 	575
f 1101 	1104 	1115
f 1043 	1045 	1050
f 1073 	1076 	1035
f 1119 	1113 	151
f 1120 	1104 	1121
f 1035 	1036 	1073
f 576 	1045 	889
f 1107 	5 	1121
f 1136 	1137 	1077
f 1120 	1116 	1115
f 1120 	1122 	1116
f 1073 	1141 	1076
f 1079 	1123 	1121
f 1073 	845 	980
f 1073 	980 	1223
f 1045 	412 	414
f 1044 	928 	1043
f 1124 	1126 	1155
f 1124 	1155 	1154
f 1045 	1043 	1046
f 1047 	1048 	1126
f 5 	1079 	1121
f 928 	1046 	1043
f 1123 	1120 	1121
f 161 	1125 	1127
f 1124 	882 	1047
f 1123 	1122 	1120
f 412 	1046 	928
f 1124 	1047 	1126
f 1116 	1123 	1117
f 283 	412 	928
f 1116 	1122 	1123
f 1037 	1029 	1031
f 1128 	1157 	1126
f 1123 	1079 	1081
f 1123 	1081 	1117
f 1048 	1128 	1126
f 1130 	1029 	1037
f 1128 	1064 	1129
f 1052 	1064 	1128
f 1133 	584 	1134
f 926 	1134 	246
f 584 	246 	1134
f 926 	927 	1135
f 926 	1135 	1134
f 1135 	1133 	1134
f 1130 	1132 	273
f 943 	1152 	1135
f 1133 	587 	584
f 1133 	690 	587
f 794 	795 	1137
f 1125 	1140 	1127
f 1132 	274 	273
f 1136 	1076 	1141
f 1140 	1139 	595
f 1140 	1138 	1139
f 1140 	1131 	1138
f 1132 	1130 	1037
f 1125 	1138 	1131
f 1039 	1132 	1037
f 1141 	1222 	1143
f 1140 	1125 	1131
f 1144 	244 	77
f 1119 	244 	1144
f 1119 	152 	244
f 1142 	1136 	1141
f 880 	1114 	935
f 1142 	1141 	1143
f 1114 	1148 	1147
f 1137 	1136 	1142
f 1114 	1149 	1148
f 1148 	86 	105
f 77 	86 	1148
f 1137 	1142 	1146
f 1148 	105 	1147
f 1149 	1114 	1119
f 1075 	1151 	1160
f 1075 	1160 	1089
f 1144 	77 	1148
f 1148 	1119 	1144
f 1148 	1149 	1119
f 1017 	925 	1150
f 944 	1152 	943
f 1150 	1180 	1017
f 1141 	1073 	1223
f 1223 	1222 	1141
f 1152 	1133 	1135
f 1075 	995 	1151
f 1152 	1167 	1133
f 1168 	1150 	925
f 1155 	1126 	1157
f 1129 	1158 	1128
f 1157 	1128 	1158
f 944 	1187 	1152
f 1160 	1156 	1089
f 494 	928 	1162
f 928 	1044 	1153
f 1159 	1163 	1161
f 928 	1153 	1162
f 1021 	1165 	1019
f 1167 	1152 	1166
f 1164 	1163 	1159
f 31 	73 	1118
f 1169 	911 	914
f 1168 	924 	491
f 664 	569 	1171
f 690 	1169 	914
f 569 	567 	1171
f 491 	503 	1168
f 1172 	1171 	567
f 1169 	690 	1173
f 1175 	1010 	1174
f 1173 	690 	1133
f 1172 	567 	695
f 1173 	1133 	1167
f 1174 	1366 	1175
f 1154 	1159 	1161
f 1068 	1177 	1176
f 1169 	1005 	1009
f 1177 	1178 	1176
f 1236 	1177 	1068
f 1023 	1005 	1179
f 1159 	1157 	1182
f 1150 	1189 	1180
f 1176 	1181 	697
f 1179 	1005 	1169
f 1159 	1155 	1157
f 1154 	1155 	1159
f 1021 	1023 	1179
f 1178 	1181 	1176
f 1184 	1182 	1157
f 1167 	1179 	1169
f 1181 	1172 	697
f 1157 	1158 	1184
f 1027 	1017 	1268
f 697 	1172 	695
f 1167 	1169 	1173
f 1187 	944 	1188
f 1171 	1181 	1186
f 1010 	1027 	1268
f 1184 	1164 	1159
f 1171 	1172 	1181
f 1159 	1182 	1184
f 1177 	1181 	1178
f 1095 	1165 	1188
f 1029 	1183 	1180
f 1177 	1186 	1181
f 1165 	1179 	1188
f 1177 	1236 	1258
f 1163 	1164 	182
f 182 	907 	1163
f 1165 	1095 	1019
f 1192 	156 	1190
f 944 	948 	1188
f 1194 	1193 	1195
f 948 	1095 	1188
f 1194 	1196 	1193
f 156 	1332 	707
f 1112 	1096 	1191
f 1188 	1152 	1187
f 1112 	758 	1096
f 1166 	1179 	1167
f 351 	1196 	1194
f 1188 	1179 	1166
f 1021 	1179 	1165
f 1188 	1166 	1152
f 707 	1190 	156
f 1193 	1292 	1291
f 1262 	150 	702
f 1197 	150 	1199
f 134 	1199 	150
f 647 	767 	1102
f 351 	1194 	284
f 1291 	1204 	1193
f 162 	1200 	1199
f 1205 	1202 	1203
f 1205 	1209 	1202
f 162 	1199 	134
f 1205 	1108 	1209
f 1192 	240 	156
f 1198 	1208 	1237
f 1208 	1207 	1237
f 1108 	1202 	1209
f 1210 	1097 	1099
f 1210 	1212 	1097
f 1198 	272 	1211
f 1220 	1203 	1202
f 922 	1212 	1210
f 750 	1211 	1132
f 1213 	1190 	917
f 1108 	1191 	1202
f 917 	1053 	1213
f 272 	274 	1211
f 922 	1097 	1212
f 1211 	274 	1132
f 1118 	1214 	934
f 933 	934 	1214
f 1108 	1205 	1106
f 665 	923 	1068
f 1217 	1068 	923
f 417 	297 	1218
f 1208 	1198 	1211
f 1211 	1219 	1208
f 1102 	967 	1215
f 660 	649 	1215
f 1216 	1218 	50
f 1217 	946 	1236
f 1214 	1218 	933
f 1222 	1223 	1221
f 1220 	1221 	1223
f 1218 	1216 	933
f 1224 	779 	1225
f 1068 	1217 	1236
f 1227 	932 	1226
f 1170 	922 	1210
f 1225 	1229 	1230
f 1213 	1192 	1190
f 328 	1228 	327
f 707 	917 	1190
f 330 	1231 	328
f 73 	79 	1214
f 330 	406 	1231
f 1214 	1118 	73
f 702 	1197 	931
f 1230 	1224 	1225
f 1246 	936 	1227
f 1228 	328 	1232
f 35 	36 	1170
f 1227 	1226 	1240
f 1240 	1246 	1227
f 1231 	1232 	328
f 1197 	1199 	1226
f 1170 	1210 	35
f 63 	35 	1210
f 1228 	534 	239
f 1099 	1094 	30
f 1230 	1191 	1096
f 1224 	1230 	1096
f 1210 	1099 	63
f 1099 	30 	63
f 327 	1228 	239
f 214 	31 	1118
f 779 	1224 	1096
f 1089 	1192 	1233
f 1229 	1225 	1142
f 1228 	1232 	1243
f 1218 	1214 	79
f 1244 	1228 	1243
f 1234 	1235 	937
f 1192 	1213 	1233
f 1235 	940 	937
f 1233 	1213 	1089
f 1230 	1229 	1222
f 941 	940 	1235
f 1222 	1221 	1230
f 1334 	1234 	937
f 1244 	538 	1228
f 1202 	1191 	1230
f 1221 	1202 	1230
f 1086 	829 	1238
f 272 	1198 	1237
f 1146 	1142 	1225
f 338 	272 	1237
f 1225 	778 	787
f 941 	1235 	1242
f 1226 	1239 	1240
f 1146 	1225 	787
f 1237 	1207 	12
f 1222 	1229 	1142
f 1142 	1143 	1222
f 1238 	829 	1241
f 1199 	1200 	1240
f 1223 	980 	1220
f 1239 	1199 	1240
f 1199 	1239 	1226
f 1089 	1156 	1192
f 1245 	1201 	1256
f 1202 	1221 	1220
f 1241 	961 	1238
f 240 	1192 	1156
f 1231 	1243 	1232
f 119 	49 	1246
f 791 	1090 	1247
f 829 	961 	1241
f 1240 	1248 	1246
f 1240 	1200 	1250
f 1240 	1250 	1248
f 1243 	16 	17
f 1243 	29 	16
f 1252 	1247 	1251
f 17 	1244 	1243
f 1250 	162 	259
f 1247 	1249 	1251
f 1242 	1262 	952
f 728 	104 	1250
f 1243 	1253 	29
f 104 	124 	1250
f 259 	728 	1250
f 1231 	29 	1253
f 1200 	162 	1250
f 1243 	1231 	1253
f 1246 	1248 	119
f 124 	119 	1248
f 1247 	1252 	791
f 56 	1201 	1270
f 1248 	1250 	124
f 1251 	630 	625
f 1251 	625 	1252
f 1255 	1238 	961
f 1254 	1201 	56
f 1284 	1272 	946
f 1252 	625 	797
f 1254 	1256 	1201
f 1236 	946 	1272
f 1257 	1254 	57
f 150 	1262 	114
f 1258 	1259 	1260
f 1033 	1034 	1257
f 146 	106 	1255
f 1171 	1186 	1258
f 57 	60 	1257
f 1242 	114 	1262
f 664 	1258 	1260
f 1256 	1254 	1261
f 1257 	1261 	1254
f 1145 	1180 	1189
f 1206 	1195 	1193
f 1186 	1177 	1258
f 1029 	1180 	1145
f 1193 	1204 	1206
f 1257 	1034 	1261
f 664 	1260 	668
f 1245 	577 	13
f 1196 	1292 	1193
f 583 	577 	1263
f 1245 	1263 	577
f 1263 	1264 	588
f 1263 	1256 	1264
f 1261 	1264 	1256
f 1029 	1185 	1183
f 1034 	1041 	1261
f 1129 	1265 	1299
f 1206 	1299 	1265
f 1261 	1041 	1264
f 1260 	708 	668
f 1029 	1145 	1031
f 1041 	1093 	1264
f 1064 	1265 	1129
f 1264 	1093 	588
f 1194 	1195 	1266
f 588 	583 	1263
f 1259 	1258 	1236
f 1245 	1256 	1263
f 1269 	1194 	1266
f 1054 	1269 	1266
f 1267 	1268 	1017
f 1195 	1265 	1266
f 1064 	1054 	1266
f 1201 	1271 	1270
f 1056 	1269 	1054
f 145 	977 	71
f 1270 	57 	1254
f 1254 	56 	1270
f 977 	145 	1273
f 1266 	1265 	1064
f 1201 	1245 	1271
f 13 	1271 	1245
f 1206 	1265 	1195
f 12 	1275 	102
f 1274 	977 	1273
f 1185 	1029 	1267
f 1274 	145 	148
f 12 	1208 	1275
f 1274 	1273 	145
f 1279 	1275 	1208
f 1029 	347 	1283
f 1029 	255 	347
f 1219 	1279 	1208
f 974 	1274 	1280
f 1267 	1017 	1185
f 1279 	105 	1275
f 935 	1147 	1279
f 1281 	1306 	1278
f 148 	160 	1274
f 160 	1280 	1274
f 406 	1282 	1231
f 1283 	1389 	1268
f 29 	1231 	1282
f 1277 	381 	1285
f 1268 	1174 	1010
f 416 	545 	406
f 1388 	1365 	1268
f 1236 	1272 	1284
f 1286 	410 	1237
f 155 	29 	112
f 974 	977 	1274
f 374 	381 	1277
f 1283 	1268 	1267
f 112 	1282 	545
f 1276 	1285 	381
f 1286 	12 	117
f 118 	117 	12
f 1379 	1145 	1189
f 1150 	1331 	1189
f 1207 	1208 	12
f 973 	508 	1287
f 1286 	1237 	12
f 1276 	1281 	1278
f 797 	625 	133
f 1287 	1284 	973
f 797 	791 	1252
f 1058 	1069 	1288
f 1284 	1260 	1259
f 1288 	1249 	1247
f 1287 	1260 	1284
f 1259 	1236 	1284
f 1288 	1247 	1090
f 1287 	708 	1260
f 1278 	1285 	1276
f 1290 	933 	1289
f 1301 	1249 	1288
f 1285 	1278 	1277
f 1291 	1206 	1204
f 934 	1290 	33
f 1290 	481 	33
f 1294 	62 	54
f 1319 	1321 	1292
f 1294 	54 	1290
f 1295 	1296 	1297
f 1293 	421 	1318
f 1290 	54 	489
f 1290 	1289 	1294
f 1297 	1296 	1302
f 1289 	51 	1294
f 1062 	1154 	1295
f 1290 	489 	481
f 1297 	1063 	1295
f 226 	225 	50
f 1293 	1292 	1196
f 1163 	1296 	1161
f 50 	297 	226
f 50 	1289 	933
f 1293 	1196 	351
f 933 	1216 	50
f 66 	62 	1294
f 51 	66 	1294
f 1296 	1295 	1161
f 1298 	1206 	1291
f 50 	51 	1289
f 1161 	1295 	1154
f 1298 	1299 	1206
f 1312 	1299 	1298
f 1299 	1312 	1129
f 1158 	1129 	1312
f 1318 	1319 	1293
f 1277 	1300 	374
f 1292 	1293 	1319
f 1277 	1304 	1300
f 1307 	1080 	1297
f 421 	823 	1318
f 1301 	1303 	1249
f 1277 	1305 	1304
f 1311 	1303 	1301
f 197 	1300 	1304
f 1297 	1302 	1309
f 1281 	1308 	1306
f 1309 	813 	740
f 202 	361 	1308
f 361 	208 	1308
f 1309 	1307 	1297
f 1309 	740 	1307
f 1302 	1296 	1309
f 1308 	1281 	202
f 1315 	1309 	1296
f 1306 	1304 	1278
f 1315 	813 	1309
f 1305 	1278 	1304
f 1277 	1278 	1305
f 1087 	411 	1310
f 749 	1310 	411
f 203 	197 	1306
f 1301 	1087 	1310
f 1304 	1306 	197
f 208 	203 	1308
f 1306 	1308 	203
f 1310 	1311 	1301
f 361 	389 	208
f 1303 	1311 	1249
f 1322 	1312 	1298
f 1249 	1311 	1251
f 1314 	1184 	1158
f 1310 	749 	1311
f 1314 	1313 	1184
f 749 	819 	1311
f 1313 	1314 	23
f 1251 	1311 	819
f 819 	630 	1251
f 1313 	1164 	1184
f 1164 	1313 	182
f 1296 	1163 	1315
f 907 	1315 	1163
f 1314 	1158 	1312
f 907 	813 	1315
f 1313 	23 	179
f 346 	1317 	1316
f 1313 	179 	182
f 34 	32 	1320
f 1320 	84 	34
f 1320 	1326 	84
f 32 	39 	1320
f 1298 	1291 	1322
f 1321 	1322 	1291
f 1291 	1292 	1321
f 1323 	43 	337
f 1323 	337 	89
f 98 	1316 	1323
f 172 	1312 	1322
f 1316 	1317 	1323
f 165 	1319 	1318
f 98 	1323 	89
f 165 	1321 	1319
f 165 	170 	1321
f 346 	1316 	98
f 1322 	1321 	172
f 1317 	49 	52
f 1321 	170 	172
f 52 	1324 	1317
f 1325 	1300 	197
f 886 	415 	1325
f 43 	1323 	52
f 1323 	1324 	52
f 1317 	1324 	1323
f 108 	84 	1326
f 108 	230 	107
f 197 	196 	1325
f 1318 	823 	1328
f 895 	1328 	823
f 1326 	1327 	194
f 194 	232 	1326
f 1314 	172 	23
f 1326 	232 	108
f 172 	165 	23
f 232 	230 	108
f 1329 	1320 	39
f 1314 	1312 	172
f 1320 	1327 	1326
f 447 	1283 	347
f 1328 	23 	165
f 674 	494 	1350
f 1320 	1329 	1327
f 165 	1318 	1328
f 895 	179 	1328
f 23 	1328 	179
f 1327 	58 	194
f 1327 	39 	58
f 1329 	39 	1327
f 952 	1262 	324
f 702 	324 	1262
f 1153 	1353 	1162
f 1332 	1255 	961
f 1351 	1145 	1379
f 1351 	132 	1145
f 1337 	1333 	8
f 965 	1332 	961
f 1379 	1189 	1331
f 1197 	702 	150
f 1331 	1150 	1330
f 1168 	1330 	1150
f 1332 	146 	1255
f 965 	319 	1332
f 1174 	1365 	1366
f 939 	8 	1333
f 919 	920 	1333
f 939 	1333 	920
f 975 	229 	1334
f 1366 	176 	1175
f 1330 	1168 	503
f 8 	939 	1007
f 229 	226 	1334
f 1145 	1335 	1037
f 1037 	1031 	1145
f 7 	67 	953
f 953 	617 	7
f 229 	975 	81
f 1039 	1037 	1338
f 7 	9 	67
f 68 	67 	9
f 1153 	1043 	1336
f 618 	1337 	7
f 1043 	1153 	1044
f 1334 	1339 	1234
f 132 	151 	1335
f 22 	9 	8
f 1335 	1338 	1037
f 22 	68 	9
f 138 	1353 	1336
f 1337 	8 	7
f 1113 	1338 	151
f 1338 	877 	1039
f 1218 	297 	50
f 114 	1242 	99
f 885 	158 	1340
f 100 	1234 	1339
f 1336 	1340 	138
f 99 	1235 	100
f 1234 	100 	1235
f 1334 	297 	1339
f 1336 	1050 	1340
f 417 	692 	1339
f 254 	100 	1339
f 692 	254 	1339
f 1235 	99 	1242
f 1238 	1255 	106
f 160 	154 	1341
f 1332 	156 	146
f 1342 	712 	160
f 79 	417 	1218
f 160 	712 	1280
f 1341 	1342 	160
f 321 	1343 	987
f 321 	323 	1344
f 321 	1344 	1343
f 1345 	981 	1343
f 1346 	1345 	1347
f 322 	325 	1349
f 1331 	1330 	1358
f 1349 	14 	1348
f 14 	1346 	1348
f 14 	1349 	3
f 1349 	323 	322
f 1358 	1359 	1331
f 1344 	1345 	1343
f 1344 	1347 	1345
f 1348 	1346 	1344
f 1346 	1347 	1344
f 1348 	323 	1349
f 1348 	1344 	323
f 15 	1346 	14
f 990 	981 	1352
f 1345 	1346 	1352
f 1346 	15 	1352
f 15 	30 	1352
f 1153 	1336 	1353
f 30 	1094 	1352
f 138 	140 	1353
f 140 	131 	1353
f 1350 	1162 	1353
f 1354 	1357 	1355
f 1330 	503 	1358
f 1358 	503 	706
f 706 	712 	1358
f 1354 	1356 	1363
f 1354 	1363 	1357
f 1357 	1360 	1355
f 1360 	1361 	1355
f 1360 	1362 	1361
f 1355 	1082 	1354
f 1085 	1354 	1082
f 1358 	1342 	1341
f 1361 	1083 	1355
f 1354 	1085 	1356
f 1086 	1356 	1085
f 1341 	1359 	1358
f 1238 	106 	1086
f 1356 	1086 	106
f 1359 	1341 	1391
f 1363 	1356 	106
f 106 	139 	1363
f 1358 	712 	1342
f 1364 	730 	1350
f 1353 	1364 	1350
f 1353 	131 	1364
f 139 	236 	1363
f 1364 	140 	142
f 131 	140 	1364
f 1364 	142 	785
f 785 	730 	1364
f 1357 	1363 	1375
f 1365 	1367 	1368
f 185 	1366 	1368
f 1365 	1368 	1366
f 1092 	1083 	1369
f 1370 	1368 	1367
f 1362 	1371 	1361
f 167 	185 	1370
f 1370 	185 	1368
f 1372 	1373 	995
f 1371 	1372 	1369
f 1371 	1373 	1372
f 1374 	1370 	1367
f 1371 	1369 	1361
f 1372 	1042 	1091
f 1369 	1372 	1092
f 1091 	1092 	1372
f 1360 	1371 	1362
f 1388 	1367 	1365
f 82 	1175 	176
f 1366 	185 	176
f 1370 	1374 	1341
f 236 	1375 	1363
f 1376 	1151 	995
f 154 	1370 	1341
f 154 	167 	1370
f 1373 	1376 	995
f 1374 	1391 	1341
f 1373 	1371 	1376
f 1360 	1357 	1377
f 1357 	1378 	1377
f 1375 	1378 	1357
f 1377 	1371 	1360
f 1376 	1380 	1160
f 1381 	1156 	1160
f 1381 	1160 	1380
f 1378 	1376 	1377
f 1380 	1376 	1378
f 1371 	1377 	1376
f 1378 	1381 	1380
f 240 	1156 	1381
f 240 	1381 	1375
f 236 	240 	1375
f 1378 	1375 	1381
f 1160 	1151 	1376
f 1349 	325 	3
f 1384 	1379 	1359
f 1384 	1359 	1382
f 1351 	1384 	1382
f 1379 	1331 	1359
f 1351 	1379 	1384
f 1390 	1383 	1385
f 1390 	1385 	1386
f 1174 	1268 	1365
f 1388 	1268 	1389
f 1283 	447 	1389
f 1390 	1393 	1351
f 1386 	440 	1390
f 447 	440 	1387
f 1386 	1387 	440
f 1390 	488 	237
f 488 	1390 	440
f 1374 	1367 	1391
f 1359 	1391 	1382
f 1383 	1382 	1391
f 1383 	1391 	1385
f 1391 	1388 	1389
f 1367 	1388 	1392
f 1392 	1388 	1391
f 1392 	1391 	1367
f 1387 	1391 	1389
f 1391 	1387 	1386
f 1391 	1386 	1385
f 1351 	1382 	1390
f 1390 	1382 	1383
f 1335 	1145 	132
f 132 	1351 	129
f 129 	1351 	1393
f 1393 	1390 	129
# 2726 faces

#end of obj_0

`;
var woodenWall =`
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -43.0626 		-49.6404 		0
v -43.0236 		-49.6715 		0
v -43.0068 		-49.7146 		0
v -43.0062 		-49.7204 		0
v -43.0146 		-49.7646 		0
v -43.0476 		-49.8013 		0
v -43.0936 		-49.8462 		0.109
v -43.1616 		-49.6485 		0
v -43.1136 		-49.6312 		0
v -43.0956 		-49.8186 		0
v -43.1466 		-49.8094 		0
v -43.4676 		-49.66 		0
v -43.4236 		-49.5967 		0
v -43.3586 		-49.568 		0
v -43.2906 		-49.583 		0
v -43.2376 		-49.6358 		0
v -43.1856 		-49.7784 		0
v -43.2021 		-49.7374 		0
v -43.1993 		-49.7101 		0
v -43.1946 		-49.6853 		0
v -43.2151 		-49.7134 		0
v -43.2149 		-49.7169 		0
v -43.2266 		-49.7967 		0
v -43.2706 		-49.8611 		0
v -43.3356 		-49.8898 		0
v -43.4036 		-49.8749 		0
v -43.4556 		-49.8209 		0
v -43.6846 		-49.6623 		0
v -43.6286 		-49.6393 		0
v -43.5706 		-49.6508 		0
v -43.4789 		-49.7451 		0
v -43.4776 		-49.7285 		0
v -43.5256 		-49.6956 		0
v -43.5059 		-49.759 		0
v -43.5058 		-49.761 		0
v -43.5156 		-49.8289 		0
v -43.5536 		-49.8806 		0
v -43.7216 		-49.7151 		0
v -43.6086 		-49.9048 		0
v -43.6666 		-49.8921 		0
v -43.7116 		-49.8485 		0
v -43.7311 		-49.7876 		0
v -43.7288 		-49.7591 		0
v -43.8176 		-49.96 		0
v -43.8176 		-49.7289 		0
v -43.7766 		-49.7784 		0
v -43.7626 		-49.8406 		0
v -43.7626 		-49.8495 		0
v -43.7766 		-49.9117 		0
v -43.7626 		-49.9377 		0.0899
v -43.7626 		-49.9503 		0.116
v -43.9316 		-49.96 		0
v -43.9736 		-49.9117 		0
v -43.9881 		-49.8472 		0
v -43.9856 		-49.8317 		0
v -43.9736 		-49.7784 		0
v -43.9316 		-49.7289 		0
v -43.8746 		-49.7117 		0
v -43.8746 		-49.9783 		0
v -43.7626 		-49.9208 		0.0541
v -43.0476 		-49.8013 		0.933
v -43.738 		-49.8693 		0.0962
v -43.0236 		-49.6715 		0.933
v -43.0626 		-49.6404 		0.933
v -43.0146 		-49.7646 		0.933
v -43.0062 		-49.7204 		0.933
v -43.0068 		-49.7146 		0.933
v -43.0956 		-49.8186 		0.933
v -43.1136 		-49.6312 		0.933
v -43.1616 		-49.6485 		0.933
v -43.1466 		-49.8094 		0.933
v -43.7626 		-49.893 		0.0325
v -43.0306 		-49.8255 		0.824
v -42.9996 		-49.7907 		0.824
v -43.0134 		-49.6436 		0.824
v -43.0506 		-49.614 		0.824
v -43.0015 		-49.7707 		0.8799
v -43.7626 		-49.7687 		0.0541
v -43.0096 		-49.6839 		0.9012
v -43.0115 		-49.6637 		0.8803
v -43.8006 		-49.6944 		0.116
v -43.7626 		-49.7389 		0.116
v -43.0936 		-49.8462 		0.824
v -43.1156 		-49.6036 		0.824
v -43.1586 		-49.8358 		0.824
v -43.7383 		-49.8737 		0.106
v -43.8746 		-49.6715 		0.116
v -43.9486 		-49.6944 		0.116
v -43.9767 		-49.7762 		0.012
v -43.9717 		-49.7449 		0.0646
v -43.967 		-49.7155 		0.116
v -43.978 		-49.7843 		0.0104
v -44.0014 		-49.9298 		0.1073
v -43.0306 		-49.8255 		0.109
v -44.0019 		-49.9332 		0.116
v -43.0004 		-49.7823 		0.0858
v -42.9996 		-49.7907 		0.109
v -43.0015 		-49.7707 		0.0531
v -43.0034 		-49.75 		0.0313
v -43.0115 		-49.6637 		0.0527
v -43.0506 		-49.614 		0.109
v -43.8006 		-49.9956 		0.116
v -43.8746 		-50.0186 		0.116
v -43.0134 		-49.6436 		0.109
v -43.9486 		-49.9956 		0.116
v -43.1156 		-49.6036 		0.109
v -43.2376 		-49.6358 		0.956
v -43.2906 		-49.583 		0.956
v -43.4236 		-49.5967 		0.956
v -43.4676 		-49.66 		0.956
v -43.3586 		-49.568 		0.956
v -43.3356 		-49.8898 		0.956
v -43.2706 		-49.8611 		0.956
v -43.1586 		-49.8358 		0.109
v -43.2266 		-49.7967 		0.956
v -43.2149 		-49.7169 		0.956
v -43.4556 		-49.8209 		0.956
v -43.2151 		-49.7134 		0.956
v -43.4036 		-49.8749 		0.956
v -43.2243 		-49.5882 		0.111
v -43.1786 		-49.6243 		0.824
v -43.192 		-49.6397 		0.824
v -43.4466 		-49.5565 		0.111
v -43.4659 		-49.584 		0.111
v -43.4689 		-49.6205 		0.062
v -43.2243 		-49.5882 		0.845
v -43.2736 		-49.5381 		0.845
v -43.3626 		-49.5186 		0.845
v -43.4466 		-49.5565 		0.845
v -43.2218 		-49.6226 		0.0533
v -43.4659 		-49.584 		0.845
v -43.2476 		-49.9013 		0.111
v -43.3316 		-49.9381 		0.111
v -43.2082 		-49.8076 		0.0552
v -43.2068 		-49.8276 		0.0875
v -43.4206 		-49.9197 		0.845
v -43.2058 		-49.8416 		0.111
v -43.1966 		-49.6844 		0.008
v -43.197 		-49.6883 		0.0067
v -43.3316 		-49.9381 		0.845
v -43.2082 		-49.7964 		0.824
v -43.2046 		-49.7616 		0.89
v -43.2078 		-49.7926 		0.8364
v -43.2109 		-49.7712 		0.0329
v -43.2058 		-49.8416 		0.845
v -43.4206 		-49.9197 		0.111
v -43.5566 		-49.6151 		0.809
v -43.5128 		-49.6681 		0.8311
v -43.5137 		-49.657 		0.809
v -43.4727 		-49.6685 		0.0109
v -43.4718 		-49.6576 		0.0127
v -43.5706 		-49.6508 		0.915
v -43.2218 		-49.6226 		0.9027
v -43.6286 		-49.6393 		0.915
v -43.6316 		-49.599 		0.809
v -43.7036 		-49.6301 		0.809
v -43.6846 		-49.6623 		0.915
v -43.5566 		-49.6151 		0.106
v -43.5137 		-49.657 		0.106
v -43.2192 		-49.6573 		0.9241
v -43.7198 		-49.6521 		0.809
v -43.6316 		-49.599 		0.106
v -43.2232 		-49.6028 		0.869
v -43.5336 		-49.914 		0.809
v -43.4875 		-49.8518 		0.845
v -43.7036 		-49.6301 		0.106
v -43.4874 		-49.8503 		0.8479
v -43.7198 		-49.6521 		0.106
v -43.498 		-49.8638 		0.809
v -43.5536 		-49.8806 		0.915
v -43.4825 		-49.79 		0.9093
v -43.5336 		-49.914 		0.106
v -43.4872 		-49.8475 		0.853
v -43.5 		-49.837 		0.8616
v -43.4872 		-49.8475 		0.103
v -43.5156 		-49.8289 		0.915
v -43.6056 		-49.945 		0.106
v -43.7223 		-49.6817 		0.0579
v -43.7256 		-49.7215 		0.0094
v -43.8176 		-49.96 		1
v -43.4989 		-49.8524 		0.0841
v -43.498 		-49.8638 		0.106
v -43.7766 		-49.9117 		1
v -43.7626 		-49.8495 		1
v -43.4875 		-49.8518 		0.111
v -43.8176 		-49.7289 		1
v -43.7766 		-49.7784 		1
v -43.7626 		-49.8406 		1
v -43.8746 		-49.7117 		1
v -43.9316 		-49.7289 		1
v -43.9736 		-49.7784 		1
v -43.9881 		-49.8472 		1
v -43.9736 		-49.9117 		1
v -43.9316 		-49.96 		1
v -43.9856 		-49.8317 		1
v -43.8746 		-49.9783 		1
v -43.7626 		-49.9503 		0.883
v -43.5 		-49.837 		0.0534
v -43.5023 		-49.807 		0.0321
v -43.7311 		-49.7876 		0.915
v -43.7288 		-49.7591 		0.915
v -43.5116 		-49.6841 		0.053
v -43.8006 		-49.6944 		0.883
v -43.7626 		-49.7389 		0.883
v -43.7626 		-49.9208 		0.9454
v -43.7626 		-49.797 		0.9672
v -43.7626 		-49.7687 		0.9454
v -43.7626 		-49.7512 		0.9094
v -43.7383 		-49.8737 		0.809
v -43.7341 		-49.8231 		0.8717
v -43.738 		-49.8693 		0.8188
v -43.7382 		-49.8721 		0.8125
v -43.7249 		-49.7133 		0.011
v -43.8746 		-49.6715 		0.883
v -43.9486 		-49.6944 		0.883
v -43.6816 		-49.9289 		0.106
v -43.967 		-49.7155 		0.883
v -44.0019 		-49.9332 		0.883
v -43.9767 		-49.7762 		0.9879
v -43.994 		-49.8839 		0.9513
v -44.0014 		-49.9298 		0.8918
v -44.0017 		-49.932 		0.8861
v -43.8006 		-49.9956 		0.883
v -43.8746 		-50.0186 		0.883
v -43.2476 		-49.9013 		0.845
v -43.9486 		-49.9956 		0.883
v -43.1856 		-49.7784 		0.933
v -43.2078 		-49.7926 		0.0966
v -43.2082 		-49.7964 		0.109
v -43.2082 		-49.8076 		0.9008
v -43.1946 		-49.6853 		0.933
v -43.1993 		-49.7101 		0.933
v -43.2021 		-49.7374 		0.933
v -43.1966 		-49.6844 		0.925
v -43.4789 		-49.7451 		0.956
v -43.4776 		-49.7285 		0.956
v -43.4718 		-49.6576 		0.9433
v -43.5058 		-49.761 		0.915
v -43.5256 		-49.6956 		0.915
v -43.5059 		-49.759 		0.915
v -43.6086 		-49.9048 		0.915
v -43.7216 		-49.7151 		0.915
v -43.7116 		-49.8485 		0.915
v -43.5094 		-49.714 		0.8831
v -43.6666 		-49.8921 		0.915
v -43.5116 		-49.6841 		0.862
v -43.6056 		-49.945 		0.809
v -43.6816 		-49.9289 		0.809
v -43.7249 		-49.7133 		0.904
v -43.1786 		-49.6243 		0.109
v -43.1943 		-49.6622 		0.0594
v -43.192 		-49.6397 		0.109
v -43.2736 		-49.5381 		0.111
v -43.3626 		-49.5186 		0.111
# 254 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 2 	3 	1
f 1 	3 	4
f 1 	4 	5
f 1 	5 	6
f 6 	10 	1
f 9 	1 	10
f 10 	11 	9
f 8 	9 	11
f 11 	17 	8
f 14 	15 	13
f 12 	13 	15
f 12 	15 	16
f 16 	21 	12
f 18 	19 	17
f 20 	8 	19
f 17 	19 	8
f 32 	12 	21
f 32 	21 	22
f 32 	22 	23
f 24 	27 	23
f 25 	26 	24
f 27 	24 	26
f 31 	23 	27
f 30 	38 	29
f 32 	23 	31
f 43 	38 	34
f 35 	43 	34
f 36 	43 	35
f 37 	42 	36
f 39 	42 	37
f 28 	29 	38
f 30 	33 	38
f 33 	34 	38
f 40 	42 	39
f 41 	42 	40
f 43 	36 	42
f 47 	56 	46
f 48 	55 	47
f 49 	55 	48
f 44 	54 	49
f 51 	102 	50
f 53 	54 	52
f 59 	52 	54
f 55 	49 	54
f 56 	47 	55
f 57 	46 	56
f 58 	46 	57
f 45 	46 	58
f 59 	54 	44
f 50 	44 	60
f 49 	60 	44
f 62 	42 	41
f 63 	64 	61
f 65 	66 	61
f 67 	61 	66
f 63 	61 	67
f 61 	64 	68
f 70 	71 	69
f 64 	69 	68
f 49 	48 	72
f 41 	216 	62
f 49 	72 	60
f 65 	73 	77
f 74 	77 	73
f 65 	61 	73
f 77 	66 	65
f 79 	80 	63
f 46 	78 	47
f 63 	67 	79
f 80 	75 	76
f 80 	76 	64
f 80 	64 	63
f 82 	78 	81
f 81 	78 	46
f 80 	77 	75
f 79 	77 	80
f 67 	77 	79
f 66 	77 	67
f 74 	75 	77
f 45 	81 	46
f 87 	81 	45
f 61 	68 	83
f 61 	83 	73
f 84 	69 	76
f 69 	64 	76
f 86 	168 	62
f 70 	69 	84
f 70 	84 	121
f 82 	72 	78
f 72 	82 	60
f 68 	85 	83
f 68 	71 	85
f 50 	82 	51
f 50 	60 	82
f 48 	78 	72
f 106 	121 	84
f 47 	78 	48
f 87 	45 	58
f 83 	7 	73
f 88 	87 	58
f 76 	75 	101
f 104 	101 	75
f 57 	88 	58
f 84 	76 	101
f 90 	57 	89
f 56 	89 	57
f 90 	91 	88
f 90 	88 	57
f 92 	89 	56
f 83 	85 	7
f 55 	92 	56
f 53 	93 	54
f 75 	74 	104
f 95 	93 	105
f 103 	52 	59
f 96 	97 	94
f 96 	94 	6
f 214 	81 	87
f 74 	73 	97
f 96 	98 	104
f 88 	215 	87
f 96 	6 	98
f 5 	98 	6
f 99 	98 	5
f 4 	99 	5
f 89 	92 	90
f 55 	93 	92
f 90 	92 	93
f 54 	93 	55
f 91 	90 	93
f 91 	93 	95
f 100 	3 	2
f 44 	102 	59
f 102 	103 	59
f 104 	100 	101
f 1 	101 	100
f 2 	1 	100
f 44 	50 	102
f 53 	52 	105
f 105 	93 	53
f 52 	103 	105
f 7 	94 	73
f 94 	97 	73
f 102 	223 	103
f 224 	105 	103
f 84 	101 	106
f 97 	96 	104
f 74 	97 	104
f 3 	100 	99
f 100 	104 	98
f 99 	100 	98
f 4 	3 	99
f 94 	10 	6
f 94 	7 	10
f 106 	101 	1
f 106 	1 	9
f 109 	118 	111
f 110 	118 	109
f 108 	111 	118
f 108 	118 	107
f 229 	228 	114
f 7 	114 	11
f 7 	85 	114
f 7 	11 	10
f 110 	236 	118
f 116 	118 	236
f 115 	116 	236
f 119 	113 	117
f 112 	113 	119
f 115 	117 	113
f 24 	132 	25
f 132 	133 	25
f 135 	24 	134
f 134 	24 	23
f 24 	135 	132
f 119 	167 	136
f 137 	132 	135
f 19 	139 	20
f 139 	138 	20
f 136 	112 	119
f 17 	114 	228
f 18 	228 	19
f 144 	23 	22
f 17 	228 	18
f 11 	114 	17
f 141 	143 	122
f 142 	122 	143
f 233 	232 	142
f 139 	19 	228
f 144 	134 	23
f 26 	146 	27
f 133 	146 	26
f 160 	137 	153
f 133 	26 	25
f 132 	137 	145
f 125 	13 	151
f 147 	152 	148
f 147 	148 	149
f 154 	152 	147
f 155 	154 	147
f 125 	151 	150
f 156 	157 	155
f 160 	153 	107
f 157 	154 	155
f 159 	202 	158
f 242 	157 	156
f 161 	249 	156
f 118 	160 	107
f 108 	107 	153
f 108 	153 	163
f 29 	162 	30
f 127 	108 	163
f 127 	163 	126
f 162 	158 	30
f 128 	111 	127
f 166 	162 	29
f 111 	108 	127
f 165 	136 	167
f 28 	166 	29
f 129 	109 	128
f 119 	117 	173
f 119 	173 	167
f 109 	111 	128
f 168 	166 	178
f 28 	178 	166
f 110 	109 	129
f 129 	237 	110
f 131 	237 	129
f 147 	149 	158
f 147 	158 	155
f 162 	155 	158
f 155 	162 	166
f 39 	37 	172
f 85 	141 	114
f 176 	164 	174
f 169 	174 	164
f 185 	175 	146
f 27 	146 	175
f 37 	181 	172
f 42 	62 	43
f 178 	179 	62
f 213 	179 	178
f 182 	172 	181
f 180 	183 	186
f 184 	186 	183
f 184 	188 	186
f 187 	186 	188
f 191 	195 	189
f 190 	191 	189
f 186 	189 	195
f 186 	195 	192
f 192 	193 	186
f 186 	193 	194
f 186 	194 	196
f 180 	186 	196
f 36 	198 	37
f 181 	37 	198
f 31 	175 	32
f 35 	199 	36
f 31 	27 	175
f 124 	125 	175
f 199 	198 	36
f 202 	34 	33
f 125 	150 	175
f 32 	175 	150
f 201 	210 	200
f 158 	202 	33
f 203 	204 	82
f 159 	181 	202
f 158 	33 	30
f 183 	223 	205
f 205 	184 	183
f 197 	206 	205
f 206 	207 	187
f 187 	188 	206
f 203 	186 	208
f 203 	208 	204
f 182 	169 	172
f 187 	207 	186
f 208 	186 	207
f 245 	211 	212
f 181 	198 	202
f 199 	35 	202
f 34 	202 	35
f 209 	248 	212
f 181 	159 	182
f 199 	202 	198
f 211 	161 	212
f 210 	161 	211
f 197 	208 	207
f 197 	207 	206
f 188 	205 	206
f 184 	205 	188
f 82 	204 	51
f 208 	197 	204
f 39 	172 	177
f 178 	28 	213
f 197 	51 	204
f 38 	213 	28
f 179 	213 	38
f 43 	62 	179
f 179 	38 	43
f 40 	216 	41
f 86 	62 	216
f 177 	216 	40
f 189 	186 	203
f 214 	189 	203
f 177 	40 	39
f 215 	190 	214
f 172 	164 	177
f 190 	189 	214
f 191 	190 	215
f 191 	215 	219
f 217 	219 	215
f 219 	195 	191
f 193 	192 	220
f 221 	193 	220
f 194 	193 	221
f 194 	221 	222
f 160 	118 	230
f 163 	153 	137
f 218 	226 	222
f 116 	230 	118
f 217 	218 	222
f 222 	221 	217
f 217 	221 	220
f 192 	195 	220
f 195 	219 	220
f 217 	220 	219
f 133 	132 	140
f 225 	140 	132
f 85 	71 	227
f 180 	196 	224
f 196 	226 	224
f 196 	194 	226
f 224 	223 	180
f 225 	132 	145
f 197 	205 	223
f 183 	180 	223
f 194 	222 	226
f 71 	68 	69
f 224 	103 	223
f 141 	85 	143
f 227 	143 	85
f 102 	51 	223
f 197 	223 	51
f 212 	161 	209
f 133 	140 	136
f 81 	203 	82
f 113 	112 	140
f 112 	136 	140
f 81 	214 	203
f 214 	87 	215
f 225 	113 	140
f 215 	88 	217
f 91 	217 	88
f 218 	95 	105
f 105 	226 	218
f 226 	105 	224
f 217 	91 	218
f 95 	218 	91
f 209 	86 	248
f 86 	216 	248
f 115 	113 	225
f 209 	168 	86
f 251 	138 	228
f 229 	252 	228
f 115 	225 	230
f 145 	230 	225
f 232 	227 	70
f 134 	144 	120
f 231 	232 	70
f 233 	227 	232
f 227 	71 	70
f 21 	130 	144
f 130 	120 	144
f 22 	21 	144
f 121 	234 	231
f 234 	121 	122
f 135 	134 	120
f 137 	135 	120
f 231 	70 	121
f 234 	232 	231
f 227 	233 	142
f 232 	234 	142
f 117 	115 	235
f 236 	235 	115
f 143 	227 	142
f 122 	142 	234
f 237 	236 	110
f 117 	235 	171
f 236 	171 	235
f 117 	171 	173
f 237 	131 	171
f 116 	115 	230
f 157 	239 	154
f 152 	154 	239
f 170 	164 	176
f 137 	160 	145
f 174 	238 	176
f 157 	242 	239
f 238 	240 	201
f 242 	201 	240
f 240 	239 	242
f 236 	237 	171
f 239 	240 	244
f 170 	176 	243
f 245 	170 	243
f 241 	170 	245
f 176 	238 	201
f 201 	200 	176
f 200 	243 	176
f 244 	246 	239
f 148 	152 	246
f 246 	152 	239
f 171 	131 	173
f 173 	131 	167
f 149 	148 	169
f 174 	169 	244
f 246 	244 	169
f 174 	244 	238
f 240 	238 	244
f 148 	246 	169
f 120 	253 	126
f 127 	254 	128
f 123 	129 	254
f 128 	254 	129
f 131 	129 	124
f 123 	124 	129
f 170 	241 	247
f 164 	170 	247
f 136 	146 	133
f 185 	165 	131
f 124 	185 	131
f 242 	156 	249
f 249 	201 	242
f 229 	114 	141
f 210 	243 	200
f 122 	252 	141
f 229 	141 	252
f 210 	211 	243
f 126 	163 	137
f 245 	243 	211
f 230 	145 	160
f 120 	126 	137
f 245 	212 	248
f 241 	248 	247
f 245 	248 	241
f 161 	210 	249
f 201 	249 	210
f 164 	247 	177
f 136 	165 	185
f 8 	250 	9
f 164 	172 	169
f 9 	250 	106
f 252 	250 	251
f 251 	250 	8
f 251 	228 	252
f 138 	251 	8
f 20 	138 	8
f 156 	168 	161
f 250 	121 	106
f 250 	252 	121
f 177 	247 	248
f 139 	228 	138
f 168 	209 	161
f 168 	178 	62
f 167 	131 	165
f 130 	21 	16
f 15 	253 	16
f 182 	149 	169
f 253 	120 	130
f 253 	130 	16
f 254 	253 	15
f 146 	136 	185
f 127 	126 	253
f 14 	254 	15
f 123 	254 	14
f 127 	253 	254
f 124 	175 	185
f 13 	123 	14
f 159 	158 	149
f 12 	151 	13
f 125 	124 	123
f 125 	123 	13
f 166 	156 	155
f 150 	151 	12
f 166 	168 	156
f 32 	150 	12
f 248 	216 	177
f 252 	122 	121
f 149 	182 	159
# 492 faces

#end of obj_0

`;


var woodenAxe = `
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -67.974 		-50.091 		0
v -67.974 		-49.991 		0
v -68.074 		-49.991 		0
v -68.074 		-50.091 		0
v -68.074 		-50.091 		1
v -67.974 		-50.091 		1
v -67.974 		-49.991 		1
v -68.074 		-49.991 		1
v -68.1151 		-50.103 		0.964
v -68.0908 		-50.103 		0.964
v -68.341 		-50.034 		0.964
v -68.0908 		-49.97 		0.964
v -68.133 		-49.97 		0.964
v -67.899 		-50.103 		0.9181
v -67.899 		-50.103 		0.775
v -67.899 		-49.97 		0.775
v -67.899 		-49.97 		0.9181
v -68.074 		-50.091 		0.96
v -67.974 		-50.091 		0.936
v -68.133 		-49.97 		0.7191
v -68.341 		-50.034 		0.6693
v -67.974 		-50.091 		0.7571
v -68.074 		-49.991 		0.96
v -68.074 		-50.091 		0.7332
v -67.974 		-49.991 		0.936
v -68.1151 		-50.103 		0.7234
v -67.974 		-49.991 		0.7571
v -68.074 		-49.991 		0.7332
# 28 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 1 	2 	27
f 3 	4 	24
f 1 	4 	3
f 1 	3 	2
f 1 	24 	4
f 3 	28 	2
f 7 	8 	5
f 7 	5 	6
f 7 	23 	8
f 10 	12 	9
f 12 	13 	9
f 11 	9 	13
f 16 	14 	15
f 17 	14 	16
f 6 	5 	18
f 6 	18 	19
f 23 	10 	18
f 10 	23 	12
f 1 	22 	24
f 18 	10 	19
f 14 	19 	10
f 21 	11 	20
f 13 	20 	11
f 17 	12 	25
f 23 	25 	12
f 17 	25 	14
f 19 	14 	25
f 9 	11 	26
f 22 	27 	15
f 16 	15 	27
f 21 	26 	11
f 27 	22 	1
f 24 	26 	28
f 26 	20 	28
f 21 	20 	26
f 20 	17 	16
f 28 	20 	27
f 16 	27 	20
f 24 	28 	3
f 15 	26 	22
f 24 	22 	26
f 10 	26 	14
f 15 	14 	26
f 10 	9 	26
f 13 	12 	20
f 17 	20 	12
f 27 	2 	28
f 25 	7 	19
f 6 	19 	7
f 18 	5 	23
f 5 	8 	23
f 7 	25 	23
# 52 faces

#end of obj_0

`;
var stoneAxe = `
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -68.954 		-50.027 		0
v -68.954 		-49.927 		0
v -69.054 		-49.927 		0
v -69.054 		-50.027 		0
v -68.954 		-50.027 		1
v -68.954 		-49.927 		1
v -69.054 		-49.927 		1
v -69.054 		-50.027 		1
v -68.88 		-49.906 		0.7751
v -69.1227 		-49.906 		0.7188
v -69.1227 		-49.906 		0.964
v -69.0776 		-49.906 		0.964
v -68.88 		-49.906 		0.9181
v -68.954 		-50.027 		0.9353
v -68.954 		-49.927 		0.9353
v -69.054 		-50.027 		0.9585
v -68.88 		-50.038 		0.9181
v -69.054 		-49.927 		0.9585
v -68.954 		-50.027 		0.7579
v -69.054 		-50.027 		0.7347
v -68.88 		-50.038 		0.7751
v -68.954 		-49.927 		0.7579
v -69.0776 		-50.038 		0.964
v -69.054 		-49.927 		0.7347
v -69.1042 		-50.038 		0.7231
v -69.335 		-49.969 		0.6695
v -69.335 		-49.969 		0.964
v -69.1042 		-50.038 		0.964
# 28 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 11 	12 	10
f 9 	10 	12
f 9 	12 	13
f 25 	19 	21
f 19 	22 	21
f 9 	21 	22
f 20 	25 	24
f 10 	24 	25
f 26 	10 	25
f 16 	23 	14
f 17 	14 	23
f 24 	10 	22
f 9 	22 	10
f 12 	15 	13
f 13 	15 	17
f 14 	17 	15
f 20 	19 	25
f 23 	16 	18
f 23 	18 	12
f 18 	15 	12
f 27 	11 	10
f 27 	10 	26
f 28 	27 	25
f 26 	25 	27
f 25 	21 	17
f 25 	17 	23
f 25 	23 	28
f 23 	12 	28
f 12 	11 	28
f 27 	28 	11
f 9 	17 	21
f 13 	17 	9
# 32 faces

g group_0_11107152

usemtl color_11107152
s 0

f 4 	20 	3
f 24 	3 	20
f 1 	4 	3
f 1 	3 	2
f 1 	20 	4
f 24 	2 	3
f 7 	16 	8
f 6 	7 	8
f 6 	8 	5
f 5 	16 	14
f 15 	6 	14
f 5 	14 	6
f 1 	19 	20
f 7 	18 	16
f 15 	18 	6
f 7 	6 	18
f 2 	22 	19
f 2 	19 	1
f 24 	22 	2
f 8 	16 	5
# 20 faces

#end of obj_0

`;
var ironAxe = `
# Color definition for Tinkercad Obj File 2015

newmtl color_12568524
Ka 0 0 0 
Kd 0.7490196078431373 0.7803921568627451 0.8
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -69.879 		-49.919 		0.7752
v -69.879 		-50.051 		0.7752
v -69.954 		-50.04 		0.7593
v -69.954 		-49.94 		0.7593
v -70.054 		-49.94 		0.7381
v -70.054 		-50.04 		0.7381
v -70.1225 		-50.051 		0.7236
v -70.377 		-49.982 		0.6695
v -70.1463 		-49.919 		0.7185
v -69.954 		-50.04 		0
v -69.954 		-49.94 		0
v -70.054 		-49.94 		0
v -70.054 		-50.04 		0
v -69.954 		-50.04 		1
v -69.954 		-49.94 		1
v -70.054 		-49.94 		1
v -70.054 		-50.04 		1
v -70.1225 		-50.051 		0.964
v -70.0958 		-50.051 		0.964
v -70.377 		-49.982 		0.964
v -70.0958 		-49.919 		0.964
v -70.1463 		-49.919 		0.964
v -69.879 		-49.919 		0.918
v -69.879 		-50.051 		0.918
v -69.954 		-50.04 		0.9339
v -70.054 		-50.04 		0.9551
v -69.954 		-49.94 		0.9339
v -70.054 		-49.94 		0.9551
# 28 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 5 	12 	13
f 10 	13 	12
f 10 	12 	11
f 5 	11 	12
f 15 	16 	17
f 15 	17 	14
f 17 	26 	14
f 11 	4 	3
f 11 	3 	10
f 13 	6 	5
f 5 	4 	11
f 3 	6 	10
f 13 	10 	6
f 14 	25 	27
f 14 	27 	15
f 16 	28 	26
f 17 	16 	26
f 27 	28 	15
f 16 	15 	28
f 14 	26 	25
# 20 faces

g group_0_12568524

usemtl color_12568524
s 0

f 3 	4 	2
f 1 	2 	4
f 6 	7 	5
f 9 	5 	7
f 8 	9 	7
f 9 	1 	5
f 4 	5 	1
f 2 	7 	3
f 6 	3 	7
f 19 	21 	18
f 21 	22 	18
f 20 	18 	22
f 23 	24 	2
f 23 	2 	1
f 8 	20 	9
f 22 	9 	20
f 8 	7 	20
f 18 	20 	7
f 24 	19 	2
f 7 	2 	19
f 7 	19 	18
f 9 	21 	1
f 24 	23 	27
f 24 	27 	25
f 24 	25 	19
f 26 	19 	25
f 21 	19 	28
f 28 	27 	21
f 26 	28 	19
f 23 	21 	27
f 22 	21 	9
f 23 	1 	21
# 32 faces

#end of obj_0

`;

var woodenPick = `
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -72.308 		-50.063 		1
v -72.308 		-50.063 		0.924
v -72.208 		-50.063 		0.924
v -72.208 		-50.063 		1
v -72.308 		-50.063 		0
v -72.208 		-50.063 		0
v -72.208 		-50.063 		0.7248
v -72.308 		-50.063 		0.7243
v -71.9945 		-49.936 		0.726
v -71.989 		-49.9386 		0.726
v -71.989 		-50.096 		0.726
v -71.9887 		-49.9387 		0.7161
v -71.9887 		-50.096 		0.7161
v -71.828 		-50.0136 		0.7717
v -71.828 		-50.0136 		0.6233
v -71.828 		-50.0302 		0.6233
v -71.828 		-50.0302 		0.7717
v -71.9717 		-50.096 		0.7063
v -71.9945 		-49.936 		0.8677
v -71.9717 		-50.096 		0.8546
v -72.208 		-49.963 		0.924
v -72.208 		-49.963 		1
v -72.208 		-49.963 		0
v -72.208 		-49.963 		0.7248
v -72.48 		-49.936 		0.924
v -72.48 		-50.096 		0.924
v -72.308 		-49.963 		0.924
v -72.5268 		-49.936 		0.7231
v -72.5268 		-49.936 		0.897
v -72.5261 		-50.096 		0.8974
v -72.5261 		-50.096 		0.7231
v -72.7 		-50.019 		0.797
v -72.551 		-50.085 		0.723
v -72.551 		-49.9476 		0.723
v -72.308 		-49.963 		0.7243
v -72.5508 		-49.9475 		0.7141
v -72.5508 		-50.0851 		0.7141
v -72.7 		-50.019 		0.6279
v -72.092 		-50.096 		0.924
v -72.092 		-49.936 		0.924
v -72.308 		-49.963 		1
v -72.308 		-49.963 		0
# 42 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 3 	4 	2
f 1 	2 	4
f 5 	6 	8
f 7 	8 	6
f 9 	10 	11
f 9 	19 	10
f 11 	10 	12
f 11 	12 	13
f 14 	15 	12
f 14 	12 	10
f 20 	18 	17
f 16 	17 	18
f 11 	7 	9
f 14 	10 	19
f 4 	3 	21
f 4 	21 	22
f 6 	23 	24
f 24 	7 	6
f 26 	2 	25
f 25 	2 	27
f 29 	30 	25
f 32 	30 	29
f 26 	25 	30
f 33 	34 	31
f 28 	31 	34
f 31 	28 	8
f 35 	8 	28
f 32 	33 	30
f 31 	30 	33
f 29 	28 	34
f 33 	37 	34
f 36 	34 	37
f 37 	38 	36
f 32 	38 	37
f 32 	37 	33
f 38 	32 	34
f 38 	34 	36
f 15 	14 	17
f 15 	17 	16
f 21 	3 	40
f 39 	40 	3
f 28 	40 	9
f 25 	40 	28
f 19 	9 	40
f 32 	29 	34
f 41 	27 	2
f 41 	2 	1
f 35 	42 	8
f 5 	8 	42
f 22 	41 	1
f 22 	1 	4
f 6 	5 	42
f 6 	42 	23
f 21 	40 	27
f 25 	27 	40
f 28 	29 	25
f 28 	9 	35
f 22 	21 	27
f 22 	27 	41
f 42 	35 	23
f 24 	23 	35
f 26 	39 	2
f 3 	2 	39
f 39 	26 	31
f 26 	30 	31
f 11 	31 	7
f 8 	7 	31
f 18 	20 	11
f 18 	11 	13
f 20 	39 	11
f 31 	11 	39
f 24 	9 	7
f 24 	35 	9
f 20 	17 	14
f 40 	39 	19
f 20 	19 	39
f 14 	19 	20
f 16 	18 	15
f 12 	15 	18
f 12 	18 	13
# 80 faces

#end of obj_0

`;
var stonePick = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -72.981 		-49.9846 		0.6233
v -72.981 		-49.9846 		0.7711
v -72.981 		-50.0012 		0.7711
v -72.981 		-50.0012 		0.6233
v -73.246 		-50.067 		0.924
v -73.1247 		-50.067 		0.7063
v -73.246 		-49.907 		0.924
v -73.142 		-50.067 		0.726
v -73.362 		-49.934 		0.924
v -73.1418 		-50.067 		0.7161
v -73.362 		-50.034 		1
v -73.362 		-50.034 		0.924
v -73.362 		-49.934 		1
v -73.1482 		-49.907 		0.726
v -73.462 		-50.034 		1
v -73.462 		-50.034 		0.924
v -73.462 		-50.034 		0
v -73.362 		-50.034 		0
v -73.362 		-50.034 		0.7248
v -73.462 		-50.034 		0.7243
v -73.1247 		-50.067 		0.854
v -73.462 		-49.934 		1
v -73.462 		-49.934 		0.924
v -73.853 		-49.99 		0.7976
v -73.362 		-49.934 		0.7248
v -73.462 		-49.934 		0
v -73.6791 		-50.067 		0.7231
v -73.462 		-49.934 		0.7243
v -73.704 		-50.056 		0.723
v -73.704 		-49.9186 		0.723
v -73.6798 		-49.907 		0.7231
v -73.1482 		-49.907 		0.8676
v -73.362 		-49.934 		0
v -73.6791 		-50.067 		0.898
v -73.6798 		-49.907 		0.8975
v -73.7038 		-49.9185 		0.7141
v -73.1418 		-49.91 		0.7161
v -73.7038 		-50.0561 		0.7141
v -73.853 		-49.99 		0.6279
v -73.142 		-49.9099 		0.726
v -73.634 		-49.907 		0.924
v -73.634 		-50.067 		0.924
# 42 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 1 	2 	3
f 1 	3 	4
f 6 	8 	10
f 9 	12 	7
f 5 	7 	12
f 6 	21 	8
f 27 	8 	5
f 25 	14 	19
f 29 	30 	27
f 31 	27 	30
f 21 	32 	5
f 27 	31 	20
f 28 	20 	31
f 5 	32 	7
f 24 	29 	34
f 27 	34 	29
f 31 	30 	35
f 3 	2 	21
f 2 	32 	21
f 9 	7 	23
f 41 	23 	7
f 29 	38 	30
f 36 	30 	38
f 4 	6 	1
f 37 	1 	6
f 37 	6 	10
f 41 	7 	31
f 38 	39 	36
f 38 	29 	39
f 24 	39 	29
f 35 	30 	24
f 39 	24 	30
f 39 	30 	36
f 14 	40 	8
f 8 	40 	37
f 8 	37 	10
f 23 	41 	16
f 42 	16 	41
f 35 	41 	31
f 2 	1 	37
f 2 	37 	40
f 4 	3 	6
f 35 	34 	41
f 24 	34 	35
f 42 	41 	34
f 27 	19 	8
f 8 	19 	14
f 2 	40 	32
f 14 	32 	40
f 14 	31 	7
f 32 	14 	7
f 3 	21 	6
f 31 	14 	28
f 25 	28 	14
f 42 	5 	16
f 12 	16 	5
f 21 	5 	8
f 42 	34 	27
f 42 	27 	5
f 20 	19 	27
# 60 faces

g group_0_11107152

usemtl color_11107152
s 0

f 12 	11 	16
f 15 	16 	11
f 17 	18 	20
f 19 	20 	18
f 22 	23 	16
f 22 	16 	15
f 28 	26 	17
f 17 	20 	28
f 13 	22 	15
f 13 	15 	11
f 18 	17 	26
f 18 	26 	33
f 11 	12 	9
f 11 	9 	13
f 33 	25 	19
f 33 	19 	18
f 13 	9 	23
f 13 	23 	22
f 28 	33 	26
f 28 	25 	33
# 20 faces

#end of obj_0

`;
var ironPick = `
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0

newmtl color_12568524
Ka 0 0 0 
Kd 0.7490196078431373 0.7803921568627451 0.8
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -74.607 		-50.043 		1
v -74.607 		-50.043 		0.924
v -74.507 		-50.043 		0.924
v -74.507 		-50.043 		1
v -74.607 		-50.043 		0
v -74.507 		-50.043 		0
v -74.507 		-50.043 		0.7248
v -74.607 		-50.043 		0.7243
v -74.127 		-49.9926 		0.6233
v -74.127 		-49.9926 		0.7717
v -74.127 		-50.0092 		0.7717
v -74.127 		-50.0092 		0.6233
v -74.391 		-50.076 		0.924
v -74.391 		-49.915 		0.924
v -74.507 		-49.942 		0.924
v -74.2935 		-49.915 		0.726
v -74.2935 		-49.915 		0.8677
v -74.288 		-50.076 		0.726
v -74.2729 		-50.076 		0.7075
v -74.2877 		-50.076 		0.7161
v -74.2729 		-50.076 		0.8558
v -74.507 		-49.942 		0.7248
v -74.2877 		-49.9177 		0.7161
v -74.288 		-49.9176 		0.726
v -74.507 		-49.942 		1
v -74.507 		-49.942 		0
v -74.779 		-49.915 		0.924
v -74.779 		-50.076 		0.924
v -74.607 		-49.942 		0.924
v -74.8258 		-49.915 		0.7231
v -74.8258 		-49.915 		0.897
v -74.8237 		-50.076 		0.8982
v -74.8237 		-50.076 		0.7231
v -74.999 		-49.998 		0.797
v -74.849 		-50.0647 		0.723
v -74.849 		-49.9261 		0.723
v -74.607 		-49.942 		0.7243
v -74.8488 		-49.926 		0.7141
v -74.8488 		-50.0648 		0.7141
v -74.999 		-49.998 		0.6274
v -74.607 		-49.942 		1
v -74.607 		-49.942 		0
# 42 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 3 	4 	2
f 1 	2 	4
f 5 	6 	8
f 7 	8 	6
f 4 	3 	15
f 4 	15 	25
f 26 	22 	7
f 26 	7 	6
f 41 	29 	2
f 41 	2 	1
f 37 	42 	5
f 5 	8 	37
f 25 	41 	1
f 25 	1 	4
f 6 	5 	42
f 6 	42 	26
f 25 	15 	29
f 25 	29 	41
f 37 	26 	42
f 37 	22 	26
# 20 faces

g group_0_12568524

usemtl color_12568524
s 0

f 9 	10 	11
f 9 	11 	12
f 15 	3 	14
f 13 	14 	3
f 17 	16 	14
f 19 	21 	18
f 19 	18 	20
f 28 	33 	13
f 13 	18 	21
f 18 	7 	16
f 21 	17 	13
f 13 	17 	14
f 11 	10 	21
f 10 	17 	21
f 12 	19 	9
f 23 	9 	19
f 23 	19 	20
f 18 	24 	23
f 18 	23 	20
f 10 	9 	23
f 10 	23 	24
f 21 	19 	11
f 12 	11 	19
f 16 	24 	18
f 22 	16 	7
f 10 	24 	17
f 16 	17 	24
f 28 	2 	27
f 27 	2 	29
f 27 	30 	31
f 18 	13 	33
f 31 	32 	27
f 31 	34 	32
f 28 	27 	32
f 35 	36 	33
f 30 	33 	36
f 33 	30 	8
f 37 	8 	30
f 34 	35 	32
f 33 	32 	35
f 35 	39 	36
f 38 	36 	39
f 39 	40 	38
f 34 	40 	39
f 34 	39 	35
f 34 	31 	36
f 36 	38 	34
f 40 	34 	38
f 30 	36 	31
f 15 	14 	29
f 27 	29 	14
f 27 	14 	30
f 16 	30 	14
f 16 	22 	37
f 16 	37 	30
f 28 	13 	2
f 3 	2 	13
f 32 	33 	28
f 8 	7 	33
f 18 	33 	7
# 60 faces

#end of obj_0

`;

var woodenSword = `
# Color definition for Tinkercad Obj File 2015

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -76.4114 		-49.9716 		0.9278
v -76.344 		-50.007 		0.8279
v -76.344 		-50.007 		0.264
v -76.4023 		-50.0376 		0.9143
v -76.534 		-49.958 		0.26
v -76.485 		-49.933 		0.809
v -76.485 		-49.933 		0.264
v -76.434 		-50.058 		0.26
v -76.434 		-50.058 		0
v -76.485 		-50.081 		0.7764
v -76.534 		-50.058 		0
v -76.485 		-50.081 		0.264
v -76.534 		-49.958 		0
v -76.434 		-49.958 		0
v -76.434 		-49.958 		0.26
v -76.4741 		-50.0018 		1.0206
v -76.491 		-50.0016 		1.0202
v -76.534 		-50.058 		0.26
v -76.5683 		-50.0376 		0.9056
v -76.5563 		-49.9702 		0.9233
v -76.627 		-50.007 		0.8186
v -76.627 		-50.007 		0.264
# 22 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 3 	6 	2
f 2 	1 	4
f 4 	10 	2
f 2 	10 	3
f 7 	22 	6
f 5 	18 	8
f 12 	3 	10
f 11 	13 	14
f 9 	11 	14
f 1 	16 	4
f 13 	5 	14
f 15 	14 	5
f 18 	11 	9
f 18 	9 	8
f 5 	13 	11
f 3 	7 	6
f 1 	2 	6
f 19 	17 	20
f 19 	20 	21
f 8 	9 	14
f 10 	4 	19
f 3 	12 	7
f 14 	15 	8
f 10 	19 	21
f 12 	10 	22
f 21 	22 	10
f 22 	7 	12
f 20 	6 	21
f 21 	6 	22
f 17 	1 	20
f 11 	18 	5
f 17 	19 	4
f 16 	17 	4
f 6 	20 	1
f 1 	17 	16
f 15 	5 	8
# 36 faces

#end of obj_0

`;
var stoneSword = `
# Color definition for Tinkercad Obj File 2015

newmtl color_6383466
Ka 0 0 0 
Kd 0.3803921568627451 0.403921568627451 0.41568627450980394
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -77.2485 		-49.9516 		0.9276
v -77.181 		-49.987 		0.8275
v -77.181 		-49.987 		0.264
v -77.2394 		-50.0177 		0.9141
v -77.271 		-50.039 		0.26
v -77.271 		-50.039 		0
v -77.4053 		-50.0176 		0.9056
v -77.464 		-49.987 		0.8186
v -77.464 		-49.987 		0.264
v -77.3933 		-49.9502 		0.9233
v -77.271 		-49.939 		0
v -77.271 		-49.939 		0.26
v -77.371 		-50.039 		0
v -77.371 		-50.039 		0.26
v -77.371 		-49.939 		0.26
v -77.371 		-49.939 		0
v -77.322 		-49.913 		0.264
v -77.322 		-49.913 		0.809
v -77.322 		-50.061 		0.7764
v -77.322 		-50.061 		0.264
v -77.3113 		-49.9818 		1.0206
v -77.328 		-49.9816 		1.0202
# 22 vertices

g group_0_6383466

usemtl color_6383466
s 0

f 17 	18 	3
f 2 	3 	18
f 4 	19 	2
f 2 	1 	4
f 9 	19 	8
f 7 	10 	8
f 10 	18 	8
f 8 	18 	9
f 1 	2 	18
f 19 	4 	7
f 21 	22 	4
f 7 	4 	22
f 7 	8 	19
f 20 	19 	9
f 18 	10 	1
f 1 	10 	22
f 1 	22 	21
f 3 	20 	17
f 9 	17 	20
f 17 	9 	18
f 20 	3 	19
f 3 	2 	19
f 1 	21 	4
f 22 	10 	7
# 24 faces

g group_0_11107152

usemtl color_11107152
s 0

f 5 	6 	12
f 11 	12 	6
f 13 	14 	15
f 15 	16 	13
f 16 	11 	13
f 11 	6 	13
f 16 	15 	11
f 12 	11 	15
f 6 	5 	13
f 14 	13 	5
f 15 	5 	12
f 14 	5 	15
# 12 faces

#end of obj_0

`;
var ironSword = `
#Color definition for Tinkercad Obj File 2015

newmtl color_12568524
Ka 0 0 0 
Kd 0.7490196078431373 0.7803921568627451 0.8
d 1
illum 0.0

newmtl color_11107152
Ka 0 0 0 
Kd 0.6627450980392157 0.4823529411764706 0.3137254901960784
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -78.0635 		-49.9556 		0.9276
v -77.996 		-49.991 		0.8275
v -78.0544 		-50.0217 		0.9141
v -78.086 		-50.043 		0.26
v -78.086 		-50.043 		0
v -77.996 		-49.991 		0.264
v -78.2203 		-50.0216 		0.9056
v -78.2083 		-49.9542 		0.9233
v -78.279 		-49.991 		0.8186
v -78.186 		-49.943 		0.26
v -78.186 		-49.943 		0
v -78.137 		-49.917 		0.264
v -78.137 		-49.917 		0.809
v -78.137 		-50.065 		0.7764
v -78.186 		-50.043 		0
v -78.186 		-50.043 		0.26
v -78.1263 		-49.9858 		1.0206
v -78.137 		-50.065 		0.264
v -78.143 		-49.9856 		1.0202
v -78.086 		-49.943 		0.26
v -78.086 		-49.943 		0
v -78.279 		-49.991 		0.264
# 22 vertices

g group_0_11107152

usemtl color_11107152
s 0

f 10 	16 	4
f 16 	10 	15
f 11 	15 	10
f 11 	5 	15
f 21 	5 	11
f 11 	10 	21
f 20 	21 	10
f 16 	15 	5
f 16 	5 	4
f 20 	10 	4
f 21 	20 	4
f 21 	4 	5
# 12 faces

g group_0_12568524

usemtl color_12568524
s 0

f 2 	1 	3
f 13 	1 	2
f 6 	13 	2
f 7 	8 	9
f 6 	12 	13
f 14 	3 	7
f 17 	19 	3
f 7 	3 	19
f 12 	22 	13
f 13 	8 	1
f 1 	8 	19
f 1 	19 	17
f 3 	14 	2
f 2 	14 	6
f 18 	6 	14
f 1 	17 	3
f 19 	8 	7
f 18 	14 	22
f 14 	7 	9
f 22 	14 	9
f 6 	18 	12
f 22 	12 	18
f 9 	8 	13
f 9 	13 	22
# 24 faces

#end of obj_0

`;


var playerModel = `
# Color definition for Tinkercad Obj File 2015

newmtl color_16089887
Ka 0 0 0 
Kd 0.9607843137254902 0.5137254901960784 0.12156862745098039
d 1
illum 0.0

newmtl color_16311991
Ka 0 0 0 
Kd 0.9725490196078431 0.9019607843137255 0.7176470588235294
d 1
illum 0.0
# Object Export From Tinkercad Server 2015

mtllib obj.mtl

o obj_0
v -19.953 		-50.183 		0.291
v -20.07 		-50.183 		0.291
v -19.916 		-50.071 		0.391
v -19.953 		-50.183 		0.167
v -20.165 		-50.114 		0.167
v -20.048 		-50.114 		0.067
v -19.894 		-50.002 		0.391
v -20.07 		-50.183 		0.167
v -20.107 		-50.071 		0.067
v -19.916 		-49.933 		0.391
v -19.953 		-49.821 		0.291
v -19.975 		-50.114 		0.067
v -20.07 		-49.821 		0.291
v -20.107 		-49.933 		0.067
v -19.953 		-49.821 		0.167
v -19.858 		-50.114 		0.291
v -20.07 		-49.821 		0.167
v -20.12 		-50.003 		0.601
v -20.066 		-50.097 		0.601
v -20.012 		-50.003 		0.664
v -19.958 		-50.097 		0.601
v -19.821 		-50.002 		0.291
v -19.903 		-50.003 		0.601
v -19.958 		-49.909 		0.601
v -20.129 		-50.002 		0.067
v -20.066 		-49.909 		0.601
v -20.12 		-50.003 		0.476
v -20.066 		-50.097 		0.476
v -19.958 		-50.097 		0.476
v -20.107 		-49.933 		0.391
v -20.129 		-50.002 		0.391
v -19.903 		-50.003 		0.476
v -19.958 		-49.909 		0.476
v -20.066 		-49.909 		0.476
v -20.0166 		-49.9877 		0.4241
v -20.0203 		-49.9885 		0.4236
v -19.858 		-49.891 		0.291
v -20.165 		-49.891 		0.291
v -20.048 		-49.891 		0.391
v -20.202 		-50.002 		0.167
v -20.0039 		-50.0171 		0.4233
v -20.012 		-50.002 		0.029
v -20.0286 		-50.003 		0.4235
v -20.0246 		-50.0112 		0.4239
v -19.9993 		-50.0112 		0.424
v -20.0283 		-50.002 		0.4237
v -20.107 		-50.071 		0.391
v -19.975 		-49.891 		0.391
v -20.0201 		-50.017 		0.4233
v -20.017 		-50.0177 		0.4237
v -20.0241 		-49.9932 		0.4242
v -20.048 		-50.114 		0.391
v -19.975 		-50.114 		0.391
v -20.0068 		-50.0177 		0.4237
v -19.9953 		-50.003 		0.4235
v -19.9955 		-50.002 		0.4237
v -19.916 		-49.933 		0.067
v -19.858 		-49.891 		0.167
v -19.9998 		-49.9932 		0.4242
v -19.858 		-50.114 		0.167
v -19.821 		-50.002 		0.167
v -19.894 		-50.002 		0.067
v -20.0036 		-49.9884 		0.4236
v -20.0072 		-49.9877 		0.4241
v -20.165 		-49.891 		0.167
v -19.916 		-50.071 		0.067
v -19.975 		-49.891 		0.067
v -20.048 		-49.891 		0.067
v -20.202 		-50.002 		0.291
v -20.165 		-50.114 		0.291
# 70 vertices

g group_0_16089887

usemtl color_16089887
s 0

f 1 	2 	4
f 8 	4 	2
f 5 	9 	6
f 4 	8 	12
f 17 	13 	15
f 11 	15 	13
f 3 	22 	7
f 3 	16 	22
f 7 	22 	37
f 13 	38 	39
f 25 	40 	65
f 39 	38 	30
f 25 	42 	9
f 7 	37 	10
f 42 	6 	9
f 42 	12 	6
f 37 	11 	10
f 1 	60 	16
f 60 	61 	22
f 60 	22 	16
f 22 	61 	58
f 22 	58 	37
f 58 	11 	37
f 47 	43 	31
f 42 	25 	14
f 46 	31 	43
f 44 	43 	47
f 5 	6 	8
f 6 	12 	8
f 11 	48 	10
f 39 	48 	13
f 11 	13 	48
f 51 	36 	30
f 30 	36 	39
f 50 	49 	52
f 47 	52 	49
f 47 	49 	44
f 35 	39 	36
f 45 	41 	3
f 53 	3 	41
f 53 	41 	54
f 53 	54 	52
f 30 	31 	46
f 50 	52 	54
f 51 	30 	46
f 7 	55 	3
f 45 	3 	55
f 7 	56 	55
f 1 	4 	60
f 59 	56 	10
f 7 	10 	56
f 11 	58 	15
f 57 	62 	42
f 17 	65 	38
f 17 	38 	13
f 4 	12 	66
f 64 	63 	48
f 66 	12 	42
f 58 	57 	67
f 10 	48 	63
f 10 	63 	59
f 66 	60 	4
f 67 	15 	58
f 60 	66 	62
f 15 	67 	17
f 68 	17 	67
f 42 	62 	66
f 60 	62 	61
f 14 	65 	17
f 57 	58 	61
f 14 	17 	68
f 14 	25 	65
f 61 	62 	57
f 67 	57 	42
f 35 	64 	39
f 48 	39 	64
f 68 	67 	42
f 42 	14 	68
f 31 	69 	70
f 69 	40 	5
f 69 	5 	70
f 30 	69 	31
f 38 	69 	30
f 5 	8 	2
f 38 	65 	69
f 31 	70 	47
f 69 	65 	40
f 47 	70 	2
f 40 	9 	5
f 70 	5 	2
f 40 	25 	9
f 47 	2 	52
f 52 	2 	53
f 1 	53 	2
f 53 	16 	3
f 53 	1 	16
# 96 faces

g group_0_16311991

usemtl color_16311991
s 0

f 18 	19 	20
f 19 	21 	20
f 21 	23 	20
f 23 	24 	20
f 24 	26 	20
f 26 	18 	20
f 18 	27 	28
f 18 	28 	19
f 28 	29 	21
f 28 	21 	19
f 29 	32 	23
f 29 	23 	21
f 32 	33 	24
f 32 	24 	23
f 33 	34 	26
f 33 	26 	24
f 34 	27 	18
f 34 	18 	26
f 63 	64 	33
f 27 	43 	44
f 27 	44 	28
f 49 	28 	44
f 55 	32 	45
f 49 	50 	28
f 43 	27 	46
f 28 	50 	29
f 54 	29 	50
f 27 	34 	51
f 41 	45 	29
f 41 	29 	54
f 45 	32 	29
f 51 	46 	27
f 63 	33 	59
f 59 	33 	32
f 56 	59 	32
f 55 	56 	32
f 64 	35 	33
f 36 	34 	35
f 34 	33 	35
f 36 	51 	34
# 40 faces
#end of obj_0
`;


class Asset
{
    constructor(
        name="default_name",
        type="tool", // Or item, or ...?
        modelText="",
        spawn={weight:1, biome:'any'},
        health={amount:1, type:'any'}, //type can be any, chopDamage, mineDamage, attackDamage
        drop=[{assetName:'wood',count:1}], 
        recipe=[{assetName:'wood',count:1}],
        grow={time:100,next:''},
        damage = {attackDamage:0, chopDamage:0, mineDamage:0, range:0.5, cooldown_ms:200},
        isCollectable = false,
        isTool = false,
    )
    {
        this.name = name;
        this.type = type;
        this.modelText = modelText;
        this.spawn = spawn;
        this.health = health;
        this.drop = drop;
        this.recipe = recipe;
        this.grow = grow;
        this.damage = damage
        this.isCollectable = isCollectable;
        this.isTool = isTool;


        const meshData = parseOBJ(this.modelText);
        this.vertices = meshData.vertices;
        this.indices = meshData.indices;
        this.normals = meshData.normals;
        this.colors = meshData.colors;
        this.boundingBox = computeBoundingBox('box', this.vertices);
        this.boundingCylinder = computeBoundingCylinder(this.vertices);
        this.boundingCylinderRadius = this.boundingCylinder.radius;
        this.boundingCylinderCenter = this.boundingCylinder.center;
        this.boundingCylinderHeight = this.boundingCylinder.height;
    }
}

// Define all assets objects, assets[] and assetsMap {}
{

var asset_wood = new Asset(
    'wood', 'item', wood, null, null, null, null, null, null, true
);
var asset_stone = new Asset(
    'stone', 'item', stone, null, null, null, null, null, null, true
)
var asset_iron = new Asset(
    'iron', 'item', iron, null, null, null, null, null, null, true
)


var asset_stone1 = new Asset(
    "stone1", 'item', stone1, {weight:1, biome:'any'}, {amount:3, type:'mineDamage'}, [{assetName:'stone',count:1}], null, null, null,
);
var asset_stone2 = new Asset(
    "stone2", 'item', stone2, {weight:1, biome:'any'}, {amount:5, type:'mineDamage'}, [{assetName:'stone',count:2}], null, null, null,
);
var asset_stone3 = new Asset(
    "stone3", 'item', stone3, {weight:1, biome:'any'}, {amount:8, type:'mineDamage'}, [{assetName:'stone',count:4}, {assetName:'iron',count:1}], null, null, null
);
var asset_stone4 = new Asset(
    "stone4", 'item', stone4, {weight:1, biome:'any'}, {amount:10, type:'mineDamage'}, [{assetName:'stone',count:6}, {assetName:'iron',count:3}], null, null, null
);

var asset_firTree1 = new Asset(
    "firTree1", 'item', firTree1, {weight:1, biome:'forest'}, {amount:3, type:'chopDamage'}, [{assetName:'wood',count:1}], null, {time:50, next:'firTree2'}, null,
);
var asset_firTree2 = new Asset(
    "firTree2", 'item', firTree2, {weight:1, biome:'forest'}, {amount:5, type:'chopDamage'}, [{assetName:'wood',count:2}], null, {time:50, next:'firTree3'}, null,
);
var asset_firTree3 = new Asset(
    "firTree3", 'item', firTree3, {weight:1, biome:'forest'}, {amount:8, type:'chopDamage'}, [{assetName:'wood',count:4}], null, {time:50, next:'firTree4'}, null,
);
var asset_firTree4 = new Asset(
    "firTree4", 'item', firTree4, {weight:1, biome:'forest'}, {amount:10, type:'chopDamage'}, [{assetName:'wood',count:8}], null, null, null
);

var asset_mapleTree1 = new Asset(
    "mapleTree1", 'item', mapleTree1, {weight:1, biome:'forest'}, {amount:3, type:'chopDamage'}, [{assetName:'wood',count:1}], null, {time:100, next:'mapleTree2'}, null,
);
var asset_mapleTree2 = new Asset(
    "mapleTree2", 'item', mapleTree2, {weight:1, biome:'forest'}, {amount:5, type:'chopDamage'}, [{assetName:'wood',count:2}], null, {time:100, next:'mapleTree3'}, null,
);
var asset_mapleTree3 = new Asset(
    "mapleTree3", 'item', mapleTree3, {weight:1, biome:'forest'}, {amount:8, type:'chopDamage'}, [{assetName:'wood',count:4}], null, {time:100, next:'mapleTree4'}, null,
);
var asset_mapleTree4 = new Asset(
    "mapleTree4", 'item', mapleTree4, {weight:1, biome:'forest'}, {amount:10, type:'chopDamage'}, [{assetName:'wood',count:8}], null, null, null,
);



var asset_woodenWall = new Asset(
    "woodenWall", 'item', woodenWall, null, {amount:1000, type:'any'}, [{assetName:'wood', count:3}], [{assetName:'wood', count:10}], null, null
)
var asset_stoneWall = new Asset(
    "stoneWall", 'item', stoneWall, null, {amount:3000, type:'any'}, [{assetName:'stone', count:3}], [{assetName:'stone', count:10}], null, null
)


var asset_woodenAxe = new Asset(
    "woodenAxe", 'tool', woodenAxe, null, {amount:20, type:'chopDamage'}, null, [{assetName:'wood',count:3}], null, {attackDamage: 5, chopDamage: 10, mineDamage: 0, range:0.6, cooldown_ms:500}, true, true,
)
var asset_stoneAxe = new Asset(
    "stoneAxe", 'tool', stoneAxe, null, {amount:50, type:'chopDamage'}, null, [{assetName:'wood',count:1},{assetName:'stone',count:2}], null, {attackDamage: 10, chopDamage: 20, mineDamage: 3, range:0.7, cooldown_ms:400}, true, true,
)
var asset_ironAxe = new Asset(
    "ironAxe", 'tool', ironAxe, null, {amount:100, type:'chopDamage'}, null, [{assetName:'wood',count:3},{assetName:'iron',count:2}], null, {attackDamage: 15, chopDamage: 30, mineDamage: 5, range:0.8, cooldown_ms:300}, true, true,
)


var asset_woodenPick = new Asset(
    "woodenPick", 'tool', woodenPick, null, {amount:20, type:'mineDamage'}, null, [{assetName:'wood',count:3}],                       null, {attackDamage: 5, chopDamage: 1, mineDamage: 10, range:0.6, cooldown_ms:500}, true, true,
)
var asset_stonePick = new Asset(
    "stonePick", 'tool', stonePick, null, {amount:50, type:'mineDamage'}, null, [{assetName:'wood',count:1},{assetName:'stone',count:2}], null, {attackDamage: 10, chopDamage: 2, mineDamage: 20, range:0.7, cooldown_ms:500}, true, true,
)
var asset_ironPick = new Asset(
    "ironPick", 'tool', ironPick, null, {amount:100, type:'mineDamage'}, null, [{assetName:'wood',count:3},{assetName:'iron',count:2}], null, {attackDamage: 15, chopDamage: 3, mineDamage: 30, range:0.8, cooldown_ms:500}, true, true,
)


var asset_woodenSword = new Asset(
    "woodenSword", 'weapon', woodenSword, null, {amount:20, type:'attackDamage'}, null, [{assetName:'wood',count:3}],                       null, {attackDamage: 10, chopDamage: 1, mineDamage: 1, range:1, cooldown_ms:300, splash:2}, true, true,
)
var asset_stoneSword = new Asset(
    "stoneSword", 'weapon', stoneSword, null, {amount:50, type:'attackDamage'}, null, [{assetName:'wood',count:1},{assetName:'stone',count:2}], null, {attackDamage: 20, chopDamage: 2, mineDamage: 2, range:1.2, cooldown_ms:300, splash:3}, true, true,
)
var asset_ironSword = new Asset(
    "ironSword", 'weapon', ironSword, null, {amount:100, type:'attackDamage'}, null, [{assetName:'wood',count:3},{assetName:'iron',count:2}], null, {attackDamage: 3, chopDamage: 3, mineDamage: 3, range:1.3, cooldown_ms:200, splash:4}, true, true,
)



var asset_playerModel = new Asset(
    "playerModel", 'item', playerModel, null, null, null, null, null, null, false, false
)

// Create assets[] array and assetMap
var assets = [
    asset_wood, asset_stone, asset_iron,
    asset_stone1, asset_stone2, asset_stone3, asset_stone4,
    asset_firTree1, asset_firTree2, asset_firTree3, asset_firTree4,
    asset_mapleTree1, asset_mapleTree2, asset_mapleTree3, asset_mapleTree4,
    asset_woodenWall, asset_stoneWall,
    asset_woodenAxe, asset_stoneAxe, asset_ironAxe,
    asset_woodenPick, asset_stonePick, asset_ironPick,
    asset_woodenSword, asset_stoneSword, asset_ironSword,
    asset_playerModel
]
var assetMap = new Map();
for (let i=0; i<assets.length; i++)
{
    assetMap.set(assets[i].name, assets[i]);
}


}



class Entity
{
    constructor(asset = new Asset(), id = "", position=new vec4(), rotation = new vec4())
    {
        this.asset          = asset;
        this.id             = id;
        this.position       = position;
        this.rotation       = rotation;
        this.scale          = new vec4(1,1,1);
        this.reflectivity   = 0;
        
        this.health             = (asset.health != null)? asset.health.amount : 1000000000;
        this.growTimestamp_ms   = (asset.grow   != null)? Date.now() + 1000 * asset.grow.time * (0.5 + Math.random()) : null;
        this.isCollectable      = asset.isCollectable;
        this.isCollectableRandomBounceOffset = Math.random()*6.28;
        this.tookDamageTimestamp_ms = 0;

        this.instantiationTime_ms = Date.now();
    }
    getString()
    {
        // name, position.xyz, rotation.xyz, health,
        const p = this.position;
        const r = this.rotation;

        return `${this.asset.name},${this.id},${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)},${r.x.toFixed(2)},${r.y.toFixed(2)},${r.z.toFixed(2)},${this.health},`;
    }
    getIsInsideBoundingCylinder(point = new vec4())
    {
        const vec = point.sub( this.position.add(this.asset.boundingCylinderCenter) );
        const xyDist = vec.mul(1,1,0,0).getLength();
        if (xyDist > this.asset.boundingCylinderRadius)// || vec.z < 0 || vec.z > this.asset.boundingCylinderHeight)
        {
            return false;
        }
        return true;
    }
}
class AgentEntity extends Entity
{
    constructor(asset = new Asset(), id="", position=new vec4(), rotation = new vec4())
    {
        super(asset, id, position, rotation);

        this.isCollectable = false; // to ensure player does not pick up & destroy an entity

        this.attackRange = (this.asset.damage != undefined) ? this.asset.damage.range : 1;
        this.attackDamage = (this.asset.damage != undefined) ? this.asset.damage : 1;
        this.lastAttackTimestamp_ms = 0;
        this.attackCooldown_ms = 500;

        this.speed = 1;
        this.shouldRenderPath = false;

        this.path = [];
        this.isObstructed = true;
        this.lastPathFindTimestamp_ms = Date.now();
        this.pathFindDelay_ms = 500 + Math.random() * 500;

        this.lastUpdateTimestamp_ms = Date.now();

        this.lastCollisionDetectionTimestamp_ms = Date.now();
        this.collisionDetectionDelay_ms = 100;
        this.nearbyEntites = [];
    }
    getTargetAndTimestamp()
    {
        if (this.path instanceof Array && this.path.length >= 2)
        {
            const dt = (Date.now() - this.lastUpdateTimestamp_ms) / 1000;
            const firstPoint = this.path[1];
            const vecEnemyToFirstPoint = firstPoint.sub(this.position);
            const distToPoint = vecEnemyToFirstPoint.getLength();
            vecEnemyToFirstPoint.scaleToUnit();
            // this.position = this.position.addi(vecEnemyToFirstPoint.mul(this.speed * dt));
            return {
                targetPosition: firstPoint,
                targetRotation: new vec4(),
                targetTimestamp: Date.now() + 1000 * distToPoint / this.speed,
            }
        }
        return {
            targetPosition: this.position,
            targetRotation: this.rotation,
            targetTimestamp: Date.now(),
        }
    }
    update(nearestPlayerPosition = new vec4(), entities = [])
    {
        // super.update(commandList, nearestPlayer);

        // Check if we need to path find
        //      Also updates this.nearbyEntities...
        if (Date.now() - this.lastPathFindTimestamp_ms > this.pathFindDelay_ms)
        {
            /////////////////////////////////////////////////
            // ENEMY PATH FINDING
            this.lastPathFindTimestamp_ms = Date.now();

            const vecEnemyToPlayer = nearestPlayerPosition.sub(this.position);
            const dist = vecEnemyToPlayer.getLength();
            vecEnemyToPlayer.scaleToUnit();

            // First, get all nearby entities
            const nearbyEntites = [];   // not the same as this.nearbyEntities... this holds entities that might be in the path between player and this
            const pushVec = new vec4();
            this.nearbyEntites = [];
            for (let i=0; i<entities.length; i++)
            {
                const otherToSelfDist = entities[i].position.sub(this.position).getLength();
                if (!(entities[i] instanceof AgentEntity))
                {
                    if (entities[i].position.sub(nearestPlayerPosition).getLength() < dist && otherToSelfDist < dist)
                    {
                        nearbyEntites.push(entities[i]);
                    }
                }
                if (otherToSelfDist < 5)
                {
                    this.nearbyEntites.push(entities[i])
                }
            }


            let possiblePaths = [ [this.position, nearestPlayerPosition] ];
            let possiblePathsStartIndex = [ 0 ];

            let itr = 0;
            let path = null;
            let isObstructed = true;
            const maxNumIterations = 1000;
            const maxPathLength = 5;
            while (itr < maxNumIterations)
            {
                itr++;

                // We don't need to sort...
                path = possiblePaths.shift();
                const startIndex = Math.max(0, possiblePathsStartIndex.shift());

                if (path.length > maxPathLength)
                {
                    break;
                }
                // console.log("path popped from list: ", path);

                isObstructed = false;
                let obstructingEntity = null;
                for (let i=startIndex; i<path.length-1; i++)
                {
                    const p1 = path[i];
                    const p2 = path[i+1];
                    
                    for (let j in nearbyEntites)
                    {
                        const dist = distanceFromLine(p1, p2, nearbyEntites[j].position);
                        if (dist < nearbyEntites[j].asset.boundingBox.radius)
                        {
                            isObstructed = true;
                            obstructingEntity = nearbyEntites[j];
                            // obstructionPosition = nearbyEntites[j].position;
                            // obstructionRadius = nearbyEntites[j].asset.boundingBox.radius;
                            break;
                        }
                    }

                    if (isObstructed)
                    {
                        const min = obstructingEntity.asset.boundingBox.min;
                        const max = obstructingEntity.asset.boundingBox.max;

                        // for each corner of the bounding box...
                        for (let k=1; k<3; k++) {
                            let c1 = new vec4(min.x, min.y).addi(obstructingEntity.position);
                            let c2 = new vec4(min.x, max.y).addi(obstructingEntity.position);
                            let c3 = new vec4(max.x, max.y).addi(obstructingEntity.position);
                            let c4 = new vec4(max.x, min.y).addi(obstructingEntity.position);

                            c1 = c1.add(  c1.sub(obstructingEntity.position).scaleToUnit().muli(k) );
                            c2 = c2.add(  c2.sub(obstructingEntity.position).scaleToUnit().muli(k) );
                            c3 = c3.add(  c3.sub(obstructingEntity.position).scaleToUnit().muli(k) );
                            c4 = c4.add(  c4.sub(obstructingEntity.position).scaleToUnit().muli(k) );

                            let newPath1 = [...path];
                            let newPath2 = [...path];
                            let newPath3 = [...path];
                            let newPath4 = [...path];

                            newPath1.splice(i+1, 0, c1);
                            newPath2.splice(i+1, 0, c2);
                            newPath3.splice(i+1, 0, c3);
                            newPath4.splice(i+1, 0, c4);

                            possiblePaths.push( newPath1, newPath2, newPath3, newPath4 );
                            possiblePathsStartIndex.push( i-1, i-1, i-1, i-1 );
                        }
                        break;
                    }
                }
                if (isObstructed == false) { 
                    break; 
                }
            }

            if (path instanceof Array && path.length >= 2)
            {
                this.path = path; 
            }
            this.isObstructed = isObstructed;
        }

        // Check for collision detection...
        if (Date.now() - this.lastCollisionDetectionTimestamp_ms > this.collisionDetectionDelay_ms)
        {
            this.lastCollisionDetectionTimestamp_ms = Date.now();
            let changeVec = new vec4();
            for (let i in this.nearbyEntites)
            {
                const vecToEntity = this.nearbyEntites[i].position.sub(this.position);
                const dist = vecToEntity.getLength();
                vecToEntity.scaleToUnit();

                const closestDistAllowable = this.asset.boundingBox.radius + this.nearbyEntites[i].asset.boundingBox.radius;

                if (dist < closestDistAllowable)
                {
                    // const dif = closestDistAllowable - dist;
                    changeVec.addi( vecToEntity.mul(-closestDistAllowable/dist) );
                }
            }

            this.position.addi(changeVec.muli(0.01));
        }

        // Move along path
        if (this.path instanceof Array && this.path.length >= 2)
        {
            const dt = (Date.now() - this.lastUpdateTimestamp_ms) / 1000;
            const firstPoint = this.path[1];
            const vecEnemyToFirstPoint = firstPoint.sub(this.position);

            if (vecEnemyToFirstPoint.getLength() < 0.2)
            {
                this.path.shift();
            }
            vecEnemyToFirstPoint.scaleToUnit();
            this.position = this.position.addi(vecEnemyToFirstPoint.mul(this.speed * dt));
        }     

        // Render path we're following
        if (this.shouldRenderPath)
        {
            if (this.isObstructed && !gl.getObjectExists("pathObstructed"))
            {
                gl.createObject('pathObstructed', null, null, null, null, null, null, new vec4(1,0,0,1));
            }
            if (!this.isObstructed && !gl.getObjectExists("pathNotObstructed")){
                gl.createObject('pathNotObstructed', null, null, null, null, null, null, new vec4(0,1,0,1));
            }
            for (let i=0; i<this.path.length-1;i++)
            {
                const p1 = this.path[i];
                const p2 = this.path[i+1];
                const center = p1.add(p2).muli(0.5);
                const dist = p1.sub(p2).getLength();
                const angle = Math.atan2(p2.y-p1.y, p2.x-p1.x);

                if (this.isObstructed)
                {
                    gl.renderObjectCustomView('pathObstructed', null, null, center, new vec4(angle, 0, 0), new vec4(dist, 0.1, 0.1), 0);
                } else {
                    gl.renderObjectCustomView('pathNotObstructed', null, null, center, new vec4(angle, 0, 0), new vec4(dist, 0.1, 0.1), 0);
                }
                
            }
        }

        // Do damage to nearest player
        if (Date.now() - this.lastAttackTimestamp_ms > this.attackCooldown_ms && nearestPlayerPosition.sub(this.position).getLength() < this.attackRange)
        {
            this.lastAttackTimestamp_ms = Date.now();
            // console.log("DO DAMAGE TO PLAYER")
            // commandList.push({
            //     command: "applyDamageToPlayer",
            //     player: nearestPlayer,
            //     damage: this.attackDamage,
            // })
        }

        this.lastUpdateTimestamp_ms = Date.now();
    }
}
class PlayerData
{
    constructor(id, position, rotation, scale, entityInHand_assetName, entityInHandLastUsedTimestamp_ms)
    {
        this.id = id;
        this.string = "";
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.entityInHand_assetName = entityInHand_assetName;
        this.entityInHand_lastUsedTimestamp_ms = entityInHandLastUsedTimestamp_ms;
        this.pTimestamp_ms   = Date.now();
        this.timestamp_ms    = Date.now();

        this.server_commandsQueue = "";
    }
    // generateFromPlayer(player = new Player())
    // {
    //     this.id = player.id;
    //     this.position = player.position;
    //     this.rotation = player.rotation;
    //     this.scale = player.scale;
    //     this.entityInHand_assetName = player.entityInHand_assetName;
    //     this.entityInHandLastUsedTimestamp_ms = player.entityInHandLastUsedTimestamp_ms;
        
    //     let str = '';
    //     str += player.id + ",";
    //     str += player.position.x.toFixed(2) + ",";
    //     str += player.position.y.toFixed(2) + ",";
    //     str += player.position.z.toFixed(2) + ",";
    //     str += player.rotation.x.toFixed(2) + ",";
    //     str += player.rotation.y.toFixed(2) + ",";
    //     str += player.rotation.z.toFixed(2) + ",";
    //     if (player.inventory[player.inventoryIndex] instanceof Entity)
    //     {
    //         str += player.inventory[player.inventoryIndex].asset.name + "," + player.entityInHandLastUsedTimestamp_ms + ",";
    //     } else {
    //         str += 'null,0,';
    //     }
    //     this.string = str;
    //     return this;
    // }
    // parse(data, startIndex=0)
    // {
    //     let arr = "";
    //     if (data instanceof Array)
    //     {
    //         arr = data;
    //         this.string = data.join('');
    //     } else {
    //         arr = data.split(",")
    //         this.string = data;
    //     }
    //     // Parse Data
    //     this.id          = arr[0+startIndex];
    //     const position   = new vec4(Number(arr[1+startIndex]), Number(arr[2+startIndex]), Number(arr[3+startIndex]));
    //     const rotation   = new vec4(Number(arr[4+startIndex]), Number(arr[5+startIndex]), Number(arr[6+startIndex]));
    //     const scale      = new vec4(1,1,1,1);
    //     this.entityInHand_assetName = (assetMap.get(arr[7+startIndex]) != null) ? arr[7+startIndex] : null;
    //     this.entityInHandLastUsedTimestamp_ms = Number(arr[8+startIndex]);

    //     if (this.position != null)
    //     {
    //         this.startPosition  = this.position;
    //         this.startRotation  = this.rotation;
    //         this.startScale     = this.scale;

    //         this.targetPosition = position;
    //         this.targetRotation = rotation;
    //         this.targetScale    = scale;

    //         this.pTimestamp_ms  = this.timestamp_ms;
    //         this.timestamp_ms   = Date.now();
    //     } else {
    //         this.position   = position;
    //         this.rotation   = rotation;
    //         this.scale      = scale;

    //         this.startPosition   = position;
    //         this.startRotation   = rotation;
    //         this.startScale      = scale;
            
    //         this.targetPosition   = position;
    //         this.targetRotation   = rotation;
    //         this.targetScale      = scale;

    //         this.pTimestamp_ms   = Date.now();
    //         this.timestamp_ms    = Date.now();
    //     }
    //     return this;
    // }
}


function generateID()
{
    // 48-57= 0-9
    // 65-90 = A-Z
    // 97-122 = a-z
    let id = "";
    while (id.length < 5)
    {
        let val = Math.round(Math.random()*10);
        if (val < 10)
        {
            id += val;
        } else if (val < 37) {
            id += String.fromCharCode(val-10+65);
        } else {
            id += String.fromCharCode(val-37+97);
        }
    }
    return id;
}
function generate_world(width=50)
{

    function noiseLayers(x,y,baseFreq, offset)
    {
        let val = 0;
        let multipliers = [0.6, 0.2, 0.1, 0.1];
        let freqMultiplier = [1, 1.5, 2.9, 4.3];
        for (let i=0; i<4; i++)
        {
            val += multipliers[i]*perlin(new vec4(x*baseFreq*freqMultiplier[i] + offset,y*baseFreq*freqMultiplier[i] + offset,0,0));
        }
        return val;
    }

    entities = [];
    const step = 3
    for (let x=-width; x<width; x+=step)
    {
        for (let y=-width; y<width; y+=step)
        {
            const firTreeNoise      = Math.pow(noiseLayers(x, y, 0.1, 1), 4)*4;
            const mapleTreeNoise    = Math.pow(noiseLayers(x, y, 0.13, 10), 2)*1.5;
            const stoneNoise        = Math.pow(noiseLayers(x, y, 0.18, 10), 2)*1.5;
            const angle = Math.random() * 6.28;
            const offset = new vec4(Math.sin(angle),Math.cos(angle),0,0).muli( Math.random() * step );
            if (firTreeNoise > 0.60) // add fir tree
            {
                let asset = asset_firTree4;
                if (firTreeNoise < 0.70) { asset = asset_firTree1; } 
                else if (firTreeNoise < 0.80) { asset = asset_firTree2; } 
                else if (firTreeNoise < 0.90) { asset = asset_firTree3; }
                entities.push(new Entity(asset, generateID(), new vec4(x,y,0,0).add(offset), new vec4(angle,0,0)));
                // entities.push(
                //     {
                //         name: name,
                //         position: new vec4(x,y,0,0).add(offset),
                //         rotation: new vec4(angle,0,0),
                //         health: asset_firTree1.health.amount,
                //     }
                // )
                continue;
            }
            if (mapleTreeNoise > 0.60) // add maple tree
            {
                let asset = asset_mapleTree4;
                if (mapleTreeNoise < 0.70) { asset = asset_mapleTree1; } 
                else if (mapleTreeNoise < 0.80) { asset = asset_mapleTree2; } 
                else if (mapleTreeNoise < 0.90) { asset = asset_mapleTree3; }
                entities.push(new Entity(asset, generateID(), new vec4(x,y,0,0).add(offset), new vec4(angle,0,0)));
                // entities.push(
                //     {
                //         name: name,
                //         position: new vec4(x,y,0,0).add(offset),
                //         rotation: new vec4(),
                //         health: asset_firTree1.health.amount,
                //     }
                // )
                continue;
            }
            if (stoneNoise > 0.60) // add maple tree
            {
                let asset = asset_stone4;
                if (stoneNoise < 0.70) { asset = asset_stone3; } 
                else if (stoneNoise < 0.80) { asset = asset_stone2; } 
                else if (stoneNoise < 0.90) { asset = asset_stone1; }
                entities.push(new Entity(asset, generateID(), new vec4(x,y,0,0).add(offset), new vec4(angle,0,0)));
                continue;
            }
        }
    }
    return entities;
}
function computeDamageAmount(entity, damageObj)
{
    // any, chopDamage, mineDamage, attackDamage
    let damage = 0;
    switch(entity?.asset?.health?.type)
    {
        case "any":
            damage = Math.max(damageObj.chopDamage, damageObj.mineDamage, damageObj.attackDamage);
            break;
        case "chopDamage":
            damage = damageObj.chopDamage;
            break;
        case "mineDamage":
            damage = damageObj.mineDamage;
            break;
        case "attackDamage":
            damage = damageObj.attackDamage;
            break;
        default:
            console.error("DamageCommand.constructor(): entity:",entity," damageObj:",damageObj);
    }
    return damage;
}



/////////////// CLIENT TO SERVER COMMANDS ////////////////
function cts_applyDamageToEntity(entityID, damageAmount)
{
    return `cts_applyDamageToEntity,${entityID},${damageAmount}@`;
}
function parse_cts_applyDamageToEntity(message)
{
    const arr = message.split(',');
    return {
        entityID: arr[1],
        damageAmount: Number(arr[2])
    }
}
function cts_collectEntity(playerID, entityID)
{
    return `cts_collectEntity,${playerID},${entityID}@`;
}
function parse_cts_collectEntity(message)
{
    const arr = message.split(',');
    return {
        playerID: arr[1],
        entityID: arr[2],
    }
}


/////////////// SERVER TO CLIENT COMMANDS ////////////////
function stc_setEntityHealth(entityID, entityHealth)
{
    return `stc_setEntityHealth,${entityID},${entityHealth}@`;
}
function parse_stc_setEntityHealth(message)
{
    const arr = message.split(',');
    return {
        entityID: arr[1],
        entityHealth: Number(arr[2]),
    }
}
function stc_givePlayerEntity(playerID, entityName)
{
    return `stc_givePlayerEntity,${playerID},${entityName}@`;
}
function parse_stc_givePlayerEntity(message)
{
    const arr = message.split(',');
    return {
        playerID: arr[1],
        entityName: arr[2],
    }
}
function stc_instantiateEntity(assetName,assetID,position,rotation)
{
    return `stc_instantiateEntity,${assetName},${assetID},${position.x.toFixed(2)},${position.y.toFixed(2)},${position.z.toFixed(2)},${rotation.x.toFixed(2)},${rotation.y.toFixed(2)},${rotation.z.toFixed(2)}@`
}
function parse_stc_instantiateEntity(message = "")
{
    const arr = message.split(',');
    return {
        assetName:arr[1],
        entityID: arr[2],
        position:new vec4(Number(arr[3]),Number(arr[4]),Number(arr[5])),
        rotation:new vec4(Number(arr[6]),Number(arr[7]),Number(arr[8])),
    }
}
function stc_setEntityPositionRotation(entityID, position, rotation, velocity=-1)
{
    return `stc_setEntityPositionRotation,${entityID},${position.x.toFixed(2)},${position.y.toFixed(2)},${position.z.toFixed(2)},${rotation.x.toFixed(2)},${rotation.y.toFixed(2)},${rotation.z.toFixed(2)},${velocity}@`;
}
function parse_stc_setEntityPositionRotation(message = "")
{
    const arr = message.split(',');
    return {
        entityID:arr[1],
        position:new vec4(Number(arr[2]),Number(arr[3]),Number(arr[4])),
        rotation:new vec4(Number(arr[5]),Number(arr[6]),Number(arr[7])),
        velocity:Number(arr[8])
    }
}
function stc_setEntityTarget(entityID, position, rotation, arrivalTimestamp_ms=Date.now())
{
    return `stc_setEntityTarget,${entityID},${position.x.toFixed(2)},${position.y.toFixed(2)},${position.z.toFixed(2)},${rotation.x.toFixed(2)},${rotation.y.toFixed(2)},${rotation.z.toFixed(2)},${arrivalTimestamp_ms}@`;
}
function parse_stc_setEntityTarget(message = "")
{
    const arr = message.split(',');
    return {
        entityID:arr[1],
        position:new vec4(Number(arr[2]),Number(arr[3]),Number(arr[4])),
        rotation:new vec4(Number(arr[5]),Number(arr[6]),Number(arr[7])),
        arrivalTimestamp_ms:Number(arr[8])
    }
}
function stc_entityData(entity)
{
    const p = entity.position;
    const r = entity.rotation;

    return `stc_entityData,${entity.asset.name},${entity.id},${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)},${r.x.toFixed(2)},${r.y.toFixed(2)},${r.z.toFixed(2)},${entity.health}@`;
}
function parse_stc_entityData(message = "")
{
    const arr = message.split(',');
    return {
        assetName:arr[1],
        entityID:arr[2],
        position:new vec4(Number(arr[3]),Number(arr[4]),Number(arr[5])),
        rotation:new vec4(Number(arr[6]),Number(arr[7]),Number(arr[8])),
        arrivalTimestamp_ms:Number(arr[9])
    }
}
function cts_playerData(player)
{
    // let str = '';
    //     str += player.id + ",";
    //     str += player.position.x.toFixed(2) + ",";
    //     str += player.position.y.toFixed(2) + ",";
    //     str += player.position.z.toFixed(2) + ",";
    //     str += player.rotation.x.toFixed(2) + ",";
    //     str += player.rotation.y.toFixed(2) + ",";
    //     str += player.rotation.z.toFixed(2) + ",";
    //     if (player.inventory[player.inventoryIndex] instanceof Entity)
    //     {
    //         str += player.inventory[player.inventoryIndex].asset.name + "," + player.entityInHandLastUsedTimestamp_ms + ",";
    //     } else {
    //         str += 'null,0,';
    //     }
    //     this.string = str;
    const p = player.position;
    const r = player.rotation;
    const entityInHand_assetName = (player.inventory[player.inventoryIndex] instanceof Entity) ? player.inventory[player.inventoryIndex].asset.name : null;
    return `cts_playerData,${player.id},${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)},${r.x.toFixed(2)},${r.y.toFixed(2)},${r.z.toFixed(2)},${entityInHand_assetName},${player.entityInHand_lastUsedTimestamp_ms}@`;
}
function parse_cts_playerData(message = "")
{
    const arr = message.split(',');
    return {
        playerID:arr[1],
        position:new vec4(Number(arr[2]),Number(arr[3]),Number(arr[4])),
        rotation:new vec4(Number(arr[5]),Number(arr[6]),Number(arr[7])),
        entityInHand_assetName:arr[8],
        entityInHand_lastUsedTimestamp_ms: Number(arr[9])
    }
}

/////////////////////////////////////////////////////
/// SERVER CODE ////////////////
if (typeof window == "undefined")
{
    var express = require('express');
    var cors = require('cors');
    var app = express();
    app.use(cors({
        origin: '*'
    }));
    var port = 3001;
    app.listen(port, function () {
        console.log("Example app listening on port ".concat(port));
    });
    
    app.get('/', function (req, res) {
        res.sendFile(__dirname+'/client.html');
    });
    app.get('/client.js', function (req, res) {
        res.sendFile(__dirname+'/client.js');
    });
    app.get('/assets.js', function (req, res) {
        res.sendFile(__dirname+'/assets.js');
    });
    app.get('/myMath.js', function (req, res) {
        res.sendFile(__dirname+'/myMath.js');
    });
    app.get('/speedyGL.js', function (req, res) {
        res.sendFile(__dirname+'/speedyGL.js');
    });
    
    
    const entities = [];//generate_world(200);
    const entitiesMap = new Map();
    const playerMap = new Map();
    const playerEntitySendDistance = 50;
    // entities.push(new AgentEntity(asset_woodenWall, generateID(), new vec4(10,10), new vec4()));
    
    console.log(`Num Entities: ${entities.length}`);
    
    function compileAllEntities(playerID = "playerID")
    {
        let str = "";
        const player = playerMap.get(playerID);
        if (player == undefined)
        {
            // Return all entitieus
            for (let i=0; i<entities.length; i++)
            {
                const e = entities[i];
                str += e.getString();
            }
        } else {
            // Return only nearby entities
            for (let i=0; i<entities.length; i++)
            {
                const e = entities[i];
                if (e.position.sub(player.position).getLength() < playerEntitySendDistance)
                {
                    // str += e.getString();
                    str += stc_entityData(e);
                }
            }
        }
        return str;
    }
    
    function compileAllCommands(playerID="playerID")
    {
        // return "TODO: write serverside compleAllCommands"
        const p = playerMap.get(playerID);
        if (p == undefined) { console.error("Error: playerMap does not have playerID:",playerID); return ""; }
    
        // let str = "";
        // for (let i in p.server_commandsQueue)
        // {
        //     str += p.server_commandsQueue[i].getString();
        // }
        const temp = p.server_commandsQueue;
        p.server_commandsQueue = "";
        return temp;
    }
    
    function injestCommands(playerID = "", message = "")
    {
        let output = "";
        const arr = message.split('@');
    
        for (let i_ in arr)
        {
            const command = arr[i_];
            if (command.startsWith("cts_applyDamageToEntity"))
            {
                const data = parse_cts_applyDamageToEntity(command);
                const entity = entitiesMap.get(data.entityID);
                if (entity==undefined || isNaN(data.damageAmount))
                {
                    output += stc_setEntityHealth(data.entityID, -10);
                    console.error(`Error injesting 'cts_applyDamageToEntity' entityID:${data.entityID} entity:${entity} damageAmount:${data.damageAmount}`);
                    continue;
                }
                entity.health -= data.damageAmount;
                output += stc_setEntityHealth(data.entityID, entity.health);
    
                // Instantiate drops if need be
                if (entity.health <= 0 && entity.asset.drop instanceof Array)
                {
                    syncEntitiesMapAndArray();
                    for (let i in entity.asset.drop)
                    {
                        const assetName = entity.asset.drop[i].assetName;
                        const count = entity.asset.drop[i].count;
                        for (let j=0; j<count; j++)
                        {
                            const e = new Entity(assetMap.get(assetName), generateID(), position=entity.position.add(0.5-Math.random(), 0.5-Math.random()), rotation=entity.rotation.add(0.5-Math.random(), 0.5-Math.random()));
                            output += stc_instantiateEntity(assetName, e.id, e.position, e.rotation);
                            entities.push(e);
                            entitiesMap.set(e.id, e);
                        }
                    }
                }
                continue;
            }
            if (command.startsWith("cts_collectEntity"))
            {
                const data = parse_cts_collectEntity(command);
                const entity = entitiesMap.get(data.entityID);
                output += stc_setEntityHealth(data.entityID, -10);
                if (entity != undefined && entity.health > 0)
                {
                    entity.health = -1;
                    output += stc_setEntityHealth(data.entityID, -1);
                    output += stc_givePlayerEntity(data.playerID, entity.asset.name);
                }
                continue;
            }
            if (command.startsWith("cts_playerData"))
            {
                const data = parse_cts_playerData(command);
                output += command + "@";
                data.scale = new vec4(1,1,1)
                const playerID = data.playerID;
                let playerData = playerMap.get(playerID)
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
                } else {
                    playerData = new PlayerData();
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
                    
                    playerMap.set(playerID, playerData);
                }
                continue;
            }
            if (command.startsWith("cts_getAllEntities"))
            {
                const player = playerMap.get(playerID);
                if (player instanceof PlayerData)
                {
                    player.server_commandsQueue += compileAllEntities(playerID);
                }
                continue;
            }
            if (command.startsWith("stc_instantiateEntity"))
            {
                const data = parse_stc_instantiateEntity(message);
                const asset = assetMap.get(data.assetName);
                if (asset == undefined) { 
                    console.error("server received stc_instantiateEntity, and could not find asset with name:",data.assetName); 
                    continue;
                }
                const e = new Entity(asset, data.entityID, data.position, data.rotation);
                entities.push(e);
                entitiesMap.set(e.id, e);
                output += stc_instantiateEntity(e.asset.name, e.id, e.position, e.rotation);
                continue;
            }
            if (command == "" || command == " ")
            {
                continue;
            }
            console.log("unhandled command:",command)
        }
    
        for (const key of playerMap.keys())
        {
            const p = playerMap.get(key);
            p.server_commandsQueue += output;
        }
    }
    
    
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 8080 });
    wss.on('connection', (ws) => {      
        // Event listener for messages from clients
        ws.on('message', (message) => {
            message = String(message)
            const arr = message.split("|");
            const playerID = arr[0];
            message = arr[1];
            injestCommands(playerID, message);
            ws.send( compileAllCommands(playerID) );
            return;
        });

        // Event listener for when the client closes the connection
        ws.on('close', () => {
            console.log('Client disconnected');
        });
        ws.on('open', () => {
            console.log('Client connected');
        });
    });
    
    setInterval(syncEntitiesMapAndArray, 1000);
    function syncEntitiesMapAndArray()
    {
        let i=0;
        entitiesMap.clear();
        while (i<entities.length)
        {
            const e = entities[i];
            if (e.health <= 0 && e.health != null)
            {
                // console.log(`removing entity ${entities[i].asset.name}  ${entities[i].id}`);
                entities.splice(i,1);
            } else {
                entitiesMap.set(e.id, e);
                i++;
            }
        }
    }
    
    setInterval(updateFast, 100);
    function updateFast()
    {
        if (playerMap.keys().next().done)
        {
            entities.splice(0, entities.length);
            entitiesMap.clear();
            return;
        }
        if (entities.length == 0)
        {
            console.log("generating world.")
            let temp = generate_world(200);
            for (let i in temp)
            {
                entities.push(temp[i]);
            }
            syncEntitiesMapAndArray();
        }

        const t = Date.now();
        let outgoingCommands = "";
        for (let i1 in entities)
        {
            if (!(entities[i1] instanceof AgentEntity))
            {
                continue;
            }
            const e = entities[i1];
    
            // First, find the closest player
            let closestPlayer = null;
            let closestPlayerDistance = 100000;
            for (const key of playerMap.keys())
            {
                const p = playerMap.get(key);
                const dist = p.targetPosition.sub(e.position).getLength();
                if (dist < closestPlayerDistance)
                {
                    closestPlayer = p;
                    closestPlayerDistance = dist;
                }
            }
            if (closestPlayer != null)
            {
                e.update(closestPlayer.targetPosition, entities);
                // outgoingCommands += stc_setEntityPositionRotation(e.id, closestPlayer.targetPosition, closestPlayer.targetRotation, 0.4);
                
                // // e.position = 
                // const vecToTarget = closestPlayer.targetPosition.sub(e.position).scaleToUnit();
                // e.position.addi(vecToTarget.mul(0.2*0.4));
                // e.update(closestPlayer.targetPosition, entities);
            }

        }
    
        
        for (const key of playerMap.keys())
        {
            const p = playerMap.get(key);
            p.server_commandsQueue += outgoingCommands;
        }
    }
}