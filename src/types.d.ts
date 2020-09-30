declare global {
    interface Window {
        mozRequestAnimationFrame(callback: FrameRequestCallback): number;
        msRequestAnimationFrame(callback: FrameRequestCallback): number;
        mozCancelAnimationFrame(handle: number): void;
    }

    interface Document {
        fonts?: any;
    }
}
