import { Component, OnInit, Inject, AfterViewChecked, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit, AfterViewChecked {
    @ViewChild('loginForm') currentForm: NgForm;
    private active = true;
    model: any = {};
    loading = false;
    firstName: string = null;
    private loginForm: NgForm;
    submitted: boolean = false;
    
    /** Using FormBuilder service for form Dynamic form validation  */
    private formErrors = {
        'firstName': '',
        'lastName': '',
        'username': '',
        'password': '',
        'emailid': '',
        'contact': '',
        'address': ''
      };
      private validationMessages = {
        'firstName': {
          'required': 'First Name is required.',
          'pattern': 'First Name must be between 3-12 characters, only uppercase/lowercase letters.'
        },
        'lastName': {
          'required': 'First Name is required.',
          'pattern': 'Last Name must be between 3-12 characters, only uppercase/lowercase letters'
        },
        'username': {
          'required':  'Username is required.',
          'pattern':   'Username must be between 6-12 characters, uppercase/lowercase letters or numbers.'
        },
        'password': {
          'required':  'Password is required.',
          'pattern':   'Passwords must be between 6-12 characters, uppercase/lowercase letters or numbers and must include atleast a special character from [!@#$*], no space'
        },
        'emailid': {
            'required':  'Email Id is required.',
            'pattern':   'Email format should be abc@gmail.com'
        },
        'contact': {
            'required':  'Contact is required.',
            'pattern':   'Contact should be 10 digit'
        },
        'address': {
            'required':  'Address is required.'
        }
      };
      /**
       *
       * @param formBuilder
       * @param router
       * @param userService
       * @param alertService
       */
    constructor( @Inject(FormBuilder) private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { 
            this.submitted=false;
        }
        /**
         *
         */
    ngOnInit(): void {
    }

    ngAfterViewChecked() {
        this.formChanged();
    }

    /**
     * Form Validation
     */
    private formChanged() {
        if (this.currentForm === this.loginForm) { return; }
        this.loginForm = this.currentForm;
        if (this.loginForm) {
          this.loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        }
      }
    
      private onValueChanged(data?: any) {
        if (!this.loginForm) {
          return;
        }
        const form = this.loginForm.form;
        for (let field of Object.keys(this.formErrors)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (let key of Object.keys(control.errors)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    /**
     * Profile creation method
     */
    createProfile() {
         if (this.loginForm.valid) {
              const form = this.loginForm.form;
              this.loading = true;
              this.submitted=true;
              this.userService.create(this.model)
               .subscribe(
                data => {
                     this.alertService.success('Profile Creation successful', true);
                     this.router.navigate(['/login']);
                 }, error => {
                this.alertService.error(error);
                this.loading = false;
                });
        } else {
            console.log("hello");
            alert("hello");
        }
    }
}
