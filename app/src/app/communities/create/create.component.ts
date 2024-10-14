import { Component, effect, HostListener, inject, OnDestroy, signal, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { AppService } from '../../app.service';
import { DataService } from '../../data.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
export class CreateComponent implements OnDestroy {
  private fb = inject(FormBuilder);

  identity = inject(IdentityService);

  profileService = inject(ProfileService);

  navigation = inject(NavigationService);

  pricing = inject(PricingService);

  router = inject(Router);

  data = inject(DataService);

  // data = signal<any>({});

  route = inject(ActivatedRoute);

  app = inject(AppService);

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

  bitcoinPriceUsd = 0;

  async updateBitcoinPrice() {
    const result = await fetch('https://pay.ariton.app/price');

    if (result.ok) {
      const json = await result.json();
      this.bitcoinPriceUsd = json.usd;
      console.log('bitcoinPriceUsd', this.bitcoinPriceUsd);
    }
  }

  draftDeleted = false;

  async deleteDraft() {
    console.log('DELETE DRAFT:', this.draftEntry);
    await this.data.delete(this.draftEntry.record);
    this.draftEntry = undefined;
    this.draftDeleted = true;
    this.router.navigate(['/communities']);
  }

  getPriceInSatoshis(usd: number): number {
    const satoshisPerBitcoin = 100_000_000;
    const satoshis = (usd / this.bitcoinPriceUsd) * satoshisPerBitcoin;
    return Math.round(satoshis);
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

  async onStepChange(event: StepperSelectionEvent) {
    console.log('Selected step index:', event.selectedIndex);
    console.log('Previously selected step index:', event.previouslySelectedIndex);

    // Every time the stepper changes and if the name is valid, we will persist the draft.
    await this.saveDraft();
  }

  // TODO: Add this to app level to perhaps same draft data.
  @HostListener('window:beforeunload')
  async handleUnloadEvent() {
    await this.saveDraft();
  }

  async ngOnDestroy() {
    await this.saveDraft();
  }

  async saveDraft() {
    if (this.draftDeleted) {
      return;
    }

    // Do not persist draft if no name.
    if (!this.secondFormGroup.controls.name.value) {
      return;
    }

    if (this.draftEntry) {
      const mergedData = {
        ...this.draftEntry.data,
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
      };

      // this.draftEntry.data = mergedData;
      console.log('DRAFT ENTRY UPDATE:', this.draftEntry);

      this.draftEntry = await this.data.update(this.draftEntry.record, mergedData, {
        type: 'community',
        status: 'draft',
      });

      // this.draftEntry.data = [...this.secondFormGroup.value, ...this.firstFormGroup.value];
    } else {
      const mergedData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
      };

      this.draftEntry = await this.data.save(mergedData, { type: 'community', status: 'draft' });
    }

    console.log('SAVE DRAFT DONE!');
  }

  async generateInvoice() {
    await this.updateBitcoinPrice();

    let satoshis = 0;

    if (this.costLevel.annual) {
      satoshis = this.getPriceInSatoshis(this.costLevel.cost * 12);
    } else {
      satoshis = this.getPriceInSatoshis(this.costLevel.cost);
    }

    // TODO: Change before production, this is for tipping/demo mode.
    satoshis = Math.round(satoshis / 30);

    this.invoice = '';

    const result = await fetch(
      `https://pay.ariton.app/invoice?description=Ariton%20Community%20Payment&amount=${satoshis}&id=123`,
    );

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

  async chooseOption(option: string) {
    console.log('Option:', option);

    this.firstFormGroup.patchValue({
      option: option,
    });

    const optionLevel = option?.split('-');
    this.optionLevel = optionLevel[1];
    this.optionAnnual = optionLevel[0] === 'annual';

    const costLevel = this.pricing.levels[option];
    this.costLevel = costLevel;

    await this.updateBitcoinPrice();

    this.costLevel.sats = this.getPriceInSatoshis(costLevel.cost);

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

  // selectedCommunity = signal<string>('');
  selectedCommunity = signal<string | null>(null);

  draftEntry: any;

  constructor() {
    this.costLevel = this.pricing.levels['monthly-basic'];

    this.route.paramMap.subscribe((params) => {
      this.selectedCommunity.set(params.get('id'));
    });

    effect(
      async () => {
        if (this.selectedCommunity() && this.app.initialized()) {
          console.log('Selected community and app initialized:', this.selectedCommunity());

          const communityId = this.selectedCommunity()!;

          const entry = await this.data.get(communityId);
          console.log('Community Entry: ', entry);

          this.draftEntry = entry;

          entry.data.option = 'monthly-basic';

          this.firstFormGroup.patchValue({
            option: entry.data.option,
          });

          this.secondFormGroup.patchValue(entry.data);

          // Skip to second step, since we have the data.
          this.stepper.next();

          // this.selectedProfile.set(null);
          // this.messages.set([]);
          // if (this.selectedChat() === ':id' || this.selectedChat() === 'home') {
          //   return;
          // }
          // this.loading.set(true);
          // const profile = await this.profile.loadProfile(this.selectedChat()!);
          // this.selectedProfile.set(profile);
          // await this.loadMessages(this.selectedChat()!);
          // this.loading.set(false);
        }
      },
      { allowSignalWrites: true },
    );

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
