import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from '../web.service';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './business.html',
  styleUrl: './business.css'
})
export class BusinessComponent implements OnInit {

  business_list: any;
  reviews: any = [];
  reviewForm: any;

  constructor(
    public webService: WebService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.business_list = this.webService.getBusiness(
      this.route.snapshot.params['id']
    );

    this.reviews = this.webService.getReviews(
      this.route.snapshot.params['id']
    );

    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.required],
      review: ['', Validators.required],
      stars: 5
    });
  }

  onSubmit(): void {
    this.webService.postReview(this.reviewForm.value)
      .subscribe((response: any) => {
        this.reviewForm.reset();
        this.reviewForm.patchValue({ stars: 5 });

        this.reviews = this.webService.getReviews(
          this.route.snapshot.params['id']
        );
      });
  }

  isInvalid(control: string): boolean {
    return this.reviewForm.controls[control].invalid &&
           this.reviewForm.controls[control].touched;
  }

  isUntouched(): boolean {
    return this.reviewForm.controls.name.pristine ||
           this.reviewForm.controls.review.pristine;
  }

  isIncomplete(): boolean {
    return this.isInvalid('name') ||
           this.isInvalid('review') ||
           this.isUntouched();
  }
}