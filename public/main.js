(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./layouts/admin-layout/admin-layout.module": [
		"./src/app/layouts/admin-layout/admin-layout.module.ts",
		"layouts-admin-layout-admin-layout-module"
	],
	"./layouts/auth-layout/auth-layout.module": [
		"./src/app/layouts/auth-layout/auth-layout.module.ts",
		"layouts-auth-layout-auth-layout-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'argon-dashboard-angular';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layouts/admin-layout/admin-layout.component */ "./src/app/layouts/admin-layout/admin-layout.component.ts");
/* harmony import */ var _layouts_auth_layout_auth_layout_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layouts/auth-layout/auth-layout.component */ "./src/app/layouts/auth-layout/auth-layout.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/fesm5/service-worker.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_12__["ComponentsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__["NgbModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_6__["HttpModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_service_worker__WEBPACK_IMPORTED_MODULE_13__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production }),
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_8__["AdminLayoutComponent"],
                _layouts_auth_layout_auth_layout_component__WEBPACK_IMPORTED_MODULE_9__["AuthLayoutComponent"],
            ],
            providers: [
                _services_post_service__WEBPACK_IMPORTED_MODULE_0__["PostService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layouts/admin-layout/admin-layout.component */ "./src/app/layouts/admin-layout/admin-layout.component.ts");
/* harmony import */ var _layouts_auth_layout_auth_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layouts/auth-layout/auth-layout.component */ "./src/app/layouts/auth-layout/auth-layout.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        redirectTo: '/club-members',
        pathMatch: 'full',
    }, {
        path: '',
        component: _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_4__["AdminLayoutComponent"],
        canActivate: [_services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"]],
        children: [
            {
                path: '',
                loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
            }
        ]
    }, {
        path: '',
        component: _layouts_auth_layout_auth_layout_component__WEBPACK_IMPORTED_MODULE_5__["AuthLayoutComponent"],
        children: [
            {
                path: '',
                loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
            }
        ]
    }, {
        path: '**',
        redirectTo: 'dashboard'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes)
            ],
            exports: [],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/components.module.ts":
/*!*************************************************!*\
  !*** ./src/app/components/components.module.ts ***!
  \*************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "./src/app/components/sidebar/sidebar.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/components/navbar/navbar.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/components/footer/footer.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"]
            ],
            declarations: [
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"],
                _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__["SidebarComponent"]
            ],
            exports: [
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"],
                _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__["SidebarComponent"]
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/components/footer/footer.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/footer/footer.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <footer class=\"footer\">\n  <div class=\"row align-items-center justify-content-xl-between\">\n    <div class=\"col-xl-6\">\n      <div class=\"copyright text-center text-xl-left text-muted\">\n        &copy; {{ test | date: \"yyyy\" }} <a href=\"https://www.creative-tim.com?ref=ada-footer-admin-layout\" class=\"font-weight-bold ml-1\" target=\"_blank\">Creative Tim</a>\n      </div>\n    </div>\n    <div class=\"col-xl-6\">\n      <ul class=\"nav nav-footer justify-content-center justify-content-xl-end\">\n        <li class=\"nav-item\">\n          <a href=\"https://www.creative-tim.com?ref=ada-footer-admin-layout\" class=\"nav-link\" target=\"_blank\">Creative Tim</a>\n        </li>\n        <li class=\"nav-item\">\n          <a href=\"https://www.creative-tim.com/presentation?ref=ada-footer-admin-layout\" class=\"nav-link\" target=\"_blank\">About Us</a>\n        </li>\n        <li class=\"nav-item\">\n          <a href=\"http://blog.creative-tim.com?ref=ada-footer-admin-layout\" class=\"nav-link\" target=\"_blank\">Blog</a>\n        </li>\n        <li class=\"nav-item\">\n          <a href=\"https://github.com/creativetimofficial/argon-dashboard-angular/blob/master/LICENSE.md\" class=\"nav-link\" target=\"_blank\">MIT License</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</footer>\n -->"

/***/ }),

