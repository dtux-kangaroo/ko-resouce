/*!
 * @project        dtux
 * @name           dtux
 * @author         dtux
 * @build          Thu, Dec 20, 2018 5:01 PM ET
 * @release        v1.0.0
 * @copyright      Copyright (c) 2018 袋鼠云
 *
 */

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 101);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(1);

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: delegated ./node_modules/react/index.js from dll-reference vendor_2_9bca7402dc876958b266
var reactfrom_dll_reference_vendor_2_9bca7402dc876958b266 = __webpack_require__(0);
var reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default = /*#__PURE__*/__webpack_require__.n(reactfrom_dll_reference_vendor_2_9bca7402dc876958b266);

// EXTERNAL MODULE: delegated ./node_modules/react-dom/index.js from dll-reference vendor_2_9bca7402dc876958b266
var react_domfrom_dll_reference_vendor_2_9bca7402dc876958b266 = __webpack_require__(5);

// CONCATENATED MODULE: ../react-resource/blocks/about/src/about.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var getData = function getData() {
  return Array.from({
    length: 3
  }).map(function (item, index) {
    return {
      index: "0".concat(index + 1),
      title: '云存储特惠',
      desc: '上云仅 <b>33元/年</b> ，降低企业成本',
      link: '#'
    };
  });
};

var about_About =
/*#__PURE__*/
function (_Component) {
  _inherits(About, _Component);

  function About(props) {
    var _this;

    _classCallCheck(this, About);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(About).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(About, [{
    key: "render",
    value: function render() {
      return reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: styles.container
      }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: styles.content
      }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: styles.mainTitle
      }, "ABOUT"), reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: styles.mainDesc
      }, "\u5173\u4E8E\u888B\u9F20\u4E91-"), reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: styles.tab
      }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: _objectSpread({}, styles.tabName, styles.first, styles.active)
      }, "\u4F01\u4E1A\u7EA7"), reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: _objectSpread({}, styles.tabName)
      }, "\u4E2A\u4EBA\u7EA7")), reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: styles.items
      }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
        style: styles.tabWrap
      }, getData().map(function (item) {
        return reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
          style: styles.tabList,
          key: item.index
        }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
          style: styles.left
        }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
          style: styles.num
        }, item.index), reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
          style: styles.title
        }, item.title)), reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
          style: styles.middle
        }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
          style: styles.desc,
          dangerouslySetInnerHTML: {
            __html: item.desc
          }
        })), reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("div", {
          style: styles.btnBox
        }, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement("a", {
          href: item.link,
          style: styles.btnLink
        }, "\u67E5\u770B\u8BE6\u60C5")));
      })))));
    }
  }]);

  return About;
}(reactfrom_dll_reference_vendor_2_9bca7402dc876958b266["Component"]);

about_About.displayName = 'About';
about_About.propTypes = {};
about_About.defaultProps = {};

var styles = {
  container: {
    padding: '50px 0',
    background: '#000'
  },
  content: {
    width: '1200px',
    margin: '0 auto',
    position: 'relative'
  },
  mainTitle: {
    fontSize: '60px',
    color: '#fff',
    letterSpacing: '0.77px',
    lineHeight: '72px',
    margin: '0',
    fontWeight: '700'
  },
  mainDesc: {
    fontSize: '24px',
    lineHeight: '30px',
    color: '#fff',
    marginTop: '8px',
    fontWeight: '700'
  },
  img: {
    marginTop: '70px',
    maxWidth: '100%'
  },
  tab: {
    position: 'absolute',
    right: '10px',
    top: '66px',
    overflow: 'hidden'
  },
  first: {
    marginTop: '0'
  },
  active: {
    color: '#fff',
    borderBottom: '1px solid #fff'
  },
  tabName: {
    float: 'left',
    cursor: 'pointer',
    fontSize: '26px',
    lineHeight: '30px',
    color: 'hsla(0,0%,100%,.5)',
    marginLeft: '30px',
    padding: '14px 0',
    borderBottom: '1px solid transparent',
    transition: 'all .3s'
  },
  items: {
    overflow: 'hidden',
    paddingTop: '50px'
  },
  tabList: {
    height: '80px',
    background: '#191a1e',
    position: 'relative',
    paddingRight: '40px',
    marginTop: '20px',
    transition: 'all .3s'
  },
  middle: {
    paddingLeft: '335px',
    paddingRight: '180px',
    height: '80px',
    overflow: 'hidden'
  },
  left: {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '80px',
    overflow: 'hidden'
  },
  num: {
    float: 'left',
    fontSize: '42px',
    width: '80px',
    height: '80px',
    lineHeight: '80px',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    background: '#236cff'
  },
  title: {
    float: 'left',
    maxWidth: '255px',
    fontSize: '20px',
    lineHeight: '80px',
    color: '#fff',
    paddingLeft: '40px',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  desc: {
    fontSize: '14px',
    lineHeight: '24px',
    color: 'hsla(0,0%,100%,.8)',
    marginTop: '28px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  btnBox: {
    position: 'absolute',
    right: '40px',
    top: '20px'
  },
  btnLink: {
    display: 'inline-block',
    width: '160px',
    height: '40px',
    border: '1px solid #fff',
    lineHeight: '38px',
    fontSize: '16px',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all .3s'
  }
};
// CONCATENATED MODULE: ../react-resource/blocks/about/src/index.js

/* harmony default export */ var src = (about_About);
// EXTERNAL MODULE: ./src/layouts/blockLayout.js
var blockLayout = __webpack_require__(6);

// CONCATENATED MODULE: ./src/reactBlock/about/index.js




Object(react_domfrom_dll_reference_vendor_2_9bca7402dc876958b266["render"])(reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement(blockLayout["a" /* default */], null, reactfrom_dll_reference_vendor_2_9bca7402dc876958b266_default.a.createElement(src, null)), document.querySelector('#root'));

if (false) {}

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = vendor_2_9bca7402dc876958b266;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(8);

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var BlockLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockLayout, _Component);

  function BlockLayout() {
    _classCallCheck(this, BlockLayout);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlockLayout).apply(this, arguments));
  }

  _createClass(BlockLayout, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          minHeight: '100vh'
        },
        className: "ice-blank-layout"
      }, this.props.children);
    }
  }]);

  return BlockLayout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

/******/ });