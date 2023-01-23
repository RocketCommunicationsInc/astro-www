export class AnimationFrame {
	callback: FrameRequestCallback
	frameId: number
	ms: number
	timeoutId: number

	constructor(callback: FrameRequestCallback, ms: number) {
		this.callback = callback
		this.ms = ms
	}

	start() {
		this.cancel()

		if (this.ms) {
			this.timeoutId = setTimeout(this.#deferred, this.ms, this)
		} else {
			this.#deferred(this)
		}
	}

	cancel() {
		clearTimeout(this.timeoutId)
		cancelAnimationFrame(this.frameId)
	}

	#deferred(self: this) {
		self.frameId = requestAnimationFrame(self.callback)
	}
}
