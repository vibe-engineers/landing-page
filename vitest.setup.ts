import '@testing-library/jest-dom'

/**
 * Vitest runs in a JSDOM environment that does not always include a native
 * PointerEvent implementation (for example in older Node.js distributions used
 * by some CI providers). The team page relies on pointer events to detect touch
 * interactions, so the related tests would fail when PointerEvent is missing.
 *
 * To make the behaviour consistent across environments we provide a very small
 * polyfill that mimics the relevant parts of PointerEvent used in the tests.
 */
if (typeof window !== 'undefined' && !('PointerEvent' in window)) {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number
    width: number
    height: number
    pressure: number
    tangentialPressure: number
    tiltX: number
    tiltY: number
    twist: number
    pointerType: string
    isPrimary: boolean

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init)

      this.pointerId = init.pointerId ?? 0
      this.width = init.width ?? 0
      this.height = init.height ?? 0
      this.pressure = init.pressure ?? 0
      this.tangentialPressure = init.tangentialPressure ?? 0
      this.tiltX = init.tiltX ?? 0
      this.tiltY = init.tiltY ?? 0
      this.twist = init.twist ?? 0
      this.pointerType = init.pointerType ?? ''
      this.isPrimary = init.isPrimary ?? true
    }
  }

  window.PointerEvent = PointerEventPolyfill as typeof window.PointerEvent
  globalThis.PointerEvent = window.PointerEvent
}