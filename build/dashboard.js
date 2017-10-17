webpackJsonp([2],{

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = __webpack_require__(41);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _session = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dashboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (event) {
      event.preventDefault();
      _this.props.logout();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dashboard, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            'button',
            null,
            'logout'
          )
        )
      );
    }
  }]);

  return Dashboard;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps() {
  return {};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, { logout: _session.logout })(Dashboard);

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.checkSession = undefined;

var _axios = __webpack_require__(71);

var _axios2 = _interopRequireDefault(_axios);

var _types = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkSession = exports.checkSession = function checkSession() {
  return function (dispatch) {
    return _axios2.default.get('/api/check-session').then(function (response) {
      if (response === 'hasSession') {
        dispatch({
          type: _types.SESSION_START
        });
      } else {
        dispatch({
          type: _types.SESSION_END
        });
      }
    });
  };
};

var login = exports.login = function login(username, password) {
  return function (dispatch) {
    return _axios2.default.post('/api/login', { username: username, password: password }).then(function (_ref) {
      var data = _ref.data;

      console.log(data);
      dispatch({
        type: _types.SESSION_START
      });
    }).catch(function (err) {
      dispatch({
        type: _types.SESSION_START_FAILED,
        payload: err.message || 'Incorrect username or password'
      });
    });
  };
};

var logout = exports.logout = function logout() {
  return function (dispatch) {
    return _axios2.default.post('/api/logout').then(function (response) {
      dispatch({
        type: _types.SESSION_END
      });
    });
  };
};

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SESSION_START = exports.SESSION_START = 'SESSION_START';
var SESSION_END = exports.SESSION_END = 'SESSION_END';
var SESSION_START_FAILED = exports.SESSION_START_FAILED = 'SESSION_START_FAILED';
var SET_USER = exports.SET_USER = 'SET_USER';

/***/ })

},[146]);
//# sourceMappingURL=dashboard.js.map