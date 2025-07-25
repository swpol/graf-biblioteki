// src/geometry.ts
var Rotation = /* @__PURE__ */ ((Rotation2) => {
  Rotation2[Rotation2["Degree0"] = 0] = "Degree0";
  Rotation2[Rotation2["Degree90"] = 1] = "Degree90";
  Rotation2[Rotation2["Degree180"] = 2] = "Degree180";
  Rotation2[Rotation2["Degree270"] = 3] = "Degree270";
  return Rotation2;
})(Rotation || {});
function toIntPos(p) {
  return { x: Math.floor(p.x), y: Math.floor(p.y) };
}
function toIntSize(s) {
  return { width: Math.ceil(s.width), height: Math.ceil(s.height) };
}
function toIntRect(r) {
  return {
    origin: toIntPos(r.origin),
    size: toIntSize(r.size)
  };
}
function calculateDegree(rotation) {
  switch (rotation) {
    case 0 /* Degree0 */:
      return 0;
    case 1 /* Degree90 */:
      return 90;
    case 2 /* Degree180 */:
      return 180;
    case 3 /* Degree270 */:
      return 270;
  }
}
function calculateAngle(rotation) {
  return calculateDegree(rotation) * Math.PI / 180;
}
function swap(size) {
  const { width, height } = size;
  return {
    width: height,
    height: width
  };
}
function transformSize(size, rotation, scaleFactor) {
  size = rotation % 2 === 0 ? size : swap(size);
  return {
    width: size.width * scaleFactor,
    height: size.height * scaleFactor
  };
}
function quadToRect(q) {
  const xs = [q.p1.x, q.p2.x, q.p3.x, q.p4.x];
  const ys = [q.p1.y, q.p2.y, q.p3.y, q.p4.y];
  return {
    origin: { x: Math.min(...xs), y: Math.min(...ys) },
    size: {
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys)
    }
  };
}
function rectToQuad(r) {
  return {
    p1: { x: r.origin.x, y: r.origin.y },
    p2: { x: r.origin.x + r.size.width, y: r.origin.y },
    p3: { x: r.origin.x + r.size.width, y: r.origin.y + r.size.height },
    p4: { x: r.origin.x, y: r.origin.y + r.size.height }
  };
}
function rotatePosition(containerSize, position, rotation) {
  let x = position.x;
  let y = position.y;
  switch (rotation) {
    case 0 /* Degree0 */:
      x = position.x;
      y = position.y;
      break;
    case 1 /* Degree90 */:
      x = containerSize.height - position.y;
      y = position.x;
      break;
    case 2 /* Degree180 */:
      x = containerSize.width - position.x;
      y = containerSize.height - position.y;
      break;
    case 3 /* Degree270 */:
      x = position.y;
      y = containerSize.width - position.x;
      break;
  }
  return {
    x,
    y
  };
}
function scalePosition(position, scaleFactor) {
  return {
    x: position.x * scaleFactor,
    y: position.y * scaleFactor
  };
}
function transformPosition(containerSize, position, rotation, scaleFactor) {
  return scalePosition(rotatePosition(containerSize, position, rotation), scaleFactor);
}
function restorePosition(containerSize, position, rotation, scaleFactor) {
  return scalePosition(
    rotatePosition(containerSize, position, (4 - rotation) % 4),
    1 / scaleFactor
  );
}
function rotateRect(containerSize, rect, rotation) {
  let x = rect.origin.x;
  let y = rect.origin.y;
  let size = rect.size;
  switch (rotation) {
    case 0 /* Degree0 */:
      break;
    case 1 /* Degree90 */:
      x = containerSize.height - rect.origin.y - rect.size.height;
      y = rect.origin.x;
      size = swap(rect.size);
      break;
    case 2 /* Degree180 */:
      x = containerSize.width - rect.origin.x - rect.size.width;
      y = containerSize.height - rect.origin.y - rect.size.height;
      break;
    case 3 /* Degree270 */:
      x = rect.origin.y;
      y = containerSize.width - rect.origin.x - rect.size.width;
      size = swap(rect.size);
      break;
  }
  return {
    origin: {
      x,
      y
    },
    size: {
      width: size.width,
      height: size.height
    }
  };
}
function scaleRect(rect, scaleFactor) {
  return {
    origin: {
      x: rect.origin.x * scaleFactor,
      y: rect.origin.y * scaleFactor
    },
    size: {
      width: rect.size.width * scaleFactor,
      height: rect.size.height * scaleFactor
    }
  };
}
function transformRect(containerSize, rect, rotation, scaleFactor) {
  return scaleRect(rotateRect(containerSize, rect, rotation), scaleFactor);
}
function restoreRect(containerSize, rect, rotation, scaleFactor) {
  return scaleRect(rotateRect(containerSize, rect, (4 - rotation) % 4), 1 / scaleFactor);
}
function restoreOffset(offset, rotation, scaleFactor) {
  let offsetX = offset.x;
  let offsetY = offset.y;
  switch (rotation) {
    case 0 /* Degree0 */:
      offsetX = offset.x / scaleFactor;
      offsetY = offset.y / scaleFactor;
      break;
    case 1 /* Degree90 */:
      offsetX = offset.y / scaleFactor;
      offsetY = -offset.x / scaleFactor;
      break;
    case 2 /* Degree180 */:
      offsetX = -offset.x / scaleFactor;
      offsetY = -offset.y / scaleFactor;
      break;
    case 3 /* Degree270 */:
      offsetX = -offset.y / scaleFactor;
      offsetY = offset.x / scaleFactor;
      break;
  }
  return {
    x: offsetX,
    y: offsetY
  };
}
function boundingRect(rects) {
  if (rects.length === 0) return null;
  let minX = rects[0].origin.x, minY = rects[0].origin.y, maxX = rects[0].origin.x + rects[0].size.width, maxY = rects[0].origin.y + rects[0].size.height;
  for (const r of rects) {
    minX = Math.min(minX, r.origin.x);
    minY = Math.min(minY, r.origin.y);
    maxX = Math.max(maxX, r.origin.x + r.size.width);
    maxY = Math.max(maxY, r.origin.y + r.size.height);
  }
  return {
    origin: {
      x: minX,
      y: minY
    },
    size: {
      width: maxX - minX,
      height: maxY - minY
    }
  };
}
var makeMatrix = (rectangle, rotation, scaleFactor) => {
  const { width, height } = rectangle.size;
  switch (rotation) {
    case 0 /* Degree0 */:
      return {
        a: scaleFactor,
        b: 0,
        c: 0,
        d: -scaleFactor,
        e: 0,
        f: height * scaleFactor
      };
    case 1 /* Degree90 */:
      return {
        a: 0,
        b: scaleFactor,
        c: scaleFactor,
        d: 0,
        e: 0,
        f: 0
      };
    case 2 /* Degree180 */:
      return {
        a: -scaleFactor,
        b: 0,
        c: 0,
        d: scaleFactor,
        e: width * scaleFactor,
        f: 0
      };
    case 3 /* Degree270 */:
      return {
        a: 0,
        b: -scaleFactor,
        c: -scaleFactor,
        d: 0,
        e: height * scaleFactor,
        f: width * scaleFactor
      };
  }
};

