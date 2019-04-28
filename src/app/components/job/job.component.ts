import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => JobComponent),
    }
  ]
})
export class JobComponent implements ControlValueAccessor {
  @Input() name: string;

  expanded = false;
  selected = false;

  constructor() { }

  onChange: (value: boolean) => void;
  onTouched: () => void;
  isDisabled = false;

  writeValue(value: boolean): void {
    this.selected = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
