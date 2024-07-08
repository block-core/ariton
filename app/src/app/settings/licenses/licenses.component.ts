import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { retry, tap } from 'rxjs';

@Component({
    selector: 'app-licenses',
    standalone: true,
    imports: [HttpClientModule], // TODO: Fix this import as it is deprecated.
    templateUrl: './licenses.component.html',
    styleUrl: './licenses.component.scss',
})
export class LicensesComponent {
    selectedContent!: SafeHtml;

    constructor(
        private readonly cd: ChangeDetectorRef,
        private readonly sanitizer: DomSanitizer,
        private readonly http: HttpClient,
    ) {}

    async ngOnInit() {
        this.showContent('3rdpartylicenses.txt');
    }

    private showContent(contentUrl: string) {
        this.http
            .get(contentUrl, { responseType: 'text' })
            .pipe(
                retry(2),
                tap(
                    (data) => {
                        this.selectedContent = data;
                        this.cd.markForCheck();
                    },
                    (error) => {
                        this.selectedContent = `Unable to get content (${error.statusText})`;
                        this.cd.markForCheck();
                    },
                ),
            )
            .subscribe();
    }
}
