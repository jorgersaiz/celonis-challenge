import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Input, model, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chip',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {

  @Input() optionList: string[] = [];
  @Output() filterHeroEvent = new EventEmitter <string[]>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentOption = model('');
  readonly selectedOptions: WritableSignal<string[]> = signal([]);
  
  readonly filteredOptions = computed(() => {
    const currentOption = this.currentOption().toLowerCase();
    return currentOption
      ? this.optionList.filter(option => option.toLowerCase().includes(currentOption))
      : this.optionList.slice();
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.addValue(value);
  }

  remove(option: string): void {
    this.selectedOptions.update(selectedOptions => {
      const index = selectedOptions.indexOf(option);
      if (index < 0) {
        return selectedOptions;
      }

      selectedOptions.splice(index, 1);
      this.filterHeroEvent.emit([...selectedOptions]);
      return [...selectedOptions];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addValue(event.option.viewValue)
    event.option.deselect();
  }

  private addValue (value: string) {
    this.selectedOptions.update(selectedOptions => {
      
      if(!selectedOptions.includes(value)){
        this.filterHeroEvent.emit([...selectedOptions, value]);
        return [...selectedOptions, value]
      } else return selectedOptions;
      
    });
    this.currentOption.set('');
  }
}
