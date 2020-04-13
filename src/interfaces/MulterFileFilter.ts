import { Request } from "express";

interface FileFilterCallback {
  (error: Error): void;
  (error: null, acceptFile: boolean): void;
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface fileFilterHandler {
  (req: Request, file: File, callback: FileFilterCallback): void;
}
