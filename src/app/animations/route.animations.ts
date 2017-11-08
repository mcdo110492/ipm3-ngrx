import { trigger, state, animate, transition, style, animateChild, query } from '@angular/animations';

export const routeAnimation =
    trigger('routeAnimation', [
        transition('* => login', [
            query(':enter', 
            [
                style({  opacity: 0 })
            ], 
            { optional: true }
            ),
            query(':enter', 
                [
                    style({ opacity: 0}),
                    animate('.5s', style({ opacity: 1 }))
                ], 
                { optional: true }
            ),
            
            ]),
        transition('login => *', [
            query(':enter', [
                style({ opacity :1 })
            ], { optional : true })
           
        ]),
        transition('* <=> *', [
            // Initial state of new route
            query(':enter',[
                style({
                position: 'absolute',
                width:'100%',
                transform: 'translateX(100%)'
                }), 
                animateChild()],
                {optional:true}),
            // move page off screen right on leave
            query(':leave',[
                animate('500ms ease',
                style({
                    position: 'absolute',
                    width:'100%',
                    transform: 'translateX(-110%)'
                })
                ), animateChild()],
            {optional:true}),
            // move page in screen from left to right
            query(':enter',[
                animate('500ms ease',
                style({
                    opacity: 1,
                    transform: 'translateX(0%)'
                })
                ),
                animateChild()],
            {optional:true}),
        ])
       
  ])

