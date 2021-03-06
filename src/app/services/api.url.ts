const dev = 'http://localhost:8080';
export const GET_ALL_WAREHOUSES = {method: 'GET', url: dev + '/warehouses/getAll', arguments: 0};
export const ADD_WAREHOUSE = {method: 'POST', url: dev + '/warehouses/new', arguments: 0};
export const UPDATE_WAREHOUSE = {method: 'POST', url: dev + '/warehouses//update/', arguments: 1};
export const GET_ALL_COMPONENTS = {method: 'GET', url: dev + '/components/getAll', arguments: 0};
export const GET_MAIN_COMPONENTS = {method: 'GET', url: dev + '/components/getMainRecords', arguments: 0};
export const GET_ALL_PARENTS = {method: 'GET', url: dev + '/components/getAllParents', arguments: 1};
export const GET_PIECE_QUANTITY = {method: 'GET', url: dev + '/stock/getPieceQuantity', arguments: 0};
export const GET_COMPONENT_BY_NAME = {method: 'GET', url: dev + '/components/getByName', arguments: 1};
export const GET_STOCK = {method: 'GET', url: dev + '/stock/getStockViewAll', arguments: 0};
export const GET_MAX = {method: 'GET', url: dev + '/stock/getMaxtodo', arguments: 0};
export const UPDATE_STOCK_LIST = {method: 'PUT', url: dev + '/stock/update/list', arguments: 0};
export const ADD_STOCK = {method: 'POST', url: dev + '/stock/new', arguments: 3};
export const GET_STOCK_ALL = {method: 'GET', url: dev + '/stock/getAll', arguments: 0};
export const GET_STOCK_ALLV2 = {method: 'GET', url: dev + '/stock/getAll', arguments: 0};
export const GET_ROLLER_MAX = {method: 'GET', url: dev + '/stock/getRollerStockView', arguments: 0};
export const GET_STOCK_BY_COMPONENT = {method: 'GET', url: dev + '/stock/getByComponent', arguments: 1};
export const UPLOAD_FILES =  {method: 'PUT', url: dev + '/api/upload/files', arguments: 1};
export const UPLOAD_FILE = {method: 'PUT', url: dev + '/api/upload/file', arguments: 1};
export const DOWNLOAD_STOCK_FILE = {method: 'GET', url: dev + '/api/download/stock', arguments: 1};
export const ADD_COMPONENT = {method: 'POST', url: dev + '/components/new', arguments: 0};
export const UPDATE_COMPONENT = {method: 'POST', url: dev + '/components/update', arguments: 1};
export const ADD_CHILD_COMPONENT = {method: 'POST', url: dev + '/components/addChild/', arguments: 3};
export const DELETE_CHILD_COMPONENT = {method: 'DELETE', url: dev + '/components/delete/', arguments: 2};
export const GET_FREE_COMPONENT = {method: 'GET', url: dev + '/components/getStockFree', arguments: 0};
export const DELETE_STOCK = {method: 'DELETE', url: dev + '/stock/delete', arguments: 2};
export const GET_RECORDS = {method: 'GET', url: dev + '/records/getByInterval', arguments: 2};
export const GET_COMP_QUANTITY = {method: 'GET', url: dev + '/components/getChildQuantity', arguments: 1};
