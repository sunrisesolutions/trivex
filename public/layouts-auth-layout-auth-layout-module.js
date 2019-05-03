(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-auth-layout-auth-layout-module"],{

/***/ "./src/app/layouts/auth-layout/auth-layout.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.module.ts ***!
  \***********************************************************/
/*! exports provided: AuthLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutModule", function() { return AuthLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-layout.routing */ "./src/app/layouts/auth-layout/auth-layout.routing.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _pages_register_register_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/register/register.component */ "./src/app/pages/register/register.component.ts");
/* harmony import */ var _pages_register_event_register_event_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pages/register-event/register-event.component */ "./src/app/pages/register-event/register-event.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AuthLayoutModule = /** @class */ (function () {
    function AuthLayoutModule() {
    }
    AuthLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__["AuthLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"]
            ],
            declarations: [
                _pages_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                _pages_register_register_component__WEBPACK_IMPORTED_MODULE_7__["RegisterComponent"],
                _pages_register_event_register_event_component__WEBPACK_IMPORTED_MODULE_8__["RegisterEventComponent"]
            ]
        })
    ], AuthLayoutModule);
    return AuthLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/auth-layout/auth-layout.routing.ts":
/*!************************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.routing.ts ***!
  \************************************************************/
/*! exports provided: AuthLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutRoutes", function() { return AuthLayoutRoutes; });
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _pages_register_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/register/register.component */ "./src/app/pages/register/register.component.ts");
/* harmony import */ var _pages_register_event_register_event_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/register-event/register-event.component */ "./src/app/pages/register-event/register-event.component.ts");



var AuthLayoutRoutes = [
    { path: "login", component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
    { path: "register", component: _pages_register_register_component__WEBPACK_IMPORTED_MODULE_1__["RegisterComponent"] },
    { path: "register-event/:id", component: _pages_register_event_register_event_component__WEBPACK_IMPORTED_MODULE_2__["RegisterEventComponent"] }
];


/***/ }),

