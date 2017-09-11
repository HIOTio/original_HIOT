import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Animations } from "../../animations";
import { MatColors } from "../../matColors";

@Component({
    selector     : "hiot-material-color-picker",
    templateUrl  : "./material-color-picker.component.html",
    styleUrls    : ["./material-color-picker.component.scss"],
    animations   : [Animations.slideInLeft, Animations.slideInRight],
    encapsulation: ViewEncapsulation.None,
})
export class MaterialColorPickerComponent implements OnInit, OnChanges
{
    public colors: any;
    public selectedColor: any;
    public hues: string[];
    public view = "palettes";

     @Input() selectedPalette = "";
   @Input() selectedHue = "";
     @Input() selectedFg = "";
    @Input() value: any;
    @Output() onValueChange = new EventEmitter();
     @Output() selectedPaletteChange = new EventEmitter();
    @Output() selectedHueChange = new EventEmitter();
    @Output() selectedClassChange = new EventEmitter();
   @Output() selectedBgChange = new EventEmitter();
    @Output() selectedFgChange = new EventEmitter();

    public _selectedClass = "";
    @Input()
    set selectedClass(value)
    {
        if ( value && value !== "" && this._selectedClass !== value )
        {
            const color = value.split("-");
            if ( color.length >= 5 )
            {
                this.selectedPalette = color[1] + "-" + color[2];
                this.selectedHue = color[3];
            }
            else
            {
                this.selectedPalette = color[1];
                this.selectedHue = color[2];
            }
        }
        this._selectedClass = value;
    }

    get selectedClass(): string
    {
        return this._selectedClass;
    }

    public _selectedBg = "";
    @Input()
    set selectedBg(value)
    {
        if ( value && value !== "" && this._selectedBg !== value )
        {
            for ( const palette in this.colors )
            {
                if ( !this.colors.hasOwnProperty(palette) )
                {
                    continue;
                }

                for ( const hue of this.hues )
                {
                    if ( this.colors[palette][hue] === value )
                    {
                        this.selectedPalette = palette;
                        this.selectedHue = hue;
                        break;
                    }
                }
            }
        }
        this._selectedBg = value;
    }

    get selectedBg(): string
    {
        return this._selectedBg;
    }

    constructor()
    {
        this.colors = MatColors.all;
        this.hues = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "A100", "A200", "A400", "A700"];
    }

    public ngOnInit()
    {

    }

    public selectPalette(palette)
    {
        this.selectedPalette = palette;
        this.updateSelectedColor();
        this.view = "hues";
    }

    public selectHue(hue)
    {
        this.selectedHue = hue;
        this.updateSelectedColor();
    }

    public removeColor()
    {
        this.selectedPalette = "";
        this.selectedHue = "";
        this.updateSelectedColor();
    }

    public updateSelectedColor()
    {
        setTimeout(() => {

            if ( this.selectedColor && this.selectedPalette === this.selectedColor.palette && this.selectedHue === this.selectedColor.hue )
            {
                return;
            }

            if ( this.selectedPalette !== "" && this.selectedHue !== "" )
            {
                this.selectedBg = MatColors.getColor(this.selectedPalette)[this.selectedHue];
                this.selectedFg = MatColors.getColor(this.selectedPalette).contrast[this.selectedHue];
                this.selectedClass = "md-" + this.selectedPalette + "-" + this.selectedHue + "-bg";
            }
            else
            {
                this.selectedBg = "";
                this.selectedFg = "";
            }

            this.selectedColor = {
                palette: this.selectedPalette,
                hue    : this.selectedHue,
                class  : this.selectedClass,
                bg     : this.selectedBg,
                fg     : this.selectedFg,
            };

            this.selectedPaletteChange.emit(this.selectedPalette);
            this.selectedHueChange.emit(this.selectedHue);
            this.selectedClassChange.emit(this.selectedClass);
            this.selectedBgChange.emit(this.selectedBg);
            this.selectedFgChange.emit(this.selectedFg);

            this.value = this.selectedColor;
            this.onValueChange.emit(this.selectedColor);
        });
    }

    public backToPaletteSelection()
    {
        this.view = "palettes";
    }

    public onMenuOpen()
    {
        if ( this.selectedPalette === "" )
        {
            this.view = "palettes";
        }
        else
        {
            this.view = "hues";
        }
    }

    public ngOnChanges(changes: any)
    {
        if ( changes.selectedBg && changes.selectedBg.currentValue === "" ||
            changes.selectedClass && changes.selectedClass.currentValue === "" ||
            changes.selectedPalette && changes.selectedPalette.currentValue === "" )
        {
            this.removeColor();
            return;
        }
        if ( changes.selectedPalette || changes.selectedHue || changes.selectedClass || changes.selectedBg )
        {
            this.updateSelectedColor();
        }
    }
}