// src/logger.ts
var NoopLogger = class {
  /** {@inheritDoc Logger.debug} */
  debug() {
  }
  /** {@inheritDoc Logger.info} */
  info() {
  }
  /** {@inheritDoc Logger.warn} */
  warn() {
  }
  /** {@inheritDoc Logger.error} */
  error() {
  }
  /** {@inheritDoc Logger.perf} */
  perf() {
  }
};
var ConsoleLogger = class {
  /** {@inheritDoc Logger.debug} */
  debug(source, category, ...args) {
    console.debug(`${source}.${category}`, ...args);
  }
  /** {@inheritDoc Logger.info} */
  info(source, category, ...args) {
    console.info(`${source}.${category}`, ...args);
  }
  /** {@inheritDoc Logger.warn} */
  warn(source, category, ...args) {
    console.warn(`${source}.${category}`, ...args);
  }
  /** {@inheritDoc Logger.error} */
  error(source, category, ...args) {
    console.error(`${source}.${category}`, ...args);
  }
  /** {@inheritDoc Logger.perf} */
  perf(source, category, event, phase, ...args) {
    console.info(`${source}.${category}.${event}.${phase}`, ...args);
  }
};
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["Debug"] = 0] = "Debug";
  LogLevel2[LogLevel2["Info"] = 1] = "Info";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
  return LogLevel2;
})(LogLevel || {});
var LevelLogger = class {
  /**
   * create new LevelLogger
   * @param logger - the original logger
   * @param level - log level that used for filtering, all logs lower than this level will be filtered out
   */
  constructor(logger, level) {
    this.logger = logger;
    this.level = level;
  }
  /** {@inheritDoc Logger.debug} */
  debug(source, category, ...args) {
    if (this.level <= 0 /* Debug */) {
      this.logger.debug(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.info} */
  info(source, category, ...args) {
    if (this.level <= 1 /* Info */) {
      this.logger.info(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.warn} */
  warn(source, category, ...args) {
    if (this.level <= 2 /* Warn */) {
      this.logger.warn(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.error} */
  error(source, category, ...args) {
    if (this.level <= 3 /* Error */) {
      this.logger.error(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.perf} */
  perf(source, category, event, phase, ...args) {
    this.logger.perf(source, category, event, phase, ...args);
  }
};
var PerfLogger = class {
  /**
   * create new PerfLogger
   */
  constructor() {
  }
  /** {@inheritDoc Logger.debug} */
  debug(source, category, ...args) {
  }
  /** {@inheritDoc Logger.info} */
  info(source, category, ...args) {
  }
  /** {@inheritDoc Logger.warn} */
  warn(source, category, ...args) {
  }
  /** {@inheritDoc Logger.error} */
  error(source, category, ...args) {
  }
  /** {@inheritDoc Logger.perf} */
  perf(source, category, event, phase, identifier, ...args) {
    switch (phase) {
      case "Begin":
        window.performance.mark(`${source}.${category}.${event}.${phase}.${identifier}`, {
          detail: args
        });
        break;
      case "End":
        window.performance.mark(`${source}.${category}.${event}.${phase}.${identifier}`, {
          detail: args
        });
        window.performance.measure(
          `${source}.${category}.${event}.Measure.${identifier}`,
          `${source}.${category}.${event}.Begin.${identifier}`,
          `${source}.${category}.${event}.End.${identifier}`
        );
        break;
    }
  }
};
var AllLogger = class {
  /**
   * create new PerfLogger
   */
  constructor(loggers) {
    this.loggers = loggers;
  }
  /** {@inheritDoc Logger.debug} */
  debug(source, category, ...args) {
    for (const logger of this.loggers) {
      logger.debug(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.info} */
  info(source, category, ...args) {
    for (const logger of this.loggers) {
      logger.info(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.warn} */
  warn(source, category, ...args) {
    for (const logger of this.loggers) {
      logger.warn(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.error} */
  error(source, category, ...args) {
    for (const logger of this.loggers) {
      logger.error(source, category, ...args);
    }
  }
  /** {@inheritDoc Logger.perf} */
  perf(source, category, event, phase, ...args) {
    for (const logger of this.loggers) {
      logger.perf(source, category, event, phase, ...args);
    }
  }
};

// src/task.ts
var TaskStage = /* @__PURE__ */ ((TaskStage2) => {
  TaskStage2[TaskStage2["Pending"] = 0] = "Pending";
  TaskStage2[TaskStage2["Resolved"] = 1] = "Resolved";
  TaskStage2[TaskStage2["Rejected"] = 2] = "Rejected";
  TaskStage2[TaskStage2["Aborted"] = 3] = "Aborted";
  return TaskStage2;
})(TaskStage || {});
var TaskAbortedError = class extends Error {
  constructor(reason) {
    super(`Task aborted: ${JSON.stringify(reason)}`);
    this.name = "TaskAbortedError";
  }
};
var TaskRejectedError = class extends Error {
  constructor(reason) {
    super(`Task rejected: ${JSON.stringify(reason)}`);
    this.name = "TaskRejectedError";
  }
};
var Task = class _Task {
  constructor() {
    this.state = {
      stage: 0 /* Pending */
    };
    /**
     * callbacks that will be executed when task is resolved
     */
    this.resolvedCallbacks = [];
    /**
     * callbacks that will be executed when task is rejected
     */
    this.rejectedCallbacks = [];
    /**
     * Promise that will be resolved when task is settled
     */
    this._promise = null;
  }
  /**
   * Convert task to promise
   * @returns promise that will be resolved when task is settled
   */
  toPromise() {
    if (!this._promise) {
      this._promise = new Promise((resolve, reject) => {
        this.wait(
          (result) => resolve(result),
          (error) => {
            if (error.type === "abort") {
              reject(new TaskAbortedError(error.reason));
            } else {
              reject(new TaskRejectedError(error.reason));
            }
          }
        );
      });
    }
    return this._promise;
  }
  /**
   * wait for task to be settled
   * @param resolvedCallback - callback for resolved value
   * @param rejectedCallback - callback for rejected value
   */
  wait(resolvedCallback, rejectedCallback) {
    switch (this.state.stage) {
      case 0 /* Pending */:
        this.resolvedCallbacks.push(resolvedCallback);
        this.rejectedCallbacks.push(rejectedCallback);
        break;
      case 1 /* Resolved */:
        resolvedCallback(this.state.result);
        break;
      case 2 /* Rejected */:
        rejectedCallback({
          type: "reject",
          reason: this.state.reason
        });
        break;
      case 3 /* Aborted */:
        rejectedCallback({
          type: "abort",
          reason: this.state.reason
        });
        break;
    }
  }
  /**
   * resolve task with specific result
   * @param result - result value
   */
  resolve(result) {
    if (this.state.stage === 0 /* Pending */) {
      this.state = {
        stage: 1 /* Resolved */,
        result
      };
      for (const resolvedCallback of this.resolvedCallbacks) {
        try {
          resolvedCallback(result);
        } catch (e) {
        }
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }
  /**
   * reject task with specific reason
   * @param reason - abort reason
   *
   */
  reject(reason) {
    if (this.state.stage === 0 /* Pending */) {
      this.state = {
        stage: 2 /* Rejected */,
        reason
      };
      for (const rejectedCallback of this.rejectedCallbacks) {
        try {
          rejectedCallback({
            type: "reject",
            reason
          });
        } catch (e) {
        }
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }
  /**
   * abort task with specific reason
   * @param reason - abort reason
   */
  abort(reason) {
    if (this.state.stage === 0 /* Pending */) {
      this.state = {
        stage: 3 /* Aborted */,
        reason
      };
      for (const rejectedCallback of this.rejectedCallbacks) {
        try {
          rejectedCallback({
            type: "abort",
            reason
          });
        } catch (e) {
        }
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }
  /**
   * fail task with a TaskError from another task
   * This is a convenience method for error propagation between tasks
   * @param error - TaskError from another task
   */
  fail(error) {
    if (error.type === "abort") {
      this.abort(error.reason);
    } else {
      this.reject(error.reason);
    }
  }
  /**
   * Static method to wait for all tasks to resolve
   * Returns a new task that resolves with an array of all results
   * Rejects immediately if any task fails
   *
   * @param tasks - array of tasks to wait for
   * @returns new task that resolves when all input tasks resolve
   * @public
   */
  static all(tasks) {
    const combinedTask = new _Task();
    if (tasks.length === 0) {
      combinedTask.resolve([]);
      return combinedTask;
    }
    const results = new Array(tasks.length);
    let resolvedCount = 0;
    let isSettled = false;
    tasks.forEach((task, index) => {
      task.wait(
        (result) => {
          if (isSettled) return;
          results[index] = result;
          resolvedCount++;
          if (resolvedCount === tasks.length) {
            isSettled = true;
            combinedTask.resolve(results);
          }
        },
        (error) => {
          if (isSettled) return;
          isSettled = true;
          if (error.type === "abort") {
            combinedTask.abort(error.reason);
          } else {
            combinedTask.reject(error.reason);
          }
        }
      );
    });
    return combinedTask;
  }
  /**
   * Static method to wait for all tasks to settle (resolve, reject, or abort)
   * Always resolves with an array of settlement results
   *
   * @param tasks - array of tasks to wait for
   * @returns new task that resolves when all input tasks settle
   * @public
   */
  static allSettled(tasks) {
    const combinedTask = new _Task();
    if (tasks.length === 0) {
      combinedTask.resolve([]);
      return combinedTask;
    }
    const results = new Array(tasks.length);
    let settledCount = 0;
    tasks.forEach((task, index) => {
      task.wait(
        (result) => {
          results[index] = { status: "resolved", value: result };
          settledCount++;
          if (settledCount === tasks.length) {
            combinedTask.resolve(results);
          }
        },
        (error) => {
          results[index] = {
            status: error.type === "abort" ? "aborted" : "rejected",
            reason: error.reason
          };
          settledCount++;
          if (settledCount === tasks.length) {
            combinedTask.resolve(results);
          }
        }
      );
    });
    return combinedTask;
  }
  /**
   * Static method that resolves/rejects with the first task that settles
   *
   * @param tasks - array of tasks to race
   * @returns new task that settles with the first input task that settles
   * @public
   */
  static race(tasks) {
    const combinedTask = new _Task();
    if (tasks.length === 0) {
      combinedTask.reject("No tasks provided");
      return combinedTask;
    }
    let isSettled = false;
    tasks.forEach((task) => {
      task.wait(
        (result) => {
          if (isSettled) return;
          isSettled = true;
          combinedTask.resolve(result);
        },
        (error) => {
          if (isSettled) return;
          isSettled = true;
          if (error.type === "abort") {
            combinedTask.abort(error.reason);
          } else {
            combinedTask.reject(error.reason);
          }
        }
      );
    });
    return combinedTask;
  }
  /**
   * Utility to track progress of multiple tasks
   *
   * @param tasks - array of tasks to track
   * @param onProgress - callback called when any task completes
   * @returns new task that resolves when all input tasks resolve
   * @public
   */
  static withProgress(tasks, onProgress) {
    const combinedTask = _Task.all(tasks);
    if (onProgress) {
      let completedCount = 0;
      tasks.forEach((task) => {
        task.wait(
          () => {
            completedCount++;
            onProgress(completedCount, tasks.length);
          },
          () => {
            completedCount++;
            onProgress(completedCount, tasks.length);
          }
        );
      });
    }
    return combinedTask;
  }
};

// src/pdf.ts
var PdfSoftHyphenMarker = "\xAD";
var PdfZeroWidthSpace = "\u200B";
var PdfWordJoiner = "\u2060";
var PdfBomOrZwnbsp = "\uFEFF";
var PdfNonCharacterFFFE = "\uFFFE";
var PdfNonCharacterFFFF = "\uFFFF";
var PdfUnwantedTextMarkers = Object.freeze([
  PdfSoftHyphenMarker,
  PdfZeroWidthSpace,
  PdfWordJoiner,
  PdfBomOrZwnbsp,
  PdfNonCharacterFFFE,
  PdfNonCharacterFFFF
]);
var PdfUnwantedTextRegex = new RegExp(`[${PdfUnwantedTextMarkers.join("")}]`, "g");
function stripPdfUnwantedMarkers(text) {
  return text.replace(PdfUnwantedTextRegex, "");
}
var PdfZoomMode = /* @__PURE__ */ ((PdfZoomMode2) => {
  PdfZoomMode2[PdfZoomMode2["Unknown"] = 0] = "Unknown";
  PdfZoomMode2[PdfZoomMode2["XYZ"] = 1] = "XYZ";
  PdfZoomMode2[PdfZoomMode2["FitPage"] = 2] = "FitPage";
  PdfZoomMode2[PdfZoomMode2["FitHorizontal"] = 3] = "FitHorizontal";
  PdfZoomMode2[PdfZoomMode2["FitVertical"] = 4] = "FitVertical";
  PdfZoomMode2[PdfZoomMode2["FitRectangle"] = 5] = "FitRectangle";
  return PdfZoomMode2;
})(PdfZoomMode || {});
var PdfBlendMode = /* @__PURE__ */ ((PdfBlendMode2) => {
  PdfBlendMode2[PdfBlendMode2["Normal"] = 0] = "Normal";
  PdfBlendMode2[PdfBlendMode2["Multiply"] = 1] = "Multiply";
  PdfBlendMode2[PdfBlendMode2["Screen"] = 2] = "Screen";
  PdfBlendMode2[PdfBlendMode2["Overlay"] = 3] = "Overlay";
  PdfBlendMode2[PdfBlendMode2["Darken"] = 4] = "Darken";
  PdfBlendMode2[PdfBlendMode2["Lighten"] = 5] = "Lighten";
  PdfBlendMode2[PdfBlendMode2["ColorDodge"] = 6] = "ColorDodge";
  PdfBlendMode2[PdfBlendMode2["ColorBurn"] = 7] = "ColorBurn";
  PdfBlendMode2[PdfBlendMode2["HardLight"] = 8] = "HardLight";
  PdfBlendMode2[PdfBlendMode2["SoftLight"] = 9] = "SoftLight";
  PdfBlendMode2[PdfBlendMode2["Difference"] = 10] = "Difference";
  PdfBlendMode2[PdfBlendMode2["Exclusion"] = 11] = "Exclusion";
  PdfBlendMode2[PdfBlendMode2["Hue"] = 12] = "Hue";
  PdfBlendMode2[PdfBlendMode2["Saturation"] = 13] = "Saturation";
  PdfBlendMode2[PdfBlendMode2["Color"] = 14] = "Color";
  PdfBlendMode2[PdfBlendMode2["Luminosity"] = 15] = "Luminosity";
  return PdfBlendMode2;
})(PdfBlendMode || {});
var MixedBlendMode = Symbol("mixed");
var BLEND_MODE_INFOS = Object.freeze([
  { id: 0 /* Normal */, label: "Normal", css: "normal" },
  { id: 1 /* Multiply */, label: "Multiply", css: "multiply" },
  { id: 2 /* Screen */, label: "Screen", css: "screen" },
  { id: 3 /* Overlay */, label: "Overlay", css: "overlay" },
  { id: 4 /* Darken */, label: "Darken", css: "darken" },
  { id: 5 /* Lighten */, label: "Lighten", css: "lighten" },
  { id: 6 /* ColorDodge */, label: "Color Dodge", css: "color-dodge" },
  { id: 7 /* ColorBurn */, label: "Color Burn", css: "color-burn" },
  { id: 8 /* HardLight */, label: "Hard Light", css: "hard-light" },
  { id: 9 /* SoftLight */, label: "Soft Light", css: "soft-light" },
  { id: 10 /* Difference */, label: "Difference", css: "difference" },
  { id: 11 /* Exclusion */, label: "Exclusion", css: "exclusion" },
  { id: 12 /* Hue */, label: "Hue", css: "hue" },
  { id: 13 /* Saturation */, label: "Saturation", css: "saturation" },
  { id: 14 /* Color */, label: "Color", css: "color" },
  { id: 15 /* Luminosity */, label: "Luminosity", css: "luminosity" }
]);
var enumToInfo = BLEND_MODE_INFOS.reduce(
  (m, info) => {
    m[info.id] = info;
    return m;
  },
  {}
);
var cssToEnum = BLEND_MODE_INFOS.reduce((m, info) => {
  m[info.css] = info.id;
  return m;
}, {});
function getBlendModeInfo(mode) {
  return enumToInfo[mode] ?? enumToInfo[0 /* Normal */];
}
function blendModeToCss(mode) {
  return getBlendModeInfo(mode).css;
}
function cssToBlendMode(value) {
  return cssToEnum[value];
}
function blendModeLabel(mode) {
  return getBlendModeInfo(mode).label;
}
function reduceBlendModes(modes) {
  if (!modes.length) return 0 /* Normal */;
  const first = modes[0];
  return modes.every((m) => m === first) ? first : MixedBlendMode;
}
var blendModeSelectOptions = BLEND_MODE_INFOS.map((info) => ({
  value: info.id,
  label: info.label
}));
function uiBlendModeDisplay(value) {
  return value === MixedBlendMode ? "(mixed)" : blendModeLabel(value);
}
var PdfActionType = /* @__PURE__ */ ((PdfActionType2) => {
  PdfActionType2[PdfActionType2["Unsupported"] = 0] = "Unsupported";
  PdfActionType2[PdfActionType2["Goto"] = 1] = "Goto";
  PdfActionType2[PdfActionType2["RemoteGoto"] = 2] = "RemoteGoto";
  PdfActionType2[PdfActionType2["URI"] = 3] = "URI";
  PdfActionType2[PdfActionType2["LaunchAppOrOpenFile"] = 4] = "LaunchAppOrOpenFile";
  return PdfActionType2;
})(PdfActionType || {});
var PdfAnnotationSubtype = /* @__PURE__ */ ((PdfAnnotationSubtype2) => {
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["UNKNOWN"] = 0] = "UNKNOWN";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["TEXT"] = 1] = "TEXT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["LINK"] = 2] = "LINK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["FREETEXT"] = 3] = "FREETEXT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["LINE"] = 4] = "LINE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SQUARE"] = 5] = "SQUARE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["CIRCLE"] = 6] = "CIRCLE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["POLYGON"] = 7] = "POLYGON";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["POLYLINE"] = 8] = "POLYLINE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["HIGHLIGHT"] = 9] = "HIGHLIGHT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["UNDERLINE"] = 10] = "UNDERLINE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SQUIGGLY"] = 11] = "SQUIGGLY";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["STRIKEOUT"] = 12] = "STRIKEOUT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["STAMP"] = 13] = "STAMP";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["CARET"] = 14] = "CARET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["INK"] = 15] = "INK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["POPUP"] = 16] = "POPUP";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["FILEATTACHMENT"] = 17] = "FILEATTACHMENT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SOUND"] = 18] = "SOUND";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["MOVIE"] = 19] = "MOVIE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["WIDGET"] = 20] = "WIDGET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SCREEN"] = 21] = "SCREEN";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["PRINTERMARK"] = 22] = "PRINTERMARK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["TRAPNET"] = 23] = "TRAPNET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["WATERMARK"] = 24] = "WATERMARK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["THREED"] = 25] = "THREED";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["RICHMEDIA"] = 26] = "RICHMEDIA";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["XFAWIDGET"] = 27] = "XFAWIDGET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["REDACT"] = 28] = "REDACT";
  return PdfAnnotationSubtype2;
})(PdfAnnotationSubtype || {});
var PdfAnnotationSubtypeName = {
  [0 /* UNKNOWN */]: "unknow",
  [1 /* TEXT */]: "text",
  [2 /* LINK */]: "link",
  [3 /* FREETEXT */]: "freetext",
  [4 /* LINE */]: "line",
  [5 /* SQUARE */]: "square",
  [6 /* CIRCLE */]: "circle",
  [7 /* POLYGON */]: "polygon",
  [8 /* POLYLINE */]: "polyline",
  [9 /* HIGHLIGHT */]: "highlight",
  [10 /* UNDERLINE */]: "underline",
  [11 /* SQUIGGLY */]: "squiggly",
  [12 /* STRIKEOUT */]: "strikeout",
  [13 /* STAMP */]: "stamp",
  [14 /* CARET */]: "caret",
  [15 /* INK */]: "ink",
  [16 /* POPUP */]: "popup",
  [17 /* FILEATTACHMENT */]: "fileattachment",
  [18 /* SOUND */]: "sound",
  [19 /* MOVIE */]: "movie",
  [20 /* WIDGET */]: "widget",
  [21 /* SCREEN */]: "screen",
  [22 /* PRINTERMARK */]: "printermark",
  [23 /* TRAPNET */]: "trapnet",
  [24 /* WATERMARK */]: "watermark",
  [25 /* THREED */]: "threed",
  [26 /* RICHMEDIA */]: "richmedia",
  [27 /* XFAWIDGET */]: "xfawidget",
  [28 /* REDACT */]: "redact"
};
var PdfAnnotationObjectStatus = /* @__PURE__ */ ((PdfAnnotationObjectStatus2) => {
  PdfAnnotationObjectStatus2[PdfAnnotationObjectStatus2["Created"] = 0] = "Created";
  PdfAnnotationObjectStatus2[PdfAnnotationObjectStatus2["Committed"] = 1] = "Committed";
  return PdfAnnotationObjectStatus2;
})(PdfAnnotationObjectStatus || {});
var AppearanceMode = /* @__PURE__ */ ((AppearanceMode2) => {
  AppearanceMode2[AppearanceMode2["Normal"] = 0] = "Normal";
  AppearanceMode2[AppearanceMode2["Rollover"] = 1] = "Rollover";
  AppearanceMode2[AppearanceMode2["Down"] = 2] = "Down";
  return AppearanceMode2;
})(AppearanceMode || {});
var PdfAnnotationState = /* @__PURE__ */ ((PdfAnnotationState2) => {
  PdfAnnotationState2["Marked"] = "Marked";
  PdfAnnotationState2["Unmarked"] = "Unmarked";
  PdfAnnotationState2["Accepted"] = "Accepted";
  PdfAnnotationState2["Rejected"] = "Rejected";
  PdfAnnotationState2["Complete"] = "Complete";
  PdfAnnotationState2["Cancelled"] = "Cancelled";
  PdfAnnotationState2["None"] = "None";
  return PdfAnnotationState2;
})(PdfAnnotationState || {});
var PdfAnnotationStateModel = /* @__PURE__ */ ((PdfAnnotationStateModel2) => {
  PdfAnnotationStateModel2["Marked"] = "Marked";
  PdfAnnotationStateModel2["Reviewed"] = "Reviewed";
  return PdfAnnotationStateModel2;
})(PdfAnnotationStateModel || {});
var PDF_FORM_FIELD_TYPE = /* @__PURE__ */ ((PDF_FORM_FIELD_TYPE2) => {
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["UNKNOWN"] = 0] = "UNKNOWN";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["PUSHBUTTON"] = 1] = "PUSHBUTTON";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["CHECKBOX"] = 2] = "CHECKBOX";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["RADIOBUTTON"] = 3] = "RADIOBUTTON";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["COMBOBOX"] = 4] = "COMBOBOX";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["LISTBOX"] = 5] = "LISTBOX";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["TEXTFIELD"] = 6] = "TEXTFIELD";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["SIGNATURE"] = 7] = "SIGNATURE";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA"] = 8] = "XFA";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA_CHECKBOX"] = 9] = "XFA_CHECKBOX";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA_COMBOBOX"] = 10] = "XFA_COMBOBOX";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA_IMAGEFIELD"] = 11] = "XFA_IMAGEFIELD";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA_LISTBOX"] = 12] = "XFA_LISTBOX";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA_PUSHBUTTON"] = 13] = "XFA_PUSHBUTTON";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA_SIGNATURE"] = 14] = "XFA_SIGNATURE";
  PDF_FORM_FIELD_TYPE2[PDF_FORM_FIELD_TYPE2["XFA_TEXTFIELD"] = 15] = "XFA_TEXTFIELD";
  return PDF_FORM_FIELD_TYPE2;
})(PDF_FORM_FIELD_TYPE || {});
var PdfAnnotationColorType = /* @__PURE__ */ ((PdfAnnotationColorType2) => {
  PdfAnnotationColorType2[PdfAnnotationColorType2["Color"] = 0] = "Color";
  PdfAnnotationColorType2[PdfAnnotationColorType2["InteriorColor"] = 1] = "InteriorColor";
  return PdfAnnotationColorType2;
})(PdfAnnotationColorType || {});
var PdfAnnotationBorderStyle = /* @__PURE__ */ ((PdfAnnotationBorderStyle2) => {
  PdfAnnotationBorderStyle2[PdfAnnotationBorderStyle2["UNKNOWN"] = 0] = "UNKNOWN";
  PdfAnnotationBorderStyle2[PdfAnnotationBorderStyle2["SOLID"] = 1] = "SOLID";
  PdfAnnotationBorderStyle2[PdfAnnotationBorderStyle2["DASHED"] = 2] = "DASHED";
  PdfAnnotationBorderStyle2[PdfAnnotationBorderStyle2["BEVELED"] = 3] = "BEVELED";
  PdfAnnotationBorderStyle2[PdfAnnotationBorderStyle2["INSET"] = 4] = "INSET";
  PdfAnnotationBorderStyle2[PdfAnnotationBorderStyle2["UNDERLINE"] = 5] = "UNDERLINE";
  PdfAnnotationBorderStyle2[PdfAnnotationBorderStyle2["CLOUDY"] = 6] = "CLOUDY";
  return PdfAnnotationBorderStyle2;
})(PdfAnnotationBorderStyle || {});
var PdfAnnotationFlags = /* @__PURE__ */ ((PdfAnnotationFlags2) => {
  PdfAnnotationFlags2[PdfAnnotationFlags2["NONE"] = 0] = "NONE";
  PdfAnnotationFlags2[PdfAnnotationFlags2["INVISIBLE"] = 1] = "INVISIBLE";
  PdfAnnotationFlags2[PdfAnnotationFlags2["HIDDEN"] = 2] = "HIDDEN";
  PdfAnnotationFlags2[PdfAnnotationFlags2["PRINT"] = 4] = "PRINT";
  PdfAnnotationFlags2[PdfAnnotationFlags2["NO_ZOOM"] = 8] = "NO_ZOOM";
  PdfAnnotationFlags2[PdfAnnotationFlags2["NO_ROTATE"] = 16] = "NO_ROTATE";
  PdfAnnotationFlags2[PdfAnnotationFlags2["NO_VIEW"] = 32] = "NO_VIEW";
  PdfAnnotationFlags2[PdfAnnotationFlags2["READ_ONLY"] = 64] = "READ_ONLY";
  PdfAnnotationFlags2[PdfAnnotationFlags2["LOCKED"] = 128] = "LOCKED";
  PdfAnnotationFlags2[PdfAnnotationFlags2["TOGGLE_NOVIEW"] = 256] = "TOGGLE_NOVIEW";
  return PdfAnnotationFlags2;
})(PdfAnnotationFlags || {});
var PDF_FORM_FIELD_FLAG = /* @__PURE__ */ ((PDF_FORM_FIELD_FLAG2) => {
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["NONE"] = 0] = "NONE";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["READONLY"] = 1] = "READONLY";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["REQUIRED"] = 2] = "REQUIRED";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["NOEXPORT"] = 4] = "NOEXPORT";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["TEXT_MULTIPLINE"] = 4096] = "TEXT_MULTIPLINE";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["TEXT_PASSWORD"] = 8192] = "TEXT_PASSWORD";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["CHOICE_COMBO"] = 131072] = "CHOICE_COMBO";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["CHOICE_EDIT"] = 262144] = "CHOICE_EDIT";
  PDF_FORM_FIELD_FLAG2[PDF_FORM_FIELD_FLAG2["CHOICE_MULTL_SELECT"] = 2097152] = "CHOICE_MULTL_SELECT";
  return PDF_FORM_FIELD_FLAG2;
})(PDF_FORM_FIELD_FLAG || {});
var PdfPageObjectType = /* @__PURE__ */ ((PdfPageObjectType2) => {
  PdfPageObjectType2[PdfPageObjectType2["UNKNOWN"] = 0] = "UNKNOWN";
  PdfPageObjectType2[PdfPageObjectType2["TEXT"] = 1] = "TEXT";
  PdfPageObjectType2[PdfPageObjectType2["PATH"] = 2] = "PATH";
  PdfPageObjectType2[PdfPageObjectType2["IMAGE"] = 3] = "IMAGE";
  PdfPageObjectType2[PdfPageObjectType2["SHADING"] = 4] = "SHADING";
  PdfPageObjectType2[PdfPageObjectType2["FORM"] = 5] = "FORM";
  return PdfPageObjectType2;
})(PdfPageObjectType || {});
var PdfAnnotationFlagName = Object.freeze({
  [1 /* INVISIBLE */]: "invisible",
  [2 /* HIDDEN */]: "hidden",
  [4 /* PRINT */]: "print",
  [8 /* NO_ZOOM */]: "noZoom",
  [16 /* NO_ROTATE */]: "noRotate",
  [32 /* NO_VIEW */]: "noView",
  [64 /* READ_ONLY */]: "readOnly",
  [128 /* LOCKED */]: "locked",
  [256 /* TOGGLE_NOVIEW */]: "toggleNoView"
});
var PdfAnnotationFlagValue = Object.entries(
  PdfAnnotationFlagName
).reduce(
  (acc, [bit, name]) => {
    acc[name] = Number(bit);
    return acc;
  },
  {}
);
function flagsToNames(raw) {
  return Object.keys(PdfAnnotationFlagName).filter((flag) => (raw & flag) !== 0).map((flag) => PdfAnnotationFlagName[flag]);
}
function namesToFlags(names) {
  return names.reduce(
    (mask, name) => mask | PdfAnnotationFlagValue[name],
    0 /* NONE */
  );
}
var PdfSegmentObjectType = /* @__PURE__ */ ((PdfSegmentObjectType2) => {
  PdfSegmentObjectType2[PdfSegmentObjectType2["UNKNOWN"] = -1] = "UNKNOWN";
  PdfSegmentObjectType2[PdfSegmentObjectType2["LINETO"] = 0] = "LINETO";
  PdfSegmentObjectType2[PdfSegmentObjectType2["BEZIERTO"] = 1] = "BEZIERTO";
  PdfSegmentObjectType2[PdfSegmentObjectType2["MOVETO"] = 2] = "MOVETO";
  return PdfSegmentObjectType2;
})(PdfSegmentObjectType || {});
var PdfEngineFeature = /* @__PURE__ */ ((PdfEngineFeature2) => {
  PdfEngineFeature2[PdfEngineFeature2["RenderPage"] = 0] = "RenderPage";
  PdfEngineFeature2[PdfEngineFeature2["RenderPageRect"] = 1] = "RenderPageRect";
  PdfEngineFeature2[PdfEngineFeature2["Thumbnails"] = 2] = "Thumbnails";
  PdfEngineFeature2[PdfEngineFeature2["Bookmarks"] = 3] = "Bookmarks";
  PdfEngineFeature2[PdfEngineFeature2["Annotations"] = 4] = "Annotations";
  return PdfEngineFeature2;
})(PdfEngineFeature || {});
var PdfEngineOperation = /* @__PURE__ */ ((PdfEngineOperation2) => {
  PdfEngineOperation2[PdfEngineOperation2["Create"] = 0] = "Create";
  PdfEngineOperation2[PdfEngineOperation2["Read"] = 1] = "Read";
  PdfEngineOperation2[PdfEngineOperation2["Update"] = 2] = "Update";
  PdfEngineOperation2[PdfEngineOperation2["Delete"] = 3] = "Delete";
  return PdfEngineOperation2;
})(PdfEngineOperation || {});
var MatchFlag = /* @__PURE__ */ ((MatchFlag2) => {
  MatchFlag2[MatchFlag2["None"] = 0] = "None";
  MatchFlag2[MatchFlag2["MatchCase"] = 1] = "MatchCase";
  MatchFlag2[MatchFlag2["MatchWholeWord"] = 2] = "MatchWholeWord";
  MatchFlag2[MatchFlag2["MatchConsecutive"] = 4] = "MatchConsecutive";
  return MatchFlag2;
})(MatchFlag || {});
function unionFlags(flags) {
  return flags.reduce((flag, currFlag) => {
    return flag | currFlag;
  }, 0 /* None */);
}
function compareSearchTarget(targetA, targetB) {
  const flagA = unionFlags(targetA.flags);
  const flagB = unionFlags(targetB.flags);
  return flagA === flagB && targetA.keyword === targetB.keyword;
}
var PdfPermission = /* @__PURE__ */ ((PdfPermission2) => {
  PdfPermission2[PdfPermission2["PrintDocument"] = 8] = "PrintDocument";
  PdfPermission2[PdfPermission2["ModifyContent"] = 16] = "ModifyContent";
  PdfPermission2[PdfPermission2["CopyOrExtract"] = 32] = "CopyOrExtract";
  PdfPermission2[PdfPermission2["AddOrModifyTextAnnot"] = 64] = "AddOrModifyTextAnnot";
  PdfPermission2[PdfPermission2["FillInExistingForm"] = 512] = "FillInExistingForm";
  PdfPermission2[PdfPermission2["ExtractTextOrGraphics"] = 1024] = "ExtractTextOrGraphics";
  PdfPermission2[PdfPermission2["AssembleDocument"] = 2048] = "AssembleDocument";
  PdfPermission2[PdfPermission2["PrintHighQuality"] = 4096] = "PrintHighQuality";
  return PdfPermission2;
})(PdfPermission || {});
var PdfPageFlattenFlag = /* @__PURE__ */ ((PdfPageFlattenFlag2) => {
  PdfPageFlattenFlag2[PdfPageFlattenFlag2["Display"] = 0] = "Display";
  PdfPageFlattenFlag2[PdfPageFlattenFlag2["Print"] = 1] = "Print";
  return PdfPageFlattenFlag2;
})(PdfPageFlattenFlag || {});
var PdfPageFlattenResult = /* @__PURE__ */ ((PdfPageFlattenResult2) => {
  PdfPageFlattenResult2[PdfPageFlattenResult2["Fail"] = 0] = "Fail";
  PdfPageFlattenResult2[PdfPageFlattenResult2["Success"] = 1] = "Success";
  PdfPageFlattenResult2[PdfPageFlattenResult2["NothingToDo"] = 2] = "NothingToDo";
  return PdfPageFlattenResult2;
})(PdfPageFlattenResult || {});
var PdfErrorCode = /* @__PURE__ */ ((PdfErrorCode2) => {
  PdfErrorCode2[PdfErrorCode2["Ok"] = 0] = "Ok";
  PdfErrorCode2[PdfErrorCode2["Unknown"] = 1] = "Unknown";
  PdfErrorCode2[PdfErrorCode2["NotFound"] = 2] = "NotFound";
  PdfErrorCode2[PdfErrorCode2["WrongFormat"] = 3] = "WrongFormat";
  PdfErrorCode2[PdfErrorCode2["Password"] = 4] = "Password";
  PdfErrorCode2[PdfErrorCode2["Security"] = 5] = "Security";
  PdfErrorCode2[PdfErrorCode2["PageError"] = 6] = "PageError";
  PdfErrorCode2[PdfErrorCode2["XFALoad"] = 7] = "XFALoad";
  PdfErrorCode2[PdfErrorCode2["XFALayout"] = 8] = "XFALayout";
  PdfErrorCode2[PdfErrorCode2["Cancelled"] = 9] = "Cancelled";
  PdfErrorCode2[PdfErrorCode2["Initialization"] = 10] = "Initialization";
  PdfErrorCode2[PdfErrorCode2["NotReady"] = 11] = "NotReady";
  PdfErrorCode2[PdfErrorCode2["NotSupport"] = 12] = "NotSupport";
  PdfErrorCode2[PdfErrorCode2["LoadDoc"] = 13] = "LoadDoc";
  PdfErrorCode2[PdfErrorCode2["DocNotOpen"] = 14] = "DocNotOpen";
  PdfErrorCode2[PdfErrorCode2["CantCloseDoc"] = 15] = "CantCloseDoc";
  PdfErrorCode2[PdfErrorCode2["CantCreateNewDoc"] = 16] = "CantCreateNewDoc";
  PdfErrorCode2[PdfErrorCode2["CantImportPages"] = 17] = "CantImportPages";
  PdfErrorCode2[PdfErrorCode2["CantCreateAnnot"] = 18] = "CantCreateAnnot";
  PdfErrorCode2[PdfErrorCode2["CantSetAnnotRect"] = 19] = "CantSetAnnotRect";
  PdfErrorCode2[PdfErrorCode2["CantSetAnnotContent"] = 20] = "CantSetAnnotContent";
  PdfErrorCode2[PdfErrorCode2["CantRemoveInkList"] = 21] = "CantRemoveInkList";
  PdfErrorCode2[PdfErrorCode2["CantAddInkStoke"] = 22] = "CantAddInkStoke";
  PdfErrorCode2[PdfErrorCode2["CantReadAttachmentSize"] = 23] = "CantReadAttachmentSize";
  PdfErrorCode2[PdfErrorCode2["CantReadAttachmentContent"] = 24] = "CantReadAttachmentContent";
  PdfErrorCode2[PdfErrorCode2["CantFocusAnnot"] = 25] = "CantFocusAnnot";
  PdfErrorCode2[PdfErrorCode2["CantSelectText"] = 26] = "CantSelectText";
  PdfErrorCode2[PdfErrorCode2["CantSelectOption"] = 27] = "CantSelectOption";
  PdfErrorCode2[PdfErrorCode2["CantCheckField"] = 28] = "CantCheckField";
  return PdfErrorCode2;
})(PdfErrorCode || {});
var PdfTaskHelper = class {
  /**
   * Create a task
   * @returns new task
   */
  static create() {
    return new Task();
  }
  /**
   * Create a task that has been resolved with value
   * @param result - resolved value
   * @returns resolved task
   */
  static resolve(result) {
    const task = new Task();
    task.resolve(result);
    return task;
  }
  /**
   * Create a task that has been rejected with error
   * @param reason - rejected error
   * @returns rejected task
   */
  static reject(reason) {
    const task = new Task();
    task.reject(reason);
    return task;
  }
  /**
   * Create a task that has been aborted with error
   * @param reason - aborted error
   * @returns aborted task
   */
  static abort(reason) {
    const task = new Task();
    task.reject(reason);
    return task;
  }
};

