import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { AvatarComponent } from '../../profile/edit/avatar/avatar.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../identity.service';
import { ProfileService } from '../../profile.service';
import { Router, RouterModule } from '@angular/router';
import { NavigationService } from '../../navigation.service';
import { profile } from '../../../protocols';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { LayoutService } from '../../layout.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AgreementDialogComponent } from './agreement-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { PricingService } from '../../pricing.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatSelectModule,
    AvatarComponent,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatButtonToggleModule,
    RouterModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private fb = inject(FormBuilder);

  identity = inject(IdentityService);

  profileService = inject(ProfileService);

  navigation = inject(NavigationService);

  pricing = inject(PricingService);

  router = inject(Router);

  data = signal<any>({});

  @ViewChild('stepper') stepper!: MatStepper;

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    premiumPeriod: ['monthly'],
    option: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
    name: [null, Validators.required],
    type: [null, Validators.required],
    // title: [null],
    // status: [null],
    bio: [null],
    // location: [null],
    avatar: [''],
    owners: this.fb.array([this.fb.control('')]),
    fee: [1, Validators.required],
    members: [20, Validators.required],
    membershipType: ['paid'],
  });

  thirdFormGroup = this._formBuilder.group({
    acceptTerms: ['', Validators.requiredTrue],
  });

  fourthFormGroup = this._formBuilder.group({
    paymentMethod: ['ln'],
  });

  goToNextStep() {
    this.stepper.next();
  }

  paid = false;
  paymentStatus = 'Pending...';

  async checkPayment() {
    const result = await fetch(`https://pay.ariton.app/paid?hash=${this.hash}`);

    if (result.ok) {
      const json = await result.json();

      console.log('RESULT FROM PAID:', json);

      if (json.paid) {
        console.log('Payment is paid');
        this.paymentStatus = 'Paid';
        this.paid = true;
      } else {
        console.log('Payment is not paid');
        this.paymentStatus = 'Not Paid';
      }
    } else {
      console.error('Failed to validate invoice');
      this.paymentStatus = result.statusText;
    }
  }

  checkPaymentStatus = async () => {
    if (this.paid) {
      console.log('Payment status is paid.');
    } else {
      await this.checkPayment();
      this.scheduleNextCheck();
    }
  };

  scheduleNextCheck = () => {
    setTimeout(this.checkPaymentStatus, 2000);
  };

  async generateInvoice() {
    this.invoice = '';

    const result = await fetch('https://pay.ariton.app/invoice?description=Community%20Payment&amount=1000&id=123');

    if (result.ok) {
      const json = await result.json();
      this.invoice = json.serialized;
      this.hash = json.paymentHash;
      this.amount = json.amountSat;

      const canvas = document.querySelector('canvas');
      QRCode.toCanvas(canvas, this.invoice, (error: any) => {
        if (error) {
          console.error('Error generating QR code: ', error);
        }
      });

      // Schedule interval to check payment status
      this.scheduleNextCheck();
    } else {
      console.error('Failed to generate invoice');
      this.invoice = result.statusText;
    }
  }

  amount = 0;
  hash = '';
  invoice = '';

  resetFee() {
    if (this.secondFormGroup.controls.membershipType.value !== 'paid') {
      this.secondFormGroup.controls.fee.setValue(1);
    }
  }

  save() {
    this.saved = true;

    this.generateInvoice();
  }

  premiumPeriod = 'monthly';

  saved = false;

  layout = inject(LayoutService);

  deleteRequest() {}

  // form = this.fb.group({
  //   name: [null, Validators.required],
  //   type: [null, Validators.required],
  //   title: [null],
  //   status: [null],
  //   bio: [null],
  //   location: [null],
  //   avatar: [''],
  //   owners: this.fb.array([this.fb.control('')]),
  // });

  communityTypes = [
    {
      type: 'general',
      name: 'General',
    },
    {
      type: 'power',
      name: 'Power Structure',
    },
    {
      type: 'company',
      name: 'Company Structure',
    },
  ];

  get owners() {
    return this.secondFormGroup.get('owners') as FormArray;
  }

  get fee() {
    const ctrl = this.secondFormGroup.get('fee') as FormControl;
    return Math.round(ctrl.value * 0.7) as number;
  }

  get earnings() {
    const ctrl = this.secondFormGroup.get('fee') as FormControl;
    const ctrlMembers = this.secondFormGroup.get('members') as FormControl;
    return Math.round(ctrl.value * 0.7 * ctrlMembers.value) as number;
  }

  get costs() {
    const ctrl = this.secondFormGroup.get('fee') as FormControl;
    const ctrlMembers = this.secondFormGroup.get('members') as FormControl;
    return Math.round(ctrl.value * ctrlMembers.value) as number;
  }

  maxFee = 10;

  back() {
    this.navigation.back();
  }

  dialog = inject(MatDialog);

  openAgreement() {
    const dialogRef = this.dialog.open(AgreementDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    // const dialogRef = this.dialog.open(AgreementDialogComponent, {
    //   maxWidth: '80vw',
    //   maxHeight: '80vh',
    //   data: {},
    // });
  }

  optionLevel = 'basic';
  optionAnnual = false;
  costLevel: any;

  chooseOption(option: string) {
    console.log('Option:', option);

    this.firstFormGroup.patchValue({
      option: option,
    });

    const optionLevel = option?.split('-');
    this.optionLevel = optionLevel[1];
    this.optionAnnual = optionLevel[0] === 'annual';

    const costLevel = this.pricing.levels[option];
    this.costLevel = costLevel;

    // if (optionLevel === 'premium') {
    //   if (this.optionAnnual) {
    //     this.hostLevelCost = 450;
    //   } else {
    //     this.hostLevelCost = 500;
    //   }

    //   this.maxFee = 1000;
    // } else if (optionLevel === 'standard') {
    //   if (this.optionAnnual) {
    //     this.hostLevelCost = 280;
    //   } else {
    //     this.hostLevelCost = 300;
    //   }
    //   this.maxFee = 100;
    // } else {
    //   if (this.optionAnnual) {
    //     this.hostLevelCost = 190;
    //   } else {
    //     this.hostLevelCost = 200;
    //   }
    //   this.maxFee = 1000;
    // }

    this.goToNextStep();
  }

  updateForm(profile: any) {
    console.log('Patching form with:', profile);

    this.secondFormGroup.patchValue({
      name: profile.name,
      // title: profile.title,
      bio: profile.bio,
      // status: profile.status,
      // location: profile.location,
      // birthDate: profile.birthDate,
      // avatar: profile.avatar,
      // hero: profile.hero,
    });

    // this.links.clear();
    // profile.links.forEach((link) => this.links.push(this.fb.control(link)));
  }

  addOwner() {
    this.owners.push(this.fb.control(''));
  }

  removeOwner(index: number) {
    this.owners.removeAt(index);
  }

  constructor() {
    this.costLevel = this.pricing.levels['monthly-basic'];

    effect(async () => {
      if (this.identity.initialized()) {
        // Set the initial owner to current user.
        console.log(this.owners);
        this.owners.setValue([this.identity.did]);
      }
    });
  }

  ngOnInit() {}

  async onSubmit() {
    // Don't do anything on submit, just redirect to community page.
    // const formData = {
    //   name: this.form.value.name,
    //   title: this.form.value.title,
    //   bio: this.form.value.bio,
    //   status: this.form.value.status,
    //   location: this.form.value.location,
    // };

    // // If record exists, update it.
    // if (this.data().record) {
    //   const { status, record } = await this.data().record.update({
    //     published: true,
    //     data: formData,
    //   });

    //   console.log('Update profile status:', status, record);
    // } else {
    //   const { status, record } = await this.identity.web5.dwn.records.create({
    //     data: formData,
    //     message: {
    //       // published: true, /* published ignores the protocol permissions. */
    //       protocol: profile.uri,
    //       protocolPath: 'profile',
    //       dataFormat: 'application/json',
    //     },
    //   });

    //   console.log('Save profile status:', status, record);
    // }

    // // TODO: Check if the avatar has changed before uploading. Don't upload if it hasn't.
    // await this.upload(this.form.controls.avatar.value, this.data().avatarRecord);

    this.router.navigate(['/community', this.identity.did]);
  }

  async upload(imageBase64: any, record: any) {
    if (!imageBase64) {
      console.log('No image to upload.');
      return;
    }

    console.log(record);
    // const blob = new Blob(event.currentTarget.files, { type: 'image/png' });
    if (record) {
      console.log('UPDATING IMAGE!!!!');
      const { status, updatedRecord } = await record.update({
        published: true,
        data: imageBase64,
      });

      console.log('Update profile status:', status, updatedRecord);
      return updatedRecord;
    } else {
      const { record } = await this.identity.web5.dwn.records.create({
        data: imageBase64,
        message: {
          protocol: profile.uri,
          protocolPath: 'avatar',
          dataFormat: 'image/jpeg',
          tags: {
            module: 'community',
          },
        },
      });

      return record;
    }
  }
}
