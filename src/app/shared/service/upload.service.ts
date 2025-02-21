import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { BackendApiService } from './backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private DB_NAME = 'UploadDB';
  private uploadStatus = new BehaviorSubject<boolean>(false);

  constructor(private backendApiService: BackendApiService) {}

  getUploadStatus(): Observable<boolean> {
    return this.uploadStatus.asObservable();
  }

  async uploadFile(file: File) {
    this.uploadStatus.next(true);
    await this.storeFile(file);

    return this.backendApiService.callSaveVideoContentAPI([file]).pipe(
      finalize(() => {
        this.deleteStoredFile();
        this.uploadStatus.next(false);
      })
    );
  }

  async resumeUpload() {
    const file = await this.getFile();
    if (file) {
      this.uploadFile(file);
    }
  }

  private async storeFile(file: File) {
    const db = await openDB(this.DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore('files');
      },
    });

    await db.put('files', file, 'fileToUpload');
  }

  private async getFile(): Promise<File> {
    const db = await openDB(this.DB_NAME, 1);
    return db.get('files', 'fileToUpload');
  }

  private async deleteStoredFile() {
    const db = await openDB(this.DB_NAME, 1);
    await db.delete('files', 'fileToUpload');
  }
}
