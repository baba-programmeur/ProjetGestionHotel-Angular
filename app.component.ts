import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, from, interval, Observable, of, Subscriber, Subscription } from 'rxjs';

import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

title ='Gestion dhotels'

  ngOnDestroy(): void {
this.subscription.unsubscribe();
  }

  subscription:Subscription=new Subscription() ;

  ngOnInit() {

    const observer=
    {
      next:(item:unknown) => console.log(`prochain element ${item}`),

     error:(error:unknown)=> console.log(`erreur ${error}`),

     complete:() => console.log("Bien complete")

    };

  const strem=new Observable(obs =>
    {
      obs.next('boite 1'),
      obs.next('boite 2')
      obs.next("boite 3")
      //la fonction complete permet apres le renvoie de ces 3 elements d'arreter la 
      //chaine 
      obs.complete();

    });

      const subscription=strem.subscribe
      (

      item =>console.log(`Prochain element ${item}`),
      
      err => console.log(`erreur ${err}`),

      () =>  console.log("Bien complete")

    )

//je me souscris a lobserval delivre par la fntion observable

//la fonction map recupere chaque element de la source 
//et fait un traitement la dessus 

    of(10,4,6,10,8,11).pipe(

      map((facteur:number)=>
      {
            if(facteur==0)
            {
              throw new Error('erreur sur  zero')
            }
            else
            return facteur*2
      }
      ),
      //la fonction take prendra les 3 premiers elements de notre pipeline 
      //ainsi on aura pas a se desinscrire de lobservable 
      take(3)
      )
   . subscribe(vue => console.log(`valeur: ${vue}`));

    from (['b1','b2','b3'])
    .subscribe(
      item => console.log(`${item}`),
      erreur => console.log(`${erreur}`),
      () => console.log("terminé")
    )


    of(2,5,8,10,11,14).pipe(
      
      tap(x =>console.log(x)),
      map(x => x*2),
      tap(x => console.log(x))

    ).subscribe(console.log)

of(2,3,0 ,5).pipe(

  map((fact:number)=> fact*3),

  filter(fact => fact !=0 )

).subscribe(console.log)




    }


public startDelivringSeconds()
{

  this.subscription.add(interval(1000).subscribe(

     values => console.log("nombre de secondes ", values),

     error => console.log("oups", error),

     () =>  console.log("termine")
  ));

  this.subscription.add(interval(3000).subscribe(

    values => console.warn("nombre de secondes ", values),

    error => console.log("oups", error),

    () =>  console.log("termine")
 ))
}
  public stop ()
  {

    this.subscription.unsubscribe()
  }
}

