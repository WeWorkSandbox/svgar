import Update from './Update';
import { expect } from 'chai';
import 'mocha';
import SvgarSlab from './../models/SvgarSlab';
import SvgarCube from './../models/SvgarCube';
import SvgarPath from './../models/SvgarPath';

describe("given a default svgar path", () => {

    let path = new SvgarPath([]);

    describe("when updating its id", () => {

        before(() => {
            path.compile();
            Update().svgar.path(path).id.to("test-id");
        });

        it("should set the path id to the declared value", () => {
            expect(path.getId()).to.equal("test-id");
        });

    });

    describe("when updating its tag", () => {

        before(() => {
            path.compile();
            Update().svgar.path(path).tag.to("test-tag");
        });

        it("should set the path tag to the declared value", () => {
            expect(path.getTag()).to.equal("test-tag");
        });

    });

    describe("when updating its elevation", () => {

        before(() => {
            path.compile();
            Update().svgar.path(path).elevation.to(50);
        });

        it("should set the path elevation to the declared value", () => {
            expect(path.getElevation()).to.equal(50);
        });

    });

    describe("when updating its coordinates", () => {

        before(() => {
            path.compile();
            Update().svgar.path(path).coordinates.to([0, 0, 5, 5, 5, 5, 10, 10]);
        });

        it("should set the path coordinates to the declared array", () => {
            expect(path.getCoordinates().length).to.equal(8);
        });

        it("should update the number of segments on the path", () => {
            expect(path.segments).to.equal(1);
        });

        it("should flag path geometry scope as changed", () => {
            expect(path.checkFlag("geometry")).to.be.true;
        });

    });

    describe("when updating its coordinates with invalid data", () => {

        it("should throw an error", () => {
            expect(() => Update().svgar.path(path).coordinates.to([2, 2, 3])).to.throw("Coordinate array total must be evenly divisible by 8.");
        });

    });

});