/***/ "./src/app/components/footer/footer.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/footer/footer.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/components/footer/footer.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
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

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.test = new Date();
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/components/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/components/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/components/navbar/navbar.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-top navbar-expand-md navbar-dark bg-gradient-danger \" id=\"navbar-main\">\n  <div class=\"container-fluid\">\n    <!-- Brand -->\n    <a style=\"margin-left: 180pt !important;\" class=\"h4 mb-0 text-white text-uppercase d-none d-lg-inline-block\"\n      routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">{{getTitle()}}</a>\n    <!-- Form -->\n    <form class=\"navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto ml-md-auto mr-md-5\">\n      <div class=\"form-group mb-0\" [ngClass]=\"{ 'focused': focus === true }\">\n        <div class=\"input-group input-group-alternative\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\"><i class=\"fas fa-search\"></i></span>\n          </div>\n          <input class=\"form-control\" placeholder=\"Search\" type=\"text\" (focus)=\"focus = true\" (blur)=\"focus = false\">\n        </div>\n      </div>\n    </form>\n    <!-- User -->\n    <ul class=\"navbar-nav align-items-center d-none d-md-flex\">\n      <li class=\"nav-item\" ngbDropdown placement=\"bottom-right\">\n        <a class=\"nav-link\" role=\"button\" ngbDropdownToggle>\n          <i class=\"ni ni-bell-55\"></i>\n          <span class=\"badge\" style=\"\">10</span>\n        </a>\n        <div role=\"button\" ngbDropdownMenu\n          class=\"dropdown-menu dropdown-menu-xl ml-md-5 dropdown-menu-right py-0 overflow-hidden\">\n          <!-- Dropdown header -->\n          <div class=\"px-3 py-3\">\n            <h6 class=\"text-sm text-muted m-0\">You have <strong class=\"text-primary\">13</strong> notifications.</h6>\n          </div>\n          <!-- List group -->\n          <div style=\"height: 50vh !important;overflow-y: scroll;\">\n            <div *ngFor=\"let a of alert\" class=\"list-group list-group-flush\">\n              <a href=\"#!\" class=\"list-group-item list-group-item-action\">\n                <div class=\"row align-items-center\">\n                  <div class=\"col-auto\">\n                    <!-- Avatar -->\n                    <img alt=\"Image placeholder\" [src]=a.img class=\"avatar rounded-circle\">\n                  </div>\n                  <div class=\"col ml--2\">\n                    <div class=\"d-flex justify-content-between align-items-center\">\n                      <div>\n                        <h4 class=\"mb-0 text-sm\">default Member</h4>\n                      </div>\n                      <div class=\"text-right text-muted\">\n                        <small>2 hrs ago</small>\n                      </div>\n                    </div>\n                    <p class=\"text-sm mb-0\">Let's meet at Starbucks at 11:30. Wdyt?</p>\n                  </div>\n                </div>\n              </a>\n            </div>\n          </div>\n          <!-- View all -->\n          <a href=\"#!\" class=\"dropdown-item text-center text-primary font-weight-bold py-3\">View all</a>\n        </div>\n      </li>\n      <li class=\"nav-item\" ngbDropdown placement=\"bottom-right\">\n        <a *ngFor=\"let member of members\" class=\"nav-link pr-0\" role=\"button\" ngbDropdownToggle>\n          <div class=\"media align-items-center\">\n            <span class=\"avatar avatar-sm rounded-circle\">\n              <img alt=\"Image placeholder\" [src]=member.profilePicture>\n            </span>\n            <div class=\"media-body ml-2 d-none d-lg-block\">\n              <span class=\"mb-0 text-sm  font-weight-bold\">{{member.personData.name}}</span>\n            </div>\n          </div>\n        </a>\n        <div class=\"dropdown-menu-arrow dropdown-menu-right\" ngbDropdownMenu>\n          <div class=\" dropdown-header noti-title\">\n            <h6 class=\"text-overflow m-0\">Welcome!</h6>\n          </div>\n          <a routerLinkActive=\"active\" (click)=\"toInfo()\" class=\"dropdown-item\">\n            <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\n            <span>My profile</span>\n          </a>\n          <a routerLinkActive=\"active\" (click)=\"toQrCode()\" class=\"dropdown-item\">\n            <i class=\"fa fa-qrcode\" aria-hidden=\"true\"></i>\n            <span>Qr Code</span>\n          </a>\n          <div class=\"dropdown-divider\"></div>\n          <a href=\"#\" (click)=\"logout()\" class=\"dropdown-item\">\n            <i class=\"ni ni-user-run\"></i>\n            <span>Logout</span>\n          </a>\n        </div>\n      </li>\n    </ul>\n  </div>\n</nav>"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar-top {\n  position: fixed !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25ndXllbnRydW9uZy93b3Jrc3BhY2UvbWFnZW50YS90cml2ZXgvc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwwQkFBMEIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXZiYXItdG9we1xuICAgIHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.ts ***!
  \*******************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sidebar/sidebar.component */ "./src/app/components/sidebar/sidebar.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(location, service, element, router, routes) {
        this.service = service;
        this.element = element;
        this.router = router;
        this.routes = routes;
        // Demo
        this.alert = [
            { img: 'https://i.ytimg.com/vi/GQGMwptqNjo/maxresdefault.jpg', name: 'Bean', title: name + " commented on your post" },
            { img: 'https://cdn.vox-cdn.com/thumbor/J2yuRomaoTRwazSaqRr5B6GwlLU=/0x0:779x439/1200x800/filters:focal(331x96:455x220)/cdn.vox-cdn.com/uploads/chorus_image/image/63729010/daf23dc1b438ed146ee9f9d1145f9e4d.0.png', name: 'Spider Man', title: name + " liked your post" },
            { img: 'data:image/jpeg;base64,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', name: 'Bat Man', title: 'liked your post' },
            { img: 'data:image/jpeg;base64,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', name: 'Bat Man', title: 'liked your post' },
            { img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSERIWFhUWFxcWFhUYGBYXFxcXGBcWGBcYFxYbHSggGB0lHhgWITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lICUtLy0vLy0tLS0tLS0tMistLS0tLS0tLS0tLS0tLS0tMC0tLS0tLS0tLy0tLS0tLS01Lf/AABEIARQAtgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBQYCB//EAEMQAAEDAQUEBwUGBQMDBQAAAAEAAhEDBBIhMUEFUWFxEyKBkaGx8AYyQsHRFCNSYnLhM4KSsvEkU8KTotIVFmNzs//EABoBAQEBAQEBAQAAAAAAAAAAAAACAQMEBQb/xAAuEQACAgEDAwAIBwEAAAAAAAAAAQIRAxIhMQRBURMiMmGRobHwBRRxgcHR4TP/2gAMAwEAAhEDEQA/APDUIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQlCEAiEIQAhCEAIQhACUhO2OgXvawfEQPqnrfF4gfC5zOwE3fDDsQrT6tkRCVTrLsWu/FtJ0bzAHjCxtLk2GOU3UU3+hAQtAz2Uq6lo5uI8mlLU9mKg0DuT//ACYFOuPk9H5HOuYszqFZ2jZTme8Ht4loLe1zSfJRvsTiJbD/ANJk92fgqs4vDNOqIqF0Wqy2Ls/pek4MMfqOXkVSVnIq0JSEiwAhCEAIQhACEIQAhCEAIQhACEIQF97K2aX9IfhBjwHzUGzWU1q5YPic4k7hJJK0HsxS+6PH6u+UJn2RssPqOOhuDvk+QXNyq2fTj0+r0UOz3Zd7N2PSpDqtl34nYns3disSUhUWvaAMyvJvJn6J6OnhSVDznrguUI24euU+uST7WPGP+4tXVYzwZOsT7kpzlVW3Z1N+MXXaObgZ+aldODkfWH1HemqlUeuYHzHeusY0fOz5lMz9tYWm7XF4aVW+/wBs+9yPerT2fYGUi4GZJM8suW/tVZtmuHCBwIy3T25j+lGwbRDKzZ+G8PI+YXeGzPmZ5uS3/wBIO2KNytUaMrxI5HEeahK59rGRaDxa0+EfJUyySpkLgEIQsNBCEIAQhCAEIQgBCEIAShIlCA2vs40/Z51JMdjWj5J/YVK6wn8bi8/zAFc+zg/0zebv7iu7HaQHPZkGuIHaA7/l4LzPe0fosdRWOT8FpVdAlY3ae0Os6TjiAIOcEYg5YndOC19J15vOfpuCy/tbY2i69og5Hlofl2rMNJ0V+KapY1OJVVNozIbOvjf48R3Jxm0TOeoObh8c7yqpC9R+d1suaVuIGR0M5j3W7v0E9iS1248h45uy1+EdyqA4jIoc4nMyhls6qPk+A5DJSdkSarWj4uqeUgnyUNWPs8P9Qzt/tK1ckvgsfban95TdGbI7ifqs4tb7dtwoHg//AILJKp+0ZDgEIQoKBCEIAQhCAEIQgBCEIAShIhAb/YjYs7Obv73Krs9WatYfmBzByaJjHHLQnlun2Op/p2gZkv8A73c59YFVmxWl1R7t5fv5Cf8AK4Jcs+7ml/yivC+hY2W3QwQd8D9R6qrNt2q+12PLkI+cnsVWy3OaLhExhnuvD5lRrRaL3L1r6zVqFOzxZescsegYQiUi6HzwQlhO2WgXuDRqfDUoBpW+wRFWl+a/5R8lG+xOdgxsuMktEdUaSe/wVhRoGn0MiHNc0nhLiMcYGYVRRLfYk+2dcPbZ3NMgh5B4G4sura3NP2Wgdzqg8f2VSknbsR4FCUpAUSpKEQlKRACEIQAhCEAIQhAC7otkgb1wnrI4B0nc7+0oVFJySZralkcKTabi4C6CHSAS5xLvDEFObIszQw9FMDqh2HWI948pw7MOLtaq2o94J6tNkujSRMd3kqAbffTY2nSaGXRBLhJzJy7dVwVtH2sssWLJqfG6Xd7bff6Eq2bOpAnpGlhJ6rgeq45wdGz2Kn2jYbl1zTLHDA59k71r7NbqNpZGEkQ5jsD3a8wqr7A6k4su36Tsgfhdx1jj3qoS7M8vU4I1qhTT7r+TN9FlGvnPkkdSIAMYGY7M1odo0C6nHVvNAIu4NLd43KI6kS0b2MD2j9ZN7xELqtz58lRA6C866CIaAHOJho348+9SqFEtvim8FuF+oIwHBuaLZZmsBugkvLQARlGLhxMx3q22dsd+F+pAdN5jQACCMRI7vJWlucnIoXsc0l1NzokwZhxG8wpljqvqsLSbz2lpEzlIMeHitBtmysp0i4NAjAfRUlgtRp0S+9SMki4WguOOUgz3ytqmLtFntbZ92g6mMbofVBj/AORpjsaSscvSXuD6JcRdPRuF3deAJB7l5smRcCDBCELmWKgpEpQCIQhACEIQAhCEALqm6D3+S5ShAbj2aN5lUnWoR2BoCj7R2W2+akAvPwu9wnAd/A5qD7N7WbTLmPMBxJB4nQ+C0loDXiL5E/hIB/Zed3GR+gx+j6jpoq90O2L2N2dXZItrqNY43KnRMung3C8J1a5QdtbLr2RvWr2e0097arBUu69Quk9l5Ve1bESOpWLoBgOAJ5Xh896p6GynH3jdGmRJXZNNHy8kZY5NRRJtVppkNLDg10gTBAJxEaBIK7L1Ql0yLoM6XN3MLtuxQJvXo0OA7zOHaE3a7EymwuuGZjExE6wM9dVSZ5pxfcktew3azjBzaCcBj13HfmABwWz2N7NV3/eOr0KLSJF94qPIzm6xwY3vnevMrQ4iGn4RlMgE4nt+iYVajkoruege1+z7BSYXPtr7TXMhlOk6n0bTvdAddaN0yfEYuwBgcH1fdGIbq46YblElJKy97KZqKe1HVDTu4NPTXm8AzCd/7rLLS7HYBZnPjrBtWDukCfILNKpdiYioSLoKChEi6KRAIhCEAIQhACEIQAhCEBY2CwdKx9332wc82mZHPJSrNa3NpBxh0uLAMb8gSNDIxHoqHs22dGXfmYR9FM9maF6sHO9xhvmcp07s+xSz0Qa9XTz3H7Fs+rUqzWJpkfDk4/pB044q+o2QMkzPcPR/ZaNtNtRvWAc3jBxwjA81VVNh1DeJeAC6W04kNaCIBdMkmMcxiQFw9Jb8H1Y9N6ONpX7yPUaIhZ7bbA1gj8ccgSXK/tc0v4oug4Xs2TuvadsLP+0Z+75vw7jlwXSB5Ospoz1R0kniVwnm0cJOA0nXkNVJ2bs59d12kMhJcchundO5dT5pEp0iccAN5MKXaNn3QyHhzqkFrW44HASeeHYVrWbLp9B0bmBujzMkH8d4jTPvWKs9csdeb7wyO478UKapGm2hS6CzdGMZaQ48TEnvKySvHgmygkkkh7jPGrTE+BVGrmc4iroLlKCoKApEIQCIQhACEIQAhCEAJQkTlnEuHPyxQCvZBg8u7ArT+xbA5tYHQA9ha8Ku2fQa+nUc8TgXSJkEOxI/q5eas/YgFteozDFkjHA3XtIIPESom9mezp8VZIN9/wDTbMuU2B7y0XAJc4gASc53kkeC7o7UoP8AcrU3cnN8pVDtTZ9WvZ6lK8LzH3hAPXN1roM8XP7mqBsayWQ3arGMdLA2pSqS4scMyJGpwx58F5tCe9n2PzE4yUUlXv8An8DX1OjfNMlrpGLZBwO8bl5ttbZNWk6s5rC2lTf1b2IhxgFs4FX1fatjpuwoU2katayR2jEdyX/3HZD1jenKJqEd2S6QUonl6mWLNtJpNffgyFhsFSu/CfzOOQH13BbOx1aFFgptcGYA3nZOP4nE+WfgqbaO0LLUBbTYwHHFwIxPGJlV1DZLLt51Zh/SRnxJ+i9EWfJnFRdJ2X22NptNnc9sdZxYYN4XgCM9RA8QsrQs33tNrhmWkg7iZg9iHh0OptMtkvHG6HCR2T3Kwsz79qdUPwjLeYDQB2+S1bsiT2LHaFNoZVa0Q1lJmG6XuJ8llKrYJG4kLbWmiRZ6xd7zmuce7ADgAIWJqGTO9XM5w4OEqRKuZYISpEAiEpSIAQhCAEJQFY0di1XMD4gEw0GbzzE9UR5wsbSLhjlP2VZWp6y0XOddYCSdAtBsz2Uc6HVnXB+EYuPbkPFaShYqdJhbSaG4Z6ndJ1XOWZLZH0cH4VlmtU/VXz+H9mb2JZDdq0znDx+LEdGcsJyUGx7QdQrh+d0zEzg4Q5pMDfuwPLG39nZv1JHxuB7Wn/xVNtqjdrlpyyxww5yYERlhwC1btojLFxwwnHs2v6N7s+3mqWvpxDpBO4547uzeDwVVaPZtlR5qOdEzLWC7JnG8csxoAsnsjaNSi+WHDNzZwcG59sTitrsfazKoN0/mg5id/as0OLtFRzwzR0z5OKXsvZtaZP8AM76qUzY9naLoo09cxePeZKlutH+VUjapdXDGscW4gvg3Zgn5Ik2ZKUIbJL4HNs9mrO+YaWHe04f0nBQ6fs/SoySOkO94Aawb4+Izp5a3rnKl2jtFjgb7uoMh+IwYw+WvKV0R55xT3op9stawNLTiWhrBqBJlxg6wT/MEzsRoBc843QSTx3T6lQbfbDVqF2QyaNwyCkveWNZTBi8Q52WQPV1y94xO5XE8uTfg1kXqNUb21PIrAXcJ7F6Hs5oLI0LYw4hZXamyTZveIex+ExDgRJEDhvVzW1nODKVInHUSBOBHAzHPcuFyOgiUJEqARCEICVZNn1Kn8NpMCfUq0sWwHSDVa9rRJdljuDfmVo9kUG0GXC4FxxJA7AAM4A+actFobmO8QZ+p4Yrg8rukfbxfh2OMFPJLfxsVNlNC87orl4DqNuC9lo5xMu4+ClWXa3Sm44wRgWkQQ4YhwGhGrceBwIVbadm0XOkO6M7xi2eU4dncnWsNNzftbA9owZXEmN14jHvxBRpM2OTLF0qS71x+/j6FhtG3luGsDkRvHA4489YVM/b9SbrcTOClbb2aXAOY6T8MHB4OOBGF7XjzWZpkhwO4qoRjR5+r6jNHJVtGq2dLK9YOEYhw3RjiOw+aie0lD/UMI1Ek5e7qTG7UqTYXw9jHmbzAMczhJ9f5Una1H7xhGjHNz/TGKziR0ktfTteH9TG2gQ4556wDjywS2e0PpuvMcWuGoXe0WQ86dkeGXdhuSVnhzQQACMHRrgIJ7iux8h7Mn1faGs4QbvcR5FdM9pKwEC7EQMMuWKpUIbrl5LGvtmq5t2QBMkNETzOqgveTmuEIY22OUQJF6QJxIz7FJZUL6t484GgGAHkMAo9RoAbvIk5HPLkrHYFnvPnQR9ezv71q8Evya6z1m02i+4NGAkmBPM8l3aadKs26668cCDHEEZKl9qXDoGjUvHg131WVa+MQY5LrKdbHOMbVl7bvZuow3qRvDdk4fIqpq1ajXQ+8Dud9DhCs9m+0dRnVqddvH3h269quDaqFdsgXtbkdcch9JU0nwVbXJlaga+CC1rtWwQ08QchywTD2EZhXZ2fQqOIpOMjNnuu7A7A+CZbsyowk0iHxm3Fro1DmHPsJUuLNspyhSK1NsnNh1a6cO2J7whZRRoDa6NT3a13hUbGPNuHeCmKzKgF4dcauYb4jsx7IAVVUtF7NgJ/TB/7Y8VzSqhpm6Qd7XFrgoo9Tz6ufl9skPt0zM+tCPkn7Lth9PAG+w5sdiO44t7ME0bQ1/vODv/sEO/6jce9N1rFGIBA3mC3se3DvhKT5IU5xeqDL/ZtupOwpdWfes7z1SdTSdoeHgM1G2ts9rj0gw0N7DHdU3H82vic85pGf18VZbP2u5pAebzcscwOZzHAqdFO0d31SyQ0TX3/H7be4fdXuWhk4dVgdJgDAHHMetFe7TqAXSdFmtr2d7ahq5tcZDhlwHDBSa9t6Sm6cw2Y4dZHHdM3Hm0xnF9yHt6nFTLMesNOzzlV9M6HUeOnirLaJv06TtbpB5tzz5KrCtHjye1YhCRdFcrSAXTBJjeuUoQDlepJns34AQFd7BeGtk/E8MHM4mPBUTGyQN+HqFd04Nop0m+6x3/eSLx9blUebJluqE9qqvWYz8IJ/q/x4qjU/blp6Ss9wymByGCgBJO2bFUhQgOjEYJyo8EZQeGR7NOxNQpNJTraXfxOtGTjg8fzDE9sp6ltRwwcS8DKSQ8fpeMR4jgq5C22ZRfjatN4+9YKkZF0NeObsnDu5IVCkW6mZpRc7Ro1W5nD1vVabQ7KSnqm0qrhDnkjiAo73A8CoR2nJN+qHTHXyXdG1OYZYS3ll3JhP0rFUcJaxxG8BaQr7EoWtjv4jIP42QO9mRXFSwmL1Mio3h7w5tOISDZdb/bPglFgrMM3S0jW8B4yhW/dBY7e6ngMWnNhxB+inllN7HGiIddM09Y3jfmoLq7XYVm9b/cZE/wAwGDvNRb110tccMiMD+yC6J1F00RPw1eGTmxrhmNVX1GXSQcwpgtgLHyOu67iMiWuBkjQxPNNW1mTgMCNAInXLCe7ksD3RFJSJUALSB2y05dwGJyy7SFwTir600RSoAfFEnHU9kHd2KgK1qjE7HKD7pvajEc9Etnrljrwzxg7iQRPimZSLDRUoXKVABTlJ8aSNQdfW9OWYtPVc2dxGDuzQ8iua1K7jMjQ/UaHggHfsl4F1PEDNvxN7NRxCapMBwK5o1S03mmCFeWJrbQDgG1ABO5w0PA+uVJWZdFM6ynTFC1lksRAALcRrGfaEqrQTqMpR2fVdlTd3QO8qT/6O4Y1HsZzdio9TaFU5vPfuTDWOccASeAJXM6+qTDRpDAPvu/pYOJJx7k8y3OYLorAAfCxgMciQFzZth1n5i6N7vpmrSh7PU24vcXHcOqPqsbR0jjm90qKd9uc4wHVHcC6PBqPsNV2JZdB1dh/cZWjhlMQwNb2eiVU261Z4+vI9yGSjXLID7I1vv1Oxok+MJh72aNPNx+Qhc1ahOa5p0y4w0EncMVpzAuReMRpmpw2bdE1XBvDXuz8E3cDjdo03OO/Ge7RBRDXdJxBDhoQe7FX1k9miRNV0HRox7z9FD26A0sYGhpaCCAMDlDhvn6raMGNo7QNU4iBuzUEolCN2YlQAJXNIMHMJE6HyAD2HdwPBYaMpWlOVKLmmCCDu9ZrgiEA8KUi83t4K42NRbWvMdnE84wgjXPMYiNdaixvIcI10Vw3Zzw4PpiCMQd35SN2nCd2AqJjK/amzHUjvbod26frr4LnZFr6KoHHLJ3I/TA9i01Y32guESMRnjqMM8stcxiFUnYIcC6k/EfAdNQA7XDI6yFTjT2J1bbl3aquAxwwgiN3MD12AWesG0zSmnUDoGUQHNOox0Qt1JmUx6nZbMzNxqHh7vhh3lTqdqgRTY1g5T3xAHiq+y0I5+Xb/AJCvLHY9XYevBcHse/FGU3UVQUKbji4k88PAeYXFoqxkeZ9eZUyo0nAYD161UWpTYzF7gPD15cFKZ6ckKVLjyVtQk5dukcT+HnkmfsD3fD2nAeuIT1p23TbhSZeI1OAHL9oVVare+p/EqQPwt+n1KtWeObgu9j5pUKZ6775/C3LtcnqNetUF2z0gxv4gP+RwUfZdpoNP3jOIeevB4syI5Yq+ZtamRAr0wd917IHAGQPFbt3OVvsQrP7PCb1Z5cT8LZx7cz4K7s9kDMGNDWxkBjPE/wCU23adIZVKXPpDPb1VydtU/wDcpf1PPkxVaJ0sfrU7rSG4ENLyc4Ak4znJw79yz/tk2H0/0nzC62htpvSNg32YmoWyJlpaGtnQAk46uKrds7RFa5F7qgjrXZ0/CssUQqrBDSNRj+oZjyPauBTwndnwXVEF3VGuXP8AfJPMN268CR7rgcidQeBEeO5DBuz2YvkNxdmG6kaxvPBLZmsJh5uzk7QH8w3eSetNHoy2pTJuOxY7UEfCeIUu00BXZ01OA4fxWDf+IDcfWq2jLHLNTvD7NX6rxjSfn2TqDp/hMusRkteIcM+PEH15w/s8Cq0Uasgj+E+MWn8JO7LD9lasaX9SqIqsEhw+Mfibv0kaKkrRN0VthsYBGHCY9Y4fL3gJ0llpdSPXD15ZCHZqI0iPQiO7DhwEXNmp+vXo5710jEhuzPWp90kE/LLHHz8d8xzVIN5uYzGUjMjdgTPAmfddhM9oKWMj1607s7qzNG0lpicvQjiNO7JRJ0ykrLq02RtqhzTdeM8BiNCRPZwyQqmtU+JmM5hsjHeIxgxlvEaIU2u6Kpml2fYg0XnGOeAHem7Vt2m3BnXO+YYNfe+izd6taCZcSBiSTDGjedAn3WdlGHv67iJYwiAfzvGYbubmeC46L3Z7/wA0orTjVe9jto25Vz3jDAtbwI1OozVVXtLn4ucT5dy5tFdz3FzzJOZ9ZBNKkjyynKXLFJQkQtIBKhCARCVKgEQEqdZTljnbi3xvfRAcXSJ3gq0uB0HJtYQfy1W5d5/uKafShzHfC8XTz0+Sl2ayYOo6PEtO57cu8eStIlscpWa4Cx+NGpAJ/wBt+QdwE6pvZzfs1ouVMJwDtCDkSN3kryxVw+jLmgzLajTvHvD59qj26witTDQZc0dRxzP5XfXkVdd0TfkdrbNEywc2/T19V28AhoeYIP3dTc7ceeXGYziY+yLWXNAM3m4Y5mM2niPEcRhLfXY9pa8Z4Ht88/HiFSozcZtUgF8Q4e+Bj/MBqP31C7sW2RlOMeWeOu/lB3qMLf0RFOsZ/wBurmHN3O8MeRVZtayGkbwksJwOrTnHnHCQscq3QSLfaVqDsvWf0PcdQFlLa2HT65+tVJo22RBzHlz4QO4bk1asRx+Xr1gucnZcVREbUIyMIXJSKCjdspw642g7o2aYNa52ckuzA7ZKprdVo9IYoirUccfvXvx7GgTwCWrYba+G1HOLTnDmxHESAr7ZlkZSF1lMg6uMEnm7DuAhbVm2VdLZDXCX2Us4MqS4fynDxUK2ezufQvvHPo3i7UjhPvLXF/A9xXNam1whwkeR3g6HimkWea1GEEgggjMHAjmEi2e1tnNeIeccmVTmNzKm8bnejkLRRcxxa4Q4GCFgGkqEIYKkRKEAin2Ns0a3C4fEqCrPZQ+6rDe3yDj8lqMlwTrLTD7OAdRgdzhej+3xVzYbIHMa7I4EHcRlgs3Y7X9yW603tfzF7EePirk7QuNgaQe3GV0i0c2iZaaN01C3KoA6Pw1G4eOv6SqlltuOnT1mpNa236ZIxunHkqq2iQe/6+UrW/AS8ls2qwvBPV6TC+PxY3Z47jzGOKb2mxzQXgYj3x/yHA4954ql2dbQOq/Fpz4cew49karWsf0jZgXm4EaH9j6yKJ2a9jPvtDarbjuw5kHQ+PbPEQ7su1BwNmrY4Q07xunlBBULbOzzRdeb7jjhwP4T4qFUrXgDk5uuvPv9YqLaZVJoW32U0nlva07xoUyKiumVBaaV0wKrcQd5+h8D2Kie0gwcCMCFjXg1MQoSIUmmy2XtB9Rxa45agY/RJtHbFRjg1obnqD9UIVmFjQquLZLj3D6JatYhs54gY8UIQDTaxcbpAggyqLau0DTdc6Om+7IDqjbzoBwEzpkhCyRqZEbtw5dBQ/6f7rQ7Ms1KsOvQpj9LbvzSIUMuDtjG2vZ6iymXsvAjSZHjisghCITW4qttiZO4k/8A51EIVx5OUuCBRzd+l3kp1oeejYfyjyCEIg+TrYlQkkaEgHkcCuaTsB2+UoQt7GdyseIJHEq32LaXB7YOrW8wTBB8O5CFK5KfBqbXZ2va5jhII8hgV56hCvITA7o1C03mmCFae0DB93UiC9su3TgkQpXDNfKKhCEKSj//2Q==', name: 'Bat Man', title: 'liked your post' },
        ];
        this.location = location;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listTitles = _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].filter(function (listTitle) { return listTitle; });
        this.id = localStorage.getItem("im_id");
        this.service.getRootID(this.id).subscribe(function (res) {
            var getInfo = res.json();
            _this.members = [getInfo];
            console.log("info user", res.json());
        });
    };
    NavbarComponent.prototype.toInfo = function () {
        var id = this.id;
        this.router.navigate(["/club-members/" + id + "/info"]);
    };
    NavbarComponent.prototype.toQrCode = function () {
        var id = this.id;
        this.router.navigate(["/club-members/" + id + "/qr-code"]);
    };
    NavbarComponent.prototype.getTitle = function () {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === "#") {
            titlee = titlee.slice(2);
        }
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return "Dashboard";
    };
    NavbarComponent.prototype.logout = function () {
        localStorage.clear();
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-navbar",
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/components/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/components/navbar/navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"],
            _services_post_service__WEBPACK_IMPORTED_MODULE_0__["PostService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar fixed-top navbar-vertical navbar-expand-md navbar-light bg-white\" id=\"sidenav-main\">\n  <div class=\"container-fluid\">\n    <!-- Toggler -->\n    <button class=\"navbar-toggler\" type=\"button\" (click)=\"isCollapsed=!isCollapsed\"\n      aria-controls=\"sidenav-collapse-main\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <!-- Brand -->\n    <a class=\"navbar-brand pt-0\" routerLinkActive=\"active\" (click)=\"toQrCode()\">\n      <img src=\"assets/img/brand/logo.png\" class=\"navbar-brand-img\" alt=\"...\">\n    </a>\n    <!-- User -->\n    <ul class=\"nav align-items-center d-md-none\">\n      <li class=\"nav-item\" ngbDropdown placement=\"bottom-right\">\n        <a class=\"nav-link\" role=\"button\" ngbDropdownToggle>\n          <i class=\"ni ni-bell-55\"></i>\n        </a>\n        <div role=\"button\" ngbDropdownMenu\n          class=\"dropdown-menu dropdown-menu-lg ml-4 dropdown-menu-right py-0 overflow-hidden\">\n          <!-- Dropdown header -->\n          <div class=\"px-3 py-3\">\n            <h6 class=\"text-sm text-muted m-0\">You have <strong class=\"text-primary\">13</strong> notifications.</h6>\n          </div>\n          <!-- List group -->\n          <div *ngFor=\"let a of alert\" class=\"list-group list-group-flush\">\n            <a href=\"#!\" class=\"list-group-item list-group-item-action\">\n              <div class=\"row align-items-center\">\n                <div class=\"col-3 \">\n                  <!-- Avatar -->\n                  <img alt=\"Image placeholder\" [src]=a.img class=\"avatar rounded-circle\">\n                </div>\n                <div class=\"col-9\">\n                  <div class=\"d-flex justify-content-md-between justify-content-between align-items-center\">\n                    <div>\n                      <h4 class=\"mb-0 text-sm\">default Member</h4>\n                    </div>\n                    <div class=\"text-right text-muted text-sm pb-1\">\n                      <small>2 hrs ago</small>\n                    </div>\n                  </div>\n                  <p class=\"text-sm mb-0\">Let's meet at Starbucks at 11:30. Wdyt?</p>\n                </div>\n              </div>\n            </a>\n          </div>\n          <!-- View all -->\n          <a href=\"#!\" class=\"dropdown-item text-center text-primary font-weight-bold py-3\">View all</a>\n        </div>\n      </li>\n      <li class=\"nav-item\" ngbDropdown placement=\"bottom-right\">\n        <a class=\"nav-link\" role=\"button\" ngbDropdownToggle>\n          <div class=\"media align-items-center\">\n            <span class=\"avatar avatar-sm rounded-circle\">\n              <img alt=\"Image placeholder\" [src]=\"members\">\n            </span>\n          </div>\n        </a>\n        <div class=\"dropdown-menu-arrow dropdown-menu-right\" ngbDropdownMenu>\n          <div class=\" dropdown-header noti-title\">\n            <h6 class=\"text-overflow m-0\">Welcome!</h6>\n          </div>\n          <a routerLinkActive=\"active\" (click)=\"toInfo()\" class=\"dropdown-item\">\n            <i class=\"ni ni-single-02\"></i>\n            <span>My profile</span>\n          </a>\n          <a routerLinkActive=\"active\" (click)=\"toQrCode()\" class=\"dropdown-item\">\n            <i class=\"fa fa-qrcode\" aria-hidden=\"true\"></i>\n            <span>Qr Code</span>\n          </a>\n          <div class=\"dropdown-divider\"></div>\n          <a href=\"#!\" (click)=\"logout()\" class=\"dropdown-item\">\n            <i class=\"ni ni-user-run\"></i>\n            <span>Logout</span>\n          </a>\n        </div>\n      </li>\n    </ul>\n    <!-- Collapse -->\n    <div class=\"collapse navbar-collapse\" [ngbCollapse]=\"isCollapsed\" id=\"sidenav-collapse-main\">\n      <!-- Collapse header -->\n      <div class=\"navbar-collapse-header d-md-none\">\n        <div class=\"row\">\n          <div class=\"col-6 collapse-brand\">\n            <a routerLinkActive=\"active\" (click)=\"toQrCode()\">\n              <img src=\"assets/img/brand/logo.png\">\n            </a>\n          </div>\n          <div class=\"col-6 collapse-close\">\n            <button type=\"button\" class=\"navbar-toggler\" (click)=\"isCollapsed=!isCollapsed\">\n              <span></span>\n              <span></span>\n            </button>\n          </div>\n        </div>\n      </div>\n      <!-- Form -->\n      <form class=\"mt-4 mb-3 d-md-none\">\n        <div class=\"input-group input-group-rounded input-group-merge\">\n          <input type=\"search\" class=\"form-control form-control-rounded form-control-prepended\" placeholder=\"Search\"\n            aria-label=\"Search\">\n          <div class=\"input-group-prepend\">\n            <div class=\"input-group-text\">\n              <span class=\"fa fa-search\"></span>\n            </div>\n          </div>\n        </div>\n      </form>\n      <!-- Heading -->\n      <h6 class=\"navbar-heading text-muted\">Navigation</h6>\n      <!-- Navigation -->\n      <ul class=\"navbar-nav\">\n        <li *ngFor=\"let menuItem of menuItems\" class=\"{{menuItem.class}} nav-item\">\n          <a routerLinkActive=\"active\" [routerLink]=\"[menuItem.path]\" class=\"nav-link\">\n            <i class=\"ni {{menuItem.icon}}\"></i>\n            {{menuItem.title}}\n          </a>\n        </li>\n      </ul>\n      <!-- Divider -->\n      <hr class=\"my-3\">\n      <!-- Heading -->\n      <h6 hidden class=\"navbar-heading text-muted\">Documentation</h6>\n      <!-- Navigation -->\n      <ul hidden class=\"navbar-nav mb-md-3\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"https://demos.creative-tim.com/argon-dashboard-angular/documentation/tutorial\">\n            <i class=\"ni ni-spaceship\"></i> Getting started\n          </a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"https://demos.creative-tim.com/argon-dashboard-angular/documentation/colors\">\n            <i class=\"ni ni-palette\"></i> Foundation\n          </a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"https://demos.creative-tim.com/argon-dashboard-angular/documentation/alerts\">\n            <i class=\"ni ni-ui-04\"></i> Components\n          </a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>"

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.ts ***!
  \*********************************************************/
/*! exports provided: ROUTES, SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ROUTES = [
    {
        path: "/club-members",
        title: "Club Members",
        icon: "ni-bullet-list-67 text-red",
        class: ""
    },
    {
        path: "/member-connect",
        title: "Members I have met",
        icon: "ni-planet text-blue",
        class: ""
    },
    {
        path: "/post-announcement",
        title: "Post an announcement",
        icon: "ni-bell-55 text-yellow",
        class: ""
    }
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router, service) {
        this.router = router;
        this.service = service;
        this.isCollapsed = true;
        this.alert = [
            {
                img: "https://i.ytimg.com/vi/GQGMwptqNjo/maxresdefault.jpg",
                name: "Bean",
                title: name + " commented on your post"
            },
            {
                img: "https://cdn.vox-cdn.com/thumbor/J2yuRomaoTRwazSaqRr5B6GwlLU=/0x0:779x439/1200x800/filters:focal(331x96:455x220)/cdn.vox-cdn.com/uploads/chorus_image/image/63729010/daf23dc1b438ed146ee9f9d1145f9e4d.0.png",
                name: "Spider Man",
                title: name + " liked your post"
            },
            {
                img: "data:image/jpeg;base64,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",
                name: "Bat Man",
                title: "liked your post"
            },
        ];
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getDataAPI().subscribe(function (res) {
            _this.uID = localStorage.getItem("im_id");
            _this.service.getRootID(_this.uID).subscribe(function (res) {
                var getInfo = res.json().profilePicture;
                _this.members = getInfo;
                console.log("info user", res.json());
            });
        });
        this.menuItems = ROUTES;
        this.router.events.subscribe(function (event) {
            _this.isCollapsed = true;
        });
    };
    SidebarComponent.prototype.toInfo = function () {
        this.router.navigate(["club-members/" + this.uID + "/info"]);
    };
    SidebarComponent.prototype.toQrCode = function () {
        this.router.navigate(["club-members/" + this.uID + "/qr-code"]);
    };
    SidebarComponent.prototype.logout = function () {
        localStorage.clear();
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-sidebar",
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/components/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/components/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], src_app_services_post_service__WEBPACK_IMPORTED_MODULE_0__["PostService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Sidenav -->\n<app-sidebar></app-sidebar>\n<div class=\"main-content\">\n  <!-- Top navbar -->\n  <!-- Pages -->\n  <router-outlet></router-outlet>\n  <app-navbar></app-navbar>\n\n  <div class=\"container-fluid\">\n    <app-footer></app-footer>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvYWRtaW4tbGF5b3V0L2FkbWluLWxheW91dC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.component.ts ***!
  \****************************************************************/
/*! exports provided: AdminLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutComponent", function() { return AdminLayoutComponent; });
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminLayoutComponent = /** @class */ (function () {
    function AdminLayoutComponent(service) {
        this.service = service;
    }
    AdminLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            if (localStorage.getItem('token') !== null) {
                // lấy token  
                var getToken = localStorage.getItem("token");
                var token = getToken;
                // lấy refresh token
                var getRefToken = localStorage.getItem("refresh_token");
                var formRef = new FormData();
                formRef.append("refresh_token", getRefToken);
                // decode token lấy timestamp
                var decoded = jwt_decode__WEBPACK_IMPORTED_MODULE_2__(token);
                var currentDate = Date.now();
                var tokenDate = decoded.exp * 1000;
                /*nếu tokendate trừ cho currentdate nhỏ hơn 600000 thì thực hiện refresh*/
                if (tokenDate - currentDate < 600000) {
                    _this.service.refreshToken(formRef).subscribe(function (res) {
                        localStorage.setItem("token", res.json().token);
                        console.log("refreshed", res.json());
                    });
                }
                console.log("2 thoi gian tru cho nhau (sau): ", tokenDate - currentDate);
            }
        }, 2000);
    };
    AdminLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-admin-layout",
            template: __webpack_require__(/*! ./admin-layout.component.html */ "./src/app/layouts/admin-layout/admin-layout.component.html"),
            styles: [__webpack_require__(/*! ./admin-layout.component.scss */ "./src/app/layouts/admin-layout/admin-layout.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_post_service__WEBPACK_IMPORTED_MODULE_0__["PostService"]])
    ], AdminLayoutComponent);
    return AdminLayoutComponent;
}());



