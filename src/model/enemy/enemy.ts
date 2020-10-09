import { Action } from "controller/actions/Action";
import { Monster } from "model/Monster";

export abstract class Enemy extends Monster {
    abstract aiAction: () => Action;

}