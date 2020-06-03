var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './Training.module.scss';
import { SPDataOperations } from '../../../common/SPDataOperations';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { DisplayMode } from '@microsoft/sp-core-library';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType, Link } from 'office-ui-fabric-react';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var Training = /** @class */ (function (_super) {
    __extends(Training, _super);
    function Training(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            module: [],
            subModule: [],
            allTraining: [],
            selectedIDs: [],
            allTrainingId: [],
            selectedTrainingId: '',
            isFilterOpen: 'none',
            isClose: true,
            assessmentStatus: false,
            assessmentModule: {},
            assessmentParm: true,
            isLoading: false
        };
        _this.onConfigure = _this.onConfigure.bind(_this);
        _this._onChange = _this._onChange.bind(_this);
        _this.saveDraftVersion = _this.saveDraftVersion.bind(_this);
        _this.checkCondition = _this.checkCondition.bind(_this);
        _this.toggleFilters = _this.toggleFilters.bind(_this);
        return _this;
    }
    Training.prototype.componentDidMount = function () {
        this.renderTrainigModule();
    };
    Training.prototype.componentDidUpdate = function (prevProps) {
        /* Render updated topics when the selected subject property value is updated in the web part*/
        if (prevProps.selectedList !== this.props.selectedList || prevProps.userAssessment !== this.props.userAssessment) {
            this.renderTrainigModule();
        }
    };
    Training.prototype.renderTrainigModule = function () {
        var _this = this;
        if (this.props.userTraining) {
            SPDataOperations.LOADSubModuleData(this.props.selectedList, this.props.context.pageContext.user.email, this.props.userTraining).then(function (allTrainigs) {
                _this.setState({ module: allTrainigs.module, subModule: allTrainigs.subModule, allTraining: allTrainigs.trainingData, selectedIDs: allTrainigs.selectedTraining, allTrainingId: allTrainigs.trainingIds, selectedTrainingId: allTrainigs.selectedTraining.join(",") });
            });
        }
        SPDataOperations.GetAssessmentStatus(this.props.userAssessment, this.props.context.pageContext.user.email).then(function (assessment) {
            var assessmentStatus = false;
            if (assessment.assessmentStatus !== 'Pass' && assessment.attemptId !== 0) {
                assessmentStatus = true;
            }
            if (assessment.assessmentStatus === 'Fail' && assessment.totalAttempt === 3) {
                assessmentStatus = false;
            }
            _this.setState({ assessmentStatus: assessmentStatus, assessmentModule: assessment });
        });
        var queryParms = new UrlQueryParameterCollection(window.location.href);
        var assessmentParm = queryParms.getValue("assessment");
        if (assessmentParm === true || assessmentParm === 'true') {
            this.setState({ assessmentParm: false });
        }
    };
    Training.prototype.onConfigure = function () {
        this.props.context.propertyPane.open();
    };
    Training.prototype._onChange = function (ev, isChecked) {
        var itemID = +ev.currentTarget.getAttribute("aria-label");
        var stateIDs = this.state.selectedIDs;
        if (isChecked && stateIDs.indexOf(itemID) === -1) {
            stateIDs.push(itemID);
        }
        else {
            stateIDs = stateIDs.filter(function (item) { return item !== itemID; });
        }
        this.setState({ selectedIDs: stateIDs });
    };
    Training.prototype.toggleFilters = function (ev) {
        var nameid = ev;
        if (this.state.isFilterOpen === nameid) {
            this.setState({ isFilterOpen: '' });
        }
        else {
            this.setState({ isFilterOpen: nameid });
        }
    };
    Training.prototype.checkCondition = function () {
        var _this = this;
        var selectedTrainingIDs = this.state.selectedTrainingId.split(",").map(Number);
        var trainingID = this.state.allTrainingId;
        var currentModule = [];
        Object.keys(trainingID).map(function (module) {
            var trainingIDs = trainingID[module];
            var singleFound = trainingIDs.some(function (r) { return selectedTrainingIDs.indexOf(r) >= 0; });
            var allFound = trainingIDs.every(function (v) { return selectedTrainingIDs.includes(v); });
            var notFound = trainingIDs.every(function (v) { return !selectedTrainingIDs.includes(v); });
            var returnVal = selectedTrainingIDs.length === 0 ? _this.state.module[0] : notFound ? module : (singleFound && !allFound) ? module : '';
            if (returnVal !== '') {
                currentModule.push(returnVal);
            }
        });
        return currentModule[0];
    };
    Training.prototype.saveDraftVersion = function (flag) {
        this.setState({ isLoading: true });
        var selectedTrainingIDs = this.state.selectedIDs;
        var trainingID = this.state.allTrainingId;
        var currentModule = this.checkCondition();
        var ModuleStatus = "";
        Object.keys(trainingID).map(function (module) {
            var trainingIDs = trainingID[module];
            var allFound = trainingIDs.every(function (v) { return selectedTrainingIDs.includes(v); });
            if (allFound && currentModule === module) {
                ModuleStatus = module;
            }
        });
        if (ModuleStatus != "" && flag === 1) {
            this.setState({ isClose: false });
        }
        if ((flag === 1 && ModuleStatus === "") || flag === 2) {
            SPDataOperations.UpdateTrainings(this.props.userTraining, this.state.selectedIDs, this.props.context, ModuleStatus, this.props.userAssessment).then(function (allTrainigs) {
            });
        }
        this.setState({ isLoading: false });
    };
    Training.prototype.render = function () {
        var _this = this;
        //console.log(this.state);
        var enableModule = this.checkCondition();
        var assessmentStatus = this.state.assessmentStatus;
        var assessmentModule = this.state.assessmentModule.assessmentAllData;
        var completedAssessment = 'Pass';
        if (this.props.configured) {
            return (React.createElement("div", { className: styles.training },
                (assessmentStatus === true) &&
                    React.createElement(MessageBar, { messageBarType: MessageBarType.warning, isMultiline: false }, "Please complete the assessment to enable the next trainings"),
                this.state.module.map(function (module) {
                    if (assessmentStatus === true && assessmentModule.Title === module) {
                        completedAssessment = (assessmentModule.AssessmentStatus === '' || assessmentModule.AssessmentStatus === null) ? "Pending" : assessmentModule.AssessmentStatus;
                    }
                    else if (assessmentModule.Title !== module && enableModule === module || assessmentModule.Attempt === 3 && enableModule === module) {
                        completedAssessment = "Not Started";
                    }
                    return (React.createElement("div", { className: styles.module },
                        React.createElement("div", { className: styles.moduleHeading },
                            React.createElement("h5", { onClick: function () { return _this.toggleFilters(module); } },
                                module,
                                React.createElement("span", null,
                                    "Assessment Status: ",
                                    React.createElement("label", { style: { color: completedAssessment === 'Pass' ? 'green' : completedAssessment === 'Fail' ? 'red' : completedAssessment === 'Pending' ? '#ffbf00' : '' } }, completedAssessment)))),
                        React.createElement("div", { className: styles.subModule, style: { display: (_this.state.isFilterOpen === module || enableModule === module) ? '' : 'none' } }, _this.state.subModule[module].map(function (submodule) {
                            return (React.createElement("table", null,
                                React.createElement("tr", null,
                                    React.createElement("th", { style: { width: '24px' } }, "#"),
                                    React.createElement("th", null, submodule),
                                    React.createElement("th", { style: { width: '82px' } }, "Status")),
                                _this.state.allTraining[submodule].map(function (training) {
                                    if (training.Module === module && training.SubModule === submodule) {
                                        return (React.createElement("tr", null,
                                            React.createElement("td", null,
                                                _this.state.selectedIDs.indexOf(training.Id) === -1 &&
                                                    React.createElement(Checkbox, { key: training.Id, disabled: enableModule !== module || assessmentStatus === true, ariaLabel: training.Id, onChange: _this._onChange }),
                                                _this.state.selectedIDs.indexOf(training.Id) > -1 &&
                                                    React.createElement(Checkbox, { key: training.Id, disabled: enableModule !== module || assessmentStatus === true, ariaLabel: training.Id, defaultChecked: true, onChange: _this._onChange })),
                                            React.createElement("td", null,
                                                React.createElement(Link, { "data-interception": "off", disabled: enableModule !== module || assessmentStatus === true, target: "_Blank", href: training.TrainingPath.Url }, training.Title)),
                                            React.createElement("td", null,
                                                _this.state.selectedIDs.indexOf(training.Id) === -1 &&
                                                    React.createElement("span", null, "Pending"),
                                                _this.state.selectedIDs.indexOf(training.Id) > -1 &&
                                                    React.createElement("span", null, "Completed"))));
                                    }
                                })));
                        }))));
                }),
                React.createElement("div", { className: styles.footerButtons },
                    React.createElement(Dialog, { hidden: this.state.assessmentParm, dialogContentProps: {
                            type: DialogType.largeHeader,
                            title: 'Module Submitted',
                            closeButtonAriaLabel: 'Close',
                            subText: this.props.moduleCompletionMsg
                        }, containerClassName: styles.alertdialogContainer },
                        React.createElement(DialogFooter, null,
                            React.createElement(PrimaryButton, { href: this.props.URLForYes, text: "Yes", onClick: function () { _this.setState({ assessmentParm: true }); } }),
                            React.createElement(DefaultButton, { href: this.props.URLForNo, text: "No", onClick: function () { _this.setState({ assessmentParm: true }); } }))),
                    React.createElement(Dialog, { hidden: this.state.isClose, dialogContentProps: {
                            type: DialogType.largeHeader,
                            title: 'Alert!'
                        }, containerClassName: styles.alertdialogContainer },
                        React.createElement("div", null,
                            React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.moduleSubmittionMsg } })),
                        React.createElement(DialogFooter, null,
                            React.createElement(PrimaryButton, { onClick: function () { _this.saveDraftVersion(2); }, text: "OK", disabled: this.state.isLoading }),
                            React.createElement(DefaultButton, { onClick: function () { _this.setState({ isClose: true }); }, text: "Cancel" }))),
                    React.createElement(PrimaryButton, { iconProps: { iconName: "Draft" }, text: "Save", onClick: function () { _this.saveDraftVersion(1); } }))));
        }
        else {
            return (React.createElement(Placeholder, { iconName: 'Edit', iconText: 'Configure your web part', description: 'Please configure the web part.', buttonLabel: 'Configure', hideButton: this.props.displayMode === DisplayMode.Read, onConfigure: this.onConfigure }));
        }
    };
    return Training;
}(React.Component));
export default Training;
//# sourceMappingURL=Training.js.map