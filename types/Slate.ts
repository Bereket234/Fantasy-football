import { Player } from "./Player";

export interface Slate {
    _id: string;
    operator: string;
    operatorGameType: string;
    operatorName: string;
    dfsSlatePlayers: Player[];
}