/***/ }),

/***/ "./src/app/layouts/auth-layout/auth-layout.component.html":
/*!****************************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <nav class=\"navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark\">\n    <div class=\"container px-4\">\n      \n      <button class=\"navbar-toggler\" type=\"button\" (click)=\"isCollapsed=!isCollapsed\"\n         aria-controls=\"sidenav-collapse-main\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"collapse navbar-collapse\"  [ngbCollapse]=\"isCollapsed\" id=\"sidenav-collapse-main\">\n        <!-- Collapse header -->\n        <div class=\"navbar-collapse-header d-md-none\">\n          <div class=\"row\">\n            <div class=\"col-6 collapse-brand\">\n              <a routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">\n                <img src=\"assets/img/brand/logo.png\">\n              </a>\n            </div>\n            <div class=\"col-6 collapse-close\">\n              <button type=\"button\" class=\"navbar-toggler\" (click)=\"isCollapsed=!isCollapsed\" >\n                <span></span>\n                <span></span>\n              </button>\n            </div>\n          </div>\n        </div>\n        <!-- Navbar items -->\n        <ul hidden class=\"navbar-nav ml-auto\">\n          <li class=\"nav-item\">\n            <a class=\"nav-link nav-link-icon\" routerLinkActive=\"active\" [routerLink]=\"['/login']\">\n              <i class=\"ni ni-key-25\"></i>\n              <span class=\"nav-link-inner--text\">Login</span>\n            </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link nav-link-icon\" routerLinkActive=\"active\" [routerLink]=\"['/register']\">\n              <i class=\"ni ni-circle-08\"></i>\n              <span class=\"nav-link-inner--text\">Register</span>\n            </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link nav-link-icon\" routerLinkActive=\"active\" [routerLink]=\"['/register-event']\">\n              <i class=\"ni ni-circle-08\"></i>\n              <span class=\"nav-link-inner--text\">Register Event</span>\n            </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link nav-link-icon\" routerLinkActive=\"active\" [routerLink]=\"['/qr-code']\">\n              <i class=\"ni ni-circle-08\"></i>\n              <span class=\"nav-link-inner--text\">Qr Code</span>\n            </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link nav-link-icon\" routerLinkActive=\"active\" [routerLink]=\"['/qr-scanner']\">\n              <i class=\"ni ni-circle-08\"></i>\n              <span class=\"nav-link-inner--text\">Qr Scanner (Demo)</span>\n            </a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n  <router-outlet></router-outlet>\n</div>\n<!-- <footer class=\"py-5\">\n  <div class=\"container\">\n    <div class=\"row align-items-center justify-content-xl-between\">\n      <div class=\"col-xl-6\">\n        <div class=\"copyright text-center text-xl-left text-muted\">\n          &copy; {{ test | date: \"yyyy\" }} <a href=\"https://www.creative-tim.com?ref=ada-footer-auth-layout\" class=\"font-weight-bold ml-1\" target=\"_blank\">Creative Tim</a>\n        </div>\n      </div>\n      <div class=\"col-xl-6\">\n        <ul class=\"nav nav-footer justify-content-center justify-content-xl-end\">\n          <li class=\"nav-item\">\n            <a href=\"https://www.creative-tim.com?ref=ada-footer-auth-layout\" class=\"nav-link\" target=\"_blank\">Creative Tim</a>\n          </li>\n          <li class=\"nav-item\">\n            <a href=\"https://www.creative-tim.com/presentation?ref=ada-footer-auth-layout\" class=\"nav-link\" target=\"_blank\">About Us</a>\n          </li>\n          <li class=\"nav-item\">\n            <a href=\"http://blog.creative-tim.com?ref=ada-footer-auth-layout\" class=\"nav-link\" target=\"_blank\">Blog</a>\n          </li>\n          <li class=\"nav-item\">\n            <a href=\"https://github.com/creativetimofficial/argon-dashboard-angular/blob/master/LICENSE.md\" class=\"nav-link\" target=\"_blank\">MIT License</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</footer> -->\n"

/***/ }),

