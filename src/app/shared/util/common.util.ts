import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { BackendApiService } from '../service/backend-api.service';

export class CommonUtil {
  static markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  static getImageFromImageUrl(
    imageUrl: string,
    backendApiService: BackendApiService
  ): Observable<string> {
    return backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
  }
}
