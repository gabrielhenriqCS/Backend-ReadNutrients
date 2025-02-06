declare module "quagga" {
  export interface QuaggaResult {
    codeResult: {
      code: string;
    };
  }

  export function decodeSingle(
    config: any,
    callback: (result: QuaggaResult) => void
  ): void;

  export function on(event: string, callback: (error: any) => void): void;

  export function stop(): void;
}
