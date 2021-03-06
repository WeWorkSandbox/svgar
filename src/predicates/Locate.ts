import SvgarCube from "./../models/SvgarCube";
import SvgarSlab from "./../models/SvgarSlab";
import SvgarPath from "./../models/SvgarPath";

export default function Locate(): LocateContext {
    const context: LocateContext = {
        svgar: {
            slab: new LocateSvgarSlabContext(),
            path: new LocateSvgarPathContext(),
        }
    }

    return context;
}

interface LocateContext {
    svgar: {
        slab: LocateSvgarSlabContext,
        path: LocateSvgarPathContext,
    }
}

class LocateSvgarSlabContext {

    private withIdFilter: string = "";
    private withNameFilter: string = "";

    public in: LocateSvgarSlabInContext;

    constructor() {
        this.in = {
            svgar: {
                cube: this.locateInSvgarCube.bind(this),
            }
        }
    }

    public withId(id: string): LocateSvgarSlabContext {
        this.withIdFilter = id;
        return this;
    }

    public withName(name: string): LocateSvgarSlabContext {
        this.withNameFilter = name;
        return this;
    }

    private locateInSvgarCube(cube: SvgarCube): SvgarSlab | undefined {
        let slabs: SvgarSlab[] = [];
        
        if (this.withIdFilter != "") {
            slabs = cube.slabs.filter(x => x.getId() == this.withIdFilter);
        }

        if (this.withNameFilter != "") {
            slabs = slabs.concat(cube.slabs.filter(x => x.getName() == this.withNameFilter));
        }

        return slabs[0];
    }
}

interface LocateSvgarSlabInContext {
    svgar: {
        cube: (cube: SvgarCube) => SvgarSlab | undefined,
    }
}

class LocateSvgarPathContext {
    
    private withIdFilter: string = "";

    public in: LocateSvgarPathInContext; 

    constructor() {
        this.in ={
            svgar: {
                cube: this.locateInSvgarCube.bind(this),
                slab: this.locateInSvgarSlab.bind(this),
            }
        }

        this.withIdFilter = "";
    }

    public withId(name: string): LocateSvgarPathContext {
        this.withIdFilter = name;
        return this;
    }

    private locateInSvgarCube(cube: SvgarCube): SvgarPath | undefined {
        if (this.withIdFilter == "") {
            return undefined;
        }
        
        let paths: SvgarPath[] = [];

        cube.slabs.forEach(slab => {
            paths = paths.concat(slab.getAllGeometry());
        });

        if(this.withIdFilter != "") {
            paths = paths.concat(paths.filter(x => x.getId() == this.withIdFilter));
        }

        return paths.find(x => x.getId() == this.withIdFilter);
    }

    private locateInSvgarSlab(slab: SvgarSlab): SvgarPath | undefined {
        let path: SvgarPath[] = [];

        if (this.withIdFilter != "") {
            path = path.concat(slab.getAllGeometry().filter(x => x.getId() == this.withIdFilter));
        }

        return path[0];
    }
}

interface LocateSvgarPathInContext {
    svgar: {
        cube: (cube: SvgarCube) => SvgarPath | undefined,
        slab: (slab: SvgarSlab) => SvgarPath | undefined,
    }
}