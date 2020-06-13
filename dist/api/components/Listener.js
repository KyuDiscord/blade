"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
const Base_1 = require("./Base");
const errors_1 = require("@ayanaware/errors");
/**
 * An abstract class for adding a listener to an emitter.
 * @since 1.0.0
 * @extends Component
 */
class Listener extends Base_1.Component {
    constructor(store, dir, file, options) {
        var _a, _b, _c;
        super(store, dir, file, options);
        /**
         * Map of listeners.
         * @since 1.0.0
         * @private
         */
        this._listeners = {};
        this.getEmitter = (v) => typeof v === "string" ? this.store.emitters[v] : v;
        this.getFunction = (v) => (typeof v !== "string" ? v : this[v]).bind(this);
        const emitter = (_a = options.emitter) !== null && _a !== void 0 ? _a : "client";
        this.event = options.event;
        this.emitter = typeof emitter === "string" ? store.emitters[emitter] : emitter;
        this.mappings = (_b = options.mappings) !== null && _b !== void 0 ? _b : {};
        this.mode = (_c = options.mode) !== null && _c !== void 0 ? _c : "on";
    }
    /**
     * A typescript helper decorator.
     * @param options The options to use when creating this listener.
     * @constructor
     */
    static Setup(options) {
        return Base_1.Component.Setup(options);
    }
    run() {
        throw new errors_1.MethodNotImplementedError();
    }
    /**
     * Attaches the proper listener to the emitter
     * @since 1.0.0
     * @private
     */
    _listen() {
        if (Array.isArray(this.event)) {
            this.event.forEach((event) => {
                var _a;
                if (this.mappings) {
                    const mapping = this.mappings[event];
                    if (mapping) {
                        if (typeof mapping === "object") {
                            const fn = this.getFunction(mapping.fn), mode = (_a = mapping.mode) !== null && _a !== void 0 ? _a : this.mode;
                            mapping.emitter
                                ? this.getEmitter(mapping.emitter)[mode](event, (this._listeners[event] = fn))
                                : this.emitter[mode](event, (this._listeners[event] = fn));
                        }
                        const fn = this.getFunction(mapping);
                        this._listeners[event] = fn;
                        return this.emitter[this.mode](event, fn);
                    }
                    const fn = this[`on${event.slice(0, 1).toUpperCase() + event.substring(1).toLowerCase()}`];
                    this._listeners[event] = fn;
                    return this.emitter[this.mode](event, fn);
                }
            });
        }
        else {
            this.emitter[this.mode](this.event, this.run.bind(this));
        }
    }
    /**
     * Removes the listener from the emitter
     * @since 0.0.0-alpha
     * @private
     */
    _unListen() {
        if (Array.isArray(this.event)) {
            this.event.forEach((event) => {
                if (this.mappings) {
                    const mapping = this.mappings[event];
                    if (mapping && typeof mapping === "object") {
                        return mapping.emitter
                            ? this.getEmitter(mapping.emitter).removeListener(event, this._listeners[event])
                            : this.emitter.removeListener(event, this._listeners[event]);
                    }
                    return this.emitter.removeListener(event, this._listeners[event]);
                }
            });
        }
        else {
            this.emitter.removeListener(this.event, this.run.bind(this));
        }
    }
}
exports.Listener = Listener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL2NvbXBvbmVudHMvTGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXFEO0FBQ3JELDhDQUE4RDtBQXFDOUQ7Ozs7R0FJRztBQUNILE1BQWEsUUFBUyxTQUFRLGdCQUFTO0lBaUNyQyxZQUFtQixLQUFvQixFQUFFLEdBQVcsRUFBRSxJQUFjLEVBQUUsT0FBd0I7O1FBQzVGLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQVRuQzs7OztXQUlHO1FBQ0ssZUFBVSxHQUE0QyxFQUFFLENBQUM7UUF3RnpELGVBQVUsR0FBRyxDQUFDLENBQW1CLEVBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRyxnQkFBVyxHQUFHLENBQUMsQ0FBYyxFQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFuRjdGLE1BQU0sT0FBTyxTQUFHLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLFFBQVEsQ0FBQztRQUU1QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUMvRSxJQUFJLENBQUMsUUFBUSxTQUFHLE9BQU8sQ0FBQyxR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