// src/color.ts
function pdfAlphaColorToWebAlphaColor(c) {
  const clamp = (n) => Math.max(0, Math.min(255, n));
  const toHex = (n) => clamp(n).toString(16).padStart(2, "0");
  const color = `#${toHex(c.red)}${toHex(c.green)}${toHex(c.blue)}`;
  const opacity = clamp(c.alpha) / 255;
  return { color, opacity };
}
function webAlphaColorToPdfAlphaColor({ color, opacity }) {
  if (/^#?[0-9a-f]{3}$/i.test(color)) {
    color = color.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, "#$1$1$2$2$3$3").toLowerCase();
  }
  const [, r, g, b] = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color) ?? (() => {
    throw new Error(`Invalid hex colour: \u201C${color}\u201D`);
  })();
  const clamp = (n, hi = 255) => Math.max(0, Math.min(hi, n));
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: clamp(Math.round(opacity * 255))
  };
}

// src/date.ts
function pdfDateToDate(pdf) {
  if (!pdf?.startsWith("D:") || pdf.length < 16) return;
  const y = +pdf.slice(2, 6);
  const mo = +pdf.slice(6, 8) - 1;
  const d = +pdf.slice(8, 10);
  const H = +pdf.slice(10, 12);
  const M = +pdf.slice(12, 14);
  const S = +pdf.slice(14, 16);
  return new Date(Date.UTC(y, mo, d, H, M, S));
}
function dateToPdfDate(date = /* @__PURE__ */ new Date()) {
  const z = (n, len = 2) => n.toString().padStart(len, "0");
  const YYYY = date.getUTCFullYear();
  const MM = z(date.getUTCMonth() + 1);
  const DD = z(date.getUTCDate());
  const HH = z(date.getUTCHours());
  const mm = z(date.getUTCMinutes());
  const SS = z(date.getUTCSeconds());
  return `D:${YYYY}${MM}${DD}${HH}${mm}${SS}`;
}

