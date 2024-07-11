import { protocolDefinition as profileDefinition } from './profile';
import { protocolDefinition as socialDefinition } from './social';
import { protocolDefinition as anyoneCollaborateDefinition } from './anyone-collaborate';
import { protocolDefinition as chatDefinition } from './chat';
import { protocolDefinition as freeForAllDefinition } from './free-for-all';
import { protocolDefinition as minimalDefinition } from './minimal';
import { protocolDefinition as messageDefinition } from './message';

export const profile = {
  uri: profileDefinition.protocol,
  definition: profileDefinition,
};

export const social = {
  uri: socialDefinition.protocol,
  definition: socialDefinition,
};

export const byUri = {
  [profileDefinition.protocol]: profile,
  [socialDefinition.protocol]: social,
};