/***/ "./src/app/layouts/auth-layout/auth-layout.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvYXV0aC1sYXlvdXQvYXV0aC1sYXlvdXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/layouts/auth-layout/auth-layout.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.component.ts ***!
  \**************************************************************/
/*! exports provided: AuthLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutComponent", function() { return AuthLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthLayoutComponent = /** @class */ (function () {
    function AuthLayoutComponent(router) {
        this.router = router;
        this.test = new Date();
        this.isCollapsed = true;
    }
    AuthLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        var html = document.getElementsByTagName("html")[0];
        html.classList.add("auth-layout");
        var body = document.getElementsByTagName("body")[0];
        body.classList.add("bg-default");
        this.router.events.subscribe(function (event) {
            _this.isCollapsed = true;
        });
    };
    AuthLayoutComponent.prototype.ngOnDestroy = function () {
        var html = document.getElementsByTagName("html")[0];
        html.classList.remove("auth-layout");
        var body = document.getElementsByTagName("body")[0];
        body.classList.remove("bg-default");
    };
    AuthLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-auth-layout',
            template: __webpack_require__(/*! ./auth-layout.component.html */ "./src/app/layouts/auth-layout/auth-layout.component.html"),
            styles: [__webpack_require__(/*! ./auth-layout.component.scss */ "./src/app/layouts/auth-layout/auth-layout.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthLayoutComponent);
    return AuthLayoutComponent;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = /** @class */ (function () {
    function AuthService(router, http, snap) {
        this.router = router;
        this.http = http;
        this.apiBase = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].eventApiBase;
        this.route = "/registrations";
        this.url = "" + this.apiBase + this.route;
    }
    AuthService_1 = AuthService;
    AuthService.prototype.canActivate = function (route, state) {
        if (localStorage.getItem("token")) {
            return true;
        }
        else {
            this.router.navigate(["/login"], { queryParams: { 'redirectUrl': state.url } });
            return false;
        }
    };
    AuthService.getHeaders = function () {
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/ld+json"
        });
    };
    AuthService.prototype.postRegistration = function (registration) {
        return this.http.post(this.url, registration, {
            headers: AuthService_1.getHeaders()
        });
    };
    var AuthService_1;
    AuthService = AuthService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/post.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/post.service.ts ***!
  \******************************************/
/*! exports provided: PostService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostService", function() { return PostService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.url = "https://user.api.trivesg.com/login/nric-phone-birthdate";
        this.refUrl = "https://user.api.trivesg.com/token/refresh";
        this.getUrl = "https://org.api.trivesg.com/individual_members";
        this.getUrlConnect = "https://org.api.trivesg.com/connections";
        this.urlAT_API = "https://user.api.trivesg.com/login/individual-member-access-token";
        this.apiBase = _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].eventApiBase;
        this.route = "/attendees";
        this.urls = "" + this.apiBase + this.route;
    }
    // POST REQUEST
    PostService.prototype.uConnect = function (idPost) {
        var header = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        header.append("Content-Type", "application/json");
        header.append("accept", "application/ld+json");
        header.append("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.post(this.getUrlConnect, idPost, { headers: header });
    };
    PostService.prototype.postFormData = function (post) {
        return this.http.post(this.url, post);
    };
    PostService.prototype.refreshToken = function (refresh) {
        return this.http.post(this.refUrl, refresh);
    };
    PostService.prototype.loginByAccessToken = function (access_token) {
        var header = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        header.append("accept", "application/ld+json");
        header.append("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.post(this.urlAT_API, access_token, { headers: header });
    };
    // GET REQUEST
    PostService.prototype.getRootID = function (id) {
        var header = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        header.append("accept", "application/ld+json");
        header.append("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.get(this.getUrl + "/" + id, { headers: header });
    };
    PostService.prototype.getDataAPI = function () {
        var header = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        header.append("Accept", "application/ld+json");
        header.append("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.get(this.getUrl, { headers: header });
    };
    PostService.prototype.getConnect = function () {
        var header = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        header.append("Accept", "application/ld+json");
        header.append("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.get(this.getUrlConnect, { headers: header });
    };
    PostService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], PostService);
    return PostService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    eventApiBase: 'https://event.api.trivesg.com',
    orgApiBase: 'https://org.api.trivesg.com'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/nguyentruong/workspace/magenta/trivex/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map