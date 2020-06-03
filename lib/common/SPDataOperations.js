var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
import { sp, } from '@pnp/sp/presets/all';
import { SPHttpClient } from '@microsoft/sp-http';
//Polyfill to fix IE issues
import '@pnp/polyfill-ie11';
import * as pnp from "sp-pnp-js";
var SPDataOperations = /** @class */ (function () {
    function SPDataOperations() {
    }
    /**
     * Gets the available Choices in the Module Choice field
     *
     * @param lists The list for which the fields of type Managed Metadata need to be retrieved
     */
    SPDataOperations.LOADCurrentUserTraining = function (lists, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedTraining, selectedTrainingObject, userData, error_1, allselectedTraining, allselectedTrainingObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedTraining = [];
                        selectedTrainingObject = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getById(lists).items.select('Training/Id,Training/ModuleCalc,EmployeeID1/EMail').expand('Training,EmployeeID1').filter("EmployeeID1/EMail eq '" + userEmail + "'").top(500).get()];
                    case 2:
                        userData = _a.sent();
                        //console.log(userData)
                        //alert()
                        userData[0].Training.map(function (training) {
                            selectedTraining.push(training.Id);
                            selectedTrainingObject.push({ 'Module': training.ModuleCalc, 'Id': training.Id });
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [3 /*break*/, 4];
                    case 4:
                        allselectedTraining = { 'selectedTraining': selectedTraining };
                        allselectedTrainingObject = { 'selectedTrainingObject': selectedTrainingObject };
                        selectedTraining = __assign({}, allselectedTraining, allselectedTrainingObject);
                        return [2 /*return*/, selectedTraining];
                }
            });
        });
    };
    /**
   * Gets the available sub module
   *
   * @param lists The list for which the fields of type Managed Metadata need to be retrieved
   * @param module
   * @param userTrainingList
   */
    SPDataOperations.LOADSubModuleData = function (lists, userEmail, userTrainingList) {
        return __awaiter(this, void 0, void 0, function () {
            var allData, selectedTraining, moduleData, subModuleData, trainingData, trainingIDs, error_2, allSelectedTraining, allModuleData, allSubModuleData, allTrainingData, allTrainingIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        moduleData = [];
                        subModuleData = {};
                        trainingData = {};
                        trainingIDs = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.LOADCurrentUserTraining(userTrainingList, userEmail)];
                    case 2:
                        selectedTraining = _a.sent();
                        return [4 /*yield*/, sp.web.lists.getById(lists).items.select('Id,Title,Module,SubModule,TrainingPath').top(500).get()];
                    case 3:
                        allData = _a.sent();
                        allData.map(function (field) {
                            if (moduleData.indexOf(field.Module) === -1) {
                                moduleData.push(field.Module);
                                subModuleData[field.Module] = [];
                                trainingIDs[field.Module] = [];
                            }
                        });
                        allData.map(function (field) {
                            if (subModuleData[field.Module].indexOf(field.SubModule) === -1) {
                                subModuleData[field.Module].push(field.SubModule);
                                trainingData[field.SubModule] = [];
                            }
                        });
                        allData.map(function (field) {
                            if (trainingData[field.SubModule].indexOf(field) === -1) {
                                trainingData[field.SubModule].push(field);
                                trainingIDs[field.Module].push(field.Id);
                            }
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2.message);
                        return [3 /*break*/, 5];
                    case 5:
                        allSelectedTraining = { 'selectedTraining': selectedTraining.selectedTraining };
                        allModuleData = { 'module': moduleData };
                        allSubModuleData = { 'subModule': subModuleData };
                        allTrainingData = { 'trainingData': trainingData };
                        allTrainingIds = { 'trainingIds': trainingIDs };
                        allData = __assign({}, allModuleData, allSubModuleData, allTrainingData, allSelectedTraining, allTrainingIds);
                        return [2 /*return*/, allData];
                }
            });
        });
    };
    /**
     * Check if the current user has requested permissions on a list
     *
     * @param lists The list on which user permission needs to be checked
     * @param ids The permission kind for which user needs to be authorized
     * @param itemId
     * @param pageContext
     * @param props
     * @param userAssessmentList
     */
    SPDataOperations.UpdateTrainings = function (lists, trainingIds, props, ModuleStatus, userAssessmentList) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, pageContext, SPDATA, userData, itemId, body;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = props.pageContext.user.email;
                        pageContext = props.pageContext;
                        return [4 /*yield*/, this.getListItemEntityType(lists)];
                    case 1:
                        SPDATA = _a.sent();
                        return [4 /*yield*/, sp.web.lists.getById(lists).items.select('Id,EmployeeID1/EMail').expand('EmployeeID1').filter("EmployeeID1/EMail eq '" + userEmail + "'").get()];
                    case 2:
                        userData = _a.sent();
                        itemId = userData.length > 0 ? userData[0].Id : 0;
                        body = JSON.stringify({
                            '__metadata': { 'type': SPDATA },
                            'TrainingId': {
                                'results': trainingIds
                            },
                            'ModuleStatus': ModuleStatus
                        });
                        props.spHttpClient.post(pageContext.web.absoluteUrl + "/_api/web/lists/getbyid('" + lists + "')/items(" + itemId + ")", SPHttpClient.configurations.v1, {
                            headers: {
                                'Accept': 'application/json;odata=nometadata',
                                'Content-type': 'application/json;odata=verbose',
                                'odata-version': '',
                                'IF-MATCH': '*',
                                'X-HTTP-Method': 'MERGE'
                            },
                            body: body
                        })
                            .then(function (response) {
                            if (ModuleStatus !== "" && ModuleStatus !== undefined) {
                                _this.AssignModuleAssessment(userAssessmentList, ModuleStatus, props);
                            }
                            else {
                                window.location.href = window.location.pathname + "?assessmentSubmit=true";
                                //window.location.reload();
                            }
                        }, function (error) {
                            console.log(error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
       * Gets the available Choices in the Module Choice field
       * @param lists The list for which the fields of type Managed Metadata need to be retrieved
       * @param assessmentlist
       * @param totalQuestion
       * @param userEmail
       * @param userAssessentList
       */
    SPDataOperations.LOADCurrentUserAssessment = function (lists, assessmentlist, totalQuestion, userEmail, userAssessentList) {
        return __awaiter(this, void 0, void 0, function () {
            var selecedModule, assessments, correctAnswer, userAnswer, assessmentAttempt, userData, selectedItems, error_3, assessmentModule, assessmentData, assessmentAnswer, assessmentQuestion, assessmentTotalAttempt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assessments = [];
                        correctAnswer = {};
                        userAnswer = {};
                        assessmentAttempt = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, sp.web.lists.getById(lists).items.select('ModuleStatus,EmployeeID1/EMail').expand('EmployeeID1').filter("EmployeeID1/EMail eq '" + userEmail + "'").get()];
                    case 2:
                        userData = _a.sent();
                        selecedModule = userData.length > 0 ? userData[0].ModuleStatus : "";
                        if (!(selecedModule != "")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.GetAssessmentStatus(userAssessentList, userEmail)];
                    case 3:
                        assessmentAttempt = _a.sent();
                        if (!(assessmentAttempt.totalAttempt === 0 || (assessmentAttempt.assessmentStatus === 'Fail' && assessmentAttempt.totalAttempt < 3))) return [3 /*break*/, 5];
                        return [4 /*yield*/, sp.web.lists.getById(assessmentlist).items.select('Id,Title,A,B,OData__x0043_,D,E,Answer').filter("Module eq '" + encodeURIComponent(selecedModule) + "'").get()];
                    case 4:
                        assessments = _a.sent();
                        assessments.sort(function (a, b) { return 0.5 - Math.random(); });
                        selectedItems = assessments.slice(0, +totalQuestion).map(function (item) {
                            correctAnswer[item.Id] = item.Answer;
                            userAnswer[item.Id] = "";
                            return item;
                        });
                        assessments = selectedItems;
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3.message);
                        return [3 /*break*/, 7];
                    case 7:
                        assessmentModule = { 'assessmentModule': selecedModule };
                        assessmentData = { 'assessmentData': assessments };
                        assessmentAnswer = { 'correctAnswer': correctAnswer };
                        assessmentQuestion = { 'userAnswer': userAnswer };
                        assessmentTotalAttempt = { 'totalAttempt': assessmentAttempt };
                        return [2 /*return*/, __assign({}, assessmentModule, assessmentData, assessmentAnswer, assessmentQuestion, assessmentTotalAttempt)];
                }
            });
        });
    };
    /**
     * Check if the current user has requested permissions on a list
     *
     * @param lists The list on which user permission needs to be checked
     * @param userEmail The permission kind for which user needs to be authorized
     */
    SPDataOperations.GetAssessmentStatus = function (lists, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var assessmentAttemptData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getById(lists).items.select('*,EmployeeID1/EMail').expand('EmployeeID1').orderBy('Modified', false).top(1).filter("EmployeeID1/EMail eq '" + userEmail + "'").get()];
                    case 1:
                        assessmentAttemptData = _a.sent();
                        return [2 /*return*/, assessmentAttemptData.length > 0 ? { attemptId: assessmentAttemptData[0].Id, totalAttempt: assessmentAttemptData[0].Attempt, assessmentStatus: assessmentAttemptData[0].AssessmentStatus || '', assessmentAllData: assessmentAttemptData[0] } : { attemptId: 0, totalAttempt: 0, assessmentStatus: '', assessmentAllData: {} }];
                }
            });
        });
    };
    /**
       * Check if the current user has requested permissions on a list
       *
       * @param lists The list on which user permission needs to be checked
       * @param ids The permission kind for which user needs to be authorized
       * @param itemId
       * @param pageContext
       * @param props
       */
    SPDataOperations.UpdateAssessmentStatus = function (lists, module, status, totalAttemptData, props, correctQuestion, score, totalQuestion) {
        return __awaiter(this, void 0, void 0, function () {
            var totalAttempt, SPDATA, body;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalAttempt = totalAttemptData.totalAttempt + 1;
                        return [4 /*yield*/, this.getListItemEntityType(lists)];
                    case 1:
                        SPDATA = _a.sent();
                        body = JSON.stringify({
                            '__metadata': { 'type': SPDATA },
                            'Attempt': totalAttempt,
                            'AssessmentStatus': status,
                            'totalQuestion': totalQuestion,
                            'passingScore': +props.passingScore,
                            'correctQuestion': correctQuestion,
                            'score': score.toFixed(2)
                        });
                        props.context.spHttpClient.post(props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbyid('" + lists + "')/items(" + totalAttemptData.attemptId + ")", SPHttpClient.configurations.v1, {
                            headers: {
                                'Accept': 'application/json;odata=nometadata',
                                'Content-type': 'application/json;odata=verbose',
                                'odata-version': '',
                                'IF-MATCH': '*',
                                'X-HTTP-Method': 'MERGE'
                            },
                            body: body
                        })
                            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var selectedTraining, selectedTrainingObject, updatedTrainingId_1, updateTraining;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(totalAttempt === 3 && status === "Fail")) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.LOADCurrentUserTraining(props.userTrainingList, props.context.pageContext.user.email)];
                                    case 1:
                                        selectedTraining = _a.sent();
                                        selectedTrainingObject = selectedTraining.selectedTrainingObject;
                                        updatedTrainingId_1 = [];
                                        selectedTrainingObject.map(function (val) {
                                            if (val.Module != module) {
                                                updatedTrainingId_1.push(val.Id);
                                            }
                                        });
                                        return [4 /*yield*/, this.UpdateTrainings(props.userTrainingList, updatedTrainingId_1, props.context)];
                                    case 2:
                                        updateTraining = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        window.location.href = window.location.pathname + "?assessmentSubmit=true";
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, function (error) {
                            console.log(error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SPDataOperations.AssignModuleAssessment = function (lists, module, props) {
        return __awaiter(this, void 0, void 0, function () {
            var SPDATA, userDetails, body;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListItemEntityType(lists)];
                    case 1:
                        SPDATA = _a.sent();
                        return [4 /*yield*/, this.spLoggedInUserDetails(props)];
                    case 2:
                        userDetails = _a.sent();
                        body = JSON.stringify({
                            '__metadata': { 'type': SPDATA },
                            'Title': module,
                            'EmployeeID1Id': userDetails.Id
                        });
                        props.spHttpClient.post(props.pageContext.web.absoluteUrl + "/_api/web/lists/getbyid('" + lists + "')/items", SPHttpClient.configurations.v1, {
                            headers: {
                                'Accept': 'application/json;odata=nometadata',
                                'Content-type': 'application/json;odata=verbose',
                                'odata-version': ''
                            },
                            body: body
                        })
                            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                window.location.href = window.location.pathname + "?assessment=true";
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /*Get Current Logged In User*/
    SPDataOperations.spLoggedInUserDetails = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var web, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        web = new pnp.Web(ctx.pageContext.site.absoluteUrl);
                        return [4 /*yield*/, web.currentUser.get()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        console.log("Error in spLoggedInUserDetails : " + error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Check if the current user has requested permissions on a list
    * @param listId The list on which user permission needs to be checked
    */
    SPDataOperations.getListItemEntityType = function (listId) {
        return __awaiter(this, void 0, void 0, function () {
            var entityType, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.lists.getById(listId).getListItemEntityTypeFullName()];
                    case 1:
                        entityType = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log('SPDataOperations.getListItemEntityType' + error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, entityType];
                }
            });
        });
    };
    return SPDataOperations;
}());
export { SPDataOperations };
//# sourceMappingURL=SPDataOperations.js.map