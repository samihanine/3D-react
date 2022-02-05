import Delivery from './Delivery';
import Tractor from './Tractor';
import Race from './Race';
import Taxi from './Taxi';
import Tree1 from './Tree1';
import Tree2 from './Tree2';
import DeliveryFlat from './DeliveryFlat';
import Road from './Road';
import Grass from './Grass';

const models = {
    'delivery': <Delivery />,
    'race': <Race />,
    'road': <Road />,
    'taxi': <Taxi />,
    'tractor': <Tractor />,
    'tree1': <Tree1 />,
    'tree2': <Tree2 />,
    'delivery_flat': <DeliveryFlat />,
    'grass': <Grass />
}

export default models;