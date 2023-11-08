var tMap = (function (exports) {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function getControls(nCtrl, colSizes, align) {
    var dashboard = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var sum = function sum(a, b) {
      return a + b;
    }; // set default column sizes if no defined


    if (colSizes.length == 0) {
      for (var i = 0; i < nCtrl; i++) {
        colSizes.push(3);
      }
    } // get total number of columns needed and estimate available grid (dashboard:[12,1], column:[6,2])


    var sumCols = colSizes.reduce(sum, 0),
        nCols = dashboard ? 12 : 6,
        nRows = sumCols <= nCols ? 1 : 2; // set up area names and column sizes, if cumul size exceed available columns, add a new row

    var rows = [];
    var cumulCols = 0;
    var row = {};

    for (var _i = 0; _i < nCtrl; _i++) {
      if (cumulCols + colSizes[_i] > nCols) {
        rows.push(_objectSpread2({}, row));
        row = {};
        cumulCols = 0;
      }

      row["control".concat(_i + 1)] = [colSizes[_i], 1];
      cumulCols += colSizes[_i];
    }

    rows.push(_objectSpread2({}, row)); // create the area strings for the grid template

    var areaStrings = rows.map(function (r) {
      return Object.entries(r).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            area = _ref2[0],
            size = _ref2[1];

        return (area + ' ').repeat(size[0]);
      });
    }); // for each row, build the grid template

    var template = [];

    for (var _i2 = 0; _i2 < rows.length; _i2++) {
      var rowTemplate = ''; // get row size in total

      var rowLength = Object.values(rows[_i2]).map(function (s) {
        return s[0];
      }).reduce(sum, 0); // get space left in row

      var space = nCols - rowLength;
      var a = align;

      if (areaStrings[_i2].length == 1 && align == 'b') {
        a = 'l';
      } else if (areaStrings[_i2].length == 1 && align == 'a') {
        a = 'c';
      }

      if (a === 'l') {
        // left align: join all areas and add spaces at the end
        rowTemplate = areaStrings[_i2].join('') + '. '.repeat(space);
      } else if (a === 'r') {
        // right align: add spaces and join all areas afterwards
        rowTemplate = '. '.repeat(space) + areaStrings[_i2].join('');
      } else if (a === 'c') {
        // centre align: add half the spaces, join all areas, add other half of spaces + extra if any
        var spaces = Math.floor(space / 2);
        var extra = space % 2;
        rowTemplate = '. '.repeat(spaces) + areaStrings[_i2].join('') + '. '.repeat(spaces) + '. '.repeat(extra);
      } else if (a === 'b') {
        // space between align: join areas strings + in between space, then add any extra
        var _spaces = Math.floor(space / (areaStrings[_i2].length - 1));

        var _extra = space % (areaStrings[_i2].length - 1);

        rowTemplate = areaStrings[_i2].join('. '.repeat(_spaces)) + '. '.repeat(_extra);
      } else if (a === 'a') {
        // space around align: set initial space, join areas strings + in between space, add remaining space + extra if any
        var _spaces2 = Math.floor(space / (areaStrings[_i2].length + 1));

        var _extra2 = space % (areaStrings[_i2].length + 1);

        rowTemplate = '. '.repeat(_spaces2) + areaStrings[_i2].join('. '.repeat(_spaces2)) + '. '.repeat(_spaces2) + '. '.repeat(_extra2);
      }

      template.push(rowTemplate);
    }

    var areas = {};
    rows.forEach(function (r) {
      Object.entries(r).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            a = _ref4[0],
            s = _ref4[1];

        areas[a] = s;
      });
    });
    areas['controlT'] = [nCols, nRows];
    return {
      ctrlAreas: areas,
      ctrlTemplate: template.map(function (r) {
        return "\"".concat(r, "\"");
      }).join('')
    };
  }

  function checkAlign(a) {
    var values = ['a', 'b', 'c', 'l', 'r'];

    if (values.includes(a)) {
      return a;
    } else {
      console.log('Control Layout - Bad Alignment - Default to \'left\'');
      return 'l';
    }
  }

  function checkColSizes(c) {
    if (c.some(isNaN) || c.some(function (s) {
      return s.length < 1;
    })) {
      console.error('Control Layout - Bad Column Size');
      return [];
    } else {
      return c.map(function (s) {
        return Math.min(parseInt(s), 6);
      });
    }
  }

  function Controls (controls) {
    var dashboard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var _controls$split = controls.split('-'),
        _controls$split2 = _toArray(_controls$split),
        nCtrl = _controls$split2[0],
        rest = _controls$split2.slice(1);

    if (isNaN(nCtrl) || nCtrl.length < 1) {
      console.error('Control Layout - Bad Input');
      return {
        controls: [],
        controlTemplate: ''
      };
    } else {
      nCtrl = parseInt(nCtrl);
      var sizes, align;

      if (nCtrl > rest.length || nCtrl > 4) {
        console.error('Control Layout - Bad Input');
        return {
          controls: [],
          controlTemplate: ''
        };
      } else if (nCtrl == rest.length) {
        sizes = checkColSizes(rest);
        align = 'l';
      } else {
        align = checkAlign(rest.pop());
        sizes = checkColSizes(rest).slice(0, nCtrl);
      }

      if (sizes.reduce(function (a, b) {
        return a + b;
      }, 0) > 12) {
        console.error('Control Layout - Bad Input');
        return {
          controls: [],
          controlTemplate: ''
        };
      }

      return getControls(nCtrl, sizes, align, dashboard);
    }
  }

  function buildColA() {
    var areas = {
      panel1: [6, 12],
      panelT: [6, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]);
    var template = "\"".concat(templatePanel1, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashA() {
    var areas = {
      panel1: [12, 12],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]);
    var template = "\"".concat(templatePanel1, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildColB() {
    var areas = {
      panel1: [6, 12],
      panel2: [6, 12],
      panelT: [12, 24]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]);
    var template = "\"".concat(templatePanel1, "\"\"").concat(templatePanel2, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashBa() {
    var areas = {
      panel1: [6, 12],
      panel2: [6, 12],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashBb() {
    var areas = {
      panel1: [8, 12],
      panel2: [4, 12],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildColC() {
    var areas = {
      panel1: [6, 12],
      panel2: [6, 6],
      panel3: [6, 6],
      panelT: [6, 24]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]);
    var template = "\"".concat(templatePanel1, "\"\"").concat(templatePanel2, "\"\"").concat(templatePanel3, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashCa() {
    var areas = {
      panel1: [6, 12],
      panel2: [6, 6],
      panel3: [6, 6],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2, "\"\"").concat(templatePanel1).concat(templatePanel3, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashCb() {
    var areas = {
      panel1: [8, 12],
      panel2: [4, 6],
      panel3: [4, 6],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2, "\"\"").concat(templatePanel1).concat(templatePanel3, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildColDa() {
    var areas = {
      panel1: [6, 12],
      panel2: [6, 6],
      panel3: [3, 6],
      panel4: [3, 6],
      panelT: [6, 24]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]);
    var template = "\"".concat(templatePanel1, "\"\"").concat(templatePanel2, "\"\"").concat(templatePanel3).concat(templatePanel4, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildColDb() {
    var areas = {
      panel1: [6, 12],
      panel2: [3, 6],
      panel3: [3, 6],
      panel4: [6, 6],
      panelT: [6, 24]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]);
    var template = "\"".concat(templatePanel1, "\"\"").concat(templatePanel2).concat(templatePanel3, "\"\"").concat(templatePanel4, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashDa() {
    var areas = {
      panel1: [6, 12],
      panel2: [6, 6],
      panel3: [3, 6],
      panel4: [3, 6],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2, "\"\"").concat(templatePanel1).concat(templatePanel3).concat(templatePanel4, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashDb() {
    var areas = {
      panel1: [6, 12],
      panel2: [3, 6],
      panel3: [3, 6],
      panel4: [6, 6],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2).concat(templatePanel3, "\"\"").concat(templatePanel1).concat(templatePanel4, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildColE() {
    var areas = {
      panel1: [6, 12],
      panel2: [3, 6],
      panel3: [3, 6],
      panel4: [3, 6],
      panel5: [3, 6],
      panelT: [6, 24]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]),
        templatePanel5 = 'panel5 '.repeat(areas.panel5[0]);
    var template = "\"".concat(templatePanel1, "\"\"").concat(templatePanel2).concat(templatePanel3, "\"\"").concat(templatePanel4).concat(templatePanel5, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashE() {
    var areas = {
      panel1: [6, 12],
      panel2: [3, 6],
      panel3: [3, 6],
      panel4: [3, 6],
      panel5: [3, 6],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]),
        templatePanel5 = 'panel5 '.repeat(areas.panel5[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2).concat(templatePanel3, "\"\"").concat(templatePanel1).concat(templatePanel4).concat(templatePanel5, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildColFa() {
    var areas = {
      panel1: [3, 8],
      panel2: [3, 8],
      panel3: [3, 8],
      panel4: [3, 8],
      panel5: [3, 8],
      panel6: [3, 8],
      panelT: [6, 24]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]),
        templatePanel5 = 'panel5 '.repeat(areas.panel5[0]),
        templatePanel6 = 'panel6 '.repeat(areas.panel6[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2, "\"\"").concat(templatePanel3).concat(templatePanel4, "\"\"").concat(templatePanel5).concat(templatePanel6, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashFa() {
    var areas = {
      panel1: [4, 6],
      panel2: [4, 6],
      panel3: [4, 6],
      panel4: [4, 6],
      panel5: [4, 6],
      panel6: [4, 6],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]),
        templatePanel5 = 'panel5 '.repeat(areas.panel5[0]),
        templatePanel6 = 'panel6 '.repeat(areas.panel6[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2).concat(templatePanel3, "\"\"").concat(templatePanel4).concat(templatePanel5).concat(templatePanel6, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildColFb() {
    var areas = {
      panel1: [3, 8],
      panel2: [3, 8],
      panel3: [3, 8],
      panel4: [3, 8],
      panel5: [3, 8],
      panel6: [3, 8],
      panelT: [6, 24]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]),
        templatePanel5 = 'panel5 '.repeat(areas.panel5[0]),
        templatePanel6 = 'panel6 '.repeat(areas.panel6[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2, "\"\"").concat(templatePanel3).concat(templatePanel4, "\"\"").concat(templatePanel5).concat(templatePanel6, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function buildDashFb() {
    var areas = {
      panel1: [4, 6],
      panel2: [4, 6],
      panel3: [4, 6],
      panel4: [4, 6],
      panel5: [4, 6],
      panel6: [4, 6],
      panelT: [12, 12]
    };
    var templatePanel1 = 'panel1 '.repeat(areas.panel1[0]),
        templatePanel2 = 'panel2 '.repeat(areas.panel2[0]),
        templatePanel3 = 'panel3 '.repeat(areas.panel3[0]),
        templatePanel4 = 'panel4 '.repeat(areas.panel4[0]),
        templatePanel5 = 'panel5 '.repeat(areas.panel5[0]),
        templatePanel6 = 'panel6 '.repeat(areas.panel6[0]);
    var template = "\"".concat(templatePanel1).concat(templatePanel2).concat(templatePanel5, "\"\"").concat(templatePanel3).concat(templatePanel4).concat(templatePanel6, "\"");
    return {
      panelAreas: areas,
      panelTemplate: template
    };
  }

  function Panels (areas, template, layout) {
    var dashboard = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (layout.length < 1) {
      console.error('Panel Layout - Bad Input');
    }

    var _ref = layout === 'A' ? dashboard ? buildDashA() : buildColA() : layout === 'Ba' ? dashboard ? buildDashBa() : buildColB() : layout === 'Bb' ? dashboard ? buildDashBb() : buildColB() : layout === 'Ca' ? dashboard ? buildDashCa() : buildColC() : layout === 'Cb' ? dashboard ? buildDashCb() : buildColC() : layout === 'Da' ? dashboard ? buildDashDa() : buildColDa() : layout === 'Db' ? dashboard ? buildDashDb() : buildColDb() : layout === 'E' ? dashboard ? buildDashE() : buildColE() : layout === 'Fa' ? dashboard ? buildDashFa() : buildColFa() : layout === 'Fb' ? dashboard ? buildDashFb() : buildColFb() : buildDashA(),
        panelAreas = _ref.panelAreas,
        panelTemplate = _ref.panelTemplate;

    for (var _i = 0, _Object$entries = Object.entries(panelAreas); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          area = _Object$entries$_i[0],
          size = _Object$entries$_i[1];

      areas[area] = size;
    }

    template = template + panelTemplate;
    return {
      areas: areas,
      template: template
    };
  }

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function array(x) {
    return typeof x === "object" && "length" in x
      ? x // Array, TypedArray, NodeList, array-like
      : Array.from(x); // Map, Set, iterable, string, or anything else
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      var group = select.apply(this, arguments);
      return group == null ? [] : array(group);
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find$1 = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find$1.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return this.children;
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = array(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit() {
    return new Selection(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(selection) {
    if (!(selection instanceof Selection)) throw new Error("invalid merge");

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)
        : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove : typeof value === "function"
              ? styleFunction
              : styleConstant)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction
            : textConstant)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function D3Select(selector) {
    return typeof selector === "string"
        ? new Selection([[document.querySelector(selector)]], [document.documentElement])
        : new Selection([[selector]], root);
  }

  function PageManager () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'A';
    var controls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var header = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var footer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var minWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 600;
    var minHeight = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 600;
    // Margin constants
    var heightMargin = 20,
        // sapce to remove when computing the available height
    widthMargin = 200,
        // sapce to remove when computing the available width
    panelMargin = 5,
        // space between panels
    controlMargin = 5; // space to put below controls

    /**
     * Computes the available height
     */

    function getTotalHeight(baseH) {
      var headH = header === '' ? 0 : D3Select(header).node().offsetHeight,
          footH = footer === '' ? 0 : D3Select(footer).node().offsetHeight;
      return baseH - headH - footH - heightMargin;
    }
    /**
     * Computes the available width
     */


    function getTotaltWidth(baseW) {
      return baseW - widthMargin;
    }
    /**
     * Sizes container and applies grdi layout
     */


    function getGrid(w, h, c, t) {
      return D3Select(c).style('width', w + 'px').style('height', h + 'px').style('display', 'grid').style('grid-template-areas', t);
    }
    /**
     * Creates and sizes the container for each control and panels
     */


    function getSizes(width, height, areas, grid) {
      var sizes = {}; // for every areas (excluding the totals)

      var _loop = function _loop() {
        var area = _Object$keys[_i];

        if (area !== 'total' && !area.endsWith('T')) {
          // compute the size
          var h = Math.floor(height * areas[area][1] / areas['total'][1] - panelMargin * 2),
              w = Math.floor(width * areas[area][0] / areas['total'][0] - panelMargin * 2); // generate a container

          var c = "div#".concat(area);
          var s = grid.select(c);

          if (s.empty()) {
            s = grid.append('div').attr('id', area);
          } // assign grid area to container and size it


          s.style('grid-area', area).style('height', h + 'px').style('margin', panelMargin + 'px').style('margin-bottom', function () {
            return "".concat(area.includes('control') ? controlMargin + panelMargin : panelMargin, "px");
          }); // register the container and its size

          sizes[area] = {
            c: c,
            w: w,
            h: h
          };
        }
      };

      for (var _i = 0, _Object$keys = Object.keys(areas); _i < _Object$keys.length; _i++) {
        _loop();
      }

      return sizes;
    }

    function buildPage() {
      // get the base dimension for the page
      var baseH = Math.max(window.innerHeight, minHeight),
          baseW = Math.max(window.innerWidth, minWidth); // estimate the available space

      var totalH = getTotalHeight(baseH),
          totalW = getTotaltWidth(baseW); // check if needs to be in column or dashboard format

      var dashboard = totalW * 2 / 3 >= totalH; // adjust available height if column format

      if (!dashboard && layout !== 'A') {
        totalH *= 2;
      } // make the controls areas and template


      var _ref = controls !== '' ? Controls(controls, dashboard) : {
        ctrlAreas: {
          controlT: [0, 0]
        },
        ctrlTemplate: ''
      },
          ctrlAreas = _ref.ctrlAreas,
          ctrlTemplate = _ref.ctrlTemplate; // complete with panels areas and template


      var _Panels = Panels(ctrlAreas, ctrlTemplate, layout, dashboard),
          areas = _Panels.areas,
          template = _Panels.template; // get total area size


      areas['total'] = [dashboard ? 12 : 6, areas.controlT[1] + areas.panelT[1]]; // size container and apply grid layout

      var grid = getGrid(totalW, totalH, container, template); // generate grid areas, size them, and return

      return getSizes(totalW, totalH, areas, grid);
    } // get the controls and panels


    var sizes = buildPage(); // watch function to auto-resize modules

    sizes.watch = function (modules) {
      window.onresize = function () {
        var s = buildPage();

        for (var _i2 = 0, _Object$entries = Object.entries(modules); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
              area = _Object$entries$_i[0],
              module = _Object$entries$_i[1];

          if ('setSize' in module) {
            module.setSize(s[area].w, s[area].h);
          } else {
            console.log("".concat(area, " missing setSize()"));
          }
        }
      };
    };

    return sizes;
  }

  var EOL = {},
      EOF = {},
      QUOTE = 34,
      NEWLINE = 10,
      RETURN = 13;

  function objectConverter(columns) {
    return new Function("d", "return {" + columns.map(function(name, i) {
      return JSON.stringify(name) + ": d[" + i + "] || \"\"";
    }).join(",") + "}");
  }

  function customConverter(columns, f) {
    var object = objectConverter(columns);
    return function(row, i) {
      return f(object(row), i, columns);
    };
  }

  // Compute unique columns in order of discovery.
  function inferColumns(rows) {
    var columnSet = Object.create(null),
        columns = [];

    rows.forEach(function(row) {
      for (var column in row) {
        if (!(column in columnSet)) {
          columns.push(columnSet[column] = column);
        }
      }
    });

    return columns;
  }

  function pad(value, width) {
    var s = value + "", length = s.length;
    return length < width ? new Array(width - length + 1).join(0) + s : s;
  }

  function formatYear(year) {
    return year < 0 ? "-" + pad(-year, 6)
      : year > 9999 ? "+" + pad(year, 6)
      : pad(year, 4);
  }

  function formatDate(date) {
    var hours = date.getUTCHours(),
        minutes = date.getUTCMinutes(),
        seconds = date.getUTCSeconds(),
        milliseconds = date.getUTCMilliseconds();
    return isNaN(date) ? "Invalid Date"
        : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
        + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
        : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
        : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
        : "");
  }

  function dsvFormat(delimiter) {
    var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
        DELIMITER = delimiter.charCodeAt(0);

    function parse(text, f) {
      var convert, columns, rows = parseRows(text, function(row, i) {
        if (convert) return convert(row, i - 1);
        columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
      });
      rows.columns = columns || [];
      return rows;
    }

    function parseRows(text, f) {
      var rows = [], // output rows
          N = text.length,
          I = 0, // current character index
          n = 0, // current line number
          t, // current token
          eof = N <= 0, // current token followed by EOF?
          eol = false; // current token followed by EOL?

      // Strip the trailing newline.
      if (text.charCodeAt(N - 1) === NEWLINE) --N;
      if (text.charCodeAt(N - 1) === RETURN) --N;

      function token() {
        if (eof) return EOF;
        if (eol) return eol = false, EOL;

        // Unescape quotes.
        var i, j = I, c;
        if (text.charCodeAt(j) === QUOTE) {
          while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
          if ((i = I) >= N) eof = true;
          else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
          else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
          return text.slice(j + 1, i - 1).replace(/""/g, "\"");
        }

        // Find next delimiter or newline.
        while (I < N) {
          if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
          else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
          else if (c !== DELIMITER) continue;
          return text.slice(j, i);
        }

        // Return last token before EOF.
        return eof = true, text.slice(j, N);
      }

      while ((t = token()) !== EOF) {
        var row = [];
        while (t !== EOL && t !== EOF) row.push(t), t = token();
        if (f && (row = f(row, n++)) == null) continue;
        rows.push(row);
      }

      return rows;
    }

    function preformatBody(rows, columns) {
      return rows.map(function(row) {
        return columns.map(function(column) {
          return formatValue(row[column]);
        }).join(delimiter);
      });
    }

    function format(rows, columns) {
      if (columns == null) columns = inferColumns(rows);
      return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
    }

    function formatBody(rows, columns) {
      if (columns == null) columns = inferColumns(rows);
      return preformatBody(rows, columns).join("\n");
    }

    function formatRows(rows) {
      return rows.map(formatRow).join("\n");
    }

    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }

    function formatValue(value) {
      return value == null ? ""
          : value instanceof Date ? formatDate(value)
          : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
          : value;
    }

    return {
      parse: parse,
      parseRows: parseRows,
      format: format,
      formatBody: formatBody,
      formatRows: formatRows,
      formatRow: formatRow,
      formatValue: formatValue
    };
  }

  var csv = dsvFormat(",");

  var csvParse = csv.parse;

  function responseText(response) {
    if (!response.ok) throw new Error(response.status + " " + response.statusText);
    return response.text();
  }

  function D3Text(input, init) {
    return fetch(input, init).then(responseText);
  }

  function dsvParse(parse) {
    return function(input, init, row) {
      if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
      return D3Text(input, init).then(function(response) {
        return parse(response, row);
      });
    };
  }

  var csv$1 = dsvParse(csvParse);

  function responseJson(response) {
    if (!response.ok) throw new Error(response.status + " " + response.statusText);
    if (response.status === 204 || response.status === 205) return;
    return response.json();
  }

  function D3Json(input, init) {
    return fetch(input, init).then(responseJson);
  }

  function DataManagerBasic () {
    var Data = {};
    /**
     * Loads data from urls object with following structure:
     * {name: url, ...}
     * Returns promise with loaded data as parameter
     */

    Data.loadDataFromUrls = function (urls) {
      return Promise.all(Object.entries(urls).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            url = _ref2[1];

        if (url.endsWith('.json') || url.includes('application/json')) {
          return D3Json(url).then(function (data) {
            return {
              name: name,
              data: data
            };
          });
        } else if (url.endsWith('.csv') || url.includes('text/csv')) {
          return csv$1(url).then(function (data) {
            return {
              name: name,
              data: data
            };
          });
        } else {
          return D3Text(url).then(function (data) {
            return {
              name: name,
              data: data
            };
          });
        }
      }));
    };
    /**
     * Gets a set of  data in the format:
     * [{name, data}, ...]
     * And attaches it to the public object for access
     */


    Data.processData = function (dataArray) {
      Data.data = {};

      var _iterator = _createForOfIteratorHelper(dataArray),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
              name = _step$value.name,
              data = _step$value.data;
          Data.data[name] = data;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return Data;
    };
    /**
     * Combines loadDataFromUrls and processData in to one function.
     * Takes urls object as input:
     * {name: url, ...}
     * Return a promise
     */


    Data.loadAndProcessDataFromUrls = function (urls) {
      return Data.loadDataFromUrls(urls).then(function (d) {
        Data.processData(d);
      });
    };

    return Data;
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.has` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHas(object, key) {
    return object != null && hasOwnProperty.call(object, key);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$1 = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */
  var Symbol$1 = root$1.Symbol;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$1.toString;

  /** Built-in value references. */
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$2.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag);
  }

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root$1['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /* Built-in method references that are verified to be native. */
  var Map$1 = getNative(root$1, 'Map');

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$1 || ListCache),
      'string': new Hash
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = MapCache;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) &&
      (isArray(object) || isArguments(object));
  }

  /**
   * Checks if `path` is a direct property of `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': 2 } };
   * var other = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b');
   * // => true
   *
   * _.has(object, ['a', 'b']);
   * // => true
   *
   * _.has(other, 'a');
   * // => false
   */
  function has(object, path) {
    return object != null && hasPath(object, path, baseHas);
  }

  function mapData (Data) {
    /**
     * Given a topic id from main topic map, gets the data to the associated sub map
     * and sets it to subMap data attribute.
     * Will throw error if subMaps not loaded or if no subMap can be found with mainTopicId
     */
    Data.setSubMap = function (mainTopicId) {
      if (!has(Data.data, 'subMaps')) {
        throw new Error('Data Error: subMaps were not loaded');
      }

      var s = Data.data.subMaps.filter(function (d) {
        return d.mainTopicId === mainTopicId;
      });

      if (s.length < 1) {
        throw new Error('Data Error: no subMap were found with mainTopicId ' + mainTopicId);
      }

      Data.data.subMap = Data.data.subMaps.filter(function (d) {
        return d.mainTopicId === mainTopicId;
      })[0].subMap;
      return Data;
    };
    /**
     * Given a topic id from main topic map, gets the data to the associated sub map
     * sets it to subMap data attribute, and returns it.
     * 
     * If main topic id is not specified, directly returns the subMap previously set
     * Will throw error if subMap was not set
     */


    Data.getSubMap = function () {
      var mainTopicId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (mainTopicId == null) {
        if (!has(Data.data, 'submap')) {
          throw new Error('Data Error: subMap was not set');
        }

        return Data.data.subMap;
      } else {
        Data.setSubMap(mainTopicId);
        return Data.data.subMap;
      }
    };
    /**
     * given data structure containing an array of topics (map or model)
     * returns the topic with specified topicId, or null
     */


    function getTopic(data, topicId) {
      var t = data.topics.filter(function (t) {
        return t.topicId === topicId;
      });
      return t.length === 0 ? null : t[0];
    }
    /**
     * Given a topic id return the associated topic data from main bubble map
     * Will throw error if mainMap was not loaded and if topicId not found in mainMap
     */


    Data.getTopicMainMap = function (topicId) {
      if (!has(Data.data, 'mainMap')) {
        throw new Error('Data Error: mainMap was not loaded');
      }

      var t = getTopic(Data.data.mainMap, topicId);

      if (t == null) {
        throw new Error('Data Error: topic ' + topicId + ' was not found in mainMap');
      }

      return t;
    };
    /**
     * Given a topic id return the associated topic data from current sub bubble map
     * Will throw error if subMap was not set and if topicId not found in subMap
     */


    Data.getTopicSubMap = function (topicId) {
      if (!has(Data.data, 'subMap')) {
        throw new Error('Data Error: subMap was not set');
      }

      var t = getTopic(Data.data.subMap, topicId);

      if (t == null) {
        throw new Error('Data Error: topic ' + topicId + ' was not found in subMap');
      }

      return t;
    };
  }

  function docData (Data) {
    /**
     * given data structure containing an array of topics (map or model)
     * returns the topic with specified topicId, or null
     */
    function getTopic(data, topicId) {
      var t = data.topics.filter(function (t) {
        return t.topicId === topicId;
      });
      return t.length === 0 ? null : t[0];
    }
    /**
     * Given a topicId from the main model, will set the table rows to the topics's top documents
     * if the topic isn't found sets it to empty
     * Will throw error if mainModel isn't loaded
     */


    Data.setTableRowsMainTopic = function (topicId) {
      if (!has(Data.data, 'mainModel')) {
        throw new Error('Data Error: mainModel was not loaded');
      }

      var t = getTopic(Data.data.mainModel, topicId);
      Data.data.tableRows = t === null ? [] : t.topDocs;
      return Data;
    };
    /**
     * Given a topicId from the sub model, will set the table rows to the topics's top documents
     * if the topic isn't found sets it to empty
     * Will throw error if subModel isn't loaded
     */


    Data.setTableRowsSubTopic = function (topicId) {
      if (!has(Data.data, 'subModel')) {
        throw new Error('Data Error: subModel was not loaded');
      }

      var t = getTopic(Data.data.subModel, topicId);
      Data.data.tableRows = t === null ? [] : t.topDocs;
      return Data;
    };
    /**
     * Returns the rows data for the table.
     * Can specify a number of rows (def 10), and filter function (def return true)
     * Will throw error if table hasn't been set yet
     */


    Data.getTableRows = function () {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      if (!has(Data.data, 'tableRows')) {
        throw new Error('Data Error: tableROws were not set');
      }

      return Data.data.tableRows.filter(filter).slice(0, number);
    };
    /**
     * Given a document id, returns the associated document fomr the current table rows 
     * Will throw error if table is not set or empty or if document not found in table
     */


    Data.getDocument = function (docId) {
      if (!has(Data.data, 'tableRows') || Data.data.tableRows.length == 0) {
        throw new Error('Data Error: tableROws were not set or are empty');
      }

      var d = Data.data.tableRows.filter(function (d) {
        return d.docId == docId;
      });

      if (d.length < 0) {
        throw new Error('Data Error: could not find document ' + docId);
      }

      return d[0];
    };
  }

  function distribData (Data) {
    /**
     * Return the distributions labels
     * Can provide a custom function to transform the text, and custom name of distribution
     * Returns [{value, text}]
     * Will throw error if distribution was not loaded, or no distribution for mainTopics
     * Will go over all topics to get all fields: one topic doesn't guarantee to have all the labels found!
     */
    Data.getDistributionLabels = function () {
      var textFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (d) {
        return d;
      };
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'mainTopics')) {
        throw new Error('Data Error: no distribution for main topics');
      }

      var entry = new Set();

      var _iterator = _createForOfIteratorHelper(Data.data[distributionName].mainTopics),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _t = _step.value;

          _t.distribution.forEach(function (d) {
            return entry.add(d.id);
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (has(Data.data[distributionName], 'subTopics')) {
        var _iterator2 = _createForOfIteratorHelper(Data.data[distributionName].subTopics),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var t = _step2.value;
            t.distribution.forEach(function (d) {
              return entry.add(d.id);
            });
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return Array.from(entry).map(function (v) {
        return {
          value: v,
          text: textFunction(v)
        };
      }).sort(function (a, b) {
        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
      });
    };
    /**
     * Returns the list of topics and weights for a particular fieldName in the distribution topicDistrib
     * Will throw error if fieldName not found in any topic distribution
     */


    function getTopicsDistribution(topicDistrib, fieldName) {
      return topicDistrib.filter(function (d) {
        return d.topicId > -1;
      }).map(function (d) {
        var v = d.distribution.filter(function (e) {
          return e.id === fieldName;
        }).map(function (e) {
          return e.weight;
        });

        if (v.length === 0) {
          throw new Error('Data Error: ' + fieldName + ' not found in distribution');
        }

        v = v[0];
        return {
          key: d.topicId,
          value: v
        };
      });
    }
    /**
     * Returns the list of topics and weights for a particular fieldName in the distribution topicDistrib
     * Normalised across all other fields
     * Will throw error if fieldName not found in any topic distribution
     */


    function getTopicsDistributionNormalisedPerTopic(topicDistrib, fieldName) {
      return topicDistrib.filter(function (d) {
        return d.topicId > -1;
      }).map(function (d) {
        var v = d.distribution.filter(function (e) {
          return e.id === fieldName;
        }).map(function (e) {
          return e.weight / d.total;
        });

        if (v.length === 0) {
          throw new Error('Data Error: ' + fieldName + ' not found in distribution');
        }

        v = v[0];
        return {
          key: d.topicId,
          value: v
        };
      });
    }
    /**
     * Returns the list of topics and weights for a particular fieldName in the distribution topicDistrib
     * Normalised across all topics
     * Will throw error if fieldName not found in any topic distribution
     */


    function getTopicsDistributionNormalisedPerField(topicDistrib, fieldName) {
      var fieldDistribution = topicDistrib.filter(function (d) {
        return d.topicId > -1;
      }).map(function (d) {
        var v = d.distribution.filter(function (e) {
          return e.id === fieldName;
        }).map(function (e) {
          return e.weight;
        });

        if (v.length === 0) {
          throw new Error('Data Error: ' + fieldName + ' not found in distribution');
        }

        v = v[0];
        return {
          key: d.topicId,
          value: v
        };
      });
      var fieldTotal = fieldDistribution.reduce(function (acc, cur) {
        return acc + cur.value;
      }, 0);
      return fieldDistribution.map(function (d) {
        return {
          key: d.key,
          value: d.value / fieldTotal
        };
      });
    }
    /**
     * Returns the topic distribution from the main topics given a distribution fieldName 
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded or if distribution doesn't have main topics
     */


    Data.getMainTopicsDistrib = function (fieldName) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'mainTopics')) {
        throw new Error('Data Error: no distribution for main topics');
      }

      return getTopicsDistribution(Data.data[distributionName].mainTopics, fieldName);
    };
    /**
     * Returns the topic distribution from the sub topics given a distribution fieldName 
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded or if distribution doesn't have sub topics
     */


    Data.getSubTopicsDistrib = function (fieldName) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'subTopics')) {
        throw new Error('Data Error: no distribution for sub topics');
      }

      return getTopicsDistribution(Data.data[distributionName].subTopics, fieldName);
    };
    /**
     * Returns the topic distribution from the main topics given a distribution fieldName 
     * Normalised across other fields
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded or if distribution doesn't have main topics
     */


    Data.getMainTopicsDistribNormPerTopic = function (fieldName) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'mainTopics')) {
        throw new Error('Data Error: no distribution for main topics');
      }

      return getTopicsDistributionNormalisedPerTopic(Data.data[distributionName].mainTopics, fieldName);
    };
    /**
     * Returns the normalised topic distribution from the sub topics given a distribution fieldName 
     * Normalised across other fields
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded or if distribution doesn't have sub topics
     */


    Data.getSubTopicsDistribNormPerTopic = function (fieldName) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'subTopics')) {
        throw new Error('Data Error: no distribution for sub topics');
      }

      return getTopicsDistributionNormalisedPerTopic(Data.data[distributionName].subTopics, fieldName);
    };
    /**
     * Returns the topic distribution from the main topics given a distribution fieldName 
     * Normalised across all topics
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded or if distribution doesn't have main topics
     */


    Data.getMainTopicsDistribNormPerField = function (fieldName) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'mainTopics')) {
        throw new Error('Data Error: no distribution for main topics');
      }

      return getTopicsDistributionNormalisedPerField(Data.data[distributionName].mainTopics, fieldName);
    };
    /**
     * Returns the normalised topic distribution from the sub topics given a distribution fieldName 
     * Normalised across all topics
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded or if distribution doesn't have sub topics
     */


    Data.getSubTopicsDistribNormPerField = function (fieldName) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'subTopics')) {
        throw new Error('Data Error: no distribution for sub topics');
      }

      return getTopicsDistributionNormalisedPerField(Data.data[distributionName].subTopics, fieldName);
    };
    /**
     * Returns the distribution entry for a specific main topic
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded, if distribution doesn't have main topics or if topicId is not found
     */


    Data.getMainTopicDistribEntry = function (topicId) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'mainTopics')) {
        throw new Error('Data Error: no distribution for main topics');
      }

      var t = Data.data[distributionName].mainTopics.filter(function (d) {
        return d.topicId === topicId;
      }).map(function (d) {
        return d.distribution.map(function (d2) {
          return {
            key: d2.id,
            value: d2.weight
          };
        });
      });

      if (t.length === 0) {
        throw new Error('Data Error: no distribution entry for main topic ' + topicId);
      }

      return t[0];
    };
    /**
     * Returns the distribution entry for a specific sub topic
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded, if distribution doesn't have sub topics or if topicId is not found
     */


    Data.getSubTopicDistribEntry = function (topicId) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'subTopics')) {
        throw new Error('Data Error: no distribution for sub topics');
      }

      var t = Data.data[distributionName].subTopics.filter(function (d) {
        return d.topicId === topicId;
      }).map(function (d) {
        return d.distribution.map(function (d2) {
          return {
            key: d2.id,
            value: d2.weight
          };
        });
      });

      if (t.length === 0) {
        throw new Error('Data Error: no distribution entry for sub topic ' + topicId);
      }

      return t[0];
    };
    /**
     * Returns the distribution entry for a specific main topic
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded, if distribution doesn't have main topics or if topicId is not found
     */


    Data.getMainTopicDistribEntryNorm = function (topicId) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'mainTopics')) {
        throw new Error('Data Error: no distribution for main topics');
      }

      var t = Data.data[distributionName].mainTopics.filter(function (d) {
        return d.topicId === topicId;
      }).map(function (d) {
        return d.distribution.map(function (d2) {
          return {
            key: d2.id,
            value: d2.weight / d.total
          };
        });
      });

      if (t.length === 0) {
        throw new Error('Data Error: no distribution entry for main topic ' + topicId);
      }

      return t[0];
    };
    /**
     * Returns the distribution entry for a specific sub topic
     * Can provide a custom name of distribution
     * Will throw error if distribution no loaded, if distribution doesn't have sub topics or if topicId is not found
     */


    Data.getSubTopicDistribEntryNorm = function (topicId) {
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'subTopics')) {
        throw new Error('Data Error: no distribution for sub topics');
      }

      var t = Data.data[distributionName].subTopics.filter(function (d) {
        return d.topicId === topicId;
      }).map(function (d) {
        return d.distribution.map(function (d2) {
          return {
            key: d2.id,
            value: d2.weight / d.total
          };
        });
      });

      if (t.length === 0) {
        throw new Error('Data Error: no distribution entry for sub topic ' + topicId);
      }

      return t[0];
    };
    /**
     * Returns domain data of distribution
     * Can provide list of field names to filter and custom name of distribution
     * Will throw error if distribution no loaded or if domain data not present
     */


    Data.getDistributionDomainData = function () {
      var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var distributionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'distribution';

      if (!has(Data.data, distributionName)) {
        throw new Error("Data Error: distribution ".concat(distributionName, " was not loaded"));
      }

      if (!has(Data.data[distributionName], 'domainData')) {
        throw new Error("Data Error: no domainData found for distribution ".concat(distributionName));
      }

      if (fieldNames.length == 0) {
        return Data.data[distributionName].domainData;
      } else {
        var res = {};

        var _iterator3 = _createForOfIteratorHelper(fieldNames),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var f = _step3.value;

            if (has(Data.data[distributionName].domainData, f)) {
              res[f] = Data.data[distributionName].domainData[f];
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return res;
      }
    };
  }

  var t0 = new Date,
      t1 = new Date;

  function newInterval(floori, offseti, count, field) {

    function interval(date) {
      return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
    }

    interval.floor = function(date) {
      return floori(date = new Date(+date)), date;
    };

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };

    interval.round = function(date) {
      var d0 = interval(date),
          d1 = interval.ceil(date);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [], previous;
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
      while (previous < start && start < stop);
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        if (date >= date) {
          if (step < 0) while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
          } else while (--step >= 0) {
            while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
          }
        }
      });
    };

    if (count) {
      interval.count = function(start, end) {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };

      interval.every = function(step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null
            : !(step > 1) ? interval
            : interval.filter(field
                ? function(d) { return field(d) % step === 0; }
                : function(d) { return interval.count(0, d) % step === 0; });
      };
    }

    return interval;
  }

  var durationMinute = 6e4;
  var durationDay = 864e5;
  var durationWeek = 6048e5;

  var day = newInterval(
    date => date.setHours(0, 0, 0, 0),
    (date, step) => date.setDate(date.getDate() + step),
    (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
    date => date.getDate() - 1
  );

  function weekday(i) {
    return newInterval(function(date) {
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var year = newInterval(function(date) {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function(date) {
    return date.getFullYear();
  });

  // An optimized implementation for this simple case.
  year.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setFullYear(date.getFullYear() + step * k);
    });
  };

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / durationDay;
  }, function(date) {
    return date.getUTCDate() - 1;
  });

  function utcWeekday(i) {
    return newInterval(function(date) {
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / durationWeek;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcYear = newInterval(function(date) {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function(date) {
    return date.getUTCFullYear();
  });

  // An optimized implementation for this simple case.
  utcYear.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
  };

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newDate(y, m, d) {
    return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
  }

  function formatLocale(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    var periodRe = formatRe(locale_periods),
        periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);

    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "f": formatMicroseconds,
      "g": formatYearISO,
      "G": formatFullYearISO,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "q": formatQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatSeconds,
      "u": formatWeekdayNumberMonday,
      "U": formatWeekNumberSunday,
      "V": formatWeekNumberISO,
      "w": formatWeekdayNumberSunday,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear$1,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };

    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "f": formatUTCMicroseconds,
      "g": formatUTCYearISO,
      "G": formatUTCFullYearISO,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "q": formatUTCQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatUTCSeconds,
      "u": formatUTCWeekdayNumberMonday,
      "U": formatUTCWeekNumberSunday,
      "V": formatUTCWeekNumberISO,
      "w": formatUTCWeekdayNumberSunday,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };

    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "f": parseMicroseconds,
      "g": parseYear,
      "G": parseFullYear,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "q": parseQuarter,
      "Q": parseUnixTimestamp,
      "s": parseUnixTimestampSeconds,
      "S": parseSeconds,
      "u": parseWeekdayNumberMonday,
      "U": parseWeekNumberSunday,
      "V": parseWeekNumberISO,
      "w": parseWeekdayNumberSunday,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };

    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function(date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;

        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
            else pad = c === "e" ? " " : "0";
            if (format = formats[c]) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, Z) {
      return function(string) {
        var d = newDate(1900, undefined, 1),
            i = parseSpecifier(d, specifier, string += "", 0),
            week, day$1;
        if (i != string.length) return null;

        // If a UNIX timestamp is specified, return it.
        if ("Q" in d) return new Date(d.Q);
        if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

        // If this is utcParse, never use the local timezone.
        if (Z && !("Z" in d)) d.Z = 0;

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = d.H % 12 + d.p * 12;

        // If the month was not specified, inherit from the quarter.
        if (d.m === undefined) d.m = "q" in d ? d.q : 0;

        // Convert day-of-week and week-of-year to day-of-year.
        if ("V" in d) {
          if (d.V < 1 || d.V > 53) return null;
          if (!("w" in d)) d.w = 1;
          if ("Z" in d) {
            week = utcDate(newDate(d.y, 0, 1)), day$1 = week.getUTCDay();
            week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + (d.w + 6) % 7;
          } else {
            week = localDate(newDate(d.y, 0, 1)), day$1 = week.getDay();
            week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
            week = day.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + (d.w + 6) % 7;
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day$1 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
        }

        // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.
        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }

        // Otherwise, all fields are in local time.
        return localDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatQuarter(d) {
      return 1 + ~~(d.getMonth() / 3);
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    function formatUTCQuarter(d) {
      return 1 + ~~(d.getUTCMonth() / 3);
    }

    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.toString = function() { return specifier; };
        return f;
      },
      parse: function(specifier) {
        var p = newParse(specifier += "", false);
        p.toString = function() { return specifier; };
        return p;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.toString = function() { return specifier; };
        return f;
      },
      utcParse: function(specifier) {
        var p = newParse(specifier += "", true);
        p.toString = function() { return specifier; };
        return p;
      }
    };
  }

  var pads = {"-": "", "_": " ", "0": "0"},
      numberRe = /^\s*\d+/, // note: ignores next directive
      percentRe = /^%/,
      requoteRe = /[\\^$*+?|[\]().{}]/g;

  function pad$1(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    return new Map(names.map((name, i) => [name.toLowerCase(), i]));
  }

  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }

  function parseQuarter(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
  }

  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.s = +n[0], i + n[0].length) : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad$1(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad$1(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad$1(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad$1(1 + day.count(year(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad$1(d.getMilliseconds(), p, 3);
  }

  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }

  function formatMonthNumber(d, p) {
    return pad$1(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad$1(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad$1(d.getSeconds(), p, 2);
  }

  function formatWeekdayNumberMonday(d) {
    var day = d.getDay();
    return day === 0 ? 7 : day;
  }

  function formatWeekNumberSunday(d, p) {
    return pad$1(sunday.count(year(d) - 1, d), p, 2);
  }

  function dISO(d) {
    var day = d.getDay();
    return (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
  }

  function formatWeekNumberISO(d, p) {
    d = dISO(d);
    return pad$1(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
  }

  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad$1(monday.count(year(d) - 1, d), p, 2);
  }

  function formatYear$1(d, p) {
    return pad$1(d.getFullYear() % 100, p, 2);
  }

  function formatYearISO(d, p) {
    d = dISO(d);
    return pad$1(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad$1(d.getFullYear() % 10000, p, 4);
  }

  function formatFullYearISO(d, p) {
    var day = d.getDay();
    d = (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
    return pad$1(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+"))
        + pad$1(z / 60 | 0, "0", 2)
        + pad$1(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad$1(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad$1(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad$1(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad$1(1 + utcDay.count(utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad$1(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }

  function formatUTCMonthNumber(d, p) {
    return pad$1(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad$1(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad$1(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad$1(utcSunday.count(utcYear(d) - 1, d), p, 2);
  }

  function UTCdISO(d) {
    var day = d.getUTCDay();
    return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  }

  function formatUTCWeekNumberISO(d, p) {
    d = UTCdISO(d);
    return pad$1(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
  }

  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad$1(utcMonday.count(utcYear(d) - 1, d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad$1(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCYearISO(d, p) {
    d = UTCdISO(d);
    return pad$1(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad$1(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCFullYearISO(d, p) {
    var day = d.getUTCDay();
    d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
    return pad$1(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  function formatUnixTimestamp(d) {
    return +d;
  }

  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1000);
  }

  var locale;
  var timeFormat;
  var timeParse;

  defaultLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    timeFormat = locale.format;
    timeParse = locale.parse;
    locale.utcFormat;
    locale.utcParse;
    return locale;
  }

  function ascending$1(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(f) {
    let delta = f;
    let compare = f;

    if (f.length === 1) {
      delta = (d, x) => f(d) - x;
      compare = ascendingComparator(f);
    }

    function left(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    }

    function right(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }

    function center(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }

    return {left, center, right};
  }

  function ascendingComparator(f) {
    return (d, x) => ascending$1(f(d), x);
  }

  function number(x) {
    return x === null ? NaN : +x;
  }

  const ascendingBisect = bisector(ascending$1);
  const bisectRight = ascendingBisect.right;
  const bisectCenter = bisector(number).center;

  function D3Extent(values, valueof) {
    let min;
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
    return [min, max];
  }

  function identity(x) {
    return x;
  }

  function rollup(values, reduce, ...keys) {
    return nest(values, identity, reduce, keys);
  }

  function nest(values, map, reduce, keys) {
    return (function regroup(values, i) {
      if (i >= keys.length) return reduce(values);
      const groups = new Map();
      const keyof = keys[i++];
      let index = -1;
      for (const value of values) {
        const key = keyof(value, ++index, values);
        const group = groups.get(key);
        if (group) group.push(value);
        else groups.set(key, [value]);
      }
      for (const [key, values] of groups) {
        groups.set(key, regroup(values, i));
      }
      return map(groups);
    })(values, 0);
  }

  var e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);

  function ticks(start, stop, count) {
    var reverse,
        i = -1,
        n,
        ticks,
        step;

    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [start];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      start = Math.ceil(start / step);
      stop = Math.floor(stop / step);
      ticks = new Array(n = Math.ceil(stop - start + 1));
      while (++i < n) ticks[i] = (start + i) * step;
    } else {
      step = -step;
      start = Math.ceil(start * step);
      stop = Math.floor(stop * step);
      ticks = new Array(n = Math.ceil(stop - start + 1));
      while (++i < n) ticks[i] = (start + i) / step;
    }

    if (reverse) ticks.reverse();

    return ticks;
  }

  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log(step) / Math.LN10),
        error = step / Math.pow(10, power);
    return power >= 0
        ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
        : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }

  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;
    else if (error >= e5) step1 *= 5;
    else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function max(values, valueof) {
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    }
    return max;
  }

  function min(values, valueof) {
    let min;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    }
    return min;
  }

  function permute(source, keys) {
    return Array.from(keys, key => source[key]);
  }

  function sequence(start, stop, step) {
    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

    var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n);

    while (++i < n) {
      range[i] = start + i * step;
    }

    return range;
  }

  function sum(values, valueof) {
    let sum = 0;
    if (valueof === undefined) {
      for (let value of values) {
        if (value = +value) {
          sum += value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if (value = +valueof(value, ++index, values)) {
          sum += value;
        }
      }
    }
    return sum;
  }

  function sort(values, f = ascending$1) {
    if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
    values = Array.from(values);
    if (f.length === 1) {
      f = values.map(f);
      return permute(values, values.map((d, i) => i).sort((i, j) => ascending$1(f[i], f[j])));
    }
    return values.sort(f);
  }

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  /** Used as references for various `Number` constants. */
  var INFINITY$2 = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY$2 || value === -INFINITY$2) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsFinite = root$1.isFinite,
      nativeMin = Math.min;

  /**
   * Creates a function like `_.round`.
   *
   * @private
   * @param {string} methodName The name of the `Math` method to use when rounding.
   * @returns {Function} Returns the new round function.
   */
  function createRound(methodName) {
    var func = Math[methodName];
    return function(number, precision) {
      number = toNumber(number);
      precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
      if (precision && nativeIsFinite(number)) {
        // Shift with exponential notation to avoid floating-point issues.
        // See [MDN](https://mdn.io/round#Examples) for more details.
        var pair = (toString(number) + 'e').split('e'),
            value = func(pair[0] + 'e' + (+pair[1] + precision));

        pair = (toString(value) + 'e').split('e');
        return +(pair[0] + 'e' + (+pair[1] - precision));
      }
      return func(number);
    };
  }

  /**
   * Computes `number` rounded to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round.
   * @param {number} [precision=0] The precision to round to.
   * @returns {number} Returns the rounded number.
   * @example
   *
   * _.round(4.006);
   * // => 4
   *
   * _.round(4.006, 2);
   * // => 4.01
   *
   * _.round(4060, -2);
   * // => 4100
   */
  var round = createRound('round');

  function trendData (Data) {
    /**
     * Returns a sum function for date, takes parsing format of input date,
     * and output format
     */
    Data.getTrendSumByFunction = function (inParse, outFormat) {
      return function (d) {
        return timeFormat(outFormat)(timeParse(inParse)(d));
      };
    };
    /* Duplicate of above */


    Data.timeFormatConverter = function (inParse, outFormat) {
      return function (d) {
        return timeFormat(outFormat)(timeParse(inParse)(d));
      };
    };
    /**
     * Returns the topic entry from a trend distribution
     * will throw error if topic not found
     */


    function getTopicTrendEntry(distrib, topicId) {
      var t = distrib.filter(function (d) {
        return d.topicId == topicId;
      });

      if (t.length === 0) {
        throw new Error('Data error: topic ' + topicId + ' not found in trend');
      }

      return t[0];
    }
    /**
     * Filters out the date outside of the time range from the distribution and returns the distribution
     * dateDistrib: [{date,value}]
     * timeRange: [format, minDate, maxDate]
     * will throw error in timeRange is not complete
     */


    function filterTimeRange(dateDistrib, timeRange) {
      if (timeRange.length !== 3) {
        throw new Error('Data Error: time range incomplete: [format, minDate (inc.), maxDate (exc.)]');
      }

      var parse = timeParse(timeRange[0]);
      return dateDistrib.filter(function (d) {
        return parse(d.date) >= parse(timeRange[1]) && parse(d.date) < parse(timeRange[2]);
      });
    }
    /**
     * Groups and sums the entries in the date distribution according to the sumBy function
     * dateDistrib: [{date,value}]
     * sumBy: date=>dateInNewFormat
     */


    function sumDates(dateDistrib, sumBy) {
      return sort(Array.from(rollup(dateDistrib, function (d) {
        return round(sum(d, function (d2) {
          return d2.value;
        }), 4);
      }, function (d) {
        return sumBy(d.date);
      })), function (d) {
        return d[0];
      }).map(function (d) {
        return {
          date: d[0],
          value: d[1]
        };
      });
    }
    /**
     * Returns a main topic date distribution given topic id
     * returns in format: [{date:string,value:number}]
     * sumBy: date converter function
     * timeRange: [format, minDate (inc.), maxDate (exc.)]
     * will throw error if trend data not loaded or if trend data doesn't have main topics
     */


    Data.getMainTopicTrend = function (topicId) {
      var sumBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var timeRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!has(Data.data, 'trend')) {
        throw new Error('Data Error: trend was not loaded');
      }

      if (!has(Data.data.trend, 'mainTopics')) {
        throw new Error('Data Error: no trend for main topics');
      }

      var dateDistrib = getTopicTrendEntry(Data.data.trend.mainTopics, topicId).distribution.map(function (d) {
        return {
          date: d.id,
          value: d.weight
        };
      });

      if (timeRange !== null) {
        dateDistrib = filterTimeRange(dateDistrib, timeRange);
      }

      if (sumBy !== null) {
        dateDistrib = sumDates(dateDistrib, sumBy);
      }

      return dateDistrib;
    };
    /**
     * Returns a sub topic date distribution given topic id
     * returns in format: [{date:string,value:number}]
     * sumBy: date converter function
     * timeRange: [format, minDate (inc.), maxDate (exc.)]
     * will throw error if trend data not loaded or if trend data doesn't have sub topics
     */


    Data.getSubTopicTrend = function (topicId) {
      var sumBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var timeRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!has(Data.data, 'trend')) {
        throw new Error('Data Error: trend was not loaded');
      }

      if (!has(Data.data.trend, 'subTopics')) {
        throw new Error('Data Error: no trend for sub topics');
      }

      var dateDistrib = getTopicTrendEntry(Data.data.trend.subTopics, topicId).distribution.map(function (d) {
        return {
          date: d.id,
          value: d.weight
        };
      });

      if (timeRange !== null) {
        dateDistrib = filterTimeRange(dateDistrib, timeRange);
      }

      if (sumBy !== null) {
        dateDistrib = sumDates(dateDistrib, sumBy);
      }

      return dateDistrib;
    };
    /**
     * Finds the maximum value in the trend distribution
     * sumBy: date converter function to aggregate values
     * Will throw error in trned was not loaded or if trend has neither main or sub topics
     */


    Data.getMaxTrend = function () {
      var sumBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var max$1 = -1; // let reduceWeights = d=>d.distribution.reduce((acc,val)=>{return acc+val.weight;},0);

      var maxWeights = function maxWeights(d) {
        return max(d.distribution, function (d2) {
          return d2.weight;
        });
      };

      var maxWeightsSumBy = function maxWeightsSumBy(d) {
        return max(sumDates(d.distribution.map(function (d2) {
          return {
            date: d2.id,
            value: d2.weight
          };
        }), sumBy), function (d2) {
          return d2.value;
        });
      };

      var fun = sumBy === null ? maxWeights : maxWeightsSumBy;

      if (!has(Data.data, 'trend')) {
        throw new Error('Data Error: trend was not loaded');
      }

      if (has(Data.data.trend, 'subTopics')) {
        max$1 = Math.max(max$1, max(Data.data.trend.subTopics, fun));
      }

      if (has(Data.data.trend, 'mainTopics')) {
        max$1 = Math.max(max$1, max(Data.data.trend.mainTopics, fun));
      }

      if (!has(Data.data.trend, 'subTopics') && !has(Data.data.trend, 'mainSubtopics')) {
        throw new Error('Data Error: no trend data for topics');
      }

      return max$1;
    };
  }

  function searchData (Data) {
    /**
     * Returns the list of labels in the index
     * Will save the list if not accessed before
     * Will trhow error if labels index was not loaded
     */
    function getLabels() {
      if (!has(Data.data, 'labelsIndex')) {
        throw new Error('Data error: labelsIndex was not loaded');
      }

      if (!has(Data.data, 'labels')) {
        Data.data.labels = Object.keys(Data.data.labelsIndex);
      }

      return Data.data.labels;
    }
    /**
     * Separates search terms from a query
     * e.g. "A and B or C and D or E" => [[A,B], [C,D], [E]]
     */


    function getSearchTerms() {
      // split strings for 'or' and 'and' queries
      var orSplits = [';', ' or ', '*'];
      var andSplits = [' and ', '+', ' ']; // ' ' needs to be last!!
      // search query

      var search = []; // building the search query from a string

      if (typeof Data.data.searchTerm !== 'undefined' && Data.data.searchTerm !== null && Data.data.searchTerm.length > 0) {
        search = [Data.data.searchTerm]; // separate 'or' queries

        orSplits.forEach(function (o) {
          var parts = [];
          search.forEach(function (s) {
            return s.split(o).forEach(function (p) {
              return parts.push(p);
            });
          });
          search = parts;
        }); // separate 'and' queries within 'or's

        search = search.map(function (s) {
          return [s];
        });
        andSplits.forEach(function (a) {
          search = search.map(function (s) {
            var parts = [];
            s.forEach(function (t) {
              return t.split(a).forEach(function (p) {
                return parts.push(p);
              });
            });
            return parts;
          });
        });
      }

      return search;
    }
    /**
     * Sets the search string
     */


    Data.setSearchTerm = function (searchTerm) {
      Data.data.searchTerm = searchTerm === '' || searchTerm === null ? null : searchTerm.toLowerCase();
      return Data;
    };
    /**
     * Adds word to a search, or removes it if the word is already in a search
     * if searchValue if not set (or null), will use and update searchTerm
     * returns the process searchValue.
     */


    Data.processWordInSearch = function (word) {
      var searchValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ';';
      // test if word already in search
      var w = word.toLowerCase();
      var s = searchValue == null ? Data.data.searchTerm : searchValue.toLowerCase();

      if (typeof s == 'undefined' || s == null) {
        s = '';
      }

      var r = new RegExp(";?\\s*".concat(w, "(\\s|;|$)"), 'gi');
      var inSearch = r.test(s);
      var n = '';

      if (!inSearch) {
        // if word not in search, append it using specified method
        var a = append.endsWith(' ') ? append : append + ' ';
        n = s == '' ? w : s + a + w;
      } else {
        // if word already in search, remove it
        n = s.replace(w, '').replace(' ;', ';').replace('  ', ' ').replace(';;', ';');

        while (n.startsWith(';') || n.startsWith(' ')) {
          n = n.substring(1, n.length);
        }
      }

      if (searchValue == null) {
        Data.setSearchTerm(n);
      }

      return n;
    };
    /**
     * Fills provided set ids with docIds of documents containing all provided terms
     * Will throw error if labels index was not loaded
     */


    function searchAllTermsInDocuments(terms, docsIds) {
      if (!has(Data.data, 'labelsIndex')) {
        throw new Error('Data error: labelsIndex was not loaded');
      } // get all doc ids with occurrence of terms


      var docs = terms.map(function (t) {
        var l = Data.data.labelsIndex[t];
        return typeof l == 'undefined' ? [] : l.documents;
      }); // filter doc ids with occurrence of all terms

      var ids = docs.reduce(function (acc, cur, idx) {
        return idx == 0 ? cur : acc.filter(function (i) {
          return cur.includes(i);
        });
      }, []); // fill sets

      ids.forEach(function (i) {
        return docsIds.add(i);
      });
    }
    /**
     * Returns doc ids from a search
     * Will throw error if labels index not loaded
     */


    Data.getDocIdsFromSearch = function () {
      if (!has(Data.data, 'labelsIndex')) {
        throw new Error('Data error: labelsIndex was not loaded');
      }

      var search = getSearchTerms();
      var docIds = new Set(); // evaluating query and populating the sets of ids

      if (search.length == 1) {
        // no 'or'
        var last = search[0].pop(); // extract last term

        var terms = search[0].filter(function (t) {
          return t.length > 0;
        }); // remove all empty terms

        terms.push(last); // re-add last term

        if (terms.length == 1 && terms[0].length > 0) {
          // if only one non-empty term
          // partial search
          getLabels().filter(function (l) {
            return l.toLowerCase().includes(terms[0]);
          }).forEach(function (l) {
            Data.data.labelsIndex[l].documents.forEach(function (t) {
              return docIds.add(t);
            });
          });
        } else if (terms.length == 2 && terms[1].length == 0) {
          // if exactly two terms and second one is empty
          // exact search
          searchAllTermsInDocuments([terms[0]], docIds);
        } else if (terms.length >= 2) {
          // if two or more terms
          terms = terms.filter(function (t) {
            return t.length > 0;
          }); // remove potential empty term re-added

          searchAllTermsInDocuments(terms, docIds);
        }
      } else if (search.length >= 2) {
        // one or more 'or'
        search.forEach(function (s) {
          var terms = s.filter(function (t) {
            return t.length > 0;
          }); // remove all empty terms

          searchAllTermsInDocuments(terms, docIds);
        });
      }

      return Array.from(docIds);
    };
    /**
     * Fills provided sets of ids with topicIds of topics containing all provided terms
     * Will throw error if labels index was not loaded
     */


    function searchAllTermsInTopics(terms, mainTopicIds, subTopicIds) {
      if (!has(Data.data, 'labelsIndex')) {
        throw new Error('Data error: labelsIndex was not loaded');
      } // get all topic ids with occurrence of terms


      var mains = terms.map(function (t) {
        var l = Data.data.labelsIndex[t];
        return typeof l == 'undefined' ? [] : l.mainTopics;
      });
      var subs = terms.map(function (t) {
        var l = Data.data.labelsIndex[t];
        return typeof l == 'undefined' ? [] : typeof l.subTopics == 'undefined' ? [] : l.subTopics;
      }); // filter topic ids with occurrence of all terms

      var mainIds = mains.reduce(function (acc, cur, idx) {
        return idx == 0 ? cur : acc.filter(function (i) {
          return cur.includes(i);
        });
      }, []);
      var subIds = subs.reduce(function (acc, cur, idx) {
        return idx == 0 ? cur : acc.filter(function (i) {
          return cur.map(function (c) {
            return c[0];
          }).includes(i[0]);
        });
      }, []); // fill sets

      mainIds.forEach(function (i) {
        return mainTopicIds.add(i);
      });
      subIds.forEach(function (i) {
        subTopicIds.add(i[0]);
        i[1].forEach(function (i2) {
          return mainTopicIds.add(i2);
        });
      });
    }
    /**
     * Return the ids of topics from a search
     * Will throw error if labels index was not loaded
     */


    Data.getTopicIdsFromSearch = function () {
      if (!has(Data.data, 'labelsIndex')) {
        throw new Error('Data error: labelsIndex was not loaded');
      }

      var search = getSearchTerms(); // sets of ids to be returned

      var mainTopicIds = new Set();
      var subTopicIds = new Set(); // evaluating query and populating the sets of ids

      if (search.length == 1) {
        // no 'or'
        var last = search[0].pop(); // extract last term

        var terms = search[0].filter(function (t) {
          return t.length > 0;
        }); // remove all empty terms

        terms.push(last); // re-add last term

        if (terms.length == 1 && terms[0].length > 0) {
          // if only one non-empty term
          // partial search
          getLabels().filter(function (l) {
            return l.toLowerCase().includes(terms[0]);
          }).forEach(function (l) {
            Data.data.labelsIndex[l].mainTopics.forEach(function (t) {
              return mainTopicIds.add(t);
            });

            if (typeof Data.data.labelsIndex[l].subTopics !== 'undefined') {
              Data.data.labelsIndex[l].subTopics.forEach(function (t) {
                subTopicIds.add(t[0]);
                t[1].forEach(function (t2) {
                  return mainTopicIds.add(t2);
                });
              });
            }
          });
        } else if (terms.length == 2 && terms[1].length == 0) {
          // if exactly two terms and second one is empty
          // exact search
          searchAllTermsInTopics([terms[0]], mainTopicIds, subTopicIds);
        } else if (terms.length >= 2) {
          // if two or more terms
          terms = terms.filter(function (t) {
            return t.length > 0;
          }); // remove potential empty term re-added

          searchAllTermsInTopics(terms, mainTopicIds, subTopicIds);
        }
      } else if (search.length >= 2) {
        // one or more 'or'
        search.forEach(function (s) {
          var terms = s.filter(function (t) {
            return t.length > 0;
          }); // remove all empty terms

          searchAllTermsInTopics(terms, mainTopicIds, subTopicIds);
        });
      } // switch from sets to arrays


      mainTopicIds = Array.from(mainTopicIds);
      subTopicIds = Array.from(subTopicIds);
      return {
        mainTopicIds: mainTopicIds,
        subTopicIds: subTopicIds
      };
    };
    /** 
     * Returns a subset of labels from a search
     * Will throw error if labels index not loaded (by proxy)
     */


    Data.getLabelsFromSearch = function () {
      var search = getSearchTerms();
      var labels = []; // evaluating query and populating the sets of labels

      if (search.length == 1) {
        // no 'or'
        var last = search[0].pop(); // extract last term

        var terms = search[0].filter(function (t) {
          return t.length > 0;
        }); // remove all empty terms

        terms.push(last); // re-add last term

        if (terms.length == 1 && terms[0].length > 0) {
          // if only one non-empty term
          // partial search
          getLabels().filter(function (l) {
            return l.toLowerCase().includes(terms[0]);
          }).forEach(function (l) {
            labels.push(l);
          });
        } else if (terms.length == 2 && terms[1].length == 0) {
          // if exactly two terms and second one is empty
          // exact search
          getLabels().filter(function (l) {
            return l.toLowerCase() == terms[0];
          }).forEach(function (l) {
            labels.push(l);
          });
        } else if (terms.length >= 2) {
          // if two or more terms
          terms = terms.filter(function (t) {
            return t.length > 0;
          }); // remove potential empty term re-added

          getLabels().filter(function (l) {
            return terms.includes(l.toLowerCase());
          }).forEach(function (l) {
            labels.push(l);
          });
        }
      } else if (search.length >= 2) {
        // one or more 'or'
        search.forEach(function (s) {
          var terms = s.filter(function (t) {
            return t.length > 0;
          }); // remove all empty terms

          getLabels().filter(function (l) {
            return terms.includes(l.toLowerCase());
          }).forEach(function (l) {
            labels.push(l);
          });
        });
      }

      return labels;
    };
    /**
     *  Combines getLabelsFromSearch, getTopicIdsFromSearch, and getDocIdsFromSearch
     */


    Data.getFromSearch = function () {
      return {
        labels: Data.getLabelsFromSearch(),
        topics: Data.getTopicIdsFromSearch(),
        docs: Data.getDocIdsFromSearch()
      };
    };
  }

  function statData (Data) {
    function getFinalLL(modelLL) {
      if (!has(modelLL, 'nIter')) {
        throw new Error('Data Error: model does not have number of iterations');
      }

      if (!has(modelLL, 'LL')) {
        throw new Error('Data Error: model does not have final log-likelihood');
      }

      return {
        nIter: modelLL.nIter,
        LL: modelLL.LL
      };
    }
    /**
     * Returns the final log-likelihood information for the main model
     * Will throw an error if log-likelihood file for main model was not loaded
     * and if log-likehodd files does not have total number of iteration or final log-likelihood
     * returns data in the format [{nIter,LL}] total number of iteration and final log-likehood
     */


    Data.getFinalMainLL = function () {
      if (!has(Data.data, 'mainLL')) {
        throw new Error('Data Error: main model log-likelihood was not loaded');
      }

      return getFinalLL(Data.data.mainLL);
    };
    /**
     * Returns the final log-likelihood information for the sub model
     * Will throw an error if log-likelihood file for sub model was not loaded
     * and if log-likehodd files does not have total number of iteration or final log-likelihood
     * returns data in the format [{nIter,LL}] total number of iteration and final log-likehood
     */


    Data.getFinalSubLL = function () {
      if (!has(Data.data, 'subLL')) {
        throw new Error('Data Error: sub model log-likelihood was not loaded');
      }

      return getFinalLL(Data.data.subLL);
    };

    function getLLData(modelLL) {
      if (!has(modelLL, 'entries')) {
        throw new Error('Data Error: model does not have entries of log-likelihood history');
      }

      return modelLL.entries;
    }
    /**
     * Returns the log-likelihood history data for the main model
     * Will throw an error if log-likelihood file for main model was not loaded
     * and if log-likehodd files does not have entries
     * returns data in the format [{x,y}] x is iteration and y is log-likelihood
     */


    Data.getMainLLData = function () {
      if (!has(Data.data, 'mainLL')) {
        throw new Error('Data Error: main model log-likelihood was not loaded');
      }

      return getLLData(Data.data.mainLL);
    };
    /**
     * Returns the log-likelihood history data for the sub model
     * Will throw an error if log-likelihood file for sub model was not loaded
     * and if log-likehodd files does not have entries
     * returns data in the format [{x,y}] x is iteration and y is log-likelihood
     */


    Data.getSubLLData = function () {
      if (!has(Data.data, 'subLL')) {
        throw new Error('Data Error: sub model log-likelihood was not loaded');
      }

      return getLLData(Data.data.subLL);
    };
    /**
     * Returns the main model metadata
     * will throw an error if main model was not loaded,
     * or if main model does not have metadata
     */


    Data.getMainModelMetadata = function () {
      if (!has(Data.data, 'mainModel')) {
        throw new Error('Data Error: mainModel was not loaded');
      }

      if (!has(Data.data.mainModel, 'metadata')) {
        throw new Error('Data Error: mainModel does not have metadata');
      }

      return Data.data.mainModel.metadata;
    };
    /**
     * Returns the sub model metadata
     * will throw an error if sub model was not loaded,
     * or if sub model does not have metadata
     */


    Data.getSubModelMetadata = function () {
      if (!has(Data.data, 'subModel')) {
        throw new Error('Data Error: subModel was not loaded');
      }

      if (!has(Data.data.subModel, 'metadata')) {
        throw new Error('Data Error: subModel does not have metadata');
      }

      return Data.data.subModel.metadata;
    };
  }

  function formatDecimal(x) {
    return Math.abs(x = Math.round(x)) >= 1e21
        ? x.toLocaleString("en").replace(/,/g, "")
        : x.toString(10);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].
  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }

  function exponent(x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }

  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width === undefined ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
        + (this.trim ? "~" : "")
        + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": (x) => Math.round(x).toString(2),
    "c": (x) => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": (x) => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": (x) => Math.round(x).toString(16).toUpperCase(),
    "x": (x) => Math.round(x).toString(16)
  };

  function identity$1(x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function formatLocale$1(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "−" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") comma = true, type = "g";

      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision === undefined ? 6
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i, n, c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Determine the sign. -0 is not less than 0, but 1 / -0 is!
          var valueNegative = value < 0 || 1 / value < 0;

          // Perform the initial formatting.
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = formatTrim(value);

          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": value = valuePrefix + value + valueSuffix + padding; break;
          case "=": value = valuePrefix + padding + value + valueSuffix; break;
          case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
          default: value = padding + valuePrefix + value + valueSuffix; break;
        }

        return numerals(value);
      }

      format.toString = function() {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale$1;
  var format;
  var formatPrefix;

  defaultLocale$1({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  function defaultLocale$1(definition) {
    locale$1 = formatLocale$1(definition);
    format = locale$1.format;
    formatPrefix = locale$1.formatPrefix;
    return locale$1;
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  /**
   * Indexes for all substring searches (e.g. the term "cat" is indexed as "c", "ca", "cat", "a", "at", and "t").
   */

  /**
   * Indexes for prefix searches (e.g. the term "cat" is indexed as "c", "ca", and "cat" allowing prefix search lookups).
   */
  var PrefixIndexStrategy = /*#__PURE__*/function () {
    function PrefixIndexStrategy() {}

    var _proto = PrefixIndexStrategy.prototype;

    /**
     * @inheritDocs
     */
    _proto.expandToken = function expandToken(token) {
      var expandedTokens = [];
      var string = '';

      for (var i = 0, length = token.length; i < length; ++i) {
        string += token.charAt(i);
        expandedTokens.push(string);
      }

      return expandedTokens;
    };

    return PrefixIndexStrategy;
  }();

  /**
   * Sanitizes text by converting to a locale-friendly lower-case version and triming leading and trailing whitespace.
   */
  var LowerCaseSanitizer = /*#__PURE__*/function () {
    function LowerCaseSanitizer() {}

    var _proto = LowerCaseSanitizer.prototype;

    /**
     * @inheritDocs
     */
    _proto.sanitize = function sanitize(text) {
      return text ? text.toLocaleLowerCase().trim() : '';
    };

    return LowerCaseSanitizer;
  }();

  /**
   * Find and return a nested object value.
   *
   * @param object to crawl
   * @param path Property path
   * @returns {any}
   */
  function getNestedFieldValue(object, path) {
    path = path || [];
    object = object || {};
    var value = object; // walk down the property path

    for (var i = 0; i < path.length; i++) {
      value = value[path[i]];

      if (value == null) {
        return null;
      }
    }

    return value;
  }

  /**
   * Search index capable of returning results matching a set of tokens and ranked according to TF-IDF.
   */
  var TfIdfSearchIndex = /*#__PURE__*/function () {
    function TfIdfSearchIndex(uidFieldName) {
      this._uidFieldName = uidFieldName;
      this._tokenToIdfCache = {};
      this._tokenMap = {};
    }
    /**
     * @inheritDocs
     */


    var _proto = TfIdfSearchIndex.prototype;

    _proto.indexDocument = function indexDocument(token, uid, doc) {
      this._tokenToIdfCache = {}; // New index invalidates previous IDF caches

      var tokenMap = this._tokenMap;
      var tokenDatum;

      if (typeof tokenMap[token] !== 'object') {
        tokenMap[token] = tokenDatum = {
          $numDocumentOccurrences: 0,
          $totalNumOccurrences: 1,
          $uidMap: {}
        };
      } else {
        tokenDatum = tokenMap[token];
        tokenDatum.$totalNumOccurrences++;
      }

      var uidMap = tokenDatum.$uidMap;

      if (typeof uidMap[uid] !== 'object') {
        tokenDatum.$numDocumentOccurrences++;
        uidMap[uid] = {
          $document: doc,
          $numTokenOccurrences: 1
        };
      } else {
        uidMap[uid].$numTokenOccurrences++;
      }
    }
    /**
     * @inheritDocs
     */
    ;

    _proto.search = function search(tokens, corpus) {
      var uidToDocumentMap = {};

      for (var i = 0, numTokens = tokens.length; i < numTokens; i++) {
        var token = tokens[i];
        var tokenMetadata = this._tokenMap[token]; // Short circuit if no matches were found for any given token.

        if (!tokenMetadata) {
          return [];
        }

        if (i === 0) {
          var keys = Object.keys(tokenMetadata.$uidMap);

          for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
            var uid = keys[j];
            uidToDocumentMap[uid] = tokenMetadata.$uidMap[uid].$document;
          }
        } else {
          var keys = Object.keys(uidToDocumentMap);

          for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
            var uid = keys[j];

            if (typeof tokenMetadata.$uidMap[uid] !== 'object') {
              delete uidToDocumentMap[uid];
            }
          }
        }
      }

      var documents = [];

      for (var uid in uidToDocumentMap) {
        documents.push(uidToDocumentMap[uid]);
      }

      var calculateTfIdf = this._createCalculateTfIdf(); // Return documents sorted by TF-IDF


      return documents.sort(function (documentA, documentB) {
        return calculateTfIdf(tokens, documentB, corpus) - calculateTfIdf(tokens, documentA, corpus);
      });
    };

    _proto._createCalculateIdf = function _createCalculateIdf() {
      var tokenMap = this._tokenMap;
      var tokenToIdfCache = this._tokenToIdfCache;
      return function calculateIdf(token, documents) {
        if (!tokenToIdfCache[token]) {
          var numDocumentsWithToken = typeof tokenMap[token] !== 'undefined' ? tokenMap[token].$numDocumentOccurrences : 0;
          tokenToIdfCache[token] = 1 + Math.log(documents.length / (1 + numDocumentsWithToken));
        }

        return tokenToIdfCache[token];
      };
    };

    _proto._createCalculateTfIdf = function _createCalculateTfIdf() {
      var tokenMap = this._tokenMap;
      var uidFieldName = this._uidFieldName;

      var calculateIdf = this._createCalculateIdf();

      return function calculateTfIdf(tokens, document, documents) {
        var score = 0;

        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
          var token = tokens[i];
          var inverseDocumentFrequency = calculateIdf(token, documents);

          if (inverseDocumentFrequency === Infinity) {
            inverseDocumentFrequency = 0;
          }

          var uid;

          if (uidFieldName instanceof Array) {
            uid = document && getNestedFieldValue(document, uidFieldName);
          } else {
            uid = document && document[uidFieldName];
          }

          var termFrequency = typeof tokenMap[token] !== 'undefined' && typeof tokenMap[token].$uidMap[uid] !== 'undefined' ? tokenMap[token].$uidMap[uid].$numTokenOccurrences : 0;
          score += termFrequency * inverseDocumentFrequency;
        }

        return score;
      };
    };

    return TfIdfSearchIndex;
  }();

  var REGEX = /[^a-zа-яё0-9\-']+/i;
  /**
   * Simple tokenizer that splits strings on whitespace characters and returns an array of all non-empty substrings.
   */

  var SimpleTokenizer = /*#__PURE__*/function () {
    function SimpleTokenizer() {}

    var _proto = SimpleTokenizer.prototype;

    /**
     * @inheritDocs
     */
    _proto.tokenize = function tokenize(text) {
      return text.split(REGEX).filter(function (text) {
        return text;
      } // Filter empty tokens
      );
    };

    return SimpleTokenizer;
  }();

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Simple client-side searching within a set of documents.
   *
   * <p>Documents can be searched by any number of fields. Indexing and search strategies are highly customizable.
   */
  var Search = /*#__PURE__*/function () {
    /**
     * Array containing either a property name or a path (list of property names) to a nested value
     */

    /**
     * Constructor.
     * @param uidFieldName Field containing values that uniquely identify search documents; this field's values are used
     *                     to ensure that a search result set does not contain duplicate objects.
     */
    function Search(uidFieldName) {
      if (!uidFieldName) {
        throw Error('js-search requires a uid field name constructor parameter');
      }

      this._uidFieldName = uidFieldName; // Set default/recommended strategies

      this._indexStrategy = new PrefixIndexStrategy();
      this._searchIndex = new TfIdfSearchIndex(uidFieldName);
      this._sanitizer = new LowerCaseSanitizer();
      this._tokenizer = new SimpleTokenizer();
      this._documents = [];
      this._searchableFields = [];
    }
    /**
     * Override the default index strategy.
     * @param value Custom index strategy
     * @throws Error if documents have already been indexed by this search instance
     */


    var _proto = Search.prototype;

    /**
     * Add a searchable document to the index. Document will automatically be indexed for search.
     * @param document
     */
    _proto.addDocument = function addDocument(document) {
      this.addDocuments([document]);
    }
    /**
     * Adds searchable documents to the index. Documents will automatically be indexed for search.
     * @param document
     */
    ;

    _proto.addDocuments = function addDocuments(documents) {
      this._documents = this._documents.concat(documents);
      this.indexDocuments_(documents, this._searchableFields);
    }
    /**
     * Add a new searchable field to the index. Existing documents will automatically be indexed using this new field.
     *
     * @param field Searchable field or field path. Pass a string to index a top-level field and an array of strings for nested fields.
     */
    ;

    _proto.addIndex = function addIndex(field) {
      this._searchableFields.push(field);

      this.indexDocuments_(this._documents, [field]);
    }
    /**
     * Search all documents for ones matching the specified query text.
     * @param query
     * @returns {Array<Object>}
     */
    ;

    _proto.search = function search(query) {
      var tokens = this._tokenizer.tokenize(this._sanitizer.sanitize(query));

      return this._searchIndex.search(tokens, this._documents);
    }
    /**
     * @param documents
     * @param _searchableFields Array containing property names and paths (lists of property names) to nested values
     * @private
     */
    ;

    _proto.indexDocuments_ = function indexDocuments_(documents, _searchableFields) {
      this._initialized = true;
      var indexStrategy = this._indexStrategy;
      var sanitizer = this._sanitizer;
      var searchIndex = this._searchIndex;
      var tokenizer = this._tokenizer;
      var uidFieldName = this._uidFieldName;

      for (var di = 0, numDocuments = documents.length; di < numDocuments; di++) {
        var doc = documents[di];
        var uid;

        if (uidFieldName instanceof Array) {
          uid = getNestedFieldValue(doc, uidFieldName);
        } else {
          uid = doc[uidFieldName];
        }

        for (var sfi = 0, numSearchableFields = _searchableFields.length; sfi < numSearchableFields; sfi++) {
          var fieldValue;
          var searchableField = _searchableFields[sfi];

          if (searchableField instanceof Array) {
            fieldValue = getNestedFieldValue(doc, searchableField);
          } else {
            fieldValue = doc[searchableField];
          }

          if (fieldValue != null && typeof fieldValue !== 'string' && fieldValue.toString) {
            fieldValue = fieldValue.toString();
          }

          if (typeof fieldValue === 'string') {
            var fieldTokens = tokenizer.tokenize(sanitizer.sanitize(fieldValue));

            for (var fti = 0, numFieldValues = fieldTokens.length; fti < numFieldValues; fti++) {
              var fieldToken = fieldTokens[fti];
              var expandedTokens = indexStrategy.expandToken(fieldToken);

              for (var eti = 0, nummExpandedTokens = expandedTokens.length; eti < nummExpandedTokens; eti++) {
                var expandedToken = expandedTokens[eti];
                searchIndex.indexDocument(expandedToken, uid, doc);
              }
            }
          }
        }
      }
    };

    _createClass(Search, [{
      key: "indexStrategy",
      set: function set(value) {
        if (this._initialized) {
          throw Error('IIndexStrategy cannot be set after initialization');
        }

        this._indexStrategy = value;
      },
      get: function get() {
        return this._indexStrategy;
      }
      /**
       * Override the default text sanitizing strategy.
       * @param value Custom text sanitizing strategy
       * @throws Error if documents have already been indexed by this search instance
       */

    }, {
      key: "sanitizer",
      set: function set(value) {
        if (this._initialized) {
          throw Error('ISanitizer cannot be set after initialization');
        }

        this._sanitizer = value;
      },
      get: function get() {
        return this._sanitizer;
      }
      /**
       * Override the default search index strategy.
       * @param value Custom search index strategy
       * @throws Error if documents have already been indexed
       */

    }, {
      key: "searchIndex",
      set: function set(value) {
        if (this._initialized) {
          throw Error('ISearchIndex cannot be set after initialization');
        }

        this._searchIndex = value;
      },
      get: function get() {
        return this._searchIndex;
      }
      /**
       * Override the default text tokenizing strategy.
       * @param value Custom text tokenizing strategy
       * @throws Error if documents have already been indexed by this search instance
       */

    }, {
      key: "tokenizer",
      set: function set(value) {
        if (this._initialized) {
          throw Error('ITokenizer cannot be set after initialization');
        }

        this._tokenizer = value;
      },
      get: function get() {
        return this._tokenizer;
      }
    }]);

    return Search;
  }();

  function docListData (Data) {
    Data.documents = {};
    /**
     * Separates documents removed from model into different list
     * Throws error if documents not loaded
     */

    Data.documents.filterRemovedDocs = function () {
      if (!has(Data.data, 'documents')) {
        throw new Error('Data Error: documents was not loaded');
      }

      Data.data.removedDocuments = Data.data.documents.filter(function (d) {
        return d._inModel == 'false';
      });
      Data.data.documents = Data.data.documents.filter(function (d) {
        return d._inModel == 'true';
      });
      return Data;
    };
    /**
     * Puts main and sub topics in nested object for each document
     * Throws error if documents not loaded
     */


    function aggregateTopics() {
      if (!has(Data.data, 'documents')) {
        throw new Error('Data Error: documents was not loaded');
      }

      Data.data.documents.forEach(function (d) {
        var mainTopicKeys = Object.keys(d).filter(function (k) {
          return k.startsWith('_mainTopic_');
        });
        var subTopicKeys = Object.keys(d).filter(function (k) {
          return k.startsWith('_subTopic_');
        });
        var mainTopicWeights = {};

        var _iterator = _createForOfIteratorHelper(mainTopicKeys),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var k = _step.value;
            var labels = k.replace('_mainTopic_', '');
            mainTopicWeights[labels] = d[k];
            delete d[k];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var subTopicWeights = {};

        var _iterator2 = _createForOfIteratorHelper(subTopicKeys),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _k = _step2.value;

            var _labels = _k.replace('_subTopic_', '');

            subTopicWeights[_labels] = d[_k];
            delete d[_k];
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        d._mainTopics = mainTopicWeights;
        d._subTopics = subTopicWeights;
      });
    }
    /**
     * Adds string of top main and sub topics to each documents
     * Number of top topics is given percentage of topics
     * Allows for minimum threshold weight
     * Throws error if documents not loaded
     */


    function getTopTopics(percentage) {
      var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!has(Data.data, 'documents')) {
        throw new Error('Data Error: documents was not loaded');
      }

      if (!has(Data.data.documents[0], '_mainTopics')) {
        aggregateTopics();
      }

      var nMainTopics = Object.keys(Data.data.documents[0]._mainTopics).length,
          nSubTopics = Object.keys(Data.data.documents[0]._subTopics).length;
      var topNMain = Math.floor(nMainTopics * percentage),
          topNSub = Math.floor(nSubTopics * percentage);
      Data.data.documents.forEach(function (d) {
        d.topMainTopics = Object.entries(d._mainTopics).sort(function (a, b) {
          return b[1] - a[1];
        }).slice(0, topNMain).filter(function (e) {
          return e[1] >= threshold;
        }).map(function (e) {
          return "".concat(e[0], " (").concat(format('.0~%')(e[1]), ")");
        }).join('\n');
        d.topSubTopics = Object.entries(d._subTopics).sort(function (a, b) {
          return b[1] - a[1];
        }).slice(0, topNSub).filter(function (e) {
          return e[1] >= threshold;
        }).map(function (e) {
          return "".concat(e[0], " (").concat(format('.0~%')(e[1]), ")");
        }).join('\n');
      });
    }
    /**
     * Processes list of documents to get concise topics info
     * Throws error if documents not loaded
     */


    Data.documents.processDocumentTopics = function () {
      var percentage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
      var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

      if (!has(Data.data, 'documents')) {
        throw new Error('Data Error: documents was not loaded');
      }

      aggregateTopics();
      getTopTopics(percentage, threshold);
      Data.data.documents.forEach(function (d) {
        d.docId = d._docId;
        delete d['_docId'];
      });
      return Data;
    };
    /**
     * Shorten the text of given fields to be no longer than charLimit
     * Throws error if documents not loaded
     */


    Data.documents.shortenTexts = function (fields) {
      var charLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

      if (!has(Data.data, 'documents')) {
        throw new Error('Data Error: documents was not loaded');
      }

      Data.data.documents.forEach(function (d) {
        var _iterator3 = _createForOfIteratorHelper(fields),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var f = _step3.value;
            d[f[1]] = d[f[0]].length > charLimit ? d[f[0]].slice(0, charLimit) + '...' : d[f[0]];
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
      return Data;
    };

    function filterDocFromSearch() {
      if (Data.data.documentsSearchTerm != null && typeof Data.data.documentsSearchTerm != 'undefined' && typeof Data.data.documentsSearchFields != 'undefined') {
        Data.data.documents.forEach(function (d) {
          d._renderInTable = false;
        });
        var search = new Search('_docId');
        Data.data.documentsSearchFields.forEach(function (f) {
          return search.addIndex(f);
        });
        search.addDocuments(Data.data.documents);
        search.search(Data.data.documentsSearchTerm).forEach(function (d) {
          d._renderInTable = true;
        });
      }
    }

    function filterDocs() {
      Data.data.documents.forEach(function (d) {
        d._renderInTable = true;
      });
      filterDocFromSearch();
    }
    /**
     * Returns list of documents after filter by search
     * Throws error if documents not loaded
     */


    Data.documents.getDocumentsToRender = function () {
      if (!has(Data.data, 'documents')) {
        throw new Error('Data Error: documents was not loaded');
      }

      filterDocs();
      return Data.data.documents.filter(function (d) {
        return d._renderInTable;
      });
    };
    /**
     * Sets the fields to index during search 
     */


    Data.documents.setSearchFields = function (fields) {
      Data.data.documentsSearchFields = fields;
      return Data;
    };
    /**
     * Sets search term
     */


    Data.documents.setSearchTerm = function () {
      var searchTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      Data.data.documentsSearchTerm = searchTerm == '' ? null : searchTerm;
      return Data;
    };
  }

  function DataManager () {
    // urls:
    // {
    //     mainMap, subMaps
    //     mainModel, subModel,
    //     mainLL, subLL,
    //     distribution, trend,
    //     labelsIndex, docCSV
    // }
    // Set the initial data manager
    var Data = DataManagerBasic(); // Add map features

    mapData(Data); // Add document table features

    docData(Data); // Add distribution features

    distribData(Data); // Add trend features

    trendData(Data); // Add search features

    searchData(Data); // Add stat features

    statData(Data); // Add doc list features

    docListData(Data);
    return Data;
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root$1.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports$1 && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$6.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

    return value === proto;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object);

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2);
    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Check that cyclic values are equal.
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!arraySome(other, function(othValue, othIndex) {
              if (!cacheHas(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  /** Built-in value references. */
  var Uint8Array$1 = root$1.Uint8Array;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /** `Object#toString` result references. */
  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$1:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag$1:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
          return false;
        }
        return true;

      case boolTag$1:
      case dateTag$1:
      case numberTag$1:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag$1:
        return object.name == other.name && object.message == other.message;

      case regexpTag$1:
      case stringTag$1:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag$1:
        var convert = mapToArray;

      case setTag$1:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
        convert || (convert = setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$1;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
        objProps = getAllKeys(object),
        objLength = objProps.length,
        othProps = getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
        return false;
      }
    }
    // Check that cyclic values are equal.
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  /* Built-in method references that are verified to be native. */
  var DataView$1 = getNative(root$1, 'DataView');

  /* Built-in method references that are verified to be native. */
  var Promise$1 = getNative(root$1, 'Promise');

  /* Built-in method references that are verified to be native. */
  var Set$1 = getNative(root$1, 'Set');

  /* Built-in method references that are verified to be native. */
  var WeakMap = getNative(root$1, 'WeakMap');

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$2 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView$1),
      mapCtorString = toSource(Map$1),
      promiseCtorString = toSource(Promise$1),
      setCtorString = toSource(Set$1),
      weakMapCtorString = toSource(WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2) ||
      (Map$1 && getTag(new Map$1) != mapTag$2) ||
      (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
      (Set$1 && getTag(new Set$1) != setTag$2) ||
      (WeakMap && getTag(new WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$2;
          case mapCtorString: return mapTag$2;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$2;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var getTag$1 = getTag;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      objectTag$2 = '[object Object]';

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = objIsArr ? arrayTag$1 : getTag$1(object),
        othTag = othIsArr ? arrayTag$1 : getTag$1(other);

    objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
    othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

    var objIsObj = objTag == objectTag$2,
        othIsObj = othTag == objectTag$2,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack);
      return (objIsArr || isTypedArray(object))
        ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new Stack);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack);
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
  }

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn(object, path)
        : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity$2(value) {
    return value;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity$2;
    }
    if (typeof value == 'object') {
      return isArray(value)
        ? baseMatchesProperty(value[0], value[1])
        : baseMatches(value);
    }
    return property(value);
  }

  /**
   * This method is like `_.find` except that it returns the key of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Object
   * @param {Object} object The object to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @returns {string|undefined} Returns the key of the matched element,
   *  else `undefined`.
   * @example
   *
   * var users = {
   *   'barney':  { 'age': 36, 'active': true },
   *   'fred':    { 'age': 40, 'active': false },
   *   'pebbles': { 'age': 1,  'active': true }
   * };
   *
   * _.findKey(users, function(o) { return o.age < 40; });
   * // => 'barney' (iteration order is not guaranteed)
   *
   * // The `_.matches` iteratee shorthand.
   * _.findKey(users, { 'age': 1, 'active': true });
   * // => 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findKey(users, ['active', false]);
   * // => 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.findKey(users, 'active');
   * // => 'barney'
   */
  function findKey(object, predicate) {
    return baseFindKey(object, baseIteratee(predicate), baseForOwn);
  }

  function StateManager () {
    var StateManager = {};
    StateManager.states = {
      mainTopic: {
        value: null,
        "short": 't'
      },
      // topic selected on main map
      subTopic: {
        value: null,
        "short": 'u'
      },
      // topic selected on sub map
      doc: {
        value: null,
        "short": 'd'
      },
      // doc selected in doc table
      distrib: {
        value: null,
        "short": 'f'
      },
      // distrib field selected in dropdown
      date: {
        value: null,
        "short": 'e'
      },
      // date filter (for docs) selected on trend
      search: {
        value: null,
        "short": 's'
      } // value in search box

    };

    StateManager.state = function (state, value) {
      if (!has(StateManager.states, state)) {
        throw new Error('State error: ' + state + ' is not a valid state property');
      }

      if (typeof value === 'undefined') {
        return StateManager.states[state].value;
      } else {
        StateManager.states[state].value = value;
        return StateManager;
      }
    };

    StateManager.reset = function () {
      for (var _i = 0, _Object$keys = Object.keys(StateManager.states); _i < _Object$keys.length; _i++) {
        var k = _Object$keys[_i];
        StateManager.states[k].value = null;
      }
    };

    StateManager.buildURL = function () {
      var customBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var origin = window.location.origin,
          path = window.location.pathname;
      var base = customBase == null ? "".concat(origin).concat(path) : customBase;
      var params = [];

      for (var _i2 = 0, _Object$keys2 = Object.keys(StateManager.states); _i2 < _Object$keys2.length; _i2++) {
        var k = _Object$keys2[_i2];

        if (StateManager.states[k].value !== null) {
          params.push("".concat(StateManager.states[k]["short"], "=").concat(encodeURIComponent(StateManager.states[k].value)));
        }

        StateManager.states[k].value = null;
      }

      var param = params.length > 0 ? "?".concat(params.join('&')) : '';
      return "".concat(base).concat(param);
    };

    StateManager.parseURL = function () {
      // get the URL query string, e.g. '?t=...&d=...', minus the starting '?', and split with '&' 
      var kvp = document.location.search.substr(1).split('&'); // if non-empty

      if (kvp.length > 0 && kvp[0] != '') {
        // for each key,value pair, split with '='
        kvp.map(function (s) {
          return s.split('=');
        }).forEach(function (kv) {
          // get the key from StateManager.states
          var key = findKey(StateManager.states, function (s) {
            return s["short"] == kv[0];
          }); // if key was found

          if (typeof key !== 'undefined') {
            // set the value
            StateManager.states[key].value = decodeURIComponent(kv[1]);
          }
        });
      }
    };

    return StateManager;
  }

  /**
   * Returns a canvas object to aid positionning element on svg visualisations
   * Input:
   * - width, total width in pixel of the svg
   * - height, total height in pixel of the svg
   * - padding, list of top, bottom, left and right paddings
   * 
   * Ouput:
   * - w, width
   * - h, height
   * - innerWidth (iW), width - horizontal padding
   * - innerHeight (iH), height - vertical padding
   * - top (t), top padding
   * - bottom (b), height - bottom padding
   * - middle (m), halfway between top and bottom
   * - left (l), left padding
   * - right (r), width - right padding
   * - center (c), halfway between left and right
   * 
   *    left           center         right
   * +--+----------------+----------------+--+
   * |  |                |                |  |
   * +--+----------------+----------------+--+  top
   * |  |                |                |  |
   * |  |                |                |  |
   * |  |                |                |  |
   * +--+----------------+----------------+--+  middle
   * |  |                |                |  |
   * |  |                |                |  |
   * |  |                |                |  |
   * +--+----------------+----------------+--+  bottom
   * |  |                |                |  |
   * +--+----------------+----------------+--+
   */
  function Canvas(width, height, padding) {
    var innerWidth = width - padding[2] - padding[3],
        innerHeight = height - padding[0] - padding[1],
        top = padding[0],
        middle = padding[0] + (height - padding[0] - padding[1]) / 2,
        bottom = height - padding[1],
        left = padding[2],
        center = padding[2] + (width - padding[2] - padding[3]) / 2,
        right = width - padding[3];
    return {
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      top: top,
      middle: middle,
      bottom: bottom,
      left: left,
      center: center,
      right: right,
      w: width,
      h: height,
      iW: innerWidth,
      iH: innerHeight,
      t: top,
      m: middle,
      b: bottom,
      l: left,
      c: center,
      r: right
    };
  }

  function Visualisation () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var classed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var VisObj = {}; // private

    VisObj._width = width;
    VisObj._height = height;
    VisObj._svgWidth = width - 2;
    VisObj._svgHeight = height - 2;
    VisObj._svgMargin = [10, 10, 10, 10];
    VisObj._border = 1;

    VisObj._resize = function () {
      VisObj._svgWidth = VisObj._width - VisObj._border * 2;
      VisObj._svgHeight = VisObj._height - VisObj._border * 2;
      VisObj._canvas = Canvas(VisObj._svgWidth, VisObj._svgHeight, VisObj._svgMargin);

      VisObj._svgTop.attr('width', VisObj._canvas.w).attr('height', VisObj._canvas.h).style('border-width', VisObj._border);

      VisObj._buttonTR.attr('transform', "translate(".concat(VisObj._canvas.w - 5, ",5)"));

      VisObj._buttonBR.attr('transform', "translate(".concat(VisObj._canvas.w - 5, ",").concat(VisObj._canvas.h - 5, ")"));

      VisObj._buttonTL.attr('transform', 'translate(5,5)');

      VisObj._buttonBL.attr('transform', "translate(5,".concat(VisObj._canvas.h - 5, ")"));

      VisObj._title.attr('transform', function (d) {
        return "translate(".concat(VisObj._canvas.c, ",").concat(d.position == 'b' ? VisObj._canvas.h - 15 : 25, ")");
      });

      VisObj._onResize();
    };

    VisObj._toggleButton = function () {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (position !== null) {
        var button = position === 'BR' ? VisObj._buttonBR : position === 'BL' ? VisObj._buttonBL : position === 'TL' ? VisObj._buttonTL : VisObj._buttonTR;

        if (text == null) {
          button.select('rect').remove();
          button.select('text').remove();
          button.on('click', null);
        } else {
          var rectEl = button.selectAll('rect').data([text]);
          rectEl.enter().append('rect');
          var textEl = button.selectAll('text').data([text]);
          textEl.enter().append('text');
          textEl = button.selectAll('text').text(text).style('font-size', '16px').attr('dy', "".concat(position.startsWith('T') ? '20' : '-10')).attr('dx', "".concat(position.endsWith('L') ? '' : '-', "5")).style('text-anchor', "".concat(position.endsWith('L') ? 'start' : 'end'));

          var _textEl$node$getBBox = textEl.node().getBBox(),
              _width = _textEl$node$getBBox.width,
              _height = _textEl$node$getBBox.height;

          rectEl = button.selectAll('rect').attr('x', position.endsWith('L') ? 0 : -_width - 10).attr('y', position.startsWith('T') ? 0 : -_height - 8).attr('width', _width + 10).attr('height', _height + 8).attr('rx', 2);
          button.on('click', callback);
        }
      }
    };

    VisObj._toggleTitle = function () {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'T';

      if (text == null) {
        VisObj._title.text('');
      } else {
        VisObj._title.data([{
          text: text,
          position: position
        }]);

        VisObj._title.text(function (d) {
          return d.text;
        }).style('font-size', '20px').attr('transform', function (d) {
          return "translate(".concat(VisObj._canvas.c, ",").concat(d.position == 'B' ? VisObj._canvas.h - 15 : 25, ")");
        });
      }
    }; // protected


    VisObj._canvas = Canvas(VisObj._svgWidth, VisObj._svgHeight, VisObj._svgMargin);

    VisObj._onResize = function () {};

    VisObj._svgTop = D3Select(container).append('svg').classed(classed, true).classed('viz', true).attr('width', VisObj._svgWidth).attr('height', VisObj._svgHeight);
    VisObj._buttonTR = VisObj._svgTop.append('g').classed('button', true).attr('transform', "translate(".concat(VisObj._canvas.w - 5, ",5)"));
    VisObj._buttonBR = VisObj._svgTop.append('g').classed('button', true).attr('transform', "translate(".concat(VisObj._canvas.w - 5, ",").concat(VisObj._canvas.h - 5, ")"));
    VisObj._buttonTL = VisObj._svgTop.append('g').classed('button', true).attr('transform', 'translate(5,5)');
    VisObj._buttonBL = VisObj._svgTop.append('g').classed('button', true).attr('transform', "translate(5,".concat(VisObj._canvas.h - 5, ")"));
    VisObj._title = VisObj._svgTop.append('text').data([{
      text: null,
      position: 't'
    }]).classed('title', true);
    VisObj._defaultText = null;

    VisObj._removeDefaultText = function () {
      if (VisObj._defaultText != null) {
        VisObj._defaultText.remove();

        VisObj._defaultText = null;
      }
    }; // public


    VisObj.setWidth = function (w) {
      VisObj._width = w;

      VisObj._resize();

      return VisObj;
    };

    VisObj.setHeight = function (h) {
      VisObj._height = h;

      VisObj._resize();

      return VisObj;
    };

    VisObj.setSize = function (w, h) {
      VisObj._width = w;
      VisObj._height = h;

      VisObj._resize();

      return VisObj;
    };

    VisObj.setMargin = function (m) {
      VisObj._svgMargin = m;

      VisObj._resize();

      return VisObj;
    };

    VisObj.toggleBorder = function () {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      bool = bool == null ? VisObj._border == 0 : bool;
      VisObj._border = bool ? 1 : 0;

      VisObj._resize();

      return VisObj;
    };

    VisObj.toggleButton = function (pos) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      VisObj._toggleButton(pos, t, cb);

      return VisObj;
    };

    VisObj.toggleTitle = function () {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'T';

      VisObj._toggleTitle(t, pos);

      return VisObj;
    };

    VisObj.addDefaultText = function (string) {
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var blinking = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (string != null) {
        if (VisObj._defaultText == null) {
          VisObj._defaultText = VisObj._svgTop.append('text').classed('defaultText', true);
        }

        VisObj._defaultText.classed('blinking', blinking).attr('transform', "translate(".concat(VisObj._canvas.c, ",").concat(VisObj._canvas.m, ")scale(").concat(scale, ")")).text(string);
      }

      return VisObj;
    };

    return VisObj;
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0: break;
      case 1: this.range(domain); break;
      default: this.range(range).domain(domain); break;
    }
    return this;
  }

  const implicit = Symbol("implicit");

  function ordinal() {
    var index = new Map(),
        domain = [],
        range = [],
        unknown = implicit;

    function scale(d) {
      var key = d + "", i = index.get(key);
      if (!i) {
        if (unknown !== implicit) return unknown;
        index.set(key, i = domain.push(d));
      }
      return range[(i - 1) % range.length];
    }

    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = new Map();
      for (const value of _) {
        const key = value + "";
        if (index.has(key)) continue;
        index.set(key, domain.push(value));
      }
      return scale;
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), scale) : range.slice();
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function() {
      return ordinal(domain, range).unknown(unknown);
    };

    initRange.apply(scale, arguments);

    return scale;
  }

  function band() {
    var scale = ordinal().unknown(undefined),
        domain = scale.domain,
        ordinalRange = scale.range,
        r0 = 0,
        r1 = 1,
        step,
        bandwidth,
        round = false,
        paddingInner = 0,
        paddingOuter = 0,
        align = 0.5;

    delete scale.unknown;

    function rescale() {
      var n = domain().length,
          reverse = r1 < r0,
          start = reverse ? r1 : r0,
          stop = reverse ? r0 : r1;
      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
      if (round) step = Math.floor(step);
      start += (stop - start - step * (n - paddingInner)) * align;
      bandwidth = step * (1 - paddingInner);
      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
      var values = sequence(n).map(function(i) { return start + step * i; });
      return ordinalRange(reverse ? values.reverse() : values);
    }

    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.range = function(_) {
      return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
    };

    scale.rangeRound = function(_) {
      return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
    };

    scale.bandwidth = function() {
      return bandwidth;
    };

    scale.step = function() {
      return step;
    };

    scale.round = function(_) {
      return arguments.length ? (round = !!_, rescale()) : round;
    };

    scale.padding = function(_) {
      return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
    };

    scale.paddingInner = function(_) {
      return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
    };

    scale.paddingOuter = function(_) {
      return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
    };

    scale.align = function(_) {
      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };

    scale.copy = function() {
      return band(domain(), [r0, r1])
          .round(round)
          .paddingInner(paddingInner)
          .paddingOuter(paddingOuter)
          .align(align);
    };

    return initRange.apply(rescale(), arguments);
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy: function(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
      return this;
    },
    displayable: function() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    displayable: function() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl: function() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(")
          + (this.h || 0) + ", "
          + (this.s || 0) * 100 + "%, "
          + (this.l || 0) * 100 + "%"
          + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant$1 = x => () => x;

  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function numberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function(t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }

  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  function object(a, b) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  function interpolate(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant$1(b)
        : (t === "number" ? interpolateNumber
        : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
        : b instanceof color ? interpolateRgb
        : b instanceof Date ? date
        : isNumberArray(b) ? numberArray
        : Array.isArray(b) ? genericArray
        : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
        : interpolateNumber)(a, b);
  }

  function interpolateRound(a, b) {
    return a = +a, b = +b, function(t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  var degrees = 180 / Math.PI;

  var identity$3 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$3;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  function constants(x) {
    return function() {
      return x;
    };
  }

  function number$1(x) {
    return +x;
  }

  var unit = [0, 1];

  function identity$4(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= (a = +a))
        ? function(x) { return (x - a) / b; }
        : constants(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) { return Math.max(a, Math.min(b, x)); };
  }

  // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
  function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x) { return r0(d0(x)); };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1;

    // Reverse descending domains.
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function(x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target
        .domain(source.domain())
        .range(source.range())
        .interpolate(source.interpolate())
        .clamp(source.clamp())
        .unknown(source.unknown());
  }

  function transformer() {
    var domain = unit,
        range = unit,
        interpolate$1 = interpolate,
        transform,
        untransform,
        unknown,
        clamp = identity$4,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity$4) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
    }

    scale.invert = function(y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
    };

    scale.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity$4, rescale()) : clamp !== identity$4;
    };

    scale.interpolate = function(_) {
      return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function(t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }

  function continuous() {
    return transformer()(identity$4, identity$4);
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function(count) {
      if (count == null) count = 10;

      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      
      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);
        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }

      return scale;
    };

    return scale;
  }

  function linear$1() {
    var scale = continuous();

    scale.copy = function() {
      return copy(scale, linear$1());
    };

    initRange.apply(scale, arguments);

    return linearish(scale);
  }

  function nice(domain, interval) {
    domain = domain.slice();

    var i0 = 0,
        i1 = domain.length - 1,
        x0 = domain[i0],
        x1 = domain[i1],
        t;

    if (x1 < x0) {
      t = i0, i0 = i1, i1 = t;
      t = x0, x0 = x1, x1 = t;
    }

    domain[i0] = interval.floor(x0);
    domain[i1] = interval.ceil(x1);
    return domain;
  }

  function transformLog(x) {
    return Math.log(x);
  }

  function transformExp(x) {
    return Math.exp(x);
  }

  function transformLogn(x) {
    return -Math.log(-x);
  }

  function transformExpn(x) {
    return -Math.exp(-x);
  }

  function pow10(x) {
    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
  }

  function powp(base) {
    return base === 10 ? pow10
        : base === Math.E ? Math.exp
        : function(x) { return Math.pow(base, x); };
  }

  function logp(base) {
    return base === Math.E ? Math.log
        : base === 10 && Math.log10
        || base === 2 && Math.log2
        || (base = Math.log(base), function(x) { return Math.log(x) / base; });
  }

  function reflect(f) {
    return function(x) {
      return -f(-x);
    };
  }

  function loggish(transform) {
    var scale = transform(transformLog, transformExp),
        domain = scale.domain,
        base = 10,
        logs,
        pows;

    function rescale() {
      logs = logp(base), pows = powp(base);
      if (domain()[0] < 0) {
        logs = reflect(logs), pows = reflect(pows);
        transform(transformLogn, transformExpn);
      } else {
        transform(transformLog, transformExp);
      }
      return scale;
    }

    scale.base = function(_) {
      return arguments.length ? (base = +_, rescale()) : base;
    };

    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.ticks = function(count) {
      var d = domain(),
          u = d[0],
          v = d[d.length - 1],
          r;

      if (r = v < u) i = u, u = v, v = i;

      var i = logs(u),
          j = logs(v),
          p,
          k,
          t,
          n = count == null ? 10 : +count,
          z = [];

      if (!(base % 1) && j - i < n) {
        i = Math.floor(i), j = Math.ceil(j);
        if (u > 0) for (; i <= j; ++i) {
          for (k = 1, p = pows(i); k < base; ++k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        } else for (; i <= j; ++i) {
          for (k = base - 1, p = pows(i); k >= 1; --k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        }
        if (z.length * 2 < n) z = ticks(u, v, n);
      } else {
        z = ticks(i, j, Math.min(j - i, n)).map(pows);
      }

      return r ? z.reverse() : z;
    };

    scale.tickFormat = function(count, specifier) {
      if (specifier == null) specifier = base === 10 ? ".0e" : ",";
      if (typeof specifier !== "function") specifier = format(specifier);
      if (count === Infinity) return specifier;
      if (count == null) count = 10;
      var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
      return function(d) {
        var i = d / pows(Math.round(logs(d)));
        if (i * base < base - 0.5) i *= base;
        return i <= k ? specifier(d) : "";
      };
    };

    scale.nice = function() {
      return domain(nice(domain(), {
        floor: function(x) { return pows(Math.floor(logs(x))); },
        ceil: function(x) { return pows(Math.ceil(logs(x))); }
      }));
    };

    return scale;
  }

  function log() {
    var scale = loggish(transformer()).domain([1, 10]);

    scale.copy = function() {
      return copy(scale, log()).base(scale.base());
    };

    initRange.apply(scale, arguments);

    return scale;
  }

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  /*:: import type { Window } from '../types'; */

  /*:: declare function getWindow(node: Node | Window): Window; */
  function getWindow(node) {
    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  /*:: declare function isElement(node: mixed): boolean %checks(node instanceof
    Element); */

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  /*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
    HTMLElement); */


  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  /*:: declare function isShadowRoot(node: mixed): boolean %checks(node instanceof
    ShadowRoot); */


  function isShadowRoot(node) {
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  // Returns the layout rect of an element relative to its offsetParent. Layout
  // means it doesn't take into account transforms.
  function getLayoutRect(element) {
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || // DOM Element detected
      // $FlowFixMe[incompatible-return]: need a better way to handle this...
      element.host || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    var offsetParent = element.offsetParent;

    if (offsetParent) {
      var html = getDocumentElement(offsetParent);

      if (getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && getComputedStyle$1(html).position !== 'static') {
        return html;
      }
    }

    return offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var currentNode = getParentNode(element);

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.

      if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min, value, max) {
    return Math.max(min, Math.min(value, max));
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = state.modifiersData[name + "#persistent"].padding;
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
        _options$padding = options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    {
      if (!isHTMLElement(arrowElement)) {
        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      {
        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
      }

      return;
    }

    state.elements.arrow = arrowElement;
    state.modifiersData[name + "#persistent"] = {
      padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
    };
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: Math.round(x * dpr) / dpr || 0,
      y: Math.round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets;

    var _ref3 = roundOffsets ? roundOffsetsByDPR(offsets) : offsets,
        _ref3$x = _ref3.x,
        x = _ref3$x === void 0 ? 0 : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === void 0 ? 0 : _ref3$y;

    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

      /*:: offsetParent = (offsetParent: Element); */


      if (placement === top) {
        sideY = bottom;
        y -= offsetParent.clientHeight - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left) {
        sideX = right;
        x -= offsetParent.clientWidth - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref4) {
    var state = _ref4.state,
        options = _ref4.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

    {
      var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

      if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
        return transitionProperty.indexOf(property) >= 0;
      })) {
        console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
      }
    }

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect$2(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect$2,
    data: {}
  };

  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  var hash$1 = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash$1[matched];
    });
  }

  function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      y: rect.top
    };
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
      // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
      // errors due to floating point numbers, so we need to check precision.
      // Safari returns a number <= 0, usually < -1 when pinch-zoomed
      // Feature detection fails in mobile emulation mode in Chrome.
      // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
      // 0.001
      // Fallback here: "Not Safari" userAgent

      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = element.ownerDocument.body;
    var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = getNodeName(scrollParent) === 'body';
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign(Object.assign({}, rect), {}, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element) {
    var rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      accRect.top = Math.max(rect.top, accRect.top);
      accRect.right = Math.min(rect.right, accRect.right);
      accRect.bottom = Math.min(rect.bottom, accRect.bottom);
      accRect.left = Math.max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var referenceElement = state.elements.reference;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(referenceElement);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  /*:: type OverflowsMap = { [ComputedPlacement]: number }; */

  /*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;

      {
        console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
      }
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
      placement: state.placement
    })) : tetherOffset;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min = popperOffsets[mainAxis] + overflow[mainSide];
      var max = popperOffsets[mainAxis] - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
      var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(_min, _offset, _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  // Composite means it takes into account transforms as well as layout.

  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function format$1(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [].concat(args).reduce(function (p, c) {
      return p.replace(/%s/, c);
    }, str);
  }

  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
  function validateModifiers(modifiers) {
    modifiers.forEach(function (modifier) {
      Object.keys(modifier).forEach(function (key) {
        switch (key) {
          case 'name':
            if (typeof modifier.name !== 'string') {
              console.error(format$1(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
            }

            break;

          case 'enabled':
            if (typeof modifier.enabled !== 'boolean') {
              console.error(format$1(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
            }

          case 'phase':
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format$1(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
            }

            break;

          case 'fn':
            if (typeof modifier.fn !== 'function') {
              console.error(format$1(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'effect':
            if (typeof modifier.effect !== 'function') {
              console.error(format$1(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'requires':
            if (!Array.isArray(modifier.requires)) {
              console.error(format$1(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
            }

            break;

          case 'requiresIfExists':
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format$1(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
            }

            break;

          case 'options':
          case 'data':
            break;

          default:
            console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
              return "\"" + s + "\"";
            }).join(', ') + "; but \"" + key + "\" was provided.");
        }

        modifier.requires && modifier.requires.forEach(function (requirement) {
          if (modifiers.find(function (mod) {
            return mod.name === requirement;
          }) == null) {
            console.error(format$1(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
          }
        });
      });
    });
  }

  function uniqueBy(arr, fn) {
    var identifiers = new Set();
    return arr.filter(function (item) {
      var identifier = fn(item);

      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true;
      }
    });
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
        options: Object.assign(Object.assign({}, existing.options), current.options),
        data: Object.assign(Object.assign({}, existing.data), current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
  var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(options) {
          cleanupModifierEffects();
          state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned
          // if one of the modifiers is invalid for any reason

          {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
              var name = _ref.name;
              return name;
            });
            validateModifiers(modifiers);

            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function (_ref2) {
                var name = _ref2.name;
                return name === 'flip';
              });

              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
              }
            }

            var _getComputedStyle = getComputedStyle$1(popper),
                marginTop = _getComputedStyle.marginTop,
                marginRight = _getComputedStyle.marginRight,
                marginBottom = _getComputedStyle.marginBottom,
                marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
            // cause bugs with positioning, so we'll warn the consumer


            if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
              return parseFloat(margin);
            })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
            }
          }

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            {
              console.error(INVALID_ELEMENT_ERROR);
            }

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          var __debug_loops__ = 0;

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            {
              __debug_loops__ += 1;

              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break;
              }
            }

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        {
          console.error(INVALID_ELEMENT_ERROR);
        }

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  /**!
  * tippy.js v6.2.7
  * (c) 2017-2020 atomiks
  * MIT License
  */
  var BOX_CLASS = "tippy-box";
  var CONTENT_CLASS = "tippy-content";
  var BACKDROP_CLASS = "tippy-backdrop";
  var ARROW_CLASS = "tippy-arrow";
  var SVG_ARROW_CLASS = "tippy-svg-arrow";
  var TOUCH_OPTIONS = {
    passive: true,
    capture: true
  };

  function hasOwnProperty$a(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  }
  function getValueAtIndexOrReturn(value, index, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index];
      return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
    }

    return value;
  }
  function isType(value, type) {
    var str = {}.toString.call(value);
    return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
  }
  function invokeWithArgsOrReturn(value, args) {
    return typeof value === 'function' ? value.apply(void 0, args) : value;
  }
  function debounce$1(fn, ms) {
    // Avoid wrapping in `setTimeout` if ms is 0 anyway
    if (ms === 0) {
      return fn;
    }

    var timeout;
    return function (arg) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn(arg);
      }, ms);
    };
  }
  function removeProperties(obj, keys) {
    var clone = Object.assign({}, obj);
    keys.forEach(function (key) {
      delete clone[key];
    });
    return clone;
  }
  function splitBySpaces(value) {
    return value.split(/\s+/).filter(Boolean);
  }
  function normalizeToArray(value) {
    return [].concat(value);
  }
  function pushIfUnique(arr, value) {
    if (arr.indexOf(value) === -1) {
      arr.push(value);
    }
  }
  function unique(arr) {
    return arr.filter(function (item, index) {
      return arr.indexOf(item) === index;
    });
  }
  function getBasePlacement$1(placement) {
    return placement.split('-')[0];
  }
  function arrayFrom(value) {
    return [].slice.call(value);
  }
  function removeUndefinedProps(obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      if (obj[key] !== undefined) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }

  function div() {
    return document.createElement('div');
  }
  function isElement$1(value) {
    return ['Element', 'Fragment'].some(function (type) {
      return isType(value, type);
    });
  }
  function isNodeList(value) {
    return isType(value, 'NodeList');
  }
  function isMouseEvent(value) {
    return isType(value, 'MouseEvent');
  }
  function isReferenceElement(value) {
    return !!(value && value._tippy && value._tippy.reference === value);
  }
  function getArrayOfElements(value) {
    if (isElement$1(value)) {
      return [value];
    }

    if (isNodeList(value)) {
      return arrayFrom(value);
    }

    if (Array.isArray(value)) {
      return value;
    }

    return arrayFrom(document.querySelectorAll(value));
  }
  function setTransitionDuration(els, value) {
    els.forEach(function (el) {
      if (el) {
        el.style.transitionDuration = value + "ms";
      }
    });
  }
  function setVisibilityState(els, state) {
    els.forEach(function (el) {
      if (el) {
        el.setAttribute('data-state', state);
      }
    });
  }
  function getOwnerDocument(elementOrElements) {
    var _normalizeToArray = normalizeToArray(elementOrElements),
        element = _normalizeToArray[0];

    return element ? element.ownerDocument || document : document;
  }
  function isCursorOutsideInteractiveBorder(popperTreeData, event) {
    var clientX = event.clientX,
        clientY = event.clientY;
    return popperTreeData.every(function (_ref) {
      var popperRect = _ref.popperRect,
          popperState = _ref.popperState,
          props = _ref.props;
      var interactiveBorder = props.interactiveBorder;
      var basePlacement = getBasePlacement$1(popperState.placement);
      var offsetData = popperState.modifiersData.offset;

      if (!offsetData) {
        return true;
      }

      var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
      var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
      var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
      var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
      var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
      var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
      var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
      var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
      return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
    });
  }
  function updateTransitionEndListener(box, action, listener) {
    var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
    // `webkitTransitionEnd`...

    ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
      box[method](event, listener);
    });
  }

  var currentInput = {
    isTouch: false
  };
  var lastMouseMoveTime = 0;
  /**
   * When a `touchstart` event is fired, it's assumed the user is using touch
   * input. We'll bind a `mousemove` event listener to listen for mouse input in
   * the future. This way, the `isTouch` property is fully dynamic and will handle
   * hybrid devices that use a mix of touch + mouse input.
   */

  function onDocumentTouchStart() {
    if (currentInput.isTouch) {
      return;
    }

    currentInput.isTouch = true;

    if (window.performance) {
      document.addEventListener('mousemove', onDocumentMouseMove);
    }
  }
  /**
   * When two `mousemove` event are fired consecutively within 20ms, it's assumed
   * the user is using mouse input again. `mousemove` can fire on touch devices as
   * well, but very rarely that quickly.
   */

  function onDocumentMouseMove() {
    var now = performance.now();

    if (now - lastMouseMoveTime < 20) {
      currentInput.isTouch = false;
      document.removeEventListener('mousemove', onDocumentMouseMove);
    }

    lastMouseMoveTime = now;
  }
  /**
   * When an element is in focus and has a tippy, leaving the tab/window and
   * returning causes it to show again. For mouse users this is unexpected, but
   * for keyboard use it makes sense.
   * TODO: find a better technique to solve this problem
   */

  function onWindowBlur() {
    var activeElement = document.activeElement;

    if (isReferenceElement(activeElement)) {
      var instance = activeElement._tippy;

      if (activeElement.blur && !instance.state.isVisible) {
        activeElement.blur();
      }
    }
  }
  function bindGlobalEventListeners() {
    document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
    window.addEventListener('blur', onWindowBlur);
  }

  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  var ua = isBrowser ? navigator.userAgent : '';
  var isIE = /MSIE |Trident\//.test(ua);

  function createMemoryLeakWarning(method) {
    var txt = method === 'destroy' ? 'n already-' : ' ';
    return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
  }
  function clean(value) {
    var spacesAndTabs = /[ \t]{2,}/g;
    var lineStartWithSpaces = /^[ \t]*/gm;
    return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
  }

  function getDevMessage(message) {
    return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
  }

  function getFormattedMessage(message) {
    return [getDevMessage(message), // title
    'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
    'line-height: 1.5', // footer
    'color: #a6a095;'];
  } // Assume warnings and errors never have the same message

  var visitedMessages;

  {
    resetVisitedMessages();
  }

  function resetVisitedMessages() {
    visitedMessages = new Set();
  }
  function warnWhen(condition, message) {
    if (condition && !visitedMessages.has(message)) {
      var _console;

      visitedMessages.add(message);

      (_console = console).warn.apply(_console, getFormattedMessage(message));
    }
  }
  function errorWhen(condition, message) {
    if (condition && !visitedMessages.has(message)) {
      var _console2;

      visitedMessages.add(message);

      (_console2 = console).error.apply(_console2, getFormattedMessage(message));
    }
  }
  function validateTargets(targets) {
    var didPassFalsyValue = !targets;
    var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
    errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
    errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
  }

  var pluginProps = {
    animateFill: false,
    followCursor: false,
    inlinePositioning: false,
    sticky: false
  };
  var renderProps = {
    allowHTML: false,
    animation: 'fade',
    arrow: true,
    content: '',
    inertia: false,
    maxWidth: 350,
    role: 'tooltip',
    theme: '',
    zIndex: 9999
  };
  var defaultProps = Object.assign({
    appendTo: function appendTo() {
      return document.body;
    },
    aria: {
      content: 'auto',
      expanded: 'auto'
    },
    delay: 0,
    duration: [300, 250],
    getReferenceClientRect: null,
    hideOnClick: true,
    ignoreAttributes: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: '',
    offset: [0, 10],
    onAfterUpdate: function onAfterUpdate() {},
    onBeforeUpdate: function onBeforeUpdate() {},
    onCreate: function onCreate() {},
    onDestroy: function onDestroy() {},
    onHidden: function onHidden() {},
    onHide: function onHide() {},
    onMount: function onMount() {},
    onShow: function onShow() {},
    onShown: function onShown() {},
    onTrigger: function onTrigger() {},
    onUntrigger: function onUntrigger() {},
    onClickOutside: function onClickOutside() {},
    placement: 'top',
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: false,
    touch: true,
    trigger: 'mouseenter focus',
    triggerTarget: null
  }, pluginProps, {}, renderProps);
  var defaultKeys = Object.keys(defaultProps);
  var setDefaultProps = function setDefaultProps(partialProps) {
    /* istanbul ignore else */
    {
      validateProps(partialProps, []);
    }

    var keys = Object.keys(partialProps);
    keys.forEach(function (key) {
      defaultProps[key] = partialProps[key];
    });
  };
  function getExtendedPassedProps(passedProps) {
    var plugins = passedProps.plugins || [];
    var pluginProps = plugins.reduce(function (acc, plugin) {
      var name = plugin.name,
          defaultValue = plugin.defaultValue;

      if (name) {
        acc[name] = passedProps[name] !== undefined ? passedProps[name] : defaultValue;
      }

      return acc;
    }, {});
    return Object.assign({}, passedProps, {}, pluginProps);
  }
  function getDataAttributeProps(reference, plugins) {
    var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
      plugins: plugins
    }))) : defaultKeys;
    var props = propKeys.reduce(function (acc, key) {
      var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

      if (!valueAsString) {
        return acc;
      }

      if (key === 'content') {
        acc[key] = valueAsString;
      } else {
        try {
          acc[key] = JSON.parse(valueAsString);
        } catch (e) {
          acc[key] = valueAsString;
        }
      }

      return acc;
    }, {});
    return props;
  }
  function evaluateProps(reference, props) {
    var out = Object.assign({}, props, {
      content: invokeWithArgsOrReturn(props.content, [reference])
    }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
    out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
    out.aria = {
      expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
      content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
    };
    return out;
  }
  function validateProps(partialProps, plugins) {
    if (partialProps === void 0) {
      partialProps = {};
    }

    if (plugins === void 0) {
      plugins = [];
    }

    var keys = Object.keys(partialProps);
    keys.forEach(function (prop) {
      var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
      var didPassUnknownProp = !hasOwnProperty$a(nonPluginProps, prop); // Check if the prop exists in `plugins`

      if (didPassUnknownProp) {
        didPassUnknownProp = plugins.filter(function (plugin) {
          return plugin.name === prop;
        }).length === 0;
      }

      warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
    });
  }

  var innerHTML = function innerHTML() {
    return 'innerHTML';
  };

  function dangerouslySetInnerHTML(element, html) {
    element[innerHTML()] = html;
  }

  function createArrowElement(value) {
    var arrow = div();

    if (value === true) {
      arrow.className = ARROW_CLASS;
    } else {
      arrow.className = SVG_ARROW_CLASS;

      if (isElement$1(value)) {
        arrow.appendChild(value);
      } else {
        dangerouslySetInnerHTML(arrow, value);
      }
    }

    return arrow;
  }

  function setContent(content, props) {
    if (isElement$1(props.content)) {
      dangerouslySetInnerHTML(content, '');
      content.appendChild(props.content);
    } else if (typeof props.content !== 'function') {
      if (props.allowHTML) {
        dangerouslySetInnerHTML(content, props.content);
      } else {
        content.textContent = props.content;
      }
    }
  }
  function getChildren(popper) {
    var box = popper.firstElementChild;
    var boxChildren = arrayFrom(box.children);
    return {
      box: box,
      content: boxChildren.find(function (node) {
        return node.classList.contains(CONTENT_CLASS);
      }),
      arrow: boxChildren.find(function (node) {
        return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
      }),
      backdrop: boxChildren.find(function (node) {
        return node.classList.contains(BACKDROP_CLASS);
      })
    };
  }
  function render(instance) {
    var popper = div();
    var box = div();
    box.className = BOX_CLASS;
    box.setAttribute('data-state', 'hidden');
    box.setAttribute('tabindex', '-1');
    var content = div();
    content.className = CONTENT_CLASS;
    content.setAttribute('data-state', 'hidden');
    setContent(content, instance.props);
    popper.appendChild(box);
    box.appendChild(content);
    onUpdate(instance.props, instance.props);

    function onUpdate(prevProps, nextProps) {
      var _getChildren = getChildren(popper),
          box = _getChildren.box,
          content = _getChildren.content,
          arrow = _getChildren.arrow;

      if (nextProps.theme) {
        box.setAttribute('data-theme', nextProps.theme);
      } else {
        box.removeAttribute('data-theme');
      }

      if (typeof nextProps.animation === 'string') {
        box.setAttribute('data-animation', nextProps.animation);
      } else {
        box.removeAttribute('data-animation');
      }

      if (nextProps.inertia) {
        box.setAttribute('data-inertia', '');
      } else {
        box.removeAttribute('data-inertia');
      }

      box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

      if (nextProps.role) {
        box.setAttribute('role', nextProps.role);
      } else {
        box.removeAttribute('role');
      }

      if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
        setContent(content, instance.props);
      }

      if (nextProps.arrow) {
        if (!arrow) {
          box.appendChild(createArrowElement(nextProps.arrow));
        } else if (prevProps.arrow !== nextProps.arrow) {
          box.removeChild(arrow);
          box.appendChild(createArrowElement(nextProps.arrow));
        }
      } else if (arrow) {
        box.removeChild(arrow);
      }
    }

    return {
      popper: popper,
      onUpdate: onUpdate
    };
  } // Runtime check to identify if the render function is the default one; this
  // way we can apply default CSS transitions logic and it can be tree-shaken away

  render.$$tippy = true;

  var idCounter = 1;
  var mouseMoveListeners = []; // Used by `hideAll()`

  var mountedInstances = [];
  function createTippy(reference, passedProps) {
    var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
    // 🔒 Private members
    // ===========================================================================

    var showTimeout;
    var hideTimeout;
    var scheduleHideAnimationFrame;
    var isVisibleFromClick = false;
    var didHideDueToDocumentMouseDown = false;
    var didTouchMove = false;
    var ignoreOnFirstUpdate = false;
    var lastTriggerEvent;
    var currentTransitionEndListener;
    var onFirstUpdate;
    var listeners = [];
    var debouncedOnMouseMove = debounce$1(onMouseMove, props.interactiveDebounce);
    var currentTarget; // ===========================================================================
    // 🔑 Public members
    // ===========================================================================

    var id = idCounter++;
    var popperInstance = null;
    var plugins = unique(props.plugins);
    var state = {
      // Is the instance currently enabled?
      isEnabled: true,
      // Is the tippy currently showing and not transitioning out?
      isVisible: false,
      // Has the instance been destroyed?
      isDestroyed: false,
      // Is the tippy currently mounted to the DOM?
      isMounted: false,
      // Has the tippy finished transitioning in?
      isShown: false
    };
    var instance = {
      // properties
      id: id,
      reference: reference,
      popper: div(),
      popperInstance: popperInstance,
      props: props,
      state: state,
      plugins: plugins,
      // methods
      clearDelayTimeouts: clearDelayTimeouts,
      setProps: setProps,
      setContent: setContent,
      show: show,
      hide: hide,
      hideWithInteractivity: hideWithInteractivity,
      enable: enable,
      disable: disable,
      unmount: unmount,
      destroy: destroy
    }; // TODO: Investigate why this early return causes a TDZ error in the tests —
    // it doesn't seem to happen in the browser

    /* istanbul ignore if */

    if (!props.render) {
      {
        errorWhen(true, 'render() function has not been supplied.');
      }

      return instance;
    } // ===========================================================================
    // Initial mutations
    // ===========================================================================


    var _props$render = props.render(instance),
        popper = _props$render.popper,
        onUpdate = _props$render.onUpdate;

    popper.setAttribute('data-tippy-root', '');
    popper.id = "tippy-" + instance.id;
    instance.popper = popper;
    reference._tippy = instance;
    popper._tippy = instance;
    var pluginsHooks = plugins.map(function (plugin) {
      return plugin.fn(instance);
    });
    var hasAriaExpanded = reference.hasAttribute('aria-expanded');
    addListeners();
    handleAriaExpandedAttribute();
    handleStyles();
    invokeHook('onCreate', [instance]);

    if (props.showOnCreate) {
      scheduleShow();
    } // Prevent a tippy with a delay from hiding if the cursor left then returned
    // before it started hiding


    popper.addEventListener('mouseenter', function () {
      if (instance.props.interactive && instance.state.isVisible) {
        instance.clearDelayTimeouts();
      }
    });
    popper.addEventListener('mouseleave', function (event) {
      if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
        getDocument().addEventListener('mousemove', debouncedOnMouseMove);
        debouncedOnMouseMove(event);
      }
    });
    return instance; // ===========================================================================
    // 🔒 Private methods
    // ===========================================================================

    function getNormalizedTouchSettings() {
      var touch = instance.props.touch;
      return Array.isArray(touch) ? touch : [touch, 0];
    }

    function getIsCustomTouchBehavior() {
      return getNormalizedTouchSettings()[0] === 'hold';
    }

    function getIsDefaultRenderFn() {
      var _instance$props$rende;

      // @ts-ignore
      return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
    }

    function getCurrentTarget() {
      return currentTarget || reference;
    }

    function getDocument() {
      var parent = getCurrentTarget().parentNode;
      return parent ? getOwnerDocument(parent) : document;
    }

    function getDefaultTemplateChildren() {
      return getChildren(popper);
    }

    function getDelay(isShow) {
      // For touch or keyboard input, force `0` delay for UX reasons
      // Also if the instance is mounted but not visible (transitioning out),
      // ignore delay
      if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
        return 0;
      }

      return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
    }

    function handleStyles() {
      popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? '' : 'none';
      popper.style.zIndex = "" + instance.props.zIndex;
    }

    function invokeHook(hook, args, shouldInvokePropsHook) {
      if (shouldInvokePropsHook === void 0) {
        shouldInvokePropsHook = true;
      }

      pluginsHooks.forEach(function (pluginHooks) {
        if (pluginHooks[hook]) {
          pluginHooks[hook].apply(void 0, args);
        }
      });

      if (shouldInvokePropsHook) {
        var _instance$props;

        (_instance$props = instance.props)[hook].apply(_instance$props, args);
      }
    }

    function handleAriaContentAttribute() {
      var aria = instance.props.aria;

      if (!aria.content) {
        return;
      }

      var attr = "aria-" + aria.content;
      var id = popper.id;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        var currentValue = node.getAttribute(attr);

        if (instance.state.isVisible) {
          node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
        } else {
          var nextValue = currentValue && currentValue.replace(id, '').trim();

          if (nextValue) {
            node.setAttribute(attr, nextValue);
          } else {
            node.removeAttribute(attr);
          }
        }
      });
    }

    function handleAriaExpandedAttribute() {
      if (hasAriaExpanded || !instance.props.aria.expanded) {
        return;
      }

      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        if (instance.props.interactive) {
          node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
        } else {
          node.removeAttribute('aria-expanded');
        }
      });
    }

    function cleanupInteractiveMouseListeners() {
      getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
      mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
        return listener !== debouncedOnMouseMove;
      });
    }

    function onDocumentPress(event) {
      // Moved finger to scroll instead of an intentional tap outside
      if (currentInput.isTouch) {
        if (didTouchMove || event.type === 'mousedown') {
          return;
        }
      } // Clicked on interactive popper


      if (instance.props.interactive && popper.contains(event.target)) {
        return;
      } // Clicked on the event listeners target


      if (getCurrentTarget().contains(event.target)) {
        if (currentInput.isTouch) {
          return;
        }

        if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
          return;
        }
      } else {
        invokeHook('onClickOutside', [instance, event]);
      }

      if (instance.props.hideOnClick === true) {
        instance.clearDelayTimeouts();
        instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
        // currentTarget. This lets a tippy with `focus` trigger know that it
        // should not show

        didHideDueToDocumentMouseDown = true;
        setTimeout(function () {
          didHideDueToDocumentMouseDown = false;
        }); // The listener gets added in `scheduleShow()`, but this may be hiding it
        // before it shows, and hide()'s early bail-out behavior can prevent it
        // from being cleaned up

        if (!instance.state.isMounted) {
          removeDocumentPress();
        }
      }
    }

    function onTouchMove() {
      didTouchMove = true;
    }

    function onTouchStart() {
      didTouchMove = false;
    }

    function addDocumentPress() {
      var doc = getDocument();
      doc.addEventListener('mousedown', onDocumentPress, true);
      doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
      doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
      doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }

    function removeDocumentPress() {
      var doc = getDocument();
      doc.removeEventListener('mousedown', onDocumentPress, true);
      doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
      doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
      doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }

    function onTransitionedOut(duration, callback) {
      onTransitionEnd(duration, function () {
        if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
          callback();
        }
      });
    }

    function onTransitionedIn(duration, callback) {
      onTransitionEnd(duration, callback);
    }

    function onTransitionEnd(duration, callback) {
      var box = getDefaultTemplateChildren().box;

      function listener(event) {
        if (event.target === box) {
          updateTransitionEndListener(box, 'remove', listener);
          callback();
        }
      } // Make callback synchronous if duration is 0
      // `transitionend` won't fire otherwise


      if (duration === 0) {
        return callback();
      }

      updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
      updateTransitionEndListener(box, 'add', listener);
      currentTransitionEndListener = listener;
    }

    function on(eventType, handler, options) {
      if (options === void 0) {
        options = false;
      }

      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        node.addEventListener(eventType, handler, options);
        listeners.push({
          node: node,
          eventType: eventType,
          handler: handler,
          options: options
        });
      });
    }

    function addListeners() {
      if (getIsCustomTouchBehavior()) {
        on('touchstart', onTrigger, {
          passive: true
        });
        on('touchend', onMouseLeave, {
          passive: true
        });
      }

      splitBySpaces(instance.props.trigger).forEach(function (eventType) {
        if (eventType === 'manual') {
          return;
        }

        on(eventType, onTrigger);

        switch (eventType) {
          case 'mouseenter':
            on('mouseleave', onMouseLeave);
            break;

          case 'focus':
            on(isIE ? 'focusout' : 'blur', onBlurOrFocusOut);
            break;

          case 'focusin':
            on('focusout', onBlurOrFocusOut);
            break;
        }
      });
    }

    function removeListeners() {
      listeners.forEach(function (_ref) {
        var node = _ref.node,
            eventType = _ref.eventType,
            handler = _ref.handler,
            options = _ref.options;
        node.removeEventListener(eventType, handler, options);
      });
      listeners = [];
    }

    function onTrigger(event) {
      var _lastTriggerEvent;

      var shouldScheduleClickHide = false;

      if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
        return;
      }

      var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
      lastTriggerEvent = event;
      currentTarget = event.currentTarget;
      handleAriaExpandedAttribute();

      if (!instance.state.isVisible && isMouseEvent(event)) {
        // If scrolling, `mouseenter` events can be fired if the cursor lands
        // over a new target, but `mousemove` events don't get fired. This
        // causes interactive tooltips to get stuck open until the cursor is
        // moved
        mouseMoveListeners.forEach(function (listener) {
          return listener(event);
        });
      } // Toggle show/hide when clicking click-triggered tooltips


      if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
        shouldScheduleClickHide = true;
      } else {
        scheduleShow(event);
      }

      if (event.type === 'click') {
        isVisibleFromClick = !shouldScheduleClickHide;
      }

      if (shouldScheduleClickHide && !wasFocused) {
        scheduleHide(event);
      }
    }

    function onMouseMove(event) {
      var target = event.target;
      var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

      if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
        return;
      }

      var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
        var _instance$popperInsta;

        var instance = popper._tippy;
        var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

        if (state) {
          return {
            popperRect: popper.getBoundingClientRect(),
            popperState: state,
            props: props
          };
        }

        return null;
      }).filter(Boolean);

      if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
        cleanupInteractiveMouseListeners();
        scheduleHide(event);
      }
    }

    function onMouseLeave(event) {
      var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

      if (shouldBail) {
        return;
      }

      if (instance.props.interactive) {
        instance.hideWithInteractivity(event);
        return;
      }

      scheduleHide(event);
    }

    function onBlurOrFocusOut(event) {
      if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
        return;
      } // If focus was moved to within the popper


      if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
        return;
      }

      scheduleHide(event);
    }

    function isEventListenerStopped(event) {
      return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
    }

    function createPopperInstance() {
      destroyPopperInstance();
      var _instance$props2 = instance.props,
          popperOptions = _instance$props2.popperOptions,
          placement = _instance$props2.placement,
          offset = _instance$props2.offset,
          getReferenceClientRect = _instance$props2.getReferenceClientRect,
          moveTransition = _instance$props2.moveTransition;
      var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
      var computedReference = getReferenceClientRect ? {
        getBoundingClientRect: getReferenceClientRect,
        contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
      } : reference;
      var tippyModifier = {
        name: '$$tippy',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: function fn(_ref2) {
          var state = _ref2.state;

          if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh = getDefaultTemplateChildren(),
                box = _getDefaultTemplateCh.box;

            ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
              if (attr === 'placement') {
                box.setAttribute('data-placement', state.placement);
              } else {
                if (state.attributes.popper["data-popper-" + attr]) {
                  box.setAttribute("data-" + attr, '');
                } else {
                  box.removeAttribute("data-" + attr);
                }
              }
            });
            state.attributes.popper = {};
          }
        }
      };
      var modifiers = [{
        name: 'offset',
        options: {
          offset: offset
        }
      }, {
        name: 'preventOverflow',
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      }, {
        name: 'flip',
        options: {
          padding: 5
        }
      }, {
        name: 'computeStyles',
        options: {
          adaptive: !moveTransition
        }
      }, tippyModifier];

      if (getIsDefaultRenderFn() && arrow) {
        modifiers.push({
          name: 'arrow',
          options: {
            element: arrow,
            padding: 3
          }
        });
      }

      modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
      instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
        placement: placement,
        onFirstUpdate: onFirstUpdate,
        modifiers: modifiers
      }));
    }

    function destroyPopperInstance() {
      if (instance.popperInstance) {
        instance.popperInstance.destroy();
        instance.popperInstance = null;
      }
    }

    function mount() {
      var appendTo = instance.props.appendTo;
      var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
      // it's directly after the reference element so the elements inside the
      // tippy can be tabbed to
      // If there are clipping issues, the user can specify a different appendTo
      // and ensure focus management is handled correctly manually

      var node = getCurrentTarget();

      if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === 'parent') {
        parentNode = node.parentNode;
      } else {
        parentNode = invokeWithArgsOrReturn(appendTo, [node]);
      } // The popper element needs to exist on the DOM before its position can be
      // updated as Popper needs to read its dimensions


      if (!parentNode.contains(popper)) {
        parentNode.appendChild(popper);
      }

      createPopperInstance();
      /* istanbul ignore else */

      {
        // Accessibility check
        warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
      }
    }

    function getNestedPopperTree() {
      return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
    }

    function scheduleShow(event) {
      instance.clearDelayTimeouts();

      if (event) {
        invokeHook('onTrigger', [instance, event]);
      }

      addDocumentPress();
      var delay = getDelay(true);

      var _getNormalizedTouchSe = getNormalizedTouchSettings(),
          touchValue = _getNormalizedTouchSe[0],
          touchDelay = _getNormalizedTouchSe[1];

      if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
        delay = touchDelay;
      }

      if (delay) {
        showTimeout = setTimeout(function () {
          instance.show();
        }, delay);
      } else {
        instance.show();
      }
    }

    function scheduleHide(event) {
      instance.clearDelayTimeouts();
      invokeHook('onUntrigger', [instance, event]);

      if (!instance.state.isVisible) {
        removeDocumentPress();
        return;
      } // For interactive tippies, scheduleHide is added to a document.body handler
      // from onMouseLeave so must intercept scheduled hides from mousemove/leave
      // events when trigger contains mouseenter and click, and the tip is
      // currently shown as a result of a click.


      if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
        return;
      }

      var delay = getDelay(false);

      if (delay) {
        hideTimeout = setTimeout(function () {
          if (instance.state.isVisible) {
            instance.hide();
          }
        }, delay);
      } else {
        // Fixes a `transitionend` problem when it fires 1 frame too
        // late sometimes, we don't want hide() to be called.
        scheduleHideAnimationFrame = requestAnimationFrame(function () {
          instance.hide();
        });
      }
    } // ===========================================================================
    // 🔑 Public methods
    // ===========================================================================


    function enable() {
      instance.state.isEnabled = true;
    }

    function disable() {
      // Disabling the instance should also hide it
      // https://github.com/atomiks/tippy.js-react/issues/106
      instance.hide();
      instance.state.isEnabled = false;
    }

    function clearDelayTimeouts() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(scheduleHideAnimationFrame);
    }

    function setProps(partialProps) {
      /* istanbul ignore else */
      {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
      }

      if (instance.state.isDestroyed) {
        return;
      }

      invokeHook('onBeforeUpdate', [instance, partialProps]);
      removeListeners();
      var prevProps = instance.props;
      var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
        ignoreAttributes: true
      }));
      instance.props = nextProps;
      addListeners();

      if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
        cleanupInteractiveMouseListeners();
        debouncedOnMouseMove = debounce$1(onMouseMove, nextProps.interactiveDebounce);
      } // Ensure stale aria-expanded attributes are removed


      if (prevProps.triggerTarget && !nextProps.triggerTarget) {
        normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
          node.removeAttribute('aria-expanded');
        });
      } else if (nextProps.triggerTarget) {
        reference.removeAttribute('aria-expanded');
      }

      handleAriaExpandedAttribute();
      handleStyles();

      if (onUpdate) {
        onUpdate(prevProps, nextProps);
      }

      if (instance.popperInstance) {
        createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
        // and the nested ones get re-rendered first.
        // https://github.com/atomiks/tippyjs-react/issues/177
        // TODO: find a cleaner / more efficient solution(!)

        getNestedPopperTree().forEach(function (nestedPopper) {
          // React (and other UI libs likely) requires a rAF wrapper as it flushes
          // its work in one
          requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
        });
      }

      invokeHook('onAfterUpdate', [instance, partialProps]);
    }

    function setContent(content) {
      instance.setProps({
        content: content
      });
    }

    function show() {
      /* istanbul ignore else */
      {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
      } // Early bail-out


      var isAlreadyVisible = instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

      if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
        return;
      } // Normalize `disabled` behavior across browsers.
      // Firefox allows events on disabled elements, but Chrome doesn't.
      // Using a wrapper element (i.e. <span>) is recommended.


      if (getCurrentTarget().hasAttribute('disabled')) {
        return;
      }

      invokeHook('onShow', [instance], false);

      if (instance.props.onShow(instance) === false) {
        return;
      }

      instance.state.isVisible = true;

      if (getIsDefaultRenderFn()) {
        popper.style.visibility = 'visible';
      }

      handleStyles();
      addDocumentPress();

      if (!instance.state.isMounted) {
        popper.style.transition = 'none';
      } // If flipping to the opposite side after hiding at least once, the
      // animation will use the wrong placement without resetting the duration


      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
            box = _getDefaultTemplateCh2.box,
            content = _getDefaultTemplateCh2.content;

        setTransitionDuration([box, content], 0);
      }

      onFirstUpdate = function onFirstUpdate() {
        if (!instance.state.isVisible || ignoreOnFirstUpdate) {
          return;
        }

        ignoreOnFirstUpdate = true; // reflow

        void popper.offsetHeight;
        popper.style.transition = instance.props.moveTransition;

        if (getIsDefaultRenderFn() && instance.props.animation) {
          var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
              _box = _getDefaultTemplateCh3.box,
              _content = _getDefaultTemplateCh3.content;

          setTransitionDuration([_box, _content], duration);
          setVisibilityState([_box, _content], 'visible');
        }

        handleAriaContentAttribute();
        handleAriaExpandedAttribute();
        pushIfUnique(mountedInstances, instance);
        instance.state.isMounted = true;
        invokeHook('onMount', [instance]);

        if (instance.props.animation && getIsDefaultRenderFn()) {
          onTransitionedIn(duration, function () {
            instance.state.isShown = true;
            invokeHook('onShown', [instance]);
          });
        }
      };

      mount();
    }

    function hide() {
      /* istanbul ignore else */
      {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
      } // Early bail-out


      var isAlreadyHidden = !instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

      if (isAlreadyHidden || isDestroyed || isDisabled) {
        return;
      }

      invokeHook('onHide', [instance], false);

      if (instance.props.onHide(instance) === false) {
        return;
      }

      instance.state.isVisible = false;
      instance.state.isShown = false;
      ignoreOnFirstUpdate = false;
      isVisibleFromClick = false;

      if (getIsDefaultRenderFn()) {
        popper.style.visibility = 'hidden';
      }

      cleanupInteractiveMouseListeners();
      removeDocumentPress();
      handleStyles();

      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
            box = _getDefaultTemplateCh4.box,
            content = _getDefaultTemplateCh4.content;

        if (instance.props.animation) {
          setTransitionDuration([box, content], duration);
          setVisibilityState([box, content], 'hidden');
        }
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();

      if (instance.props.animation) {
        if (getIsDefaultRenderFn()) {
          onTransitionedOut(duration, instance.unmount);
        }
      } else {
        instance.unmount();
      }
    }

    function hideWithInteractivity(event) {
      /* istanbul ignore else */
      {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
      }

      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
      pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }

    function unmount() {
      /* istanbul ignore else */
      {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
      }

      if (instance.state.isVisible) {
        instance.hide();
      }

      if (!instance.state.isMounted) {
        return;
      }

      destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
      // tree by default. This seems mainly for interactive tippies, but we should
      // find a workaround if possible

      getNestedPopperTree().forEach(function (nestedPopper) {
        nestedPopper._tippy.unmount();
      });

      if (popper.parentNode) {
        popper.parentNode.removeChild(popper);
      }

      mountedInstances = mountedInstances.filter(function (i) {
        return i !== instance;
      });
      instance.state.isMounted = false;
      invokeHook('onHidden', [instance]);
    }

    function destroy() {
      /* istanbul ignore else */
      {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
      }

      if (instance.state.isDestroyed) {
        return;
      }

      instance.clearDelayTimeouts();
      instance.unmount();
      removeListeners();
      delete reference._tippy;
      instance.state.isDestroyed = true;
      invokeHook('onDestroy', [instance]);
    }
  }

  function tippy(targets, optionalProps) {
    if (optionalProps === void 0) {
      optionalProps = {};
    }

    var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
    /* istanbul ignore else */

    {
      validateTargets(targets);
      validateProps(optionalProps, plugins);
    }

    bindGlobalEventListeners();
    var passedProps = Object.assign({}, optionalProps, {
      plugins: plugins
    });
    var elements = getArrayOfElements(targets);
    /* istanbul ignore else */

    {
      var isSingleContentElement = isElement$1(passedProps.content);
      var isMoreThanOneReferenceElement = elements.length > 1;
      warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
    }

    var instances = elements.reduce(function (acc, reference) {
      var instance = reference && createTippy(reference, passedProps);

      if (instance) {
        acc.push(instance);
      }

      return acc;
    }, []);
    return isElement$1(targets) ? instances[0] : instances;
  }

  tippy.defaultProps = defaultProps;
  tippy.setDefaultProps = setDefaultProps;
  tippy.currentInput = currentInput;

  tippy.setDefaultProps({
    render: render
  });

  function BubbleMap () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var BubbleMap = Visualisation(container, width, height, 'bubblemap'); // private
    // text size info

    var minTextSize = 1; // opacity range values

    var opacityMinV = 0.2,
        opacityClampR = 1,
        opacityScaleType = 'linear'; // callbacks

    var bubbleClickCB = null;
    var tooltipFunction = null;
    var tooltipChart = null; // tooltip nodes

    var bubbleTooltips = []; // map group

    var svg = BubbleMap._svgTop.append('g').classed('elements', true).attr('transform', "translate(".concat(BubbleMap._canvas.c, ",").concat(BubbleMap._canvas.m, ")")); // bubble group


    var bubbleGroup = svg.append('g').classed('bubbles', true); // bubble border group

    var borderGroup = svg.append('g').classed('borders', true); // to capitalise a string

    var capitalizeString = function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }; // main drawing function


    function drawBubbleMap(dataset) {
      var bubblesData = dataset.topics,
          bordersData = dataset.bubbleMapBorder;

      var _getPositionScale = getPositionScale(bubblesData),
          _getPositionScale2 = _slicedToArray(_getPositionScale, 2),
          xScale = _getPositionScale2[0],
          yScale = _getPositionScale2[1]; // Draw Borders


      var borders = borderGroup.selectAll('path.border').data(bordersData);
      borders.exit().remove();
      borders.enter().append('path').classed('border', true);
      borders = borderGroup.selectAll('path.border');
      borders.attr('d', function (arc) {
        return arc.d;
      }).style('stroke-width', function (arc) {
        return arc.strokeWidth || 1;
      }).attr('transform', function (arc) {
        var coords = arc.transform.split('translate(')[1],
            x = parseFloat(coords.split(',')[0]),
            y = parseFloat(coords.split(',')[1].split(')')[0]);
        return "translate(".concat(xScale(x), ",").concat(yScale(y), ")");
      }); // Draw Bubbles

      var bubbles = bubbleGroup.selectAll('g.bubble').data(bubblesData);
      bubbles.exit().remove();
      var bubblesEnter = bubbles.enter().append('g').classed('bubble', true);
      bubblesEnter.append('circle');
      bubblesEnter.append('g').classed('labels', true);
      bubbles = bubbleGroup.selectAll('g.bubble');
      var circles = bubbles.select('circle');
      var texts = bubbles.select('g.labels'); // draw the bubble group

      bubbles.classed('selected', false).classed('highlighted', false).attr('transform', function (d) {
        return "translate(".concat(xScale(d.bubbleMap.cx), ",").concat(yScale(d.bubbleMap.cy), ")");
      }); // draw the bubble circle

      circles.attr('r', function (d) {
        return d.bubbleMap.r;
      }); // draw the bubble texts

      var labels = texts.selectAll('text.label').data(function (d) {
        return d.labels.slice(0, 5).map(function (e) {
          return [capitalizeString(e.label), d.bubbleMap.r];
        });
      });
      labels.enter().append('text').classed('label', true);
      labels = texts.selectAll('text.label');
      labels.attr('font-size', function (d, i) {
        return i === 1 || i === 2 ? Math.max(d[1] / 3 - 2, minTextSize + 1) : i === 3 || i === 4 ? Math.max(d[1] / 3 - 4, minTextSize) : Math.max(d[1] / 3, minTextSize + 2);
      }).attr('dy', function (d, i) {
        return i === 3 ? d[1] / -1.7 : i === 1 ? d[1] / -4.3 : i === 0 ? d[1] / 8.6 : i === 2 ? d[1] / 2.2 : d[1] / 1.3;
      }).text(function (d) {
        return d[0];
      }); // Attaching the callbacks

      attachCallbacks(); // Setting the tooltips

      setBubbleTooltips(); // Centering Bubble Map

      centerBubbleMap();
    }
    /**
     * Provided the map position data [{cx,cy,r}] computes the scales
     * to have the bubbles positioned somewhat centered around a 0,0 coordinate
     */


    function getPositionScale(bubblesData) {
      var xMin = min(bubblesData, function (d) {
        return d.bubbleMap.cx - d.bubbleMap.r;
      }),
          xMax = max(bubblesData, function (d) {
        return d.bubbleMap.cx + d.bubbleMap.r;
      }),
          yMin = min(bubblesData, function (d) {
        return d.bubbleMap.cy - d.bubbleMap.r;
      }),
          yMax = max(bubblesData, function (d) {
        return d.bubbleMap.cy + d.bubbleMap.r;
      }),
          xRange = xMax - xMin,
          yRange = yMax - yMin;
      var xScale = linear$1().domain([xMin, xMax]).range([-xRange / 2, xRange / 2]);
      var yScale = linear$1().domain([yMin, yMax]).range([-yRange / 2, yRange / 2]);
      return [xScale, yScale];
    } // attaches the click callback to the bubbles


    function attachCallbacks() {
      var bubbles = bubbleGroup.selectAll('g.bubble');
      bubbles.on('click', bubbleClickCB).on('touch', bubbleClickCB);
    } // sets the bubbles tooltips, text and chart


    function setBubbleTooltips() {
      // destroy previous tooltips
      bubbleTooltips.forEach(function (t) {
        return t.destroy();
      });
      var bubbles = bubbleGroup.selectAll('g.bubble');
      bubbles.attr('data-tippy-content', function (d, i) {
        if (tooltipFunction !== null) {
          return tooltipFunction(d, i);
        }
      }); // if tooltips defined, register them in bubbleTooltips

      if (tooltipFunction !== null || tooltipChart !== null) {
        bubbleTooltips = tippy(bubbles.nodes(), {
          theme: tooltipFunction !== null ? 'dark' : 'light',
          duration: [500, 0],
          allowHTML: true,
          onShow: function onShow(t) {
            if (tooltipChart !== null) {
              var d = D3Select(t.reference).datum();
              tooltipChart(t.popper, d);
            }
          },
          onHidden: function onHidden(t) {
            // remove any svg created
            D3Select(t.popper).select('svg').remove();
          }
        });
      }
    } // centers the bubble map inside the svg


    function centerBubbleMap() {
      var svgSize = svg.node().getBBox(),
          w = svgSize.width,
          h = svgSize.height;

      if (w > 0 && h > 0) {
        var rX = BubbleMap._canvas.iW / w,
            rY = BubbleMap._canvas.iH / h;
        var s = Math.min(rX, rY);
        svg.attr('transform', "scale(".concat(s, ") translate(").concat(BubbleMap._canvas.c / s, ",").concat(BubbleMap._canvas.m / s, ")"));
      }
    } // sets the opacity of bubbles given a distribution


    function setBubblesOpacity(distributionData, reset) {
      var opacityScale = opacityScaleType == 'log' ? log() : linear$1();
      opacityScale.domain([0, max(distributionData, function (d) {
        return d.value;
      }) * opacityClampR]).range([opacityMinV, 1]).clamp(true);
      bubbleGroup.selectAll('g.bubble').style('opacity', function (d) {
        if (reset) {
          return 1;
        }

        return opacityScale(distributionData.filter(function (e) {
          return e.key == d.topicId;
        })[0].value);
      });
    } // set the resize specificity


    BubbleMap._onResize = function () {
      // svg.attr('transform', `translate(${BubbleMap._canvas.c},${BubbleMap._canvas.m})`);
      centerBubbleMap();
    }; // public


    BubbleMap.render = function (dataset) {
      BubbleMap._removeDefaultText();

      drawBubbleMap(dataset);
      return BubbleMap;
    };

    BubbleMap.setBubbleClick = function (cb) {
      bubbleClickCB = cb;
      attachCallbacks();
      return BubbleMap;
    };

    BubbleMap.selectBubble = function () {
      var topicId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var idAccessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (d) {
        return d.topicId;
      };
      bubbleGroup.selectAll('g.bubble').classed('selected', function (d) {
        return idAccessor(d) === topicId ? true : false;
      });
      return BubbleMap;
    };

    BubbleMap.highlightBubbles = function () {
      var topicIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var idAccessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (d) {
        return d.topicId;
      };
      bubbleGroup.selectAll('g.bubble').classed('highlighted', function (d) {
        return topicIds.indexOf(idAccessor(d)) > -1;
      });
      return BubbleMap;
    };

    BubbleMap.setBubblesOpacity = function (distributionData) {
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      setBubblesOpacity(distributionData, reset);
      return BubbleMap;
    };

    BubbleMap.setOpacityScale = function () {
      var minValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
      var clampRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var scaleType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'linear';
      opacityMinV = minValue;
      opacityClampR = clampRatio;
      opacityScaleType = scaleType;
      return BubbleMap;
    };

    BubbleMap.setTooltip = function (f) {
      tooltipFunction = f;
      setBubbleTooltips();
      return BubbleMap;
    };

    BubbleMap.setTooltipChart = function (f) {
      tooltipChart = f;
      setBubbleTooltips();
      return BubbleMap;
    };

    BubbleMap.setMinimumTextSize = function (s) {
      minTextSize = s;
      return BubbleMap;
    };

    return BubbleMap;
  }

  var noop = {value: function() {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var src = /*#__PURE__*/Object.freeze({
    __proto__: null,
    dispatch: dispatch
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(src);

  // Word cloud layout by Jason Davies, https://www.jasondavies.com/wordcloud/
  // Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf

  var dispatch$1 = require$$0.dispatch;

  var cloudRadians = Math.PI / 180,
      cw = 1 << 11 >> 5,
      ch = 1 << 11;

  var d3Cloud = function() {
    var size = [256, 256],
        text = cloudText,
        font = cloudFont,
        fontSize = cloudFontSize,
        fontStyle = cloudFontNormal,
        fontWeight = cloudFontNormal,
        rotate = cloudRotate,
        padding = cloudPadding,
        spiral = archimedeanSpiral,
        words = [],
        timeInterval = Infinity,
        event = dispatch$1("word", "end"),
        timer = null,
        random = Math.random,
        cloud = {},
        canvas = cloudCanvas;

    cloud.canvas = function(_) {
      return arguments.length ? (canvas = functor(_), cloud) : canvas;
    };

    cloud.start = function() {
      var contextAndRatio = getContext(canvas()),
          board = zeroArray((size[0] >> 5) * size[1]),
          bounds = null,
          n = words.length,
          i = -1,
          tags = [],
          data = words.map(function(d, i) {
            d.text = text.call(this, d, i);
            d.font = font.call(this, d, i);
            d.style = fontStyle.call(this, d, i);
            d.weight = fontWeight.call(this, d, i);
            d.rotate = rotate.call(this, d, i);
            d.size = ~~fontSize.call(this, d, i);
            d.padding = padding.call(this, d, i);
            return d;
          }).sort(function(a, b) { return b.size - a.size; });

      if (timer) clearInterval(timer);
      timer = setInterval(step, 0);
      step();

      return cloud;

      function step() {
        var start = Date.now();
        while (Date.now() - start < timeInterval && ++i < n && timer) {
          var d = data[i];
          d.x = (size[0] * (random() + .5)) >> 1;
          d.y = (size[1] * (random() + .5)) >> 1;
          cloudSprite(contextAndRatio, d, data, i);
          if (d.hasText && place(board, d, bounds)) {
            tags.push(d);
            event.call("word", cloud, d);
            if (bounds) cloudBounds(bounds, d);
            else bounds = [{x: d.x + d.x0, y: d.y + d.y0}, {x: d.x + d.x1, y: d.y + d.y1}];
            // Temporary hack
            d.x -= size[0] >> 1;
            d.y -= size[1] >> 1;
          }
        }
        if (i >= n) {
          cloud.stop();
          event.call("end", cloud, tags, bounds);
        }
      }
    };

    cloud.stop = function() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      return cloud;
    };

    function getContext(canvas) {
      canvas.width = canvas.height = 1;
      var ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
      canvas.width = (cw << 5) / ratio;
      canvas.height = ch / ratio;

      var context = canvas.getContext("2d");
      context.fillStyle = context.strokeStyle = "red";
      context.textAlign = "center";

      return {context: context, ratio: ratio};
    }

    function place(board, tag, bounds) {
      var perimeter = [{x: 0, y: 0}, {x: size[0], y: size[1]}],
          startX = tag.x,
          startY = tag.y,
          maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
          s = spiral(size),
          dt = random() < .5 ? 1 : -1,
          t = -dt,
          dxdy,
          dx,
          dy;

      while (dxdy = s(t += dt)) {
        dx = ~~dxdy[0];
        dy = ~~dxdy[1];

        if (Math.min(Math.abs(dx), Math.abs(dy)) >= maxDelta) break;

        tag.x = startX + dx;
        tag.y = startY + dy;

        if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 ||
            tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
        // TODO only check for collisions within current bounds.
        if (!bounds || !cloudCollide(tag, board, size[0])) {
          if (!bounds || collideRects(tag, bounds)) {
            var sprite = tag.sprite,
                w = tag.width >> 5,
                sw = size[0] >> 5,
                lx = tag.x - (w << 4),
                sx = lx & 0x7f,
                msx = 32 - sx,
                h = tag.y1 - tag.y0,
                x = (tag.y + tag.y0) * sw + (lx >> 5),
                last;
            for (var j = 0; j < h; j++) {
              last = 0;
              for (var i = 0; i <= w; i++) {
                board[x + i] |= (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
              }
              x += sw;
            }
            delete tag.sprite;
            return true;
          }
        }
      }
      return false;
    }

    cloud.timeInterval = function(_) {
      return arguments.length ? (timeInterval = _ == null ? Infinity : _, cloud) : timeInterval;
    };

    cloud.words = function(_) {
      return arguments.length ? (words = _, cloud) : words;
    };

    cloud.size = function(_) {
      return arguments.length ? (size = [+_[0], +_[1]], cloud) : size;
    };

    cloud.font = function(_) {
      return arguments.length ? (font = functor(_), cloud) : font;
    };

    cloud.fontStyle = function(_) {
      return arguments.length ? (fontStyle = functor(_), cloud) : fontStyle;
    };

    cloud.fontWeight = function(_) {
      return arguments.length ? (fontWeight = functor(_), cloud) : fontWeight;
    };

    cloud.rotate = function(_) {
      return arguments.length ? (rotate = functor(_), cloud) : rotate;
    };

    cloud.text = function(_) {
      return arguments.length ? (text = functor(_), cloud) : text;
    };

    cloud.spiral = function(_) {
      return arguments.length ? (spiral = spirals[_] || _, cloud) : spiral;
    };

    cloud.fontSize = function(_) {
      return arguments.length ? (fontSize = functor(_), cloud) : fontSize;
    };

    cloud.padding = function(_) {
      return arguments.length ? (padding = functor(_), cloud) : padding;
    };

    cloud.random = function(_) {
      return arguments.length ? (random = _, cloud) : random;
    };

    cloud.on = function() {
      var value = event.on.apply(event, arguments);
      return value === event ? cloud : value;
    };

    return cloud;
  };

  function cloudText(d) {
    return d.text;
  }

  function cloudFont() {
    return "serif";
  }

  function cloudFontNormal() {
    return "normal";
  }

  function cloudFontSize(d) {
    return Math.sqrt(d.value);
  }

  function cloudRotate() {
    return (~~(Math.random() * 6) - 3) * 30;
  }

  function cloudPadding() {
    return 1;
  }

  // Fetches a monochrome sprite bitmap for the specified text.
  // Load in batches for speed.
  function cloudSprite(contextAndRatio, d, data, di) {
    if (d.sprite) return;
    var c = contextAndRatio.context,
        ratio = contextAndRatio.ratio;

    c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
    var x = 0,
        y = 0,
        maxh = 0,
        n = data.length;
    --di;
    while (++di < n) {
      d = data[di];
      c.save();
      c.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font;
      var w = c.measureText(d.text + "m").width * ratio,
          h = d.size << 1;
      if (d.rotate) {
        var sr = Math.sin(d.rotate * cloudRadians),
            cr = Math.cos(d.rotate * cloudRadians),
            wcr = w * cr,
            wsr = w * sr,
            hcr = h * cr,
            hsr = h * sr;
        w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5 << 5;
        h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
      } else {
        w = (w + 0x1f) >> 5 << 5;
      }
      if (h > maxh) maxh = h;
      if (x + w >= (cw << 5)) {
        x = 0;
        y += maxh;
        maxh = 0;
      }
      if (y + h >= ch) break;
      c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
      if (d.rotate) c.rotate(d.rotate * cloudRadians);
      c.fillText(d.text, 0, 0);
      if (d.padding) c.lineWidth = 2 * d.padding, c.strokeText(d.text, 0, 0);
      c.restore();
      d.width = w;
      d.height = h;
      d.xoff = x;
      d.yoff = y;
      d.x1 = w >> 1;
      d.y1 = h >> 1;
      d.x0 = -d.x1;
      d.y0 = -d.y1;
      d.hasText = true;
      x += w;
    }
    var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
        sprite = [];
    while (--di >= 0) {
      d = data[di];
      if (!d.hasText) continue;
      var w = d.width,
          w32 = w >> 5,
          h = d.y1 - d.y0;
      // Zero the buffer
      for (var i = 0; i < h * w32; i++) sprite[i] = 0;
      x = d.xoff;
      if (x == null) return;
      y = d.yoff;
      var seen = 0,
          seenRow = -1;
      for (var j = 0; j < h; j++) {
        for (var i = 0; i < w; i++) {
          var k = w32 * j + (i >> 5),
              m = pixels[((y + j) * (cw << 5) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
          sprite[k] |= m;
          seen |= m;
        }
        if (seen) seenRow = j;
        else {
          d.y0++;
          h--;
          j--;
          y++;
        }
      }
      d.y1 = d.y0 + seenRow;
      d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
    }
  }

  // Use mask-based collision detection.
  function cloudCollide(tag, board, sw) {
    sw >>= 5;
    var sprite = tag.sprite,
        w = tag.width >> 5,
        lx = tag.x - (w << 4),
        sx = lx & 0x7f,
        msx = 32 - sx,
        h = tag.y1 - tag.y0,
        x = (tag.y + tag.y0) * sw + (lx >> 5),
        last;
    for (var j = 0; j < h; j++) {
      last = 0;
      for (var i = 0; i <= w; i++) {
        if (((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0))
            & board[x + i]) return true;
      }
      x += sw;
    }
    return false;
  }

  function cloudBounds(bounds, d) {
    var b0 = bounds[0],
        b1 = bounds[1];
    if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
    if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
    if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
    if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
  }

  function collideRects(a, b) {
    return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
  }

  function archimedeanSpiral(size) {
    var e = size[0] / size[1];
    return function(t) {
      return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
    };
  }

  function rectangularSpiral(size) {
    var dy = 4,
        dx = dy * size[0] / size[1],
        x = 0,
        y = 0;
    return function(t) {
      var sign = t < 0 ? -1 : 1;
      // See triangular numbers: T_n = n * (n + 1) / 2.
      switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
        case 0:  x += dx; break;
        case 1:  y += dy; break;
        case 2:  x -= dx; break;
        default: y -= dy; break;
      }
      return [x, y];
    };
  }

  // TODO reuse arrays?
  function zeroArray(n) {
    var a = [],
        i = -1;
    while (++i < n) a[i] = 0;
    return a;
  }

  function cloudCanvas() {
    return document.createElement("canvas");
  }

  function functor(d) {
    return typeof d === "function" ? d : function() { return d; };
  }

  var spirals = {
    archimedean: archimedeanSpiral,
    rectangular: rectangularSpiral
  };

  function WordCloud () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var WordCloud = Visualisation(container, width, height, 'wordcloud'); // private
    // text size

    var textScale = linear$1(),
        textSizeRange = [10, 25],
        maxNLabels = 50; // callbacks

    var wordClick;
    var wordMouseover;
    var wordMouseout; // wordcloud group

    var svg = WordCloud._svgTop.append('g').classed('texts', true).attr('transform', "translate(".concat(WordCloud._canvas.c, ",").concat(WordCloud._canvas.m, ")"));

    var capitalizeString = function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    function render(labels) {
      textScale.domain(D3Extent(labels, function (l) {
        return l.weight;
      })).range(textSizeRange);
      var labelsData = labels.filter(function (d, i) {
        return i < maxNLabels;
      }).map(function (label) {
        return {
          t: label.label,
          s: label.weight
        };
      });
      d3Cloud().size([WordCloud._canvas.iW, WordCloud._canvas.iH]).words(labelsData).rotate(0).fontSize(function (d) {
        return textScale(d.s);
      }).text(function (d) {
        return capitalizeString(d.t);
      }).spiral('archimedean').padding(2).font('\'Open Sans\', sans-serif').random(function () {
        return 0.5;
      }).on('end', draw).start();

      function draw() {
        var texts = svg.selectAll('text.label').data(labelsData);
        texts.exit().remove();
        texts.enter().append('text').classed('label', true).merge(texts).style('font-size', function (d) {
          return "".concat(d.size, "px");
        }).attr('transform', function (d) {
          return "translate(".concat(d.x, ",").concat(d.y, ")rotate(").concat(d.rotate, ")");
        }).text(function (d) {
          return d.text;
        });
        attachCallbacks();
        centerWordCloud();
      }
    }

    function centerWordCloud() {
      var svgSize = svg.node().getBBox(),
          w = svgSize.width,
          h = svgSize.height;

      if (w > 0 && h > 0) {
        var rX = WordCloud._canvas.iW / w,
            rY = WordCloud._canvas.iH / h; // let s = forcedScale == null ? Math.min(rX, rY)-0.1 : forcedScale;

        var s = Math.max(1, Math.min(rX, rY) - 0.2); // s = 1;
        // svg.attr('transform', `translate(${svgWidth/2},${svgHeight/2})scale(${s})`);

        svg.attr('transform', "translate(".concat(WordCloud._canvas.c, ",").concat(WordCloud._canvas.m, ")scale(").concat(s, ")"));
      }
    }

    function highlightTexts(labels) {
      svg.selectAll('text.label').classed('highlighted', function (d) {
        return labels.indexOf(d.text.toLowerCase()) > -1;
      });
    }

    function highlightTextsOpacity(labels) {
      if (labels.length == 0) {
        svg.selectAll('text.label').classed('lowerOpacity', false);
      } else {
        svg.selectAll('text.label').classed('lowerOpacity', function (d) {
          return labels.indexOf(d.text.toLowerCase()) < 0;
        });
      }
    }

    function attachCallbacks() {
      svg.selectAll('text.label').style('cursor', wordClick ? 'pointer' : 'normal').on('click', wordClick).on('mouseover', wordMouseover).on('mouseout', wordMouseout);
    }

    WordCloud._onResize = function () {
      centerWordCloud();
    }; // public


    WordCloud.render = function (labels) {
      WordCloud._removeDefaultText();

      render(labels);
      return WordCloud;
    };

    WordCloud.highlightTexts = function (labels) {
      highlightTexts(labels);
      return WordCloud;
    };

    WordCloud.highlightTextsOpacity = function (labels) {
      highlightTextsOpacity(labels);
      return WordCloud;
    };

    WordCloud.setWordClick = function (f) {
      wordClick = f;
      attachCallbacks();
      return WordCloud;
    };

    WordCloud.setWordMouseover = function (cbOver, cbOut) {
      wordMouseover = cbOver;
      wordMouseout = cbOut;
      attachCallbacks();
      return WordCloud;
    };

    WordCloud.setTextSizeRange = function () {
      var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [10, 25];
      textSizeRange = range;
      return WordCloud;
    };

    WordCloud.setMaxNumberLabels = function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      maxNLabels = n;
      return WordCloud;
    };

    return WordCloud;
  }

  var noop$1 = {value: () => {}};

  function dispatch$2() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch$1(_);
  }

  function Dispatch$1(_) {
    this._ = _;
  }

  function parseTypenames$2(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch$1.prototype = dispatch$2.prototype = {
    constructor: Dispatch$1,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames$2(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$2(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch$1(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$2(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop$1, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var frame = 0, // is an animation frame pending?
      timeout = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout$1(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch$2("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get$3(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set$2(node, id) {
    var schedule = get$3(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get$3(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout$1(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout$1(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set$2(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set$2(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get$3(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set$2(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get$3(node, id).value[name];
    };
  }

  function interpolate$1(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS$1(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction$1(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS$1(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate$1;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get$3(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set$2(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set$2(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get$3(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set$2(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get$3(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set$2(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start$1(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start$1(name) ? init : set$2;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get$3(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get$3(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get$3(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection$1 = selection.prototype.constructor;

  function transition_selection() {
    return new Selection$1(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction$1(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set$2(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove$1(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate$1;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove$1(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction$1(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant$1(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction$1(tweenValue(this, "text", value))
        : textConstant$1(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get$3(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set$2(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  var slice = Array.prototype.slice;

  function identity$5(x) {
    return x;
  }

  var top$1 = 1,
      right$1 = 2,
      bottom$1 = 3,
      left$1 = 4,
      epsilon = 1e-6;

  function translateX(x) {
    return "translate(" + (x + 0.5) + ",0)";
  }

  function translateY(y) {
    return "translate(0," + (y + 0.5) + ")";
  }

  function number$2(scale) {
    return d => +scale(d);
  }

  function center(scale) {
    var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
    if (scale.round()) offset = Math.round(offset);
    return function(d) {
      return +scale(d) + offset;
    };
  }

  function entering() {
    return !this.__axis;
  }

  function axis(orient, scale) {
    var tickArguments = [],
        tickValues = null,
        tickFormat = null,
        tickSizeInner = 6,
        tickSizeOuter = 6,
        tickPadding = 3,
        k = orient === top$1 || orient === left$1 ? -1 : 1,
        x = orient === left$1 || orient === right$1 ? "x" : "y",
        transform = orient === top$1 || orient === bottom$1 ? translateX : translateY;

    function axis(context) {
      var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
          format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$5) : tickFormat,
          spacing = Math.max(tickSizeInner, 0) + tickPadding,
          range = scale.range(),
          range0 = +range[0] + 0.5,
          range1 = +range[range.length - 1] + 0.5,
          position = (scale.bandwidth ? center : number$2)(scale.copy()),
          selection = context.selection ? context.selection() : context,
          path = selection.selectAll(".domain").data([null]),
          tick = selection.selectAll(".tick").data(values, scale).order(),
          tickExit = tick.exit(),
          tickEnter = tick.enter().append("g").attr("class", "tick"),
          line = tick.select("line"),
          text = tick.select("text");

      path = path.merge(path.enter().insert("path", ".tick")
          .attr("class", "domain")
          .attr("stroke", "currentColor"));

      tick = tick.merge(tickEnter);

      line = line.merge(tickEnter.append("line")
          .attr("stroke", "currentColor")
          .attr(x + "2", k * tickSizeInner));

      text = text.merge(tickEnter.append("text")
          .attr("fill", "currentColor")
          .attr(x, k * spacing)
          .attr("dy", orient === top$1 ? "0em" : orient === bottom$1 ? "0.71em" : "0.32em"));

      if (context !== selection) {
        path = path.transition(context);
        tick = tick.transition(context);
        line = line.transition(context);
        text = text.transition(context);

        tickExit = tickExit.transition(context)
            .attr("opacity", epsilon)
            .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform"); });

        tickEnter
            .attr("opacity", epsilon)
            .attr("transform", function(d) { var p = this.parentNode.__axis; return transform(p && isFinite(p = p(d)) ? p : position(d)); });
      }

      tickExit.remove();

      path
          .attr("d", orient === left$1 || orient == right$1
              ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1)
              : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1));

      tick
          .attr("opacity", 1)
          .attr("transform", function(d) { return transform(position(d)); });

      line
          .attr(x + "2", k * tickSizeInner);

      text
          .attr(x, k * spacing)
          .text(format);

      selection.filter(entering)
          .attr("fill", "none")
          .attr("font-size", 10)
          .attr("font-family", "sans-serif")
          .attr("text-anchor", orient === right$1 ? "start" : orient === left$1 ? "end" : "middle");

      selection
          .each(function() { this.__axis = position; });
    }

    axis.scale = function(_) {
      return arguments.length ? (scale = _, axis) : scale;
    };

    axis.ticks = function() {
      return tickArguments = slice.call(arguments), axis;
    };

    axis.tickArguments = function(_) {
      return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
    };

    axis.tickValues = function(_) {
      return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
    };

    axis.tickFormat = function(_) {
      return arguments.length ? (tickFormat = _, axis) : tickFormat;
    };

    axis.tickSize = function(_) {
      return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
    };

    axis.tickSizeInner = function(_) {
      return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
    };

    axis.tickSizeOuter = function(_) {
      return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
    };

    axis.tickPadding = function(_) {
      return arguments.length ? (tickPadding = +_, axis) : tickPadding;
    };

    return axis;
  }

  function axisBottom(scale) {
    return axis(bottom$1, scale);
  }

  function axisLeft(scale) {
    return axis(left$1, scale);
  }

  const pi = Math.PI,
      tau = 2 * pi,
      epsilon$1 = 1e-6,
      tauEpsilon = tau - epsilon$1;

  function Path() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }

  function path() {
    return new Path;
  }

  Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function(x, y) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function(x, y) {
      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function(x1, y1, x, y) {
      this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
      this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon$1));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
        this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Otherwise, draw an arc!
      else {
        var x20 = x2 - x0,
            y20 = y2 - y0,
            l21_2 = x21 * x21 + y21 * y21,
            l20_2 = x20 * x20 + y20 * y20,
            l21 = Math.sqrt(l21_2),
            l01 = Math.sqrt(l01_2),
            l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
            t01 = l / l01,
            t21 = l / l21;

        // If the start tangent is not coincident with (x0,y0), line to.
        if (Math.abs(t01 - 1) > epsilon$1) {
          this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
        }

        this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
      }
    },
    arc: function(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
        this._ += "L" + x0 + "," + y0;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau + tau;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon$1) {
        this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
      }
    },
    rect: function(x, y, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
    },
    toString: function() {
      return this._;
    }
  };

  function constant$2(x) {
    return function constant() {
      return x;
    };
  }

  function array$1(x) {
    return typeof x === "object" && "length" in x
      ? x // Array, TypedArray, NodeList, array-like
      : Array.from(x); // Map, Set, iterable, string, or anything else
  }

  function Linear(context) {
    this._context = context;
  }

  Linear.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._point = 0;
    },
    lineEnd: function() {
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2; // proceed
        default: this._context.lineTo(x, y); break;
      }
    }
  };

  function curveLinear(context) {
    return new Linear(context);
  }

  function x(p) {
    return p[0];
  }

  function y(p) {
    return p[1];
  }

  function D3Line(x$1, y$1) {
    var defined = constant$2(true),
        context = null,
        curve = curveLinear,
        output = null;

    x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant$2(x$1);
    y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant$2(y$1);

    function line(data) {
      var i,
          n = (data = array$1(data)).length,
          d,
          defined0 = false,
          buffer;

      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) output.lineStart();
          else output.lineEnd();
        }
        if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    line.x = function(_) {
      return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$2(+_), line) : x$1;
    };

    line.y = function(_) {
      return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$2(+_), line) : y$1;
    };

    line.defined = function(_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$2(!!_), line) : defined;
    };

    line.curve = function(_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function(_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };

    return line;
  }

  function point(that, x, y) {
    that._context.bezierCurveTo(
      (2 * that._x0 + that._x1) / 3,
      (2 * that._y0 + that._y1) / 3,
      (that._x0 + 2 * that._x1) / 3,
      (that._y0 + 2 * that._y1) / 3,
      (that._x0 + 4 * that._x1 + x) / 6,
      (that._y0 + 4 * that._y1 + y) / 6
    );
  }

  function Basis(context) {
    this._context = context;
  }

  Basis.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._x0 = this._x1 =
      this._y0 = this._y1 = NaN;
      this._point = 0;
    },
    lineEnd: function() {
      switch (this._point) {
        case 3: point(this, this._x1, this._y1); // proceed
        case 2: this._context.lineTo(this._x1, this._y1); break;
      }
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2; break;
        case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
        default: point(this, x, y); break;
      }
      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };

  function D3CurveBasis(context) {
    return new Basis(context);
  }

  function point$1(that, x, y) {
    that._context.bezierCurveTo(
      that._x1 + that._k * (that._x2 - that._x0),
      that._y1 + that._k * (that._y2 - that._y0),
      that._x2 + that._k * (that._x1 - x),
      that._y2 + that._k * (that._y1 - y),
      that._x2,
      that._y2
    );
  }

  function Cardinal(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }

  Cardinal.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._x0 = this._x1 = this._x2 =
      this._y0 = this._y1 = this._y2 = NaN;
      this._point = 0;
    },
    lineEnd: function() {
      switch (this._point) {
        case 2: this._context.lineTo(this._x2, this._y2); break;
        case 3: point$1(this, this._x1, this._y1); break;
      }
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
        case 2: this._point = 3; // proceed
        default: point$1(this, x, y); break;
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };

  var D3CurveCardinal = (function custom(tension) {

    function cardinal(context) {
      return new Cardinal(context, tension);
    }

    cardinal.tension = function(tension) {
      return custom(+tension);
    };

    return cardinal;
  })(0);

  function TrendChart () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var TrendChart = Visualisation(container, width, height, 'trendchart'); // private

    var maxYValue = -1,
        nValueTicks = 10,
        valueTickFormat = '.2f',
        parseDate = null,
        formatDate = null;
    var duration = 100,
        delay = 50;
    var tooltipFunction = null,
        tooltipChart = null,
        barTooltips = [];
    var barClickCB = null;

    var svg = TrendChart._svgTop.append('g').classed('chart', true).attr('transform', "translate(".concat(TrendChart._canvas.l, ",").concat(TrendChart._canvas.t, ")"));

    var xScale = band().padding(0.2),
        yScale = linear$1();
    var xAxis = svg.append('g').classed('scale', true).attr('transform', "translate(0,".concat(TrendChart._canvas.iH, ")"));
    var yAxis = svg.append('g').classed('scale', true).attr('transform', 'translate(0,0)');
    var barGroup = svg.append('g').classed('bars', true),
        lineGroup = svg.append('g').classed('lines', true);

    function render(series) {
      xScale.domain(series[0].map(function (d) {
        return d.date;
      })).range([0, TrendChart._canvas.iW]);
      xAxis.attr('transform', "translate(0,".concat(TrendChart._canvas.iH, ")")).call(axisBottom(xScale).tickFormat(function (d) {
        return formatDate(parseDate(d));
      }));
      yScale.domain([0, maxYValue === -1 ? max(series, function (d) {
        return max(d, function (d2) {
          return d2.value;
        });
      }) : maxYValue]).range([TrendChart._canvas.iH, 0]);
      yAxis.attr('transform', 'translate(0,0)').call(axisLeft(yScale).ticks(nValueTicks, valueTickFormat));
      var barGroups = barGroup.selectAll('g.barGroup').data(series);
      barGroups.exit().transition().duration(duration).style('opacity', 0).remove();
      barGroups = barGroups.enter().append('g').classed('barGroup', true).merge(barGroups);
      var bars = barGroups.selectAll('rect.bar').data(function (d) {
        return d;
      });
      bars.exit().transition().duration(duration).attr('y', yScale(0)).attr('height', 0).remove();
      bars.enter().append('rect').classed('bar', true).attr('y', yScale(0)).attr('height', 0).merge(bars).attr('x', function (d) {
        return xScale(d.date) + xScale.bandwidth() * (1 - d.width) / 2;
      }).attr('width', function (d) {
        return xScale.bandwidth() * d.width;
      }).transition().duration(duration).delay(function (d, i) {
        return i * delay;
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('height', function (d) {
        return TrendChart._canvas.iH - yScale(d.value);
      });
      var lines = lineGroup.selectAll('path.line').data(series);
      lines.exit().transition().duration(duration).attr('d', D3Line().x(function (d) {
        return xScale(d.date) + xScale.bandwidth() / 2;
      }).y(function () {
        return yScale(0);
      }).curve(D3CurveBasis)).style('opacity', 0).remove();
      lines.enter().append('path').classed('line', true).attr('d', D3Line().x(function (d) {
        return xScale(d.date) + xScale.bandwidth() / 2;
      }).y(function () {
        return yScale(0);
      }).curve(D3CurveBasis)).merge(lines).transition().duration(duration).attr('d', D3Line().x(function (d) {
        return xScale(d.date) + xScale.bandwidth() / 2;
      }).y(function (d) {
        return yScale(d.value);
      }).curve(D3CurveBasis));
      attachCallbacks();
      setBarTooltips();
    }

    function setBarTooltips() {
      barTooltips.forEach(function (t) {
        return t.destroy();
      });
      var bars = barGroup.selectAll('g.barGroup').selectAll('rect.bar');
      bars.attr('data-tippy-content', function (d, i) {
        if (tooltipFunction !== null) {
          return tooltipFunction(d, i);
        }
      }); // if tooltips defined, register them in bubbleTooltips

      if (tooltipFunction !== null || tooltipChart !== null) {
        barTooltips = tippy(bars.nodes(), {
          theme: tooltipFunction !== null ? 'dark' : 'light',
          duration: [500, 0],
          allowHTML: true,
          onShow: function onShow(t) {
            if (tooltipChart !== null) {
              var d = D3Select(t.reference).datum();
              tooltipChart(t.popper, d);
            }
          },
          onHidden: function onHidden(t) {
            // remove any svg created
            D3Select(t.popper).select('svg').remove();
          }
        });
      }
    }

    function attachCallbacks() {
      var bars = barGroup.selectAll('g.barGroup').selectAll('rect.bar');
      bars.on('click', barClickCB).on('touch', barClickCB).on('mouseover', function () {
        D3Select(this).classed('highlight', true);
      }).on('mouseout', function () {
        D3Select(this).classed('highlight', false);
      });
    }

    TrendChart._onResize = function () {
      var barGroups = barGroup.selectAll('g.barGroup');
      var bars = barGroups.selectAll('rect.bar');
      var lines = lineGroup.selectAll('path.line');
      svg.attr('transform', "translate(".concat(TrendChart._canvas.l, ",").concat(TrendChart._canvas.t, ")"));
      yScale.range([TrendChart._canvas.iH, 0]);
      yAxis.attr('transform', 'translate(0,0)');
      xScale.range([0, TrendChart._canvas.iW]);
      xAxis.attr('transform', "translate(0,".concat(TrendChart._canvas.iH, ")"));

      if (barGroups.data().length > 0) {
        xAxis.call(axisBottom(xScale).tickFormat(function (d) {
          return formatDate(parseDate(d));
        }));
        yAxis.call(axisLeft(yScale).ticks(nValueTicks, valueTickFormat));
      }

      bars.attr('x', function (d) {
        return xScale(d.date) + xScale.bandwidth() * (1 - d.width) / 2;
      }).attr('width', function (d) {
        return xScale.bandwidth() * d.width;
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('height', function (d) {
        return TrendChart._canvas.iH - yScale(d.value);
      });
      lines.attr('d', D3Line().x(function (d) {
        return xScale(d.date) + xScale.bandwidth() / 2;
      }).y(function (d) {
        return yScale(d.value);
      }).curve(D3CurveBasis));
    };

    TrendChart.setMargin([10, 20, 30, 10]); // public

    TrendChart.setMarginLeft = function (v) {
      TrendChart._svgMargin[2] = v;

      TrendChart._resize();

      return TrendChart;
    };

    TrendChart.setMarginBottom = function (v) {
      TrendChart._svgMargin[1] = v;

      TrendChart._resize();

      return TrendChart;
    };

    TrendChart.setValueTicks = function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.2f';
      nValueTicks = n;
      valueTickFormat = format;
      return TrendChart;
    };

    TrendChart.setDateTicks = function (inFormat) {
      var outFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inFormat;
      parseDate = timeParse(inFormat);
      formatDate = timeFormat(outFormat);
      return TrendChart;
    };

    TrendChart.setMaxValue = function (v) {
      maxYValue = v;
      return TrendChart;
    };

    TrendChart.setTransition = function () {
      var du = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      var de = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
      duration = du;
      delay = de;
      return TrendChart;
    }; // serie data:
    // [ [{date:YYYY|MM,value:number}, ...], ...]


    TrendChart.render = function (series) {
      TrendChart._removeDefaultText();

      series = series.map(function (d, i) {
        var width = i == 0 ? 1 : i == 1 ? 0.6 : 0.3;
        return d.map(function (d2) {
          return {
            date: d2.date,
            value: d2.value,
            width: width
          };
        });
      });
      render(series);
      return TrendChart;
    };

    TrendChart.setTooltip = function (f) {
      tooltipFunction = f;
      setBarTooltips();
      return TrendChart;
    };

    TrendChart.setTooltipChart = function (f) {
      tooltipChart = f;
      setBarTooltips();
      return TrendChart;
    };

    TrendChart.setBarClick = function (cb) {
      barClickCB = cb;
      attachCallbacks();
      return TrendChart;
    };

    TrendChart.selectBar = function () {
      var selectDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      barGroup.selectAll('g.barGroup').selectAll('rect.bar').classed('selected', function (d) {
        return d.date === selectDate;
      });
      return TrendChart;
    };

    return TrendChart;
  }

  function HorBarChart () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var HorBarChart = Visualisation(container, width, height, 'barchart'); // private

    var nTicks = 10;
    var tickFormat = null;
    var maxXValue = -1;
    var duration = 100,
        delay = 50;
    var tooltipFunction = null,
        tooltipChart = null,
        barTooltips = [];
    var barClickCB = null;

    var svg = HorBarChart._svgTop.append('g').classed('chart', true).attr('transform', "translate(".concat(HorBarChart._canvas.l, ",").concat(HorBarChart._canvas.t, ")"));

    var yScale = band().padding(0.2),
        xScale = linear$1();
    var yAxis = svg.append('g').classed('scale', true).attr('transform', 'translate(0,0)'),
        xAxis = svg.append('g').classed('scale', true).attr('transform', "translate(0,".concat(HorBarChart._canvas.iH, ")"));
    var barGroup = svg.append('g').classed('bars', true);

    function render(serie) {
      yScale.domain(serie.map(function (d) {
        return d.key;
      })).range([0, HorBarChart._canvas.iH]);
      yAxis.attr('transform', 'translate(0,0)').call(axisLeft(yScale));
      xScale.domain([0, maxXValue === -1 ? max(serie, function (d) {
        return d.value;
      }) : maxXValue]).range([0, HorBarChart._canvas.iW]);
      xAxis.attr('transform', "translate(0,".concat(HorBarChart._canvas.iH, ")")).call(axisBottom(xScale).ticks(nTicks, tickFormat));
      var bars = barGroup.selectAll('rect.bar').data(serie, function (d) {
        return d.key;
      });
      bars.exit().transition().duration(duration).attr('width', function () {
        return 0;
      }).remove();
      bars.enter().append('rect').classed('bar', true).attr('y', function (d) {
        return yScale(d.key);
      }).attr('x', function () {
        return xScale(0);
      }).attr('width', function () {
        return 0;
      }).attr('height', function () {
        return yScale.bandwidth();
      });
      bars = barGroup.selectAll('rect.bar');
      bars.transition().duration(duration).attr('y', function (d) {
        return yScale(d.key);
      }).attr('height', function () {
        return yScale.bandwidth();
      }).delay(function (d, i) {
        return i * delay;
      }).attr('width', function (d) {
        return xScale(d.value);
      });
      attachCallbacks();
      setBarTooltips();
    }

    function attachCallbacks() {
      barGroup.selectAll('g.barGroup').selectAll('rect.bar').on('click', barClickCB).on('touch', barClickCB).on('mouseover', function () {
        D3Select(this).classed('highlight', true);
      }).on('mouseout', function () {
        D3Select(this).classed('highlight', false);
      });
    }

    function setBarTooltips() {
      // destroy previous tooltips
      barTooltips.forEach(function (t) {
        return t.destroy();
      });
      var bars = barGroup.selectAll('rect.bar');
      bars.attr('data-tippy-content', function (d, i) {
        if (tooltipFunction !== null) {
          return tooltipFunction(d, i);
        }
      }); // if tooltips defined, register them in bubbleTooltips

      if (tooltipFunction !== null || tooltipChart !== null) {
        barTooltips = tippy(bars.nodes(), {
          theme: tooltipFunction !== null ? 'dark' : 'light',
          duration: [500, 0],
          allowHTML: true,
          onShow: function onShow(t) {
            if (tooltipChart !== null) {
              var d = D3Select(t.reference).datum();
              tooltipChart(t.popper, d);
            }
          },
          onHidden: function onHidden(t) {
            // remove any svg created
            D3Select(t.popper).select('svg').remove();
          }
        });
      }
    }

    HorBarChart._onResize = function () {
      svg.attr('transform', "translate(".concat(HorBarChart._canvas.l, ",").concat(HorBarChart._canvas.t, ")"));
      var bars = barGroup.selectAll('rect.bar');
      yScale.range([0, HorBarChart._canvas.iH]);
      yAxis.attr('transform', 'translate(0,0)');
      xScale.range([0, HorBarChart._canvas.iW]);
      xAxis.attr('transform', "translate(0,".concat(HorBarChart._canvas.iH, ")"));

      if (bars.data().length > 0) {
        xAxis.call(axisBottom(xScale).ticks(nTicks, tickFormat));
        yAxis.call(axisLeft(yScale));
      }

      bars.attr('y', function (d) {
        return yScale(d.key);
      }).attr('x', function () {
        return xScale(0);
      }).attr('height', function () {
        return yScale.bandwidth();
      }).attr('width', function (d) {
        return xScale(d.value);
      });
    };

    HorBarChart.setMargin([10, 20, 30, 10]); // public

    HorBarChart.setMarginLeft = function (v) {
      HorBarChart._svgMargin[2] = v;

      HorBarChart._resize();

      return HorBarChart;
    };

    HorBarChart.setMarginBottom = function (v) {
      HorBarChart._svgMargin[1] = v;

      HorBarChart._resize();

      return HorBarChart;
    };

    HorBarChart.setTicks = function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      nTicks = n;
      tickFormat = format;
      return HorBarChart;
    };

    HorBarChart.setMaxValue = function () {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      maxXValue = v;
      return HorBarChart;
    };

    HorBarChart.setTransition = function () {
      var du = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      var de = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
      duration = du;
      delay = de;
      return HorBarChart;
    };

    HorBarChart.setTooltip = function (f) {
      tooltipFunction = f;
      setBarTooltips();
      return HorBarChart;
    };

    HorBarChart.setTooltipChart = function (f) {
      tooltipChart = f;
      setBarTooltips();
      return HorBarChart;
    };

    HorBarChart.setBarClick = function (cb) {
      barClickCB = cb;
      attachCallbacks();
      return HorBarChart;
    };

    HorBarChart.selectBar = function () {
      var selectKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      barGroup.selectAll('g.barGroup').selectAll('rect.bar').classed('selected', function (d) {
        return d.key === selectKey;
      });
      return HorBarChart;
    }; // serie data:
    // [ {key:string,value:number}, ...]


    HorBarChart.render = function (serie) {
      HorBarChart._removeDefaultText();

      render(serie);
      return HorBarChart;
    };

    return HorBarChart;
  }

  function VerBarChart () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var VerBarChart = Visualisation(container, width, height, 'barchart'); // private

    var nTicks = 10;
    var tickFormat = null;
    var maxYValue = -1;
    var duration = 100,
        delay = 50;
    var tooltipFunction = null,
        tooltipChart = null,
        barTooltips = [];
    var barClickCB = null;

    var svg = VerBarChart._svgTop.append('g').classed('chart', true).attr('transform', "translate(".concat(VerBarChart._canvas.l, ",").concat(VerBarChart._canvas.t, ")"));

    var xScale = band().padding(0.2),
        yScale = linear$1();
    var yAxis = svg.append('g').attr('transform', 'translate(0,0)'),
        xAxis = svg.append('g').attr('transform', "translate(0,".concat(VerBarChart._canvas.iH, ")"));
    var barGroup = svg.append('g').classed('bars', true);

    function render(serie) {
      xScale.domain(serie.map(function (d) {
        return d.key;
      })).range([0, VerBarChart._canvas.iW]);
      xAxis.attr('transform', "translate(0,".concat(VerBarChart._canvas.iH, ")")).call(axisBottom(xScale));
      yScale.domain([0, maxYValue === -1 ? max(serie, function (d) {
        return d.value;
      }) : maxYValue]).range([VerBarChart._canvas.iH, 0]);
      yAxis.attr('transform', 'translate(0,0)').call(axisLeft(yScale).ticks(nTicks, tickFormat));
      var bars = barGroup.selectAll('rect.bar').data(serie, function (d) {
        return d.key;
      });
      bars.exit().transition().duration(duration).attr('y', function () {
        return yScale(0);
      }).attr('height', function () {
        return 0;
      }).remove();
      bars.enter().append('rect').classed('bar', true).attr('y', function () {
        return yScale(0);
      }).attr('x', function (d) {
        return xScale(d.key);
      }).attr('width', function () {
        return xScale.bandwidth();
      }).attr('height', function () {
        return 0;
      });
      bars = barGroup.selectAll('rect.bar');
      bars.transition().duration(duration).attr('x', function (d) {
        return xScale(d.key);
      }).attr('width', function () {
        return xScale.bandwidth();
      }).delay(function (d, i) {
        return i * delay;
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('height', function (d) {
        return VerBarChart._canvas.iH - yScale(d.value);
      });
      attachCallbacks();
      setBarTooltips();
    }

    function attachCallbacks() {
      barGroup.selectAll('g.barGroup').selectAll('rect.bar').on('click', barClickCB).on('touch', barClickCB).on('mouseover', function () {
        D3Select(this).classed('highlight', true);
      }).on('mouseout', function () {
        D3Select(this).classed('highlight', false);
      });
    }

    function setBarTooltips() {
      // destroy previous tooltips
      barTooltips.forEach(function (t) {
        return t.destroy();
      });
      var bars = barGroup.selectAll('rect.bar');
      bars.attr('data-tippy-content', function (d, i) {
        if (tooltipFunction !== null) {
          return tooltipFunction(d, i);
        }
      }); // if tooltips defined, register them in bubbleTooltips

      if (tooltipFunction !== null || tooltipChart !== null) {
        barTooltips = tippy(bars.nodes(), {
          theme: tooltipFunction !== null ? 'dark' : 'light',
          duration: [500, 0],
          allowHTML: true,
          onShow: function onShow(t) {
            if (tooltipChart !== null) {
              var d = D3Select(t.reference).datum();
              tooltipChart(t.popper, d);
            }
          },
          onHidden: function onHidden(t) {
            // remove any svg created
            D3Select(t.popper).select('svg').remove();
          }
        });
      }
    }

    VerBarChart._onResize = function () {
      svg.attr('transform', "translate(".concat(VerBarChart._canvas.l, ",").concat(VerBarChart._canvas.t, ")"));
      var bars = barGroup.selectAll('rect.bar');
      yScale.range([VerBarChart._canvas.iH, 0]);
      yAxis.attr('transform', 'translate(0,0)');
      xScale.range([0, VerBarChart._canvas.iW]);
      xAxis.attr('transform', "translate(0,".concat(VerBarChart._canvas.iH, ")"));

      if (bars.data().length > 0) {
        xAxis.call(axisBottom(xScale));
        yAxis.call(axisLeft(yScale).ticks(nTicks, tickFormat));
      }

      bars.attr('x', function (d) {
        return xScale(d.key);
      }).attr('width', function () {
        return xScale.bandwidth();
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('height', function (d) {
        return VerBarChart._canvas.iH - yScale(d.value);
      });
    };

    VerBarChart.setMargin([10, 20, 30, 10]); // public

    VerBarChart.setMarginLeft = function (v) {
      VerBarChart._svgMargin[2] = v;

      VerBarChart._resize();

      return VerBarChart;
    };

    VerBarChart.setMarginBottom = function (v) {
      VerBarChart._svgMargin[1] = v;

      VerBarChart._resize();

      return VerBarChart;
    };

    VerBarChart.setTicks = function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      nTicks = n;
      tickFormat = format;
      return VerBarChart;
    };

    VerBarChart.setMaxValue = function () {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      maxYValue = v;
      return VerBarChart;
    };

    VerBarChart.setTransition = function () {
      var du = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      var de = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
      duration = du;
      delay = de;
      return VerBarChart;
    };

    VerBarChart.setTooltip = function (f) {
      tooltipFunction = f;
      setBarTooltips();
      return VerBarChart;
    };

    VerBarChart.setTooltipChart = function (f) {
      tooltipChart = f;
      setBarTooltips();
      return VerBarChart;
    };

    VerBarChart.setBarClick = function (cb) {
      barClickCB = cb;
      attachCallbacks();
      return VerBarChart;
    };

    VerBarChart.selectBar = function () {
      var selectKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      barGroup.selectAll('g.barGroup').selectAll('rect.bar').classed('selected', function (d) {
        return d.key === selectKey;
      });
      return VerBarChart;
    }; // serie data:
    // [ {key:string,value:number}, ...]


    VerBarChart.render = function (serie) {
      VerBarChart._removeDefaultText();

      render(serie);
      return VerBarChart;
    };

    return VerBarChart;
  }

  function LineChart () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var LineChart = Visualisation(container, width, height, 'linechart'); // private 

    var xAxisName = 'x',
        yAxisName = 'y',
        nTickX = 10,
        tickFormatX = null,
        nTickY = 10,
        tickFormatY = null,
        dotTooltips = [];

    var svg = LineChart._svgTop.append('g').classed('chart', true).attr('transform', "translate(".concat(LineChart._canvas.l, ",").concat(LineChart._canvas.t, ")"));

    var line = svg.append('path').classed('line', true),
        dotGroup = svg.append('g').classed('dots', true),
        smoothLine = svg.append('path').classed('line', true).classed('smoothed', true);
    var xScale = linear$1(),
        yScale = linear$1();
    var xAxis = svg.append('g').classed('scale', true).attr('transform', "translate(0,".concat(LineChart._canvas.iH, ")"));
    var yAxis = svg.append('g').classed('scale', true).attr('transform', 'translate(0,0)');

    function render(dataset) {
      updateScales(dataset);
      updateDots(dataset);
      updateLine(line, dataset, false);
      updateLine(smoothLine, dataset, true);
    }

    function updateScales(dataset) {
      xScale.domain(D3Extent(dataset, function (d) {
        return d.x;
      })).range([0, LineChart._canvas.iW]);
      yScale.domain(D3Extent(dataset, function (d) {
        return d.y;
      })).range([LineChart._canvas.iH, 0]);
      xAxis.attr('transform', "translate(0,".concat(LineChart._canvas.iH, ")")).call(axisBottom(xScale).ticks(nTickX, tickFormatX));
      yAxis.attr('transform', 'translate(0,0)').call(axisLeft(yScale).ticks(nTickY, tickFormatY));
    }

    function updateDots(dataset) {
      var dots = dotGroup.selectAll('circle.dot').data(dataset);
      dots.exit().remove();
      dots.enter().append('circle').classed('dot', true);
      dots = dotGroup.selectAll('circle.dot');
      dots.attr('cx', function (d) {
        return xScale(d.x);
      }).attr('cy', function (d) {
        return yScale(d.y);
      }).attr('r', '4px');
      setDotsTooltips();
      attachDotsCallbacks();
    }

    function setDotsTooltips() {
      dotTooltips.forEach(function (t) {
        return t.destroy();
      });
      var dots = dotGroup.selectAll('circle.dot');
      dots.attr('data-tippy-content', function (d) {
        var x = "".concat(xAxisName, ": <b>").concat(d.x, "</b>"),
            y = "".concat(yAxisName, ": <b>").concat(d.y, "</b>");
        return "".concat(x, "</br>").concat(y);
      });
      dotTooltips = tippy(dots.nodes(), {
        theme: 'dark',
        duration: [500, 0],
        allowHTML: true
      });
    }

    function attachDotsCallbacks() {
      dotGroup.selectAll('circle.dot').on('mouseover', function () {
        D3Select(this).attr('r', '6px').classed('highlight', true);
      }).on('mouseout', function () {
        D3Select(this).attr('r', '4px').classed('highlight', false);
      });
    }

    function updateLine(line, dataset) {
      var smoothed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var c = smoothed ? D3CurveBasis : D3CurveCardinal.tension(0.5);
      line.datum(dataset).attr('d', D3Line().x(function (d) {
        return xScale(d.x);
      }).y(function (d) {
        return yScale(d.y);
      }).curve(c));
    }

    LineChart._onResize = function () {
      svg.attr('transform', "translate(".concat(LineChart._canvas.l, ",").concat(LineChart._canvas.t, ")"));
      var dots = dotGroup.selectAll('circle.dot');
      xScale.range([0, LineChart._canvas.iW]);
      yScale.range([LineChart._canvas.iH, 0]);
      xAxis.attr('transform', "translate(0,".concat(LineChart._canvas.iH, ")"));
      yAxis.attr('transform', 'translate(0,0)');

      if (dots.data().length > 0) {
        xAxis.call(axisBottom(xScale));
        yAxis.call(axisLeft(yScale));
        dots.attr('cx', function (d) {
          return xScale(d.x);
        }).attr('cy', function (d) {
          return yScale(d.y);
        });
        line.attr('d', D3Line().x(function (d) {
          return xScale(d.x);
        }).y(function (d) {
          return yScale(d.y);
        }).curve(D3CurveCardinal.tension(0.5)));
        smoothLine.attr('d', D3Line().x(function (d) {
          return xScale(d.x);
        }).y(function (d) {
          return yScale(d.y);
        }).curve(D3CurveBasis));
      }
    };

    LineChart.setMargin([10, 20, 30, 10]); // public

    LineChart.setMarginLeft = function (v) {
      LineChart._svgMargin[2] = v;

      LineChart._resize();

      return LineChart;
    };

    LineChart.setMarginBottom = function (v) {
      LineChart._svgMargin[1] = v;

      LineChart._resize();

      return LineChart;
    };

    LineChart.setXAxisName = function (str) {
      xAxisName = str;
      return LineChart;
    };

    LineChart.setYAxisName = function (str) {
      yAxisName = str;
      return LineChart;
    };

    LineChart.setAxesNames = function (xStr, yStr) {
      xAxisName = xStr;
      yAxisName = yStr;
      return LineChart;
    };

    LineChart.setXTicks = function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      nTickX = n;
      tickFormatX = format;
      return LineChart;
    };

    LineChart.setYTicks = function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      nTickY = n;
      tickFormatY = format;
      return LineChart;
    };

    LineChart.setTicks = function () {
      var nX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var nY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var formatX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var formatY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      nTickX = nX;
      tickFormatX = formatX;
      nTickY = nY;
      tickFormatY = formatY;
      return LineChart;
    }; // dataset : [{x:...,y:...},...]


    LineChart.render = function (dataset) {
      LineChart._removeDefaultText();

      render(dataset);
      return LineChart;
    };

    return LineChart;
  }

  function PanelWrapper () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var classed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var WrapperObj = {}; // private

    WrapperObj._width = width;
    WrapperObj._height = height;
    WrapperObj._panelWidth = width - 2;
    WrapperObj._panelHeight = height - 2;
    WrapperObj._border = 1;

    function positionDefaultText() {
      WrapperObj._defaultText.style('top', function () {
        var pH = D3Select(this).node().offsetHeight;
        var tH = WrapperObj._title.datum().text == null ? 0 : 29;
        return "calc(50% - ".concat(pH / 2 + tH, "px");
      });
    }

    WrapperObj._resize = function () {
      WrapperObj._panelWidth = WrapperObj._width - WrapperObj._border * 2;
      WrapperObj._panelHeight = WrapperObj._height - WrapperObj._border * 2;

      WrapperObj._wrapper.style('width', WrapperObj._panelWidth + 'px').style('height', WrapperObj._panelHeight + 'px').style('border-width', WrapperObj._border);

      if (WrapperObj._defaultText !== null) {
        positionDefaultText();
      }

      WrapperObj._onResize();
    };

    WrapperObj._toggleTitle = function () {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'T';

      WrapperObj._title.data([{
        text: text,
        position: position
      }]);

      if (text == null) {
        WrapperObj._title.text('').style('margin-top', '0px').style('height', '0px');
      } else {
        WrapperObj._title.text(function (d) {
          return d.text;
        }).style('font-size', '20px').style('margin-top', '5px').style('height', '24px'); // TODO align based on position

      }

      if (WrapperObj._defaultText !== null) {
        positionDefaultText();
      }
    }; // protect


    WrapperObj._onResize = function () {};

    WrapperObj._wrapper = D3Select(container).append('div').classed(classed, true).classed('htmlpanel', true).style('width', WrapperObj._panelWidth + 'px').style('height', WrapperObj._panelHeight + 'px').style('border-width', WrapperObj._border);
    WrapperObj._title = WrapperObj._wrapper.append('p').classed('title', true).data([{
      text: null,
      position: 't'
    }]).style('margin-top', '0px').style('height', '0px');
    WrapperObj._defaultText = null;

    WrapperObj._removeDefaultText = function () {
      if (WrapperObj._defaultText != null) {
        WrapperObj._defaultText.remove();

        WrapperObj._defaultText = null;
      }
    }; // public


    WrapperObj.setWidth = function (w) {
      WrapperObj._width = w;

      WrapperObj._resize();

      return WrapperObj;
    };

    WrapperObj.setHeight = function (h) {
      WrapperObj._height = h;

      WrapperObj._resize();

      return WrapperObj;
    };

    WrapperObj.setSize = function (w, h) {
      WrapperObj._width = w;
      WrapperObj._height = h;

      WrapperObj._resize();

      return WrapperObj;
    };

    WrapperObj.toggleBorder = function () {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      bool = bool == null ? WrapperObj._border == 0 : bool;
      WrapperObj._border = bool ? 1 : 0;

      WrapperObj._resize();

      return WrapperObj;
    };

    WrapperObj.toggleTitle = function () {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'T';

      WrapperObj._toggleTitle(t, pos);

      return WrapperObj;
    };

    WrapperObj.addDefaultText = function (string) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var blinking = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (string != null) {
        if (WrapperObj._defaultText == null) {
          WrapperObj._defaultText = WrapperObj._wrapper.append('p').classed('defaultText', true);
        }

        WrapperObj._defaultText.classed('blinking', blinking).text(string).style('font-size', "".concat(size, "em"));

        positionDefaultText();
      }

      return WrapperObj;
    };

    return WrapperObj;
  }

  /* Clusterize.js - v0.18.1 - 2018-01-02
   http://NeXTs.github.com/Clusterize.js/
   Copyright (c) 2015 Denis Lukov; Licensed GPLv3 */

  var clusterize = createCommonjsModule(function (module) {
  (function(name, definition) {
      module.exports = definition();
  }('Clusterize', function() {

    // detect ie9 and lower
    // https://gist.github.com/padolsey/527683#comment-786682
    var ie = (function(){
      for( var v = 3,
               el = document.createElement('b'),
               all = el.all || [];
           el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->',
           all[0];
         ){}
      return v > 4 ? v : document.documentMode;
    }()),
    is_mac = navigator.platform.toLowerCase().indexOf('mac') + 1;
    var Clusterize = function(data) {
      if( ! (this instanceof Clusterize))
        return new Clusterize(data);
      var self = this;

      var defaults = {
        rows_in_block: 50,
        blocks_in_cluster: 4,
        tag: null,
        show_no_data_row: true,
        no_data_class: 'clusterize-no-data',
        no_data_text: 'No data',
        keep_parity: true,
        callbacks: {}
      };

      // public parameters
      self.options = {};
      var options = ['rows_in_block', 'blocks_in_cluster', 'show_no_data_row', 'no_data_class', 'no_data_text', 'keep_parity', 'tag', 'callbacks'];
      for(var i = 0, option; option = options[i]; i++) {
        self.options[option] = typeof data[option] != 'undefined' && data[option] != null
          ? data[option]
          : defaults[option];
      }

      var elems = ['scroll', 'content'];
      for(var i = 0, elem; elem = elems[i]; i++) {
        self[elem + '_elem'] = data[elem + 'Id']
          ? document.getElementById(data[elem + 'Id'])
          : data[elem + 'Elem'];
        if( ! self[elem + '_elem'])
          throw new Error("Error! Could not find " + elem + " element");
      }

      // tabindex forces the browser to keep focus on the scrolling list, fixes #11
      if( ! self.content_elem.hasAttribute('tabindex'))
        self.content_elem.setAttribute('tabindex', 0);

      // private parameters
      var rows = isArray(data.rows)
          ? data.rows
          : self.fetchMarkup(),
        cache = {},
        scroll_top = self.scroll_elem.scrollTop;

      // append initial data
      self.insertToDOM(rows, cache);

      // restore the scroll position
      self.scroll_elem.scrollTop = scroll_top;

      // adding scroll handler
      var last_cluster = false,
      scroll_debounce = 0,
      pointer_events_set = false,
      scrollEv = function() {
        // fixes scrolling issue on Mac #3
        if (is_mac) {
            if( ! pointer_events_set) self.content_elem.style.pointerEvents = 'none';
            pointer_events_set = true;
            clearTimeout(scroll_debounce);
            scroll_debounce = setTimeout(function () {
                self.content_elem.style.pointerEvents = 'auto';
                pointer_events_set = false;
            }, 50);
        }
        if (last_cluster != (last_cluster = self.getClusterNum()))
          self.insertToDOM(rows, cache);
        if (self.options.callbacks.scrollingProgress)
          self.options.callbacks.scrollingProgress(self.getScrollProgress());
      },
      resize_debounce = 0,
      resizeEv = function() {
        clearTimeout(resize_debounce);
        resize_debounce = setTimeout(self.refresh, 100);
      };
      on('scroll', self.scroll_elem, scrollEv);
      on('resize', window, resizeEv);

      // public methods
      self.destroy = function(clean) {
        off('scroll', self.scroll_elem, scrollEv);
        off('resize', window, resizeEv);
        self.html((clean ? self.generateEmptyRow() : rows).join(''));
      };
      self.refresh = function(force) {
        if(self.getRowsHeight(rows) || force) self.update(rows);
      };
      self.update = function(new_rows) {
        rows = isArray(new_rows)
          ? new_rows
          : [];
        var scroll_top = self.scroll_elem.scrollTop;
        // fixes #39
        if(rows.length * self.options.item_height < scroll_top) {
          self.scroll_elem.scrollTop = 0;
          last_cluster = 0;
        }
        self.insertToDOM(rows, cache);
        self.scroll_elem.scrollTop = scroll_top;
      };
      self.clear = function() {
        self.update([]);
      };
      self.getRowsAmount = function() {
        return rows.length;
      };
      self.getScrollProgress = function() {
        return this.options.scroll_top / (rows.length * this.options.item_height) * 100 || 0;
      };

      var add = function(where, _new_rows) {
        var new_rows = isArray(_new_rows)
          ? _new_rows
          : [];
        if( ! new_rows.length) return;
        rows = where == 'append'
          ? rows.concat(new_rows)
          : new_rows.concat(rows);
        self.insertToDOM(rows, cache);
      };
      self.append = function(rows) {
        add('append', rows);
      };
      self.prepend = function(rows) {
        add('prepend', rows);
      };
    };

    Clusterize.prototype = {
      constructor: Clusterize,
      // fetch existing markup
      fetchMarkup: function() {
        var rows = [], rows_nodes = this.getChildNodes(this.content_elem);
        while (rows_nodes.length) {
          rows.push(rows_nodes.shift().outerHTML);
        }
        return rows;
      },
      // get tag name, content tag name, tag height, calc cluster height
      exploreEnvironment: function(rows, cache) {
        var opts = this.options;
        opts.content_tag = this.content_elem.tagName.toLowerCase();
        if( ! rows.length) return;
        if(ie && ie <= 9 && ! opts.tag) opts.tag = rows[0].match(/<([^>\s/]*)/)[1].toLowerCase();
        if(this.content_elem.children.length <= 1) cache.data = this.html(rows[0] + rows[0] + rows[0]);
        if( ! opts.tag) opts.tag = this.content_elem.children[0].tagName.toLowerCase();
        this.getRowsHeight(rows);
      },
      getRowsHeight: function(rows) {
        var opts = this.options,
          prev_item_height = opts.item_height;
        opts.cluster_height = 0;
        if( ! rows.length) return;
        var nodes = this.content_elem.children;
        if( ! nodes.length) return;
        var node = nodes[Math.floor(nodes.length / 2)];
        opts.item_height = node.offsetHeight;
        // consider table's border-spacing
        if(opts.tag == 'tr' && getStyle('borderCollapse', this.content_elem) != 'collapse')
          opts.item_height += parseInt(getStyle('borderSpacing', this.content_elem), 10) || 0;
        // consider margins (and margins collapsing)
        if(opts.tag != 'tr') {
          var marginTop = parseInt(getStyle('marginTop', node), 10) || 0;
          var marginBottom = parseInt(getStyle('marginBottom', node), 10) || 0;
          opts.item_height += Math.max(marginTop, marginBottom);
        }
        opts.block_height = opts.item_height * opts.rows_in_block;
        opts.rows_in_cluster = opts.blocks_in_cluster * opts.rows_in_block;
        opts.cluster_height = opts.blocks_in_cluster * opts.block_height;
        return prev_item_height != opts.item_height;
      },
      // get current cluster number
      getClusterNum: function () {
        this.options.scroll_top = this.scroll_elem.scrollTop;
        return Math.floor(this.options.scroll_top / (this.options.cluster_height - this.options.block_height)) || 0;
      },
      // generate empty row if no data provided
      generateEmptyRow: function() {
        var opts = this.options;
        if( ! opts.tag || ! opts.show_no_data_row) return [];
        var empty_row = document.createElement(opts.tag),
          no_data_content = document.createTextNode(opts.no_data_text), td;
        empty_row.className = opts.no_data_class;
        if(opts.tag == 'tr') {
          td = document.createElement('td');
          // fixes #53
          td.colSpan = 100;
          td.appendChild(no_data_content);
        }
        empty_row.appendChild(td || no_data_content);
        return [empty_row.outerHTML];
      },
      // generate cluster for current scroll position
      generate: function (rows, cluster_num) {
        var opts = this.options,
          rows_len = rows.length;
        if (rows_len < opts.rows_in_block) {
          return {
            top_offset: 0,
            bottom_offset: 0,
            rows_above: 0,
            rows: rows_len ? rows : this.generateEmptyRow()
          }
        }
        var items_start = Math.max((opts.rows_in_cluster - opts.rows_in_block) * cluster_num, 0),
          items_end = items_start + opts.rows_in_cluster,
          top_offset = Math.max(items_start * opts.item_height, 0),
          bottom_offset = Math.max((rows_len - items_end) * opts.item_height, 0),
          this_cluster_rows = [],
          rows_above = items_start;
        if(top_offset < 1) {
          rows_above++;
        }
        for (var i = items_start; i < items_end; i++) {
          rows[i] && this_cluster_rows.push(rows[i]);
        }
        return {
          top_offset: top_offset,
          bottom_offset: bottom_offset,
          rows_above: rows_above,
          rows: this_cluster_rows
        }
      },
      renderExtraTag: function(class_name, height) {
        var tag = document.createElement(this.options.tag),
          clusterize_prefix = 'clusterize-';
        tag.className = [clusterize_prefix + 'extra-row', clusterize_prefix + class_name].join(' ');
        height && (tag.style.height = height + 'px');
        return tag.outerHTML;
      },
      // if necessary verify data changed and insert to DOM
      insertToDOM: function(rows, cache) {
        // explore row's height
        if( ! this.options.cluster_height) {
          this.exploreEnvironment(rows, cache);
        }
        var data = this.generate(rows, this.getClusterNum()),
          this_cluster_rows = data.rows.join(''),
          this_cluster_content_changed = this.checkChanges('data', this_cluster_rows, cache),
          top_offset_changed = this.checkChanges('top', data.top_offset, cache),
          only_bottom_offset_changed = this.checkChanges('bottom', data.bottom_offset, cache),
          callbacks = this.options.callbacks,
          layout = [];

        if(this_cluster_content_changed || top_offset_changed) {
          if(data.top_offset) {
            this.options.keep_parity && layout.push(this.renderExtraTag('keep-parity'));
            layout.push(this.renderExtraTag('top-space', data.top_offset));
          }
          layout.push(this_cluster_rows);
          data.bottom_offset && layout.push(this.renderExtraTag('bottom-space', data.bottom_offset));
          callbacks.clusterWillChange && callbacks.clusterWillChange();
          this.html(layout.join(''));
          this.options.content_tag == 'ol' && this.content_elem.setAttribute('start', data.rows_above);
          this.content_elem.style['counter-increment'] = 'clusterize-counter ' + (data.rows_above-1);
          callbacks.clusterChanged && callbacks.clusterChanged();
        } else if(only_bottom_offset_changed) {
          this.content_elem.lastChild.style.height = data.bottom_offset + 'px';
        }
      },
      // unfortunately ie <= 9 does not allow to use innerHTML for table elements, so make a workaround
      html: function(data) {
        var content_elem = this.content_elem;
        if(ie && ie <= 9 && this.options.tag == 'tr') {
          var div = document.createElement('div'), last;
          div.innerHTML = '<table><tbody>' + data + '</tbody></table>';
          while((last = content_elem.lastChild)) {
            content_elem.removeChild(last);
          }
          var rows_nodes = this.getChildNodes(div.firstChild.firstChild);
          while (rows_nodes.length) {
            content_elem.appendChild(rows_nodes.shift());
          }
        } else {
          content_elem.innerHTML = data;
        }
      },
      getChildNodes: function(tag) {
          var child_nodes = tag.children, nodes = [];
          for (var i = 0, ii = child_nodes.length; i < ii; i++) {
              nodes.push(child_nodes[i]);
          }
          return nodes;
      },
      checkChanges: function(type, value, cache) {
        var changed = value != cache[type];
        cache[type] = value;
        return changed;
      }
    };

    // support functions
    function on(evt, element, fnc) {
      return element.addEventListener ? element.addEventListener(evt, fnc, false) : element.attachEvent("on" + evt, fnc);
    }
    function off(evt, element, fnc) {
      return element.removeEventListener ? element.removeEventListener(evt, fnc, false) : element.detachEvent("on" + evt, fnc);
    }
    function isArray(arr) {
      return Object.prototype.toString.call(arr) === '[object Array]';
    }
    function getStyle(prop, elem) {
      return window.getComputedStyle ? window.getComputedStyle(elem)[prop] : elem.currentStyle[prop];
    }

    return Clusterize;
  }));
  });

  function DocumentTable () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var DocTable = PanelWrapper(container, width, height, 'doctable'); // private

    var minRowHeight = DocTable._panelHeight / 11,
        minRowHeightSet = -1;
    var columnsInfo = [];

    var rowsFilterArray = [],
        rowsFilterCB = function rowsFilterCB() {},
        rowsFilterText = '';

    var cellsTooltips = [];
    var doClusterize = false,
        clusterize$1 = null,
        chunkSize = 100;

    var docTable = DocTable._wrapper.append('div').classed('table', true);

    var rowsFilter = docTable.append('span').classed('rowsFilter', true);
    var table = docTable.append('table'),
        thead = table.append('thead'),
        tbody = table.append('tbody'),
        titleRow = thead.append('tr');

    function setupClusterize() {
      if (doClusterize) {
        DocTable._wrapper.attr('id', 'scrollAreaClusterize').classed('clusterize-scroll', true);

        tbody.attr('id', 'contentAreaClusterize').classed('clusterize-content', true);
      } else {
        DocTable._wrapper.attr('id', null).classed('clusterize-scroll', false);

        tbody.attr('id', null).classed('clusterize-content', false);
      }
    }

    function addColumnInfo(c) {
      var defaultValue = function defaultValue(value, def) {
        return typeof value === 'undefined' ? def : value;
      };

      var title = defaultValue(c.title, ''),
          tooltip = defaultValue(c.tooltip, null),
          tooltipChart = defaultValue(c.tooltipChart, null),
          accessor = defaultValue(c.accessor, function () {}),
          mouseover = defaultValue(c.mouseover, function () {}),
          mouseout = defaultValue(c.mouseout, function () {}),
          click = defaultValue(c.click, function () {}),
          align = defaultValue(c.align, 'left'),
          decoration = defaultValue(c.decoration, 'none'),
          cursor = defaultValue(c.cursor, 'default');
      columnsInfo.push({
        title: title,
        tooltip: tooltip,
        tooltipChart: tooltipChart,
        accessor: accessor,
        mouseover: mouseover,
        mouseout: mouseout,
        click: click,
        align: align,
        decoration: decoration,
        cursor: cursor
      });
    }

    function renderTable(dataset) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (clusterize$1 != null) {
        clusterize$1.destroy();
      }

      renderDataRows(dataset);
      renderRowsFilter(filter, dataset.length);
      renderTitleRow();

      if (doClusterize) {
        fitHeaders();
        clusterize$1 = new clusterize({
          scrollId: 'scrollAreaClusterize',
          contentId: 'contentAreaClusterize',
          rows_in_block: chunkSize,
          callbacks: {
            clusterChanged: fitHeaders
          }
        });
      }
    }

    function fitHeaders() {
      var firstRow = tbody.select('tr');
      var columnsWidth = [];
      firstRow.selectAll('td').each(function () {
        columnsWidth.push(this.offsetWidth);
      });
      titleRow.selectAll('th').each(function (d, i) {
        D3Select(this).attr('width', columnsWidth[i]);
      });
    }

    function renderTitleRow() {
      titleRow.call(styleRow);
      var titleCells = titleRow.selectAll('th').data(columnsInfo);
      titleCells.exit().remove();
      titleCells.enter().append('th').merge(titleCells).text(function (d) {
        return d.title;
      }).call(styleCell, true);
    }

    function renderDataRows(dataset) {
      cellsTooltips.forEach(function (t) {
        return t.destroy();
      });
      cellsTooltips = [];
      var rows = tbody.selectAll('tr').data(dataset);
      rows.exit().remove();
      rows.enter().append('tr').merge(rows).call(styleRow).each(makeCells);
    }

    function makeCells(rowData) {
      var row = D3Select(this);
      var cells = row.selectAll('td').data(columnsInfo);
      cells.exit().remove();
      cells.enter().append('td');
      cells = row.selectAll('td').html(function (d) {
        return d.accessor(rowData);
      }).on('click', function (e, d) {
        return d.click(e, rowData);
      }).on('mouseover', function (e, d) {
        return d.mouseover(e, rowData);
      }).on('mouseout', function (e, d) {
        return d.mouseout(e, rowData);
      }).call(styleCell).call(attachCellCallback, rowData);
    }

    function styleRow(rows) {
      rows.style('height', minRowHeight + 'px').style('font-size', Math.max(minRowHeight / 4.5, 11) + 'px');
    }

    function styleCell(cells) {
      var isHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      cells.style('cursor', function (d) {
        return isHeader ? 'default' : d.cursor;
      }).style('text-align', function (d) {
        return isHeader ? 'center' : d.align;
      }).style('text-decoration', function (d) {
        return isHeader ? 'none' : d.decoration;
      });
    }

    function attachCellCallback(cells, rowData) {
      cells.attr('data-tippy-content', function (d) {
        if (d.tooltip !== null) {
          return d.tooltip(rowData);
        }
      });
      cells.each(function (d) {
        if (!doClusterize && (d.tooltip !== null || d.tooltipChart !== null)) {
          cellsTooltips.push(tippy(this, {
            theme: d.tooltip !== null ? 'dark' : 'light',
            duration: [500, 0],
            allowHTML: true,
            onShow: function onShow(t) {
              if (d.tooltipChart !== null) {
                d.tooltipChart(t.popper, rowData);
              }
            },
            onHidden: function onHidden(t) {
              // remove any svg created
              D3Select(t.popper).select('svg').remove();
            }
          }));
        }
      });
    }

    function renderRowsFilter() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var nRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      rowsFilter.selectAll('span').remove();

      if (rowsFilterArray.length > 0) {
        if (rowsFilterText.length > 0) {
          rowsFilter.append('span').text(rowsFilterText + ':');
        }

        var options = rowsFilter.append('span').classed('options', true).selectAll('a').data(rowsFilterArray);
        options.enter().append('a').text(function (d) {
          return d;
        }).classed('selected', function (d) {
          return filter == d;
        }).on('click', rowsFilterCB);
        rowsFilter.append('span').text("(".concat(nRows, " documents)"));
      }
    }

    function highlightRows(docIds) {
      var rows = tbody.selectAll('tr');
      rows.classed('highlight', false);
      rows.filter(function (d) {
        return docIds.indexOf(d.docId) > -1;
      }).classed('highlight', true);
    }

    function fadeRows(docIds) {
      var rows = tbody.selectAll('tr');
      rows.classed('faded', false);
      rows.filter(function (d) {
        return docIds.indexOf(d.docId) > -1;
      }).classed('faded', true);
    }

    DocTable._onResize = function () {
      minRowHeight = Math.max(minRowHeightSet, (DocTable._panelHeight - 6) / 11.5);
    }; // public


    DocTable.setMinRowHeight = function () {
      var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      minRowHeightSet = h;
      minRowHeight = Math.max(minRowHeightSet, minRowHeight);
      return DocTable;
    };

    DocTable.setColumnsInfo = function () {
      var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      columnsInfo = [];
      columns.forEach(addColumnInfo);
      return DocTable;
    };

    DocTable.rowsFilter = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      rowsFilterArray = options, rowsFilterCB = cb, rowsFilterText = text;
      return DocTable;
    };

    DocTable.render = function (dataset) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      DocTable._removeDefaultText();

      renderTable(dataset, filter);
      return DocTable;
    };

    DocTable.highlightDocs = function (docIds) {
      highlightRows(docIds);
      return DocTable;
    };

    DocTable.fadeDocs = function (docIds) {
      fadeRows(docIds);
      return DocTable;
    };

    DocTable.doClusterize = function () {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      doClusterize = bool;
      chunkSize = size;
      setupClusterize();
      return DocTable;
    };

    return DocTable;
  }

  /** `Object#toString` result references. */
  var stringTag$2 = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag$2);
  }

  function DocumentViewer () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var DocViewer = PanelWrapper(container, width, height, 'docviewer'); // private

    var fields = null;

    var docView = DocViewer._wrapper.append('div').classed('viewer', true);

    var fieldsPara = docView.selectAll('p.docField');

    var capitalizeString = function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    function renderDoc(docData) {
      renderDocFields(docData);
    }

    function renderDocFields(docData) {
      var data = fields == null ? Object.keys(docData).map(function (d) {
        return [d, d, function (e) {
          return e;
        }];
      }) : fields; // Object.entries(docData).map(d=>{return {key:d[0], value:d[1]};});

      fieldsPara = docView.selectAll('p.docField').data(data, function (d) {
        return d[0];
      });
      fieldsPara.exit().remove();
      var fieldsEnter = fieldsPara.enter().append('p').classed('docField', true);
      fieldsEnter.append('span').classed('key', true);
      fieldsEnter.append('span').classed('value', true);
      fieldsPara = docView.selectAll('p.docField');
      fieldsPara.select('span.key').text(function (d) {
        return capitalizeString(d[1]) + ':';
      });
      fieldsPara.select('span.value').text(function (d) {
        return d[2](docData[d[0]]);
      });
    }

    DocViewer._onResize = function () {}; // public


    DocViewer.render = function (docData) {
      DocViewer._removeDefaultText();

      renderDoc(docData);
      return DocViewer;
    }; // [[key,text]]


    DocViewer.setFields = function () {
      var f = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      fields = f;

      if (isArray(fields)) {
        fields = fields.map(function (f) {
          if (isArray(f)) {
            if (f.length == 3) return f;
            if (f.length == 2) return [f[0], f[1], function (d) {
              return d;
            }];
            if (f.length == 1) return [f[0], f[0], function (d) {
              return d;
            }];
          } else if (isString(f)) {
            return [f, f, function (d) {
              return d;
            }];
          }
        });
      }

      return DocViewer;
    };

    return DocViewer;
  }

  function Modal () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var actDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var Modal = {}; // private

    var modalOpened = false,
        backClick = false; // [{name,disabled,action,class}]

    var actionsDetails = actDetails;
    var modalBack = D3Select(container).append('div').classed('modalBack', true).on('click', function () {
      Modal.toggleModal(false);
    });
    var modal = modalBack.append('div').classed('modal', true).on('click', function (e) {
      e.stopPropagation();
    });
    var modalHeader = modal.append('div').classed('modalHeader', true);
    var title = modalHeader.append('h1').classed('modalTitle', true);
    var modalBody = modal.append('div').classed('modalBody', true);
    var modalFooter = modal.append('div').classed('modalFooter', true);
    var actionButtons = modalFooter.selectAll('button.modalAction');

    function updateActions() {
      actionButtons = modalFooter.selectAll('button.modalAction').data(actionsDetails, function (d) {
        return d.name;
      });
      actionButtons.exit().remove();
      actionButtons.enter().append('button').classed('modalAction', true);
      actionButtons = modalFooter.selectAll('button.modalAction');
      actionButtons.text(function (d) {
        return d.name;
      }).on('click', function (e, d) {
        d.action();
      }).classed('btn', true).attr('disabled', function (d) {
        if (has(d, 'disabled')) {
          return d.disabled ? true : null;
        }

        return null;
      }).each(function (d) {
        if (has(d, 'class')) {
          D3Select(this).classed(d["class"], true);
        }
      });
    } // public


    Modal.setTitle = function (t) {
      title.html(t);
      return Modal;
    };

    Modal.toggleBackClick = function (bool) {
      backClick = typeof bool !== 'boolean' ? !backClick : bool;
      var clickCB = backClick ? function () {
        Modal.toggleModal(false);
      } : function () {};
      modalBack.on('click', clickCB);
      return Modal;
    };

    Modal.setActions = function (d) {
      actionsDetails = d;
      updateActions();
      return Modal;
    };

    Modal.toggleAction = function (name, bool) {
      var a = find(actionsDetails, function (d) {
        return d.name === name;
      });

      if (typeof a !== 'undefined') {
        a.disabled = typeof bool !== 'boolean' ? !a.disabled : bool;
      }

      updateActions();
      return Modal;
    };

    Modal.toggleModal = function (open) {
      modalOpened = typeof open !== 'boolean' ? !modalOpened : open;
      modalBack.classed('opened', modalOpened);
      return Modal;
    };

    Modal.getModalTitle = function () {
      return title;
    };

    Modal.getModalBody = function () {
      return modalBody;
    };

    Modal.getModal = function () {
      return modal;
    };

    Modal.reset = function () {
      actionsDetails = [];
      updateActions();
      title.html('');
      modalBody.selectAll('*').remove();
      return Modal;
    };

    return Modal;
  }

  /*!
   * html2canvas 1.0.0-rc.7 <https://html2canvas.hertzen.com>
   * Copyright (c) 2020 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  var Bounds = /** @class */ (function () {
      function Bounds(x, y, w, h) {
          this.left = x;
          this.top = y;
          this.width = w;
          this.height = h;
      }
      Bounds.prototype.add = function (x, y, w, h) {
          return new Bounds(this.left + x, this.top + y, this.width + w, this.height + h);
      };
      Bounds.fromClientRect = function (clientRect) {
          return new Bounds(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
      };
      return Bounds;
  }());
  var parseBounds = function (node) {
      return Bounds.fromClientRect(node.getBoundingClientRect());
  };
  var parseDocumentSize = function (document) {
      var body = document.body;
      var documentElement = document.documentElement;
      if (!body || !documentElement) {
          throw new Error("Unable to get document size");
      }
      var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
      var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
      return new Bounds(0, 0, width, height);
  };

  /*
   * css-line-break 1.1.1 <https://github.com/niklasvh/css-line-break#readme>
   * Copyright (c) 2019 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var toCodePoints = function (str) {
      var codePoints = [];
      var i = 0;
      var length = str.length;
      while (i < length) {
          var value = str.charCodeAt(i++);
          if (value >= 0xd800 && value <= 0xdbff && i < length) {
              var extra = str.charCodeAt(i++);
              if ((extra & 0xfc00) === 0xdc00) {
                  codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
              }
              else {
                  codePoints.push(value);
                  i--;
              }
          }
          else {
              codePoints.push(value);
          }
      }
      return codePoints;
  };
  var fromCodePoint = function () {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          codePoints[_i] = arguments[_i];
      }
      if (String.fromCodePoint) {
          return String.fromCodePoint.apply(String, codePoints);
      }
      var length = codePoints.length;
      if (!length) {
          return '';
      }
      var codeUnits = [];
      var index = -1;
      var result = '';
      while (++index < length) {
          var codePoint = codePoints[index];
          if (codePoint <= 0xffff) {
              codeUnits.push(codePoint);
          }
          else {
              codePoint -= 0x10000;
              codeUnits.push((codePoint >> 10) + 0xd800, codePoint % 0x400 + 0xdc00);
          }
          if (index + 1 === length || codeUnits.length > 0x4000) {
              result += String.fromCharCode.apply(String, codeUnits);
              codeUnits.length = 0;
          }
      }
      return result;
  };
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
  }
  var decode = function (base64) {
      var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
      if (base64[base64.length - 1] === '=') {
          bufferLength--;
          if (base64[base64.length - 2] === '=') {
              bufferLength--;
          }
      }
      var buffer = typeof ArrayBuffer !== 'undefined' &&
          typeof Uint8Array !== 'undefined' &&
          typeof Uint8Array.prototype.slice !== 'undefined'
          ? new ArrayBuffer(bufferLength)
          : new Array(bufferLength);
      var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
      for (i = 0; i < len; i += 4) {
          encoded1 = lookup[base64.charCodeAt(i)];
          encoded2 = lookup[base64.charCodeAt(i + 1)];
          encoded3 = lookup[base64.charCodeAt(i + 2)];
          encoded4 = lookup[base64.charCodeAt(i + 3)];
          bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
          bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
          bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }
      return buffer;
  };
  var polyUint16Array = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 2) {
          bytes.push((buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
  };
  var polyUint32Array = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 4) {
          bytes.push((buffer[i + 3] << 24) | (buffer[i + 2] << 16) | (buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
  };

  /** Shift size for getting the index-2 table offset. */
  var UTRIE2_SHIFT_2 = 5;
  /** Shift size for getting the index-1 table offset. */
  var UTRIE2_SHIFT_1 = 6 + 5;
  /**
   * Shift size for shifting left the index array values.
   * Increases possible data size with 16-bit index values at the cost
   * of compactability.
   * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
   */
  var UTRIE2_INDEX_SHIFT = 2;
  /**
   * Difference between the two shift sizes,
   * for getting an index-1 offset from an index-2 offset. 6=11-5
   */
  var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
  /**
   * The part of the index-2 table for U+D800..U+DBFF stores values for
   * lead surrogate code _units_ not code _points_.
   * Values for lead surrogate code _points_ are indexed with this portion of the table.
   * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
   */
  var UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;
  /** Number of entries in a data block. 32=0x20 */
  var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
  /** Mask for getting the lower bits for the in-data-block offset. */
  var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
  var UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
  /** Count the lengths of both BMP pieces. 2080=0x820 */
  var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
  /**
   * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
   * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
   */
  var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
  var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
  /**
   * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
   * Variable length, for code points up to highStart, where the last single-value range starts.
   * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
   * (For 0x100000 supplementary code points U+10000..U+10ffff.)
   *
   * The part of the index-2 table for supplementary code points starts
   * after this index-1 table.
   *
   * Both the index-1 table and the following part of the index-2 table
   * are omitted completely if there is only BMP data.
   */
  var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
  /**
   * Number of index-1 entries for the BMP. 32=0x20
   * This part of the index-1 table is omitted from the serialized form.
   */
  var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;
  /** Number of entries in an index-2 block. 64=0x40 */
  var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
  /** Mask for getting the lower bits for the in-index-2-block offset. */
  var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
  var slice16 = function (view, start, end) {
      if (view.slice) {
          return view.slice(start, end);
      }
      return new Uint16Array(Array.prototype.slice.call(view, start, end));
  };
  var slice32 = function (view, start, end) {
      if (view.slice) {
          return view.slice(start, end);
      }
      return new Uint32Array(Array.prototype.slice.call(view, start, end));
  };
  var createTrieFromBase64 = function (base64) {
      var buffer = decode(base64);
      var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
      var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
      var headerLength = 24;
      var index = slice16(view16, headerLength / 2, view32[4] / 2);
      var data = view32[5] === 2
          ? slice16(view16, (headerLength + view32[4]) / 2)
          : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
      return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
  };
  var Trie = /** @class */ (function () {
      function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
          this.initialValue = initialValue;
          this.errorValue = errorValue;
          this.highStart = highStart;
          this.highValueIndex = highValueIndex;
          this.index = index;
          this.data = data;
      }
      /**
       * Get the value for a code point as stored in the Trie.
       *
       * @param codePoint the code point
       * @return the value
       */
      Trie.prototype.get = function (codePoint) {
          var ix;
          if (codePoint >= 0) {
              if (codePoint < 0x0d800 || (codePoint > 0x0dbff && codePoint <= 0x0ffff)) {
                  // Ordinary BMP code point, excluding leading surrogates.
                  // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                  // 16 bit data is stored in the index array itself.
                  ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
              }
              if (codePoint <= 0xffff) {
                  // Lead Surrogate Code Point.  A Separate index section is stored for
                  // lead surrogate code units and code points.
                  //   The main index has the code unit data.
                  //   For this function, we need the code point data.
                  // Note: this expression could be refactored for slightly improved efficiency, but
                  //       surrogate code points will be so rare in practice that it's not worth it.
                  ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + ((codePoint - 0xd800) >> UTRIE2_SHIFT_2)];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
              }
              if (codePoint < this.highStart) {
                  // Supplemental code point, use two-level lookup.
                  ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                  ix = this.index[ix];
                  ix += (codePoint >> UTRIE2_SHIFT_2) & UTRIE2_INDEX_2_MASK;
                  ix = this.index[ix];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
              }
              if (codePoint <= 0x10ffff) {
                  return this.data[this.highValueIndex];
              }
          }
          // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
          return this.errorValue;
      };
      return Trie;
  }());

  var base64 = 'KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA';

  /* @flow */
  var LETTER_NUMBER_MODIFIER = 50;
  // Non-tailorable Line Breaking Classes
  var BK = 1; //  Cause a line break (after)
  var CR = 2; //  Cause a line break (after), except between CR and LF
  var LF = 3; //  Cause a line break (after)
  var CM = 4; //  Prohibit a line break between the character and the preceding character
  var NL = 5; //  Cause a line break (after)
  var WJ = 7; //  Prohibit line breaks before and after
  var ZW = 8; //  Provide a break opportunity
  var GL = 9; //  Prohibit line breaks before and after
  var SP = 10; // Enable indirect line breaks
  var ZWJ = 11; // Prohibit line breaks within joiner sequences
  // Break Opportunities
  var B2 = 12; //  Provide a line break opportunity before and after the character
  var BA = 13; //  Generally provide a line break opportunity after the character
  var BB = 14; //  Generally provide a line break opportunity before the character
  var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
  var CB = 16; //   Provide a line break opportunity contingent on additional information
  // Characters Prohibiting Certain Breaks
  var CL = 17; //  Prohibit line breaks before
  var CP = 18; //  Prohibit line breaks before
  var EX = 19; //  Prohibit line breaks before
  var IN = 20; //  Allow only indirect line breaks between pairs
  var NS = 21; //  Allow only indirect line breaks before
  var OP = 22; //  Prohibit line breaks after
  var QU = 23; //  Act like they are both opening and closing
  // Numeric Context
  var IS = 24; //  Prevent breaks after any and before numeric
  var NU = 25; //  Form numeric expressions for line breaking purposes
  var PO = 26; //  Do not break following a numeric expression
  var PR = 27; //  Do not break in front of a numeric expression
  var SY = 28; //  Prevent a break before; and allow a break after
  // Other Characters
  var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
  var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
  var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
  var EB = 32; //  Do not break from following Emoji Modifier
  var EM = 33; //  Do not break from preceding Emoji Base
  var H2 = 34; //  Form Korean syllable blocks
  var H3 = 35; //  Form Korean syllable blocks
  var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
  var ID = 37; //  Break before or after; except in some numeric context
  var JL = 38; //  Form Korean syllable blocks
  var JV = 39; //  Form Korean syllable blocks
  var JT = 40; //  Form Korean syllable blocks
  var RI = 41; //  Keep pairs together. For pairs; break before and after other classes
  var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
  var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions
  var BREAK_MANDATORY = '!';
  var BREAK_NOT_ALLOWED = '×';
  var BREAK_ALLOWED = '÷';
  var UnicodeTrie = createTrieFromBase64(base64);
  var ALPHABETICS = [AL, HL];
  var HARD_LINE_BREAKS = [BK, CR, LF, NL];
  var SPACE = [SP, ZW];
  var PREFIX_POSTFIX = [PR, PO];
  var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE);
  var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
  var HYPHEN = [HY, BA];
  var codePointsToCharacterClasses = function (codePoints, lineBreak) {
      if (lineBreak === void 0) { lineBreak = 'strict'; }
      var types = [];
      var indicies = [];
      var categories = [];
      codePoints.forEach(function (codePoint, index) {
          var classType = UnicodeTrie.get(codePoint);
          if (classType > LETTER_NUMBER_MODIFIER) {
              categories.push(true);
              classType -= LETTER_NUMBER_MODIFIER;
          }
          else {
              categories.push(false);
          }
          if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
              // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
              if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
                  indicies.push(index);
                  return types.push(CB);
              }
          }
          if (classType === CM || classType === ZWJ) {
              // LB10 Treat any remaining combining mark or ZWJ as AL.
              if (index === 0) {
                  indicies.push(index);
                  return types.push(AL);
              }
              // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
              // the base character in all of the following rules. Treat ZWJ as if it were CM.
              var prev = types[index - 1];
              if (LINE_BREAKS.indexOf(prev) === -1) {
                  indicies.push(indicies[index - 1]);
                  return types.push(prev);
              }
              indicies.push(index);
              return types.push(AL);
          }
          indicies.push(index);
          if (classType === CJ) {
              return types.push(lineBreak === 'strict' ? NS : ID);
          }
          if (classType === SA) {
              return types.push(AL);
          }
          if (classType === AI) {
              return types.push(AL);
          }
          // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
          // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
          // to take into account the actual line breaking properties for these characters.
          if (classType === XX) {
              if ((codePoint >= 0x20000 && codePoint <= 0x2fffd) || (codePoint >= 0x30000 && codePoint <= 0x3fffd)) {
                  return types.push(ID);
              }
              else {
                  return types.push(AL);
              }
          }
          types.push(classType);
      });
      return [indicies, types, categories];
  };
  var isAdjacentWithSpaceIgnored = function (a, b, currentIndex, classTypes) {
      var current = classTypes[currentIndex];
      if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
          var i = currentIndex;
          while (i <= classTypes.length) {
              i++;
              var next = classTypes[i];
              if (next === b) {
                  return true;
              }
              if (next !== SP) {
                  break;
              }
          }
      }
      if (current === SP) {
          var i = currentIndex;
          while (i > 0) {
              i--;
              var prev = classTypes[i];
              if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
                  var n = currentIndex;
                  while (n <= classTypes.length) {
                      n++;
                      var next = classTypes[n];
                      if (next === b) {
                          return true;
                      }
                      if (next !== SP) {
                          break;
                      }
                  }
              }
              if (prev !== SP) {
                  break;
              }
          }
      }
      return false;
  };
  var previousNonSpaceClassType = function (currentIndex, classTypes) {
      var i = currentIndex;
      while (i >= 0) {
          var type = classTypes[i];
          if (type === SP) {
              i--;
          }
          else {
              return type;
          }
      }
      return 0;
  };
  var _lineBreakAtIndex = function (codePoints, classTypes, indicies, index, forbiddenBreaks) {
      if (indicies[index] === 0) {
          return BREAK_NOT_ALLOWED;
      }
      var currentIndex = index - 1;
      if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
          return BREAK_NOT_ALLOWED;
      }
      var beforeIndex = currentIndex - 1;
      var afterIndex = currentIndex + 1;
      var current = classTypes[currentIndex];
      // LB4 Always break after hard line breaks.
      // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
      var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
      var next = classTypes[afterIndex];
      if (current === CR && next === LF) {
          return BREAK_NOT_ALLOWED;
      }
      if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
          return BREAK_MANDATORY;
      }
      // LB6 Do not break before hard line breaks.
      if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // LB7 Do not break before spaces or zero width space.
      if (SPACE.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
      if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
          return BREAK_ALLOWED;
      }
      // LB8a Do not break between a zero width joiner and an ideograph, emoji base or emoji modifier.
      if (UnicodeTrie.get(codePoints[currentIndex]) === ZWJ && (next === ID || next === EB || next === EM)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB11 Do not break before or after Word joiner and related characters.
      if (current === WJ || next === WJ) {
          return BREAK_NOT_ALLOWED;
      }
      // LB12 Do not break after NBSP and related characters.
      if (current === GL) {
          return BREAK_NOT_ALLOWED;
      }
      // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
      if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
          return BREAK_NOT_ALLOWED;
      }
      // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
      if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // LB14 Do not break after ‘[’, even after spaces.
      if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
          return BREAK_NOT_ALLOWED;
      }
      // LB15 Do not break within ‘”[’, even with intervening spaces.
      if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
      if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB17 Do not break within ‘——’, even with intervening spaces.
      if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB18 Break after spaces.
      if (current === SP) {
          return BREAK_ALLOWED;
      }
      // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
      if (current === QU || next === QU) {
          return BREAK_NOT_ALLOWED;
      }
      // LB20 Break before and after unresolved CB.
      if (next === CB || current === CB) {
          return BREAK_ALLOWED;
      }
      // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
      if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
          return BREAK_NOT_ALLOWED;
      }
      // LB21a Don't break after Hebrew + Hyphen.
      if (before === HL && HYPHEN.indexOf(current) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // LB21b Don’t break between Solidus and Hebrew letters.
      if (current === SY && next === HL) {
          return BREAK_NOT_ALLOWED;
      }
      // LB22 Do not break between two ellipses, or between letters, numbers or exclamations and ellipsis.
      if (next === IN && ALPHABETICS.concat(IN, EX, NU, ID, EB, EM).indexOf(current) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // LB23 Do not break between digits and letters.
      if ((ALPHABETICS.indexOf(next) !== -1 && current === NU) || (ALPHABETICS.indexOf(current) !== -1 && next === NU)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
      if ((current === PR && [ID, EB, EM].indexOf(next) !== -1) ||
          ([ID, EB, EM].indexOf(current) !== -1 && next === PO)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
      if ((ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1) ||
          (PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB25 Do not break between the following pairs of classes relevant to numbers:
      if (
      // (PR | PO) × ( OP | HY )? NU
      ([PR, PO].indexOf(current) !== -1 &&
          (next === NU || ([OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU))) ||
          // ( OP | HY ) × NU
          ([OP, HY].indexOf(current) !== -1 && next === NU) ||
          // NU ×	(NU | SY | IS)
          (current === NU && [NU, SY, IS].indexOf(next) !== -1)) {
          return BREAK_NOT_ALLOWED;
      }
      // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
      if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
          var prevIndex = currentIndex;
          while (prevIndex >= 0) {
              var type = classTypes[prevIndex];
              if (type === NU) {
                  return BREAK_NOT_ALLOWED;
              }
              else if ([SY, IS].indexOf(type) !== -1) {
                  prevIndex--;
              }
              else {
                  break;
              }
          }
      }
      // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
      if ([PR, PO].indexOf(next) !== -1) {
          var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
          while (prevIndex >= 0) {
              var type = classTypes[prevIndex];
              if (type === NU) {
                  return BREAK_NOT_ALLOWED;
              }
              else if ([SY, IS].indexOf(type) !== -1) {
                  prevIndex--;
              }
              else {
                  break;
              }
          }
      }
      // LB26 Do not break a Korean syllable.
      if ((JL === current && [JL, JV, H2, H3].indexOf(next) !== -1) ||
          ([JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1) ||
          ([JT, H3].indexOf(current) !== -1 && next === JT)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB27 Treat a Korean Syllable Block the same as ID.
      if ((KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1) ||
          (KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB28 Do not break between alphabetics (“at”).
      if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
      if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
      if ((ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP) ||
          (ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP)) {
          return BREAK_NOT_ALLOWED;
      }
      // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
      // indicators preceding the position of the break.
      if (current === RI && next === RI) {
          var i = indicies[currentIndex];
          var count = 1;
          while (i > 0) {
              i--;
              if (classTypes[i] === RI) {
                  count++;
              }
              else {
                  break;
              }
          }
          if (count % 2 !== 0) {
              return BREAK_NOT_ALLOWED;
          }
      }
      // LB30b Do not break between an emoji base and an emoji modifier.
      if (current === EB && next === EM) {
          return BREAK_NOT_ALLOWED;
      }
      return BREAK_ALLOWED;
  };
  var cssFormattedClasses = function (codePoints, options) {
      if (!options) {
          options = { lineBreak: 'normal', wordBreak: 'normal' };
      }
      var _a = codePointsToCharacterClasses(codePoints, options.lineBreak), indicies = _a[0], classTypes = _a[1], isLetterNumber = _a[2];
      if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
          classTypes = classTypes.map(function (type) { return ([NU, AL, SA].indexOf(type) !== -1 ? ID : type); });
      }
      var forbiddenBreakpoints = options.wordBreak === 'keep-all'
          ? isLetterNumber.map(function (letterNumber, i) {
              return letterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
          })
          : undefined;
      return [indicies, classTypes, forbiddenBreakpoints];
  };
  var Break = /** @class */ (function () {
      function Break(codePoints, lineBreak, start, end) {
          this.codePoints = codePoints;
          this.required = lineBreak === BREAK_MANDATORY;
          this.start = start;
          this.end = end;
      }
      Break.prototype.slice = function () {
          return fromCodePoint.apply(void 0, this.codePoints.slice(this.start, this.end));
      };
      return Break;
  }());
  var LineBreaker = function (str, options) {
      var codePoints = toCodePoints(str);
      var _a = cssFormattedClasses(codePoints, options), indicies = _a[0], classTypes = _a[1], forbiddenBreakpoints = _a[2];
      var length = codePoints.length;
      var lastEnd = 0;
      var nextIndex = 0;
      return {
          next: function () {
              if (nextIndex >= length) {
                  return { done: true, value: null };
              }
              var lineBreak = BREAK_NOT_ALLOWED;
              while (nextIndex < length &&
                  (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) ===
                      BREAK_NOT_ALLOWED) { }
              if (lineBreak !== BREAK_NOT_ALLOWED || nextIndex === length) {
                  var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
                  lastEnd = nextIndex;
                  return { value: value, done: false };
              }
              return { done: true, value: null };
          },
      };
  };

  // https://www.w3.org/TR/css-syntax-3
  var TokenType;
  (function (TokenType) {
      TokenType[TokenType["STRING_TOKEN"] = 0] = "STRING_TOKEN";
      TokenType[TokenType["BAD_STRING_TOKEN"] = 1] = "BAD_STRING_TOKEN";
      TokenType[TokenType["LEFT_PARENTHESIS_TOKEN"] = 2] = "LEFT_PARENTHESIS_TOKEN";
      TokenType[TokenType["RIGHT_PARENTHESIS_TOKEN"] = 3] = "RIGHT_PARENTHESIS_TOKEN";
      TokenType[TokenType["COMMA_TOKEN"] = 4] = "COMMA_TOKEN";
      TokenType[TokenType["HASH_TOKEN"] = 5] = "HASH_TOKEN";
      TokenType[TokenType["DELIM_TOKEN"] = 6] = "DELIM_TOKEN";
      TokenType[TokenType["AT_KEYWORD_TOKEN"] = 7] = "AT_KEYWORD_TOKEN";
      TokenType[TokenType["PREFIX_MATCH_TOKEN"] = 8] = "PREFIX_MATCH_TOKEN";
      TokenType[TokenType["DASH_MATCH_TOKEN"] = 9] = "DASH_MATCH_TOKEN";
      TokenType[TokenType["INCLUDE_MATCH_TOKEN"] = 10] = "INCLUDE_MATCH_TOKEN";
      TokenType[TokenType["LEFT_CURLY_BRACKET_TOKEN"] = 11] = "LEFT_CURLY_BRACKET_TOKEN";
      TokenType[TokenType["RIGHT_CURLY_BRACKET_TOKEN"] = 12] = "RIGHT_CURLY_BRACKET_TOKEN";
      TokenType[TokenType["SUFFIX_MATCH_TOKEN"] = 13] = "SUFFIX_MATCH_TOKEN";
      TokenType[TokenType["SUBSTRING_MATCH_TOKEN"] = 14] = "SUBSTRING_MATCH_TOKEN";
      TokenType[TokenType["DIMENSION_TOKEN"] = 15] = "DIMENSION_TOKEN";
      TokenType[TokenType["PERCENTAGE_TOKEN"] = 16] = "PERCENTAGE_TOKEN";
      TokenType[TokenType["NUMBER_TOKEN"] = 17] = "NUMBER_TOKEN";
      TokenType[TokenType["FUNCTION"] = 18] = "FUNCTION";
      TokenType[TokenType["FUNCTION_TOKEN"] = 19] = "FUNCTION_TOKEN";
      TokenType[TokenType["IDENT_TOKEN"] = 20] = "IDENT_TOKEN";
      TokenType[TokenType["COLUMN_TOKEN"] = 21] = "COLUMN_TOKEN";
      TokenType[TokenType["URL_TOKEN"] = 22] = "URL_TOKEN";
      TokenType[TokenType["BAD_URL_TOKEN"] = 23] = "BAD_URL_TOKEN";
      TokenType[TokenType["CDC_TOKEN"] = 24] = "CDC_TOKEN";
      TokenType[TokenType["CDO_TOKEN"] = 25] = "CDO_TOKEN";
      TokenType[TokenType["COLON_TOKEN"] = 26] = "COLON_TOKEN";
      TokenType[TokenType["SEMICOLON_TOKEN"] = 27] = "SEMICOLON_TOKEN";
      TokenType[TokenType["LEFT_SQUARE_BRACKET_TOKEN"] = 28] = "LEFT_SQUARE_BRACKET_TOKEN";
      TokenType[TokenType["RIGHT_SQUARE_BRACKET_TOKEN"] = 29] = "RIGHT_SQUARE_BRACKET_TOKEN";
      TokenType[TokenType["UNICODE_RANGE_TOKEN"] = 30] = "UNICODE_RANGE_TOKEN";
      TokenType[TokenType["WHITESPACE_TOKEN"] = 31] = "WHITESPACE_TOKEN";
      TokenType[TokenType["EOF_TOKEN"] = 32] = "EOF_TOKEN";
  })(TokenType || (TokenType = {}));
  var FLAG_UNRESTRICTED = 1 << 0;
  var FLAG_ID = 1 << 1;
  var FLAG_INTEGER = 1 << 2;
  var FLAG_NUMBER = 1 << 3;
  var LINE_FEED = 0x000a;
  var SOLIDUS = 0x002f;
  var REVERSE_SOLIDUS = 0x005c;
  var CHARACTER_TABULATION = 0x0009;
  var SPACE$1 = 0x0020;
  var QUOTATION_MARK = 0x0022;
  var EQUALS_SIGN = 0x003d;
  var NUMBER_SIGN = 0x0023;
  var DOLLAR_SIGN = 0x0024;
  var PERCENTAGE_SIGN = 0x0025;
  var APOSTROPHE = 0x0027;
  var LEFT_PARENTHESIS = 0x0028;
  var RIGHT_PARENTHESIS = 0x0029;
  var LOW_LINE = 0x005f;
  var HYPHEN_MINUS = 0x002d;
  var EXCLAMATION_MARK = 0x0021;
  var LESS_THAN_SIGN = 0x003c;
  var GREATER_THAN_SIGN = 0x003e;
  var COMMERCIAL_AT = 0x0040;
  var LEFT_SQUARE_BRACKET = 0x005b;
  var RIGHT_SQUARE_BRACKET = 0x005d;
  var CIRCUMFLEX_ACCENT = 0x003d;
  var LEFT_CURLY_BRACKET = 0x007b;
  var QUESTION_MARK = 0x003f;
  var RIGHT_CURLY_BRACKET = 0x007d;
  var VERTICAL_LINE = 0x007c;
  var TILDE = 0x007e;
  var CONTROL = 0x0080;
  var REPLACEMENT_CHARACTER = 0xfffd;
  var ASTERISK = 0x002a;
  var PLUS_SIGN = 0x002b;
  var COMMA = 0x002c;
  var COLON = 0x003a;
  var SEMICOLON = 0x003b;
  var FULL_STOP = 0x002e;
  var NULL = 0x0000;
  var BACKSPACE = 0x0008;
  var LINE_TABULATION = 0x000b;
  var SHIFT_OUT = 0x000e;
  var INFORMATION_SEPARATOR_ONE = 0x001f;
  var DELETE = 0x007f;
  var EOF$1 = -1;
  var ZERO = 0x0030;
  var a = 0x0061;
  var e = 0x0065;
  var f = 0x0066;
  var u = 0x0075;
  var z = 0x007a;
  var A = 0x0041;
  var E = 0x0045;
  var F = 0x0046;
  var U = 0x0055;
  var Z = 0x005a;
  var isDigit = function (codePoint) { return codePoint >= ZERO && codePoint <= 0x0039; };
  var isSurrogateCodePoint = function (codePoint) { return codePoint >= 0xd800 && codePoint <= 0xdfff; };
  var isHex = function (codePoint) {
      return isDigit(codePoint) || (codePoint >= A && codePoint <= F) || (codePoint >= a && codePoint <= f);
  };
  var isLowerCaseLetter = function (codePoint) { return codePoint >= a && codePoint <= z; };
  var isUpperCaseLetter = function (codePoint) { return codePoint >= A && codePoint <= Z; };
  var isLetter = function (codePoint) { return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint); };
  var isNonASCIICodePoint = function (codePoint) { return codePoint >= CONTROL; };
  var isWhiteSpace = function (codePoint) {
      return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE$1;
  };
  var isNameStartCodePoint = function (codePoint) {
      return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
  };
  var isNameCodePoint = function (codePoint) {
      return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
  };
  var isNonPrintableCodePoint = function (codePoint) {
      return ((codePoint >= NULL && codePoint <= BACKSPACE) ||
          codePoint === LINE_TABULATION ||
          (codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE) ||
          codePoint === DELETE);
  };
  var isValidEscape = function (c1, c2) {
      if (c1 !== REVERSE_SOLIDUS) {
          return false;
      }
      return c2 !== LINE_FEED;
  };
  var isIdentifierStart = function (c1, c2, c3) {
      if (c1 === HYPHEN_MINUS) {
          return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
      }
      else if (isNameStartCodePoint(c1)) {
          return true;
      }
      else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
          return true;
      }
      return false;
  };
  var isNumberStart = function (c1, c2, c3) {
      if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
          if (isDigit(c2)) {
              return true;
          }
          return c2 === FULL_STOP && isDigit(c3);
      }
      if (c1 === FULL_STOP) {
          return isDigit(c2);
      }
      return isDigit(c1);
  };
  var stringToNumber = function (codePoints) {
      var c = 0;
      var sign = 1;
      if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
          if (codePoints[c] === HYPHEN_MINUS) {
              sign = -1;
          }
          c++;
      }
      var integers = [];
      while (isDigit(codePoints[c])) {
          integers.push(codePoints[c++]);
      }
      var int = integers.length ? parseInt(fromCodePoint.apply(void 0, integers), 10) : 0;
      if (codePoints[c] === FULL_STOP) {
          c++;
      }
      var fraction = [];
      while (isDigit(codePoints[c])) {
          fraction.push(codePoints[c++]);
      }
      var fracd = fraction.length;
      var frac = fracd ? parseInt(fromCodePoint.apply(void 0, fraction), 10) : 0;
      if (codePoints[c] === E || codePoints[c] === e) {
          c++;
      }
      var expsign = 1;
      if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
          if (codePoints[c] === HYPHEN_MINUS) {
              expsign = -1;
          }
          c++;
      }
      var exponent = [];
      while (isDigit(codePoints[c])) {
          exponent.push(codePoints[c++]);
      }
      var exp = exponent.length ? parseInt(fromCodePoint.apply(void 0, exponent), 10) : 0;
      return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
  };
  var LEFT_PARENTHESIS_TOKEN = {
      type: TokenType.LEFT_PARENTHESIS_TOKEN
  };
  var RIGHT_PARENTHESIS_TOKEN = {
      type: TokenType.RIGHT_PARENTHESIS_TOKEN
  };
  var COMMA_TOKEN = { type: TokenType.COMMA_TOKEN };
  var SUFFIX_MATCH_TOKEN = { type: TokenType.SUFFIX_MATCH_TOKEN };
  var PREFIX_MATCH_TOKEN = { type: TokenType.PREFIX_MATCH_TOKEN };
  var COLUMN_TOKEN = { type: TokenType.COLUMN_TOKEN };
  var DASH_MATCH_TOKEN = { type: TokenType.DASH_MATCH_TOKEN };
  var INCLUDE_MATCH_TOKEN = { type: TokenType.INCLUDE_MATCH_TOKEN };
  var LEFT_CURLY_BRACKET_TOKEN = {
      type: TokenType.LEFT_CURLY_BRACKET_TOKEN
  };
  var RIGHT_CURLY_BRACKET_TOKEN = {
      type: TokenType.RIGHT_CURLY_BRACKET_TOKEN
  };
  var SUBSTRING_MATCH_TOKEN = { type: TokenType.SUBSTRING_MATCH_TOKEN };
  var BAD_URL_TOKEN = { type: TokenType.BAD_URL_TOKEN };
  var BAD_STRING_TOKEN = { type: TokenType.BAD_STRING_TOKEN };
  var CDO_TOKEN = { type: TokenType.CDO_TOKEN };
  var CDC_TOKEN = { type: TokenType.CDC_TOKEN };
  var COLON_TOKEN = { type: TokenType.COLON_TOKEN };
  var SEMICOLON_TOKEN = { type: TokenType.SEMICOLON_TOKEN };
  var LEFT_SQUARE_BRACKET_TOKEN = {
      type: TokenType.LEFT_SQUARE_BRACKET_TOKEN
  };
  var RIGHT_SQUARE_BRACKET_TOKEN = {
      type: TokenType.RIGHT_SQUARE_BRACKET_TOKEN
  };
  var WHITESPACE_TOKEN = { type: TokenType.WHITESPACE_TOKEN };
  var EOF_TOKEN = { type: TokenType.EOF_TOKEN };
  var Tokenizer = /** @class */ (function () {
      function Tokenizer() {
          this._value = [];
      }
      Tokenizer.prototype.write = function (chunk) {
          this._value = this._value.concat(toCodePoints(chunk));
      };
      Tokenizer.prototype.read = function () {
          var tokens = [];
          var token = this.consumeToken();
          while (token !== EOF_TOKEN) {
              tokens.push(token);
              token = this.consumeToken();
          }
          return tokens;
      };
      Tokenizer.prototype.consumeToken = function () {
          var codePoint = this.consumeCodePoint();
          switch (codePoint) {
              case QUOTATION_MARK:
                  return this.consumeStringToken(QUOTATION_MARK);
              case NUMBER_SIGN:
                  var c1 = this.peekCodePoint(0);
                  var c2 = this.peekCodePoint(1);
                  var c3 = this.peekCodePoint(2);
                  if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
                      var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
                      var value = this.consumeName();
                      return { type: TokenType.HASH_TOKEN, value: value, flags: flags };
                  }
                  break;
              case DOLLAR_SIGN:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return SUFFIX_MATCH_TOKEN;
                  }
                  break;
              case APOSTROPHE:
                  return this.consumeStringToken(APOSTROPHE);
              case LEFT_PARENTHESIS:
                  return LEFT_PARENTHESIS_TOKEN;
              case RIGHT_PARENTHESIS:
                  return RIGHT_PARENTHESIS_TOKEN;
              case ASTERISK:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return SUBSTRING_MATCH_TOKEN;
                  }
                  break;
              case PLUS_SIGN:
                  if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeNumericToken();
                  }
                  break;
              case COMMA:
                  return COMMA_TOKEN;
              case HYPHEN_MINUS:
                  var e1 = codePoint;
                  var e2 = this.peekCodePoint(0);
                  var e3 = this.peekCodePoint(1);
                  if (isNumberStart(e1, e2, e3)) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeNumericToken();
                  }
                  if (isIdentifierStart(e1, e2, e3)) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeIdentLikeToken();
                  }
                  if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
                      this.consumeCodePoint();
                      this.consumeCodePoint();
                      return CDC_TOKEN;
                  }
                  break;
              case FULL_STOP:
                  if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeNumericToken();
                  }
                  break;
              case SOLIDUS:
                  if (this.peekCodePoint(0) === ASTERISK) {
                      this.consumeCodePoint();
                      while (true) {
                          var c = this.consumeCodePoint();
                          if (c === ASTERISK) {
                              c = this.consumeCodePoint();
                              if (c === SOLIDUS) {
                                  return this.consumeToken();
                              }
                          }
                          if (c === EOF$1) {
                              return this.consumeToken();
                          }
                      }
                  }
                  break;
              case COLON:
                  return COLON_TOKEN;
              case SEMICOLON:
                  return SEMICOLON_TOKEN;
              case LESS_THAN_SIGN:
                  if (this.peekCodePoint(0) === EXCLAMATION_MARK &&
                      this.peekCodePoint(1) === HYPHEN_MINUS &&
                      this.peekCodePoint(2) === HYPHEN_MINUS) {
                      this.consumeCodePoint();
                      this.consumeCodePoint();
                      return CDO_TOKEN;
                  }
                  break;
              case COMMERCIAL_AT:
                  var a1 = this.peekCodePoint(0);
                  var a2 = this.peekCodePoint(1);
                  var a3 = this.peekCodePoint(2);
                  if (isIdentifierStart(a1, a2, a3)) {
                      var value = this.consumeName();
                      return { type: TokenType.AT_KEYWORD_TOKEN, value: value };
                  }
                  break;
              case LEFT_SQUARE_BRACKET:
                  return LEFT_SQUARE_BRACKET_TOKEN;
              case REVERSE_SOLIDUS:
                  if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeIdentLikeToken();
                  }
                  break;
              case RIGHT_SQUARE_BRACKET:
                  return RIGHT_SQUARE_BRACKET_TOKEN;
              case CIRCUMFLEX_ACCENT:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return PREFIX_MATCH_TOKEN;
                  }
                  break;
              case LEFT_CURLY_BRACKET:
                  return LEFT_CURLY_BRACKET_TOKEN;
              case RIGHT_CURLY_BRACKET:
                  return RIGHT_CURLY_BRACKET_TOKEN;
              case u:
              case U:
                  var u1 = this.peekCodePoint(0);
                  var u2 = this.peekCodePoint(1);
                  if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
                      this.consumeCodePoint();
                      this.consumeUnicodeRangeToken();
                  }
                  this.reconsumeCodePoint(codePoint);
                  return this.consumeIdentLikeToken();
              case VERTICAL_LINE:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return DASH_MATCH_TOKEN;
                  }
                  if (this.peekCodePoint(0) === VERTICAL_LINE) {
                      this.consumeCodePoint();
                      return COLUMN_TOKEN;
                  }
                  break;
              case TILDE:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return INCLUDE_MATCH_TOKEN;
                  }
                  break;
              case EOF$1:
                  return EOF_TOKEN;
          }
          if (isWhiteSpace(codePoint)) {
              this.consumeWhiteSpace();
              return WHITESPACE_TOKEN;
          }
          if (isDigit(codePoint)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
          }
          if (isNameStartCodePoint(codePoint)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeIdentLikeToken();
          }
          return { type: TokenType.DELIM_TOKEN, value: fromCodePoint(codePoint) };
      };
      Tokenizer.prototype.consumeCodePoint = function () {
          var value = this._value.shift();
          return typeof value === 'undefined' ? -1 : value;
      };
      Tokenizer.prototype.reconsumeCodePoint = function (codePoint) {
          this._value.unshift(codePoint);
      };
      Tokenizer.prototype.peekCodePoint = function (delta) {
          if (delta >= this._value.length) {
              return -1;
          }
          return this._value[delta];
      };
      Tokenizer.prototype.consumeUnicodeRangeToken = function () {
          var digits = [];
          var codePoint = this.consumeCodePoint();
          while (isHex(codePoint) && digits.length < 6) {
              digits.push(codePoint);
              codePoint = this.consumeCodePoint();
          }
          var questionMarks = false;
          while (codePoint === QUESTION_MARK && digits.length < 6) {
              digits.push(codePoint);
              codePoint = this.consumeCodePoint();
              questionMarks = true;
          }
          if (questionMarks) {
              var start_1 = parseInt(fromCodePoint.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? ZERO : digit); })), 16);
              var end = parseInt(fromCodePoint.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? F : digit); })), 16);
              return { type: TokenType.UNICODE_RANGE_TOKEN, start: start_1, end: end };
          }
          var start = parseInt(fromCodePoint.apply(void 0, digits), 16);
          if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
              this.consumeCodePoint();
              codePoint = this.consumeCodePoint();
              var endDigits = [];
              while (isHex(codePoint) && endDigits.length < 6) {
                  endDigits.push(codePoint);
                  codePoint = this.consumeCodePoint();
              }
              var end = parseInt(fromCodePoint.apply(void 0, endDigits), 16);
              return { type: TokenType.UNICODE_RANGE_TOKEN, start: start, end: end };
          }
          else {
              return { type: TokenType.UNICODE_RANGE_TOKEN, start: start, end: start };
          }
      };
      Tokenizer.prototype.consumeIdentLikeToken = function () {
          var value = this.consumeName();
          if (value.toLowerCase() === 'url' && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
              this.consumeCodePoint();
              return this.consumeUrlToken();
          }
          else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
              this.consumeCodePoint();
              return { type: TokenType.FUNCTION_TOKEN, value: value };
          }
          return { type: TokenType.IDENT_TOKEN, value: value };
      };
      Tokenizer.prototype.consumeUrlToken = function () {
          var value = [];
          this.consumeWhiteSpace();
          if (this.peekCodePoint(0) === EOF$1) {
              return { type: TokenType.URL_TOKEN, value: '' };
          }
          var next = this.peekCodePoint(0);
          if (next === APOSTROPHE || next === QUOTATION_MARK) {
              var stringToken = this.consumeStringToken(this.consumeCodePoint());
              if (stringToken.type === TokenType.STRING_TOKEN) {
                  this.consumeWhiteSpace();
                  if (this.peekCodePoint(0) === EOF$1 || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                      this.consumeCodePoint();
                      return { type: TokenType.URL_TOKEN, value: stringToken.value };
                  }
              }
              this.consumeBadUrlRemnants();
              return BAD_URL_TOKEN;
          }
          while (true) {
              var codePoint = this.consumeCodePoint();
              if (codePoint === EOF$1 || codePoint === RIGHT_PARENTHESIS) {
                  return { type: TokenType.URL_TOKEN, value: fromCodePoint.apply(void 0, value) };
              }
              else if (isWhiteSpace(codePoint)) {
                  this.consumeWhiteSpace();
                  if (this.peekCodePoint(0) === EOF$1 || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                      this.consumeCodePoint();
                      return { type: TokenType.URL_TOKEN, value: fromCodePoint.apply(void 0, value) };
                  }
                  this.consumeBadUrlRemnants();
                  return BAD_URL_TOKEN;
              }
              else if (codePoint === QUOTATION_MARK ||
                  codePoint === APOSTROPHE ||
                  codePoint === LEFT_PARENTHESIS ||
                  isNonPrintableCodePoint(codePoint)) {
                  this.consumeBadUrlRemnants();
                  return BAD_URL_TOKEN;
              }
              else if (codePoint === REVERSE_SOLIDUS) {
                  if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                      value.push(this.consumeEscapedCodePoint());
                  }
                  else {
                      this.consumeBadUrlRemnants();
                      return BAD_URL_TOKEN;
                  }
              }
              else {
                  value.push(codePoint);
              }
          }
      };
      Tokenizer.prototype.consumeWhiteSpace = function () {
          while (isWhiteSpace(this.peekCodePoint(0))) {
              this.consumeCodePoint();
          }
      };
      Tokenizer.prototype.consumeBadUrlRemnants = function () {
          while (true) {
              var codePoint = this.consumeCodePoint();
              if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF$1) {
                  return;
              }
              if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                  this.consumeEscapedCodePoint();
              }
          }
      };
      Tokenizer.prototype.consumeStringSlice = function (count) {
          var SLICE_STACK_SIZE = 60000;
          var value = '';
          while (count > 0) {
              var amount = Math.min(SLICE_STACK_SIZE, count);
              value += fromCodePoint.apply(void 0, this._value.splice(0, amount));
              count -= amount;
          }
          this._value.shift();
          return value;
      };
      Tokenizer.prototype.consumeStringToken = function (endingCodePoint) {
          var value = '';
          var i = 0;
          do {
              var codePoint = this._value[i];
              if (codePoint === EOF$1 || codePoint === undefined || codePoint === endingCodePoint) {
                  value += this.consumeStringSlice(i);
                  return { type: TokenType.STRING_TOKEN, value: value };
              }
              if (codePoint === LINE_FEED) {
                  this._value.splice(0, i);
                  return BAD_STRING_TOKEN;
              }
              if (codePoint === REVERSE_SOLIDUS) {
                  var next = this._value[i + 1];
                  if (next !== EOF$1 && next !== undefined) {
                      if (next === LINE_FEED) {
                          value += this.consumeStringSlice(i);
                          i = -1;
                          this._value.shift();
                      }
                      else if (isValidEscape(codePoint, next)) {
                          value += this.consumeStringSlice(i);
                          value += fromCodePoint(this.consumeEscapedCodePoint());
                          i = -1;
                      }
                  }
              }
              i++;
          } while (true);
      };
      Tokenizer.prototype.consumeNumber = function () {
          var repr = [];
          var type = FLAG_INTEGER;
          var c1 = this.peekCodePoint(0);
          if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
              repr.push(this.consumeCodePoint());
          }
          while (isDigit(this.peekCodePoint(0))) {
              repr.push(this.consumeCodePoint());
          }
          c1 = this.peekCodePoint(0);
          var c2 = this.peekCodePoint(1);
          if (c1 === FULL_STOP && isDigit(c2)) {
              repr.push(this.consumeCodePoint(), this.consumeCodePoint());
              type = FLAG_NUMBER;
              while (isDigit(this.peekCodePoint(0))) {
                  repr.push(this.consumeCodePoint());
              }
          }
          c1 = this.peekCodePoint(0);
          c2 = this.peekCodePoint(1);
          var c3 = this.peekCodePoint(2);
          if ((c1 === E || c1 === e) && (((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3)) || isDigit(c2))) {
              repr.push(this.consumeCodePoint(), this.consumeCodePoint());
              type = FLAG_NUMBER;
              while (isDigit(this.peekCodePoint(0))) {
                  repr.push(this.consumeCodePoint());
              }
          }
          return [stringToNumber(repr), type];
      };
      Tokenizer.prototype.consumeNumericToken = function () {
          var _a = this.consumeNumber(), number = _a[0], flags = _a[1];
          var c1 = this.peekCodePoint(0);
          var c2 = this.peekCodePoint(1);
          var c3 = this.peekCodePoint(2);
          if (isIdentifierStart(c1, c2, c3)) {
              var unit = this.consumeName();
              return { type: TokenType.DIMENSION_TOKEN, number: number, flags: flags, unit: unit };
          }
          if (c1 === PERCENTAGE_SIGN) {
              this.consumeCodePoint();
              return { type: TokenType.PERCENTAGE_TOKEN, number: number, flags: flags };
          }
          return { type: TokenType.NUMBER_TOKEN, number: number, flags: flags };
      };
      Tokenizer.prototype.consumeEscapedCodePoint = function () {
          var codePoint = this.consumeCodePoint();
          if (isHex(codePoint)) {
              var hex = fromCodePoint(codePoint);
              while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
                  hex += fromCodePoint(this.consumeCodePoint());
              }
              if (isWhiteSpace(this.peekCodePoint(0))) {
                  this.consumeCodePoint();
              }
              var hexCodePoint = parseInt(hex, 16);
              if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 0x10ffff) {
                  return REPLACEMENT_CHARACTER;
              }
              return hexCodePoint;
          }
          if (codePoint === EOF$1) {
              return REPLACEMENT_CHARACTER;
          }
          return codePoint;
      };
      Tokenizer.prototype.consumeName = function () {
          var result = '';
          while (true) {
              var codePoint = this.consumeCodePoint();
              if (isNameCodePoint(codePoint)) {
                  result += fromCodePoint(codePoint);
              }
              else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                  result += fromCodePoint(this.consumeEscapedCodePoint());
              }
              else {
                  this.reconsumeCodePoint(codePoint);
                  return result;
              }
          }
      };
      return Tokenizer;
  }());

  var Parser = /** @class */ (function () {
      function Parser(tokens) {
          this._tokens = tokens;
      }
      Parser.create = function (value) {
          var tokenizer = new Tokenizer();
          tokenizer.write(value);
          return new Parser(tokenizer.read());
      };
      Parser.parseValue = function (value) {
          return Parser.create(value).parseComponentValue();
      };
      Parser.parseValues = function (value) {
          return Parser.create(value).parseComponentValues();
      };
      Parser.prototype.parseComponentValue = function () {
          var token = this.consumeToken();
          while (token.type === TokenType.WHITESPACE_TOKEN) {
              token = this.consumeToken();
          }
          if (token.type === TokenType.EOF_TOKEN) {
              throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
          }
          this.reconsumeToken(token);
          var value = this.consumeComponentValue();
          do {
              token = this.consumeToken();
          } while (token.type === TokenType.WHITESPACE_TOKEN);
          if (token.type === TokenType.EOF_TOKEN) {
              return value;
          }
          throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
      };
      Parser.prototype.parseComponentValues = function () {
          var values = [];
          while (true) {
              var value = this.consumeComponentValue();
              if (value.type === TokenType.EOF_TOKEN) {
                  return values;
              }
              values.push(value);
              values.push();
          }
      };
      Parser.prototype.consumeComponentValue = function () {
          var token = this.consumeToken();
          switch (token.type) {
              case TokenType.LEFT_CURLY_BRACKET_TOKEN:
              case TokenType.LEFT_SQUARE_BRACKET_TOKEN:
              case TokenType.LEFT_PARENTHESIS_TOKEN:
                  return this.consumeSimpleBlock(token.type);
              case TokenType.FUNCTION_TOKEN:
                  return this.consumeFunction(token);
          }
          return token;
      };
      Parser.prototype.consumeSimpleBlock = function (type) {
          var block = { type: type, values: [] };
          var token = this.consumeToken();
          while (true) {
              if (token.type === TokenType.EOF_TOKEN || isEndingTokenFor(token, type)) {
                  return block;
              }
              this.reconsumeToken(token);
              block.values.push(this.consumeComponentValue());
              token = this.consumeToken();
          }
      };
      Parser.prototype.consumeFunction = function (functionToken) {
          var cssFunction = {
              name: functionToken.value,
              values: [],
              type: TokenType.FUNCTION
          };
          while (true) {
              var token = this.consumeToken();
              if (token.type === TokenType.EOF_TOKEN || token.type === TokenType.RIGHT_PARENTHESIS_TOKEN) {
                  return cssFunction;
              }
              this.reconsumeToken(token);
              cssFunction.values.push(this.consumeComponentValue());
          }
      };
      Parser.prototype.consumeToken = function () {
          var token = this._tokens.shift();
          return typeof token === 'undefined' ? EOF_TOKEN : token;
      };
      Parser.prototype.reconsumeToken = function (token) {
          this._tokens.unshift(token);
      };
      return Parser;
  }());
  var isDimensionToken = function (token) { return token.type === TokenType.DIMENSION_TOKEN; };
  var isNumberToken = function (token) { return token.type === TokenType.NUMBER_TOKEN; };
  var isIdentToken = function (token) { return token.type === TokenType.IDENT_TOKEN; };
  var isStringToken = function (token) { return token.type === TokenType.STRING_TOKEN; };
  var isIdentWithValue = function (token, value) {
      return isIdentToken(token) && token.value === value;
  };
  var nonWhiteSpace = function (token) { return token.type !== TokenType.WHITESPACE_TOKEN; };
  var nonFunctionArgSeparator = function (token) {
      return token.type !== TokenType.WHITESPACE_TOKEN && token.type !== TokenType.COMMA_TOKEN;
  };
  var parseFunctionArgs = function (tokens) {
      var args = [];
      var arg = [];
      tokens.forEach(function (token) {
          if (token.type === TokenType.COMMA_TOKEN) {
              if (arg.length === 0) {
                  throw new Error("Error parsing function args, zero tokens for arg");
              }
              args.push(arg);
              arg = [];
              return;
          }
          if (token.type !== TokenType.WHITESPACE_TOKEN) {
              arg.push(token);
          }
      });
      if (arg.length) {
          args.push(arg);
      }
      return args;
  };
  var isEndingTokenFor = function (token, type) {
      if (type === TokenType.LEFT_CURLY_BRACKET_TOKEN && token.type === TokenType.RIGHT_CURLY_BRACKET_TOKEN) {
          return true;
      }
      if (type === TokenType.LEFT_SQUARE_BRACKET_TOKEN && token.type === TokenType.RIGHT_SQUARE_BRACKET_TOKEN) {
          return true;
      }
      return type === TokenType.LEFT_PARENTHESIS_TOKEN && token.type === TokenType.RIGHT_PARENTHESIS_TOKEN;
  };

  var isLength$1 = function (token) {
      return token.type === TokenType.NUMBER_TOKEN || token.type === TokenType.DIMENSION_TOKEN;
  };

  var isLengthPercentage = function (token) {
      return token.type === TokenType.PERCENTAGE_TOKEN || isLength$1(token);
  };
  var parseLengthPercentageTuple = function (tokens) {
      return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
  };
  var ZERO_LENGTH = {
      type: TokenType.NUMBER_TOKEN,
      number: 0,
      flags: FLAG_INTEGER
  };
  var FIFTY_PERCENT = {
      type: TokenType.PERCENTAGE_TOKEN,
      number: 50,
      flags: FLAG_INTEGER
  };
  var HUNDRED_PERCENT = {
      type: TokenType.PERCENTAGE_TOKEN,
      number: 100,
      flags: FLAG_INTEGER
  };
  var getAbsoluteValueForTuple = function (tuple, width, height) {
      var x = tuple[0], y = tuple[1];
      return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== 'undefined' ? y : x, height)];
  };
  var getAbsoluteValue = function (token, parent) {
      if (token.type === TokenType.PERCENTAGE_TOKEN) {
          return (token.number / 100) * parent;
      }
      if (isDimensionToken(token)) {
          switch (token.unit) {
              case 'rem':
              case 'em':
                  return 16 * token.number; // TODO use correct font-size
              case 'px':
              default:
                  return token.number;
          }
      }
      return token.number;
  };

  var DEG = 'deg';
  var GRAD = 'grad';
  var RAD = 'rad';
  var TURN = 'turn';
  var angle = {
      name: 'angle',
      parse: function (value) {
          if (value.type === TokenType.DIMENSION_TOKEN) {
              switch (value.unit) {
                  case DEG:
                      return (Math.PI * value.number) / 180;
                  case GRAD:
                      return (Math.PI / 200) * value.number;
                  case RAD:
                      return value.number;
                  case TURN:
                      return Math.PI * 2 * value.number;
              }
          }
          throw new Error("Unsupported angle type");
      }
  };
  var isAngle = function (value) {
      if (value.type === TokenType.DIMENSION_TOKEN) {
          if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
              return true;
          }
      }
      return false;
  };
  var parseNamedSide = function (tokens) {
      var sideOrCorner = tokens
          .filter(isIdentToken)
          .map(function (ident) { return ident.value; })
          .join(' ');
      switch (sideOrCorner) {
          case 'to bottom right':
          case 'to right bottom':
          case 'left top':
          case 'top left':
              return [ZERO_LENGTH, ZERO_LENGTH];
          case 'to top':
          case 'bottom':
              return deg(0);
          case 'to bottom left':
          case 'to left bottom':
          case 'right top':
          case 'top right':
              return [ZERO_LENGTH, HUNDRED_PERCENT];
          case 'to right':
          case 'left':
              return deg(90);
          case 'to top left':
          case 'to left top':
          case 'right bottom':
          case 'bottom right':
              return [HUNDRED_PERCENT, HUNDRED_PERCENT];
          case 'to bottom':
          case 'top':
              return deg(180);
          case 'to top right':
          case 'to right top':
          case 'left bottom':
          case 'bottom left':
              return [HUNDRED_PERCENT, ZERO_LENGTH];
          case 'to left':
          case 'right':
              return deg(270);
      }
      return 0;
  };
  var deg = function (deg) { return (Math.PI * deg) / 180; };

  var color$1 = {
      name: 'color',
      parse: function (value) {
          if (value.type === TokenType.FUNCTION) {
              var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
              if (typeof colorFunction === 'undefined') {
                  throw new Error("Attempting to parse an unsupported color function \"" + value.name + "\"");
              }
              return colorFunction(value.values);
          }
          if (value.type === TokenType.HASH_TOKEN) {
              if (value.value.length === 3) {
                  var r = value.value.substring(0, 1);
                  var g = value.value.substring(1, 2);
                  var b = value.value.substring(2, 3);
                  return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
              }
              if (value.value.length === 4) {
                  var r = value.value.substring(0, 1);
                  var g = value.value.substring(1, 2);
                  var b = value.value.substring(2, 3);
                  var a = value.value.substring(3, 4);
                  return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a + a, 16) / 255);
              }
              if (value.value.length === 6) {
                  var r = value.value.substring(0, 2);
                  var g = value.value.substring(2, 4);
                  var b = value.value.substring(4, 6);
                  return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
              }
              if (value.value.length === 8) {
                  var r = value.value.substring(0, 2);
                  var g = value.value.substring(2, 4);
                  var b = value.value.substring(4, 6);
                  var a = value.value.substring(6, 8);
                  return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16) / 255);
              }
          }
          if (value.type === TokenType.IDENT_TOKEN) {
              var namedColor = COLORS[value.value.toUpperCase()];
              if (typeof namedColor !== 'undefined') {
                  return namedColor;
              }
          }
          return COLORS.TRANSPARENT;
      }
  };
  var isTransparent = function (color) { return (0xff & color) === 0; };
  var asString = function (color) {
      var alpha = 0xff & color;
      var blue = 0xff & (color >> 8);
      var green = 0xff & (color >> 16);
      var red = 0xff & (color >> 24);
      return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
  };
  var pack = function (r, g, b, a) {
      return ((r << 24) | (g << 16) | (b << 8) | (Math.round(a * 255) << 0)) >>> 0;
  };
  var getTokenColorValue = function (token, i) {
      if (token.type === TokenType.NUMBER_TOKEN) {
          return token.number;
      }
      if (token.type === TokenType.PERCENTAGE_TOKEN) {
          var max = i === 3 ? 1 : 255;
          return i === 3 ? (token.number / 100) * max : Math.round((token.number / 100) * max);
      }
      return 0;
  };
  var rgb$1 = function (args) {
      var tokens = args.filter(nonFunctionArgSeparator);
      if (tokens.length === 3) {
          var _a = tokens.map(getTokenColorValue), r = _a[0], g = _a[1], b = _a[2];
          return pack(r, g, b, 1);
      }
      if (tokens.length === 4) {
          var _b = tokens.map(getTokenColorValue), r = _b[0], g = _b[1], b = _b[2], a = _b[3];
          return pack(r, g, b, a);
      }
      return 0;
  };
  function hue2rgb(t1, t2, hue) {
      if (hue < 0) {
          hue += 1;
      }
      if (hue >= 1) {
          hue -= 1;
      }
      if (hue < 1 / 6) {
          return (t2 - t1) * hue * 6 + t1;
      }
      else if (hue < 1 / 2) {
          return t2;
      }
      else if (hue < 2 / 3) {
          return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
      }
      else {
          return t1;
      }
  }
  var hsl$1 = function (args) {
      var tokens = args.filter(nonFunctionArgSeparator);
      var hue = tokens[0], saturation = tokens[1], lightness = tokens[2], alpha = tokens[3];
      var h = (hue.type === TokenType.NUMBER_TOKEN ? deg(hue.number) : angle.parse(hue)) / (Math.PI * 2);
      var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
      var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
      var a = typeof alpha !== 'undefined' && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
      if (s === 0) {
          return pack(l * 255, l * 255, l * 255, 1);
      }
      var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
      var t1 = l * 2 - t2;
      var r = hue2rgb(t1, t2, h + 1 / 3);
      var g = hue2rgb(t1, t2, h);
      var b = hue2rgb(t1, t2, h - 1 / 3);
      return pack(r * 255, g * 255, b * 255, a);
  };
  var SUPPORTED_COLOR_FUNCTIONS = {
      hsl: hsl$1,
      hsla: hsl$1,
      rgb: rgb$1,
      rgba: rgb$1
  };
  var COLORS = {
      ALICEBLUE: 0xf0f8ffff,
      ANTIQUEWHITE: 0xfaebd7ff,
      AQUA: 0x00ffffff,
      AQUAMARINE: 0x7fffd4ff,
      AZURE: 0xf0ffffff,
      BEIGE: 0xf5f5dcff,
      BISQUE: 0xffe4c4ff,
      BLACK: 0x000000ff,
      BLANCHEDALMOND: 0xffebcdff,
      BLUE: 0x0000ffff,
      BLUEVIOLET: 0x8a2be2ff,
      BROWN: 0xa52a2aff,
      BURLYWOOD: 0xdeb887ff,
      CADETBLUE: 0x5f9ea0ff,
      CHARTREUSE: 0x7fff00ff,
      CHOCOLATE: 0xd2691eff,
      CORAL: 0xff7f50ff,
      CORNFLOWERBLUE: 0x6495edff,
      CORNSILK: 0xfff8dcff,
      CRIMSON: 0xdc143cff,
      CYAN: 0x00ffffff,
      DARKBLUE: 0x00008bff,
      DARKCYAN: 0x008b8bff,
      DARKGOLDENROD: 0xb886bbff,
      DARKGRAY: 0xa9a9a9ff,
      DARKGREEN: 0x006400ff,
      DARKGREY: 0xa9a9a9ff,
      DARKKHAKI: 0xbdb76bff,
      DARKMAGENTA: 0x8b008bff,
      DARKOLIVEGREEN: 0x556b2fff,
      DARKORANGE: 0xff8c00ff,
      DARKORCHID: 0x9932ccff,
      DARKRED: 0x8b0000ff,
      DARKSALMON: 0xe9967aff,
      DARKSEAGREEN: 0x8fbc8fff,
      DARKSLATEBLUE: 0x483d8bff,
      DARKSLATEGRAY: 0x2f4f4fff,
      DARKSLATEGREY: 0x2f4f4fff,
      DARKTURQUOISE: 0x00ced1ff,
      DARKVIOLET: 0x9400d3ff,
      DEEPPINK: 0xff1493ff,
      DEEPSKYBLUE: 0x00bfffff,
      DIMGRAY: 0x696969ff,
      DIMGREY: 0x696969ff,
      DODGERBLUE: 0x1e90ffff,
      FIREBRICK: 0xb22222ff,
      FLORALWHITE: 0xfffaf0ff,
      FORESTGREEN: 0x228b22ff,
      FUCHSIA: 0xff00ffff,
      GAINSBORO: 0xdcdcdcff,
      GHOSTWHITE: 0xf8f8ffff,
      GOLD: 0xffd700ff,
      GOLDENROD: 0xdaa520ff,
      GRAY: 0x808080ff,
      GREEN: 0x008000ff,
      GREENYELLOW: 0xadff2fff,
      GREY: 0x808080ff,
      HONEYDEW: 0xf0fff0ff,
      HOTPINK: 0xff69b4ff,
      INDIANRED: 0xcd5c5cff,
      INDIGO: 0x4b0082ff,
      IVORY: 0xfffff0ff,
      KHAKI: 0xf0e68cff,
      LAVENDER: 0xe6e6faff,
      LAVENDERBLUSH: 0xfff0f5ff,
      LAWNGREEN: 0x7cfc00ff,
      LEMONCHIFFON: 0xfffacdff,
      LIGHTBLUE: 0xadd8e6ff,
      LIGHTCORAL: 0xf08080ff,
      LIGHTCYAN: 0xe0ffffff,
      LIGHTGOLDENRODYELLOW: 0xfafad2ff,
      LIGHTGRAY: 0xd3d3d3ff,
      LIGHTGREEN: 0x90ee90ff,
      LIGHTGREY: 0xd3d3d3ff,
      LIGHTPINK: 0xffb6c1ff,
      LIGHTSALMON: 0xffa07aff,
      LIGHTSEAGREEN: 0x20b2aaff,
      LIGHTSKYBLUE: 0x87cefaff,
      LIGHTSLATEGRAY: 0x778899ff,
      LIGHTSLATEGREY: 0x778899ff,
      LIGHTSTEELBLUE: 0xb0c4deff,
      LIGHTYELLOW: 0xffffe0ff,
      LIME: 0x00ff00ff,
      LIMEGREEN: 0x32cd32ff,
      LINEN: 0xfaf0e6ff,
      MAGENTA: 0xff00ffff,
      MAROON: 0x800000ff,
      MEDIUMAQUAMARINE: 0x66cdaaff,
      MEDIUMBLUE: 0x0000cdff,
      MEDIUMORCHID: 0xba55d3ff,
      MEDIUMPURPLE: 0x9370dbff,
      MEDIUMSEAGREEN: 0x3cb371ff,
      MEDIUMSLATEBLUE: 0x7b68eeff,
      MEDIUMSPRINGGREEN: 0x00fa9aff,
      MEDIUMTURQUOISE: 0x48d1ccff,
      MEDIUMVIOLETRED: 0xc71585ff,
      MIDNIGHTBLUE: 0x191970ff,
      MINTCREAM: 0xf5fffaff,
      MISTYROSE: 0xffe4e1ff,
      MOCCASIN: 0xffe4b5ff,
      NAVAJOWHITE: 0xffdeadff,
      NAVY: 0x000080ff,
      OLDLACE: 0xfdf5e6ff,
      OLIVE: 0x808000ff,
      OLIVEDRAB: 0x6b8e23ff,
      ORANGE: 0xffa500ff,
      ORANGERED: 0xff4500ff,
      ORCHID: 0xda70d6ff,
      PALEGOLDENROD: 0xeee8aaff,
      PALEGREEN: 0x98fb98ff,
      PALETURQUOISE: 0xafeeeeff,
      PALEVIOLETRED: 0xdb7093ff,
      PAPAYAWHIP: 0xffefd5ff,
      PEACHPUFF: 0xffdab9ff,
      PERU: 0xcd853fff,
      PINK: 0xffc0cbff,
      PLUM: 0xdda0ddff,
      POWDERBLUE: 0xb0e0e6ff,
      PURPLE: 0x800080ff,
      REBECCAPURPLE: 0x663399ff,
      RED: 0xff0000ff,
      ROSYBROWN: 0xbc8f8fff,
      ROYALBLUE: 0x4169e1ff,
      SADDLEBROWN: 0x8b4513ff,
      SALMON: 0xfa8072ff,
      SANDYBROWN: 0xf4a460ff,
      SEAGREEN: 0x2e8b57ff,
      SEASHELL: 0xfff5eeff,
      SIENNA: 0xa0522dff,
      SILVER: 0xc0c0c0ff,
      SKYBLUE: 0x87ceebff,
      SLATEBLUE: 0x6a5acdff,
      SLATEGRAY: 0x708090ff,
      SLATEGREY: 0x708090ff,
      SNOW: 0xfffafaff,
      SPRINGGREEN: 0x00ff7fff,
      STEELBLUE: 0x4682b4ff,
      TAN: 0xd2b48cff,
      TEAL: 0x008080ff,
      THISTLE: 0xd8bfd8ff,
      TOMATO: 0xff6347ff,
      TRANSPARENT: 0x00000000,
      TURQUOISE: 0x40e0d0ff,
      VIOLET: 0xee82eeff,
      WHEAT: 0xf5deb3ff,
      WHITE: 0xffffffff,
      WHITESMOKE: 0xf5f5f5ff,
      YELLOW: 0xffff00ff,
      YELLOWGREEN: 0x9acd32ff
  };

  var PropertyDescriptorParsingType;
  (function (PropertyDescriptorParsingType) {
      PropertyDescriptorParsingType[PropertyDescriptorParsingType["VALUE"] = 0] = "VALUE";
      PropertyDescriptorParsingType[PropertyDescriptorParsingType["LIST"] = 1] = "LIST";
      PropertyDescriptorParsingType[PropertyDescriptorParsingType["IDENT_VALUE"] = 2] = "IDENT_VALUE";
      PropertyDescriptorParsingType[PropertyDescriptorParsingType["TYPE_VALUE"] = 3] = "TYPE_VALUE";
      PropertyDescriptorParsingType[PropertyDescriptorParsingType["TOKEN_VALUE"] = 4] = "TOKEN_VALUE";
  })(PropertyDescriptorParsingType || (PropertyDescriptorParsingType = {}));

  var BACKGROUND_CLIP;
  (function (BACKGROUND_CLIP) {
      BACKGROUND_CLIP[BACKGROUND_CLIP["BORDER_BOX"] = 0] = "BORDER_BOX";
      BACKGROUND_CLIP[BACKGROUND_CLIP["PADDING_BOX"] = 1] = "PADDING_BOX";
      BACKGROUND_CLIP[BACKGROUND_CLIP["CONTENT_BOX"] = 2] = "CONTENT_BOX";
  })(BACKGROUND_CLIP || (BACKGROUND_CLIP = {}));
  var backgroundClip = {
      name: 'background-clip',
      initialValue: 'border-box',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          return tokens.map(function (token) {
              if (isIdentToken(token)) {
                  switch (token.value) {
                      case 'padding-box':
                          return BACKGROUND_CLIP.PADDING_BOX;
                      case 'content-box':
                          return BACKGROUND_CLIP.CONTENT_BOX;
                  }
              }
              return BACKGROUND_CLIP.BORDER_BOX;
          });
      }
  };

  var backgroundColor = {
      name: "background-color",
      initialValue: 'transparent',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'color'
  };

  var parseColorStop = function (args) {
      var color$1$1 = color$1.parse(args[0]);
      var stop = args[1];
      return stop && isLengthPercentage(stop) ? { color: color$1$1, stop: stop } : { color: color$1$1, stop: null };
  };
  var processColorStops = function (stops, lineLength) {
      var first = stops[0];
      var last = stops[stops.length - 1];
      if (first.stop === null) {
          first.stop = ZERO_LENGTH;
      }
      if (last.stop === null) {
          last.stop = HUNDRED_PERCENT;
      }
      var processStops = [];
      var previous = 0;
      for (var i = 0; i < stops.length; i++) {
          var stop_1 = stops[i].stop;
          if (stop_1 !== null) {
              var absoluteValue = getAbsoluteValue(stop_1, lineLength);
              if (absoluteValue > previous) {
                  processStops.push(absoluteValue);
              }
              else {
                  processStops.push(previous);
              }
              previous = absoluteValue;
          }
          else {
              processStops.push(null);
          }
      }
      var gapBegin = null;
      for (var i = 0; i < processStops.length; i++) {
          var stop_2 = processStops[i];
          if (stop_2 === null) {
              if (gapBegin === null) {
                  gapBegin = i;
              }
          }
          else if (gapBegin !== null) {
              var gapLength = i - gapBegin;
              var beforeGap = processStops[gapBegin - 1];
              var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
              for (var g = 1; g <= gapLength; g++) {
                  processStops[gapBegin + g - 1] = gapValue * g;
              }
              gapBegin = null;
          }
      }
      return stops.map(function (_a, i) {
          var color = _a.color;
          return { color: color, stop: Math.max(Math.min(1, processStops[i] / lineLength), 0) };
      });
  };
  var getAngleFromCorner = function (corner, width, height) {
      var centerX = width / 2;
      var centerY = height / 2;
      var x = getAbsoluteValue(corner[0], width) - centerX;
      var y = centerY - getAbsoluteValue(corner[1], height);
      return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
  };
  var calculateGradientDirection = function (angle, width, height) {
      var radian = typeof angle === 'number' ? angle : getAngleFromCorner(angle, width, height);
      var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var halfLineLength = lineLength / 2;
      var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
      var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
      return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
  };
  var distance = function (a, b) { return Math.sqrt(a * a + b * b); };
  var findCorner = function (width, height, x, y, closest) {
      var corners = [[0, 0], [0, height], [width, 0], [width, height]];
      return corners.reduce(function (stat, corner) {
          var cx = corner[0], cy = corner[1];
          var d = distance(x - cx, y - cy);
          if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
              return {
                  optimumCorner: corner,
                  optimumDistance: d
              };
          }
          return stat;
      }, {
          optimumDistance: closest ? Infinity : -Infinity,
          optimumCorner: null
      }).optimumCorner;
  };
  var calculateRadius = function (gradient, x, y, width, height) {
      var rx = 0;
      var ry = 0;
      switch (gradient.size) {
          case CSSRadialExtent.CLOSEST_SIDE:
              // The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
              // If the shape is an ellipse, it exactly meets the closest side in each dimension.
              if (gradient.shape === CSSRadialShape.CIRCLE) {
                  rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
              }
              else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                  rx = Math.min(Math.abs(x), Math.abs(x - width));
                  ry = Math.min(Math.abs(y), Math.abs(y - height));
              }
              break;
          case CSSRadialExtent.CLOSEST_CORNER:
              // The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
              // If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
              if (gradient.shape === CSSRadialShape.CIRCLE) {
                  rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
              }
              else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                  // Compute the ratio ry/rx (which is to be the same as for "closest-side")
                  var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
                  var _a = findCorner(width, height, x, y, true), cx = _a[0], cy = _a[1];
                  rx = distance(cx - x, (cy - y) / c);
                  ry = c * rx;
              }
              break;
          case CSSRadialExtent.FARTHEST_SIDE:
              // Same as closest-side, except the ending shape is sized based on the farthest side(s)
              if (gradient.shape === CSSRadialShape.CIRCLE) {
                  rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
              }
              else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                  rx = Math.max(Math.abs(x), Math.abs(x - width));
                  ry = Math.max(Math.abs(y), Math.abs(y - height));
              }
              break;
          case CSSRadialExtent.FARTHEST_CORNER:
              // Same as closest-corner, except the ending shape is sized based on the farthest corner.
              // If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
              if (gradient.shape === CSSRadialShape.CIRCLE) {
                  rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
              }
              else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                  // Compute the ratio ry/rx (which is to be the same as for "farthest-side")
                  var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
                  var _b = findCorner(width, height, x, y, false), cx = _b[0], cy = _b[1];
                  rx = distance(cx - x, (cy - y) / c);
                  ry = c * rx;
              }
              break;
      }
      if (Array.isArray(gradient.size)) {
          rx = getAbsoluteValue(gradient.size[0], width);
          ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
      }
      return [rx, ry];
  };

  var linearGradient = function (tokens) {
      var angle$1 = deg(180);
      var stops = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          if (i === 0) {
              var firstToken = arg[0];
              if (firstToken.type === TokenType.IDENT_TOKEN && firstToken.value === 'to') {
                  angle$1 = parseNamedSide(arg);
                  return;
              }
              else if (isAngle(firstToken)) {
                  angle$1 = angle.parse(firstToken);
                  return;
              }
          }
          var colorStop = parseColorStop(arg);
          stops.push(colorStop);
      });
      return { angle: angle$1, stops: stops, type: CSSImageType.LINEAR_GRADIENT };
  };

  var prefixLinearGradient = function (tokens) {
      var angle$1 = deg(180);
      var stops = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          if (i === 0) {
              var firstToken = arg[0];
              if (firstToken.type === TokenType.IDENT_TOKEN &&
                  ['top', 'left', 'right', 'bottom'].indexOf(firstToken.value) !== -1) {
                  angle$1 = parseNamedSide(arg);
                  return;
              }
              else if (isAngle(firstToken)) {
                  angle$1 = (angle.parse(firstToken) + deg(270)) % deg(360);
                  return;
              }
          }
          var colorStop = parseColorStop(arg);
          stops.push(colorStop);
      });
      return {
          angle: angle$1,
          stops: stops,
          type: CSSImageType.LINEAR_GRADIENT
      };
  };

  var testRangeBounds = function (document) {
      var TEST_HEIGHT = 123;
      if (document.createRange) {
          var range = document.createRange();
          if (range.getBoundingClientRect) {
              var testElement = document.createElement('boundtest');
              testElement.style.height = TEST_HEIGHT + "px";
              testElement.style.display = 'block';
              document.body.appendChild(testElement);
              range.selectNode(testElement);
              var rangeBounds = range.getBoundingClientRect();
              var rangeHeight = Math.round(rangeBounds.height);
              document.body.removeChild(testElement);
              if (rangeHeight === TEST_HEIGHT) {
                  return true;
              }
          }
      }
      return false;
  };
  var testCORS = function () { return typeof new Image().crossOrigin !== 'undefined'; };
  var testResponseType = function () { return typeof new XMLHttpRequest().responseType === 'string'; };
  var testSVG = function (document) {
      var img = new Image();
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      if (!ctx) {
          return false;
      }
      img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
      try {
          ctx.drawImage(img, 0, 0);
          canvas.toDataURL();
      }
      catch (e) {
          return false;
      }
      return true;
  };
  var isGreenPixel = function (data) {
      return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
  };
  var testForeignObject = function (document) {
      var canvas = document.createElement('canvas');
      var size = 100;
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      if (!ctx) {
          return Promise.reject(false);
      }
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fillRect(0, 0, size, size);
      var img = new Image();
      var greenImageSrc = canvas.toDataURL();
      img.src = greenImageSrc;
      var svg = createForeignObjectSVG(size, size, 0, 0, img);
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, size, size);
      return loadSerializedSVG(svg)
          .then(function (img) {
          ctx.drawImage(img, 0, 0);
          var data = ctx.getImageData(0, 0, size, size).data;
          ctx.fillStyle = 'red';
          ctx.fillRect(0, 0, size, size);
          var node = document.createElement('div');
          node.style.backgroundImage = "url(" + greenImageSrc + ")";
          node.style.height = size + "px";
          // Firefox 55 does not render inline <img /> tags
          return isGreenPixel(data)
              ? loadSerializedSVG(createForeignObjectSVG(size, size, 0, 0, node))
              : Promise.reject(false);
      })
          .then(function (img) {
          ctx.drawImage(img, 0, 0);
          // Edge does not render background-images
          return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
      })
          .catch(function () { return false; });
  };
  var createForeignObjectSVG = function (width, height, x, y, node) {
      var xmlns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(xmlns, 'svg');
      var foreignObject = document.createElementNS(xmlns, 'foreignObject');
      svg.setAttributeNS(null, 'width', width.toString());
      svg.setAttributeNS(null, 'height', height.toString());
      foreignObject.setAttributeNS(null, 'width', '100%');
      foreignObject.setAttributeNS(null, 'height', '100%');
      foreignObject.setAttributeNS(null, 'x', x.toString());
      foreignObject.setAttributeNS(null, 'y', y.toString());
      foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
      svg.appendChild(foreignObject);
      foreignObject.appendChild(node);
      return svg;
  };
  var loadSerializedSVG = function (svg) {
      return new Promise(function (resolve, reject) {
          var img = new Image();
          img.onload = function () { return resolve(img); };
          img.onerror = reject;
          img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
      });
  };
  var FEATURES = {
      get SUPPORT_RANGE_BOUNDS() {
          var value = testRangeBounds(document);
          Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
          return value;
      },
      get SUPPORT_SVG_DRAWING() {
          var value = testSVG(document);
          Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
          return value;
      },
      get SUPPORT_FOREIGNOBJECT_DRAWING() {
          var value = typeof Array.from === 'function' && typeof window.fetch === 'function'
              ? testForeignObject(document)
              : Promise.resolve(false);
          Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
          return value;
      },
      get SUPPORT_CORS_IMAGES() {
          var value = testCORS();
          Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
          return value;
      },
      get SUPPORT_RESPONSE_TYPE() {
          var value = testResponseType();
          Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
          return value;
      },
      get SUPPORT_CORS_XHR() {
          var value = 'withCredentials' in new XMLHttpRequest();
          Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
          return value;
      }
  };

  var Logger = /** @class */ (function () {
      function Logger(_a) {
          var id = _a.id, enabled = _a.enabled;
          this.id = id;
          this.enabled = enabled;
          this.start = Date.now();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.prototype.debug = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (this.enabled) {
              // eslint-disable-next-line no-console
              if (typeof window !== 'undefined' && window.console && typeof console.debug === 'function') {
                  // eslint-disable-next-line no-console
                  console.debug.apply(console, [this.id, this.getTime() + "ms"].concat(args));
              }
              else {
                  this.info.apply(this, args);
              }
          }
      };
      Logger.prototype.getTime = function () {
          return Date.now() - this.start;
      };
      Logger.create = function (options) {
          Logger.instances[options.id] = new Logger(options);
      };
      Logger.destroy = function (id) {
          delete Logger.instances[id];
      };
      Logger.getInstance = function (id) {
          var instance = Logger.instances[id];
          if (typeof instance === 'undefined') {
              throw new Error("No logger instance found with id " + id);
          }
          return instance;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.prototype.info = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (this.enabled) {
              // eslint-disable-next-line no-console
              if (typeof window !== 'undefined' && window.console && typeof console.info === 'function') {
                  // eslint-disable-next-line no-console
                  console.info.apply(console, [this.id, this.getTime() + "ms"].concat(args));
              }
          }
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.prototype.error = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (this.enabled) {
              // eslint-disable-next-line no-console
              if (typeof window !== 'undefined' && window.console && typeof console.error === 'function') {
                  // eslint-disable-next-line no-console
                  console.error.apply(console, [this.id, this.getTime() + "ms"].concat(args));
              }
              else {
                  this.info.apply(this, args);
              }
          }
      };
      Logger.instances = {};
      return Logger;
  }());

  var CacheStorage = /** @class */ (function () {
      function CacheStorage() {
      }
      CacheStorage.create = function (name, options) {
          return (CacheStorage._caches[name] = new Cache(name, options));
      };
      CacheStorage.destroy = function (name) {
          delete CacheStorage._caches[name];
      };
      CacheStorage.open = function (name) {
          var cache = CacheStorage._caches[name];
          if (typeof cache !== 'undefined') {
              return cache;
          }
          throw new Error("Cache with key \"" + name + "\" not found");
      };
      CacheStorage.getOrigin = function (url) {
          var link = CacheStorage._link;
          if (!link) {
              return 'about:blank';
          }
          link.href = url;
          link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
          return link.protocol + link.hostname + link.port;
      };
      CacheStorage.isSameOrigin = function (src) {
          return CacheStorage.getOrigin(src) === CacheStorage._origin;
      };
      CacheStorage.setContext = function (window) {
          CacheStorage._link = window.document.createElement('a');
          CacheStorage._origin = CacheStorage.getOrigin(window.location.href);
      };
      CacheStorage.getInstance = function () {
          var current = CacheStorage._current;
          if (current === null) {
              throw new Error("No cache instance attached");
          }
          return current;
      };
      CacheStorage.attachInstance = function (cache) {
          CacheStorage._current = cache;
      };
      CacheStorage.detachInstance = function () {
          CacheStorage._current = null;
      };
      CacheStorage._caches = {};
      CacheStorage._origin = 'about:blank';
      CacheStorage._current = null;
      return CacheStorage;
  }());
  var Cache = /** @class */ (function () {
      function Cache(id, options) {
          this.id = id;
          this._options = options;
          this._cache = {};
      }
      Cache.prototype.addImage = function (src) {
          var result = Promise.resolve();
          if (this.has(src)) {
              return result;
          }
          if (isBlobImage(src) || isRenderable(src)) {
              this._cache[src] = this.loadImage(src);
              return result;
          }
          return result;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cache.prototype.match = function (src) {
          return this._cache[src];
      };
      Cache.prototype.loadImage = function (key) {
          return __awaiter(this, void 0, void 0, function () {
              var isSameOrigin, useCORS, useProxy, src;
              var _this = this;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          isSameOrigin = CacheStorage.isSameOrigin(key);
                          useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
                          useProxy = !isInlineImage(key) &&
                              !isSameOrigin &&
                              typeof this._options.proxy === 'string' &&
                              FEATURES.SUPPORT_CORS_XHR &&
                              !useCORS;
                          if (!isSameOrigin && this._options.allowTaint === false && !isInlineImage(key) && !useProxy && !useCORS) {
                              return [2 /*return*/];
                          }
                          src = key;
                          if (!useProxy) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.proxy(src)];
                      case 1:
                          src = _a.sent();
                          _a.label = 2;
                      case 2:
                          Logger.getInstance(this.id).debug("Added image " + key.substring(0, 256));
                          return [4 /*yield*/, new Promise(function (resolve, reject) {
                                  var img = new Image();
                                  img.onload = function () { return resolve(img); };
                                  img.onerror = reject;
                                  //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
                                  if (isInlineBase64Image(src) || useCORS) {
                                      img.crossOrigin = 'anonymous';
                                  }
                                  img.src = src;
                                  if (img.complete === true) {
                                      // Inline XML images may fail to parse, throwing an Error later on
                                      setTimeout(function () { return resolve(img); }, 500);
                                  }
                                  if (_this._options.imageTimeout > 0) {
                                      setTimeout(function () { return reject("Timed out (" + _this._options.imageTimeout + "ms) loading image"); }, _this._options.imageTimeout);
                                  }
                              })];
                      case 3: return [2 /*return*/, _a.sent()];
                  }
              });
          });
      };
      Cache.prototype.has = function (key) {
          return typeof this._cache[key] !== 'undefined';
      };
      Cache.prototype.keys = function () {
          return Promise.resolve(Object.keys(this._cache));
      };
      Cache.prototype.proxy = function (src) {
          var _this = this;
          var proxy = this._options.proxy;
          if (!proxy) {
              throw new Error('No proxy defined');
          }
          var key = src.substring(0, 256);
          return new Promise(function (resolve, reject) {
              var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
              var xhr = new XMLHttpRequest();
              xhr.onload = function () {
                  if (xhr.status === 200) {
                      if (responseType === 'text') {
                          resolve(xhr.response);
                      }
                      else {
                          var reader_1 = new FileReader();
                          reader_1.addEventListener('load', function () { return resolve(reader_1.result); }, false);
                          reader_1.addEventListener('error', function (e) { return reject(e); }, false);
                          reader_1.readAsDataURL(xhr.response);
                      }
                  }
                  else {
                      reject("Failed to proxy resource " + key + " with status code " + xhr.status);
                  }
              };
              xhr.onerror = reject;
              xhr.open('GET', proxy + "?url=" + encodeURIComponent(src) + "&responseType=" + responseType);
              if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
                  xhr.responseType = responseType;
              }
              if (_this._options.imageTimeout) {
                  var timeout_1 = _this._options.imageTimeout;
                  xhr.timeout = timeout_1;
                  xhr.ontimeout = function () { return reject("Timed out (" + timeout_1 + "ms) proxying " + key); };
              }
              xhr.send();
          });
      };
      return Cache;
  }());
  var INLINE_SVG = /^data:image\/svg\+xml/i;
  var INLINE_BASE64 = /^data:image\/.*;base64,/i;
  var INLINE_IMG = /^data:image\/.*/i;
  var isRenderable = function (src) { return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src); };
  var isInlineImage = function (src) { return INLINE_IMG.test(src); };
  var isInlineBase64Image = function (src) { return INLINE_BASE64.test(src); };
  var isBlobImage = function (src) { return src.substr(0, 4) === 'blob'; };
  var isSVG = function (src) { return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src); };

  var webkitGradient = function (tokens) {
      var angle = deg(180);
      var stops = [];
      var type = CSSImageType.LINEAR_GRADIENT;
      var shape = CSSRadialShape.CIRCLE;
      var size = CSSRadialExtent.FARTHEST_CORNER;
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          var firstToken = arg[0];
          if (i === 0) {
              if (isIdentToken(firstToken) && firstToken.value === 'linear') {
                  type = CSSImageType.LINEAR_GRADIENT;
                  return;
              }
              else if (isIdentToken(firstToken) && firstToken.value === 'radial') {
                  type = CSSImageType.RADIAL_GRADIENT;
                  return;
              }
          }
          if (firstToken.type === TokenType.FUNCTION) {
              if (firstToken.name === 'from') {
                  var color$1$1 = color$1.parse(firstToken.values[0]);
                  stops.push({ stop: ZERO_LENGTH, color: color$1$1 });
              }
              else if (firstToken.name === 'to') {
                  var color$1$1 = color$1.parse(firstToken.values[0]);
                  stops.push({ stop: HUNDRED_PERCENT, color: color$1$1 });
              }
              else if (firstToken.name === 'color-stop') {
                  var values = firstToken.values.filter(nonFunctionArgSeparator);
                  if (values.length === 2) {
                      var color$1$1 = color$1.parse(values[1]);
                      var stop_1 = values[0];
                      if (isNumberToken(stop_1)) {
                          stops.push({
                              stop: { type: TokenType.PERCENTAGE_TOKEN, number: stop_1.number * 100, flags: stop_1.flags },
                              color: color$1$1
                          });
                      }
                  }
              }
          }
      });
      return type === CSSImageType.LINEAR_GRADIENT
          ? {
              angle: (angle + deg(180)) % deg(360),
              stops: stops,
              type: type
          }
          : { size: size, shape: shape, stops: stops, position: position, type: type };
  };

  var CLOSEST_SIDE = 'closest-side';
  var FARTHEST_SIDE = 'farthest-side';
  var CLOSEST_CORNER = 'closest-corner';
  var FARTHEST_CORNER = 'farthest-corner';
  var CIRCLE = 'circle';
  var ELLIPSE = 'ellipse';
  var COVER = 'cover';
  var CONTAIN = 'contain';
  var radialGradient = function (tokens) {
      var shape = CSSRadialShape.CIRCLE;
      var size = CSSRadialExtent.FARTHEST_CORNER;
      var stops = [];
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          var isColorStop = true;
          if (i === 0) {
              var isAtPosition_1 = false;
              isColorStop = arg.reduce(function (acc, token) {
                  if (isAtPosition_1) {
                      if (isIdentToken(token)) {
                          switch (token.value) {
                              case 'center':
                                  position.push(FIFTY_PERCENT);
                                  return acc;
                              case 'top':
                              case 'left':
                                  position.push(ZERO_LENGTH);
                                  return acc;
                              case 'right':
                              case 'bottom':
                                  position.push(HUNDRED_PERCENT);
                                  return acc;
                          }
                      }
                      else if (isLengthPercentage(token) || isLength$1(token)) {
                          position.push(token);
                      }
                  }
                  else if (isIdentToken(token)) {
                      switch (token.value) {
                          case CIRCLE:
                              shape = CSSRadialShape.CIRCLE;
                              return false;
                          case ELLIPSE:
                              shape = CSSRadialShape.ELLIPSE;
                              return false;
                          case 'at':
                              isAtPosition_1 = true;
                              return false;
                          case CLOSEST_SIDE:
                              size = CSSRadialExtent.CLOSEST_SIDE;
                              return false;
                          case COVER:
                          case FARTHEST_SIDE:
                              size = CSSRadialExtent.FARTHEST_SIDE;
                              return false;
                          case CONTAIN:
                          case CLOSEST_CORNER:
                              size = CSSRadialExtent.CLOSEST_CORNER;
                              return false;
                          case FARTHEST_CORNER:
                              size = CSSRadialExtent.FARTHEST_CORNER;
                              return false;
                      }
                  }
                  else if (isLength$1(token) || isLengthPercentage(token)) {
                      if (!Array.isArray(size)) {
                          size = [];
                      }
                      size.push(token);
                      return false;
                  }
                  return acc;
              }, isColorStop);
          }
          if (isColorStop) {
              var colorStop = parseColorStop(arg);
              stops.push(colorStop);
          }
      });
      return { size: size, shape: shape, stops: stops, position: position, type: CSSImageType.RADIAL_GRADIENT };
  };

  var prefixRadialGradient = function (tokens) {
      var shape = CSSRadialShape.CIRCLE;
      var size = CSSRadialExtent.FARTHEST_CORNER;
      var stops = [];
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          var isColorStop = true;
          if (i === 0) {
              isColorStop = arg.reduce(function (acc, token) {
                  if (isIdentToken(token)) {
                      switch (token.value) {
                          case 'center':
                              position.push(FIFTY_PERCENT);
                              return false;
                          case 'top':
                          case 'left':
                              position.push(ZERO_LENGTH);
                              return false;
                          case 'right':
                          case 'bottom':
                              position.push(HUNDRED_PERCENT);
                              return false;
                      }
                  }
                  else if (isLengthPercentage(token) || isLength$1(token)) {
                      position.push(token);
                      return false;
                  }
                  return acc;
              }, isColorStop);
          }
          else if (i === 1) {
              isColorStop = arg.reduce(function (acc, token) {
                  if (isIdentToken(token)) {
                      switch (token.value) {
                          case CIRCLE:
                              shape = CSSRadialShape.CIRCLE;
                              return false;
                          case ELLIPSE:
                              shape = CSSRadialShape.ELLIPSE;
                              return false;
                          case CONTAIN:
                          case CLOSEST_SIDE:
                              size = CSSRadialExtent.CLOSEST_SIDE;
                              return false;
                          case FARTHEST_SIDE:
                              size = CSSRadialExtent.FARTHEST_SIDE;
                              return false;
                          case CLOSEST_CORNER:
                              size = CSSRadialExtent.CLOSEST_CORNER;
                              return false;
                          case COVER:
                          case FARTHEST_CORNER:
                              size = CSSRadialExtent.FARTHEST_CORNER;
                              return false;
                      }
                  }
                  else if (isLength$1(token) || isLengthPercentage(token)) {
                      if (!Array.isArray(size)) {
                          size = [];
                      }
                      size.push(token);
                      return false;
                  }
                  return acc;
              }, isColorStop);
          }
          if (isColorStop) {
              var colorStop = parseColorStop(arg);
              stops.push(colorStop);
          }
      });
      return { size: size, shape: shape, stops: stops, position: position, type: CSSImageType.RADIAL_GRADIENT };
  };

  var CSSImageType;
  (function (CSSImageType) {
      CSSImageType[CSSImageType["URL"] = 0] = "URL";
      CSSImageType[CSSImageType["LINEAR_GRADIENT"] = 1] = "LINEAR_GRADIENT";
      CSSImageType[CSSImageType["RADIAL_GRADIENT"] = 2] = "RADIAL_GRADIENT";
  })(CSSImageType || (CSSImageType = {}));
  var isLinearGradient = function (background) {
      return background.type === CSSImageType.LINEAR_GRADIENT;
  };
  var isRadialGradient = function (background) {
      return background.type === CSSImageType.RADIAL_GRADIENT;
  };
  var CSSRadialShape;
  (function (CSSRadialShape) {
      CSSRadialShape[CSSRadialShape["CIRCLE"] = 0] = "CIRCLE";
      CSSRadialShape[CSSRadialShape["ELLIPSE"] = 1] = "ELLIPSE";
  })(CSSRadialShape || (CSSRadialShape = {}));
  var CSSRadialExtent;
  (function (CSSRadialExtent) {
      CSSRadialExtent[CSSRadialExtent["CLOSEST_SIDE"] = 0] = "CLOSEST_SIDE";
      CSSRadialExtent[CSSRadialExtent["FARTHEST_SIDE"] = 1] = "FARTHEST_SIDE";
      CSSRadialExtent[CSSRadialExtent["CLOSEST_CORNER"] = 2] = "CLOSEST_CORNER";
      CSSRadialExtent[CSSRadialExtent["FARTHEST_CORNER"] = 3] = "FARTHEST_CORNER";
  })(CSSRadialExtent || (CSSRadialExtent = {}));
  var image = {
      name: 'image',
      parse: function (value) {
          if (value.type === TokenType.URL_TOKEN) {
              var image_1 = { url: value.value, type: CSSImageType.URL };
              CacheStorage.getInstance().addImage(value.value);
              return image_1;
          }
          if (value.type === TokenType.FUNCTION) {
              var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
              if (typeof imageFunction === 'undefined') {
                  throw new Error("Attempting to parse an unsupported image function \"" + value.name + "\"");
              }
              return imageFunction(value.values);
          }
          throw new Error("Unsupported image type");
      }
  };
  function isSupportedImage(value) {
      return value.type !== TokenType.FUNCTION || SUPPORTED_IMAGE_FUNCTIONS[value.name];
  }
  var SUPPORTED_IMAGE_FUNCTIONS = {
      'linear-gradient': linearGradient,
      '-moz-linear-gradient': prefixLinearGradient,
      '-ms-linear-gradient': prefixLinearGradient,
      '-o-linear-gradient': prefixLinearGradient,
      '-webkit-linear-gradient': prefixLinearGradient,
      'radial-gradient': radialGradient,
      '-moz-radial-gradient': prefixRadialGradient,
      '-ms-radial-gradient': prefixRadialGradient,
      '-o-radial-gradient': prefixRadialGradient,
      '-webkit-radial-gradient': prefixRadialGradient,
      '-webkit-gradient': webkitGradient
  };

  var backgroundImage = {
      name: 'background-image',
      initialValue: 'none',
      type: PropertyDescriptorParsingType.LIST,
      prefix: false,
      parse: function (tokens) {
          if (tokens.length === 0) {
              return [];
          }
          var first = tokens[0];
          if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
              return [];
          }
          return tokens.filter(function (value) { return nonFunctionArgSeparator(value) && isSupportedImage(value); }).map(image.parse);
      }
  };

  var backgroundOrigin = {
      name: 'background-origin',
      initialValue: 'border-box',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          return tokens.map(function (token) {
              if (isIdentToken(token)) {
                  switch (token.value) {
                      case 'padding-box':
                          return 1 /* PADDING_BOX */;
                      case 'content-box':
                          return 2 /* CONTENT_BOX */;
                  }
              }
              return 0 /* BORDER_BOX */;
          });
      }
  };

  var backgroundPosition = {
      name: 'background-position',
      initialValue: '0% 0%',
      type: PropertyDescriptorParsingType.LIST,
      prefix: false,
      parse: function (tokens) {
          return parseFunctionArgs(tokens)
              .map(function (values) { return values.filter(isLengthPercentage); })
              .map(parseLengthPercentageTuple);
      }
  };

  var BACKGROUND_REPEAT;
  (function (BACKGROUND_REPEAT) {
      BACKGROUND_REPEAT[BACKGROUND_REPEAT["REPEAT"] = 0] = "REPEAT";
      BACKGROUND_REPEAT[BACKGROUND_REPEAT["NO_REPEAT"] = 1] = "NO_REPEAT";
      BACKGROUND_REPEAT[BACKGROUND_REPEAT["REPEAT_X"] = 2] = "REPEAT_X";
      BACKGROUND_REPEAT[BACKGROUND_REPEAT["REPEAT_Y"] = 3] = "REPEAT_Y";
  })(BACKGROUND_REPEAT || (BACKGROUND_REPEAT = {}));
  var backgroundRepeat = {
      name: 'background-repeat',
      initialValue: 'repeat',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          return parseFunctionArgs(tokens)
              .map(function (values) {
              return values
                  .filter(isIdentToken)
                  .map(function (token) { return token.value; })
                  .join(' ');
          })
              .map(parseBackgroundRepeat);
      }
  };
  var parseBackgroundRepeat = function (value) {
      switch (value) {
          case 'no-repeat':
              return BACKGROUND_REPEAT.NO_REPEAT;
          case 'repeat-x':
          case 'repeat no-repeat':
              return BACKGROUND_REPEAT.REPEAT_X;
          case 'repeat-y':
          case 'no-repeat repeat':
              return BACKGROUND_REPEAT.REPEAT_Y;
          case 'repeat':
          default:
              return BACKGROUND_REPEAT.REPEAT;
      }
  };

  var BACKGROUND_SIZE;
  (function (BACKGROUND_SIZE) {
      BACKGROUND_SIZE["AUTO"] = "auto";
      BACKGROUND_SIZE["CONTAIN"] = "contain";
      BACKGROUND_SIZE["COVER"] = "cover";
  })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
  var backgroundSize = {
      name: 'background-size',
      initialValue: '0',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          return parseFunctionArgs(tokens).map(function (values) { return values.filter(isBackgroundSizeInfoToken); });
      }
  };
  var isBackgroundSizeInfoToken = function (value) {
      return isIdentToken(value) || isLengthPercentage(value);
  };

  var borderColorForSide = function (side) { return ({
      name: "border-" + side + "-color",
      initialValue: 'transparent',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'color'
  }); };
  var borderTopColor = borderColorForSide('top');
  var borderRightColor = borderColorForSide('right');
  var borderBottomColor = borderColorForSide('bottom');
  var borderLeftColor = borderColorForSide('left');

  var borderRadiusForSide = function (side) { return ({
      name: "border-radius-" + side,
      initialValue: '0 0',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) { return parseLengthPercentageTuple(tokens.filter(isLengthPercentage)); }
  }); };
  var borderTopLeftRadius = borderRadiusForSide('top-left');
  var borderTopRightRadius = borderRadiusForSide('top-right');
  var borderBottomRightRadius = borderRadiusForSide('bottom-right');
  var borderBottomLeftRadius = borderRadiusForSide('bottom-left');

  var BORDER_STYLE;
  (function (BORDER_STYLE) {
      BORDER_STYLE[BORDER_STYLE["NONE"] = 0] = "NONE";
      BORDER_STYLE[BORDER_STYLE["SOLID"] = 1] = "SOLID";
  })(BORDER_STYLE || (BORDER_STYLE = {}));
  var borderStyleForSide = function (side) { return ({
      name: "border-" + side + "-style",
      initialValue: 'solid',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (style) {
          switch (style) {
              case 'none':
                  return BORDER_STYLE.NONE;
          }
          return BORDER_STYLE.SOLID;
      }
  }); };
  var borderTopStyle = borderStyleForSide('top');
  var borderRightStyle = borderStyleForSide('right');
  var borderBottomStyle = borderStyleForSide('bottom');
  var borderLeftStyle = borderStyleForSide('left');

  var borderWidthForSide = function (side) { return ({
      name: "border-" + side + "-width",
      initialValue: '0',
      type: PropertyDescriptorParsingType.VALUE,
      prefix: false,
      parse: function (token) {
          if (isDimensionToken(token)) {
              return token.number;
          }
          return 0;
      }
  }); };
  var borderTopWidth = borderWidthForSide('top');
  var borderRightWidth = borderWidthForSide('right');
  var borderBottomWidth = borderWidthForSide('bottom');
  var borderLeftWidth = borderWidthForSide('left');

  var color$1$1 = {
      name: "color",
      initialValue: 'transparent',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'color'
  };

  var display = {
      name: 'display',
      initialValue: 'inline-block',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          return tokens.filter(isIdentToken).reduce(function (bit, token) {
              return bit | parseDisplayValue(token.value);
          }, 0 /* NONE */);
      }
  };
  var parseDisplayValue = function (display) {
      switch (display) {
          case 'block':
              return 2 /* BLOCK */;
          case 'inline':
              return 4 /* INLINE */;
          case 'run-in':
              return 8 /* RUN_IN */;
          case 'flow':
              return 16 /* FLOW */;
          case 'flow-root':
              return 32 /* FLOW_ROOT */;
          case 'table':
              return 64 /* TABLE */;
          case 'flex':
          case '-webkit-flex':
              return 128 /* FLEX */;
          case 'grid':
          case '-ms-grid':
              return 256 /* GRID */;
          case 'ruby':
              return 512 /* RUBY */;
          case 'subgrid':
              return 1024 /* SUBGRID */;
          case 'list-item':
              return 2048 /* LIST_ITEM */;
          case 'table-row-group':
              return 4096 /* TABLE_ROW_GROUP */;
          case 'table-header-group':
              return 8192 /* TABLE_HEADER_GROUP */;
          case 'table-footer-group':
              return 16384 /* TABLE_FOOTER_GROUP */;
          case 'table-row':
              return 32768 /* TABLE_ROW */;
          case 'table-cell':
              return 65536 /* TABLE_CELL */;
          case 'table-column-group':
              return 131072 /* TABLE_COLUMN_GROUP */;
          case 'table-column':
              return 262144 /* TABLE_COLUMN */;
          case 'table-caption':
              return 524288 /* TABLE_CAPTION */;
          case 'ruby-base':
              return 1048576 /* RUBY_BASE */;
          case 'ruby-text':
              return 2097152 /* RUBY_TEXT */;
          case 'ruby-base-container':
              return 4194304 /* RUBY_BASE_CONTAINER */;
          case 'ruby-text-container':
              return 8388608 /* RUBY_TEXT_CONTAINER */;
          case 'contents':
              return 16777216 /* CONTENTS */;
          case 'inline-block':
              return 33554432 /* INLINE_BLOCK */;
          case 'inline-list-item':
              return 67108864 /* INLINE_LIST_ITEM */;
          case 'inline-table':
              return 134217728 /* INLINE_TABLE */;
          case 'inline-flex':
              return 268435456 /* INLINE_FLEX */;
          case 'inline-grid':
              return 536870912 /* INLINE_GRID */;
      }
      return 0 /* NONE */;
  };

  var FLOAT;
  (function (FLOAT) {
      FLOAT[FLOAT["NONE"] = 0] = "NONE";
      FLOAT[FLOAT["LEFT"] = 1] = "LEFT";
      FLOAT[FLOAT["RIGHT"] = 2] = "RIGHT";
      FLOAT[FLOAT["INLINE_START"] = 3] = "INLINE_START";
      FLOAT[FLOAT["INLINE_END"] = 4] = "INLINE_END";
  })(FLOAT || (FLOAT = {}));
  var float = {
      name: 'float',
      initialValue: 'none',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (float) {
          switch (float) {
              case 'left':
                  return FLOAT.LEFT;
              case 'right':
                  return FLOAT.RIGHT;
              case 'inline-start':
                  return FLOAT.INLINE_START;
              case 'inline-end':
                  return FLOAT.INLINE_END;
          }
          return FLOAT.NONE;
      }
  };

  var letterSpacing = {
      name: 'letter-spacing',
      initialValue: '0',
      prefix: false,
      type: PropertyDescriptorParsingType.VALUE,
      parse: function (token) {
          if (token.type === TokenType.IDENT_TOKEN && token.value === 'normal') {
              return 0;
          }
          if (token.type === TokenType.NUMBER_TOKEN) {
              return token.number;
          }
          if (token.type === TokenType.DIMENSION_TOKEN) {
              return token.number;
          }
          return 0;
      }
  };

  var LINE_BREAK;
  (function (LINE_BREAK) {
      LINE_BREAK["NORMAL"] = "normal";
      LINE_BREAK["STRICT"] = "strict";
  })(LINE_BREAK || (LINE_BREAK = {}));
  var lineBreak = {
      name: 'line-break',
      initialValue: 'normal',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (lineBreak) {
          switch (lineBreak) {
              case 'strict':
                  return LINE_BREAK.STRICT;
              case 'normal':
              default:
                  return LINE_BREAK.NORMAL;
          }
      }
  };

  var lineHeight = {
      name: 'line-height',
      initialValue: 'normal',
      prefix: false,
      type: PropertyDescriptorParsingType.TOKEN_VALUE
  };
  var computeLineHeight = function (token, fontSize) {
      if (isIdentToken(token) && token.value === 'normal') {
          return 1.2 * fontSize;
      }
      else if (token.type === TokenType.NUMBER_TOKEN) {
          return fontSize * token.number;
      }
      else if (isLengthPercentage(token)) {
          return getAbsoluteValue(token, fontSize);
      }
      return fontSize;
  };

  var listStyleImage = {
      name: 'list-style-image',
      initialValue: 'none',
      type: PropertyDescriptorParsingType.VALUE,
      prefix: false,
      parse: function (token) {
          if (token.type === TokenType.IDENT_TOKEN && token.value === 'none') {
              return null;
          }
          return image.parse(token);
      }
  };

  var LIST_STYLE_POSITION;
  (function (LIST_STYLE_POSITION) {
      LIST_STYLE_POSITION[LIST_STYLE_POSITION["INSIDE"] = 0] = "INSIDE";
      LIST_STYLE_POSITION[LIST_STYLE_POSITION["OUTSIDE"] = 1] = "OUTSIDE";
  })(LIST_STYLE_POSITION || (LIST_STYLE_POSITION = {}));
  var listStylePosition = {
      name: 'list-style-position',
      initialValue: 'outside',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (position) {
          switch (position) {
              case 'inside':
                  return LIST_STYLE_POSITION.INSIDE;
              case 'outside':
              default:
                  return LIST_STYLE_POSITION.OUTSIDE;
          }
      }
  };

  var LIST_STYLE_TYPE;
  (function (LIST_STYLE_TYPE) {
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["NONE"] = -1] = "NONE";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["DISC"] = 0] = "DISC";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["CIRCLE"] = 1] = "CIRCLE";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["SQUARE"] = 2] = "SQUARE";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["DECIMAL"] = 3] = "DECIMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_DECIMAL"] = 4] = "CJK_DECIMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["DECIMAL_LEADING_ZERO"] = 5] = "DECIMAL_LEADING_ZERO";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_ROMAN"] = 6] = "LOWER_ROMAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["UPPER_ROMAN"] = 7] = "UPPER_ROMAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_GREEK"] = 8] = "LOWER_GREEK";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_ALPHA"] = 9] = "LOWER_ALPHA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["UPPER_ALPHA"] = 10] = "UPPER_ALPHA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["ARABIC_INDIC"] = 11] = "ARABIC_INDIC";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["ARMENIAN"] = 12] = "ARMENIAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["BENGALI"] = 13] = "BENGALI";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["CAMBODIAN"] = 14] = "CAMBODIAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_EARTHLY_BRANCH"] = 15] = "CJK_EARTHLY_BRANCH";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_HEAVENLY_STEM"] = 16] = "CJK_HEAVENLY_STEM";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_IDEOGRAPHIC"] = 17] = "CJK_IDEOGRAPHIC";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["DEVANAGARI"] = 18] = "DEVANAGARI";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["ETHIOPIC_NUMERIC"] = 19] = "ETHIOPIC_NUMERIC";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["GEORGIAN"] = 20] = "GEORGIAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["GUJARATI"] = 21] = "GUJARATI";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["GURMUKHI"] = 22] = "GURMUKHI";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["HEBREW"] = 22] = "HEBREW";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["HIRAGANA"] = 23] = "HIRAGANA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["HIRAGANA_IROHA"] = 24] = "HIRAGANA_IROHA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["JAPANESE_FORMAL"] = 25] = "JAPANESE_FORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["JAPANESE_INFORMAL"] = 26] = "JAPANESE_INFORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["KANNADA"] = 27] = "KANNADA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["KATAKANA"] = 28] = "KATAKANA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["KATAKANA_IROHA"] = 29] = "KATAKANA_IROHA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["KHMER"] = 30] = "KHMER";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["KOREAN_HANGUL_FORMAL"] = 31] = "KOREAN_HANGUL_FORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["KOREAN_HANJA_FORMAL"] = 32] = "KOREAN_HANJA_FORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["KOREAN_HANJA_INFORMAL"] = 33] = "KOREAN_HANJA_INFORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["LAO"] = 34] = "LAO";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_ARMENIAN"] = 35] = "LOWER_ARMENIAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["MALAYALAM"] = 36] = "MALAYALAM";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["MONGOLIAN"] = 37] = "MONGOLIAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["MYANMAR"] = 38] = "MYANMAR";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["ORIYA"] = 39] = "ORIYA";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["PERSIAN"] = 40] = "PERSIAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["SIMP_CHINESE_FORMAL"] = 41] = "SIMP_CHINESE_FORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["SIMP_CHINESE_INFORMAL"] = 42] = "SIMP_CHINESE_INFORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["TAMIL"] = 43] = "TAMIL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["TELUGU"] = 44] = "TELUGU";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["THAI"] = 45] = "THAI";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["TIBETAN"] = 46] = "TIBETAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["TRAD_CHINESE_FORMAL"] = 47] = "TRAD_CHINESE_FORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["TRAD_CHINESE_INFORMAL"] = 48] = "TRAD_CHINESE_INFORMAL";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["UPPER_ARMENIAN"] = 49] = "UPPER_ARMENIAN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["DISCLOSURE_OPEN"] = 50] = "DISCLOSURE_OPEN";
      LIST_STYLE_TYPE[LIST_STYLE_TYPE["DISCLOSURE_CLOSED"] = 51] = "DISCLOSURE_CLOSED";
  })(LIST_STYLE_TYPE || (LIST_STYLE_TYPE = {}));
  var listStyleType = {
      name: 'list-style-type',
      initialValue: 'none',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (type) {
          switch (type) {
              case 'disc':
                  return LIST_STYLE_TYPE.DISC;
              case 'circle':
                  return LIST_STYLE_TYPE.CIRCLE;
              case 'square':
                  return LIST_STYLE_TYPE.SQUARE;
              case 'decimal':
                  return LIST_STYLE_TYPE.DECIMAL;
              case 'cjk-decimal':
                  return LIST_STYLE_TYPE.CJK_DECIMAL;
              case 'decimal-leading-zero':
                  return LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO;
              case 'lower-roman':
                  return LIST_STYLE_TYPE.LOWER_ROMAN;
              case 'upper-roman':
                  return LIST_STYLE_TYPE.UPPER_ROMAN;
              case 'lower-greek':
                  return LIST_STYLE_TYPE.LOWER_GREEK;
              case 'lower-alpha':
                  return LIST_STYLE_TYPE.LOWER_ALPHA;
              case 'upper-alpha':
                  return LIST_STYLE_TYPE.UPPER_ALPHA;
              case 'arabic-indic':
                  return LIST_STYLE_TYPE.ARABIC_INDIC;
              case 'armenian':
                  return LIST_STYLE_TYPE.ARMENIAN;
              case 'bengali':
                  return LIST_STYLE_TYPE.BENGALI;
              case 'cambodian':
                  return LIST_STYLE_TYPE.CAMBODIAN;
              case 'cjk-earthly-branch':
                  return LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH;
              case 'cjk-heavenly-stem':
                  return LIST_STYLE_TYPE.CJK_HEAVENLY_STEM;
              case 'cjk-ideographic':
                  return LIST_STYLE_TYPE.CJK_IDEOGRAPHIC;
              case 'devanagari':
                  return LIST_STYLE_TYPE.DEVANAGARI;
              case 'ethiopic-numeric':
                  return LIST_STYLE_TYPE.ETHIOPIC_NUMERIC;
              case 'georgian':
                  return LIST_STYLE_TYPE.GEORGIAN;
              case 'gujarati':
                  return LIST_STYLE_TYPE.GUJARATI;
              case 'gurmukhi':
                  return LIST_STYLE_TYPE.GURMUKHI;
              case 'hebrew':
                  return LIST_STYLE_TYPE.HEBREW;
              case 'hiragana':
                  return LIST_STYLE_TYPE.HIRAGANA;
              case 'hiragana-iroha':
                  return LIST_STYLE_TYPE.HIRAGANA_IROHA;
              case 'japanese-formal':
                  return LIST_STYLE_TYPE.JAPANESE_FORMAL;
              case 'japanese-informal':
                  return LIST_STYLE_TYPE.JAPANESE_INFORMAL;
              case 'kannada':
                  return LIST_STYLE_TYPE.KANNADA;
              case 'katakana':
                  return LIST_STYLE_TYPE.KATAKANA;
              case 'katakana-iroha':
                  return LIST_STYLE_TYPE.KATAKANA_IROHA;
              case 'khmer':
                  return LIST_STYLE_TYPE.KHMER;
              case 'korean-hangul-formal':
                  return LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL;
              case 'korean-hanja-formal':
                  return LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL;
              case 'korean-hanja-informal':
                  return LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL;
              case 'lao':
                  return LIST_STYLE_TYPE.LAO;
              case 'lower-armenian':
                  return LIST_STYLE_TYPE.LOWER_ARMENIAN;
              case 'malayalam':
                  return LIST_STYLE_TYPE.MALAYALAM;
              case 'mongolian':
                  return LIST_STYLE_TYPE.MONGOLIAN;
              case 'myanmar':
                  return LIST_STYLE_TYPE.MYANMAR;
              case 'oriya':
                  return LIST_STYLE_TYPE.ORIYA;
              case 'persian':
                  return LIST_STYLE_TYPE.PERSIAN;
              case 'simp-chinese-formal':
                  return LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL;
              case 'simp-chinese-informal':
                  return LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL;
              case 'tamil':
                  return LIST_STYLE_TYPE.TAMIL;
              case 'telugu':
                  return LIST_STYLE_TYPE.TELUGU;
              case 'thai':
                  return LIST_STYLE_TYPE.THAI;
              case 'tibetan':
                  return LIST_STYLE_TYPE.TIBETAN;
              case 'trad-chinese-formal':
                  return LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL;
              case 'trad-chinese-informal':
                  return LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL;
              case 'upper-armenian':
                  return LIST_STYLE_TYPE.UPPER_ARMENIAN;
              case 'disclosure-open':
                  return LIST_STYLE_TYPE.DISCLOSURE_OPEN;
              case 'disclosure-closed':
                  return LIST_STYLE_TYPE.DISCLOSURE_CLOSED;
              case 'none':
              default:
                  return LIST_STYLE_TYPE.NONE;
          }
      }
  };

  var marginForSide = function (side) { return ({
      name: "margin-" + side,
      initialValue: '0',
      prefix: false,
      type: PropertyDescriptorParsingType.TOKEN_VALUE
  }); };
  var marginTop = marginForSide('top');
  var marginRight = marginForSide('right');
  var marginBottom = marginForSide('bottom');
  var marginLeft = marginForSide('left');

  var OVERFLOW;
  (function (OVERFLOW) {
      OVERFLOW[OVERFLOW["VISIBLE"] = 0] = "VISIBLE";
      OVERFLOW[OVERFLOW["HIDDEN"] = 1] = "HIDDEN";
      OVERFLOW[OVERFLOW["SCROLL"] = 2] = "SCROLL";
      OVERFLOW[OVERFLOW["AUTO"] = 3] = "AUTO";
  })(OVERFLOW || (OVERFLOW = {}));
  var overflow = {
      name: 'overflow',
      initialValue: 'visible',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          return tokens.filter(isIdentToken).map(function (overflow) {
              switch (overflow.value) {
                  case 'hidden':
                      return OVERFLOW.HIDDEN;
                  case 'scroll':
                      return OVERFLOW.SCROLL;
                  case 'auto':
                      return OVERFLOW.AUTO;
                  case 'visible':
                  default:
                      return OVERFLOW.VISIBLE;
              }
          });
      }
  };

  var OVERFLOW_WRAP;
  (function (OVERFLOW_WRAP) {
      OVERFLOW_WRAP["NORMAL"] = "normal";
      OVERFLOW_WRAP["BREAK_WORD"] = "break-word";
  })(OVERFLOW_WRAP || (OVERFLOW_WRAP = {}));
  var overflowWrap = {
      name: 'overflow-wrap',
      initialValue: 'normal',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (overflow) {
          switch (overflow) {
              case 'break-word':
                  return OVERFLOW_WRAP.BREAK_WORD;
              case 'normal':
              default:
                  return OVERFLOW_WRAP.NORMAL;
          }
      }
  };

  var paddingForSide = function (side) { return ({
      name: "padding-" + side,
      initialValue: '0',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'length-percentage'
  }); };
  var paddingTop = paddingForSide('top');
  var paddingRight = paddingForSide('right');
  var paddingBottom = paddingForSide('bottom');
  var paddingLeft = paddingForSide('left');

  var TEXT_ALIGN;
  (function (TEXT_ALIGN) {
      TEXT_ALIGN[TEXT_ALIGN["LEFT"] = 0] = "LEFT";
      TEXT_ALIGN[TEXT_ALIGN["CENTER"] = 1] = "CENTER";
      TEXT_ALIGN[TEXT_ALIGN["RIGHT"] = 2] = "RIGHT";
  })(TEXT_ALIGN || (TEXT_ALIGN = {}));
  var textAlign = {
      name: 'text-align',
      initialValue: 'left',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (textAlign) {
          switch (textAlign) {
              case 'right':
                  return TEXT_ALIGN.RIGHT;
              case 'center':
              case 'justify':
                  return TEXT_ALIGN.CENTER;
              case 'left':
              default:
                  return TEXT_ALIGN.LEFT;
          }
      }
  };

  var POSITION;
  (function (POSITION) {
      POSITION[POSITION["STATIC"] = 0] = "STATIC";
      POSITION[POSITION["RELATIVE"] = 1] = "RELATIVE";
      POSITION[POSITION["ABSOLUTE"] = 2] = "ABSOLUTE";
      POSITION[POSITION["FIXED"] = 3] = "FIXED";
      POSITION[POSITION["STICKY"] = 4] = "STICKY";
  })(POSITION || (POSITION = {}));
  var position = {
      name: 'position',
      initialValue: 'static',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (position) {
          switch (position) {
              case 'relative':
                  return POSITION.RELATIVE;
              case 'absolute':
                  return POSITION.ABSOLUTE;
              case 'fixed':
                  return POSITION.FIXED;
              case 'sticky':
                  return POSITION.STICKY;
          }
          return POSITION.STATIC;
      }
  };

  var textShadow = {
      name: 'text-shadow',
      initialValue: 'none',
      type: PropertyDescriptorParsingType.LIST,
      prefix: false,
      parse: function (tokens) {
          if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
              return [];
          }
          return parseFunctionArgs(tokens).map(function (values) {
              var shadow = {
                  color: COLORS.TRANSPARENT,
                  offsetX: ZERO_LENGTH,
                  offsetY: ZERO_LENGTH,
                  blur: ZERO_LENGTH
              };
              var c = 0;
              for (var i = 0; i < values.length; i++) {
                  var token = values[i];
                  if (isLength$1(token)) {
                      if (c === 0) {
                          shadow.offsetX = token;
                      }
                      else if (c === 1) {
                          shadow.offsetY = token;
                      }
                      else {
                          shadow.blur = token;
                      }
                      c++;
                  }
                  else {
                      shadow.color = color$1.parse(token);
                  }
              }
              return shadow;
          });
      }
  };

  var TEXT_TRANSFORM;
  (function (TEXT_TRANSFORM) {
      TEXT_TRANSFORM[TEXT_TRANSFORM["NONE"] = 0] = "NONE";
      TEXT_TRANSFORM[TEXT_TRANSFORM["LOWERCASE"] = 1] = "LOWERCASE";
      TEXT_TRANSFORM[TEXT_TRANSFORM["UPPERCASE"] = 2] = "UPPERCASE";
      TEXT_TRANSFORM[TEXT_TRANSFORM["CAPITALIZE"] = 3] = "CAPITALIZE";
  })(TEXT_TRANSFORM || (TEXT_TRANSFORM = {}));
  var textTransform = {
      name: 'text-transform',
      initialValue: 'none',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (textTransform) {
          switch (textTransform) {
              case 'uppercase':
                  return TEXT_TRANSFORM.UPPERCASE;
              case 'lowercase':
                  return TEXT_TRANSFORM.LOWERCASE;
              case 'capitalize':
                  return TEXT_TRANSFORM.CAPITALIZE;
          }
          return TEXT_TRANSFORM.NONE;
      }
  };

  var transform = {
      name: 'transform',
      initialValue: 'none',
      prefix: true,
      type: PropertyDescriptorParsingType.VALUE,
      parse: function (token) {
          if (token.type === TokenType.IDENT_TOKEN && token.value === 'none') {
              return null;
          }
          if (token.type === TokenType.FUNCTION) {
              var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
              if (typeof transformFunction === 'undefined') {
                  throw new Error("Attempting to parse an unsupported transform function \"" + token.name + "\"");
              }
              return transformFunction(token.values);
          }
          return null;
      }
  };
  var matrix = function (args) {
      var values = args.filter(function (arg) { return arg.type === TokenType.NUMBER_TOKEN; }).map(function (arg) { return arg.number; });
      return values.length === 6 ? values : null;
  };
  // doesn't support 3D transforms at the moment
  var matrix3d = function (args) {
      var values = args.filter(function (arg) { return arg.type === TokenType.NUMBER_TOKEN; }).map(function (arg) { return arg.number; });
      var a1 = values[0], b1 = values[1], _a = values[2], _b = values[3], a2 = values[4], b2 = values[5], _c = values[6], _d = values[7], _e = values[8], _f = values[9], _g = values[10], _h = values[11], a4 = values[12], b4 = values[13], _j = values[14], _k = values[15];
      return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
  };
  var SUPPORTED_TRANSFORM_FUNCTIONS = {
      matrix: matrix,
      matrix3d: matrix3d
  };

  var DEFAULT_VALUE = {
      type: TokenType.PERCENTAGE_TOKEN,
      number: 50,
      flags: FLAG_INTEGER
  };
  var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
  var transformOrigin = {
      name: 'transform-origin',
      initialValue: '50% 50%',
      prefix: true,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          var origins = tokens.filter(isLengthPercentage);
          if (origins.length !== 2) {
              return DEFAULT;
          }
          return [origins[0], origins[1]];
      }
  };

  var VISIBILITY;
  (function (VISIBILITY) {
      VISIBILITY[VISIBILITY["VISIBLE"] = 0] = "VISIBLE";
      VISIBILITY[VISIBILITY["HIDDEN"] = 1] = "HIDDEN";
      VISIBILITY[VISIBILITY["COLLAPSE"] = 2] = "COLLAPSE";
  })(VISIBILITY || (VISIBILITY = {}));
  var visibility = {
      name: 'visible',
      initialValue: 'none',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (visibility) {
          switch (visibility) {
              case 'hidden':
                  return VISIBILITY.HIDDEN;
              case 'collapse':
                  return VISIBILITY.COLLAPSE;
              case 'visible':
              default:
                  return VISIBILITY.VISIBLE;
          }
      }
  };

  var WORD_BREAK;
  (function (WORD_BREAK) {
      WORD_BREAK["NORMAL"] = "normal";
      WORD_BREAK["BREAK_ALL"] = "break-all";
      WORD_BREAK["KEEP_ALL"] = "keep-all";
  })(WORD_BREAK || (WORD_BREAK = {}));
  var wordBreak = {
      name: 'word-break',
      initialValue: 'normal',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (wordBreak) {
          switch (wordBreak) {
              case 'break-all':
                  return WORD_BREAK.BREAK_ALL;
              case 'keep-all':
                  return WORD_BREAK.KEEP_ALL;
              case 'normal':
              default:
                  return WORD_BREAK.NORMAL;
          }
      }
  };

  var zIndex = {
      name: 'z-index',
      initialValue: 'auto',
      prefix: false,
      type: PropertyDescriptorParsingType.VALUE,
      parse: function (token) {
          if (token.type === TokenType.IDENT_TOKEN) {
              return { auto: true, order: 0 };
          }
          if (isNumberToken(token)) {
              return { auto: false, order: token.number };
          }
          throw new Error("Invalid z-index number parsed");
      }
  };

  var opacity = {
      name: 'opacity',
      initialValue: '1',
      type: PropertyDescriptorParsingType.VALUE,
      prefix: false,
      parse: function (token) {
          if (isNumberToken(token)) {
              return token.number;
          }
          return 1;
      }
  };

  var textDecorationColor = {
      name: "text-decoration-color",
      initialValue: 'transparent',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'color'
  };

  var textDecorationLine = {
      name: 'text-decoration-line',
      initialValue: 'none',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          return tokens
              .filter(isIdentToken)
              .map(function (token) {
              switch (token.value) {
                  case 'underline':
                      return 1 /* UNDERLINE */;
                  case 'overline':
                      return 2 /* OVERLINE */;
                  case 'line-through':
                      return 3 /* LINE_THROUGH */;
                  case 'none':
                      return 4 /* BLINK */;
              }
              return 0 /* NONE */;
          })
              .filter(function (line) { return line !== 0 /* NONE */; });
      }
  };

  var fontFamily = {
      name: "font-family",
      initialValue: '',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          var accumulator = [];
          var results = [];
          tokens.forEach(function (token) {
              switch (token.type) {
                  case TokenType.IDENT_TOKEN:
                  case TokenType.STRING_TOKEN:
                      accumulator.push(token.value);
                      break;
                  case TokenType.NUMBER_TOKEN:
                      accumulator.push(token.number.toString());
                      break;
                  case TokenType.COMMA_TOKEN:
                      results.push(accumulator.join(' '));
                      accumulator.length = 0;
                      break;
              }
          });
          if (accumulator.length) {
              results.push(accumulator.join(' '));
          }
          return results.map(function (result) { return (result.indexOf(' ') === -1 ? result : "'" + result + "'"); });
      }
  };

  var fontSize = {
      name: "font-size",
      initialValue: '0',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'length'
  };

  var fontWeight = {
      name: 'font-weight',
      initialValue: 'normal',
      type: PropertyDescriptorParsingType.VALUE,
      prefix: false,
      parse: function (token) {
          if (isNumberToken(token)) {
              return token.number;
          }
          if (isIdentToken(token)) {
              switch (token.value) {
                  case 'bold':
                      return 700;
                  case 'normal':
                  default:
                      return 400;
              }
          }
          return 400;
      }
  };

  var fontVariant = {
      name: 'font-variant',
      initialValue: 'none',
      type: PropertyDescriptorParsingType.LIST,
      prefix: false,
      parse: function (tokens) {
          return tokens.filter(isIdentToken).map(function (token) { return token.value; });
      }
  };

  var FONT_STYLE;
  (function (FONT_STYLE) {
      FONT_STYLE["NORMAL"] = "normal";
      FONT_STYLE["ITALIC"] = "italic";
      FONT_STYLE["OBLIQUE"] = "oblique";
  })(FONT_STYLE || (FONT_STYLE = {}));
  var fontStyle = {
      name: 'font-style',
      initialValue: 'normal',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function (overflow) {
          switch (overflow) {
              case 'oblique':
                  return FONT_STYLE.OBLIQUE;
              case 'italic':
                  return FONT_STYLE.ITALIC;
              case 'normal':
              default:
                  return FONT_STYLE.NORMAL;
          }
      }
  };

  var contains$1 = function (bit, value) { return (bit & value) !== 0; };

  var content = {
      name: 'content',
      initialValue: 'none',
      type: PropertyDescriptorParsingType.LIST,
      prefix: false,
      parse: function (tokens) {
          if (tokens.length === 0) {
              return [];
          }
          var first = tokens[0];
          if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
              return [];
          }
          return tokens;
      }
  };

  var counterIncrement = {
      name: 'counter-increment',
      initialValue: 'none',
      prefix: true,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          if (tokens.length === 0) {
              return null;
          }
          var first = tokens[0];
          if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
              return null;
          }
          var increments = [];
          var filtered = tokens.filter(nonWhiteSpace);
          for (var i = 0; i < filtered.length; i++) {
              var counter = filtered[i];
              var next = filtered[i + 1];
              if (counter.type === TokenType.IDENT_TOKEN) {
                  var increment = next && isNumberToken(next) ? next.number : 1;
                  increments.push({ counter: counter.value, increment: increment });
              }
          }
          return increments;
      }
  };

  var counterReset = {
      name: 'counter-reset',
      initialValue: 'none',
      prefix: true,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          if (tokens.length === 0) {
              return [];
          }
          var resets = [];
          var filtered = tokens.filter(nonWhiteSpace);
          for (var i = 0; i < filtered.length; i++) {
              var counter = filtered[i];
              var next = filtered[i + 1];
              if (isIdentToken(counter) && counter.value !== 'none') {
                  var reset = next && isNumberToken(next) ? next.number : 0;
                  resets.push({ counter: counter.value, reset: reset });
              }
          }
          return resets;
      }
  };

  var quotes = {
      name: 'quotes',
      initialValue: 'none',
      prefix: true,
      type: PropertyDescriptorParsingType.LIST,
      parse: function (tokens) {
          if (tokens.length === 0) {
              return null;
          }
          var first = tokens[0];
          if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
              return null;
          }
          var quotes = [];
          var filtered = tokens.filter(isStringToken);
          if (filtered.length % 2 !== 0) {
              return null;
          }
          for (var i = 0; i < filtered.length; i += 2) {
              var open_1 = filtered[i].value;
              var close_1 = filtered[i + 1].value;
              quotes.push({ open: open_1, close: close_1 });
          }
          return quotes;
      }
  };
  var getQuote = function (quotes, depth, open) {
      if (!quotes) {
          return '';
      }
      var quote = quotes[Math.min(depth, quotes.length - 1)];
      if (!quote) {
          return '';
      }
      return open ? quote.open : quote.close;
  };

  var boxShadow = {
      name: 'box-shadow',
      initialValue: 'none',
      type: PropertyDescriptorParsingType.LIST,
      prefix: false,
      parse: function (tokens) {
          if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
              return [];
          }
          return parseFunctionArgs(tokens).map(function (values) {
              var shadow = {
                  color: 0x000000ff,
                  offsetX: ZERO_LENGTH,
                  offsetY: ZERO_LENGTH,
                  blur: ZERO_LENGTH,
                  spread: ZERO_LENGTH,
                  inset: false
              };
              var c = 0;
              for (var i = 0; i < values.length; i++) {
                  var token = values[i];
                  if (isIdentWithValue(token, 'inset')) {
                      shadow.inset = true;
                  }
                  else if (isLength$1(token)) {
                      if (c === 0) {
                          shadow.offsetX = token;
                      }
                      else if (c === 1) {
                          shadow.offsetY = token;
                      }
                      else if (c === 2) {
                          shadow.blur = token;
                      }
                      else {
                          shadow.spread = token;
                      }
                      c++;
                  }
                  else {
                      shadow.color = color$1.parse(token);
                  }
              }
              return shadow;
          });
      }
  };

  var CSSParsedDeclaration = /** @class */ (function () {
      function CSSParsedDeclaration(declaration) {
          this.backgroundClip = parse(backgroundClip, declaration.backgroundClip);
          this.backgroundColor = parse(backgroundColor, declaration.backgroundColor);
          this.backgroundImage = parse(backgroundImage, declaration.backgroundImage);
          this.backgroundOrigin = parse(backgroundOrigin, declaration.backgroundOrigin);
          this.backgroundPosition = parse(backgroundPosition, declaration.backgroundPosition);
          this.backgroundRepeat = parse(backgroundRepeat, declaration.backgroundRepeat);
          this.backgroundSize = parse(backgroundSize, declaration.backgroundSize);
          this.borderTopColor = parse(borderTopColor, declaration.borderTopColor);
          this.borderRightColor = parse(borderRightColor, declaration.borderRightColor);
          this.borderBottomColor = parse(borderBottomColor, declaration.borderBottomColor);
          this.borderLeftColor = parse(borderLeftColor, declaration.borderLeftColor);
          this.borderTopLeftRadius = parse(borderTopLeftRadius, declaration.borderTopLeftRadius);
          this.borderTopRightRadius = parse(borderTopRightRadius, declaration.borderTopRightRadius);
          this.borderBottomRightRadius = parse(borderBottomRightRadius, declaration.borderBottomRightRadius);
          this.borderBottomLeftRadius = parse(borderBottomLeftRadius, declaration.borderBottomLeftRadius);
          this.borderTopStyle = parse(borderTopStyle, declaration.borderTopStyle);
          this.borderRightStyle = parse(borderRightStyle, declaration.borderRightStyle);
          this.borderBottomStyle = parse(borderBottomStyle, declaration.borderBottomStyle);
          this.borderLeftStyle = parse(borderLeftStyle, declaration.borderLeftStyle);
          this.borderTopWidth = parse(borderTopWidth, declaration.borderTopWidth);
          this.borderRightWidth = parse(borderRightWidth, declaration.borderRightWidth);
          this.borderBottomWidth = parse(borderBottomWidth, declaration.borderBottomWidth);
          this.borderLeftWidth = parse(borderLeftWidth, declaration.borderLeftWidth);
          this.boxShadow = parse(boxShadow, declaration.boxShadow);
          this.color = parse(color$1$1, declaration.color);
          this.display = parse(display, declaration.display);
          this.float = parse(float, declaration.cssFloat);
          this.fontFamily = parse(fontFamily, declaration.fontFamily);
          this.fontSize = parse(fontSize, declaration.fontSize);
          this.fontStyle = parse(fontStyle, declaration.fontStyle);
          this.fontVariant = parse(fontVariant, declaration.fontVariant);
          this.fontWeight = parse(fontWeight, declaration.fontWeight);
          this.letterSpacing = parse(letterSpacing, declaration.letterSpacing);
          this.lineBreak = parse(lineBreak, declaration.lineBreak);
          this.lineHeight = parse(lineHeight, declaration.lineHeight);
          this.listStyleImage = parse(listStyleImage, declaration.listStyleImage);
          this.listStylePosition = parse(listStylePosition, declaration.listStylePosition);
          this.listStyleType = parse(listStyleType, declaration.listStyleType);
          this.marginTop = parse(marginTop, declaration.marginTop);
          this.marginRight = parse(marginRight, declaration.marginRight);
          this.marginBottom = parse(marginBottom, declaration.marginBottom);
          this.marginLeft = parse(marginLeft, declaration.marginLeft);
          this.opacity = parse(opacity, declaration.opacity);
          var overflowTuple = parse(overflow, declaration.overflow);
          this.overflowX = overflowTuple[0];
          this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
          this.overflowWrap = parse(overflowWrap, declaration.overflowWrap);
          this.paddingTop = parse(paddingTop, declaration.paddingTop);
          this.paddingRight = parse(paddingRight, declaration.paddingRight);
          this.paddingBottom = parse(paddingBottom, declaration.paddingBottom);
          this.paddingLeft = parse(paddingLeft, declaration.paddingLeft);
          this.position = parse(position, declaration.position);
          this.textAlign = parse(textAlign, declaration.textAlign);
          this.textDecorationColor = parse(textDecorationColor, declaration.textDecorationColor || declaration.color);
          this.textDecorationLine = parse(textDecorationLine, declaration.textDecorationLine);
          this.textShadow = parse(textShadow, declaration.textShadow);
          this.textTransform = parse(textTransform, declaration.textTransform);
          this.transform = parse(transform, declaration.transform);
          this.transformOrigin = parse(transformOrigin, declaration.transformOrigin);
          this.visibility = parse(visibility, declaration.visibility);
          this.wordBreak = parse(wordBreak, declaration.wordBreak);
          this.zIndex = parse(zIndex, declaration.zIndex);
      }
      CSSParsedDeclaration.prototype.isVisible = function () {
          return this.display > 0 && this.opacity > 0 && this.visibility === VISIBILITY.VISIBLE;
      };
      CSSParsedDeclaration.prototype.isTransparent = function () {
          return isTransparent(this.backgroundColor);
      };
      CSSParsedDeclaration.prototype.isTransformed = function () {
          return this.transform !== null;
      };
      CSSParsedDeclaration.prototype.isPositioned = function () {
          return this.position !== POSITION.STATIC;
      };
      CSSParsedDeclaration.prototype.isPositionedWithZIndex = function () {
          return this.isPositioned() && !this.zIndex.auto;
      };
      CSSParsedDeclaration.prototype.isFloating = function () {
          return this.float !== FLOAT.NONE;
      };
      CSSParsedDeclaration.prototype.isInlineLevel = function () {
          return (contains$1(this.display, 4 /* INLINE */) ||
              contains$1(this.display, 33554432 /* INLINE_BLOCK */) ||
              contains$1(this.display, 268435456 /* INLINE_FLEX */) ||
              contains$1(this.display, 536870912 /* INLINE_GRID */) ||
              contains$1(this.display, 67108864 /* INLINE_LIST_ITEM */) ||
              contains$1(this.display, 134217728 /* INLINE_TABLE */));
      };
      return CSSParsedDeclaration;
  }());
  var CSSParsedPseudoDeclaration = /** @class */ (function () {
      function CSSParsedPseudoDeclaration(declaration) {
          this.content = parse(content, declaration.content);
          this.quotes = parse(quotes, declaration.quotes);
      }
      return CSSParsedPseudoDeclaration;
  }());
  var CSSParsedCounterDeclaration = /** @class */ (function () {
      function CSSParsedCounterDeclaration(declaration) {
          this.counterIncrement = parse(counterIncrement, declaration.counterIncrement);
          this.counterReset = parse(counterReset, declaration.counterReset);
      }
      return CSSParsedCounterDeclaration;
  }());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var parse = function (descriptor, style) {
      var tokenizer = new Tokenizer();
      var value = style !== null && typeof style !== 'undefined' ? style.toString() : descriptor.initialValue;
      tokenizer.write(value);
      var parser = new Parser(tokenizer.read());
      switch (descriptor.type) {
          case PropertyDescriptorParsingType.IDENT_VALUE:
              var token = parser.parseComponentValue();
              return descriptor.parse(isIdentToken(token) ? token.value : descriptor.initialValue);
          case PropertyDescriptorParsingType.VALUE:
              return descriptor.parse(parser.parseComponentValue());
          case PropertyDescriptorParsingType.LIST:
              return descriptor.parse(parser.parseComponentValues());
          case PropertyDescriptorParsingType.TOKEN_VALUE:
              return parser.parseComponentValue();
          case PropertyDescriptorParsingType.TYPE_VALUE:
              switch (descriptor.format) {
                  case 'angle':
                      return angle.parse(parser.parseComponentValue());
                  case 'color':
                      return color$1.parse(parser.parseComponentValue());
                  case 'image':
                      return image.parse(parser.parseComponentValue());
                  case 'length':
                      var length_1 = parser.parseComponentValue();
                      return isLength$1(length_1) ? length_1 : ZERO_LENGTH;
                  case 'length-percentage':
                      var value_1 = parser.parseComponentValue();
                      return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
              }
      }
      throw new Error("Attempting to parse unsupported css format type " + descriptor.format);
  };

  var ElementContainer = /** @class */ (function () {
      function ElementContainer(element) {
          this.styles = new CSSParsedDeclaration(window.getComputedStyle(element, null));
          this.textNodes = [];
          this.elements = [];
          if (this.styles.transform !== null && isHTMLElementNode(element)) {
              // getBoundingClientRect takes transforms into account
              element.style.transform = 'none';
          }
          this.bounds = parseBounds(element);
          this.flags = 0;
      }
      return ElementContainer;
  }());

  var TextBounds = /** @class */ (function () {
      function TextBounds(text, bounds) {
          this.text = text;
          this.bounds = bounds;
      }
      return TextBounds;
  }());
  var parseTextBounds = function (value, styles, node) {
      var textList = breakText(value, styles);
      var textBounds = [];
      var offset = 0;
      textList.forEach(function (text) {
          if (styles.textDecorationLine.length || text.trim().length > 0) {
              if (FEATURES.SUPPORT_RANGE_BOUNDS) {
                  textBounds.push(new TextBounds(text, getRangeBounds(node, offset, text.length)));
              }
              else {
                  var replacementNode = node.splitText(text.length);
                  textBounds.push(new TextBounds(text, getWrapperBounds(node)));
                  node = replacementNode;
              }
          }
          else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
              node = node.splitText(text.length);
          }
          offset += text.length;
      });
      return textBounds;
  };
  var getWrapperBounds = function (node) {
      var ownerDocument = node.ownerDocument;
      if (ownerDocument) {
          var wrapper = ownerDocument.createElement('html2canvaswrapper');
          wrapper.appendChild(node.cloneNode(true));
          var parentNode = node.parentNode;
          if (parentNode) {
              parentNode.replaceChild(wrapper, node);
              var bounds = parseBounds(wrapper);
              if (wrapper.firstChild) {
                  parentNode.replaceChild(wrapper.firstChild, wrapper);
              }
              return bounds;
          }
      }
      return new Bounds(0, 0, 0, 0);
  };
  var getRangeBounds = function (node, offset, length) {
      var ownerDocument = node.ownerDocument;
      if (!ownerDocument) {
          throw new Error('Node has no owner document');
      }
      var range = ownerDocument.createRange();
      range.setStart(node, offset);
      range.setEnd(node, offset + length);
      return Bounds.fromClientRect(range.getBoundingClientRect());
  };
  var breakText = function (value, styles) {
      return styles.letterSpacing !== 0 ? toCodePoints(value).map(function (i) { return fromCodePoint(i); }) : breakWords(value, styles);
  };
  var breakWords = function (str, styles) {
      var breaker = LineBreaker(str, {
          lineBreak: styles.lineBreak,
          wordBreak: styles.overflowWrap === OVERFLOW_WRAP.BREAK_WORD ? 'break-word' : styles.wordBreak
      });
      var words = [];
      var bk;
      while (!(bk = breaker.next()).done) {
          if (bk.value) {
              words.push(bk.value.slice());
          }
      }
      return words;
  };

  var TextContainer = /** @class */ (function () {
      function TextContainer(node, styles) {
          this.text = transform$1(node.data, styles.textTransform);
          this.textBounds = parseTextBounds(this.text, styles, node);
      }
      return TextContainer;
  }());
  var transform$1 = function (text, transform) {
      switch (transform) {
          case TEXT_TRANSFORM.LOWERCASE:
              return text.toLowerCase();
          case TEXT_TRANSFORM.CAPITALIZE:
              return text.replace(CAPITALIZE, capitalize);
          case TEXT_TRANSFORM.UPPERCASE:
              return text.toUpperCase();
          default:
              return text;
      }
  };
  var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
  var capitalize = function (m, p1, p2) {
      if (m.length > 0) {
          return p1 + p2.toUpperCase();
      }
      return m;
  };

  var ImageElementContainer = /** @class */ (function (_super) {
      __extends(ImageElementContainer, _super);
      function ImageElementContainer(img) {
          var _this = _super.call(this, img) || this;
          _this.src = img.currentSrc || img.src;
          _this.intrinsicWidth = img.naturalWidth;
          _this.intrinsicHeight = img.naturalHeight;
          CacheStorage.getInstance().addImage(_this.src);
          return _this;
      }
      return ImageElementContainer;
  }(ElementContainer));

  var CanvasElementContainer = /** @class */ (function (_super) {
      __extends(CanvasElementContainer, _super);
      function CanvasElementContainer(canvas) {
          var _this = _super.call(this, canvas) || this;
          _this.canvas = canvas;
          _this.intrinsicWidth = canvas.width;
          _this.intrinsicHeight = canvas.height;
          return _this;
      }
      return CanvasElementContainer;
  }(ElementContainer));

  var SVGElementContainer = /** @class */ (function (_super) {
      __extends(SVGElementContainer, _super);
      function SVGElementContainer(img) {
          var _this = _super.call(this, img) || this;
          var s = new XMLSerializer();
          _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
          _this.intrinsicWidth = img.width.baseVal.value;
          _this.intrinsicHeight = img.height.baseVal.value;
          CacheStorage.getInstance().addImage(_this.svg);
          return _this;
      }
      return SVGElementContainer;
  }(ElementContainer));

  var LIElementContainer = /** @class */ (function (_super) {
      __extends(LIElementContainer, _super);
      function LIElementContainer(element) {
          var _this = _super.call(this, element) || this;
          _this.value = element.value;
          return _this;
      }
      return LIElementContainer;
  }(ElementContainer));

  var OLElementContainer = /** @class */ (function (_super) {
      __extends(OLElementContainer, _super);
      function OLElementContainer(element) {
          var _this = _super.call(this, element) || this;
          _this.start = element.start;
          _this.reversed = typeof element.reversed === 'boolean' && element.reversed === true;
          return _this;
      }
      return OLElementContainer;
  }(ElementContainer));

  var CHECKBOX_BORDER_RADIUS = [
      {
          type: TokenType.DIMENSION_TOKEN,
          flags: 0,
          unit: 'px',
          number: 3
      }
  ];
  var RADIO_BORDER_RADIUS = [
      {
          type: TokenType.PERCENTAGE_TOKEN,
          flags: 0,
          number: 50
      }
  ];
  var reformatInputBounds = function (bounds) {
      if (bounds.width > bounds.height) {
          return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
      }
      else if (bounds.width < bounds.height) {
          return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
      }
      return bounds;
  };
  var getInputValue = function (node) {
      var value = node.type === PASSWORD ? new Array(node.value.length + 1).join('\u2022') : node.value;
      return value.length === 0 ? node.placeholder || '' : value;
  };
  var CHECKBOX = 'checkbox';
  var RADIO = 'radio';
  var PASSWORD = 'password';
  var INPUT_COLOR = 0x2a2a2aff;
  var InputElementContainer = /** @class */ (function (_super) {
      __extends(InputElementContainer, _super);
      function InputElementContainer(input) {
          var _this = _super.call(this, input) || this;
          _this.type = input.type.toLowerCase();
          _this.checked = input.checked;
          _this.value = getInputValue(input);
          if (_this.type === CHECKBOX || _this.type === RADIO) {
              _this.styles.backgroundColor = 0xdededeff;
              _this.styles.borderTopColor = _this.styles.borderRightColor = _this.styles.borderBottomColor = _this.styles.borderLeftColor = 0xa5a5a5ff;
              _this.styles.borderTopWidth = _this.styles.borderRightWidth = _this.styles.borderBottomWidth = _this.styles.borderLeftWidth = 1;
              _this.styles.borderTopStyle = _this.styles.borderRightStyle = _this.styles.borderBottomStyle = _this.styles.borderLeftStyle =
                  BORDER_STYLE.SOLID;
              _this.styles.backgroundClip = [BACKGROUND_CLIP.BORDER_BOX];
              _this.styles.backgroundOrigin = [0 /* BORDER_BOX */];
              _this.bounds = reformatInputBounds(_this.bounds);
          }
          switch (_this.type) {
              case CHECKBOX:
                  _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = CHECKBOX_BORDER_RADIUS;
                  break;
              case RADIO:
                  _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = RADIO_BORDER_RADIUS;
                  break;
          }
          return _this;
      }
      return InputElementContainer;
  }(ElementContainer));

  var SelectElementContainer = /** @class */ (function (_super) {
      __extends(SelectElementContainer, _super);
      function SelectElementContainer(element) {
          var _this = _super.call(this, element) || this;
          var option = element.options[element.selectedIndex || 0];
          _this.value = option ? option.text || '' : '';
          return _this;
      }
      return SelectElementContainer;
  }(ElementContainer));

  var TextareaElementContainer = /** @class */ (function (_super) {
      __extends(TextareaElementContainer, _super);
      function TextareaElementContainer(element) {
          var _this = _super.call(this, element) || this;
          _this.value = element.value;
          return _this;
      }
      return TextareaElementContainer;
  }(ElementContainer));

  var parseColor = function (value) { return color$1.parse(Parser.create(value).parseComponentValue()); };
  var IFrameElementContainer = /** @class */ (function (_super) {
      __extends(IFrameElementContainer, _super);
      function IFrameElementContainer(iframe) {
          var _this = _super.call(this, iframe) || this;
          _this.src = iframe.src;
          _this.width = parseInt(iframe.width, 10) || 0;
          _this.height = parseInt(iframe.height, 10) || 0;
          _this.backgroundColor = _this.styles.backgroundColor;
          try {
              if (iframe.contentWindow &&
                  iframe.contentWindow.document &&
                  iframe.contentWindow.document.documentElement) {
                  _this.tree = parseTree(iframe.contentWindow.document.documentElement);
                  // http://www.w3.org/TR/css3-background/#special-backgrounds
                  var documentBackgroundColor = iframe.contentWindow.document.documentElement
                      ? parseColor(getComputedStyle(iframe.contentWindow.document.documentElement)
                          .backgroundColor)
                      : COLORS.TRANSPARENT;
                  var bodyBackgroundColor = iframe.contentWindow.document.body
                      ? parseColor(getComputedStyle(iframe.contentWindow.document.body).backgroundColor)
                      : COLORS.TRANSPARENT;
                  _this.backgroundColor = isTransparent(documentBackgroundColor)
                      ? isTransparent(bodyBackgroundColor)
                          ? _this.styles.backgroundColor
                          : bodyBackgroundColor
                      : documentBackgroundColor;
              }
          }
          catch (e) { }
          return _this;
      }
      return IFrameElementContainer;
  }(ElementContainer));

  var LIST_OWNERS = ['OL', 'UL', 'MENU'];
  var parseNodeTree = function (node, parent, root) {
      for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
          nextNode = childNode.nextSibling;
          if (isTextNode(childNode) && childNode.data.trim().length > 0) {
              parent.textNodes.push(new TextContainer(childNode, parent.styles));
          }
          else if (isElementNode(childNode)) {
              var container = createContainer(childNode);
              if (container.styles.isVisible()) {
                  if (createsRealStackingContext(childNode, container, root)) {
                      container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
                  }
                  else if (createsStackingContext(container.styles)) {
                      container.flags |= 2 /* CREATES_STACKING_CONTEXT */;
                  }
                  if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                      container.flags |= 8 /* IS_LIST_OWNER */;
                  }
                  parent.elements.push(container);
                  if (!isTextareaElement(childNode) && !isSVGElement(childNode) && !isSelectElement(childNode)) {
                      parseNodeTree(childNode, container, root);
                  }
              }
          }
      }
  };
  var createContainer = function (element) {
      if (isImageElement(element)) {
          return new ImageElementContainer(element);
      }
      if (isCanvasElement(element)) {
          return new CanvasElementContainer(element);
      }
      if (isSVGElement(element)) {
          return new SVGElementContainer(element);
      }
      if (isLIElement(element)) {
          return new LIElementContainer(element);
      }
      if (isOLElement(element)) {
          return new OLElementContainer(element);
      }
      if (isInputElement(element)) {
          return new InputElementContainer(element);
      }
      if (isSelectElement(element)) {
          return new SelectElementContainer(element);
      }
      if (isTextareaElement(element)) {
          return new TextareaElementContainer(element);
      }
      if (isIFrameElement(element)) {
          return new IFrameElementContainer(element);
      }
      return new ElementContainer(element);
  };
  var parseTree = function (element) {
      var container = createContainer(element);
      container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
      parseNodeTree(element, container, container);
      return container;
  };
  var createsRealStackingContext = function (node, container, root) {
      return (container.styles.isPositionedWithZIndex() ||
          container.styles.opacity < 1 ||
          container.styles.isTransformed() ||
          (isBodyElement(node) && root.styles.isTransparent()));
  };
  var createsStackingContext = function (styles) { return styles.isPositioned() || styles.isFloating(); };
  var isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
  var isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
  var isHTMLElementNode = function (node) {
      return isElementNode(node) && typeof node.style !== 'undefined' && !isSVGElementNode(node);
  };
  var isSVGElementNode = function (element) {
      return typeof element.className === 'object';
  };
  var isLIElement = function (node) { return node.tagName === 'LI'; };
  var isOLElement = function (node) { return node.tagName === 'OL'; };
  var isInputElement = function (node) { return node.tagName === 'INPUT'; };
  var isHTMLElement$1 = function (node) { return node.tagName === 'HTML'; };
  var isSVGElement = function (node) { return node.tagName === 'svg'; };
  var isBodyElement = function (node) { return node.tagName === 'BODY'; };
  var isCanvasElement = function (node) { return node.tagName === 'CANVAS'; };
  var isImageElement = function (node) { return node.tagName === 'IMG'; };
  var isIFrameElement = function (node) { return node.tagName === 'IFRAME'; };
  var isStyleElement = function (node) { return node.tagName === 'STYLE'; };
  var isScriptElement = function (node) { return node.tagName === 'SCRIPT'; };
  var isTextareaElement = function (node) { return node.tagName === 'TEXTAREA'; };
  var isSelectElement = function (node) { return node.tagName === 'SELECT'; };

  var CounterState = /** @class */ (function () {
      function CounterState() {
          this.counters = {};
      }
      CounterState.prototype.getCounterValue = function (name) {
          var counter = this.counters[name];
          if (counter && counter.length) {
              return counter[counter.length - 1];
          }
          return 1;
      };
      CounterState.prototype.getCounterValues = function (name) {
          var counter = this.counters[name];
          return counter ? counter : [];
      };
      CounterState.prototype.pop = function (counters) {
          var _this = this;
          counters.forEach(function (counter) { return _this.counters[counter].pop(); });
      };
      CounterState.prototype.parse = function (style) {
          var _this = this;
          var counterIncrement = style.counterIncrement;
          var counterReset = style.counterReset;
          var canReset = true;
          if (counterIncrement !== null) {
              counterIncrement.forEach(function (entry) {
                  var counter = _this.counters[entry.counter];
                  if (counter && entry.increment !== 0) {
                      canReset = false;
                      counter[Math.max(0, counter.length - 1)] += entry.increment;
                  }
              });
          }
          var counterNames = [];
          if (canReset) {
              counterReset.forEach(function (entry) {
                  var counter = _this.counters[entry.counter];
                  counterNames.push(entry.counter);
                  if (!counter) {
                      counter = _this.counters[entry.counter] = [];
                  }
                  counter.push(entry.reset);
              });
          }
          return counterNames;
      };
      return CounterState;
  }());
  var ROMAN_UPPER = {
      integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
      values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  };
  var ARMENIAN = {
      integers: [
          9000,
          8000,
          7000,
          6000,
          5000,
          4000,
          3000,
          2000,
          1000,
          900,
          800,
          700,
          600,
          500,
          400,
          300,
          200,
          100,
          90,
          80,
          70,
          60,
          50,
          40,
          30,
          20,
          10,
          9,
          8,
          7,
          6,
          5,
          4,
          3,
          2,
          1
      ],
      values: [
          'Ք',
          'Փ',
          'Ւ',
          'Ց',
          'Ր',
          'Տ',
          'Վ',
          'Ս',
          'Ռ',
          'Ջ',
          'Պ',
          'Չ',
          'Ո',
          'Շ',
          'Ն',
          'Յ',
          'Մ',
          'Ճ',
          'Ղ',
          'Ձ',
          'Հ',
          'Կ',
          'Ծ',
          'Խ',
          'Լ',
          'Ի',
          'Ժ',
          'Թ',
          'Ը',
          'Է',
          'Զ',
          'Ե',
          'Դ',
          'Գ',
          'Բ',
          'Ա'
      ]
  };
  var HEBREW = {
      integers: [
          10000,
          9000,
          8000,
          7000,
          6000,
          5000,
          4000,
          3000,
          2000,
          1000,
          400,
          300,
          200,
          100,
          90,
          80,
          70,
          60,
          50,
          40,
          30,
          20,
          19,
          18,
          17,
          16,
          15,
          10,
          9,
          8,
          7,
          6,
          5,
          4,
          3,
          2,
          1
      ],
      values: [
          'י׳',
          'ט׳',
          'ח׳',
          'ז׳',
          'ו׳',
          'ה׳',
          'ד׳',
          'ג׳',
          'ב׳',
          'א׳',
          'ת',
          'ש',
          'ר',
          'ק',
          'צ',
          'פ',
          'ע',
          'ס',
          'נ',
          'מ',
          'ל',
          'כ',
          'יט',
          'יח',
          'יז',
          'טז',
          'טו',
          'י',
          'ט',
          'ח',
          'ז',
          'ו',
          'ה',
          'ד',
          'ג',
          'ב',
          'א'
      ]
  };
  var GEORGIAN = {
      integers: [
          10000,
          9000,
          8000,
          7000,
          6000,
          5000,
          4000,
          3000,
          2000,
          1000,
          900,
          800,
          700,
          600,
          500,
          400,
          300,
          200,
          100,
          90,
          80,
          70,
          60,
          50,
          40,
          30,
          20,
          10,
          9,
          8,
          7,
          6,
          5,
          4,
          3,
          2,
          1
      ],
      values: [
          'ჵ',
          'ჰ',
          'ჯ',
          'ჴ',
          'ხ',
          'ჭ',
          'წ',
          'ძ',
          'ც',
          'ჩ',
          'შ',
          'ყ',
          'ღ',
          'ქ',
          'ფ',
          'ჳ',
          'ტ',
          'ს',
          'რ',
          'ჟ',
          'პ',
          'ო',
          'ჲ',
          'ნ',
          'მ',
          'ლ',
          'კ',
          'ი',
          'თ',
          'ჱ',
          'ზ',
          'ვ',
          'ე',
          'დ',
          'გ',
          'ბ',
          'ა'
      ]
  };
  var createAdditiveCounter = function (value, min, max, symbols, fallback, suffix) {
      if (value < min || value > max) {
          return createCounterText(value, fallback, suffix.length > 0);
      }
      return (symbols.integers.reduce(function (string, integer, index) {
          while (value >= integer) {
              value -= integer;
              string += symbols.values[index];
          }
          return string;
      }, '') + suffix);
  };
  var createCounterStyleWithSymbolResolver = function (value, codePointRangeLength, isNumeric, resolver) {
      var string = '';
      do {
          if (!isNumeric) {
              value--;
          }
          string = resolver(value) + string;
          value /= codePointRangeLength;
      } while (value * codePointRangeLength >= codePointRangeLength);
      return string;
  };
  var createCounterStyleFromRange = function (value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
      var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
      return ((value < 0 ? '-' : '') +
          (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function (codePoint) {
              return fromCodePoint(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
          }) +
              suffix));
  };
  var createCounterStyleFromSymbols = function (value, symbols, suffix) {
      if (suffix === void 0) { suffix = '. '; }
      var codePointRangeLength = symbols.length;
      return (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function (codePoint) { return symbols[Math.floor(codePoint % codePointRangeLength)]; }) + suffix);
  };
  var CJK_ZEROS = 1 << 0;
  var CJK_TEN_COEFFICIENTS = 1 << 1;
  var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
  var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
  var createCJKCounter = function (value, numbers, multipliers, negativeSign, suffix, flags) {
      if (value < -9999 || value > 9999) {
          return createCounterText(value, LIST_STYLE_TYPE.CJK_DECIMAL, suffix.length > 0);
      }
      var tmp = Math.abs(value);
      var string = suffix;
      if (tmp === 0) {
          return numbers[0] + string;
      }
      for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
          var coefficient = tmp % 10;
          if (coefficient === 0 && contains$1(flags, CJK_ZEROS) && string !== '') {
              string = numbers[coefficient] + string;
          }
          else if (coefficient > 1 ||
              (coefficient === 1 && digit === 0) ||
              (coefficient === 1 && digit === 1 && contains$1(flags, CJK_TEN_COEFFICIENTS)) ||
              (coefficient === 1 && digit === 1 && contains$1(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100) ||
              (coefficient === 1 && digit > 1 && contains$1(flags, CJK_HUNDRED_COEFFICIENTS))) {
              string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : '') + string;
          }
          else if (coefficient === 1 && digit > 0) {
              string = multipliers[digit - 1] + string;
          }
          tmp = Math.floor(tmp / 10);
      }
      return (value < 0 ? negativeSign : '') + string;
  };
  var CHINESE_INFORMAL_MULTIPLIERS = '十百千萬';
  var CHINESE_FORMAL_MULTIPLIERS = '拾佰仟萬';
  var JAPANESE_NEGATIVE = 'マイナス';
  var KOREAN_NEGATIVE = '마이너스';
  var createCounterText = function (value, type, appendSuffix) {
      var defaultSuffix = appendSuffix ? '. ' : '';
      var cjkSuffix = appendSuffix ? '、' : '';
      var koreanSuffix = appendSuffix ? ', ' : '';
      var spaceSuffix = appendSuffix ? ' ' : '';
      switch (type) {
          case LIST_STYLE_TYPE.DISC:
              return '•' + spaceSuffix;
          case LIST_STYLE_TYPE.CIRCLE:
              return '◦' + spaceSuffix;
          case LIST_STYLE_TYPE.SQUARE:
              return '◾' + spaceSuffix;
          case LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
              var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
              return string.length < 4 ? "0" + string : string;
          case LIST_STYLE_TYPE.CJK_DECIMAL:
              return createCounterStyleFromSymbols(value, '〇一二三四五六七八九', cjkSuffix);
          case LIST_STYLE_TYPE.LOWER_ROMAN:
              return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
          case LIST_STYLE_TYPE.UPPER_ROMAN:
              return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
          case LIST_STYLE_TYPE.LOWER_GREEK:
              return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
          case LIST_STYLE_TYPE.LOWER_ALPHA:
              return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
          case LIST_STYLE_TYPE.UPPER_ALPHA:
              return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
          case LIST_STYLE_TYPE.ARABIC_INDIC:
              return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
          case LIST_STYLE_TYPE.ARMENIAN:
          case LIST_STYLE_TYPE.UPPER_ARMENIAN:
              return createAdditiveCounter(value, 1, 9999, ARMENIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
          case LIST_STYLE_TYPE.LOWER_ARMENIAN:
              return createAdditiveCounter(value, 1, 9999, ARMENIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
          case LIST_STYLE_TYPE.BENGALI:
              return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
          case LIST_STYLE_TYPE.CAMBODIAN:
          case LIST_STYLE_TYPE.KHMER:
              return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
          case LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
              return createCounterStyleFromSymbols(value, '子丑寅卯辰巳午未申酉戌亥', cjkSuffix);
          case LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
              return createCounterStyleFromSymbols(value, '甲乙丙丁戊己庚辛壬癸', cjkSuffix);
          case LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:
          case LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
              return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
              return createCJKCounter(value, '零壹貳參肆伍陸柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
              return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
              return createCJKCounter(value, '零壹贰叁肆伍陆柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case LIST_STYLE_TYPE.JAPANESE_INFORMAL:
              return createCJKCounter(value, '〇一二三四五六七八九', '十百千万', JAPANESE_NEGATIVE, cjkSuffix, 0);
          case LIST_STYLE_TYPE.JAPANESE_FORMAL:
              return createCJKCounter(value, '零壱弐参四伍六七八九', '拾百千万', JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
          case LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
              return createCJKCounter(value, '영일이삼사오육칠팔구', '십백천만', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
          case LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
              return createCJKCounter(value, '零一二三四五六七八九', '十百千萬', KOREAN_NEGATIVE, koreanSuffix, 0);
          case LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
              return createCJKCounter(value, '零壹貳參四五六七八九', '拾百千', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
          case LIST_STYLE_TYPE.DEVANAGARI:
              return createCounterStyleFromRange(value, 0x966, 0x96f, true, defaultSuffix);
          case LIST_STYLE_TYPE.GEORGIAN:
              return createAdditiveCounter(value, 1, 19999, GEORGIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
          case LIST_STYLE_TYPE.GUJARATI:
              return createCounterStyleFromRange(value, 0xae6, 0xaef, true, defaultSuffix);
          case LIST_STYLE_TYPE.GURMUKHI:
              return createCounterStyleFromRange(value, 0xa66, 0xa6f, true, defaultSuffix);
          case LIST_STYLE_TYPE.HEBREW:
              return createAdditiveCounter(value, 1, 10999, HEBREW, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
          case LIST_STYLE_TYPE.HIRAGANA:
              return createCounterStyleFromSymbols(value, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
          case LIST_STYLE_TYPE.HIRAGANA_IROHA:
              return createCounterStyleFromSymbols(value, 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす');
          case LIST_STYLE_TYPE.KANNADA:
              return createCounterStyleFromRange(value, 0xce6, 0xcef, true, defaultSuffix);
          case LIST_STYLE_TYPE.KATAKANA:
              return createCounterStyleFromSymbols(value, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', cjkSuffix);
          case LIST_STYLE_TYPE.KATAKANA_IROHA:
              return createCounterStyleFromSymbols(value, 'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス', cjkSuffix);
          case LIST_STYLE_TYPE.LAO:
              return createCounterStyleFromRange(value, 0xed0, 0xed9, true, defaultSuffix);
          case LIST_STYLE_TYPE.MONGOLIAN:
              return createCounterStyleFromRange(value, 0x1810, 0x1819, true, defaultSuffix);
          case LIST_STYLE_TYPE.MYANMAR:
              return createCounterStyleFromRange(value, 0x1040, 0x1049, true, defaultSuffix);
          case LIST_STYLE_TYPE.ORIYA:
              return createCounterStyleFromRange(value, 0xb66, 0xb6f, true, defaultSuffix);
          case LIST_STYLE_TYPE.PERSIAN:
              return createCounterStyleFromRange(value, 0x6f0, 0x6f9, true, defaultSuffix);
          case LIST_STYLE_TYPE.TAMIL:
              return createCounterStyleFromRange(value, 0xbe6, 0xbef, true, defaultSuffix);
          case LIST_STYLE_TYPE.TELUGU:
              return createCounterStyleFromRange(value, 0xc66, 0xc6f, true, defaultSuffix);
          case LIST_STYLE_TYPE.THAI:
              return createCounterStyleFromRange(value, 0xe50, 0xe59, true, defaultSuffix);
          case LIST_STYLE_TYPE.TIBETAN:
              return createCounterStyleFromRange(value, 0xf20, 0xf29, true, defaultSuffix);
          case LIST_STYLE_TYPE.DECIMAL:
          default:
              return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
      }
  };

  var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';
  var DocumentCloner = /** @class */ (function () {
      function DocumentCloner(element, options) {
          this.options = options;
          this.scrolledElements = [];
          this.referenceElement = element;
          this.counters = new CounterState();
          this.quoteDepth = 0;
          if (!element.ownerDocument) {
              throw new Error('Cloned element does not have an owner document');
          }
          this.documentElement = this.cloneNode(element.ownerDocument.documentElement);
      }
      DocumentCloner.prototype.toIFrame = function (ownerDocument, windowSize) {
          var _this = this;
          var iframe = createIFrameContainer(ownerDocument, windowSize);
          if (!iframe.contentWindow) {
              return Promise.reject("Unable to find iframe window");
          }
          var scrollX = ownerDocument.defaultView.pageXOffset;
          var scrollY = ownerDocument.defaultView.pageYOffset;
          var cloneWindow = iframe.contentWindow;
          var documentClone = cloneWindow.document;
          /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
           if window url is about:blank, we can assign the url to current by writing onto the document
           */
          var iframeLoad = iframeLoader(iframe).then(function () { return __awaiter(_this, void 0, void 0, function () {
              var onclone;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          this.scrolledElements.forEach(restoreNodeScroll);
                          if (cloneWindow) {
                              cloneWindow.scrollTo(windowSize.left, windowSize.top);
                              if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) &&
                                  (cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                                  documentClone.documentElement.style.top = -windowSize.top + 'px';
                                  documentClone.documentElement.style.left = -windowSize.left + 'px';
                                  documentClone.documentElement.style.position = 'absolute';
                              }
                          }
                          onclone = this.options.onclone;
                          if (typeof this.clonedReferenceElement === 'undefined') {
                              return [2 /*return*/, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                          }
                          if (!(documentClone.fonts && documentClone.fonts.ready)) return [3 /*break*/, 2];
                          return [4 /*yield*/, documentClone.fonts.ready];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2:
                          if (typeof onclone === 'function') {
                              return [2 /*return*/, Promise.resolve()
                                      .then(function () { return onclone(documentClone); })
                                      .then(function () { return iframe; })];
                          }
                          return [2 /*return*/, iframe];
                  }
              });
          }); });
          documentClone.open();
          documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
          // Chrome scrolls the parent document for some reason after the write to the cloned window???
          restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
          documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
          documentClone.close();
          return iframeLoad;
      };
      DocumentCloner.prototype.createElementClone = function (node) {
          if (isCanvasElement(node)) {
              return this.createCanvasClone(node);
          }
          /*
          if (isIFrameElement(node)) {
              return this.createIFrameClone(node);
          }
  */
          if (isStyleElement(node)) {
              return this.createStyleClone(node);
          }
          var clone = node.cloneNode(false);
          // @ts-ignore
          if (isImageElement(clone) && clone.loading === 'lazy') {
              // @ts-ignore
              clone.loading = 'eager';
          }
          return clone;
      };
      DocumentCloner.prototype.createStyleClone = function (node) {
          try {
              var sheet = node.sheet;
              if (sheet && sheet.cssRules) {
                  var css = [].slice.call(sheet.cssRules, 0).reduce(function (css, rule) {
                      if (rule && typeof rule.cssText === 'string') {
                          return css + rule.cssText;
                      }
                      return css;
                  }, '');
                  var style = node.cloneNode(false);
                  style.textContent = css;
                  return style;
              }
          }
          catch (e) {
              // accessing node.sheet.cssRules throws a DOMException
              Logger.getInstance(this.options.id).error('Unable to access cssRules property', e);
              if (e.name !== 'SecurityError') {
                  throw e;
              }
          }
          return node.cloneNode(false);
      };
      DocumentCloner.prototype.createCanvasClone = function (canvas) {
          if (this.options.inlineImages && canvas.ownerDocument) {
              var img = canvas.ownerDocument.createElement('img');
              try {
                  img.src = canvas.toDataURL();
                  return img;
              }
              catch (e) {
                  Logger.getInstance(this.options.id).info("Unable to clone canvas contents, canvas is tainted");
              }
          }
          var clonedCanvas = canvas.cloneNode(false);
          try {
              clonedCanvas.width = canvas.width;
              clonedCanvas.height = canvas.height;
              var ctx = canvas.getContext('2d');
              var clonedCtx = clonedCanvas.getContext('2d');
              if (clonedCtx) {
                  if (ctx) {
                      clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                  }
                  else {
                      clonedCtx.drawImage(canvas, 0, 0);
                  }
              }
              return clonedCanvas;
          }
          catch (e) { }
          return clonedCanvas;
      };
      /*
      createIFrameClone(iframe: HTMLIFrameElement) {
          const tempIframe = <HTMLIFrameElement>iframe.cloneNode(false);
          const iframeKey = generateIframeKey();
          tempIframe.setAttribute('data-html2canvas-internal-iframe-key', iframeKey);

          const {width, height} = parseBounds(iframe);

          this.resourceLoader.cache[iframeKey] = getIframeDocumentElement(iframe, this.options)
              .then(documentElement => {
                  return this.renderer(
                      documentElement,
                      {
                          allowTaint: this.options.allowTaint,
                          backgroundColor: '#ffffff',
                          canvas: null,
                          imageTimeout: this.options.imageTimeout,
                          logging: this.options.logging,
                          proxy: this.options.proxy,
                          removeContainer: this.options.removeContainer,
                          scale: this.options.scale,
                          foreignObjectRendering: this.options.foreignObjectRendering,
                          useCORS: this.options.useCORS,
                          target: new CanvasRenderer(),
                          width,
                          height,
                          x: 0,
                          y: 0,
                          windowWidth: documentElement.ownerDocument.defaultView.innerWidth,
                          windowHeight: documentElement.ownerDocument.defaultView.innerHeight,
                          scrollX: documentElement.ownerDocument.defaultView.pageXOffset,
                          scrollY: documentElement.ownerDocument.defaultView.pageYOffset
                      },
                  );
              })
              .then(
                  (canvas: HTMLCanvasElement) =>
                      new Promise((resolve, reject) => {
                          const iframeCanvas = document.createElement('img');
                          iframeCanvas.onload = () => resolve(canvas);
                          iframeCanvas.onerror = (event) => {
                              // Empty iframes may result in empty "data:," URLs, which are invalid from the <img>'s point of view
                              // and instead of `onload` cause `onerror` and unhandled rejection warnings
                              // https://github.com/niklasvh/html2canvas/issues/1502
                              iframeCanvas.src == 'data:,' ? resolve(canvas) : reject(event);
                          };
                          iframeCanvas.src = canvas.toDataURL();
                          if (tempIframe.parentNode && iframe.ownerDocument && iframe.ownerDocument.defaultView) {
                              tempIframe.parentNode.replaceChild(
                                  copyCSSStyles(
                                      iframe.ownerDocument.defaultView.getComputedStyle(iframe),
                                      iframeCanvas
                                  ),
                                  tempIframe
                              );
                          }
                      })
              );
          return tempIframe;
      }
  */
      DocumentCloner.prototype.cloneNode = function (node) {
          if (isTextNode(node)) {
              return document.createTextNode(node.data);
          }
          if (!node.ownerDocument) {
              return node.cloneNode(false);
          }
          var window = node.ownerDocument.defaultView;
          if (window && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
              var clone = this.createElementClone(node);
              var style = window.getComputedStyle(node);
              var styleBefore = window.getComputedStyle(node, ':before');
              var styleAfter = window.getComputedStyle(node, ':after');
              if (this.referenceElement === node && isHTMLElementNode(clone)) {
                  this.clonedReferenceElement = clone;
              }
              if (isBodyElement(clone)) {
                  createPseudoHideStyles(clone);
              }
              var counters = this.counters.parse(new CSSParsedCounterDeclaration(style));
              var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
              for (var child = node.firstChild; child; child = child.nextSibling) {
                  if (!isElementNode(child) ||
                      (!isScriptElement(child) &&
                          !child.hasAttribute(IGNORE_ATTRIBUTE) &&
                          (typeof this.options.ignoreElements !== 'function' || !this.options.ignoreElements(child)))) {
                      if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
                          clone.appendChild(this.cloneNode(child));
                      }
                  }
              }
              if (before) {
                  clone.insertBefore(before, clone.firstChild);
              }
              var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
              if (after) {
                  clone.appendChild(after);
              }
              this.counters.pop(counters);
              if (style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node)) {
                  copyCSSStyles(style, clone);
              }
              //this.inlineAllImages(clone);
              if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
                  this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
              }
              if ((isTextareaElement(node) || isSelectElement(node)) &&
                  (isTextareaElement(clone) || isSelectElement(clone))) {
                  clone.value = node.value;
              }
              return clone;
          }
          return node.cloneNode(false);
      };
      DocumentCloner.prototype.resolvePseudoContent = function (node, clone, style, pseudoElt) {
          var _this = this;
          if (!style) {
              return;
          }
          var value = style.content;
          var document = clone.ownerDocument;
          if (!document || !value || value === 'none' || value === '-moz-alt-content' || style.display === 'none') {
              return;
          }
          this.counters.parse(new CSSParsedCounterDeclaration(style));
          var declaration = new CSSParsedPseudoDeclaration(style);
          var anonymousReplacedElement = document.createElement('html2canvaspseudoelement');
          copyCSSStyles(style, anonymousReplacedElement);
          declaration.content.forEach(function (token) {
              if (token.type === TokenType.STRING_TOKEN) {
                  anonymousReplacedElement.appendChild(document.createTextNode(token.value));
              }
              else if (token.type === TokenType.URL_TOKEN) {
                  var img = document.createElement('img');
                  img.src = token.value;
                  img.style.opacity = '1';
                  anonymousReplacedElement.appendChild(img);
              }
              else if (token.type === TokenType.FUNCTION) {
                  if (token.name === 'attr') {
                      var attr = token.values.filter(isIdentToken);
                      if (attr.length) {
                          anonymousReplacedElement.appendChild(document.createTextNode(node.getAttribute(attr[0].value) || ''));
                      }
                  }
                  else if (token.name === 'counter') {
                      var _a = token.values.filter(nonFunctionArgSeparator), counter = _a[0], counterStyle = _a[1];
                      if (counter && isIdentToken(counter)) {
                          var counterState = _this.counters.getCounterValue(counter.value);
                          var counterType = counterStyle && isIdentToken(counterStyle)
                              ? listStyleType.parse(counterStyle.value)
                              : LIST_STYLE_TYPE.DECIMAL;
                          anonymousReplacedElement.appendChild(document.createTextNode(createCounterText(counterState, counterType, false)));
                      }
                  }
                  else if (token.name === 'counters') {
                      var _b = token.values.filter(nonFunctionArgSeparator), counter = _b[0], delim = _b[1], counterStyle = _b[2];
                      if (counter && isIdentToken(counter)) {
                          var counterStates = _this.counters.getCounterValues(counter.value);
                          var counterType_1 = counterStyle && isIdentToken(counterStyle)
                              ? listStyleType.parse(counterStyle.value)
                              : LIST_STYLE_TYPE.DECIMAL;
                          var separator = delim && delim.type === TokenType.STRING_TOKEN ? delim.value : '';
                          var text = counterStates
                              .map(function (value) { return createCounterText(value, counterType_1, false); })
                              .join(separator);
                          anonymousReplacedElement.appendChild(document.createTextNode(text));
                      }
                  }
              }
              else if (token.type === TokenType.IDENT_TOKEN) {
                  switch (token.value) {
                      case 'open-quote':
                          anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, _this.quoteDepth++, true)));
                          break;
                      case 'close-quote':
                          anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, --_this.quoteDepth, false)));
                          break;
                      default:
                          // safari doesn't parse string tokens correctly because of lack of quotes
                          anonymousReplacedElement.appendChild(document.createTextNode(token.value));
                  }
              }
          });
          anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
          var newClassName = pseudoElt === PseudoElementType.BEFORE
              ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE
              : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
          if (isSVGElementNode(clone)) {
              clone.className.baseValue += newClassName;
          }
          else {
              clone.className += newClassName;
          }
          return anonymousReplacedElement;
      };
      DocumentCloner.destroy = function (container) {
          if (container.parentNode) {
              container.parentNode.removeChild(container);
              return true;
          }
          return false;
      };
      return DocumentCloner;
  }());
  var PseudoElementType;
  (function (PseudoElementType) {
      PseudoElementType[PseudoElementType["BEFORE"] = 0] = "BEFORE";
      PseudoElementType[PseudoElementType["AFTER"] = 1] = "AFTER";
  })(PseudoElementType || (PseudoElementType = {}));
  var createIFrameContainer = function (ownerDocument, bounds) {
      var cloneIframeContainer = ownerDocument.createElement('iframe');
      cloneIframeContainer.className = 'html2canvas-container';
      cloneIframeContainer.style.visibility = 'hidden';
      cloneIframeContainer.style.position = 'fixed';
      cloneIframeContainer.style.left = '-10000px';
      cloneIframeContainer.style.top = '0px';
      cloneIframeContainer.style.border = '0';
      cloneIframeContainer.width = bounds.width.toString();
      cloneIframeContainer.height = bounds.height.toString();
      cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
      cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
      ownerDocument.body.appendChild(cloneIframeContainer);
      return cloneIframeContainer;
  };
  var iframeLoader = function (iframe) {
      return new Promise(function (resolve, reject) {
          var cloneWindow = iframe.contentWindow;
          if (!cloneWindow) {
              return reject("No window assigned for iframe");
          }
          var documentClone = cloneWindow.document;
          cloneWindow.onload = iframe.onload = documentClone.onreadystatechange = function () {
              cloneWindow.onload = iframe.onload = documentClone.onreadystatechange = null;
              var interval = setInterval(function () {
                  if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
                      clearInterval(interval);
                      resolve(iframe);
                  }
              }, 50);
          };
      });
  };
  var copyCSSStyles = function (style, target) {
      // Edge does not provide value for cssText
      for (var i = style.length - 1; i >= 0; i--) {
          var property = style.item(i);
          // Safari shows pseudoelements if content is set
          if (property !== 'content') {
              target.style.setProperty(property, style.getPropertyValue(property));
          }
      }
      return target;
  };
  var serializeDoctype = function (doctype) {
      var str = '';
      if (doctype) {
          str += '<!DOCTYPE ';
          if (doctype.name) {
              str += doctype.name;
          }
          if (doctype.internalSubset) {
              str += doctype.internalSubset;
          }
          if (doctype.publicId) {
              str += "\"" + doctype.publicId + "\"";
          }
          if (doctype.systemId) {
              str += "\"" + doctype.systemId + "\"";
          }
          str += '>';
      }
      return str;
  };
  var restoreOwnerScroll = function (ownerDocument, x, y) {
      if (ownerDocument &&
          ownerDocument.defaultView &&
          (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
          ownerDocument.defaultView.scrollTo(x, y);
      }
  };
  var restoreNodeScroll = function (_a) {
      var element = _a[0], x = _a[1], y = _a[2];
      element.scrollLeft = x;
      element.scrollTop = y;
  };
  var PSEUDO_BEFORE = ':before';
  var PSEUDO_AFTER = ':after';
  var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
  var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';
  var PSEUDO_HIDE_ELEMENT_STYLE = "{\n    content: \"\" !important;\n    display: none !important;\n}";
  var createPseudoHideStyles = function (body) {
      createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
  };
  var createStyles = function (body, styles) {
      var document = body.ownerDocument;
      if (document) {
          var style = document.createElement('style');
          style.textContent = styles;
          body.appendChild(style);
      }
  };

  var PathType;
  (function (PathType) {
      PathType[PathType["VECTOR"] = 0] = "VECTOR";
      PathType[PathType["BEZIER_CURVE"] = 1] = "BEZIER_CURVE";
  })(PathType || (PathType = {}));
  var equalPath = function (a, b) {
      if (a.length === b.length) {
          return a.some(function (v, i) { return v === b[i]; });
      }
      return false;
  };
  var transformPath = function (path, deltaX, deltaY, deltaW, deltaH) {
      return path.map(function (point, index) {
          switch (index) {
              case 0:
                  return point.add(deltaX, deltaY);
              case 1:
                  return point.add(deltaX + deltaW, deltaY);
              case 2:
                  return point.add(deltaX + deltaW, deltaY + deltaH);
              case 3:
                  return point.add(deltaX, deltaY + deltaH);
          }
          return point;
      });
  };

  var Vector = /** @class */ (function () {
      function Vector(x, y) {
          this.type = PathType.VECTOR;
          this.x = x;
          this.y = y;
      }
      Vector.prototype.add = function (deltaX, deltaY) {
          return new Vector(this.x + deltaX, this.y + deltaY);
      };
      return Vector;
  }());

  var lerp = function (a, b, t) {
      return new Vector(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  };
  var BezierCurve = /** @class */ (function () {
      function BezierCurve(start, startControl, endControl, end) {
          this.type = PathType.BEZIER_CURVE;
          this.start = start;
          this.startControl = startControl;
          this.endControl = endControl;
          this.end = end;
      }
      BezierCurve.prototype.subdivide = function (t, firstHalf) {
          var ab = lerp(this.start, this.startControl, t);
          var bc = lerp(this.startControl, this.endControl, t);
          var cd = lerp(this.endControl, this.end, t);
          var abbc = lerp(ab, bc, t);
          var bccd = lerp(bc, cd, t);
          var dest = lerp(abbc, bccd, t);
          return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
      };
      BezierCurve.prototype.add = function (deltaX, deltaY) {
          return new BezierCurve(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
      };
      BezierCurve.prototype.reverse = function () {
          return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
      };
      return BezierCurve;
  }());
  var isBezierCurve = function (path) { return path.type === PathType.BEZIER_CURVE; };

  var BoundCurves = /** @class */ (function () {
      function BoundCurves(element) {
          var styles = element.styles;
          var bounds = element.bounds;
          var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height), tlh = _a[0], tlv = _a[1];
          var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height), trh = _b[0], trv = _b[1];
          var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height), brh = _c[0], brv = _c[1];
          var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height), blh = _d[0], blv = _d[1];
          var factors = [];
          factors.push((tlh + trh) / bounds.width);
          factors.push((blh + brh) / bounds.width);
          factors.push((tlv + blv) / bounds.height);
          factors.push((trv + brv) / bounds.height);
          var maxFactor = Math.max.apply(Math, factors);
          if (maxFactor > 1) {
              tlh /= maxFactor;
              tlv /= maxFactor;
              trh /= maxFactor;
              trv /= maxFactor;
              brh /= maxFactor;
              brv /= maxFactor;
              blh /= maxFactor;
              blv /= maxFactor;
          }
          var topWidth = bounds.width - trh;
          var rightHeight = bounds.height - brv;
          var bottomWidth = bounds.width - brh;
          var leftHeight = bounds.height - blv;
          var borderTopWidth = styles.borderTopWidth;
          var borderRightWidth = styles.borderRightWidth;
          var borderBottomWidth = styles.borderBottomWidth;
          var borderLeftWidth = styles.borderLeftWidth;
          var paddingTop = getAbsoluteValue(styles.paddingTop, element.bounds.width);
          var paddingRight = getAbsoluteValue(styles.paddingRight, element.bounds.width);
          var paddingBottom = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
          var paddingLeft = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
          this.topLeftBorderBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT)
                  : new Vector(bounds.left, bounds.top);
          this.topRightBorderBox =
              trh > 0 || trv > 0
                  ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width, bounds.top);
          this.bottomRightBorderBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
          this.bottomLeftBorderBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left, bounds.top + bounds.height);
          this.topLeftPaddingBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + borderTopWidth, Math.max(0, tlh - borderLeftWidth), Math.max(0, tlv - borderTopWidth), CORNER.TOP_LEFT)
                  : new Vector(bounds.left + borderLeftWidth, bounds.top + borderTopWidth);
          this.topRightPaddingBox =
              trh > 0 || trv > 0
                  ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth), bounds.top + borderTopWidth, topWidth > bounds.width + borderLeftWidth ? 0 : trh - borderLeftWidth, trv - borderTopWidth, CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + borderTopWidth);
          this.bottomRightPaddingBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth), Math.max(0, brh - borderRightWidth), brv - borderBottomWidth, CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + bounds.height - borderBottomWidth);
          this.bottomLeftPaddingBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + leftHeight, Math.max(0, blh - borderLeftWidth), blv - borderBottomWidth, CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left + borderLeftWidth, bounds.top + bounds.height - borderBottomWidth);
          this.topLeftContentBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop, Math.max(0, tlh - (borderLeftWidth + paddingLeft)), Math.max(0, tlv - (borderTopWidth + paddingTop)), CORNER.TOP_LEFT)
                  : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop);
          this.topRightContentBox =
              trh > 0 || trv > 0
                  ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth + paddingLeft), bounds.top + borderTopWidth + paddingTop, topWidth > bounds.width + borderLeftWidth + paddingLeft ? 0 : trh - borderLeftWidth + paddingLeft, trv - (borderTopWidth + paddingTop), CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + borderTopWidth + paddingTop);
          this.bottomRightContentBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth + paddingLeft)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth + paddingTop), Math.max(0, brh - (borderRightWidth + paddingRight)), brv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
          this.bottomLeftContentBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth + paddingLeft)), blv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
      }
      return BoundCurves;
  }());
  var CORNER;
  (function (CORNER) {
      CORNER[CORNER["TOP_LEFT"] = 0] = "TOP_LEFT";
      CORNER[CORNER["TOP_RIGHT"] = 1] = "TOP_RIGHT";
      CORNER[CORNER["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
      CORNER[CORNER["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
  })(CORNER || (CORNER = {}));
  var getCurvePoints = function (x, y, r1, r2, position) {
      var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
      var ox = r1 * kappa; // control point offset horizontal
      var oy = r2 * kappa; // control point offset vertical
      var xm = x + r1; // x-middle
      var ym = y + r2; // y-middle
      switch (position) {
          case CORNER.TOP_LEFT:
              return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
          case CORNER.TOP_RIGHT:
              return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
          case CORNER.BOTTOM_RIGHT:
              return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
          case CORNER.BOTTOM_LEFT:
          default:
              return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
      }
  };
  var calculateBorderBoxPath = function (curves) {
      return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
  };
  var calculateContentBoxPath = function (curves) {
      return [
          curves.topLeftContentBox,
          curves.topRightContentBox,
          curves.bottomRightContentBox,
          curves.bottomLeftContentBox
      ];
  };
  var calculatePaddingBoxPath = function (curves) {
      return [
          curves.topLeftPaddingBox,
          curves.topRightPaddingBox,
          curves.bottomRightPaddingBox,
          curves.bottomLeftPaddingBox
      ];
  };

  var TransformEffect = /** @class */ (function () {
      function TransformEffect(offsetX, offsetY, matrix) {
          this.type = 0 /* TRANSFORM */;
          this.offsetX = offsetX;
          this.offsetY = offsetY;
          this.matrix = matrix;
          this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
      }
      return TransformEffect;
  }());
  var ClipEffect = /** @class */ (function () {
      function ClipEffect(path, target) {
          this.type = 1 /* CLIP */;
          this.target = target;
          this.path = path;
      }
      return ClipEffect;
  }());
  var isTransformEffect = function (effect) {
      return effect.type === 0 /* TRANSFORM */;
  };
  var isClipEffect = function (effect) { return effect.type === 1 /* CLIP */; };

  var StackingContext = /** @class */ (function () {
      function StackingContext(container) {
          this.element = container;
          this.inlineLevel = [];
          this.nonInlineLevel = [];
          this.negativeZIndex = [];
          this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
          this.positiveZIndex = [];
          this.nonPositionedFloats = [];
          this.nonPositionedInlineLevel = [];
      }
      return StackingContext;
  }());
  var ElementPaint = /** @class */ (function () {
      function ElementPaint(element, parentStack) {
          this.container = element;
          this.effects = parentStack.slice(0);
          this.curves = new BoundCurves(element);
          if (element.styles.transform !== null) {
              var offsetX = element.bounds.left + element.styles.transformOrigin[0].number;
              var offsetY = element.bounds.top + element.styles.transformOrigin[1].number;
              var matrix = element.styles.transform;
              this.effects.push(new TransformEffect(offsetX, offsetY, matrix));
          }
          if (element.styles.overflowX !== OVERFLOW.VISIBLE) {
              var borderBox = calculateBorderBoxPath(this.curves);
              var paddingBox = calculatePaddingBoxPath(this.curves);
              if (equalPath(borderBox, paddingBox)) {
                  this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
              }
              else {
                  this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */));
                  this.effects.push(new ClipEffect(paddingBox, 4 /* CONTENT */));
              }
          }
      }
      ElementPaint.prototype.getParentEffects = function () {
          var effects = this.effects.slice(0);
          if (this.container.styles.overflowX !== OVERFLOW.VISIBLE) {
              var borderBox = calculateBorderBoxPath(this.curves);
              var paddingBox = calculatePaddingBoxPath(this.curves);
              if (!equalPath(borderBox, paddingBox)) {
                  effects.push(new ClipEffect(paddingBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
              }
          }
          return effects;
      };
      return ElementPaint;
  }());
  var parseStackTree = function (parent, stackingContext, realStackingContext, listItems) {
      parent.container.elements.forEach(function (child) {
          var treatAsRealStackingContext = contains$1(child.flags, 4 /* CREATES_REAL_STACKING_CONTEXT */);
          var createsStackingContext = contains$1(child.flags, 2 /* CREATES_STACKING_CONTEXT */);
          var paintContainer = new ElementPaint(child, parent.getParentEffects());
          if (contains$1(child.styles.display, 2048 /* LIST_ITEM */)) {
              listItems.push(paintContainer);
          }
          var listOwnerItems = contains$1(child.flags, 8 /* IS_LIST_OWNER */) ? [] : listItems;
          if (treatAsRealStackingContext || createsStackingContext) {
              var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
              var stack = new StackingContext(paintContainer);
              if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
                  var order_1 = child.styles.zIndex.order;
                  if (order_1 < 0) {
                      var index_1 = 0;
                      parentStack.negativeZIndex.some(function (current, i) {
                          if (order_1 > current.element.container.styles.zIndex.order) {
                              index_1 = i;
                              return false;
                          }
                          else if (index_1 > 0) {
                              return true;
                          }
                          return false;
                      });
                      parentStack.negativeZIndex.splice(index_1, 0, stack);
                  }
                  else if (order_1 > 0) {
                      var index_2 = 0;
                      parentStack.positiveZIndex.some(function (current, i) {
                          if (order_1 >= current.element.container.styles.zIndex.order) {
                              index_2 = i + 1;
                              return false;
                          }
                          else if (index_2 > 0) {
                              return true;
                          }
                          return false;
                      });
                      parentStack.positiveZIndex.splice(index_2, 0, stack);
                  }
                  else {
                      parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
                  }
              }
              else {
                  if (child.styles.isFloating()) {
                      parentStack.nonPositionedFloats.push(stack);
                  }
                  else {
                      parentStack.nonPositionedInlineLevel.push(stack);
                  }
              }
              parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
          }
          else {
              if (child.styles.isInlineLevel()) {
                  stackingContext.inlineLevel.push(paintContainer);
              }
              else {
                  stackingContext.nonInlineLevel.push(paintContainer);
              }
              parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
          }
          if (contains$1(child.flags, 8 /* IS_LIST_OWNER */)) {
              processListItems(child, listOwnerItems);
          }
      });
  };
  var processListItems = function (owner, elements) {
      var numbering = owner instanceof OLElementContainer ? owner.start : 1;
      var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
      for (var i = 0; i < elements.length; i++) {
          var item = elements[i];
          if (item.container instanceof LIElementContainer &&
              typeof item.container.value === 'number' &&
              item.container.value !== 0) {
              numbering = item.container.value;
          }
          item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
          numbering += reversed ? -1 : 1;
      }
  };
  var parseStackingContexts = function (container) {
      var paintContainer = new ElementPaint(container, []);
      var root = new StackingContext(paintContainer);
      var listItems = [];
      parseStackTree(paintContainer, root, root, listItems);
      processListItems(paintContainer.container, listItems);
      return root;
  };

  var parsePathForBorder = function (curves, borderSide) {
      switch (borderSide) {
          case 0:
              return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
          case 1:
              return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
          case 2:
              return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
          case 3:
          default:
              return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
      }
  };
  var createPathFromCurves = function (outer1, inner1, outer2, inner2) {
      var path = [];
      if (isBezierCurve(outer1)) {
          path.push(outer1.subdivide(0.5, false));
      }
      else {
          path.push(outer1);
      }
      if (isBezierCurve(outer2)) {
          path.push(outer2.subdivide(0.5, true));
      }
      else {
          path.push(outer2);
      }
      if (isBezierCurve(inner2)) {
          path.push(inner2.subdivide(0.5, true).reverse());
      }
      else {
          path.push(inner2);
      }
      if (isBezierCurve(inner1)) {
          path.push(inner1.subdivide(0.5, false).reverse());
      }
      else {
          path.push(inner1);
      }
      return path;
  };

  var paddingBox = function (element) {
      var bounds = element.bounds;
      var styles = element.styles;
      return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
  };
  var contentBox = function (element) {
      var styles = element.styles;
      var bounds = element.bounds;
      var paddingLeft = getAbsoluteValue(styles.paddingLeft, bounds.width);
      var paddingRight = getAbsoluteValue(styles.paddingRight, bounds.width);
      var paddingTop = getAbsoluteValue(styles.paddingTop, bounds.width);
      var paddingBottom = getAbsoluteValue(styles.paddingBottom, bounds.width);
      return bounds.add(paddingLeft + styles.borderLeftWidth, paddingTop + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft + paddingRight), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop + paddingBottom));
  };

  var calculateBackgroundPositioningArea = function (backgroundOrigin, element) {
      if (backgroundOrigin === 0 /* BORDER_BOX */) {
          return element.bounds;
      }
      if (backgroundOrigin === 2 /* CONTENT_BOX */) {
          return contentBox(element);
      }
      return paddingBox(element);
  };
  var calculateBackgroundPaintingArea = function (backgroundClip, element) {
      if (backgroundClip === BACKGROUND_CLIP.BORDER_BOX) {
          return element.bounds;
      }
      if (backgroundClip === BACKGROUND_CLIP.CONTENT_BOX) {
          return contentBox(element);
      }
      return paddingBox(element);
  };
  var calculateBackgroundRendering = function (container, index, intrinsicSize) {
      var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
      var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
      var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
      var sizeWidth = backgroundImageSize[0], sizeHeight = backgroundImageSize[1];
      var position = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
      var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
      var offsetX = Math.round(backgroundPositioningArea.left + position[0]);
      var offsetY = Math.round(backgroundPositioningArea.top + position[1]);
      return [path, offsetX, offsetY, sizeWidth, sizeHeight];
  };
  var isAuto = function (token) { return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO; };
  var hasIntrinsicValue = function (value) { return typeof value === 'number'; };
  var calculateBackgroundSize = function (size, _a, bounds) {
      var intrinsicWidth = _a[0], intrinsicHeight = _a[1], intrinsicProportion = _a[2];
      var first = size[0], second = size[1];
      if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
          return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
      }
      var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
      if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
          if (hasIntrinsicValue(intrinsicProportion)) {
              var targetRatio = bounds.width / bounds.height;
              return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER)
                  ? [bounds.width, bounds.width / intrinsicProportion]
                  : [bounds.height * intrinsicProportion, bounds.height];
          }
          return [bounds.width, bounds.height];
      }
      var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
      var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
      var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
      // If the background-size is auto or auto auto:
      if (isAuto(first) && (!second || isAuto(second))) {
          // If the image has both horizontal and vertical intrinsic dimensions, it's rendered at that size.
          if (hasIntrinsicWidth && hasIntrinsicHeight) {
              return [intrinsicWidth, intrinsicHeight];
          }
          // If the image has no intrinsic dimensions and has no intrinsic proportions,
          // it's rendered at the size of the background positioning area.
          if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
              return [bounds.width, bounds.height];
          }
          // TODO If the image has no intrinsic dimensions but has intrinsic proportions, it's rendered as if contain had been specified instead.
          // If the image has only one intrinsic dimension and has intrinsic proportions, it's rendered at the size corresponding to that one dimension.
          // The other dimension is computed using the specified dimension and the intrinsic proportions.
          if (hasIntrinsicDimensions && hasIntrinsicProportion) {
              var width_1 = hasIntrinsicWidth
                  ? intrinsicWidth
                  : intrinsicHeight * intrinsicProportion;
              var height_1 = hasIntrinsicHeight
                  ? intrinsicHeight
                  : intrinsicWidth / intrinsicProportion;
              return [width_1, height_1];
          }
          // If the image has only one intrinsic dimension but has no intrinsic proportions,
          // it's rendered using the specified dimension and the other dimension of the background positioning area.
          var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
          var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
          return [width_2, height_2];
      }
      // If the image has intrinsic proportions, it's stretched to the specified dimension.
      // The unspecified dimension is computed using the specified dimension and the intrinsic proportions.
      if (hasIntrinsicProportion) {
          var width_3 = 0;
          var height_3 = 0;
          if (isLengthPercentage(first)) {
              width_3 = getAbsoluteValue(first, bounds.width);
          }
          else if (isLengthPercentage(second)) {
              height_3 = getAbsoluteValue(second, bounds.height);
          }
          if (isAuto(first)) {
              width_3 = height_3 * intrinsicProportion;
          }
          else if (!second || isAuto(second)) {
              height_3 = width_3 / intrinsicProportion;
          }
          return [width_3, height_3];
      }
      // If the image has no intrinsic proportions, it's stretched to the specified dimension.
      // The unspecified dimension is computed using the image's corresponding intrinsic dimension,
      // if there is one. If there is no such intrinsic dimension,
      // it becomes the corresponding dimension of the background positioning area.
      var width = null;
      var height = null;
      if (isLengthPercentage(first)) {
          width = getAbsoluteValue(first, bounds.width);
      }
      else if (second && isLengthPercentage(second)) {
          height = getAbsoluteValue(second, bounds.height);
      }
      if (width !== null && (!second || isAuto(second))) {
          height =
              hasIntrinsicWidth && hasIntrinsicHeight
                  ? (width / intrinsicWidth) * intrinsicHeight
                  : bounds.height;
      }
      if (height !== null && isAuto(first)) {
          width =
              hasIntrinsicWidth && hasIntrinsicHeight
                  ? (height / intrinsicHeight) * intrinsicWidth
                  : bounds.width;
      }
      if (width !== null && height !== null) {
          return [width, height];
      }
      throw new Error("Unable to calculate background-size for element");
  };
  var getBackgroundValueForIndex = function (values, index) {
      var value = values[index];
      if (typeof value === 'undefined') {
          return values[0];
      }
      return value;
  };
  var calculateBackgroundRepeatPath = function (repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
      var x = _a[0], y = _a[1];
      var width = _b[0], height = _b[1];
      switch (repeat) {
          case BACKGROUND_REPEAT.REPEAT_X:
              return [
                  new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
              ];
          case BACKGROUND_REPEAT.REPEAT_Y:
              return [
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
              ];
          case BACKGROUND_REPEAT.NO_REPEAT:
              return [
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
              ];
          default:
              return [
                  new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
                  new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
                  new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
                  new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
              ];
      }
  };

  var SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  var SAMPLE_TEXT = 'Hidden Text';
  var FontMetrics = /** @class */ (function () {
      function FontMetrics(document) {
          this._data = {};
          this._document = document;
      }
      FontMetrics.prototype.parseMetrics = function (fontFamily, fontSize) {
          var container = this._document.createElement('div');
          var img = this._document.createElement('img');
          var span = this._document.createElement('span');
          var body = this._document.body;
          container.style.visibility = 'hidden';
          container.style.fontFamily = fontFamily;
          container.style.fontSize = fontSize;
          container.style.margin = '0';
          container.style.padding = '0';
          body.appendChild(container);
          img.src = SMALL_IMAGE;
          img.width = 1;
          img.height = 1;
          img.style.margin = '0';
          img.style.padding = '0';
          img.style.verticalAlign = 'baseline';
          span.style.fontFamily = fontFamily;
          span.style.fontSize = fontSize;
          span.style.margin = '0';
          span.style.padding = '0';
          span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
          container.appendChild(span);
          container.appendChild(img);
          var baseline = img.offsetTop - span.offsetTop + 2;
          container.removeChild(span);
          container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
          container.style.lineHeight = 'normal';
          img.style.verticalAlign = 'super';
          var middle = img.offsetTop - container.offsetTop + 2;
          body.removeChild(container);
          return { baseline: baseline, middle: middle };
      };
      FontMetrics.prototype.getMetrics = function (fontFamily, fontSize) {
          var key = fontFamily + " " + fontSize;
          if (typeof this._data[key] === 'undefined') {
              this._data[key] = this.parseMetrics(fontFamily, fontSize);
          }
          return this._data[key];
      };
      return FontMetrics;
  }());

  var MASK_OFFSET = 10000;
  var CanvasRenderer = /** @class */ (function () {
      function CanvasRenderer(options) {
          this._activeEffects = [];
          this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
          this.ctx = this.canvas.getContext('2d');
          this.options = options;
          if (!options.canvas) {
              this.canvas.width = Math.floor(options.width * options.scale);
              this.canvas.height = Math.floor(options.height * options.scale);
              this.canvas.style.width = options.width + "px";
              this.canvas.style.height = options.height + "px";
          }
          this.fontMetrics = new FontMetrics(document);
          this.ctx.scale(this.options.scale, this.options.scale);
          this.ctx.translate(-options.x + options.scrollX, -options.y + options.scrollY);
          this.ctx.textBaseline = 'bottom';
          this._activeEffects = [];
          Logger.getInstance(options.id).debug("Canvas renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
      }
      CanvasRenderer.prototype.applyEffects = function (effects, target) {
          var _this = this;
          while (this._activeEffects.length) {
              this.popEffect();
          }
          effects.filter(function (effect) { return contains$1(effect.target, target); }).forEach(function (effect) { return _this.applyEffect(effect); });
      };
      CanvasRenderer.prototype.applyEffect = function (effect) {
          this.ctx.save();
          if (isTransformEffect(effect)) {
              this.ctx.translate(effect.offsetX, effect.offsetY);
              this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
              this.ctx.translate(-effect.offsetX, -effect.offsetY);
          }
          if (isClipEffect(effect)) {
              this.path(effect.path);
              this.ctx.clip();
          }
          this._activeEffects.push(effect);
      };
      CanvasRenderer.prototype.popEffect = function () {
          this._activeEffects.pop();
          this.ctx.restore();
      };
      CanvasRenderer.prototype.renderStack = function (stack) {
          return __awaiter(this, void 0, void 0, function () {
              var styles;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          styles = stack.element.container.styles;
                          if (!styles.isVisible()) return [3 /*break*/, 2];
                          this.ctx.globalAlpha = styles.opacity;
                          return [4 /*yield*/, this.renderStackContent(stack)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderNode = function (paint) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!paint.container.styles.isVisible()) return [3 /*break*/, 3];
                          return [4 /*yield*/, this.renderNodeBackgroundAndBorders(paint)];
                      case 1:
                          _a.sent();
                          return [4 /*yield*/, this.renderNodeContent(paint)];
                      case 2:
                          _a.sent();
                          _a.label = 3;
                      case 3: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderTextWithLetterSpacing = function (text, letterSpacing) {
          var _this = this;
          if (letterSpacing === 0) {
              this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
          }
          else {
              var letters = toCodePoints(text.text).map(function (i) { return fromCodePoint(i); });
              letters.reduce(function (left, letter) {
                  _this.ctx.fillText(letter, left, text.bounds.top + text.bounds.height);
                  return left + _this.ctx.measureText(letter).width;
              }, text.bounds.left);
          }
      };
      CanvasRenderer.prototype.createFontStyle = function (styles) {
          var fontVariant = styles.fontVariant
              .filter(function (variant) { return variant === 'normal' || variant === 'small-caps'; })
              .join('');
          var fontFamily = styles.fontFamily.join(', ');
          var fontSize = isDimensionToken(styles.fontSize)
              ? "" + styles.fontSize.number + styles.fontSize.unit
              : styles.fontSize.number + "px";
          return [
              [styles.fontStyle, fontVariant, styles.fontWeight, fontSize, fontFamily].join(' '),
              fontFamily,
              fontSize
          ];
      };
      CanvasRenderer.prototype.renderTextNode = function (text, styles) {
          return __awaiter(this, void 0, void 0, function () {
              var _a, font, fontFamily, fontSize;
              var _this = this;
              return __generator(this, function (_b) {
                  _a = this.createFontStyle(styles), font = _a[0], fontFamily = _a[1], fontSize = _a[2];
                  this.ctx.font = font;
                  text.textBounds.forEach(function (text) {
                      _this.ctx.fillStyle = asString(styles.color);
                      _this.renderTextWithLetterSpacing(text, styles.letterSpacing);
                      var textShadows = styles.textShadow;
                      if (textShadows.length && text.text.trim().length) {
                          textShadows
                              .slice(0)
                              .reverse()
                              .forEach(function (textShadow) {
                              _this.ctx.shadowColor = asString(textShadow.color);
                              _this.ctx.shadowOffsetX = textShadow.offsetX.number * _this.options.scale;
                              _this.ctx.shadowOffsetY = textShadow.offsetY.number * _this.options.scale;
                              _this.ctx.shadowBlur = textShadow.blur.number;
                              _this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
                          });
                          _this.ctx.shadowColor = '';
                          _this.ctx.shadowOffsetX = 0;
                          _this.ctx.shadowOffsetY = 0;
                          _this.ctx.shadowBlur = 0;
                      }
                      if (styles.textDecorationLine.length) {
                          _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                          styles.textDecorationLine.forEach(function (textDecorationLine) {
                              switch (textDecorationLine) {
                                  case 1 /* UNDERLINE */:
                                      // Draws a line at the baseline of the font
                                      // TODO As some browsers display the line as more than 1px if the font-size is big,
                                      // need to take that into account both in position and size
                                      var baseline = _this.fontMetrics.getMetrics(fontFamily, fontSize).baseline;
                                      _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1);
                                      break;
                                  case 2 /* OVERLINE */:
                                      _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1);
                                      break;
                                  case 3 /* LINE_THROUGH */:
                                      // TODO try and find exact position for line-through
                                      var middle = _this.fontMetrics.getMetrics(fontFamily, fontSize).middle;
                                      _this.ctx.fillRect(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1);
                                      break;
                              }
                          });
                      }
                  });
                  return [2 /*return*/];
              });
          });
      };
      CanvasRenderer.prototype.renderReplacedElement = function (container, curves, image) {
          if (image && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
              var box = contentBox(container);
              var path = calculatePaddingBoxPath(curves);
              this.path(path);
              this.ctx.save();
              this.ctx.clip();
              this.ctx.drawImage(image, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
              this.ctx.restore();
          }
      };
      CanvasRenderer.prototype.renderNodeContent = function (paint) {
          return __awaiter(this, void 0, void 0, function () {
              var container, curves, styles, _i, _a, child, image, image, iframeRenderer, canvas, size, bounds, x, textBounds, img, image, url, bounds;
              return __generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          this.applyEffects(paint.effects, 4 /* CONTENT */);
                          container = paint.container;
                          curves = paint.curves;
                          styles = container.styles;
                          _i = 0, _a = container.textNodes;
                          _b.label = 1;
                      case 1:
                          if (!(_i < _a.length)) return [3 /*break*/, 4];
                          child = _a[_i];
                          return [4 /*yield*/, this.renderTextNode(child, styles)];
                      case 2:
                          _b.sent();
                          _b.label = 3;
                      case 3:
                          _i++;
                          return [3 /*break*/, 1];
                      case 4:
                          if (!(container instanceof ImageElementContainer)) return [3 /*break*/, 8];
                          _b.label = 5;
                      case 5:
                          _b.trys.push([5, 7, , 8]);
                          return [4 /*yield*/, this.options.cache.match(container.src)];
                      case 6:
                          image = _b.sent();
                          this.renderReplacedElement(container, curves, image);
                          return [3 /*break*/, 8];
                      case 7:
                          _b.sent();
                          Logger.getInstance(this.options.id).error("Error loading image " + container.src);
                          return [3 /*break*/, 8];
                      case 8:
                          if (container instanceof CanvasElementContainer) {
                              this.renderReplacedElement(container, curves, container.canvas);
                          }
                          if (!(container instanceof SVGElementContainer)) return [3 /*break*/, 12];
                          _b.label = 9;
                      case 9:
                          _b.trys.push([9, 11, , 12]);
                          return [4 /*yield*/, this.options.cache.match(container.svg)];
                      case 10:
                          image = _b.sent();
                          this.renderReplacedElement(container, curves, image);
                          return [3 /*break*/, 12];
                      case 11:
                          _b.sent();
                          Logger.getInstance(this.options.id).error("Error loading svg " + container.svg.substring(0, 255));
                          return [3 /*break*/, 12];
                      case 12:
                          if (!(container instanceof IFrameElementContainer && container.tree)) return [3 /*break*/, 14];
                          iframeRenderer = new CanvasRenderer({
                              id: this.options.id,
                              scale: this.options.scale,
                              backgroundColor: container.backgroundColor,
                              x: 0,
                              y: 0,
                              scrollX: 0,
                              scrollY: 0,
                              width: container.width,
                              height: container.height,
                              cache: this.options.cache,
                              windowWidth: container.width,
                              windowHeight: container.height
                          });
                          return [4 /*yield*/, iframeRenderer.render(container.tree)];
                      case 13:
                          canvas = _b.sent();
                          if (container.width && container.height) {
                              this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
                          }
                          _b.label = 14;
                      case 14:
                          if (container instanceof InputElementContainer) {
                              size = Math.min(container.bounds.width, container.bounds.height);
                              if (container.type === CHECKBOX) {
                                  if (container.checked) {
                                      this.ctx.save();
                                      this.path([
                                          new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                                          new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                                          new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                                          new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                                          new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                                          new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                                          new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                                      ]);
                                      this.ctx.fillStyle = asString(INPUT_COLOR);
                                      this.ctx.fill();
                                      this.ctx.restore();
                                  }
                              }
                              else if (container.type === RADIO) {
                                  if (container.checked) {
                                      this.ctx.save();
                                      this.ctx.beginPath();
                                      this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                                      this.ctx.fillStyle = asString(INPUT_COLOR);
                                      this.ctx.fill();
                                      this.ctx.restore();
                                  }
                              }
                          }
                          if (isTextInputElement(container) && container.value.length) {
                              this.ctx.font = this.createFontStyle(styles)[0];
                              this.ctx.fillStyle = asString(styles.color);
                              this.ctx.textBaseline = 'middle';
                              this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                              bounds = contentBox(container);
                              x = 0;
                              switch (container.styles.textAlign) {
                                  case TEXT_ALIGN.CENTER:
                                      x += bounds.width / 2;
                                      break;
                                  case TEXT_ALIGN.RIGHT:
                                      x += bounds.width;
                                      break;
                              }
                              textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                              this.ctx.save();
                              this.path([
                                  new Vector(bounds.left, bounds.top),
                                  new Vector(bounds.left + bounds.width, bounds.top),
                                  new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                                  new Vector(bounds.left, bounds.top + bounds.height)
                              ]);
                              this.ctx.clip();
                              this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing);
                              this.ctx.restore();
                              this.ctx.textBaseline = 'bottom';
                              this.ctx.textAlign = 'left';
                          }
                          if (!contains$1(container.styles.display, 2048 /* LIST_ITEM */)) return [3 /*break*/, 20];
                          if (!(container.styles.listStyleImage !== null)) return [3 /*break*/, 19];
                          img = container.styles.listStyleImage;
                          if (!(img.type === CSSImageType.URL)) return [3 /*break*/, 18];
                          image = void 0;
                          url = img.url;
                          _b.label = 15;
                      case 15:
                          _b.trys.push([15, 17, , 18]);
                          return [4 /*yield*/, this.options.cache.match(url)];
                      case 16:
                          image = _b.sent();
                          this.ctx.drawImage(image, container.bounds.left - (image.width + 10), container.bounds.top);
                          return [3 /*break*/, 18];
                      case 17:
                          _b.sent();
                          Logger.getInstance(this.options.id).error("Error loading list-style-image " + url);
                          return [3 /*break*/, 18];
                      case 18: return [3 /*break*/, 20];
                      case 19:
                          if (paint.listValue && container.styles.listStyleType !== LIST_STYLE_TYPE.NONE) {
                              this.ctx.font = this.createFontStyle(styles)[0];
                              this.ctx.fillStyle = asString(styles.color);
                              this.ctx.textBaseline = 'middle';
                              this.ctx.textAlign = 'right';
                              bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                              this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing);
                              this.ctx.textBaseline = 'bottom';
                              this.ctx.textAlign = 'left';
                          }
                          _b.label = 20;
                      case 20: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderStackContent = function (stack) {
          return __awaiter(this, void 0, void 0, function () {
              var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
              return __generator(this, function (_p) {
                  switch (_p.label) {
                      case 0: 
                      // https://www.w3.org/TR/css-position-3/#painting-order
                      // 1. the background and borders of the element forming the stacking context.
                      return [4 /*yield*/, this.renderNodeBackgroundAndBorders(stack.element)];
                      case 1:
                          // https://www.w3.org/TR/css-position-3/#painting-order
                          // 1. the background and borders of the element forming the stacking context.
                          _p.sent();
                          _i = 0, _a = stack.negativeZIndex;
                          _p.label = 2;
                      case 2:
                          if (!(_i < _a.length)) return [3 /*break*/, 5];
                          child = _a[_i];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 3:
                          _p.sent();
                          _p.label = 4;
                      case 4:
                          _i++;
                          return [3 /*break*/, 2];
                      case 5: 
                      // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                      return [4 /*yield*/, this.renderNodeContent(stack.element)];
                      case 6:
                          // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                          _p.sent();
                          _b = 0, _c = stack.nonInlineLevel;
                          _p.label = 7;
                      case 7:
                          if (!(_b < _c.length)) return [3 /*break*/, 10];
                          child = _c[_b];
                          return [4 /*yield*/, this.renderNode(child)];
                      case 8:
                          _p.sent();
                          _p.label = 9;
                      case 9:
                          _b++;
                          return [3 /*break*/, 7];
                      case 10:
                          _d = 0, _e = stack.nonPositionedFloats;
                          _p.label = 11;
                      case 11:
                          if (!(_d < _e.length)) return [3 /*break*/, 14];
                          child = _e[_d];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 12:
                          _p.sent();
                          _p.label = 13;
                      case 13:
                          _d++;
                          return [3 /*break*/, 11];
                      case 14:
                          _f = 0, _g = stack.nonPositionedInlineLevel;
                          _p.label = 15;
                      case 15:
                          if (!(_f < _g.length)) return [3 /*break*/, 18];
                          child = _g[_f];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 16:
                          _p.sent();
                          _p.label = 17;
                      case 17:
                          _f++;
                          return [3 /*break*/, 15];
                      case 18:
                          _h = 0, _j = stack.inlineLevel;
                          _p.label = 19;
                      case 19:
                          if (!(_h < _j.length)) return [3 /*break*/, 22];
                          child = _j[_h];
                          return [4 /*yield*/, this.renderNode(child)];
                      case 20:
                          _p.sent();
                          _p.label = 21;
                      case 21:
                          _h++;
                          return [3 /*break*/, 19];
                      case 22:
                          _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
                          _p.label = 23;
                      case 23:
                          if (!(_k < _l.length)) return [3 /*break*/, 26];
                          child = _l[_k];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 24:
                          _p.sent();
                          _p.label = 25;
                      case 25:
                          _k++;
                          return [3 /*break*/, 23];
                      case 26:
                          _m = 0, _o = stack.positiveZIndex;
                          _p.label = 27;
                      case 27:
                          if (!(_m < _o.length)) return [3 /*break*/, 30];
                          child = _o[_m];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 28:
                          _p.sent();
                          _p.label = 29;
                      case 29:
                          _m++;
                          return [3 /*break*/, 27];
                      case 30: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.mask = function (paths) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, 0);
          this.ctx.lineTo(this.canvas.width, 0);
          this.ctx.lineTo(this.canvas.width, this.canvas.height);
          this.ctx.lineTo(0, this.canvas.height);
          this.ctx.lineTo(0, 0);
          this.formatPath(paths.slice(0).reverse());
          this.ctx.closePath();
      };
      CanvasRenderer.prototype.path = function (paths) {
          this.ctx.beginPath();
          this.formatPath(paths);
          this.ctx.closePath();
      };
      CanvasRenderer.prototype.formatPath = function (paths) {
          var _this = this;
          paths.forEach(function (point, index) {
              var start = isBezierCurve(point) ? point.start : point;
              if (index === 0) {
                  _this.ctx.moveTo(start.x, start.y);
              }
              else {
                  _this.ctx.lineTo(start.x, start.y);
              }
              if (isBezierCurve(point)) {
                  _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
              }
          });
      };
      CanvasRenderer.prototype.renderRepeat = function (path, pattern, offsetX, offsetY) {
          this.path(path);
          this.ctx.fillStyle = pattern;
          this.ctx.translate(offsetX, offsetY);
          this.ctx.fill();
          this.ctx.translate(-offsetX, -offsetY);
      };
      CanvasRenderer.prototype.resizeImage = function (image, width, height) {
          if (image.width === width && image.height === height) {
              return image;
          }
          var canvas = this.canvas.ownerDocument.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
          return canvas;
      };
      CanvasRenderer.prototype.renderBackgroundImage = function (container) {
          return __awaiter(this, void 0, void 0, function () {
              var index, _loop_1, this_1, _i, _a, backgroundImage;
              return __generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          index = container.styles.backgroundImage.length - 1;
                          _loop_1 = function (backgroundImage) {
                              var image, url, _a, path, x, y, width, height, pattern, _b, path, x, y, width, height, _c, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _d, path, left, top_1, width, height, position, x, y, _e, rx, ry, radialGradient_1, midX, midY, f, invF;
                              return __generator(this, function (_f) {
                                  switch (_f.label) {
                                      case 0:
                                          if (!(backgroundImage.type === CSSImageType.URL)) return [3 /*break*/, 5];
                                          image = void 0;
                                          url = backgroundImage.url;
                                          _f.label = 1;
                                      case 1:
                                          _f.trys.push([1, 3, , 4]);
                                          return [4 /*yield*/, this_1.options.cache.match(url)];
                                      case 2:
                                          image = _f.sent();
                                          return [3 /*break*/, 4];
                                      case 3:
                                          _f.sent();
                                          Logger.getInstance(this_1.options.id).error("Error loading background-image " + url);
                                          return [3 /*break*/, 4];
                                      case 4:
                                          if (image) {
                                              _a = calculateBackgroundRendering(container, index, [
                                                  image.width,
                                                  image.height,
                                                  image.width / image.height
                                              ]), path = _a[0], x = _a[1], y = _a[2], width = _a[3], height = _a[4];
                                              pattern = this_1.ctx.createPattern(this_1.resizeImage(image, width, height), 'repeat');
                                              this_1.renderRepeat(path, pattern, x, y);
                                          }
                                          return [3 /*break*/, 6];
                                      case 5:
                                          if (isLinearGradient(backgroundImage)) {
                                              _b = calculateBackgroundRendering(container, index, [null, null, null]), path = _b[0], x = _b[1], y = _b[2], width = _b[3], height = _b[4];
                                              _c = calculateGradientDirection(backgroundImage.angle, width, height), lineLength = _c[0], x0 = _c[1], x1 = _c[2], y0 = _c[3], y1 = _c[4];
                                              canvas = document.createElement('canvas');
                                              canvas.width = width;
                                              canvas.height = height;
                                              ctx = canvas.getContext('2d');
                                              gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                                              processColorStops(backgroundImage.stops, lineLength).forEach(function (colorStop) {
                                                  return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                              });
                                              ctx.fillStyle = gradient_1;
                                              ctx.fillRect(0, 0, width, height);
                                              if (width > 0 && height > 0) {
                                                  pattern = this_1.ctx.createPattern(canvas, 'repeat');
                                                  this_1.renderRepeat(path, pattern, x, y);
                                              }
                                          }
                                          else if (isRadialGradient(backgroundImage)) {
                                              _d = calculateBackgroundRendering(container, index, [
                                                  null,
                                                  null,
                                                  null
                                              ]), path = _d[0], left = _d[1], top_1 = _d[2], width = _d[3], height = _d[4];
                                              position = backgroundImage.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage.position;
                                              x = getAbsoluteValue(position[0], width);
                                              y = getAbsoluteValue(position[position.length - 1], height);
                                              _e = calculateRadius(backgroundImage, x, y, width, height), rx = _e[0], ry = _e[1];
                                              if (rx > 0 && rx > 0) {
                                                  radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                                                  processColorStops(backgroundImage.stops, rx * 2).forEach(function (colorStop) {
                                                      return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                                  });
                                                  this_1.path(path);
                                                  this_1.ctx.fillStyle = radialGradient_1;
                                                  if (rx !== ry) {
                                                      midX = container.bounds.left + 0.5 * container.bounds.width;
                                                      midY = container.bounds.top + 0.5 * container.bounds.height;
                                                      f = ry / rx;
                                                      invF = 1 / f;
                                                      this_1.ctx.save();
                                                      this_1.ctx.translate(midX, midY);
                                                      this_1.ctx.transform(1, 0, 0, f, 0, 0);
                                                      this_1.ctx.translate(-midX, -midY);
                                                      this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                                                      this_1.ctx.restore();
                                                  }
                                                  else {
                                                      this_1.ctx.fill();
                                                  }
                                              }
                                          }
                                          _f.label = 6;
                                      case 6:
                                          index--;
                                          return [2 /*return*/];
                                  }
                              });
                          };
                          this_1 = this;
                          _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
                          _b.label = 1;
                      case 1:
                          if (!(_i < _a.length)) return [3 /*break*/, 4];
                          backgroundImage = _a[_i];
                          return [5 /*yield**/, _loop_1(backgroundImage)];
                      case 2:
                          _b.sent();
                          _b.label = 3;
                      case 3:
                          _i++;
                          return [3 /*break*/, 1];
                      case 4: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderBorder = function (color, side, curvePoints) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  this.path(parsePathForBorder(curvePoints, side));
                  this.ctx.fillStyle = asString(color);
                  this.ctx.fill();
                  return [2 /*return*/];
              });
          });
      };
      CanvasRenderer.prototype.renderNodeBackgroundAndBorders = function (paint) {
          return __awaiter(this, void 0, void 0, function () {
              var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
              var _this = this;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          this.applyEffects(paint.effects, 2 /* BACKGROUND_BORDERS */);
                          styles = paint.container.styles;
                          hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
                          borders = [
                              { style: styles.borderTopStyle, color: styles.borderTopColor },
                              { style: styles.borderRightStyle, color: styles.borderRightColor },
                              { style: styles.borderBottomStyle, color: styles.borderBottomColor },
                              { style: styles.borderLeftStyle, color: styles.borderLeftColor }
                          ];
                          backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
                          if (!(hasBackground || styles.boxShadow.length)) return [3 /*break*/, 2];
                          this.ctx.save();
                          this.path(backgroundPaintingArea);
                          this.ctx.clip();
                          if (!isTransparent(styles.backgroundColor)) {
                              this.ctx.fillStyle = asString(styles.backgroundColor);
                              this.ctx.fill();
                          }
                          return [4 /*yield*/, this.renderBackgroundImage(paint.container)];
                      case 1:
                          _a.sent();
                          this.ctx.restore();
                          styles.boxShadow
                              .slice(0)
                              .reverse()
                              .forEach(function (shadow) {
                              _this.ctx.save();
                              var borderBoxArea = calculateBorderBoxPath(paint.curves);
                              var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                              var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                              if (shadow.inset) {
                                  _this.path(borderBoxArea);
                                  _this.ctx.clip();
                                  _this.mask(shadowPaintingArea);
                              }
                              else {
                                  _this.mask(borderBoxArea);
                                  _this.ctx.clip();
                                  _this.path(shadowPaintingArea);
                              }
                              _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                              _this.ctx.shadowOffsetY = shadow.offsetY.number;
                              _this.ctx.shadowColor = asString(shadow.color);
                              _this.ctx.shadowBlur = shadow.blur.number;
                              _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : 'rgba(0,0,0,1)';
                              _this.ctx.fill();
                              _this.ctx.restore();
                          });
                          _a.label = 2;
                      case 2:
                          side = 0;
                          _i = 0, borders_1 = borders;
                          _a.label = 3;
                      case 3:
                          if (!(_i < borders_1.length)) return [3 /*break*/, 7];
                          border = borders_1[_i];
                          if (!(border.style !== BORDER_STYLE.NONE && !isTransparent(border.color))) return [3 /*break*/, 5];
                          return [4 /*yield*/, this.renderBorder(border.color, side, paint.curves)];
                      case 4:
                          _a.sent();
                          _a.label = 5;
                      case 5:
                          side++;
                          _a.label = 6;
                      case 6:
                          _i++;
                          return [3 /*break*/, 3];
                      case 7: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.render = function (element) {
          return __awaiter(this, void 0, void 0, function () {
              var stack;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (this.options.backgroundColor) {
                              this.ctx.fillStyle = asString(this.options.backgroundColor);
                              this.ctx.fillRect(this.options.x - this.options.scrollX, this.options.y - this.options.scrollY, this.options.width, this.options.height);
                          }
                          stack = parseStackingContexts(element);
                          return [4 /*yield*/, this.renderStack(stack)];
                      case 1:
                          _a.sent();
                          this.applyEffects([], 2 /* BACKGROUND_BORDERS */);
                          return [2 /*return*/, this.canvas];
                  }
              });
          });
      };
      return CanvasRenderer;
  }());
  var isTextInputElement = function (container) {
      if (container instanceof TextareaElementContainer) {
          return true;
      }
      else if (container instanceof SelectElementContainer) {
          return true;
      }
      else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
          return true;
      }
      return false;
  };
  var calculateBackgroundCurvedPaintingArea = function (clip, curves) {
      switch (clip) {
          case BACKGROUND_CLIP.BORDER_BOX:
              return calculateBorderBoxPath(curves);
          case BACKGROUND_CLIP.CONTENT_BOX:
              return calculateContentBoxPath(curves);
          case BACKGROUND_CLIP.PADDING_BOX:
          default:
              return calculatePaddingBoxPath(curves);
      }
  };
  var canvasTextAlign = function (textAlign) {
      switch (textAlign) {
          case TEXT_ALIGN.CENTER:
              return 'center';
          case TEXT_ALIGN.RIGHT:
              return 'right';
          case TEXT_ALIGN.LEFT:
          default:
              return 'left';
      }
  };

  var ForeignObjectRenderer = /** @class */ (function () {
      function ForeignObjectRenderer(options) {
          this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
          this.ctx = this.canvas.getContext('2d');
          this.options = options;
          this.canvas.width = Math.floor(options.width * options.scale);
          this.canvas.height = Math.floor(options.height * options.scale);
          this.canvas.style.width = options.width + "px";
          this.canvas.style.height = options.height + "px";
          this.ctx.scale(this.options.scale, this.options.scale);
          this.ctx.translate(-options.x + options.scrollX, -options.y + options.scrollY);
          Logger.getInstance(options.id).debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
      }
      ForeignObjectRenderer.prototype.render = function (element) {
          return __awaiter(this, void 0, void 0, function () {
              var svg, img;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          svg = createForeignObjectSVG(Math.max(this.options.windowWidth, this.options.width) * this.options.scale, Math.max(this.options.windowHeight, this.options.height) * this.options.scale, this.options.scrollX * this.options.scale, this.options.scrollY * this.options.scale, element);
                          return [4 /*yield*/, loadSerializedSVG$1(svg)];
                      case 1:
                          img = _a.sent();
                          if (this.options.backgroundColor) {
                              this.ctx.fillStyle = asString(this.options.backgroundColor);
                              this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
                          }
                          this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
                          return [2 /*return*/, this.canvas];
                  }
              });
          });
      };
      return ForeignObjectRenderer;
  }());
  var loadSerializedSVG$1 = function (svg) {
      return new Promise(function (resolve, reject) {
          var img = new Image();
          img.onload = function () {
              resolve(img);
          };
          img.onerror = reject;
          img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
      });
  };

  var _this = undefined;
  var parseColor$1 = function (value) { return color$1.parse(Parser.create(value).parseComponentValue()); };
  var html2canvas = function (element, options) {
      if (options === void 0) { options = {}; }
      return renderElement(element, options);
  };
  if (typeof window !== 'undefined') {
      CacheStorage.setContext(window);
  }
  var renderElement = function (element, opts) { return __awaiter(_this, void 0, void 0, function () {
      var ownerDocument, defaultView, instanceName, _a, width, height, left, top, defaultResourceOptions, resourceOptions, defaultOptions, options, windowBounds, documentCloner, clonedElement, container, documentBackgroundColor, bodyBackgroundColor, bgColor, defaultBackgroundColor, backgroundColor, renderOptions, canvas, renderer, root, renderer;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  ownerDocument = element.ownerDocument;
                  if (!ownerDocument) {
                      throw new Error("Element is not attached to a Document");
                  }
                  defaultView = ownerDocument.defaultView;
                  if (!defaultView) {
                      throw new Error("Document is not attached to a Window");
                  }
                  instanceName = (Math.round(Math.random() * 1000) + Date.now()).toString(16);
                  _a = isBodyElement(element) || isHTMLElement$1(element) ? parseDocumentSize(ownerDocument) : parseBounds(element), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
                  defaultResourceOptions = {
                      allowTaint: false,
                      imageTimeout: 15000,
                      proxy: undefined,
                      useCORS: false
                  };
                  resourceOptions = __assign({}, defaultResourceOptions, opts);
                  defaultOptions = {
                      backgroundColor: '#ffffff',
                      cache: opts.cache ? opts.cache : CacheStorage.create(instanceName, resourceOptions),
                      logging: true,
                      removeContainer: true,
                      foreignObjectRendering: false,
                      scale: defaultView.devicePixelRatio || 1,
                      windowWidth: defaultView.innerWidth,
                      windowHeight: defaultView.innerHeight,
                      scrollX: defaultView.pageXOffset,
                      scrollY: defaultView.pageYOffset,
                      x: left,
                      y: top,
                      width: Math.ceil(width),
                      height: Math.ceil(height),
                      id: instanceName
                  };
                  options = __assign({}, defaultOptions, resourceOptions, opts);
                  windowBounds = new Bounds(options.scrollX, options.scrollY, options.windowWidth, options.windowHeight);
                  Logger.create({ id: instanceName, enabled: options.logging });
                  Logger.getInstance(instanceName).debug("Starting document clone");
                  documentCloner = new DocumentCloner(element, {
                      id: instanceName,
                      onclone: options.onclone,
                      ignoreElements: options.ignoreElements,
                      inlineImages: options.foreignObjectRendering,
                      copyStyles: options.foreignObjectRendering
                  });
                  clonedElement = documentCloner.clonedReferenceElement;
                  if (!clonedElement) {
                      return [2 /*return*/, Promise.reject("Unable to find element in cloned iframe")];
                  }
                  return [4 /*yield*/, documentCloner.toIFrame(ownerDocument, windowBounds)];
              case 1:
                  container = _b.sent();
                  documentBackgroundColor = ownerDocument.documentElement
                      ? parseColor$1(getComputedStyle(ownerDocument.documentElement).backgroundColor)
                      : COLORS.TRANSPARENT;
                  bodyBackgroundColor = ownerDocument.body
                      ? parseColor$1(getComputedStyle(ownerDocument.body).backgroundColor)
                      : COLORS.TRANSPARENT;
                  bgColor = opts.backgroundColor;
                  defaultBackgroundColor = typeof bgColor === 'string' ? parseColor$1(bgColor) : bgColor === null ? COLORS.TRANSPARENT : 0xffffffff;
                  backgroundColor = element === ownerDocument.documentElement
                      ? isTransparent(documentBackgroundColor)
                          ? isTransparent(bodyBackgroundColor)
                              ? defaultBackgroundColor
                              : bodyBackgroundColor
                          : documentBackgroundColor
                      : defaultBackgroundColor;
                  renderOptions = {
                      id: instanceName,
                      cache: options.cache,
                      canvas: options.canvas,
                      backgroundColor: backgroundColor,
                      scale: options.scale,
                      x: options.x,
                      y: options.y,
                      scrollX: options.scrollX,
                      scrollY: options.scrollY,
                      width: options.width,
                      height: options.height,
                      windowWidth: options.windowWidth,
                      windowHeight: options.windowHeight
                  };
                  if (!options.foreignObjectRendering) return [3 /*break*/, 3];
                  Logger.getInstance(instanceName).debug("Document cloned, using foreign object rendering");
                  renderer = new ForeignObjectRenderer(renderOptions);
                  return [4 /*yield*/, renderer.render(clonedElement)];
              case 2:
                  canvas = _b.sent();
                  return [3 /*break*/, 5];
              case 3:
                  Logger.getInstance(instanceName).debug("Document cloned, using computed rendering");
                  CacheStorage.attachInstance(options.cache);
                  Logger.getInstance(instanceName).debug("Starting DOM parsing");
                  root = parseTree(clonedElement);
                  CacheStorage.detachInstance();
                  if (backgroundColor === root.styles.backgroundColor) {
                      root.styles.backgroundColor = COLORS.TRANSPARENT;
                  }
                  Logger.getInstance(instanceName).debug("Starting renderer");
                  renderer = new CanvasRenderer(renderOptions);
                  return [4 /*yield*/, renderer.render(root)];
              case 4:
                  canvas = _b.sent();
                  _b.label = 5;
              case 5:
                  if (options.removeContainer === true) {
                      if (!DocumentCloner.destroy(container)) {
                          Logger.getInstance(instanceName).error("Cannot detach cloned iframe as it is not in the DOM anymore");
                      }
                  }
                  Logger.getInstance(instanceName).debug("Finished rendering");
                  Logger.destroy(instanceName);
                  CacheStorage.destroy(instanceName);
                  return [2 /*return*/, canvas];
          }
      });
  }); };

  var FileSaver_min = createCommonjsModule(function (module, exports) {
  (function(a,b){b();})(commonjsGlobal,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else {var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else {var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});


  });

  function Menu () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var buttonSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var Menu = {}; // private

    var menuButtonSize = Math.max(30, buttonSize);
    var activeMenu = false;
    var menu = D3Select(container).append('div').classed('floatingMenu', true).on('click', function () {
      activeMenu = !activeMenu;
      menuButton.classed('active', activeMenu);
      menuNav.classed('active', activeMenu);
      arrangeLines(activeMenu);
    }).style('position', container == 'body' ? 'absolute' : 'relative').style('top', container == 'body' ? '20px' : '0px').style('right', container == 'body' ? '20px' : '0px');
    var menuNav = menu.append('div').classed('menuNav', true);
    var menuOptions = menuNav.append('ul');
    var menuButton = menu.append('a').classed('menuBtn', true);
    var lines = menuButton.append('ul');

    for (var i = 0; i < 3; i++) {
      lines.append('li').classed('line', true);
    }

    function resizeButton() {
      var horMar = 0.25 * menuButtonSize,
          lineBor = 1,
          verMar = 0.35 * (menuButtonSize - lineBor * 6),
          horSize = 0.5 * menuButtonSize,
          verSpace = 0.15 * (menuButtonSize - lineBor * 6);
      menuButton.style('padding', "".concat(verMar, "px ").concat(horMar, "px")).style('width', "".concat(horSize, "px"));
      lines.selectAll('li').style('width', "".concat(horSize - lineBor * 2, "px")).style('border-width', "".concat(lineBor, "px")).filter(function (d, i) {
        return i < 2;
      }).style('margin-bottom', "".concat(verSpace, "px"));
    }

    resizeButton();

    function arrangeLines(active) {
      if (!active) {
        lines.selectAll('li').style('transform', 'none').style('visibility', 'visible');
      } else {
        var lineBor = 1,
            verSpace = 0.15 * (menuButtonSize - lineBor * 6);
        var l = lines.selectAll('li');
        l.filter(function (d, i) {
          return i == 0;
        }).style('transform', "translate(0px, ".concat(verSpace + lineBor * 2, "px) rotate(45deg)"));
        l.filter(function (d, i) {
          return i == 1;
        }).style('visibility', 'hidden');
        l.filter(function (d, i) {
          return i == 2;
        }).style('transform', "translate(0px, ".concat(-(verSpace + lineBor * 2), "px) rotate(-45deg)"));
      }
    } // Modal instance re-used by some menu options


    var modal = Modal('body'); // public
    // two arguments in case it's used by page manager
    // second arguments replaces first if not null

    Menu.setSize = function (v) {
      var v2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      v = v2 == null ? v : v2;
      menuButtonSize = Math.max(30, v);
      resizeButton();
      return Menu;
    }; // options 
    // Add share option to menu
    // open modal with url build by callback


    function copyToClipboard(str) {
      var el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    Menu.addShare = function (cb) {
      var option = menuOptions.append('li');
      option.on('click', function () {
        var url = cb();
        modal.reset().setTitle('Share View').setActions([{
          'name': 'Close',
          'action': function action() {
            modal.toggleModal(false);
          },
          'disabled': false,
          'class': 'btn-inv'
        }]);
        var modalCore = modal.getModalBody();
        modalCore.append('div').classed('text', true).append('p').text('To share this view, copy the url below:');
        var actionCore = modalCore.append('div').classed('actionText', true);
        actionCore.append('p').text(url);
        var copyButton = actionCore.append('button').classed('btn', true).text('Copy').attr('data-tippy-content', 'Copied URL!').on('click', function () {
          copyToClipboard(url);
        });
        tippy(copyButton.node(), {
          theme: 'dark',
          duration: [500, 0],
          trigger: 'click'
        });
        modal.toggleModal(true);
      }).append('a').text('Share View');
      return Menu;
    }; // Add take screenshot option to menu
    // clone specified element, fix style issue
    // render in html canvas
    // save as png, and delete clone
    // function cloneElem(elId){
    //     let clone = document.querySelector(elId);//.cloneNode(true);
    //     // document.body.append(clone);
    //     // clone.style.padding = 20;
    //     return clone;
    // }
    // function setInlineStyles(targetElem) {
    //     const transformProperties = [
    //         'fill',
    //         'color',
    //         'font-size',
    //         'stroke',
    //         'font',
    //         'text-anchor'
    //     ];
    //     let svgElems = Array.from(targetElem.getElementsByTagName('svg'));
    //     for (let svgElement of svgElems) {
    //         recurseElementChildren(svgElement);
    //     }
    //     function recurseElementChildren(node) {
    //         if (!node.style) return;
    //         let styles = getComputedStyle(node);
    //         for (let transformProperty of transformProperties) {
    //             node.style[transformProperty] = styles[transformProperty];
    //         }
    //         for (let child of Array.from(node.childNodes)) {
    //             recurseElementChildren(child);
    //         }
    //     }
    // }


    var formatTime = timeFormat('%Y-%m-%d_%H-%M');

    Menu.addScreenshot = function (elId) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      var option = menuOptions.append('li');
      option.on('click', function () {
        setTimeout(function () {
          // let clone = cloneElem(elId);
          // setInlineStyles(clone);
          html2canvas(document.querySelector(elId)).then(function (canvas) {
            canvas.toBlob(function (blob) {
              FileSaver_min.saveAs(blob, "SFL_TopicMap_".concat(formatTime(new Date()), ".png"));
            });
          }); // clone.remove();
        }, timeout);
      }).append('a').text('Take Screenshot');
      return Menu;
    }; // Add a donwload data option to the menu
    // opens a modal with specified data
    // [{name,url}]


    Menu.addDownload = function (dlData) {
      if (dlData.length > 0) {
        var option = menuOptions.append('li');
        option.on('click', function () {
          modal.reset().setTitle('Download Data').setActions([{
            'name': 'Close',
            'action': function action() {
              modal.toggleModal(false);
            },
            'disabled': false,
            'class': 'btn-inv'
          }]);
          var modalCore = modal.getModalBody();
          modalCore.append('div').classed('text', true).append('p').text("Click on the link".concat(dlData.length > 1 ? 's' : '', " below to download data:"));

          var _iterator = _createForOfIteratorHelper(dlData),
              _step;

          try {
            var _loop = function _loop() {
              var dl = _step.value;
              var actionCore = modalCore.append('div').classed('actionText', true);
              actionCore.append('button').classed('btn', true).classed('btn-lin', true).text("Download ".concat(dl.name)).on('click', function () {
                window.open(dl.url, '_blank');
              });
            };

            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          modal.toggleModal(true);
        }).append('a').text('Download Data');
      }

      return Menu;
    }; // Add link option to menu
    // opens link in new tab


    Menu.addLink = function (text, url) {
      var openNewTab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var option = menuOptions.append('li');
      option.on('click', function () {
        var target = openNewTab ? '_blank' : '_self';
        window.open(url, target);
      }).append('a').text(text);
      return Menu;
    }; // Add a chart modal option to menu
    // opens new modal with specified title and calls chart callbacks
    // chart callbacks have container, width, height params


    Menu.addCharts = function (title, chartsCB) {
      var option = menuOptions.append('li');
      var w = window.innerWidth * 0.8 - 20;
      option.on('click', function () {
        modal.reset().setTitle(title).setActions([{
          'name': 'Close',
          'action': function action() {
            modal.toggleModal(false);
          },
          'disabled': false,
          'class': 'btn-inv'
        }]);
        chartsCB.forEach(function (cb) {
          cb('div.modalBody', Math.min(800, w), Math.min(400, w / 2));
        });
        modal.toggleModal(true);
      }).append('a').text(title);
      return Menu;
    }; // Add model info modal to menu options
    // info extracted from model metadata


    Menu.addModelInfo = function (mainMetadata) {
      var subMetadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var extraLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var option = menuOptions.append('li');
      option.on('click', function () {
        modal.reset().setTitle('Model information').setActions([{
          'name': 'Close',
          'action': function action() {
            modal.toggleModal(false);
          },
          'disabled': false,
          'class': 'btn-inv'
        }]);
        var modalCore = modal.getModalBody();
        var mainText = modalCore.append('div').classed('text', true); // add document info (n docs in model, n docs exluded)

        var docRemoved = mainMetadata.nDocsTooShort == 0 ? '' : ", although ".concat(mainMetadata.nDocsTooShort, " were too short (less than ").concat(mainMetadata.minDocSize, " words) and therefore excluded");
        mainText.append('p').html("The topics were extracted from <b>".concat(mainMetadata.totalDocs, "</b> documents").concat(docRemoved, ".")); // add stop phrases used, if any

        if (has(mainMetadata, 'stopPhrases') && mainMetadata.stopPhrases.length > 0) {
          var plural = mainMetadata.stopPhrases.length > 1;
          mainText.append('p').html("The following phrase".concat(plural ? 's were' : ' was', " removed from the documents:"));
          var l = mainText.append('ul');
          mainMetadata.stopPhrases.forEach(function (p) {
            l.append('li').html("<i>\"".concat(p, "\"</i>"));
          });
        } // add stop word used


        mainText.append('p').html('Common english words (e.g. articles, or prepositions) were removed from the documents to prevent them from distorting the model.'); // add custom stop words used

        if (has(mainMetadata, 'stopWords') && mainMetadata.stopWords.length > 0) {
          var _plural = mainMetadata.stopWords.length > 1;

          mainText.append('p').html("The following word".concat(_plural ? 's were' : ' was', " judged too generic in this document set, and therefore also removed:"));
          mainText.append('p').html(mainMetadata.stopWords.map(function (w) {
            return "<i>".concat(w, "</i>");
          }).join(', '));
        } // check if hierarchical model


        var hModel = subMetadata !== null; // add n topics in main model (adapt if only model)

        mainText.append('p').html("The ".concat(hModel ? 'main' : '', " model has <b>").concat(mainMetadata.nTopics, "</b> topics.")); // add detail about sub model if hierarchy made

        if (hModel) {
          mainText.append('p').html("The sub model has <b>".concat(subMetadata.nTopics, "</b> topics."));
        } // add disclaimer about multi-modality


        mainText.append('p').html("Note that th".concat(hModel ? 'ese' : 'is', " model").concat(hModel ? 's are' : ' is', " only representing one instance of many possible models.")); // add any extra specified

        extraLines.forEach(function (l) {
          mainText.append('p').html(l);
        });
        modal.toggleModal(true);
      }).append('a').text('Model information');
      return Menu;
    }; // Add a simple text modal to menu option
    // specify title and content (in html)


    Menu.addModal = function (title, htmlContent) {
      var option = menuOptions.append('li');
      option.on('click', function () {
        modal.reset().setTitle(title).setActions([{
          'name': 'Close',
          'action': function action() {
            modal.toggleModal(false);
          },
          'disabled': false,
          'class': 'btn-inv'
        }]);
        var modalCore = modal.getModalBody();
        var mainText = modalCore.append('div').classed('text', true);
        mainText.html(htmlContent);
        modal.toggleModal(true);
      }).append('a').text(title);
      return Menu;
    };

    return Menu;
  }

  function Search$1 () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
    var Search = {}; // private

    var searchCB = function searchCB() {};

    var searchBoxWrapper = D3Select(container).append('div').classed('searchBoxWrapper', true);
    var span = searchBoxWrapper.append('span');
    var input = span.append('input').attr('type', 'text').attr('placeholder', 'Search labels...').attr('title', 'Separate labels by a space to search them in the same topics. Use semicolons ; to include multiple searches.');
    var clear = span.append('span').classed('clearInput', true).html('&#10005;').on('click', function () {
      input.node().value = '';
      styleBox('');
      searchCB('');
    }).attr('title', 'Clear search');

    function setCB() {
      input.on('input', function () {
        var v = D3Select(this).node().value.toLowerCase();
        styleBox(v);
        searchCB(v);
      });
    }

    function styleBox(v) {
      if (v === '' || v === null) {
        clear.style('display', 'none');
        input.classed('active', false);
      } else {
        clear.style('display', 'block');
        input.classed('active', true);
      }
    }

    function resize() {
      searchBoxWrapper.style('width', width + 'px').style('height', height + 'px');
    }

    resize(); // public

    Search.setWidth = function (w) {
      width = w;
      resize();
      return Search;
    };

    Search.setHeight = function (h) {
      height = h;
      resize();
      return Search;
    };

    Search.setSize = function (w, h) {
      width = w;
      height = h;
      resize();
      return Search;
    };

    Search.setPlaceholder = function (str) {
      input.attr('placeholder', str);
      return Search;
    };

    Search.setSearchCB = function (cb) {
      searchCB = cb;
      setCB();
      return Search;
    };

    Search.setValue = function (str) {
      input.node().value = str;
      styleBox(str);
      searchCB(str);
      return Search;
    };

    Search.getValue = function () {
      var v = input.node().value;
      return v == null ? '' : v;
    };

    return Search;
  }

  function Dropdown () {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
    var Dropdown = {}; // private

    var selectCB = function selectCB() {};

    var dropdownWrapper = D3Select(container).append('div').classed('dropdownFilterWrapper', true);
    var dropdown = dropdownWrapper.append('select');

    function setOptions(values) {
      var options = dropdown.selectAll('option').data(values, function (d) {
        return d.value;
      });
      options.exit().remove();
      options.enter().append('option');
      options = dropdown.selectAll('option');
      options.attr('value', function (d) {
        return d.value;
      }).text(function (d) {
        return d.text;
      }).filter(function (d, i) {
        return i == 0;
      }).attr('selected', true).each(function (d) {
        dropdown.node().value = d.value;
        dropdown.node().dispatchEvent(new Event('change'));
      });
    }

    function setSelection(value) {
      dropdown.selectAll('option').attr('selected', null).filter(function (d) {
        return d.value == value;
      }).attr('selected', true);
    }

    function setCallback() {
      dropdown.on('change', function () {
        var v = dropdown.node().value;
        setSelection(v);
        selectCB(v);
      });
    }

    setCallback();

    function resize() {
      dropdownWrapper.style('width', width + 'px').style('height', height + 'px');
    }

    resize(); // public

    Dropdown.setWidth = function (w) {
      width = w;
      resize();
      return Dropdown;
    };

    Dropdown.setHeight = function (h) {
      height = h;
      resize();
      return Dropdown;
    };

    Dropdown.setSize = function (w, h) {
      width = w;
      height = h;
      resize();
      return Dropdown;
    };

    Dropdown.setOptions = function (values) {
      setOptions(values);
      return Dropdown;
    };

    Dropdown.setSelectCB = function (cb) {
      selectCB = cb;
      setCallback();
      return Dropdown;
    };

    Dropdown.setSelected = function (value) {
      dropdown.node().value = value;
      dropdown.node().dispatchEvent(new Event('change'));
      return Dropdown;
    };

    Dropdown.getSelected = function () {
      return dropdown.select('option[selected = true]').datum();
    };

    return Dropdown;
  }

  function formatNumber(n, f) {
    return format(f)(n);
  }

  function formatDate$1(d, f) {
    return timeFormat(f)(d);
  }

  function parseDate(d, f) {
    return timeParse(f)(d);
  }

  function convertDate(d, inF, outF) {
    return formatDate$1(parseDate(d, inF), outF);
  }

  function dateConverter(inF, outF) {
    return function (d) {
      return formatDate$1(parseDate(d, inF), outF);
    };
  }

  function aboutTopicMapping() {
    var docType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'documents';
    var hasTable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var topicSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'total number of document parts';
    var tableDetail = hasTable ? "<p>Clicking on a topic provides a list documents ordered by topic proportion.\n        Thus, continuing the example above, <i>topic 6</i>\u2019s list would equal:\n        <i>document b</i>, <i>a</i>, and other documents.</p>" : '';
    var docTypeDetail = docType == 'documents' ? '' : " (".concat(docType, ")");
    return "<p>This Map shows a set of \"topics\" that were generated by applying topic modelling [1,2,3] to the specified set of ".concat(docType, ".</p>\n    <p>Topic Modelling calculates the distributions of these documents").concat(docTypeDetail, " over the topics.\n    Thus, <i>document a</i> could be thought as combining <i>40% topic 3</i>, <i>35% topic 6</i>, and <i>25% topic 11</i>;\n    while <i>document b</i> may combine <i>70% topic 6</i> and <i>30% topic 13</i>.</p>\n    <p>The size of a topic\u2019s circle in the map represents the ").concat(topicSize, " allocated to that topic.\n    The closer the topics are together on the map, the more likely they are to share documents.</p>\n    ").concat(tableDetail, "\n    <p>For an overview of Topic Modelling see <a href=\"https://oar.princeton.edu/jspui/bitstream/88435/pr1bv3w/1/OA_IntroductionProbabilisticTopicModels.pdf\" target=\"_blank\">David Blei's Introduction to Probabilistic Topic Models</a> [1].</p>\n    <p>[1] Blei. 2012. Introduction to Probabilistic Topic Models. <i>Communications of the ACM</i></p>\n    <p>[2] Blei, Ng, and Jordan. 2003. Latent Dirichlet Allocation. <i>Journal of Machine Learning Research</i></p>\n    <p>[3] Griffiths and Steyvers. 2004. Finding Scientific Topics. <i>Proceedings of the National Academy of Sciences</i></p>\n    <hr>\n    <p>To generate topics, our system uses the <i><a href=\"https://stanfordnlp.github.io/CoreNLP/\" target=\"_blank\">Stanford CoreNLP</a></i> [4] and \n    <i><a href=\"http://mallet.cs.umass.edu\" target=\"_blank\">MALLET</a></i> [5] packages.\n    Our map visualisation is created using <i><a href=\"http://graphics.uni-konstanz.de/publikationen/Goertler2018BubbleTreemapsUncertainty/index.html\" target=\"_blank\">Bubble Treemaps</a></i> [6].\n    Our interface is built with <i><a href=\"https://d3js.org/\" target=\"_blank\">D3</a></i> [7].</p>\n    <p>[4] Manning et al. 2014. The Stanford CoreNLP Natural Language Processing Toolkit. <i>Proceedings of the 52nd Annual Meeting of the Association for Computational Linguistics: System Demonstrations</i></p>\n    <p>[5] McCallum. 2002. MALLET: A Machine Learning for Language Toolkit. <i><a href=\"http://mallet.cs.umass.edu\" target=\"_blank\">http://mallet.cs.umass.edu</a></i></p>\n    <p>[6] G\xF6rtler et al. 2018. Bubble Treemaps for Uncertainty Visualization. <i>IEEE Transactions on Visualization and Computer Graphics</i></p>\n    <p>[7] Bostock, Ogievetsky, and Heer. 2011. D3: Data Driven Documents. <i>IEEE Transactions on Visualization and Computer Graphics</i></p>");
  }

  exports.BubbleMap = BubbleMap;
  exports.DataManager = DataManager;
  exports.DocTable = DocumentTable;
  exports.DocViewer = DocumentViewer;
  exports.Dropdown = Dropdown;
  exports.HorizontalBarChart = HorBarChart;
  exports.LineChart = LineChart;
  exports.Menu = Menu;
  exports.PageManager = PageManager;
  exports.Search = Search$1;
  exports.StateManager = StateManager;
  exports.TrendChart = TrendChart;
  exports.VerticalBarChart = VerBarChart;
  exports.WordCloud = WordCloud;
  exports.aboutTopicMapping = aboutTopicMapping;
  exports.convertDate = convertDate;
  exports.dateConverter = dateConverter;
  exports.formatDate = formatDate$1;
  exports.formatNumber = formatNumber;
  exports.parseDate = parseDate;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));