// src/index.ts
function ignore() {
}
export {
  AllLogger,
  AppearanceMode,
  ConsoleLogger,
  LevelLogger,
  LogLevel,
  MatchFlag,
  MixedBlendMode,
  NoopLogger,
  PDF_FORM_FIELD_FLAG,
  PDF_FORM_FIELD_TYPE,
  PdfActionType,
  PdfAnnotationBorderStyle,
  PdfAnnotationColorType,
  PdfAnnotationFlagName,
  PdfAnnotationFlags,
  PdfAnnotationObjectStatus,
  PdfAnnotationState,
  PdfAnnotationStateModel,
  PdfAnnotationSubtype,
  PdfAnnotationSubtypeName,
  PdfBlendMode,
  PdfBomOrZwnbsp,
  PdfEngineFeature,
  PdfEngineOperation,
  PdfErrorCode,
  PdfNonCharacterFFFE,
  PdfNonCharacterFFFF,
  PdfPageFlattenFlag,
  PdfPageFlattenResult,
  PdfPageObjectType,
  PdfPermission,
  PdfSegmentObjectType,
  PdfSoftHyphenMarker,
  PdfTaskHelper,
  PdfUnwantedTextMarkers,
  PdfUnwantedTextRegex,
  PdfWordJoiner,
  PdfZeroWidthSpace,
  PdfZoomMode,
  PerfLogger,
  Rotation,
  Task,
  TaskAbortedError,
  TaskRejectedError,
  TaskStage,
  blendModeLabel,
  blendModeSelectOptions,
  blendModeToCss,
  boundingRect,
  calculateAngle,
  calculateDegree,
  compareSearchTarget,
  cssToBlendMode,
  dateToPdfDate,
  flagsToNames,
  getBlendModeInfo,
  ignore,
  makeMatrix,
  namesToFlags,
  pdfAlphaColorToWebAlphaColor,
  pdfDateToDate,
  quadToRect,
  rectToQuad,
  reduceBlendModes,
  restoreOffset,
  restorePosition,
  restoreRect,
  rotatePosition,
  rotateRect,
  scalePosition,
  scaleRect,
  stripPdfUnwantedMarkers,
  swap,
  toIntPos,
  toIntRect,
  toIntSize,
  transformPosition,
  transformRect,
  transformSize,
  uiBlendModeDisplay,
  unionFlags,
  webAlphaColorToPdfAlphaColor
};
//# sourceMappingURL=index.js.map