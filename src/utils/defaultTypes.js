import { constants } from './constants'

export function getDefaultTypes () {
  var defaultTypes = {}
  defaultTypes[constants.BOT_TYPE] = Object.assign({}, DEFAULT_BOT_TYPE)
  defaultTypes[constants.ATTACK_TYPE] = Object.assign({}, DEFAULT_ATTACK_TYPE)
  defaultTypes[constants.ITEM_TYPE] = Object.assign({}, DEFAULT_ITEM_TYPE)
  defaultTypes[constants.TERRAIN_TYPE] = Object.assign({}, DEFAULT_TERRAIN_TYPE)
  defaultTypes[constants.MOVE_TYPE] = Object.assign({}, DEFAULT_MOVE_TYPE)
  return defaultTypes
}

const DEFAULT_BOT_TYPE = {
  name: "",
  attackTypeIDs: [],
  moveTypeIDs: [],
  canSpawn: false,
  canBeSpawned: true,
  spawnDelay: 1,
  maxHealth: 100,
  canHeal: false,
  moveDelayFactor: 1,
  damageFactor: 1,
  attackDelayFactor: 1,
  rangeFactor: 1,
  accuracyFactor: 1,
  spawnDelayFactor: 1,
  iconData: null,
  loading: false,
}

const DEFAULT_ITEM_TYPE = {
  name: "",
  moveDelayFactor: 1,
  damageFactor: 1,
  attackDelayFactor: 1,
  rangeFactor: 1,
  accuracyFactor: 1,
  spawnDelayFactor: 1,
  iconData: null,
  loading: false,
}

const DEFAULT_ATTACK_TYPE = {
  name: "",
  damage: 5,
  delay: 1,
  range: 25,
  accuracy: 1,
  attackDelayDealt: 0,
  moveDelayDealt: 0,
  iconData: null,
  loading: false,
}

const DEFAULT_TERRAIN_TYPE = {
  name: "",
  canBeOccupied: true,
  moveDelayFactor: 1,
  damagePenalty: 0,
  iconData: null,
  loading: false,
}

const DEFAULT_MOVE_TYPE = {
  name: "",
  delay: 1,
  takesDelayFromTerrain: true,
  loading: false,
}
