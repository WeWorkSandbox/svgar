import { CreateRhinoInstance } from './rhino/CreateRhinoInstance';
import { RhinoLineCurveTemplate } from './rhino/CreateRhinoTemplates';
import { RhinoLineCurveBuilder, RhinoModelBuilder } from './rhino/CreateRhinoBuilders';
import { LineCurve, RhinoModule } from 'rhino3dm';
import { CreateSvgarContext } from './svgar/CreateSvgarContext';

interface CreateContext {
    Rhino: {
        Instance: RhinoModule;
        LineCurve: {
            Builder: RhinoLineCurveBuilder,
            With: (template?: RhinoLineCurveTemplate) => LineCurve;
        },
        Model: {
            Builder: RhinoModelBuilder,
            With: "",
        },
        Point3dList: {
            Builder: "",
            With: "",
        }
    },
    Svgar: {
        NameData: {
            // TODO: Interface for namedata
            With: any,
        }
    }
}

const Create: CreateContext = {
    Rhino: {
        Instance: new CreateRhinoInstance().Rhino,
        LineCurve: {
            Builder: new RhinoLineCurveBuilder(),
            With: new RhinoLineCurveBuilder().Build,
        },
        Model: {
            Builder: new RhinoModelBuilder(),
            With: "",
        },
        Point3dList: {
            Builder: "",
            With: "",
        },
    },
    Svgar: {
        NameData: {
            With: CreateSvgarContext.NameData
        }
    }
}

export default Create;
