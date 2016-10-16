import { LOCATION_INFO_IDS, TYPE_KEYS } from './constants'

export function IDToModel(ID, entities) {
  if (ID == null) return null
  for (var i in entities) {
    if (entities[i].ID == ID) return entities[i]
  }
  return null
}

export function TypesIDToLocInfoID(typeID) {
  switch(typeID){
    case TYPE_KEYS.BOT_TYPES:
      return LOCATION_INFO_IDS.BOT
    case TYPE_KEYS.ITEM_TYPES:
      return LOCATION_INFO_IDS.ITEM
    case TYPE_KEYS.TERRAIN_TYPES:
      return LOCATION_INFO_IDS.TERRAIN
  }
}

export function LocInfoIDToTypesID(locInfoID) {
  return `${locInfoID}Types`
}

export function CreateUrl(route) {
  return `${__SERVER_URL__}/console/${route}`
}
