const ROOT = '';

const HOME = `${ROOT}/`;

const LOGIN = `${ROOT}/auth/login`;

const GAME_ROOT = `${ROOT}/games`;
const GAME_ROOM_CREATE = `${GAME_ROOT}/create`;
const GAME_ROOM_ID = `${GAME_ROOT}/:id`;

const routes = {
  GAME_ROOM_CREATE,
  GAME_ROOM_ID,
  HOME,
  LOGIN,
};

export default routes;
