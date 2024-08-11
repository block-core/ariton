import { protocolDefinition as profileDefinition } from './profile';
import { protocolDefinition as communityDefinition } from './community';
import { protocolDefinition as socialDefinition } from './social';
import { protocolDefinition as registryDefinition } from './registry';
import { protocolDefinition as anyoneCollaborateDefinition } from './anyone-collaborate';
import { protocolDefinition as chatDefinition } from './chat';
import { protocolDefinition as freeForAllDefinition } from './free-for-all';
import { protocolDefinition as minimalDefinition } from './minimal';
import { protocolDefinition as messageDefinition } from './message';
import { protocolDefinition as socialGraphDefinition } from './social';

export const credential = {
  format: 'application/vc+jwt',
  friendship: 'FriendshipCredential',
};

export const profile = {
  uri: profileDefinition.protocol,
  definition: profileDefinition,
};

export const social = {
  uri: socialDefinition.protocol,
  definition: socialDefinition,
};

export const registry = {
  uri: registryDefinition.protocol,
  definition: registryDefinition,
};

export const community = {
  uri: communityDefinition.protocol,
  definition: communityDefinition,
};

export const message = {
  uri: messageDefinition.protocol,
  definition: messageDefinition,
};

export const socialGraph = {
  uri: socialGraphDefinition.protocol,
  definition: socialGraphDefinition,
};

export const byUri = {
  [profile.uri]: profile,
  [social.uri]: social,
  [registry.uri]: registry,
  [community.uri]: community,
  [message.uri]: message,
};
