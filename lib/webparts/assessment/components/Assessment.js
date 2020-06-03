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
import styles from './Assessment.module.scss';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { DisplayMode } from '@microsoft/sp-core-library';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { SPDataOperations } from '../../../common/SPDataOperations';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var Assessment = /** @class */ (function (_super) {
    __extends(Assessment, _super);
    function Assessment(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            module: '',
            moduleAssessment: [],
            userAnswer: {},
            correctAnswer: {},
            totalAttemptData: {},
            assessmentModule: {},
            isOpenPromt: true,
            assessmentStatus: '',
            assessmentParm: true
        };
        _this.onConfigure = _this.onConfigure.bind(_this);
        _this._onChange = _this._onChange.bind(_this);
        _this.submittedAssessment = _this.submittedAssessment.bind(_this);
        return _this;
    }
    Assessment.prototype.componentDidMount = function () {
        this.renderAssessmentModule();
        var queryParms = new UrlQueryParameterCollection(window.location.href);
        var assessmentParm = queryParms.getValue("assessmentSubmit");
        if (assessmentParm === true || assessmentParm === 'true') {
            this.setState({ assessmentParm: false });
        }
    };
    Assessment.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.userTrainingList !== this.props.userTrainingList || prevProps.assessmentList !== this.props.assessmentList || prevProps.totalQuestion !== this.props.totalQuestion) {
            this.renderAssessmentModule();
        }
    };
    Assessment.prototype.renderAssessmentModule = function () {
        var _this = this;
        SPDataOperations.LOADCurrentUserAssessment(this.props.userTrainingList, this.props.assessmentList, this.props.totalQuestion, this.props.context.pageContext.user.email, this.props.userAssessmentList).then(function (allTrainigs) {
            _this.setState({ module: allTrainigs.assessmentModule, moduleAssessment: allTrainigs.assessmentData, correctAnswer: allTrainigs.correctAnswer, userAnswer: allTrainigs.userAnswer, totalAttemptData: allTrainigs.totalAttempt, assessmentModule: allTrainigs.totalAttempt.assessmentAllData });
            if (allTrainigs.assessmentData.length === 0) {
                _this.setState({ assessmentStatus: 'You have no assessment pending!' });
            }
        });
    };
    Assessment.prototype.onConfigure = function () {
        this.props.context.propertyPane.open();
    };
    Assessment.prototype._onChange = function (ev, option) {
        var userGivenAnswer = this.state.userAnswer;
        var selectedAnswer = option.key.split("_");
        userGivenAnswer[selectedAnswer[0]] = selectedAnswer[1];
        this.setState({ userAnswer: userGivenAnswer });
    };
    Assessment.prototype.submittedAssessment = function () {
        var passingScore = +this.props.passingScore;
        var userAnswer = this.state.userAnswer;
        var correctAnswer = this.state.correctAnswer;
        var totalAttemptData = this.state.totalAttemptData;
        var correctAnsNo = 0;
        var totalQuestion = 0;
        Object.keys(correctAnswer).map(function (ans) {
            if (correctAnswer[ans] === userAnswer[ans]) {
                correctAnsNo++;
            }
            totalQuestion++;
        });
        var totalPercentage = (correctAnsNo * 100) / totalQuestion;
        var userStatus = (totalPercentage - passingScore) >= 0 ? "Pass" : "Fail";
        SPDataOperations.UpdateAssessmentStatus(this.props.userAssessmentList, this.state.module, userStatus, totalAttemptData, this.props, correctAnsNo, totalPercentage, totalQuestion).then(function (allTrainigs) {
        });
    };
    Assessment.prototype.render = function () {
        var _this = this;
        //console.log(this.state);
        if (this.props.configured) {
            var assessmentAllData = this.state.assessmentModule;
            return (React.createElement("div", { className: styles.assessment },
                React.createElement("div", { className: styles.container },
                    React.createElement("div", { className: styles.row },
                        this.state.moduleAssessment.map(function (item, i) {
                            var options = [
                                { key: item.Id + '_A', text: item.A },
                                { key: item.Id + '_B', text: item.B },
                                { key: item.Id + '_C', text: item.OData__x0043_ },
                                { key: item.Id + '_D', text: item.D }
                            ];
                            return (React.createElement("div", { className: styles.questionRow },
                                React.createElement(ChoiceGroup, { key: item.Id, options: options, label: "Q." + (i + 1) + " " + item.Title, onChange: _this._onChange })));
                        }),
                        this.state.moduleAssessment.length !== 0 &&
                            React.createElement("div", null,
                                React.createElement(Dialog, { hidden: this.state.isOpenPromt, dialogContentProps: {
                                        type: DialogType.largeHeader,
                                        title: 'Alert!',
                                        closeButtonAriaLabel: 'Close'
                                    }, containerClassName: styles.alertdialogContainer },
                                    React.createElement("div", null,
                                        React.createElement("span", null,
                                            "Would you like to submit your current assessment?",
                                            React.createElement("br", null),
                                            "Click 'OK', to submit. ",
                                            React.createElement("br", null),
                                            "Click 'Cancel', to return to current assessment.")),
                                    React.createElement(DialogFooter, null,
                                        React.createElement(PrimaryButton, { onClick: this.submittedAssessment, text: "OK" }),
                                        React.createElement(DefaultButton, { onClick: function () { _this.setState({ isOpenPromt: true }); }, text: "Cancel" }))),
                                React.createElement(PrimaryButton, { onClick: function () { _this.setState({ isOpenPromt: false }); } }, "Submit")),
                        (this.state.moduleAssessment.length === 0 && this.state.assessmentStatus !== '') &&
                            React.createElement("div", { style: { textAlign: "center" } },
                                React.createElement("img", { style: { width: 'auto' }, src: "/sites/ROOT/RootAssets/Images/Yay.jpg" }),
                                React.createElement("h2", null, this.state.assessmentStatus)),
                        assessmentAllData.Attempt > 0 &&
                            React.createElement(Dialog, { hidden: this.state.assessmentParm, dialogContentProps: {
                                    type: DialogType.largeHeader,
                                    title: 'Your Assessment Score'
                                }, modalProps: {
                                    isBlocking: true
                                }, containerClassName: styles.dialogContainer },
                                React.createElement("div", { className: styles.container },
                                    React.createElement("div", { className: styles.row },
                                        React.createElement("table", null,
                                            React.createElement("tr", null,
                                                React.createElement("th", null, "Module"),
                                                React.createElement("td", null, assessmentAllData.Title)),
                                            React.createElement("tr", null,
                                                React.createElement("th", null, "Total Question"),
                                                React.createElement("td", null, assessmentAllData.totalQuestion)),
                                            React.createElement("tr", null,
                                                React.createElement("th", null, "Correct Question"),
                                                React.createElement("td", null, assessmentAllData.correctQuestion)),
                                            React.createElement("tr", null,
                                                React.createElement("th", null, "Passing Score (%)"),
                                                React.createElement("td", null,
                                                    assessmentAllData.passingScore,
                                                    "%")),
                                            React.createElement("tr", null,
                                                React.createElement("th", null, "Your Score (%)"),
                                                React.createElement("td", null,
                                                    assessmentAllData.score,
                                                    "%")),
                                            React.createElement("tr", null,
                                                React.createElement("th", null, "Total Attempt"),
                                                React.createElement("td", null,
                                                    assessmentAllData.Attempt,
                                                    " of 3")),
                                            React.createElement("tr", null,
                                                React.createElement("th", null, "Status"),
                                                React.createElement("td", null,
                                                    React.createElement("b", { style: { color: assessmentAllData.AssessmentStatus === 'Pass' ? 'Green' : 'Red' } }, assessmentAllData.AssessmentStatus)))),
                                        React.createElement(MessageBar, { messageBarType: assessmentAllData.AssessmentStatus === 'Pass' ? MessageBarType.success : MessageBarType.severeWarning, isMultiline: true },
                                            assessmentAllData.AssessmentStatus === 'Pass' &&
                                                React.createElement("div", null,
                                                    React.createElement("b", null, "\u00A0Congratulations"),
                                                    ", you have passed this assessment!",
                                                    React.createElement("br", null),
                                                    React.createElement("i", null,
                                                        "\u00A0\u00A0",
                                                        React.createElement("b", null, "Note: Please complete your pending training if any."))),
                                            (assessmentAllData.AssessmentStatus === 'Fail' && assessmentAllData.Attempt < 3) &&
                                                React.createElement("div", null, "After 3 failed attempt you will have to complete the training again for this module."),
                                            (assessmentAllData.AssessmentStatus === 'Fail' && assessmentAllData.Attempt === 3) &&
                                                React.createElement("div", null, "You have 3 failed attempts at this assessment.  Please retake the training for this module prior to attempting the assessment again.")))),
                                React.createElement(DialogFooter, null,
                                    React.createElement(PrimaryButton, { onClick: function () { _this.setState({ assessmentParm: true }); }, href: this.props.URLAssessmentHome, text: "OK" })))))));
        }
        else {
            return (React.createElement(Placeholder, { iconName: 'Edit', iconText: 'Configure your web part', description: 'Please configure the web part.', buttonLabel: 'Configure', hideButton: this.props.displayMode === DisplayMode.Read, onConfigure: this.onConfigure }));
        }
    };
    return Assessment;
}(React.Component));
export default Assessment;
//# sourceMappingURL=Assessment.js.map