import { sprintf } from 'sprintf-js'

console.log("__PROD__", __PROD__)
// console.log("__MINIKUBE_IP__", __MINIKUBE_IP__)
// console.log(`lol ${__MINIKUBE_IP__}`);

// let storageUrl =  sprintf("http://%s:31002", __MINIKUBE_IP__)
let storageUrl = "http://192.168.99.100:31002"
if (__PROD__) {
  storageUrl =  "http://storage.googleapis.com/codegp"
}

console.log(storageUrl)

export const STORAGE_URL = storageUrl

const BOT = 'bot'
const TERRAIN = 'terrain'
const ITEM = 'item'

const GAME_TYPE = 'gameType'
const BOT_TYPE = 'botType'
const ATTACK_TYPE = 'attackType'
const ITEM_TYPE = 'itemType'
const TERRAIN_TYPE = 'terrainType'
const MOVE_TYPE = 'moveType'

const GAME_TYPES = sprintf('%ss', GAME_TYPE)
const BOT_TYPES = sprintf('%ss', BOT_TYPE)
const ATTACK_TYPES = sprintf('%ss', ATTACK_TYPE)
const ITEM_TYPES = sprintf('%ss', ITEM_TYPE)
const TERRAIN_TYPES = sprintf('%ss', TERRAIN_TYPE)
const MOVE_TYPES = sprintf('%ss', MOVE_TYPE)

export const LOCATION_INFO_IDS = {
  BOT,
  TERRAIN,
  ITEM,
}
export const TYPE_KEYS = {
  BOT_TYPES,
  ITEM_TYPES,
  TERRAIN_TYPES,
}

const API_FUNCS = [
  'me',
  'canMove',
  'move',
  'canSpawn',
  'spawn',
  'canAttack',
  'attack',
  'botAtLocation'
]
// Types the game type creator needs to choose from
const GAME_TYPE_TYPES = [
  BOT_TYPES,
  ITEM_TYPES,
  TERRAIN_TYPES,
]

// user creatable types
export const CREATABLE_TYPES = [
  ATTACK_TYPE,
  BOT_TYPE,
  ITEM_TYPE,
  TERRAIN_TYPE,
  MOVE_TYPE,
]

export const LANGUAGES = [
  "go"
]

export const constants = {
  GAME_TYPE,
  BOT_TYPE,
  ATTACK_TYPE,
  ITEM_TYPE,
  TERRAIN_TYPE,
  MOVE_TYPE,
  GAME_TYPES,
  BOT_TYPES,
  ATTACK_TYPES,
  ITEM_TYPES,
  TERRAIN_TYPES,
  MOVE_TYPES,
  API_FUNCS,
  GAME_TYPE_TYPES,
  CREATABLE_TYPES,
}