describe("given a default svgar slab", () => {

    const slab = new SvgarSlab("test");

    describe("when updating its state", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).state.to("newstate");
        });        

        it("should flag its state as changed", () => {
            expect(slab.checkFlag("state")).to.be.true;
        });

        it("should update the current state to the declared value", () => {
            expect(slab.getCurrentState()).to.equal("newstate");
        });

    });

    describe("when updating its name", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).name.to("newname");
        });

        it("should flag its style as changed", () => {
            expect(slab.checkFlag("style")).to.be.true;
        });

        it("should update the current name to the declared value", () => {
            expect(slab.getName()).to.equal("newname");
        });

    });

    describe("when updating its id", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).id.to("fakeid");
        });

        it("should update the current id to the declared value", () => {
            expect(slab.getId()).to.equal("fakeid");
        });

    });

    describe("when updating its elevation", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).elevation.to(5);
        });

        it("should update the current elevation to the declared value", () => {
            expect(slab.getElevation()).to.equal(5);
        });

    });

    describe("when updating its states in aggregate", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).states.to([]);
            Update().svgar.slab(slab).states.to([
                {
                    name: "test",
                    styles: {

                    }
                },
                {
                    name: "other",
                    styles: {

                    }
                }
            ]);
        });

        it("should allow states to be set in aggregate", () => {
            expect(slab.getAllStates().length).to.equal(2);
        });

        it("should flag slab state scope as changed", () => {
            expect(slab.checkFlag("state")).to.be.true;
        })

    });

    describe("when adding states individually", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).states.to([]);
            Update().svgar.slab(slab).states.add([
                {
                    name: "test",
                    styles: {

                    }
                }
            ]);
        });

        it("should allow states to be added individually", () => {
            expect(slab.getAllStates().length).to.equal(1);
        });

        it("should flag slab state scope as changed", () => {
            expect(slab.checkFlag("state")).to.be.true;
        });

    });

    describe("when adding multiple states at once", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).states.to([]);
            Update().svgar.slab(slab).states.to([
                {
                    name: "test",
                    styles: {

                    }
                },
                {
                    name: "othertest",
                    styles: {

                    }
                }
            ]);
        });

        it("should add all states declared", () => {
            expect(slab.getAllStates().map(x => x.name).includes("othertest")).to.be.true;
        });

        it("should flag slab state scope as changed", () => {
            expect(slab.checkFlag("state")).to.be.true;
        });

    });

    describe("when removing states", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).states.to([
                {
                    name: "a",
                    styles: {
                        "wall": "black"
                    }
                },
                {
                    name: "b",
                    styles: {

                    }
                },
                {
                    name: "c",
                    styles: {
                        "floor": "red"
                    }
                }
            ]);
            Update().svgar.slab(slab).states.remove(x => x.name == "b");
        });

        it("should remove states that meet the critera", () => {
            expect(slab.getAllStates().length).to.equal(2);
            expect(slab.getAllStates().find(x => x.name == "b")).to.not.exist;
        });

        it("should flag slab state scope as changed", () => {
            expect(slab.checkFlag("state")).to.be.true;
        });

    });

    describe("when setting all styles", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).styles.to([
                {
                    name: "test",
                    attributes: {
                        "stroke": "black"
                    }
                },
                {
                    name: "fill",
                    attributes: {
                        "fill": "red"
                    }
                }
            ]);
        });

        it("should set styles to only the declared collection and a default style", () => {
            expect(slab.getAllStyles().length).to.equal(3);
            expect(slab.getAllStyles().map(x => x.name).includes("fill")).to.be.true;
        });

        it("should flag slab style scope as changed", () => {
            expect(slab.checkFlag("style")).to.be.true;
        });

    });

    describe("when adding styles one at a time", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).styles.add({
                name: "single",
                attributes: {
                    "stroke": "red",
                }
            });
        });

        it("should add the declared style", () => {
            expect(slab.getAllStyles().map(x => x.name).includes("single")).to.be.true;
        });

        it("should flag slab style scope as changed", () => {
            expect(slab.checkFlag("style")).to.be.true;
        });

    });

    describe("when adding multiple styles at once", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).styles.to([]);
            Update().svgar.slab(slab).styles.add([
                {
                    name: "one",
                    attributes: {

                    }
                },
                {
                    name: "two",
                    attributes: {

                    }
                }
            ]);
        });

        it("should add all declared styles in array to slab", () => {
            expect(slab.getAllStyles().length).to.equal(3);
        });

        it("should flag slab style scope as changed", () => {
            expect(slab.checkFlag("style")).to.be.true;
        });

    });

    describe("when removing styles", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).styles.to([
                {
                    name: "first",
                    attributes: {
                        "stroke": "red"
                    }
                },
                {
                    name: "second",
                    attributes: {
                        "stroke": "blue"
                    }
                },
                {
                    name: "third",
                    attributes: {
                        "stroke": "green"
                    }
                }
            ]);
            Update().svgar.slab(slab).styles.remove(x => x.attributes["stroke"] != "blue");
        });

        it("should remove any styles that match the given test", () => {
            expect(slab.getAllStyles().length).to.equal(2);
        });

        it("should flag slab style scope as changed", () => {
            expect(slab.checkFlag("style")).to.be.true;
        });

    });

    describe("when setting all geometry at once", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).geometry.to([
                new SvgarPath([]),
                new SvgarPath([]),
                new SvgarPath([])
            ]);
        });

        it("should set all geometry at once", () => {
            expect(slab.getAllGeometry().length).to.equal(3);
        });

        it("should flag slab geometry scope as changed", () => {
            expect(slab.checkFlag("geometry")).to.be.true;
        });

    });

    describe("when adding geometry one at a time", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).geometry.to([]);
            Update().svgar.slab(slab).geometry.add(new SvgarPath([]));
        });

        it("should add the declared geometry", () => {
            expect(slab.getAllGeometry().length).to.equal(1);
        });

        it("should flag slab geometry scope as changed", () => {
            expect(slab.checkFlag("geometry")).to.be.true;
        });

    });

    describe("when adding multiple pieces of geometry at once", () => {

        before(() => {
            slab.compile();
            Update().svgar.slab(slab).geometry.to([]);
            Update().svgar.slab(slab).geometry.add([
                new SvgarPath([]),
                new SvgarPath([])
            ]);
        });

        it("should add all geometries declared to slab", () => {
            expect(slab.getAllGeometry().length).to.equal(2);
        });

        it("should flag slab geometry scope as changed", () => {
            expect(slab.checkFlag("geometry")).to.be.true;
        });

    });

    describe("when removing geometry", () => {

        before(() => {
            slab.compile();

            let testPath = new SvgarPath([]);
            testPath.setTag("test");

            Update().svgar.slab(slab).geometry.to([
                new SvgarPath([]),
                new SvgarPath([]),
                new SvgarPath([]),
                testPath
            ]);

            Update().svgar.slab(slab).geometry.remove(x => x.getTag() == "test");
        });

        it("should remove paths that match the given criteria", () => {
            expect(slab.getAllGeometry().map(x => x.getTag()).includes("test")).to.be.false;
            expect(slab.getAllGeometry().length).to.equal(3);
        });

        it("should flag slab geometry scope as changed", () => {
            expect(slab.checkFlag("geometry")).to.be.true;
        });

    });

    describe("when updating its clip path", () => {

        before(() => {
            slab.compile();
            let clip = new SvgarSlab("test-clip");
            Update().svgar.slab(slab).clipPath.to(clip);
        });

        it("should set the current clip path to the declared slab", () => {
            expect(slab.getClip()?.getName()).to.equal("test-clip");
        });

        it("should flag slab clip scope as changed", () => {
            expect(slab.checkFlag("clipPath")).to.be.true;
        });

    });

    describe("when updating its mask", () => {

        before(() => {
            slab.compile();
            let mask = new SvgarSlab("test-mask");
            Update().svgar.slab(slab).mask.to(mask);
        });

        it("should set the current mask to the declared slab", () => {
            expect(slab.getMask()?.getName()).to.equal("test-mask");
        });

        it("should flag slab mask scope as changed", () => {
            expect(slab.checkFlag("mask")).to.be.true;
        });

    });

});

