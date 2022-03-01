import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, fromEvent, merge, Observable, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { GlobalGenericValidator } from 'src/app/shared/global-generic-validator';
import { IHotel } from 'src/app/shared/models/hotel';
import { NumberValidators } from 'src/app/shared/number-validators';
import { HotelService } from '../hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {


//Manipulation des formulaires en lisant la reference 
//et recupere par une variable de type ElementRef[]

@ViewChildren(FormControlName, { read: ElementRef }) inputElements: ElementRef[];

  public hotelForm: FormGroup;
  public hotel: IHotel;
  public pageTitle: string;
  public errorMessage: string;
  public formErrors: { [key: string]: string } = {};
  
  private validationMessages: { [key: string]: { [key: string]: string } } = 
  {
    
    hotelName: {
      required: 'Le nom de l\'hotel est obligatoire',
      minlength: 'Le nom de l\'hotel doit comporter au moins 4 caractères'
    },
    price: {
      required: 'Le prix de l\'hotel est obligatoire',
      pattern: 'Le prix de l\'hotel doit etre un nombre'
    },
    rating: {
      range: 'Donnez une note comprise entre 1 et 5'
    }

  };

  private globalGenericValidator: GlobalGenericValidator;

  private isFormSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {

    this.globalGenericValidator=new GlobalGenericValidator(this.validationMessages)

    this.hotelForm = this.fb.group({
      hotelName: ['',[Validators.required, Validators.minLength(4)]],
      price: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      rating: ['', NumberValidators.range(1, 5)],
      description: [''],
      tags: this.fb.array([])
    });
    //recuperation de l'id 

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.getSelectedHotel(id);
    });
  }

  ngAfterViewInit() {

    const formControlBlurs: Observable<unknown>[] = this.inputElements
    
    .map((formElementRef:ElementRef)=> fromEvent(formElementRef.nativeElement,'blur'))


 merge(this.hotelForm.valueChanges,...formControlBlurs).pipe(

  debounce(()=> this.isFormSubmitted ? EMPTY : timer(800)) 
 )
.subscribe(() => {

 this.formErrors=this.globalGenericValidator.createErrorMessage(this.hotelForm,this.isFormSubmitted)
        console.log('errors: ', this.formErrors);
      });
  }
//suppression de la bande affichant lerreur 
  public hideError(): void {
    this.errorMessage = null;
  }

  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTags(): void {
    this.tags.push(new FormControl());
  }

  public deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }


  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe((hotel: IHotel) => {
      this.displayHotel(hotel);
    });
  }


  //cette fonction permet dafficher 
  //les valeur de chaque formulaire

  public displayHotel(hotel: IHotel): void {

    this.hotel=hotel ;

    if(hotel.id===0)

    {
      this.pageTitle='Creer un hotel';
    }

    else
    {

      this.pageTitle =`Modifier lhotel ${this.hotel.hotelName}`
    }

    //Acces sur les formulaires pour recuperer les valeurs 
    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description,
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
  }

  public saveHotel(): void {
    this.isFormSubmitted = true;

    this.hotelForm.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true
    });
    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {

        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value
        };

        if (hotel.id === 0) {
          this.hotelService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        } else {
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        }

      }
    } else {
      this.errorMessage = 'Corrigez les erreurs svp'
    }
    console.log(this.hotelForm.value);
  }

  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/list']);
  }

  public deleteHotel(): void {
    if (confirm(`Voulez-vous réelement supprimer ${this.hotel.hotelName}?`)) {
      this.hotelService.deleteHotel(this.hotel.id).subscribe({
        next: () => this.saveCompleted()
      });
    }
  }
}
