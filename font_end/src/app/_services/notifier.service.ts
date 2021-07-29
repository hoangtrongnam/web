import { Injectable } from "@angular/core";

declare var $: any;

@Injectable({ providedIn: 'root' })
export class NotifierService {

    info(heading, text) {
        $.toast({
            heading: heading,
            text: text,
            position: 'bottom-right',
            loaderBg:'#ff6849',
            icon: 'info',
            hideAfter: 3000, 
            stack: 6
            
      });
        
    }

    warning(heading, text) {
        $.toast({
            heading: heading,
            text: text,
            position: 'bottom-right',
            loaderBg:'#ff6849',
            icon: 'warning',
            hideAfter: 3000, 
            stack: 6,

      });
    }

    success(heading, text) {
        $.toast({
            heading: heading,
            text: text,
            position: 'bottom-right',
            loaderBg:'#ff6849',
            icon: 'success',
            hideAfter: 3000, 
            stack: 6
          });
    }

    error(heading, text) {
        $.toast({
            heading: heading,
            text: text,
            position: 'bottom-right',
            loaderBg:'#ff6849',
            icon: 'error',
            hideAfter: 3000, 
            stack: 6
          });
    }
}