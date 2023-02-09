let getRootMargin = (rect: DOMRect) => `${
	-1 * Math.floor(rect.top)
}px ${
	-1 * Math.floor(visualViewport!.width - rect.right)
}px ${
	-1 * Math.floor(visualViewport!.height - rect.bottom)
}px ${
	-1 * Math.floor(rect.left)
}px`

export let observeMove = <T extends Element = Element>(target: T, callback: MoveCallback<T>) => {
	let observer: IntersectionObserver

	let bounds = new DOMRect(-1, -1, -1, -1)
	let nextBounds = bounds
	let haveBoundsChanged = () => (
		bounds.x !== nextBounds.x ||
		bounds.y !== nextBounds.y ||
		bounds.width !== nextBounds.width ||
		bounds.height !== nextBounds.height
	)

	let observerResume = () => {
		nextBounds = target.getBoundingClientRect()

		observer = new IntersectionObserver(observerCallback, {
			rootMargin: getRootMargin(nextBounds),
			threshold: 1,
		})

		observer.observe(target)

		if (haveBoundsChanged()) {
			bounds = nextBounds

			callback({ target, bounds }, control)
		}
	}

	let observerCallback = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
		if (!isIntersecting) {
			observerCancel()
			observerResume()
		}
	}

	let observerCancel = () => observer.disconnect()

	const control = <MoveControl>{
		cancel: observerCancel,
		resume: observerResume,
	}

	observerResume()

	return control
}

export interface MoveControl {
	cancel(): void
	resume(): void
}

export interface MoveCallback<T extends Element = Element> {
	(event: MoveEvent<T>, control: MoveControl): void
}

export interface MoveEvent<T extends Element = Element> {
	target: T
	bounds: DOMRect
}
