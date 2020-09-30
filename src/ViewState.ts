import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import { Skill } from 'controller/skills/Skill';
import { ActionSelectionEvent } from 'controller/events/ActionSelectionEvent';
import { TilePosition } from 'model/TilePosition';

export class ViewState {
  private static _mousePosition : TilePosition = undefined;
  private static _selectedAction : Skill = undefined;

  static get mousePosition() {
    return this._mousePosition;
  }

  static set mousePosition(position: TilePosition) {
    this._mousePosition = position;
    MouseHoverEvent.dispatch(position);
  }

  static get selectedAction() {
    return this._selectedAction;
  }

  static set selectedAction(skill: Skill) {
    this._selectedAction = skill;
    ActionSelectionEvent.dispatch(skill);
  }


}