/***/ "./src/app/pages/login/login.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger py-7 py-lg-8\">\n  <div class=\"container\">\n    <div class=\"header-body text-center mb-7\">\n      <div class=\"row justify-content-center\">\n        <div class=\"col-lg-5 col-md-6\">\n          <h1 class=\"text-white\">TRIVESG</h1>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"separator separator-bottom separator-skew zindex-100\">\n    <svg x=\"0\" y=\"0\" viewBox=\"0 0 2560 100\" preserveAspectRatio=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n      <polygon class=\"fill-default\" points=\"2560 0 2560 100 0 100\"></polygon>\n    </svg>\n  </div>\n</div>\n<!-- Page content -->\n<div class=\"container mt--8 pb-5\">\n  <div class=\"row justify-content-center\">\n    <div class=\"col-lg-5 col-md-7\">\n      <div class=\"card bg-secondary shadow border-0\">\n        <div class=\"card-header bg-transparent\">\n          <a class=\"navbar-brand text-center\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">\n            <img style=\"width: 80%; margin-left: 10pt;\" src=\"assets/img/brand/logo.png\" />\n          </a>\n          <div class=\"text-center text-muted mb-4\">\n            <h2>Sign in with credentials</h2>\n          </div>\n          <form (keyup.enter)=\"login()\" role=\"form\">\n            <div *ngIf=\"invalidLogin\" class=\"alert alert-danger\">Invalid</div>\n            <div class=\"form-group mb-3\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-badge\"></i></span>\n                </div>\n                <input [(ngModel)]=\"orgCode\" name=\"orgCode\" class=\"form-control p-2\" placeholder=\"Organisation Code\"\n                  type=\"email\">\n\n              </div>\n            </div>\n\n            <div class=\"form-group mb-3\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-badge\"></i></span>\n                </div>\n                <input [(ngModel)]=\"idNumber\" name=\"idNumber\" class=\"p-2 form-control\" placeholder=\"NRIC/ID Number\"\n                  type=\"password\">\n\n              </div>\n            </div>\n\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-mobile-button\"></i></span>\n                </div>\n                <input [(ngModel)]=\"phone\" name=\"phone\" class=\"p-2 form-control\" placeholder=\"Phone Number\"\n                  type=\"text\">\n\n              </div>\n            </div>\n\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-calendar-grid-58\"></i></span>\n                </div>\n                <input #dobi class=\"form-control p-2 datepicker\" placeholder=\"Date of Birth\" name=\"dob\"\n                  [(ngModel)]=\"dob\" ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\" type=\"text\" [startDate]=\"{year: 1990, month: 1, day: 1}\" [minDate]=\"{year: 1970, month: 1, day: 1}\" />\n\n              </div>\n\n            </div>\n          </form>\n        </div>\n        <div class=\"card-body\">\n          <form role=\"form\">\n            <div class=\"custom-control custom-control-alternative custom-checkbox\">\n              <input class=\"custom-control-input\" id=\" customCheckLogin\" type=\"checkbox\">\n              <label class=\"custom-control-label\" for=\" customCheckLogin\">\n                <span class=\"text-muted\">Remember me</span>\n              </label>\n            </div>\n            <div class=\"text-center\">\n              <button type=\"submit\" class=\"btn btn-primary my-4\" (click)=\"login()\">Sign in</button>\n            </div>\n          </form>\n        </div>\n      </div>\n      <div class=\"row mt-3\">\n        <div class=\"col-6\">\n          <a href=\"javascript:void(0)\" class=\"text-light\"><small>Forgot password?</small></a>\n        </div>\n        <div class=\"col-6 text-right\">\n          <a [routerLink]=\"['/register']\" class=\"text-light\"><small>Create new account</small></a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/login/login.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/login/login.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_settoken_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/settoken.service */ "./src/app/services/settoken.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, service, http, serviceToken) {
        this.router = router;
        this.service = service;
        this.http = http;
        this.serviceToken = serviceToken;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.service.getDataAPI().subscribe(res => {
        //   let get = res.json()["hydra:member"]["0"]["@id"];
        //   this.id = get;
        // });
    };
    LoginComponent.prototype.ngOnDestroy = function () { };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var inputDob = this.dobi.nativeElement.value;
        var formData = new FormData();
        formData.append("org-code", this.orgCode);
        formData.append("phone", this.phone);
        formData.append("id-number", this.idNumber);
        formData.append("birth-date", inputDob);
        var formRef = new FormData();
        this.service.postFormData(formData).subscribe(function (response) {
            var setToken = response.json().token;
            var imID = response.json().im_id;
            console.log("token", response);
            localStorage.setItem("im_id", imID);
            localStorage.setItem("token", setToken);
            var id = response.json().im_id;
            console.log();
            // decoded
            var token = setToken;
            var decoded = jwt_decode__WEBPACK_IMPORTED_MODULE_4__(token);
            console.log(decoded);
            //refresh
            var date = ~~(Date.now() / 1000);
            console.log(date);
            formRef.append("refresh_token", response.json().refresh_token);
            if (decoded.exp < date) {
                _this.service.refreshToken(formRef).subscribe(function (response) {
                    localStorage.setItem("token", response.json().token);
                    console.log("token_refreshed", response);
                });
            }
            _this.router.navigate(["club-members/" + id + "/qr-code"]);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])("dobi"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"])
    ], LoginComponent.prototype, "dobi", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-login",
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/pages/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/pages/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_post_service__WEBPACK_IMPORTED_MODULE_0__["PostService"],
            _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            src_app_services_settoken_service__WEBPACK_IMPORTED_MODULE_5__["SettokenService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/pages/register-event/register-event.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pages/register-event/register-event.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger py-7 py-lg-8\">\n  <div class=\"container\">\n    <div class=\"header-body text-center mb-7\">\n      <div class=\"row justify-content-center\">\n        <div class=\"col-lg-5 col-md-6\">\n          <h1 class=\"text-white\">TRIVESG</h1>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"separator separator-bottom separator-skew zindex-100\">\n    <svg x=\"0\" y=\"0\" viewBox=\"0 0 2560 100\" preserveAspectRatio=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n      <polygon class=\"fill-default\" points=\"2560 0 2560 100 0 100\"></polygon>\n    </svg>\n  </div>\n</div>\n<!-- Page content -->\n<div class=\"container mt--8 pb-5\">\n  <!-- Table -->\n  <div class=\"row justify-content-center\">\n    <div class=\"col-lg-6 col-md-8\">\n      <div *ngIf=\"done\" class=\"card bg-secondary shadow border-0\">\n        <div class=\"card-header bg-transparent pb-5\">\n          <div class=\"text-center text-muted\">\n            <h2>Register event successfully!</h2>\n            <small>Your information has been submitted and the registration is pending approval from our\n              administrator.</small>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"!done\" class=\"card bg-secondary shadow border-0\">\n        <div *ngIf=\"step == 1\" class=\"card-body\">\n          <form class=\"text-center\">\n            <h3>Please select your status.</h3>\n            <div class=\"row mt-4\">\n              <div class=\"col-md-6 mb-5 mb-lg-0\">\n                <div class=\"px-4\">\n                  <img (click)=\"toLogin()\" src=\"../assets/img/theme/team-1-800x800.jpg\"\n                    class=\"rounded-circle img-center img-fluid shadow shadow-lg--hover\" style=\"width: 200px;\">\n                  <div class=\"pt-4 text-center\">\n\n                    <div class=\"mt-3\">\n\n                        <button type=\"button\" (click)=\"toLogin()\" class=\"btn btn-primary\">A member</button>\n\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-6 mb-5 mb-lg-0\">\n                <div class=\"px-4\">\n                  <img src=\"../assets/img/theme/team-2-800x800.jpg\"\n                    class=\"rounded-circle img-center img-fluid shadow shadow-lg--hover\" style=\"width: 200px;\">\n                  <div class=\"pt-4 text-center\">\n                    <div class=\"mt-3\">\n                      <button type=\"button\" (click)=\"model.role = 'host'; step = 2\" class=\"btn btn-warning\">Not a member</button>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n        <div *ngIf=\"step == 2\" class=\"card-body bg-transparent pb-5\">\n          <div class=\"text-center text-muted mb-4\">\n            <h2>Register an event</h2>\n          </div>\n\n          <form role=\"form\">\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"First Name\" type=\"text\" [(ngModel)]=\"registration.givenName\"\n                  name=\"givenName\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Last Name\" type=\"text\" [(ngModel)]=\"registration.familyName\"\n                  name=\"familyName\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-calendar-grid-58\"></i></span>\n                </div>\n                <input class=\"form-control datepicker\" placeholder=\"Date of Birth\" [(ngModel)]=\"dob\" name=\"dob\"\n                  ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\" type=\"text\" />\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Phone Number\" type=\"text\"\n                  [(ngModel)]=\"registration.phoneNumber\" name=\"phoneNumber\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"custom-control custom-control-alternative custom-checkbox\">\n                <input class=\"custom-control-input\" id=\"maleCheckbox\" type=\"checkbox\"\n                  [checked]=\"registration.gender == 'Male'\" (change)=\"registration.gender = 'Male'\">\n                <label class=\"custom-control-label\" for=\"maleCheckbox\">\n                  <span class=\"text-muted\">Male</span>\n                </label>\n              </div>\n              <div class=\"custom-control custom-control-alternative custom-checkbox\">\n                <input class=\"custom-control-input\" id=\"femaleCheckbox\" name=\"gender\" type=\"checkbox\"\n                  [checked]=\"registration.gender == 'Female'\" (change)=\"registration.gender = 'Female'\">\n                <label class=\"custom-control-label\" for=\"femaleCheckbox\">\n                  <span class=\"text-muted\">Female</span>\n                </label>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-email-83\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Email\" type=\"email\" [(ngModel)]=\"registration.email\"\n                  name=\"email\">\n              </div>\n            </div>\n            <!-- <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-lock-circle-open\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Password\" type=\"password\">\n              </div>\n            </div>\n            <div class=\"text-muted font-italic\"><small>password strength: <span class=\"text-success font-weight-700\">strong</span></small></div>\n            <div class=\"row my-4\">\n              <div class=\"col-12\">\n                <div class=\"custom-control custom-control-alternative custom-checkbox\">\n                  <input class=\"custom-control-input\" id=\"customCheckRegister\" type=\"checkbox\">\n                  <label class=\"custom-control-label\" for=\"customCheckRegister\">\n                    <span class=\"text-muted\">I agree with the <a href=\"#!\">Privacy Policy</a></span>\n                  </label>\n                </div>\n              </div>\n            </div> -->\n            <div *ngIf=\"error\" class=\"alert alert-danger\">\n              {{error}}\n            </div>\n            <div class=\"text-center\">\n              <button (click)=\"registerEvent()\" [disabled]=\"loading\" type=\"button\" class=\"btn btn-primary mt-4\">Register\n                Event</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/register-event/register-event.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/register-event/register-event.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3JlZ2lzdGVyLWV2ZW50L3JlZ2lzdGVyLWV2ZW50LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/register-event/register-event.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/register-event/register-event.component.ts ***!
  \******************************************************************/
/*! exports provided: RegisterEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterEventComponent", function() { return RegisterEventComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_attendee_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/attendee.service */ "./src/app/services/attendee.service.ts");
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterEventComponent = /** @class */ (function () {
    function RegisterEventComponent(service, attendeeService, router) {
        this.service = service;
        this.attendeeService = attendeeService;
        this.router = router;
        this.model = {
            role: ""
        };
        this.registration = {
            event: null,
            middleName: "",
            birthDate: "",
            givenName: "",
            familyName: "",
            gender: "",
            email: "",
            phoneNumber: "",
            accessToken: "token"
        };
        this.step = 1;
        this.done = false;
        this.loading = false;
        this.error = "";
    }
    RegisterEventComponent.prototype.ngOnInit = function () {
    };
    RegisterEventComponent.prototype.registerEvent = function () {
        var _this = this;
        this.loading = true;
        if (this.dob) {
            this.registration.birthDate = new Date(this.dob.year, this.dob.month, this.dob.day).toISOString();
        }
        this.attendee = {
            registration: this.registration
        };
        this.attendeeService.postAttendee(this.attendee).subscribe(function (res) {
            _this.loading = false;
            _this.done = true;
            console.log(res);
        }, function (err) {
            _this.error = err.error["hydra:description"];
            _this.loading = false;
        });
    };
    RegisterEventComponent.prototype.toLogin = function () {
        this.router.navigate['/login'];
    };
    RegisterEventComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-register-event",
            template: __webpack_require__(/*! ./register-event.component.html */ "./src/app/pages/register-event/register-event.component.html"),
            styles: [__webpack_require__(/*! ./register-event.component.scss */ "./src/app/pages/register-event/register-event.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_post_service__WEBPACK_IMPORTED_MODULE_3__["PostService"],
            _services_attendee_service__WEBPACK_IMPORTED_MODULE_2__["AttendeeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], RegisterEventComponent);
    return RegisterEventComponent;
}());



/***/ }),

/***/ "./src/app/pages/register/register.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/register/register.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger py-7 py-lg-8\">\n  <div class=\"container\">\n    <div class=\"header-body text-center mb-7\">\n      <div class=\"row justify-content-center\">\n        <div class=\"col-lg-5 col-md-6\">\n          <h1 class=\"text-white\">TRIVESG</h1>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"separator separator-bottom separator-skew zindex-100\">\n    <svg x=\"0\" y=\"0\" viewBox=\"0 0 2560 100\" preserveAspectRatio=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n      <polygon class=\"fill-default\" points=\"2560 0 2560 100 0 100\"></polygon>\n    </svg>\n  </div>\n</div>\n<!-- Page content -->\n<div class=\"container mt--8 pb-5\">\n  <!-- Table -->\n  <div class=\"row justify-content-center\">\n    <div class=\"col-lg-6 col-md-8\">\n      <div *ngIf=\"done\" class=\"card bg-secondary shadow border-0\">\n        <div class=\"card-header bg-transparent pb-5\">\n          <div class=\"text-center text-muted\">\n            <h2>Sign up successfully!</h2>\n            <small>Your information has been submitted and the registration is pending approval from our administrator.</small>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"!done\" class=\"card bg-secondary shadow border-0\">\n        <div class=\"card-header bg-transparent pb-5\">\n          <div class=\"text-center text-muted mb-4\">\n            <h2>Sign up with credentials</h2>\n          </div>\n          <form role=\"form\">\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"First Name\" type=\"text\" [(ngModel)]=\"registration.givenName\" name=\"givenName\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Last Name\" type=\"text\" [(ngModel)]=\"registration.familyName\" name=\"familyName\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-calendar-grid-58\"></i></span>\n                </div>\n                <input class=\"form-control datepicker\" placeholder=\"Date of Birth\" [(ngModel)]=\"dob\" name=\"dob\" ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\" type=\"text\"/>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Phone Number\" type=\"text\" [(ngModel)]=\"registration.phoneNumber\" name=\"phoneNumber\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"custom-control custom-control-alternative custom-checkbox\">\n                <input class=\"custom-control-input\" id=\"maleCheckbox\" type=\"checkbox\" [checked]=\"registration.gender == 'Male'\" (change)=\"registration.gender = 'Male'\">\n                <label class=\"custom-control-label\" for=\"maleCheckbox\">\n                  <span class=\"text-muted\">Male</span>\n                </label>\n              </div>\n              <div class=\"custom-control custom-control-alternative custom-checkbox\">\n                <input class=\"custom-control-input\" id=\"femaleCheckbox\" name=\"gender\" type=\"checkbox\" [checked]=\"registration.gender == 'Female'\" (change)=\"registration.gender = 'Female'\">\n                <label class=\"custom-control-label\" for=\"femaleCheckbox\">\n                  <span class=\"text-muted\">Female</span>\n                </label>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-email-83\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Email\" type=\"email\" [(ngModel)]=\"registration.email\" name=\"email\">\n              </div>\n            </div>\n            <!-- <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-lock-circle-open\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Password\" type=\"password\">\n              </div>\n            </div>\n            <div class=\"text-muted font-italic\"><small>password strength: <span class=\"text-success font-weight-700\">strong</span></small></div>\n            <div class=\"row my-4\">\n              <div class=\"col-12\">\n                <div class=\"custom-control custom-control-alternative custom-checkbox\">\n                  <input class=\"custom-control-input\" id=\"customCheckRegister\" type=\"checkbox\">\n                  <label class=\"custom-control-label\" for=\"customCheckRegister\">\n                    <span class=\"text-muted\">I agree with the <a href=\"#!\">Privacy Policy</a></span>\n                  </label>\n                </div>\n              </div>\n            </div> -->\n            <div *ngIf=\"error\" class=\"alert alert-danger\">\n              {{error}}\n            </div>\n            <div class=\"text-center\">\n              <button (click)=\"register()\" [disabled]=\"loading\" type=\"button\" class=\"btn btn-primary mt-4\">Create account</button>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-body px-lg-5 py-lg-5\">\n          <div class=\"text-center\">\n            <a href=\"javascript:void(0)\" class=\"btn btn-neutral btn-icon mx-2 my-2\">\n              <span class=\"btn-inner--icon\"><img src=\"assets/img/icons/common/facebook.svg\"></span>\n              <span class=\"btn-inner--text\">Facebook</span>\n            </a>\n            <a href=\"javascript:void(0)\" class=\"btn btn-neutral btn-icon mx-2 my-2\">\n              <span class=\"btn-inner--icon\"><img src=\"assets/img/icons/common/twitter.svg\"></span>\n              <span class=\"btn-inner--text\">Twitter</span>\n            </a>\n            <a href=\"javascript:void(0)\" class=\"btn btn-neutral btn-icon mx-2 my-2\">\n              <span class=\"btn-inner--icon\"><img src=\"assets/img/icons/common/google.svg\"></span>\n              <span class=\"btn-inner--text\">Google</span>\n            </a>\n          </div>\n          <div class=\"text-muted text-center mt-4 mb-2\"><small>Already have an account?</small></div>\n          <div class=\"text-center\">\n            <a [routerLink]=\"['/login']\" type=\"button\" class=\"btn btn-primary mb-4\">Login</a>\n          </div>\n        </div>            \n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/register/register.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/register/register.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/register/register.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/register/register.component.ts ***!
  \******************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService) {
        this.authService = authService;
        this.done = false;
        this.loading = false;
        this.error = '';
        this.registration = {
            middleName: '',
            birthDate: '',
            givenName: '',
            familyName: '',
            gender: '',
            email: '',
            phoneNumber: '',
            accessToken: 'token'
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        if (this.dob) {
            this.registration.birthDate = new Date(this.dob.year, this.dob.month, this.dob.day).toISOString();
        }
        this.authService.postRegistration(this.registration).subscribe(function (res) {
            console.log(res);
            _this.loading = false;
            _this.done = true;
        }, function (err) {
            _this.error = err.error['hydra:description'];
            _this.loading = false;
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/pages/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/pages/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/services/attendee.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/attendee.service.ts ***!
  \**********************************************/
/*! exports provided: AttendeeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendeeService", function() { return AttendeeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AttendeeService = /** @class */ (function () {
    function AttendeeService(http) {
        this.http = http;
        this.apiBase = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].eventApiBase;
        this.route = '/attendees';
        this.url = "" + this.apiBase + this.route;
    }
    AttendeeService.prototype.postAttendee = function (attendee) {
        return this.http.post(this.url, attendee, { headers: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"].getHeaders() });
    };
    AttendeeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AttendeeService);
    return AttendeeService;
}());



/***/ }),

/***/ "./src/app/services/settoken.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/settoken.service.ts ***!
  \**********************************************/
/*! exports provided: SettokenService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettokenService", function() { return SettokenService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettokenService = /** @class */ (function () {
    function SettokenService() {
    }
    SettokenService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SettokenService);
    return SettokenService;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-auth-layout-auth-layout-module.js.map