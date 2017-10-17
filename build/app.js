webpackJsonp([0],{

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(63);

var _reactRouterDom = __webpack_require__(273);

var _Gateway = __webpack_require__(149);

var _Gateway2 = _interopRequireDefault(_Gateway);

var _Dashboard = __webpack_require__(148);

var _Dashboard2 = _interopRequireDefault(_Dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(props) {
  if (props.checkingSession) {
    return _react2.default.createElement('div', null);
  }

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: props.store },
    _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      props.hasSession ? _react2.default.createElement(_Dashboard2.default, null) : _react2.default.createElement(_Gateway2.default, null)
    )
  );
};

var mapStateToProps = function mapStateToProps(_ref) {
  var session = _ref.session;
  return _extends({}, session);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(App);

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(69);

var _reduxThunk = __webpack_require__(296);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _rootReducer = __webpack_require__(151);

var _rootReducer2 = _interopRequireDefault(_rootReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.createStore)(_rootReducer2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _session = __webpack_require__(147);

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  session: _session2.default
};

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = __webpack_require__(75);

var INITIAL_STATE = {
  checkingSession: true,
  hasSession: false,
  sessionError: ''
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _types.SESSION_START:
      return {
        checkingSession: false,
        hasSession: true,
        sessionError: ''
      };
    case _types.SESSION_END:
      return {
        checkingSession: false,
        hasSession: false,
        sessionError: ''
      };
    case _types.SESSION_START_FAILED:
      return {
        checkingSession: false,
        hasSession: false,
        sessionError: action.payload
      };
  }
  return state;
};

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = __webpack_require__(63);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _session = __webpack_require__(40);

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

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = __webpack_require__(63);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _session = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gateway = function (_React$Component) {
  _inherits(Gateway, _React$Component);

  function Gateway(props) {
    _classCallCheck(this, Gateway);

    var _this = _possibleConstructorReturn(this, (Gateway.__proto__ || Object.getPrototypeOf(Gateway)).call(this, props));

    _this.handlePasswordChange = function (event) {
      _this.setState({
        password: event.target.value
      });
    };

    _this.handleUserNameChange = function (event) {
      _this.setState({
        username: event.target.value
      });
    };

    _this.handleSubmit = function (event) {
      event.preventDefault();
      _this.props.login(_this.state.username, _this.state.password);
    };

    _this.state = {
      username: '',
      password: '',
      error: ''
    };
    return _this;
  }

  _createClass(Gateway, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        this.state.error !== '' && _react2.default.createElement(
          'p',
          null,
          this.state.error
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'Username'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { type: 'text',
            required: true,
            value: this.state.username,
            onChange: this.handleUserNameChange })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'Password'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { type: 'password',
            required: true,
            value: this.state.password,
            onChange: this.handlePasswordChange })
        ),
        _react2.default.createElement(
          'button',
          null,
          'Login'
        )
      );
    }
  }]);

  return Gateway;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var session = _ref.session;
  return { error: session.sessionError };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, { login: _session.login })(Gateway);

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(127);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _store = __webpack_require__(126);

var _store2 = _interopRequireDefault(_store);

var _App = __webpack_require__(125);

var _App2 = _interopRequireDefault(_App);

var _session = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_store2.default.dispatch((0, _session.checkSession)());

_reactDom2.default.render(_react2.default.createElement(_App2.default, { store: _store2.default }), document.getElementById('root'));

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = __webpack_require__(69);

var _reducers = __webpack_require__(146);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)(_extends({}, _reducers2.default));

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.checkSession = undefined;

var _axios = __webpack_require__(128);

var _axios2 = _interopRequireDefault(_axios);

var _types = __webpack_require__(75);

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

/***/ 75:
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

},[150]);
//# sourceMappingURL=app.js.map