describe("given a default svgar cube", () => {

    const cube = new SvgarCube("cube");

    describe("when updating its camera by changing the extents", () => {

        before(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentsTo(5, 2, 10, 4);
        });

        it("should allow extents to be set", () => {
            expect(cube.scope.minimum).to.not.include(0);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it("should accurately set the horizontal extents", () => {
            expect(cube.scope.minimum[0]).to.equal(5);
            expect(cube.scope.maximum[0]).to.equal(10);
        });

        it("should accurately set the vertical extents", () => {
            expect(cube.scope.minimum[1]).to.equal(2);
            expect(cube.scope.maximum[1]).to.equal(4);
        });

    });

    describe("when updating its camera by changing the anchor", () => {

        before(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentsTo(0, 0, 10, 10);
            Update().svgar.cube(cube).camera.anchorTo(10, 8);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it("should accurately set the horizontal extents", () => {
            expect(cube.scope.minimum[0]).to.equal(5);
            expect(cube.scope.maximum[0]).to.equal(15);
        });

        it("should accurately set the vertical extents", () => {
            expect(cube.scope.minimum[1]).to.equal(3);
            expect(cube.scope.maximum[1]).to.equal(13);
        });

    });

    describe("when updating the camera by panning", () => {

        before(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentsTo(0, 0, 10, 10);
            Update().svgar.cube(cube).camera.withPan(4.5, 11);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it("should accurately set the horizontal extents", () => {
            expect(cube.scope.minimum[0]).to.equal(4.5);
            expect(cube.scope.maximum[0]).to.equal(14.5);
        });

        it("should accurately set the vertical extents", () => {
            expect(cube.scope.minimum[1]).to.equal(11);
            expect(cube.scope.maximum[1]).to.equal(21);
        });

    });

    describe("when updating the camera by zooming in", () => {

        before(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentsTo(0, 0, 10, 10);
            Update().svgar.cube(cube).camera.withZoom(1.5);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it('should accurately set the horizontal extents', () => {
            expect(cube.scope.minimum[0]).to.equal(1.5);
            expect(cube.scope.maximum[0]).to.equal(8.5);
        });

        it('should accurately set the vertical extents', () => {
            expect(cube.scope.minimum[1]).to.equal(1.5);
            expect(cube.scope.maximum[1]).to.equal(8.5);
        });

        it('should throw an error when asked to zoom in more than possible', () => {
            expect(() => Update().svgar.cube(cube).camera.withZoom(50)).to.throw("Cannot zoom beyond a zero-width camera.");
        });

    });

    describe("when updating its slabs", () => {

        beforeEach(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).slabs.to([]);
        });

        it("should allow slabs to be set in aggregate", () => {
            let slabs: SvgarSlab[] = [
                new SvgarSlab("a"),
                new SvgarSlab("b"),
                new SvgarSlab("c")
            ];

            Update().svgar.cube(cube).slabs.to(slabs);

            expect(cube.slabs.length).to.equal(3);
        });

        it("should allow slabs to be added one at a time", () => {
            let slab = new SvgarSlab("a");

            Update().svgar.cube(cube).slabs.add(slab);

            expect(cube.slabs.length).to.equal(1);
        });

        it("should allow slabs to be added multiple at a time", () => {
            let slabs: SvgarSlab[] = [
                new SvgarSlab("a"),
                new SvgarSlab("b")
            ];

            Update().svgar.cube(cube).slabs.add(slabs);

            expect(cube.slabs.length).to.equal(2);
        });

        it("should allow slabs to be removed by a given filter criteria", () => {
            let slabsTriple: SvgarSlab[] = [
                new SvgarSlab("a"),
                new SvgarSlab("b"),
                new SvgarSlab("c")
            ];

            Update().svgar.cube(cube).slabs.to(slabsTriple);
            Update().svgar.cube(cube).slabs.remove(x => x.getName() == "b");

            expect(cube.slabs.length).to.equal(2);
        });

    });

});