"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _contentParser, _argumentGenerator, _argumentRunner;
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const Base_1 = require("../Base");
const ArgumentRunner_1 = require("./argument/ArgumentRunner");
const ContentParser_1 = require("./argument/ContentParser");
/**
 * The base command class.
 * @since 1.0.0
 */
class Command extends Base_1.Component {
    /**
     * Creates a new Command.
     * @param store The command store.
     * @param dir The directory that holds this command/
     * @param file The path to this command.
     * @param options Options to use.
     */
    constructor(store, dir, file, options = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        super(store, dir, file, options);
        this.locker = new Set();
        _contentParser.set(this, void 0);
        _argumentGenerator.set(this, void 0);
        _argumentRunner.set(this, new ArgumentRunner_1.ArgumentRunner(this));
        options = __1.Util.deepAssign({ args: [] }, options);
        const { flagWords, optionFlagWords } = Array.isArray(options.args)
            ? ContentParser_1.ContentParser.getFlags(options.args)
            : { flagWords: options.flags, optionFlagWords: options.optionFlags };
        __classPrivateFieldSet(this, _contentParser, new ContentParser_1.ContentParser({
            flagWords,
            optionFlagWords,
            quoted: (_a = options.quoted) !== null && _a !== void 0 ? _a : true,
            separator: options.separator,
        }));
        __classPrivateFieldSet(this, _argumentGenerator, Array.isArray(options.args)
            ? ArgumentRunner_1.ArgumentRunner.fromArguments(options.args.map((arg) => [arg.id, new __1.Argument(this, arg)]))
            : options.args.bind(this));
        this.argumentDefaults = (_b = options.argumentDefaults) !== null && _b !== void 0 ? _b : {};
        this.aliases = [...((_c = options.aliases) !== null && _c !== void 0 ? _c : []), this.name];
        this.editable = (_d = options.editable) !== null && _d !== void 0 ? _d : true;
        this.bucket = (_e = options.bucket) !== null && _e !== void 0 ? _e : 1;
        this.cooldown = (_f = options.cooldown) !== null && _f !== void 0 ? _f : 5000;
        this.cooldownType = (_g = options.cooldownType) !== null && _g !== void 0 ? _g : "author";
        this.hidden = (_h = options.hidden) !== null && _h !== void 0 ? _h : false;
        this.guarded = (_j = options.guarded) !== null && _j !== void 0 ? _j : false;
        this.restrictions = options.restrictions
            ? __1.Util.array(options.restrictions)
            : [];
        this.channel = options.channel
            ? __1.Util.array(options.channel)
            : ["dm", "text"];
        this.userPermissions = options.userPermissions
            ? __1.Util.array(options.userPermissions)
            : [];
        this.permissions = options.permissions
            ? __1.Util.array(options.permissions)
            : [];
        this.inhibitors = options.inhibitors ? __1.Util.array(options.inhibitors) : [];
        this.before = options.before ? options.before.bind(this) : () => true;
        this.description = options.description
            ? typeof options.description === "function"
                ? options.description.bind(this)
                : options.description
            : { content: "", usage: "" };
        this.prefix = options.prefixes
            ? typeof options.prefixes === "function"
                ? options.prefixes.bind(this)
                : __1.Util.array(options.prefixes)
            : null;
        this.regex = options.regex
            ? typeof options.regex === "function"
                ? options.regex.bind(this)
                : options.regex
            : null;
        this.condition = options.condition
            ? options.condition.bind(this)
            : () => false;
        this.lock = options.lock;
        if (typeof options.lock === "string") {
            this.lock = {
                guild: (ctx) => ctx.guild && ctx.guild.id,
                channel: (ctx) => ctx.channel.id,
                user: (ctx) => ctx.author.id,
            }[options.lock];
        }
    }
    /**
     * Returns the bytecode of the required user permissions.
     * @since 1.0.0
     */
    get userPermissionsBytecode() {
        return this.userPermissions.reduce((acc, perm) => (acc |= perm.allow), 0);
    }
    /**
     * Returns the bytecode of the required client permissions.
     * @since 1.0.0
     */
    get permissionsBytecode() {
        return this.permissions.reduce((acc, perm) => (acc |= perm.allow), 0);
    }
    /**
     * A typescript helper decorator.
     * @param options The options to use when creating this command.
     * @constructor
     */
    static Setup(options = {}) {
        return Base_1.Component.Setup(options);
    }
    /**
     * Parses the arguments of this command.
     * @param message
     * @param content
     */
    parse(message, content) {
        const parsed = __classPrivateFieldGet(this, _contentParser).parse(content);
        return __classPrivateFieldGet(this, _argumentRunner).run(message, parsed, __classPrivateFieldGet(this, _argumentGenerator));
    }
}
exports.Command = Command;
_contentParser = new WeakMap(), _argumentGenerator = new WeakMap(), _argumentRunner = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvY29tcG9uZW50cy9jb21tYW5kL0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdDQUEyRztBQUMzRyxrQ0FBc0Q7QUFDdEQsOERBQThFO0FBQzlFLDREQUF5RDtBQThIekQ7OztHQUdHO0FBQ0gsTUFBYSxPQUFRLFNBQVEsZ0JBQVM7SUFzR3BDOzs7Ozs7T0FNRztJQUNILFlBQ0UsS0FBbUIsRUFDbkIsR0FBVyxFQUNYLElBQWMsRUFDZCxVQUEwQixFQUFFOztRQUU1QixLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFsSG5CLFdBQU0sR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQWlHckQsaUNBQThCO1FBQzlCLHFDQUFzQztRQUN0QywwQkFBa0MsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxFQUFDO1FBaUJ6RCxPQUFPLEdBQUcsUUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqRCxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNoRSxDQUFDLENBQUMsNkJBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN0QyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXZFLHVCQUFBLElBQUksa0JBQWtCLElBQUksNkJBQWEsQ0FBQztZQUN0QyxTQUFTO1lBQ1QsZUFBZTtZQUNmLE1BQU0sUUFBRSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxJQUFJO1lBQzlCLFNB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