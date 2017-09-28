import {Room} from "./room";

export interface Building {
  key: string;
  name: string;
  img: string;
  rooms: Room[];
  coordinates: {x: number, y: number};
}
