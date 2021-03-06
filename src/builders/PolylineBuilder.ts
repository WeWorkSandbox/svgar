import SvgarPath from './../models/SvgarPath';

export default class PolylineBuilder {

    private coordinates: number[];
    
    constructor(startX: number, startY: number) {
        this.coordinates = [startX, startY];
    }

    public build(): SvgarPath {
        let c: number[] = [];

        for (let i = 0; i < this.coordinates.length - 2; i += 2) {
            let xA = this.coordinates[i];
            let yA = this.coordinates[i + 1];
            let xB = this.coordinates[i + 2];
            let yB = this.coordinates[i + 3];

            let xMid = (xA + xB) / 2;
            let yMid = (yA + yB) / 2;

            c = c.concat([xA, yA, xMid, yMid, xMid, yMid, xB, yB])
        }

        return new SvgarPath(c);
    }

    public lineTo(x: number, y: number): PolylineBuilder {
        this.coordinates = this.coordinates.concat([x, y]);
        return this;
    }

    public verticalTo(y: number): PolylineBuilder {
        this.coordinates = this.coordinates.concat([
            this.coordinates[this.coordinates.length - 2], 
            y
        ]);
        return this;
    }

    public horizontalTo(x: number): PolylineBuilder {
        this.coordinates = this.coordinates.concat([
            x,
            this.coordinates[this.coordinates.length - 1]
        ]);
        return this;
    }

    public close(): PolylineBuilder {
        this.coordinates = this.coordinates.concat([
            this.coordinates[0],
            this.coordinates[1]
        ]);
        return this;
    }

    public getCurrentCoordinates(): number[] {
        return this.coordinates.concat([]);
    }
}