// features/worlds/index.ts
const { setWorldConstructor } = require('cucumber');
const CommunityComponent = require('../../src/community_component');
setWorldConstructor(CommunityComponent);