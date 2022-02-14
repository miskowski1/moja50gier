import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../models/game.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  @Input() public index!: number;
  @Input() public game!: Game;
  @Input() public badgeValue!: string;
  @Input() public hasDelete: boolean = true;

  @Output() public removeGame: EventEmitter<number> = new EventEmitter<number>();

}
