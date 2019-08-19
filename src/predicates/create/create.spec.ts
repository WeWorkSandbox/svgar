import Create from "./create";
import { expect } from 'chai';
import 'mocha';

describe('given multiple separate rhino create predicates', () => {

    it('should create a Linecurve', () => {
        let crv = Create.Rhino.LineCurve([0,0,0], [1,0,0]);

        expect(crv.pointAtEnd[0]).to.equal(1);
    });

    it('should create a Point3dList', () => {
        let pts = Create.Rhino.Point3dList()
        
        pts.add(1,2,3);

        expect(pts.count).to.equal(1);
    });

    it('should create a Model', () => {
        let file = Create.Rhino.Model();
        expect(file).to.exist;
    });

});

describe('given a create rhino model context', () => {

    describe('when adding curves', () => {
        
        it('should parse arc curves', () => {
            let file = Create.Rhino.Model().WithThesePoints([]).WithThesePoints([]);
            expect(file).to.exist;
        });

        it('should allow a "then" callback', () => {
            let file = Create.Rhino.Model().WithThesePoints([[0,0,0], [1,1,1]]).Then(x => {
                expect(x.objects().count).to.equal(2);
            });
        })

    });

});